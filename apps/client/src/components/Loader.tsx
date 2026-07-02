'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

const LEGACY_HIDE_DELAY_MS = 350;
const LEGACY_FADE_DURATION_MS = 600;
const MIN_VISIBLE_MS = 300;
const DOM_IDLE_MS = 180;
const DOM_IDLE_MAX_WAIT_MS = 5000;

function waitForAnimationFrame() {
  return new Promise<void>((resolve) => {
    requestAnimationFrame(() => resolve());
  });
}

function waitForImage(img: HTMLImageElement) {
  return new Promise<void>((resolve) => {
    if (img.complete) {
      resolve();
      return;
    }

    const done = () => resolve();
    img.addEventListener('load', done, { once: true });
    img.addEventListener('error', done, { once: true });
  });
}

function shouldWaitForImage(img: HTMLImageElement) {
  if (img.complete) {
    return false;
  }

  if (img.loading !== 'lazy' || img.fetchPriority === 'high') {
    return true;
  }

  const rect = img.getBoundingClientRect();
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  const viewportWidth = window.innerWidth || document.documentElement.clientWidth;

  const verticallyNearViewport = rect.top <= viewportHeight * 1.2 && rect.bottom >= -viewportHeight * 0.2;
  const horizontallyVisible = rect.left <= viewportWidth && rect.right >= 0;

  return verticallyNearViewport && horizontallyVisible;
}

function waitForDomIdle() {
  return new Promise<void>((resolve) => {
    let idleTimer: ReturnType<typeof setTimeout> | null = null;
    let maxTimer: ReturnType<typeof setTimeout> | null = null;

    const finish = () => {
      if (idleTimer) clearTimeout(idleTimer);
      if (maxTimer) clearTimeout(maxTimer);
      observer.disconnect();
      resolve();
    };

    const scheduleIdle = () => {
      if (idleTimer) clearTimeout(idleTimer);
      idleTimer = setTimeout(finish, DOM_IDLE_MS);
    };

    const observer = new MutationObserver(() => {
      scheduleIdle();
    });

    observer.observe(document.body, {
      subtree: true,
      childList: true,
      attributes: true,
      characterData: true,
    });

    maxTimer = setTimeout(finish, DOM_IDLE_MAX_WAIT_MS);
    scheduleIdle();
  });
}

async function waitForPageReady() {
  await waitForAnimationFrame();
  await waitForAnimationFrame();
  await waitForDomIdle();

  if ('fonts' in document) {
    try {
      await document.fonts.ready;
    } catch {
      // Ignore font readiness failures and continue with the current render.
    }
  }

  const images = Array.from(document.images).filter(shouldWaitForImage);
  await Promise.all(images.map((img) => waitForImage(img)));
  await waitForAnimationFrame();
}

function isInternalNavigation(anchor: HTMLAnchorElement) {
  if (!anchor.href || anchor.target === '_blank' || anchor.hasAttribute('download')) {
    return false;
  }

  const href = anchor.getAttribute('href') || '';
  if (
    href.startsWith('mailto:') ||
    href.startsWith('tel:') ||
    href.startsWith('javascript:')
  ) {
    return false;
  }

  const nextUrl = new URL(anchor.href, window.location.href);
  const currentUrl = new URL(window.location.href);

  if (nextUrl.origin !== currentUrl.origin) {
    return false;
  }

  if (
    nextUrl.pathname === currentUrl.pathname &&
    nextUrl.search === currentUrl.search &&
    nextUrl.hash
  ) {
    return false;
  }

  return (
    nextUrl.pathname !== currentUrl.pathname ||
    nextUrl.search !== currentUrl.search ||
    nextUrl.hash !== currentUrl.hash
  );
}

export default function Loader() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const isMountedRef = useRef(false);
  const isVisibleRef = useRef(true);
  const shownAtRef = useRef(Date.now());
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fadeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    isVisibleRef.current = isVisible;
  }, [isVisible]);

  const clearTimers = useCallback(() => {
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
    if (fadeTimerRef.current) {
      clearTimeout(fadeTimerRef.current);
      fadeTimerRef.current = null;
    }
  }, []);

  const showLoader = useCallback(() => {
    clearTimers();
    shownAtRef.current = Date.now();
    setIsVisible(true);
    setIsFading(false);
  }, [clearTimers]);

  const hideLoader = useCallback(async () => {
    await waitForPageReady();

    const elapsed = Date.now() - shownAtRef.current;
    const minVisibleDelay = Math.max(0, MIN_VISIBLE_MS - elapsed);

    hideTimerRef.current = setTimeout(() => {
      setIsFading(true);
      fadeTimerRef.current = setTimeout(() => {
        setIsVisible(false);
        setIsFading(false);
      }, LEGACY_FADE_DURATION_MS);
    }, LEGACY_HIDE_DELAY_MS + minVisibleDelay);
  }, []);

  useEffect(() => {
    showLoader();

    const onInitialLoad = () => {
      void hideLoader();
    };

    if (document.readyState === 'complete') {
      void hideLoader();
    } else {
      window.addEventListener('load', onInitialLoad, { once: true });
    }

    return () => {
      window.removeEventListener('load', onInitialLoad);
      clearTimers();
    };
  }, [clearTimers, hideLoader, showLoader]);

  useEffect(() => {
    if (!isMountedRef.current) {
      isMountedRef.current = true;
      return;
    }

    if (!isVisibleRef.current) {
      showLoader();
    }

    void hideLoader();
  }, [hideLoader, pathname, showLoader]);

  useEffect(() => {
    const handleClickCapture = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target as HTMLElement | null;
      const anchor = target?.closest('a');
      if (!anchor || !isInternalNavigation(anchor)) {
        return;
      }

      showLoader();
    };

    const handlePopState = () => {
      showLoader();
    };

    const originalPushState = window.history.pushState;
    const originalReplaceState = window.history.replaceState;

    const shouldTriggerForUrl = (url?: string | URL | null) => {
      if (!url) return false;
      const nextUrl = new URL(url.toString(), window.location.href);
      const currentUrl = new URL(window.location.href);
      return (
        nextUrl.origin === currentUrl.origin &&
        (nextUrl.pathname !== currentUrl.pathname || nextUrl.search !== currentUrl.search)
      );
    };

    window.history.pushState = function pushState(...args) {
      if (shouldTriggerForUrl(args[2])) {
        showLoader();
      }
      return originalPushState.apply(this, args);
    };

    window.history.replaceState = function replaceState(...args) {
      if (shouldTriggerForUrl(args[2])) {
        showLoader();
      }
      return originalReplaceState.apply(this, args);
    };

    document.addEventListener('click', handleClickCapture, true);
    window.addEventListener('popstate', handlePopState);

    return () => {
      document.removeEventListener('click', handleClickCapture, true);
      window.removeEventListener('popstate', handlePopState);
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
    };
  }, [showLoader]);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={`loader-mask fixed inset-0 bg-white transition-opacity ${
        isFading ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
      style={{ zIndex: 99999, transitionDuration: `${LEGACY_FADE_DURATION_MS}ms` }}
      aria-hidden="true"
    >
      <div
        id="loading"
        className="absolute inset-0 bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/img/tao-loader.gif')" }}
      />
    </div>
  );
}

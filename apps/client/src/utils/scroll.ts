export interface ScrollToSectionOptions {
  offset?: number;
  behavior?: ScrollBehavior;
}

export const DEFAULT_SCROLL_OFFSET = 110;

/**
 * Smoothly scrolls to an element by ID, accounting for sticky navbar height
 * and leveraging Lenis smooth scrolling when available.
 */
export function scrollToSection(
  id: string,
  options: ScrollToSectionOptions = {}
): boolean {
  if (typeof window === 'undefined') return false;

  const element = document.getElementById(id);
  if (!element) return false;

  const offset = options.offset ?? DEFAULT_SCROLL_OFFSET;
  const elementRect = element.getBoundingClientRect();
  const targetTop = elementRect.top + window.pageYOffset - offset;

  // If Lenis is active on window, use its smooth scroll method
  const lenis = (window as any).__lenis;
  if (lenis && typeof lenis.scrollTo === 'function') {
    lenis.scrollTo(targetTop, {
      offset: 0,
      duration: 1.2,
    });
    return true;
  }

  // Fallback to native window scrollTo
  window.scrollTo({
    top: Math.max(0, targetTop),
    behavior: options.behavior ?? 'smooth',
  });

  return true;
}

'use client';

import { useEffect, useRef, ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  variant?: 'fade-up' | 'fade-in' | 'fade-left' | 'fade-right' | 'scale';
  delay?: number;
  threshold?: number;
  once?: boolean;
  className?: string;
  as?: any;
}

const variantClassMap = {
  'fade-up': 'reveal',
  'fade-in': 'reveal',
  'fade-left': 'reveal-left',
  'fade-right': 'reveal-right',
  'scale': 'reveal-scale',
};

export default function ScrollReveal({
  children,
  variant = 'fade-up',
  delay = 0,
  threshold = 0.15,
  once = true,
  className = '',
  as: Tag = 'div',
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Apply revealed class with optional delay
          if (delay > 0) {
            setTimeout(() => {
              el.classList.add('revealed');
            }, delay);
          } else {
            el.classList.add('revealed');
          }
          if (once) observer.unobserve(el);
        } else if (!once) {
          el.classList.remove('revealed');
        }
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, threshold, once]);

  const baseClass = variantClassMap[variant] || 'reveal';

  return (

    <Tag
      ref={ref}
      className={`${baseClass} ${className}`}
      style={delay > 0 ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}

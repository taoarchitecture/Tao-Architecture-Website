'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Loader() {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    // Show loader on mount
    setLoading(true);
    
    // Simulate loading time (legacy behavior)
    // In a real app, you might want to tie this to actual resource loading if possible,
    // but for Next.js route transitions, a small delay helps smooth things out.
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div className={`loader-mask ${!loading ? 'hidden' : ''}`}>
      <div id="loading"></div>
    </div>
  );
}
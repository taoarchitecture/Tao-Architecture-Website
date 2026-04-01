'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Loader() {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    // Show loader on mount and when route changes (optional, but handled nicely here)
    setLoading(true);
    
    // Reduced duration for a snappy experience (was 1000ms)
    // The curtain animation itself takes 700ms (defined in globals.css)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div className={`loader-mask ${!loading ? 'exit' : ''}`}>
      <div className="loader-curtain-left"></div>
      <div className="loader-curtain-right"></div>
      
      {/* 
        The loading logo will fade out before the curtains fully open. 
        It sits behind the curtains (z-index: 1 vs z-index: 2 for curtains).
      */}
      <div 
        id="loading" 
        className={`transition-opacity duration-300 ${!loading ? 'opacity-0' : 'opacity-100'}`}
      ></div>
    </div>
  );
}
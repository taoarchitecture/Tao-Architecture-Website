'use client';

import React, { useState, useEffect } from 'react';

export function PlayerModal({ videoId, trigger }: { videoId: string; trigger: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Small delay to allow CSS transition to play
      setTimeout(() => setIsRendered(true), 10);
    } else {
      document.body.style.overflow = '';
      setIsRendered(false);
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsRendered(false);
    setTimeout(() => setIsOpen(false), 300); // Wait for fade out
  };

  return (
    <div className="h-full">
      <div onClick={() => setIsOpen(true)} className="h-full">{trigger}</div>
      {isOpen && (
        <div 
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12 transition-all duration-500 ${isRendered ? 'bg-black/90 backdrop-blur-sm opacity-100' : 'bg-black/0 backdrop-blur-none opacity-0'}`}
          onClick={handleClose}
        >
          <div 
            className={`relative w-full max-w-5xl bg-black aspect-video shadow-2xl transition-all duration-500 ease-out-expo ${isRendered ? 'scale-100 translate-y-0 opacity-100' : 'scale-[0.95] translate-y-8 opacity-0'}`}
          >
            <button
              onClick={handleClose}
              className="absolute -top-12 right-0 text-white hover:text-primary-red text-sm font-agenda uppercase tracking-widest flex items-center gap-2 transition-colors duration-300"
            >
              <span className="hidden md:inline">Close</span>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            <div className="w-full h-full border border-neutral-border/20">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

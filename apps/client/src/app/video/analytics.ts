'use client';

export const trackVideoPlay = (videoId: string, title: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'video_play', {
      event_category: 'Video',
      event_label: title,
      value: videoId,
    });
  }
};

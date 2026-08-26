'use client';

import { useRef, useEffect } from 'react';

/** Returns a ref to the current normalized scroll progress (0-1). */
export function useScrollProgress() {
  const ref = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      ref.current = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return ref;
}

'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState, useRef, ReactNode } from 'react';

/* Creative page transition: an orange curtain sweeps across the viewport
   on every route change AND on initial page load.
   - `is-exit`: curtain sweeps IN, covering the screen (orange gradient + spinner).
   - `is-enter`: curtain sweeps OUT, revealing the new page.
   The content cross-fades beneath the curtain. The top rail (hairline
   traveller) runs for an extra layer of motion. */
type Phase = 'idle' | 'exit' | 'enter';

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>('enter');
  const [displayChildren, setDisplayChildren] = useState<ReactNode>(null);
  const [isFirstMount, setIsFirstMount] = useState(true);
  const prevPathRef = useRef(pathname);

  useEffect(() => {
    if (isFirstMount) {
      setDisplayChildren(children);
      setIsFirstMount(false);
      return;
    }

    if (prevPathRef.current === pathname) return;
    prevPathRef.current = pathname;

    setPhase('exit');

    const exitTimer = setTimeout(() => {
      setDisplayChildren(children);
      requestAnimationFrame(() => setPhase('enter'));
    }, 220);

    return () => clearTimeout(exitTimer);
  }, [pathname, isFirstMount]);

  /* Safety net: drop back to idle even if animationend never fires. */
  useEffect(() => {
    if (phase !== 'enter') return;
    const t = setTimeout(() => setPhase('idle'), 500);
    return () => clearTimeout(t);
  }, [phase, displayChildren]);

  if (!displayChildren) return null;

  const live = phase === 'exit' || phase === 'enter';

  return (
    <div className="page-transition-wrapper">
      {/* Top hairline rail (original traveller) */}
      <div className={`page-transition-rail${live ? ' is-live' : ''}`} aria-hidden="true">
        <span className="rail-run">
          <span className="rail-seg" />
          <span className="rail-dot" />
        </span>
      </div>
      {/* Creative orange curtain overlay */}
      <div
        className={`page-transition-curtain${phase === 'exit' ? ' is-exit' : ''}${phase === 'enter' ? ' is-enter' : ''}`}
        aria-hidden="true"
      />
      <div
        className={`page-transition-content ${
          phase === 'exit' ? 'content-exit' : phase === 'enter' ? 'content-enter' : ''
        }`}
        onAnimationEnd={() => {
          if (phase === 'enter') setPhase('idle');
        }}
      >
        {displayChildren}
      </div>
    </div>
  );
}

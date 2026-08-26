'use client';

import { useEffect, useRef, useState, ReactNode, useCallback } from 'react';

/* ── Scroll Progress Bar ── */
function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-[3px]">
      <div
        className="scroll-progress-fill"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

/* ── Cursor Glow Effect ── */
function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    if (isTouchDevice) return;

    const handleMove = (e: MouseEvent) => {
      if (glowRef.current) {
        glowRef.current.style.left = `${e.clientX}px`;
        glowRef.current.style.top = `${e.clientY}px`;
        if (!isVisible) setIsVisible(true);
      }
    };
    const handleLeave = () => setIsVisible(false);
    const handleEnter = () => setIsVisible(true);

    document.addEventListener('mousemove', handleMove, { passive: true });
    document.addEventListener('mouseleave', handleLeave);
    document.addEventListener('mouseenter', handleEnter);
    return () => {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseleave', handleLeave);
      document.removeEventListener('mouseenter', handleEnter);
    };
  }, [isVisible, isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <div
      ref={glowRef}
      className={`cursor-glow ${isVisible ? 'cursor-glow-visible' : 'cursor-glow-hidden'}`}
      aria-hidden="true"
    />
  );
}

/* ── Smooth Scroll to Top ── */
function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <button
      onClick={scrollToTop}
      className={`scroll-to-top-btn ${visible ? 'scroll-to-top-visible' : ''}`}
      aria-label="بازگشت به بالا"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </button>
  );
}

/* ── Ripple Effect Handler ── */
function RippleHandler({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const btn = target.closest('[data-ripple]') as HTMLElement;
      if (!btn) return;

      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const size = Math.max(rect.width, rect.height) * 2;

      const ripple = document.createElement('span');
      ripple.className = 'ripple-effect';
      ripple.style.cssText = `left:${x}px;top:${y}px;width:${size}px;height:${size}px;`;
      btn.appendChild(ripple);

      ripple.addEventListener('animationend', () => ripple.remove());
    };

    container.addEventListener('click', handleClick);
    return () => container.removeEventListener('click', handleClick);
  }, []);

  return <div ref={containerRef}>{children}</div>;
}

/* ── Magnetic Effect Handler ── */
function MagneticHandler({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if ('ontouchstart' in window) return;

    const handleMove = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('[data-magnetic]') as HTMLElement;
      if (!target) return;

      const rect = target.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      const strength = parseFloat(target.dataset.magnetic || '0.3');

      target.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
      target.style.transition = 'transform 0.2s cubic-bezier(0.2, 0, 0, 1)';
    };

    const handleLeave = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('[data-magnetic]') as HTMLElement;
      if (target) {
        target.style.transform = 'translate(0, 0)';
      }
    };

    container.addEventListener('mousemove', handleMove, { passive: true });
    container.addEventListener('mouseleave', handleLeave);
    return () => {
      container.removeEventListener('mousemove', handleMove);
      container.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  return <div ref={containerRef}>{children}</div>;
}

/* ── Tilt Effect Handler ── */
function TiltHandler({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if ('ontouchstart' in window) return;

    const handleMove = (e: MouseEvent) => {
      const card = (e.target as HTMLElement).closest('[data-tilt]') as HTMLElement;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      const strength = parseFloat(card.dataset.tilt || '8');

      card.style.transform = `perspective(800px) rotateY(${x * strength}deg) rotateX(${-y * strength}deg) scale3d(1.02, 1.02, 1.02)`;
    };

    const handleLeave = (e: MouseEvent) => {
      const card = (e.target as HTMLElement).closest('[data-tilt]') as HTMLElement;
      if (card) {
        card.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)';
        card.style.transition = 'transform 0.5s cubic-bezier(0.2, 0, 0, 1)';
        setTimeout(() => { card.style.transition = ''; }, 500);
      }
    };

    container.addEventListener('mousemove', handleMove, { passive: true });
    container.addEventListener('mouseleave', handleLeave);
    return () => {
      container.removeEventListener('mousemove', handleMove);
      container.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  return <div ref={containerRef}>{children}</div>;
}

/* ── Main Provider ── */
export default function InteractiveProvider({ children }: { children: ReactNode }) {
  return (
    <>
      <ScrollProgressBar />
      <CursorGlow />
      <ScrollToTop />
      <RippleHandler>
        <MagneticHandler>
          <TiltHandler>
            {children}
          </TiltHandler>
        </MagneticHandler>
      </RippleHandler>
    </>
  );
}

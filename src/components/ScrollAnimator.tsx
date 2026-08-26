'use client';

import React, { useEffect, useRef, useState, ReactNode } from 'react';

type AnimationType = 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'scale-up' | 'scale-in' | 'bounce-in' | 'rotate-in';

interface ScrollAnimatorProps {
  children: ReactNode;
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
  once?: boolean;
  stagger?: boolean;
  staggerDelay?: number;
}

const animationClasses: Record<AnimationType, string> = {
  'fade-up': 'scroll-hidden',
  'fade-down': 'scroll-hidden',
  'fade-left': 'scroll-hidden-left',
  'fade-right': 'scroll-hidden-right',
  'scale-up': 'scroll-hidden-scale',
  'scale-in': 'scroll-hidden-scale',
  'bounce-in': 'scroll-hidden-scale',
  'rotate-in': 'scroll-hidden-scale',
};

const animationStyles: Record<AnimationType, { hidden: React.CSSProperties; visible: React.CSSProperties }> = {
  'fade-up': {
    hidden: { opacity: 0, transform: 'translateY(40px)' },
    visible: { opacity: 1, transform: 'translateY(0)' },
  },
  'fade-down': {
    hidden: { opacity: 0, transform: 'translateY(-30px)' },
    visible: { opacity: 1, transform: 'translateY(0)' },
  },
  'fade-left': {
    hidden: { opacity: 0, transform: 'translateX(-40px)' },
    visible: { opacity: 1, transform: 'translateX(0)' },
  },
  'fade-right': {
    hidden: { opacity: 0, transform: 'translateX(40px)' },
    visible: { opacity: 1, transform: 'translateX(0)' },
  },
  'scale-up': {
    hidden: { opacity: 0, transform: 'scale(0.6)' },
    visible: { opacity: 1, transform: 'scale(1)' },
  },
  'scale-in': {
    hidden: { opacity: 0, transform: 'scale(0.85)' },
    visible: { opacity: 1, transform: 'scale(1)' },
  },
  'bounce-in': {
    hidden: { opacity: 0, transform: 'scale(0.3)' },
    visible: { opacity: 1, transform: 'scale(1)' },
  },
  'rotate-in': {
    hidden: { opacity: 0, transform: 'rotate(-10deg) scale(0.9)' },
    visible: { opacity: 1, transform: 'rotate(0deg) scale(1)' },
  },
};

export default function ScrollAnimator({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 600,
  className = '',
  threshold = 0.1,
  once = true,
}: ScrollAnimatorProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          if (once) observer.unobserve(element);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [delay, threshold, once]);

  const style = isVisible
    ? { ...animationStyles[animation].visible, transitionDuration: `${duration}ms`, transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }
    : { ...animationStyles[animation].hidden, transitionDuration: `${duration}ms`, transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' };

  return (
    <div
      ref={ref}
      className={className}
      style={{ ...style, transitionProperty: 'opacity, transform' }}
    >
      {children}
    </div>
  );
}

/* Stagger container: children animate one by one */
export function StaggerContainer({
  children,
  className = '',
  staggerDelay = 80,
  threshold = 0.05,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  threshold?: number;
  once?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(element);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin: '0px 0px -20px 0px' }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, once]);

  return (
    <div ref={ref} className={className}>
      {React.Children.map(children, (child, index) => (
        <div
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(25px)',
            transition: `opacity 0.5s ease-out ${index * staggerDelay}ms, transform 0.5s ease-out ${index * staggerDelay}ms`,
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}

/* Animated counter */
export function AnimatedCounter({
  value,
  duration = 2000,
  className = '',
  style,
}: {
  value: string;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const [displayValue, setDisplayValue] = useState(value);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;

          // Extract numeric value
          const numericMatch = value.match(/(\d[\d,]*)/);
          if (!numericMatch) return;

          const numStr = numericMatch[1].replace(/,/g, '');
          const endNum = parseInt(numStr, 10);
          if (isNaN(endNum)) return;

          const prefix = value.substring(0, value.indexOf(numericMatch[1]));
          const suffix = value.substring(value.indexOf(numericMatch[1]) + numericMatch[1].length);

          const startTime = performance.now();
          const step = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(eased * endNum);
            setDisplayValue(`${prefix}${current.toLocaleString('fa-IR')}${suffix}`);
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [value, duration]);

  return <span ref={ref} className={className} style={style}>{displayValue}</span>;
}

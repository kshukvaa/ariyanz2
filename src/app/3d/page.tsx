'use client';

import dynamic from 'next/dynamic';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const Scene = dynamic(() => import('@/components/3d/Scene'), { ssr: false });

const SECTION_NAMES = [
  'موضوعات',
  'شرکا',
  'محصولات',
  'مسیر یادگیری',
  'پیشنهاد ویژه',
  'اخبار',
  'نظرات',
  'مقالات',
  'تابلوی افتخارات',
  'چرا آریاز',
  'مدرسان',
];

export default function ThreeDHome() {
  const scrollProgress = useScrollProgress();
  const [activeSection, setActiveSection] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const p = scrollProgress.current;
      const idx = Math.min(SECTION_NAMES.length - 1, Math.floor(p * SECTION_NAMES.length));
      setActiveSection(idx);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [scrollProgress]);

  return (
    <div className="relative w-full" style={{ height: '1000vh' }}>
      {/* Fixed 3D canvas */}
      <div className="fixed inset-0 z-0">
        <Scene scrollProgress={scrollProgress} />
      </div>

      {/* Loading overlay */}
      {!loaded && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#FDF7F0]">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full border-3 border-orange-200 border-t-orange-500 animate-spin" />
            <p className="text-sm font-bold text-[#1C1816]">در حال بارگذاری تجربه سه‌بعدی...</p>
          </div>
        </div>
      )}

      {/* Set loaded after a beat */}
      <LoadTrigger onLoaded={() => setLoaded(true)} />

      {/* UI Overlay */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 pointer-events-none">
        <div className="flex items-center gap-2 bg-white/80 backdrop-blur-md rounded-full px-4 py-2 border border-orange-100">
          {SECTION_NAMES.map((name, i) => (
            <button
              key={i}
              onClick={() => {
                const target = (i / SECTION_NAMES.length) * (document.documentElement.scrollHeight - window.innerHeight);
                window.scrollTo({ top: target, behavior: 'smooth' });
              }}
              className={`pointer-events-auto w-2 h-2 rounded-full transition-all ${
                i === activeSection ? 'bg-orange-500 w-6' : 'bg-gray-300 hover:bg-orange-300'
              }`}
              aria-label={name}
            />
          ))}
        </div>
      </div>

      {/* Section name indicator */}
      <div className="fixed top-20 left-1/2 -translate-x-1/2 z-40 pointer-events-none">
        <div className="bg-white/70 backdrop-blur-md rounded-full px-5 py-2 border border-orange-100">
          <span className="text-sm font-black text-[#1C1816]">
            {SECTION_NAMES[activeSection]}
          </span>
        </div>
      </div>

      {/* Back to regular homepage */}
      <div className="fixed top-6 right-6 z-40">
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md text-[#1C1816] text-xs font-bold px-4 py-2 rounded-full border border-gray-200 hover:bg-white transition-colors"
        >
          بازگشت به خانه
        </Link>
      </div>

      {/* Scroll hint */}
      <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-40 pointer-events-none animate-bounce">
        <span className="text-xs font-bold text-[#1C1816]/60">برای تجربه اسکرول کنید</span>
      </div>
    </div>
  );
}

function LoadTrigger({ onLoaded }: { onLoaded: () => void }) {
  useEffect(() => {
    const t = setTimeout(onLoaded, 1500);
    return () => clearTimeout(t);
  }, [onLoaded]);
  return null;
}

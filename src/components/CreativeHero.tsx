'use client';

import React, { useState, useEffect, useRef, CSSProperties } from 'react';
import { Users, ArrowLeft } from 'lucide-react';

/* ---------------------------------------------------------------
   Props Interface
---------------------------------------------------------------- */
interface CreativeHeroProps {
  variant: 'orbital' | 'geometric' | 'cards' | 'waves' | 'minimal' | 'split' | 'gradient';
  title: string[];
  subtitle: string;
  keywords: string;
  accentColor: string;
  accentBg: string;
  icon: React.ComponentType<any>;
  features: { label: string; desc: string; icon: React.ComponentType<any> }[];
  stats?: { value: string; label: string }[];
}

/* ---------------------------------------------------------------
   Shared Sub-components
---------------------------------------------------------------- */

function ManSilhouette() {
  return (
    <div className="relative animate-hero-breathing">
      <svg width="120" height="220" viewBox="0 0 120 220" className="drop-shadow-2xl">
        <ellipse cx="60" cy="28" rx="18" ry="22" fill="#1E293B" />
        <rect x="52" y="48" width="16" height="12" rx="4" fill="#1E293B" />
        <path d="M30,60 Q30,58 40,56 L52,58 L52,70 L68,70 L68,58 L80,56 Q90,58 90,60 L95,130 Q95,135 90,138 L75,142 L75,180 Q75,185 70,185 L50,185 Q45,185 45,180 L45,142 L30,138 Q25,135 25,130 Z" fill="#1E293B" />
        <path d="M52,58 L60,90 L68,58" fill="none" stroke="#334155" strokeWidth="1.5" />
        <path d="M48,62 L56,88" fill="none" stroke="#475569" strokeWidth="0.8" />
        <path d="M72,62 L64,88" fill="none" stroke="#475569" strokeWidth="0.8" />
        <path d="M58,70 L60,110 L62,70 Z" fill="#F97316" opacity="0.9" />
        <path d="M57,68 L60,72 L63,68 Z" fill="#EA580C" />
        <path d="M52,58 L56,65 L60,60 L64,65 L68,58" fill="white" opacity="0.15" />
        <path d="M30,60 L18,100 L22,102 L34,68" fill="#1E293B" />
        <path d="M90,60 L102,100 L98,102 L86,68" fill="#1E293B" />
        <ellipse cx="18" cy="103" rx="6" ry="5" fill="#D4A574" opacity="0.7" />
        <ellipse cx="102" cy="103" rx="6" ry="5" fill="#D4A574" opacity="0.7" />
        <path d="M45,142 L42,210 Q42,215 47,215 L56,215 L56,142" fill="#0F172A" />
        <path d="M75,142 L78,210 Q78,215 73,215 L64,215 L64,142" fill="#0F172A" />
        <path d="M42,210 L38,218 Q38,220 42,220 L56,220 L56,215" fill="#1E293B" />
        <path d="M78,210 L82,218 Q82,220 78,220 L64,220 L64,215" fill="#1E293B" />
        <rect x="72" y="74" width="8" height="4" rx="1" fill="#F97316" opacity="0.4" />
      </svg>
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-32 h-4 rounded-full blur-md" style={{ backgroundColor: 'rgba(17,24,39,0.1)' }}></div>
    </div>
  );
}

function CTAButtons({ accentColor }: { accentColor: string }) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <a
        href="#"
        className="relative overflow-hidden flex items-center gap-2.5 text-white px-7 py-4 rounded-xl font-bold text-sm transition-all duration-300 hover:-translate-y-0.5 group"
        style={{ backgroundColor: accentColor }}
      >
        <span className="relative z-10 flex items-center gap-2.5">
          <Users size={18} />
          <span>دریافت مشاوره رایگان</span>
        </span>
        <span
          className="absolute inset-0 transition-transform duration-500 group-hover:translate-x-0"
          style={{ backgroundColor: 'rgba(255,255,255,0.2)', transform: 'translateX(-100%)' }}
        ></span>
      </a>
      <a
        href="#"
        className="flex items-center gap-2 text-gray-800 px-7 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 hover:text-white group"
        style={{ border: '2px solid #1E293B' }}
        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#1E293B'; }}
        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
      >
        <span>شروع رایگان</span>
        <ArrowLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-1" />
      </a>
    </div>
  );
}

function StatsRow({ stats, textColor, loaded }: { stats: { value: string; label: string }[]; textColor?: string; loaded: boolean }) {
  const color = textColor || '#64748B';
  return (
    <div
      className="flex flex-wrap justify-center gap-8"
      style={{
        opacity: loaded ? 1 : 0,
        transform: loaded ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.7s',
      }}
    >
      {stats.map((s, i) => (
        <div key={i} className="text-center">
          <div className="text-2xl font-black" style={{ color: textColor || '#0F172A' }}>{s.value}</div>
          <div className="text-sm mt-1" style={{ color }}>{s.label}</div>
        </div>
      ))}
    </div>
  );
}

/* helper: staggered fade-in style object */
function fadeStyle(loaded: boolean, delay: number, direction: 'up' | 'right' = 'up'): CSSProperties {
  const tx = direction === 'right' ? 'translateX(30px)' : 'translateY(25px)';
  const txDone = direction === 'right' ? 'translateX(0)' : 'translateY(0)';
  return {
    opacity: loaded ? 1 : 0,
    transform: loaded ? txDone : tx,
    transition: `all 0.65s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
  };
}

/* ----------------------------------------------------------------
   1. Orbital Variant
---------------------------------------------------------------- */
function OrbitalVariant(props: CreativeHeroProps) {
  const { title, subtitle, keywords, accentColor, accentBg, icon: MainIcon, features, stats } = props;
  const [loaded, setLoaded] = useState(false);
  const [hoveredSat, setHoveredSat] = useState<number | null>(null);
  const orbitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  const orbitRadius = 155;
  const centerX = 200;
  const centerY = 190;

  /* use up to 6 features as satellites */
  const satellites = features.slice(0, 6).map((f, i) => {
    const angle = -90 + i * 60;
    return { ...f, angle };
  });

  return (
    <section
      className="relative overflow-hidden flex items-center"
      style={{ backgroundColor: '#F5F7FA', minHeight: '80vh' }}
    >
      {/* background gradient orbs */}
      <div
        className="absolute top-20 right-1/4 rounded-full blur-3xl pointer-events-none animate-hero-bg-float-1"
        style={{ width: '500px', height: '500px', backgroundColor: 'rgba(251,191,36,0.12)', transformOrigin: 'center' }}
      ></div>
      <div
        className="absolute bottom-10 left-1/4 rounded-full blur-3xl pointer-events-none animate-hero-bg-float-2"
        style={{ width: '400px', height: '400px', backgroundColor: 'rgba(219,234,254,0.15)', transformOrigin: 'center' }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 w-full">
        <div className="grid lg:grid-cols-2 gap-8 xl:gap-16 items-center">

          {/* -- TEXT CONTENT -- */}
          <div className="relative z-10">
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6"
              style={{
                color: '#0F172A',
                ...fadeStyle(loaded, 0, 'right'),
              }}
            >
              <span className="inline-block ml-2 text-5xl lg:text-6xl font-black leading-none" style={{ color: accentColor }}>&laquo;</span>
              {title[0]}
              {title.length > 1 && (
                <>
                  <br />
                  <span style={{
                    backgroundImage: `linear-gradient(to left, ${accentColor}, #EA580C)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>
                    {title[1]}
                  </span>
                </>
              )}
            </h1>

            <div
              className="w-14 h-1 rounded-full mb-6"
              style={{
                backgroundColor: accentColor,
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'scaleX(1)' : 'scaleX(0)',
                transformOrigin: 'right',
                transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
              }}
            ></div>

            <p
              className="text-base sm:text-lg leading-8 mb-5 max-w-lg"
              style={{ color: '#475569', ...fadeStyle(loaded, 0.35) }}
            >
              {subtitle}
            </p>

            <p
              className="text-sm leading-7 mb-10"
              style={{ color: '#64748B', ...fadeStyle(loaded, 0.45) }}
            >
              {keywords}
              <br />
              <span style={{ color: '#475569', fontWeight: 500 }}>همه در کنار شما هستند</span>
            </p>

            <div style={fadeStyle(loaded, 0.55)}>
              <CTAButtons accentColor={accentColor} />
            </div>
          </div>

          {/* -- ILLUSTRATION -- */}
          <div
            className="relative"
            style={{
              height: '480px',
              opacity: loaded ? 1 : 0,
              transition: 'opacity 0.8s ease 0.2s',
            }}
          >
            <div ref={orbitRef} className="absolute inset-0 flex items-center justify-center">

              {/* orbit rings */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 400">
                <circle
                  cx={centerX} cy={centerY} r={orbitRadius}
                  fill="none"
                  stroke="#E2E8F0"
                  strokeWidth="1.5"
                  strokeDasharray="6 8"
                  className="animate-hero-orbit"
                  style={{ transformOrigin: `${centerX}px ${centerY}px` }}
                />
                <circle
                  cx={centerX} cy={centerY} r={orbitRadius * 0.6}
                  fill="none"
                  stroke={accentColor}
                  strokeWidth="1"
                  strokeDasharray="4 10"
                  className="animate-hero-orbit-reverse"
                  style={{ transformOrigin: `${centerX}px ${centerY}px`, opacity: 0.4 }}
                />
                {/* animated dots on path */}
                {Array.from({ length: 12 }).map((_, i) => {
                  const angle = (i / 12) * 2 * Math.PI;
                  const x = centerX + (orbitRadius + 8) * Math.cos(angle);
                  const y = centerY + (orbitRadius + 8) * Math.sin(angle);
                  return (
                    <circle key={i} cx={x} cy={y} fill={i % 2 === 0 ? accentColor : '#2563EB'} opacity="0.4">
                      <animate attributeName="opacity" values="0.3;0.8;0.3" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
                      <animate attributeName="r" values="2.5;4;2.5" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
                    </circle>
                  );
                })}
              </svg>

              {/* central core */}
              <div
                className="absolute rounded-full bg-white flex items-center justify-center z-20 animate-hero-pulse-glow"
                style={{
                  width: '90px',
                  height: '90px',
                  left: `${centerX / 4}px`,
                  top: `${centerY / 1.3}px`,
                  opacity: loaded ? 1 : 0,
                  animation: loaded ? 'heroPulseGlow 3s ease-in-out infinite, heroScaleIn 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards' : 'none',
                }}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg"
                  style={{ background: `linear-gradient(135deg, ${accentColor}, #2563EB)` }}
                >
                  <MainIcon size={28} color="white" />
                </div>
              </div>

              {/* pulse ring */}
              <div
                className="absolute rounded-full pointer-events-none z-10"
                style={{
                  width: '120px',
                  height: '120px',
                  left: `${centerX / 4 - 15}px`,
                  top: `${centerY / 1.3 - 15}px`,
                  border: `2px solid ${accentColor}4D`,
                  animation: 'heroPulseCore 3s ease-in-out infinite',
                }}
              ></div>

              {/* man silhouette */}
              <div
                className="absolute z-10"
                style={{
                  left: '50%',
                  top: '42%',
                  transform: 'translate(-50%, -50%)',
                  opacity: loaded ? 1 : 0,
                  transition: 'opacity 0.8s ease 0.4s',
                }}
              >
                <ManSilhouette />
              </div>

              {/* satellite nodes */}
              {satellites.map((sat, i) => {
                const angleRad = (sat.angle * Math.PI) / 180;
                const x = centerX + orbitRadius * Math.cos(angleRad);
                const y = centerY + orbitRadius * Math.sin(angleRad);
                const Icon = sat.icon;
                const isHovered = hoveredSat === i;

                return (
                  <div
                    key={i}
                    className="absolute z-30"
                    style={{
                      left: `${(x / 400) * 100}%`,
                      top: `${(y / 400) * 100}%`,
                      transform: 'translate(-50%, -50%)',
                      opacity: loaded ? 1 : 0,
                      animation: loaded
                        ? `heroSatellitePop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${0.5 + i * 0.1}s forwards`
                        : 'none',
                    }}
                    onMouseEnter={() => setHoveredSat(i)}
                    onMouseLeave={() => setHoveredSat(null)}
                  >
                    <div
                      className="flex flex-col items-center transition-all duration-300"
                      style={{ transform: isHovered ? 'scale(1.1) translateY(-4px)' : 'scale(1) translateY(0)' }}
                    >
                      <div
                        className="rounded-full bg-white flex items-center justify-center transition-all duration-300"
                        style={{
                          width: '72px',
                          height: '72px',
                          boxShadow: isHovered
                            ? `0 10px 30px ${accentColor}25`
                            : '0 4px 15px rgba(0,0,0,0.06)',
                        }}
                      >
                        <Icon size={28} style={{ color: accentColor, transition: 'transform 0.3s', transform: isHovered ? 'scale(1.1)' : 'scale(1)' }} />
                      </div>
                      <p className="text-xs font-bold mt-2 whitespace-nowrap" style={{ color: '#374151' }}>{sat.label}</p>
                      <p className="whitespace-nowrap" style={{ color: '#9CA3AF', fontSize: '9px' }}>{sat.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* stats */}
        {stats && stats.length > 0 && (
          <div className="mt-10">
            <StatsRow stats={stats} loaded={loaded} />
          </div>
        )}
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------
   2. Geometric Variant
---------------------------------------------------------------- */
function GeometricVariant(props: CreativeHeroProps) {
  const { title, subtitle, keywords, accentColor, accentBg, icon: MainIcon, features, stats } = props;
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      className="relative overflow-hidden flex items-center justify-center"
      style={{ backgroundColor: accentBg, minHeight: '80vh' }}
    >
      {/* geometric shapes background */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{ width: '500px', height: '500px', top: '-100px', right: '-120px', backgroundColor: `${accentColor}15` }}
      ></div>
      <div
        className="absolute rounded-full pointer-events-none"
        style={{ width: '350px', height: '350px', bottom: '-80px', left: '-100px', backgroundColor: `${accentColor}10` }}
      ></div>
      <div
        className="absolute pointer-events-none"
        style={{
          width: '300px', height: '300px', top: '50px', left: '10%',
          backgroundColor: `${accentColor}08`,
          transform: 'rotate(35deg)',
          borderRadius: '24px',
        }}
      ></div>
      <div
        className="absolute pointer-events-none"
        style={{
          width: '200px', height: '200px', bottom: '60px', right: '15%',
          backgroundColor: `${accentColor}12`,
          transform: 'rotate(-20deg)',
          borderRadius: '16px',
        }}
      ></div>
      <div
        className="absolute rounded-full pointer-events-none"
        style={{ width: '180px', height: '180px', top: '30%', left: '50%', backgroundColor: `${accentColor}0A` }}
      ></div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* icon */}
        <div
          className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-8"
          style={{
            backgroundColor: `${accentColor}18`,
            ...fadeStyle(loaded, 0),
          }}
        >
          <MainIcon size={36} style={{ color: accentColor }} />
        </div>

        {/* title */}
        <h1
          className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6"
          style={{ color: '#0F172A', ...fadeStyle(loaded, 0.1) }}
        >
          {title.map((line, i) => (
            <React.Fragment key={i}>
              {i > 0 && <br />}
              {i === title.length - 1 ? (
                <span style={{
                  backgroundImage: `linear-gradient(to left, ${accentColor}, #EA580C)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>{line}</span>
              ) : line}
            </React.Fragment>
          ))}
        </h1>

        {/* accent line */}
        <div
          className="w-20 h-1 rounded-full mx-auto mb-6"
          style={{
            backgroundColor: accentColor,
            ...fadeStyle(loaded, 0.2),
          }}
        ></div>

        {/* subtitle */}
        <p
          className="text-lg leading-8 mb-4 max-w-2xl mx-auto"
          style={{ color: '#475569', ...fadeStyle(loaded, 0.25) }}
        >
          {subtitle}
        </p>

        <p
          className="text-sm leading-7 mb-10 max-w-xl mx-auto"
          style={{ color: '#64748B', ...fadeStyle(loaded, 0.3) }}
        >
          {keywords}
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap justify-center gap-4 mb-14" style={fadeStyle(loaded, 0.4)}>
          <CTAButtons accentColor={accentColor} />
        </div>

        {/* feature icons row */}
        <div
          className="flex flex-wrap justify-center gap-6 mb-12"
          style={fadeStyle(loaded, 0.5)}
        >
          {features.map((f, i) => {
            const FIcon = f.icon;
            return (
              <div
                key={i}
                className="flex flex-col items-center gap-2 transition-transform duration-300 hover:-translate-y-1"
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300"
                  style={{ backgroundColor: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}
                >
                  <FIcon size={26} style={{ color: accentColor }} />
                </div>
                <span className="text-sm font-bold" style={{ color: '#374151' }}>{f.label}</span>
              </div>
            );
          })}
        </div>

        {/* stats */}
        {stats && stats.length > 0 && (
          <StatsRow stats={stats} loaded={loaded} />
        )}
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------
   3. Cards Variant
---------------------------------------------------------------- */
function CardsVariant(props: CreativeHeroProps) {
  const { title, subtitle, keywords, accentColor, accentBg, icon: MainIcon, features, stats } = props;
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      className="relative overflow-hidden flex items-center justify-center"
      style={{ backgroundColor: accentBg, minHeight: '80vh' }}
    >
      {/* floating tilted background cards */}
      <div
        className="absolute rounded-2xl pointer-events-none"
        style={{
          width: '200px', height: '260px', top: '5%', right: '5%',
          backgroundColor: 'white',
          transform: 'rotate(-8deg)',
          boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
          opacity: 0.5,
        }}
      ></div>
      <div
        className="absolute rounded-2xl pointer-events-none"
        style={{
          width: '180px', height: '220px', top: '15%', left: '8%',
          backgroundColor: 'white',
          transform: 'rotate(12deg)',
          boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
          opacity: 0.4,
        }}
      ></div>
      <div
        className="absolute rounded-2xl pointer-events-none"
        style={{
          width: '160px', height: '200px', bottom: '10%', right: '12%',
          backgroundColor: `${accentColor}10`,
          transform: 'rotate(6deg)',
          boxShadow: '0 8px 30px rgba(0,0,0,0.04)',
          opacity: 0.6,
        }}
      ></div>
      <div
        className="absolute rounded-2xl pointer-events-none"
        style={{
          width: '140px', height: '180px', bottom: '20%', left: '15%',
          backgroundColor: 'white',
          transform: 'rotate(-15deg)',
          boxShadow: '0 8px 30px rgba(0,0,0,0.05)',
          opacity: 0.35,
        }}
      ></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <div
          className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6"
          style={{ backgroundColor: accentColor, ...fadeStyle(loaded, 0) }}
        >
          <MainIcon size={30} color="white" />
        </div>

        <h1
          className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-5"
          style={{ color: '#0F172A', ...fadeStyle(loaded, 0.1) }}
        >
          {title.map((line, i) => (
            <React.Fragment key={i}>
              {i > 0 && <br />}
              {i === title.length - 1 ? (
                <span style={{ color: accentColor }}>{line}</span>
              ) : line}
            </React.Fragment>
          ))}
        </h1>

        <p
          className="text-lg leading-8 mb-3 max-w-2xl mx-auto"
          style={{ color: '#475569', ...fadeStyle(loaded, 0.2) }}
        >
          {subtitle}
        </p>

        <p
          className="text-sm leading-7 mb-10 max-w-xl mx-auto"
          style={{ color: '#64748B', ...fadeStyle(loaded, 0.25) }}
        >
          {keywords}
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-14" style={fadeStyle(loaded, 0.3)}>
          <CTAButtons accentColor={accentColor} />
        </div>

        {/* 3-column feature grid */}
        <div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto"
          style={fadeStyle(loaded, 0.4)}
        >
          {features.map((f, i) => {
            const FIcon = f.icon;
            return (
              <div
                key={i}
                className="rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-1 cursor-default"
                style={{
                  backgroundColor: 'white',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3"
                  style={{ backgroundColor: `${accentColor}15` }}
                >
                  <FIcon size={24} style={{ color: accentColor }} />
                </div>
                <div className="font-bold mb-1" style={{ color: '#1E293B' }}>{f.label}</div>
                <div className="text-sm" style={{ color: '#64748B' }}>{f.desc}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------
   4. Waves Variant
---------------------------------------------------------------- */
function WavesVariant(props: CreativeHeroProps) {
  const { title, subtitle, keywords, accentColor, accentBg, icon: MainIcon, features, stats } = props;
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  /* build 3 wave SVG paths with different opacities of accentColor */
  const waveColor1 = accentColor;
  const waveColor2 = accentColor + 'CC';
  const waveColor3 = accentColor + '99';

  return (
    <section
      className="relative overflow-hidden flex items-center justify-center"
      style={{ backgroundColor: accentBg, minHeight: '80vh' }}
    >
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center w-full pb-48">
        <div
          className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6"
          style={{ backgroundColor: accentColor, ...fadeStyle(loaded, 0) }}
        >
          <MainIcon size={30} color="white" />
        </div>

        <h1
          className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-5"
          style={{ color: '#0F172A', ...fadeStyle(loaded, 0.1) }}
        >
          {title.map((line, i) => (
            <React.Fragment key={i}>
              {i > 0 && <br />}
              {i === title.length - 1 ? (
                <span style={{ color: accentColor }}>{line}</span>
              ) : line}
            </React.Fragment>
          ))}
        </h1>

        <p
          className="text-lg leading-8 mb-3 max-w-2xl mx-auto"
          style={{ color: '#475569', ...fadeStyle(loaded, 0.2) }}
        >
          {subtitle}
        </p>

        <p
          className="text-sm leading-7 mb-10 max-w-xl mx-auto"
          style={{ color: '#64748B', ...fadeStyle(loaded, 0.25) }}
        >
          {keywords}
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-14" style={fadeStyle(loaded, 0.3)}>
          <CTAButtons accentColor={accentColor} />
        </div>

        {/* feature grid */}
        <div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto mb-12"
          style={fadeStyle(loaded, 0.4)}
        >
          {features.map((f, i) => {
            const FIcon = f.icon;
            return (
              <div
                key={i}
                className="rounded-2xl p-5 text-center transition-all duration-300 hover:-translate-y-1"
                style={{ backgroundColor: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}
              >
                <FIcon size={24} style={{ color: accentColor, marginBottom: '8px' }} />
                <div className="font-bold" style={{ color: '#1E293B' }}>{f.label}</div>
                <div className="text-sm mt-1" style={{ color: '#64748B' }}>{f.desc}</div>
              </div>
            );
          })}
        </div>

        {/* stats */}
        {stats && stats.length > 0 && (
          <StatsRow stats={stats} loaded={loaded} />
        )}
      </div>

      {/* wave layers at bottom */}
      <svg
        className="absolute bottom-0 left-0 w-full pointer-events-none"
        style={{ height: '250px' }}
        viewBox="0 0 1440 250"
        preserveAspectRatio="none"
      >
        <path
          d="M0,120 C360,200 720,40 1080,120 C1260,160 1380,100 1440,120 L1440,250 L0,250 Z"
          fill={waveColor3}
          opacity="0.2"
        />
        <path
          d="M0,160 C300,80 600,200 900,120 C1100,70 1300,160 1440,140 L1440,250 L0,250 Z"
          fill={waveColor2}
          opacity="0.15"
        />
        <path
          d="M0,190 C240,140 480,220 720,170 C960,120 1200,200 1440,180 L1440,250 L0,250 Z"
          fill={waveColor1}
          opacity="0.1"
        />
      </svg>
    </section>
  );
}

/* ----------------------------------------------------------------
   5. Minimal Variant
---------------------------------------------------------------- */
function MinimalVariant(props: CreativeHeroProps) {
  const { title, subtitle, keywords, accentColor, accentBg, icon: MainIcon, features, stats } = props;
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      className="relative overflow-hidden flex items-center justify-center"
      style={{ backgroundColor: 'white', minHeight: '80vh' }}
    >
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center py-20">
        <div
          style={{
            ...fadeStyle(loaded, 0),
            marginBottom: '60px',
          }}
        >
          <MainIcon size={40} style={{ color: accentColor }} />
        </div>

        <h1
          className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-8"
          style={{ color: '#0F172A', ...fadeStyle(loaded, 0.1) }}
        >
          {title.map((line, i) => (
            <React.Fragment key={i}>
              {i > 0 && <br />}
              {line}
            </React.Fragment>
          ))}
        </h1>

        {/* colored line */}
        <div
          className="mx-auto mb-8"
          style={{
            width: '60px',
            height: '3px',
            backgroundColor: accentColor,
            borderRadius: '9999px',
            ...fadeStyle(loaded, 0.2),
          }}
        ></div>

        <p
          className="text-lg leading-9 mb-3 max-w-2xl mx-auto"
          style={{ color: '#475569', ...fadeStyle(loaded, 0.25) }}
        >
          {subtitle}
        </p>

        <p
          className="text-sm leading-8 mb-14 max-w-lg mx-auto"
          style={{ color: '#94A3B8', ...fadeStyle(loaded, 0.3) }}
        >
          {keywords}
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-20" style={fadeStyle(loaded, 0.35)}>
          <CTAButtons accentColor={accentColor} />
        </div>

        {/* features horizontal row */}
        <div
          className="flex flex-wrap justify-center gap-10"
          style={fadeStyle(loaded, 0.45)}
        >
          {features.map((f, i) => {
            const FIcon = f.icon;
            return (
              <div key={i} className="flex items-center gap-3 transition-transform duration-300 hover:-translate-y-0.5">
                <div
                  className="flex items-center justify-center rounded-full"
                  style={{
                    width: '48px',
                    height: '48px',
                    backgroundColor: `${accentColor}12`,
                  }}
                >
                  <FIcon size={22} style={{ color: accentColor }} />
                </div>
                <div className="text-right">
                  <div className="font-bold text-sm" style={{ color: '#1E293B' }}>{f.label}</div>
                  <div className="text-xs" style={{ color: '#94A3B8' }}>{f.desc}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------
   6. Split Variant
---------------------------------------------------------------- */
function SplitVariant(props: CreativeHeroProps) {
  const { title, subtitle, keywords, accentColor, accentBg, icon: MainIcon, features, stats } = props;
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  const halfFeatures = Math.ceil(features.length / 2);
  const rightFeatures = features.slice(0, halfFeatures);
  const leftFeatures = features.slice(halfFeatures);

  return (
    <section
      className="relative overflow-hidden"
      style={{ minHeight: '80vh' }}
    >
      <div className="flex flex-col lg:flex-row" style={{ minHeight: '80vh' }}>
        {/* Left half -- accent color with white text */}
        <div
          className="flex-1 flex items-center justify-center p-8 lg:p-12"
          style={{ backgroundColor: accentColor }}
        >
          <div className="max-w-lg text-center">
            <div
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'translateY(0)' : 'translateY(25px)',
                transition: 'all 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
              }}
            >
              <MainIcon size={40} color="white" />
            </div>
            <h2
              className="text-2xl sm:text-3xl font-black mt-6 mb-4"
              style={{
                color: 'white',
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'translateY(0)' : 'translateY(25px)',
                transition: 'all 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
              }}
            >
              {title[0]}
            </h2>
            <p
              className="leading-7 mb-8"
              style={{
                color: 'rgba(255,255,255,0.85)',
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
              }}
            >
              {subtitle}
            </p>

            {/* right-side features (straddling) */}
            <div
              className="space-y-4"
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.4s',
              }}
            >
              {rightFeatures.map((f, i) => {
                const FIcon = f.icon;
                return (
                  <div key={i} className="flex items-center gap-3 transition-all duration-300 hover:translate-x-1">
                    <div
                      className="flex items-center justify-center rounded-full flex-shrink-0"
                      style={{ width: '40px', height: '40px', backgroundColor: 'rgba(255,255,255,0.2)' }}
                    >
                      <FIcon size={20} color="white" />
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-sm" style={{ color: 'white' }}>{f.label}</div>
                      <div className="text-xs" style={{ color: 'rgba(255,255,255,0.75)' }}>{f.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right half -- white with dark text */}
        <div
          className="flex-1 flex items-center justify-center p-8 lg:p-12"
          style={{ backgroundColor: 'white' }}
        >
          <div className="max-w-lg text-center">
            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight mb-5"
              style={{
                color: '#0F172A',
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'translateY(0)' : 'translateY(25px)',
                transition: 'all 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.15s',
              }}
            >
              {title.length > 1 && title.slice(1).map((line, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <br />}
                  <span style={{ color: accentColor }}>{line}</span>
                </React.Fragment>
              ))}
            </h1>

            <p
              className="text-sm leading-7 mb-10"
              style={{
                color: '#64748B',
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
              }}
            >
              {keywords}
            </p>

            <div
              className="mb-10"
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.4s',
              }}
            >
              <CTAButtons accentColor={accentColor} />
            </div>

            {/* left-side features (straddling) */}
            <div
              className="space-y-4"
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.5s',
              }}
            >
              {leftFeatures.map((f, i) => {
                const FIcon = f.icon;
                return (
                  <div key={i} className="flex items-center gap-3 transition-all duration-300 hover:-translate-x-1">
                    <div
                      className="flex items-center justify-center rounded-full flex-shrink-0"
                      style={{ width: '40px', height: '40px', backgroundColor: `${accentColor}15` }}
                    >
                      <FIcon size={20} style={{ color: accentColor }} />
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-sm" style={{ color: '#1E293B' }}>{f.label}</div>
                      <div className="text-xs" style={{ color: '#64748B' }}>{f.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* stats */}
            {stats && stats.length > 0 && (
              <div className="mt-10">
                <StatsRow stats={stats} loaded={loaded} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------
   7. Gradient Variant
---------------------------------------------------------------- */
function GradientVariant(props: CreativeHeroProps) {
  const { title, subtitle, keywords, accentColor, accentBg, icon: MainIcon, features, stats } = props;
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      className="relative overflow-hidden flex items-center justify-center"
      style={{
        minHeight: '80vh',
        background: `linear-gradient(135deg, ${accentColor}, ${accentColor}CC, ${accentColor}99)`,
      }}
    >
      {/* subtle pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.08) 0%, transparent 40%)`,
        }}
      ></div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center py-20">
        <div
          style={{
            ...fadeStyle(loaded, 0),
            marginBottom: '24px',
          }}
        >
          <MainIcon size={44} color="white" />
        </div>

        <h1
          className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6"
          style={{
            color: 'white',
            ...fadeStyle(loaded, 0.1),
          }}
        >
          {title.map((line, i) => (
            <React.Fragment key={i}>
              {i > 0 && <br />}
              {line}
            </React.Fragment>
          ))}
        </h1>

        <p
          className="text-lg leading-8 mb-3 max-w-2xl mx-auto"
          style={{ color: 'rgba(255,255,255,0.9)', ...fadeStyle(loaded, 0.2) }}
        >
          {subtitle}
        </p>

        <p
          className="text-sm leading-7 mb-10 max-w-xl mx-auto"
          style={{ color: 'rgba(255,255,255,0.7)', ...fadeStyle(loaded, 0.25) }}
        >
          {keywords}
        </p>

        {/* CTAs -- white variants for dark bg */}
        <div
          className="flex flex-wrap justify-center gap-4 mb-14"
          style={fadeStyle(loaded, 0.3)}
        >
          <a
            href="#"
            className="relative overflow-hidden flex items-center gap-2.5 text-white px-7 py-4 rounded-xl font-bold text-sm transition-all duration-300 hover:-translate-y-0.5 group"
            style={{ backgroundColor: 'white', color: accentColor }}
          >
            <span className="relative z-10 flex items-center gap-2.5" style={{ color: accentColor }}>
              <Users size={18} />
              <span>دریافت مشاوره رایگان</span>
            </span>
            <span
              className="absolute inset-0 transition-transform duration-500 group-hover:translate-x-0"
              style={{ backgroundColor: 'rgba(0,0,0,0.05)', transform: 'translateX(-100%)' }}
            ></span>
          </a>
          <a
            href="#"
            className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 hover:bg-white hover:bg-opacity-20 group"
            style={{ border: '2px solid rgba(255,255,255,0.5)', color: 'white' }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
          >
            <span>شروع رایگان</span>
            <ArrowLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-1" />
          </a>
        </div>

        {/* semi-transparent feature cards */}
        <div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto mb-12"
          style={fadeStyle(loaded, 0.4)}
        >
          {features.map((f, i) => {
            const FIcon = f.icon;
            return (
              <div
                key={i}
                className="rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-1 cursor-default"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3"
                  style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
                >
                  <FIcon size={24} color="white" />
                </div>
                <div className="font-bold mb-1" style={{ color: 'white' }}>{f.label}</div>
                <div className="text-sm" style={{ color: 'rgba(255,255,255,0.75)' }}>{f.desc}</div>
              </div>
            );
          })}
        </div>

        {/* stats -- white text */}
        {stats && stats.length > 0 && (
          <div
            className="flex flex-wrap justify-center gap-10"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.7s',
            }}
          >
            {stats.map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-black" style={{ color: 'white' }}>{s.value}</div>
                <div className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.7)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------
   Main CreativeHero Component
---------------------------------------------------------------- */
export default function CreativeHero(props: CreativeHeroProps) {
  const { variant } = props;

  switch (variant) {
    case 'orbital':
      return <OrbitalVariant {...props} />;
    case 'geometric':
      return <GeometricVariant {...props} />;
    case 'cards':
      return <CardsVariant {...props} />;
    case 'waves':
      return <WavesVariant {...props} />;
    case 'minimal':
      return <MinimalVariant {...props} />;
    case 'split':
      return <SplitVariant {...props} />;
    case 'gradient':
      return <GradientVariant {...props} />;
    default:
      return <OrbitalVariant {...props} />;
  }
}

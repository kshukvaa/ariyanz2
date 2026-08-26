'use client';

import { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom, Vignette, DepthOfField } from '@react-three/postprocessing';
import * as THREE from 'three';
import { ACESFilmicToneMapping } from 'three';

import CameraRig from './CameraRig';
import Particles from './Particles';
import AmbientShapes from './AmbientShapes';
import SkyDome from './SkyDome';
import Starfield from './Starfield';
import Section3D, { FloatingCard, SectionTitle3D } from './Section3D';
import PortalRing from './PortalRing';

// Section data — positions match the camera waypoints
const SECTIONS = [
  { title: 'به دنبال چه موضوعی هستید؟', pos: [0, 0, 0] as [number, number, number], start: 0.0, end: 0.09 },
  { title: 'سازمان‌های همکار', pos: [3, 1, -2] as [number, number, number], start: 0.09, end: 0.18 },
  { title: 'محصولات و دوره‌ها', pos: [-2, 2, -4] as [number, number, number], start: 0.18, end: 0.27 },
  { title: 'مسیرهای یادگیری', pos: [2, 0, -6] as [number, number, number], start: 0.27, end: 0.36 },
  { title: 'پیشنهاد ویژه', pos: [-3, 1, -8] as [number, number, number], start: 0.36, end: 0.45 },
  { title: 'تازه‌های آریاز', pos: [0, 2, -10] as [number, number, number], start: 0.45, end: 0.54 },
  { title: 'تجربه کاربران', pos: [3, 0, -12] as [number, number, number], start: 0.54, end: 0.63 },
  { title: 'مقالات', pos: [-2, 1, -14] as [number, number, number], start: 0.63, end: 0.72 },
  { title: 'قهرمانان یادگیری', pos: [0, 2, -16] as [number, number, number], start: 0.72, end: 0.81 },
  { title: 'چرا آریاز؟', pos: [2, 0, -18] as [number, number, number], start: 0.81, end: 0.90 },
  { title: 'مدرس‌های آریاز', pos: [0, 1, -20] as [number, number, number], start: 0.90, end: 1.0 },
];

export default function Scene({ scrollProgress }: { scrollProgress: React.RefObject<number> }) {
  const reduceMotion = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;

  return (
    <Canvas
      dpr={[1, 2]}
      gl={{
        antialias: true,
        powerPreference: 'high-performance',
        toneMapping: ACESFilmicToneMapping,
        toneMappingExposure: 1.1,
      }}
      onCreated={({ gl }) => {
        gl.setClearColor(new THREE.Color('#FDF7F0'));
      }}
      camera={{ fov: 55, near: 0.1, far: 200, position: [0, 0, 8] }}
    >
      <Suspense fallback={null}>
        {/* Lights */}
        <ambientLight intensity={0.4} color="#FFF7F0" />
        <directionalLight position={[5, 10, 5]} intensity={0.8} castShadow shadow-mapSize={[1024, 1024]} />
        <pointLight position={[-5, 3, 4]} intensity={0.6} color="#F26A21" />
        <hemisphereLight args={["#FFF7F0", "#F0E0D0", 0.3]} />

        {/* Fog */}
        <fogExp2 attach="fog" args={['#FDF7F0', 0.022]} />

        {/* Environment */}
        <SkyDome scrollProgress={scrollProgress} />
        <Starfield count={reduceMotion ? 500 : 1500} />
        <Particles count={reduceMotion ? 80 : 300} />
        <AmbientShapes count={reduceMotion ? 6 : 12} />

        {/* Ground */}
        <mesh position={[0, -2, -5]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[60, 80]} />
          <meshStandardMaterial color="#F5F0E8" roughness={0.9} />
        </mesh>

        {/* Camera rig */}
        <CameraRig scrollProgress={scrollProgress} />

        {/* 11 Sections */}
        {SECTIONS.map((s, i) => (
          <Section3D
            key={i}
            position={s.pos}
            scrollStart={s.start}
            scrollEnd={s.end}
            scrollProgress={scrollProgress}
          >
            <SectionTitle3D
              text={s.title}
              position={[0, 1, 0]}
              scrollProgress={scrollProgress}
              scrollStart={s.start}
              scrollEnd={s.end}
            />
            {/* Floating cards as section content placeholders */}
            <FloatingCard position={[-1.2, -0.3, 0]}>
              <mesh>
                <boxGeometry args={[1.5, 0.9, 0.08]} />
                <meshStandardMaterial color="#FFFFFF" roughness={0.3} metalness={0.1} />
              </mesh>
            </FloatingCard>
            <FloatingCard position={[1.2, 0.2, 0.5]} scale={0.8}>
              <mesh>
                <boxGeometry args={[1.5, 0.9, 0.08]} />
                <meshStandardMaterial color="#FDF7F0" roughness={0.3} metalness={0.1} />
              </mesh>
            </FloatingCard>
            {/* Portal ring at each section */}
            <PortalRing
              position={[0, 0, -1]}
              scrollProgress={scrollProgress}
              triggerScroll={(s.start + s.end) / 2}
            />
          </Section3D>
        ))}

        {/* Post-processing (skip if reduced motion) */}
        {!reduceMotion && (
          <EffectComposer>
            <Bloom intensity={0.4} luminanceThreshold={0.6} mipmapBlur />
            <DepthOfField focusDistance={0.02} focalLength={0.05} bokehScale={2} />
            <Vignette darkness={0.35} offset={0.3} />
          </EffectComposer>
        )}
      </Suspense>
    </Canvas>
  );
}

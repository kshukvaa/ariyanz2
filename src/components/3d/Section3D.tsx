'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

/** A 3D section group — positioned along the camera path, fades in/out based on scroll proximity. */
export default function Section3D({
  position,
  scrollStart,
  scrollEnd,
  scrollProgress,
  children,
}: {
  position: [number, number, number];
  scrollStart: number;
  scrollEnd: number;
  scrollProgress: React.RefObject<number>;
  children: React.ReactNode;
}) {
  const group = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!group.current) return;
    const p = scrollProgress.current ?? 0;
    const center = (scrollStart + scrollEnd) / 2;
    const dist = Math.abs(p - center);
    const visibility = Math.max(0, 1 - dist * 4);
    group.current.scale.setScalar(THREE.MathUtils.lerp(group.current.scale.x, visibility, 0.1));
  });

  return (
    <group ref={group} position={position}>
      {children}
    </group>
  );
}

/** A floating 3D card — rounded box that gently bobs. */
export function FloatingCard({
  position = [0, 0, 0],
  scale = 1,
  children,
}: {
  position?: [number, number, number];
  scale?: number;
  children?: React.ReactNode;
}) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.position.y = position[1] + Math.sin(t * 0.8) * 0.1;
    ref.current.rotation.y = Math.sin(t * 0.3) * 0.1;
  });

  return (
    <group ref={ref} position={position} scale={scale}>
      {children}
    </group>
  );
}

/** Section title — large 3D text that flies in from depth. */
export function SectionTitle3D({
  text,
  position = [0, 1.5, 0],
  scrollProgress,
  scrollStart,
  scrollEnd,
}: {
  text: string;
  position?: [number, number, number];
  scrollProgress: React.RefObject<number>;
  scrollStart: number;
  scrollEnd: number;
}) {
  const ref = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!ref.current) return;
    const p = scrollProgress.current ?? 0;
    const center = (scrollStart + scrollEnd) / 2;
    const dist = Math.abs(p - center);
    const vis = Math.max(0, 1 - dist * 3);
    ref.current.position.z = THREE.MathUtils.lerp(-3, 0, vis);
    ref.current.scale.setScalar(vis);
  });

  return (
    <group ref={ref} position={position}>
      <Text
        fontSize={0.35}
        color="#1C1816"
        anchorX="center"
        anchorY="middle"
        maxWidth={4}
        textAlign="center"
        outlineWidth={0.004}
        outlineColor="#F26A21"
      >
        {text}
      </Text>
    </group>
  );
}

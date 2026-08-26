'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/** A glowing portal ring — marks section boundaries. */
export default function PortalRing({
  position = [0, 0, 0],
  scrollProgress,
  triggerScroll,
}: {
  position?: [number, number, number];
  scrollProgress: React.RefObject<number>;
  triggerScroll: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.z = t * 0.3;
    const p = scrollProgress.current ?? 0;
    const dist = Math.abs(p - triggerScroll);
    const glow = Math.max(0.2, 1 - dist * 5);
    const mat = ref.current.material as THREE.MeshStandardMaterial;
    mat.emissiveIntensity = glow * 1.5;
    ref.current.scale.setScalar(0.8 + glow * 0.3);
  });

  return (
    <mesh ref={ref} position={position}>
      <torusGeometry args={[1.5, 0.03, 16, 64]} />
      <meshStandardMaterial color="#F26A21" emissive="#F26A21" emissiveIntensity={0.5} transparent opacity={0.6} />
    </mesh>
  );
}

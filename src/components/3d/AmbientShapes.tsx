'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/** Ambient floating wireframe shapes — icosahedrons + octahedrons. */
export default function AmbientShapes({ count = 12 }: { count?: number }) {
  const group = useRef<THREE.Group>(null);

  const shapes = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      position: [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 16 - 4,
      ] as [number, number, number],
      scale: 0.08 + Math.random() * 0.2,
      type: i % 2 === 0 ? 'ico' : 'octa',
      speed: 0.2 + Math.random() * 0.4,
      offset: Math.random() * Math.PI * 2,
    }));
  }, [count]);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.children.forEach((child, i) => {
      const s = shapes[i];
      child.rotation.x = t * s.speed * 0.5;
      child.rotation.y = t * s.speed * 0.3;
      child.position.y = s.position[1] + Math.sin(t * s.speed + s.offset) * 0.5;
    });
  });

  return (
    <group ref={group}>
      {shapes.map((s, i) => (
        <mesh key={i} position={s.position} scale={s.scale}>
          {s.type === 'ico' ? <icosahedronGeometry args={[1, 0]} /> : <octahedronGeometry args={[1, 0]} />}
          <meshStandardMaterial color="#F26A21" wireframe transparent opacity={0.15} />
        </mesh>
      ))}
    </group>
  );
}

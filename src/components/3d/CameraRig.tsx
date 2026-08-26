'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/** Camera rig — moves along a CatmullRom curve based on scroll progress (0-1). */
const WAYPOINTS: [number, number, number][] = [
  [0, 0, 8],      // Section 1 — Topics
  [3, 1, 6],      // Section 2 — Partners
  [-2, 2, 4],     // Section 3 — Products
  [2, 0, 2],      // Section 4 — Learning Paths
  [-3, 1, 0],     // Section 5 — Offers
  [0, 2, -2],     // Section 6 — News
  [3, 0, -4],     // Section 7 — Testimonials
  [-2, 1, -6],    // Section 8 — Articles
  [0, 2, -8],     // Section 9 — Leaderboard
  [2, 0, -10],    // Section 10 — Why Ariyaz
  [0, 1, -12],    // Section 11 — Instructors
];

export default function CameraRig({ scrollProgress }: { scrollProgress: React.RefObject<number> }) {
  const curve = useRef(
    new THREE.CatmullRomCurve3(
      WAYPOINTS.map((w) => new THREE.Vector3(w[0], w[1], w[2]))
    )
  );

  useFrame((state) => {
    const p = scrollProgress.current ?? 0;
    const pos = curve.current.getPoint(p);
    const lookAhead = curve.current.getPoint(Math.min(p + 0.02, 1));

    // Smooth camera position
    state.camera.position.lerp(pos, 0.1);
    state.camera.lookAt(lookAhead);

    // Subtle roll based on scroll velocity
    const roll = Math.sin(p * Math.PI * 8) * 0.03;
    state.camera.rotation.z = THREE.MathUtils.lerp(state.camera.rotation.z, roll, 0.05);
  });

  return null;
}

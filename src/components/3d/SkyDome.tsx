'use client';

import { useMemo } from 'react';
import * as THREE from 'three';
import { ShaderMaterial } from 'three';

/** Sky dome — a large sphere with a vertical gradient shader (BackSide). */
export default function SkyDome({ scrollProgress }: { scrollProgress: React.RefObject<number> }) {
  const material = useMemo(() => {
    return new ShaderMaterial({
      side: THREE.BackSide,
      uniforms: {
        uTopColor: { value: new THREE.Color('#FFF7F0') },
        uBottomColor: { value: new THREE.Color('#FFE8D0') },
        uScroll: { value: 0 },
      },
      vertexShader: `
        varying vec3 vWorldPosition;
        void main() {
          vec4 worldPosition = modelMatrix * vec4(position, 1.0);
          vWorldPosition = worldPosition.xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uTopColor;
        uniform vec3 uBottomColor;
        uniform float uScroll;
        varying vec3 vWorldPosition;
        void main() {
          float h = normalize(vWorldPosition).y;
          float t = smoothstep(-0.3, 0.6, h);
          vec3 col = mix(uBottomColor, uTopColor, t);
          // Shift hue slightly with scroll — deeper warmth
          col = mix(col, col * vec3(1.0, 0.95, 0.88), uScroll * 0.3);
          gl_FragColor = vec4(col, 1.0);
        }
      `,
    });
  }, []);

  // Update scroll uniform each frame via a child component
  return (
    <>
      <mesh material={material}>
        <sphereGeometry args={[80, 32, 16]} />
      </mesh>
      <ScrollUpdater material={material} scrollProgress={scrollProgress} />
    </>
  );
}

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

function ScrollUpdater({ material, scrollProgress }: { material: ShaderMaterial; scrollProgress: React.RefObject<number> }) {
  useFrame(() => {
    material.uniforms.uScroll.value = scrollProgress.current ?? 0;
  });
  return null;
}

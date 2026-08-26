'use client';

import React, { useEffect, useRef } from 'react';
// Type-only: the runtime module is imported lazily inside the effect,
// where the local `THREE` binding shadows this namespace.
import type * as ThreeNS from 'three';

/* ──────────────────────────────────────────────────────────────
   RobotScene — the interactive 3D assistant in the agents
   hero slide (desktop only).
   three.js is loaded lazily on the client; the whole scene is
   torn down on unmount. Falls back to a still pose when the
   viewer prefers reduced motion.
────────────────────────────────────────────────────────────── */

/** Ariyaz mark drawn to a canvas, used as the chest texture. */
function makeLogoCanvas() {
  const c = document.createElement('canvas');
  c.width = 256;
  c.height = 256;
  const ctx = c.getContext('2d');
  if (!ctx) return c;
  const grad = ctx.createLinearGradient(0, 0, 256, 256);
  grad.addColorStop(0, '#F97316');
  grad.addColorStop(1, '#EA580C');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 256, 256);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 168px system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('A', 128, 140);
  return c;
}

export default function RobotScene({ className = '' }: { className?: string }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let disposed = false;
    let cleanup: (() => void) | undefined;

    (async () => {
      const THREE = await import('three');
      if (disposed || !mount) return;

      const width = mount.clientWidth || 480;
      const height = mount.clientHeight || 480;
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      const scene = new THREE.Scene();

      const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
      camera.position.set(0, 0.35, 7.2);

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(width, height);
      mount.appendChild(renderer.domElement);

      /* ── Lights ── */
      scene.add(new THREE.AmbientLight(0xffffff, 1.1));
      const key = new THREE.DirectionalLight(0xffffff, 2.2);
      key.position.set(3, 5, 5);
      scene.add(key);
      const warm = new THREE.PointLight(0xf97316, 22, 18);
      warm.position.set(-3.2, 1.4, 3);
      scene.add(warm);
      const cool = new THREE.PointLight(0x3b82f6, 16, 18);
      cool.position.set(3.4, -1.2, 2.4);
      scene.add(cool);

      /* ── Materials ── */
      const shell = new THREE.MeshStandardMaterial({
        color: 0xf8fafc,
        roughness: 0.35,
        metalness: 0.25,
      });
      const dark = new THREE.MeshStandardMaterial({
        color: 0x1e293b,
        roughness: 0.5,
        metalness: 0.3,
      });
      const accent = new THREE.MeshStandardMaterial({
        color: 0xf97316,
        roughness: 0.3,
        metalness: 0.4,
        emissive: 0xf97316,
        emissiveIntensity: 0.28,
      });
      const glow = new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        emissive: 0x38bdf8,
        emissiveIntensity: 2.4,
        roughness: 0.2,
      });

      /* ── Robot ── */
      const robot = new THREE.Group();
      scene.add(robot);

      // Head
      const head = new THREE.Group();
      head.position.y = 1.35;
      robot.add(head);

      const skull = new THREE.Mesh(new THREE.SphereGeometry(0.92, 48, 40), shell);
      skull.scale.set(1, 0.92, 0.9);
      head.add(skull);

      const visor = new THREE.Mesh(new THREE.SphereGeometry(0.8, 48, 32, 0, Math.PI * 2, 0, Math.PI / 2.4), dark);
      visor.rotation.x = Math.PI / 2.2;
      visor.position.set(0, 0.02, 0.36);
      head.add(visor);

      const eyeGeo = new THREE.SphereGeometry(0.11, 24, 20);
      const eyeL = new THREE.Mesh(eyeGeo, glow);
      eyeL.position.set(-0.27, 0.06, 0.79);
      const eyeR = eyeL.clone();
      eyeR.position.x = 0.27;
      head.add(eyeL, eyeR);

      // Ears
      const earGeo = new THREE.CylinderGeometry(0.16, 0.16, 0.12, 24);
      const earL = new THREE.Mesh(earGeo, accent);
      earL.rotation.z = Math.PI / 2;
      earL.position.set(-0.92, 0, 0);
      const earR = earL.clone();
      earR.position.x = 0.92;
      head.add(earL, earR);

      // Antenna
      const antenna = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.5, 16), dark);
      antenna.position.y = 1.05;
      head.add(antenna);
      const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.13, 24, 20), accent);
      bulb.position.y = 1.36;
      head.add(bulb);

      // Body
      const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.78, 0.72, 12, 40), shell);
      body.position.y = -0.35;
      robot.add(body);

      const collar = new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.08, 16, 40), accent);
      collar.rotation.x = Math.PI / 2;
      collar.position.y = 0.42;
      robot.add(collar);

      // Chest emblem
      const logoTex = new THREE.CanvasTexture(makeLogoCanvas());
      const emblem = new THREE.Mesh(
        new THREE.CircleGeometry(0.36, 48),
        new THREE.MeshStandardMaterial({ map: logoTex, roughness: 0.4, metalness: 0.1 })
      );
      emblem.position.set(0, -0.24, 0.72);
      robot.add(emblem);

      // Arms
      const armGeo = new THREE.CapsuleGeometry(0.16, 0.62, 8, 24);
      const armL = new THREE.Mesh(armGeo, shell);
      armL.position.set(-0.95, -0.32, 0.06);
      armL.rotation.z = 0.32;
      const armR = new THREE.Mesh(armGeo, shell);
      armR.position.set(0.95, -0.32, 0.06);
      armR.rotation.z = -0.32;
      robot.add(armL, armR);

      const handGeo = new THREE.SphereGeometry(0.19, 24, 20);
      const handL = new THREE.Mesh(handGeo, accent);
      handL.position.set(-1.2, -0.86, 0.08);
      const handR = new THREE.Mesh(handGeo, accent);
      handR.position.set(1.2, -0.86, 0.08);
      robot.add(handL, handR);

      // Orbiting rings
      const ringA = new THREE.Mesh(
        new THREE.TorusGeometry(1.85, 0.018, 12, 90),
        new THREE.MeshBasicMaterial({ color: 0xf97316, transparent: true, opacity: 0.55 })
      );
      ringA.rotation.x = Math.PI / 2.6;
      scene.add(ringA);

      const ringB = new THREE.Mesh(
        new THREE.TorusGeometry(2.25, 0.014, 12, 90),
        new THREE.MeshBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.4 })
      );
      ringB.rotation.x = Math.PI / 2.1;
      ringB.rotation.y = 0.5;
      scene.add(ringB);

      // Sparks riding the rings
      const sparks: ThreeNS.Mesh[] = [];
      const sparkGeo = new THREE.SphereGeometry(0.055, 16, 12);
      for (let i = 0; i < 5; i++) {
        const s = new THREE.Mesh(sparkGeo, i % 2 ? glow : accent);
        scene.add(s);
        sparks.push(s);
      }

      /* ── Interaction ── */
      const pointer = { x: 0, y: 0 };
      const onPointerMove = (e: PointerEvent) => {
        const r = mount.getBoundingClientRect();
        pointer.x = ((e.clientX - r.left) / r.width) * 2 - 1;
        pointer.y = ((e.clientY - r.top) / r.height) * 2 - 1;
      };
      window.addEventListener('pointermove', onPointerMove, { passive: true });

      /* ── Loop ── */
      const start = performance.now();
      let frame = 0;

      const render = () => {
        const t = (performance.now() - start) / 1000;

        if (!reduced) {
          robot.position.y = Math.sin(t * 1.1) * 0.09;
          robot.rotation.y += (pointer.x * 0.55 - robot.rotation.y) * 0.05;
          head.rotation.y += (pointer.x * 0.35 - head.rotation.y) * 0.07;
          head.rotation.x += (pointer.y * 0.22 - head.rotation.x) * 0.07;
          armL.rotation.z = 0.32 + Math.sin(t * 1.3) * 0.08;
          armR.rotation.z = -0.32 - Math.sin(t * 1.3) * 0.08;
          bulb.scale.setScalar(1 + Math.sin(t * 3.2) * 0.12);
          ringA.rotation.z = t * 0.35;
          ringB.rotation.z = -t * 0.25;

          sparks.forEach((s, i) => {
            const a = t * 0.6 + (i / sparks.length) * Math.PI * 2;
            const r = i % 2 ? 2.25 : 1.85;
            s.position.set(Math.cos(a) * r, Math.sin(a * 1.4) * 0.55, Math.sin(a) * r * 0.6);
          });
        }

        renderer.render(scene, camera);
        frame = requestAnimationFrame(render);
      };
      render();

      /* ── Resize ── */
      const resize = () => {
        const w = mount.clientWidth || width;
        const h = mount.clientHeight || height;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      const ro = new ResizeObserver(resize);
      ro.observe(mount);

      cleanup = () => {
        cancelAnimationFrame(frame);
        ro.disconnect();
        window.removeEventListener('pointermove', onPointerMove);
        scene.traverse((obj) => {
          const mesh = obj as ThreeNS.Mesh;
          if (mesh.geometry) mesh.geometry.dispose();
          const mat = mesh.material as ThreeNS.Material | ThreeNS.Material[] | undefined;
          if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
          else mat?.dispose();
        });
        logoTex.dispose();
        renderer.dispose();
        if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
      };
    })();

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return <div ref={mountRef} className={className} aria-hidden="true" />;
}

# 3D Immersive Scroll-Driven Cinematic Homepage — 10-Phase Plan

## Phase 1: Foundation — Scene Setup, Camera, Renderer, Scroll Engine (Steps 1-50)

1. Install `three`, `@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing`, `gsap`.
2. Create `src/app/3d/page.tsx` — the new 3D homepage route.
3. Create `src/components/3d/Scene.tsx` — the root R3F `<Canvas>` component.
4. Configure Canvas: `dpr={[1,2]}`, `gl={{ antialias:true, powerPreference:'high-performance' }}`, `camera={{ fov:55, near:0.1, far:100, position:[0,0,8] }}`.
5. Set clear color to warm white `#FDF7F0`.
6. Create `src/components/3d/Lights.tsx` — ambient(0.4) + directional(0.8, [5,10,5], castShadow) + point(orange, [-5,3,4], 0.6) + hemisphere(0.3).
7. Shadow map 1024×1024, bounds ±15.
8. Create `src/components/3d/Fog.tsx` — `FogExp2` color `#FDF7F0`, density 0.025.
9. Create `src/components/3d/Particles.tsx` — 300 floating points (BufferGeometry), warm orange/amber, size 0.03-0.06, slow upward drift via `useFrame`.
10. Create `src/components/3d/Ground.tsx` — large plane y=-2, `MeshStandardMaterial` color `#F5F0E8`, roughness 0.9, receiveShadow.
11. Create `src/hooks/useScrollProgress.ts` — returns a ref to normalized scroll (0-1).
12. Create `src/components/3d/ScrollContainer.tsx` — a 1000vh tall invisible div that drives scroll.
13. Canvas is `position:fixed`, scroll container is transparent on top.
14. Create `src/components/3d/CameraRig.tsx` — reads scroll progress, moves camera along a CatmullRom curve through 11 waypoints (one per section).
15. Camera looks at a target that also moves along a parallel curve.
16. Add subtle camera roll (±2°) based on scroll velocity.
17. Create `src/components/3d/Section3D.tsx` — a `<group>` positioned at a scroll range, fades in/out based on scroll proximity.
18. Create `src/components/3d/FloatingCard.tsx` — `RoundedBoxGeometry` (2×1.2×0.1, radius 0.05), white material, floats via sin wave, faces camera slightly.
19. Create `src/components/3d/Text3D.tsx` — `Text` from drei, Vazirmatn font, fontSize 0.25, color `#1C1816`, outline orange.
20. Create `src/components/3d/PortalRing.tsx` — `TorusGeometry`(1.5, 0.03), emissive orange, rotates slowly, glows on proximity.
21. Create `src/components/3d/PostFX.tsx` — `<EffectComposer>` with Bloom(0.4), Vignette(0.4), DOF(subtle).
22. Add `ACESFilmicToneMapping`, exposure 1.1.
23. Create `src/components/3d/Overlay.tsx` — DOM overlay with section name, progress dots, back-to-top.
24. Add `prefers-reduced-motion` detection — disables post-processing, reduces particles to 50.
25. Create `src/components/3d/SkyDome.tsx` — large `BackSide` sphere with vertical gradient shader (warm white → peach).
26. Create `src/components/3d/Starfield.tsx` — 1500 distant points on sphere(radius 80), 80% white, 15% amber, 5% orange.
27. Create `src/components/3d/AmbientShapes.tsx` — 12 floating wireframe icosahedrons/octahedrons, size 0.1-0.25, random positions, slow rotation + drift.
28. Add `useFrame` to AmbientShapes — rotate on all axes, drift with sin.
29. Create `src/components/3d/LightShafts.tsx` — 3 elongated transparent planes (additive, opacity 0.04), rotate slowly.
30. Add camera shake — noise-based, amplitude 0.015, only when scrolling.
31. Create `src/components/3d/DustParticles.tsx` — 200 tiny points near camera, size 0.005, warm white, gentle drift.
32. Add "breathing" — scene group scale pulses 1.0↔1.003 over 4s.
33. Create `src/components/3d/SectionTitle3D.tsx` — large 3D text that flies in (z=-5→0) when section activates.
34. Create `src/components/3d/ScrollHint3D.tsx` — bouncing cone pointing down, emissive orange.
35. Wire page.tsx: ScrollContainer + fixed Canvas + Overlay.
36. Add `frameloop="demand"` fallback if reduced motion (only renders on scroll).
37. Create `src/components/3d/GradientBg.tsx` — a full-screen shader plane behind everything, shifts hue with scroll.
38. Add chromatic aberration to post-processing (offset 0.0004).
39. Add film grain noise overlay (intensity 0.025).
40. Add lens distortion (barrel, 0.015).
41. Create `src/components/3d/WaveDivider3D.tsx` — a 3D wave mesh between sections (displaced plane).
42. Add auto-exposure — exposure increases in darker moments.
43. Add section transition flash — brief white plane on boundary cross.
44. Create `src/components/3d/ProgressBar3D.tsx` — a thin glowing bar at the bottom of the overlay.
45. Add keyboard navigation (arrow up/down jumps between sections).
46. Add touch swipe detection for mobile scroll.
47. Create `src/lib/3d-utils.ts` — helper functions (lerp, clamp, smoothstep, scrollToSection).
48. Add `Suspense` fallback — a loading spinner overlay while Three.js assets load.
49. Add error boundary — falls back to the regular homepage if WebGL fails.
50. Test Phase 1: scene loads, camera moves on scroll, particles float, post-processing works.

## Phase 2: 3D Environment — Atmosphere, Lighting, Textures (Steps 51-100)

51-60. Enhanced lighting rig (3-point + rim + fill + spot), fog color shifts with scroll, volumetric fog sphere, ground reflection (MeshReflectorMaterial), caustics shader, ground hex grid texture.
61-70. Sky dome gradient shader with scroll-driven hue shift, horizon glow band, starfield parallax, ambient shape materials (glass, metal, wireframe variants), light shaft opacity animation.
71-80. Particle systems: main field (500), dust (300), energy trails along camera path, confetti burst on section enter, floating embers near orange lights.
81-90. Camera enhancements: velocity-based shake, smooth damp, look-at lag, fov breathing (55↔58), section-to-section easing curves (cubic-bezier variants).
91-100. Post-processing refinement: LUT color grading, god rays from point light, motion blur on fast scroll, depth-based atmospheric fade, auto-exposure zones.

## Phase 3: Sections 1-4 — 3D Content (Steps 101-150)

101-125. Section 1 (Topics): 6 floating cards in a helix, knowledge core icosahedron, central glow, card textures (icon+title on canvas), helix rotation, camera flies through.
126-150. Sections 2-4: Partners (5 logo tiles in semicircle + case study panel + stat counters), Products (4 cards on rotating ring + active card highlight), Learning Paths (tube geometry along CatmullRom + milestone markers + progress rings + energy beams + particle trail).

## Phase 4: Sections 5-8 — 3D Content (Steps 151-200)

151-175. Section 5 (Offers): opening gift box (lid rotation on scroll), floating discount badges, price tag on string, ribbon mesh, mini-offer cards ring, confetti burst.
176-200. Sections 6-8: News (floating panels scrolling vertically + timeline + breaking news beacon), Testimonials (portrait spheres in circle + quote panel + star ratings), Articles (floating book meshes + featured panel + reading clocks + category ribbon + page flip animation).

## Phase 5: Sections 9-11 — 3D Content (Steps 201-250)

201-225. Section 9 (Leaderboard): 3D podium (gold/silver/bronze platforms + columns + avatar spheres), crown mesh, spotlight, rank cards, leaderboard table panel, bar chart cylinders, growth staircase, trophy (LatheGeometry), confetti rain.
226-250. Sections 10-11: WhyAriyaz (trust temple pillars + dome + number medallions + holographic stat panels + brand logo extrude + closing banner), Instructors (holographic portrait cards in diamond + profile panel + rating stars + badge chips + closing portal).

## Phase 6: Post-Processing & Cinematic Grading (Steps 251-300)

251-275. Bloom refinement per-section, DOF focus pulls, vignette intensity zones, chromatic aberration on fast scroll, film grain, scanlines (optional), tone mapping exposure curves.
276-300. Color grading LUTs (warm highlights, desaturated shadows), god rays, motion blur, depth fog, section-specific color temperatures, flash transitions, lens flares on emissive objects.

## Phase 7: Scroll Cinematics — Camera Paths & Timeline (Steps 301-350)

301-325. GSAP ScrollTrigger integration, 11 camera waypoints (CatmullRom), look-at targets, fov changes per section, roll/pitch/yaw easing, section enter/exit timing curves, scroll velocity detection.
326-350. Section transition choreography (camera swoop, content fade-in, portal fly-through), pause points (camera holds at each section center), scroll-snap to sections (optional), progress bar sync, section title fly-in timing.

## Phase 8: Interactions — Raycasting, Hover, Click (Steps 351-400)

351-375. Raycasting setup (pointer → 3D objects), hover glow on cards, click to expand/focus, hotspot markers (pulsing rings), cursor changes, tooltip overlays (DOM), touch raycasting for mobile.
376-400. Interactive elements: card flip on click, partner logo tap → case study zoom, product card tap → detail view, milestone tap → path detail, leaderboard row tap → profile, instructor card tap → bio, search 3D magnifying glass, navigation hotspots.

## Phase 9: Performance — LOD, Culling, Mobile Optimization (Steps 401-450)

401-425. LOD (Level of Detail) for complex meshes, frustum culling, instanced meshes for particles, geometry merging, texture atlas, compressed textures (Basis), lazy-load section geometries.
426-450. Mobile-specific: lower particle count, reduced post-processing (bloom only), lower shadow map (512), dpr cap 1.5, frame skipping, `frameloop="demand"` on idle, Web Worker for physics (if needed), memory cleanup on section exit, GPU instancing for repeated geometries.

## Phase 10: Polish — Audio, Fine-Tuning, Final QA (Steps 451-500)

451-475. Ambient audio (low drone + chimes on section change), Web Audio API integration, mute toggle, audio-reactive visuals (particle size pulses with audio), section-specific soundscapes.
476-500. Final QA: cross-browser testing, mobile device testing, performance profiling (60fps target), accessibility (reduced motion, keyboard nav, screen reader), SEO meta tags, social share, analytics events, loading optimization, error handling, documentation.

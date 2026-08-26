import * as THREE from 'https://unpkg.com/three@0.184.0/build/three.module.js';

const M = {
  shell: new THREE.MeshStandardMaterial({ name: 'shell_white', color: 0xfbfcfe, roughness: 0.28, metalness: 0.05, envMapIntensity: 1.0 }),
  shellSoft: new THREE.MeshStandardMaterial({ name: 'shell_soft', color: 0xe7ecf5, roughness: 0.42, metalness: 0.04, envMapIntensity: 0.7 }),
  metal: new THREE.MeshStandardMaterial({ name: 'grey_metal', color: 0xaab6c9, roughness: 0.34, metalness: 0.62, envMapIntensity: 1.0 }),
  visor: new THREE.MeshStandardMaterial({ name: 'visor_dark', color: 0x16233c, roughness: 0.16, metalness: 0.3, side: THREE.DoubleSide, envMapIntensity: 1.1 }),
  glow: new THREE.MeshStandardMaterial({ name: 'glow_cyan', color: 0x2ab6ff, emissive: 0x4cc9ff, emissiveIntensity: 2.4, roughness: 0.2, metalness: 0 }),
  orange: new THREE.MeshStandardMaterial({ name: 'accent_orange', color: 0xf07a1e, emissive: 0xd15c07, emissiveIntensity: 0.25, roughness: 0.35, metalness: 0.1 }),
  navy: new THREE.MeshStandardMaterial({ name: 'accent_navy', color: 0x1b3a6b, roughness: 0.4, metalness: 0.1 }),
  pedestal: new THREE.MeshStandardMaterial({ name: 'pedestal_ice', color: 0xe4ebf8, roughness: 0.45, metalness: 0.12, envMapIntensity: 0.8 }),
  pedestalTop: new THREE.MeshStandardMaterial({ name: 'pedestal_top', color: 0xf3f7fd, roughness: 0.35, metalness: 0.1, envMapIntensity: 0.9 })
};

function mesh(name, geo, mat, pos, rot, scale) {
  const m = new THREE.Mesh(geo, mat);
  m.name = name;
  if (pos) m.position.set(pos[0], pos[1], pos[2]);
  if (rot) m.rotation.set(rot[0], rot[1], rot[2]);
  if (scale) m.scale.set(scale[0], scale[1], scale[2]);
  return m;
}

function buildPedestal() {
  const g = new THREE.Group();
  g.name = 'pedestal';
  g.add(mesh('pedestal_ring_outer', new THREE.CylinderGeometry(1.16, 1.26, 0.095, 72), M.pedestal, [0, 0.048, 0]));
  g.add(mesh('pedestal_ring_mid', new THREE.CylinderGeometry(0.97, 1.06, 0.085, 72), M.pedestalTop, [0, 0.138, 0]));
  g.add(mesh('pedestal_ring_inner', new THREE.CylinderGeometry(0.79, 0.87, 0.075, 72), M.pedestal, [0, 0.218, 0]));
  g.add(mesh('pedestal_deck', new THREE.CylinderGeometry(0.62, 0.68, 0.055, 72), M.pedestalTop, [0, 0.283, 0]));
  g.add(mesh('pedestal_glow_ring', new THREE.TorusGeometry(0.845, 0.011, 10, 120), M.glow, [0, 0.262, 0], [Math.PI / 2, 0, 0]));
  g.add(mesh('pedestal_glow_ring_inner', new THREE.TorusGeometry(0.52, 0.009, 10, 96), M.glow, [0, 0.314, 0], [Math.PI / 2, 0, 0]));
  g.add(mesh('pedestal_glow_ring_deck', new THREE.TorusGeometry(0.34, 0.008, 10, 80), M.glow, [0, 0.313, 0], [Math.PI / 2, 0, 0]));
  g.add(mesh('pedestal_step_ring', new THREE.TorusGeometry(1.06, 0.014, 10, 110), M.pedestal, [0, 0.096, 0], [Math.PI / 2, 0, 0]));
  g.add(mesh('pedestal_accent_arc', new THREE.TorusGeometry(0.70, 0.015, 10, 80, Math.PI * 0.55), M.orange, [0, 0.267, 0], [Math.PI / 2, 0, -0.5]));
  g.add(mesh('pedestal_accent_arc_navy', new THREE.TorusGeometry(1.02, 0.013, 10, 90, Math.PI * 0.35), M.navy, [0, 0.184, 0], [Math.PI / 2, 0, 2.3]));
  return g;
}

function buildHead() {
  const head = new THREE.Group();
  head.name = 'head';
  head.add(mesh('head_shell', new THREE.SphereGeometry(0.40, 64, 48), M.shell, [0, 0, 0], null, [1, 0.95, 0.94]));
  head.add(mesh('head_crown_seam', new THREE.TorusGeometry(0.398, 0.012, 10, 64, Math.PI), M.metal, [0, 0.005, 0], [-0.16, 0, 0]));

  const visorGeo = new THREE.SphereGeometry(0.404, 64, 48, Math.PI / 2 - 0.78, 1.56, 0.80, 1.02);
  head.add(mesh('visor', visorGeo, M.visor, [0, 0, 0.004], null, [1, 0.95, 0.95]));

  const eyeGeo = new THREE.SphereGeometry(0.075, 32, 24);
  head.add(mesh('eye_left', eyeGeo, M.glow, [-0.128, 0.022, 0.350], [0, -0.34, 0.05], [0.80, 1.22, 0.42]));
  head.add(mesh('eye_right', eyeGeo, M.glow, [0.128, 0.022, 0.350], [0, 0.34, -0.05], [0.80, 1.22, 0.42]));
  const smile = mesh('smile', new THREE.TorusGeometry(0.072, 0.0135, 10, 48, Math.PI * 0.78), M.glow, [0, -0.062, 0.365], [0.34, 0, Math.PI + Math.PI * 0.11]);
  head.add(smile);
  head.userData.smile = smile;

  [-1, 1].forEach((s) => {
    const side = s < 0 ? 'left' : 'right';
    head.add(mesh('ear_disc_' + side, new THREE.CylinderGeometry(0.118, 0.118, 0.062, 48), M.metal, [s * 0.385, -0.02, 0], [0, 0, Math.PI / 2]));
    head.add(mesh('ear_cap_' + side, new THREE.CylinderGeometry(0.072, 0.072, 0.072, 40), M.shell, [s * 0.40, -0.02, 0], [0, 0, Math.PI / 2]));
  });
  head.add(mesh('headband', new THREE.TorusGeometry(0.398, 0.026, 14, 64, Math.PI), M.metal, [0, -0.02, 0], [-0.12, 0, 0]));

  const boomCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.375, -0.03, 0.02),
    new THREE.Vector3(0.415, -0.12, 0.18),
    new THREE.Vector3(0.345, -0.185, 0.30),
    new THREE.Vector3(0.215, -0.195, 0.355)
  ]);
  head.add(mesh('mic_boom', new THREE.TubeGeometry(boomCurve, 48, 0.0075, 10, false), M.metal));
  head.add(mesh('mic_tip', new THREE.SphereGeometry(0.026, 20, 16), M.metal, [0.205, -0.195, 0.358], null, [1, 1, 0.8]));
  return head;
}

function buildArm(side) {
  const g = new THREE.Group();
  const s = side < 0 ? 'left' : 'right';
  g.name = 'arm_' + s;
  g.add(mesh('shoulder_' + s, new THREE.SphereGeometry(0.072, 28, 22), M.metal, [0, 0, 0]));
  g.add(mesh('upper_arm_' + s, new THREE.CapsuleGeometry(0.062, 0.155, 12, 24), M.shell, [side * 0.040, -0.112, 0], [0, 0, side * 0.24]));
  g.add(mesh('hand_' + s, new THREE.SphereGeometry(0.105, 30, 24), M.shell, [side * 0.082, -0.235, 0.02], null, [1, 0.92, 0.96]));
  return g;
}

function buildRobot() {
  const g = new THREE.Group();
  g.name = 'robot';
  g.add(mesh('body_shell', new THREE.SphereGeometry(0.47, 64, 48), M.shell, [0, 0.48, 0], null, [1, 1.0, 0.93]));
  g.add(mesh('body_skirt', new THREE.CylinderGeometry(0.17, 0.21, 0.05, 40), M.metal, [0, 0.045, 0]));
  g.add(mesh('thruster_nozzle', new THREE.CylinderGeometry(0.135, 0.105, 0.085, 40, 1, true), M.metal, [0, -0.01, 0]));
  g.add(mesh('thruster_throat', new THREE.CylinderGeometry(0.10, 0.10, 0.03, 32), M.glow, [0, -0.048, 0]));

  const flame = new THREE.Group();
  flame.name = 'thruster_flame';
  const plumeTex = plumeTexture();
  const planes = [];
  for (let i = 0; i < 3; i++) {
    const tex = plumeTex.clone();
    tex.needsUpdate = true;
    const mat = new THREE.MeshBasicMaterial({
      name: 'flame_plume_' + (i + 1), map: tex, transparent: true, opacity: 0.85,
      depthWrite: false, side: THREE.DoubleSide, toneMapped: false
    });
    const geo = new THREE.PlaneGeometry(0.36, 0.95, 1, 12);
    geo.translate(0, -0.475, 0);
    const p = new THREE.Mesh(geo, mat);
    p.name = 'flame_plume_' + (i + 1);
    p.rotation.y = (i * Math.PI) / 3;
    p.renderOrder = 3;
    planes.push(p);
    flame.add(p);
  }

  const shockMat = new THREE.MeshBasicMaterial({
    name: 'flame_shock', color: 0xd8f0ff, map: softDotTexture('rgba(255,255,255,1)'),
    transparent: true, opacity: 0.8, depthWrite: false, side: THREE.DoubleSide, toneMapped: false
  });
  const shocks = [];
  for (let i = 0; i < 2; i++) {
    const s = new THREE.Mesh(new THREE.PlaneGeometry(0.2, 0.2), shockMat);
    s.name = 'flame_shock_' + (i + 1);
    s.position.y = -0.055;
    s.rotation.y = i * Math.PI / 2;
    s.renderOrder = 4;
    shocks.push(s);
    flame.add(s);
  }
  flame.position.set(0, -0.05, 0);
  g.add(flame);

  const EMB = 56;
  const emberPos = new Float32Array(EMB * 3);
  const emberGeo = new THREE.BufferGeometry();
  emberGeo.setAttribute('position', new THREE.BufferAttribute(emberPos, 3));
  const emberMat = new THREE.PointsMaterial({
    name: 'exhaust_embers', size: 0.062, map: softDotTexture('rgba(255,240,205,1)'),
    color: 0xff7a1e, transparent: true, opacity: 0.75, depthWrite: false, toneMapped: false, sizeAttenuation: true
  });
  const embers = new THREE.Points(emberGeo, emberMat);
  embers.name = 'exhaust_embers';
  embers.frustumCulled = false;
  embers.position.set(0, -0.05, 0);
  g.add(embers);
  const emberState = [];
  for (let i = 0; i < EMB; i++) emberState.push({ life: 0, ttl: 1, vx: 0, vy: 0, vz: 0 });

  g.userData.flame = flame;
  g.userData.flameParts = { planes: planes, shocks: shocks, embers: embers, emberPos: emberPos, emberState: emberState, emberGeo: emberGeo };
  g.userData.flameMats = { planes: planes.map(function (p) { return p.material; }), shock: shockMat, ember: emberMat };
  g.add(mesh('collar', new THREE.CylinderGeometry(0.115, 0.135, 0.085, 40), M.metal, [0, 0.925, 0]));

  const logoTex = new THREE.TextureLoader().load('uploads/logo-mark.png');
  logoTex.colorSpace = THREE.SRGBColorSpace;
  logoTex.anisotropy = 8;
  const logoMat = new THREE.MeshStandardMaterial({
    name: 'chest_logo', map: logoTex, transparent: true, alphaTest: 0.12,
    emissive: 0xffffff, emissiveMap: logoTex, emissiveIntensity: 0.18,
    roughness: 0.35, metalness: 0.05, depthWrite: false
  });
  const logo = mesh('chest_logo', new THREE.PlaneGeometry(0.25, 0.256), logoMat, [0, 0.50, 0.449], [-0.10, 0, 0]);
  logo.renderOrder = 2;
  g.add(logo);

  const head = buildHead();
  head.position.set(0, 1.29, 0);
  g.add(head);

  const armL = buildArm(-1);
  armL.position.set(-0.44, 0.60, 0.09);
  armL.rotation.set(0.24, 0.10, -0.52);
  g.add(armL);
  const armR = buildArm(1);
  armR.position.set(0.44, 0.60, 0.09);
  armR.rotation.set(0.28, -0.10, 0.62);
  g.add(armR);

  g.userData.head = head;
  g.userData.smile = head.userData.smile;
  g.userData.armR = armR;
  g.userData.armL = armL;
  return g;
}

function plumeTexture() {
  const w = 128, h = 256;
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  const x = c.getContext('2d');
  const grd = x.createLinearGradient(0, 0, 0, h);
  grd.addColorStop(0.00, 'rgba(255,255,255,1)');
  grd.addColorStop(0.06, 'rgba(206,238,255,1)');
  grd.addColorStop(0.13, 'rgba(168,214,255,0.98)');
  grd.addColorStop(0.22, 'rgba(255,228,160,0.98)');
  grd.addColorStop(0.36, 'rgba(255,158,40,0.96)');
  grd.addColorStop(0.55, 'rgba(255,104,8,0.86)');
  grd.addColorStop(0.74, 'rgba(240,74,0,0.55)');
  grd.addColorStop(0.90, 'rgba(214,58,0,0.22)');
  grd.addColorStop(1.00, 'rgba(190,50,0,0)');
  x.fillStyle = grd; x.fillRect(0, 0, w, h);
  // turbulent streaks
  x.globalCompositeOperation = 'source-atop';
  for (let i = 0; i < 90; i++) {
    const sx = Math.random() * w, sy = Math.random() * h * 0.9;
    const len = 8 + Math.random() * 46, wid = 1 + Math.random() * 3;
    const g2 = x.createLinearGradient(0, sy, 0, sy + len);
    const a = 0.06 + Math.random() * 0.16;
    g2.addColorStop(0, 'rgba(255,236,190,' + a + ')');
    g2.addColorStop(1, 'rgba(255,140,40,0)');
    x.fillStyle = g2; x.fillRect(sx, sy, wid, len);
  }
  // soft edge + taper mask, built once on its own canvas
  const mc = document.createElement('canvas'); mc.width = w; mc.height = h;
  const mx = mc.getContext('2d');
  for (let y = 0; y < h; y++) {
    const ty = y / h;
    const halfW = (w / 2) * (1 - 0.55 * Math.pow(ty, 0.8));
    const g3 = mx.createLinearGradient(w / 2 - halfW, 0, w / 2 + halfW, 0);
    g3.addColorStop(0, 'rgba(0,0,0,0)');
    g3.addColorStop(0.22, 'rgba(0,0,0,0.6)');
    g3.addColorStop(0.5, 'rgba(0,0,0,1)');
    g3.addColorStop(0.78, 'rgba(0,0,0,0.6)');
    g3.addColorStop(1, 'rgba(0,0,0,0)');
    mx.fillStyle = g3;
    mx.fillRect(w / 2 - halfW, y, halfW * 2, 1.2);
  }
  x.globalCompositeOperation = 'destination-in';
  x.drawImage(mc, 0, 0);
  x.globalCompositeOperation = 'source-over';
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function softDotTexture(inner) {
  const s = 64;
  const c = document.createElement('canvas'); c.width = c.height = s;
  const x = c.getContext('2d');
  const g = x.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  g.addColorStop(0, inner);
  g.addColorStop(0.45, 'rgba(255,150,60,0.45)');
  g.addColorStop(1, 'rgba(255,120,20,0)');
  x.fillStyle = g; x.fillRect(0, 0, s, s);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function gradientEnv(renderer) {
  const c = document.createElement('canvas');
  c.width = 16; c.height = 128;
  const ctx = c.getContext('2d');
  const grd = ctx.createLinearGradient(0, 0, 0, 128);
  grd.addColorStop(0, '#ffffff');
  grd.addColorStop(0.55, '#eaf0fb');
  grd.addColorStop(1, '#c9d6ea');
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, 16, 128);
  const tex = new THREE.CanvasTexture(c);
  tex.mapping = THREE.EquirectangularReflectionMapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function shadowPlane() {
  const c = document.createElement('canvas');
  c.width = c.height = 256;
  const ctx = c.getContext('2d');
  const grd = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
  grd.addColorStop(0, 'rgba(110,130,170,0.42)');
  grd.addColorStop(0.55, 'rgba(110,130,170,0.16)');
  grd.addColorStop(1, 'rgba(110,130,170,0)');
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, 256, 256);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  const m = new THREE.Mesh(
    new THREE.PlaneGeometry(3.4, 3.4),
    new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false })
  );
  m.name = 'contact_shadow';
  m.rotation.x = -Math.PI / 2;
  m.position.y = 0.004;
  return m;
}

class RobotScene extends HTMLElement {
  connectedCallback() {
    if (this._started) { this._resume && this._resume(); return; }
    this._started = true;
    const aw = parseFloat(this.getAttribute('width')) || 560;
    const ah = parseFloat(this.getAttribute('height')) || 640;
    this.style.cssText = 'display:block;position:relative;width:' + aw + 'px;height:' + ah + 'px;margin:0 auto';

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.06;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    const cv = renderer.domElement;
    cv.style.cssText = 'display:block;width:100%;height:100%;cursor:grab;touch-action:pan-y';
    this.appendChild(cv);

    const scene = new THREE.Scene();
    scene.environment = gradientEnv(renderer);

    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
    camera.position.set(0, 1.06, 5.50);
    camera.lookAt(0, 0.86, 0);

    scene.add(new THREE.HemisphereLight(0xffffff, 0xd6e2f5, 0.62));
    const key = new THREE.DirectionalLight(0xffffff, 1.5);
    key.position.set(2.4, 3.6, 3.0);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xdfeaff, 0.62);
    fill.position.set(-3.2, 1.4, 2.2);
    scene.add(fill);
    const rim = new THREE.DirectionalLight(0xffffff, 0.85);
    rim.position.set(-0.8, 2.4, -3.2);
    scene.add(rim);
    const glowLight = new THREE.PointLight(0x2fb4ff, 1.1, 2.4, 2);
    glowLight.position.set(0, 0.45, 0.1);
    scene.add(glowLight);

    const root = new THREE.Group();
    root.name = 'agent_robot_scene';
    const pedestal = buildPedestal();
    pedestal.scale.setScalar(0.85);
    pedestal.position.y = -0.22;
    const robot = buildRobot();
    robot.position.y = 0.34;
    const blastMat = new THREE.MeshBasicMaterial({
      name: 'blast_glow', color: 0xffb066, map: softDotTexture('rgba(255,232,190,1)'),
      transparent: true, opacity: 0, depthWrite: false, toneMapped: false
    });
    const blast = new THREE.Mesh(new THREE.PlaneGeometry(1.0, 1.0), blastMat);
    blast.name = 'blast_glow';
    blast.rotation.x = -Math.PI / 2;
    blast.position.y = 0.032;
    root.add(shadowPlane(), pedestal, blast, robot);
    root.position.y = -0.06;
    scene.add(root);

    let audio = null;
    const buildAudio = () => {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return null;
      const ctx = new Ctx();
      const master = ctx.createGain(); master.gain.value = 0; master.connect(ctx.destination);
      const n = Math.floor(ctx.sampleRate * 2);
      const buf = ctx.createBuffer(1, n, ctx.sampleRate);
      const data = buf.getChannelData(0);
      let last = 0;
      for (let i = 0; i < n; i++) { const w = Math.random() * 2 - 1; last = (last + 0.025 * w) / 1.025; data[i] = last * 3.2; }
      const noise = ctx.createBufferSource(); noise.buffer = buf; noise.loop = true;
      const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 620; lp.Q.value = 0.7;
      const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 1500; bp.Q.value = 1.0;
      const roar = ctx.createGain(); roar.gain.value = 0.3;
      const air = ctx.createGain(); air.gain.value = 0.06;
      noise.connect(lp); lp.connect(roar); roar.connect(master);
      noise.connect(bp); bp.connect(air); air.connect(master);
      const osc = ctx.createOscillator(); osc.type = 'sawtooth'; osc.frequency.value = 56;
      const oscLp = ctx.createBiquadFilter(); oscLp.type = 'lowpass'; oscLp.frequency.value = 200;
      const oscGain = ctx.createGain(); oscGain.gain.value = 0.09;
      osc.connect(oscLp); oscLp.connect(oscGain); oscGain.connect(master);
      const whine = ctx.createOscillator(); whine.type = 'sine'; whine.frequency.value = 880;
      const whineGain = ctx.createGain(); whineGain.gain.value = 0.008;
      whine.connect(whineGain); whineGain.connect(master);
      noise.start(); osc.start(); whine.start();
      return { ctx: ctx, master: master, lp: lp, bp: bp, roar: roar, air: air, osc: osc, whine: whine, whineGain: whineGain };
    };
    this.setTalking = (on) => { this._talking = !!on; };
    this.setSound = (on) => {
      if (on && !audio) audio = buildAudio();
      if (!audio) return false;
      if (on) { audio.ctx.resume && audio.ctx.resume(); this._sound = true; }
      else { this._sound = false; }
      return !!this._sound;
    };

    let dragging = false, lastX = 0, targetYaw = 0, yaw = 0, targetPitch = 0, pitch = 0;
    const onDown = (e) => { dragging = true; lastX = e.clientX; cv.style.cursor = 'grabbing'; cv.setPointerCapture?.(e.pointerId); };
    const onMove = (e) => {
      const r = this.getBoundingClientRect();
      if (dragging) {
        targetYaw += (e.clientX - lastX) * 0.008;
        targetYaw = Math.max(-1.15, Math.min(1.15, targetYaw));
        lastX = e.clientX;
      } else {
        const nx = (e.clientX - r.left) / r.width - 0.5;
        const ny = (e.clientY - r.top) / r.height - 0.5;
        targetYaw = nx * 0.5;
        targetPitch = ny * 0.16;
      }
    };
    const onUp = () => { dragging = false; cv.style.cursor = 'grab'; };
    cv.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);

    const resize = () => {
      const w = Math.round(this.clientWidth || aw), h = Math.round(this.clientHeight || ah);
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    new ResizeObserver(resize).observe(this);

    const awake = () => document.visibilityState !== 'hidden';


    const start = performance.now();
    const head = robot.userData.head, armR = robot.userData.armR;
    const flame = robot.userData.flame, FM = robot.userData.flameMats, FP = robot.userData.flameParts, armL = robot.userData.armL;
    const smile = robot.userData.smile;
    let talk = 0;
    const TARGETS = { top: [0, 0.30], left: [-0.58, 0.12], right: [0.58, 0.12], bottom: [0, -0.20] };
    let flyX = 0, flyY = 0, thrust = 0.5;
    this.flyTo = (dir) => { this._flyTarget = TARGETS[dir] || null; };
    let lastFrame = 0, prevT = 0;
    const draw = () => {
      const t = (performance.now() - start) / 1000;
      lastFrame = performance.now();
      const frameDt = Math.min(0.05, Math.max(0.004, t - prevT));
      prevT = t;
      const ft = this._flyTarget;
      const tx = ft ? ft[0] : 0, ty = ft ? ft[1] : 0;
      const speed = Math.abs(tx - flyX) + Math.abs(ty - flyY);
      flyX += (tx - flyX) * 0.075;
      flyY += (ty - flyY) * 0.075;
      yaw += (targetYaw - yaw) * 0.06;
      pitch += (targetPitch - pitch) * 0.06;
      robot.rotation.y = yaw + flyX * 0.28 + Math.sin(t * 0.35) * 0.05;
      robot.rotation.z = -flyX * 0.20;
      robot.rotation.x = -ty * 0.10;
      robot.position.x = flyX;
      robot.position.y = 0.34 + flyY + Math.sin(t * 0.9) * 0.03 * (1 - Math.min(1, speed * 3));
      head.rotation.x = pitch + Math.sin(t * 0.7) * 0.022 - ty * 0.14;
      head.rotation.z = Math.sin(t * 0.45) * 0.03 + flyX * 0.10;
      armR.rotation.z = 0.62 + Math.sin(t * 1.1) * 0.09 - Math.min(0.5, speed * 1.6);
      armL.rotation.z = -0.52 - Math.sin(t * 1.1) * 0.07 + Math.min(0.5, speed * 1.6);

      const wanted = 0.5 + Math.min(1, speed * 3.2) * 0.85 + (ft ? 0.28 : 0);
      thrust += (wanted - thrust) * 0.12;
      const ab = Math.max(0, (thrust - 0.78) / 0.72);
      const dt = frameDt;
      const flick = 0.9 + Math.sin(t * 27) * 0.06 + Math.sin(t * 43.7) * 0.04;
      const want = 0.30 + thrust * 0.40 + ab * 0.95;
      const clearance = (robot.position.y - 0.05 - 0.02) / 0.95;
      const len = Math.max(0.12, Math.min(want, clearance));
      flame.scale.set(1, 1, 1);
      FP.planes.forEach(function (p, i) {
        const w = 0.86 + thrust * 0.22 - ab * 0.16 + Math.sin(t * (19 + i * 4.3) + i) * 0.07;
        p.scale.set(w, len * (0.94 + Math.sin(t * (23 + i * 5.1)) * 0.09), 1);
        p.position.x = Math.sin(t * (14 + i * 3.7)) * 0.008 * (1 + ab);
        p.position.z = Math.cos(t * (16 + i * 2.9)) * 0.008 * (1 + ab);
        p.material.opacity = (0.62 + thrust * 0.3 + ab * 0.08) * (0.92 + Math.sin(t * (31 + i * 7)) * 0.08);
      });
      FP.shocks.forEach(function (s, i) {
        const sc = (0.55 + thrust * 0.5 + ab * 0.35) * (0.92 + Math.sin(t * 33 + i * 2) * 0.08);
        s.scale.set(sc, sc, 1);
      });
      FM.shock.opacity = 0.45 + thrust * 0.35 + ab * 0.18;
      FM.ember.opacity = 0.28 + thrust * 0.36 + ab * 0.25;
      FM.ember.size = 0.05 + ab * 0.03;
      const maxDrop = Math.max(0.16, clearance * 0.95);
      for (let i = 0; i < FP.emberState.length; i++) {
        const e = FP.emberState[i], o = i * 3;
        e.life -= dt;
        if (e.life <= 0) {
          if (Math.random() < 0.25 + thrust * 0.7) {
            const a = Math.random() * Math.PI * 2, rr = Math.random() * 0.045;
            FP.emberPos[o] = Math.cos(a) * rr;
            FP.emberPos[o + 1] = -0.02 - Math.random() * 0.04;
            FP.emberPos[o + 2] = Math.sin(a) * rr;
            e.vx = Math.cos(a) * (0.06 + Math.random() * 0.12);
            e.vz = Math.sin(a) * (0.06 + Math.random() * 0.12);
            e.vy = -(0.55 + thrust * 1.5 + ab * 1.4) * (0.7 + Math.random() * 0.6);
            e.ttl = 0.22 + Math.random() * 0.3;
            e.life = e.ttl;
          } else {
            FP.emberPos[o + 1] = 9;
          }
        } else {
          FP.emberPos[o] += e.vx * dt;
          FP.emberPos[o + 1] += e.vy * dt;
          FP.emberPos[o + 2] += e.vz * dt;
          if (FP.emberPos[o + 1] < -maxDrop) { e.life = 0; FP.emberPos[o + 1] = 9; }
        }
      }
      FP.emberGeo.attributes.position.needsUpdate = true;
      blast.position.x = flyX;
      blast.scale.setScalar(0.75 + thrust * 0.55 + ab * 0.35);
      blastMat.opacity = Math.max(0, 0.55 - Math.abs(flyX) * 0.7) * (0.3 + thrust * 0.55) * (0.94 + Math.sin(t * 24) * 0.06);
      glowLight.position.set(flyX, robot.position.y + 0.02, 0.1);
      glowLight.intensity = 0.6 + thrust * 1.5;
      glowLight.color.setHex(thrust > 0.75 ? 0xffa544 : 0x59c8ff);
      pedestal.rotation.y = t * 0.10;
      talk += ((this._talking ? 1 : 0) - talk) * 0.18;
      const mouth = 1 + talk * (0.55 + Math.sin(t * 15.5) * 0.45 + Math.sin(t * 24.3) * 0.22);
      smile.scale.set(1 + talk * 0.18, Math.max(0.4, mouth), 1);
      M.glow.emissiveIntensity = 1.35 + Math.sin(t * 1.6) * 0.28 + talk * (0.5 + Math.sin(t * 12) * 0.3);
      if (audio) {
        const a = audio, ct = a.ctx.currentTime;
        if (this._sound) {
          a.master.gain.setTargetAtTime(this._talking ? 0.2 : 0.55, ct, 0.2);
          a.lp.frequency.setTargetAtTime(380 + thrust * 1400, ct, 0.12);
          a.bp.frequency.setTargetAtTime(1100 + thrust * 2400 + ab * 1600, ct, 0.12);
          a.roar.gain.setTargetAtTime(0.22 + thrust * 0.42 + ab * 0.35, ct, 0.14);
          a.air.gain.setTargetAtTime(0.04 + thrust * 0.15 + ab * 0.22, ct, 0.14);
          a.osc.frequency.setTargetAtTime(50 + thrust * 24 + ab * 22, ct, 0.22);
          a.whine.frequency.setTargetAtTime(800 + thrust * 480 + ab * 700, ct, 0.16);
          a.whineGain.gain.setTargetAtTime(0.005 + thrust * 0.013 + ab * 0.02, ct, 0.16);
        } else {
          a.master.gain.setTargetAtTime(0, ct, 0.18);
        }
      }
      renderer.render(scene, camera);
    };
    const tick = () => { this._raf = requestAnimationFrame(tick); draw(); };
    clearInterval(this._fallback);
    this._fallback = setInterval(() => { if (performance.now() - lastFrame > 380) draw(); }, 200);
    this._resume = () => { cancelAnimationFrame(this._raf); resize(); tick(); };
    tick();
  }
  disconnectedCallback() {
    cancelAnimationFrame(this._raf);
    this._raf = 0;
  }
}

if (!customElements.get('robot-scene')) customElements.define('robot-scene', RobotScene);

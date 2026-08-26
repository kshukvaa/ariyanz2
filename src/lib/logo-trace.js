/* Raster→contour tracer: turns shaped text from a loaded webfont into
   polygon shapes (outer + holes) usable by THREE.Shape / ExtrudeGeometry. */

function traceMask(mask, W, H) {
  const f = (x, y) => x >= 0 && y >= 0 && x < W && y < H && mask[y * W + x];
  const E = new Map();
  const add = (a, b) => { const k = a[0] + ',' + a[1]; if (!E.has(k)) E.set(k, []); E.get(k).push(b); };
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    if (!f(x, y)) continue;
    if (!f(x, y - 1)) add([x, y], [x + 1, y]);
    if (!f(x + 1, y)) add([x + 1, y], [x + 1, y + 1]);
    if (!f(x, y + 1)) add([x + 1, y + 1], [x, y + 1]);
    if (!f(x - 1, y)) add([x, y + 1], [x, y]);
  }
  const loops = [];
  while (E.size) {
    const sk = E.keys().next().value, s = sk.split(',').map(Number);
    let cur = s; const L = [];
    for (let g = 0; g < 500000; g++) {
      const k = cur[0] + ',' + cur[1], o = E.get(k);
      if (!o || !o.length) { E.delete(k); break; }
      const n = o.pop(); if (!o.length) E.delete(k);
      L.push(cur); cur = n;
      if (cur[0] === s[0] && cur[1] === s[1]) break;
    }
    if (L.length > 8) loops.push(L);
  }
  return loops;
}

const sarea = p => { let a = 0; for (let i = 0; i < p.length; i++) { const q = p[(i + 1) % p.length]; a += p[i][0] * q[1] - q[0] * p[i][1]; } return a / 2; };

const chaikin = (p, it) => {
  for (let k = 0; k < it; k++) {
    const o = [];
    for (let i = 0; i < p.length; i++) {
      const a = p[i], b = p[(i + 1) % p.length];
      o.push([a[0] * .75 + b[0] * .25, a[1] * .75 + b[1] * .25], [a[0] * .25 + b[0] * .75, a[1] * .25 + b[1] * .75]);
    }
    p = o;
  }
  return p;
};

function rdp(pts, eps) {
  if (pts.length < 4) return pts;
  const dd = (p, a, b) => {
    const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy);
    return L < 1e-9 ? Math.hypot(p[0] - a[0], p[1] - a[1]) : Math.abs(dy * (p[0] - a[0]) - dx * (p[1] - a[1])) / L;
  };
  const keep = new Array(pts.length).fill(false);
  keep[0] = keep[pts.length - 1] = true;
  const st = [[0, pts.length - 1]];
  while (st.length) {
    const [i, j] = st.pop(); let md = -1, mi = -1;
    for (let k = i + 1; k < j; k++) { const v = dd(pts[k], pts[i], pts[j]); if (v > md) { md = v; mi = k; } }
    if (md > eps) { keep[mi] = true; st.push([i, mi], [mi, j]); }
  }
  return pts.filter((_, i) => keep[i]);
}

const ptIn = (pt, poly) => {
  let c = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const xi = poly[i][0], yi = poly[i][1], xj = poly[j][0], yj = poly[j][1];
    if (((yi > pt[1]) !== (yj > pt[1])) && (pt[0] < (xj - xi) * (pt[1] - yi) / (yj - yi) + xi)) c = !c;
  }
  return c;
};

function toShapes(loops, smooth, eps) {
  const ls = loops.map(l => rdp(chaikin(l, smooth), eps)).filter(l => l.length > 4)
    .map(l => ({ pts: l, a: Math.abs(sarea(l)) })).sort((a, b) => b.a - a.a);
  const hole = ls.map((l, i) => {
    let d = 0;
    for (let j = 0; j < ls.length; j++) { if (i === j) continue; if (ls[j].a > l.a && ptIn(l.pts[0], ls[j].pts)) d++; }
    return d % 2 === 1;
  });
  const outs = ls.map((l, i) => hole[i] ? null : { outer: l.pts, holes: [], a: l.a }).filter(Boolean);
  ls.forEach((l, i) => {
    if (!hole[i]) return;
    let best = null;
    for (const o of outs) if (o.a > l.a && ptIn(l.pts[0], o.outer)) if (!best || o.a < best.a) best = o;
    if (best) best.holes.push(l.pts);
  });
  return outs.map(o => ({ outer: o.outer, holes: o.holes }));
}

/** Render shaped text with `font` and return its outlines.
 *  @returns {{shapes, bbox:[x0,y0,x1,y1], baseline:number}} in canvas px, y down. */
export async function traceText(text, family, weight, sizePx) {
  const spec = weight + ' ' + sizePx + 'px "' + family + '"';
  if (document.fonts && document.fonts.load) {
    try { await document.fonts.load(spec, text); await document.fonts.ready; } catch (e) { /* fall through */ }
  }
  const probe = document.createElement('canvas').getContext('2d');
  probe.font = spec;
  const m = probe.measureText(text);
  const pad = Math.ceil(sizePx * 0.45);
  const W = Math.ceil(m.width + pad * 2);
  const H = Math.ceil(sizePx * 2.3);
  const baseline = Math.round(sizePx * 1.45);
  const cv = document.createElement('canvas');
  cv.width = W; cv.height = H;
  const g = cv.getContext('2d');
  g.fillStyle = '#fff'; g.fillRect(0, 0, W, H);
  g.font = spec;
  g.direction = 'rtl';
  g.textAlign = 'right';
  g.textBaseline = 'alphabetic';
  g.fillStyle = '#000';
  g.fillText(text, W - pad, baseline);
  const d = g.getImageData(0, 0, W, H).data;
  const mask = new Uint8Array(W * H);
  for (let i = 0, p = 0; i < d.length; i += 4, p++) if (d[i] < 128) mask[p] = 1;
  const shapes = toShapes(traceMask(mask, W, H), 2, Math.max(0.8, sizePx / 320));
  let a = 1e9, b = 1e9, c = -1e9, e = -1e9;
  for (const s of shapes) for (const p of s.outer) {
    if (p[0] < a) a = p[0]; if (p[0] > c) c = p[0];
    if (p[1] < b) b = p[1]; if (p[1] > e) e = p[1];
  }
  return { shapes: shapes, bbox: [a, b, c, e], baseline: baseline };
}

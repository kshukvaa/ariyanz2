import React from 'react';
import { T, fa } from '@/data/panelTokens';

/* ──────────────────────────────────────────────────────────────
   Chart primitives for the panel.

   Hand-drawn SVG rather than a charting library: every figure in
   the mockups is small, static and styled to the same token set,
   and a library would cost more in overrides than it saves. All
   of these are server-renderable — none holds state.

   Shared conventions: values are 0–100 unless a `max` is given,
   axis labels read right-to-left, and every numeral goes through
   `fa()` so nothing renders in Latin digits.
────────────────────────────────────────────────────────────── */

/* ── Radar ────────────────────────────────────────────────────── */

export interface RadarSeries {
  name: string;
  colour: string;
  /** Same length and order as `axes`. */
  values: number[];
  dashed?: boolean;
}

export function Radar({
  axes,
  series,
  size = 260,
  rings = 4,
  showValues = true,
}: {
  axes: string[];
  series: RadarSeries[];
  size?: number;
  rings?: number;
  showValues?: boolean;
}) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 34;
  const n = axes.length;

  /* Start at twelve o'clock and step anticlockwise, which is the
     direction an RTL reader traverses a wheel of labels. */
  const angle = (i: number) => -Math.PI / 2 - (i * 2 * Math.PI) / n;
  const at = (i: number, v: number) => {
    const a = angle(i);
    const rad = (v / 100) * r;
    return [cx + rad * Math.cos(a), cy + rad * Math.sin(a)] as const;
  };
  const poly = (vals: number[]) =>
    vals.map((v, i) => at(i, v).join(',')).join(' ');

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-auto" role="img">
      {/* Web */}
      {Array.from({ length: rings }, (_, k) => (
        <polygon
          key={k}
          points={poly(axes.map(() => ((k + 1) / rings) * 100))}
          fill="none"
          stroke={T.border}
          strokeWidth={1}
        />
      ))}
      {axes.map((_, i) => {
        const [x, y] = at(i, 100);
        return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke={T.border} strokeWidth={1} />;
      })}

      {/* Series */}
      {series.map((s) => (
        <polygon
          key={s.name}
          points={poly(s.values)}
          fill={s.dashed ? 'none' : s.colour}
          fillOpacity={s.dashed ? 0 : 0.16}
          stroke={s.colour}
          strokeWidth={2}
          strokeDasharray={s.dashed ? '5 4' : undefined}
          strokeLinejoin="round"
        />
      ))}
      {series.map((s) =>
        s.dashed
          ? null
          : s.values.map((v, i) => {
              const [x, y] = at(i, v);
              return <circle key={`${s.name}-${i}`} cx={x} cy={y} r={3} fill={s.colour} />;
            })
      )}

      {/* Axis labels */}
      {axes.map((a, i) => {
        const [x, y] = at(i, 122);
        return (
          <text
            key={a}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={9}
            fontWeight={700}
            fill={T.ink}
          >
            {a}
            {showValues && series[0] && (
              <tspan x={x} dy={11} fontSize={9} fontWeight={800} fill={T.primary}>
                {fa(series[0].values[i])}
              </tspan>
            )}
          </text>
        );
      })}
    </svg>
  );
}

/* ── Grouped bars ─────────────────────────────────────────────── */

/* Laid out with flex rather than SVG: the bars and their category
   labels then share one set of tracks, so no amount of resizing can
   slide the labels out from under the columns they name. `yTicks`
   draws behind as absolutely-positioned rules. */
export function BarGroup({
  categories,
  series,
  height = 190,
  max,
  yTicks = 4,
  axis,
  rtl = false,
}: {
  categories: string[];
  series: { name: string; colour: string; values: number[] }[];
  height?: number;
  max?: number;
  yTicks?: number;
  /** Caption for the value axis, e.g. "تعداد نفر". */
  axis?: string;
  /** Ordered right-to-left. Off by default: score buckets and other
      numeric scales run left-to-right even on an RTL page, and only
      a genuinely categorical axis should follow the text direction. */
  rtl?: boolean;
}) {
  const top = max ?? Math.max(...series.flatMap((s) => s.values)) * 1.15;
  const ticks = Array.from({ length: yTicks + 1 }, (_, i) => Math.round((top * i) / yTicks));

  return (
    <div>
      {axis && (
        <p className="text-right text-[10px] mb-1" style={{ color: T.muted }}>
          {axis}
        </p>
      )}

      <div className="flex gap-2">
        {/* Value axis — RTL puts it on the right, so it is declared first. */}
        <div
          className="flex flex-col-reverse justify-between shrink-0 text-[9px]"
          style={{ height, color: T.muted }}
        >
          {ticks.map((t) => (
            <span key={t} className="leading-none">
              {fa(t)}
            </span>
          ))}
        </div>

        <div className="flex-1 min-w-0">
          <div className="relative" style={{ height }}>
            {ticks.map((_, i) => (
              <span
                key={i}
                className="absolute inset-x-0 border-t"
                style={{ bottom: `${(i / yTicks) * 100}%`, borderColor: T.border }}
              />
            ))}

            <div className="absolute inset-0 flex items-end" dir={rtl ? 'rtl' : 'ltr'}>
              {categories.map((c, ci) => (
                <div key={c} className="flex-1 h-full flex items-end justify-center gap-[3px]">
                  {series.map((s) => (
                    <span
                      key={s.name}
                      className="w-[22%] rounded-t-[2px]"
                      style={{
                        height: `${Math.max((s.values[ci] / top) * 100, 0.6)}%`,
                        backgroundColor: s.colour,
                      }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="flex mt-1.5" dir={rtl ? 'rtl' : 'ltr'}>
            {categories.map((c) => (
              <span
                key={c}
                className="flex-1 text-center text-[9.5px]"
                style={{ color: T.muted }}
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Donut ────────────────────────────────────────────────────── */

export interface Slice {
  label: string;
  value: number;
  colour: string;
  pct?: string;
}

export function Donut({
  slices,
  size = 150,
  thickness = 26,
  centre,
  centreSub,
}: {
  slices: Slice[];
  size?: number;
  thickness?: number;
  centre?: string;
  centreSub?: string;
}) {
  const total = slices.reduce((a, s) => a + s.value, 0) || 1;
  const r = (size - thickness) / 2;
  const c = 2 * Math.PI * r;

  /* Each arc needs the sum of everything before it. Resolved up front
     rather than accumulated inside the map, so rendering stays pure. */
  const arcs = slices.map((s, i) => ({
    ...s,
    frac: s.value / total,
    offset: slices.slice(0, i).reduce((a, p) => a + p.value, 0) / total,
  }));

  return (
    <span className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90 scale-x-[-1]" role="img">
        {arcs.map((s) => (
          <circle
            key={s.label}
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={s.colour}
            strokeWidth={thickness}
            strokeDasharray={`${s.frac * c} ${c}`}
            strokeDashoffset={-s.offset * c}
          />
        ))}
      </svg>

      {centre && (
        <span className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-[19px] font-extrabold leading-none" style={{ color: T.ink }}>
            {centre}
          </span>
          {centreSub && (
            <span className="mt-1 text-[9.5px]" style={{ color: T.muted }}>
              {centreSub}
            </span>
          )}
        </span>
      )}
    </span>
  );
}

export function DonutLegend({ slices }: { slices: Slice[] }) {
  return (
    <ul className="space-y-2">
      {slices.map((s) => (
        <li key={s.label} className="flex items-center gap-2.5 text-[11px]">
          <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: s.colour }} />
          <span className="flex-1 text-right" style={{ color: T.ink }}>
            {s.label}
          </span>
          <span className="font-bold" style={{ color: T.ink }}>
            {s.pct ?? `${fa(s.value)}%`}
          </span>
        </li>
      ))}
    </ul>
  );
}

/* ── Line trend ───────────────────────────────────────────────── */

export function LineTrend({
  points,
  labels,
  colour = T.primary,
  height = 150,
  min,
  max,
}: {
  points: number[];
  labels: string[];
  colour?: string;
  height?: number;
  min?: number;
  max?: number;
}) {
  const lo = min ?? Math.min(...points) - 6;
  const hi = max ?? Math.max(...points) + 6;
  /* The viewBox has to be wider than it is tall, or `w-full h-auto`
     scales the chart to its own aspect and it grows into a column. */
  const w = 320;
  const padB = 18;

  /* Time runs left-to-right even on an RTL page — the mockups plot the
     earliest period at the left and read the line as rising. */
  const at = (i: number) => {
    const x = 12 + (i / (points.length - 1)) * (w - 24);
    const y = height - padB - ((points[i] - lo) / (hi - lo)) * (height - padB - 22);
    return [x, y] as const;
  };

  const path = points.map((_, i) => at(i).join(',')).join(' L ');

  return (
    <div>
      <svg viewBox={`0 0 ${w} ${height}`} className="w-full h-auto" role="img">
        {[0, 1, 2, 3].map((k) => {
          const y = 22 + ((height - padB - 22) * k) / 3;
          return <line key={k} x1={0} y1={y} x2={w} y2={y} stroke={T.border} strokeWidth={1} />;
        })}

        <path d={`M ${path}`} fill="none" stroke={colour} strokeWidth={2.4} strokeLinejoin="round" />

        {points.map((p, i) => {
          const [x, y] = at(i);
          return (
            <g key={i}>
              <circle cx={x} cy={y} r={4} fill={colour} />
              <text x={x} y={y - 9} textAnchor="middle" fontSize={12} fontWeight={800} fill={T.ink}>
                {fa(p)}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="flex mt-0.5" dir="ltr">
        {labels.map((l) => (
          <span key={l} className="flex-1 text-center text-[9.5px]" style={{ color: T.muted }}>
            {l}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Half-circle gauge ────────────────────────────────────────── */

export function Gauge({
  value,
  max = 100,
  colour = T.primary,
  size = 190,
  caption,
}: {
  value: number;
  max?: number;
  colour?: string;
  size?: number;
  caption?: string;
}) {
  const stroke = 18;
  const r = (size - stroke) / 2;
  const c = Math.PI * r; // half turn
  const frac = Math.min(value / max, 1);

  return (
    <span className="relative inline-block" style={{ width: size, height: size / 2 + 14 }}>
      <svg width={size} height={size / 2 + 14} role="img">
        <path
          d={`M ${stroke / 2} ${size / 2} A ${r} ${r} 0 0 1 ${size - stroke / 2} ${size / 2}`}
          fill="none"
          stroke={T.border}
          strokeWidth={stroke}
          strokeLinecap="round"
        />
        <path
          d={`M ${stroke / 2} ${size / 2} A ${r} ${r} 0 0 1 ${size - stroke / 2} ${size / 2}`}
          fill="none"
          stroke={colour}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${frac * c} ${c}`}
        />
      </svg>

      <span className="absolute inset-x-0 bottom-0 flex flex-col items-center">
        <span className="text-[27px] font-extrabold leading-none" style={{ color: T.ink }}>
          {fa(value)}
        </span>
        <span className="mt-1 text-[10px]" style={{ color: T.muted }}>
          {caption ?? `از ${fa(max)}`}
        </span>
      </span>
    </span>
  );
}

/* ── Horizontal comparison bars ───────────────────────────────── */

export function BarList({
  rows,
  max,
}: {
  rows: { label: string; value: number; colour?: string; note?: string }[];
  max?: number;
}) {
  const top = max ?? Math.max(...rows.map((r) => r.value));

  return (
    <ul className="space-y-2.5">
      {rows.map((r) => (
        <li key={r.label} className="flex items-center gap-3">
          <span className="w-9 text-[11px] font-bold shrink-0" style={{ color: T.ink }}>
            {r.note ?? fa(r.value)}
          </span>
          <span className="flex-1 h-2.5 rounded-full overflow-hidden" style={{ backgroundColor: T.border }}>
            <span
              className="block h-full rounded-full"
              style={{ width: `${(r.value / top) * 100}%`, backgroundColor: r.colour ?? T.primary }}
            />
          </span>
          <span className="w-24 text-right text-[11px] shrink-0 truncate" style={{ color: T.ink }}>
            {r.label}
          </span>
        </li>
      ))}
    </ul>
  );
}

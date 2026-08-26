import React from 'react';
import { T, fa } from '@/data/panelTokens';

/* ──────────────────────────────────────────────────────────────
   Ring — the completion dial that appears on every running or
   finished assessment card.

   Drawn as a stroked circle rather than a conic gradient so the
   cap stays rounded and the track keeps its own colour. Rotated
   so the arc starts at twelve o'clock and sweeps anticlockwise,
   which is the direction the mockups read in.
────────────────────────────────────────────────────────────── */

export default function Ring({
  pct,
  colour,
  size = 62,
  stroke = 6,
  label,
}: {
  pct: number;
  colour: string;
  size?: number;
  stroke?: number;
  /** Overrides the default "NN%" caption. */
  label?: string;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;

  return (
    <span
      className="relative inline-flex items-center justify-center shrink-0"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="absolute inset-0 -rotate-90 scale-x-[-1]">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={T.border}
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={colour}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - pct / 100)}
        />
      </svg>
      <span
        className="relative text-[13px] font-extrabold"
        style={{ color: T.ink }}
      >
        {label ?? `${fa(pct)}%`}
      </span>
    </span>
  );
}

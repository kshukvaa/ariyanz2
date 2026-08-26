/* ──────────────────────────────────────────────────────────────
   Aryaz organisation panel — design tokens.

   Every value here was sampled from a pixel in the mockup PNGs
   (see aryaz-library/tokens/tokens.md for the source element and
   contrast rating of each one), so these are measurements rather
   than estimates. When a screen and a token disagree, the screen
   is wrong — re-sample before changing anything below.

   The older `panelTheme` in ./orgPanel.ts predates these and is
   kept for the three original panel routes; new work uses these.
────────────────────────────────────────────────────────────── */

export const T = {
  /* Brand */
  primary: '#4b30ce', // active nav pill, primary buttons
  primaryStrong: '#442de1', // create-evaluation button fill
  violet: '#5d35fc', // AI accents

  /* Status */
  accent: '#fe7601', // orange CTA
  accentSoft: '#fe963d',
  success: '#24ab43', // progress bars, completed
  successStrong: '#24934b', // green solid buttons
  info: '#368bfa',
  infoStrong: '#0547fe',
  danger: '#dc2326',
  warning: '#fd841c', // in-progress bars

  /* Surfaces */
  sidebar: '#09134d',
  ink: '#000f4e', // headings
  muted: '#9396b0', // secondary text
  surface: '#ffffff',
  page: '#fefefe',
  border: '#f2f2f8',

  /* Tints — the pale card/badge fills */
  tintGreen: '#e8f7eb',
  tintOrange: '#fef1e6',
  tintBlue: '#ebf3fe',
  tintPurple: '#efe9fe',
  tintRed: '#feedf0',
} as const;

export const R = {
  sm: '8px',
  md: '12px',
  lg: '16px',
  pill: '999px',
} as const;

/* Asset roots. The library keeps its own folder structure so the
   provenance of every glyph stays traceable back to the mockups. */
export const A = '/images/aryaz';
export const ICON = `${A}/icons`;

/* The library ships each glyph at 1x and @3x. Masks resample badly
   from a 26px source, so always reach for the @3x file. */
export const icon3x = (group: string, name: string) => `${ICON}/${group}/${name}@3x.png`;

/* Latin digits read as foreign in this UI — every number on screen
   is Persian in the mockups, including inside dates and percentages. */
export const fa = (v: string | number) =>
  String(v).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[Number(d)]);

/* Status vocabularies used across the assessment screens. Keeping
   the label next to its colours stops the two drifting apart. */
export interface StatusStyle {
  label: string;
  fg: string;
  bg: string;
  dot?: string;
}

export const evalStatus: Record<string, StatusStyle> = {
  active: { label: 'فعال', fg: T.successStrong, bg: T.tintGreen, dot: T.success },
  completed: { label: 'تکمیل شده', fg: T.infoStrong, bg: T.tintBlue },
  planned: { label: 'برنامه‌ریزی‌شده', fg: T.primary, bg: T.tintPurple },
  draft: { label: 'پیش‌نویس', fg: T.muted, bg: '#f4f4f8' },
  pending: { label: 'در انتظار شروع', fg: T.warning, bg: T.tintOrange },
  expired: { label: 'منقضی‌شده', fg: T.danger, bg: T.tintRed },
};

/* ──────────────────────────────────────────────────────────────
   Aryaz LMS — design tokens.

   The learning side runs its own palette, and that is deliberate
   rather than an inconsistency: the org panel is a signed-in
   analytics tool built on violet, while the LMS is a catalogue
   and a classroom built on navy and blue. The two share only the
   brand orange, which here is reserved for one job — buying a
   course — so it never competes with navigation.

   Neutrals are held in common with the panel so the two halves of
   the product still feel like one site.
────────────────────────────────────────────────────────────── */

export const L = {
  /* Structure */
  navy: '#12235c',        // hero bands, sticky buy bar, dark buttons
  navyDeep: '#0d1a45',    // course progress band in the learn shell
  navySoft: '#1b2f6f',

  /* Primary action */
  blue: '#1b56d3',        // next-lesson, primary links
  blueSoft: '#eaf1ff',
  blueTint: '#f4f8ff',

  /* Commerce — orange means "buy", nowhere else */
  orange: '#f26a21',
  orangeSoft: '#fef1e8',

  /* Status */
  green: '#22a559',       // completed, free
  greenSoft: '#e7f7ee',
  red: '#e5342c',         // discount badge
  redSoft: '#fdecec',
  amber: '#f5a524',       // rating stars, "برترین"
  amberSoft: '#fff6e6',
  violet: '#6d5efc',      // the Aryaz agent card
  violetSoft: '#f3f0ff',

  /* Neutrals — shared with the org panel on purpose */
  ink: '#000f4e',
  muted: '#9396b0',
  border: '#e9ebf4',
  surface: '#ffffff',
  page: '#f7f8fc',
} as const;

export const LR = { sm: '8px', md: '12px', lg: '16px', xl: '20px', pill: '999px' } as const;

/* Every numeral on screen is Persian in the mockups. */
export const fa = (v: string | number) =>
  String(v).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[Number(d)]);

/* Prices are grouped in threes and rendered Persian, e.g.
   3900000 → «۳٬۹۰۰٬۰۰۰». The separator is U+066C, the Arabic
   thousands mark, not a Latin comma. */
export const faPrice = (n: number) =>
  fa(n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '\u066C'));

/* Course card state badges. */
export interface Badge { label: string; fg: string; bg: string }

export const courseBadges: Record<string, Badge> = {
  enrolling: { label: 'در حال ثبت‌نام', fg: '#ffffff', bg: '#22a559' },
  added:     { label: 'اضافه شده',      fg: '#ffffff', bg: '#1b56d3' },
  top:       { label: 'برترین',          fg: '#ffffff', bg: '#f26a21' },
  new:       { label: 'جدید',            fg: '#ffffff', bg: '#6d5efc' },
};

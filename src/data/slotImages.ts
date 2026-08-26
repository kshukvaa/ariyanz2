/* ──────────────────────────────────────────────────────────────
   Artwork supplied for <ImageSlot> ids.
   Anything missing here renders as a labelled placeholder.
   Files live in /public/images/slots/.
────────────────────────────────────────────────────────────── */

export interface SlotImage {
  src: string;
  /** object-fit — logos need "contain" so they aren't cropped */
  fit?: 'cover' | 'contain';
}

const S = '/images/slots';

/** Brand wordmark used in the header. */
export const logoSrc = `${S}/ariyaz-logo.png`;

export const slotImages: Record<string, SlotImage> = {
  /* Mega-menu promo illustrations */
  'ar-mm-free': { src: `${S}/ar-mm-free.png`, fit: 'contain' },
  'ar-mm-courses': { src: `${S}/ar-mm-courses.png`, fit: 'contain' },
  'ar-mm-org': { src: `${S}/ar-mm-org.png`, fit: 'contain' },
  'ar-mm-tools': { src: `${S}/ar-mm-tools.png`, fit: 'contain' },
  'ar-mm-agents': { src: `${S}/ar-mm-agents.png`, fit: 'contain' },
  'ar-mm-shop': { src: `${S}/ar-mm-shop.png`, fit: 'contain' },
  'ar-mm-membership': { src: `${S}/ar-mm-membership.png`, fit: 'contain' },
  'ar-mm-support': { src: `${S}/ar-mm-support.png`, fit: 'contain' },

  /* Footer conversion banner */
  'ar-footer-cta': { src: `${S}/ar-footer-cta.png`, fit: 'contain' },

  /* Hero carousel */
  'ar-hero-1': { src: `${S}/ar-hero-1.png`, fit: 'contain' },
  'ar-hero-2': { src: `${S}/ar-hero-2.png`, fit: 'contain' },

  /* Partner logos */
  'ar-logo-golrang': { src: `${S}/ar-logo-golrang.png`, fit: 'contain' },
  'ar-logo-mellat-ins': { src: `${S}/ar-logo-mellat-ins.png`, fit: 'contain' },
  'ar-logo-baraka': { src: `${S}/ar-logo-baraka.png`, fit: 'contain' },
  'ar-logo-sunich': { src: `${S}/ar-logo-sunich.png`, fit: 'contain' },
  'ar-logo-snapp': { src: `${S}/ar-logo-snapp.png`, fit: 'contain' },
  'ar-logo-mellat': { src: `${S}/ar-logo-mellat.png`, fit: 'contain' },
  'ar-logo-digikala': { src: `${S}/ar-logo-digikala.png`, fit: 'contain' },
  'ar-logo-melli': { src: `${S}/ar-logo-melli.webp`, fit: 'contain' },
  'ar-logo-moallem': { src: `${S}/ar-logo-moallem.png`, fit: 'contain' },
  'ar-logo-kourosh': { src: `${S}/ar-logo-kourosh.png`, fit: 'contain' },

  /* Articles */
  'ar-art-feature': { src: `${S}/ar-art-feature.png` },
  'ar-art-1': { src: `${S}/ar-art-1.png` },
  'ar-art-2': { src: `${S}/ar-art-2.png` },
  'ar-art-3': { src: `${S}/ar-art-3.png` },
  'ar-art-band': { src: `${S}/ar-art-band.png`, fit: 'contain' },

  /* Products (mobile — generated artwork) */
  'ar-p-best-1': { src: `${S}/ar-p-best-1.png` },
  'ar-p-best-2': { src: `${S}/ar-p-best-2.png` },
  'ar-p-best-3': { src: `${S}/ar-p-best-3.png` },
  'ar-p-best-4': { src: `${S}/ar-p-best-4.png` },

  /* Leaderboard */
  'ar-lb-stat-1': { src: `${S}/ar-lb-stat-1.png`, fit: 'contain' },
  'ar-lb-stat-2': { src: `${S}/ar-lb-stat-2.png`, fit: 'contain' },
  'ar-lb-stat-3': { src: `${S}/ar-lb-stat-3.png`, fit: 'contain' },
  'ar-lb-metric-1': { src: `${S}/ar-lb-metric-1.png`, fit: 'contain' },
  'ar-lb-metric-2': { src: `${S}/ar-lb-metric-2.png`, fit: 'contain' },
  'ar-lb-metric-3': { src: `${S}/ar-lb-metric-3.png`, fit: 'contain' },
  'ar-lb-metric-4': { src: `${S}/ar-lb-metric-4.png`, fit: 'contain' },
  'ar-lb-p1': { src: `${S}/ar-lb-p1.png` },
  'ar-lb-p2': { src: `${S}/ar-lb-p2.png` },
  'ar-lb-p3': { src: `${S}/ar-lb-p3.png` },
  'ar-lb-band': { src: `${S}/ar-lb-band.png`, fit: 'contain' },

  /* Instructors */
  'ar-ins-1': { src: `${S}/ar-ins-1.png` },
  'ar-ins-2': { src: `${S}/ar-ins-2.png` },
  'ar-ins-3': { src: `${S}/ar-ins-3.png` },
  'ar-ins-4': { src: `${S}/ar-ins-4.png` },
  'ar-ins-band': { src: `${S}/ar-ins-band.png`, fit: 'contain' },

  /* Testimonial portraits + company marks */
  'ar-t-main-1': { src: `${S}/ar-t-main-1.png` },
  'ar-t-main-2': { src: `${S}/ar-t-main-2.png` },
  'ar-t-main-3': { src: `${S}/ar-t-main-3.png` },
  'ar-t-logo-1': { src: `${S}/ar-t-logo-1.png`, fit: 'contain' },

  /* Case study photography, one per brand */
  'ar-case-golrang': { src: `${S}/ar-case-golrang.jpg` },
  'ar-case-mellat-ins': { src: `${S}/ar-case-mellat-ins.jpg` },
  'ar-case-baraka': { src: `${S}/ar-case-baraka.jpg` },
  'ar-case-sunich': { src: `${S}/ar-case-sunich.png` },
  'ar-case-snapp': { src: `${S}/ar-case-snapp.jpg` },
  'ar-case-mellat': { src: `${S}/ar-case-mellat.jpg` },
  'ar-case-digikala': { src: `${S}/ar-case-digikala.jpg` },
  'ar-case-melli': { src: `${S}/ar-case-melli.jpg` },
  'ar-case-moallem': { src: `${S}/ar-case-moallem.jpg` },
  'ar-case-kourosh': { src: `${S}/ar-case-kourosh.jpg` },
};

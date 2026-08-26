/* ──────────────────────────────────────────────────────────────
   Mobile i18n dictionary — a tiny Persian (fa) string map so the
   mobile homepage's interactive strings live in one place.

   Currently fa-only; the shape is ready for a future en/ar locale
   swap without touching component code (components import `t` and
   call `t(key)`).
────────────────────────────────────────────────────────────── */

export type FaKey =
  | 'scrollHint'
  | 'shareLabel'
  | 'linkCopied'
  | 'copyFailed'
  | 'backToTop'
  | 'sectionJump'
  | 'cardLabel'
  | 'allReadTitle'
  | 'allReadBody'
  | 'onboardingNavTitle'
  | 'onboardingNavBody'
  | 'onboardingDismiss'
  | 'onboardingNext'
  | 'searchPlaceholder'
  | 'searchNoResults'
  | 'searchAllSections'
  | 'resetProgress'
  | 'resetProgressConfirm'
  | 'readToday'
  | 'sectionsUnit'
  | 'recentlyViewed'
  | 'tocTitle'
  | 'tocOpen'
  | 'tocRead'

const fa: Record<FaKey, string> = {
  scrollHint: 'اسکرول کنید',
  shareLabel: 'اشتراک‌گذاری لینک این بخش',
  linkCopied: 'لینک بخش کپی شد',
  copyFailed: 'کپی لینک ناموفق بود',
  backToTop: 'بازگشت به بالا',
  sectionJump: 'پرش به بخش',
  cardLabel: 'کارت',
  allReadTitle: 'تبریک! 🎉',
  allReadBody: 'شما همه ۱۱ بخش را مطالعه کردید',
  onboardingNavTitle: 'پیمایش سریع',
  onboardingNavBody: 'برای پرش بین بخش‌ها، روی شماره هر بخش بزنید',
  onboardingDismiss: 'متوجه شدم',
  onboardingNext: 'بعدی',
  searchPlaceholder: 'جستجو در بخش‌ها...',
  searchNoResults: 'بخشی یافت نشد',
  searchAllSections: 'همه بخش‌ها',
  resetProgress: 'شروع دوباره',
  resetProgressConfirm: 'همه نشان‌ها و پیشرفت مطالعه پاک شوند؟',
  readToday: 'امروز',
  sectionsUnit: 'بخش',
  recentlyViewed: 'بازدید اخیر',
  tocTitle: 'فهرست بخش‌ها',
  tocOpen: 'نمایش فهرست',
  tocRead: 'خوانده‌شده',
};

/** Translate a key to the current locale (fa). Falls back to the key. */
export function t(key: FaKey): string {
  return fa[key] ?? String(key);
}

/* Storage keys for mobile state. */
export const READ_STORAGE_KEY = 'ariyaz:mobile-read-sections';
export const READ_TS_STORAGE_KEY = 'ariyaz:mobile-read-timestamps';

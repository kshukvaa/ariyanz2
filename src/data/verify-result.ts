import { T } from '@/data/panelTokens';

/* ──────────────────────────────────────────────────────────────
   نتیجه استعلام گواهینامه — verification result
   Source: «view certificate verificated.png»
   Second record from «Course_Certificate.png»

   ONE JUDGEMENT CALL, and it is the whole page.

   The mockup draws BOTH outcomes on a single sheet: the valid
   result at the top (green tick, certificate artwork, holder
   details) and, below the security strip, the not-found state
   («گواهینامه‌ای با این مشخصات یافت نشد») in red. That is a design
   sheet showing two states, not a page that shows both at once —
   a certificate cannot be simultaneously valid and missing, and
   rendering them stacked would ship a page that contradicts
   itself.

   So both states are transcribed in full and the page picks one
   from the code in the URL:
     /verify/ARY-HRBP-85214  → the valid state
     /verify/ARY-1405-45872  → the valid state
     /verify/<anything else> → the not-found state

   TWO RECORDS, because two mockups issue two different
   certificates. «view certificate verificated.png» verifies
   ARY-HRBP-85214 for دکتر امیر حسینی; the classroom certificate
   screen issues ARY-1405-45872 to مهدی احمدی and links here to
   check it. Keeping both means that link resolves to the right
   holder instead of a not-found page, and neither mockup's data
   is overwritten by the other's.

   Colours below were sampled from the artwork rather than guessed:
   the certificate frame is #022048 with a #cfa855 gold rule, the
   error red is #de2935 and the success green #138c4c.
────────────────────────────────────────────────────────────── */

export const CERT_NAVY = '#022048';
export const CERT_GOLD = '#cfa855';
export const VERIFY_RED = '#de2935';
export const VERIFY_GREEN = '#138c4c';

export interface CertificateRecord {
  code: string;
  issued: string;
  certificate: {
    brand: string;
    brandLatin: string;
    title: string;
    lead: string;
    holder: string;
    mid: string;
    course: string;
    tail: string;
    qrCaption: string;
    signer: string;
    signerRole: string;
  };
  holderRows: { label: string; value: string; ltr?: boolean }[];
  course: {
    meta: { label: string; value: string; icon: string; fg: string }[];
    body: string;
  };
}

const records: Record<string, CertificateRecord> = {
  /* «view certificate verificated.png» */
  'ARY-HRBP-85214': {
    code: 'ARY-HRBP-85214',
    issued: '۱۴۰۵/۰۶/۱۵',
    certificate: {
      brand: 'آریاز',
      brandLatin: 'Ariyaz',
      title: 'گواهینامه پایان دوره',
      lead: 'بدین وسیله گواهی می‌شود',
      holder: 'دکتر امیر حسینی',
      mid: 'با موفقیت دوره',
      course: 'دوره جامع HRBP حرفه‌ای',
      tail: 'را به مدت ۴۰ ساعت آموزشی به پایان رسانده است.',
      qrCaption: 'QR Code اعتبارسنجی',
      signer: 'دکتر مهدی هزبرافکن',
      signerRole: 'مدیرعامل آریاز',
    },
    holderRows: [
      { label: 'نام و نام خانوادگی:', value: 'دکتر امیر حسینی' },
      { label: 'کد ملی:', value: '۰۰۱۲۳۴۵۶۷۸۹' },
      { label: 'عنوان دوره:', value: 'دوره جامع HRBP حرفه‌ای' },
      { label: 'مدرس دوره:', value: 'دکتر مهدی هزبرافکن' },
      { label: 'تاریخ صدور:', value: '۱۴۰۵/۰۶/۱۵' },
      { label: 'شماره گواهینامه:', value: 'ARY-HRBP-85214', ltr: true },
    ],
    course: {
      meta: [
        { label: 'نوع دوره', value: 'دوره تخصصی', icon: 'lucide:file-text', fg: T.primary },
        { label: 'مدت دوره', value: '۴۰ ساعت', icon: 'lucide:clock', fg: VERIFY_GREEN },
        { label: 'تاریخ برگزاری', value: 'شهریور ۱۴۰۵', icon: 'lucide:calendar', fg: VERIFY_GREEN },
      ],
      body: 'این دوره به منظور توانمندسازی متخصصان منابع انسانی در نقش استراتژیک HRBP طراحی شده است. در این دوره، مفاهیم کلیدی تحلیل کسب‌وکار، مشاوره به مدیران، طراحی راهکارهای منابع انسانی و مهارت‌های تأثیرگذاری بر عملکرد سازمان آموزش داده می‌شود.',
    },
  },

  /* «Course_Certificate.png» — the certificate the classroom issues. */
  'ARY-1405-45872': {
    code: 'ARY-1405-45872',
    issued: '۱۴۰۵/۰۵/۳۰',
    certificate: {
      brand: 'آریاز',
      brandLatin: 'Ariyaz',
      title: 'گواهینامه پایان دوره',
      lead: 'بدین وسیله گواهی می‌شود',
      holder: 'مهدی احمدی',
      mid: 'با موفقیت دوره',
      course: 'طراحی و استقرار نظام ارزیابی عملکرد کارکنان',
      tail: 'را به مدت ۲۰ ساعت آموزش حرفه‌ای به پایان رسانده و تمامی ارزیابی‌های مرتبط با این دوره را با موفقیت گذرانده است.',
      qrCaption: 'QR Code اعتبارسنجی',
      signer: 'دکتر علی محمودی',
      signerRole: 'مدرس دوره',
    },
    holderRows: [
      { label: 'نام و نام خانوادگی:', value: 'مهدی احمدی' },
      { label: 'عنوان دوره:', value: 'طراحی و استقرار نظام ارزیابی عملکرد کارکنان' },
      { label: 'مدرس دوره:', value: 'دکتر علی محمودی' },
      { label: 'امتیاز نهایی:', value: '۹۴٪' },
      { label: 'تاریخ صدور:', value: '۱۴۰۵/۰۵/۳۰' },
      { label: 'شماره گواهینامه:', value: 'ARY-1405-45872', ltr: true },
    ],
    course: {
      meta: [
        { label: 'نوع دوره', value: 'دوره تخصصی', icon: 'lucide:file-text', fg: T.primary },
        { label: 'مدت دوره', value: '۲۰ ساعت', icon: 'lucide:clock', fg: VERIFY_GREEN },
        { label: 'تاریخ برگزاری', value: 'مرداد ۱۴۰۵', icon: 'lucide:calendar', fg: VERIFY_GREEN },
      ],
      body: 'این دوره به متخصصان منابع انسانی می‌آموزد چگونه یک نظام ارزیابی عملکرد را از طراحی شاخص تا جلسه بازخورد پیاده کنند؛ با تمرین عملی، قالب آماده و پروژه پایانی.',
    },
  },
};

export function findCertificate(code: string): CertificateRecord | null {
  try {
    return records[decodeURIComponent(code).toUpperCase()] ?? null;
  } catch {
    return null;
  }
}

/* Kept for the public verify form's example placeholder. */
export const VALID_CODE = 'ARY-HRBP-85214';

export const resultValid = {
  status: 'گواهینامه معتبر است',
  desc: 'این گواهینامه در سامانه آریاز ثبت و قابل استعلام می‌باشد.',
  badgeTitle: 'وضعیت گواهینامه',
  badge: 'معتبر',
  again: { label: 'استعلام جدید', icon: 'lucide:refresh-cw' },
  issuer: 'آریاز',
  labels: { status: 'وضعیت', issuer: 'صادرکننده', issued: 'تاریخ صدور', code: 'گواهینامه' },
};

export const holderPanel = {
  title: 'اطلاعات دارنده گواهینامه',
  icon: 'lucide:user-round',
  download: { label: 'دانلود PDF', icon: 'lucide:download' },
  actions: [
    { label: 'کپی لینک اعتبارسنجی', icon: 'lucide:link-2' },
    { label: 'اشتراک گذاری', icon: 'lucide:share-2' },
  ],
  linkTitle: 'لینک اعتبارسنجی این گواهینامه',
};

export const aboutCourse = {
  title: 'درباره دوره',
  art: '/images/aryaz/illustrations/learning-path-illus.png',
};

export const security = {
  title: 'تاییدیه امنیتی آریاز',
  icon: 'lucide:shield-check',
  items: [
    {
      label: 'ثبت‌شده در سامانه آریاز',
      desc: 'این گواهینامه در پایگاه داده رسمی آریاز ثبت و نگهداری می‌شود.',
      icon: 'lucide:database',
      fg: T.infoStrong,
    },
    {
      label: 'غیرقابل جعل',
      desc: 'این گواهینامه با امضای دیجیتال و فناوری رمزنگاری صادر شده است.',
      icon: 'lucide:shield-check',
      fg: VERIFY_GREEN,
    },
    {
      label: 'دارای شناسه یکتا',
      desc: 'هر گواهینامه دارای شماره یکتای اختصاصی است.',
      icon: 'lucide:fingerprint-pattern',
      fg: T.primary,
    },
    {
      label: 'قابل استعلام آنلاین',
      desc: 'این گواهینامه در سامانه آریاز قابل استعلام است.',
      icon: 'lucide:globe',
      fg: VERIFY_GREEN,
    },
  ],
};

export const resultNotFound = {
  title: 'گواهینامه‌ای با این مشخصات یافت نشد.',
  lead: 'لطفا موارد زیر را بررسی کنید:',
  checks: [
    'کد گواهینامه را به درستی وارد کرده‌اید.',
    'گواهینامه هنوز در سامانه ثبت نشده است.',
    'این گواهینامه ممکن است نامعتبر باشد.',
  ],
  support: {
    title: 'برای دریافت راهنمایی بیشتر',
    desc: 'تیم پشتیبانی آریاز آماده پاسخگویی به سوالات شماست.',
    cta: 'تماس با پشتیبانی',
    icon: 'lucide:headphones',
  },
  again: { label: 'استعلام جدید', icon: 'lucide:refresh-cw' },
};

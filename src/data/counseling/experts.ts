import { T } from '@/data/panelTokens';

/* ──────────────────────────────────────────────────────────────
   مشاوره تخصصی — expert directory
   Source: «specialized counseling - Expert list.png»

   Palette note — this section reuses the org panel's violet
   tokens rather than the LMS navy. That is what the mockups draw,
   and it reads correctly: counselling is advisory work, closer to
   the panel's world than to the catalogue's.

   The four entry cards in the hero and the four cards at the foot
   answer different questions — «which field is my problem in?»
   versus «how do I want to be advised?» — so both stay.
────────────────────────────────────────────────────────────── */

export const counselingHero = {
  title: 'مشاور مناسب مسئله‌تان را پیدا کنید',
  desc: [
    'مشاوره تخصصی در حوزه منابع انسانی، روابط کار، قانون کار و تأمین اجتماعی',
    'سؤال بپرسید، جلسه رزرو کنید یا پرونده خود را برای بررسی ارسال کنید.',
  ],
  search: 'موضوع یا مسئله خود را جستجو کنید...',
  fields: [
    {
      id: 'hr',
      label: 'منابع انسانی',
      sub: 'جذب، جبران خدمات، ساختار',
      icon: 'lucide:users-round',
      fg: T.primary,
      bg: T.tintPurple,
    },
    {
      id: 'labour',
      label: 'روابط کار و قانون کار',
      sub: 'قرارداد، دعاوی، اخراج',
      icon: 'lucide:scale',
      fg: T.infoStrong,
      bg: T.tintBlue,
    },
    {
      id: 'social',
      label: 'تأمین اجتماعی',
      sub: 'بیمه، بازنشستگی، سوابق',
      icon: 'lucide:shield-check',
      fg: T.successStrong,
      bg: T.tintGreen,
    },
    {
      id: 'unknown',
      label: 'مسئله‌ام را نمی‌دانم',
      sub: 'از آریاز بپرس',
      icon: 'lucide:bot',
      fg: T.violet,
      bg: T.tintPurple,
    },
  ],
};

export const counselingAsk = {
  title: 'مسئله دارید و نمی‌دانید از کجا شروع کنید؟',
  desc: 'مسئله خود را بپرسید تا آریاز حوزه تخصصی و مشاوران مناسب را به شما پیشنهاد دهد.',
  placeholder: 'مثال: می‌خواهم با یک کارمند قطع همکاری کنم، چه شرایطی دارد؟',
};

export const counselingToolbar = {
  search: 'جستجو در مشاوران...',
  sort: 'پیشنهادی',
  chips: ['فیلتر چت آزاد', 'سابقه', 'بیشترین', 'بیشترین امتیاز'],
  more: 'مشاهده همه مشاوران',
};

export interface Expert {
  id: string;
  name: string;
  title: string;
  avatar: string;
  fieldIcon: string;
  fieldFg: string;
  fieldBg: string;
  availability: { label: string; fg: string; bg: string };
  firstSlotLabel: string;
  firstSlot: string;
  tags: string[];
  rating: string;
  reviews: string;
  years: string;
  price: string;
  href: string;
}

const A = '/images/aryaz/avatars';

export const experts: Expert[] = [
  {
    id: 'amir-hosseini',
    name: 'دکتر امیر حسینی',
    title: 'مشاور ارشد روابط کار و قانون کار',
    avatar: `${A}/expert-01-lawyer.png`,
    fieldIcon: 'lucide:scale',
    fieldFg: T.primary,
    fieldBg: T.tintPurple,
    availability: { label: 'در دسترس', fg: T.successStrong, bg: T.tintGreen },
    firstSlotLabel: 'اولین وقت آزاد',
    firstSlot: 'فردا ۱۶:۳۰',
    tags: ['قرارداد کار', 'جبران و خاتمه همکاری', 'دعاوی کار'],
    rating: '۴.۸',
    reviews: '۱۲۸ نظر',
    years: '۱۶ سال سابقه',
    price: '۲.۸M پرونده/جلسه',
    href: '/counseling/experts/amir-hosseini',
  },
  {
    id: 'narges-karimi',
    name: 'دکتر نرگس کریمی',
    title: 'مشاور منابع انسانی و توسعه سازمانی',
    avatar: `${A}/expert-02-hr.png`,
    fieldIcon: 'lucide:users-round',
    fieldFg: T.violet,
    fieldBg: T.tintPurple,
    availability: { label: 'در دسترس', fg: T.successStrong, bg: T.tintGreen },
    firstSlotLabel: 'اولین وقت آزاد',
    firstSlot: 'فردا ۱۰:۰۰',
    tags: ['جذب و استخدام', 'جبران خدمات', 'مدیریت عملکرد'],
    rating: '۴.۹',
    reviews: '۹۵ نظر',
    years: '۱۵ سال سابقه',
    price: '۲.۵M پرونده/جلسه',
    href: '/counseling/experts/narges-karimi',
  },
  {
    id: 'ali-reshadi',
    name: 'مهندس علی رشایی',
    title: 'مشاور تأمین اجتماعی',
    avatar: `${A}/expert-03-attorney.png`,
    fieldIcon: 'lucide:shield-check',
    fieldFg: T.infoStrong,
    fieldBg: T.tintBlue,
    availability: { label: 'در حال جلسه', fg: T.accent, bg: T.tintOrange },
    firstSlotLabel: 'اولین وقت آزاد',
    firstSlot: 'جمعه ۵۵:۱۰',
    tags: ['سوابق بیمه', 'بازنشستگی', 'مشاغل سخت و زیان‌آور'],
    rating: '۴.۷',
    reviews: '۴۳ نظر',
    years: '۱۵ سال سابقه',
    price: '۲.۱M پرونده/جلسه',
    href: '/counseling/experts/ali-reshadi',
  },
  {
    id: 'sara-mohammadi',
    name: 'دکتر سارا محمدی',
    title: 'مشاور مناطق آزاد و قوانین کار',
    avatar: `${A}/mbti-reviewer-01.png`,
    fieldIcon: 'lucide:map-pin',
    fieldFg: T.primary,
    fieldBg: T.tintPurple,
    availability: { label: 'در دسترس', fg: T.successStrong, bg: T.tintGreen },
    firstSlotLabel: 'اولین وقت آزاد',
    firstSlot: 'فردا ۱۶:۰۰',
    tags: ['مناطق آزاد', 'قراردادهای بین‌المللی', 'کار در مناطق آزاد'],
    rating: '۴.۶',
    reviews: '۴۵ نظر',
    years: '۱۰ سال سابقه',
    price: '۱.۹M پرونده/جلسه',
    href: '/counseling/experts/sara-mohammadi',
  },
];

export const expertsFilters = {
  title: 'فیلتر مشاوران',
  reset: 'پاک کردن فیلترها',
  groups: [
    {
      id: 'field',
      label: 'حوزه تخصصی',
      open: true,
      items: [
        { label: 'منابع انسانی', count: '۱۲۶', active: true },
        { label: 'جذب و استخدام', count: '۳۲' },
        { label: 'جبران خدمات و مزایا', count: '۲۸' },
        { label: 'ساختار سازمانی', count: '۲۲' },
        { label: 'مدیریت عملکرد', count: '۱۸' },
        { label: 'توسعه منابع انسانی', count: '۱۶' },
        { label: 'HR Analytics', count: '۱۲' },
      ],
    },
  ],
  /* The remaining rail rows are collapsed in the mockup — only
     their labels and counts are visible. */
  collapsed: [
    { label: 'روابط کار و قانون کار', count: '۱۵۶', icon: 'lucide:scale' },
    { label: 'تأمین اجتماعی', count: '۱۰۴', icon: 'lucide:shield-check' },
    { label: 'مناطق آزاد', count: '۴۶', icon: 'lucide:map-pin' },
    { label: 'تخصصی', icon: 'lucide:star' },
    { label: 'سابقه مشاور', icon: 'lucide:briefcase' },
    { label: 'نوع خدمت', icon: 'lucide:layers' },
    { label: 'آنلاین / حضوری', icon: 'lucide:video' },
    { label: 'شهر / منطقه آزاد', icon: 'lucide:map-pin' },
    { label: 'امتیاز مشاور', icon: 'lucide:star' },
    { label: 'زمان در دسترس', icon: 'lucide:clock' },
  ],
};

export const counselingHow = {
  title: 'چطور می‌خواهید مشاوره بگیرید؟',
  cards: [
    {
      id: 'question',
      label: 'پاسخ تخصصی به سؤال',
      desc: 'سؤال خود را مطرح کنید و پاسخ مکتوب دریافت کنید.',
      icon: 'lucide:message-square-text',
      fg: T.primary,
      bg: T.tintPurple,
      href: '/counseling/ask',
    },
    {
      id: 'online',
      label: 'جلسه آنلاین',
      desc: 'جلسه آنلاین یا مشاور در زمان دلخواه شما.',
      icon: 'lucide:video',
      fg: T.infoStrong,
      bg: T.tintBlue,
      href: '/counseling/reserve',
    },
    {
      id: 'in-person',
      label: 'جلسه حضوری',
      desc: 'جلسه حضوری در دفتر مشاور با محل دلخواه انتخاب کنید.',
      icon: 'lucide:user-round',
      fg: T.successStrong,
      bg: T.tintGreen,
      href: '/counseling/in-person',
    },
    {
      id: 'case',
      label: 'بررسی پرونده',
      desc: 'پرونده خود را ارسال کنید تا بررسی و پاسخ دریافت کنید.',
      icon: 'lucide:folder',
      fg: T.accent,
      bg: T.tintOrange,
      href: '/counseling/case',
    },
  ],
};

export const counselingFaq = {
  title: 'مسائل پرتکرار کاربران',
  cta: 'مشاهده همه',
  items: [
    { q: 'می‌خواهم با کارمندم قطع همکاری کنم، چه شرایطی دارد؟', fg: T.primary },
    { q: 'سابقه بیمه من ناقص ثبت شده، چه باید کرد؟', fg: T.infoStrong },
    { q: 'برای قرارداد مدیران چه مدلی مناسب است؟', fg: T.successStrong },
    { q: 'به رأی اداره کار اعتراض دارم، مراحل چیست؟', fg: T.accent },
  ],
};

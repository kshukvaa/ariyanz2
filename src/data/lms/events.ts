import { L } from '@/data/lmsTokens';

/* ──────────────────────────────────────────────────────────────
   رویدادها — single workshop and single webinar
   Sources: «Single_Workshop.png», «Webinar.png»

   These two run on the LMS palette (navy/blue with orange
   reserved for buying), not the violet of the learning paths.
   That is what the mockups draw and it is the right call: an
   event has a ticket, so it belongs to the catalogue's world.

   The pages are the same frame with one real difference. A
   workshop is a place you go: its left column is a photograph and
   its rail sells a seat, with a group-booking discount underneath.
   A webinar is a stream you join: its left column is a player
   with a LIVE badge, a viewer count and a running chat. So the
   shared shell takes the left column as a slot.
────────────────────────────────────────────────────────────── */

const TH = '/images/aryaz/thumbnails';
const A = '/images/aryaz/avatars';

export interface EventTicket {
  title: string;
  name: string;
  price: string;
  currency: string;
  perks: string[];
  buy: { label: string; icon: string };
}

/* ════════ Workshop ══════════════════════════════════════════ */

export const workshop = {
  crumbs: [
    { label: 'خانه', href: '/' },
    { label: 'رویدادها', href: '/courses' },
    { label: 'ورکشاپ‌ها', href: '/workshops' },
    { label: 'طراحی و استقرار سیستم ارزیابی عملکرد کارکنان' },
  ],
  badge: { label: 'ورکشاپ حضوری', dot: true },
  title: 'طراحی و استقرار سیستم ارزیابی عملکرد کارکنان',
  desc: 'یک ورکشاپ کاملاً عملی برای مدیران منابع انسانی، مدیران ارشد و کارشناسان HR',
  instructorLabel: 'مدرس:',
  instructor: 'دکتر حسن هژیر افکن',
  avatar: `${A}/staff-ali-ahmadi.png`,
  image: `${TH}/kpi-article-02-measure-analyse.png`,
  imageChips: [
    { label: 'گواهینامه معتبر آریاز', icon: 'lucide:shield-check' },
    { label: '۴.۹ از ۵', icon: 'lucide:star', amber: true },
    { label: '۸ ساعت', icon: 'lucide:clock' },
    { label: 'شرکت ۲۴۵', icon: 'lucide:users-round' },
  ],
  meta: [
    { label: 'تاریخ:', value: 'جمعه ۲۵ مهر ۱۴۰۵', icon: 'lucide:calendar' },
    { label: 'زمان:', value: '۰۹:۰۰ تا ۱۷:۰۰', icon: 'lucide:clock' },
    { label: 'محل برگزاری:', value: 'تهران، سالن همایش آریاز', icon: 'lucide:map-pin' },
    { label: 'ظرفیت:', value: '۳۰ نفر', icon: 'lucide:users-round' },
  ],
  tabs: [
    { id: 'about', label: 'درباره ورکشاپ', icon: 'lucide:circle-alert' },
    { id: 'learn', label: 'آنچه یاد می‌گیرید', icon: 'lucide:book-open' },
    { id: 'agenda', label: 'برنامه روز', icon: 'lucide:calendar' },
    { id: 'instructor', label: 'مدرس', icon: 'lucide:user-round' },
    { id: 'audience', label: 'مخاطبان', icon: 'lucide:users-round' },
    { id: 'faq', label: 'سوالات متداول', icon: 'lucide:message-circle' },
  ],
  about: [
    'در این ورکشاپ شرکت‌کنندگان با چارچوب‌های حرفه‌ای طراحی و استقرار سیستم ارزیابی عملکرد آشنا می‌شوند. این برنامه به صورت کاملاً عملی طراحی شده و علاوه بر مفاهیم مدیریتی، شامل مثال‌های واقعی سازمانی، طراحی شاخص‌ها و فرآیندهای اجرایی هم خواهد بود.',
    'هدف ما این است که شما پس از این ورکشاپ بتوانید یک سیستم ارزیابی کارآمد و متناسب با نیاز سازمان خود طراحی و پیاده‌سازی کنید.',
  ],
  ticket: {
    title: 'انتخاب نوع ثبت‌نام',
    name: 'بلیط انفرادی',
    price: '۳,۹۰۰,۰۰۰',
    currency: 'تومان',
    perks: [
      'حضور کامل در ورکشاپ',
      'فایل‌های آموزشی',
      'گواهینامه معتبر آریاز',
      'دسترسی به منابع تکمیلی',
      'پشتیبانی پس از ورکشاپ',
    ],
    buy: { label: 'خرید بلیط انفرادی', icon: 'lucide:shopping-cart' },
  } as EventTicket,
  group: {
    title: 'ثبت‌نام گروهی',
    forWho: 'برای سازمان‌ها',
    minimum: '۵ نفر به بالا',
    discount: '۲۵٪ تخفیف',
    cta: 'درخواست ثبت‌نام گروهی',
    icon: 'lucide:users-round',
  },
  guarantee: 'ضمانت بازگشت وجه تا ۴۸ ساعت قبل از شروع رویداد',
};

/* ════════ Webinar ═══════════════════════════════════════════ */

export const webinar = {
  crumbs: [
    { label: 'خانه', href: '/' },
    { label: 'وبینارها', href: '/webinars' },
    { label: 'هوش مصنوعی در منابع انسانی، از اتوماسیون تا ایجنت‌های HR' },
  ],
  badge: { label: 'وبینار آنلاین زنده', outline: true },
  title: 'هوش مصنوعی در منابع انسانی',
  subtitle: 'از اتوماسیون تا ایجنت‌های HR',
  desc: 'یک وبینار تخصصی برای مدیران و متخصصان منابع انسانی و علاقه‌مندان به هوش مصنوعی',
  instructorLabel: 'مدرس:',
  instructor: 'دکتر حسن هژیر افکن',
  avatar: `${A}/staff-ali-ahmadi.png`,
  poster: `${TH}/video-04-ai-introduction.png`,
  live: { label: 'LIVE', viewers: '۳۱۲' },
  chat: {
    title: 'گفتگوی زنده',
    messages: [
      { name: 'علی احمدی', text: 'سلام و وقت بخیر', avatar: `${A}/staff-ali-ahmadi.png` },
      { name: 'سمیرا محمدی', text: 'موضوع بسیار جذاب است', avatar: `${A}/mbti-reviewer-01.png` },
      { name: 'رضا کریمی', text: 'سوالات در زمان و بستر داشته باشیم؟', avatar: `${A}/staff-mohammad-rezaei.png` },
      { name: 'ندا موسوی', text: 'فایل ارائه در دسترس قرار می‌گیرد؟', avatar: `${A}/mbti-reviewer-02.png` },
    ],
    placeholder: 'پیام خود را بنویسید...',
  },
  meta: [
    { label: 'تاریخ:', value: 'چهارشنبه ۱۲ مهر ۱۴۰۵', icon: 'lucide:calendar' },
    { label: 'زمان:', value: '۱۸:۰۰ تا ۲۰:۰۰', icon: 'lucide:clock' },
    { label: 'محل برگزاری:', value: 'آنلاین — پخش زنده آریاز', icon: 'lucide:video' },
    { label: 'ظرفیت:', value: 'نامحدود', icon: 'lucide:users-round' },
  ],
  tabs: [
    { id: 'about', label: 'درباره وبینار', icon: 'lucide:circle-alert' },
    { id: 'learn', label: 'آنچه یاد می‌گیرید', icon: 'lucide:book-open' },
    { id: 'agenda', label: 'سرفصل‌ها', icon: 'lucide:list' },
    { id: 'instructor', label: 'مدرس', icon: 'lucide:user-round' },
    { id: 'audience', label: 'مخاطبان', icon: 'lucide:users-round' },
    { id: 'faq', label: 'سوالات متداول', icon: 'lucide:message-circle' },
  ],
  about: [
    'در این وبینار بررسی می‌کنیم هوش مصنوعی امروز کجای کار منابع انسانی ایستاده است: از اتوماسیون کارهای تکراری تا ایجنت‌هایی که می‌توانند بخشی از فرایندهای HR را مستقل پیش ببرند.',
    'تمرکز جلسه بر کاربردهای واقعی و قابل پیاده‌سازی است، نه وعده‌های کلی؛ هر بخش با نمونه‌ای از یک سازمان واقعی همراه است.',
  ],
  ticket: {
    title: 'انتخاب نوع ثبت‌نام',
    name: 'بلیط شرکت در وبینار',
    price: '۹۹۰,۰۰۰',
    currency: 'تومان',
    perks: [
      'حضور زنده در وبینار',
      'امکان پرسش و پاسخ با مدرس',
      'دسترسی به فایل ارائه',
      'دسترسی به بازپخش تا ۳۰ روز',
    ],
    buy: { label: 'خرید بلیط وبینار', icon: 'lucide:shopping-cart' },
  } as EventTicket,
  group: {
    title: 'ثبت‌نام گروهی',
    forWho: 'برای سازمان‌ها',
    minimum: '۱۰ نفر به بالا',
    discount: '۳۰٪ تخفیف',
    cta: 'درخواست ثبت‌نام گروهی',
    icon: 'lucide:users-round',
  },
  guarantee: 'ضمانت بازگشت وجه تا ۲۴ ساعت قبل از شروع وبینار',
};

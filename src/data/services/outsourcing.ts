import type { ServiceDetailData } from '@/components/org/services/ServiceDetailPage';

/* ──────────────────────────────────────────────────────────────
   برون‌سپاری فرآیندهای منابع انسانی — category landing
   Source: «برون سپاری فرایند ها.png»

   A category landing, so no service rail: this page IS the
   parent. Its spine is the three engagement models, and the
   «کدام مدل مناسب است؟» row exists to route a visitor to whichever
   of them fits — one process, several, or no HR function at all.
────────────────────────────────────────────────────────────── */

export const outsourcing: ServiceDetailData = {
  slug: 'outsourcing',
  family: 'outsourcing',

  meta: {
    title: 'برون‌سپاری فرآیندهای منابع انسانی | آریاز',
    description:
      'بخشی از عملیات منابع انسانی خود را به متخصصان آریاز بسپارید؛ از جذب نیرو تا مدیریت فرآیندهای پرسنلی و ایجاد واحد HR برون‌سپاری‌شده.',
  },

  hero: {
    title: ['برون‌سپاری فرآیندهای', 'منابع انسانی'],
    accentLines: [1],
    desc: 'بخشی از عملیات منابع انسانی خود را به متخصصان آریاز بسپارید؛ از جذب نیرو تا مدیریت فرآیندهای پرسنلی و ایجاد واحد HR برون‌سپاری‌شده.',
    primary: { label: 'درخواست مشاوره سازمانی', icon: 'lucide:arrow-left' },
    secondary: { label: 'مشاهده خدمات', icon: 'lucide:arrow-left' },
    crumbs: [
      { label: 'خدمات سازمانی', href: '/org' },
      { label: 'برون‌سپاری فرآیندها' },
    ],
  },

  problems: {
    title: 'چرا برون‌سپاری؟',
    cards: [
      {
        title: 'تمرکز بر کسب‌وکار اصلی',
        desc: 'کاهش درگیری مدیران با امور اجرایی HR',
        icon: 'lucide:target',
        fg: '#fe7601',
      },
      {
        title: 'کاهش هزینه‌های ثابت',
        desc: 'بدون نیاز به توسعه تیم داخلی بزرگ',
        icon: 'lucide:wallet',
        fg: '#fd841c',
      },
      {
        title: 'دسترسی به متخصصان',
        desc: 'استفاده از تجربه کارشناسان تخصصی',
        icon: 'lucide:user-round',
        fg: '#0547fe',
      },
      {
        title: 'افزایش دقت و انطباق',
        desc: 'کاهش خطاهای اجرایی و قانونی',
        icon: 'lucide:shield-check',
        fg: '#24934b',
      },
    ],
  },

  steps: {
    title: 'فرآیند همکاری با آریاز',
    items: [
      { n: '۱', title: 'شناخت نیاز سازمان', lines: ['بررسی نیازها و اهداف شما'], icon: 'lucide:search', fg: '#fe7601' },
      { n: '۲', title: 'بررسی وضعیت موجود', lines: ['تحلیل فرآیندها و چالش‌ها'], icon: 'lucide:chart-column', fg: '#000f4e' },
      { n: '۳', title: 'پیشنهاد مدل همکاری', lines: ['ارائه راهکار، زمان و هزینه'], icon: 'lucide:clipboard-list', fg: '#fe7601' },
      { n: '۴', title: 'شروع اجرا', lines: ['تخصیص تیم و آغاز خدمات'], icon: 'lucide:rocket', fg: '#000f4e' },
      { n: '۵', title: 'گزارش‌دهی و بهبود', lines: ['پایش مستمر و بهبود عملکرد'], icon: 'lucide:trending-up', fg: '#fe7601' },
    ],
  },

  form: {
    title: 'بخشی از منابع انسانی خود را حرفه‌ای‌تر مدیریت کنید.',
    desc: 'برای دریافت مشاوره تخصصی و شروع همکاری، با ما در ارتباط باشید.',
    assurances: [],
    fields: [
      { label: 'نام سازمان' },
      { label: 'تعداد کارکنان' },
      { label: 'فرآیند موردنظر', kind: 'select' },
      { label: 'شماره تماس' },
    ],
    submit: 'شروع نیازسنجی سازمان',
  },

  extras: [
    {
      kind: 'cards',
      id: 'services',
      after: 'problems',
      title: 'خدمات برون‌سپاری آریاز',
      items: [
        {
          label: 'برون‌سپاری کامل واحد منابع انسانی (HR Department as a Service)',
          desc: 'مناسب برای شرکت‌های کوچک و متوسط که نیاز به یک واحد HR حرفه‌ای دارند اما نمی‌خواهند هزینه ساخت تیم کامل را پرداخت کنند',
          icon: 'lucide:building-2',
          fg: '#fe7601',
          bullets: [
            'طراحی ساختار HR',
            'مدیریت جذب',
            'آموزش و توسعه',
            'ارزیابی عملکرد',
            'مدیریت کارگزینی',
            'روابط کار',
            'گزارش‌های مدیریتی',
          ],
        },
        {
          label: 'برون‌سپاری کارکرد، بیمه و مالیات حقوق',
          desc: 'مناسب برای سازمان‌هایی که می‌خواهند فرآیندهای حساس پرسنلی را دقیق و بدون ریسک مدیریت کنند',
          icon: 'lucide:file-text',
          fg: '#0547fe',
          bullets: [
            'دریافت و کنترل کارکرد',
            'محاسبه اضافه‌کاری، مرخصی و کسری',
            'کنترل مغایرت‌های پرسنلی',
            'تهیه اطلاعات بیمه',
            'محاسبه و کنترل مالیات حقوق',
            'گزارش‌دهی مدیریتی',
          ],
        },
        {
          label: 'برون‌سپاری جذب و استخدام',
          desc: 'مناسب برای سازمان‌هایی که به جذب حرفه‌ای نیاز دارند',
          icon: 'lucide:user-round-plus',
          fg: '#24934b',
          bullets: [
            'تحلیل نیاز استخدام',
            'طراحی پروفایل شغلی',
            'جذب و غربالگری رزومه',
            'مصاحبه تخصصی و رفتاری',
            'ارزیابی گزینه‌ها',
            'ارائه Shortlist نهایی',
          ],
        },
      ],
    },
    {
      kind: 'cards',
      id: 'which-model',
      after: 'problems',
      title: 'کدام مدل برای سازمان شما مناسب است؟',
      items: [
        {
          label: 'فقط یک فرآیند نیاز دارید؟',
          desc: 'پیشنهاد: برون‌سپاری تخصصی — مثال: جذب و استخدام',
          icon: 'lucide:users-round',
          fg: '#fe7601',
        },
        {
          label: 'چند فرآیند اجرایی مشکل دارد؟',
          desc: 'پیشنهاد: برون‌سپاری عملیاتی HR — مثال: کارکرد + بیمه + مالیات',
          icon: 'lucide:settings',
          fg: '#0547fe',
        },
        {
          label: 'واحد HR ندارید؟',
          desc: 'پیشنهاد: HR as a Service — واحد منابع انسانی برون‌سپاری‌شده',
          icon: 'lucide:building-2',
          fg: '#24934b',
        },
      ],
    },
    {
      kind: 'cards',
      id: 'fit',
      after: 'steps',
      title: 'مناسب چه سازمان‌هایی است؟',
      items: [
        {
          label: 'شرکت‌های کوچک و متوسط',
          desc: 'نیازمند نبودن ساخت تیم کامل HR',
          icon: 'lucide:users-round',
          fg: '#24934b',
        },
        {
          label: 'سازمان‌های در حال رشد',
          desc: 'نیازمند افزایش ظرفیت HR',
          icon: 'lucide:trending-up',
          fg: '#0547fe',
        },
        {
          label: 'سازمان‌های بزرگ',
          desc: 'نیازمند کاهش بار اجرایی',
          icon: 'lucide:building-2',
          fg: '#fe7601',
        },
      ],
    },
    {
      kind: 'list',
      id: 'outcomes',
      after: 'steps',
      title: 'خروجی همکاری با آریاز',
      items: [
        { label: 'تیم متخصص و متعهد' },
        { label: 'فرآیندهای استاندارد و منطبق با قوانین' },
        { label: 'گزارش‌های دوره‌ای و داشبورد مدیریتی' },
        { label: 'مستندات اجرایی و گزارش‌های دقیق' },
        { label: 'پشتیبانی و پاسخگویی مستمر' },
      ],
    },
  ],
};

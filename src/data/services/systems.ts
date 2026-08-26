import type { ServiceDetailData } from '@/components/org/services/ServiceDetailPage';

/* ──────────────────────────────────────────────────────────────
   طراحی و استقرار سیستم‌های منابع انسانی — category landing
   Source: «طراحی و اجرای سیستم های منابع انسانی.png»

   Parent of the eight systems detail pages, so no rail. Its
   three numbered service cards (۰۱/۰۲/۰۳) each open onto a
   cluster of those pages, which is why they carry both a
   capability list and a separate «خروجی‌ها» list.
────────────────────────────────────────────────────────────── */

export const systems: ServiceDetailData = {
  slug: 'systems',
  family: 'structure',

  meta: {
    title: 'طراحی و استقرار سیستم‌های منابع انسانی | آریاز',
    description:
      'طراحی زیرساخت‌های حرفه‌ای منابع انسانی متناسب با ساختار، استراتژی و نیازهای واقعی سازمان شما.',
  },

  hero: {
    title: ['طراحی و استقرار', 'سیستم‌های منابع انسانی'],
    accentLines: [1],
    desc: 'طراحی زیرساخت‌های حرفه‌ای منابع انسانی متناسب با ساختار، استراتژی و نیازهای واقعی سازمان شما.',
    primary: { label: 'درخواست ارزیابی سازمان', icon: 'lucide:clipboard-check' },
    secondary: { label: 'مشاهده خدمات', icon: 'lucide:arrow-left' },
    crumbs: [
      { label: 'خدمات سازمانی', href: '/org' },
      { label: 'طراحی و استقرار سیستم‌ها' },
    ],
  },

  problems: {
    title: 'چرا زیرساخت منابع انسانی اهمیت دارد؟',
    cards: [
      {
        title: 'افزایش شفافیت سازمانی',
        desc: 'تعریف نقش‌ها، مسئولیت‌ها و فرآیندها',
        icon: 'lucide:target',
        fg: '#fe7601',
      },
      {
        title: 'تصمیم‌گیری داده‌محور',
        desc: 'ایجاد شاخص‌ها و گزارش‌های مدیریتی',
        icon: 'lucide:chart-column',
        fg: '#fd841c',
      },
      {
        title: 'کاهش وابستگی به افراد',
        desc: 'تبدیل تجربه‌های فردی به سیستم',
        icon: 'lucide:user-round',
        fg: '#0547fe',
      },
      {
        title: 'توسعه پایدار سازمان',
        desc: 'ایجاد زیرساخت رشد سرمایه انسانی',
        icon: 'lucide:shield-check',
        fg: '#24934b',
      },
    ],
  },

  steps: {
    title: 'مدل همکاری با آریاز',
    items: [
      { n: '۰۱', title: 'شناخت سازمان', lines: ['بررسی وضعیت فعلی، نیازها و اهداف سازمان'], icon: 'lucide:search', fg: '#fe7601' },
      { n: '۰۲', title: 'تحلیل Gap', lines: ['شناسایی فاصله بین وضعیت موجود و وضعیت مطلوب'], icon: 'lucide:chart-column', fg: '#000f4e' },
      { n: '۰۳', title: 'طراحی راهکار', lines: ['طراحی مدل مطلوب متناسب با نیازهای سازمان'], icon: 'lucide:shapes', fg: '#fe7601' },
      { n: '۰۴', title: 'استقرار', lines: ['پیاده‌سازی، آموزش و انتقال دانشی به سازمان'], icon: 'lucide:rocket', fg: '#000f4e' },
      { n: '۰۵', title: 'پایش و بهبود', lines: ['اندازه‌گیری اثربخشی و بهبود مستمر سیستم‌ها'], icon: 'lucide:refresh-cw', fg: '#fe7601' },
    ],
  },

  outputs: {
    title: 'نمونه خروجی‌ها',
    items: [
      { label: 'چارت سازمانی', icon: 'lucide:workflow' },
      { label: 'فرآیندهای HR', icon: 'lucide:settings' },
      { label: 'داشبورد مدیریتی', icon: 'lucide:chart-column' },
      { label: 'مدل ارزیابی عملکرد', icon: 'lucide:target' },
      { label: 'نظام جبران خدمات', icon: 'lucide:wallet' },
      { label: 'دستورالعمل‌ها و آیین‌نامه‌ها', icon: 'lucide:file-text' },
    ],
  },

  agent: {
    title: 'مشاور هوشمند آریاز',
    desc: 'نمی‌دانید کدام سیستم برای سازمان شما اولویت دارد؟ با تکمیل اطلاعات، مشاور هوشمند آریاز بهترین مسیر طراحی و استقرار را به شما پیشنهاد می‌دهد.',
    questions: [
      'تعداد کارکنان',
      'مرحله رشد سازمان',
      'مشکلات و چالش‌های فعلی',
      'اهداف و برنامه‌های مدیران',
    ],
    cta: 'شروع نیازسنجی هوشمند',
  },

  form: {
    title: 'سیستم‌های منابع انسانی خود را حرفه‌ای بسازید',
    desc: 'زیرساخت‌های حرفه‌ای HR، سکوی پرتاب سازمان شما به سوی رشد پایدار و عملکرد عالی است.',
    assurances: [],
    fields: [
      { label: 'نام سازمان' },
      { label: 'تعداد کارکنان', kind: 'select' },
      { label: 'مرحله رشد سازمان', kind: 'select' },
      { label: 'شماره تماس' },
    ],
    submit: 'شروع نیازسنجی سازمان',
  },

  extras: [
    {
      kind: 'cards',
      id: 'services',
      after: 'problems',
      title: 'خدمات طراحی و استقرار آریاز',
      items: [
        {
          label: '۰۱ — طراحی ساختار و سازمان (Organizational Design)',
          desc: 'مناسب برای سازمان‌هایی که با رشد بیشتر یا عدم شفافیت ساختاری مواجه هستند',
          icon: 'lucide:users-round',
          fg: '#fe7601',
          bullets: [
            'تحلیل ساختار موجود',
            'طراحی چارت سازمانی',
            'تعریف سطوح سازمانی',
            'مدل Job Family',
            'طراحی شناسنامه مشاغل',
            'تعیین ارتباطات سازمانی',
          ],
        },
        {
          label: '۰۲ — طراحی فرآیندهای منابع انسانی (HR Process Design)',
          desc: 'مناسب برای سازمان‌هایی که فرآیندهای HR آن‌ها سنتی، پراکنده یا وابسته به افراد است',
          icon: 'lucide:workflow',
          fg: '#0547fe',
          bullets: [
            'فرآیند جذب و استخدام',
            'فرآیند ارزیابی عملکرد',
            'آموزش و توسعه',
            'مسیر شغلی',
            'ارتقا و جانشینی',
            'خروج کارکنان',
          ],
        },
        {
          label: '۰۳ — طراحی نظام‌های انگیزشی و برند کارفرمایی (Total Rewards & Employer Branding)',
          desc: 'مناسب برای سازمان‌هایی که دغدغه جذب، نگهداشت و انگیزش کارکنان دارند',
          icon: 'lucide:gift',
          fg: '#fe7601',
          bullets: [
            'طراحی نظام جبران خدمات',
            'طراحی مدل شایستگی',
            'طراحی نظام انگیزشی',
            'تجربه کارکنان',
            'ارزش پیشنهادی کارکنان (EVP)',
            'برند کارفرمایی',
          ],
        },
      ],
    },
    {
      kind: 'cards',
      id: 'approach',
      after: 'steps',
      title: 'رویکرد آریاز',
      items: [
        {
          label: 'فناوری و نوآوری',
          desc: 'استفاده از ابزارهای دیجیتال و هوش مصنوعی در طراحی و افزایش کارایی و دقت',
          icon: 'lucide:zap',
          fg: '#fe7601',
        },
        {
          label: 'تجربه اجرایی',
          desc: 'شناخت عمیق چالش‌های واقعی سازمان‌ها و ارائه راهکارهای عملیاتی',
          icon: 'lucide:briefcase',
          fg: '#fd841c',
        },
        {
          label: 'دانش مدیریتی',
          desc: 'استفاده از مدل‌ها و روش‌های علمی و روز مدیریت منابع انسانی',
          icon: 'lucide:lightbulb',
          fg: '#0547fe',
        },
      ],
    },
    {
      kind: 'cards',
      id: 'fit',
      after: 'outputs',
      title: 'مناسب چه سازمان‌هایی است؟',
      items: [
        {
          label: 'سازمان‌های بزرگ',
          desc: 'نیازمند استانداردسازی و یکپارچه‌سازی سیستم‌ها',
          icon: 'lucide:building-2',
          fg: '#0547fe',
        },
        {
          label: 'سازمان‌های در حال تحول',
          desc: 'نیازمند بازطراحی و بهبود سیستم‌های موجود',
          icon: 'lucide:refresh-cw',
          fg: '#24934b',
        },
        {
          label: 'سازمان‌های در حال رشد',
          desc: 'نیازمند ساخت زیرساخت‌های منابع انسانی',
          icon: 'lucide:trending-up',
          fg: '#fe7601',
        },
      ],
    },
  ],
};

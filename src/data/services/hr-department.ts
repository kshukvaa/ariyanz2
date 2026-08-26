import type { ServiceDetailData } from '@/components/org/services/ServiceDetailPage';

/* ──────────────────────────────────────────────────────────────
   برون‌سپاری کامل واحد منابع انسانی (HR as a Service)
   Source: «برون سپاری منابع انسانی.png»

   The pitch is a whole HR function without the fixed cost of
   building one, so the page leads with the four situations that
   make that the right call, then offers three depths of
   engagement — full, hybrid, or a single process.
────────────────────────────────────────────────────────────── */

export const hrDepartment: ServiceDetailData = {
  slug: 'hr-department',
  family: 'outsourcing',

  meta: {
    title: 'برون‌سپاری واحد منابع انسانی | آریاز',
    description:
      'با برون‌سپاری منابع انسانی به آریاز، تمامی یا بخشی از فعالیت‌های HR سازمان خود را به متخصصان بسپارید و بدون ایجاد ساختار سنگین، از یک تیم حرفه‌ای منابع انسانی بهره‌مند شوید.',
  },

  hero: {
    title: ['واحد منابع انسانی حرفه‌ای؛', 'بدون ساخت هزینه‌های ثابت'],
    accentLines: [1],
    desc: 'با برون‌سپاری منابع انسانی به آریاز، تمامی یا بخشی از فعالیت‌های HR سازمان خود را به متخصصان بسپارید و بدون ایجاد ساختار سنگین، از یک تیم حرفه‌ای منابع انسانی بهره‌مند شوید.',
    primary: { label: 'درخواست ارزیابی سازمان', icon: 'lucide:clipboard-check' },
    secondary: { label: 'مشاهده خدمات قابل ارائه', icon: 'lucide:file-text' },
    crumbs: [
      { label: 'خدمات سازمانی', href: '/org' },
      { label: 'برون‌سپاری فرآیندها', href: '/org/outsourcing' },
      { label: 'برون‌سپاری واحد منابع انسانی' },
    ],
  },

  problems: {
    title: 'چه زمانی برون‌سپاری منابع انسانی انتخاب مناسبی است؟',
    cards: [
      {
        title: 'سازمان ما رشد کرده اما HR همراه رشد نشده',
        desc: 'راهکار آریاز: ایجاد ساختار و فرآیندهای منابع انسانی',
        icon: 'lucide:trending-up',
        fg: '#fe7601',
      },
      {
        title: 'یک نفر همه کارهای HR را انجام می‌دهد',
        desc: 'راهکار آریاز: تأمین تیم تخصصی و کاهش فشار کاری',
        icon: 'lucide:user-round',
        fg: '#fd841c',
      },
      {
        title: 'هزینه ساخت واحد HR برای ما بالاست',
        desc: 'راهکار آریاز: دریافت خدمات حرفه‌ای با هزینه بهینه',
        icon: 'lucide:wallet',
        fg: '#24934b',
      },
      {
        title: 'مدیران نیاز به پشتیبانی و مشاوره منابع انسانی دارند',
        desc: 'راهکار آریاز: مشاوره و همراهی مستمر مدیران',
        icon: 'lucide:users-round',
        fg: '#0547fe',
      },
    ],
  },

  steps: {
    title: 'فرآیند شروع همکاری',
    items: [
      { n: '۱', title: 'شناخت سازمان', lines: ['بررسی نیازها و اهداف سازمان'], icon: 'lucide:search', fg: '#fe7601' },
      { n: '۲', title: 'ارزیابی وضعیت HR', lines: ['تحلیل فرآیندها و شناسایی شکاف‌ها'], icon: 'lucide:chart-column', fg: '#fd841c' },
      { n: '۳', title: 'طراحی مدل همکاری', lines: ['تدوین راهکار و تعیین سطح خدمات'], icon: 'lucide:clipboard-list', fg: '#24934b' },
      { n: '۴', title: 'استقرار تیم', lines: ['تأمین نیروی متخصص و شروع اجرا'], icon: 'lucide:users-round', fg: '#0547fe' },
      { n: '۵', title: 'پایش و بهبود مستمر', lines: ['گزارشگیری، تحلیل و ارتقای عملکرد'], icon: 'lucide:refresh-cw', fg: '#5d35fc' },
    ],
  },

  form: {
    title: 'منابع انسانی را به یک مزیت رقابتی تبدیل کنید',
    desc: 'آریاز کنار شماست تا بدون ایجاد ساختار سنگین، یک واحد منابع انسانی حرفه‌ای داشته باشید.',
    assurances: [],
    fields: [
      { label: 'تعداد کارکنان سازمان', kind: 'select' },
      { label: 'وضعیت فعلی منابع انسانی شما چگونه است؟', kind: 'select' },
      { label: 'مهم‌ترین چالش شما در حوزه HR چیست؟', kind: 'select' },
      { label: 'سطح خدمات مورد انتظار شما چیست؟', kind: 'select' },
    ],
    submit: 'ارزیابی و دریافت پیشنهاد',
  },

  extras: [
    {
      kind: 'cards',
      id: 'models',
      after: 'problems',
      title: 'مدل‌های همکاری با آریاز',
      items: [
        {
          label: 'HR کامل برون‌سپاری‌شده',
          desc: 'مناسب برای سازمان‌هایی که واحد HR ندارند یا می‌خواهند کامل واگذار کنند',
          icon: 'lucide:building-2',
          fg: '#fe7601',
          bullets: [
            'سیاست‌ها و فرآیندهای HR',
            'جذب و استخدام',
            'مدیریت عملکرد',
            'آموزش و توسعه',
            'مدیریت پرونده پرسنلی',
            'گزارش‌های مدیریتی',
          ],
        },
        {
          label: 'HR مشارکتی (Hybrid)',
          desc: 'مناسب برای سازمان‌هایی که بخشی از تیم داخلی را دارند',
          icon: 'lucide:handshake',
          fg: '#0547fe',
          bullets: [
            'تکمیل ظرفیت منابع انسانی',
            'تأمین تخصص‌های موردنیاز',
            'اجرای پروژه‌های توسعه‌ای',
            'استانداردسازی فرآیندها',
          ],
        },
        {
          label: 'برون‌سپاری یک فرآیند خاص',
          desc: 'مناسب برای واگذاری یک حوزه مشخص از منابع انسانی',
          icon: 'lucide:refresh-cw',
          fg: '#24934b',
          bullets: [
            'جذب و استخدام',
            'آموزش و توسعه',
            'ارزیابی عملکرد',
            'حقوق و مزایا',
            'روابط کارکنان',
          ],
        },
      ],
    },
    {
      kind: 'cards',
      id: 'domains',
      after: 'steps',
      title: 'حوزه‌هایی که آریاز مدیریت می‌کند',
      items: [
        { label: 'جذب و استخدام', desc: 'تأمین نیرو، غربالگری، مصاحبه و ارزیابی', icon: 'lucide:user-round-plus', fg: '#dc2326' },
        { label: 'مدیریت عملکرد', desc: 'هدف‌گذاری، KPI، ارزیابی، بازخورد و بهبود', icon: 'lucide:target', fg: '#fe7601' },
        { label: 'توسعه کارکنان', desc: 'آموزش، مسیر شغلی و جانشین‌پروری', icon: 'lucide:graduation-cap', fg: '#24934b' },
        { label: 'روابط کارکنان', desc: 'قوانین کار، انضباط، مستندسازی و پرونده‌ها', icon: 'lucide:users-round', fg: '#0547fe' },
        { label: 'حقوق و مزایا', desc: 'طراحی ساختار پرداخت، بیمه و تحلیل هزینه', icon: 'lucide:wallet', fg: '#5d35fc' },
        { label: 'گزارش‌های مدیریتی HR', desc: 'داشبورد، تحلیل داده‌ها و گزارش تصمیم‌گیری', icon: 'lucide:chart-column', fg: '#0547fe' },
      ],
    },
    {
      kind: 'list',
      id: 'benefits',
      after: 'outputs',
      title: 'مزایای همکاری',
      items: [
        { label: 'داشتن واحد HR حرفه‌ای بدون هزینه ثابت بالا' },
        { label: 'تمرکز مدیران روی کسب‌وکار اصلی' },
        { label: 'کاهش ریسک‌های منابع انسانی' },
        { label: 'دسترسی به متخصصان چند حوزه' },
        { label: 'داشتن واحد HR بهتر درباره سرمایه انسانی' },
      ],
    },
  ],
};

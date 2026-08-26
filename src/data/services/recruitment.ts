import type { ServiceDetailData } from '@/components/org/services/ServiceDetailPage';

/* ──────────────────────────────────────────────────────────────
   برون‌سپاری جذب و استخدام
   Source: «برون_سپاری جذب و استخدام.png»

   Distinct from /org/systems/hiring-system: that page DESIGNS a
   hiring system for the client to run; this one RUNS the hiring
   on their behalf. Same domain, opposite division of labour —
   worth keeping the two straight when cross-linking.
────────────────────────────────────────────────────────────── */

export const recruitment: ServiceDetailData = {
  slug: 'recruitment',
  family: 'outsourcing',

  meta: {
    title: 'برون‌سپاری جذب و استخدام | آریاز',
    description:
      'از جذب نیروهای عملیاتی تا شناسایی مدیران و متخصصان کلیدی، آریاز تمام فرآیند جذب و انتخاب را با رویکردی تخصصی و داده‌محور همراه شما انجام می‌دهد.',
  },

  hero: {
    title: ['نیروی مناسب را پیدا کنید؛', 'ما مسیر جذب را مدیریت می‌کنیم'],
    accentLines: [1],
    desc: 'از جذب نیروهای عملیاتی تا شناسایی مدیران و متخصصان کلیدی، آریاز تمام فرآیند جذب و انتخاب را با رویکردی تخصصی و داده‌محور همراه شما انجام می‌دهد.',
    primary: { label: 'درخواست جذب نیرو', icon: 'lucide:user-round-plus' },
    secondary: { label: 'مشاوره با متخصص جذب', icon: 'lucide:users-round' },
    crumbs: [
      { label: 'خدمات سازمانی', href: '/org' },
      { label: 'برون‌سپاری فرآیندها', href: '/org/outsourcing' },
      { label: 'برون‌سپاری جذب و استخدام' },
    ],
  },

  problems: {
    title: 'چرا سازمان‌ها جذب را به آریاز می‌سپارند؟',
    cards: [
      {
        title: 'ارزیابی حرفه‌ای و استاندارد',
        desc: 'با ابزارها و روش‌های تخصصی آریاز',
        icon: 'lucide:clipboard-check',
        fg: '#fe7601',
      },
      {
        title: 'کاهش ریسک استخدام اشتباه',
        desc: 'انتخاب آگاهانه با ارزیابی دقیق',
        icon: 'lucide:shield-check',
        fg: '#24934b',
      },
      {
        title: 'دسترسی به شبکه گسترده استعدادها',
        desc: 'بهترین گزینه‌ها را سریع‌تر پیدا کنید',
        icon: 'lucide:users-round',
        fg: '#0547fe',
      },
      {
        title: 'صرفه‌جویی در زمان مدیران',
        desc: 'تمرکز شما روی رشد کسب‌وکار',
        icon: 'lucide:clock',
        fg: '#5d35fc',
      },
    ],
  },

  steps: {
    title: 'فرآیند جذب و استخدام آریاز',
    items: [
      { n: '۱', title: 'شناخت و نیاز', lines: ['تحلیل نیاز سازمان و شرایط شغل'], icon: 'lucide:search', fg: '#24934b' },
      { n: '۲', title: 'طراحی پروفایل شغل', lines: ['تعریف شرایط احراز، مهارت‌ها و تجربه موردنیاز'], icon: 'lucide:file-text', fg: '#0547fe' },
      { n: '۳', title: 'جستجوی کاندیدا', lines: ['جستجو در منابع مختلف و شبکه‌های تخصصی'], icon: 'lucide:scan-eye', fg: '#5d35fc' },
      { n: '۴', title: 'ارزیابی و مصاحبه', lines: ['ارزیابی تخصصی، رفتاری و شایستگی‌ها'], icon: 'lucide:clipboard-check', fg: '#fe7601' },
      { n: '۵', title: 'معرفی گزینه‌ها', lines: ['ارائه گزارش مقایسه‌ای و پیشنهاد نهایی'], icon: 'lucide:users-round', fg: '#dc2326' },
      { n: '۶', title: 'همراهی تا استخدام', lines: ['پشتیبانی در مذاکره و شروع همکاری'], icon: 'lucide:handshake', fg: '#24934b' },
    ],
  },

  agent: {
    title: 'نمی‌دانید چه نوع خدمتی برای جذب نیاز دارید؟',
    desc: 'با آریابا، دستیار هوشمند جذب آریاز صحبت کنید. در چند دقیقه مشخص می‌کند:',
    questions: [
      'آیا نیاز شما جذب معمولی است؟',
      'آیا هد هانتینگ لازم دارید؟',
      'آیا فرآیند جذب نیاز به بازطراحی دارد؟',
    ],
    cta: 'شروع گفتگو با آریا',
  },

  form: {
    title: 'نیروی مناسب، شروع رشد سازمان است',
    desc: 'اجازه دهید آریاز مسیر پیدا کردن و انتخاب بهترین افراد را برای شما ساده‌تر کند.',
    assurances: [],
    fields: [
      { label: 'عنوان شغل' },
      { label: 'سطح سازمانی', kind: 'select' },
      { label: 'تعداد نفرات' },
      { label: 'محل فعالیت', kind: 'select' },
      { label: 'زمان مورد نیاز استخدام', kind: 'select' },
      { label: 'نوع خدمت مورد نظر', kind: 'select' },
      { label: 'توضیحات تکمیلی (اختیاری)' },
    ],
    submit: 'بررسی نیاز استخدامی',
  },

  extras: [
    {
      kind: 'cards',
      id: 'how-we-help',
      after: 'problems',
      title: 'آریاز چگونه به شما کمک می‌کند؟',
      items: [
        {
          label: 'استخدام تخصصی',
          desc: 'برای کارشناسان، سرپرستان و نیروهای عملیاتی',
          icon: 'lucide:user-round',
          fg: '#fe7601',
          bullets: ['جستجو و هدفمند', 'ارزیابی تخصصی و رفتاری', 'معرفی بهترین گزینه‌ها'],
        },
        {
          label: 'هد هانتینگ',
          desc: 'برای مدیران ارشد، متخصصان کمیاب و افراد کلیدی سازمان',
          icon: 'lucide:scan-eye',
          fg: '#0547fe',
          bullets: ['جستجوی محرمانه', 'شناسایی استعدادهای پنهان', 'ارزیابی عمیق و دقیق'],
        },
        {
          label: 'طراحی فرآیند جذب',
          desc: 'برای سازمان‌هایی که فرآیند جذب دارند ولی نتیجه مطلوب نمی‌گیرند',
          icon: 'lucide:workflow',
          fg: '#24934b',
          bullets: ['تحلیل و طراحی فرآیند', 'ابزارها و فرم‌های استاندارد', 'بهبود تجربه کاندیدا'],
        },
      ],
    },
    {
      kind: 'cards',
      id: 'headhunting',
      after: 'problems',
      title: 'بهترین افراد همیشه دنبال شغل نیستند',
      items: [
        {
          label: 'مناسب برای',
          desc: 'آریاز با رویکرد Executive به دنبال استعدادهایی می‌رود که در بازار فعال نیستند اما می‌توانند کننده سازمان شما را متحول کنند',
          icon: 'lucide:scan-eye',
          fg: '#fe7601',
          bullets: [
            'مدیرعامل و مدیران ارشد',
            'مدیران کلیدی و راهبردی',
            'متخصصان کمیاب و خاص',
            'نقش‌های حساس و حیاتی',
          ],
        },
      ],
    },
    {
      kind: 'cards',
      id: 'specialisms',
      after: 'steps',
      title: 'حوزه‌های تخصصی جذب آریاز',
      items: [
        { label: 'فروش و بازاریابی', icon: 'lucide:megaphone', fg: '#fe7601' },
        { label: 'منابع انسانی', icon: 'lucide:users-round', fg: '#5d35fc' },
        { label: 'مالی و حسابداری', icon: 'lucide:calculator', fg: '#dc2326' },
        { label: 'تولید و عملیات', icon: 'lucide:settings', fg: '#fd841c' },
        { label: 'زنجیره تأمین و خرید', icon: 'lucide:package-open', fg: '#0547fe' },
        { label: 'فناوری اطلاعات', icon: 'lucide:monitor-play', fg: '#24934b' },
        { label: 'و سایر حوزه‌ها', icon: 'lucide:ellipsis', fg: '#9396b0' },
      ],
    },
  ],
};

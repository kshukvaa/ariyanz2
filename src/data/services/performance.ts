import type { ServiceDetailData } from '@/components/org/services/ServiceDetailPage';
import { systemsCrumbs } from './_systemsHero';

/* ──────────────────────────────────────────────────────────────
   طراحی و استقرار نظام مدیریت عملکرد
   Source: «طراحی و استقرار سیستم های مدیریت عملکرد.png»

   The page's argument is «مدیریت عملکرد ≠ فرم ارزیابی» — that
   the system is a three-phase cycle, not an annual form. That
   block sits directly under the problems because it reframes
   them before the method is introduced.
────────────────────────────────────────────────────────────── */

export const performance: ServiceDetailData = {
  slug: 'performance',
  family: 'specialist',
  navId: 'performance',

  meta: {
    title: 'طراحی و استقرار نظام مدیریت عملکرد | آریاز',
    description:
      'آریاز نظام مدیریت عملکرد را طوری طراحی می‌کند که اهداف سازمان به اهداف واحدها و افراد متصل شوند، شاخص‌ها قابل سنجش باشند و ارزیابی به یک چرخه مستمر تبدیل شود.',
  },

  hero: {
    title: ['مدیریت عملکرد؛', 'از هدف‌گذاری تا گفت‌وگوی واقعی درباره نتیجه'],
    accentLines: [1],
    desc: 'آریاز نظام مدیریت عملکرد را طوری طراحی می‌کند که اهداف سازمان به اهداف واحدها و افراد متصل شوند، شاخص‌ها قابل سنجش باشند و ارزیابی از یک فرم سالانه به یک چرخه مستمر مدیریت عملکرد تبدیل شود.',
    primary: { label: 'درخواست ارزیابی نظام عملکرد', icon: 'lucide:clipboard-check' },
    secondary: { label: 'مشاوره با متخصص', icon: 'lucide:users-round' },
    crumbs: systemsCrumbs('طراحی و استقرار نظام مدیریت عملکرد'),
  },

  problems: {
    title: 'این خدمت چه مسئله‌ای را حل می‌کند؟',
    cards: [
      {
        title: 'ارزیابی انجام می‌شود ولی بعدش اتفاقی نمی‌افتد',
        desc: 'بازخورد، توسعه و اقدام اصلاحی به فرآیند وصل نیست.',
        icon: 'lucide:trending-up',
        fg: '#24934b',
      },
      {
        title: 'ارزیابی‌ها سلیقه‌ای شده‌اند',
        desc: 'نتیجه بیش از داده به برداشت مدیر وابسته است.',
        icon: 'lucide:user-round',
        fg: '#0547fe',
      },
      {
        title: 'KPIها زیادند اما تصمیم‌ساز نیستند',
        desc: 'شاخص هست، اما کیفیت طراحی و منطق سنجش مشخص نیست.',
        icon: 'lucide:list-checks',
        fg: '#fe7601',
      },
      {
        title: 'اهداف کارکنان با اهداف سازمان همسو نیست',
        desc: 'افراد کار می‌کنند اما معلوم نیست سهم هر نتیجه در کسب‌وکار چیست.',
        icon: 'lucide:users-round',
        fg: '#dc2326',
      },
    ],
  },

  steps: {
    title: 'فرآیند اجرای پروژه',
    items: [
      { n: '۱', title: 'شناخت استراتژی و مدل کسب‌وکار', lines: ['اهداف، ساختار و نقش‌ها'], icon: 'lucide:search', fg: '#24934b' },
      { n: '۲', title: 'طراحی معماری عملکرد', lines: ['سطوح ارزیابی و منطق Cascading'], icon: 'lucide:workflow', fg: '#0547fe' },
      { n: '۳', title: 'طراحی اهداف و KPIها', lines: ['معیار، فرمول، Target و وزن'], icon: 'lucide:target', fg: '#5d35fc' },
      { n: '۴', title: 'طراحی فرآیند ارزیابی', lines: ['Mid-term، Final، Self و Manager'], icon: 'lucide:clipboard-check', fg: '#fe7601' },
      { n: '۵', title: 'طراحی Feedback و Development', lines: ['گفت‌وگوی عملکرد و برنامه اقدام'], icon: 'lucide:message-circle', fg: '#dc2326' },
      { n: '۶', title: 'استقرار و آموزش', lines: ['آموزش مدیران، Pilot و اجرای دوره'], icon: 'lucide:rocket', fg: '#24934b' },
    ],
  },

  agent: {
    title: 'ایجنت هوشمند مدیریت عملکرد آریاز',
    desc: 'نظام عملکرد شما واقعاً عملکرد را مدیریت می‌کند؟',
    questions: [
      'آیا اهداف سازمان به افراد Cascade می‌شوند؟',
      'آیا KPIها اصول و منبع داده مشخص دارند؟',
      'مدیران بازخورد ساختاریافته می‌دهند؟',
      'نتیجه ارزیابی به توسعه و پاداش متصل است؟',
    ],
    cta: 'شروع ارزیابی نظام عملکرد',
  },

  form: {
    title: 'عملکرد را از یک فرم اداری به ابزار مدیریت کسب‌وکار تبدیل کنید',
    desc: 'با تکمیل فرم زیر، کارشناسان آریاز با شما تماس می‌گیرند.',
    assurances: [],
    fields: [
      { label: 'نام سازمان' },
      { label: 'دوره ارزیابی فعلی' },
      { label: 'مهم‌ترین چالش' },
      { label: 'تعداد کارکنان' },
      { label: 'آیا نظام عملکرد دارید؟', kind: 'select' },
      { label: 'شماره تماس' },
    ],
    submit: 'درخواست بررسی نظام مدیریت عملکرد',
  },

  extras: [
    {
      kind: 'steps',
      id: 'not-a-form',
      after: 'problems',
      title: 'مدیریت عملکرد ≠ فرم ارزیابی',
      items: [
        { n: '۱', title: 'قبل از دوره', lines: ['هدف‌گذاری و توافق'] },
        { n: '۲', title: 'حین دوره', lines: ['پایش، ثبت داده و Coaching'] },
        { n: '۳', title: 'پایان دوره', lines: ['ارزیابی، بازخورد و اقدام'] },
      ],
    },
    {
      kind: 'radial',
      id: 'architecture',
      after: 'problems',
      title: 'معماری نظام مدیریت عملکرد آریاز',
      centre: 'Performance Management System',
      items: [
        { label: 'اهداف سازمانی', icon: 'lucide:target' },
        { label: 'اهداف واحدی', icon: 'lucide:users-round' },
        { label: 'اهداف فردی', icon: 'lucide:user-round' },
        { label: 'KPI', icon: 'lucide:gauge' },
        { label: 'Target', icon: 'lucide:crosshair' },
        { label: 'وزن', icon: 'lucide:scale' },
        { label: 'داده عملکرد', icon: 'lucide:chart-column' },
        { label: 'ارزیابی', icon: 'lucide:clipboard-check' },
        { label: 'بازخورد', icon: 'lucide:message-circle' },
        { label: 'پاداش و تصمیمات HR', icon: 'lucide:trophy' },
      ],
    },
    {
      kind: 'stats',
      id: 'dashboard',
      after: 'steps',
      title: 'نمونه داشبورد عملکرد',
      items: [
        { value: '۸۲٪', label: 'عملکرد کلی سازمان', fg: '#24934b' },
        { value: '۷۸٪', label: 'تحقق اهداف', fg: '#0547fe' },
        { value: '۱۲٪', label: 'KPIهای بحرانی', fg: '#dc2326' },
        { value: '۲۴', label: 'اقدام اصلاحی', fg: '#fe7601' },
      ],
    },
    {
      kind: 'radial',
      id: 'links',
      after: 'outputs',
      title: 'اتصال عملکرد به سایر سیستم‌های HR',
      centre: 'مدیریت عملکرد',
      items: [
        { label: 'آموزش و توسعه', icon: 'lucide:graduation-cap' },
        { label: 'جبران خدمت', icon: 'lucide:wallet' },
        { label: 'ارتقا', icon: 'lucide:trending-up' },
        { label: 'جانشین‌پروری', icon: 'lucide:users-round' },
        { label: 'مدیریت استعداد', icon: 'lucide:star' },
        { label: 'تصمیمات مدیریتی', icon: 'lucide:briefcase' },
      ],
    },
    {
      kind: 'list',
      id: 'measurable',
      after: 'outputs',
      title: 'آیا همه اهداف قابل اندازه‌گیری هستند؟',
      items: [
        { label: 'هدف باید Outcome داشته باشد' },
        { label: 'KPI باید بر معیار واقعی نتیجه باشد' },
        { label: 'Target باید شفاف باشد' },
        { label: 'باید اولویت را نشان دهد' },
        { label: 'داده باید منبع معتبر داشته باشد' },
      ],
    },
    {
      kind: 'cards',
      id: 'kpi-example',
      after: 'outputs',
      title: 'مثال طراحی هدف و KPI',
      items: [
        { label: 'هدف', desc: 'افزایش بهره‌وری فروش', icon: 'lucide:target', fg: '#24934b' },
        { label: 'KPI', desc: 'فروش خالص به ازای هر فروشنده', icon: 'lucide:gauge', fg: '#0547fe' },
        { label: 'Target', desc: '+۲۶٪', icon: 'lucide:trending-up', fg: '#fe7601' },
      ],
    },
    {
      kind: 'list',
      id: 'deliverables',
      after: 'steps',
      title: 'خروجی‌های پروژه',
      items: [
        { label: 'مدل مدیریت عملکرد سازمان' },
        { label: 'ساختار اهداف و KPIها' },
        { label: 'فرهنگ‌نامه شاخص‌ها' },
        { label: 'فرمول‌های سنجش' },
        { label: 'Targetها و وزن‌ها' },
        { label: 'فرم‌ها و گردش کار' },
        { label: 'مدل ارزیابی میان‌دوره و پایان دوره' },
        { label: 'مدل Feedback' },
        { label: 'گزارش مدیریتی' },
        { label: 'اتصال به توسعه و جبران خدمت' },
        { label: 'راهنمای مدیران' },
        { label: 'آموزش استقرار' },
      ],
    },
  ],
};

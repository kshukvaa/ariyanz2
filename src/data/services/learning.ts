import type { ServiceDetailData } from '@/components/org/services/ServiceDetailPage';
import { systemsCrumbs } from './_systemsHero';

/* ──────────────────────────────────────────────────────────────
   طراحی و استقرار نظام آموزش و یادگیری
   Source: «طراحی و استقرار نظام آموزش و یادگیری.png»

   UNCERTAIN — the agent card draws a maturity score reading
   «۵۱ از ۴۵», which cannot be right (a score above its own
   maximum). Rather than guess at ۳۱ or ۴۵, the score is omitted
   and only the questions are kept. Worth re-checking the source.
────────────────────────────────────────────────────────────── */

export const learning: ServiceDetailData = {
  slug: 'learning',
  family: 'specialist',
  navId: 'learning',

  meta: {
    title: 'طراحی و استقرار نظام آموزش و یادگیری | آریاز',
    description:
      'آریاز نظام آموزش و یادگیری سازمان را از شناسایی نیاز واقعی تا طراحی مسیر توسعه، اجرا، ارزیابی اثربخشی و اتصال یادگیری به عملکرد طراحی و مستقر می‌کند.',
  },

  hero: {
    title: [
      'آموزش زیاد، الزاماً به معنی یادگیری نیست',
      'نظامی بسازید که',
      'یادگیری را به عملکرد تبدیل کند',
    ],
    accentLines: [2],
    desc: 'آریاز نظام آموزش و یادگیری سازمان را از شناسایی نیاز واقعی تا طراحی مسیر توسعه، اجرا، ارزیابی اثربخشی و اتصال یادگیری به عملکرد طراحی و مستقر می‌کند.',
    primary: { label: 'درخواست ارزیابی نظام آموزش و یادگیری', icon: 'lucide:clipboard-check' },
    secondary: { label: 'مشاوره با متخصص', icon: 'lucide:users-round' },
    crumbs: systemsCrumbs('طراحی و استقرار نظام آموزش و یادگیری'),
  },

  problems: {
    title: 'سازمان شما «آموزش» می‌دهد یا واقعاً «یادگیری» ایجاد می‌کند؟',
    cards: [
      {
        title: 'بعد از دوره، فرآیند تمام می‌شود',
        desc: 'انتقال یادگیری به محیط کار و تغییر رفتار پایدار نمی‌شود.',
        icon: 'lucide:graduation-cap',
        fg: '#0547fe',
      },
      {
        title: 'برای همه تقریباً یک نسخه آموزشی داریم',
        desc: 'مسیر یادگیری متناسب با نقش، شغل، شایستگی و سطح افراد طراحی نشده است.',
        icon: 'lucide:users-round',
        fg: '#5d35fc',
      },
      {
        title: 'نیازسنجی تبدیل به لیست درخواست دوره‌ها شده',
        desc: 'ارتباط مشخصی بین نیاز آموزشی و شکاف عملکرد وجود ندارد.',
        icon: 'lucide:clipboard-list',
        fg: '#24934b',
      },
      {
        title: 'دوره زیاد برگزار می‌کنیم اما اثرش مشخص نیست',
        desc: 'نمی‌دانیم آموزش واقعاً چه تغییری ایجاد کرده است.',
        icon: 'lucide:trending-up',
        fg: '#dc2326',
      },
    ],
  },

  steps: {
    title: 'فرآیند اجرای پروژه',
    items: [
      { n: '۱', title: 'شناخت استراتژی و موقعیت فعلی', lines: [], icon: 'lucide:search', fg: '#0547fe' },
      { n: '۲', title: 'طراحی مدل و شایستگی‌ها', lines: ['نیازسنجی'], icon: 'lucide:target', fg: '#24934b' },
      { n: '۳', title: 'تحلیل شکاف یادگیری', lines: [], icon: 'lucide:chart-column', fg: '#5d35fc' },
      { n: '۴', title: 'طراحی Learning Architecture', lines: [], icon: 'lucide:layers', fg: '#fe7601' },
      { n: '۵', title: 'طراحی فرآیند اجرا و ارزیابی', lines: [], icon: 'lucide:clipboard-check', fg: '#0547fe' },
      { n: '۶', title: 'اثربخشی، Pilot و استقرار', lines: [], icon: 'lucide:rocket', fg: '#24934b' },
    ],
  },

  agent: {
    title: 'ایجنت هوشمند آموزش و یادگیری آریاز',
    desc: 'مهم‌ترین شکاف شما، اتصال آموزش به عملکرد و سنجش تغییر رفتار است.',
    questions: [
      'آیا نیازسنجی آموزشی مبتنی بر شکاف عملکرد است؟',
      'مسیر یادگیری متناسب با نقش طراحی شده؟',
      'اثربخشی آموزش را چطور می‌سنجید؟',
      'یادگیری به مسیر شغلی متصل است؟',
    ],
    cta: 'شروع ارزیابی نظام یادگیری',
  },

  form: {
    title: 'آموزش را از «هزینه برگزاری دوره» به «سرمایه‌گذاری روی عملکرد» تبدیل کنید',
    desc: 'با تکمیل فرم زیر، کارشناسان آریاز با شما تماس می‌گیرند.',
    assurances: [],
    fields: [
      { label: 'نام سازمان' },
      { label: 'تعداد کارکنان' },
      { label: 'آیا نظام آموزشی دارید؟', kind: 'select' },
      { label: 'تعداد دوره سالانه', kind: 'select' },
      { label: 'مهم‌ترین چالش آموزشی', kind: 'select' },
      { label: 'شماره تماس' },
    ],
    submit: 'درخواست بررسی نظام آموزش و یادگیری',
  },

  extras: [
    {
      kind: 'radial',
      id: 'architecture',
      after: 'problems',
      title: 'معماری نظام آموزش آریاز',
      centre: 'Learning & Development System',
      items: [
        { label: 'کسب‌وکار', icon: 'lucide:briefcase' },
        { label: 'شایستگی موردنیاز', icon: 'lucide:star' },
        { label: 'تحلیل شکاف', icon: 'lucide:chart-column' },
        { label: 'نیازسنجی آموزشی', icon: 'lucide:clipboard-list' },
        { label: 'طراحی', icon: 'lucide:shapes' },
        { label: 'مسیرهای یادگیری', icon: 'lucide:route' },
        { label: 'اجرای یادگیری', icon: 'lucide:play' },
        { label: 'ارزیابی یادگیری', icon: 'lucide:clipboard-check' },
        { label: 'تحلیل اثربخشی', icon: 'lucide:trending-up' },
        { label: 'بازخوردگیری', icon: 'lucide:message-circle' },
      ],
    },
    {
      kind: 'cards',
      id: 'need-sources',
      after: 'problems',
      title: 'نیاز آموزشی از کجا می‌آید؟',
      items: [
        { label: 'سازمان', desc: 'استراتژی، تغییرات، تکنولوژی و برنامه‌ها', icon: 'lucide:building-2', fg: '#0547fe' },
        { label: 'شغل', desc: 'وظایف، استانداردها، شایستگی‌های موردنیاز', icon: 'lucide:briefcase', fg: '#24934b' },
        { label: 'فرد', desc: 'عملکرد، شایستگی و شکاف توسعه‌ای', icon: 'lucide:user-round', fg: '#fe7601' },
        { label: 'آینده', desc: 'مسیر شغلی، جانشین‌پروری و نقش‌های آینده', icon: 'lucide:trending-up', fg: '#5d35fc' },
      ],
    },
    {
      kind: 'steps',
      id: 'path-example',
      after: 'problems',
      title: 'از «دوره» به «مسیر یادگیری» — مثال مسیر شغلی: مدیر فروش',
      items: [
        { n: '۱', title: 'مدیریت فروش', lines: ['محتوای دیجیتال'] },
        { n: '۲', title: 'تحلیل عملکرد', lines: ['کارگاه حضوری'] },
        { n: '۳', title: 'تیم Coaching', lines: ['تمرین و فعالیت'] },
        { n: '۴', title: 'مذاکره پیشرفته', lines: ['Assignment'] },
        { n: '۵', title: 'رهبری فروش', lines: ['Assessment'] },
      ],
    },
    {
      kind: 'funnel',
      id: 'kirkpatrick',
      after: 'steps',
      title: 'مدل ارزیابی اثربخشی آموزش (Kirkpatrick)',
      items: [
        { label: 'Reaction (رضایت)', value: '۹۲٪', fg: '#5d35fc' },
        { label: 'Learning (یادگیری)', value: '۸۴٪', fg: '#fe7601' },
        { label: 'Behavior (تغییر رفتار)', value: '۵۸٪', fg: '#24934b' },
        { label: 'Results (نتیجه کسب‌وکار)', value: '۵۷٪', fg: '#0547fe' },
      ],
    },
    {
      kind: 'radial',
      id: 'links',
      after: 'outputs',
      title: 'اتصال یادگیری به سایر سیستم‌های HR',
      centre: 'یادگیری و توسعه',
      items: [
        { label: 'مدیریت عملکرد', icon: 'lucide:target' },
        { label: 'مدل شایستگی', icon: 'lucide:star' },
        { label: 'مدیریت استعداد', icon: 'lucide:users-round' },
        { label: 'جانشین‌پروری', icon: 'lucide:trending-up' },
        { label: 'مسیر شغلی', icon: 'lucide:route' },
        { label: 'ارتقا', icon: 'lucide:arrow-up' },
      ],
    },
    {
      kind: 'list',
      id: 'deliverables',
      after: 'steps',
      title: 'خروجی‌های پروژه',
      items: [
        { label: 'سیاست و مدل آموزش سازمان' },
        { label: 'فرآیند نیازسنجی آموزشی' },
        { label: 'Training Needs Matrix' },
        { label: 'Learning Architecture' },
        { label: 'مسیرهای یادگیری' },
        { label: 'تقویم توسعه' },
        { label: 'مدل انتخاب روش یادگیری' },
        { label: 'مدل ارزیابی اثربخشی' },
        { label: 'فرم‌ها و گزارش کار' },
        { label: 'داشبورد یادگیری' },
        { label: 'شاخص‌های L&D' },
        { label: 'راهنمای مدیران و کارکنان' },
      ],
    },
  ],
};

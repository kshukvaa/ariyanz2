import type { ServiceDetailData } from '@/components/org/services/ServiceDetailPage';
import { systemsCrumbs } from './_systemsHero';

/* ──────────────────────────────────────────────────────────────
   طراحی نظام جبران خدمت
   Source: «طراحی نظام جبران خدمت.png»

   MOCKUP INCONSISTENCY — the block captioned «نمونه نتیجه تحلیل
   شکاف» near the foot of this page is drawn with headcount
   columns (نیروی موجود / نیروی موردنیاز), which belong to the
   workforce-adequacy page, not to a compensation gap analysis.
   It is transcribed as drawn rather than silently corrected;
   worth confirming whether a pay-gap table was intended.
────────────────────────────────────────────────────────────── */

export const compensation: ServiceDetailData = {
  slug: 'compensation',
  family: 'specialist',
  navId: 'compensation',

  meta: {
    title: 'طراحی نظام جبران خدمت | آریاز',
    description:
      'آریاز با تحلیل ارزش مشاغل، ساختار فعلی پرداخت، بازار کار و سیاست‌های سازمان، نظامی طراحی می‌کند که منصفانه، رقابتی، قابل مدیریت و متناسب با توان مالی سازمان باشد.',
  },

  hero: {
    title: ['جبران خدمت؛', 'جایی که عدالت کارکنان و توان رقابتی', 'سازمان به هم می‌رسند'],
    accentLines: [1],
    desc: 'آریاز با تحلیل ارزش مشاغل، ساختار فعلی پرداخت، بازار کار و سیاست‌های سازمان، نظامی طراحی می‌کند که منصفانه، رقابتی، قابل مدیریت و متناسب با توان مالی سازمان باشد.',
    primary: { label: 'درخواست طراحی نظام جبران خدمت', icon: 'lucide:clipboard-check' },
    secondary: { label: 'مشاوره با متخصص', icon: 'lucide:users-round' },
    crumbs: systemsCrumbs('طراحی نظام جبران خدمت'),
  },

  problems: {
    title: 'آیا واقعاً می‌دانید چرا به هر شغل این میزان پرداخت می‌کنید؟',
    cards: [
      {
        title: 'هزینه حقوق افزایش یافته ولی نمی‌دانیم کجا مسئله داریم',
        desc: 'تصمیمات پرداخت بدون معماری مشخص انجام می‌شود.',
        icon: 'lucide:trending-up',
        fg: '#5d35fc',
      },
      {
        title: 'افراد با عنوان مشابه دریافتی‌های بسیار متفاوتی دارند',
        desc: 'منطق افزایش و تعیین حقوق شفاف نیست.',
        icon: 'lucide:users-round',
        fg: '#fe7601',
      },
      {
        title: 'برای جذب افراد مجبور به تصمیم‌های موردی می‌شویم',
        desc: 'ساختار پرداخت با بازار هماهنگ نیست.',
        icon: 'lucide:user-round',
        fg: '#0547fe',
      },
      {
        title: 'کارکنان احساس بی‌عدالتی می‌کنند',
        desc: 'تفاوت پرداخت‌ها برایشان قابل توضیح نیست.',
        icon: 'lucide:scale',
        fg: '#24934b',
      },
    ],
  },

  agent: {
    title: 'دستیار هوشمند جبران خدمت آریاز',
    desc: 'ساختار پرداخت سازمان شما چقدر منصفانه است؟ با پاسخ به چند سوال، وضعیت اولیه را بررسی کنید.',
    questions: [
      'آیا گرید شغلی در سازمان دارید؟',
      'حقوق چگونه تعیین می‌شود؟',
      'آیا Benchmark بازار دارید؟',
      'آیا اختلاف پرداخت بین افراد مشابه زیاد است؟',
      'افزایش حقوق چگونه تصمیم‌گیری می‌شود؟',
    ],
    cta: 'شروع ارزیابی نظام جبران خدمت',
  },

  form: {
    title: 'پرداخت را از یک تصمیم موردی به یک سیستم قابل دفاع تبدیل کنید',
    desc: 'با تکمیل فرم زیر، کارشناسان آریاز با شما تماس می‌گیرند.',
    assurances: [],
    fields: [
      { label: 'نام سازمان' },
      { label: 'تعداد کارکنان' },
      { label: 'آیا ساختار حقوق دارید؟', kind: 'select' },
      { label: 'آیا گرید شغلی دارید؟', kind: 'select' },
      { label: 'شماره تماس' },
    ],
    submit: 'درخواست بررسی نظام جبران خدمت',
  },

  extras: [
    {
      kind: 'radial',
      id: 'architecture',
      after: 'problems',
      title: 'معماری نظام جبران خدمت آریاز',
      centre: 'Total Rewards Architecture',
      items: [
        { label: 'ارزش شغل (Job Value)', icon: 'lucide:briefcase' },
        { label: 'گرید شغلی (Job Grade)', icon: 'lucide:layers' },
        { label: 'بازار حقوق (Market Benchmark)', icon: 'lucide:trending-up' },
        { label: 'حقوق ثابت (Base Pay)', icon: 'lucide:wallet' },
        { label: 'مزایا (Benefits)', icon: 'lucide:shield-check' },
        { label: 'پرداخت متغیر (Variable Pay)', icon: 'lucide:percent' },
        { label: 'عملکرد (Performance)', icon: 'lucide:target' },
        { label: 'سیاست‌های سازمان (Pay Policy)', icon: 'lucide:file-text' },
      ],
    },
    {
      kind: 'steps',
      id: 'process',
      after: 'problems',
      title: 'فرآیند طراحی نظام جبران خدمت',
      items: [
        { n: '۱', title: 'تحلیل وضعیت فعلی', lines: ['بررسی حقوق، مزایا، گریدها و پراکندگی پرداخت'] },
        { n: '۲', title: 'اتصال به ارزش مشاغل', lines: ['طبقه‌بندی و گریدهای شغلی'] },
        { n: '۳', title: 'تحلیل بازار', lines: ['Benchmark و وضعیت رقابتی سازمان در بازار'] },
        { n: '۴', title: 'طراحی Pay Structure', lines: ['تعیین Range و Grade'] },
        { n: '۵', title: 'طراحی سیاست‌های پرداخت', lines: ['سیاست استخدام، افزایش، ارتقا و پرداخت متغیر'] },
        { n: '۶', title: 'تحلیل هزینه و استقرار', lines: ['سناریوهای مالی و برنامه انتقال و اجرا'] },
      ],
    },
    {
      kind: 'table',
      id: 'salary-structure',
      after: 'steps',
      title: 'نمونه ساختار حقوق (Salary Structure)',
      cols: ['Max (حداکثر)', 'Mid (میانه)', 'Min (کمینه)', 'Grade'],
      rows: [
        ['۱۰۰', '۸۵', '۷۰', 'G5'],
        ['۸۰', '۶۷', '۵۵', 'G4'],
        ['۶۰', '۵۱', '۴۲', 'G3'],
        ['۴۵', '۳۸', '۳۲', 'G2'],
        ['۳۴', '۲۹', '۲۵', 'G1'],
      ],
    },
    {
      kind: 'matrix',
      id: 'equity-vs-market',
      after: 'steps',
      title: 'عدالت داخلی × رقابت بازار',
      yAxis: 'عدالت داخلی',
      xAxis: 'رقابت‌پذیری بازار',
      cells: [
        { label: 'عادلانه ولی غیررقابتی', fg: '#fd841c' },
        { label: 'متعادل و پایدار', fg: '#24934b' },
        { label: 'ناعادلانه و غیررقابتی', fg: '#dc2326' },
        { label: 'رقابتی ولی ناعادلانه', fg: '#fe7601' },
      ],
    },
    {
      kind: 'stats',
      id: 'placement',
      after: 'outputs',
      title: 'وضعیت کارکنان در ساختار پرداخت پیشنهادی',
      items: [
        { value: '۷۲٪', label: 'داخل بازه مناسب', fg: '#24934b' },
        { value: '۱۱٪', label: 'زیر حداقل بازه', fg: '#dc2326' },
        { value: '۹٪', label: 'بالاتر از بازه', fg: '#0547fe' },
        { value: '۸٪', label: 'نیازمند بررسی', fg: '#fd841c' },
      ],
    },
    {
      kind: 'table',
      id: 'gap-sample',
      after: 'outputs',
      /* See the inconsistency note at the head of this file. */
      title: 'نمونه نتیجه تحلیل شکاف',
      cols: ['شکاف', 'نیروی موردنیاز', 'نیروی موجود', 'واحد'],
      rows: [
        ['+۴', '۳۲', '۲۸', 'فروش'],
        ['−۳', '۱۱', '۱۴', 'مالی'],
        ['۰', '۸', '۸', 'منابع انسانی'],
        ['−۴', '۳۸', '۴۲', 'تولید'],
        ['+۴', '۳۹', '۳۵', 'انبار'],
        ['+۱', '۱۲۸', '۱۲۷', 'جمع کل'],
      ],
    },
    {
      kind: 'list',
      id: 'deliverables',
      after: 'outputs',
      title: 'خروجی‌های پروژه',
      items: [
        { label: 'معماری جبران خدمت' },
        { label: 'ساختار گریدهای پرداخت' },
        { label: 'Min / Mid / Max هر Grade' },
        { label: 'Salary Bands' },
        { label: 'گزارش وضعیت فعلی کارکنان' },
        { label: 'تحلیل Compa-Ratio' },
        { label: 'تحلیل Pay Gap' },
        { label: 'سیاست افزایش حقوق' },
        { label: 'سیاست جذب و پیشنهاد حقوق' },
        { label: 'سیاست ارتقا' },
        { label: 'سناریوی اصلاح حقوق' },
        { label: 'تحلیل هزینه اجرای مدل' },
      ],
    },
  ],
};

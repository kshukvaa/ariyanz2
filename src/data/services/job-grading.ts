import type { ServiceDetailData } from '@/components/org/services/ServiceDetailPage';
import { systemsHero, systemsCrumbs } from './_systemsHero';

/* ══════════════════════════════════════════════════════════════
   ⚠ AUTHORED, NOT TRANSCRIBED

   No mockup exists for طبقه‌بندی مشاغل — it appears in the service
   rail of its siblings but was never drawn. Every Persian string
   below was written to fill that gap, on explicit instruction,
   and is NOT from the design source.

   It is modelled on the eight transcribed siblings: same six-move
   shape, same accent family, same register. The domain content is
   standard point-factor job evaluation, and it is written to
   dovetail with the two pages either side of it — تجزیه و تحلیل
   مشاغل supplies its input, طراحی نظام جبران خدمت consumes its
   output — because that dependency is the real reason this
   service exists.

   Replace wholesale when the real mockup arrives.
══════════════════════════════════════════════════════════════ */

export const jobGrading: ServiceDetailData = {
  slug: 'job-grading',
  family: 'structure',
  navId: 'job-grading',

  meta: {
    title: 'طبقه‌بندی مشاغل | آریاز',
    description:
      'ارزش هر شغل را با یک مدل امتیازی شفاف اندازه می‌گیریم و مشاغل سازمان را در ساختاری از گریدهای قابل دفاع می‌نشانیم.',
  },

  hero: { ...systemsHero, crumbs: systemsCrumbs('طبقه‌بندی مشاغل') },

  intro: {
    label: 'طبقه‌بندی مشاغل',
    title: 'طبقه‌بندی مشاغل',
    desc: 'ارزش هر شغل را با یک مدل امتیازی شفاف اندازه می‌گیریم و مشاغل سازمان را در ساختاری از گریدهای قابل دفاع می‌نشانیم؛ به‌طوری‌که بتوان توضیح داد چرا یک شغل در این سطح قرار گرفته است.',
  },

  problems: {
    title: 'این خدمت چه مسئله‌ای را حل می‌کند؟',
    cards: [
      {
        title: 'نمی‌توانیم توضیح دهیم چرا این شغل در این سطح است',
        desc: 'سطح مشاغل بر اساس عرف و سابقه تعیین شده، نه بر اساس ارزش سنجیده‌شده.',
        icon: 'lucide:scale',
        fg: '#24934b',
      },
      {
        title: 'عناوین شغلی بزرگ‌تر از محتوای واقعی شده‌اند',
        desc: 'عنوان به‌جای ابزار توصیف شغل، به ابزار جبران و ارتقا تبدیل شده است.',
        icon: 'lucide:layers',
        fg: '#fe7601',
      },
      {
        title: 'مشاغل هم‌ارزش در سطوح متفاوت نشسته‌اند',
        desc: 'دو شغل با دشواری و مسئولیت مشابه، گرید و انتظارات متفاوتی دارند.',
        icon: 'lucide:users-round',
        fg: '#0547fe',
      },
      {
        title: 'ساختار پرداخت مبنای شغلی ندارد',
        desc: 'بدون گرید، طراحی نظام جبران خدمت به تصمیم‌های موردی برمی‌گردد.',
        icon: 'lucide:wallet',
        fg: '#5d35fc',
      },
    ],
  },

  steps: {
    title: 'رویکرد آریاز در طبقه‌بندی مشاغل',
    items: [
      {
        n: '۱',
        title: 'انتخاب مدل ارزیابی',
        lines: ['بررسی مدل‌های امتیازی رایج', 'انتخاب مدل متناسب با اندازه سازمان'],
        icon: 'lucide:search',
        fg: '#24934b',
      },
      {
        n: '۲',
        title: 'تعریف عوامل و وزن‌ها',
        lines: ['تعیین عوامل ارزیابی شغل', 'وزن‌دهی متناسب با استراتژی سازمان'],
        icon: 'lucide:scale',
        fg: '#fe7601',
      },
      {
        n: '۳',
        title: 'ارزیابی و امتیازدهی مشاغل',
        lines: ['امتیازدهی بر پایه شناسنامه شغل', 'کمیته ارزیابی و اعتبارسنجی'],
        icon: 'lucide:clipboard-check',
        fg: '#0547fe',
      },
      {
        n: '۴',
        title: 'طراحی ساختار گرید و استقرار',
        lines: ['تعیین مرز گریدها و نگاشت مشاغل', 'راهنمای نگهداشت و بازنگری'],
        icon: 'lucide:rocket',
        fg: '#5d35fc',
      },
    ],
  },

  outputs: {
    title: 'خروجی‌های پروژه',
    items: [
      { label: 'مدل ارزیابی شغل', icon: 'lucide:scale' },
      { label: 'جدول عوامل و وزن‌ها', icon: 'lucide:table' },
      { label: 'امتیاز ارزیابی هر شغل', icon: 'lucide:gauge' },
      { label: 'ساختار گریدهای شغلی', icon: 'lucide:layers' },
      { label: 'نگاشت مشاغل به گرید', icon: 'lucide:workflow' },
      { label: 'راهنمای نگهداشت نظام', icon: 'lucide:file-text' },
    ],
  },

  agent: {
    title: 'ایجنت هوشمند طبقه‌بندی مشاغل',
    desc: 'با چند سوال کوتاه مشخص می‌کنیم سازمان شما برای طبقه‌بندی آماده است یا ابتدا به شناسنامه مشاغل نیاز دارد.',
    questions: [
      'شناسنامه مشاغل به‌روز دارید؟',
      'چند عنوان شغلی در سازمان ثبت شده است؟',
      'مبنای فعلی تعیین سطح شغل چیست؟',
      'آیا ساختار گرید دارید؟',
    ],
    cta: 'شروع ارزیابی طبقه‌بندی',
  },

  form: {
    title: 'سطح هر شغل باید قابل توضیح باشد',
    desc: 'برای بررسی وضعیت مشاغل و امکان‌سنجی طبقه‌بندی، اطلاعات زیر را وارد کنید تا کارشناسان آریاز با شما تماس بگیرند.',
    assurances: ['بررسی رایگان', 'پیشنهاد مدل متناسب', 'کاملاً محرمانه'],
    fields: [
      { label: 'نام سازمان' },
      { label: 'تعداد کارکنان' },
      { label: 'تعداد عناوین شغلی' },
      { label: 'آیا شناسنامه مشاغل دارید؟', kind: 'select' },
      { label: 'شماره تماس' },
    ],
    submit: 'درخواست بررسی طبقه‌بندی مشاغل',
  },

  extras: [
    {
      kind: 'table',
      id: 'factors',
      after: 'problems',
      title: 'عوامل ارزیابی شغل و وزن پیشنهادی',
      cols: ['وزن', 'آنچه می‌سنجد', 'عامل'],
      rows: [
        ['۲۵٪', 'دانش، تخصص و تجربه لازم برای انجام شغل', 'دانش و مهارت'],
        ['۲۰٪', 'پیچیدگی مسائل و میزان تحلیل موردنیاز', 'حل مسئله'],
        ['۲۰٪', 'دامنه اثر تصمیم‌ها بر نتایج سازمان', 'مسئولیت و پاسخ‌گویی'],
        ['۱۵٪', 'گستره سرپرستی و هدایت افراد', 'مدیریت افراد'],
        ['۱۰٪', 'دامنه و اهمیت تعاملات درون و برون‌سازمانی', 'ارتباطات'],
        ['۱۰٪', 'شرایط فیزیکی و محیطی انجام کار', 'شرایط کار'],
      ],
    },
    {
      kind: 'stats',
      id: 'grade-ladder',
      after: 'steps',
      title: 'نمونه ساختار گرید حاصل از امتیازها',
      items: [
        { value: 'G1–G2', label: 'مشاغل عملیاتی و پشتیبانی', sub: 'تا ۲۵۰ امتیاز', fg: '#0547fe' },
        { value: 'G3–G4', label: 'کارشناسی و کارشناسی ارشد', sub: '۲۵۱ تا ۴۵۰ امتیاز', fg: '#24934b' },
        { value: 'G5–G6', label: 'سرپرستی و مدیریت میانی', sub: '۴۵۱ تا ۶۵۰ امتیاز', fg: '#fe7601' },
        { value: 'G7+', label: 'مدیریت ارشد', sub: 'بالای ۶۵۰ امتیاز', fg: '#5d35fc' },
      ],
    },
    {
      kind: 'cards',
      id: 'depends',
      after: 'outputs',
      title: 'این خدمت با چه چیزی زنجیر می‌شود؟',
      items: [
        {
          label: 'ورودی: تجزیه و تحلیل مشاغل',
          desc: 'طبقه‌بندی بدون شناسنامه معتبر شغل، امتیازدهی به حدس است.',
          icon: 'lucide:briefcase',
          fg: '#24934b',
        },
        {
          label: 'خروجی: طراحی نظام جبران خدمت',
          desc: 'گریدها مبنای طراحی Range و Salary Band می‌شوند.',
          icon: 'lucide:wallet',
          fg: '#fe7601',
        },
        {
          label: 'خروجی: مسیر شغلی و ارتقا',
          desc: 'مرز گریدها تعیین می‌کند ارتقا از کجا به کجاست.',
          icon: 'lucide:trending-up',
          fg: '#5d35fc',
        },
      ],
    },
  ],
};

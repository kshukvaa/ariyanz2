import type { ServiceDetailData } from '@/components/org/services/ServiceDetailPage';
import { systemsCrumbs } from './_systemsHero';

/* ──────────────────────────────────────────────────────────────
   تجزیه و تحلیل مشاغل
   Source: «تجزیه و تحلیل مشاغل.png»

   Note — unlike org-structure, this page carries its OWN hero
   rather than the shared systems one, and tints only its first
   line. The CTA pair is the same across the family.

   Four bespoke blocks: the «شغل» wheel of what a job analysis
   examines, the five-stage method, the deliverables checklist,
   and the hub showing which HR systems depend on this one.
────────────────────────────────────────────────────────────── */

export const jobAnalysis: ServiceDetailData = {
  slug: 'job-analysis',
  family: 'structure',
  navId: 'job-analysis',

  meta: {
    title: 'تجزیه و تحلیل مشاغل | آریاز',
    description:
      'آریاز با بررسی واقعی مشاغل، مسئولیت‌ها، ارتباطات، شرایط انجام کار و شایستگی‌های موردنیاز، تصویری شفاف و قابل اتکا از هر شغل سازمان ایجاد می‌کند.',
  },

  hero: {
    title: [
      'تجزیه و تحلیل مشاغل ؛',
      'وقتی باید دقیق بدانیم هر شغل',
      'چرا وجود دارد و چه ارزشی ایجاد می‌کند',
    ],
    accentLines: [0],
    desc: 'آریاز با بررسی واقعی مشاغل، مسئولیت‌ها، ارتباطات، شرایط انجام کار و شایستگی‌های موردنیاز، تصویری شفاف و قابل اتکا از هر شغل سازمان ایجاد می‌کند.',
    primary: { label: 'درخواست ارزیابی سیستم‌های HR', icon: 'lucide:clipboard-check' },
    secondary: { label: 'مشاوره با متخصص', icon: 'lucide:users-round' },
    crumbs: systemsCrumbs('تجزیه و تحلیل مشاغل'),
  },

  problems: {
    title: 'چه زمانی تجزیه و تحلیل مشاغل ضروری می‌شود؟',
    cards: [
      {
        title: 'می‌خواهیم طبقه‌بندی، ارزیابی یا مسیر شغلی طراحی کنیم',
        desc: 'اما اطلاعات معتبر و استاندارد از مشاغل نداریم.',
        icon: 'lucide:trending-up',
        fg: '#fe7601',
      },
      {
        title: 'برای استخدام نمی‌دانیم دقیقاً چه فردی نیاز داریم',
        desc: 'شرایط احراز و شایستگی‌های واقعی شغل مشخص نشده است.',
        icon: 'lucide:target',
        fg: '#24934b',
      },
      {
        title: 'مرز مسئولیت مشاغل مشخص نیست',
        desc: 'وظایف بین افراد و واحدها همپوشانی دارد و مسئولیت‌ها شفاف نیست.',
        icon: 'lucide:users-round',
        fg: '#fe7601',
      },
      {
        title: 'شرح شغل‌ها قدیمی یا غیرواقعی شده‌اند',
        desc: 'آنچه روی کاغذ نوشته شده با کاری که افراد واقعاً انجام می‌دهند متفاوت است.',
        icon: 'lucide:file-text',
        fg: '#24934b',
      },
    ],
  },

  outputs: {
    title: 'خروجی‌های پروژه',
    items: [
      { label: 'شناسنامه استاندارد هر شغل', icon: 'lucide:file-text' },
      { label: 'شرح وظایف و مسئولیت‌ها', icon: 'lucide:list-checks' },
      { label: 'شرایط احراز مشاغل', icon: 'lucide:badge-check' },
      { label: 'شایستگی‌های موردنیاز', icon: 'lucide:star' },
      { label: 'شاخص‌های کلیدی عملکرد', icon: 'lucide:trending-up' },
      { label: 'ماتریس ارتباط مشاغل', icon: 'lucide:workflow' },
    ],
  },

  agent: {
    title: 'دستیار هوشمند آریاز',
    desc: 'شغل‌های سازمان شما چقدر شفاف تعریف شده‌اند؟ با دستیار هوشمند آریاز گفتگو کنید و وضعیت فعلی مشاغل سازمان خود را بررسی کنید.',
    questions: [
      'شرح شغل‌های شما مربوط به چه زمانی است؟',
      'آیا وظایف واقعی کارکنان با شرح شغل منطبق است؟',
      'شرایط احراز مشاغل مشخص شده؟',
      'همپوشانی وظایف دارید؟',
    ],
    cta: 'شروع ارزیابی مشاغل',
  },

  form: {
    title: 'مشاغل سازمان خود را شفاف و قابل مدیریت کنید',
    desc: 'برای دریافت مشاوره و بررسی وضعیت مشاغل سازمان خود، اطلاعات زیر را وارد کنید تا کارشناسان ما با شما تماس بگیرند.',
    assurances: [],
    fields: [
      { label: 'نام سازمان' },
      { label: 'تعداد کارکنان' },
      { label: 'وضعیت فعلی شرح مشاغل' },
      { label: 'وضعیت تقریبی مشاغل', kind: 'select' },
      { label: 'شماره تماس' },
    ],
    submit: 'درخواست بررسی مشاغل سازمان',
  },

  extras: [
    {
      kind: 'radial',
      id: 'what-is-examined',
      after: 'problems',
      title: 'در تجزیه و تحلیل شغل چه چیزی بررسی می‌شود؟',
      centre: 'شغل',
      items: [
        { label: 'هدف و فلسفه وجودی شغل', icon: 'lucide:target' },
        { label: 'وظایف و مسئولیت‌های اصلی', icon: 'lucide:list-checks' },
        { label: 'اختیارات و حدود تصمیم‌گیری', icon: 'lucide:scale' },
        { label: 'ارتباطات درون و برون‌سازمانی', icon: 'lucide:users-round' },
        { label: 'شاخص‌های عملکرد شغل', icon: 'lucide:trending-up' },
        { label: 'شرایط و محیط انجام کار', icon: 'lucide:building-2' },
        { label: 'تحصیلات و تجربه', icon: 'lucide:graduation-cap' },
        { label: 'شایستگی‌های رفتاری', icon: 'lucide:user-round' },
        { label: 'دانش و مهارت موردنیاز', icon: 'lucide:brain' },
      ],
    },
    {
      kind: 'steps',
      id: 'method',
      after: 'problems',
      title: 'روش اجرای پروژه در آریاز',
      items: [
        {
          n: '۱',
          title: 'شناخت ساختار و مشاغل',
          lines: ['بررسی چارت، فرآیندها و اطلاعات موجود'],
        },
        {
          n: '۲',
          title: 'جمع‌آوری اطلاعات شغل',
          lines: ['مصاحبه، پرسشنامه، مشاهده و بررسی مستندات'],
        },
        {
          n: '۳',
          title: 'تحلیل و اعتبارسنجی',
          lines: ['تفکیک وظایف اصلی، مسئولیت‌ها و الزامات واقعی شغل'],
        },
        {
          n: '۴',
          title: 'تدوین شناسنامه شغل',
          lines: ['تولید نسخه استاندارد و قابل استفاده'],
        },
        {
          n: '۵',
          title: 'تأیید و نهایی‌سازی',
          lines: ['اعتبارسنجی با مدیران و ذی‌نفعان'],
        },
      ],
    },
    {
      kind: 'list',
      id: 'deliverables',
      after: 'steps',
      title: 'در پایان پروژه چه چیزی تحویل می‌گیرید؟',
      items: [
        { label: 'شناسنامه استاندارد هر شغل' },
        { label: 'هدف اصلی شغل' },
        { label: 'وظایف و مسئولیت‌های کلیدی' },
        { label: 'حدود اختیارات' },
        { label: 'روابط گزارش‌دهی' },
        { label: 'شرایط احراز' },
        { label: 'دانش و مهارت‌های موردنیاز' },
        { label: 'شایستگی‌های موردنیاز' },
        { label: 'شاخص‌های کلیدی عملکرد پیشنهادی' },
        { label: 'ارتباط شغل با سایر مشاغل' },
      ],
    },
    {
      kind: 'radial',
      id: 'foundation',
      after: 'steps',
      title: 'تجزیه و تحلیل شغل، زیرساخت بسیاری از سیستم‌های HR است',
      centre: 'تجزیه و تحلیل شغل',
      items: [
        { label: 'طبقه‌بندی مشاغل', icon: 'lucide:layers' },
        { label: 'ارزیابی عملکرد', icon: 'lucide:trending-up' },
        { label: 'آموزش و توسعه', icon: 'lucide:graduation-cap' },
        { label: 'جبران خدمات', icon: 'lucide:wallet' },
        { label: 'برنامه‌ریزی نیروی انسانی', icon: 'lucide:users-round' },
        { label: 'مسیر شغلی', icon: 'lucide:user-round' },
      ],
    },
  ],
};

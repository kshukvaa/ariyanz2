import type { ServiceDetailData } from '@/components/org/services/ServiceDetailPage';
import { systemsCrumbs } from './_systemsHero';

/* ══════════════════════════════════════════════════════════════
   ⚠ AUTHORED, NOT TRANSCRIBED

   No mockup exists for مدیریت خدمات پرسنلی — it appears in the
   service rail of its siblings but was never drawn. Every Persian
   string below was written to fill that gap, on explicit
   instruction, and is NOT from the design source.

   Written to the same six-move shape as its transcribed siblings.
   The subject is personnel administration — contracts, leave,
   attendance, files, statutory deadlines — so the page is built
   around the thing that actually goes wrong there: a deadline
   nobody owns. That is why it carries a compliance calendar
   rather than the usual diagram.

   Replace wholesale when the real mockup arrives.
══════════════════════════════════════════════════════════════ */

export const personnel: ServiceDetailData = {
  slug: 'personnel',
  family: 'general',
  navId: 'personnel',

  meta: {
    title: 'مدیریت خدمات پرسنلی | آریاز',
    description:
      'فرآیندهای قرارداد، مرخصی، کارکرد، پرونده کارکنان و مهلت‌های قانونی را استاندارد می‌کنیم تا هیچ تعهدی بی‌صاحب نماند.',
  },

  hero: {
    title: [
      'خدمات پرسنلی؛',
      'جایی که یک مهلت فراموش‌شده',
      'به یک پرونده تبدیل می‌شود',
    ],
    accentLines: [1, 2],
    desc: 'آریاز فرآیندهای قرارداد، مرخصی، کارکرد، پرونده کارکنان و مهلت‌های قانونی را طوری طراحی و مستقر می‌کند که هر تعهد صاحب مشخص، مهلت مشخص و رد قابل پیگیری داشته باشد.',
    primary: { label: 'درخواست ارزیابی خدمات پرسنلی', icon: 'lucide:clipboard-check' },
    secondary: { label: 'مشاوره با متخصص', icon: 'lucide:users-round' },
    crumbs: systemsCrumbs('مدیریت خدمات پرسنلی'),
  },

  intro: {
    label: 'مدیریت خدمات پرسنلی',
    title: 'مدیریت خدمات پرسنلی',
    desc: 'خدمات پرسنلی وقتی دیده می‌شود که از کار بیفتد؛ قراردادی که تمدید نشده، مرخصی‌ای که ثبت نشده یا پرونده‌ای که در بازرسی ناقص است. این خدمت همان لایه بی‌سروصدا را قابل اتکا می‌کند.',
  },

  problems: {
    title: 'این خدمت چه مسئله‌ای را حل می‌کند؟',
    cards: [
      {
        title: 'تمدید قراردادها از دست می‌رود',
        desc: 'مهلت‌ها در ذهن افراد است، نه در یک تقویم با صاحب مشخص.',
        icon: 'lucide:calendar-check',
        fg: '#dc2326',
      },
      {
        title: 'پرونده کارکنان ناقص است',
        desc: 'مدارک پراکنده‌اند و در زمان بازرسی یا اختلاف قابل ارائه نیستند.',
        icon: 'lucide:folder',
        fg: '#fe7601',
      },
      {
        title: 'مرخصی و کارکرد سلیقه‌ای ثبت می‌شود',
        desc: 'هر واحد رویه خودش را دارد و مانده مرخصی قابل اتکا نیست.',
        icon: 'lucide:clock',
        fg: '#0547fe',
      },
      {
        title: 'ورود و خروج کارکنان رد قابل پیگیری ندارد',
        desc: 'تسویه، تحویل اقلام و قطع دسترسی‌ها مستند نمی‌شود.',
        icon: 'lucide:log-out',
        fg: '#5d35fc',
      },
    ],
  },

  steps: {
    title: 'رویکرد آریاز در استقرار خدمات پرسنلی',
    items: [
      {
        n: '۱',
        title: 'شناخت وضعیت و مستندات',
        lines: ['بررسی رویه‌های فعلی', 'ممیزی پرونده‌ها و مدارک'],
        icon: 'lucide:search',
        fg: '#0547fe',
      },
      {
        n: '۲',
        title: 'طراحی فرآیندها و مالکیت',
        lines: ['تعیین صاحب هر فرآیند', 'تعریف گردش کار و تأییدها'],
        icon: 'lucide:workflow',
        fg: '#24934b',
      },
      {
        n: '۳',
        title: 'استانداردسازی فرم و پرونده',
        lines: ['فرم‌های یکسان و چک‌لیست پرونده', 'تقویم مهلت‌های قانونی'],
        icon: 'lucide:file-text',
        fg: '#fe7601',
      },
      {
        n: '۴',
        title: 'استقرار، آموزش و پایش',
        lines: ['آموزش مجریان', 'گزارش انطباق و پایش دوره‌ای'],
        icon: 'lucide:rocket',
        fg: '#5d35fc',
      },
    ],
  },

  outputs: {
    title: 'خروجی‌های پروژه',
    items: [
      { label: 'فرآیندهای پرسنلی مستند', icon: 'lucide:workflow' },
      { label: 'چک‌لیست پرونده کارکنان', icon: 'lucide:list-checks' },
      { label: 'تقویم مهلت‌های قانونی', icon: 'lucide:calendar-check' },
      { label: 'فرم‌ها و دستورالعمل‌ها', icon: 'lucide:file-text' },
      { label: 'فرآیند ورود و خروج', icon: 'lucide:user-round-plus' },
      { label: 'گزارش انطباق دوره‌ای', icon: 'lucide:shield-check' },
    ],
  },

  agent: {
    title: 'ایجنت هوشمند خدمات پرسنلی',
    desc: 'با چند سوال کوتاه مشخص می‌کنیم کدام بخش از خدمات پرسنلی شما بیشترین ریسک را دارد.',
    questions: [
      'تمدید قراردادها را چطور پیگیری می‌کنید؟',
      'پرونده کارکنان کاغذی است یا دیجیتال؟',
      'مانده مرخصی از کجا محاسبه می‌شود؟',
      'فرآیند تسویه مستند شده است؟',
    ],
    cta: 'شروع ارزیابی خدمات پرسنلی',
  },

  form: {
    title: 'هیچ تعهدی نباید بی‌صاحب بماند',
    desc: 'برای بررسی وضعیت خدمات پرسنلی سازمان خود، اطلاعات زیر را وارد کنید تا کارشناسان آریاز با شما تماس بگیرند.',
    assurances: ['بررسی رایگان', 'گزارش ریسک اولیه', 'کاملاً محرمانه'],
    fields: [
      { label: 'نام سازمان' },
      { label: 'تعداد کارکنان' },
      { label: 'نرم‌افزار پرسنلی فعلی', kind: 'select' },
      { label: 'مهم‌ترین چالش شما', kind: 'select' },
      { label: 'شماره تماس' },
    ],
    submit: 'درخواست بررسی خدمات پرسنلی',
  },

  extras: [
    {
      kind: 'table',
      id: 'compliance-calendar',
      after: 'problems',
      title: 'تقویم تعهدات پرسنلی — چه چیزی، چه زمانی، مسئول کیست؟',
      cols: ['مسئول', 'مهلت', 'تعهد'],
      rows: [
        ['کارگزینی', 'تا پایان هر ماه', 'ارسال لیست بیمه'],
        ['کارگزینی', 'تا پایان هر ماه', 'ارسال لیست مالیات حقوق'],
        ['مدیر مستقیم و کارگزینی', '۳۰ روز پیش از انقضا', 'تمدید قرارداد'],
        ['کارگزینی', 'پایان هر سال', 'محاسبه و اعلام مانده مرخصی'],
        ['منابع انسانی', 'هفته اول ورود', 'تکمیل پرونده کارمند جدید'],
        ['منابع انسانی و مالی', 'روز خروج', 'تسویه و قطع دسترسی‌ها'],
      ],
    },
    {
      kind: 'list',
      id: 'file-checklist',
      after: 'steps',
      title: 'پرونده کامل کارمند شامل چیست؟',
      items: [
        { label: 'قرارداد جاری و سوابق قراردادی' },
        { label: 'مدارک هویتی و تحصیلی' },
        { label: 'شرح شغل امضاشده' },
        { label: 'سوابق بیمه و مالیات' },
        { label: 'سوابق مرخصی و کارکرد' },
        { label: 'سوابق ارزیابی عملکرد' },
        { label: 'مستندات آموزش و گواهینامه‌ها' },
        { label: 'مستندات انضباطی و تشویقی' },
      ],
    },
  ],
};

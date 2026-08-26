import { L } from '@/data/lmsTokens';

/* ──────────────────────────────────────────────────────────────
   آزمون فصل — chapter exam, one question at a time
   Source: «course_exam_single_question.png»

   TWO NUMBERS IN THE SOURCE DO NOT ADD UP, and both are kept as
   drawn rather than quietly corrected:

   1. The progress bar reads «۱۴ از ۲۰ سوال» while the question
      chip on the very same screen reads «سوال ۵ از ۲۰».
   2. The legend counts ۴ answered + ۱ current + ۱۵ unanswered +
      ۲ flagged = ۲۲, on a ۲۰-question exam.

   Neither is resolvable from the mockup, and inventing a
   consistent set would hide a real question for the designer. See
   `progress` and `legend` below.

   The pass mark also disagrees with the results screen: this one
   says «حداقل نمره قبولی ۷۰ درصد است» while
   «course_exam_results.png» reports «نمره قبولی: ۱۵ از ۲۰ (۷۵٪)».
────────────────────────────────────────────────────────────── */

export const examCrumbs = {
  back: { label: 'بازگشت به درس‌ها', href: '/courses/performance-management' },
  items: [
    { label: 'طراحی و استقرار نظام ارزیابی عملکرد کارکنان', href: '/courses/performance-management' },
    { label: 'فصل ۲: طراحی شاخص‌ها' },
    { label: 'آزمون فصل دوم' },
  ],
};

export const examHead = {
  icon: 'lucide:clipboard-list',
  title: 'آزمون فصل دوم: طراحی شاخص‌های عملکرد (KPI)',
  meta: [
    { label: 'دوره', value: 'طراحی و استقرار نظام ارزیابی عملکرد کارکنان', icon: 'lucide:book-open' },
    { label: 'مربوط به', value: 'طراحی و استقرار نظام ارزیابی', icon: 'lucide:folder' },
    { label: 'تعداد سوالات', value: '۲۰ سوال', icon: 'lucide:clock' },
    { label: 'زمان آزمون', value: 'فصل ۲ و شاخص‌ها', icon: 'lucide:circle-alert' },
    { label: 'زمان آزمون', value: '۳۰ دقیقه', icon: 'lucide:circle-alert' },
    { label: 'امتیاز کل', value: '۳۰ امتیاز', icon: 'lucide:star' },
  ],
};

export const examStatus = {
  title: 'وضعیت آزمون',
  remainingLabel: 'زمان باقی‌مانده',
  remaining: '۲۳:۱۵',
  barPct: 62,
};

/* Transcribed verbatim; see the file header on why these two
   disagree. */
export const examProgress = {
  title: 'پیشرفت آزمون',
  label: '۱۴ از ۲۰ سوال',
  pct: 62,
};

export const examLegend = {
  title: 'شماره سوالات',
  items: [
    { label: 'پاسخ داده شده', count: '۴', fg: L.green, kind: 'dot' as const },
    { label: 'سوال جاری', count: '۱', fg: L.blue, kind: 'dot' as const },
    { label: 'بدون پاسخ', count: '۱۵', fg: L.muted, kind: 'dot' as const },
    { label: 'علامت‌زده شده', count: '۲', fg: L.navy, kind: 'flag' as const },
  ],
  /* 1..20; 1–4 answered, 5 current, 7 and 16 flagged. */
  total: 20,
  answered: [1, 2, 3, 4],
  current: 5,
  flagged: [7, 16],
  finish: { label: 'پایان آزمون', icon: 'lucide:flag' },
};

export const examQuestion = {
  chip: 'سوال ۵ از ۲۰',
  title: 'کدام گزینه بهترین تعریف KPI است؟',
  hint: 'KPI شاخصی است که برای اندازه‌گیری عملکرد در جهت تحقق اهداف سازمانی استفاده می‌شود.',
  options: [
    { label: 'شاخصی برای اندازه‌گیری عملکرد در جهت تحقق اهداف کلیدی', selected: true },
    { label: 'گزارش مالی سازمان در پایان هر دوره' },
    { label: 'شرح وظایف شغلی کارکنان' },
    { label: 'برنامه آموزشی سالانه شرکت' },
  ],
  report: { label: 'گزارش سوال', icon: 'lucide:circle-alert' },
  next: { label: 'سوال بعدی', icon: 'lucide:arrow-left' },
  prev: { label: 'سوال قبلی', icon: 'lucide:arrow-right' },
};

export const examBrief = {
  title: 'قبل از شروع آزمون',
  items: [
    'هر سوال فقط یک پاسخ صحیح دارد.',
    'امکان بازگشت به سوالات قبلی وجود دارد.',
    'پس از پایان، نتیجه نمایش داده می‌شود.',
    'حداقل نمره قبولی ۷۰ درصد است.',
    'در صورت قطع ارتباط، می‌توانید دوباره ادامه دهید.',
  ],
  start: { label: 'شروع آزمون', icon: 'lucide:circle-play' },
};

export const examInfo = {
  title: 'اطلاعات تکمیلی',
  rows: [
    { label: 'نوع آزمون', value: 'چهارگزینه‌ای', icon: 'lucide:layout-grid' },
    { label: 'تعداد تلاش مجاز', value: '۲ بار', icon: 'lucide:refresh-cw' },
    { label: 'بهترین نمره ثبت می‌شود', value: '', icon: 'lucide:circle-check', ok: true },
    { label: 'روش نمره‌دهی', value: 'هر پاسخ صحیح ۱ امتیاز', icon: 'lucide:calculator' },
  ],
};

export const examHelp = {
  title: 'نیاز به کمک دارید؟',
  desc: 'در صورت وجود سوال یا مشکل، می‌توانید از طریق راه‌های زیر با ما در ارتباط باشید.',
  actions: [
    { label: 'پرسش از مدرس', icon: 'lucide:message-circle' },
    { label: 'پشتیبانی آریاز', icon: 'lucide:headphones' },
  ],
};

export const examSuggest = {
  title: 'پیشنهادهای هوشمند برای شما',
  icon: 'lucide:sparkles',
  desc: 'با توجه به موضوع این آزمون، پیشنهاد می‌کنیم:',
  items: [
    {
      title: 'نمونه فرم‌ها',
      desc: 'از فرم‌های استاندارد ارزیابی عملکرد استفاده کنید.',
      cta: 'مشاهده فرم‌ها',
      icon: 'lucide:calculator',
      fg: L.blue,
      bg: L.blueSoft,
    },
    {
      title: 'دوره HR Analytics',
      desc: 'مهارت تحلیل داده‌ها را برای ارزیابی عملکرد تقویت کنید.',
      cta: 'مشاهده دوره',
      icon: 'lucide:file-text',
      fg: L.orange,
      bg: L.orangeSoft,
    },
    {
      title: 'ابزار طراحی شاخص',
      desc: 'با ابزار طراحی KPI به صورت عملی شاخص‌های خود را بسازید.',
      cta: 'مشاهده ابزار',
      icon: 'lucide:clipboard-list',
      fg: L.green,
      bg: L.greenSoft,
    },
    {
      title: 'ایجنت طراحی KPI',
      desc: 'از ایجنت هوشمند برای طراحی شاخص‌های عملکردی کمک بگیرید.',
      cta: 'استفاده از ایجنت',
      icon: 'lucide:bot',
      fg: L.violet,
      bg: L.violetSoft,
    },
  ],
};

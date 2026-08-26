import { L } from '@/data/lmsTokens';

/* ──────────────────────────────────────────────────────────────
   نتیجه آزمون — exam results
   Source: «course_exam_results.png»

   The arithmetic on this screen holds: ۱۸ از ۲۰ is ۹۰٪, which is
   what the ring reports. Worth saying because the exam screen it
   follows does not add up (see exam.ts).

   One cross-screen disagreement, kept: the exam screen states the
   pass mark as «حداقل نمره قبولی ۷۰ درصد است»; this screen reports
   «نمره قبولی: ۱۵ از ۲۰ (۷۵٪)». Both transcribed as drawn.
────────────────────────────────────────────────────────────── */

export const resultCrumbs = {
  back: { label: 'بازگشت به درس‌ها', href: '/courses/performance-management' },
  items: [
    { label: 'طراحی و استقرار نظام ارزیابی عملکرد کارکنان', href: '/courses/performance-management' },
    { label: 'فصل ۲: طراحی شاخص‌ها' },
    { label: 'آزمون فصل دوم', href: '/courses/performance-management/exam' },
    { label: 'نتیجه آزمون' },
  ],
};

export const resultHero = {
  pct: 90,
  title: 'آزمون شما با موفقیت تکمیل شد',
  emoji: '🎉',
  subtitle: 'نتیجه آزمون فصل دوم: طراحی شاخص‌های عملکرد (KPI)',
  stars: 3,
};

export const resultFacts = [
  { label: 'وضعیت', value: 'قبول شده', icon: 'lucide:award', fg: L.amber, ok: true },
  { label: 'تاریخ آزمون', value: '۱۴۰۴/۰۵/۲۰', icon: 'lucide:calendar', fg: L.violet },
  { label: 'زمان پاسخگویی', value: '۲۴ دقیقه', icon: 'lucide:clock', fg: L.green },
  { label: 'تعداد سوال', value: '۲۰ سوال', icon: 'lucide:clipboard-list', fg: L.blue },
  { label: 'نمره شما', value: '۱۸ از ۲۰', icon: '', fg: L.green, big: true },
];

export const resultBreakdown = {
  title: 'خلاصه عملکرد شما در آزمون',
  cols: ['عملکرد', 'عملکرد'],
  rows: [
    { topic: 'تعریف و مفهوم KPI', verdict: 'عالی', pct: 92, fg: L.green },
    { topic: 'انواع شاخص‌ها', verdict: 'متوسط', pct: 64, fg: L.orange },
    { topic: 'فرمول اندازه‌گیری', verdict: 'نیاز به تمرین', pct: 40, fg: L.red },
    { topic: 'هدف‌گذاری شاخص', verdict: 'عالی', pct: 90, fg: L.green },
    { topic: 'تحلیل نتایج', verdict: 'متوسط', pct: 60, fg: L.orange },
  ],
};

export const resultAnalysis = {
  title: 'تحلیل هوشمند یادگیری شما',
  body: [
    'شما در مفاهیم تعریف KPI و ارتباط آن با اهداف سازمانی تسلط خوبی دارید؛',
    'اما در طراحی فرمول اندازه‌گیری شاخص‌ها نیاز به تمرین بیشتری دارید.',
  ],
  cards: [
    {
      id: 'level',
      title: 'سطح فعلی شما',
      icon: 'lucide:badge-check',
      fg: L.blue,
      bg: L.blueSoft,
      level: 'حرفه‌ای',
      stars: 4,
      note: 'در مسیر بسیار خوبی هستید',
    },
    {
      id: 'gaps',
      title: 'حوزه‌های قابل توسعه',
      icon: 'lucide:triangle-alert',
      fg: L.amber,
      bg: L.amberSoft,
      items: ['فرمول‌نویسی شاخص‌ها', 'تعیین Target و حد استاندارد', 'تحلیل و تفسیر نتایج'],
    },
    {
      id: 'strengths',
      title: 'نقاط قوت شما',
      icon: 'lucide:circle-check',
      fg: L.green,
      bg: L.greenSoft,
      items: ['شناخت صحیح مفهوم KPI', 'ارتباط شاخص با اهداف سازمان', 'انتخاب معیار مناسب عملکرد'],
    },
  ],
};

export const resultReview = {
  title: 'مرور سوالات',
  all: { label: 'مشاهده همه سوالات', icon: 'lucide:eye' },
  wrong: {
    question: 'کدام مورد بهترین مثال برای یک شاخص شایستگی است؟',
    yours: { label: 'شما:', value: 'گزینه ۳' },
    correct: { label: 'صحیح:', value: 'گزینه ۱' },
    explainLabel: 'توضیح:',
    explain: 'شاخص outcome نتیجه نهایی عملکرد را نشان می‌دهد، گزینه ۱ به فعالیت انجام شده اشاره دارد.',
  },
  table: {
    cols: ['امتیاز', 'پاسخ صحیح', 'نتیجه شما', 'شماره سوال'],
    rows: [
      { n: '۱', yours: 'گزینه ۱', correct: 'گزینه ۱', score: '۱/۱', ok: true },
      { n: '۲', yours: 'گزینه ۴', correct: 'گزینه ۴', score: '۱/۱', ok: true },
      { n: '۳', yours: 'گزینه ۳', correct: 'گزینه ۱', score: '۰/۱', ok: false },
      { n: '۴', yours: 'گزینه ۴', correct: 'گزینه ۴', score: '۱/۱', ok: true },
      { n: '۵', yours: 'گزینه ۲', correct: 'گزینه ۵', score: '۰/۱', ok: false },
    ],
  },
};

export const resultDetails = {
  title: 'جزئیات آزمون',
  rows: [
    { label: 'تاریخ آزمون:', value: '۱۴۰۴/۰۵/۲۰' },
    { label: 'ساعت شروع:', value: '۱۰:۱۴' },
    { label: 'ساعت پایان:', value: '۱۰:۲۴' },
    { label: 'زمان مصرف شده:', value: '۲۲ دقیقه' },
    { label: 'نمره قبولی:', value: '۱۵ از ۲۰ (۷۵٪)' },
  ],
};

export const resultCertificate = {
  title: 'گواهینامه',
  icon: 'lucide:award',
  progress: 'شما ۶۰٪ این دوره را تکمیل کرده‌اید.',
  note: 'با تکمیل فصل سوم گواهینامه این دوره برای شما صادر خواهد شد',
  cta: { label: 'مشاهده گواهینامه', icon: 'lucide:eye', href: '/courses/performance-management/certificate' },
};

export const resultRating = {
  title: 'نظر شما درباره این آزمون',
  stars: 5,
  placeholder: 'نظر خود را بنویسید..',
  submit: 'ثبت نظر',
};

export const resultSuggest = {
  title: 'پیشنهادهای هوشمند آریاز برای شما',
  items: [
    {
      badge: 'فرم پیشنهادی',
      title: 'فرم طراحی شاخص',
      desc: 'دانلود فرم استاندارد طراحی شاخص‌های عملکرد',
      cta: 'دریافت فرم',
      icon: 'lucide:clipboard-list',
      fg: L.green,
      bg: L.greenSoft,
    },
    {
      badge: 'ابزار پیشنهادی',
      title: 'داشبورد KPI',
      desc: 'ابزار عملی طراحی و پایش شاخص‌ها در سازمان',
      cta: 'مشاهده ابزار',
      icon: 'lucide:chart-column-big',
      fg: L.green,
      bg: L.greenSoft,
    },
    {
      badge: 'آزمون پیشنهادی',
      title: 'آزمون پیشرفته KPI',
      desc: 'تسلط خود را با سوالات چالشی‌تر ارزیابی کنید.',
      cta: 'شروع آزمون',
      icon: 'lucide:pencil-line',
      fg: L.orange,
      bg: L.orangeSoft,
    },
    {
      badge: 'دوره پیشنهادی',
      title: 'HR Analytics',
      desc: 'تقویت مهارت تحلیل داده‌های منابع انسانی و شاخص‌ها',
      cta: 'مشاهده دوره',
      icon: 'lucide:book-open',
      fg: L.blue,
      bg: L.blueSoft,
    },
    {
      badge: 'ایجنت پیشنهادی',
      title: 'ایجنت طراحی KPI',
      desc: 'با کمک این ایجنت، شاخص‌های عملکردی حرفه‌ای طراحی کنید',
      cta: 'استفاده از ایجنت',
      icon: 'lucide:bot',
      fg: L.violet,
      bg: L.violetSoft,
    },
  ],
};

export const resultPath = {
  title: 'مسیر یادگیری شما',
  art: '/images/aryaz/illustrations/learning-path-illus.png',
  next: 'اجرای نظام ارزیابی عملکرد در سازمان',
  duration: 'مدت زمان: ۴۵ دقیقه',
  cta: 'ادامه یادگیری',
  agent: {
    title: 'پیشنهاد هوشمند آریاز',
    desc: 'برای تسلط بیشتر، پیشنهاد می‌کنیم ابتدا از ابزار داشبورد KPI استفاده کنید.',
    cta: { label: 'مشاهده ابزار', icon: 'lucide:eye' },
  },
};

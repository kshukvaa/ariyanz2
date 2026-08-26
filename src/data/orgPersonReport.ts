import { T } from './panelTokens';

/* ──────────────────────────────────────────────────────────────
   Individual report — /org/reports/people/[id]

   Screen 17. One person, read the way a manager would want it
   before a promotion conversation: where they stand, what carries
   them, what is holding them back, and what to do about it.

   Her overall score (۸۷) is the same number in the KPI row, the
   comparison bars and the last point of the trend, and the ۷۴.۲
   organisation average matches screen 15.
────────────────────────────────────────────────────────────── */

export const personHead = {
  title: 'گزارش فردی سارا کریمی',
  desc: 'نمایی یکپارچه از عملکرد، شایستگی‌ها، نتایج آزمون‌ها و مسیر توسعه فردی',
  crumbs: [
    { label: 'نتایج و گزارش‌ها', href: '/org/reports' },
    { label: 'واحد فروش', href: '/org/reports/units/sales' },
    { label: 'سارا کریمی' },
  ],
};

export const personProfile = {
  name: 'سارا کریمی',
  role: 'سرپرست فروش',
  avatar: '/images/aryaz/avatars/staff-sara-karimi.png',
  chips: [
    { label: 'High Potential', fg: T.successStrong, bg: T.tintGreen },
    { label: 'آماده ارتقا', fg: T.primary, bg: T.tintPurple },
  ],
  facts: [
    { k: 'واحد سازمانی:', v: 'فروش' },
    { k: 'تیم:', v: 'تهران' },
    { k: 'مدیر مستقیم:', v: 'محمد رضایی' },
    { k: 'سابقه:', v: '۴ سال و ۸ ماه' },
  ],
};

export const personKpis = [
  { id: 'total', value: '۸۷', label: 'امتیاز کل', sub: '۸٪', up: true, icon: 'lucide:activity', fg: T.primary, bg: T.tintPurple },
  { id: 'potential', value: '۸۹', label: 'پتانسیل', sub: '۶٪', up: true, icon: 'lucide:trending-up', fg: T.violet, bg: T.tintPurple },
  { id: 'competency', value: '۸۴', label: 'شایستگی', sub: '۵٪', up: true, icon: 'lucide:star', fg: T.infoStrong, bg: T.tintBlue },
  { id: 'completion', value: '۹۱٪', label: 'تکمیل ارزیابی‌ها', sub: '۷٪', up: true, icon: 'lucide:circle-check', fg: T.successStrong, bg: T.tintGreen },
  { id: 'readiness', value: '۸۲', label: 'آمادگی توسعه', sub: '۴٪', up: true, icon: 'lucide:sprout', fg: T.accent, bg: T.tintOrange },
];

export const personAi = {
  title: 'تحلیل آریاز از سارا کریمی',
  body: [
    'سارا در دوره جاری عملکردی بالاتر از میانگین واحد فروش داشته و در «حل مسئله»، «ارتباط با مشتری» و «انگیزش» نقاط قوت مشخصی دارد.',
    'مهم‌ترین Gap توسعه‌ای او «تفویض اختیار» و سپس «مدیریت زمان» است. روند دو دوره اخیر نشان‌دهنده رشد پایدار است.',
  ],
  cta: 'تحلیل عمیق با آریاز',
  chips: [
    { label: 'نقطه قوت اصلی', value: 'حل مسئله', sub: '۹۲/۱۰۰', fg: T.successStrong, bg: T.tintGreen },
    { label: 'اولویت توسعه', value: 'تفویض اختیار', sub: '۶۳/۱۰۰', fg: T.accent, bg: T.tintOrange },
    { label: 'روند', value: '+۸٪', sub: 'نسبت به دوره قبل', fg: T.danger, bg: T.tintRed },
  ],
};

export const personCompare = {
  title: 'مقایسه با دیگران',
  rows: [
    { label: 'سارا کریمی', value: 87, colour: T.primaryStrong, note: '۸۷' },
    { label: 'میانگین تیم تهران', value: 81, colour: T.violet, note: '۸۱' },
    { label: 'میانگین واحد فروش', value: 79, colour: '#b9a9fb', note: '۷۹' },
    { label: 'میانگین سازمان', value: 74.2, colour: '#d5d7e3', note: '۷۴.۲' },
  ],
  ranks: [
    { label: 'رتبه در واحد فروش', value: '۸ از ۲۸۰', icon: 'lucide:trophy' },
    { label: 'رتبه در تیم تهران', value: '۳ از ۷۲', icon: 'lucide:users-round' },
  ],
};

export const personTrend = {
  title: 'روند امتیاز',
  points: [72, 76, 81, 87],
  labels: ['پاییز ۱۴۰۴', 'زمستان ۱۴۰۴', 'بهار ۱۴۰۵', 'تابستان ۱۴۰۵'],
  summaryTitle: 'خلاصه روند',
  delta: '+۱۵',
  deltaNote: 'رشد یک‌ساله',
  badge: 'روند صعودی پایدار',
};

export const personRadar = {
  title: 'پروفایل شایستگی‌ها',
  axes: ['ارتباطات', 'انگیزش', 'رهبری', 'مدیریت زمان', 'تفویض اختیار', 'همکاری', 'پرتنشات'],
  self: [88, 90, 76, 69, 63, 86, 88],
  average: [79, 78, 72, 71, 68, 80, 77],
  legend: [
    { label: 'سارا کریمی', colour: T.primary },
    { label: 'میانگین همتایان', colour: T.muted, dashed: true },
  ],
  strengthsTitle: 'نقاط قوت کلیدی',
  strengths: [
    { n: '۱', label: 'حل مسئله', value: '۹۲' },
    { n: '۲', label: 'انگیزش', value: '۹۰' },
    { n: '۳', label: 'ارتباطات', value: '۸۸' },
  ],
  gapsTitle: 'فرصت‌های توسعه',
  gaps: [
    { n: '۱', label: 'تفویض اختیار', value: '۶۳' },
    { n: '۲', label: 'مدیریت زمان', value: '۶۹' },
    { n: '۳', label: 'برنامه‌ریزی', value: '۷۶' },
  ],
};

export const personTests = {
  title: 'نتایج آزمون‌ها',
  cta: 'مشاهده گزارش',
  cards: [
    {
      id: 'mbti',
      label: 'MBTI',
      value: 'ENTJ',
      note: '',
      date: 'آخرین اجرا ۱۴۰۵/۰۵/۲۰',
      icon: '/images/aryaz/test-icons-3d/test-mbti.png',
    },
    {
      id: 'eq',
      label: 'هوش هیجانی (EQ)',
      value: '۸۴ / ۱۰۰',
      note: '۶٪',
      up: true,
      date: 'آخرین اجرا ۱۴۰۵/۰۴/۱۵',
      icon: '/images/aryaz/test-icons-3d/test-eq.png',
    },
    {
      id: 'competency',
      label: 'شایستگی مدیریتی',
      value: '۸۶ / ۱۰۰',
      note: 'سطح بالا',
      date: 'آخرین اجرا ۱۴۰۵/۰۴/۱۸',
      icon: '/images/aryaz/test-icons-3d/quest-competency.png',
    },
    {
      id: 'leadership',
      label: 'سبک رهبری',
      value: 'تحولی',
      note: 'Dominant Style',
      date: 'آخرین اجرا ۱۴۰۵/۰۴/۱۸',
      icon: '/images/aryaz/test-icons-3d/test-leadership.png',
    },
  ],
};

export const personChanges = {
  title: 'تغییرات نسبت به دوره قبل',
  groups: [
    {
      id: 'up',
      label: 'بیشترین رشد',
      fg: T.successStrong,
      bg: T.tintGreen,
      rows: [
        { label: 'حل مسئله', value: '+۱۳٪' },
        { label: 'رهبری', value: '+۹٪' },
        { label: 'ارتباطات', value: '+۷٪' },
      ],
    },
    {
      id: 'down',
      label: 'بیشترین افت',
      fg: T.danger,
      bg: T.tintRed,
      rows: [
        { label: 'مدیریت زمان', value: '−۳٪' },
        { label: 'برنامه‌ریزی', value: '−۲٪' },
      ],
    },
    {
      id: 'flat',
      label: 'بدون تغییر معنادار',
      fg: T.muted,
      bg: '#f4f4f8',
      rows: [{ label: 'همکاری', value: '+۰.۵٪' }],
    },
  ],
};

export const personHistory = {
  title: 'تاریخچه ارزیابی‌ها',
  cta: 'مشاهده جزئیات',
  rows: [
    { period: 'زمستان ۱۴۰۵', name: 'ارزیابی مدیران فروش', score: '۸۷ / ۱۰۰ امتیاز', on: true },
    { period: 'بهار ۱۴۰۵', name: 'ارزیابی مدیران فروش', score: '۸۱ / ۱۰۰ امتیاز' },
    { period: 'زمستان ۱۴۰۴', name: 'ارزیابی استعداد مدیریتی', score: '۷۶ / ۱۰۰ امتیاز' },
    { period: 'پاییز ۱۴۰۴', name: 'ارزیابی عملکرد فصلی', score: '۷۲ / ۱۰۰ امتیاز' },
  ],
};

export const personReadiness = {
  title: 'آمادگی برای نقش بعدی',
  pct: 82,
  level: 'آمادگی بالا',
  role: 'نقش پیشنهادی: مدیر فروش منطقه',
  bars: [
    { label: 'شایستگی موردنیاز', value: 88, pct: '۸۸٪' },
    { label: 'پتانسیل', value: 91, pct: '۹۱٪' },
    { label: 'تجربه', value: 74, pct: '۷۴٪' },
    { label: 'Gap توسعه', value: 72, pct: '۷۲٪' },
  ],
  gapsTitle: 'شکاف‌های قبل از ارتقا',
  gaps: [
    { n: '۱', label: 'تفویض اختیار' },
    { n: '۲', label: 'تیم Coaching' },
    { n: '۳', label: 'مدیریت زمان' },
  ],
};

export const personPlan = {
  title: 'برنامه توسعه پیشنهادی',
  rows: [
    { n: '۰۱', label: 'دوره تفویض اختیار موثر', meta: 'زمان پیشنهادی: ۴ ساعت' },
    { n: '۰۲', label: 'آزمون / ارزیابی مجدد رهبری', meta: 'زمان پیشنهادی: ۳ ماه آینده' },
    { n: '۰۳', label: 'تمرین Coaching تیم', meta: 'برنامه عملی: ۴ هفته' },
  ],
  cta: { title: 'ساخت برنامه توسعه فردی', sub: 'انتقال به بخش توسعه', href: '/org/development/new' },
};

export const personSuggestions = {
  title: 'پیشنهادهای آریاز برای این فرد',
  cards: [
    { id: 'course', kind: 'دوره پیشنهادی', label: 'رهبری و تفویض اختیار', cta: 'مشاهده دوره', icon: 'lucide:graduation-cap', fg: T.successStrong, bg: T.tintGreen },
    { id: 'tool', kind: 'ابزار پیشنهادی', label: 'برنامه توسعه فردی (PDP)', cta: 'مشاهده ابزار', icon: 'lucide:clipboard-list', fg: T.infoStrong, bg: T.tintBlue },
    { id: 'book', kind: 'کتاب پیشنهادی', label: 'The Coaching Habit', sub: 'نویسنده: مایکل بانگی استانیر', cta: 'مشاهده کتاب', icon: 'lucide:book-open', fg: T.accent, bg: T.tintOrange },
    { id: 'agent', kind: 'ایجنت پیشنهادی', label: 'مربی توسعه رهبری', cta: 'شروع گفتگو', icon: 'lucide:bot', fg: T.violet, bg: T.tintPurple },
  ],
};

export const personNote = {
  title: 'یادداشت و اقدام مدیریتی',
  body: 'برای دوره بعد، مسئولیت هدایت پروژه X به ایشان واگذار شود.',
  author: 'علی احمدی — ۱۴۰۵/۰۵/۲۶',
  actions: [
    { label: 'ثبت یادداشت', icon: 'lucide:plus' },
    { label: 'تعریف اقدام', icon: 'lucide:plus' },
  ],
};

export const personAsk = {
  title: 'درباره سارا کریمی از آریاز بپرسید',
  placeholder: 'درباره نتایج و مسیر توسعه این فرد سوال کنید...',
  chips: [
    'آیا برای ارتقا آماده است؟',
    'برنامه سه ماه آینده توسعه چه باشد؟',
    'با میانگین مدیران مقایسه کن',
    'چرا چه شواهدی، وارد این، درنشانه‌نامه بده؟',
  ],
};

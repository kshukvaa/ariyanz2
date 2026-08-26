/* ──────────────────────────────────────────────────────────────
   تالار گفتگو — course forum
   Source: «course_forum.png»

   Three columns: topic categories on the right, the thread list
   in the middle, the "ask a new question" form on the left. The
   expanded thread at the foot of the page shows what a thread
   looks like opened — original post on the right, replies to its
   left, with the instructor's reply marked «پاسخ تأیید شده».
────────────────────────────────────────────────────────────── */

const A = '/images/aryaz/avatars';

export const forumCrumbs = {
  back: { label: 'بازگشت به دوره', href: '/courses/performance-management' },
  items: [
    { label: 'داشبورد', href: '/courses' },
    { label: 'دوره‌های من', href: '/courses' },
    { label: 'طراحی و استقرار نظام ارزیابی عملکرد کارکنان', href: '/courses/performance-management' },
    { label: 'تالار گفتگو' },
  ],
};

export const forumHero = {
  title: 'تالار گفتگو و یادگیری آریاز',
  desc: [
    'سوالات خود را مطرح کنید. تجربه‌های خود را به اشتراک بگذارید و',
    'از تجربه مدرس و سایر متخصصان استفاده کنید.',
  ],
  art: '/images/aryaz/illustrations/cta-chat-bubble.png',
  stats: [
    { value: '۹۸', label: 'پاسخ', icon: 'lucide:users-round' },
    { value: '۲۴۵', label: 'موضوع', icon: 'lucide:message-circle' },
    { value: '۳۴۵', label: 'پاسخ', icon: 'lucide:message-circle' },
    { value: '۸۰۰', label: 'اعضای فعال', icon: 'lucide:user-round' },
  ],
  course: {
    label: 'دوره جاری',
    title: 'طراحی و استقرار نظام ارزیابی عملکرد کارکنان',
    cta: 'مشاهده دوره',
    icon: 'lucide:graduation-cap',
  },
};

export const forumCategories = {
  title: 'دسته‌بندی موضوعات',
  items: [
    { label: 'همه موضوعات', count: '۲۶۶', on: true },
    { label: 'طراحی KPI', count: '۱۲۲' },
    { label: 'تحلیل عملکرد', count: '۸۷' },
    { label: 'وزن‌دهی و امتیازدهی', count: '۲۲' },
    { label: 'فرم ارزیابی', count: '۴۸' },
    { label: 'اجرای سیستم عملکرد', count: '۲۰' },
  ],
};

export const forumTabs = [
  { id: 'discussions', label: 'گفتگوهای درس', icon: 'lucide:message-circle' },
  { id: 'instructor', label: 'پاسخ‌های مدرس', icon: 'lucide:star' },
  { id: 'questions', label: 'سوالات کاربران', icon: 'lucide:users-round' },
];

export const forumToolbar = {
  sortLabel: 'مرتب‌سازی بر اساس:',
  sortValue: 'جدیدترین',
  filters: 'فیلترها',
  more: 'مشاهده بیشتر',
};

export interface Thread {
  id: string;
  title: string;
  author: string;
  avatar: string;
  role: string;
  when: string;
  replies: string;
  tags: string[];
  instructorAnswered?: boolean;
}

export const forumThreads: Thread[] = [
  {
    id: 'behavioral-kpi',
    title: 'چگونه KPIهای رفتاری را اندازه‌گیری کنیم؟',
    author: 'مهدی احمدی',
    avatar: `${A}/emp-mehdi-ahmadi-nav.png`,
    role: 'دانشجو',
    when: '۲ ساعت قبل',
    replies: '۵۸',
    tags: ['درس: شاخص‌ها', 'موضوع: شاخص‌های رفتاری'],
    instructorAnswered: true,
  },
  {
    id: 'leading-lagging',
    title: 'تفاوت KPI پیشرو و پسرو در ارزیابی عملکرد چیست؟',
    author: 'سارا محمدی',
    avatar: `${A}/mbti-reviewer-01.png`,
    role: 'دانشجو',
    when: '۵ ساعت قبل',
    replies: '۱۲',
    tags: ['درس: تحلیل عملکرد', 'موضوع: انواع KPI'],
  },
  {
    id: 'one-kpi-many-goals',
    title: 'آیا می‌توان از یک KPI برای چند هدف استفاده کرد؟',
    author: 'علی رضایی',
    avatar: `${A}/staff-ali-ahmadi.png`,
    role: 'دانشجو',
    when: '۲ روز قبل',
    replies: '۲۴',
    tags: ['درس: طراحی KPI', 'موضوع: ارتباط اهداف و KPI'],
  },
  {
    id: 'weighting',
    title: 'چگونه وزن‌دهی شاخص‌ها را در عمل انجام دهیم؟',
    author: 'زهرا کاظمی',
    avatar: `${A}/staff-zahra-nouri.png`,
    role: 'دانشجو',
    when: '۴ روز قبل',
    replies: '۵۶',
    tags: ['درس: وزن شاخص‌ها', 'موضوع: وزن‌دهی'],
    instructorAnswered: true,
  },
  {
    id: 'standard-form',
    title: 'نمونه فرم ارزیابی عملکرد استاندارد کدام است؟',
    author: 'امیر حسینی',
    avatar: `${A}/expert-01-lawyer.png`,
    role: 'دانشجو',
    when: '۲ روز قبل',
    replies: '۲۴',
    tags: ['درس: طراحی ارزیابی', 'موضوع: فرم ارزیابی'],
  },
];

export const forumCompose = {
  title: 'ایجاد موضوع جدید',
  fields: [
    { id: 'title', label: 'عنوان سوال', placeholder: 'عنوان سوال خود را بنویسید', kind: 'text' as const },
    { id: 'lesson', label: 'مربوط به', placeholder: 'انتخاب درس', kind: 'select' as const },
    { id: 'chapter', label: 'فصل', placeholder: 'انتخاب فصل', kind: 'select' as const },
    { id: 'topic', label: 'موضوع', placeholder: 'انتخاب موضوع', kind: 'select' as const },
    { id: 'body', label: 'متن سوال', placeholder: 'سوال خود را با جزئیات بنویسید...', kind: 'textarea' as const },
  ],
  attach: {
    label: 'ضمیمه (اختیاری)',
    title: 'فایل خود را بکشید و رها کنید',
    hint: 'یا برای انتخاب فایل کلیک کنید',
    limit: '(حداکثر ۱۵ مگابایت)',
  },
  submit: 'ارسال موضوع',
};

export const forumAgent = {
  title: 'پیشنهادهای هوشمند آریاز',
  desc: ['این سوال لینک به درس ۰۳ طراحی KPI،', 'توضیح دهنده است'],
  lead: 'پیشنهاد می‌کنیم ابتدا موارد زیر را مشاهده کنید:',
  actions: [
    { label: 'مشاهده درس مرتبط', icon: 'lucide:book-open' },
    { label: 'پرسش از ایجنت KPI', icon: 'lucide:bot' },
    { label: 'مشاهده سوالات مشابه', icon: 'lucide:search' },
  ],
};

export const forumLeaders = {
  title: 'کاربران فعال این هفته',
  cta: 'مشاهده رتبه‌بندی کامل',
  items: [
    { rank: '۱', name: 'مهدی احمدی', note: '۱۸۴ پاسخ', avatar: `${A}/emp-mehdi-ahmadi-nav.png`, fg: '#f5a524' },
    { rank: '۲', name: 'سارا محمدی', note: '۱۴۰ پاسخ', avatar: `${A}/mbti-reviewer-01.png`, fg: '#9ca3af' },
    { rank: '۳', name: 'علی ورشابی', note: '۱۰۲ پاسخ', avatar: `${A}/staff-ali-ahmadi.png`, fg: '#c98b53' },
  ],
};

export const forumOpen = {
  title: 'چگونه KPIهای رفتاری را اندازه‌گیری کنیم؟',
  tag: 'درس: طراحی KPI',
  original: {
    author: 'مهدی احمدی',
    avatar: `${A}/emp-mehdi-ahmadi-nav.png`,
    when: '۳ ساعت قبل',
    body: 'برای شاخص‌های رفتاری مثل همکاری، خلاقیت یا مسئولیت‌پذیری چه روش‌هایی برای اندازه‌گیری وجود دارد؟ آیا می‌توان از مقیاس‌های رفتاری استفاده کرد؟ لطفاً نمونه‌ای هم معرفی کنید.',
    attachment: { name: 'فرم نمونه KPI رفتاری.pdf', size: '۲۳۶ KB' },
  },
  replies: [
    {
      author: 'علی رضایی',
      avatar: `${A}/staff-ali-ahmadi.png`,
      when: '۱ ساعت قبل',
      body: 'سلام، بله مقیاس لیکرت و ارزیابی ۳۶۰ درجه بهترین روش‌ها هستند. من از فرم ارزیابی رفتاری بارتا استفاده کردم، بسیار کاربردی بود.',
    },
    {
      author: 'دکتر علی محمودی',
      avatar: `${A}/staff-mohammad-rezaei.png`,
      when: '۳۰ دقیقه قبل',
      badges: ['مدرس', 'مدیر دوره'],
      approved: 'پاسخ تأیید شده',
      body: 'درست است. برای KPIهای رفتاری از مقیاس لیکرت ۵ درجه‌ای استفاده کنید و در صورت‌وضعیت لنگان، شواهد رفتاری مشخص را مستند کنید تا ارزیابی قابل دفاع بماند.',
    },
  ],
};

/* ──────────────────────────────────────────────────────────────
   صفحه مدرس — instructor profile
   Source: «single teacher page.png»

   The hero is a rounded dark card rather than a full-bleed band —
   measured from the mockup at #0e0b29 on the right shading to
   #34305a on the left, with the portrait bleeding off the right
   edge. Below it the page is three columns: a spec card and the
   bio in the middle, contact details on the left, professional
   history running as a right-anchored timeline.
────────────────────────────────────────────────────────────── */

/* Measured off the hero card. */
export const INSTRUCTOR_HERO_FROM = '#0e0b29';
export const INSTRUCTOR_HERO_TO = '#34305a';

const A = '/images/aryaz/avatars';

export const instructorCrumbs = [
  { label: 'خانه', href: '/' },
  { label: 'مدرسین', href: '/instructors' },
  { label: 'دکتر امیر حسینی' },
];

export const instructorHero = {
  badge: 'مدرس فعال آریاز',
  name: 'دکتر امیر حسینی',
  title: 'مشاور و مدرس ارشد منابع انسانی',
  desc: 'متخصص در طراحی سیستم‌های منابع انسانی و توسعه سازمانی',
  avatar: `${A}/expert-01-lawyer.png`,
  rating: '۴.۹ از ۵',
  basis: 'بر اساس ۱۳۸۰ ارزیابی فراگیران',
  skillsTitle: 'تخصص‌ها',
  skills: ['HRBP', 'مدیریت عملکرد', 'توسعه سازمانی', 'جبران خدمات', 'طراحی ساختار', 'توسعه مدیران'],
  actions: [
    { label: 'مشاهده دوره‌ها', icon: 'lucide:calendar', kind: 'solid' as const },
    { label: 'رزرو مشاوره', icon: 'lucide:calendar', kind: 'green' as const },
    { label: 'دنبال کردن مدرس', icon: 'lucide:heart', kind: 'white' as const },
  ],
};

export const instructorStats = [
  { value: '۴۷', label: 'پروژه سازمانی', sub: 'اجرا شده با موفقیت', icon: 'lucide:briefcase' },
  { value: '۹۶٪', label: 'رضایت فراگیران', sub: 'از کیفیت دوره‌ها', icon: 'lucide:star' },
  { value: '۱۲۸۰+', label: 'دانشجو و فراگیر', sub: 'در دوره‌های آموزشی', icon: 'lucide:users-round' },
  { value: '۳۲', label: 'دوره برگزارشده', sub: 'آنلاین و حضوری', icon: 'lucide:book-open' },
  { value: '۱۵', label: 'سال تجربه', sub: 'در حوزه منابع انسانی', icon: 'lucide:user-round' },
];

export const instructorTabs = [
  { id: 'about', label: 'درباره مدرس', icon: 'lucide:user-round' },
  { id: 'courses', label: 'دوره‌ها', icon: 'lucide:book-open' },
  { id: 'articles', label: 'مقالات', icon: 'lucide:file-text' },
  { id: 'projects', label: 'پروژه‌ها و تجربیات', icon: 'lucide:briefcase' },
  { id: 'reviews', label: 'نظرات فراگیران', icon: 'lucide:star' },
  { id: 'certs', label: 'گواهینامه‌ها', icon: 'lucide:award' },
];

export const instructorAbout = {
  title: 'معرفی مدرس',
  spec: [
    { label: 'مدرک تحصیلی', value: 'دکتری مدیریت منابع انسانی', icon: 'lucide:award' },
    { label: 'دانشگاه', value: 'دانشگاه تهران', icon: 'lucide:graduation-cap' },
    { label: 'زبان‌های تدریس', value: 'فارسی', icon: 'lucide:message-circle' },
    { label: 'شیوه تدریس', value: 'آنلاین، حضوری، ترکیبی', icon: 'lucide:monitor-play' },
  ],
  body: [
    'دکتر امیر حسینی متخصص حوزه منابع انسانی و توسعه سازمانی است که بیش از ۱۵ سال تجربه اجرایی و مشاوره‌ای در طراحی و پیاده‌سازی سیستم‌های منابع انسانی، توسعه مدیران، مدیریت عملکرد، جبران خدمات و تحول سازمانی دارد.',
    'ایشان با ترکیب دانش آکادمیک و تجربه عملی در سازمان‌های بزرگ، داخلی، رویکردی کاربردی و نتیجه‌محور در آموزش و مشاوره ارائه می‌دهد.',
  ],
};

export const instructorContact = {
  title: 'راه‌های ارتباطی',
  items: [
    { label: 'www.amirhosseini.com', icon: 'lucide:globe' },
    { label: 'info@amirhosseini.com', icon: 'lucide:mail' },
    { label: '۰۲۱-۸۸۸۸۷۷۶۶', icon: 'lucide:phone' },
    { label: 'linkedin.com/in/amirhosseini', icon: 'mdi:linkedin' },
  ],
  cta: 'ارسال پیام',
};

export const instructorSocial = {
  title: 'شبکه‌های اجتماعی',
  items: [
    { icon: 'mdi:linkedin', bg: '#0a66c2' },
    { icon: 'mdi:telegram', bg: '#8b5cf6' },
    { icon: 'mdi:instagram', bg: '#e1306c' },
  ],
};

export const instructorResume = {
  title: 'دانلود رزومه',
  desc: 'رزومه کامل دکتر امیر حسینی',
  cta: 'دانلود PDF',
};

export const instructorCareer = {
  title: 'سوابق حرفه‌ای',
  more: 'مشاهده سوابق بیشتر',
  items: [
    {
      period: '۱۴۰۰ - تاکنون',
      role: 'مدیر منابع انسانی ارشد',
      org: 'شرکت توسعه تجارت بهین',
      desc: 'مسئول طراحی و اجرای استراتژی منابع انسانی، سیستم ارزیابی عملکرد و توسعه مدیران',
    },
    {
      period: '۱۳۹۵ - ۱۴۰۰',
      role: 'مشاور منابع انسانی',
      org: 'مشاور مستقل',
      desc: 'مشاوره در حوزه طراحی ساختار، نظام جبران خدمات و تحول منابع انسانی در شرکت‌های مختلف',
    },
    {
      period: '۱۳۹۰ - ۱۳۹۵',
      role: 'کارشناس ارشد منابع انسانی',
      org: 'شرکت صنایع غذایی پارس',
      desc: 'مدیر پروژه‌های توسعه سازمانی، استقرار سیستم‌های منابع انسانی و بهبود فرآیندها',
    },
  ],
};

/* ──────────────────────────────────────────────────────────────
   Tab panels.

   «single teacher page.png» only draws the «درباره مدرس» tab, so
   the other five had no panel behind them and the tab bar moved
   its underline over unchanged content. The panels below follow
   the mockup's own card language — Card + SectionTitle, the pale
   #f8f7fd row fill, purple rules — so the tabs read as one page.
────────────────────────────────────────────────────────────── */

const TH = '/images/aryaz/thumbnails';
const AV = '/images/aryaz/avatars';

export const instructorCourses = {
  title: 'دوره‌های مدرس',
  empty: 'دوره‌ای برای نمایش وجود ندارد.',
  items: [
    {
      title: 'دوره جامع HRBP حرفه‌ای',
      desc: 'تربیت شریک استراتژیک منابع انسانی برای همراهی با کسب‌وکار',
      image: `${TH}/article-05-competency-hiring.png`,
      mode: 'آنلاین',
      duration: '۴۰ ساعت',
      students: '۳۲۰ فراگیر',
      rating: '۴.۹',
      price: '۸,۹۰۰,۰۰۰ تومان',
    },
    {
      title: 'کارگاه عملی طراحی KPI',
      desc: 'طراحی شاخص‌های کلیدی عملکرد بر پایه اهداف استراتژیک سازمان',
      image: `${TH}/kpi-article-01-design-guide.png`,
      mode: 'حضوری',
      duration: '۸ ساعت',
      students: '۱۴۵ فراگیر',
      rating: '۴.۸',
      price: '۸۵۰,۰۰۰ تومان',
    },
    {
      title: 'دوره جامع مدیریت عملکرد',
      desc: 'استقرار چرخه کامل ارزیابی، بازخورد و بهبود عملکرد کارکنان',
      image: `${TH}/article-09-performance-kpi.png`,
      mode: 'ترکیبی',
      duration: '۲۴ ساعت',
      students: '۲۱۰ فراگیر',
      rating: '۴.۷',
      price: '۴,۲۰۰,۰۰۰ تومان',
    },
    {
      title: 'طراحی نظام جبران خدمات',
      desc: 'ساخت ساختار حقوق و مزایای منصفانه و قابل دفاع در سازمان',
      image: `${TH}/doc-article-03-wage-impact.png`,
      mode: 'آنلاین',
      duration: '۱۶ ساعت',
      students: '۱۸۶ فراگیر',
      rating: '۴.۸',
      price: '۳,۵۰۰,۰۰۰ تومان',
    },
  ],
};

export const instructorArticles = {
  title: 'مقالات مدرس',
  cta: 'مطالعه مقاله',
  items: [
    {
      title: 'چرا HRBP در سازمان‌های ایرانی شکست می‌خورد؟',
      meta: '۸ دقیقه مطالعه',
      date: '۱۲ مرداد ۱۴۰۵',
      image: `${TH}/article-05-competency-hiring.png`,
    },
    {
      title: 'شاخص‌هایی که واقعاً عملکرد را می‌سنجند',
      meta: '۶ دقیقه مطالعه',
      date: '۲۸ تیر ۱۴۰۵',
      image: `${TH}/kpi-article-04-smart-criteria.png`,
    },
    {
      title: 'از ارزیابی سالانه تا بازخورد مستمر',
      meta: '۷ دقیقه مطالعه',
      date: '۰۵ تیر ۱۴۰۵',
      image: `${TH}/related-02-effective-feedback.png`,
    },
    {
      title: 'ساختار سازمانی چابک؛ افسانه یا ضرورت؟',
      meta: '۹ دقیقه مطالعه',
      date: '۱۹ خرداد ۱۴۰۵',
      image: `${TH}/article-02-leadership-strat.png`,
    },
  ],
};

export const instructorProjects = {
  title: 'پروژه‌ها و تجربیات',
  items: [
    {
      name: 'استقرار نظام ارزیابی عملکرد',
      org: 'گروه صنعتی پارس‌خودرو',
      year: '۱۴۰۴',
      scope: 'بیش از ۱٬۲۰۰ کارمند در ۶ واحد عملیاتی',
      result: 'کاهش ۳۴٪ اختلافات ارزیابی و افزایش رضایت مدیران میانی',
      icon: 'lucide:target',
    },
    {
      name: 'بازطراحی ساختار سازمانی',
      org: 'شرکت توسعه تجارت بهین',
      year: '۱۴۰۳',
      scope: 'بازنگری ۴۸ عنوان شغلی و مسیرهای پیشرفت',
      result: 'کوتاه شدن زنجیره تصمیم‌گیری از ۵ به ۳ سطح',
      icon: 'lucide:workflow',
    },
    {
      name: 'طراحی نظام جبران خدمات',
      org: 'شرکت صنایع غذایی پارس',
      year: '۱۴۰۲',
      scope: 'ارزیابی مشاغل و طراحی جدول حقوق و مزایا',
      result: 'کاهش ۲۱٪ نرخ خروج کارکنان کلیدی طی یک سال',
      icon: 'lucide:briefcase',
    },
    {
      name: 'برنامه توسعه مدیران',
      org: 'بانک ملت',
      year: '۱۴۰۱',
      scope: 'توسعه شایستگی ۹۰ مدیر شعبه در ۸ ماه',
      result: 'ارتقای ۴۰٪ شرکت‌کنندگان به سطوح بالاتر مدیریتی',
      icon: 'lucide:users-round',
    },
  ],
};

export const instructorReviews = {
  title: 'نظرات فراگیران',
  score: '۴.۹',
  outOf: 'از ۵',
  basis: ['۱٬۳۸۰ ارزیابی', '۴۶۲ دیدگاه'],
  bars: [
    { label: '۵ ستاره', pct: 84, count: '۱٬۱۵۹' },
    { label: '۴ ستاره', pct: 11, count: '۱۵۲' },
    { label: '۳ ستاره', pct: 3, count: '۴۱' },
    { label: '۲ ستاره', pct: 1, count: '۱۴' },
    { label: '۱ ستاره', pct: 1, count: '۱۴' },
  ],
  items: [
    {
      name: 'سارا نادری',
      role: 'مشاور سازمانی',
      avatar: `${AV}/mbti-reviewer-01.png`,
      stars: 5,
      text: 'مثال‌های واقعی دوره باعث شد بتوانم همان هفته اول چارچوب را در تیم خودم پیاده کنم.',
    },
    {
      name: 'علی رضایی',
      role: 'مدیر عامل',
      avatar: `${AV}/staff-ali-ahmadi.png`,
      stars: 5,
      text: 'نگاه ایشان به منابع انسانی کاملاً کسب‌وکارمحور است؛ چیزی که در دوره‌های مشابه ندیده بودم.',
    },
    {
      name: 'مریم محمدی',
      role: 'مدیر منابع انسانی',
      avatar: `${AV}/reviewer-02.png`,
      stars: 4,
      text: 'محتوا بسیار کاربردی بود. تنها کاش زمان بخش کارگاهی کمی بیشتر بود.',
    },
  ],
};

export const instructorCerts = {
  title: 'گواهینامه‌ها و اعتبارنامه‌ها',
  items: [
    { name: 'گواهینامه بین‌المللی SHRM-SCP', issuer: 'انجمن مدیریت منابع انسانی آمریکا', year: '۱۴۰۲' },
    { name: 'گواهینامه ارزیاب مرکز ارزیابی', issuer: 'انجمن مدیریت منابع انسانی ایران', year: '۱۴۰۱' },
    { name: 'گواهینامه مربیگری حرفه‌ای ICF', issuer: 'فدراسیون بین‌المللی کوچینگ', year: '۱۴۰۰' },
    { name: 'گواهینامه تحلیلگر داده منابع انسانی', issuer: 'دانشگاه تهران', year: '۱۳۹۹' },
  ],
};

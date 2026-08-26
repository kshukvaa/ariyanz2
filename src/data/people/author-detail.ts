/* ──────────────────────────────────────────────────────────────
   صفحه نویسنده — author profile
   Source: «single writer.png»

   The counterpart to the instructor profile, and deliberately not
   the same page: an instructor is measured in courses and
   students, an author in reads and credibility. So the hero here
   leads with «اعتبار محتوا» rather than a teaching rating, the
   stat strip counts articles/books/views/reader-satisfaction, and
   the aside is an Aryaz agent that answers «which of this
   author's work should I start with?» rather than a contact card.

   Hero band measured at #161139 → #2d2061.
────────────────────────────────────────────────────────────── */

export const AUTHOR_HERO_FROM = '#161139';
export const AUTHOR_HERO_TO = '#2d2061';

const A = '/images/aryaz/avatars';
const TH = '/images/aryaz/thumbnails';

export const authorCrumbs = [
  { label: 'خانه', href: '/' },
  { label: 'نویسندگان', href: '/authors' },
  { label: 'دکتر امیر حسینی' },
];

export const authorHero = {
  badge: 'نویسنده تأیید شده آریاز',
  name: 'دکتر امیر حسینی',
  title: 'نویسنده و متخصص منابع انسانی و توسعه سازمانی',
  avatar: `${A}/expert-01-lawyer.png`,
  score: '۴.۹',
  scoreLabel: 'اعتبار محتوا',
  basis: 'بر اساس ارزیابی ۱۲٬۸۶۰ خواننده',
  tags: ['منابع انسانی', 'رهبری', 'تحول سازمانی', 'مدیریت عملکرد', 'توسعه فردی'],
  save: 'ذخیره',
  actions: [
    { label: 'دنبال کردن نویسنده', icon: 'lucide:user-round', kind: 'solid' as const },
    { label: 'مشاهده آثار', icon: 'lucide:book-open', kind: 'white' as const },
  ],
};

export const authorStats = [
  { value: '۹۸٪', label: 'رضایت خوانندگان', sub: 'از کیفیت محتوا', icon: 'lucide:smile' },
  { value: '۱۲۵ هزار', label: 'کل بازدید محتوا', sub: 'مقالات و کتاب‌ها', icon: 'lucide:eye' },
  { value: '۵', label: 'کتاب و اثر تخصصی', sub: 'کتاب، ترجمه و راهنما', icon: 'lucide:book-open' },
  { value: '۴۵', label: 'مقاله منتشرشده', sub: 'تحلیل، یادداشت و پژوهش', icon: 'lucide:file-text' },
];

export const authorTabs = [
  { id: 'about', label: 'درباره نویسنده', icon: 'lucide:user-round' },
  { id: 'articles', label: 'مقالات', icon: 'lucide:book-open' },
  { id: 'books', label: 'کتاب‌ها', icon: 'lucide:book-open' },
  { id: 'notes', label: 'یادداشت‌ها', icon: 'lucide:pencil-line' },
  { id: 'interviews', label: 'مصاحبه‌ها', icon: 'lucide:mic' },
  { id: 'courses', label: 'دوره‌های مرتبط', icon: 'lucide:graduation-cap' },
];

export const authorThemes = {
  title: 'حوزه‌های فکری',
  items: [
    { label: 'تحول دیجیتال HR', icon: 'lucide:workflow' },
    { label: 'تجربه کارکنان', icon: 'lucide:users-round' },
    { label: 'مدیریت عملکرد', icon: 'lucide:target' },
    { label: 'رهبری و تفکر', icon: 'lucide:lightbulb' },
  ],
};

export const authorAbout = {
  title: 'درباره نویسنده',
  body: [
    'دکتر امیر حسینی در حوزهٔ منابع انسانی، توسعه سازمانی و مدیریت سرمایه انسانی فعالیت دارد. او با بیش از ۱۵ سال تجربه اجرایی و مشاوره‌ای، تمرکز خود را بر طراحی سیستم‌های منابع انسانی، ارتقای عملکرد سازمان‌ها و توسعه شایستگی‌های مدیران گذاشته است.',
    'دیدگاه‌های او ترکیبی از پژوهش‌های علمی، تجربه میدانی و تحلیل چالش‌های واقعی سازمان‌های ایرانی است.',
  ],
  credentials: [
    { label: 'سخنران رویدادهای تخصصی', sub: 'داخل و خارج از کشور', icon: 'lucide:mic' },
    { label: 'محقق و مشاور سازمانی', sub: 'پروژه‌های ملی و بین‌المللی', icon: 'lucide:users-round' },
    { label: 'دکتری مدیریت منابع انسانی', sub: 'دانشگاه تهران', icon: 'lucide:graduation-cap' },
  ],
};

export const authorAgent = {
  title: 'آریاز درباره این نویسنده',
  desc: ['هر سوالی درباره نویسنده و آثار/ارزش دارید', 'از من بپرسید تا راهنمایی‌تان کنم.'],
  art: '/images/aryaz/illustrations/book-ai-robot.png',
  chips: [
    'مهم‌ترین مقاله این نویسنده چیست؟',
    'از کدام محتوا شروع کنم؟',
    'این نویسنده در چه حوزه‌ای تخصص دارد؟',
    'آیا این نویسنده برای موضوع من مناسب است؟',
    'خلاصه دیدگاه‌های این نویسنده چیست؟',
  ],
  placeholder: 'سوال خود را بنویسید.',
};

export const authorEducation = {
  title: 'تحصیلات',
  items: [
    { degree: 'دکتری مدیریت منابع انسانی', school: 'دانشگاه تهران' },
    { degree: 'کارشناسی ارشد مدیریت دولتی', school: 'دانشگاه علامه طباطبایی' },
    { degree: 'کارشناسی مدیریت بازرگانی', school: 'دانشگاه شهید بهشتی' },
  ],
};

export const authorCareer = {
  title: 'سوابق حرفه‌ای و علمی',
  items: [
    {
      period: '۱۴۰۰ - تاکنون',
      role: 'مدیر منابع انسانی ارشد',
      org: 'شرکت توسعه تجارت چیین',
      desc: 'طراحی و پیاده‌سازی نظام جامع مدیریت عملکرد و توسعه سرمایه انسانی',
    },
    {
      period: '۱۳۹۵ - ۱۴۰۰',
      role: 'مشاور توسعه سازمانی و منابع انسانی',
      org: 'مؤسسه مشاوره مدیریت آرین',
      desc: 'مشاوره در بیش از ۳۰ پروژه در حوزه‌های طراحی ساختار، نظام جبران خدمات و تحول منابع انسانی',
    },
    {
      period: '۱۳۹۰ - ۱۳۹۵',
      role: 'مدیر توسعه سرمایه انسانی',
      org: 'گروه صنعتی پارس خودرو',
      desc: 'مسئولیت طراحی و اجرای سیستم‌های ارزیابی عملکرد و توسعه شایستگی‌ها',
    },
  ],
};

export const authorPosts = {
  title: 'آخرین نوشته‌ها',
  cta: 'مشاهده همه',
  items: [
    {
      title: 'چرا بسیاری از سیستم‌های ارزیابی عملکرد شکست می‌خورند؟',
      meta: '۵ دقیقه مطالعه',
      image: `${TH}/kpi-article-01-design-guide.png`,
    },
    {
      title: 'آینده HRBP در سازمان‌های ایرانی',
      meta: '۶ دقیقه مطالعه',
      image: `${TH}/article-05-competency-hiring.png`,
    },
    {
      title: 'نقش داده و تحلیل در تصمیم‌گیری‌های منابع انسانی',
      meta: '۱۰ دقیقه مطالعه',
      image: `${TH}/article-07-data-decisions.png`,
    },
    {
      title: 'چگونه فرهنگ سازمانی را واقعاً می‌توان تغییر داد؟',
      meta: '۷ دقیقه مطالعه',
      image: `${TH}/article-08-positive-culture.png`,
    },
  ],
};

export const authorBooks = {
  title: 'کتاب‌های منتشر شده',
  cta: 'مشاهده همه',
  items: [
    {
      title: 'راهبردهای نوین جبران خدمات',
      meta: 'چاپ ۱۴۰۰ | ۳۴۰ صفحه',
      cover: `${TH}/book-article-01-hr-strategy.png`,
    },
    {
      title: 'تحول دیجیتال در منابع انسانی',
      meta: '۱۴۰۱ | ۲۹۰ صفحه',
      cover: `${TH}/book-article-03-hr-sources.png`,
    },
    {
      title: 'مدیریت منابع انسانی استراتژیک',
      meta: '۱۴۰۲ | ۳۸۰ صفحه',
      cover: `${TH}/book-article-04-talent-attract.png`,
    },
  ],
};

export const authorReviews = {
  title: 'نظرات خوانندگان',
  all: 'مشاهده همه نظرات',
  score: '۴.۹',
  outOf: 'از ۵',
  basis: ['۱۲٬۸۶۰ ارزیابی', '۳٬۹۴۵ دیدگاه'],
  bars: [
    { label: '۵ ستاره', pct: 82, count: '۱۰٬۵۳۰' },
    { label: '۴ ستاره', pct: 12, count: '۱٬۵۴۰' },
    { label: '۳ ستاره', pct: 4, count: '۵۱۴' },
    { label: '۲ ستاره', pct: 1, count: '۱۲۸' },
    { label: '۱ ستاره', pct: 1, count: '۱۴۸' },
  ],
  items: [
    {
      name: 'سارا نادری',
      role: 'مشاور سازمانی',
      avatar: `${A}/mbti-reviewer-01.png`,
      stars: 5,
      text: 'ترکیب تجربه اجرایی و دانش علمی در نوشته‌های ایشان مثال‌زدنی است.',
    },
    {
      name: 'علی رضایی',
      role: 'مدیر عامل',
      avatar: `${A}/staff-ali-ahmadi.png`,
      stars: 5,
      text: 'مقالات دکتر حسینی نگرش مرا در مدیریت افراد و سازمان کاملاً تغییر داد.',
    },
    {
      name: 'مریم محمدی',
      role: 'مدیر منابع انسانی',
      avatar: `${A}/staff-zahra-nouri.png`,
      stars: 5,
      text: 'تحلیل‌های ایشان بسیار کاربردی و نزدیک به مسائل واقعی سازمان‌هاست.',
    },
  ],
};

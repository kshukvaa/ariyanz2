/* ──────────────────────────────────────────────────────────────
   Marketing pages: درباره ما، تماس با ما، سؤالات متداول،
   همکاری با آریاز، فرصت‌های شغلی، اخبار و اطلاعیه‌ها.
   Sources: «1.png», «2.png», «5.png», «6.png», «7.png», «8.png»,
   «9.png».
────────────────────────────────────────────────────────────── */

const IL = '/images/aryaz/illustrations';
const TH = '/images/aryaz/thumbnails';
const AV = '/images/aryaz/avatars';

/* ── درباره ما «1.png» ────────────────────────────────────────── */

export const about = {
  crumb: 'درباره ما',
  kicker: 'آریاز؛',
  title: 'رشد انسان‌ها، توانمندسازی سازمان‌ها',
  desc: 'آریاز یک پلتفرم تخصصی برای یادگیری، توسعه حرفه‌ای، ابزارهای مدیریتی و خدمات تخصصی سازمان‌هاست؛ جایی که دانش، تجربه و فناوری کنار هم قرار می‌گیرند تا عملکرد انسان و سازمان را متحول کنند.',
  ctas: [
    { label: 'آشنایی با خدمات آریاز', href: '/org', tone: 'navy' as const, icon: 'lucide:arrow-left' },
    { label: 'داستان آریاز', href: '#story', tone: 'outline' as const, icon: 'lucide:circle-play' },
  ],
  art: `${IL}/agents-hero.png`,
  whatTitle: 'آریاز چیست؟',
  what: [
    {
      title: 'یادگیری',
      desc: 'دوره‌های تخصصی، مقالات، کتاب‌ها، آزمون‌ها و مسیرهای یادگیری برای رشد فردی و حرفه‌ای',
      cta: 'مشاهده دوره‌ها',
      href: '/courses',
      icon: 'lucide:book-open',
      tone: 'blue' as const,
    },
    {
      title: 'حل مسئله',
      desc: 'ارائه ابزارها، ماشین‌حساب‌ها، فرم‌ها و ایجنت‌های هوشمند برای حل مسائل واقعی کسب‌وکارها',
      cta: 'مشاهده ابزارها و خدمات',
      href: '/tools',
      icon: 'lucide:target',
      tone: 'blue' as const,
    },
    {
      title: 'توسعه سازمان',
      desc: 'آموزش سازمانی، طراحی سیستم‌ها، برون‌سپاری فرآیندها و اجرای پروژه‌های توسعه‌ای برای سازمان‌ها',
      cta: 'مشاهده خدمات سازمانی',
      href: '/org',
      icon: 'lucide:building-2',
      tone: 'orange' as const,
    },
  ],
  storyTitle: 'داستان شکل‌گیری آریاز',
  story: [
    { title: 'شروع ایده', desc: 'از دل تجربه‌های واقعی در سازمان‌ها و نیاز به راهکارهای متفاوت', icon: 'lucide:lightbulb' },
    { title: 'تجربه عملی در سازمان‌ها', desc: 'همراهی با مدیران و تیم‌ها در ده‌ها پروژه مشاوره و آموزش', icon: 'lucide:users-round' },
    { title: 'توسعه محتوا و خدمات', desc: 'تولید محتوای کاربردی، طراحی ابزارها و ساختاردهی خدمات تخصصی', icon: 'lucide:file-text' },
    { title: 'ساخت اکوسیستم آریاز', desc: 'ایجاد یک پلتفرم یکپارچه برای یادگیری، حل مسئله و توسعه سازمان‌ها', icon: 'lucide:rocket' },
  ],
  vision: {
    title: 'چشم‌انداز ما',
    desc: 'تبدیل‌شدن به یکی از معتبرترین اکوسیستم‌های فارسی‌زبان توسعه انسان و سازمان.',
    icon: 'lucide:eye',
    art: `${IL}/quest-cta-illus.png`,
  },
  mission: {
    title: 'مأموریت ما',
    desc: 'تبدیل دانش مدیریتی و تجربه اجرایی به ابزار، یادگیری و راهکارهایی که بتوانند واقعاً رفتار، عملکرد و نتیجه را تغییر دهند.',
    icon: 'lucide:target',
    art: `${IL}/result-hero.png`,
  },
  beliefTitle: 'ما به چه چیزی باور داریم؟',
  beliefs: [
    { title: 'دانش بدون اجرا', sub: 'کافی نیست', icon: 'lucide:book-open' },
    { title: 'ابزار بدون فهم', sub: 'مسئله کافی نیست', icon: 'lucide:puzzle' },
    { title: 'آموزش باید به', sub: 'تغییر رفتار برسد', icon: 'lucide:trending-up' },
    { title: 'فناوری باید', sub: 'تصمیم‌گیری را بهتر کند', icon: 'lucide:shield-check' },
    { title: 'توسعه فرد و سازمان', sub: 'باید به هم متصل باشند', icon: 'lucide:users-round' },
  ],
  ecoTitle: 'اکوسیستم آریاز',
  eco: [
    { label: 'کتابخانه دیجیتال', icon: 'lucide:book-open' },
    { label: 'مقالات', icon: 'lucide:file-text' },
    { label: 'ایجنت‌های هوشمند', icon: 'lucide:bot' },
    { label: 'آزمون‌ها', icon: 'lucide:clipboard-check' },
    { label: 'ابزارها و فرم‌ها', icon: 'lucide:calculator' },
    { label: 'مشاوره و خدمات', icon: 'lucide:headphones' },
    { label: 'مسیرهای یادگیری', icon: 'lucide:route' },
    { label: 'دوره‌ها', icon: 'lucide:graduation-cap' },
  ],
  ecoCta: 'مشاهده همه بخش‌ها',
  teamTitle: 'آشنایی با همه اعضای تیم',
  teamBadge: 'آریاز',
  team: [
    { name: 'حسن هژبرافکن', role: 'بنیان‌گذار و مدیر عامل', desc: 'دکترای مدیریت منابع انسانی، متخصص توسعه سازمانی', avatar: `${AV}/expert-01-lawyer.png` },
    { name: 'مهدی کریمی', role: 'مدیر محصول و محتوا', desc: 'متخصص طراحی آموزشی و توسعه یادگیری', avatar: `${AV}/staff-ali-ahmadi.png` },
    { name: 'سمیرا موسوی', role: 'مدیر آموزش و یادگیری', desc: 'متخصص طراحی آموزشی و مسیرهای یادگیری', avatar: `${AV}/mbti-reviewer-01.png` },
    { name: 'علی رضایی', role: 'مدیر فناوری', desc: 'توسعه‌دهنده پلتفرم و راهکارهای دیجیتال', avatar: `${AV}/reviewer-02.png` },
  ],
  stats: [
    { value: '+۳۵۰', label: 'پروژه اجرا شده', icon: 'lucide:trophy' },
    { value: '+۱,۲۰۰', label: 'محتوای تخصصی', icon: 'lucide:book-open' },
    { value: '+۳۰,۰۰۰', label: 'کاربر و فراگیر', icon: 'lucide:users-round' },
    { value: '+۲۵۰', label: 'سازمان همراه', icon: 'lucide:building-2' },
    { value: '+۱۲', label: 'سال تجربه عملی', icon: 'lucide:calendar' },
  ],
  trustTitle: 'سازمان‌هایی که به آریاز اعتماد کرده‌اند',
  trustCta: 'مشاهده همه سازمان‌ها',
  logos: [
    '/images/slots/ar-logo-mellat.png',
    '/images/slots/ar-logo-mellat-ins.png',
    '/images/slots/ar-logo-snapp.png',
    '/images/slots/ar-logo-digikala.png',
    '/images/slots/ar-logo-golrang.png',
    '/images/slots/ar-logo-kourosh.png',
    '/images/slots/ar-logo-baraka.png',
  ],
  cta: [
    { title: 'برای سازمانم راهکار می‌خواهم', desc: 'راهکارهای اختصاصی آریاز برای رشد و توسعه سازمان شما در دسترس است.', cta: 'مشاوره سازمانی', href: '/org', tone: 'orange' as const, icon: 'lucide:briefcase' },
    { title: 'برای خودم می‌خواهم رشد کنم', desc: 'مسیر یادگیری مناسب خود را پیدا کنید و مهارت‌هایتان را ارتقا دهید.', cta: 'شروع یادگیری', href: '/learning-paths', tone: 'light' as const, icon: 'lucide:graduation-cap' },
    { title: 'سوال دارید؟ از آریاز بپرسید', desc: 'هر سوالی درباره خدمات آریاز دارید، همین‌جا بپرسید. ایجنت هوشمند ما راهنمایی‌تان می‌کند.', cta: 'شروع گفتگو', href: '/agents', tone: 'navy' as const, icon: 'lucide:bot' },
  ],
};

/* ── تماس با ما «2.png» ───────────────────────────────────────── */

export const contact = {
  crumb: 'تماس با ما',
  title: 'چطور می‌توانیم کمکتان کنیم؟',
  desc: 'برای سؤال، پشتیبانی، همکاری، خدمات سازمانی یا ارتباط با تیم آریاز، مسیر مناسب را انتخاب کنید.',
  art: `${IL}/cta-chat-bubble.png`,
  routes: [
    { title: 'ارتباط عمومی', desc: 'سؤال، پیشنهاد، انتقاد یا سایر موضوعات', cta: 'ارسال پیام', icon: 'lucide:mail', tone: 'orange' as const },
    { title: 'همکاری با آریاز', desc: 'مدرس، نویسنده، متخصص یا شریک تجاری', cta: 'شروع همکاری', href: '/collaborate', icon: 'lucide:users-round', tone: 'navy' as const },
    { title: 'خدمات سازمانی', desc: 'آموزش، مشاوره، طراحی سیستم و برون‌سپاری', cta: 'درخواست مشاوره سازمانی', href: '/org', icon: 'lucide:briefcase', tone: 'orange' as const },
    { title: 'پشتیبانی کاربران', desc: 'مشکل حساب، خرید، دوره، آزمون، گواهینامه و ابزارها', cta: 'ارتباط با پشتیبانی', href: '/faq', icon: 'lucide:headphones', tone: 'navy' as const },
  ],
  form: {
    title: 'برای ما پیام بگذارید',
    fields: [
      { label: 'نام و نام خانوادگی', icon: 'lucide:user-round', kind: 'text' as const },
      { label: 'شماره موبایل', icon: 'lucide:phone', kind: 'text' as const },
      { label: 'ایمیل (اختیاری)', icon: 'lucide:mail', kind: 'text' as const, wide: true },
      { label: 'موضوع ارتباط', icon: 'lucide:tag', kind: 'text' as const, wide: true },
      { label: 'انتخاب کنید', icon: 'lucide:clock', kind: 'select' as const, wide: true },
    ],
    message: { label: 'پیام شما', icon: 'lucide:pencil-line', limit: '۰ / ۱۰۰۰' },
    cta: 'ارسال پیام',
    note: 'معمولاً در کمتر از یک روز کاری پاسخ می‌دهیم.',
  },
  ways: {
    title: 'راه‌های ارتباط با آریاز',
    items: [
      { label: 'شماره تماس', value: '۰۲۱-۹۱۰۱۰۱۰۵', icon: 'lucide:phone' },
      { label: 'ایمیل عمومی', value: 'info@ariyaz.com', icon: 'lucide:mail', ltr: true },
      { label: 'ایمیل پشتیبانی', value: 'support@ariyaz.com', icon: 'lucide:headphones', ltr: true },
      { label: 'ساعت پاسخگویی', value: 'شنبه تا چهارشنبه، ۸ تا ۱۸', sub: 'پنجشنبه ۸ تا ۱۴', icon: 'lucide:clock' },
    ],
    social: 'ما را در شبکه‌های اجتماعی دنبال کنید',
    socials: [
      { icon: 'mdi:linkedin', bg: '#0a66c2' },
      { icon: 'mdi:instagram', bg: '#e1306c' },
      { icon: 'mdi:telegram', bg: '#229ED9' },
      { icon: 'lucide:video', bg: '#ff0000' },
    ],
  },
  office: {
    title: 'دفتر مرکزی آریاز',
    icon: 'lucide:map-pin',
    lines: ['تهران، خیابان سهروردی شمالی', 'خیابان خرمشهر، نبش خیابان اربیشم', 'پلاک ۲۱، طبقه ۳ واحد ۷'],
    cta: 'مسیریابی',
  },
  agent: {
    title: 'شاید نیازی به ارسال پیام نباشد',
    sub: 'آریاز می‌تواند همین حالا کمکتان کند.',
    placeholder: 'سؤالتان را از آریاز بپرسید...',
    chips: ['گواهینامه‌ام را چطور استعلام کنم؟', 'چطور در دوره ثبت نام کنم؟', 'برای سازمانم مشاوره می‌خواهم', 'مشکل پرداخت دارم'],
  },
  faq: {
    title: 'سؤالات پرتکرار',
    cta: 'پاسختان را پیدا نکردید؟ مشاهده همه سؤالات متداول',
    items: [
      { title: 'چطور می‌توانم دوره‌ای را ثبت نام کنم؟' },
      { title: 'روش‌های پرداخت در آریاز چیست؟' },
      { title: 'چطور گواهینامه دوره را دریافت کنم؟' },
      { title: 'چطور از وضعیت سفارش خود مطلع شوم؟' },
    ],
  },
  cta: [
    { title: 'می‌خواهم با آریاز همکاری کنم', desc: 'فرصت‌های همکاری برای مدرسین، متخصصان و شرکای تجاری', cta: 'شروع همکاری', href: '/collaborate', tone: 'orange' as const, icon: 'lucide:users-round' },
    { title: 'برای سازمانم راهکار می‌خواهم', desc: 'مشاوره، آموزش سازمانی، طراحی سیستم و پروژه‌های اختصاصی', cta: 'مشاهده خدمات سازمانی', href: '/org', tone: 'light' as const, icon: 'lucide:building-2' },
  ],
};

/* ── سؤالات متداول «5.png» ───────────────────────────────────── */

export const faq = {
  crumb: 'سؤالات متداول',
  title: 'چطور می‌توانیم راهنمایی‌تان کنیم؟',
  desc: 'پاسخ سؤالات متداول درباره خدمات و امکانات آریاز را پیدا کنید.',
  search: 'سؤال یا موضوع موردنظرتان را جستجو کنید...',
  art: `${IL}/quest-intro-illus.png`,
  categories: [
    { title: 'حساب کاربری', desc: 'ورود، ثبت‌نام، پروفایل، رمز عبور و تنظیمات', icon: 'lucide:user-round' },
    { title: 'خرید و پرداخت', desc: 'پرداخت، فاکتور، خطای تراکنش و استرداد وجه', icon: 'lucide:credit-card' },
    { title: 'دوره‌ها و یادگیری', desc: 'ثبت‌نام، دسترسی، جلسات و محتوای دوره', icon: 'lucide:book-open' },
    { title: 'آزمون و گواهینامه', desc: 'آزمون، نمره، صدور و استعلام گواهینامه', icon: 'lucide:award' },
    { title: 'ابزارها و Agentها', desc: 'ابزارها، ماشین‌حساب‌ها و هوش مصنوعی آریاز', icon: 'lucide:bot' },
    { title: 'مشاوره و خدمات تخصصی', desc: 'سؤال تخصصی، پرونده، مشاور و جلسات مشاوره', icon: 'lucide:message-circle' },
    { title: 'خدمات سازمانی', desc: 'آموزش و پروژه‌های سازمانی', icon: 'lucide:briefcase' },
    { title: 'همکاری با آریاز', desc: 'مدرس، نویسنده، مشاور و متخصص', icon: 'lucide:handshake' },
  ],
  topTitle: 'بیشتر از همه این‌ها را می‌پرسند',
  topCta: 'مشاهده همه سؤالات',
  top: [
    {
      title: 'چطور در یک دوره ثبت‌نام کنم؟',
      icon: 'lucide:user-round-plus',
      body: 'برای ثبت‌نام در دوره موردنظر، وارد صفحه دوره شوید و روی دکمه «ثبت‌نام در دوره» کلیک کنید. پس از انتخاب روش پرداخت و تکمیل فرآیند، دسترسی شما فعال خواهد شد و می‌توانید دوره را در بخش «دوره‌های من» مشاهده کنید.',
      link: 'مشاهده راهنمای ثبت‌نام در دوره',
    },
    { title: 'بعد از خرید دوره تا چه زمانی دسترسی دارم؟', icon: 'lucide:clock' },
    { title: 'گواهینامه دوره را چطور دریافت کنم؟', icon: 'lucide:award' },
    { title: 'چطور اعتبار گواهینامه را بررسی کنم؟', icon: 'lucide:shield-check' },
    { title: 'شرایط بازگشت وجه چیست؟', icon: 'lucide:refresh-cw' },
    { title: 'چطور یک مشاور انتخاب کنم؟', icon: 'lucide:users-round' },
    { title: 'Agentهای آریاز چطور کار می‌کنند؟', icon: 'lucide:bot' },
    { title: 'چطور با آریاز همکاری کنم؟', icon: 'lucide:handshake' },
  ],
  agent: {
    title: 'جواب را پیدا نکردید؟ از آریاز بپرسید.',
    desc: 'سؤالتان را بپرسید تا آریاز بهترین پاسخ را به شما بدهد.',
    placeholder: 'مثلاً بعد از اتمام دوره چطور گواهینامه بگیرم؟',
    chipsTitle: 'پیشنهادهای پرکاربرد',
    chips: ['چطور گواهینامه دریافت کنم؟', 'شرایط استرداد وجه چیست؟', 'چطور در دوره ثبت‌نام کنم؟', 'مشکل پرداخت دارم'],
  },
  tags: {
    title: 'دنبال موضوع خاصی می‌گردید؟',
    desc: 'از راه‌های زیر برای یافتن سریع پاسخ استفاده کنید.',
    items: ['گواهینامه', 'دسترسی', 'پرداخت', 'استرداد', 'مشاوره', 'پلتفرم‌ها', 'همکاری', 'Agentها'],
  },
  foot: {
    title: 'هنوز به جواب نرسیدید؟',
    desc: 'تیم پشتیبانی آریاز در کنار شماست. سؤالات را مطرح کنید تا در کوتاه‌ترین زمان پاسخ دهیم.',
    note: 'میانگین زمان پاسخ: کمتر از یک روز کاری',
    items: [
      { title: 'تماس با ما', desc: 'از راه‌های ارتباطی با ما در تماس باشید.', icon: 'lucide:phone', href: '/contact' },
      { title: 'ارسال درخواست پشتیبانی', desc: 'سؤالتان را ثبت کنید تا در کمتر از یک روز کاری پاسخ دهیم.', icon: 'lucide:mail', href: '/contact' },
    ],
  },
};

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

/* ── همکاری با آریاز «6.png» ─────────────────────────────────── */

export const collaborate = {
  crumb: 'همکاری با آریاز',
  title: 'دانش و تجربه‌ات را با آریاز به جریان بینداز',
  desc: 'اگر تجربه، تخصص یا ایده‌ای دارید که می‌تواند به رشد انسان‌ها و سازمان‌ها کمک کند، آریاز می‌تواند بستری برای توسعه و ارائه آن باشد.',
  art: `${IL}/agents-hero.png`,
  ctas: [
    { label: 'مشاهده فرصت‌های همکاری', href: '#roles', tone: 'orange' as const, icon: 'lucide:arrow-left' },
    { label: 'درخواست همکاری', href: '#form', tone: 'outline' as const, icon: 'lucide:user-round-plus' },
  ],
  rolesTitle: 'چطور می‌توانید با آریاز همکاری کنید؟',
  roles: [
    { title: 'مدرس آریاز', desc: 'دوره، کارگاه، وبینار و مسیر یادگیری برگزار کنید.', cta: 'همکاری به‌عنوان مدرس', icon: 'lucide:graduation-cap' },
    { title: 'نویسنده آریاز', desc: 'مقاله، تحلیل، کتاب، راهنما و محتوای تخصصی منتشر کنید.', cta: 'همکاری به عنوان نویسنده', icon: 'lucide:pencil-line' },
    { title: 'مشاور آریاز', desc: 'در پرونده‌های تخصصی، جلسات مشاوره و پروژه‌ها فعالیت کنید.', cta: 'همکاری به عنوان مشاور', icon: 'lucide:user-round-check' },
    { title: 'متخصص / Expert', desc: 'به سؤالات تخصصی پاسخ دهید یا در تولید ابزار و محتوای حرفه‌ای مشارکت کنید.', cta: 'همکاری به عنوان متخصص', icon: 'lucide:badge-check' },
    { title: 'تولیدکننده محتوا', desc: 'در ویدیو، پادکست، محتوای آموزشی و محتوای دیجیتال همکاری کنید.', cta: 'همکاری در تولید محتوا', icon: 'lucide:file-video' },
    { title: 'شریک تجاری', desc: 'برای همکاری B2B، ارائه خدمات مشترک، فناوری یا توسعه بازار با آریاز همراه شوید.', cta: 'پیشنهاد همکاری تجاری', icon: 'lucide:briefcase' },
  ],
  whyTitle: 'چرا آریاز را برای همکاری انتخاب کنید؟',
  why: [
    { title: 'دسترسی به جامعه حرفه‌ای', desc: 'محتوا و تخصص شما در مقابل مخاطب هدف قرار می‌گیرد.', icon: 'lucide:users-round' },
    { title: 'برند حرفه‌ای شخصی', desc: 'پروفایل تخصصی، آثار، دوره‌ها و سوابق شما یکجا ساخته می‌شود.', icon: 'lucide:user-round-check' },
    { title: 'درآمد از تخصص', desc: 'مدل‌های درآمدی متناسب با دوره، محتوا، مشاوره و خدمات شما.', icon: 'lucide:wallet' },
    { title: 'زیرساخت آریاز', desc: 'پرداخت، LMS، صدور گواهینامه، رزرو، Agentها، گزارش و پشتیبانی توسط پلتفرم مدیریت می‌شود.', icon: 'lucide:monitor-play' },
  ],
  pathTitle: 'مسیر پیوستن به اکوسیستم آریاز',
  path: [
    { n: '۱', title: 'انتخاب نوع همکاری', desc: 'نوع همکاری مناسب خود را انتخاب کنید.', icon: 'lucide:layout-grid' },
    { n: '۲', title: 'ساخت پرونده تخصصی', desc: 'اطلاعات و سوابق خود را ثبت و پرونده تخصصی بسازید.', icon: 'lucide:user-round' },
    { n: '۳', title: 'بررسی توسط آریاز', desc: 'تیم آریاز پرونده شما را بررسی و ارزیابی می‌کند.', icon: 'lucide:file-search' },
    { n: '۴', title: 'گفتگو / ارزیابی تخصصی', desc: 'در صورت نیاز، گفتگو یا ارزیابی تخصصی انجام می‌شود.', icon: 'lucide:message-circle' },
    { n: '۵', title: 'تأیید و فعال‌سازی پروفایل', desc: 'با تأیید نهایی، پروفایل شما فعال و قابل مشاهده می‌شود.', icon: 'lucide:shield-check' },
    { n: '۶', title: 'شروع همکاری', desc: 'همکاری خود را آغاز کنید و ارزش‌آفرین باشید.', icon: 'lucide:rocket' },
  ],
  form: {
    title: 'درخواست همکاری',
    fields: [
      { label: 'نام و نام خانوادگی', kind: 'text' as const },
      { label: 'شماره تماس', kind: 'text' as const },
      { label: 'ایمیل', kind: 'text' as const },
      { label: 'نوع همکاری', kind: 'select' as const },
      { label: 'حوزه تخصصی', kind: 'select' as const },
      { label: 'لینکدین یا وب‌سایت (اختیاری)', kind: 'text' as const, wide: true },
    ],
    upload: { label: 'رزومه یا سوابق کاری', note: 'فایل PDF یا DOC (حداکثر ۵ مگابایت)' },
    cta: 'ادامه و تکمیل پرونده تخصصی',
  },
  looking: {
    title: 'آریاز دنبال چه کسانی است؟',
    items: [
      'تجربه واقعی دارند، نه صرفاً عنوان',
      'دانش را قابل استفاده می‌کنند',
      'کیفیت محتوا برایشان مهم است',
      'مسئولیت حرفه‌ای دارند',
      'به یادگیری و به‌روز ماندن متعهدند',
      'می‌توانند برای مخاطب ارزش واقعی ایجاد کنند',
    ],
  },
  fields: {
    title: 'حوزه‌هایی که دنبال متخصص هستیم',
    items: ['منابع انسانی', 'رهبری', 'مدیریت', 'فردیت', 'فراوانی', 'بازاریابی', 'مالی', 'هوش مصنوعی', 'توسعه فردی', 'مدیریت پروژه', 'حقوق و فرآیندها', 'تحول دیجیتال', 'تولید محتوا', 'مهارت‌های نرم', 'و ...'],
  },
  experts: {
    title: 'متخصصان فعال در آریاز',
    desc: 'بیش از ۱۲۵ متخصص و مدرس در اکوسیستم آریاز',
    cta: 'مشاهده مدرسین و متخصصان',
    more: '+۱۲۰',
    avatars: [`${AV}/expert-01-lawyer.png`, `${AV}/mbti-reviewer-01.png`, `${AV}/staff-ali-ahmadi.png`, `${AV}/reviewer-02.png`, `${AV}/expert-02-hr.png`],
  },
  faq: {
    title: 'سوالات متداول همکاری',
    cta: 'مشاهده همه سوالات',
    items: [
      { title: 'آیا همکاری با آریاز استخدام محسوب می‌شود؟' },
      { title: 'مدل درآمدی مدرس و مشاور چگونه است؟' },
      { title: 'بررسی درخواست همکاری چقدر زمان می‌برد؟' },
      { title: 'آیا می‌توانم هم‌زمان در چند حوزه همکاری کنم؟' },
      { title: 'مالکیت محتوای تولیدشده چگونه است؟' },
    ],
  },
  help: {
    title: 'سوالی دارید یا نیاز به راهنمایی بیشتر؟',
    desc: 'تیم همکاری با آریاز در کنار شماست.',
    note: 'میانگین زمان پاسخ: کمتر از یک روز کاری',
    primary: 'تماس با تیم همکاری',
    secondary: 'ارسال پیام',
  },
};

/* ── فرصت‌های شغلی «7.png» ───────────────────────────────────── */

export const careers = {
  crumb: 'فرصت‌های شغلی',
  title: 'جای تو در ساختن آینده آریاز خالی است',
  desc: 'ما در آریاز روی محصولاتی کار می‌کنیم که قرار است یادگیری، توسعه حرفه‌ای و مدیریت سازمان‌ها را هوشمندتر کنند. اگر دوست داری بخشی از این مسیر باشی، فرصت‌های زیر را ببین.',
  art: `${TH}/article-01-ai-future.png`,
  ctas: [
    { label: 'مشاهده موقعیت‌های شغلی', href: '#roles', tone: 'orange' as const, icon: 'lucide:plus' },
    { label: 'با آریاز آشنا شوید', href: '/about', tone: 'outline' as const, icon: 'lucide:circle-play' },
  ],
  values: [
    { title: 'اثرگذاری واقعی', desc: 'روی محصولاتی کار می‌کنیم که هر روز توسط افراد و سازمان‌ها استفاده می‌شوند', icon: 'lucide:target' },
    { title: 'رشد و توسعه مستمر', desc: 'آموزش، اشتراک دانش و توسعه فردی بخشی از کار روزانه است', icon: 'lucide:book-open' },
    { title: 'کار با تکنولوژی و AI', desc: 'هوش مصنوعی فقط یک شعار نیست؛ بخشی از محصول آریاز است', icon: 'lucide:brain-circuit' },
    { title: 'فضای رشد', desc: 'مسئولیت بگیرید، تجربه کنید و حرفه‌ای خودتان را توسعه دهید', icon: 'lucide:chart-column' },
  ],
  findTitle: 'موقعیت مناسب خودت را پیدا کن',
  filters: ['محصول', 'فناوری', 'همه بخش‌ها', 'همه موج کار'],
  search: 'عنوان شغل یا تخصص...',
  clear: 'پاک کردن فیلترها',
  tabs: ['همه', 'منابع انسانی', 'عملیات', 'مارکتینگ', 'فروش و توسعه کسب‌وکار', 'محتوا', 'هوش مصنوعی', 'مهندسی', 'محصول', 'دیزاین'],
  featured: {
    tag: 'فرصت ویژه',
    title: 'AI Agent Developer',
    desc: 'در ساختن نسل جدید Agentهای هوشمند آریاز همراه شوید',
    meta: ['تیم هوش مصنوعی', 'تمام‌وقت، Hybrid', 'سطح تجربه: ۲ تا ۳ سال', 'محل کار: تهران'],
    cta: 'مشاهده جزئیات و ارسال رزومه',
    art: `${IL}/tests-chat-robot.png`,
  },
  jobs: [
    { id: 'senior-frontend', title: 'Senior Front-end Developer', team: 'تیم محصول و فناوری', type: 'تمام‌وقت', mode: 'Hybrid', city: 'تهران', tags: ['Next.js', 'React', 'TypeScript'] },
    { id: 'ai-product-specialist', title: 'AI Product Specialist', team: 'تیم هوش مصنوعی', type: 'تمام‌وقت', mode: 'Hybrid', city: 'تهران', tags: ['AI Agents', 'LLM', 'Product'] },
    { id: 'content-writer', title: 'Content Writer', team: 'تیم محتوا', type: 'پاره‌وقت', mode: 'دورکاری', city: 'تهران', tags: ['Writing', 'SEO', 'Research'] },
  ],
  jobCta: 'مشاهده موقعیت',
  lifeTitle: 'زندگی در آریاز',
  life: [
    { title: 'کنجکاوی', desc: 'ما همیشه یاد می‌گیریم و بهتر می‌شویم' },
    { title: 'مالکیت کار', desc: 'هر کسی صاحب کسب‌وکار خودش است' },
    { title: 'صراحت محترمانه', desc: 'رک و شفاف صحبت می‌کنیم و به هم احترام می‌گذاریم' },
    { title: 'یادگیری', desc: 'هر روز فرصتی برای رشد فردی و تیمی است' },
    { title: 'نتیجه‌گرایی', desc: 'روی مهم‌ترین کار تمرکز می‌کنیم' },
    { title: 'همکاری', desc: 'با هم بهتر فکر می‌کنیم و بهتر عمل می‌کنیم' },
  ],
  lifePhotos: [`${TH}/video-09-org-culture.png`, `${TH}/video-07-manager-communication.png`, `${TH}/video-12-successful-habits.png`, `${TH}/video-06-employee-empowerment.png`],
  hiringTitle: 'فرآیند استخدام در آریاز',
  hiring: [
    { n: '۱', title: 'ارسال درخواست', icon: 'lucide:send' },
    { n: '۲', title: 'بررسی اولیه', icon: 'lucide:user-round' },
    { n: '۳', title: 'گفتگوی آشنایی', icon: 'lucide:message-circle' },
    { n: '۴', title: 'ارزیابی تخصصی', icon: 'lucide:clipboard-check' },
    { n: '۵', title: 'گفتگوی نهایی', icon: 'lucide:users-round' },
    { n: '۶', title: 'پیشنهاد همکاری', icon: 'lucide:party-popper' },
  ],
  perksTitle: 'مزایای کار در آریاز',
  perks: [
    { title: 'حقوق و مزایای رقابتی', icon: 'lucide:wallet' },
    { title: 'بیمه و مزایا', icon: 'lucide:shield-check' },
    { title: 'مسیر رشد حرفه‌ای', icon: 'lucide:trending-up' },
    { title: 'انعطاف کاری', icon: 'lucide:clock' },
    { title: 'بودجه و شرایط یادگیری', icon: 'lucide:book-open' },
    { title: 'رویدادهای تیمی', icon: 'lucide:party-popper' },
  ],
  faq: {
    title: 'سؤالات متداول استخدام',
    cta: 'مشاهده همه سؤالات',
    items: [
      { title: 'آیا امکان دورکاری وجود دارد؟' },
      { title: 'فرآیند استخدام چقدر طول می‌کشد؟' },
      { title: 'آیا می‌توانم برای چند موقعیت درخواست بدهم؟' },
      { title: 'بعد از ارسال رزومه چگونه پیگیری کنم؟' },
      { title: 'اطلاعات رزومه من تا چه زمانی نگهداری می‌شود؟' },
    ],
  },
  noMatch: {
    title: 'موقعیت مناسب پیدا نکردید؟',
    desc: 'استعداد خوب همیشه برای ما ارزشمند است. رزومه‌تان را برای فرصت‌های آینده ثبت کنید.',
    cta: 'ارسال رزومه عمومی',
  },
};

/* ── جزئیات موقعیت شغلی «8.png» ─────────────────────────────── */

export const job = {
  crumb: 'AI Agent Developer',
  title: 'AI Agent Developer',
  status: 'فعال',
  art: `${IL}/tests-chat-robot.png`,
  meta: [
    { label: 'تیم', value: 'محصول و فناوری', icon: 'lucide:users-round' },
    { label: 'نوع همکاری', value: 'تمام‌وقت / Hybrid', icon: 'lucide:briefcase' },
    { label: 'محل کار', value: 'تهران', icon: 'lucide:map-pin' },
    { label: 'تاریخ انتشار', value: '۲۲ مرداد ۱۴۰۵', icon: 'lucide:calendar' },
    { label: 'سطح تجربه', value: 'Senior', icon: 'lucide:star' },
  ],
  apply: 'ارسال رزومه',
  save: 'ذخیره موقعیت',
  about: {
    title: 'درباره این موقعیت',
    body: 'ما در آریاز به دنبال فردی هستیم که در توسعه Agentهای هوشمند، طراحی تجربه‌های مبتنی بر AI و ساخت محصولات نسل جدید آموزشی و سازمانی همراه تیم باشد.',
  },
  why: {
    title: 'چرا این موقعیت جذاب است؟',
    items: [
      'روی محصولات واقعی AI کار می‌کنید',
      'با تیم محصول و کسب‌وکار در ارتباط هستید',
      'در طراحی معماری Agentها نقش دارید',
      'خروجی کار مستقیماً توسط کاربران استفاده می‌شود',
    ],
  },
  duties: {
    title: 'چه کاری انجام خواهید داد؟',
    items: [
      'طراحی و توسعه Agentهای AI آریاز',
      'اتصال مدل‌های زبانی به سرویس‌های داخلی',
      'طراحی Workflowهای هوشمند',
      'بهینه‌سازی تجربه کاربر در محصولات AI',
      'همکاری با تیم محصول و UX و Backend',
      'تحلیل عملکرد Agentها و بهبود آن‌ها',
    ],
  },
  skills: {
    title: 'مهارت‌ها و شرایط مورد نیاز',
    mustTitle: 'ضروری',
    must: [
      'تجربه توسعه نرم‌افزار',
      'آشنایی با APIها',
      'تجربه کار با LLMها',
      'تفکر محصولی',
      'توانایی حل مسئله و یادگیری سریع',
    ],
    plusTitle: 'مزیت‌های محسوب می‌شود',
    plus: [
      'تجربه n8n / LangChain',
      'تجربه RAG',
      'آشنایی با Vector Database',
      'تجربه SaaS',
      'تجربه محصولات آموزشی',
    ],
  },
  stack: {
    title: 'تکنولوژی‌ها و ابزارها',
    items: ['React', 'Next.js', 'TypeScript', 'Python', 'LLM', 'AI Agents', 'API', 'Database', 'Git', 'Docker'],
  },
  team: {
    title: 'تیمی که به آن می‌پیوندید',
    desc: 'در تیم محصول و فناوری آریاز، شما با متخصصان حوزه‌های مختلف مهندسی، ساخت، تجربه، یادگیری و هوشمند کار خواهید کرد.',
    members: [
      { role: 'Product Manager', icon: 'lucide:user-round' },
      { role: 'AI Engineer', icon: 'lucide:brain-circuit' },
      { role: 'Frontend Developer', icon: 'lucide:monitor-play' },
      { role: 'UX Designer', icon: 'lucide:shapes' },
      { role: 'Backend Developer', icon: 'lucide:database' },
    ],
  },
  culture: {
    title: 'فرهنگ کاری آریاز',
    lead: 'ما دنبال کسی نیستیم که فقط Task انجام دهد. دنبال کسی هستیم که:',
    items: [
      'مالکیت نتیجه را بپذیرد',
      'سؤال بپرسد و یاد بگیرد',
      'راه‌حل بسازد و مسئولیت‌پذیر باشد',
      'روی کیفیت حساس باشد',
      'به رشد خود و تیم اهمیت دهد',
    ],
  },
  process: {
    title: 'فرآیند استخدام ما',
    items: ['ارسال درخواست', 'بررسی اولیه رزومه', 'گفتگوی آشنایی', 'ارزیابی تخصصی', 'گفتگوی نهایی', 'پیشنهاد همکاری'],
  },
  form: {
    title: 'علاقه‌مند به این موقعیت هستید؟',
    desc: 'رزومه خود را ارسال کنید و به تیم آریاز بپیوندید',
    fields: [
      { label: 'نام و نام خانوادگی', icon: 'lucide:user-round' },
      { label: 'شماره موبایل', icon: 'lucide:phone' },
      { label: 'ایمیل', icon: 'lucide:mail' },
      { label: 'لینک تجربه (اختیاری)', icon: 'lucide:link-2' },
    ],
    upload: { label: 'رزومه خود را آپلود کنید', cta: 'فایل را انتخاب کنید یا اینجا بکشید', note: 'PDF, DOC, DOCX (حداکثر ۵ مگابایت)' },
    note: { label: 'پیام کوتاه (اختیاری)', placeholder: 'چرا فکر می‌کنید برای این نقش مناسب هستید؟' },
    cta: 'ارسال درخواست',
    privacy: 'اطلاعات شما محرمانه باقی خواهد ماند',
  },
  agent: {
    title: 'درباره این موقعیت سؤال دارید؟',
    sub: 'از Agent آریاز بپرسید',
    bubble: 'سلام! من Agent آریاز هستم. درباره این فرصت شغلی هر سؤالی دارید بپرسید.',
    chips: [
      'برای این نقش چه میزان تجربه لازم است؟',
      'آیا امکان دورکاری وجود دارد؟',
      'مصاحبه فنی به چه صورت است؟',
      'آیا سابقه استارتاپی مهم است؟',
    ],
    placeholder: 'سؤال خود را از این نقش بپرسید...',
  },
  similar: {
    title: 'فرصت‌های شغلی مشابه',
    cta: 'مشاهده همه فرصت‌ها',
    items: [
      { title: 'Frontend Developer', team: 'تیم محصول و فناوری', mode: 'Hybrid', city: 'Tehran', icon: 'lucide:file-type' },
      { title: 'AI Product Specialist', team: 'تیم هوش مصنوعی', mode: 'Hybrid', city: 'Tehran', icon: 'lucide:cog' },
      { title: 'Content Manager', team: 'تیم محتوا', mode: 'حضوری', city: 'Tehran', icon: 'lucide:pencil-line' },
      { title: 'Data Analyst', team: 'تیم فناوری', mode: 'Hybrid', city: '', icon: 'lucide:chart-column' },
    ],
    jobCta: 'مشاهده موقعیت',
  },
};

/* ── اخبار و اطلاعیه‌ها «9.png» ─────────────────────────────── */

export const news = {
  crumb: 'اطلاعیه‌ها و اخبار',
  title: 'اخبار و اطلاعیه‌های آریاز',
  desc: 'آخرین خبرها، رویدادها، تغییرات پلتفرم، دستاوردها و اطلاعیه‌های آموزشی آریاز را دنبال کنید.',
  art: `${IL}/articles-hero.png`,
  featured: {
    tag: 'خبر ویژه',
    title: 'راه‌اندازی نسل جدید Agentهای هوشمند آریاز',
    desc: 'آریاز با معرفی ابزارهای هوشمند جدید، مسیر دسترسی کاربران به دانش و خدمات تخصصی را ساده‌تر، دقیق‌تر و سریع‌تر کرده است.',
    cta: 'مطالعه خبر',
    art: `${TH}/article-01-ai-future.png`,
  },
  tabs: ['همه', 'رویدادها', 'دستاوردها', 'اطلاعیه‌ها', 'مقالات و تحلیل‌ها'],
  items: [
    { title: 'وبینار رایگان «آینده منابع انسانی با هوش مصنوعی»', tag: 'رویدادها', tone: 'purple' as const, date: '۲۹ مرداد ۱۴۰۵', read: '۴ دقیقه', img: `${TH}/article-10-future-skills.png` },
    { title: 'دوره جدید «مدیریت عملکرد پیشرفته» منتشر شد', tag: 'اخبار آموزشی', tone: 'blue' as const, date: '۲۷ مرداد ۱۴۰۵', read: '۳ دقیقه', img: `${TH}/article-09-performance-kpi.png` },
    { title: 'اضافه شدن ماشین‌حساب حقوق به آریاز', tag: 'اطلاعیه پلتفرم', tone: 'orange' as const, date: '۲۴ مرداد ۱۴۰۵', read: '۲ دقیقه', img: `${TH}/doc-article-01-insurance-calc.png` },
    { title: 'تحلیل: ۵ روند کلیدی یادگیری سازمانی در سال ۲۰۲۵', tag: 'مقالات و تحلیل‌ها', tone: 'purple' as const, date: '۲۱ مرداد ۱۴۰۵', read: '۸ دقیقه', img: `${TH}/article-02-leadership-strat.png` },
    { title: 'شروع همکاری آریاز با شرکت‌های بزرگ صنعتی', tag: 'دستاوردها', tone: 'green' as const, date: '۱۸ مرداد ۱۴۰۵', read: '۳ دقیقه', img: `${TH}/article-05-competency-hiring.png` },
    { title: 'دریافت تندیس نوآوری دیجیتال در صنعت آموزش', tag: 'دستاوردها', tone: 'orange' as const, date: '۱۴ مرداد ۱۴۰۵', read: '۴ دقیقه', img: `${TH}/article-08-positive-culture.png` },
  ],
  more: 'بارگذاری بیشتر',
  latest: {
    title: 'آخرین اطلاعیه‌ها',
    cta: 'مشاهده همه اطلاعیه‌ها',
    items: [
      { title: 'تغییر شرایط دریافت گواهینامه‌ها', date: '۲۷ مرداد ۱۴۰۵', icon: 'lucide:bell' },
      { title: 'انتشار دوره جدید HRBP حرفه‌ای', date: '۲۵ مرداد ۱۴۰۵', icon: 'lucide:mail' },
      { title: 'اضافه شدن مدرس جدید در حوزه رهبری', date: '۲۲ مرداد ۱۴۰۵', icon: 'lucide:user-round-plus' },
      { title: 'بروزرسانی قوانین استفاده از پلتفرم', date: '۲۰ مرداد ۱۴۰۵', icon: 'lucide:scale' },
      { title: 'تعطیلی پشتیبانی در روز ۲۸ مرداد', date: '۱۸ مرداد ۱۴۰۵', icon: 'lucide:calendar' },
    ],
  },
  popular: {
    title: 'محبوب‌ترین مطالب',
    tabs: ['هفته', 'ماه', 'هفته و ماه'],
    cta: 'مشاهده همه مطالب محبوب',
    items: [
      { n: '۱', title: 'چگونه بهره‌وری تیم را افزایش دهیم؟', date: '۲۶ مرداد ۱۴۰۵' },
      { n: '۲', title: 'مدیریت تعارض در سازمان', date: '۲۴ مرداد ۱۴۰۵' },
      { n: '۳', title: 'آینده هوش مصنوعی در آموزش', date: '۲۰ مرداد ۱۴۰۵' },
    ],
  },
  newsletter: {
    title: 'عضویت در خبرنامه',
    desc: 'از آخرین اخبار، دوره‌ها و رویدادهای آریاز باخبر شوید',
    placeholder: 'ایمیل خود را وارد کنید',
    cta: 'عضویت',
    note: 'ما به حریم خصوصی شما احترام می‌گذاریم',
  },
  quick: {
    title: 'دسترسی سریع',
    items: [
      { label: 'دوره‌ها', icon: 'lucide:graduation-cap', href: '/courses' },
      { label: 'فرم‌ها', icon: 'lucide:file-text', href: '/tools' },
      { label: 'ابزارها', icon: 'lucide:shopping-cart', href: '/tools' },
      { label: 'دوره‌ها', icon: 'lucide:book-open', href: '/learning-paths' },
    ],
  },
  ask: {
    title: 'از آریاز بپرسید',
    desc: 'درمورد آخرین اخبار، دوره‌ها، رویدادها و تغییرات پلتفرم از Agent آریاز سؤال کنید',
    cta: 'شروع گفتگو',
    sampleTitle: 'چند نمونه سؤال',
    samples: ['آخرین دوره‌های جدید چیست؟', 'چه قابلیت‌هایی اخیراً اضافه شده؟', 'چه رویدادهایی در پیش رو داریم؟'],
  },
};

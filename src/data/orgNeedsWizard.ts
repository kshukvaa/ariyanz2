/* ──────────────────────────────────────────────────────────────
   نیازسنجی سازمان — /org/needs-assessment

   A six-step public intake that ends in a recommended service and
   a specialist hand-off. Steps 1–4 gather, step 5 recommends,
   step 6 books.

   Mockup note — step 4 numbers its five questions ۱،۲،۳،۲،۲: the
   last three all read «۲.». Renumbered ۱–۵ here, since a visible
   duplicate would read as a defect. Flagged for confirmation.
────────────────────────────────────────────────────────────── */

export const needsHero = {
  title: ['نیاز سازمان خود را', 'با آریاز تحلیل کنید'],
  accentFrom: 1,
  desc: [
    'با پاسخ به چند سؤال کوتاه، مناسب‌ترین مسیر برای حل چالش‌های منابع انسانی سازمان خود را پیدا کنید',
    'از بین برون‌سپاری فرآیندها، طراحی و استقرار سیستم‌ها و مشاوره تخصصی، راهکار متناسب سازمان شما پیشنهاد می‌شود.',
  ],
  badges: [
    { label: 'بدون تعهد و رایگان', icon: 'lucide:gift' },
    { label: 'تحلیل تخصصی و محرمانه', icon: 'lucide:lock-keyhole' },
  ],
  primary: 'شروع نیازسنجی سازمان',
  secondary: 'مشاهده خدمات آریاز',
};

export const needsSteps = [
  { n: '۱', id: 'org', label: 'شناخت سازمان' },
  { n: '۲', id: 'challenge', label: 'تشخیص چالش' },
  { n: '۳', id: 'goal', label: 'هدف و انتظار' },
  { n: '۴', id: 'state', label: 'تحلیل وضعیت' },
  { n: '۵', id: 'solution', label: 'پیشنهاد راهکار' },
  { n: '۶', id: 'expert', label: 'ارتباط با متخصص' },
];

export const needsFooter = {
  of: 'مرحله {n} از ۶',
  done: 'تکمیل شده',
  remaining: 'حدود {m} دقیقه باقی‌مانده',
  estimate: 'زمان تقریبی تکمیل این مرحله',
  estimateValue: 'حدود ۶ تا ۵ دقیقه',
  next: 'ادامه',
  back: 'مرحله قبل',
  finish: 'دریافت پیشنهاد نهایی',
  submit: 'درخواست ارتباط با متخصص',
  percents: ['۱۷٪', '۲۳٪', '۵۵٪', '۶۷٪', '۸۳٪', '۱۰۰٪'],
  minutes: ['۵', '۳', '۲', '۲', '۱', '۱'],
};

/* Each gathering step carries an aside explaining why it asks. */
export interface Aside {
  title: string;
  desc?: string;
  rows: { label: string; icon: string }[];
  note: string;
}

/* ── Step 1 — شناخت سازمان ────────────────────────────────── */

export const step1 = {
  title: 'ابتدا سازمان شما را بشناسیم',
  desc: 'برای ارائه پیشنهاد دقیق‌تر ابتدا چند اطلاعات پایه درباره سازمان شما دریافت می‌کنیم.',
  questions: [
    { n: '۱', label: 'نام سازمان', kind: 'text' as const, placeholder: 'نام سازمان خود را وارد کنید' },
    { n: '۲', label: 'حوزه فعالیت سازمان شما چیست؟', kind: 'select' as const, placeholder: 'یک گزینه را انتخاب کنید' },
    {
      n: '۳',
      label: 'تعداد کارکنان شما چقدر است؟',
      kind: 'cards' as const,
      options: [
        { label: 'کمتر از ۵۰ نفر', icon: 'lucide:user-round' },
        { label: '۵۰ تا ۲۰۰ نفر', icon: 'lucide:users-round' },
        { label: '۲۰۰ تا ۳۰۰ نفر', icon: 'lucide:users' },
        { label: '۲۰۰ تا ۵۰۰ نفر', icon: 'lucide:users-round' },
        { label: 'بیش از ۱۰۰۰ نفر', icon: 'lucide:users' },
      ],
    },
    {
      n: '۴',
      label: 'مرحله رشد سازمان شما چیست؟',
      kind: 'cards' as const,
      options: [
        { label: 'در حال شکل‌گیری', icon: 'lucide:sprout' },
        { label: 'در حال رشد سریع', icon: 'lucide:trending-up' },
        { label: 'سازمان تثبیت‌شده', icon: 'lucide:building-2' },
        { label: 'در حال تحول', icon: 'lucide:refresh-cw' },
      ],
    },
    {
      n: '۵',
      label: 'موقعیت جغرافیایی',
      kind: 'duo' as const,
      placeholders: ['استان خود را انتخاب کنید', 'شهر خود را انتخاب کنید'],
    },
  ],
  aside: {
    title: 'چرا این اطلاعات مهم است؟',
    desc: 'شناخت بهتر سازمان شما کمک می‌کند راهکارهایی متناسب با اندازه، صنعت و شرایط واقعی کسب‌وکار پیشنهاد دهیم.',
    rows: [
      { label: 'تحلیل دقیق‌تر وضعیت سازمان', icon: 'lucide:chart-no-axes-combined' },
      { label: 'پیشنهاد خدمت متناسب', icon: 'lucide:target' },
      { label: 'جلوگیری از راهکارهای عمومی', icon: 'lucide:user-round' },
      { label: 'صرفه‌جویی در زمان و هزینه', icon: 'lucide:clock' },
    ],
    note: 'اطلاعات سازمان شما کاملاً محرمانه است.',
  } satisfies Aside,
};

/* ── Step 2 — تشخیص چالش ──────────────────────────────────── */

export const step2 = {
  title: 'مهم‌ترین چالش سازمان شما چیست؟',
  questions: [
    {
      n: '۱',
      label: 'بیشتر در کدام حوزه نیاز به کمک دارید؟',
      hint: '(یک مورد را انتخاب کنید)',
      kind: 'rich' as const,
      options: [
        {
          label: 'جذب و نگهداشت کارکنان',
          icon: 'lucide:users-round',
          fg: '#dc2326',
          on: true,
          bullets: ['جذب نیروی متخصص', 'کاهش خروج کارکنان', 'برند کارفرمایی', 'تجربه کارکنان'],
        },
        {
          label: 'فرآیندها و سیستم‌های منابع انسانی',
          icon: 'lucide:settings',
          fg: '#0547fe',
          bullets: ['نبود فرآیند مشخص', 'دستی بودن کارها', 'عدم استانداردسازی', 'رشد بدون سیستم'],
        },
        {
          label: 'عملکرد و توسعه کارکنان',
          icon: 'lucide:trending-up',
          fg: '#5d35fc',
          bullets: ['ارزیابی عملکرد', 'توسعه مدیران', 'مسیر شغلی', 'جانشین‌پروری'],
        },
        {
          label: 'حقوق، مزایا و هزینه‌های پرسنلی',
          icon: 'lucide:wallet',
          fg: '#24934b',
          bullets: ['ساختار حقوق', 'بیمه و مالیات', 'نظام انگیزشی', 'عدالت پرداخت'],
        },
        {
          label: 'روابط کار و مسائل قانونی',
          icon: 'lucide:scale',
          fg: '#fd841c',
          bullets: ['قراردادها', 'اختلافات کارگری', 'تأمین اجتماعی', 'آیین‌نامه‌ها'],
        },
        {
          label: 'ساختار و سازمان',
          icon: 'lucide:layout-grid',
          fg: '#0547fe',
          bullets: ['چارت سازمانی', 'نقش‌ها', 'سطوح سازمانی', 'طراحی مشاغل'],
        },
      ],
    },
    {
      n: '۲',
      label: 'انتظار شما از آریاز چیست؟',
      hint: '(یک مورد را انتخاب کنید)',
      kind: 'cards' as const,
      options: [
        { label: 'یک مشکل فوری دارم الان', desc: 'الان با یک چالش مشخص مواجه هستم', icon: 'lucide:alarm-clock', fg: '#24934b' },
        { label: 'می‌خواهم یک سیستم بسازم', desc: 'می‌خواهم فرآیندها را طراحی و مستمر کنم', icon: 'lucide:layers', fg: '#5d35fc' },
        { label: 'می‌خواهم بخشی از کار را واگذار کنم', desc: 'می‌خواهم اجرا را توسط متخصص انجام شود', icon: 'lucide:users-round', fg: '#fe7601' },
      ],
    },
    {
      n: '۳',
      label: 'وضعیت فعلی این چالش چقدر جدی است؟',
      hint: '(یک مورد را انتخاب کنید)',
      kind: 'cards' as const,
      options: [
        { label: 'قابل بهبود', desc: 'در حال مدیریت و نیاز به بهبود', icon: 'lucide:smile', fg: '#24934b' },
        { label: 'نیازمند اقدام', desc: 'نیاز به بررسی و اقدام داریم', icon: 'lucide:smile', fg: '#fd841c' },
        { label: 'اثرگذار', desc: 'تأثیر محسوس بر فرآیندها', icon: 'lucide:smile', fg: '#fe7601' },
        { label: 'بحرانی', desc: 'تأثیر جدی بر عملکرد سازمان', icon: 'lucide:smile', fg: '#dc2326' },
      ],
    },
    {
      n: '۴',
      label: 'کمی بیشتر درباره چالش خود توضیح دهید',
      hint: '(اختیاری)',
      kind: 'textarea' as const,
      placeholder: 'لطفاً توضیح دهید...',
      max: '۰/۵۰۰',
    },
  ],
  aside: {
    title: 'چرا این مرحله مهم است؟',
    desc: 'هر سازمان شرایط متفاوتی دارد؛ آریاز قبل از پیشنهاد راهکار، ابتدا مسئله واقعی شما را تحلیل می‌کند.',
    rows: [
      { label: 'بدون ارائه نسخه عمومی', icon: 'lucide:user-round' },
      { label: 'متناسب با شرایط سازمان', icon: 'lucide:target' },
      { label: 'بر اساس تجربه اجرایی', icon: 'lucide:briefcase' },
      { label: 'محرمانگی اطلاعات', icon: 'lucide:lock-keyhole' },
    ],
    note: 'اطلاعات شما کاملاً محرمانه خواهد بود.',
  } satisfies Aside,
};

/* ── Step 3 — هدف و انتظار ────────────────────────────────── */

export const step3 = {
  title: 'هدف و انتظار شما چیست؟',
  questions: [
    {
      n: '۱',
      label: 'هدف اصلی شما از حل این چالش چیست؟',
      hint: '(حداکثر دو گزینه)',
      kind: 'cards' as const,
      multi: true,
      options: [
        { label: 'رشد و توسعه سازمان', desc: 'زیرساخت‌های منابع انسانی را رشد ایجاد کنیم', icon: 'lucide:rocket', fg: '#24934b' },
        { label: 'ایجاد نظم و سیستم', desc: 'فرآیندهای HR را استاندارد و قابل تکرار کنیم', icon: 'lucide:settings', fg: '#0547fe' },
        { label: 'کاهش هزینه و افزایش بهره‌وری', desc: 'هزینه‌های منابع انسانی را بهینه کنیم', icon: 'lucide:wallet', fg: '#fd841c' },
        { label: 'جذب و نگهداشت افراد', desc: 'نیروی مناسب جذب و حفظ کنیم', icon: 'lucide:users-round', fg: '#5d35fc' },
        { label: 'تصمیم‌گیری بهتر مدیریتی', desc: 'تصمیم‌ها را داده‌محور کنیم', icon: 'lucide:chart-no-axes-combined', fg: '#fe7601' },
        { label: 'کاهش ریسک‌های قانونی', desc: 'ریسک‌های روابط کار را کاهش دهیم', icon: 'lucide:shield-check', fg: '#dc2326' },
      ],
    },
    {
      n: '۲',
      label: 'اگر این مسئله حل شود، چه تغییری دوست دارید در سازمان شما اتفاق بیفتد؟',
      hint: '(یک گزینه)',
      kind: 'cards' as const,
      options: [
        { label: 'سازمان سریع‌تر رشد می‌کند', icon: 'lucide:trending-up', fg: '#24934b' },
        { label: 'مدیران تصمیم‌های بهتری می‌گیرند', icon: 'lucide:target', fg: '#fe7601' },
        { label: 'هزینه‌ها کنترل و بهینه می‌شود', icon: 'lucide:wallet', fg: '#fd841c' },
        { label: 'کارکنان عملکرد بهتری دارند', icon: 'lucide:star', fg: '#5d35fc' },
        { label: 'فرآیندها بدون وابستگی اجرا می‌شوند', icon: 'lucide:settings', fg: '#0547fe' },
        { label: 'ریسک‌های سازمان کاهش پیدا می‌کند', icon: 'lucide:shield-check', fg: '#dc2326' },
      ],
    },
    {
      n: '۳',
      label: 'نقش مورد انتظار شما از آریاز چیست؟',
      hint: '(یک گزینه)',
      kind: 'cards' as const,
      options: [
        { label: 'فقط راهکار دهید', desc: 'مشاوره و نقشه راه', icon: 'lucide:user-round', fg: '#24934b' },
        { label: 'کنار ما اجرا کنید', desc: 'طراحی + استقرار + همراه', icon: 'lucide:handshake', fg: '#0547fe' },
        { label: 'کامل انجام دهید', desc: 'برون‌سپاری فرآیندها', icon: 'lucide:briefcase', fg: '#fe7601' },
      ],
    },
    {
      n: '۴',
      label: 'چه زمانی انتظار نتیجه دارید؟',
      hint: '(یک گزینه)',
      kind: 'cards' as const,
      options: [
        { label: 'کوتاه‌مدت', desc: '۳ تا ۶ ماه', icon: 'lucide:calendar', fg: '#fe7601' },
        { label: 'میان‌مدت', desc: '۶ تا ۱۲ ماه', icon: 'lucide:clock', fg: '#fd841c' },
        { label: 'فوری', desc: 'کمتر از ۳ ماه', icon: 'lucide:zap', fg: '#dc2326' },
      ],
    },
  ],
  aside: {
    title: 'چرا این مرحله مهم است؟',
    desc: 'یک چالش مشابه ممکن است برای دو سازمان، دو راهکار متفاوت داشته باشد؛ چون هدف و شرایط آن‌ها متفاوت است.',
    rows: [
      { label: 'پیشنهاد متناسب با هدف شما', icon: 'lucide:target' },
      { label: 'جلوگیری از هزینه‌های غیرضروری', icon: 'lucide:chart-no-axes-combined' },
      { label: 'تمرکز روی نتیجه واقعی', icon: 'lucide:star' },
      { label: 'طراحی مسیر همکاری مناسب', icon: 'lucide:users-round' },
    ],
    note: 'اطلاعات سازمان شما محرمانه است.',
  } satisfies Aside,
};

/* ── Step 4 — تحلیل وضعیت ─────────────────────────────────── */

export const step4 = {
  title: 'وضعیت فعلی منابع انسانی شما',
  questions: [
    {
      n: '۱',
      label: 'فرآیندهای منابع انسانی شما در چه وضعیتی قرار دارند؟',
      kind: 'cards' as const,
      options: [
        { label: 'فرآیندهای استاندارد و مستند داریم', desc: 'فرآیندها مشخص، مستند و قابل پیگیری هستند', icon: 'lucide:file-text', fg: '#24934b' },
        { label: 'فرآیند داریم اما اثربخش نیست', desc: 'اجرا می‌شود اما نتیجه مطلوب ندارد و نیاز به بازطراحی دارد', icon: 'lucide:refresh-cw', fg: '#0547fe' },
        { label: 'بیشتر وابسته به افراد است', desc: 'دانش در افراد است و استاندارد مشخص و مدون نداریم', icon: 'lucide:user-round', fg: '#fd841c' },
        { label: 'فرآیند مشخصی نداریم', desc: 'کارها به صورت موردی انجام می‌شود و نیاز به طراحی از ابتدا داریم', icon: 'lucide:circle-x', fg: '#dc2326' },
      ],
    },
    {
      n: '۲',
      label: 'ساختار منابع انسانی سازمان شما چگونه است؟',
      kind: 'cards' as const,
      options: [
        { label: 'واحد HR کامل داریم', desc: 'شامل مدیر HR، کارشناسان و فرآیندهای مشخص', icon: 'lucide:users-round', fg: '#24934b' },
        { label: 'واحد HR داریم اما محدود است', desc: 'ظرفیت اجرایی کم است و نیاز به پشتیبانی تخصصی داریم', icon: 'lucide:users', fg: '#0547fe' },
        { label: 'یک نفر مسئول HR است', desc: 'فعالیت‌های منابع انسانی بر عهده یک نفر است و پراکندگی وظایف زیاد است', icon: 'lucide:user-round', fg: '#fd841c' },
        { label: 'واحد HR نداریم', desc: 'هیچ واحد مشخصی نداریم و نیاز به ایجاد یا برون‌سپاری داریم', icon: 'lucide:user-round-cog', fg: '#dc2326' },
      ],
    },
    {
      n: '۳',
      label: 'تصمیم‌های منابع انسانی شما بر چه اساسی گرفته می‌شود؟',
      kind: 'cards' as const,
      options: [
        { label: 'کاملاً داده‌محور', desc: 'دارای گزارش‌ها، شاخص‌ها و داشبوردهای تحلیلی هستیم', icon: 'lucide:chart-no-axes-combined', fg: '#24934b' },
        { label: 'ترکیبی از داده و تجربه', desc: 'برخی تصمیم‌ها بر اساس داده و برخی بر اساس تجربه است', icon: 'lucide:circle-dot', fg: '#0547fe' },
        { label: 'بیشتر بر اساس تجربه مدیران', desc: 'تصمیم‌ها عمدتاً بر اساس تجربه و قضاوت مدیران است', icon: 'lucide:user-round', fg: '#fd841c' },
        { label: 'اطلاعات کافی نداریم', desc: 'داده‌ها و گزارش‌های کافی نداریم و تصمیم‌گیری سخت است', icon: 'lucide:circle-help', fg: '#dc2326' },
      ],
    },
    {
      n: '۴',
      label: 'اگر بخواهید وضعیت HR خود را ارزیابی کنید، کدام گزینه نزدیک‌تر است؟',
      kind: 'levels' as const,
      options: [
        { n: '۱', label: 'سطح ۱ ابتدایی', desc: 'فعالیت‌ها بیشتر واکنشی و موردی هستند', fg: '#dc2326' },
        { n: '۲', label: 'سطح ۲ در حال شکل‌گیری', desc: 'برخی فرآیندها ایجاد شده و در حال بهبود هستند', fg: '#fe7601' },
        { n: '۳', label: 'سطح ۳ سیستماتیک', desc: 'فرآیندها استاندارد، قابل تکرار و اندازه‌گیری هستند', fg: '#fd841c' },
        { n: '۴', label: 'سطح ۴ استراتژیک', desc: 'HR شریک کسب‌وکار است و نقش استراتژیک دارد', fg: '#24934b' },
      ],
    },
    {
      n: '۵',
      label: 'بیشترین فاصله وضعیت سازمان شما با وضعیت مطلوب چیست؟',
      kind: 'cards' as const,
      options: [
        { label: 'نبود سیستم و فرآیند', icon: 'lucide:settings', fg: '#dc2326' },
        { label: 'کمبود نیروی متخصص', icon: 'lucide:user-round', fg: '#fe7601' },
        { label: 'ضعف اجرای فرآیندها', icon: 'lucide:workflow', fg: '#fd841c' },
        { label: 'مقاومت مدیران', icon: 'lucide:users-round', fg: '#5d35fc' },
        { label: 'محدودیت هزینه', icon: 'lucide:wallet', fg: '#0547fe' },
      ],
    },
  ],
  aside: {
    title: 'چرا تحلیل وضعیت مهم است؟',
    desc: 'دو سازمان با یک مشکل مشابه ممکن است به دو راهکار متفاوت نیاز داشته باشند؛ چون سطح آمادگی و شرایط داخلی آن‌ها متفاوت است.',
    rows: [
      { label: 'جلوگیری از پیشنهاد اشتباه', icon: 'lucide:target' },
      { label: 'شناخت نقطه شروع واقعی', icon: 'lucide:flag' },
      { label: 'طراحی مسیر اجرایی مناسب', icon: 'lucide:route' },
      { label: 'استفاده بهینه از منابع سازمان', icon: 'lucide:wallet' },
    ],
    note: 'اطلاعات سازمان شما کاملاً محرمانه است.',
  } satisfies Aside,
};

/* ── Step 5 — پیشنهاد راهکار ──────────────────────────────── */

export const step5 = {
  badge: 'پیشنهاد اصلی',
  title: 'طراحی و استقرار فرآیندهای منابع انسانی',
  desc: 'بر اساس پاسخ‌های شما، این راهکار بیشترین تناسب را با نیازهای سازمان شما دارد.',
  whyTitle: 'چرا این پیشنهاد؟',
  why: [
    'سازمان شما در مرحله توسعه و رشد است.',
    'فرآیندهای منابع انسانی نیاز به استانداردسازی دارند.',
    'هدف شما ایجاد سیستم پایدار و قابل اتکاست.',
  ],
  servicesTitle: 'خدمات پیشنهادی در این مسیر',
  services: [
    { label: 'طراحی فرآیندهای منابع انسانی', icon: 'lucide:workflow' },
    { label: 'مستندسازی گردش‌کار', icon: 'lucide:chart-no-axes-combined' },
    { label: 'طراحی فرم‌ها و دستورالعمل‌ها', icon: 'lucide:file-text' },
    { label: 'آموزش تیم داخلی', icon: 'lucide:graduation-cap' },
    { label: 'همراهی استقرار و پایش', icon: 'lucide:target' },
  ],
  cta: 'دریافت جزئیات راهکار',

  analysisTitle: 'تحلیل اولیه سازمان شما',
  analysis:
    'سازمان شما در مرحله رشد قرار دارد، فرآیندهای منابع انسانی هنوز به‌صورت کامل استاندارد نشده‌اند و اولویت اصلی شما ایجاد نظم و کاهش وابستگی به افراد است.',
  analysisStats: [
    { label: 'وضعیت سازمان', value: 'در حال رشد', icon: 'lucide:trending-up', fg: '#fe7601' },
    { label: 'سطح بلوغ منابع انسانی', value: 'سطح ۲ از ۴', icon: 'lucide:circle-dot', fg: '#24934b' },
    { label: 'اولویت اصلی', value: 'طراحی سیستم‌های HR', icon: 'lucide:target', fg: '#fe7601' },
  ],

  altTitle: 'راهکارهای مکمل پیشنهادی',
  alts: [
    {
      rank: 'گزینه دوم',
      label: 'ارزیابی و طراحی ساختار سازمانی',
      desc: 'مناسب برای شما اگر رشد سازمان باعث ابهام در نقش‌ها و مسئولیت‌ها شده است.',
      icon: 'lucide:user-round',
      fg: '#5d35fc',
    },
    {
      rank: 'گزینه سوم',
      label: 'مشاوره تخصصی منابع انسانی',
      desc: 'مناسب برای شما اگر نیاز به تحلیل عمیق و تصمیم‌گیری مدیریتی دارید.',
      icon: 'lucide:users-round',
      fg: '#9396b0',
    },
    {
      rank: 'گزینه چهارم',
      label: 'برون‌سپاری بخشی از فرآیندهای HR',
      desc: 'مناسب برای شما اگر ظرفیت اجرایی کافی نیست و به پشتیبانی نیاز دارید.',
      icon: 'lucide:handshake',
      fg: '#fe7601',
    },
  ],
  altCta: 'جزئیات بیشتر',

  modeTitle: 'چگونه می‌خواهید با آریاز همکاری کنید؟',
  modes: [
    { label: 'مشاوره تخصصی', desc: 'من راهکار و نقشه مسیر می‌خواهم', icon: 'lucide:users-round', fg: '#24934b', on: true },
    { label: 'همراهی در اجرا', desc: 'می‌خواهم آریاز در پیاده‌سازی کنار ما باشد', icon: 'lucide:handshake', fg: '#0547fe' },
    { label: 'برون‌سپاری کامل', desc: 'می‌خواهم اجرای آن را به آریاز واگذار کنم', icon: 'lucide:briefcase', fg: '#fe7601' },
  ],

  outcomeTitle: 'خروجی‌های مورد انتظار',
  outcomes: [
    'فرآیندهای استاندارد HR',
    'تصمیم‌گیری بهتر مدیران',
    'کاهش وابستگی به افراد',
    'افزایش بهره‌وری و کیفیت',
    'شفاف شدن مسئولیت‌ها',
    'زیرساخت رشد سازمان',
  ],

  timelineTitle: 'مسیر اجرا',
  timeline: [
    { n: 'ماه اول', lines: ['تحلیل وضعیت موجود', 'شناسایی شکاف‌ها', 'اولویت‌بندی اقدامات'], icon: 'lucide:search', fg: '#24934b' },
    { n: 'ماه دوم', lines: ['طراحی سیستم مطلوب', 'تدوین فرآیندها', 'تعیین شاخص‌ها'], icon: 'lucide:file-text', fg: '#0547fe' },
    { n: 'ماه سوم', lines: ['استقرار و اجرای سیستم', 'آموزش و توانمندسازی', 'پایش و بهبود مستمر'], icon: 'lucide:rocket', fg: '#5d35fc' },
  ],

  changeTitle: 'می‌توانید پیشنهاد را تغییر دهید',
  changes: [
    { label: 'پیشنهاد دیگری انتخاب کنم', icon: 'lucide:shuffle' },
    { label: 'با متخصص صحبت کنم', icon: 'lucide:users-round' },
    { label: 'گزارش تحلیل را دریافت کنم', icon: 'lucide:file-down' },
  ],
};

/* ── Step 6 — ارتباط با متخصص ─────────────────────────────── */

export const step6 = {
  formTitle: 'اطلاعات تماس شما',
  formDesc: 'لطفاً اطلاعات زیر را وارد کنید تا متخصص آریاز با شما تماس بگیرد.',
  fields: [
    { label: 'نام و نام خانوادگی', placeholder: 'نام و نام خانوادگی خود را وارد کنید', icon: 'lucide:user-round', required: true },
    { label: 'سمت سازمانی', placeholder: 'سمت خود را وارد کنید', icon: 'lucide:briefcase', required: true },
    { label: 'شماره تماس', placeholder: 'مثال: ۰۹۱۲ ۱۲۳ ۴۵۶۷', icon: 'lucide:phone', required: true },
    { label: 'ایمیل سازمانی', placeholder: 'example@company.com', icon: 'lucide:mail', required: true },
    { label: 'توضیح تکمیلی (اختیاری)', placeholder: 'اگر نکته خاصی وجود دارد، اینجا بنویسید...', icon: 'lucide:pencil', required: false },
  ],

  timeTitle: 'زمان مناسب برای تماس',
  timeDesc: 'چه زمانی برای تماس با شما مناسب‌تر است؟',
  times: ['امروز', 'فردا', 'این هفته', 'زمان پیشنهادی من'],
  timePicker: 'انتخاب تاریخ و زمان',

  summaryTitle: 'خلاصه تحلیل سازمان شما',
  summary: [
    { label: 'حوزه اصلی', value: 'طراحی سیستم‌های منابع انسانی', icon: 'lucide:users-round', fg: '#0547fe' },
    { label: 'چالش اصلی', value: 'نبود فرآیندهای استاندارد HR', icon: 'lucide:circle-alert', fg: '#dc2326' },
    { label: 'هدف سازمان', value: 'ایجاد نظم و افزایش بهره‌وری', icon: 'lucide:target', fg: '#24934b' },
    { label: 'پیشنهاد آریاز', value: 'طراحی و استقرار فرآیندهای HR', icon: 'lucide:lightbulb', fg: '#fd841c' },
  ],

  expertTitle: 'متخصص پیشنهادی آریاز برای شما',
  expert: {
    name: 'مشاور ارشد منابع انسانی آریاز',
    avatar: '/images/aryaz/avatars/org-manager-header.png',
    bullets: [
      'بیش از ۱۵ سال تجربه اجرایی در حوزه منابع انسانی',
      'تخصص در طراحی، استقرار و بهبود سیستم‌های HR',
      'همراهی در تحلیل، طراحی و پیاده‌سازی راهکارها',
      'سابقه همکاری با سازمان‌های بزرگ و متوسط',
    ],
    cta: 'مشاهده پروفایل متخصص',
  },

  pathTitle: 'انتخاب مسیر همکاری',
  pathDesc: 'چگونه مایل هستید ادامه دهیم؟',
  paths: [
    { label: 'جلسه مشاوره اولیه', desc: '۳۰ دقیقه گفتگو برای بررسی دقیق‌تر شرایط سازمان شما', icon: 'lucide:calendar-check', fg: '#24934b', on: true },
    { label: 'دریافت گزارش تحلیل', desc: 'دریافت گزارش تحلیل کامل و پیشنهاد اولیه آریاز', icon: 'lucide:file-text', fg: '#0547fe' },
    { label: 'شروع پروژه', desc: 'درخواست پیشنهاد همکاری رسمی و شروع فرآیند پروژه', icon: 'lucide:rocket', fg: '#fe7601' },
  ],

  privacyTitle: 'اطلاعات شما محرمانه و امن است',
  privacy: [
    { label: 'ارتباط مستقیم با متخصص', desc: 'ارتباط مستقیم با متخصص مرتبط و با تجربه', icon: 'lucide:users-round' },
    { label: 'بدون انتقال اطلاعات', desc: 'اطلاعات شما به هیچ شخص ثالثی منتقل نمی‌شود', icon: 'lucide:lock-keyhole' },
    { label: 'تحلیل اختصاصی', desc: 'تحلیل و پیشنهاد ویژه تنها برای سازمان شما', icon: 'lucide:chart-no-axes-combined' },
  ],
};

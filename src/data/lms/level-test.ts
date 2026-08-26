import { T } from '@/data/panelTokens';

/* ──────────────────────────────────────────────────────────────
   تعیین سطح و انتخاب نقطه شروع — the level-determination wizard
   Source: «Level determination test page1…page5.png»

   Five sheets, five stages, one flow. Each stage is given its own
   route so it is addressable, but they share one shell — which is
   what the mockups draw: the same dark title bar, the same
   progress rail on the right, the same Aryaz guide on the left,
   and only the centre panel changing.

   THE MOCKUP'S OWN HEADER IS IGNORED, per the standing
   instruction: sheets draw a dark app bar carrying the Aryaz
   logo, the user chip and a bell. The real site header replaces
   it. The «بازگشت به مسیرها» control and the screen title are
   page content, so those stay.

   TWO INCONSISTENCIES ACROSS THE FIVE SHEETS, both transcribed
   rather than smoothed:

   1. STAGE 2 IS NAMED TWICE. Sheets 1, 3, 4 and 5 call it
      «ارزیابی تجربه»; sheet 2 — the one that IS stage 2 — calls
      it «تحلیل تجربه». The four-sheet majority wins below.

   2. SHEET 1'S TOP TRACKER IS OUT OF ORDER. It reads شناخت شما →
      تحلیل آریاز → ارزیابی دانش → ارزیابی تجربه → پیشنهاد, putting
      stage 4 in slot 2. Every other sheet, sheet 1's own side
      rail, and sheet 1's own «چطور سطح شما تعیین می‌شود؟» diagram
      all agree on شناخت → تجربه → دانش → تحلیل → پیشنهاد. The
      agreed order is used.
────────────────────────────────────────────────────────────── */

export const LEVEL_TEST_BAR = '#0d1030';

export const levelTestChrome = {
  title: 'تعیین سطح و انتخاب نقطه شروع',
  back: { label: 'بازگشت به مسیرها', href: '/learning-paths/archive' },
};

export const levelTestPath = {
  title: 'جذب و استخدام حرفه‌ای',
  icon: 'lucide:target',
  view: { label: 'مشاهده مسیر', icon: 'lucide:book-open', href: '/learning-paths/v2/hiring' },
  /* Sheet 3 swaps this line for a knowledge-specific one. */
  desc: 'قبل از شروع، نقطه مناسب ورود شما به این مسیر را مشخص کنیم.',
  descKnowledge: 'قبل از شروع، با چند پرسش سناریومحور سطح دانش شما را می‌سنجیم.',
  meta: 'مسیر ۶ مرحله‌ای',
};

export interface Stage {
  id: string;
  slug: string;
  label: string;
  icon: string;
}

export const stages: Stage[] = [
  { id: 'about', slug: '', label: 'شناخت شما', icon: 'lucide:flag' },
  { id: 'experience', slug: 'experience', label: 'ارزیابی تجربه', icon: 'lucide:briefcase' },
  { id: 'knowledge', slug: 'knowledge', label: 'ارزیابی دانش', icon: 'lucide:clipboard-list' },
  { id: 'analysis', slug: 'analysis', label: 'تحلیل آریاز', icon: 'lucide:sparkles' },
  { id: 'result', slug: 'result', label: 'پیشنهاد نقطه شروع', icon: 'lucide:award' },
];

/* Progress ring value per stage, as drawn on each sheet. */
export const stageProgress = [0, 20, 30, 75, 100];
export const stageProgressNote = [
  'مرحله ۱ از ۵',
  '۱ از ۵ مرحله تکمیل شده',
  'مرحله ۳ از ۵',
  '۴ از ۵ مرحله تکمیل شده',
  '۵ از ۵ مرحله تکمیل شده',
];

export const railTitles = {
  status: 'وضعیت تعیین سطح',
  statusResult: 'اطلاعات ارزیابی',
  steps: 'مراحل تعیین سطح',
  progress: 'پیشرفت کلی',
};

/* ── The Aryaz guide, which changes voice per stage ─────────── */

export const guides = [
  {
    title: 'راهنمای هوشمند آریاز',
    status: 'من اینجا هستم تا بهترین نقطه شروع را برای شما پیدا کنم.',
    bubble: 'سلام مهدی جان 👋 برای اینکه دقیق‌تر راهنمایی‌ات کنم، بیا ابتدا کمی شما را بشناسم.',
    faqTitle: 'پرسش‌های متداول',
    faq: [
      'چرا باید این اطلاعات را بدهم؟',
      'اطلاعات من در آریاز امن است؟',
      'چطور سطح من تعیین می‌شود؟',
      'اگر مطمئن نیستم چه کنم؟',
      'آیا می‌توانم بعداً تغییر دهم؟',
    ],
  },
  {
    title: 'راهنمای هوشمند آریاز',
    status: 'آنلاین و همراه شما',
    bubble:
      'حالا بهتره تجربه کاری‌ات در این حوزه را بررسی کنیم تا خروجی دقیق‌تری داشته باشیم. هر چقدر دقیق‌تر باشی، پیشنهاد بهتری می‌دهم. 🤝',
    faqTitle: 'پرسش‌های متداول',
    faq: ['من چند مسئولیت دارم، کدام را انتخاب کنم؟', 'تجربه غیرمرتبط هم حساب می‌شود؟'],
  },
  {
    title: 'راهنمای هوشمند آریاز',
    status: 'آنلاین و همراه شما',
    bubble:
      'در این مرحله چند سؤال سناریومحور از شما می‌پرسم تا سطح دانش عملی شما در این حوزه را بسنجیم. نگران نباش، سخت نیست. 😊',
    faqTitle: 'پرسش‌های متداول',
    faq: ['این سؤال‌ها چه کمکی می‌کند؟', 'اگر جواب را ندانم چه؟'],
  },
  {
    title: 'تحلیل شما با آریاز',
    status: 'آنلاین',
    bubble:
      'من در حال تحلیل پاسخ‌های شما هستم. به‌زودی نتیجه را اعلام می‌کنم. اگر در این مدت سؤال یا نکته‌ای دارید از من بپرسید.',
    faqTitle: 'پرسش‌های سریع',
    faq: ['الان در چه مرحله‌ای هستیم؟', 'تحلیل چقدر طول می‌کشد؟'],
  },
  {
    title: 'راهنمای تعیین سطح آریاز',
    status: 'آنلاین و همراه شما',
    bubble:
      'من این جا هستم تا بهترین نقطه شروع را برای شما پیدا کنم. سؤالات را با دقت جواب دهید تا مسیر یادگیری شما هوشمندانه تنظیم شود.',
    faqTitle: 'از من بپرس',
    faq: ['این سؤال یعنی چه؟', 'چرا این را می‌پرسی؟'],
  },
];

export const guidePlaceholder = 'پیام خود را بنویسید...';
export const guideFoot = 'هر زمان سوالی داشتی از من بپرس.';

/* ── Stage 1 · شناخت شما ────────────────────────────────────── */

export const stageAbout = {
  eyebrow: 'مرحله ۱ از ۵ - شناخت شما',
  title: 'بیا زودی کمی شما را بهتر بشناسیم 👋',
  desc: [
    'این اطلاعات به ما کمک می‌کند تا تجربه و نیازهای شما را بهتر درک کنیم',
    'و مناسب‌ترین مسیر یادگیری را برایتان پیشنهاد دهیم.',
  ],
  art: '/images/aryaz/illustrations/quest-intro-illus.png',
  chips: [
    { label: 'مرحله اختیاری اما پیشنهاد شده', icon: 'lucide:circle-check' },
    { label: 'کاملاً محرمانه', icon: 'lucide:lock' },
    { label: 'مدت زمان: ۲ دقیقه', icon: 'lucide:circle-alert' },
  ],
  start: { label: 'شروع مرحله ۱', icon: 'lucide:arrow-left' },
  later: 'بعداً انجام می‌دهم',
  how: {
    title: 'چطور سطح شما تعیین می‌شود؟',
    icon: 'lucide:sparkles',
    steps: [
      { label: 'شناخت شما', desc: 'اطلاعات اولیه و اهداف یادگیری', icon: 'lucide:user-round' },
      { label: 'ارزیابی تجربه', desc: 'بررسی سابقه کاری و تجربیات شما', icon: 'lucide:briefcase' },
      { label: 'ارزیابی دانش', desc: 'چند سوال برای سنجش دانش فعلی شما', icon: 'lucide:clipboard-list' },
      { label: 'تحلیل آریاز', desc: 'تحلیل جامع و هوشمند نتایج توسط آریاز', icon: 'lucide:sparkles' },
      { label: 'پیشنهاد نقطه شروع', desc: 'پیشنهاد بهترین سطح برای شروع شما', icon: 'lucide:flag' },
    ],
  },
  aboutPath: {
    title: 'درباره این مسیر',
    icon: 'lucide:circle-alert',
    desc: 'این مسیر به شما کمک می‌کند تا به یک متخصص جذب و استخدام تبدیل شوید و بهترین استعدادها را برای سازمان جذب کنید.',
    rows: [
      { label: 'مدت زمان مسیر', value: '۶۰ ساعت', icon: 'lucide:clock', fg: T.primary },
      { label: 'تعداد سطوح', value: '۴ سطح', icon: 'lucide:layers', fg: T.primary },
      { label: 'تعداد مهارت‌ها', value: '۲۶ مهارت', icon: 'lucide:sparkles', fg: '#0ea5a5' },
      { label: 'تعداد فعالیت‌ها', value: '۹۸ فعالیت', icon: 'lucide:clipboard-list', fg: T.accent },
    ],
  },
  support: {
    title: 'نیاز به راهنمایی دارید؟',
    desc: 'با پشتیبانی آریاز در ارتباط باشید.',
    cta: 'ارتباط با پشتیبانی',
    icon: 'lucide:headphones',
  },
};

/* ── Stage 2 · ارزیابی تجربه ────────────────────────────────── */

export const stageExperience = {
  eyebrow: 'مرحله ۲ از ۵ - تحلیل تجربه',
  question: 'تجربه شما در حوزه جذب و استخدام چقدر است؟',
  icon: 'lucide:user-round',
  options: [
    { label: 'تجربه‌ای ندارم', note: 'برای من کاملاً جدید است' },
    { label: 'کمتر از ۱ سال', note: 'کارشناسی یا دستیار' },
    { label: '۱ تا ۳ سال', note: 'انجام فعالیت‌های اجرایی' },
    { label: '۳ تا ۵ سال', note: 'مسئولیت‌دار یا سرپرست تیم جذب' },
    { label: 'بیش از ۵ سال', note: 'مدیر جذب با نقش استراتژیک', selected: true },
  ],
  next: { label: 'ادامه', icon: 'lucide:arrow-left' },
  prev: { label: 'مرحله قبل', icon: 'lucide:arrow-right' },
};

/* ── Stage 3 · ارزیابی دانش ─────────────────────────────────── */

export const stageKnowledge = {
  eyebrow: 'مرحله ۳ از ۵ - ارزیابی دانش',
  counter: 'سؤال ۲ از ۱۰',
  icon: 'lucide:clipboard-list',
  scenarioLabel: 'سناریو:',
  scenario:
    'برای یک موقعیت شغلی «کارشناس فروش» ۳۰۰ رزومه دریافت کرده‌اید. بررسی اولیه نشان می‌دهد فقط ۲۰۰ رزومه احتمالاً واجد شرایط هستند. اولین کاری که باید انجام دهید چیست؟',
  options: [
    { label: 'همه ۳۰۰ رزومه را به ترتیب دریافت بررسی می‌کنم.' },
    { label: 'معیارهای غربالگری را مشخص و رزومه‌ها را بر اساس آن دسته‌بندی می‌کنم.', selected: true },
    { label: 'از مدیر واحد می‌خواهم خودش رزومه‌ها را انتخاب کند.' },
    { label: 'با همه ۲۰۰ نفر تماس تلفنی اولیه می‌گیرم.' },
  ],
  next: { label: 'سؤال بعدی', icon: 'lucide:arrow-left' },
  prev: { label: 'سؤال قبلی', icon: 'lucide:arrow-right' },
};

/* ── Stage 4 · تحلیل آریاز ──────────────────────────────────── */

export const stageAnalysis = {
  eyebrow: 'مرحله ۴ از ۵ - تحلیل آریاز',
  title: 'در حال تحلیل نتایج شما هستم...',
  icon: 'lucide:sparkles',
  desc: 'پاسخ‌های شما در سه بخش تجربه، دانش و اطلاعات فردی با مدل مهارت‌های این مسیر مقایسه و تحلیل می‌شود تا دقیق‌ترین پیشنهاد را به شما ارائه کنم.',
  pct: 75,
  checks: [
    { label: 'تحلیل پاسخ‌های بخش شناخت شما', done: true },
    { label: 'تحلیل سابقه و تجربه کاری', done: true },
    { label: 'ارزیابی پاسخ‌های سناریومحور', done: true },
    { label: 'تطبیق با مدل مهارت‌های مسیر', done: false },
    { label: 'تعیین نقطه شروع پیشنهادی', done: false },
  ],
};

/* ── Stage 5 · پیشنهاد نقطه شروع ────────────────────────────── */

export const stageResult = {
  eyebrow: 'مرحله ۵ از ۵ - پیشنهاد نقطه شروع',
  title: 'نقطه شروع پیشنهادی شما آماده است',
  icon: 'lucide:award',
  desc: 'با توجه به پاسخ‌های شما، تجربه کاری و نتایج ارزیابی دانشی آریاز بهترین نقطه شروع را پیشنهاد می‌دهد.',
  levels: [
    {
      n: '۱',
      title: 'سطح ۱ - مقدماتی',
      desc: 'مفاهیم پایه و آشنایی اولیه',
      state: 'passed' as const,
      badge: 'تسلط کافی',
      pill: 'قابل عبور',
    },
    {
      n: '۲',
      title: 'سطح ۲ - کاربردی',
      desc: 'اجرای حرفه‌ای فرایند جذب',
      state: 'start' as const,
      badge: 'نقطه شروع شما',
      pill: 'پیشنهاد آریاز',
    },
    {
      n: '۳',
      title: 'سطح ۳ - پیشرفته',
      desc: 'طراحی و بهبود نظام جذب',
      state: 'later' as const,
    },
    {
      n: '۴',
      title: 'سطح ۴ - حرفه‌ای',
      desc: 'راهبری استراتژیک تأمین سرمایه انسانی',
      state: 'later' as const,
    },
  ],
  why: {
    title: 'چرا سطح ۲؟',
    body: 'شما در مفاهیم پایه و اجرای عمومی جذب و استخدام تسلط مناسبی دارید، اما در موضوعات زیر نیز فرصت توسعه مشاهده می‌شود:',
    gaps: [
      'مصاحبه ساختاریافته و شایستگی‌محور',
      'طراحی معیارهای غربالگری و امتیازدهی',
      'تحلیل اثربخشی کانال‌های جذب',
    ],
  },
  primary: { label: 'شروع از سطح ۲', icon: 'lucide:rocket' },
  secondary: { label: 'شروع از ابتدای مسیر', icon: 'lucide:flag' },
  info: {
    title: 'اطلاعات ارزیابی',
    icon: 'lucide:clipboard-list',
    rows: [
      { label: 'تاریخ ارزیابی', value: '۲۰ اردیبهشت ۱۴۰۴' },
      { label: 'مدت زمان', value: '۴ دقیقه' },
      { label: 'تعداد سؤالات', value: '۲۱ سؤال' },
      { label: 'نوع ارزیابی', value: 'تجربه + دانش + سناریو' },
    ],
  },
  /* NOTE: the four slices are labelled ۳۰٪ / ۳۰٪ / ۳۰٪ / ۲۰٪ on
     the sheet, which sums to ۱۱۰. Transcribed as drawn; the donut
     below renders them proportionally so the ring still closes. */
  areas: {
    title: 'حوزه‌های ارزیابی',
    icon: 'lucide:briefcase',
    items: [
      { label: 'تجربه کاری', value: '۳۰٪', pct: 30, fg: '#1c8a4e' },
      { label: 'دانش مفهومی', value: '۳۰٪', pct: 30, fg: '#1b56d3' },
      { label: 'مهارت‌های عملی', value: '۳۰٪', pct: 30, fg: '#f0932b' },
      { label: 'تحلیل و قضاوت', value: '۲۰٪', pct: 20, fg: T.primary },
    ],
  },
};

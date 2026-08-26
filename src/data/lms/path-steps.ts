import { T } from '@/data/panelTokens';

/* ──────────────────────────────────────────────────────────────
   مسیرهای یادگیری — landing, a path step, a path exercise, and
   the learner's own career-path dashboard.
   Sources: «learning-paths.png», «learning path - Single Lesson.png»,
            «learning path - lesson - homework.png»,
            «Career Development path - Sinle Lesson or Single Level.png»

   ROUTES: /learning-paths and /learning-paths/[id] predate these
   mockups, so per the standing "leave both versions competing"
   rule the mockup landing goes to /learning-paths/v2 and the step
   screens hang off /learning-paths/v2/[id]/…

   THE STEP SCREENS ARE NOT THE CLASSROOM. A course lesson lives
   in LearnShell with a curriculum rail; a *path* step lives in
   its own frame with a «نقشه مسیر» rail that groups steps under
   levels and locks the ones you have not reached. Different
   object, different shell — so these do not reuse LearnShell.

   The mockups draw their own dark app bar (logo, search, user,
   bell, dark-mode toggle). Ignored on instruction; the real site
   header carries those. The «بازگشت به…» control stays as page
   content.
────────────────────────────────────────────────────────────── */

export const PATH_BAR = '#0d1030';

const TH = '/images/aryaz/thumbnails';

/* ════════ Landing ══════════════════════════════════════════ */

export const pathsLanding = {
  hero: {
    titleLead: 'مسیر',
    titleAccent: 'رشدت',
    titleTail: 'را انتخاب کن',
    desc: [
      'می‌خواهی برای یک نقش شغلی آماده شوی یا در یک مهارت مشخص حرفه‌ای شوی؟',
      'آریاز، همه منابع مورد نیازت را در یک مسیر مرحله‌به‌مرحله برایت کنار هم می‌گذارد.',
    ],
    art: '/images/aryaz/illustrations/learning-path-illus.png',
    choices: [
      {
        id: 'career',
        title: 'مسیرهای شغلی',
        sub: 'برای یک نقش حرفه‌ای آماده شو',
        example: 'مثال: HRBP، مدیر منابع انسانی، متخصص جذب و استخدام',
        cta: 'مشاهده مسیرهای شغلی',
        icon: 'lucide:briefcase',
        fg: '#1b56d3',
        bg: '#eef4fe',
      },
      {
        id: 'skill',
        title: 'مسیرهای مهارتی',
        sub: 'در یک مهارت مشخص حرفه‌ای شو',
        example: 'مثال: جذب و استخدام، KPI، رهبری، تحلیل داده و ...',
        cta: 'مشاهده مسیرهای مهارتی',
        icon: 'lucide:target',
        fg: '#1c8a4e',
        bg: '#eef8f2',
      },
    ],
    all: 'همه مسیرها را ببینید',
  },

  agent: {
    title: 'ایجنت مسیر یادگیری آریاز',
    desc: 'هدف را به من بگو؛ کمک می‌کنم مسیر مناسب را پیدا کنی.',
    chips: [
      'مسیر مناسب من را پیشنهاد بده',
      'نمی‌دانم چه مهارتی برای شغلم لازم دارم',
      'می‌خواهم در جذب حرفه‌ای شوم',
      'می‌خواهم HRBP شوم',
    ],
    placeholder: 'هدفت را بنویس...',
  },

  careerSection: {
    title: 'برای یک نقش حرفه‌ای آماده شوید',
    desc: 'هر مسیر شغلی مجموعه‌ای از مسیرهای مهارتی، چالش‌های واقعی و پروژه نهایی است.',
    all: 'مشاهده همه مسیرهای شغلی',
    icon: 'lucide:user-round',
    items: [
      {
        id: 'hrbp',
        title: 'HRBP حرفه‌ای',
        icon: 'lucide:briefcase',
        fg: T.primary,
        bg: T.tintPurple,
        rows: [
          { label: 'مسیر مهارتی', value: '۷' },
          { label: 'مرحله یادگیری', value: '۴۲' },
          { label: 'چالش شغلی', value: '۳' },
          { label: 'پروژه نهایی', value: '۱' },
        ],
        hours: 'حدود ۷۰ ساعت',
        cta: 'مشاهده مسیر',
        href: '/career-paths/hrbp',
      },
      {
        id: 'talent',
        title: 'متخصص جذب و استخدام',
        icon: 'lucide:users-round',
        fg: '#1b56d3',
        bg: '#eef4fe',
        rows: [
          { label: 'مسیر مهارتی', value: '۶' },
          { label: 'مرحله یادگیری', value: '۳۸' },
          { label: 'چالش شغلی', value: '۲' },
          { label: 'پروژه نهایی', value: '۱' },
        ],
        hours: 'حدود ۶۰ ساعت',
        cta: 'مشاهده مسیر',
        href: '/career-paths/talent-lead',
      },
      {
        id: 'hr-manager',
        title: 'مدیر منابع انسانی',
        icon: 'lucide:user-round',
        fg: '#1c8a4e',
        bg: '#eef8f2',
        rows: [
          { label: 'مسیر مهارتی', value: '۸' },
          { label: 'مرحله یادگیری', value: '۴۵' },
          { label: 'چالش شغلی', value: '۳' },
          { label: 'پروژه نهایی', value: '۱' },
        ],
        hours: 'حدود ۸۰ ساعت',
        cta: 'مشاهده مسیر',
        href: '/career-paths/hr-manager',
      },
      {
        id: 'perf',
        title: 'متخصص مدیریت عملکرد',
        icon: 'lucide:gauge',
        fg: '#e07b18',
        bg: '#fdf3e8',
        rows: [
          { label: 'مسیر مهارتی', value: '۵' },
          { label: 'مرحله یادگیری', value: '۳۲' },
          { label: 'چالش شغلی', value: '۲' },
          { label: 'پروژه نهایی', value: '۱' },
        ],
        hours: 'حدود ۵۵ ساعت',
        cta: 'مشاهده مسیر',
        href: '/career-paths/perf-manager',
      },
    ],
  },

  skillSection: {
    title: 'یک مهارت را قدم‌به‌قدم حرفه‌ای یاد بگیرید',
    all: 'مشاهده همه مسیرهای مهارتی',
    icon: 'lucide:target',
    items: [
      { id: 'hiring', title: 'جذب و استخدام حرفه‌ای', steps: '۳۲ مرحله', hours: 'حدود ۲۴ ساعت', tone: 'green' as const, fg: '#0f766e', href: '/learning-paths/v2/hiring' },
      { id: 'kpi', title: 'طراحی KPI حرفه‌ای', steps: '۲۶ مرحله', hours: 'حدود ۲۰ ساعت', tone: 'orange' as const, fg: '#e0930b', href: '/learning-paths/v2/kpi' },
      { id: 'analytics', title: 'HR Analytics', steps: '۲۸ مرحله', hours: 'حدود ۲۴ ساعت', tone: 'blue' as const, fg: '#1b56d3', href: '/learning-paths/v2/hr-analytics' },
      { id: 'interview', title: 'مصاحبه شایستگی‌محور', steps: '۲۷ مرحله', hours: 'حدود ۱۸ ساعت', tone: 'violet' as const, fg: '#d6337d', href: '/learning-paths/v2/interview' },
      { id: 'leadership', title: 'مهارت رهبری', steps: '۳۰ مرحله', hours: 'حدود ۲۰ ساعت', tone: 'violet' as const, fg: T.primary, href: '/learning-paths/v2/leadership' },
    ],
    contentIcons: [
      'lucide:file-text',
      'lucide:circle-play',
      'lucide:book-open',
      'lucide:briefcase',
      'lucide:graduation-cap',
      'lucide:pencil-line',
      'lucide:circle-check',
      'lucide:trophy',
    ],
    cta: 'مشاهده مسیر',
  },

  resume: {
    title: 'ادامه بده: از همان‌جایی که بودی',
    icon: 'lucide:chart-column-big',
    all: 'مشاهده همه مسیرهای من',
    items: [
      {
        id: 'hiring',
        title: 'جذب و استخدام حرفه‌ای',
        icon: 'lucide:target',
        fg: '#0f766e',
        pct: 68,
        step: 'مرحله ۱۶ از ۳۷',
        last: 'آخرین فعالیت: طراحی سوالات مصاحبه شایستگی‌محور',
        cta: 'ادامه مسیر',
      },
      {
        id: 'perf',
        title: 'مدیریت عملکرد پیشرفته',
        icon: 'lucide:users-round',
        fg: '#1b56d3',
        pct: 42,
        step: 'مرحله ۵ از ۲۱',
        last: 'آخرین فعالیت: فرم ارزیابی و وزن‌دهی شاخص‌های عملکرد',
        cta: 'ادامه مسیر',
      },
      {
        id: 'analytics',
        title: 'تحلیل داده‌های HR',
        icon: 'lucide:chart-column-big',
        fg: '#e07b18',
        pct: 75,
        step: 'مرحله ۱۵ از ۲۰',
        last: 'آخرین فعالیت: تحلیل نرخ جریان نیروی انسانی در سازمان',
        cta: 'ادامه مسیر',
      },
    ],
    empty: {
      title: 'مسیر جدیدی را شروع کنید',
      desc: 'برای شروع مسیرهای جدید، از بین مسیرهای شغلی و مهارتی انتخاب کنید و مسیر رشدتان را بسازید.',
      cta: 'انتخاب مسیر',
    },
  },

  how: {
    title: 'یک مسیر یادگیری چگونه کار می‌کند؟',
    desc: 'ما همه منابع را در یک نقشه یادگیری مرحله‌به‌مرحله کنار هم گذاشته‌ایم. جلوتر قدم‌به‌قدم برویم.',
    nodes: [
      { label: 'مقاله', desc: 'یادگیری سریع پایه', icon: 'lucide:file-text' },
      { label: 'ویدئو', desc: 'درک عمیق موضوع', icon: 'lucide:circle-play' },
      { label: 'کتاب', desc: 'مطالعه عمیق', icon: 'lucide:book-open' },
      { label: 'گفت‌وگو با ایجنت', desc: 'مطالعه و مرور عمیق', icon: 'lucide:sparkles' },
      { label: 'ابزار عملی', desc: 'کاربرد در عمل', icon: 'lucide:wrench' },
      { label: 'دوره آموزشی', desc: 'یادگیری ساختاریافته', icon: 'lucide:graduation-cap' },
      { label: 'تمرین', desc: 'تقویت مهارت', icon: 'lucide:pencil-line' },
      { label: 'آزمون', desc: 'سنجش یادگیری', icon: 'lucide:circle-check' },
      { label: 'پروژه', desc: 'اجرای عملی دنیای واقعی', icon: 'lucide:trophy' },
    ],
  },

  popular: {
    title: 'محبوب‌ترین مسیرهای آریاز',
    pills: ['همه', 'مهارتی'],
    all: 'مشاهده همه',
    items: [
      { rank: '۱', title: 'HRBP حرفه‌ای', kind: 'شغلی', hours: 'حدود ۷۰ ساعت', fg: '#e07b18' },
      { rank: '۲', title: 'جذب و استخدام حرفه‌ای', kind: 'مهارتی', hours: 'حدود ۲۴ ساعت', fg: '#0f766e' },
      { rank: '۳', title: 'مدیر منابع انسانی', kind: 'شغلی', hours: 'حدود ۸۰ ساعت', fg: '#1c8a4e' },
      { rank: '۴', title: 'طراحی KPI حرفه‌ای', kind: 'مهارتی', hours: 'حدود ۲۰ ساعت', fg: '#e0930b' },
      { rank: '۵', title: 'مدیریت عملکرد پیشرفته', kind: 'مهارتی', hours: 'حدود ۱۸ ساعت', fg: T.primary },
      { rank: '۶', title: 'HR Analytics', kind: 'مهارتی', hours: 'حدود ۲۴ ساعت', fg: '#1b56d3' },
    ],
    avatars: [
      '/images/aryaz/avatars/expert-01-lawyer.png',
      '/images/aryaz/avatars/staff-ali-ahmadi.png',
      '/images/aryaz/avatars/expert-02-hr.png',
    ],
  },

  cta: {
    title: 'هنوز مطمئن نیستید کدام مسیر مناسب شماست؟',
    desc: 'شغل فعلی، تجربه و هدفتان را به ایجنت آریاز بگویید تا مسیر مناسب را پیشنهاد کند.',
    button: 'مسیر مناسب من را پیدا کن',
    icon: 'lucide:arrow-left',
  },
};

/* ════════ Path step shell (lesson + exercise share it) ═════ */

export const pathStepChrome = {
  back: { label: 'بازگشت به صفحه مسیر', href: '/learning-paths/v2/hiring' },
  pathTitle: 'جذب و استخدام حرفه‌ای',
  levelPill: 'سطح فعلی: کاربردی',
  progressNote: '۱۴ از ۳۲ مرحله تکمیل شده',
  progressLabel: 'پیشرفت کل مسیر',
  progressPct: 42,
  crumb: ['سطح کاربردی', 'مرحله ۱۵ از ۳۲'],
};

export interface MapItem {
  label: string;
  state: 'done' | 'current' | 'todo' | 'locked';
}

export const pathMap = {
  title: 'نقشه مسیر',
  icon: 'lucide:book-open',
  levels: [
    {
      label: 'سطح ۱- مبانی جذب و استخدام',
      status: 'تکمیل شده!',
      statusTone: 'done' as const,
      open: false,
      items: [
        { label: 'مقاله: مفهوم Talent Acquisition', state: 'done' as const },
        { label: 'ویدئو: فرایند استاندارد جذب', state: 'done' as const },
        { label: 'کتاب: فصل منتخب', state: 'done' as const },
        { label: 'تمرین اول', state: 'done' as const },
        { label: 'آزمون سطح', state: 'done' as const },
      ],
    },
    {
      label: 'سطح ۲ — اجرای فرایند جذب',
      status: 'در حال یادگیری',
      statusTone: 'current' as const,
      open: true,
      items: [
        { label: 'تحلیل درخواست نیرو', state: 'done' as const },
        { label: 'تدوین Job Description', state: 'done' as const },
        { label: 'طراحی آگهی استخدام', state: 'current' as const },
        { label: 'انتخاب کانال جذب', state: 'todo' as const },
        { label: 'غربالگری رزومه', state: 'locked' as const },
        { label: 'تمرین سطح', state: 'locked' as const },
        { label: 'آزمون سطح', state: 'locked' as const },
      ],
    },
    { label: 'سطح ۳ — مصاحبه و ارزیابی حرفه‌ای', status: '', statusTone: 'locked' as const, open: false, items: [] },
    { label: 'سطح ۴ — جذب استعدادهای برتر', status: '', statusTone: 'locked' as const, open: false, items: [] },
  ],
  summary: {
    title: 'خلاصه پیشرفت',
    pct: '۴۲%',
    pctLabel: 'پیشرفت کل',
    done: '۱۴',
    doneLabel: 'تکمیل شده',
    total: '۳۲',
    totalLabel: 'مرحله کل',
    bar: 42,
  },
};

export const pathGuide = {
  title: 'همراه یادگیری آریاز',
  lessonBubble: 'در این مرحله چیزی را متوجه نشدی؟ از من بپرس.',
  lessonChipsTitle: 'پیشنهادات سریع',
  lessonChips: [
    { label: 'این مرحله را خلاصه کن', icon: 'lucide:file-text' },
    { label: 'چرا باید این را یاد بگیرم؟', icon: 'lucide:circle-help' },
    { label: 'یک مثال واقعی بزن', icon: 'lucide:lightbulb' },
    { label: 'برایم ساده‌تر توضیح بده', icon: 'lucide:message-circle' },
    { label: 'برای مرحله بعد آماده‌ام؟', icon: 'lucide:target' },
  ],
  exerciseBubble: 'در این تمرین راهنمایی‌ات می‌کنم، اما تمرین را به‌جایت انجام نمی‌دهم.',
  exerciseChipsTitle: 'پیشنهادهای من برای شما',
  exerciseChips: [
    { label: 'صورت تمرین را برایم توضیح بده', icon: 'lucide:file-text' },
    { label: 'برای شروع راهنمایی‌ام کن', icon: 'lucide:lightbulb' },
    { label: 'شرایط احراز یعنی چه؟', icon: 'lucide:circle-help' },
    { label: 'پاسخم را بررسی کن', icon: 'lucide:search' },
  ],
  placeholder: 'پیام خود را بنویسید...',
  disclaimer: ['آریاز ممکن است اشتباه کند.', 'پاسخ‌ها را با بررسی منابع معتبر ارزیابی کنید.'],
};

/* ── The lesson step ─────────────────────────────────────────── */

export const pathLesson = {
  badge: 'مرحله ۱۵ از ۳۲',
  title: 'طراحی آگهی استخدام حرفه‌ای',
  meta: [
    { label: 'مقاله', icon: 'lucide:file-text' },
    { label: 'حدود ۸ دقیقه', icon: 'lucide:clock' },
  ],
  desc: 'در این مرحله با اصول و تکنیک‌های طراحی آگهی استخدام جذاب و مؤثر آشنا می‌شوید.',
  resource: {
    lead: 'این مرحله با مطالعه مقاله زیر تکمیل می‌شود:',
    title: 'راهنمای طراحی آگهی استخدام',
    desc: 'در این مقاله یاد می‌گیرید چگونه یک آگهی استخدام جذاب بنویسید که بهترین گزینه‌ها را جذب کند.',
    author: 'نویسنده: تیم محتوای آریاز',
    updated: 'به‌روزرسانی: خرداد ۱۴۰۳',
    category: 'دسته: جذب و استخدام',
    image: `${TH}/article-05-competency-hiring.png`,
    cta: 'مطالعه مقاله',
  },
  note: 'پس از مطالعه مقاله، به این صفحه بازگردید و مرحله را تکمیل کنید.',
  nav: {
    next: { label: 'مرحله بعدی', icon: 'lucide:arrow-left' },
    complete: { label: 'این مرحله را تکمیل کردم', icon: 'lucide:check' },
    prev: { label: 'مرحله قبلی', icon: 'lucide:arrow-right' },
  },
};

/* ── The exercise step ───────────────────────────────────────── */

export const pathExercise = {
  badge: 'مرحله ۱۸ از ۳۲',
  title: 'تمرین: طراحی آگهی استخدام',
  meta: [
    { label: 'تمرین عملی', icon: 'lucide:pencil-line' },
    { label: 'حدود ۲۰ دقیقه', icon: 'lucide:clock' },
  ],
  scenario: {
    title: 'سناریو',
    icon: 'lucide:briefcase',
    body: 'شرکت آریانا قصد دارد برای شعبه تهران یک سرپرست فروش استخدام کند. تیم فروش شامل ۱۲ کارشناس است و فرد موردنظر علاوه بر مدیریت تیم باید توانایی تحلیل عملکرد فروش، Coaching نیروها و برنامه‌ریزی منطقه‌ای داشته باشد.',
    rows: [
      { label: 'عنوان شغل:', value: 'سرپرست فروش' },
      { label: 'محل کار:', value: 'تهران' },
      { label: 'تعداد افراد تیم:', value: '۱۲ نفر' },
      { label: 'سابقه مورد انتظار:', value: 'حداقل ۳ سال' },
      { label: 'نوع همکاری:', value: 'تمام‌وقت' },
    ],
  },
  ask: {
    title: 'از شما چه می‌خواهیم؟',
    icon: 'lucide:clipboard-list',
    lead: 'براساس سناریوی بالا:',
    items: [
      'عنوان مناسب آگهی را بنویسید',
      'معرفی کوتاه موقعیت را تدوین کنید',
      'مسئولیت‌های اصلی را مشخص کنید',
      'شرایط احراز را بنویسید',
      'یک CTA مناسب برای کاندیدا طراحی کنید',
    ],
  },
  answer: {
    title: 'پاسخ شما',
    placeholder: 'پاسخ خود را اینجا بنویسید...',
    submit: { label: 'ثبت پاسخ و تکمیل مرحله', icon: 'lucide:check' },
  },
  /* The exercise sheet draws a DIFFERENT level-2 list from the
     lesson sheet: by the time you reach the exercise, «طراحی آگهی
     استخدام» and «انتخاب کانال جذب» are both ticked and the
     current entry is the exercise itself. So the map takes an
     override here rather than the lesson's list, which has no
     entry this page could mark as current. */
  mapCurrent: 'تمرین: طراحی آگهی استخدام',
  mapItems: [
    { label: 'تحلیل درخواست نیرو', state: 'done' as const },
    { label: 'تدوین Job Description', state: 'done' as const },
    { label: 'طراحی آگهی استخدام', state: 'done' as const },
    { label: 'انتخاب کانال جذب', state: 'done' as const },
    { label: 'تمرین: طراحی آگهی استخدام', state: 'current' as const },
    { label: 'غربالگری رزومه', state: 'locked' as const },
    { label: 'آزمون سطح', state: 'locked' as const },
  ],
};

/* ════════ Career-path personal dashboard ══════════════════ */

export const myCareerPath = {
  back: { label: 'بازگشت به داشبورد', href: '/learning-paths/v2' },
  title: 'مسیر شغلی من: HRBP حرفه‌ای',
  icon: 'lucide:briefcase',
  desc: 'تا تبدیل شدن به HRBP حرفه‌ای، همراه شما هستیم.',
  view: { label: 'مشاهده صفحه معرفی مسیر', icon: 'lucide:book-open', href: '/career-paths/hrbp' },
  resume: { label: 'ادامه یادگیری', icon: 'lucide:rocket' },

  stats: [
    { value: '۶۶%', label: 'آمادگی فعلی شما', sub: 'از آمادگی HRBP', ring: 66, fg: '#1c8a4e' },
    { value: '۳ از ۷', label: 'مسیر تکمیل شده', sub: 'مسیر', icon: 'lucide:circle-check', fg: '#1c8a4e' },
    { value: '۱', label: 'مسیر در حال یادگیری', sub: 'مسیر', icon: 'lucide:book-open', fg: T.primary },
    { value: '۲ از ۳', label: 'چالش‌های شغلی', sub: 'چالش تکمیل شده', icon: 'lucide:target', fg: T.primary },
    { value: 'قفل', label: 'پروژه نهایی', sub: '۲ مورد از ۳ شرط تکمیل شده', icon: 'lucide:lock', fg: T.muted },
  ],

  map: {
    title: 'نقشــه آمادگی من برای HRBP',
    steps: [
      { n: '۱', label: 'مبانی منابع انسانی', pct: '۱۰۰%', state: 'done' as const, note: 'تکمیل شده', icon: 'lucide:book-open', fg: '#1c8a4e' },
      { n: '۲', label: 'تحلیل کسب‌وکار', pct: '۱۰۰%', state: 'done' as const, note: 'تکمیل شده', icon: 'lucide:chart-column-big', fg: '#1c8a4e' },
      { n: '۳', label: 'مدیریت عملکرد', pct: '۱۰۰%', state: 'done' as const, note: 'تکمیل شده', icon: 'lucide:gauge', fg: '#1c8a4e' },
      { n: '۴', label: 'HR Analytics', pct: '۶۲%', state: 'current' as const, note: 'در حال یادگیری', icon: 'lucide:chart-pie', fg: T.primary },
      { n: '۵', label: 'مشاوره مدیران', pct: '', state: 'todo' as const, note: 'شروع نشده', icon: 'lucide:users-round', fg: T.muted },
      { n: '۶', label: 'ارتباط و نفوذ', pct: '', state: 'todo' as const, note: 'شروع نشده', icon: 'lucide:message-circle', fg: T.muted },
      { n: '۷', label: 'طراحی سازمان', pct: '', state: 'todo' as const, note: 'شروع نشده', icon: 'lucide:workflow', fg: T.muted },
    ],
  },

  skills: {
    title: 'وضعیت مهارت‌های موردنیاز نقش HRBP',
    /* Declared right-to-left: «مهارت» is the RIGHTMOST column in
       the sheet, so it comes first. */
    cols: ['مهارت', 'سطح موردنیاز', 'سطح فعلی شما', 'درصد آمادگی', 'وضعیت'],
    rows: [
      { skill: 'مدیریت عملکرد', need: '۴', have: '۴', pct: 100, state: 'آماده', tone: 'ready' as const },
      { skill: 'تحلیل کسب‌وکار', need: '۳', have: '۳', pct: 100, state: 'آماده', tone: 'ready' as const },
      { skill: 'HR Analytics', need: '۳', have: '۲', pct: 62, state: 'در حال توسعه', tone: 'progress' as const },
      { skill: 'مشاوره مدیران', need: '۳', have: '۱', pct: 31, state: 'شکاف مهارتی', tone: 'gap' as const },
      { skill: 'ارتباط و نفوذ', need: '۴', have: '۲', pct: 50, state: 'در حال توسعه', tone: 'progress' as const },
      { skill: 'طراحی سازمان', need: '۳', have: '۱', pct: 33, state: 'شکاف مهارتی', tone: 'gap' as const },
    ],
  },

  challenges: {
    title: 'چالش‌های HRBP',
    icon: 'lucide:target',
    items: [
      {
        title: 'تحلیل یک مسئله واقعی کسب‌وکار',
        state: 'done' as const,
        stateLabel: 'تکمیل شده',
        note: 'امتیاز ۸ از ۱۰۰',
        icon: 'lucide:circle-check',
        fg: '#1c8a4e',
      },
      {
        title: 'مشاوره به یک مدیر در مسئله عملکرد',
        state: 'ready' as const,
        stateLabel: 'آماده شروع',
        note: 'پیشنهادی: ۴۵ دقیقه',
        icon: 'lucide:circle-play',
        fg: '#e07b18',
      },
      {
        title: 'طراحی پیشنهاد HR مبتنی بر داده',
        state: 'locked' as const,
        stateLabel: 'هنوز قفل است',
        note: 'ابتدا مهارت‌های پیش‌نیاز را تقویت کنید',
        icon: 'lucide:lock',
        fg: T.muted,
      },
    ],
  },

  finalProject: {
    title: 'پروژه نهایی HRBP',
    icon: 'lucide:briefcase',
    name: 'طراحی یک HR Business Case واقعی',
    lead: 'برای باز شدن این پروژه باید:',
    conditions: [
      { label: 'همه مسیرهای مهارتی را تکمیل کنید', done: true },
      { label: 'حداقل ۲ چالش شغلی را تکمیل کنید', done: true },
      { label: 'آمادگی شغلی ≥ ۷۰%', done: false },
    ],
    note: '۲ مورد از ۳ شرط تکمیل شده',
    bar: 66,
  },

  coach: {
    title: 'مربی مسیر شغلی آریاز',
    status: 'آنلاین و آماده راهنمایی شما',
    bubble: [
      'سلام مهدی! 👋',
      'براساس پیشرفتت، می‌توانم پیشنهاد بدهم روی چه مهارت‌هایی تمرکز کنی تا سریع‌تر به نقش HRBP نزدیک شوی.',
    ],
    chipsTitle: 'از من بپرس',
    chips: [
      { label: 'قدم بعدی من چیست؟', icon: 'lucide:footprints' },
      { label: 'بزرگ‌ترین شکاف مهارتی من چیست؟', icon: 'lucide:target' },
      { label: 'چقدر تا آمادگی HRBP فاصله دارم؟', icon: 'lucide:chart-column-big' },
      { label: 'برنامه یادگیری این ماه من را بده', icon: 'lucide:calendar' },
      { label: 'چرا این Skill برای HRBP مهم است؟', icon: 'lucide:lightbulb' },
    ],
    placeholder: 'پیام خود را بنویسید...',
  },
};

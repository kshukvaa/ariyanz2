import { T } from '@/data/panelTokens';
import type { PathCard, ResourceGroup } from '@/components/lms/PathParts';

/* ──────────────────────────────────────────────────────────────
   مسیرهای یادگیری — archive, single skill path, single career path
   Sources: «learning-paths_Archive.png», «learning-paths single.png»,
            «Career Development path*.png»

   PALETTE: these pages run on the org panel's violet `T`, not the
   LMS navy. That is what the mockups draw, and it is consistent —
   a learning path is a plan, closer to the panel's world than to
   the course catalogue's shop front.

   ROUTE NOTE: /learning-paths and /learning-paths/[id] already
   exist from before these mockups arrived, so per the standing
   "leave both versions competing" instruction the mockup versions
   land at /learning-paths/archive and /learning-paths/v2/[id].
   The career path is a different animal and gets its own
   /career-paths/[id].

   MOCKUP INCONSISTENCY: «learning-paths single.png» says «۲۲
   مرحله» in its hero and «۳۲ مرحله» in the closing CTA band, on
   the same sheet. Both are transcribed where they appear.
────────────────────────────────────────────────────────────── */

const TH = '/images/aryaz/thumbnails';
const A = '/images/aryaz/avatars';

/* ════════ Archive ════════════════════════════════════════════ */

export const archiveHero = {
  title: 'همه مسیرهای یادگیری آریاز',
  desc: [
    'از یک مهارت مشخص تا آمادگی برای یک نقش شغلی:',
    'مسیر مناسب هدفت را پیدا کن و قدم‌به‌قدم پیش برو.',
  ],
  art: '/images/aryaz/illustrations/learning-path-illus.png',
};

export const archiveAgent = {
  title: 'ایجنت مسیر یادگیری آریاز',
  desc: 'هدفت، شغل فعلی یا مهارتی که می‌خواهی یاد بگیری را بگو تا بین مسیرهای آریاز مناسب‌ترین‌ها را برایت پیدا کنم.',
  chips: [
    'می‌خواهم KPI یاد بگیرم',
    'برای اینکه مدیر منابع انسانی شوم چه مسیری بروم؟',
    'می‌خواهم HRBP شوم',
  ],
  placeholder: 'هدفت را بنویس..',
};

export const archiveToolbar = {
  search: 'جستجو در مسیرهای یادگیری...',
  sort: 'جدیدترین',
  pills: [
    { label: 'همه', fg: T.primary },
    { label: 'رایگان', fg: T.successStrong },
    { label: 'ویژه', fg: T.accent },
  ],
};

export const archiveFilters = [
  {
    id: 'kind',
    label: 'نوع مسیر',
    items: [
      { label: 'مسیر شغلی', count: '۱۸' },
      { label: 'مسیر مهارتی', count: '۴۶' },
    ],
  },
  {
    id: 'topic',
    label: 'موضوع',
    groups: [
      {
        label: 'منابع انسانی',
        count: '۳۲',
        open: true,
        items: [
          { label: 'جذب و استخدام', count: '۸' },
          { label: 'مدیریت عملکرد', count: '۶' },
          { label: 'آموزش و توسعه', count: '۵' },
          { label: 'جبران خدمات', count: '۴' },
          { label: 'HR Analytics', count: '۵' },
          { label: 'روابط کار و قانون', count: '۴' },
        ],
      },
      { label: 'رهبری و مدیریت', count: '۱۹', items: [] },
      { label: 'توسعه فردی', count: '۱۳', items: [] },
      { label: 'مهارت‌های نرم', count: '۱۶', items: [] },
      { label: 'کسب‌وکار و استراتژی', count: '۱۴', items: [] },
    ],
  },
  {
    id: 'level',
    label: 'سطح',
    items: [
      { label: 'مقدماتی' },
      { label: 'کاربردی' },
      { label: 'پیشرفته' },
      { label: 'حرفه‌ای' },
    ],
  },
  {
    id: 'duration',
    label: 'مدت مسیر',
    items: [
      { label: 'کمتر از ۱۰ ساعت' },
      { label: '۱۰ تا ۲۰ ساعت' },
      { label: '۲۰ تا ۴۰ ساعت' },
      { label: 'بیش از ۴۰ ساعت' },
    ],
  },
];

const CONTENT_ICONS = [
  'lucide:file-text',
  'lucide:book-open',
  'lucide:clipboard-list',
  'lucide:graduation-cap',
  'lucide:circle-check',
  'lucide:trophy',
];

const stats = (steps: string, hours: string, levels: string) => [
  { value: steps, label: 'مرحله' },
  { value: hours, label: 'ساعت' },
  { value: levels, label: 'سطح' },
];

export const archivePaths: PathCard[] = [
  {
    id: 'hiring',
    kind: 'skill',
    kindLabel: 'مسیر مهارتی',
    title: 'جذب و استخدام حرفه‌ای',
    desc: 'از مبانی جذب تا طراحی و اجرای حرفه‌ای فرایند استخدام',
    icon: 'lucide:user-round-plus',
    tone: 'green',
    fg: '#1c8a4e',
    bg: '#e9f7ef',
    stats: stats('۳۲', '۲۴', '۴'),
    contentIcons: CONTENT_ICONS,
    cta: 'مشاهده مسیر',
    href: '/learning-paths/v2/hiring',
  },
  {
    id: 'kpi',
    kind: 'skill',
    kindLabel: 'مسیر مهارتی',
    title: 'طراحی KPI حرفه‌ای',
    desc: 'یادگیری اصول طراحی شاخص‌های کلیدی عملکرد (KPI)',
    icon: 'lucide:target',
    tone: 'orange',
    fg: '#e07b18',
    bg: '#fdf3e8',
    stats: stats('۲۸', '۱۸', '۴'),
    contentIcons: CONTENT_ICONS,
    cta: 'مشاهده مسیر',
    href: '/learning-paths/v2/kpi',
  },
  {
    id: 'hr-analytics',
    kind: 'skill',
    kindLabel: 'مسیر مهارتی',
    title: 'HR Analytics',
    desc: 'تسلط بر تحلیل داده‌های منابع انسانی و تصمیم‌گیری داده‌محور',
    icon: 'lucide:chart-column-big',
    tone: 'blue',
    fg: '#1b56d3',
    bg: '#eaf1ff',
    stats: stats('۳۶', '۲۵', '۲۵'),
    contentIcons: CONTENT_ICONS,
    cta: 'مشاهده مسیر',
    href: '/learning-paths/v2/hr-analytics',
  },
  {
    id: 'interview',
    kind: 'skill',
    kindLabel: 'مسیر مهارتی',
    title: 'مصاحبه شایستگی‌محور',
    desc: 'یادگیری تکنیک‌های مصاحبه مبتنی بر شایستگی و ارزیابی حرفه‌ای',
    icon: 'lucide:users-round',
    tone: 'violet',
    fg: T.primary,
    bg: T.tintPurple,
    stats: stats('۲۲', '۱۵', '۲۳'),
    contentIcons: CONTENT_ICONS,
    cta: 'مشاهده مسیر',
    href: '/learning-paths/v2/interview',
  },
  {
    id: 'hrbp',
    kind: 'career',
    kindLabel: 'مسیر شغلی',
    title: 'HRBP حرفه‌ای',
    desc: 'مسیر جامع آمادگی برای ایفای نقش شریک تجاری منابع انسانی',
    icon: 'lucide:briefcase',
    tone: 'violet',
    fg: T.primary,
    bg: T.tintPurple,
    stats: stats('۷', '۷۰', '۴'),
    contentIcons: CONTENT_ICONS,
    cta: 'مشاهده مسیر',
    href: '/career-paths/hrbp',
  },
  {
    id: 'talent-lead',
    kind: 'career',
    kindLabel: 'مسیر شغلی',
    title: 'متخصص جذب و استخدام',
    desc: 'از جذب تا استخدام: تسلط بر کل چرخه تأمین سرمایه انسانی',
    icon: 'lucide:user-round-plus',
    tone: 'violet',
    fg: T.primary,
    bg: T.tintPurple,
    stats: stats('۶', '۵۲', '۴'),
    contentIcons: CONTENT_ICONS,
    cta: 'مشاهده مسیر',
    href: '/career-paths/talent-lead',
  },
  {
    id: 'hr-manager',
    kind: 'career',
    kindLabel: 'مسیر شغلی',
    title: 'مدیر منابع انسانی',
    desc: 'آمادگی برای مدیریت جامع منابع انسانی سازمان',
    icon: 'lucide:users-round',
    tone: 'violet',
    fg: T.primary,
    bg: T.tintPurple,
    stats: stats('۸', '۸۶', '۴'),
    contentIcons: CONTENT_ICONS,
    cta: 'مشاهده مسیر',
    href: '/career-paths/hr-manager',
  },
  {
    id: 'perf-manager',
    kind: 'career',
    kindLabel: 'مسیر شغلی',
    title: 'مدیر عملکرد سازمانی',
    desc: 'تسلط بر طراحی، پیاده‌سازی و بهبود نظام عملکرد سازمان',
    icon: 'lucide:gauge',
    tone: 'violet',
    fg: T.primary,
    bg: T.tintPurple,
    stats: stats('۷', '۶۴', '۴'),
    contentIcons: CONTENT_ICONS,
    cta: 'مشاهده مسیر',
    href: '/career-paths/perf-manager',
  },
];

/* ════════ Single skill path ═════════════════════════════════ */

export const skillPath = {
  badge: 'مسیر مهارتی',
  title: 'جذب و استخدام حرفه‌ای',
  desc: 'از شناخت اصول جذب تا طراحی و اجرای فرایند استخدام و انتخاب',
  art: `${TH}/video-03-effective-hiring.png`,
  meta: [
    { value: '۴ سطح', icon: 'lucide:layers' },
    { value: '۲۲ مرحله', icon: 'lucide:flag' },
    { value: 'حدود ۴۴ ساعت', icon: 'lucide:clock' },
    { value: '۳ آزمون نهایی', icon: 'lucide:clipboard-list' },
  ],
  primary: { label: 'شروع مسیر یادگیری', icon: 'lucide:rocket' },
  secondary: { label: 'افزودن به مسیرهای من', icon: 'lucide:bookmark' },
  tabs: [
    { id: 'about', label: 'درباره این مسیر' },
    { id: 'outcomes', label: 'دستاوردهای مسیر' },
    { id: 'map', label: 'نقشه مسیر' },
    { id: 'content', label: 'محتوای مسیر' },
    { id: 'project', label: 'پروژه و ارزیابی' },
    { id: 'audience', label: 'مناسب چه کسانی است؟' },
    { id: 'careers', label: 'مسیرهای شغلی مرتبط' },
  ],
  about: {
    title: 'درباره مسیر جذب و استخدام حرفه‌ای',
    icon: 'lucide:circle-alert',
    body: [
      'مسیر یادگیری جذب و استخدام حرفه‌ای آریاز برای افرادی طراحی شده است که می‌خواهند فرایند جذب را از یک فعالیت اجرایی به یک مهارت حرفه‌ای و مبتنی بر شواهد تبدیل کنند.',
      'در این مسیر از مبانی جذب و شناخت نیاز سازمان شروع می‌کنید و قدم‌به‌قدم به طراحی فرایند جذب، انتخاب کانال‌های مناسب، غربالگری رزومه، مصاحبه شایستگی‌محور، ارزیابی کاندیدا و تحلیل اثربخشی استخدام می‌رسید.',
      'یادگیری فقط به مطالعه محتوا محدود نیست و در طول مسیر با مقاله، ویدئو، کتاب، دوره آموزشی، ابزارهای کاربردی، تمرین و آزمون مواجه می‌شوید تا در نهایت بتوانید آموخته‌های خود را در یک پروژه واقعی به کار بگیرید.',
    ],
    stats: [
      { value: '۴ سطح', icon: 'lucide:layers', fg: T.primary },
      { value: '۲۲ مرحله', icon: 'lucide:flag', fg: T.primary },
      { value: '۴۴ ساعت', icon: 'lucide:clock', fg: T.accent },
      { value: 'پروژه عملی نهایی', icon: 'lucide:trophy', fg: '#d61f5e' },
    ],
  },
  agent: {
    title: 'درباره این مسیر سؤال دارید؟',
    desc: 'می‌توانم مسیر را برایتان توضیح بدهم، بگویم از چه سطحی شروع کنید یا بررسی کنم با توجه به هدف شغلی‌تان این مسیر مناسب شما هست یا نه.',
    chips: [
      { label: 'از کدام سطح شروع کنم؟', icon: 'lucide:chart-column-big' },
      { label: 'این مسیر برای من مناسب است؟', icon: 'lucide:user-round' },
      { label: 'پیش‌نیازهای این مسیر چیست؟', icon: 'lucide:graduation-cap' },
      { label: 'محتوای مسیر را خلاصه کن', icon: 'lucide:file-text' },
    ],
    placeholder: 'پیام خود را بنویسید...',
  },
  resourcesTitle: 'منابع و محتوای مرتبط با این مسیر',
  resources: [
    {
      id: 'articles',
      title: 'مقاله‌های مرتبط',
      fg: '#1c8a4e',
      bg: '#f2faf5',
      items: [
        { label: '۷ اشتباه رایج در جذب', image: `${TH}/article-05-competency-hiring.png` },
        { label: 'چگونه بهترین کانال جذب را انتخاب کنیم؟', image: `${TH}/article-12-attrition-trends.png` },
        { label: 'شاخص‌های کلیدی جذب', image: `${TH}/article-09-performance-kpi.png` },
      ],
      cta: 'مشاهده همه مقاله‌ها',
    },
    {
      id: 'books',
      title: 'کتاب‌های مرتبط',
      fg: '#1b56d3',
      bg: '#f2f6fd',
      items: [
        { label: 'هنر استخدام', image: `${TH}/book-article-04-talent-attract.png` },
        { label: 'مصاحبه استخدامی حرفه‌ای', image: `${TH}/book-article-01-hr-strategy.png` },
        { label: 'مدیریت استخدام', image: `${TH}/book-article-03-hr-sources.png` },
      ],
      cta: 'مشاهده همه کتاب‌ها',
    },
    {
      id: 'courses',
      title: 'دوره‌های آموزشی مرتبط',
      fg: T.primary,
      bg: '#f6f4fd',
      items: [
        { label: 'مصاحبه شایستگی‌محور', image: `${TH}/video-03-effective-hiring.png` },
        { label: 'آموزش ATS و مدیریت رزومه', image: `${TH}/video-06-employee-empowerment.png` },
        { label: 'غربالگری رزومه و ارزیابی اولیه', image: `${TH}/video-09-org-culture.png` },
      ],
      cta: 'مشاهده همه دوره‌ها',
    },
    {
      id: 'forms',
      title: 'فرم‌ها و دستورالعمل‌ها',
      fg: '#e07b18',
      bg: '#fdf6ec',
      items: [
        { label: 'فرم درخواست استخدام', image: `${TH}/doc-article-01-insurance-calc.png` },
        { label: 'فرم ارزیابی مصاحبه', image: `${TH}/doc-article-02-payments-1404.png` },
        { label: 'راهنمای مصاحبه شایستگی', image: `${TH}/doc-article-04-new-regulations.png` },
      ],
      cta: 'مشاهده همه فرم‌ها',
    },
    {
      id: 'tools',
      title: 'ابزارهای مرتبط',
      fg: '#0ea5a5',
      bg: '#f0fafa',
      items: [
        { label: 'ابزار تحلیل رزومه', image: `${TH}/article-07-data-decisions.png` },
        { label: 'محاسبه‌گر هزینه جذب', image: `${TH}/doc-article-03-wage-impact.png` },
        { label: 'چک‌لیست استخدام', image: `${TH}/article-11-contract-basics.png` },
      ],
      cta: 'مشاهده همه ابزارها',
    },
  ] as ResourceGroup[],
  ratings: {
    title: 'نظرات کاربران',
    score: '۴.۸',
    count: '(۴۴۴ نظر)',
    submit: 'ثبت نظر جدید',
    bars: [
      { label: '۵ ستاره', pct: 70, fg: '#1c8a4e' },
      { label: '۴ ستاره', pct: 20, fg: '#f5a524' },
      { label: '۳ ستاره', pct: 7, fg: '#f0932b' },
      { label: '۲ ستاره', pct: 2, fg: '#f26a21' },
      { label: '۱ ستاره', pct: 1, fg: '#e5342c' },
    ],
    reviews: [
      {
        name: 'نگار محمدی',
        role: 'متخصص منابع انسانی',
        avatar: `${A}/mbti-reviewer-01.png`,
        stars: 5,
        text: 'ترکیب محتوا، ابزار و تمرین واقعاً عالیه. پروژه نهایی مسیر کمک کرد یادگیریم عمیق‌تر و واقعی‌تر بشه.',
        when: '۱ ماه پیش',
      },
      {
        name: 'مهدی رشایی',
        role: 'HR Generalist',
        avatar: `${A}/staff-ali-ahmadi.png`,
        stars: 5,
        text: 'به کمک این مسیر تونستم فرایند جذب سازمانمون رو کامل طراحی و اجرا کنم. محتواها واقعاً کاربردی هستن.',
        when: '۳ هفته پیش',
      },
      {
        name: 'سارا احمدی',
        role: 'کارشناس جذب و استخدام',
        avatar: `${A}/expert-02-hr.png`,
        stars: 5,
        text: 'مسیر خیلی جامع و کاربردی بود. مرحله‌به‌مرحله پیش رفتم و الان اعتمادبه‌نفس خیلی بیشتری در مصاحبه دارم.',
        when: '۲ هفته پیش',
      },
    ],
  },
  cta: {
    title: 'آماده‌اید جذب و استخدام حرفه‌ای را یاد بگیرید؟',
    desc: '۳۲ مرحله، از مبانی تا اجرای یک پروژه واقعی',
    primary: { label: 'شروع مسیر یادگیری', icon: 'lucide:rocket' },
    secondary: { label: 'تعیین سطح و شروع مسیر شخصی من', icon: 'lucide:user-round' },
  },
};

/* ════════ Single career path ════════════════════════════════ */

export const careerPath = {
  badge: 'مسیر شغلی',
  title: 'HRBP حرفه‌ای',
  desc: 'از مهارت‌های پایه منابع انسانی تا آمادگی برای ایفای نقش شریک تجاری منابع انسانی',
  art: `${TH}/video-10-leadership-practice.png`,
  meta: [
    { value: '۷', label: 'ارزیابی آمادگی شغلی', icon: 'lucide:shield-check' },
    { value: '۷۰ ساعت', label: 'مدت زمان یادگیری', icon: 'lucide:clock' },
    { value: '۱', label: 'پروژه نهایی', icon: 'lucide:award' },
    { value: '۳', label: 'چالش شغلی', icon: 'lucide:briefcase' },
    { value: '۷', label: 'مسیر مهارتی', icon: 'lucide:flag' },
  ],
  primary: { label: 'شروع مسیر شغلی', icon: 'lucide:rocket' },
  secondary: { label: 'افزودن به مسیرهای من', icon: 'lucide:bookmark' },
  tabs: [
    { id: 'about', label: 'درباره این مسیر شغلی' },
    { id: 'skills', label: 'مهارت‌های موردنیاز' },
    { id: 'map', label: 'نقشه مسیر شغلی' },
    { id: 'challenges', label: 'چالش‌های شغلی' },
    { id: 'assessment', label: 'ارزیابی آمادگی شغلی' },
    { id: 'audience', label: 'مناسب چه کسانی است؟' },
  ],
  map: {
    title: 'نقشه مسیر شغلی',
    icon: 'lucide:book-open',
    lead: 'این مسیر شامل ۷ مرحله مهارتی است که شما را گام‌به‌گام برای تبدیل شدن به یک HRBP حرفه‌ای آماده می‌کند.',
    steps: [
      { n: '۱', title: 'مبانی منابع انسانی', desc: 'آشنایی با اصول و فرایندهای پایه منابع انسانی', hours: '۶ ساعت', fg: '#0f766e' },
      { n: '۲', title: 'تحلیل کسب‌وکار', desc: 'درک کسب‌وکار و تبدیل اهداف آن به نیازهای HR', hours: '۱۰ ساعت', fg: '#22a559' },
      { n: '۳', title: 'تحلیل داده', desc: 'استفاده از داده‌ها برای پیوند اهداف سازمانی به نیازهای HR', hours: '۱۰ ساعت', fg: '#b5b02a' },
      { n: '۴', title: 'مدیریت عملکرد و پاداش', desc: 'طراحی نظام عملکرد و پاداش اثربخش', hours: '۸ ساعت', fg: '#f0932b' },
      { n: '۵', title: 'مشاوره سازمانی', desc: 'مهارت‌های مشاوره‌ای و تأثیرگذاری بر مدیران', hours: '۱۰ ساعت', fg: '#e0479e' },
      { n: '۶', title: 'طراحی سازمان و تغییر', desc: 'طراحی ساختار، نقش‌ها و مدیریت تغییر', hours: '۱۰ ساعت', fg: '#7c5cff' },
      { n: '۷', title: 'پروژه نهایی و یکپارچه‌سازی', desc: 'اجرای یک پروژه واقعی و ارائه راهکار HR', hours: '۱۴ ساعت', fg: '#4b30ce' },
    ],
  },
  agent: {
    title: 'دستیار هوشمند آریاز',
    question: 'می‌خواهی بدانی برای HRBP شدن چه چیزهایی لازم داری؟',
    desc: 'می‌توانم بررسی کنم کدام مهارت‌ها را داری، از کجا شروع کنی و چه Gapهایی داری.',
    chips: [
      { label: 'برای HRBP شدن چه مهارت‌هایی لازم دارم؟', icon: 'lucide:chart-column-big' },
      { label: 'من از کدام Skill Path شروع کنم؟', icon: 'lucide:target' },
      { label: 'این مسیر برای تجربه من مناسب است؟', icon: 'lucide:user-round' },
    ],
    placeholder: 'هدفت را بنویس..',
  },
};

import type { ServiceDetailData } from '@/components/org/services/ServiceDetailPage';
import { systemsCrumbs } from './_systemsHero';

/* ──────────────────────────────────────────────────────────────
   طراحی و استقرار نظام جذب و استخدام
   Source: «طراحی و استقرار نظام جذب  و استخدام.png»

   Note — the service rail lists this page twice: once under
   «فرآیندهای تخصصی» as «طراحی و استقرار نظام جذب و استخدام» and
   once under «فرآیندهای عمومی» as «طراحی نظام جذب و استخدام».
   Both entries point here; see the note in orgServiceNav.ts.

   The funnel figures reconcile: ۱٬۲۴۰ applicants narrowing to ۱۲
   hires is a ~۱٪ conversion, which is what the Time-to-Hire and
   Cost-per-Hire panel beside it is scaled against.
────────────────────────────────────────────────────────────── */

export const hiringSystem: ServiceDetailData = {
  slug: 'hiring-system',
  family: 'specialist',
  navId: 'hiring-system',

  meta: {
    title: 'طراحی و استقرار نظام جذب و استخدام | آریاز',
    description:
      'آریاز فرآیند جذب و استخدام سازمان را از برنامه‌ریزی نیاز تا طراحی کانال‌های جذب، غربالگری، مصاحبه، ارزیابی، انتخاب و Onboarding طراحی و استاندارد می‌کند.',
  },

  hero: {
    title: [
      'جذب حرفه‌ای از انتشار آگهی شروع نمی‌شود:',
      'از طراحی یک سیستم درست',
      'شروع می‌شود',
    ],
    accentLines: [1, 2],
    desc: 'آریاز فرآیند جذب و استخدام سازمان را از برنامه‌ریزی نیاز تا طراحی کانال‌های جذب، غربالگری، مصاحبه، ارزیابی، انتخاب و Onboarding طراحی و استاندارد می‌کند.',
    primary: { label: 'درخواست ارزیابی نظام جذب و استخدام', icon: 'lucide:clipboard-check' },
    secondary: { label: 'مشاوره با متخصص', icon: 'lucide:users-round' },
    crumbs: systemsCrumbs('طراحی و استقرار نظام جذب و استخدام'),
  },

  problems: {
    title: 'مسئله شما «کمبود رزومه» است یا «سیستم جذب»؟',
    cards: [
      {
        title: 'نرخ خروج نیروهای تازه‌استخدام‌شده بالاست',
        desc: 'انتخاب، پیشنهاد همکاری و ورود فرد به سازمان یکپارچه نیست.',
        icon: 'lucide:trending-down',
        fg: '#dc2326',
      },
      {
        title: 'مصاحبه‌ها سلیقه‌ای هستند',
        desc: 'هر مصاحبه‌کننده بر اساس برداشت شخصی تصمیم می‌گیرد.',
        icon: 'lucide:user-round',
        fg: '#fe7601',
      },
      {
        title: 'رزومه زیاد داریم ولی کاندیدای مناسب کم است',
        desc: 'کانال و Targeting جذب مناسب طراحی نشده.',
        icon: 'lucide:file-text',
        fg: '#24934b',
      },
      {
        title: 'هر مدیر به روش خودش استخدام می‌کند',
        desc: 'استاندارد مشخصی برای انتخاب افراد وجود ندارد.',
        icon: 'lucide:workflow',
        fg: '#0547fe',
      },
    ],
  },

  steps: {
    title: 'فرآیند اجرای پروژه طراحی و استقرار نظام جذب',
    items: [
      { n: '۱', title: 'تحلیل وضعیت موجود', lines: [], icon: 'lucide:search', fg: '#24934b' },
      { n: '۲', title: 'طراحی معماری جذب', lines: [], icon: 'lucide:workflow', fg: '#0547fe' },
      { n: '۳', title: 'طراحی استانداردهای انتخاب', lines: [], icon: 'lucide:badge-check', fg: '#5d35fc' },
      { n: '۴', title: 'طراحی ابزارها و گردش کار', lines: [], icon: 'lucide:wrench', fg: '#fe7601' },
      { n: '۵', title: 'Pilot و آموزش', lines: [], icon: 'lucide:graduation-cap', fg: '#dc2326' },
      { n: '۶', title: 'استقرار', lines: [], icon: 'lucide:rocket', fg: '#24934b' },
    ],
  },

  agent: {
    title: 'ایجنت هوشمند جذب آریاز',
    desc: 'نظام جذب شما چقدر حرفه‌ای است؟ مهم‌ترین شکاف اغلب نبود مدل استاندارد ارزیابی و تصمیم‌گیری درباره کاندیداهاست.',
    questions: [
      'درخواست جذب نیرو چگونه تأیید می‌شود؟',
      'آیا برای هر شغل معیار انتخاب مشخص دارید؟',
      'مصاحبه‌ها ساختاریافته است؟',
      'کاندیداها Scorecard دارند؟',
      'Time to Hire را اندازه می‌گیرید؟',
      'Quality of Hire را بعد از استخدام بررسی می‌کنید؟',
    ],
    cta: 'شروع ارزیابی نظام جذب',
  },

  form: {
    title: 'استخدام را از یک تصمیم سلیقه‌ای به یک سیستم قابل اندازه‌گیری تبدیل کنید',
    desc: 'با تکمیل فرم زیر، کارشناسان آریاز با شما تماس می‌گیرند.',
    assurances: [],
    fields: [
      { label: 'نام سازمان' },
      { label: 'تعداد کارکنان' },
      { label: 'تعداد استخدام سالانه' },
      { label: 'آیا تیم جذب دارید؟', kind: 'select' },
      { label: 'میانگین زمان جذب', kind: 'select' },
      { label: 'مهم‌ترین چالش جذب', kind: 'select' },
      { label: 'شماره تماس' },
    ],
    submit: 'درخواست بررسی نظام جذب و استخدام',
  },

  extras: [
    {
      kind: 'radial',
      id: 'architecture',
      after: 'problems',
      title: 'معماری نظام جذب و استخدام آریاز',
      centre: 'Talent Acquisition System',
      items: [
        { label: 'نیاز نیروی انسانی (Workforce Need)', icon: 'lucide:users-round' },
        { label: 'تحلیل شغل (Job Profile)', icon: 'lucide:briefcase' },
        { label: 'جذب (Sourcing)', icon: 'lucide:search' },
        { label: 'غربالگری (Screening)', icon: 'lucide:funnel' },
        { label: 'ارزیابی (Assessment)', icon: 'lucide:clipboard-check' },
        { label: 'انتخاب (Selection)', icon: 'lucide:badge-check' },
        { label: 'پیشنهاد همکاری (Offer)', icon: 'lucide:handshake' },
        { label: 'ورود و استقرار (Onboarding)', icon: 'lucide:rocket' },
      ],
    },
    {
      kind: 'funnel',
      id: 'hiring-funnel',
      after: 'problems',
      title: 'قیف جذب سازمان',
      items: [
        { label: 'متقاضی', value: '۱٬۲۴۰', fg: '#000f4e' },
        { label: 'رزومه واجد شرایط', value: '۴۸۰', fg: '#0547fe' },
        { label: 'ارزیابی اولیه', value: '۱۶۰', fg: '#5d35fc' },
        { label: 'مصاحبه', value: '۶۴', fg: '#24934b' },
        { label: 'کاندید نهایی', value: '۱۸', fg: '#fd841c' },
        { label: 'استخدام', value: '۱۲', fg: '#fe7601' },
      ],
    },
    {
      kind: 'stats',
      id: 'hiring-kpis',
      after: 'problems',
      title: 'شاخص‌های کلیدی جذب',
      items: [
        { value: '۲۸ روز', label: 'میانگین زمان جذب', sub: 'Time to Hire', fg: '#0547fe' },
        { value: '۱۱٬۳۰۰٬۰۰۰', label: 'هزینه جذب هر نفر (تومان)', sub: 'Cost per Hire', fg: '#fe7601' },
        { value: '۸۷٪', label: 'پذیرش پیشنهاد همکاری', sub: 'Offer Acceptance', fg: '#24934b' },
        { value: '۸۱٪', label: 'کیفیت استخدام', sub: 'Quality of Hire', fg: '#5d35fc' },
      ],
    },
    {
      kind: 'cards',
      id: 'assessment-model',
      after: 'problems',
      title: 'مدل ارزیابی و انتخاب کاندیدا',
      items: [
        { label: 'مصاحبه ساختاریافته', desc: 'Structured Interview', icon: 'lucide:message-circle', fg: '#0547fe' },
        { label: 'آزمون', desc: 'Test', icon: 'lucide:clipboard-check', fg: '#24934b' },
        { label: 'مطالعه موردی', desc: 'Case Study', icon: 'lucide:file-text', fg: '#fe7601' },
        { label: 'نقش‌آفرینی', desc: 'Role Play', icon: 'lucide:users-round', fg: '#5d35fc' },
        { label: 'مرکز ارزیابی', desc: 'Assessment Center', icon: 'lucide:building-2', fg: '#dc2326' },
      ],
    },
    {
      kind: 'steps',
      id: 'candidate-journey',
      after: 'steps',
      title: 'تجربه کاندیدا (Candidate Journey)',
      items: [
        { n: '۱', title: 'آشنایی (Awareness)', lines: ['دیدن فرصت شغلی و آشنایی با سازمان'] },
        { n: '۲', title: 'درخواست (Application)', lines: ['ارسال رزومه و تکمیل فرم‌های اولیه'] },
        { n: '۳', title: 'ارزیابی (Evaluation)', lines: ['تعامل با سازمان و ارزیابی‌های مختلف'] },
        { n: '۴', title: 'انتخاب (Selection)', lines: ['اعلام نتیجه و انتخاب کاندیدای مناسب'] },
        { n: '۵', title: 'پیشنهاد (Offer)', lines: ['ارائه پیشنهاد همکاری و مذاکره'] },
        { n: '۶', title: 'ورود (Onboarding)', lines: ['آغاز همکاری و یکپارچه‌سازی'] },
      ],
    },
    {
      kind: 'split',
      id: 'deliverables',
      after: 'outputs',
      title: 'خروجی‌های پروژه',
      right: {
        title: 'فرآیند و اسناد',
        items: [
          { label: 'سیاست جذب و استخدام' },
          { label: 'فرآیند End-to-End' },
          { label: 'Recruitment Workflow' },
          { label: 'فرم درخواست نیرو' },
          { label: 'استاندارد Job Requisition' },
          { label: 'مدل Sourcing' },
          { label: 'Screening Criteria' },
          { label: 'Interview Guide' },
        ],
      },
      left: {
        title: 'ابزار و سنجش',
        items: [
          { label: 'Structured Interview' },
          { label: 'Scorecard کاندیدا' },
          { label: 'مدل Assessment' },
          { label: 'Candidate Journey' },
          { label: 'Offer Process' },
          { label: 'Onboarding Connection' },
          { label: 'KPIهای جذب' },
          { label: 'داشبورد مدیریتی جذب' },
        ],
      },
    },
    {
      kind: 'radial',
      id: 'links',
      after: 'outputs',
      title: 'اتصال نظام جذب به سایر سیستم‌های HR',
      centre: 'جذب و استخدام',
      items: [
        { label: 'برنامه‌ریزی نیروی انسانی', icon: 'lucide:users-round' },
        { label: 'تجزیه و تحلیل شغل', icon: 'lucide:briefcase' },
        { label: 'مدل شایستگی', icon: 'lucide:star' },
        { label: 'برند کارفرمایی', icon: 'lucide:megaphone' },
        { label: 'جبران خدمت', icon: 'lucide:wallet' },
        { label: 'مدیریت عملکرد', icon: 'lucide:target' },
      ],
    },
  ],
};

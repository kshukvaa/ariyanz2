import type { ServiceDetailData } from '@/components/org/services/ServiceDetailPage';
import { systemsCrumbs } from './_systemsHero';

/* ──────────────────────────────────────────────────────────────
   تحلیل کفایت نیروی انسانی
   Source: «تحلیل کفایت نیروی امسانی.png»
   (the filename misspells «انسانی» — kept as-is so the mapping
   back to the source file stays findable)

   The page argues one thing: a headcount request is not evidence.
   Its opening equation strip — ۱۲ موجود → ۹ موردنیاز → ۳ نفر مازاد
   — is the whole thesis, so it sits above the problems rather
   than among the later diagrams.
────────────────────────────────────────────────────────────── */

export const workforceAdequacy: ServiceDetailData = {
  slug: 'workforce-adequacy',
  family: 'structure',
  navId: 'workforce',

  meta: {
    title: 'تحلیل کفایت نیروی انسانی | آریاز',
    description:
      'آریاز با تحلیل حجم کار، ظرفیت واقعی کارکنان، ساختار سازمانی و برنامه‌های آینده مشخص می‌کند هر واحد واقعاً به چند نفر و با چه ترکیبی از نیرو نیاز دارد.',
  },

  hero: {
    title: ['چند نفر نیرو واقعاً', 'برای انجام کار سازمان شما لازم است؟'],
    accentLines: [],
    desc: 'آریاز با تحلیل حجم کار، ظرفیت واقعی کارکنان، ساختار سازمانی و برنامه‌های آینده مشخص می‌کند هر واحد واقعاً به چند نفر و با چه ترکیبی از نیرو نیاز دارد.',
    primary: { label: 'درخواست تحلیل کفایت نیرو', icon: 'lucide:clipboard-check' },
    secondary: { label: 'مشاوره با متخصص', icon: 'lucide:users-round' },
    crumbs: systemsCrumbs('تحلیل کفایت نیروی انسانی'),
  },

  problems: {
    title: 'چه مسئله‌ای را حل می‌کنیم؟',
    cards: [
      {
        title: 'هزینه نیروی انسانی بالا رفته',
        desc: 'اما مشخص نیست مسئله از کمبود بهره‌وری است یا از ساختار نیرو.',
        icon: 'lucide:trending-up',
        fg: '#dc2326',
      },
      {
        title: 'سازمان در حال رشد است',
        desc: 'نمی‌دانیم رشد کسب‌وکار چه تعداد نیروی جدید نیاز دارد.',
        icon: 'lucide:trending-up',
        fg: '#24934b',
      },
      {
        title: 'نمی‌دانیم کجا مازاد نیرو داریم',
        desc: 'تعداد نیروها با حجم واقعی فعالیت‌ها مقایسه نشده است.',
        icon: 'lucide:users-round',
        fg: '#0547fe',
      },
      {
        title: 'مدیر واحد می‌گوید نیرو کم دارم',
        desc: 'اما مبنای عددی برای بررسی درخواست نداریم.',
        icon: 'lucide:user-round',
        fg: '#5d35fc',
      },
    ],
  },

  steps: {
    title: 'فرآیند اجرای پروژه',
    items: [
      { n: '۱', title: 'شناخت کسب‌وکار و فعالیت‌ها', lines: [], icon: 'lucide:search', fg: '#24934b' },
      { n: '۲', title: 'استخراج حجم فعالیت‌ها', lines: [], icon: 'lucide:file-text', fg: '#0547fe' },
      { n: '۳', title: 'محاسبه ظرفیت واقعی', lines: [], icon: 'lucide:clock', fg: '#fe7601' },
      { n: '۴', title: 'محاسبه نیروی موردنیاز', lines: [], icon: 'lucide:users-round', fg: '#5d35fc' },
      { n: '۵', title: 'تحلیل شکاف', lines: [], icon: 'lucide:trending-up', fg: '#dc2326' },
      { n: '۶', title: 'ارائه سناریوی اقدام', lines: [], icon: 'lucide:target', fg: '#24934b' },
    ],
  },

  agent: {
    title: 'واقعاً کمبود نیرو دارید؟',
    desc: 'دستیار هوشمند آریاز چند سوال از شما می‌پرسد و وضعیت اولیه سازمان را تحلیل می‌کند.',
    questions: [
      'چند نفر نیروی انسانی دارید؟',
      'کدام واحد درخواست نیروی جدید داده؟',
      'حجم کار واحد چقدر تغییر کرده؟',
      'اضافه‌کاری چقدر است؟',
      'برنامه رشد سازمان چیست؟',
    ],
    cta: 'شروع تحلیل اولیه',
  },

  form: {
    title: 'بدانید سازمان شما واقعاً به چند نفر نیرو نیاز دارد',
    desc: 'برای بررسی کفایت نیروی انسانی سازمان خود، اطلاعات زیر را وارد کنید تا کارشناسان آریاز با شما تماس بگیرند.',
    assurances: [],
    fields: [
      { label: 'نام سازمان' },
      { label: 'تعداد کارکنان' },
      { label: 'صنعت', kind: 'select' },
      { label: 'تعداد واحدها', kind: 'select' },
      { label: 'برنامه رشد سازمان', kind: 'select' },
      { label: 'مهم‌ترین چالش شما', kind: 'select' },
      { label: 'شماره تماس' },
    ],
    submit: 'درخواست تحلیل کفایت نیروی انسانی',
  },

  extras: [
    {
      kind: 'stats',
      id: 'thesis',
      after: 'intro',
      title: '«کمبود نیرو همیشه به معنی نیاز به استخدام نیست.»',
      items: [
        { value: '۱۲', label: 'نیروی موجود', fg: '#5d35fc' },
        { value: '۹', label: 'نیروی موردنیاز', sub: 'حجم کار + ظرفیت واقعی + بهره‌وری', fg: '#0547fe' },
        { value: '۳ نفر مازاد', label: 'شکاف', fg: '#fe7601' },
      ],
    },
    {
      kind: 'split',
      id: 'how-analysed',
      after: 'problems',
      title: 'آریاز کفایت نیرو را چگونه تحلیل می‌کند؟',
      right: {
        title: 'تقاضای نیروی انسانی',
        items: [
          { label: 'حجم کار' },
          { label: 'برنامه رشد' },
          { label: 'سطح خدمت مورد انتظار' },
        ],
      },
      left: {
        title: 'ظرفیت نیروی انسانی',
        items: [
          { label: 'تعداد کارکنان' },
          { label: 'زمان مفید' },
          { label: 'ظرفیت واقعی' },
        ],
      },
    },
    {
      kind: 'cards',
      id: 'result-states',
      after: 'problems',
      title: 'نتیجه تحلیل',
      items: [
        { label: 'متعادل', desc: 'نیروی کافی است', icon: 'lucide:circle-check', fg: '#24934b' },
        { label: 'کمبود نیرو', desc: 'نیاز به جذب یا جابه‌جایی', icon: 'lucide:users-round', fg: '#fe7601' },
        { label: 'مازاد نیرو', desc: 'امکان جابه‌جایی یا کاهش', icon: 'lucide:user-round', fg: '#dc2326' },
      ],
    },
    {
      kind: 'cards',
      id: 'methods',
      after: 'problems',
      title: 'روش‌های تحلیل',
      items: [
        {
          label: 'تحلیل حجم کار (Workload Analysis)',
          desc: 'بررسی حجم واقعی فعالیت‌ها و زمان موردنیاز',
          icon: 'lucide:chart-column',
          fg: '#24934b',
        },
        {
          label: 'تحلیل نسبت‌ها (Ratio Analysis)',
          desc: 'بررسی نسبت‌های منطقی نیرو در سازمان',
          icon: 'lucide:percent',
          fg: '#0547fe',
        },
        {
          label: 'تحلیل روند (Trend Analysis)',
          desc: 'تحلیل روند گذشته و تغییرات کسب‌وکار',
          icon: 'lucide:trending-up',
          fg: '#dc2326',
        },
        {
          label: 'تحلیل و بنچمارک تخصصی (Benchmark / Expert)',
          desc: 'استفاده از استانداردها و نظر متخصصان',
          icon: 'lucide:badge-check',
          fg: '#5d35fc',
        },
      ],
    },
    {
      kind: 'table',
      id: 'sample-result',
      after: 'steps',
      title: 'نمونه نتیجه تحلیل',
      cols: ['وضعیت', 'شکاف', 'نیروی موردنیاز', 'نیروی موجود', 'واحد'],
      rows: [
        ['کمبود', '+۴', '۳۲', '۲۸', 'فروش'],
        ['مازاد', '−۳', '۱۱', '۱۴', 'مالی'],
        ['متعادل', '۰', '۸', '۸', 'HR'],
        ['کمبود', '+۴', '۳۹', '۳۵', 'انبار'],
      ],
    },
    {
      kind: 'stats',
      id: 'sample-summary',
      after: 'steps',
      items: [
        { value: '۳', label: 'واحد متعادل', fg: '#24934b' },
        { value: '−۵', label: 'مازاد نیرو', fg: '#fe7601' },
        { value: '+۸', label: 'کمبود نیرو', fg: '#dc2326' },
      ],
    },
    {
      kind: 'list',
      id: 'deliverables',
      after: 'outputs',
      title: 'خروجی‌های پروژه',
      items: [
        { label: 'تعداد نیروی موردنیاز هر واحد' },
        { label: 'شکاف موجود و مطلوب' },
        { label: 'نقاط دارای مازاد نیرو' },
        { label: 'نقاط دارای کمبود نیرو' },
        { label: 'تحلیل ظرفیت کارکنان' },
        { label: 'سناریوی جذب یا جابه‌جایی' },
        { label: 'پیش‌بینی نیاز آینده' },
        { label: 'پیشنهاد بهبود بهره‌وری' },
      ],
    },
  ],
};

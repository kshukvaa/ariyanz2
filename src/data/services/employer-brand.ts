import type { ServiceDetailData } from '@/components/org/services/ServiceDetailPage';
import { systemsCrumbs } from './_systemsHero';

/* ══════════════════════════════════════════════════════════════
   ⚠ AUTHORED, NOT TRANSCRIBED

   No mockup exists for طراحی برند کارفرمایی — it appears in the
   service rail of its siblings but was never drawn. Every Persian
   string below was written to fill that gap, on explicit
   instruction, and is NOT from the design source.

   Written to the same six-move shape as its transcribed siblings.
   The argument the page makes: an employer brand is not a
   campaign, it is a promise the organisation can already keep —
   so the method starts by measuring what current employees
   actually say, not by writing slogans. That is why the EVP
   radial sits after the diagnosis rather than opening the page.

   It shares the brand family accent with طراحی نظام انگیزشی و
   تشویقی, and the two are genuinely coupled: the motivation
   system is what makes the EVP true rather than aspirational.

   Replace wholesale when the real mockup arrives.
══════════════════════════════════════════════════════════════ */

export const employerBrand: ServiceDetailData = {
  slug: 'employer-brand',
  family: 'brand',
  navId: 'employer-brand',

  meta: {
    title: 'طراحی برند کارفرمایی | آریاز',
    description:
      'ارزش پیشنهادی سازمان به کارکنان (EVP) را از آنچه امروز واقعاً تجربه می‌شود استخراج می‌کنیم و آن را به پیام، کانال و سنجه تبدیل می‌کنیم.',
  },

  hero: {
    title: [
      'برند کارفرمایی یک کمپین نیست؛',
      'وعده‌ای است که سازمان',
      'می‌تواند به آن عمل کند',
    ],
    accentLines: [1, 2],
    desc: 'آریاز ارزش پیشنهادی سازمان به کارکنان (EVP) را از تجربه واقعی امروز استخراج می‌کند، آن را به پیام و کانال تبدیل می‌کند و با شاخص می‌سنجد که آیا در بازار کار شنیده می‌شود یا نه.',
    primary: { label: 'درخواست ارزیابی برند کارفرمایی', icon: 'lucide:clipboard-check' },
    secondary: { label: 'مشاوره با متخصص', icon: 'lucide:users-round' },
    crumbs: systemsCrumbs('طراحی برند کارفرمایی'),
  },

  intro: {
    label: 'طراحی برند کارفرمایی',
    title: 'طراحی برند کارفرمایی',
    desc: 'اگر کارکنان فعلی نتوانند در یک جمله بگویند چرا اینجا می‌مانند، کاندیدا هم نمی‌تواند بگوید چرا باید بیاید. این خدمت از همان جمله شروع می‌کند.',
  },

  problems: {
    title: 'این خدمت چه مسئله‌ای را حل می‌کند؟',
    cards: [
      {
        title: 'کاندیدای مناسب جذب نمی‌شود',
        desc: 'آگهی دیده می‌شود اما دلیل روشنی برای انتخاب سازمان ارائه نمی‌کند.',
        icon: 'lucide:user-round',
        fg: '#5d35fc',
      },
      {
        title: 'نرخ پذیرش پیشنهاد همکاری پایین است',
        desc: 'کاندیدا تا مرحله آخر می‌آید و در انتها سازمان دیگری را انتخاب می‌کند.',
        icon: 'lucide:handshake',
        fg: '#dc2326',
      },
      {
        title: 'کارکنان فعلی روایت مشترکی ندارند',
        desc: 'هر کس دلیل متفاوتی برای ماندن می‌گوید و پیام واحدی شکل نمی‌گیرد.',
        icon: 'lucide:message-circle',
        fg: '#fe7601',
      },
      {
        title: 'آنچه می‌گوییم با آنچه تجربه می‌شود فاصله دارد',
        desc: 'وعده بیرونی از واقعیت داخلی جلو زده و همان شکاف، ماندگاری را کم می‌کند.',
        icon: 'lucide:scale',
        fg: '#0547fe',
      },
    ],
  },

  steps: {
    title: 'رویکرد آریاز در طراحی برند کارفرمایی',
    items: [
      {
        n: '۱',
        title: 'شنیدن وضعیت امروز',
        lines: ['نظرسنجی کارکنان فعلی', 'مصاحبه خروج و بازخورد کاندیدا'],
        icon: 'lucide:message-circle',
        fg: '#5d35fc',
      },
      {
        n: '۲',
        title: 'استخراج EVP',
        lines: ['شناسایی دلایل واقعی ماندن', 'تفکیک وعده قابل دفاع از آرزو'],
        icon: 'lucide:star',
        fg: '#24934b',
      },
      {
        n: '۳',
        title: 'طراحی پیام و کانال',
        lines: ['پیام‌های کلیدی به تفکیک پرسونا', 'نقشه کانال و تقویم محتوا'],
        icon: 'lucide:megaphone',
        fg: '#fe7601',
      },
      {
        n: '۴',
        title: 'اجرا و سنجش',
        lines: ['اجرای آزمایشی در یک مسیر جذب', 'سنجش با شاخص‌های مشخص'],
        icon: 'lucide:trending-up',
        fg: '#0547fe',
      },
    ],
  },

  outputs: {
    title: 'خروجی‌های پروژه',
    items: [
      { label: 'سند EVP سازمان', icon: 'lucide:star' },
      { label: 'پیام‌های کلیدی', icon: 'lucide:megaphone' },
      { label: 'پرسونای کاندیدا', icon: 'lucide:user-round' },
      { label: 'نقشه کانال‌ها', icon: 'lucide:workflow' },
      { label: 'تقویم محتوا', icon: 'lucide:calendar' },
      { label: 'شاخص‌های برند کارفرمایی', icon: 'lucide:gauge' },
    ],
  },

  agent: {
    title: 'ایجنت هوشمند برند کارفرمایی',
    desc: 'با چند سوال کوتاه مشخص می‌کنیم شکاف شما در جذب است، در پیام، یا در تجربه واقعی کارکنان.',
    questions: [
      'نرخ پذیرش پیشنهاد همکاری شما چقدر است؟',
      'کارکنان فعلی چرا می‌مانند؟',
      'کاندیداها از کجا با شما آشنا می‌شوند؟',
      'مصاحبه خروج انجام می‌دهید؟',
    ],
    cta: 'شروع ارزیابی برند کارفرمایی',
  },

  form: {
    title: 'وعده‌ای بسازید که سازمان بتواند به آن عمل کند',
    desc: 'برای بررسی وضعیت برند کارفرمایی سازمان خود، اطلاعات زیر را وارد کنید تا کارشناسان آریاز با شما تماس بگیرند.',
    assurances: ['بررسی رایگان', 'گزارش شکاف اولیه', 'کاملاً محرمانه'],
    fields: [
      { label: 'نام سازمان' },
      { label: 'تعداد کارکنان' },
      { label: 'تعداد استخدام سالانه' },
      { label: 'مهم‌ترین چالش جذب', kind: 'select' },
      { label: 'شماره تماس' },
    ],
    submit: 'درخواست بررسی برند کارفرمایی',
  },

  extras: [
    {
      kind: 'radial',
      id: 'evp-pillars',
      after: 'problems',
      title: 'ستون‌های ارزش پیشنهادی به کارکنان (EVP)',
      centre: 'EVP',
      items: [
        { label: 'کار معنادار', icon: 'lucide:target' },
        { label: 'رشد و مسیر شغلی', icon: 'lucide:trending-up' },
        { label: 'رهبری و مدیر مستقیم', icon: 'lucide:user-round' },
        { label: 'فرهنگ و همکاران', icon: 'lucide:users-round' },
        { label: 'جبران خدمت و مزایا', icon: 'lucide:wallet' },
        { label: 'انعطاف و تعادل', icon: 'lucide:clock' },
      ],
    },
    {
      kind: 'funnel',
      id: 'perception',
      after: 'steps',
      title: 'برند کارفرمایی کجا سنجیده می‌شود؟',
      items: [
        { label: 'آشنایی — چند نفر سازمان را می‌شناسند', value: 'Awareness', fg: '#5d35fc' },
        { label: 'جذابیت — چند نفر آن را گزینه می‌دانند', value: 'Attraction', fg: '#0547fe' },
        { label: 'اقدام — چند نفر درخواست می‌دهند', value: 'Application', fg: '#24934b' },
        { label: 'پذیرش — چند نفر پیشنهاد را قبول می‌کنند', value: 'Acceptance', fg: '#fe7601' },
        { label: 'ماندگاری — چند نفر می‌مانند', value: 'Retention', fg: '#dc2326' },
      ],
    },
    {
      kind: 'cards',
      id: 'promise-vs-reality',
      after: 'outputs',
      title: 'وعده باید با تجربه بخواند',
      items: [
        {
          label: 'وعده بدون تجربه',
          desc: 'جذب بالا می‌رود و ماندگاری پایین می‌آید؛ گران‌ترین حالت ممکن.',
          icon: 'lucide:triangle-alert',
          fg: '#dc2326',
        },
        {
          label: 'تجربه بدون وعده',
          desc: 'سازمان خوبی هستید و کسی نمی‌داند؛ هزینه جذب بالا می‌ماند.',
          icon: 'lucide:eye',
          fg: '#fe7601',
        },
        {
          label: 'وعده و تجربه هم‌راستا',
          desc: 'جذب ارزان‌تر، پذیرش بالاتر و ماندگاری پایدارتر.',
          icon: 'lucide:circle-check',
          fg: '#24934b',
        },
      ],
    },
  ],
};

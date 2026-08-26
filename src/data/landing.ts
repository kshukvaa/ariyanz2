/* ──────────────────────────────────────────────────────────────
   Ariyaz — landing page content
   All copy lives here; components stay presentational.
   Icon names are Iconify ids (lucide:*, mdi:*, ic:*).
   `slot` values are <ImageSlot> ids awaiting real artwork.
────────────────────────────────────────────────────────────── */

/* ── Header ─────────────────────────────────────────────────── */

export const topBar = {
  auth: { label: 'ورود / ثبت‌نام', href: '/support', icon: 'lucide:user-round' },
  online: { label: 'آنلاین هستیم', icon: 'lucide:message-circle' },
  chat: { label: 'واتساپ / چت آنلاین', href: '#', icon: 'ic:baseline-whatsapp' },
  phone: { label: '021-91017134', href: 'tel:02191017134', icon: 'lucide:phone' },
};

export const brand = {
  name: 'Ariyaz',
  tagline: 'رشد انسان‌ها، توانمندسازی سازمان‌ها',
  searchPlaceholder: 'جستجو در دوره‌ها، ابزارها، فرم‌ها و ...',
  ctaPrimary: { label: 'درخواست دوره آموزشی', href: '/courses', icon: 'lucide:graduation-cap' },
  ctaSecondary: { label: 'درخواست مشاوره سازمانی', href: '/org', icon: 'lucide:handshake' },
};

export interface MegaLink {
  label: string;
  href: string;
}

export interface MegaColumn {
  title: string;
  icon: string;
  /** Flat link list — used when the column has no sub-headings. */
  items: MegaLink[];
  /** Optional sub-headings; when present these replace `items`. */
  groups?: { title: string; items: MegaLink[] }[];
}

/** Card tile used by the card-style mega menu (see `NavItem.cards`). */
export interface MegaCard {
  icon: string;
  /** Overrides the default navy glyph — e.g. WhatsApp green. */
  iconColor?: string;
  title: string;
  desc: string;
  href: string;
}

export interface NavItem {
  id: string;
  label: string;
  icon: string;
  href: string;
  columns: MegaColumn[];
  /** When present the panel renders as icon cards instead of link columns. */
  cards?: MegaCard[];
  promo: { title: string; desc: string; cta: string; bg: string; slot?: string };
  features: { icon: string; text: string }[];
}

export const navItems: NavItem[] = [
  {
    id: 'free',
    label: 'رایگان اما کاربردی',
    icon: 'lucide:gift',
    href: '/library',
    columns: [
      {
        title: 'یادگیری رایگان',
        icon: 'lucide:play-circle',
        items: [],
        groups: [
          {
            title: 'ویدیوهای آموزشی رایگان',
            items: [
              { label: 'منابع انسانی', href: '/videos' },
              { label: 'مدیریت و رهبری', href: '/videos' },
              { label: 'مهارت‌های نرم', href: '/videos' },
            ],
          },
          {
            title: 'مقالات کاربردی',
            items: [
              { label: 'مقالات HR', href: '/articles' },
              { label: 'مقالات مهارت نرم', href: '/articles' },
              { label: 'تجربه‌های مدیریتی', href: '/articles' },
              { label: 'تحلیل‌های تخصصی', href: '/articles' },
            ],
          },
        ],
      },
      {
        title: 'ابزارهای حرفه‌ای رایگان',
        icon: 'lucide:wrench',
        items: [],
        groups: [
          {
            title: 'فرم‌ها و دستورالعمل‌ها',
            items: [
              { label: 'فرم‌های منابع انسانی', href: '/tools' },
              { label: 'چک‌لیست‌ها', href: '/tools' },
              { label: 'دستورالعمل‌های کاربردی', href: '/tools' },
            ],
          },
          {
            title: 'برنامه‌ها و ابزارها',
            items: [
              { label: 'فایل‌های اکسل', href: '/tools' },
              { label: 'قالب‌های آماده', href: '/tools' },
              { label: 'ابزارهای محاسباتی', href: '/salary-calculator' },
            ],
          },
          {
            title: 'ایجنت‌های رایگان',
            items: [
              { label: 'ایجنت‌های عمومی', href: '/agents' },
              { label: 'ایجنت‌های منابع انسانی', href: '/agents' },
              { label: 'ایجنت‌های مهارت نرم', href: '/agents' },
            ],
          },
        ],
      },
      {
        title: 'آزمون‌ها و منابع تخصصی',
        icon: 'lucide:clipboard-check',
        items: [],
        groups: [
          {
            title: 'تست‌ها و آزمون‌های استخدامی',
            items: [
              { label: 'تست‌های عمومی', href: '/exams' },
              { label: 'تست‌های تخصصی', href: '/exams' },
              { label: 'آزمون‌های روانشناسی', href: '/exams' },
            ],
          },
          {
            title: 'کتاب‌های تخصصی رایگان',
            items: [
              { label: 'کتاب‌های منابع انسانی', href: '/books' },
              { label: 'کتاب‌های مدیریت', href: '/books' },
              { label: 'کتاب‌های مهارت نرم', href: '/books' },
            ],
          },
          {
            title: 'قوانین تأمین اجتماعی و قانون کار',
            items: [
              { label: 'قانون تأمین اجتماعی', href: '/laws' },
              { label: 'قانون کار و آیین‌نامه‌ها', href: '/laws' },
              { label: 'بخشنامه‌ها و مصوبات', href: '/laws' },
            ],
          },
        ],
      },
    ],
    promo: {
      title: 'منابع هوشمند آریاز',
      desc: 'دانش، ابزار و منابع تخصصی برای رشد حرفه‌ای افراد و سازمان‌ها',
      cta: 'شروع یادگیری رایگان',
      bg: '#FDF4EC',
      slot: 'ar-mm-free',
    },
    features: [
      { icon: 'lucide:badge-check', text: 'محتوای تخصصی معتبر' },
      { icon: 'lucide:refresh-cw', text: 'منابع به‌روز HR' },
      { icon: 'lucide:wrench', text: 'ابزارهای آماده و کاربردی' },
      { icon: 'lucide:trending-up', text: 'مناسب رشد حرفه‌ای' },
    ],
  },
  {
    id: 'courses',
    label: 'دوره‌ها',
    icon: 'lucide:book-open',
    href: '/courses',
    columns: [
      {
        title: 'موضوعات آموزشی',
        icon: 'lucide:book-open',
        items: [],
        groups: [
          {
            title: 'منابع انسانی و سازمان',
            items: [
              { label: 'مدیریت منابع انسانی', href: '/courses' },
              { label: 'سیستم‌ها و فرآیندهای منابع انسانی', href: '/courses' },
              { label: 'اداری و کارگزینی', href: '/courses' },
            ],
          },
          {
            title: 'مدیریت و رهبری',
            items: [
              { label: 'مدیران تازه‌وارد', href: '/courses' },
              { label: 'مدیریت تیم', href: '/courses' },
              { label: 'رهبری سازمانی', href: '/courses' },
            ],
          },
          {
            title: 'مهارت‌های فردی و حرفه‌ای',
            items: [
              { label: 'مدیریت بر خود', href: '/courses' },
              { label: 'ارتباطات بین‌فردی', href: '/courses' },
              { label: 'اخلاق حرفه‌ای', href: '/courses' },
            ],
          },
        ],
      },
      {
        title: 'انتخاب مسیر یادگیری',
        icon: 'lucide:crosshair',
        items: [
          { label: 'مسیرهای آموزشی', href: '/learning-paths' },
          { label: 'مسیر توسعه منابع انسانی', href: '/learning-paths' },
          { label: 'مسیر مدیریت و رهبری', href: '/learning-paths' },
          { label: 'مسیر توسعه مهارت‌های فردی', href: '/learning-paths' },
        ],
      },
      {
        title: 'خدمات آموزشی',
        icon: 'lucide:calendar-days',
        items: [
          { label: 'تقویم آموزشی', href: '/courses' },
          { label: 'استعلام گواهینامه‌ها', href: '/support' },
          { label: 'پرسش‌های متداول دوره‌ها', href: '/support' },
          { label: 'قوانین ثبت‌نام', href: '/laws' },
        ],
      },
    ],
    promo: {
      title: 'مهارت‌هایی\nبرای دنیای واقعی',
      desc: 'مهارت‌هایی یادبگیرید که در مسیر حرفه‌ای شما اثر واقعی ایجاد کند',
      cta: 'مشاهده دوره‌ها',
      bg: '#FDF4EC',
      slot: 'ar-mm-courses',
    },
    features: [
      { icon: 'lucide:user-round', text: 'مناسب رشد حرفه‌ای' },
      { icon: 'lucide:book-open', text: 'محتوای تخصصی و به‌روز' },
      { icon: 'lucide:route', text: 'مسیرهای یادگیری مشخص' },
      { icon: 'lucide:badge-check', text: 'آموزش کاربردی و نتیجه‌محور' },
    ],
  },
  {
    id: 'org',
    label: 'خدمات سازمانی',
    icon: 'lucide:building-2',
    href: '/org',
    columns: [
      {
        title: 'پنل سازمانی',
        icon: 'lucide:layout-dashboard',
        items: [
          { label: 'داشبورد سازمانی', href: '/org/dashboard' },
          { label: 'کارکنان و ساختار سازمانی', href: '/org/employees' },
          { label: 'ارزیابی‌های سازمان', href: '/org/dashboard#evaluations' },
        ],
      },
      {
        title: 'خدمات برون‌سپاری',
        icon: 'lucide:cog',
        items: [
          { label: 'برون‌سپاری جذب و استخدام', href: '/org' },
          { label: 'برون‌سپاری کارکرد HR، بیمه و مالیات حقوق', href: '/org' },
          { label: 'برون‌سپاری واحد منابع انسانی (ویژه شرکت‌های کوچک)', href: '/org' },
        ],
      },
      {
        title: 'طراحی سیستم‌های HR',
        icon: 'lucide:puzzle',
        items: [
          { label: 'طراحی سازمان و ساختار سازمانی', href: '/org' },
          { label: 'طراحی و استقرار فرآیندهای منابع انسانی', href: '/org' },
          { label: 'طراحی نظام‌های انگیزشی و برند کارفرمایی', href: '/org' },
        ],
      },
      {
        title: 'مشاوره‌های سازمانی',
        icon: 'lucide:lightbulb',
        items: [
          { label: 'مشاوره تخصصی منابع انسانی', href: '/org' },
          { label: 'مشاوره تخصصی تأمین اجتماعی', href: '/org' },
          { label: 'مشاوره تخصصی اداره کار', href: '/org' },
        ],
      },
    ],
    promo: {
      title: 'از مسئله تا راهکار',
      desc: 'مسائل منابع انسانی خود را با راهکارهای تخصصی حل کنید',
      cta: 'درخواست مشاوره',
      bg: '#FDF4EC',
      slot: 'ar-mm-org',
    },
    features: [
      { icon: 'lucide:users-round', text: 'متخصصان منابع انسانی' },
      { icon: 'lucide:handshake', text: 'همراهی از طراحی تا اجرا' },
      { icon: 'lucide:crosshair', text: 'راهکارهای متناسب با نیاز شما' },
      { icon: 'lucide:badge-check', text: 'تجربه عملی در سازمان‌ها' },
    ],
  },
  {
    id: 'tools',
    label: 'فرم‌ها و ابزارها',
    icon: 'mdi:toolbox-outline',
    href: '/tools',
    columns: [
      {
        title: 'فرم‌ها و مستندات',
        icon: 'lucide:file-text',
        items: [
          { label: 'دستورالعمل‌های اجرایی', href: '/tools' },
          { label: 'فرم‌های کاربردی', href: '/tools' },
          { label: 'چک‌لیست‌ها', href: '/tools' },
        ],
      },
      {
        title: 'ابزارهای کاربردی',
        icon: 'lucide:sliders-horizontal',
        items: [
          { label: 'اکسل‌های محاسباتی', href: '/tools' },
          { label: 'داشبوردها و قالب‌های مدیریتی', href: '/tools' },
          { label: 'بوم‌ها (Canvas)', href: '/tools' },
        ],
      },
      {
        title: 'آزمون‌ها و پرسشنامه‌ها',
        icon: 'lucide:clipboard-check',
        items: [
          { label: 'تست‌های شخصیت و رفتار', href: '/exams' },
          { label: 'پرسشنامه‌های سازمانی', href: '/exams' },
          { label: 'تست‌های رهبری', href: '/exams' },
          { label: 'آزمون‌های استخدامی', href: '/exams' },
        ],
      },
    ],
    promo: {
      title: 'ابزارهایی که\nکار را ساده‌تر می‌کنند',
      desc: 'مجموعه‌ای از فرم‌ها، ابزارها و الگوهای آماده برای اجرای حرفه‌ای فرآیندهای منابع انسانی.',
      cta: 'مشاهده ابزارها',
      bg: '#FDF4EC',
      slot: 'ar-mm-tools',
    },
    features: [
      { icon: 'lucide:circle-check', text: 'آماده استفاده' },
      { icon: 'lucide:file-pen-line', text: 'قابل ویرایش و شخصی‌سازی' },
      { icon: 'lucide:users-round', text: 'طراحی‌شده بر اساس تجربه واقعی' },
      { icon: 'lucide:clock', text: 'صرفه‌جویی در زمان اجرای کارها' },
    ],
  },
  {
    id: 'agents',
    label: 'ایجنت‌ها',
    icon: 'lucide:bot',
    href: '/agents',
    columns: [
      {
        title: 'ایجنت‌های عمومی و سازمانی',
        icon: 'lucide:bot',
        items: [
          { label: 'دستیارهای عمومی', href: '/agents' },
          { label: 'تحلیل و خلاصه‌سازی اطلاعات', href: '/agents' },
          { label: 'گزارش‌نویسی و تولید محتوا', href: '/agents' },
          { label: 'برنامه‌ریزی و تصمیم‌یارها', href: '/agents' },
        ],
      },
      {
        title: 'ایجنت‌های تخصصی منابع انسانی',
        icon: 'lucide:bot',
        items: [
          { label: 'ایجنت‌های توسعه منابع انسانی', href: '/agents' },
          { label: 'ایجنت‌های تحلیل‌گری منابع انسانی', href: '/agents' },
          { label: 'ایجنت‌های اداری و کارگزینی', href: '/agents' },
        ],
      },
      {
        title: 'ایجنت‌های توسعه فردی و رهبری',
        icon: 'lucide:bot',
        items: [
          { label: 'توسعه مهارت‌های نرم', href: '/agents' },
          { label: 'کوچینگ و خودشناسی', href: '/agents' },
          { label: 'مدیریت و رهبری', href: '/agents' },
          { label: 'ارتباطات حرفه‌ای', href: '/agents' },
        ],
      },
    ],
    promo: {
      title: 'ایجنت متناسب با\nنیاز شما',
      desc: 'ایجنت اختصاصی خود را متناسب با فرآیندها، داده‌ها و نیازهای واقعی سازمان طراحی کنید.',
      cta: 'درخواست ایجنت سفارشی',
      bg: '#FDF4EC',
      slot: 'ar-mm-agents',
    },
    features: [
      { icon: 'lucide:circle-check', text: 'آماده استفاده' },
      { icon: 'lucide:sliders-horizontal', text: 'قابل سفارشی‌سازی' },
      { icon: 'lucide:crosshair', text: 'متناسب با فرآیندهای واقعی' },
      { icon: 'lucide:handshake', text: 'همراهی از طراحی تا استقرار' },
    ],
  },
  {
    id: 'shop',
    label: 'فروشگاه',
    icon: 'lucide:shopping-cart',
    href: '/master-list',
    columns: [
      {
        title: 'پیشنهادهای ویژه',
        icon: 'lucide:tag',
        items: [
          { label: 'جدیدترین محصولات', href: '/master-list' },
          { label: 'پرفروش‌ترین محصولات', href: '/master-list' },
          { label: 'محصولات منتخب آریاز', href: '/master-list' },
          { label: 'تخفیف‌ها و پیشنهادهای ویژه', href: '/master-list' },
        ],
      },
      {
        title: 'بسته‌های حرفه‌ای',
        icon: 'lucide:layers',
        items: [
          { label: 'بسته‌های منابع انسانی', href: '/master-list' },
          { label: 'بسته‌های مدیریتی', href: '/master-list' },
          { label: 'بسته‌های توسعه فردی', href: '/master-list' },
          { label: 'بسته‌های سازمانی', href: '/master-list' },
        ],
      },
      {
        title: 'راهنمای خرید',
        icon: 'lucide:circle-help',
        items: [
          { label: 'مقایسه محصولات', href: '/master-list' },
          { label: 'سوالات متداول', href: '/support' },
          { label: 'شرایط خرید و دانلود', href: '/support' },
          { label: 'پشتیبانی خرید', href: '/support' },
        ],
      },
    ],
    promo: {
      title: 'همه محصولات آریاز، یکجا',
      desc: 'از دوره‌ها و ابزارها تا ایجنت‌های هوشمند و بسته‌های تخصصی؛ هر آنچه برای توسعه فردی و سازمانی نیاز دارید.',
      cta: 'ورود به فروشگاه',
      bg: '#FDF4EC',
      slot: 'ar-mm-shop',
    },
    features: [
      { icon: 'lucide:shield-check', text: 'خرید امن و آسان' },
      { icon: 'lucide:download', text: 'دانلود و دسترسی سریع' },
      { icon: 'lucide:refresh-cw', text: 'به‌روزرسانی مستمر محصولات' },
      { icon: 'lucide:headphones', text: 'پشتیبانی تخصصی قبل و بعد از خرید' },
    ],
  },
  {
    id: 'membership',
    label: 'اشتراک',
    icon: 'lucide:crown',
    href: '/master-list',
    columns: [
      {
        title: 'پلن‌های اشتراک',
        icon: 'lucide:ticket',
        items: [
          { label: 'اشتراک فردی', href: '/master-list' },
          { label: 'اشتراک حرفه‌ای', href: '/master-list' },
          { label: 'اشتراک سازمانی', href: '/org' },
          { label: 'مقایسه پلن‌ها', href: '/master-list' },
        ],
      },
      {
        title: 'امکانات اشتراک',
        icon: 'lucide:infinity',
        items: [
          { label: 'دسترسی نامحدود به دوره‌ها', href: '/courses' },
          { label: 'دسترسی به ایجنت‌ها', href: '/agents' },
          { label: 'دسترسی به فرم‌ها و ابزارها', href: '/tools' },
          { label: 'دسترسی به به‌روزرسانی‌ها', href: '/master-list' },
        ],
      },
      {
        title: 'خدمات ویژه اعضا',
        icon: 'lucide:star',
        items: [
          { label: 'وبینارهای اختصاصی', href: '/courses' },
          { label: 'انجمن اعضا', href: '/support' },
          { label: 'مشاوره ویژه اعضا', href: '/org' },
          { label: 'پشتیبانی اختصاصی', href: '/support' },
        ],
      },
    ],
    promo: {
      title: 'همیشه یک قدم جلوتر باشید',
      desc: 'با اشتراک آریاز به جدیدترین دوره‌ها، ابزارها، ایجنت‌ها و خدمات اختصاصی دسترسی داشته باشید.',
      cta: 'مشاهده پلن‌های اشتراک',
      bg: '#FDF4EC',
      slot: 'ar-mm-membership',
    },
    features: [
      { icon: 'lucide:infinity', text: 'دسترسی نامحدود به محتوای تخصصی' },
      { icon: 'lucide:wallet', text: 'صرفه‌جویی در هزینه‌های یادگیری' },
      { icon: 'lucide:refresh-cw', text: 'به‌روزرسانی مستمر محتوا و ابزارها' },
      { icon: 'lucide:award', text: 'خدمات و مزایای اختصاصی اعضای آریاز' },
    ],
  },
  {
    id: 'salary',
    label: 'ماشین حساب حقوق',
    icon: 'lucide:calculator',
    href: '/salary-calculator',
    columns: [
      {
        title: 'محاسبه حقوق',
        icon: 'lucide:calculator',
        items: [
          { label: 'حقوق و مزایای پایه', href: '/salary-calculator' },
          { label: 'اضافه‌کاری و نوبت‌کاری', href: '/salary-calculator' },
          { label: 'عیدی، سنوات و مرخصی', href: '/salary-calculator' },
        ],
      },
      {
        title: 'کسورات قانونی',
        icon: 'lucide:gauge',
        items: [
          { label: 'بیمه تأمین اجتماعی', href: '/salary-calculator' },
          { label: 'مالیات بر حقوق', href: '/salary-calculator' },
          { label: 'بیمه تکمیلی', href: '/salary-calculator' },
        ],
      },
      {
        title: 'قوانین مرتبط',
        icon: 'lucide:file-text',
        items: [
          { label: 'قانون کار', href: '/laws' },
          { label: 'قوانین تأمین اجتماعی', href: '/laws' },
          { label: 'بخشنامه‌های حقوق و دستمزد', href: '/laws' },
        ],
      },
    ],
    promo: {
      title: 'محاسبه دقیق حقوق و مزایا',
      desc: 'خروجی قابل استناد، مطابق آخرین بخشنامه‌ها',
      cta: 'ورود به ماشین حساب',
      bg: '#ECFEFF',
    },
    features: [
      { icon: 'lucide:zap', text: 'محاسبه لحظه‌ای' },
      { icon: 'lucide:badge-check', text: 'مطابق قانون کار' },
      { icon: 'lucide:download', text: 'خروجی قابل دانلود' },
      { icon: 'lucide:circle-help', text: 'راهنمای گام‌به‌گام' },
    ],
  },
  {
    id: 'support',
    label: 'پشتیبانی',
    icon: 'lucide:headphones',
    href: '/support',
    columns: [
      {
        title: 'کانال‌های ارتباطی',
        icon: 'lucide:messages-square',
        items: [
          { label: 'چت آنلاین', href: '/support' },
          { label: 'واتساپ', href: '#' },
          { label: 'تماس تلفنی', href: 'tel:02191017134' },
        ],
      },
      {
        title: 'راهنما و آموزش',
        icon: 'lucide:circle-help',
        items: [
          { label: 'پرسش‌های متداول', href: '/support' },
          { label: 'راهنمای خرید', href: '/support' },
          { label: 'راهنمای استفاده از ابزارها', href: '/tools' },
        ],
      },
      {
        title: 'حساب کاربری',
        icon: 'lucide:user-round',
        items: [
          { label: 'ورود / ثبت‌نام', href: '/support' },
          { label: 'سفارش‌های من', href: '/support' },
          { label: 'تیکت پشتیبانی', href: '/support' },
        ],
      },
    ],
    /* Reads right-to-left: تالار گفتگو ← … ← تیکت */
    cards: [
      {
        icon: 'lucide:users-round',
        title: 'تالار گفتگو',
        desc: 'سوال بپرسید و با دیگران\nتجربه‌ها را به اشتراک بگذارید.',
        href: '/support',
      },
      {
        icon: 'lucide:circle-help',
        title: 'پرسش‌های متداول',
        desc: 'پاسخ سوالات رایج خود را\nدر این بخش بیابید.',
        href: '/support',
      },
      {
        icon: 'ic:baseline-whatsapp',
        iconColor: '#25D366',
        title: 'واتساپ',
        desc: 'از طریق واتساپ سریع‌تر\nبا ما در ارتباط باشید.',
        href: '#',
      },
      {
        icon: 'lucide:message-circle-more',
        title: 'چت آنلاین',
        desc: 'با کارشناسان ما به صورت\nآنلاین گفتگو کنید.',
        href: '/support',
      },
      {
        icon: 'lucide:ticket',
        iconColor: '#F97316',
        title: 'تیکت',
        desc: 'درخواست خود را ثبت کنید\nو پیگیری نمایید.',
        href: '/support',
      },
    ],
    promo: {
      title: 'ما در کنار شما هستیم',
      desc: 'از طریق کانال‌های مختلف با کارشناسان آریاز در ارتباط باشید؛ سریع، ساده و در دسترس.',
      cta: 'ورود به صفحه پشتیبانی',
      bg: '#FDF3EA',
      slot: 'ar-mm-support',
    },
    features: [
      { icon: 'lucide:headphones', text: 'پاسخگویی سریع\nدر کوتاه‌ترین زمان' },
      { icon: 'lucide:shield-check', text: 'پشتیبانی حرفه‌ای\nتوسط کارشناسان متخصص' },
      { icon: 'lucide:clock', text: 'در دسترس\nدر هر زمان و مکان' },
      { icon: 'lucide:lock', text: 'اطمینان و امنیت\nاطلاعات شما محفوظ است' },
    ],
  },
];

/* ── 1. Hero carousel ───────────────────────────────────────── */

export const heroSlides = [
  {
    id: 'slide-1',
    kicker: 'پلتفرم یکپارچه توسعه منابع انسانی',
    title: 'رشد انسان‌ها، توانمندسازی سازمان‌ها',
    subtitle: 'پلتفرم یکپارچه توسعه منابع انسانی، رهبری، مهارت‌های نرم و تحول سازمانی',
    desc: 'یادگیری، توسعه، ابزارهای حرفه‌ای، کوچینگ و راهکارهای سازمانی؛ همه در یک اکوسیستم هوشمند',
    ctas: [
      { label: 'درخواست مشاوره سازمانی', href: '/org', primary: true, icon: 'lucide:handshake' },
      { label: 'شروع یادگیری', href: '/courses', primary: false, icon: 'lucide:play-circle' },
    ],
    agentCards: [
      { title: 'ایجنت‌های عمومی سازمان', icon: 'lucide:building-2' },
      { title: 'منابع انسانی', icon: 'lucide:users-round' },
      { title: 'مهارت نرم', icon: 'lucide:smile' },
      { title: 'سفارشی سازمانی', icon: 'lucide:puzzle' },
    ],
    slot: 'ar-hero-1',
    slotLabel: 'تصویر اسلاید ۱ — اکوسیستم آریاز با پنج حوزه رشد',
  },
  {
    id: 'slide-2',
    kicker: 'مسیرهای یادگیری آریاز',
    title: 'مسیر رشد حرفه‌ای خود را بسازید',
    subtitle: 'از انتخاب هدف تا تسلط بر مهارت؛ گام‌به‌گام و با پیگیری پیشرفت',
    desc: 'مسیرهای یادگیری آریاز شما را از نقطه‌ای که هستید به جایی که می‌خواهید باشید می‌رساند',
    tiles: [
      { title: 'دوره‌های تخصصی', icon: 'lucide:graduation-cap' },
      { title: 'مهارت‌های نرم', icon: 'lucide:messages-square' },
      { title: 'رهبری و مدیریت', icon: 'lucide:crown' },
      { title: 'کوچینگ و منتورینگ', icon: 'lucide:mic' },
    ],
    ctas: [
      { label: 'شروع مسیر یادگیری', href: '/learning-paths', primary: true, icon: 'lucide:route' },
      { label: 'مشاهده دوره‌ها', href: '/courses', primary: false, icon: 'lucide:book-open' },
    ],
    slot: 'ar-hero-2',
    slotLabel: 'تصویر اسلاید ۲ — پله‌های مسیر رشد حرفه‌ای با ۴ مرحله',
  },
  {
    id: 'slide-3',
    kicker: 'هوش مصنوعی در خدمت منابع انسانی',
    title: 'ایجنت‌های هوشمند آریاز؛ دستیاران دیجیتال شما',
    subtitle: 'ایجنت‌هایی که فرآیندهای تکراری را برمی‌دارند تا تیم شما روی کار مهم تمرکز کند',
    desc: 'از طراحی KPI تا تحلیل نظرسنجی کارکنان؛ همه با یک دستیار هوشمند',
    traits: [
      { title: 'قابل سفارشی‌سازی', icon: 'lucide:sliders-horizontal' },
      { title: '۲۴/۷ در دسترس', icon: 'lucide:clock' },
      { title: 'سریع و دقیق', icon: 'lucide:zap' },
      { title: 'امن و قابل اعتماد', icon: 'lucide:shield-check' },
    ],
    /* Glass cards that float around the 3D robot */
    robotCards: [
      { title: 'ایجنت‌های عمومی سازمان', icon: 'lucide:building-2' },
      { title: 'منابع انسانی', icon: 'lucide:users-round' },
      { title: 'مهارت نرم', icon: 'lucide:smile' },
      { title: 'سفارشی سازمانی', icon: 'lucide:puzzle' },
    ],
    ctas: [
      { label: 'درخواست ایجنت سفارشی', href: '/agents', primary: true, icon: 'lucide:bot' },
      { label: 'مشاهده ایجنت‌ها', href: '/agents', primary: false, icon: 'lucide:arrow-left' },
    ],
    slot: 'ar-hero-3',
    slotLabel: 'تصویر اسلاید ۳ — ربات دستیار هوشمند با کارت‌های ایجنت',
  },
  {
    /* Two-tone headline; tiles stack icon over a two-line label. */
    id: 'slide-4',
    variant: 'growth',
    titleTop: 'مسیر رشد',
    titleAccent: 'حرفه‌ای خود را بسازید',
    desc: 'با مسیرهای یادگیری، دوره‌های تخصصی، کوچینگ و ابزارهای توسعه فردی، توانمندی‌های خود را مرحله‌به‌مرحله ارتقا دهید.',
    tiles: [
      { title: 'دوره‌های\nتخصصی', icon: 'lucide:graduation-cap' },
      { title: 'مهارت‌های\nنرم', icon: 'lucide:users-round' },
      { title: 'رهبری و\nمدیریت', icon: 'lucide:bar-chart-3' },
      { title: 'کوچینگ و\nمنتورینگ', icon: 'lucide:messages-square' },
    ],
    ctas: [
      { label: 'شروع مسیر یادگیری', href: '/learning-paths', primary: true, icon: 'lucide:arrow-left' },
      { label: 'مشاهده دوره‌ها', href: '/courses', primary: false, icon: 'lucide:arrow-left' },
    ],
    slot: 'ar-hero-2',
    slotLabel: 'تصویر اسلاید ۴ — پله‌های مسیر رشد با چهار مرحله',
  },
];

/* Mobile hero proof stats (replaces the 3D robot on small screens) */
export const heroMobileStats = [
  { value: '+۱۲۰', label: 'سازمان همکار' },
  { value: '+۲۵۰K', label: 'مدیر و کارمند' },
  { value: '۹۸٪', label: 'رضایت مشتریان' },
];

/* ── 2. Topic finder ────────────────────────────────────────── */

export const topicsHeading = {
  title: 'به دنبال چه موضوعی در آریاز هستید؟',
  desc: 'موضوع مورد نظر خود را انتخاب کنید تا سریع‌تر به محتوای دلخواهتان برسید.',
};

export const topics = [
  {
    id: 'hr',
    title: 'منابع انسانی و سازمان',
    desc: 'برای متخصصان منابع انسانی و مدیران HR',
    icon: 'lucide:users-round',
    color: '#F97316',
    bg: '#FFF7ED',
    items: ['سیستم‌های منابع انسانی', 'جذب و استخدام', 'عملکرد و جبران خدمات'],
    href: '/org',
  },
  {
    id: 'lead',
    title: 'مدیریت و رهبری',
    desc: 'برای مدیران و رهبران سازمان',
    icon: 'lucide:flag',
    color: '#2563EB',
    bg: '#EFF6FF',
    items: ['مدیریت تیم', 'رهبری سازمانی', 'توسعه مدیران'],
    href: '/learning-paths',
  },
  {
    id: 'skills',
    title: 'مهارت‌های فردی و حرفه‌ای',
    desc: 'برای رشد فردی و موفقیت شغلی',
    icon: 'lucide:user-round-cog',
    color: '#059669',
    bg: '#ECFDF5',
    items: ['ارتباطات', 'مذاکره', 'مدیریت زمان'],
    href: '/courses',
  },
  {
    id: 'ai',
    title: 'هوش مصنوعی و ایجنت‌ها',
    desc: 'برای هوشمندسازی کارها و فرآیندها',
    icon: 'lucide:bot',
    color: '#7C3AED',
    bg: '#FAF5FF',
    items: ['ایجنت‌های سازمانی', 'ابزارهای هوشمند', 'اتوماسیون کارها'],
    href: '/agents',
  },
  {
    id: 'tools',
    title: 'ابزارها و منابع کاربردی',
    desc: 'برای اجرای سریع‌تر و حرفه‌ای‌تر',
    icon: 'mdi:toolbox-outline',
    color: '#0891B2',
    bg: '#ECFEFF',
    items: ['فرم‌ها', 'چک‌لیست‌ها', 'قالب‌ها و داشبوردها'],
    href: '/tools',
  },
  {
    id: 'services',
    title: 'خدمات سازمانی',
    desc: 'برای حل مسائل واقعی کسب‌وکار',
    icon: 'lucide:handshake',
    color: '#E11D48',
    bg: '#FFF1F2',
    items: ['طراحی سیستم‌ها', 'مشاوره HR', 'برون‌سپاری'],
    href: '/org',
  },
];

export const topicsCtaLabel = 'مشاهده موضوعات';

/* ── 3. Partners ────────────────────────────────────────────── */

export const partnersHeading = {
  title: 'سازمان‌هایی که با آریاز همکاری کرده‌اند',
  desc: 'همراه سازمان‌ها در طراحی سیستم‌های منابع انسانی، توسعه مدیران و تحول سازمانی',
};

export interface Partner {
  id: string;
  label: string;
  /** Logo artwork slot. */
  slot: string;
  /** Case study shown when this brand is selected in the carousel. */
  case: {
    title: string;
    slot: string;
    slotLabel: string;
    /** One-paragraph outline of what was delivered. */
    summary: string;
    field: string;
    service: string;
    duration: string;
    year: string;
  };
}

export const partners: Partner[] = [
  {
    id: 'golrang',
    label: 'گلرنگ',
    slot: 'ar-logo-golrang',
    case: {
      title: 'طراحی مسیر شغلی و جانشین‌پروری',
      summary: 'طراحی مسیر شغلی و نظام جانشین‌پروری برای سطوح کلیدی سازمان، شامل شناسایی نقش‌های حساس، تدوین معیارهای آمادگی و برنامه توسعه فردی جانشینان.',
      slot: 'ar-case-golrang',
      slotLabel: 'تصویر پروژه گلرنگ — مجتمع صنعتی',
      field: 'منابع انسانی',
      service: 'طراحی مسیر شغلی و نظام جانشین‌پروری',
      duration: '۸ ماه',
      year: '۱۴۰۲',
    },
  },
  {
    id: 'mellat-ins',
    label: 'بیمه ملت',
    slot: 'ar-logo-mellat-ins',
    case: {
      title: 'استقرار نظام مدیریت عملکرد',
      summary: 'طراحی و استقرار نظام ارزیابی عملکرد مبتنی بر شاخص‌های کلیدی، همراه با آموزش مدیران و پیاده‌سازی چرخه بازخورد دوره‌ای در کل سازمان.',
      slot: 'ar-case-mellat-ins',
      slotLabel: 'تصویر پروژه بیمه ملت — ساختمان مرکزی',
      field: 'مدیریت عملکرد',
      service: 'طراحی و استقرار نظام ارزیابی عملکرد',
      duration: '۵ ماه',
      year: '۱۴۰۳',
    },
  },
  {
    id: 'baraka',
    label: 'بارکا',
    slot: 'ar-logo-baraka',
    case: {
      title: 'بازطراحی فرآیند جذب و استخدام',
      summary: 'بازطراحی فرآیند جذب از انتشار آگهی تا مصاحبه ساختاریافته و تصمیم نهایی، با هدف کوتاه‌تر شدن زمان استخدام و بهبود کیفیت انتخاب.',
      slot: 'ar-case-baraka',
      slotLabel: 'تصویر پروژه بارکا — کارخانه و دفتر مرکزی',
      field: 'جذب و استخدام',
      service: 'بازطراحی فرآیند جذب و مصاحبه ساختاریافته',
      duration: '۳ ماه',
      year: '۱۴۰۴',
    },
  },
  {
    id: 'sunich',
    label: 'سن‌ایچ',
    slot: 'ar-logo-sunich',
    case: {
      title: 'طراحی نظام جبران خدمات',
      summary: 'طراحی و استقرار نظام جبران خدمات شامل ساختار حقوق و مزایا، طبقه‌بندی شغلی و مدل پرداخت عملکرد با رویکرد رقابت‌پذیری و افزایش انگیزش سازمانی.',
      slot: 'ar-case-sunich',
      slotLabel: 'تصویر پروژه سن‌ایچ — لابی دفتر مرکزی',
      field: 'منابع انسانی',
      service: 'طراحی سیستم‌های جبران خدمات',
      duration: '۴ ماه',
      year: '۱۴۰۳',
    },
  },
  {
    id: 'snapp',
    label: 'اسنپ',
    slot: 'ar-logo-snapp',
    case: {
      title: 'توسعه مهارت‌های رهبری مدیران میانی',
      summary: 'برنامه توسعه رهبری و کوچینگ مدیران میانی با ترکیبی از کارگاه‌های عملی، تمرین‌های میدانی و جلسات کوچینگ فردی در طول مسیر.',
      slot: 'ar-case-snapp',
      slotLabel: 'تصویر پروژه اسنپ — فضای کار تیم‌ها',
      field: 'آموزش و توسعه',
      service: 'برنامه توسعه رهبری و کوچینگ مدیران',
      duration: '۶ ماه',
      year: '۱۴۰۴',
    },
  },
  {
    id: 'mellat',
    label: 'بانک ملت',
    slot: 'ar-logo-mellat',
    case: {
      title: 'طراحی مدل شایستگی و کانون ارزیابی',
      summary: 'طراحی مدل شایستگی سازمانی و اجرای کانون ارزیابی برای انتخاب و توسعه مدیران، همراه با تدوین گزارش‌های توسعه فردی برای هر شرکت‌کننده.',
      slot: 'ar-case-mellat',
      slotLabel: 'تصویر پروژه بانک ملت — ساختمان مرکزی',
      field: 'ارزیابی و سنجش',
      service: 'طراحی مدل شایستگی و اجرای کانون ارزیابی',
      duration: '۷ ماه',
      year: '۱۴۰۲',
    },
  },
  {
    id: 'digikala',
    label: 'دیجی‌کالا',
    slot: 'ar-logo-digikala',
    case: {
      title: 'استقرار داشبورد شاخص‌های منابع انسانی',
      summary: 'طراحی و پیاده‌سازی داشبورد شاخص‌های منابع انسانی برای پایش لحظه‌ای جذب، نگهداشت و عملکرد، و تبدیل داده‌های پراکنده به تصمیم‌های روشن.',
      slot: 'ar-case-digikala',
      slotLabel: 'تصویر پروژه دیجی‌کالا — دفتر مرکزی',
      field: 'تحلیل داده منابع انسانی',
      service: 'طراحی و پیاده‌سازی داشبورد شاخص‌های HR',
      duration: '۴ ماه',
      year: '۱۴۰۴',
    },
  },
  {
    id: 'melli',
    label: 'بانک ملی',
    slot: 'ar-logo-melli',
    case: {
      title: 'برنامه توسعه مدیران شعب',
      summary: 'طراحی و اجرای برنامه توسعه مدیران شعب با تمرکز بر مهارت‌های رهبری، مدیریت تیم و تجربه مشتری، متناسب با شرایط واقعی شبکه شعب.',
      slot: 'ar-case-melli',
      slotLabel: 'تصویر پروژه بانک ملی — ساختمان شعبه مرکزی',
      field: 'آموزش سازمانی',
      service: 'طراحی و اجرای برنامه توسعه مدیران شعب',
      duration: '۹ ماه',
      year: '۱۴۰۳',
    },
  },
  {
    id: 'moallem',
    label: 'بیمه معلم',
    slot: 'ar-logo-moallem',
    case: {
      title: 'بازنگری ساختار سازمانی و شرح مشاغل',
      summary: 'بازنگری ساختار سازمانی و تدوین شرح مشاغل برای همه واحدها، با هدف شفاف شدن مرزهای مسئولیت و حذف هم‌پوشانی وظایف.',
      slot: 'ar-case-moallem',
      slotLabel: 'تصویر پروژه بیمه معلم — ساختمان مرکزی',
      field: 'ساختار سازمانی',
      service: 'بازنگری ساختار و تدوین شرح مشاغل',
      duration: '۵ ماه',
      year: '۱۴۰۳',
    },
  },
  {
    id: 'kourosh',
    label: 'فروشگاه کوروش',
    slot: 'ar-logo-kourosh',
    case: {
      title: 'نظام آموزش و توانمندسازی کارکنان فروشگاهی',
      summary: 'طراحی نظام آموزش و ارزیابی کارکنان فروشگاهی، شامل مسیرهای آموزشی نقش‌محور و سنجش دوره‌ای مهارت‌ها در سطح شعب.',
      slot: 'ar-case-kourosh',
      slotLabel: 'تصویر پروژه فروشگاه کوروش — مجتمع تجاری',
      field: 'آموزش و توسعه',
      service: 'طراحی نظام آموزش و ارزیابی کارکنان',
      duration: '۶ ماه',
      year: '۱۴۰۴',
    },
  },
];

/** Brand selected when the section first renders. */
export const defaultPartnerId = 'sunich';

export const caseStudyLabels = {
  badge: 'پروژه انجام شده',
  field: { label: 'حوزه همکاری', icon: 'lucide:user-round' },
  service: { label: 'خدمات ارائه شده', icon: 'lucide:users-round' },
  duration: { label: 'مدت زمان پروژه', icon: 'lucide:clock' },
  year: { label: 'سال همکاری', icon: 'lucide:calendar-days' },
  cta: { label: 'مشاهده مطالعه موردی', href: '/articles' },
};

export const partnerStatsHeading = 'بیش از یک دهه تجربه کنار سازمان‌ها';

export const partnerStats = [
  { value: '+120', label: 'سازمان همکار', desc: 'در بخش‌های مختلف', icon: 'lucide:building-2' },
  { value: '+200', label: 'پروژه موفق', desc: 'طراحی و اجرا شده', icon: 'lucide:handshake' },
  { value: '+250K', label: 'مدیر و کارمند تحت پوشش', desc: 'سیستم‌های طراحی شده', icon: 'lucide:users' },
  { value: '98%', label: 'رضایت مشتریان', desc: 'از همکاری با آریاز', icon: 'lucide:badge-check' },
  { value: '+12', label: 'سال تجربه تخصصی', desc: 'در حوزه منابع انسانی', icon: 'lucide:trending-up' },
  { value: '+90%', label: 'پروژه‌های تکرارشونده', desc: 'از سمت مشتریان', icon: 'lucide:target' },
];

export const expertiseHeading = 'تخصص ما، ارزش پایدار برای سازمان شما';

export const expertiseStrip = [
  { text: 'تعهد به محرمانگی', desc: 'و حفظ اطلاعات سازمان', icon: 'lucide:lock' },
  { text: 'همراهی در تمام مراحل', desc: 'از طراحی تا استقرار و ارزیابی', icon: 'lucide:refresh-cw' },
  { text: 'رویکرد داده‌محور و علمی', desc: 'برای تصمیم‌گیری‌های بهتر', icon: 'lucide:bar-chart-3' },
  { text: 'تیم متخصص با تجربه', desc: 'با دانش روز و تجربه متنوع', icon: 'lucide:user-round' },
  { text: 'راهکارهای عملی و قابل اجرا', desc: 'متناسب با نیاز سازمان شما', icon: 'lucide:shield-check' },
];

export const partnerContact = {
  meeting: { label: 'جلسه آنلاین با کارشناسان', icon: 'lucide:calendar-clock', href: '/support' },
  cta: { label: 'درخواست مشاوره سازمانی', href: '/org' },
  phone: { label: 'مشاوره رایگان تلفنی', value: '021-91017134', icon: 'lucide:phone-call' },
};

/* ── 4. Products ────────────────────────────────────────────── */

export const productsHeading = {
  kicker: 'محصولات منتخب آریاز',
  title: 'تازه‌ها، پرفروش‌ها و به‌زودی',
  desc: 'دوره‌ها، ابزارها و راهکارهای کاربردی برای رشد فردی و سازمانی',
};

export interface Product {
  title: string;
  category: string;
  /** Ribbon shown over the artwork — e.g. جدید / پرفروش. */
  badge?: string;
  /** Tailwind classes for the badge chip. */
  badgeClass?: string;
  /** Tailwind classes for the category chip. */
  categoryClass?: string;
  /** Medallion glyph straddling the artwork's lower edge. */
  icon?: string;
  desc: string;
  students: string;
  rating: string;
  slot: string;
  mobileSlot?: string;
  href: string;
}

export const productTabs: { id: string; label: string; icon: string; items: Product[] }[] = [
  {
    id: 'new',
    label: 'تازه‌ها',
    icon: 'mdi:new-box',
    items: [
      {
        title: 'مسیر یادگیری جذب و استخدام',
        category: 'مسیر یادگیری',
        desc: 'از طراحی آگهی شغلی تا مصاحبه ساختاریافته و انتخاب نهایی، در ۱۲ گام عملی',
        students: '۱,۲۴۰ یادگیرنده',
        rating: '۴.۸',
        slot: 'ar-p-new-1',
        mobileSlot: 'ar-m-p1',
        href: '/learning-paths',
      },
      {
        title: 'ماشین حساب حقوق و مزایا',
        category: 'ابزار',
        desc: 'محاسبه دقیق حقوق، کسورات و مزایا مطابق آخرین بخشنامه‌های قانون کار',
        students: '۳,۵۶۰ کاربر',
        rating: '۴.۹',
        slot: 'ar-p-new-2',
        mobileSlot: 'ar-m-p2',
        href: '/salary-calculator',
      },
      {
        title: 'پکیج فرم‌های ارزیابی عملکرد',
        category: 'فرم و قالب',
        desc: 'مجموعه کامل فرم‌های ارزیابی عملکرد، قابل ویرایش و متناسب با هر ساختار سازمانی',
        students: '۸۹۰ سازمان',
        rating: '۴.۷',
        slot: 'ar-p-new-3',
        mobileSlot: 'ar-m-p3',
        href: '/tools',
      },
      {
        title: 'ایجنت کوچینگ مدیران',
        category: 'ایجنت هوشمند',
        desc: 'دستیار هوشمندی که مدیران را در تصمیم‌گیری و گفتگوهای دشوار همراهی می‌کند',
        students: '۶۲۰ مدیر',
        rating: '۴.۶',
        slot: 'ar-p-new-4',
        mobileSlot: 'ar-m-p4',
        href: '/agents',
      },
    ],
  },
  {
    id: 'best',
    label: 'پرفروش‌ها',
    icon: 'lucide:flame',
    items: [
      {
        title: 'دوره مدیریت عملکرد حرفه‌ای',
        category: 'دوره آموزشی',
        badge: 'جدید',
        badgeClass: 'bg-emerald-100 text-emerald-700',
        categoryClass: 'bg-violet-100 text-violet-700',
        icon: 'lucide:graduation-cap',
        desc: 'به صورت عملی یاد بگیرید چگونه یک سیستم مدیریت عملکرد اثربخش طراحی و اجرا کنید.',
        students: '۷۸۷ دانشجو',
        rating: '۴.۸',
        slot: 'ar-p-best-1',
        href: '/courses',
      },
      {
        title: 'ایجنت طراحی KPI هوشمند',
        category: 'ایجنت هوشمند',
        badge: 'جدید',
        badgeClass: 'bg-emerald-100 text-emerald-700',
        categoryClass: 'bg-violet-100 text-violet-700',
        icon: 'lucide:bot',
        desc: 'با هوش مصنوعی، شاخص‌های کلیدی عملکرد (KPI) متناسب با شغل و اهداف سازمان خود را طراحی کنید.',
        students: '۱۵۶ دانشجو',
        rating: '۴.۹',
        slot: 'ar-p-best-2',
        href: '/agents',
      },
      {
        title: 'بوم طراحی مسیر شغلی',
        category: 'ابزار کاربردی',
        badge: 'جدید',
        badgeClass: 'bg-emerald-100 text-emerald-700',
        categoryClass: 'bg-emerald-100 text-emerald-700',
        icon: 'lucide:file-spreadsheet',
        desc: 'یک ابزار کاربردی برای طراحی مسیرهای شغلی، شایستگی‌ها و برنامه‌های توسعه کارکنان در سازمان.',
        students: '۷۱۷ دانشجو',
        rating: '۴.۷',
        slot: 'ar-p-best-3',
        href: '/tools',
      },
      {
        title: 'بسته مدیر تازه‌وارد',
        category: 'بسته حرفه‌ای',
        badge: 'پرفروش',
        badgeClass: 'bg-violet-600 text-white',
        categoryClass: 'bg-orange-100 text-orange-600',
        icon: 'lucide:briefcase',
        desc: 'مجموعه‌ای کامل از دوره‌ها، ابزارها و راهنماهای ضروری برای موفقیت در نقش مدیر جدید.',
        students: '۴۷۶ دانشجو',
        rating: '۴.۹',
        slot: 'ar-p-best-4',
        href: '/master-list',
      },
    ],
  },
  {
    id: 'soon',
    label: 'به‌زودی',
    icon: 'lucide:calendar-clock',
    items: [
      {
        title: 'داشبورد شاخص‌های منابع انسانی',
        category: 'ابزار',
        desc: 'تصویری یکپارچه از شاخص‌های کلیدی HR برای تصمیم‌گیری سریع‌تر',
        students: 'به‌زودی',
        rating: '—',
        slot: 'ar-p-soon-1',
        href: '/tools',
      },
      {
        title: 'دوره مصاحبه رفتاری ساختاریافته',
        category: 'دوره آموزشی',
        desc: 'طراحی سؤال، ارزیابی پاسخ و کاهش خطای قضاوت در مصاحبه استخدامی',
        students: 'به‌زودی',
        rating: '—',
        slot: 'ar-p-soon-2',
        href: '/courses',
      },
      {
        title: 'ایجنت تحلیل نظرسنجی کارکنان',
        category: 'ایجنت هوشمند',
        desc: 'نتایج نظرسنجی را تحلیل و اولویت‌های بهبود را پیشنهاد می‌کند',
        students: 'به‌زودی',
        rating: '—',
        slot: 'ar-p-soon-3',
        href: '/agents',
      },
      {
        title: 'بسته توسعه رهبران ارشد',
        category: 'بسته آموزشی',
        desc: 'برنامه توسعه رهبری برای لایه مدیران ارشد سازمان',
        students: 'به‌زودی',
        rating: '—',
        slot: 'ar-p-soon-4',
        href: '/master-list',
      },
    ],
  },
];

export const productsDefaultTab = 'best';

export const productsBand = {
  icon: 'lucide:gift',
  text: 'همین حالا عضو شوید و از تخفیف‌های ویژه و محتوای اختصاصی آریاز بهره‌مند شوید.',
  cta: { label: 'مشاهده همه محصولات', href: '/master-list' },
};

export const productCtaLabel = 'مشاهده محصول';

/* ── 5. Learning paths ──────────────────────────────────────── */

export const pathsHeading = {
  kicker: 'مسیرهای یادگیری هدفمند',
  title: 'مسیر تسلط مهارت‌ها',
  desc: 'مسیر رشد خود را انتخاب کنید و مرحله‌به‌مرحله از محتواها عبور کنید و درصد پیشرفت خود را ببینید.',
};

export const pathFeatures = [
  {
    title: 'محتوای متنوع',
    desc: 'ترکیبی از دوره‌ها، ابزارها، تمرین‌ها\nو منابع کاربردی',
    icon: 'lucide:monitor-play',
  },
  {
    title: 'گواهینامه معتبر',
    desc: 'با تکمیل هر مسیر گواهینامه\nمعتبر دریافت کنید',
    icon: 'lucide:target',
  },
  {
    title: 'پیگیری پیشرفت',
    desc: 'پیشرفت خود را در هر مرحله\nمشاهده و تحلیل کنید',
    icon: 'lucide:bar-chart-3',
  },
  {
    title: 'یادگیری هدفمند',
    desc: 'مسیرهای طراحی‌شده برای رسیدن\nبه مهارت‌های کلیدی',
    icon: 'lucide:trophy',
  },
];

export const pathsSubheading = 'مسیرهای پیشنهادی برای شما';

export const pathsAllCta = { label: 'مشاهده همه مسیرها', href: '/learning-paths' };

/** Card button copy — a started path says «ادامه», an untouched one «شروع». */
export const pathCardCta = { started: 'ادامه مسیر', fresh: 'شروع مسیر' };

export const learningPaths = [
  { title: 'مسیر جذب و استخدام', category: 'منابع انسانی', steps: '۱۲', progress: 65, color: '#F97316', icon: 'lucide:users-round', started: true, featured: false },
  { title: 'چطور مدیر شویم', category: 'مدیریت و رهبری', steps: '۱۰', progress: 70, color: '#F97316', icon: 'lucide:crown', started: true, featured: true },
  { title: 'مدیریت خشم', category: 'توسعه فردی', steps: '۸', progress: 45, color: '#F97316', icon: 'lucide:brain', started: false, featured: false },
  { title: 'کار با ایجنت‌ها', category: 'هوش مصنوعی', steps: '۹', progress: 30, color: '#F97316', icon: 'lucide:bot', started: false, featured: false },
  { title: 'رهبری تیم و انگیزش', category: 'مدیریت و رهبری', steps: '۱۱', progress: 60, color: '#F97316', icon: 'lucide:mountain-snow', started: false, featured: false },
];

export const pathsBand = {
  title: 'یادگیری ساختاریافته',
  desc: 'هر مسیر شامل ترکیبی از دوره‌های آموزشی، ابزارهای کاربردی، تمرین‌های عملی و آزمون‌های ارزیابی است.',
  icon: 'lucide:layers',
  stats: [
    { value: '+50', label: 'مسیر یادگیری', icon: 'lucide:book-open', tone: 'blue' as const },
    { value: '+1200', label: 'محتوای آموزشی', icon: 'lucide:play-circle', tone: 'green' as const },
    { value: '+85K', label: 'کاربر فعال', icon: 'lucide:users-round', tone: 'orange' as const },
  ],
};

export const pathStepsLabel = 'مرحله';

/* ── 6. Special offers ──────────────────────────────────────── */

export const offersHeading = {
  title: 'پیشنهاد ویژه',
  latin: 'Special Offers',
  desc: 'فرصت‌های استثنایی برای شروع مسیر رشد و ارتقای مهارت‌ها با بهترین شرایط',
};

/** Copy block beside the featured offer card. */
export const offersIntro = {
  title: 'فرصت امروز، موفقیت فردا',
  lines: [
    'پیشنهادهای منتخب آریاز با بهترین تخفیف‌ها',
    'برای همراهی شما در مسیر رشد حرفه‌ای و سازمانی',
  ],
  slot: 'ar-offer-illo',
  slotLabel: 'تصویر سه‌بعدی جعبه هدیه و برچسب تخفیف',
};

export const mainOffer = {
  ribbonValue: '۳۰%',
  ribbonLabel: 'تخفیف ویژه',
  badge: 'پیشنهاد این ماه',
  title: 'بسته توسعه مدیران حرفه‌ای',
  subtitle: 'همه آنچه برای تبدیل شدن به یک مدیر موفق نیاز دارید',
  includes: [
    { icon: 'lucide:monitor-play', title: '۴ دوره آموزشی', sub: 'منتخب و کاربردی' },
    { icon: 'lucide:briefcase', title: '۲ ابزار حرفه‌ای', sub: 'مخصوص مدیران' },
    { icon: 'lucide:graduation-cap', title: 'مسیر یادگیری اختصاصی', sub: 'شخصی‌سازی شده' },
    { icon: 'lucide:file-text', title: 'محتوای تکمیلی', sub: 'قابل دانلود' },
  ],
  price: '۸,۷۵۰,۰۰۰ تومان',
  oldPrice: '۱۲,۵۰۰,۰۰۰ تومان',
  cta: { label: 'مشاهده جزئیات و خرید', href: '/master-list' },
};

export const miniOffers = [
  {
    badge: 'پرفروش هفته',
    badgeIcon: 'lucide:flame',
    tone: 'orange' as const,
    icon: 'lucide:bar-chart-3',
    title: 'دوره مدیریت عملکرد',
    desc: 'از طراحی تا ارزیابی موثر عملکرد',
    discount: '۲۵% تخفیف',
    href: '/courses',
  },
  {
    badge: 'محصول جدید',
    badgeIcon: 'mdi:new-box',
    tone: 'green' as const,
    icon: 'lucide:bot',
    title: 'ایجنت طراحی KPI',
    desc: 'هوش مصنوعی برای طراحی شاخص‌های عملکردی دقیق و هوشمند',
    discount: '۱۵% تخفیف',
    href: '/agents',
  },
  {
    badge: 'بسته ویژه',
    badgeIcon: 'lucide:gift',
    tone: 'orange' as const,
    icon: 'lucide:briefcase',
    title: 'بسته جامع منابع انسانی',
    desc: 'مجموعه کامل دوره‌ها، ابزارها و فرم‌های حرفه‌ای HR',
    discount: '۲۵% تخفیف',
    href: '/master-list',
  },
];

export const offersBand = {
  title: 'فرصت محدود!',
  text: 'این پیشنهادها فقط تا پایان این ماه معتبر هستند.',
  cta: { label: 'مشاهده همه پیشنهادها', href: '/master-list' },
};

/* ── 7. News ────────────────────────────────────────────────── */

export const newsHeading = {
  title: 'تازه‌های آریاز',
  desc: 'آخرین دوره‌ها، ابزارها، ایجنت‌ها و مقالات جدیدی که به پلتفرم آریاز اضافه شده‌اند.',
};

export const newsTabs = [
  { id: 'all', label: 'همه', icon: '' },
  { id: 'learning', label: 'یادگیری', icon: 'lucide:graduation-cap' },
  { id: 'tools', label: 'ابزار و ایجنت‌ها', icon: 'lucide:briefcase' },
  { id: 'articles', label: 'مقالات', icon: 'lucide:file-pen-line' },
  { id: 'notices', label: 'اطلاعیه‌ها', icon: 'lucide:megaphone' },
];

export const newsTimeline = [
  { kind: 'دوره جدید', title: 'دوره مدیریت عملکرد حرفه‌ای', date: '۲۹ مرداد ۱۴۰۵' },
  { kind: 'ابزار جدید', title: 'ایجنت طراحی KPI هوشمند', date: '۲۲ مرداد ۱۴۰۵' },
  { kind: 'ابزار جدید', title: 'ماشین حساب حقوق و مزایا', date: '۲۰ مرداد ۱۴۰۵' },
  { kind: 'اطلاعیه جدید', title: 'اضافه شدن مسیرهای یادگیری', date: '۱۸ مرداد ۱۴۰۵' },
];

export const newsTimelineTitle = 'آخرین به‌روزرسانی‌ها';

export const newsTimelineCta = { label: 'مشاهده همه', href: '/news' };

export const newsCards = [
  {
    tab: 'notices',
    badge: 'اطلاعیه',
    title: 'اضافه شدن مسیرهای یادگیری جدید',
    desc: 'مسیرهای تخصصی جدید در حوزه‌های مدیریت، منابع انسانی و توسعه فردی به پلتفرم آریاز اضافه شد.',
    date: '۱۸ مرداد ۱۴۰۵',
    cta: 'مشاهده اطلاعیه',
    icon: 'lucide:megaphone',
    color: '#F97316',
    href: '/learning-paths',
  },
  {
    tab: 'tools',
    badge: 'ابزار جدید',
    title: 'ماشین حساب حقوق و مزایا',
    desc: 'محاسبه سریع و دقیق حقوق و مزایا بر اساس قوانین به‌روز تأمین اجتماعی.',
    date: '۲۰ مرداد ۱۴۰۵',
    cta: 'استفاده از ابزار',
    icon: 'lucide:calculator',
    color: '#F97316',
    href: '/salary-calculator',
  },
  {
    tab: 'tools',
    badge: 'ابزار جدید',
    title: 'ایجنت طراحی KPI هوشمند',
    desc: 'طراحی شاخص‌های عملکردی با کمک هوش مصنوعی در چند دقیقه.',
    date: '۲۲ مرداد ۱۴۰۵',
    cta: 'مشاهده ابزار',
    icon: 'lucide:bot',
    color: '#F97316',
    href: '/agents',
  },
  {
    tab: 'learning',
    badge: 'دوره جدید',
    title: 'دوره مدیریت عملکرد حرفه‌ای',
    desc: 'آشنایی با طراحی، اجرا و بهبود سیستم مدیریت عملکرد کارکنان در سازمان‌ها.',
    date: '۲۹ مرداد ۱۴۰۵',
    cta: 'مشاهده دوره',
    icon: 'lucide:graduation-cap',
    color: '#F97316',
    href: '/courses',
  },
];

export const newsBand = {
  title: 'هیچ به‌روزرسانی را از دست ندهید!',
  desc: 'برای دریافت جدیدترین ابزارها، دوره‌ها، ایجنت‌ها و مقالات آریاز در خبرنامه ما عضو شوید.',
  cta: { label: 'عضویت در خبرنامه', href: '/support' },
};

/* ── 8. Testimonials ────────────────────────────────────────── */

export const testimonialsHeading = {
  title: 'تجربه کسانی که با آریاز رشد کرده‌اند',
  desc: 'بازخورد مدیران، متخصصان منابع انسانی و یادگیرندگان از مسیرهای توسعه آریاز',
};

export const testimonialTabs = [
  { id: 'learner', label: 'تجربه یادگیرندگان', icon: 'lucide:graduation-cap' },
  { id: 'org', label: 'تجربه سازمان‌ها', icon: 'lucide:building-2' },
];

export interface Testimonial {
  /** Which tab the quote belongs to. */
  kind: 'learner' | 'org';
  /** Full quote, shown on the featured card. */
  quote: string;
  /** Condensed quote for the faded side previews. */
  short: string;
  name: string;
  role: string;
  org?: string;
  avatarSlot: string;
  /** Company mark, shown beside the name when available. */
  logoSlot?: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      'دوره طراحی سیستم عملکرد آریاز کمک کرد فرآیند ارزیابی سازمان ما از حالت سنتی به یک سیستم قابل اندازه‌گیری تبدیل شود.',
    short: 'فرآیند ارزیابی سازمان ما از حالت سنتی به یک سیستم قابل اندازه‌گیری تبدیل شد.',
    kind: 'learner',
    name: 'مهدی احمدی',
    role: 'مدیر منابع انسانی',
    org: 'شرکت سن‌ایچ',
    avatarSlot: 'ar-t-main-1',
    logoSlot: 'ar-t-logo-1',
  },
  {
    quote:
      'مسیر یادگیری مدیریت تیم باعث شد نگاه من به مدیریت افراد کاملاً تغییر کند؛ حالا برای هر گفتگوی دشوار چارچوب روشنی دارم.',
    short: 'مسیر یادگیری مدیریت تیم باعث شد نگاه من به مدیریت افراد کاملاً تغییر کند.',
    kind: 'learner',
    name: 'سارا محمدی',
    role: 'کارشناس منابع انسانی',
    org: 'گروه صنعتی بارکا',
    avatarSlot: 'ar-t-main-2',
    logoSlot: 'ar-t-logo-2',
  },
  {
    quote:
      'محتوای دوره‌ها بسیار کاربردی و متناسب با نیازهای واقعی سازمان طراحی شده است و تیم آموزش ما دیگر دنبال منابع پراکنده نمی‌گردد.',
    short: 'محتوای دوره‌ها بسیار کاربردی و متناسب با نیازهای واقعی سازمان طراحی شده است.',
    kind: 'learner',
    name: 'علی شریفی',
    role: 'مدیر آموزش و توسعه',
    org: 'بیمه ملت',
    avatarSlot: 'ar-t-main-3',
    logoSlot: 'ar-t-logo-3',
  },
  {
    quote:
      'طراحی نظام جبران خدمات با آریاز، شفافیتی به ساختار پرداخت ما داد که سال‌ها دنبالش بودیم. همراهی تیم تا مرحله اجرا ادامه داشت.',
    short: 'طراحی نظام جبران خدمات، شفافیتی به ساختار پرداخت ما داد که سال‌ها دنبالش بودیم.',
    kind: 'org',
    name: 'گروه صنعتی گلرنگ',
    role: 'واحد منابع انسانی',
    avatarSlot: 'ar-t-main-4',
    logoSlot: 'ar-t-logo-4',
  },
  {
    quote:
      'دوره‌های درون‌سازمانی آریاز متناسب با نیاز واقعی ما بازطراحی شد، نه یک بسته آماده. تفاوت در نتیجه کاملاً محسوس بود.',
    short: 'دوره‌های درون‌سازمانی متناسب با نیاز واقعی ما بازطراحی شد، نه یک بسته آماده.',
    kind: 'org',
    name: 'بیمه ملت',
    role: 'مدیریت آموزش',
    avatarSlot: 'ar-t-main-5',
    logoSlot: 'ar-t-logo-5',
  },
  {
    quote:
      'ایجنت‌های سازمانی آریاز بخش بزرگی از کارهای تکراری واحد منابع انسانی را برداشتند و تیم توانست روی توسعه کارکنان تمرکز کند.',
    short: 'ایجنت‌های سازمانی بخش بزرگی از کارهای تکراری واحد منابع انسانی را برداشتند.',
    kind: 'org',
    name: 'گروه صنعتی بارکا',
    role: 'دفتر تحول سازمانی',
    avatarSlot: 'ar-t-main-6',
    logoSlot: 'ar-t-logo-6',
  },
];

export const testimonialStats = [
  {
    value: '+25,000',
    label: 'یادگیرنده',
    sub: 'در مسیر رشد و توسعه فردی و شغلی',
    icon: 'lucide:users-round',
  },
  {
    value: '+500',
    label: 'سازمان همراه',
    sub: 'در صنایع مختلف با آریاز همکاری دارند',
    icon: 'lucide:building-2',
  },
  {
    value: '98%',
    label: 'رضایت کاربران',
    sub: 'از کیفیت دوره‌ها و خدمات آریاز',
    icon: 'lucide:smile',
  },
];

export const testimonialsClosing =
  'اعتماد شما، نیروی ما برای ساختن آینده بهتر منابع انسانی در ایران';

/* ── Articles ───────────────────────────────────────────────── */

export const articlesHeading = {
  title: 'آخرین مقالات آریاز',
  desc: 'تحلیل‌ها، تجربه‌ها و راهکارهای کاربردی برای توسعه انسان‌ها و سازمان‌ها',
};

export const articleTabs = [
  { id: 'all', label: 'همه', icon: 'lucide:layers' },
  { id: 'hr', label: 'منابع انسانی', icon: 'lucide:users-round' },
  { id: 'lead', label: 'مدیریت و رهبری', icon: 'lucide:crown' },
  { id: 'self', label: 'توسعه فردی', icon: 'lucide:user-round' },
  { id: 'ai', label: 'هوش مصنوعی', icon: 'lucide:bot' },
];

export const featuredArticle = {
  tab: 'hr',
  badge: 'منابع انسانی',
  title: 'چگونه یک سیستم عملکرد اثربخش طراحی کنیم؟',
  desc: 'راهنمای گام‌به‌گام طراحی سیستم ارزیابی عملکرد که انگیزه ایجاد می‌کند، رفتارها را بهبود می‌دهد و به رشد سازمان کمک می‌کند.',
  date: '۲۵ مرداد ۱۴۰۵',
  readTime: '۱۲ دقیقه مطالعه',
  slot: 'ar-art-feature',
  cta: { label: 'مطالعه مقاله', href: '/articles' },
};

export const articleList = [
  {
    tab: 'hr',
    badge: 'منابع انسانی',
    title: 'طراحی مسیر شغلی کارکنان: از تئوری تا اجرا',
    date: '۲۲ مرداد ۱۴۰۵',
    readTime: '۸ دقیقه مطالعه',
    slot: 'ar-art-1',
    href: '/articles',
  },
  {
    tab: 'ai',
    badge: 'هوش مصنوعی',
    title: 'چگونه AI Agentها منابع انسانی را متحول می‌کنند؟',
    date: '۲۰ مرداد ۱۴۰۵',
    readTime: '۶ دقیقه مطالعه',
    slot: 'ar-art-2',
    href: '/articles',
  },
  {
    tab: 'lead',
    badge: 'مدیریت و رهبری',
    title: '۷ اشتباه رایج در طراحی KPI که نتیجه را خراب می‌کنند',
    date: '۱۸ مرداد ۱۴۰۵',
    readTime: '۷ دقیقه مطالعه',
    slot: 'ar-art-3',
    href: '/articles',
  },
];

export const articlesBand = {
  slot: 'ar-art-band',
  title: 'دنیای دانش آریاز همیشه به‌روز است!',
  text: 'مقالات تخصصی، تحلیل‌ها و تجربیات کاربردی برای رشد فردی و سازمانی شما.',
  cta: { label: 'مشاهده همه مقالات', href: '/articles' },
};

/* ── Leaderboard ────────────────────────────────────────────── */

export const leaderboardHeading = {
  kicker: 'رنکینگ کاربران',
  title: 'قهرمانان مسیر یادگیری آریاز',
  desc: 'یادگیرندگانی که با استمرار، یادگیری و پیشرفت، مسیر رشد خود را سریع‌تر طی کرده‌اند.',
};

export const leaderboardStats = [
  { value: '+۲۵,۰۰۰', label: 'یادگیرنده فعال', sub: 'در حال یادگیری و رشد', slot: 'ar-lb-stat-1' },
  { value: '+۱۲۰,۰۰۰', label: 'امتیاز کسب شده', sub: 'در بین همه کاربران', slot: 'ar-lb-stat-2' },
  { value: '+۸,۵۰۰', label: 'مسیر یادگیری تکمیل شده', sub: 'در دوره‌ها و مسیرهای مختلف', slot: 'ar-lb-stat-3' },
];

export const leaderboardTabs = [
  { id: 'top', label: 'برترین‌ها', icon: 'lucide:crown' },
  { id: 'progress', label: 'بیشترین پیشرفت', icon: 'lucide:trending-up' },
  { id: 'active', label: 'فعال‌ترین‌ها', icon: 'lucide:flame' },
];

export const podium = [
  { rank: 2, name: 'سارا یوسفی', level: 'سطح: متخصص', tone: 'blue', score: '۹,۶۷۰', slot: 'ar-lb-p2' },
  { rank: 1, name: 'محمد احمدی', level: 'سطح: استاد آریاز', tone: 'gold', score: '۱۲,۸۵۰', slot: 'ar-lb-p1' },
  { rank: 3, name: 'علی رضایی', level: 'سطح: در حال رشد', tone: 'green', score: '۷,۴۳۰', slot: 'ar-lb-p3' },
];

export const leaderboardTable = {
  columns: ['رتبه', 'کاربر', 'سطح', 'امتیاز', 'مسیرهای تکمیل شده'],
  rows: [
    { rank: '۴', name: 'مهدی کریمی', level: 'متخصص', tone: 'amber', score: '۶,۲۳۰', paths: '۱۲ مسیر', progress: 82, slot: 'ar-lb-p1' },
    { rank: '۵', name: 'نگار حسینی', level: 'در حال رشد', tone: 'blue', score: '۵,۴۸۰', paths: '۹ مسیر', progress: 64, slot: 'ar-lb-p2' },
    { rank: '۶', name: 'امیرحسین نوری', level: 'در حال رشد', tone: 'blue', score: '۴,۸۷۰', paths: '۸ مسیر', progress: 52, slot: 'ar-lb-p3' },
    { rank: '۷', name: 'الهام محمدی', level: 'شروع مسیر', tone: 'green', score: '۳,۹۲۰', paths: '۶ مسیر', progress: 36, slot: 'ar-lb-p2' },
  ],
};

export const competitiveMetrics = {
  title: 'شاخص‌های رقابتی',
  items: [
    { title: 'برترین دانشجویان', sub: 'کاربرانی با بیشترین امتیاز', slot: 'ar-lb-metric-1' },
    { title: 'بیشترین پیشرفت', sub: 'کاربرانی با بیشترین رشد', slot: 'ar-lb-metric-2' },
    { title: 'فعال‌ترین کاربران', sub: 'کاربرانی با بیشترین تعامل', slot: 'ar-lb-metric-3' },
    { title: 'کامل‌ترین مسیرها', sub: 'کاربرانی با بیشترین مسیر تکمیل شده', slot: 'ar-lb-metric-4' },
  ],
};

export const growthLevels = {
  title: 'سطح‌های رشد در آریاز',
  items: [
    { label: 'شروع مسیر', sub: 'تازه‌وارد مسیر یادگیری', icon: 'lucide:sprout', tone: 'green' },
    { label: 'در حال رشد', sub: 'یادگیری مستمر و پیشرفت خوب', icon: 'lucide:zap', tone: 'orange' },
    { label: 'متخصص', sub: 'تسلط بر مباحث و مهارت‌ها', icon: 'lucide:star', tone: 'amber' },
    { label: 'استاد', sub: 'تجربه بالا و کمک به دیگران', icon: 'lucide:crown', tone: 'purple' },
  ],
};

export const leaderboardBand = {
  slot: 'ar-lb-band',
  title: 'مسیر یادگیری خود را شروع کنید',
  lines: [
    'با یادگیری، امتیاز کسب کنید، در رنکینگ‌ها بدرخشید',
    'و به جمع برترین‌های آریاز بپیوندید',
  ],
  cta: { label: 'شروع مسیر یادگیری و کسب امتیاز', href: '/learning-paths' },
};

/* ── Why Ariyaz ─────────────────────────────────────────────── */

export const whyHeading = {
  title: 'چرا آریاز؟',
  desc: 'یک پلتفرم یکپارچه برای رشد انسان‌ها و تحول سازمان‌ها',
};

export const whyReasons = [
  {
    n: '۱',
    title: 'تجربه واقعی',
    desc: 'بیش از یک دهه تجربه در کنار سازمان‌ها و درک عمیق از چالش‌های منابع انسانی',
    icon: 'lucide:users-round',
  },
  {
    n: '۲',
    title: 'یادگیری کاربردی',
    desc: 'محتواهایی که از تجربه واقعی کسب‌وکار و نیازهای روز سازمان‌ها ساخته شده‌اند',
    icon: 'lucide:graduation-cap',
  },
  {
    n: '۳',
    title: 'هوشمندی AI',
    desc: 'ایجنت‌ها و ابزارهای هوشمند برای تحلیل، تصمیم‌گیری و سرعت بخشیدن به کارها',
    icon: 'lucide:bot',
  },
  {
    n: '۴',
    title: 'مسیرهای توسعه',
    desc: 'از یادگیری پراکنده تا مسیر رشد مرحله‌به‌مرحله و هدفمند',
    icon: 'lucide:route',
  },
  {
    n: '۵',
    title: 'همراهی تا اجرا',
    desc: 'فقط آموزش نیست؛ در کنار شما هستیم تا راهکارها به نتایج واقعی در سازمان تبدیل شوند',
    icon: 'lucide:handshake',
  },
];

export const whyTrust = {
  title: 'چرا سازمان‌ها به ما اعتماد دارند؟',
  items: [
    'رویکرد علمی و کاربردی',
    'تخصصی و همراه',
    'راهکارهای قابل اجرا',
    'پشتیبانی مستمر',
  ],
};

export const whyStats = [
  { value: '+25,000', label: 'یادگیرنده فعال', sub: 'در سراسر کشور', icon: 'lucide:users-round' },
  { value: '+500', label: 'سازمان همراه', sub: 'در صنایع مختلف', icon: 'lucide:building-2' },
  { value: '+2,000', label: 'ساعت محتوای آموزشی', sub: 'به‌روز و کاربردی', icon: 'lucide:monitor-play' },
  { value: '+80,000', label: 'گواهینامه صادر شده', sub: 'برای یادگیرندگان', icon: 'lucide:award' },
  { value: '98%', label: 'رضایت کاربران', sub: 'از کیفیت خدمات', icon: 'lucide:smile' },
];

export const whyBand = {
  title: 'همراه مطمئن شما در مسیر رشد و تحول',
  text: 'با آریاز، یادگیری را به نتایج واقعی تبدیل کنید.',
  cta: { label: 'شروع مسیر رشد', href: '/learning-paths' },
};

/* ── Instructors ────────────────────────────────────────────── */

export const instructorsHeading = {
  kicker: 'معرفی مدرس‌ها',
  title: 'مدرس‌های آریاز',
  desc: 'یادگیری از متخصصانی که تجربه واقعی کسب‌وکار را با شما به اشتراک می‌گذارند',
};

export const instructorTabs = [
  { id: 'all', label: 'همه مدرس‌ها', icon: 'lucide:users-round' },
  { id: 'hr', label: 'منابع انسانی', icon: 'lucide:user-round' },
  { id: 'lead', label: 'مدیریت و رهبری', icon: 'lucide:crown' },
  { id: 'self', label: 'توسعه فردی', icon: 'lucide:target' },
  { id: 'ai', label: 'هوش مصنوعی', icon: 'lucide:bot' },
];

export const instructors = [
  {
    tab: 'hr',
    badge: 'مدرس ارشد',
    tone: 'orange',
    name: 'دکتر سامان مصباح',
    role: 'متخصص نظام‌های منابع انسانی و استراتژی HR',
    rating: '4.9',
    reviews: '( ۳۵۶ نظر )',
    students: '۳,۴۰۰+',
    courses: '۱۴',
    slot: 'ar-ins-1',
  },
  {
    tab: 'hr',
    badge: 'متخصص HR',
    tone: 'blue',
    name: 'مهندس ندا رضایی',
    role: 'مشاور و مدرس توسعه سازمانی و مدیریت عملکرد',
    rating: '4.8',
    reviews: '( ۲۸۹ نظر )',
    students: '۲,۸۵۰+',
    courses: '۱۱',
    slot: 'ar-ins-2',
  },
  {
    tab: 'self',
    badge: 'مدرس منتخب',
    tone: 'purple',
    name: 'دکتر علیرضا نوری',
    role: 'متخصص توسعه فردی و رهبری و کوچ حرفه‌ای',
    rating: '4.9',
    reviews: '( ۴۱۴ نظر )',
    students: '۴,۱۰۰+',
    courses: '۱۳',
    slot: 'ar-ins-3',
  },
  {
    tab: 'ai',
    badge: 'متخصص AI',
    tone: 'green',
    name: 'مهندس امیر حیدری',
    role: 'متخصص هوش مصنوعی و تحلیل داده',
    rating: '4.7',
    reviews: '( ۲۲۱ نظر )',
    students: '۲,۲۰۰+',
    courses: '۹',
    slot: 'ar-ins-4',
  },
];

export const instructorLabels = {
  students: 'دانشجو',
  courses: 'دوره آموزشی',
  profile: 'مشاهده پروفایل',
};

export const instructorsBand = {
  slot: 'ar-ins-band',
  title: 'تجربه واقعی، آموزش واقعی',
  text: 'مدرس‌های آریاز از میان مدیران ارشد، مشاوران و متخصصانی انتخاب شده‌اند که تجربه عملی و نتایج واقعی دارند.',
  stats: [
    { value: '+۱۰', label: 'سال تجربه', icon: 'lucide:award' },
    { value: '+۲۵,۰۰۰', label: 'یادگیرنده فعال', icon: 'lucide:users-round' },
    { value: '+۲۰۰', label: 'دوره آموزشی', icon: 'lucide:monitor-play' },
    { value: '+۵۰', label: 'مدرس متخصص', icon: 'lucide:user-round' },
  ],
  cta: { label: 'مشاهده همه مدرس‌ها', href: '/agents' },
};

/* ── Footer ─────────────────────────────────────────────────── */

/** Pre-footer conversion banner. */
export const footerCta = {
  slot: 'ar-footer-cta',
  title: 'آماده‌اید مسیر رشد خود را شروع کنید؟',
  text: 'با آریاز، مهارت‌های خود را ارتقا دهید و آینده شغلی و سازمانی خود را بسازید.',
  primary: { label: 'شروع یادگیری', href: '/courses', icon: 'lucide:user-round' },
  secondary: { label: 'درخواست مشاوره سازمانی', href: '/org', icon: 'lucide:building-2' },
};

export const footerBrand = {
  headline: ['رشد انسان‌ها،', 'توانمندسازی سازمان‌ها'],
  desc: 'پلتفرم یکپارچه یادگیری، توسعه فردی و راهکارهای سازمانی برای رشد فردی و سازمانی شما.',
};

export const footerColumns = [
  {
    title: 'دسترسی سریع',
    links: [
      { label: 'دوره‌ها', href: '/courses', icon: 'lucide:monitor-play' },
      { label: 'مسیرهای یادگیری', href: '/learning-paths', icon: 'lucide:route' },
      { label: 'ابزارهای رایگان', href: '/library', icon: 'lucide:gift' },
      { label: 'ایجنت‌های هوشمند', href: '/agents', icon: 'lucide:bot' },
      { label: 'مقالات', href: '/articles', icon: 'lucide:file-pen-line' },
    ],
  },
  {
    title: 'برای سازمان‌ها',
    links: [
      { label: 'خدمات سازمانی', href: '/org', icon: 'lucide:briefcase' },
      { label: 'مشاوره منابع انسانی', href: '/org', icon: 'lucide:users-round' },
      { label: 'طراحی سیستم‌های HR', href: '/org', icon: 'lucide:settings' },
      { label: 'توسعه مدیران', href: '/learning-paths', icon: 'lucide:user-round' },
    ],
  },
  {
    title: 'پشتیبانی و قوانین',
    links: [
      { label: 'تماس با ما', href: '/support', icon: 'lucide:headphones' },
      { label: 'سوالات متداول', href: '/support', icon: 'lucide:circle-help' },
      { label: 'استعلام گواهینامه', href: '/support', icon: 'lucide:file-text' },
      { label: 'قوانین و مقررات', href: '/laws', icon: 'lucide:scale' },
      { label: 'حریم خصوصی', href: '/laws', icon: 'lucide:shield-check' },
    ],
  },
];

export const footerTrust = [
  { title: 'پرداخت امن', sub: 'Secure Payment', icon: 'lucide:credit-card' },
  { title: 'SSL', sub: 'Secure Connection', icon: 'lucide:lock' },
  { title: 'نماد اعتماد الکترونیکی', sub: 'enamad.ir', icon: 'lucide:badge-check' },
];

export const footerContact = {
  title: 'ارتباط با ما',
  phone: { value: '۰۲۱-۹۱۰۱۷۱۳۴', href: 'tel:02191017134', icon: 'lucide:phone' },
  mobile: { value: '۰۹۱۲ ۱۳۳ ۴۶۶۷', href: 'tel:09121334667', icon: 'ic:baseline-whatsapp' },
  address: {
    value: 'تهران، خیابان ولیعصر، بالاتر از میدان ونک، خیابان شهید خدامی، پلاک ۱۴ واحد ۴',
    icon: 'lucide:map-pin',
  },
};

export const footerSocial = [
  { label: 'LinkedIn', icon: 'mdi:linkedin', color: '#0A66C2', href: '#' },
  { label: 'Instagram', icon: 'mdi:instagram', color: '#E4405F', href: '#' },
  { label: 'Telegram', icon: 'mdi:telegram', color: '#26A5E4', href: '#' },
  { label: 'WhatsApp', icon: 'ic:baseline-whatsapp', color: '#25D366', href: '#' },
];

export const footerLegal = {
  copyright: '© ۱۴۰۵ آریاز. تمامی حقوق محفوظ است.',
};

/* ── Mobile sticky bottom bar ───────────────────────────────── */

/* Bottom bar on mobile. `action: 'menu'` opens the drill-down sheet
   instead of navigating; everything else is a destination. */
export const mobileTabs: {
  label: string;
  icon: string;
  iconActive?: string;
  href?: string;
  action?: 'menu';
}[] = [
  { label: 'حساب کاربری', icon: 'lucide:user-round', href: '/support' },
  { label: 'جستجو', icon: 'lucide:search', href: '/search' },
  { label: 'منو', icon: 'lucide:layout-grid', iconActive: 'lucide:x', action: 'menu' },
  { label: 'خانه', icon: 'lucide:house', href: '/' },
  { label: 'مشاوره', icon: 'lucide:handshake', href: '/org' },
];

/** Icon-tile colour per section, in the manner of an iOS settings list. */
export const navTileColors: Record<string, string> = {
  free: '#F97316',
  courses: '#2563EB',
  org: '#4F46E5',
  tools: '#0D9488',
  agents: '#7C3AED',
  shop: '#E11D48',
  membership: '#D97706',
  salary: '#16A34A',
  support: '#64748B',
};

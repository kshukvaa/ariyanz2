/* ──────────────────────────────────────────────────────────────
   Organisational services — /org

   Screen 46: the public landing for Aryaz's B2B services. No
   panel chrome — this sits in front of the sign-in wall, and a
   static route at /org overrides the generic [slug] template that
   `mainPages` would otherwise render for it.

   Asset note — the hero in the mockup is a bespoke 3D city
   illustration that the shipped library does not contain. The
   hero is built as a composed scene from the brand mark and the
   three service cards instead, so nothing is faked with a
   stand-in image that means something else.
────────────────────────────────────────────────────────────── */

export const servicesHero = {
  badge: 'خدمات سازمانی آریاز',
  title: ['راهکارهای تخصصی سرمایه انسانی', 'برای سازمان‌ها'],
  desc: 'از برون‌سپاری فرآیندهای منابع انسانی تا طراحی و استقرار سیستم‌های سازمانی، آریاز همراه سازمان‌ها برای ساختن سرمایه انسانی توانمندتر است.',
  primary: 'درخواست مشاوره سازمانی',
  secondary: 'مشاهده خدمات',
  cards: [
    { label: 'برون‌سپاری فرآیندها', icon: 'lucide:workflow', tone: 'blue' as const },
    { label: 'طراحی و استقرار سیستم‌ها', icon: 'lucide:layers', tone: 'green' as const },
    { label: 'مشاوره‌های سازمانی', icon: 'lucide:users-round', tone: 'orange' as const },
  ],
};

export const servicesNeeds = {
  title: 'شما چه نیازی دارید؟',
  cta: 'مشاهده',
  groups: [
    {
      id: 'consulting',
      title: 'مشاوره‌های سازمانی',
      desc: 'دریافت مشاوره تخصصی در حوزه‌های مسائل کلیدی سرمایه انسانی و قوانین',
      tone: 'orange' as const,
      icon: 'lucide:users-round',
      cta: 'مشاهده مشاوره‌ها',
      items: [
        { label: 'مشاوره تخصصی قوانین کار', icon: 'lucide:scale' },
        { label: 'مشاوره تخصصی تأمین اجتماعی', icon: 'lucide:shield-check' },
        { label: 'مشاوره تخصصی منابع انسانی', icon: 'lucide:user-round' },
      ],
    },
    {
      id: 'systems',
      title: 'طراحی و استقرار سیستم‌ها',
      desc: 'طراحی، پیاده‌سازی و استقرار سیستم‌های منابع انسانی متناسب با نیاز و ساختار سازمان شما',
      tone: 'green' as const,
      icon: 'lucide:book-open',
      cta: 'مشاهده خدمات طراحی',
      items: [
        { label: 'نظام‌های انگیزشی و برند کارفرمایی', icon: 'lucide:star' },
        { label: 'طراحی فرآیندهای منابع انسانی', icon: 'lucide:workflow' },
        { label: 'طراحی ساختار سازمانی', icon: 'lucide:layout-grid' },
      ],
    },
    {
      id: 'outsourcing',
      title: 'برون‌سپاری فرآیندهای منابع انسانی',
      desc: 'مدیریت و اجرای بخشی از فرآیندهای منابع انسانی توسط متخصصان آریاز با استانداردهای حرفه‌ای',
      tone: 'blue' as const,
      icon: 'lucide:settings',
      cta: 'مشاهده خدمات برون‌سپاری',
      items: [
        { label: 'برون‌سپاری واحد HR', icon: 'lucide:briefcase' },
        { label: 'مالیات حقوق', icon: 'lucide:wallet' },
        { label: 'بیمه و کارکرد', icon: 'lucide:shield-check' },
        { label: 'جذب و استخدام', icon: 'lucide:user-round-plus' },
      ],
    },
  ],
};

export const servicesWhy = {
  title: 'چرا سازمان‌ها آریاز را انتخاب می‌کنند؟',
  image: '/images/aryaz/thumbnails/video-07-manager-communication.png',
  cards: [
    { label: 'همراهی تا استقرار', desc: 'از تحلیل و طراحی تا آموزش و پایش نتایج در کنار شما', icon: 'lucide:shield-check' },
    { label: 'راهکار متناسب با سازمان', desc: 'طراحی راهکارهای سفارشی متناسب با نیاز و شرایط شما', icon: 'lucide:target' },
    { label: 'ترکیب دانش و فناوری', desc: 'ترکیب مشاوره تخصصی با هوش مصنوعی و ابزارهای دیجیتال', icon: 'lucide:brain' },
    { label: 'تجربه اجرایی واقعی', desc: 'راهکارهای عملی بر اساس تجربه اجرایی در سازمان‌های متنوع', icon: 'lucide:briefcase' },
  ],
};

export const servicesTop = {
  title: 'پرتقاضاترین خدمات سازمانی',
  cta: 'مشاهده جزئیات',
  cards: [
    {
      id: 'law',
      label: 'مشاوره قوانین کار و تأمین اجتماعی',
      tone: 'blue' as const,
      icon: 'lucide:scale',
      items: ['تحلیل وضعیت و ریسک‌ها', 'انطباق با قوانین و مقررات', 'دفاع در اختلافات کارگری', 'همراهی تا حل فصل پرونده‌ها'],
    },
    {
      id: 'process',
      label: 'طراحی فرآیندهای منابع انسانی',
      tone: 'orange' as const,
      icon: 'lucide:workflow',
      items: ['نقشه فرآیندهای کلیدی HR', 'طراحی شرح‌ها و دستورالعمل‌ها', 'یکپارچگی و اثربخشی', 'استقرار و آموزش'],
    },
    {
      id: 'structure',
      label: 'طراحی ساختار سازمانی',
      tone: 'green' as const,
      icon: 'lucide:layout-grid',
      items: ['تحلیل ساختار موجود', 'طراحی چارت و رده‌بندی', 'طراحی شرح مشاغل', 'تبیین سطوح سازمانی'],
    },
    {
      id: 'hiring',
      label: 'جذب و استخدام برون‌سپاری',
      tone: 'purple' as const,
      icon: 'lucide:user-round-plus',
      items: ['تأمین و جذب تخصصی', 'غربالگری و ارزیابی', 'مصاحبه و آزمون', 'ارائه گزینه‌های نهایی'],
    },
  ],
};

export const servicesPath = {
  title: 'مسیر همکاری با آریاز چگونه است؟',
  steps: [
    { n: '۱', label: 'نیازسنجی', desc: 'شناخت نیازها و چالش‌های سازمان شما', icon: 'lucide:search' },
    { n: '۲', label: 'تحلیل وضعیت موجود', desc: 'بررسی فرآیندها، ساختار و داده‌های سازمان', icon: 'lucide:chart-no-axes-combined' },
    { n: '۳', label: 'ارائه پیشنهاد', desc: 'ارائه راهکار مبتنی بر شواهد و بودجه تیم', icon: 'lucide:clipboard-list' },
    { n: '۴', label: 'اجرا و استقرار', desc: 'پیاده‌سازی با همراهی تیم متخصصان آریاز', icon: 'lucide:rocket' },
    { n: '۵', label: 'پایش و بهبود', desc: 'اندازه‌گیری نتایج و بهبود مستمر فرآیندها', icon: 'lucide:refresh-cw' },
  ],
};

export const servicesDomains = {
  title: 'حوزه‌های تخصصی ما',
  items: [
    { label: 'منابع انسانی', icon: 'lucide:users-round' },
    { label: 'ساختار سازمانی', icon: 'lucide:layout-grid' },
    { label: 'فرآیندها', icon: 'lucide:workflow' },
    { label: 'جبران خدمات', icon: 'lucide:wallet' },
    { label: 'همسویی حمایتی', icon: 'lucide:handshake' },
    { label: 'مسائل حقوقی', icon: 'lucide:scale' },
    { label: 'عملکرد', icon: 'lucide:trending-up' },
    { label: 'توسعه و جانشینی', icon: 'lucide:star' },
    { label: 'تربیت نیرو', icon: 'lucide:graduation-cap' },
    { label: 'برند کارفرمایی', icon: 'lucide:megaphone' },
  ],
};

export const servicesCase = {
  title: 'نمونه تجربه‌های ما',
  image: '/images/aryaz/thumbnails/video-09-org-culture.png',
  company: 'شرکت پخش مواد غذایی',
  desc: 'طراحی و استقرار نظام ارزیابی عملکرد',
  items: [
    'طراحی مدل ارزیابی متناسب با فرهنگ سازمان',
    'پیاده‌سازی و آموزش تیم‌ها',
    'افزایش شفافیت و انگیزش کارکنان',
    'گزارش‌گیری مدیریتی و داشبورد نتایج',
  ],
  cta: 'مشاهده سایر پروژه‌ها',
};

export const servicesHelp = {
  title: 'نمی‌دانید کدام خدمت مناسب شماست؟',
  desc: 'با دستیار هوشمند آریاز گفتگو کنید تا با چند سوال کوتاه، بهترین راهکار را به شما پیشنهاد دهد.',
  cta: 'شروع نیازسنجی هوشمند',
  art: '/images/aryaz/illustrations/ai-assistant-avatar.png',
};

export const servicesCta = {
  title: 'آماده شروع تحول سرمایه انسانی در سازمان شما هستیم.',
  desc: 'برای دریافت مشاوره رایگان، فرم نیازسنجی را تکمیل کنید یا همین حالا با ما تماس بگیرید.',
  primary: 'تکمیل فرم نیازسنجی',
  secondary: 'تماس با ما',
  art: '/images/aryaz/illustrations/cta-robot-mascot.png',
};

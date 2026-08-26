/* ──────────────────────────────────────────────────────────────
   Shared frame for the four counselling wizards.
   Sources: «In-person consultation», «Reserve Expert Wizard 1–3,5»,
            «request to expert wizard 1–4»,
            «request for consulting on case — page 1»

   All four mockups draw the same frame and differ only in the
   middle: the expert header with the green «در دسترس» pill, a
   four-dot stepper, a benefits card on the left, an Aryaz agent
   on the right, and a two-button footer. Transcribed once here.

   STEP NUMBERING, resolved by the designer mid-build: the reserve
   wizard's four screens are named 1, 2, 3 and **5** on disk —
   file «page 5» IS step 4, and no separate page 4 exists. So the
   reserve wizard is complete; nothing is missing from it.

   Only step 1 is drawn for the in-person and case wizards. Their
   steppers still show all four stages, because that is what the
   mockup shows — the later panels simply have no source yet.
────────────────────────────────────────────────────────────── */

const A = '/images/aryaz/avatars';

export const wizardExpert = {
  name: 'دکتر امیر حسینی',
  title: 'مشاور ارشد روابط کار و قانون کار',
  avatar: `${A}/expert-01-lawyer.png`,
  pill: 'در دسترس برای رزرو',
  stats: [
    { value: '۳۴۸', label: 'مشاوره انجام‌شده' },
    { value: '۱۸ سال', label: 'سابقه مشاوره' },
    { value: '۴.۹', label: 'امتیاز کاربران', star: true },
  ],
};

export const wizardTrust = {
  title: 'با آریاز مطمئن رزرو کنید',
  icon: 'lucide:shield-check',
  items: [
    { label: 'اطلاعات شما کاملاً محرمانه و امن است', icon: 'lucide:mail' },
    { label: 'تغییر یا لغو جلسه تا ۲۴ ساعت قبل امکان‌پذیر است', icon: 'lucide:users-round' },
    { label: 'در صورت عدم رضایت، جلسه بعدی رایگان', icon: 'lucide:users-round' },
    { label: 'پشتیبانی اختصاصی قبل، حین و بعد از جلسه', icon: 'lucide:user-round' },
  ],
};

export const wizardHelp = {
  title: 'نیاز به کمک دارید؟',
  desc: 'تیم مشاوره آریاز از ساعت ۹ تا ۲۰ پاسخگوی شماست.',
  phone: '۰۲۱-۹۱۰۰-۱۰۰۰',
  icon: 'lucide:headphones',
};

/* ── In-person ─────────────────────────────────────────────── */

export const inPerson = {
  lead: 'رزرو جلسه حضوری با',
  steps: ['انتخاب محل و زمان', 'شرح موضوع و مدارک', 'مرور رزرو', 'پرداخت و تأیید'],
  status: {
    title: 'وضعیت پذیرش',
    rows: [
      { label: 'پذیرش درخواست جدید', ok: true },
      { label: 'نوع مشاوره', value: 'حضوری و آنلاین' },
      { label: 'میانگین زمان پاسخ', value: '۲ ساعت' },
      { label: 'نرخ پاسخگویی', value: '۹۶٪' },
    ],
  },
  benefits: {
    title: 'مزایای جلسه حضوری',
    icon: 'lucide:monitor-play',
    items: [
      'بررسی عمیق‌تر و دقیق‌تر مسئله',
      'امکان تحلیل اسناد و مدارک کاغذی',
      'تعامل مستقیم و هم‌فکری بیشتر',
      'ارائه راهکارهای عملی و اجرایی',
    ],
  },
  places: {
    title: '۱. محل برگزاری جلسه را انتخاب کنید',
    icon: 'lucide:map-pin',
    items: [
      {
        id: 'org',
        title: 'محل سازمان شما',
        desc: 'مشاور به محل سازمان شما مراجعه می‌کند',
        icon: 'lucide:map-pin',
        selected: true,
      },
      {
        id: 'aryaz',
        title: 'مرکز مشاوره آریاز',
        desc: 'تهران، سعادت‌آباد، بالاتر از میدان کاج، خیابان سوم، پلاک ۱۲',
        icon: 'lucide:building',
        free: 'بدون هزینه رفت‌وآمد',
      },
      {
        id: 'office',
        title: 'دفتر مشاور',
        desc: 'تهران، خیابان ملاصدرا، خیابان شیخ بهایی جنوبی، پلاک ۳۴ واحد ۴',
        icon: 'lucide:building',
        free: 'بدون هزینه رفت‌وآمد',
      },
    ],
  },
  address: {
    selects: [
      { label: 'استان', value: 'تهران' },
      { label: 'شهر', value: 'تهران' },
      { label: 'منطقه', value: 'منطقه ۲' },
    ],
    field: { label: 'آدرس دقیق محل سازمان', required: true, value: 'تهران، سعادت آباد، خیابان سرو شرقی، پلاک ۱۵، شرکت توسعه تجارت آریا' },
    fee: {
      label: 'هزینه حضور در محل شما',
      value: '۷۵۰,۰۰۰ تومان',
      note: 'این مبلغ در مرحله بعد به هزینه نهایی اضافه خواهد شد.',
      icon: 'lucide:briefcase',
    },
  },
  durations: {
    title: '۲. مدت جلسه را انتخاب کنید',
    items: [
      { label: '۹۰ دقیقه', price: '۲,۰۰۰,۰۰۰ تومان', note: 'مناسب بررسی کامل و عمیق', selected: true },
      { label: '۱۳۰ دقیقه', price: '۲,۸۰۰,۰۰۰ تومان', note: 'مناسب مسائل پیچیده چند موضوعی' },
    ],
  },
  attendees: {
    title: '۳. چند نفر در جلسه حضور خواهند داشت؟',
    icon: 'lucide:users-round',
    items: [
      { label: '۱ نفر', note: 'مناسب جلسات فردی' },
      { label: '۲ تا ۳ نفر', note: 'مناسب تیم‌های کوچک', selected: true },
      { label: '۴ تا ۶ نفر', note: 'مناسب جلسات تیم‌بندی' },
      { label: 'بیشتر از ۶ نفر', note: 'مناسب کارگاه و همایش' },
    ],
    note: 'لطفاً تعداد تقریبی افراد حاضر در جلسه را انتخاب کنید.',
  },
  date: {
    title: '۴. تاریخ جلسه را انتخاب کنید',
    icon: 'lucide:calendar',
    month: 'مرداد ۱۴۰۴',
    weekdays: ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'],
    days: 31,
    startWeekday: 5,
    selected: 27,
    available: [16, 17, 18, 19, 20, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
    legend: [
      { label: 'روزهای قابل رزرو', ok: true },
      { label: 'روزهای غیرقابل رزرو', ok: false },
    ],
  },
  time: {
    title: '۵. ساعت جلسه را انتخاب کنید',
    icon: 'lucide:clock',
    slots: ['۰۹:۰۰', '۱۱:۰۰', '۱۴:۰۰', '۱۶:۰۰', '۱۸:۰۰'],
    selected: '۱۶:۰۰',
  },
  agent: {
    title: 'آریاز همراه شماست',
    bubble: 'برای برنامه‌ریزی بهترین جلسه حضوری در کنار شما هستم. هر سوالی دارید بپرسید تا راهنمایی‌تان کنم.',
    chips: [
      'حضوری بهتر است یا آنلاین؟',
      'جلسه چند دقیقه‌ای انتخاب کنیم؟',
      'مشاور به محل سازمان ما می‌آید؟',
      'هزینه حضور در محل چقدر است؟',
      'چه کسانی بهتر است در جلسه حضور داشته باشند؟',
      'برای جلسه چه مدارکی آماده کنیم؟',
    ],
    placeholder: 'سوال خود را بنویسید.',
  },
  footer: {
    next: { label: 'تأیید محل و زمان و ادامه', icon: 'lucide:arrow-left' },
    back: { label: 'بازگشت به پروفایل مشاور', icon: 'lucide:arrow-right', href: '/counseling/experts/amir-hosseini' },
  },
};

/* ── Reserve (online session) ──────────────────────────────── */

export const reserve = {
  lead: 'رزرو جلسه آنلاین با',
  steps: ['انتخاب زمان', 'شرح موضوع و مدارک', 'مرور رزرو', 'پرداخت و تأیید'],
  railTitle: 'مراحل رزرو',
  benefits: {
    title: 'جلسه مشاوره آنلاین',
    icon: 'lucide:monitor-play',
    items: [
      'تماس تصویری با مشاور',
      'امکان ارسال فایل قبل از جلسه',
      'امکان یادداشت‌برداری در جلسه',
      'دریافت خلاصه جلسه در پایان',
    ],
  },
  step1: {
    title: '۱. مدت جلسه را انتخاب کنید',
    icon: 'lucide:clock',
    durations: [
      { label: '۳۰ دقیقه', price: '۹۵۰,۰۰۰ تومان', note: 'مناسب یک سؤال مشخص' },
      { label: '۶۰ دقیقه', price: '۱,۸۰۰,۰۰۰ تومان', note: 'مناسب بررسی کامل‌تر', selected: true, badge: 'پیشنهادی' },
      { label: '۹۰ دقیقه', price: '۲,۵۰۰,۰۰۰ تومان', note: 'مناسب مسائل پیچیده' },
    ],
    agent: {
      title: 'آریاز در انتخاب زمان کمکتان می‌کند',
      bubble: 'اگر مطمئن نیستید کدام مدت زمان مناسب‌تر است یا بهترین زمان را می‌خواهید، من در کنار شما هستم.',
      chips: ['۳۰ دقیقه کافی است؟', 'بهترین ساعت کدام است؟', 'چه زمانی مشاور آزاد است؟'],
    },
  },
  step2: {
    title: '۱. موضوع جلسه چیست؟',
    icon: 'lucide:file-text',
    fields: [
      { label: 'عنوان جلسه', required: true, value: 'بررسی شرایط خاتمه همکاری مدیر فروش' },
      { label: 'توضیح کامل موضوع', required: true, kind: 'rich' as const, placeholder: 'شرح کامل موضوع را بنویسید...' },
    ],
    agent: {
      title: 'آریاز همراه شماست',
      bubble: 'کمکتان می‌کنم جلسه را بهتر تنظیم کنید: موضوع را بنویسید تا توضیحش را خلاصه و مرتب کنم و بگویم چه مدارکی بهتر است ارسال کنید.',
      chips: ['موضوع را خلاصه کن', 'چه مدارکی لازم است؟'],
    },
  },
  step3: {
    title: 'مرور رزرو',
    summary: {
      title: 'خلاصه رزرو شما',
      rows: [
        { label: 'مدت جلسه:', value: '۶۰ دقیقه', icon: 'lucide:clock' },
        { label: 'تاریخ جلسه:', value: 'سه‌شنبه ۲۷ مرداد ۱۴۰۵', icon: 'lucide:calendar' },
        { label: 'ساعت جلسه:', value: '۱۶:۳۰ تا ۱۷:۳۰', icon: 'lucide:clock' },
        { label: 'موضوع جلسه:', value: 'بررسی شرایط خاتمه همکاری مدیر فروش', icon: 'lucide:file-text' },
        { label: 'مدارک پیوست:', value: '۳ فایل پیوست', icon: 'lucide:paperclip' },
      ],
      edits: [
        { label: 'ویرایش زمان جلسه', icon: 'lucide:calendar' },
        { label: 'ویرایش موضوع و مدارک', icon: 'lucide:paperclip' },
      ],
    },
    brief: {
      title: 'خلاصه‌ای که آریاز برای جلسه آماده کرده',
      icon: 'lucide:sparkles',
      body: 'در این جلسه قرار است وضعیت حقوقی خاتمه همکاری مدیر فروش با توجه به نوع قرارداد، سابقه همکاری، مستندات عملکرد و ریسک‌های احتمالی بررسی شود و در نهایت درباره اقدام مناسب و کم‌ریسک، تصمیم‌گیری شود.',
      goalsTitle: 'اهداف جلسه',
      goals: [
        { label: 'بررسی وضعیت قانونی', icon: 'lucide:scale' },
        { label: 'ارزیابی ریسک', icon: 'lucide:shield-check' },
        { label: 'بررسی مدارک', icon: 'lucide:folder' },
        { label: 'ارائه راهکار', icon: 'lucide:lightbulb' },
        { label: 'تعیین اقدام بعدی', icon: 'lucide:target' },
      ],
    },
    docsTitle: 'مدارک آماده‌شده برای مشاور',
    docs: ['قرارداد کار مدیر فروش.pdf', 'گزارش عملکرد سه ماهه.xlsx', 'صورت‌جلسه هشدار عملکردی.pdf'],
    agent: {
      title: 'آریاز همراه شماست',
      bubble: 'قبل از پرداخت در خدمتم. هر سؤالی درباره جلسه، زمان یا مدارک با فرایند پرداخت دارید بپرسید تا راهنمایی‌تان کنم.',
      chips: [
        'چیزی از جلسه جا مانده؟',
        'خلاصه جلسه را توضیح بده',
        'آیا ۶۰ دقیقه کافی است؟',
        'چه سؤال‌هایی از مشاور بپرسم؟',
        'مدارکم کافی هستند؟',
      ],
    },
  },
  step4: {
    title: 'خلاصه نهایی رزرو شما',
    icon: 'lucide:calendar',
    cells: [
      { label: 'نوع جلسه', value: 'آنلاین', icon: 'lucide:video' },
      { label: 'مدت جلسه', value: '۶۰ دقیقه', icon: 'lucide:clock' },
      { label: 'تاریخ', value: 'سه‌شنبه ۲۷ مرداد ۱۴۰۵', icon: 'lucide:calendar' },
      { label: 'ساعت', value: '۱۶:۳۰ تا ۱۷:۳۰', icon: 'lucide:clock' },
      { label: 'موضوع', value: 'بررسی شرایط خاتمه همکاری مدیر فروش', icon: 'lucide:file-text' },
    ],
    payTitle: 'مبلغ قابل پرداخت',
    payRows: [
      { label: 'هزینه جلسه ۶۰ دقیقه‌ای', value: '۱,۸۰۰,۰۰۰ تومان' },
      { label: 'مالیات بر ارزش افزوده', value: '۱۶۲,۰۰۰ تومان' },
    ],
    payTotal: { label: 'جمع کل', value: '۱,۹۶۲,۰۰۰ تومان' },
    pay: { label: 'پرداخت و تأیید رزرو', icon: 'lucide:shield-check' },
    agent: {
      title: 'آریاز همراه شماست',
      bubble: 'قبل از پرداخت در خدمتم. هر سؤالی درباره جلسه، زمان یا مدارک با فرایند پرداخت دارید بپرسید تا راهنمایی‌تان کنم.',
      chips: ['فاکتور را برایم توضیح بده', 'امکان لغو دارم؟'],
    },
  },
  footer: {
    next: { label: 'تأیید و ادامه', icon: 'lucide:arrow-left' },
    back: { label: 'بازگشت به پروفایل مشاور', icon: 'lucide:arrow-right', href: '/counseling/experts/amir-hosseini' },
  },
};

/* ── Ask (written question) ────────────────────────────────── */

export const ask = {
  lead: 'ارسال سؤال تخصصی به',
  steps: ['شرح مسئله', 'مدارک و اطلاعات', 'بررسی آریاز', 'مرور و پرداخت'],
  railTitle: 'مراحل ارسال سؤال',
  banner: 'هرچه اطلاعات دقیق‌تر باشد، مشاور سریع‌تر و بهتر می‌تواند به سؤال شما پاسخ دهد.',
  benefits: {
    title: 'پاسخ تخصصی به سؤال',
    icon: 'lucide:message-circle',
    items: [
      'پاسخ مکتوب و مستند',
      'امکان پیوست مدارک',
      'بررسی توسط مشاور متخصص',
      'دریافت پاسخ در کمتر از ۴۸ ساعت',
    ],
  },
  step1: {
    title: '۱. مسئله شما چیست؟',
    icon: 'lucide:message-circle',
    fields: [
      { label: 'موضوع سؤال', required: true, placeholder: 'موضوع سؤال خود را به صورت خلاصه وارد کنید...' },
      { label: 'شرح کامل مسئله', required: true, kind: 'rich' as const, placeholder: 'مسئله خود را با تمام جزئیات بنویسید...' },
    ],
    agent: {
      title: 'آریاز در تنظیم سؤال کمکتان می‌کند',
      bubble: 'من می‌توانم قبل از ارسال، مسئله شما را بررسی کنم تا اطلاعات مهمی که مشاور برای پاسخ دقیق نیاز دارد جا نمانده باشد.',
      chips: ['سؤالم را واضح‌تر کن', 'چه اطلاعاتی کم است؟', 'این سؤال مربوط به چه حوزه‌ای است؟'],
    },
  },
  step2: {
    title: '۲. مدارک و اطلاعات تکمیلی',
    icon: 'lucide:paperclip',
    drop: {
      title: 'فایل خود را اینجا بکشید و رها کنید',
      hint: 'یا برای انتخاب فایل کلیک کنید',
      formats: 'فرمت‌های مجاز: PDF، Word، تصویر',
      limit: 'حداکثر حجم ۲۰ مگابایت',
    },
    fields: [
      { label: 'حوزه تخصصی', kind: 'select' as const, placeholder: 'انتخاب حوزه' },
      { label: 'فوریت پاسخ', kind: 'select' as const, placeholder: 'عادی (تا ۴۸ ساعت)' },
    ],
    agent: {
      title: 'آریاز همراه شماست',
      bubble: 'اگر مطمئن نیستید چه مدرکی لازم است، توضیح دهید تا فهرست مدارک مورد نیاز را برایتان بنویسم.',
      chips: ['چه مدارکی لازم است؟', 'مدارکم کافی هستند؟'],
    },
  },
  step3: {
    title: '۳. بررسی آریاز',
    icon: 'lucide:sparkles',
    body: 'آریاز سؤال شما را پیش از ارسال بررسی کرده و نکاتی را که کامل‌تر شدنشان به پاسخ دقیق‌تر کمک می‌کند مشخص کرده است.',
    checks: [
      { label: 'موضوع سؤال روشن است', ok: true },
      { label: 'حوزه تخصصی درست انتخاب شده است', ok: true },
      { label: 'نوع قرارداد مشخص نشده است', ok: false },
      { label: 'سابقه همکاری ذکر نشده است', ok: false },
    ],
    agent: {
      title: 'آریاز همراه شماست',
      bubble: 'می‌توانم موارد ناقص را با چند سؤال کوتاه کامل کنم تا مشاور بتواند دقیق‌تر پاسخ دهد.',
      chips: ['موارد ناقص را کامل کن', 'همین‌طور ارسال کن'],
    },
  },
  step4: {
    title: '۴. مرور و پرداخت',
    icon: 'lucide:shield-check',
    summaryTitle: 'خلاصه سؤال شما',
    rows: [
      { label: 'موضوع:', value: 'شرایط خاتمه همکاری مدیر فروش', icon: 'lucide:file-text' },
      { label: 'حوزه تخصصی:', value: 'روابط کار و قانون کار', icon: 'lucide:scale' },
      { label: 'مدارک پیوست:', value: '۲ فایل پیوست', icon: 'lucide:paperclip' },
      { label: 'زمان پاسخ:', value: 'تا ۴۸ ساعت', icon: 'lucide:clock' },
    ],
    payTitle: 'مبلغ قابل پرداخت',
    payRows: [
      { label: 'پاسخ تخصصی به سؤال', value: '۹۵۰,۰۰۰ تومان' },
      { label: 'مالیات بر ارزش افزوده', value: '۸۵,۵۰۰ تومان' },
    ],
    payTotal: { label: 'جمع کل', value: '۱,۰۳۵,۵۰۰ تومان' },
    pay: { label: 'پرداخت و ارسال سؤال', icon: 'lucide:send' },
    agent: {
      title: 'آریاز همراه شماست',
      bubble: 'قبل از پرداخت در خدمتم. هر سؤالی درباره فرایند یا هزینه دارید بپرسید.',
      chips: ['فاکتور را توضیح بده', 'اگر پاسخ نگرفتم چه؟'],
    },
  },
  footer: {
    next: { label: 'تأیید و ادامه', icon: 'lucide:arrow-left' },
    back: { label: 'بازگشت به پروفایل مشاور', icon: 'lucide:arrow-right', href: '/counseling/experts/amir-hosseini' },
  },
};

/* ── Case review ───────────────────────────────────────────── */

export const caseWizard = {
  lead: 'درخواست بررسی پرونده تخصصی با',
  /* «page 1» draws four circles but «page 2» and «page 3» draw
     five — and page 3 IS the «بررسی آریاز» step, so the five-step
     rail is the later, correct one. */
  steps: ['تعریف پرونده', 'اطلاعات و مدارک', 'بررسی آریاز', 'تعیین دامنه و هزینه', 'پرداخت و ارجاع'],
  pillOverride: 'در دسترس برای پرونده',
  fields: {
    title: 'تخصص‌ها',
    icon: 'lucide:sparkles',
    items: ['روابط کار و قانون کار', 'قراردادهای کار و کار کارگری', 'خاتمه همکاری و دعاوی'],
    all: 'مشاهده همه تخصص‌ها',
  },
  benefits: {
    title: 'پرونده تخصصی چیست؟',
    icon: 'lucide:folder',
    items: [
      'بررسی عمیق و تخصصی پرونده شما',
      'تحلیل مدارک و مستندات',
      'ارائه نظر مکتوب و راهکارهای عملی',
      'همراهی تا تعیین تکلیف پرونده',
    ],
    more: 'اطلاعات بیشتر',
  },
  /* Steps 2 and 3 swap the «پرونده تخصصی چیست؟» card for the
     process list — «page 2» draws five bullets, one more than
     step 1's benefits card. */
  process: {
    title: 'فرآیند بررسی پرونده تخصصی',
    icon: 'lucide:folder',
    items: [
      'بررسی عمیق و همه‌جانبه پرونده',
      'تحلیل مدارک و مستندات',
      'ارائه نظر تخصصی و راهکارها',
      'همراهی تا تعیین تکلیف پرونده',
      'حفظ محرمانگی و امنیت اطلاعات',
    ],
    more: 'اطلاعات بیشتر',
  },
  notice: 'هزینه بررسی پرونده پس از ارزیابی حجم مدارک، پیچیدگی موضوع و دامنه خدمت مشخص می‌شود.',
  /* «page 1» numbers six groups; the last three sit side by side
     in a three-column row under the description box. */
  step1: {
    title: '۱. پرونده شما درباره چیست؟',
    icon: 'lucide:file-text',
    fields: [
      {
        label: 'عنوان پرونده',
        required: true,
        placeholder: 'مثال: بررسی پرونده خاتمه همکاری مدیر فروش',
      },
      {
        label: 'حوزه پرونده',
        required: true,
        kind: 'chips' as const,
        options: [
          { label: 'روابط کار', icon: 'lucide:user-round', checked: true },
          { label: 'خاتمه اداره کار', icon: 'lucide:file-text' },
          { label: 'دعاوی اداره کار', icon: 'lucide:scale' },
          { label: 'آیین‌نامه‌ها', icon: 'lucide:book-open' },
          { label: 'بیمه و تأمین اجتماعی', icon: 'lucide:shield' },
          { label: 'سایر', icon: 'lucide:ellipsis' },
        ],
      },
      {
        label: '۲. مسئله را از ابتدا برای مشاور توضیح دهید',
        required: true,
        kind: 'rich' as const,
        limit: 2000,
        placeholder:
          'لطفاً جزئیات کامل موضوع را بنویسید: شرح اتفاقات، طرف‌های پرونده، تاریخ‌ها، اقدامات انجام‌شده و هر نکته‌ای که مشاور باید بداند.',
      },
    ],
    /* The three-up row. */
    columns: [
      {
        label: '۳. الان پرونده در چه وضعیتی است؟',
        kind: 'radio' as const,
        options: [
          { label: 'هنوز اقدامی نشده', checked: true },
          { label: 'اقدام داخلی انجام شده' },
          { label: 'مکاتبه / اخطار انجام شده' },
          { label: 'پرونده در مرجع قانونی مطرح شده' },
          { label: 'رأی صادر شده' },
          { label: 'در مرحله اعتراض هستیم' },
        ],
      },
      {
        label: '۴. از مشاور چه انتظاری دارید؟',
        hint: '(می‌توانید چند مورد انتخاب کنید)',
        kind: 'checks' as const,
        options: [
          { label: 'بررسی کامل پرونده', checked: true },
          { label: 'تشخیص ریسک‌ها', checked: true },
          { label: 'بررسی مستندات', checked: true },
          { label: 'ارائه نظر تخصصی', checked: true },
          { label: 'پیشنهاد اقدام بعدی', checked: true },
          { label: 'تنظیم پاسخ / لایحه / مستند' },
          { label: 'همراهی تا تعیین تکلیف پرونده' },
        ],
      },
      {
        label: '۵. میزان فوریت پرونده',
        kind: 'radio' as const,
        options: [
          { label: 'عادی', checked: true },
          { label: 'فوری' },
          { label: 'بسیار فوری' },
        ],
      },
    ],
  },
  agent: {
    title: 'آریاز در تشکیل پرونده همراه شماست',
    bubble: 'مسئله را برایم توضیح دهید: کمک می‌کنم پرونده را طوری تنظیم کنید که مشاور سریع‌تر و دقیق‌تر بتواند وضعیت را بررسی کند.',
    chipsTitle: 'کارهای پیشنهادی',
    chips: [
      'از کجا شروع کنم؟',
      'این موضوع پرونده تخصصی محسوب می‌شود؟',
      'شرح پرونده‌ام را مرتب کن',
      'چه اطلاعاتی را باید بنویسم؟',
      'چه مدارکی احتمالاً لازم می‌شود؟',
      'از مشاور چه خدمتی بخواهم؟',
    ],
    placeholder: 'مسئله خود را بنویسید.',
  },
  /* ── Step 2: «page 2» ──────────────────────────────────────
     Base-info grid, the case-event table and the document
     library with its category tabs. */
  step2: {
    title: 'اطلاعات و مستندات پرونده را تکمیل کنید',
    icon: 'lucide:file-text',
    basics: {
      title: '۱. اطلاعات پایه پرونده',
      icon: 'lucide:clipboard-list',
      fields: [
        { label: 'نوع قرارداد', kind: 'select' as const, placeholder: 'مدت معین' },
        { label: 'تاریخ شروع همکاری', kind: 'date' as const, value: '۱۴۰۴/۰۶/۱۵' },
        { label: 'تاریخ پایان قرارداد', hint: '(در صورت وجود)', kind: 'date' as const, value: '۱۴۰۴/۰۴/۳۱' },
        { label: 'سمت فرد', value: 'مدیر فروش' },
        { label: 'سابقه همکاری', kind: 'select' as const, placeholder: '۲ سال و ۴ ماه' },
        { label: 'آیا پرونده کتبی وجود دارد؟', kind: 'select' as const, placeholder: 'بله' },
        { label: 'وضعیت فعلی همکاری', value: 'خاتمه یافته' },
        { label: 'آیا پرونده انضباطی تشکیل شده؟', kind: 'select' as const, placeholder: 'بله' },
        { label: 'آیا موضوع در اداره کار مطرح شده؟', kind: 'select' as const, placeholder: 'بله' },
        { label: 'آیا رأی صادر شده؟', kind: 'select' as const, placeholder: 'خیر' },
        { label: 'توضیحات تکمیلی', hint: '(اختیاری)', value: 'پرونده در مرحله بررسی هیئت تشخیص اداره کار است.' },
      ],
    },
    events: {
      title: '۲. رویدادهای مهم پرونده',
      icon: 'lucide:git-commit-horizontal',
      columns: ['ردیف', 'تاریخ', 'عنوان اتفاق', 'توضیح کوتاه', 'مدرک مرتبط', 'عملیات'],
      add: 'افزودن رویداد',
      rows: [
        {
          n: '۱',
          date: '۱۴۰۴/۰۳/۱۵',
          title: 'اخطار کتبی اول',
          desc: 'اخطار کتبی به دلیل عدم رعایت دستورالعمل‌ها',
          doc: 'اخطار کتبی اول.pdf',
        },
        {
          n: '۲',
          date: '۱۴۰۴/۰۳/۲۰',
          title: 'جلسه کمیته انضباطی',
          desc: 'بررسی توضیحات و دفاعیات در کمیته انضباطی',
          doc: 'صورتجلسه کمیته.pdf',
        },
        {
          n: '۳',
          date: '۱۴۰۴/۰۴/۱۰',
          title: 'طرح شکایت در اداره کار',
          desc: 'شکایت بابت مدیریت نامناسب و اخراج غیرقانونی',
          doc: 'ثبت شکایت.pdf',
        },
      ],
    },
    docs: {
      title: '۳. مدارک و مستندات پرونده',
      icon: 'lucide:folder',
      tabs: ['همه', 'قراردادها', 'مکاتبات', 'احکام و آراء', 'فیش و محاسبات', 'مدارک پرسنلی', 'سایر'],
      limit: 'حداکثر ۲۰ فایل قابل بارگذاری است',
      drop: {
        title: 'فایل‌ها را بکشید و رها کنید',
        cta: 'یا برای انتخاب فایل کلیک کنید',
        note: 'حداکثر حجم هر فایل ۲۰ مگابایت',
        types: 'PDF, DOC, DOCX, XLS, XLSX, JPG, PNG',
      },
      all: 'مشاهده همه فایل‌ها (۸ فایل)',
      files: [
        { name: 'قرارداد استخدام.pdf', size: '۱.۷ MB', cat: 'قراردادها', type: 'pdf' },
        { name: 'اخطار کتبی.pdf', size: '۹۹۰ KB', cat: 'مکاتبات', type: 'pdf' },
        { name: 'رأی اداره کار.pdf', size: '۱.۵ MB', cat: 'احکام و آراء', type: 'pdf' },
        { name: 'محاسبات سنوات.xlsx', size: '۴۵۰ KB', cat: 'فیش و محاسبات', type: 'xls' },
      ],
    },
    tips: {
      title: 'نکات مهم',
      icon: 'lucide:shield',
      items: [
        'هرچه اطلاعات دقیق‌تر باشد، تحلیل بهتر و سریع‌تر انجام می‌شود.',
        'مدارک با کیفیت و خوانا بارگذاری کنید.',
        'اطلاعات شما محرمانه است و با کسی به اشتراک گذاشته نمی‌شود.',
        'در صورت نیاز، می‌توانید بعداً مدارک بیشتری اضافه کنید.',
      ],
    },
    agent: {
      title: 'آریاز در کنار شماست',
      bubble: 'مدارکتان را هم کامل کنیم. من اینجا هستم تا پرونده‌تان به بهترین شکل برای مشاور آماده شود.',
      chipsTitle: 'کارهای پیشنهادی',
      chips: [
        'برای این پرونده چه مدارکی لازم است؟',
        'کدام مدارک مهم‌ترند؟',
        'Timeline پرونده‌ام را بساز',
        'از روی فایل‌ها تاریخ‌های مهم را پیدا کن',
        'چیزی از پرونده‌ام کم است؟',
        'اطلاعات حساس فایل‌ها را چطور مدیریت کنم؟',
      ],
      placeholder: 'سوال خود را بنویسید.',
    },
    footer: {
      next: { label: 'ذخیره و ادامه به بررسی آریاز', icon: 'lucide:arrow-left' },
      back: { label: 'مرحله قبل', icon: 'lucide:arrow-right' },
    },
  },

  /* ── Step 3: «page 3» ──────────────────────────────────────
     The readiness read-out. Nothing here is an input — it is
     what آریاز makes of what steps 1 and 2 collected. */
  step3: {
    summary: {
      title: 'خلاصه پرونده شما',
      icon: 'lucide:clipboard-list',
      score: 88,
      scoreNote: 'پرونده برای ارجاع آماده است',
      rows: [
        { label: 'عنوان پرونده', value: 'بررسی خاتمه همکاری مدیر فروش' },
        { label: 'موضوع پرونده', value: 'روابط کار' },
        { label: 'وضعیت پرونده', value: 'اخطار کتبی صادر شده' },
        { label: 'تعداد رویدادها', value: '۳ رویداد' },
        { label: 'تعداد مدارک', value: '۴ فایل' },
        { label: 'میزان فوریت', value: 'عادی' },
      ],
    },
    checklist: {
      title: 'بررسی کامل بودن پرونده',
      icon: 'lucide:clipboard-check',
      items: [
        { label: 'قرارداد پیوست شده', ok: true },
        { label: 'اخطار کتبی موجود است', ok: true },
        { label: 'Timeline پرونده تکمیل شده', ok: true },
        { label: 'سابقه همکاری مشخص است', ok: true },
        { label: 'رأی / نامه مرتبط موجود است', ok: true },
        { label: 'آخرین فیش حقوقی پیوست نشده', ok: false, cta: 'افزودن مدرک' },
        { label: 'نتیجه جلسه کمیته داخلی ثبت نشده', ok: false, cta: 'افزودن اطلاعات' },
      ],
    },
    brief: {
      title: 'خلاصه حرفه‌ای پرونده برای مشاور',
      icon: 'lucide:sparkles',
      tabs: ['خلاصه آریاز', 'متن اصلی من'],
      body: 'کارفرما قصد دارد همکاری با مدیر فروش با سابقه تقریبی ۶ سال و دارای قرارداد مدت‌معین را خاتمه دهد. طی دو ماه گذشته افت عملکرد و عدم تحقق تارگت فروش ثبت شده است. دو اخطار کتبی صادر گردیده و جلسه کمیته انضباطی نیز برگزار شده است.',
      body2: 'درخواست اصلی کاربر بررسی ریسک‌های احتمالی خاتمه همکاری و ارائه راهکار قانونی و کم‌ریسک برای خاتمه همکاری است.',
      all: 'مشاهده کامل شرح پرونده',
    },
    scope: {
      title: 'تشخیص دامنه پرونده توسط آریاز',
      icon: 'lucide:users-round',
      kindLabel: 'نوع خدمت پیشنهادی',
      kind: 'بررسی کامل پرونده + نظر مکتوب',
      chips: [
        { label: 'حجم مدارک', value: 'متوسط' },
        { label: 'پیچیدگی پرونده', value: 'متوسط' },
        { label: 'زمان تقریبی بررسی', value: '۲ تا ۳ روز کاری' },
        { label: 'تعداد رویدادها', value: '۳ رویداد' },
      ],
      note: 'دامنه دقیق خدمت و هزینه نهایی در مرحله بعدی مشخص می‌شود.',
    },
    issues: {
      title: 'موارد نیازمند توجه (تناقض‌ها و ابهام‌ها)',
      icon: 'lucide:circle-alert',
      cta: 'بررسی',
      all: 'مشاهده همه موارد',
      items: [
        'در شرح پرونده سابقه ۶ سال ذکر شده، اما تاریخ شروع همکاری با سابقه اعلام‌شده اختلاف دارد.',
        'تاریخ اخطار دوم مؤخر از تاریخ جلسه کمیته انضباطی ثبت شده؛ ترتیب رویدادها را بررسی کنید.',
      ],
    },
    security: {
      title: 'امنیت و محرمانگی اطلاعات شما',
      icon: 'lucide:lock',
      body: 'اطلاعات پرونده شما کاملاً محرمانه است و فقط برای مشاور منتخب قابل مشاهده خواهد بود.',
      more: 'اطلاعات بیشتر درباره امنیت',
    },
    agent: {
      title: 'آریاز همراه شما در این مرحله',
      bubble: 'پرونده‌تان را بررسی کردم. اگر موردی کم است یا ابهامی وجود دارد بپرسید تا قبل از ارجاع به مشاور کامل شود.',
      chipsTitle: 'کارهای پیشنهادی برای شما',
      chips: [
        'چه چیزی کم است؟',
        'تناقض‌ها را توضیح بده',
        'Case Brief را ساده‌تر کن',
        'آیا پرونده آماده ارسال است؟',
        'چه خدمتی برای این پرونده مناسب است؟',
        'کدام مدارک مهم‌ترند؟',
      ],
      placeholder: 'سوال خود را بنویسید.',
    },
    footer: {
      next: { label: 'تأیید و ادامه به تعیین دامنه و هزینه', icon: 'lucide:arrow-left' },
      back: { label: 'مرحله قبل: اطلاعات و مدارک', icon: 'lucide:arrow-right' },
    },
  },

  footer: {
    next: { label: 'ثبت اطلاعات اولیه و ادامه به مدارک', icon: 'lucide:arrow-left' },
    back: { label: 'بازگشت به پروفایل مشاور', icon: 'lucide:arrow-right', href: '/counseling/experts/amir-hosseini' },
  },
};

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
  steps: ['تعریف پرونده', 'اطلاعات و مدارک', 'تعیین دامنه و هزینه', 'پرداخت و ارجاع'],
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
  notice: 'هزینه بررسی پرونده پس از ارزیابی حجم مدارک، پیچیدگی موضوع و دامنه خدمت مشخص می‌شود.',
  step1: {
    title: '۱. پرونده شما درباره چیست؟',
    icon: 'lucide:file-text',
    fields: [
      { label: 'عنوان پرونده', required: true, placeholder: 'عنوان پرونده را وارد کنید...' },
      { label: 'شرح وضعیت فعلی پرونده', required: true, kind: 'rich' as const, placeholder: 'وضعیت پرونده را با جزئیات بنویسید...' },
    ],
  },
  agent: {
    title: 'آریاز در تشکیل پرونده همراه شماست',
    bubble: 'مسئله را برایم توضیح دهید: کمک می‌کنم پرونده را طوری تنظیم کنید که مشاور سریع‌تر و دقیق‌تر بتواند وضعیت را بررسی کند.',
    chips: [
      'پرونده‌ام از چه نوعی است؟',
      'چه مدارکی لازم دارم؟',
      'هزینه بررسی چقدر می‌شود؟',
      'چقدر طول می‌کشد؟',
    ],
    placeholder: 'مسئله خود را بنویسید.',
  },
  footer: {
    next: { label: 'تأیید و ادامه', icon: 'lucide:arrow-left' },
    back: { label: 'بازگشت به پروفایل مشاور', icon: 'lucide:arrow-right', href: '/counseling/experts/amir-hosseini' },
  },
};

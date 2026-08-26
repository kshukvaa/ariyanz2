import { L } from '@/data/lmsTokens';

/* ──────────────────────────────────────────────────────────────
   تمرین درس — lesson homework
   Source: «lesson_homework.png»

   This screen does NOT use the classroom shell in LearnShell.tsx.
   The lesson screen puts a navy band with the course title and
   progress at the top and the curriculum on the right; the
   homework screen replaces both with a single navy breadcrumb
   strip and a two-column body. Transcribed as drawn rather than
   forced into the shell it looks like it should belong to.

   The screen shows the exercise in its POST-SUBMISSION state: the
   editor is still live, and below it the instructor's feedback and
   a score of ۱۸ از ۲۰ are already visible. Both render, because
   both are drawn.
────────────────────────────────────────────────────────────── */

export const homeworkCrumbs = {
  back: { label: 'بازگشت به دوره', href: '/courses/performance-management' },
  items: [
    { label: 'دوره‌ها', href: '/courses' },
    { label: 'طراحی و استقرار نظام ارزیابی عملکرد کارکنان', href: '/courses/performance-management' },
    { label: 'فصل ۴: طراحی و تدوین شاخص‌ها' },
    { label: 'درس ۴: طراحی KPI ها' },
    { label: 'تمرین' },
  ],
};

export const homeworkHead = {
  icon: 'lucide:pencil-line',
  title: 'تمرین درس: طراحی KPI برای یک شغل واقعی',
  meta: [
    { label: 'دوره:', value: 'طراحی و استقرار نظام ارزیابی عملکرد کارکنان', icon: 'lucide:circle-play' },
    { label: 'فصل/ درس:', value: 'فصل ۴ درس ۴', icon: 'lucide:circle-play' },
    { label: 'زمان پیشنهادی:', value: '۷ روز', icon: 'lucide:circle-alert' },
    { label: 'امتیاز تمرین:', value: '۳۰ امتیاز', icon: 'lucide:star' },
  ],
};

export const homeworkBrief = {
  title: 'شرح فعالیت',
  icon: 'lucide:file-text',
  body: 'یک شغل در سازمان خود (یا یک سازمان فرضی) انتخاب کنید و حداقل ۵ شاخص کلیدی عملکرد (KPI) برای آن طراحی کنید.',
  outputTitle: 'خروجی مورد انتظار:',
  outputs: [
    'عنوان شغل و واحد سازمانی',
    'مسئولیت‌های اصلی',
    'شاخص‌های کلیدی شغل',
    'فرمول یا روش دقیق اندازه‌گیری',
    'هدف عملکردی هر شاخص',
  ],
};

export const homeworkFiles = {
  title: 'فایل‌ها و منابع کمکی',
  icon: 'lucide:folder',
  items: [
    {
      title: 'قالب طراحی شاخص KPI',
      meta: 'Excel - ۶۲۸KB',
      cta: 'دانلود',
      icon: 'lucide:file-spreadsheet',
      fg: '#1d7044',
      bg: '#e7f7ee',
    },
    {
      title: 'راهنمای انجام تمرین',
      meta: 'PDF - ۰.۹۵MB',
      cta: 'دانلود',
      icon: 'lucide:file-text',
      fg: '#e5342c',
      bg: '#fdecec',
    },
    {
      title: 'نمونه پاسخ تمرین',
      meta: 'Word - ۸۹۶KB',
      cta: 'دانلود',
      icon: 'lucide:file-type',
      fg: '#1b56d3',
      bg: '#eaf1ff',
    },
    {
      title: 'ویدیو آموزش تکمیلی',
      meta: 'مدت زمان: ۱۵ دقیقه',
      cta: 'مشاهده',
      icon: 'lucide:circle-play',
      fg: '#6d5efc',
      bg: '#f3f0ff',
    },
  ],
};

export const homeworkSubmit = {
  title: 'ارسال پاسخ شما',
  icon: 'lucide:send',
  tabs: [
    { id: 'editor', label: 'ویرایشگر متن' },
    { id: 'link', label: 'لینک با توضیحات' },
  ],
  toolbar: [
    'lucide:bold',
    'lucide:italic',
    'lucide:underline',
    'lucide:list-ordered',
    'lucide:list',
    'lucide:align-right',
    'lucide:align-center',
    'lucide:align-left',
    'lucide:link-2',
    'lucide:image',
    'lucide:table',
    'lucide:smile',
    'lucide:undo-2',
  ],
  placeholder: 'پاسخ خود را در اینجا وارد کنید...',
  drop: {
    title: 'فایل خود را اینجا بکشید یا کلیک کنید',
    hint: 'فرمت‌های مجاز: PDF، Word، PPT، Excel (حداکثر حجم: ۲۰ مگابایت)',
    icon: 'lucide:cloud-upload',
  },
  action: { label: 'ارسال تمرین', icon: 'lucide:send' },
  note: 'پس از ارسال امکان ویرایش وجود ندارد.',
};

export const homeworkFeedback = {
  instructor: 'دکتر علی محمودی',
  role: 'مدرس دوره',
  avatar: '/images/aryaz/avatars/staff-ali-ahmadi.png',
  label: 'نظر مدرس:',
  text: 'طراحی KPI های شما مناسب است. فرمول اندازه‌گیری دو شاخص شماره ۴ و ۵ نیاز به اصلاح دارد. هدف‌گذاری برخی شاخص‌ها نیاز به بازنگری دارد.',
  date: 'تاریخ بازخورد: ۲۶ اردیبهشت ۱۴۰۵ - ۱۴:۴۵',
  file: { label: 'مشاهده فایل بازخورد', icon: 'lucide:eye' },
  score: {
    title: 'امتیاز کسب شده',
    value: '۱۸',
    outOf: '۲۰',
    stars: 4,
    cta: 'مشاهده جزئیات امتیازدهی',
  },
};

export const homeworkSuggestions = {
  title: 'پیشنهادهای هوشمند برای شما',
  items: [
    {
      title: 'فرم ارزیابی عملکرد',
      desc: 'فرم استاندارد ارزیابی کارکنان',
      cta: 'مشاهده فرم',
      icon: 'lucide:file-text',
      fg: L.orange,
      bg: L.orangeSoft,
    },
    {
      title: 'ابزار محاسبه وزن KPI',
      desc: 'محاسبه وزن و اهمیت شاخص‌ها',
      cta: 'استفاده از ابزار',
      icon: 'lucide:calculator',
      fg: L.blue,
      bg: L.blueSoft,
    },
    {
      title: 'HR Analytics',
      desc: 'تحلیل داده‌های منابع انسانی',
      cta: 'مشاهده دوره',
      icon: 'lucide:book-open',
      fg: L.violet,
      bg: L.violetSoft,
    },
    {
      title: 'فایل داشبورد KPI',
      desc: 'داشبورد آماده پایش KPI ها',
      cta: 'مشاهده',
      icon: 'lucide:clipboard-list',
      fg: L.green,
      bg: L.greenSoft,
    },
    {
      title: 'ایجنت طراحی KPI',
      desc: 'طراحی و به‌روزرسانی KPI های سازمان',
      cta: 'شروع استفاده',
      icon: 'lucide:bot',
      fg: L.violet,
      bg: L.violetSoft,
    },
  ],
};

export const homeworkFooter = {
  prev: { label: 'درس قبلی', icon: 'lucide:arrow-left' },
  list: { label: 'بازگشت به فهرست درس‌ها', icon: 'lucide:list' },
  next: { label: 'ورود به آزمون فصل', icon: 'lucide:arrow-right' },
};

export const homeworkAside = {
  progress: {
    title: 'وضعیت پیشرفت',
    pct: 80,
    caption: 'پیشرفت دوره',
    barLabel: 'تمرین شده',
    barPct: 80,
    cta: 'مشاهده مسیر یادگیری',
  },
  status: {
    title: 'وضعیت این تمرین',
    steps: [
      { label: 'ارسال شد', sub: '۲۴ اردیبهشت ۱۴۰۵ - ۱۴:۳۵', state: 'done' },
      { label: 'در انتظار بررسی مدرس', sub: 'در صف بررسی', state: 'active' },
      { label: 'بررسی و اعلام نتیجه', sub: '', state: 'todo' },
      { label: 'تأیید نهایی', sub: '', state: 'todo' },
    ],
  },
  info: {
    title: 'اطلاعات تمرین',
    rows: [
      { label: 'نوع تمرین:', value: 'پروژه عملی' },
      { label: 'تعداد دفعات ارسال:', value: '۲ بار' },
      { label: 'مهلت ارسال:', value: '۵ خرداد ۱۴۰۵', muted: true },
      { label: 'وضعیت دیرکرد:', value: 'موعد مقرر', ok: true },
    ],
  },
};

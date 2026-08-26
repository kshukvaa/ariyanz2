import type { ServiceDetailData } from '@/components/org/services/ServiceDetailPage';

/* ──────────────────────────────────────────────────────────────
   برون‌سپاری کارکرد، بیمه و مالیات حقوق
   Source: «برون_سپاری کارکرد HR، بیمه و مالیات حقوق.png»

   The monthly-status strip near the foot is the reassurance the
   whole page is selling — five green checks meaning the cycle
   closed on time — so it sits after the process, not among the
   problems.
────────────────────────────────────────────────────────────── */

export const payroll: ServiceDetailData = {
  slug: 'payroll',
  family: 'outsourcing',

  meta: {
    title: 'برون‌سپاری کارکرد، بیمه و مالیات حقوق | آریاز',
    description:
      'آریاز فرآیندهای کارکرد، آماده‌سازی حقوق، ارسال لیست بیمه و مالیات حقوق را با کنترل تخصصی انجام می‌دهد تا سازمان شما از خطا، جریمه و دوباره‌کاری دور بماند.',
  },

  hero: {
    title: [
      'محاسبات حقوق و ارسال لیست بیمه را',
      'دقیق، به‌موقع و بدون ریسک انجام دهید',
    ],
    accentLines: [1],
    desc: 'آریاز فرآیندهای کارکرد، آماده‌سازی حقوق، ارسال لیست بیمه و مالیات حقوق را با کنترل تخصصی انجام می‌دهد تا سازمان شما از خطا، جریمه و دوباره‌کاری دور بماند.',
    primary: { label: 'درخواست بررسی فرآیند حقوق و بیمه', icon: 'lucide:clipboard-check' },
    secondary: { label: 'صحبت با متخصص', icon: 'lucide:users-round' },
    crumbs: [
      { label: 'خدمات سازمانی', href: '/org' },
      { label: 'برون‌سپاری فرآیندها', href: '/org/outsourcing' },
      { label: 'کارکرد، بیمه و مالیات حقوق' },
    ],
  },

  problems: {
    title: 'چه زمانی برون‌سپاری کارکرد، حقوق و بیمه مناسب است؟',
    cards: [
      {
        title: 'هر ماه درگیر جمع‌آوری کارکرد هستیم',
        desc: 'مدیریت و کنترل فرآیند کارکرد',
        icon: 'lucide:clock',
        fg: '#24934b',
      },
      {
        title: 'از خطای لیست بیمه می‌ترسیم',
        desc: 'کنترل تخصصی قبل از ارسال',
        icon: 'lucide:shield-check',
        fg: '#0547fe',
      },
      {
        title: 'مغایرت حقوق و کارکرد زیاد داریم',
        desc: 'تطبیق اطلاعات و کنترل مغایرت',
        icon: 'lucide:file-text',
        fg: '#fe7601',
      },
      {
        title: 'دانش یک نفر برای این کار جبرانی شده',
        desc: 'ایجاد فرآیند مستقل و پایدار',
        icon: 'lucide:user-round',
        fg: '#fd841c',
      },
      {
        title: 'جریمه یا مشکل تأمین اجتماعی داشته‌ایم',
        desc: 'پایندگی و اصلاح فرآیند و جلوگیری از جرائم',
        icon: 'lucide:triangle-alert',
        fg: '#dc2326',
      },
    ],
    cols: 3,
  },

  steps: {
    title: 'فرآیند همکاری با آریاز',
    items: [
      { n: '۱', title: 'شناخت فرآیند فعلی', lines: ['بررسی سیستم‌ها و رویه‌های سازمان'], icon: 'lucide:search', fg: '#24934b' },
      { n: '۲', title: 'تأیید سازمان', lines: ['هماهنگی و تأیید نهایی قبل از ارسال'], icon: 'lucide:badge-check', fg: '#5d35fc' },
      { n: '۳', title: 'کنترل و محاسبه', lines: ['بررسی دقیق توسط متخصصان آریاز'], icon: 'lucide:calculator', fg: '#0547fe' },
      { n: '۴', title: 'دریافت اطلاعات', lines: ['کارکرد، حقوق و اطلاعات پرسنلی'], icon: 'lucide:file-text', fg: '#fe7601' },
      { n: '۵', title: 'ارسال و گزارش‌دهی', lines: ['ارسال نهایی و ارائه گزارش کامل'], icon: 'lucide:send', fg: '#24934b' },
    ],
  },

  agent: {
    title: 'آیا فرآیند حقوق و بیمه سازمان شما بدون ریسک است؟',
    desc: 'با دستیار هوشمند Payroll آریاز بررسی کنید.',
    questions: [
      'تعداد کارکنان شما چقدر است؟',
      'نرم‌افزار فعلی چیست؟',
      'بیشترین چالش فعلی کجاست؟',
    ],
    cta: 'شروع گفتگو با آریا',
  },

  form: {
    title: 'حقوق و بیمه را از یک فرآیند پرریسک به یک فرآیند مطمئن تبدیل کنید',
    desc: 'با سپردن محاسبات حقوق، بیمه و مالیات حقوق به آریاز، آرامش و دقت را تجربه کنید.',
    assurances: [],
    fields: [
      { label: 'تعداد کارکنان', kind: 'select' },
      { label: 'نوع سیستم حقوق', kind: 'select' },
      { label: 'نرم‌افزار حضور و غیاب', kind: 'select' },
      { label: 'مشکل اصلی شما چیست؟', kind: 'select' },
      { label: 'توضیحات تکمیلی (اختیاری)' },
    ],
    submit: 'بررسی فرآیند سازمان من',
  },

  extras: [
    {
      kind: 'cards',
      id: 'services',
      after: 'problems',
      title: 'خدمات آریاز در این حوزه',
      items: [
        {
          label: 'مدیریت کارکرد کارکنان',
          icon: 'lucide:users-round',
          fg: '#24934b',
          bullets: [
            'دریافت اطلاعات حضور و غیاب',
            'کنترل مرخصی، مأموریت و اضافه‌کاری',
            'بررسی مغایرت‌ها',
            'آماده‌سازی گزارش کارکرد',
          ],
        },
        {
          label: 'آماده‌سازی محاسبات حقوق',
          icon: 'lucide:calculator',
          fg: '#fe7601',
          bullets: [
            'اعمال اقلام حقوقی',
            'بررسی تغییرات ماهانه',
            'کنترل کسورات و مزایا',
            'تهیه فایل‌های موردنیاز',
          ],
        },
        {
          label: 'ارسال لیست بیمه تأمین اجتماعی',
          icon: 'lucide:shield-check',
          fg: '#0547fe',
          bullets: [
            'کنترل اطلاعات بیمه‌ای',
            'بررسی اقلام مشمول بیمه',
            'آماده‌سازی و ارسال لیست',
            'پیگیری فرآیند ارسال',
          ],
        },
        {
          label: 'مالیات حقوق',
          icon: 'lucide:file-text',
          fg: '#5d35fc',
          bullets: [
            'آماده‌سازی اطلاعات',
            'محاسبه مالیات حقوق',
            'کنترل مغایرت‌ها',
            'تهیه گزارش‌های موردنیاز',
          ],
        },
      ],
    },
    {
      kind: 'list',
      id: 'monthly-status',
      after: 'steps',
      title: 'هر ماه بدانید وضعیت حقوق و بیمه شما چگونه است',
      items: [
        { label: 'کارکرد دریافت شد', desc: 'تنظیم و ارسال' },
        { label: 'لیست بیمه ارسال شد', desc: 'تأیید شده' },
        { label: 'حقوق آماده شد', desc: 'بدون مغایرت' },
        { label: 'کنترل انجام شد', desc: 'تسویه و ارسال' },
        { label: 'مالیات بررسی شد', desc: '' },
      ],
    },
  ],
};

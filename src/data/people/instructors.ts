import type { Person, FilterSection } from '@/components/people/PeopleParts';

/* ──────────────────────────────────────────────────────────────
   مدرسین آریاز — instructor directory
   Source: «ariaz teachers.png»

   The mockup draws its own site header at the top of the frame.
   That is ignored on instruction: every page here wears the real
   site chrome from SharedPageLayout instead.

   Card stats are «دوره / دانشجو / پروژه» in that order, read
   right-to-left, which is how the source lays them out.
────────────────────────────────────────────────────────────── */

const A = '/images/aryaz/avatars';

export const instructorsHero = {
  title: 'مدرسین آریاز',
  desc: [
    'با متخصصان و مدیران باتجربه حوزه‌های مدیریت، منابع انسانی',
    'و توسعه فردی آشنا شوید',
  ],
  art: '/images/aryaz/illustrations/learning-path-illus.png',
  stats: [
    { value: '۲٬۴۵۰+', label: 'دانشجویان', icon: 'lucide:users-round' },
    { value: '۹۸٪', label: 'رضایت فراگیران', icon: 'lucide:star' },
    { value: '۳۳۰', label: 'دوره برگزارشده', icon: 'lucide:book-open' },
    { value: '۸۵', label: 'مدرس فعال', icon: 'lucide:user-round' },
  ],
};

export const instructorsToolbar = {
  search: 'جستجو در میان مدرسین...',
  sortLabel: 'مرتب‌سازی:',
  sortValue: 'محبوب‌ترین',
};

export const instructorsFilters: FilterSection[] = [
  {
    id: 'field',
    label: 'حوزه تخصصی',
    kind: 'check',
    more: 'مشاهده بیشتر',
    items: [
      { label: 'منابع انسانی', on: true },
      { label: 'مدیریت و رهبری', on: true },
      { label: 'فروش و بازاریابی' },
      { label: 'توسعه فردی', on: true },
      { label: 'هوش مصنوعی' },
      { label: 'کسب‌وکار' },
    ],
  },
  {
    id: 'activity',
    label: 'نوع فعالیت',
    kind: 'check',
    items: [
      { label: 'مدرس دوره', on: true },
      { label: 'سخنران', on: true },
      { label: 'مشاور' },
      { label: 'نویسنده' },
    ],
  },
  {
    id: 'experience',
    label: 'تجربه',
    kind: 'radio',
    items: [
      { label: 'کمتر از ۵ سال' },
      { label: '۵ تا ۱۰ سال' },
      { label: 'بیشتر از ۱۰ سال', on: true },
    ],
  },
  { id: 'industry', label: 'صنعت تجربه', kind: 'select', value: 'انتخاب صنعت' },
  { id: 'sort', label: 'مرتب‌سازی', kind: 'select', value: 'محبوب‌ترین' },
];

export const instructorsFilterHead = {
  title: 'فیلترها',
  clear: 'حذف فیلترها',
  action: { label: 'اعمال فیلترها' },
  seeAll: 'مشاهده همه مدرسین',
};

export const instructorCardActions = [
  { label: 'مشاهده پروفایل', kind: 'solid' as const },
  { label: 'مشاهده دوره‌ها', kind: 'outline' as const },
];

const stat = (courses: string, students: string, projects: string) => [
  { value: courses, label: 'دوره' },
  { value: students, label: 'دانشجو' },
  { value: projects, label: 'پروژه' },
];

export const instructors: Person[] = [
  {
    id: 'amir-hosseini',
    name: 'دکتر امیر حسینی',
    title: 'مشاور و مدرس منابع انسانی',
    avatar: `${A}/expert-01-lawyer.png`,
    online: true,
    rating: '۴.۹',
    meta: '۱۵ سال تجربه',
    tags: [
      { label: 'HRBP' },
      { label: 'ارزیابی عملکرد' },
      { label: 'جبران خدمات' },
    ],
    stats: stat('۳۲', '۱٬۲۸۰', '۴۷'),
    lastLabel: 'آخرین دوره:',
    last: 'دوره جامع HRBP حرفه‌ای',
    href: '/instructors/amir-hosseini',
  },
  {
    id: 'sara-moradi',
    name: 'دکتر سارا مرادی',
    title: 'مدرس رهبری و مدیریت',
    avatar: `${A}/mbti-reviewer-01.png`,
    online: true,
    rating: '۴.۸',
    meta: '۱۳ سال تجربه',
    tags: [{ label: 'کوچینگ' }, { label: 'مدیریت منابع انسانی' }, { label: 'رهبری' }],
    stats: stat('۲۶', '۱٬۶۴۰', '۳۴'),
    lastLabel: 'آخرین دوره:',
    last: 'دوره رهبری اثربخش',
    href: '/instructors/sara-moradi',
  },
  {
    id: 'ali-nouri',
    name: 'مهندس علی نوری',
    title: 'مشاور و مدرس توسعه فردی',
    avatar: `${A}/staff-ali-ahmadi.png`,
    online: true,
    rating: '۴.۷',
    meta: '۱۶ سال تجربه',
    tags: [{ label: 'توسعه فردی' }, { label: 'مهارت‌های نرم' }, { label: 'عادت‌های فردی' }],
    stats: stat('۲۵', '۸۵۰', '۳۴'),
    lastLabel: 'آخرین دوره:',
    last: 'دوره عادت‌های طلایی',
    href: '/instructors/ali-nouri',
  },
  {
    id: 'nazanin-yousefi',
    name: 'دکتر نازنین یوسفی',
    title: 'مدرس تحول دیجیتال و HR Tech',
    avatar: `${A}/expert-02-hr.png`,
    online: true,
    rating: '۴.۹',
    meta: '۱۳ سال تجربه',
    tags: [{ label: 'تحول دیجیتال' }, { label: 'HR Tech' }, { label: 'هوش مصنوعی' }],
    stats: stat('۲۱', '۱٬۴۶۵', '۲۶'),
    lastLabel: 'آخرین دوره:',
    last: 'وبینار هوش مصنوعی در HR',
    href: '/instructors/nazanin-yousefi',
  },
  {
    id: 'samira-fathi',
    name: 'مهندس سمیرا فتحی',
    title: 'مدرس فرآیندها و کیفیت',
    avatar: `${A}/staff-sara-karimi.png`,
    online: true,
    rating: '۴.۶',
    meta: '۹ سال تجربه',
    tags: [{ label: 'مدیریت فرآیند' }, { label: 'کایزن' }, { label: 'بهبود کیفیت' }],
    stats: stat('۱۸', '۶۲۰', '۲۶'),
    lastLabel: 'آخرین دوره:',
    last: 'دوره بهبود فرآیندهای سازمانی',
    href: '/instructors/samira-fathi',
  },
  {
    id: 'mehdi-rezaei',
    name: 'دکتر مهدی رضایی',
    title: 'مدرس بازاریابی و فروش',
    avatar: `${A}/staff-mohammad-rezaei.png`,
    online: true,
    rating: '۴.۷',
    meta: '۱۲ سال تجربه',
    tags: [{ label: 'بازاریابی' }, { label: 'مدیریت فروش' }, { label: 'برندینگ' }],
    stats: stat('۲۷', '۱٬۴۹۰', '۳۵'),
    lastLabel: 'آخرین دوره:',
    last: 'دوره مدیریت تیم فروش حرفه‌ای',
    href: '/instructors/mehdi-rezaei',
  },
  {
    id: 'elham-ahmadi',
    name: 'دکتر الهام احمدی',
    title: 'مدرس روانشناسی سازمانی',
    avatar: `${A}/staff-zahra-nouri.png`,
    online: true,
    rating: '۴.۸',
    meta: '۱۱ سال تجربه',
    tags: [{ label: 'روانشناسی سازمانی' }, { label: 'انگیزش' }, { label: 'فرهنگ سازمانی' }],
    stats: stat('۲۴', '۱٬۰۹۵', '۳۲'),
    lastLabel: 'آخرین دوره:',
    last: 'دوره فرهنگ سازمانی مثبت',
    href: '/instructors/elham-ahmadi',
  },
  {
    id: 'reza-kazemi',
    name: 'مهندس رضا کاظمی',
    title: 'مدرس مالی و بودجه‌ریزی',
    avatar: `${A}/staff-hamed-mousavi.png`,
    online: true,
    rating: '۴.۶',
    meta: '۱۳ سال تجربه',
    tags: [{ label: 'بودجه‌ریزی' }, { label: 'تحلیل مالی' }, { label: 'کنترل هزینه' }],
    stats: stat('۱۸', '۶۹۰', '۲۲'),
    lastLabel: 'آخرین دوره:',
    last: 'دوره بودجه‌ریزی عملیاتی',
    href: '/instructors/reza-kazemi',
  },
];

export const instructorsSuggest = {
  title: 'مدرسین پیشنهادی برای شما',
  desc: 'بر اساس علایق و دوره‌های ثبت‌نامی شما',
  items: [
    { name: 'دکتر نرگس بهرامی', title: 'مدرس تعالی سازمانی', avatar: `${A}/mbti-reviewer-02.png`, rating: '۴.۸' },
    { name: 'مهندس کامران عباسی', title: 'مدرس استراتژی', avatar: `${A}/expert-03-attorney.png`, rating: '۴.۶' },
    { name: 'دکتر فرناز موسوی', title: 'مشاور مدیریت', avatar: `${A}/reviewer-01.png`, rating: '۴.۴' },
    { name: 'دکتر آرش صادقی', title: 'مدرس منابع انسانی', avatar: `${A}/reviewer-02.png`, rating: '۴.۷' },
  ],
};

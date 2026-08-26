import type { ServiceDetailData } from '@/components/org/services/ServiceDetailPage';
import { systemsCrumbs } from './_systemsHero';

/* ──────────────────────────────────────────────────────────────
   طراحی نظام انگیزشی و تشویقی
   Source: «طراحی نظام انگیزشی و تشویقی.png»

   The page opens by naming its own failure mode — bonuses that
   cost money without changing behaviour — and its incentive curve
   is the argument: nothing below ۸۰٪ attainment pays, so the
   reward is tied to a threshold rather than smeared across
   everyone. That block belongs beside the behaviour×driver matrix
   and both sit under the problems.
────────────────────────────────────────────────────────────── */

export const motivation: ServiceDetailData = {
  slug: 'motivation',
  family: 'brand',
  navId: 'motivation',

  meta: {
    title: 'طراحی نظام انگیزشی و تشویقی | آریاز',
    description:
      'آریاز با شناخت محرک‌های واقعی کارکنان، استراتژی سازمان و رفتارهای موردنیاز، نظامی طراحی می‌کند که عملکرد، مشارکت، ماندگاری و رفتارهای مطلوب را تقویت کند.',
  },

  hero: {
    title: ['آدم‌ها را فقط بیشتر پرداخت نکنید؛', 'درست انگیزه بدهید'],
    accentLines: [1],
    desc: 'آریاز با شناخت محرک‌های واقعی کارکنان، استراتژی سازمان و رفتارهای موردنیاز، نظامی طراحی می‌کند که عملکرد، مشارکت، ماندگاری و رفتارهای مطلوب را تقویت کند.',
    primary: { label: 'درخواست ارزیابی نظام انگیزشی', icon: 'lucide:clipboard-check' },
    secondary: { label: 'مشاوره با متخصص', icon: 'lucide:users-round' },
    crumbs: systemsCrumbs('طراحی نظام انگیزشی و تشویقی'),
  },

  problems: {
    title: 'چرا بعضی پاداش‌ها پول سازمان را مصرف می‌کنند، اما رفتار را تغییر نمی‌دهند؟',
    cards: [
      {
        title: 'به همه تقریباً یکسان پاداش می‌دهیم',
        desc: 'پس تفاوت عملکرد چندان دیده نمی‌شود.',
        icon: 'lucide:users-round',
        fg: '#0547fe',
      },
      {
        title: 'پاداش داریم، اما معلوم نیست برای چه رفتاری است',
        desc: 'رابطه اقدام کارکنان و تشویق مبهم است.',
        icon: 'lucide:circle-alert',
        fg: '#fe7601',
      },
      {
        title: 'فقط از پول برای انگیزش استفاده می‌کنیم',
        desc: 'در حالی که محرک افراد و گروه‌ها متفاوت است.',
        icon: 'lucide:wallet',
        fg: '#24934b',
      },
      {
        title: 'برنامه‌های تشویقی مقطعی هستند',
        desc: 'کمپین اجرا می‌شود، اما سیستم پایدار شکل نمی‌گیرد.',
        icon: 'lucide:clock',
        fg: '#5d35fc',
      },
    ],
  },

  steps: {
    title: 'فرآیند اجرای پروژه',
    items: [
      { n: '۱', title: 'شناخت استراتژی و فرهنگ', lines: [], icon: 'lucide:search', fg: '#24934b' },
      { n: '۲', title: 'شناسایی محرک‌های واقعی', lines: ['نظرسنجی و تحلیل'], icon: 'lucide:brain', fg: '#0547fe' },
      { n: '۳', title: 'تحلیل وضعیت و رفتارها', lines: [], icon: 'lucide:chart-column', fg: '#5d35fc' },
      { n: '۴', title: 'طراحی معماری انگیزش', lines: [], icon: 'lucide:shapes', fg: '#fe7601' },
      { n: '۵', title: 'طراحی Incentive و Recognition', lines: [], icon: 'lucide:trophy', fg: '#dc2326' },
      { n: '۶', title: 'تحلیل هزینه و سناریوها', lines: [], icon: 'lucide:wallet', fg: '#24934b' },
      { n: '۷', title: 'Pilot و استقرار', lines: [], icon: 'lucide:rocket', fg: '#0547fe' },
      { n: '۸', title: 'سنجش و بهبود', lines: [], icon: 'lucide:trending-up', fg: '#5d35fc' },
    ],
  },

  agent: {
    title: 'ایجنت هوشمند انگیزش آریاز',
    desc: 'می‌دانید چه چیزی واقعاً به کارکنان شما انگیزه می‌دهد؟',
    questions: [
      'الان چه برنامه‌های تشویقی دارید؟',
      'پاداش‌ها بر چه اساسی تخصیص داده می‌شوند؟',
      'آیا عملکرد به تفاوت محسوسی ایجاد می‌کند؟',
      'آیا Recognition غیرمالی دارید؟',
      'اثر برنامه‌های تشویقی را اندازه می‌گیرید؟',
    ],
    cta: 'شروع ارزیابی نظام انگیزشی',
  },

  form: {
    title: 'پاداشی طراحی کنید که فقط هزینه ایجاد نکند؛ رفتار ایجاد کند',
    desc: 'با تکمیل فرم زیر، کارشناسان آریاز با شما تماس می‌گیرند.',
    assurances: [],
    fields: [
      { label: 'نام سازمان' },
      { label: 'تعداد کارکنان' },
      { label: 'آیا نظام پاداش دارید؟', kind: 'select' },
      { label: 'گروه‌های مشمول', kind: 'select' },
      { label: 'مبنای فعلی پاداش', kind: 'select' },
      { label: 'مهم‌ترین چالش انگیزشی', kind: 'select' },
      { label: 'شماره تماس' },
    ],
    submit: 'درخواست بررسی نظام انگیزشی و تشویقی',
  },

  extras: [
    {
      kind: 'radial',
      id: 'architecture',
      after: 'problems',
      title: 'معماری نظام انگیزشی آریاز',
      centre: 'موتور انگیزش',
      items: [
        { label: 'اهداف کسب‌وکار', icon: 'lucide:target' },
        { label: 'نیازهای کارکنان', icon: 'lucide:users-round' },
        { label: 'عملکرد', icon: 'lucide:trending-up' },
        { label: 'مالی — Incentive و Bonus', icon: 'lucide:wallet' },
        { label: 'قدردانی — Recognition', icon: 'lucide:trophy' },
        { label: 'رشد — فرصت توسعه، ارتقا و مسئولیت', icon: 'lucide:graduation-cap' },
        { label: 'تجربه — انعطاف، اختیار، تعلق و مشارکت', icon: 'lucide:star' },
      ],
    },
    {
      kind: 'table',
      id: 'behaviour-driver',
      after: 'problems',
      title: 'ماتریس رفتار × محرک',
      cols: ['می‌خواهیم چه چیزی تقویت شود؟', 'محرک پیشنهادی'],
      rows: [
        ['عملکرد بالاتر', 'Incentive'],
        ['همکاری تیمی', 'Team Recognition'],
        ['نوآوری', 'Innovation Reward'],
        ['یادگیری و توسعه', 'Development Opportunity'],
        ['ماندگاری و تعهد', 'Retention Program'],
        ['زندگی ارزش‌های سازمان', 'Recognition'],
      ],
    },
    {
      kind: 'stats',
      id: 'incentive-curve',
      after: 'problems',
      title: 'منحنی عملکرد تا پاداش (Incentive)',
      items: [
        { value: 'زیر ۸۰٪', label: 'بدون پاداش', fg: '#dc2326' },
        { value: '۸۰–۹۹٪', label: 'پاداش پایه', fg: '#fd841c' },
        { value: '۱۰۰٪', label: 'پاداش هدف', fg: '#24934b' },
        { value: '۱۱۰٪+', label: 'پاداش فوق‌العاده', fg: '#0547fe' },
      ],
    },
    {
      kind: 'stats',
      id: 'employee-voice',
      after: 'steps',
      title: 'صدای کارکنان',
      items: [
        { value: '+۳۸', label: 'eNPS', fg: '#5d35fc' },
        { value: '۸۲٪', label: 'افتخار به سازمان', fg: '#24934b' },
        { value: '۷۴٪', label: 'قصد ماندگاری', fg: '#fe7601' },
        { value: '۷۹٪', label: 'توصیه سازمان', fg: '#0547fe' },
      ],
    },
    {
      kind: 'split',
      id: 'stay-leave',
      after: 'steps',
      title: 'چرا می‌مانند و چرا می‌روند؟',
      right: {
        title: 'مهم‌ترین دلایل ماندن',
        items: [
          { label: 'فرصت رشد و یادگیری' },
          { label: 'مدیر و رهبری' },
          { label: 'فرهنگ سازمانی' },
          { label: 'تیم و همکاران' },
          { label: 'معناداری کار' },
        ],
      },
      left: {
        title: 'مهم‌ترین دلایل ترک',
        items: [
          { label: 'جبران خدمت' },
          { label: 'مدیریت و رهبری' },
          { label: 'عدم رشد شغلی' },
          { label: 'فشار کاری' },
          { label: 'بی‌عدالتی' },
        ],
      },
    },
    {
      kind: 'cards',
      id: 'recognition-system',
      after: 'outputs',
      title: 'Recognition System (قدردانی و تشویقی)',
      items: [
        { label: 'رفتار مطلوب', desc: 'تعریف رفتاری که می‌خواهیم تکرار شود', icon: 'lucide:target', fg: '#24934b' },
        { label: 'مشاهده', desc: 'دیده‌شدن رفتار توسط مدیر و همکاران', icon: 'lucide:scan-eye', fg: '#0547fe' },
        { label: 'قدردانی', desc: 'Recognition متناسب و به‌موقع', icon: 'lucide:trophy', fg: '#fe7601' },
        { label: 'تقویت رفتار', desc: 'تکرار و پایدارشدن رفتار مطلوب', icon: 'lucide:refresh-cw', fg: '#5d35fc' },
      ],
    },
    {
      kind: 'stats',
      id: 'effectiveness',
      after: 'outputs',
      title: 'اثربخشی نظام انگیزشی',
      items: [
        { value: '↑۱۴٪', label: 'مشارکت کارکنان', fg: '#24934b' },
        { value: '↑۲۸٪', label: 'Recognition', fg: '#0547fe' },
        { value: '↑۱۱٪', label: 'عملکرد', fg: '#fe7601' },
        { value: '↑۹٪', label: 'قصد ماندگاری', fg: '#5d35fc' },
      ],
    },
    {
      kind: 'list',
      id: 'deliverables',
      after: 'outputs',
      title: 'خروجی‌های پروژه',
      items: [
        { label: 'سیاست تشویق' },
        { label: 'فرآیند و گردش کار' },
        { label: 'Budget Scenarios' },
        { label: 'Recognition Framework' },
        { label: 'Incentive Model' },
        { label: 'Reward Matrix' },
        { label: 'Eligibility و قواعد' },
        { label: 'مدل امتیازدهی' },
        { label: 'Motivation Diagnostic' },
        { label: 'تحلیل محرک‌های کارکنان' },
        { label: 'معماری نظام انگیزشی' },
        { label: 'KPIهای نظام انگیزشی' },
        { label: 'راهنمای مدیران' },
        { label: 'داشبورد پایش' },
      ],
    },
  ],
};

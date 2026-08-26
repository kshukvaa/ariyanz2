/* ──────────────────────────────────────────────────────────────
   استعلام گواهینامه آریاز — certificate verification
   Source: «certificate verification.png»

   The mockup frames this as a standalone micro-site: it draws its
   own stripped-back header with a «بازگشت به سایت» button and a
   language switcher, and its own compact footer. Both are ignored
   on instruction — the page wears the real site header and footer
   like every other route.

   The two input methods sit side by side with a «یا» pill between
   them. In RTL the QR panel is the first (right) column and the
   code field the second, which is how the source lays them out.
────────────────────────────────────────────────────────────── */

export const verifyHero = {
  title: 'استعلام گواهینامه آریاز',
  desc: 'اعتبار گواهینامه‌های صادرشده توسط آریاز را به‌صورت آنلاین بررسی کنید.',
  art: '/images/aryaz/illustrations/legal-docs-hero.png',
  features: [
    { label: 'سریع و آسان', sub: 'استعلام در چند ثانیه', icon: 'lucide:zap' },
    { label: 'ایمن و معتبر', sub: 'اطلاعات از سامانه رسمی آریاز', icon: 'lucide:shield-check' },
    { label: 'قابل اعتماد', sub: 'گواهینامه‌های دارای شناسه یکتا', icon: 'lucide:award' },
  ],
};

export const verifyForm = {
  title: 'بررسی اعتبار گواهینامه',
  icon: 'lucide:shield-check',
  desc: 'کد گواهینامه را وارد کنید یا QR Code روی گواهینامه را اسکن نمایید.',
  divider: 'یا',
  qr: {
    title: 'اسکن QR Code',
    cta: 'اسکن QR Code',
    icon: 'lucide:camera',
  },
  code: {
    title: 'کد گواهینامه',
    placeholder: 'مثلا: ARY-1405-HRBP-00852',
    icon: 'lucide:keyboard',
    hint: 'کد گواهینامه معمولاً در پایین گواهینامه درج شده است.',
  },
  submit: { label: 'استعلام گواهینامه', icon: 'lucide:search' },
};

export const verifyTrust = {
  title: 'گواهینامه‌های آریاز، قابل اعتماد و معتبر',
  items: [
    {
      label: 'دارای شناسه یکتا',
      desc: 'هر گواهینامه دارای یک شناسه منحصربه‌فرد است.',
      icon: 'lucide:fingerprint-pattern',
    },
    {
      label: 'قابل استعلام آنلاین',
      desc: 'اعتبار تمامی گواهینامه‌ها به‌صورت آنلاین قابل بررسی است',
      icon: 'lucide:globe',
    },
    {
      label: 'غیرقابل جعل',
      desc: 'گواهینامه‌های آریاز با تکنولوژی امنیتی پیشرفته صادر می‌شوند.',
      icon: 'lucide:shield-check',
    },
    {
      label: 'ثبت‌شده در سامانه آریاز',
      desc: 'تمامی گواهینامه‌ها در پایگاه داده رسمی آریاز ثبت و نگهداری می‌شوند',
      icon: 'lucide:database',
    },
  ],
};

export const verifyFaq = {
  title: 'سؤالات متداول',
  items: [
    {
      q: 'چگونه کد گواهینامه را پیدا کنم؟',
      a: 'کد گواهینامه در قسمت پایین گواهینامه و کنار QR Code درج شده است.',
    },
    {
      q: 'آیا همه گواهینامه‌های آریاز قابل استعلام هستند؟',
      a: 'بله، تمامی گواهینامه‌های رسمی آریاز در سامانه ثبت شده و قابل استعلام هستند.',
    },
    {
      q: 'در صورت عدم اعتبار گواهینامه چه باید کرد؟',
      a: 'لطفاً با پشتیبانی آریاز تماس بگیرید یا اطلاعات گواهینامه را دوباره بررسی کنید.',
    },
  ],
};

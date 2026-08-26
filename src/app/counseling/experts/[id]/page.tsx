import React from 'react';
import type { Metadata } from 'next';
import SharedPageLayout from '@/components/pages/SharedPageLayout';
import ExpertDetailClient from '@/components/counseling/ExpertDetailClient';

export const metadata: Metadata = {
  title: 'دکتر امیر حسینی — مشاور ارشد روابط کار و قانون کار | آریاز',
  description:
    'پروفایل مشاور تأییدشده آریاز؛ سوابق، حوزه‌های تخصصی، تعرفه خدمات و نظرات مراجعان. سؤال بپرسید، جلسه آنلاین یا حضوری رزرو کنید یا پرونده خود را برای بررسی ارسال کنید.',
};

export default function ExpertDetailPage() {
  return (
    <SharedPageLayout>
      <ExpertDetailClient />
    </SharedPageLayout>
  );
}

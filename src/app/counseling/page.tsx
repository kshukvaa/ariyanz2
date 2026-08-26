import React from 'react';
import type { Metadata } from 'next';
import SharedPageLayout from '@/components/pages/SharedPageLayout';
import ExpertsClient from '@/components/counseling/ExpertsClient';

export const metadata: Metadata = {
  title: 'مشاوره تخصصی | آریاز',
  description:
    'مشاوره تخصصی در حوزه منابع انسانی، روابط کار، قانون کار و تأمین اجتماعی. سؤال بپرسید، جلسه رزرو کنید یا پرونده خود را برای بررسی ارسال کنید.',
};

export default function CounselingPage() {
  return (
    <SharedPageLayout>
      <ExpertsClient />
    </SharedPageLayout>
  );
}

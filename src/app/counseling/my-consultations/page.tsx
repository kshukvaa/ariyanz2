import React from 'react';
import type { Metadata } from 'next';
import SharedPageLayout from '@/components/pages/SharedPageLayout';
import MyConsultationsClient from '@/components/counseling/MyConsultationsClient';

export const metadata: Metadata = {
  title: 'مشاوره‌های من | آریاز',
  description: 'همه سؤال‌ها، جلسات و پرونده‌های تخصصی شما در یک‌جا؛ با نشانه‌گذاری مواردی که نیازمند اقدام شماست.',
};

export default function Page() {
  return (
    <SharedPageLayout>
      <MyConsultationsClient />
    </SharedPageLayout>
  );
}

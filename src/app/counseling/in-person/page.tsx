import React from 'react';
import type { Metadata } from 'next';
import SharedPageLayout from '@/components/pages/SharedPageLayout';
import InPersonClient from '@/components/counseling/InPersonClient';

export const metadata: Metadata = {
  title: 'رزرو جلسه حضوری | آریاز',
  description: 'رزرو جلسه مشاوره حضوری با مشاور آریاز؛ انتخاب محل، مدت جلسه، تعداد شرکت‌کنندگان، تاریخ و ساعت.',
};

export default function Page() {
  return (
    <SharedPageLayout>
      <InPersonClient />
    </SharedPageLayout>
  );
}

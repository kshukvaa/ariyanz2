import React from 'react';
import type { Metadata } from 'next';
import SharedPageLayout from '@/components/pages/SharedPageLayout';
import ReserveClient from '@/components/counseling/ReserveClient';

export const metadata: Metadata = {
  title: 'رزرو جلسه آنلاین | آریاز',
  description: 'رزرو جلسه مشاوره آنلاین در چهار گام: انتخاب زمان، شرح موضوع و مدارک، مرور رزرو و پرداخت.',
};

export default function Page() {
  return (
    <SharedPageLayout>
      <ReserveClient />
    </SharedPageLayout>
  );
}

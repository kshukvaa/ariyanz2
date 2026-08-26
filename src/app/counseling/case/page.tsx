import React from 'react';
import type { Metadata } from 'next';
import SharedPageLayout from '@/components/pages/SharedPageLayout';
import CaseClient from '@/components/counseling/CaseClient';

export const metadata: Metadata = {
  title: 'درخواست بررسی پرونده تخصصی | آریاز',
  description: 'پرونده خود را برای بررسی تخصصی به مشاور آریاز بسپارید؛ تعریف پرونده، مدارک، تعیین دامنه و هزینه.',
};

export default function Page() {
  return (
    <SharedPageLayout>
      <CaseClient />
    </SharedPageLayout>
  );
}

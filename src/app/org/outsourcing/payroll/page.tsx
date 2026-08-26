import React from 'react';
import type { Metadata } from 'next';
import SharedPageLayout from '@/components/pages/SharedPageLayout';
import ServiceDetailPage from '@/components/org/services/ServiceDetailPage';
import { payroll } from '@/data/services/payroll';

export const metadata: Metadata = payroll.meta;

export default function Page() {
  return (
    <SharedPageLayout>
      <ServiceDetailPage data={payroll} />
    </SharedPageLayout>
  );
}

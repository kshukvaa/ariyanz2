import React from 'react';
import type { Metadata } from 'next';
import SharedPageLayout from '@/components/pages/SharedPageLayout';
import ServiceDetailPage from '@/components/org/services/ServiceDetailPage';
import { learning } from '@/data/services/learning';

export const metadata: Metadata = learning.meta;

export default function Page() {
  return (
    <SharedPageLayout>
      <ServiceDetailPage data={learning} />
    </SharedPageLayout>
  );
}

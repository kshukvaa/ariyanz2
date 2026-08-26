import React from 'react';
import type { Metadata } from 'next';
import SharedPageLayout from '@/components/pages/SharedPageLayout';
import ServiceDetailPage from '@/components/org/services/ServiceDetailPage';
import { performance } from '@/data/services/performance';

export const metadata: Metadata = performance.meta;

export default function Page() {
  return (
    <SharedPageLayout>
      <ServiceDetailPage data={performance} />
    </SharedPageLayout>
  );
}

import React from 'react';
import type { Metadata } from 'next';
import SharedPageLayout from '@/components/pages/SharedPageLayout';
import ServiceDetailPage from '@/components/org/services/ServiceDetailPage';
import { compensation } from '@/data/services/compensation';

export const metadata: Metadata = compensation.meta;

export default function Page() {
  return (
    <SharedPageLayout>
      <ServiceDetailPage data={compensation} />
    </SharedPageLayout>
  );
}

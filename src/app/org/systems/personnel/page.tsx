import React from 'react';
import type { Metadata } from 'next';
import SharedPageLayout from '@/components/pages/SharedPageLayout';
import ServiceDetailPage from '@/components/org/services/ServiceDetailPage';
import { personnel } from '@/data/services/personnel';

export const metadata: Metadata = personnel.meta;

export default function Page() {
  return (
    <SharedPageLayout>
      <ServiceDetailPage data={personnel} />
    </SharedPageLayout>
  );
}

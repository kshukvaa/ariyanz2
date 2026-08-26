import React from 'react';
import type { Metadata } from 'next';
import SharedPageLayout from '@/components/pages/SharedPageLayout';
import ServiceDetailPage from '@/components/org/services/ServiceDetailPage';
import { outsourcing } from '@/data/services/outsourcing';

export const metadata: Metadata = outsourcing.meta;

export default function Page() {
  return (
    <SharedPageLayout>
      <ServiceDetailPage data={outsourcing} />
    </SharedPageLayout>
  );
}

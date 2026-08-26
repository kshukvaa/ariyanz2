import React from 'react';
import type { Metadata } from 'next';
import SharedPageLayout from '@/components/pages/SharedPageLayout';
import ServiceDetailPage from '@/components/org/services/ServiceDetailPage';
import { systems } from '@/data/services/systems';

export const metadata: Metadata = systems.meta;

export default function Page() {
  return (
    <SharedPageLayout>
      <ServiceDetailPage data={systems} />
    </SharedPageLayout>
  );
}

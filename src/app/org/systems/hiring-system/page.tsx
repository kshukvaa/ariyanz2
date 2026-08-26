import React from 'react';
import type { Metadata } from 'next';
import SharedPageLayout from '@/components/pages/SharedPageLayout';
import ServiceDetailPage from '@/components/org/services/ServiceDetailPage';
import { hiringSystem } from '@/data/services/hiring-system';

export const metadata: Metadata = hiringSystem.meta;

export default function Page() {
  return (
    <SharedPageLayout>
      <ServiceDetailPage data={hiringSystem} />
    </SharedPageLayout>
  );
}

import React from 'react';
import type { Metadata } from 'next';
import SharedPageLayout from '@/components/pages/SharedPageLayout';
import ServiceDetailPage from '@/components/org/services/ServiceDetailPage';
import { workforceAdequacy } from '@/data/services/workforce-adequacy';

export const metadata: Metadata = workforceAdequacy.meta;

export default function Page() {
  return (
    <SharedPageLayout>
      <ServiceDetailPage data={workforceAdequacy} />
    </SharedPageLayout>
  );
}

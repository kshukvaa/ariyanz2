import React from 'react';
import type { Metadata } from 'next';
import SharedPageLayout from '@/components/pages/SharedPageLayout';
import ServiceDetailPage from '@/components/org/services/ServiceDetailPage';
import { recruitment } from '@/data/services/recruitment';

export const metadata: Metadata = recruitment.meta;

export default function Page() {
  return (
    <SharedPageLayout>
      <ServiceDetailPage data={recruitment} />
    </SharedPageLayout>
  );
}

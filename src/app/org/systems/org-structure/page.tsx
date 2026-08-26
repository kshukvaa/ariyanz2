import React from 'react';
import type { Metadata } from 'next';
import SharedPageLayout from '@/components/pages/SharedPageLayout';
import ServiceDetailPage from '@/components/org/services/ServiceDetailPage';
import { orgStructure } from '@/data/services/org-structure';

export const metadata: Metadata = orgStructure.meta;

export default function Page() {
  return (
    <SharedPageLayout>
      <ServiceDetailPage data={orgStructure} />
    </SharedPageLayout>
  );
}

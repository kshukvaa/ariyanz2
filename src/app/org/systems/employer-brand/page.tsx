import React from 'react';
import type { Metadata } from 'next';
import SharedPageLayout from '@/components/pages/SharedPageLayout';
import ServiceDetailPage from '@/components/org/services/ServiceDetailPage';
import { employerBrand } from '@/data/services/employer-brand';

export const metadata: Metadata = employerBrand.meta;

export default function Page() {
  return (
    <SharedPageLayout>
      <ServiceDetailPage data={employerBrand} />
    </SharedPageLayout>
  );
}

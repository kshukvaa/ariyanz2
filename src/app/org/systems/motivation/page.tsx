import React from 'react';
import type { Metadata } from 'next';
import SharedPageLayout from '@/components/pages/SharedPageLayout';
import ServiceDetailPage from '@/components/org/services/ServiceDetailPage';
import { motivation } from '@/data/services/motivation';

export const metadata: Metadata = motivation.meta;

export default function Page() {
  return (
    <SharedPageLayout>
      <ServiceDetailPage data={motivation} />
    </SharedPageLayout>
  );
}

import React from 'react';
import type { Metadata } from 'next';
import SharedPageLayout from '@/components/pages/SharedPageLayout';
import ServiceDetailPage from '@/components/org/services/ServiceDetailPage';
import { jobAnalysis } from '@/data/services/job-analysis';

export const metadata: Metadata = jobAnalysis.meta;

export default function Page() {
  return (
    <SharedPageLayout>
      <ServiceDetailPage data={jobAnalysis} />
    </SharedPageLayout>
  );
}

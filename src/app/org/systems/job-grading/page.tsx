import React from 'react';
import type { Metadata } from 'next';
import SharedPageLayout from '@/components/pages/SharedPageLayout';
import ServiceDetailPage from '@/components/org/services/ServiceDetailPage';
import { jobGrading } from '@/data/services/job-grading';

export const metadata: Metadata = jobGrading.meta;

export default function Page() {
  return (
    <SharedPageLayout>
      <ServiceDetailPage data={jobGrading} />
    </SharedPageLayout>
  );
}

import React from 'react';
import type { Metadata } from 'next';
import SharedPageLayout from '@/components/pages/SharedPageLayout';
import ServiceDetailPage from '@/components/org/services/ServiceDetailPage';
import { hrDepartment } from '@/data/services/hr-department';

export const metadata: Metadata = hrDepartment.meta;

export default function Page() {
  return (
    <SharedPageLayout>
      <ServiceDetailPage data={hrDepartment} />
    </SharedPageLayout>
  );
}

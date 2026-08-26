import React from 'react';
import type { Metadata } from 'next';
import SharedPageLayout from '@/components/pages/SharedPageLayout';
import CaseDetailClient from '@/components/counseling/CaseDetailClient';

export const metadata: Metadata = {
  title: 'پرونده مشاوره | آریاز',
  description:
    'پیگیری پرونده مشاوره تخصصی: گفتگو با مشاور، خلاصه پرونده، Timeline، مدارک، پاسخ‌ها و خروجی‌ها و جلسات مرتبط.',
};

export default async function CaseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await params;

  return (
    <SharedPageLayout>
      <CaseDetailClient />
    </SharedPageLayout>
  );
}

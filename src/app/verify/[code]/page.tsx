import React from 'react';
import type { Metadata } from 'next';
import SharedPageLayout from '@/components/pages/SharedPageLayout';
import VerifyResultClient from '@/components/VerifyResultClient';

export const metadata: Metadata = {
  title: 'نتیجه استعلام گواهینامه | آریاز',
  description:
    'نتیجه استعلام اعتبار گواهینامه آریاز؛ وضعیت گواهینامه، اطلاعات دارنده، مشخصات دوره و تاییدیه امنیتی.',
};

export default async function VerifyResultPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;

  return (
    <SharedPageLayout>
      <VerifyResultClient code={code} />
    </SharedPageLayout>
  );
}

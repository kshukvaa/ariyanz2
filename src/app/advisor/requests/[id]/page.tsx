import React from 'react';
import type { Metadata } from 'next';
import AdvisorRequestDetail from '@/components/counseling/AdvisorRequestDetail';

export const metadata: Metadata = {
  title: 'جزئیات درخواست | پنل مشاور آریاز',
  description: 'بررسی درخواست ارجاع‌شده، مدارک همراه و تحلیل اولیه پیش از پذیرش.',
};

export default async function AdvisorRequestDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await params;
  return <AdvisorRequestDetail />;
}

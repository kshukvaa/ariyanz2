import React from 'react';
import type { Metadata } from 'next';
import AdvisorCases from '@/components/counseling/AdvisorCases';

export const metadata: Metadata = {
  title: 'پرونده‌های من | پنل مشاور آریاز',
  description: 'مدیریت و پیگیری پرونده‌های تخصصی پذیرفته‌شده توسط مشاور.',
};

export default function AdvisorCasesPage() {
  return <AdvisorCases />;
}

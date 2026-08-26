import React from 'react';
import type { Metadata } from 'next';
import AdvisorRequests from '@/components/counseling/AdvisorRequests';

export const metadata: Metadata = {
  title: 'درخواست‌های جدید | پنل مشاور آریاز',
  description: 'درخواست‌های ارجاع‌شده برای بررسی و تصمیم‌گیری مشاور.',
};

export default function AdvisorRequestsPage() {
  return <AdvisorRequests />;
}

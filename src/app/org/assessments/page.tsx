import React from 'react';
import type { Metadata } from 'next';
import PanelChrome from '@/components/org/panel/PanelChrome';
import AssessmentsClient from '@/components/org/AssessmentsClient';

export const metadata: Metadata = {
  title: 'ارزیابی‌ها | آریاز',
  description: 'ایجاد، اجرا و مدیریت ارزیابی‌های کارکنان سازمان.',
};

export default function AssessmentsPage() {
  return (
    <PanelChrome active="assessments" search="جستجو در ارزیابی‌ها...">
      <AssessmentsClient />
    </PanelChrome>
  );
}

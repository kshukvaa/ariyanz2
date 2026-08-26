import React from 'react';
import type { Metadata } from 'next';
import PanelChrome from '@/components/org/panel/PanelChrome';
import CreateAssessmentClient from '@/components/org/wizard/CreateAssessmentClient';

export const metadata: Metadata = {
  title: 'ایجاد ارزیابی جدید | آریاز',
  description: 'در پنج مرحله یک ارزیابی حرفه‌ای برای کارکنان سازمان طراحی و اجرا کنید.',
};

export default function CreateAssessmentPage() {
  return (
    <PanelChrome active="assessments" search="جستجو در ارزیابی‌ها...">
      <CreateAssessmentClient />
    </PanelChrome>
  );
}

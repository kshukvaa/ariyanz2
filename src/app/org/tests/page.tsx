import React from 'react';
import type { Metadata } from 'next';
import PanelChrome from '@/components/org/panel/PanelChrome';
import TestsClient from '@/components/org/TestsClient';

export const metadata: Metadata = {
  title: 'آزمون‌های سازمانی | آریاز',
  description:
    'آزمون‌ها و پرسشنامه‌های معتبر موردنیاز سازمان خود را بررسی و برای ارزیابی کارکنان استفاده کنید.',
};

export default function OrgTestsPage() {
  return (
    <PanelChrome active="tests" search="جستجو در آزمون‌ها...">
      <TestsClient />
    </PanelChrome>
  );
}

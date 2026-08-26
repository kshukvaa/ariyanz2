import React from 'react';
import type { Metadata } from 'next';
import PanelChrome from '@/components/org/panel/PanelChrome';
import AssessmentsClient from '@/components/org/AssessmentsClient';
import PackagesClient from '@/components/org/PackagesClient';

export const metadata: Metadata = {
  title: 'پکیج‌های ارزیابی | آریاز',
  description: 'از پکیج‌های آماده آریاز استفاده کنید یا پکیج اختصاصی خود را بسازید.',
};

/* The picker is a dialog over the list, exactly as the mockups show
   it — so the list renders underneath and dismissing returns to it. */
export default function PackagesPage() {
  return (
    <PanelChrome active="assessments" search="جستجو در ارزیابی‌ها...">
      <AssessmentsClient />
      <PackagesClient />
    </PanelChrome>
  );
}

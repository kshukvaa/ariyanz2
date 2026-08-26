import React from 'react';
import type { Metadata } from 'next';
import PanelChrome from '@/components/org/panel/PanelChrome';
import CompareClient from '@/components/org/CompareClient';

export const metadata: Metadata = {
  title: 'مقایسه دوره‌ها | آریاز',
  description: 'مقایسه عملکرد یک ارزیابی بین دوره‌های مختلف.',
};

export default function ComparePage() {
  return (
    <PanelChrome active="assessments" search="جستجو در ارزیابی‌ها...">
      <CompareClient />
    </PanelChrome>
  );
}

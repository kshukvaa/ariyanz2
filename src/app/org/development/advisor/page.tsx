import React from 'react';
import type { Metadata } from 'next';
import PanelChrome from '@/components/org/panel/PanelChrome';
import DevAdvisorClient from '@/components/org/DevAdvisorClient';
import { devNav } from '@/data/orgNav';

export const metadata: Metadata = {
  title: 'مشاور توسعه آریاز | آریاز',
  description: 'تحلیل هوشمند سرمایه انسانی و پیشنهاد مسیرهای توسعه.',
};

export default function DevAdvisorPage() {
  return (
    <PanelChrome active="dev-advisor" nav={devNav} search="جستجو در توسعه...">
      <DevAdvisorClient />
    </PanelChrome>
  );
}

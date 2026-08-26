import React from 'react';
import type { Metadata } from 'next';
import PanelChrome from '@/components/org/panel/PanelChrome';
import DevReportsClient from '@/components/org/DevReportsClient';
import { devNav } from '@/data/orgNav';

export const metadata: Metadata = {
  title: 'گزارش‌های توسعه | آریاز',
  description: 'تحلیل سرمایه‌گذاری، پیشرفت، اثربخشی و روند توسعه سرمایه انسانی.',
};

export default function DevReportsPage() {
  return (
    <PanelChrome active="dev-reports" nav={devNav} search="جستجو در توسعه...">
      <DevReportsClient />
    </PanelChrome>
  );
}

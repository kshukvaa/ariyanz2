import React from 'react';
import type { Metadata } from 'next';
import PanelChrome from '@/components/org/panel/PanelChrome';
import AttentionClient from '@/components/org/AttentionClient';

export const metadata: Metadata = {
  title: 'کارکنان نیازمند توجه | آریاز',
  description:
    'شناسایی و بررسی کارکنانی که بر اساس نتایج ارزیابی و شکاف‌های توسعه نیازمند بررسی بیشتر هستند.',
};

export default function AttentionPage() {
  return (
    <PanelChrome active="results" activeChild="reports-attention" search="جستجو در نتایج و گزارش‌ها...">
      <AttentionClient />
    </PanelChrome>
  );
}

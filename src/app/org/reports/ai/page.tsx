import React from 'react';
import type { Metadata } from 'next';
import PanelChrome from '@/components/org/panel/PanelChrome';
import AiAnalysisClient from '@/components/org/AiAnalysisClient';

export const metadata: Metadata = {
  title: 'تحلیل هوشمند آریاز | آریاز',
  description: 'با داده‌های سرمایه انسانی سازمان گفتگو کنید و به بینش قابل اقدام برسید.',
};

export default function AiAnalysisPage() {
  return (
    <PanelChrome active="results" activeChild="reports-ai" search="جستجو در آریاز...">
      <AiAnalysisClient />
    </PanelChrome>
  );
}

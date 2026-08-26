import React from 'react';
import type { Metadata } from 'next';
import PanelChrome from '@/components/org/panel/PanelChrome';
import TalentMatrixClient from '@/components/org/TalentMatrixClient';

export const metadata: Metadata = {
  title: 'ماتریس استعداد سازمان | آریاز',
  description: 'تحلیل توزیع استعدادها براساس عملکرد، پتانسیل و آمادگی رشد.',
};

export default function TalentMatrixPage() {
  return (
    <PanelChrome active="results" activeChild="reports-talent" search="جستجو در گزارش‌ها...">
      <TalentMatrixClient />
    </PanelChrome>
  );
}

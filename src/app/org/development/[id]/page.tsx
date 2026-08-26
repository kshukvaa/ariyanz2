import React from 'react';
import type { Metadata } from 'next';
import PanelChrome from '@/components/org/panel/PanelChrome';
import ProgramClient from '@/components/org/program/ProgramClient';

export const metadata: Metadata = {
  title: 'برنامه توسعه | آریاز',
  description: 'نمای کلی، افراد، فعالیت‌ها، Gapها، زمان‌بندی، اثربخشی و مستندات برنامه توسعه.',
};

export default function ProgramPage() {
  return (
    <PanelChrome active="development" activeChild="dev-programs" search="جستجو در توسعه...">
      <ProgramClient />
    </PanelChrome>
  );
}

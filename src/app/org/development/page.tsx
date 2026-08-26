import React from 'react';
import type { Metadata } from 'next';
import PanelChrome from '@/components/org/panel/PanelChrome';
import DevelopmentClient from '@/components/org/DevelopmentClient';

export const metadata: Metadata = {
  title: 'برنامه‌های توسعه | آریاز',
  description: 'مدیریت، اجرا و پایش برنامه‌های توسعه کارکنان و مدیران.',
};

export default function DevelopmentPage() {
  return (
    <PanelChrome active="development" activeChild="dev-programs" search="جستجو در توسعه...">
      <DevelopmentClient />
    </PanelChrome>
  );
}

import React from 'react';
import type { Metadata } from 'next';
import PanelChrome from '@/components/org/panel/PanelChrome';
import DevWizardClient from '@/components/org/wizard/DevWizardClient';
import { devNav } from '@/data/orgNav';

export const metadata: Metadata = {
  title: 'ایجاد برنامه توسعه | آریاز',
  description: 'در پنج مرحله یک برنامه توسعه مؤثر برای کارکنان طراحی کنید.',
};

export default function DevWizardPage() {
  return (
    <PanelChrome active="dev-programs" nav={devNav} search="جستجو در توسعه...">
      <DevWizardClient />
    </PanelChrome>
  );
}

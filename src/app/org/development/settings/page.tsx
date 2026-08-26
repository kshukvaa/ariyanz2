import React from 'react';
import type { Metadata } from 'next';
import PanelChrome from '@/components/org/panel/PanelChrome';
import DevSettingsClient from '@/components/org/DevSettingsClient';
import { devNav } from '@/data/orgNav';

export const metadata: Metadata = {
  title: 'تنظیمات توسعه | آریاز',
  description: 'مدیریت قواعد، فرآیندها، دسترسی‌ها و تنظیمات ماژول توسعه.',
};

export default function DevSettingsPage() {
  return (
    <PanelChrome active="dev-settings" nav={devNav} search="جستجو در توسعه...">
      <DevSettingsClient />
    </PanelChrome>
  );
}

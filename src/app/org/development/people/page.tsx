import React from 'react';
import type { Metadata } from 'next';
import PanelChrome from '@/components/org/panel/PanelChrome';
import DevPeopleClient from '@/components/org/DevPeopleClient';
import { devNav } from '@/data/orgNav';

export const metadata: Metadata = {
  title: 'کارکنان در حال توسعه | آریاز',
  description: 'پایش مسیر رشد هر فرد: Gapها، برنامه‌های توسعه و آمادگی کارکنان.',
};

export default function DevPeoplePage() {
  return (
    <PanelChrome active="dev-people" nav={devNav} search="جستجو در توسعه...">
      <DevPeopleClient />
    </PanelChrome>
  );
}

import React from 'react';
import type { Metadata } from 'next';
import PanelShell from '@/components/org/PanelShell';
import OrgDashboardClient from '@/components/org/OrgDashboardClient';

export const metadata: Metadata = {
  title: 'داشبورد سازمانی | آریاز',
  description: 'وضعیت ارزیابی‌ها، کارکنان و بینش‌های سازمان در یک نگاه.',
};

/* The panel replaces the site chrome on purpose — this is the
   organisation's workspace, not a marketing page. */
export default function OrgDashboardPage() {
  return (
    <PanelShell active="dashboard">
      <OrgDashboardClient />
    </PanelShell>
  );
}

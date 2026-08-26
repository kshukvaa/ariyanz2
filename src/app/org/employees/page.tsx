import React from 'react';
import type { Metadata } from 'next';
import PanelShell from '@/components/org/PanelShell';
import EmployeesClient from '@/components/org/EmployeesClient';

export const metadata: Metadata = {
  title: 'کارکنان | پنل سازمانی آریاز',
  description: 'مدیریت کارکنان، ساختار سازمانی و گروه‌های ارزیابی.',
};

export default function EmployeesPage() {
  return (
    <PanelShell active="employees">
      <EmployeesClient />
    </PanelShell>
  );
}

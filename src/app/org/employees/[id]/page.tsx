import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PanelShell from '@/components/org/PanelShell';
import EmployeeDetailClient from '@/components/org/EmployeeDetailClient';
import { employees } from '@/data/orgPanel';

interface PageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return employees.map((e) => ({ id: e.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const person = employees.find((e) => e.id === id);
  if (!person) return { title: 'کارمند یافت نشد | آریاز' };
  return { title: `${person.name} | پنل سازمانی آریاز` };
}

export default async function EmployeePage({ params }: PageProps) {
  const { id } = await params;
  const person = employees.find((e) => e.id === id);

  if (!person) notFound();

  return (
    <PanelShell active="employees">
      <EmployeeDetailClient />
    </PanelShell>
  );
}

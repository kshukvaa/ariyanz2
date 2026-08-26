import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import TestQuizClient from '@/components/free/TestQuizClient';
import { testIds, getTest } from '@/data/tests';

interface PageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return testIds.map((id) => ({ id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const test = getTest(id);
  if (!test) return { title: 'آزمون یافت نشد | آریاز' };
  return { title: `${test.title} | در حال انجام آزمون` };
}

/* The question flow replaces the site chrome on purpose — nothing
   here competes with the question being answered. */
export default async function TestStartPage({ params }: PageProps) {
  const { id } = await params;
  const test = getTest(id);

  if (!test) notFound();

  return <TestQuizClient test={test} />;
}

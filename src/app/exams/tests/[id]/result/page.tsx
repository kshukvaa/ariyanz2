import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SharedPageLayout from '@/components/pages/SharedPageLayout';
import { Crumbs } from '@/components/free/FreeBits';
import TestResultClient from '@/components/free/TestResultClient';
import { testIds, getTest, testTheme } from '@/data/tests';

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
  return { title: `نتیجه ${test.title} | آریاز` };
}

export default async function TestResultPage({ params }: PageProps) {
  const { id } = await params;
  const test = getTest(id);

  if (!test) notFound();

  return (
    <SharedPageLayout>
      <div style={{ backgroundColor: testTheme.page }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-5">
          <Crumbs
            trail={[
              { label: 'خانه', href: '/' },
              { label: 'آزمون‌ها', href: '/exams' },
              { label: test.title, href: `/exams/tests/${test.id}` },
              { label: 'نتیجه آزمون', href: `/exams/tests/${test.id}/result` },
            ]}
          />
        </div>
      </div>
      <TestResultClient test={test} />
    </SharedPageLayout>
  );
}

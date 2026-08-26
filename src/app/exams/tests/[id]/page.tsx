import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SharedPageLayout from '@/components/pages/SharedPageLayout';
import { Crumbs } from '@/components/free/FreeBits';
import TestDetailClient from '@/components/free/TestDetailClient';
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
  return { title: `${test.title} | آزمون‌های آریاز`, description: test.desc };
}

export default async function TestPage({ params }: PageProps) {
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
              { label: 'آزمون‌های فردی', href: '/exams/tests' },
              { label: test.title, href: `/exams/tests/${test.id}` },
            ]}
          />
        </div>
      </div>
      <TestDetailClient test={test} />
    </SharedPageLayout>
  );
}

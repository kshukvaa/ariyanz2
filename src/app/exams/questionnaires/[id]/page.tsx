import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SharedPageLayout from '@/components/pages/SharedPageLayout';
import { Crumbs } from '@/components/free/FreeBits';
import QuestDetailClient from '@/components/free/QuestDetailClient';
import { testTheme } from '@/data/tests';
import { questIds, getQuestionnaire } from '@/data/questionnaires';

interface PageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return questIds.map((id) => ({ id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const quest = getQuestionnaire(id);
  if (!quest) return { title: 'پرسشنامه یافت نشد | آریاز' };
  return { title: `${quest.title} | کتابخانه پرسشنامه‌های آریاز`, description: quest.desc };
}

export default async function QuestionnairePage({ params }: PageProps) {
  const { id } = await params;
  const quest = getQuestionnaire(id);

  if (!quest) notFound();

  return (
    <SharedPageLayout>
      <div style={{ backgroundColor: testTheme.page }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-5">
          <Crumbs
            trail={[
              { label: 'خانه', href: '/' },
              { label: 'کتابخانه پرسشنامه‌ها', href: '/exams/questionnaires' },
              { label: quest.title, href: `/exams/questionnaires/${quest.id}` },
            ]}
          />
        </div>
      </div>
      <QuestDetailClient quest={quest} />
    </SharedPageLayout>
  );
}

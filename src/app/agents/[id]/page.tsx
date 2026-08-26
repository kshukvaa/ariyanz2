import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SharedPageLayout from '@/components/pages/SharedPageLayout';
import { Crumbs } from '@/components/free/FreeBits';
import AgentDetailClient from '@/components/free/AgentDetailClient';
import { freeTheme } from '@/data/free';
import { agentIds, getAgent } from '@/data/agents';

interface PageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return agentIds.map((id) => ({ id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const agent = getAgent(id);
  if (!agent) return { title: 'ایجنت یافت نشد | آریاز' };
  return { title: `${agent.title} | ایجنت‌های هوشمند آریاز`, description: agent.desc };
}

export default async function AgentPage({ params }: PageProps) {
  const { id } = await params;
  const agent = getAgent(id);

  if (!agent) notFound();

  return (
    <SharedPageLayout>
      <div style={{ backgroundColor: freeTheme.page }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-5">
          <Crumbs
            trail={[
              { label: 'خانه', href: '/' },
              { label: 'ایجنت‌ها', href: '/agents' },
              { label: agent.category, href: '/agents' },
              { label: agent.title, href: `/agents/${agent.id}` },
            ]}
          />
        </div>
      </div>
      <AgentDetailClient agent={agent} />
    </SharedPageLayout>
  );
}

import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SharedPageLayout from '@/components/pages/SharedPageLayout';
import { Crumbs } from '@/components/free/FreeBits';
import ToolDetailClient from '@/components/free/ToolDetailClient';
import { freeTheme } from '@/data/free';
import { getToolDetail, toolIds } from '@/data/tools';

interface PageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return toolIds.map((id) => ({ id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const tool = getToolDetail(id);
  if (!tool) return { title: 'فرم یافت نشد | آریاز' };
  return { title: `${tool.title} | فرم‌ها و ابزارهای آریاز`, description: tool.desc };
}

export default async function ToolPage({ params }: PageProps) {
  const { id } = await params;
  const tool = getToolDetail(id);

  if (!tool) notFound();

  return (
    <SharedPageLayout>
      <div style={{ backgroundColor: freeTheme.page }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-5">
          <Crumbs
            trail={[
              { label: 'خانه', href: '/' },
              { label: 'فرم‌ها و ابزارها', href: '/tools' },
              { label: tool.category, href: '/tools' },
              { label: tool.title, href: `/tools/${tool.id}` },
            ]}
          />
        </div>
      </div>
      <ToolDetailClient tool={tool} />
    </SharedPageLayout>
  );
}

import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SharedPageLayout from '@/components/pages/SharedPageLayout';
import { Crumbs } from '@/components/free/FreeBits';
import DocDetailClient from '@/components/free/DocDetailClient';
import { freeTheme } from '@/data/free';
import { docIds, getDoc } from '@/data/docs';

interface PageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return docIds.map((id) => ({ id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const doc = getDoc(id);
  if (!doc) return { title: 'سند یافت نشد | آریاز' };
  return { title: `${doc.title} | مرکز اسناد آریاز`, description: doc.lead };
}

export default async function DocPage({ params }: PageProps) {
  const { id } = await params;
  const doc = getDoc(id);

  if (!doc) notFound();

  return (
    <SharedPageLayout>
      <div style={{ backgroundColor: freeTheme.page }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-5">
          <Crumbs
            trail={[
              { label: 'خانه', href: '/' },
              { label: 'مرکز اسناد', href: '/laws' },
              { label: doc.kindLabel, href: '/laws' },
              { label: doc.title, href: `/laws/${doc.id}` },
            ]}
          />
        </div>
      </div>
      <DocDetailClient doc={doc} />
    </SharedPageLayout>
  );
}

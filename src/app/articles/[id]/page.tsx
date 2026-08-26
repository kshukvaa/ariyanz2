import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SharedPageLayout from '@/components/pages/SharedPageLayout';
import { Crumbs } from '@/components/free/FreeBits';
import ArticleDetailClient from '@/components/free/ArticleDetailClient';
import { freeTheme } from '@/data/free';
import { articleIds, getArticle } from '@/data/articles';

interface PageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return articleIds.map((id) => ({ id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const article = getArticle(id);
  if (!article) return { title: 'مقاله یافت نشد | آریاز' };
  return { title: `${article.title} | مقالات آریاز`, description: article.excerpt };
}

export default async function ArticlePage({ params }: PageProps) {
  const { id } = await params;
  const article = getArticle(id);

  if (!article) notFound();

  return (
    <SharedPageLayout>
      <div style={{ backgroundColor: freeTheme.page }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-5">
          <Crumbs
            trail={[
              { label: 'خانه', href: '/' },
              { label: 'رایگان اما کاربردی', href: '/library' },
              { label: 'مقالات تخصصی', href: '/articles' },
              { label: article.title, href: `/articles/${article.id}` },
            ]}
          />
        </div>
      </div>
      <ArticleDetailClient article={article} />
    </SharedPageLayout>
  );
}

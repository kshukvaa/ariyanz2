import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SharedPageLayout from '@/components/pages/SharedPageLayout';
import { Crumbs } from '@/components/free/FreeBits';
import BookDetailClient from '@/components/free/BookDetailClient';
import { freeTheme } from '@/data/free';
import { bookIds, getBook } from '@/data/books';

interface PageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return bookIds.map((id) => ({ id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const book = getBook(id);
  if (!book) return { title: 'کتاب یافت نشد | آریاز' };
  return { title: `${book.title} | کتاب‌های تخصصی آریاز`, description: book.subtitle };
}

export default async function BookPage({ params }: PageProps) {
  const { id } = await params;
  const book = getBook(id);

  if (!book) notFound();

  return (
    <SharedPageLayout>
      <div style={{ backgroundColor: freeTheme.page }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-5">
          <Crumbs
            trail={[
              { label: 'خانه', href: '/' },
              { label: 'کتاب‌های تخصصی', href: '/books' },
              { label: book.title, href: `/books/${book.id}` },
            ]}
          />
        </div>
      </div>
      <BookDetailClient book={book} />
    </SharedPageLayout>
  );
}

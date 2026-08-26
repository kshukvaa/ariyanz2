import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BookReaderClient from '@/components/free/BookReaderClient';
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
  return { title: `مطالعه ${book.title} | آریاز` };
}

/* The reader replaces the site chrome on purpose — nothing here
   competes with the page being read. */
export default async function ReadPage({ params }: PageProps) {
  const { id } = await params;
  const book = getBook(id);

  if (!book) notFound();

  return <BookReaderClient book={book} />;
}

import React from 'react';
import type { Metadata } from 'next';
import SharedPageLayout from '@/components/pages/SharedPageLayout';
import AuthorDetailClient from '@/components/people/AuthorDetailClient';

export const metadata: Metadata = {
  title: 'دکتر امیر حسینی — نویسنده و متخصص منابع انسانی | آریاز',
  description:
    'پروفایل نویسنده آریاز؛ حوزه‌های فکری، مقالات و کتاب‌های منتشرشده، سوابق حرفه‌ای و نظرات خوانندگان.',
};

export default function AuthorDetailPage() {
  return (
    <SharedPageLayout>
      <AuthorDetailClient />
    </SharedPageLayout>
  );
}

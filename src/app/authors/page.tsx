import React from 'react';
import type { Metadata } from 'next';
import SharedPageLayout from '@/components/pages/SharedPageLayout';
import AuthorsClient from '@/components/people/AuthorsClient';

export const metadata: Metadata = {
  title: 'نویسندگان آریاز | آریاز',
  description:
    'با متخصصان و صاحب‌نظرانی آشنا شوید که دانش و تجربه خود را با جامعه حرفه‌ای به اشتراک می‌گذارند؛ مقالات، کتاب‌ها و حوزه تخصصی هر نویسنده.',
};

export default function AuthorsPage() {
  return (
    <SharedPageLayout>
      <AuthorsClient />
    </SharedPageLayout>
  );
}

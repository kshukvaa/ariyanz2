import React from 'react';
import type { Metadata } from 'next';
import SharedPageLayout from '@/components/pages/SharedPageLayout';
import LegalPage from '@/components/site/LegalPage';
import { terms } from '@/data/site/legal';

export const metadata: Metadata = {
  title: 'قوانین و مقررات | آریاز',
  description:
    'شرایط استفاده از خدمات، خرید، دوره‌ها، آزمون‌ها، مشاوره، رزرو و بازگشت وجه در آریاز.',
};

export default function TermsPage() {
  return (
    <SharedPageLayout>
      <LegalPage doc={terms} />
    </SharedPageLayout>
  );
}

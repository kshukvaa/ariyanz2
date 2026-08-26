import React from 'react';
import type { Metadata } from 'next';
import SharedPageLayout from '@/components/pages/SharedPageLayout';
import InstructorsClient from '@/components/people/InstructorsClient';

export const metadata: Metadata = {
  title: 'مدرسین آریاز | آریاز',
  description:
    'با متخصصان و مدیران باتجربه حوزه‌های مدیریت، منابع انسانی و توسعه فردی آشنا شوید؛ سوابق، دوره‌ها و امتیاز فراگیران هر مدرس در یک نگاه.',
};

export default function InstructorsPage() {
  return (
    <SharedPageLayout>
      <InstructorsClient />
    </SharedPageLayout>
  );
}

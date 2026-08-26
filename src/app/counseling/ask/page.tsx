import React from 'react';
import type { Metadata } from 'next';
import SharedPageLayout from '@/components/pages/SharedPageLayout';
import AskClient from '@/components/counseling/AskClient';

export const metadata: Metadata = {
  title: 'ارسال سؤال تخصصی | آریاز',
  description: 'سؤال تخصصی خود را به مشاور آریاز بفرستید؛ شرح مسئله، پیوست مدارک، بررسی آریاز و پرداخت.',
};

export default function Page() {
  return (
    <SharedPageLayout>
      <AskClient />
    </SharedPageLayout>
  );
}

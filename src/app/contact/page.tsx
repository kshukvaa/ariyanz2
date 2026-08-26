import React from 'react';
import type { Metadata } from 'next';
import SharedPageLayout from '@/components/pages/SharedPageLayout';
import ContactClient from '@/components/site/ContactClient';

export const metadata: Metadata = {
  title: 'تماس با ما | آریاز',
  description: 'برای سؤال، پشتیبانی، همکاری یا خدمات سازمانی با تیم آریاز در ارتباط باشید.',
};

export default function Page() {
  return (
    <SharedPageLayout>
      <ContactClient />
    </SharedPageLayout>
  );
}

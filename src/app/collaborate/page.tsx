import React from 'react';
import type { Metadata } from 'next';
import SharedPageLayout from '@/components/pages/SharedPageLayout';
import CollaborateClient from '@/components/site/CollaborateClient';

export const metadata: Metadata = {
  title: 'همکاری با آریاز | آریاز',
  description: 'به‌عنوان مدرس، نویسنده، مشاور، متخصص یا شریک تجاری با آریاز همکاری کنید.',
};

export default function CollaboratePage() {
  return (
    <SharedPageLayout>
      <CollaborateClient />
    </SharedPageLayout>
  );
}

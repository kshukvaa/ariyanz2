import React from 'react';
import type { Metadata } from 'next';
import SharedPageLayout from '@/components/pages/SharedPageLayout';
import LegalPage from '@/components/site/LegalPage';
import PrivacyExtras from '@/components/site/PrivacyExtras';
import { privacy } from '@/data/site/legal';

export const metadata: Metadata = {
  title: 'حریم خصوصی | آریاز',
  description:
    'شفافیت درباره نحوه جمع‌آوری، استفاده، نگهداری و حفاظت از اطلاعات کاربران آریاز.',
};

export default function PrivacyPage() {
  return (
    <SharedPageLayout>
      <LegalPage doc={privacy} extras={<PrivacyExtras />} />
    </SharedPageLayout>
  );
}

import React from 'react';
import type { Metadata } from 'next';
import SharedPageLayout from '@/components/pages/SharedPageLayout';
import NeedsWizardClient from '@/components/org/services/NeedsWizardClient';

export const metadata: Metadata = {
  title: 'نیازسنجی سازمان | آریاز',
  description:
    'با پاسخ به چند سؤال کوتاه، مناسب‌ترین مسیر برای حل چالش‌های منابع انسانی سازمان خود را پیدا کنید.',
};

export default function NeedsAssessmentPage() {
  return (
    <SharedPageLayout>
      <NeedsWizardClient />
    </SharedPageLayout>
  );
}

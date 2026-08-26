import React from 'react';
import type { Metadata } from 'next';
import SharedPageLayout from '@/components/pages/SharedPageLayout';
import { KnowledgeStage } from '@/components/lms/LevelTestStages';

export const metadata: Metadata = {
  title: 'تعیین سطح — ارزیابی دانش | آریاز',
  description: 'مرحله ۳ از ۵ تعیین سطح؛ چند پرسش سناریومحور برای سنجش دانش عملی شما.',
};

export default function Page() {
  return (
    <SharedPageLayout>
      <KnowledgeStage />
    </SharedPageLayout>
  );
}

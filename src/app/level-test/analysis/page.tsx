import React from 'react';
import type { Metadata } from 'next';
import SharedPageLayout from '@/components/pages/SharedPageLayout';
import { AnalysisStage } from '@/components/lms/LevelTestStages';

export const metadata: Metadata = {
  title: 'تعیین سطح — تحلیل آریاز | آریاز',
  description: 'مرحله ۴ از ۵ تعیین سطح؛ آریاز پاسخ‌های شما را با مدل مهارت‌های مسیر مقایسه و تحلیل می‌کند.',
};

export default function Page() {
  return (
    <SharedPageLayout>
      <AnalysisStage />
    </SharedPageLayout>
  );
}

import React from 'react';
import type { Metadata } from 'next';
import SharedPageLayout from '@/components/pages/SharedPageLayout';
import { ResultStage } from '@/components/lms/LevelTestStages';

export const metadata: Metadata = {
  title: 'تعیین سطح — پیشنهاد نقطه شروع | آریاز',
  description: 'مرحله ۵ از ۵ تعیین سطح؛ بهترین نقطه شروع شما در مسیر جذب و استخدام حرفه‌ای.',
};

export default function Page() {
  return (
    <SharedPageLayout>
      <ResultStage />
    </SharedPageLayout>
  );
}

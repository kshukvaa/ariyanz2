import React from 'react';
import type { Metadata } from 'next';
import SharedPageLayout from '@/components/pages/SharedPageLayout';
import { ExperienceStage } from '@/components/lms/LevelTestStages';

export const metadata: Metadata = {
  title: 'تعیین سطح — ارزیابی تجربه | آریاز',
  description: 'مرحله ۲ از ۵ تعیین سطح؛ سابقه و تجربه کاری شما در حوزه جذب و استخدام بررسی می‌شود.',
};

export default function Page() {
  return (
    <SharedPageLayout>
      <ExperienceStage />
    </SharedPageLayout>
  );
}

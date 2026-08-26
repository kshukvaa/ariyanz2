import React from 'react';
import type { Metadata } from 'next';
import SharedPageLayout from '@/components/pages/SharedPageLayout';
import { AboutStage } from '@/components/lms/LevelTestStages';

export const metadata: Metadata = {
  title: 'تعیین سطح — شناخت شما | آریاز',
  description: 'مرحله ۱ از ۵ تعیین سطح مسیر جذب و استخدام حرفه‌ای؛ پیش از شروع، نقطه مناسب ورود شما به مسیر مشخص می‌شود.',
};

export default function Page() {
  return (
    <SharedPageLayout>
      <AboutStage />
    </SharedPageLayout>
  );
}

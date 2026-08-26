import React from 'react';
import type { Metadata } from 'next';
import SharedPageLayout from '@/components/pages/SharedPageLayout';
import SkillPathClient from '@/components/lms/SkillPathClient';

export const metadata: Metadata = {
  title: 'جذب و استخدام حرفه‌ای — مسیر مهارتی | آریاز',
  description: 'از شناخت اصول جذب تا طراحی و اجرای فرایند استخدام و انتخاب؛ ۴ سطح، ۲۲ مرحله و یک پروژه عملی نهایی.',
};

export default function Page() {
  return (
    <SharedPageLayout>
      <SkillPathClient />
    </SharedPageLayout>
  );
}

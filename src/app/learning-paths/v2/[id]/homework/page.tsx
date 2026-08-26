import React from 'react';
import type { Metadata } from 'next';
import SharedPageLayout from '@/components/pages/SharedPageLayout';
import PathExerciseClient from '@/components/lms/PathExerciseClient';

export const metadata: Metadata = {
  title: 'تمرین: طراحی آگهی استخدام — مرحله مسیر | آریاز',
  description: 'تمرین عملی مسیر جذب و استخدام حرفه‌ای؛ براساس یک سناریوی واقعی، آگهی استخدام را طراحی کنید.',
};

export default function Page() {
  return (
    <SharedPageLayout>
      <PathExerciseClient />
    </SharedPageLayout>
  );
}

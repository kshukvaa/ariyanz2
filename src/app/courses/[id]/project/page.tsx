import React from 'react';
import type { Metadata } from 'next';
import SharedPageLayout from '@/components/pages/SharedPageLayout';
import ProjectClient from '@/components/lms/ProjectClient';

export const metadata: Metadata = {
  title: 'پروژه پایانی دوره | آریاز',
  description: 'پروژه پایانی دوره ارزیابی عملکرد: طراحی یک مدل کامل ارزیابی برای یک سازمان، از تحلیل شغل تا نقشه پیاده‌سازی.',
};

export default function Page() {
  return (
    <SharedPageLayout>
      <ProjectClient />
    </SharedPageLayout>
  );
}

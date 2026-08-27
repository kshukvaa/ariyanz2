import React from 'react';
import type { Metadata } from 'next';
import SharedPageLayout from '@/components/pages/SharedPageLayout';
import NewsClient from '@/components/site/NewsClient';

export const metadata: Metadata = {
  title: 'اخبار و اطلاعیه‌ها | آریاز',
  description: 'آخرین خبرها، رویدادها، تغییرات پلتفرم، دستاوردها و اطلاعیه‌های آموزشی آریاز.',
};

export default function NewsPage() {
  return (
    <SharedPageLayout>
      <NewsClient />
    </SharedPageLayout>
  );
}

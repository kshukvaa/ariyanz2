import React from 'react';
import type { Metadata } from 'next';
import SharedPageLayout from '@/components/pages/SharedPageLayout';
import SalaryAssistantClient from '@/components/SalaryAssistantClient';

export const metadata: Metadata = {
  title: 'ماشین‌حساب هوشمند حقوق آریاز | آریاز',
  description:
    'به سادگی بپرسید: ناخالصم چقدر خالص می‌شود؟ دستیار حقوق آریاز خالص دریافتی را در شرایط مختلف خانوادگی محاسبه می‌کند.',
};

export default function SalaryAssistantPage() {
  return (
    <SharedPageLayout>
      <SalaryAssistantClient />
    </SharedPageLayout>
  );
}

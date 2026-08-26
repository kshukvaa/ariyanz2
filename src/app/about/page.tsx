import React from 'react';
import type { Metadata } from 'next';
import SharedPageLayout from '@/components/pages/SharedPageLayout';
import AboutClient from '@/components/site/AboutClient';

export const metadata: Metadata = {
  title: 'درباره ما | آریاز',
  description: 'آریاز؛ رشد انسان‌ها، توانمندسازی سازمان‌ها. داستان، چشم‌انداز، مأموریت و تیم آریاز.',
};

export default function Page() {
  return (
    <SharedPageLayout>
      <AboutClient />
    </SharedPageLayout>
  );
}

import React from 'react';
import type { Metadata } from 'next';
import SharedPageLayout from '@/components/pages/SharedPageLayout';
import OrgServicesClient from '@/components/org/OrgServicesClient';

export const metadata: Metadata = {
  title: 'خدمات سازمانی | آریاز',
  description:
    'از برون‌سپاری فرآیندهای منابع انسانی تا طراحی و استقرار سیستم‌های سازمانی — راهکارهای تخصصی سرمایه انسانی برای سازمان‌ها.',
};

/* Public, unlike the rest of /org: this is the B2B landing that
   sits in front of the sign-in wall, so it keeps the site chrome.
   A static route here also takes precedence over the generic
   [slug] template that `mainPages` would otherwise render. */
export default function OrgServicesPage() {
  return (
    <SharedPageLayout>
      <OrgServicesClient />
    </SharedPageLayout>
  );
}

'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface SharedPageLayoutProps {
  children: React.ReactNode;
}

export default function SharedPageLayout({ children }: SharedPageLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-white" style={{ direction: 'rtl' }}>
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}

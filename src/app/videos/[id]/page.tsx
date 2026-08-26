import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SharedPageLayout from '@/components/pages/SharedPageLayout';
import { Crumbs } from '@/components/free/FreeBits';
import VideoDetailClient from '@/components/free/VideoDetailClient';
import { freeTheme, getFreeVideo, videoIds } from '@/data/free';

interface PageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return videoIds.map((id) => ({ id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const video = getFreeVideo(id);
  if (!video) return { title: 'ویدئو یافت نشد | آریاز' };
  return { title: `${video.title} | ویدئوهای رایگان آریاز`, description: video.summary };
}

export default async function FreeVideoPage({ params }: PageProps) {
  const { id } = await params;
  const video = getFreeVideo(id);

  if (!video) notFound();

  return (
    <SharedPageLayout>
      <div style={{ backgroundColor: freeTheme.page }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-5">
          <Crumbs
            trail={[
              { label: 'خانه', href: '/' },
              { label: 'رایگان اما کاربردی', href: '/library' },
              { label: 'ویدئوهای رایگان', href: '/videos' },
              { label: video.title, href: `/videos/${video.id}` },
            ]}
          />
        </div>
      </div>
      <VideoDetailClient video={video} />
    </SharedPageLayout>
  );
}

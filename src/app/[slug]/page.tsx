import { notFound } from 'next/navigation';
import { getPageInfo, mainPages } from '@/data/pages';
import SharedPageLayout from '@/components/pages/SharedPageLayout';
import MainPageClient from '@/components/pages/MainPageClient';

interface PageProps { params: Promise<{ slug: string }>; }

export function generateStaticParams() {
  return mainPages.map(p => ({ slug: p.slug }));
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params;
  const page = getPageInfo(slug);

  if (!page) { notFound(); }

  return (
    <SharedPageLayout>
      <MainPageClient
        iconName={page.iconName}
        title={page.title}
        subtitle={page.subtitle}
        keywords={page.keywords}
        accentColor={page.accentColor}
        accentBg={page.accentBg}
        heroVariant={page.heroVariant}
        features={page.features}
        stats={page.stats}
        label={page.label}
      />
    </SharedPageLayout>
  );
}
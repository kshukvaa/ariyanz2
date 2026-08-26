import { notFound } from 'next/navigation';
import { getSubPageInfo, getPageInfo, subPages } from '@/data/pages';
import SharedPageLayout from '@/components/pages/SharedPageLayout';
import SubPageClient from '@/components/pages/SubPageClient';

interface SubPageProps {
  params: Promise<{ slug: string; sub: string }>; }

export function generateStaticParams() {
  const params: { slug: string; sub: string }[] = [];
  for (const sp of subPages) {
    params.push({ slug: sp.parentSlug, sub: sp.slug });
  }
  return params;
}

export default async function SubPage({ params }: SubPageProps) {
  const { slug, sub } = await params;
  const page = getSubPageInfo(slug, sub);
  const parentPage = getPageInfo(slug);

  if (!page || !parentPage) { notFound(); }

  return (
    <SharedPageLayout>
      <SubPageClient
        parentIconName={parentPage.iconName}
        title={page.title}
        subtitle={page.subtitle}
        keywords={page.columns.map(c => c.header).join('، ')}
        accentColor={page.accentColor}
        accentBg={page.accentBg}
        heroVariant={page.heroVariant}
        stats={parentPage.stats}
        columns={page.columns}
        label={page.label}
      />
    </SharedPageLayout>
  );
}
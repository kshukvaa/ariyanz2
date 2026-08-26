'use client';

import React from 'react';
import {
  ServiceHero,
  ServiceBody,
  ServiceIntro,
  ProblemGrid,
  StepTimeline,
  OutputsGrid,
  AgentCard,
  LeadForm,
} from './ServiceParts';
import { ServiceExtra, type Extra } from './ServiceExtras';
import type { Family } from '@/data/orgServiceNav';

/* ──────────────────────────────────────────────────────────────
   One renderer for every خدمات سازمانی service page.

   The pages differ in content, not in shape: hero, intro, the
   problems it solves, the approach, what you receive, a way to
   start — plus whatever bespoke block that particular service
   needs, which arrives as `extras` and is drawn by the closed
   vocabulary in ServiceExtras.

   Keeping this single means a change to the shell lands on all
   twelve siblings at once, which is the whole reason the rail
   reads as one product.

   `extrasAfter` decides where a bespoke block sits in the flow —
   the mockups put some before the approach timeline and some
   after the outputs, so the data says which.
────────────────────────────────────────────────────────────── */

export interface ServiceDetailData {
  slug: string;
  family: Family;
  navId?: string;
  meta: { title: string; description: string };
  hero: {
    title: string[];
    accentFrom?: number;
    accentLines?: number[];
    desc: string;
    primary: { label: string; icon?: string };
    secondary?: { label: string; icon?: string };
    image?: string;
    crumbs?: { label: string; href?: string }[];
  };
  intro?: { label?: string; title: string; desc: string; image?: string };
  problems?: { title: string; cards: React.ComponentProps<typeof ProblemGrid>['cards']; cols?: 3 | 4 };
  steps?: { title: string; items: React.ComponentProps<typeof StepTimeline>['steps'] };
  outputs?: { title: string; items: { label: string; icon: string }[] };
  agent?: { title: string; desc: string; questions: string[]; cta?: string };
  form?: {
    title: string;
    desc: string;
    assurances: string[];
    fields: { label: string; kind?: 'text' | 'select' }[];
    submit: string;
  };
  /** Bespoke blocks, each placed relative to the standard flow. */
  extras?: (Extra & { after?: 'intro' | 'problems' | 'steps' | 'outputs' })[];
}

export default function ServiceDetailPage({ data }: { data: ServiceDetailData }) {
  const at = (slot: 'intro' | 'problems' | 'steps' | 'outputs') =>
    (data.extras ?? [])
      .filter((e) => (e.after ?? 'outputs') === slot)
      .map((e) => <ServiceExtra key={e.id} extra={e} family={data.family} />);

  const content = (
    <>
      {data.intro && (
        <ServiceIntro
          label={data.intro.label}
          title={data.intro.title}
          desc={data.intro.desc}
          image={data.intro.image}
          family={data.family}
        />
      )}
      {at('intro')}

      {data.problems && (
        <ProblemGrid
          title={data.problems.title}
          cards={data.problems.cards}
          cols={data.problems.cols}
          family={data.family}
        />
      )}
      {at('problems')}

      {data.steps && (
        <StepTimeline title={data.steps.title} steps={data.steps.items} family={data.family} />
      )}
      {at('steps')}

      {data.outputs && (
        <OutputsGrid title={data.outputs.title} items={data.outputs.items} family={data.family} />
      )}
      {at('outputs')}

      {data.agent && (
        <AgentCard
          title={data.agent.title}
          desc={data.agent.desc}
          questions={data.agent.questions}
          cta={data.agent.cta}
          family={data.family}
        />
      )}

      {data.form && (
        <LeadForm
          title={data.form.title}
          desc={data.form.desc}
          assurances={data.form.assurances}
          fields={data.form.fields}
          submit={data.form.submit}
          family={data.family}
        />
      )}
    </>
  );

  return (
    <div>
      <ServiceHero {...data.hero} family={data.family} />

      {/* Category landings have no sibling rail — they ARE the parent. */}
      {data.navId ? (
        <ServiceBody active={data.navId}>{content}</ServiceBody>
      ) : (
        <div className="max-w-[1240px] mx-auto px-4 sm:px-8 py-8 space-y-8">{content}</div>
      )}
    </div>
  );
}

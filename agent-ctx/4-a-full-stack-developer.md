# Task 4-a — Mobile polish round 2 (v3 kit: section-pulse, OutlineCTA, Reveal)

## Scope
Enhance all 11 mobile homepage sections of the Ariyaz Persian (RTL) Next.js 16
project to consume the v3 `_kit.tsx` features:
1. Wire each section's heading to the `mobile:section-pulse` window event
   (dispatched by `MobileHomeEnhancer` ~450ms after a quick-jump) and toggle
   `pulse={true}` for ~700ms when its `id` matches.
2. Replace hand-rolled full-width orange outline `<Link>` CTAs with the new
   standardised `<OutlineCTA>` (same `min-h-[48px]` as `<GradientCTA>`).
3. Add `<Reveal>` (framer-motion fade + slide-up, fires once on scroll-in)
   to static content blocks that had no entrance animation.

## Files modified (11)
- MobileTopicFinderSection.tsx — pulse only (cards already animate).
- MobilePartnersSection.tsx — pulse only (caseStudy uses animate-fade-in,
  stats use motion.div; no full-width orange secondary CTA).
- MobileProductsSection.tsx — pulse only (rail cards + band already animate).
- MobileLearningPathsSection.tsx — pulse + Reveal on top features SolidCard.
- MobileSpecialOffersSection.tsx — pulse (extended CenteredOffersHeading
  with pulse prop + motion.span chip) + OutlineCTA on band CTA + Reveal
  on IntroBanner.
- MobileNewsSection.tsx — pulse + OutlineCTA (dark) on NewsCard per-card
  CTA + Reveal on timeline GlassCard.
- MobileTestimonialsSection.tsx — pulse + Reveal on stats SolidCard.
- MobileArticlesSection.tsx — pulse + OutlineCTA on band CTA + Reveal on
  band SolidCard.
- MobileLeaderboardSection.tsx — pulse only (stats use motion.div; podium
  / table / growth use `key={tab}` + animate-fade-in for tab-change remounts
  — Reveal would conflict with that pattern).
- MobileWhyAriyazSection.tsx — pulse + Reveal on trust SolidCard.
- MobileInstructorsSection.tsx — pulse + OutlineCTA (dark) on InstructorCard
  profile CTA (also removed now-unused `import Link from 'next/link'`)
  + Reveal on band GlassCard.

## Section ids confirmed (all 11 already stable, no adds needed)
- 01 mobile-topics (DARK)
- 02 mobile-partners (LIGHT bg-[#FAFAFB])
- 03 mobile-products (DARK)
- 04 mobile-paths (LIGHT bg-[#F5F6FA]) — note: actual id is `mobile-paths`,
  not `mobile-learning-paths` as the task brief guessed.
- 05 mobile-offers (LIGHT bg-[#FDF7F0])
- 06 mobile-news (DARK)
- 07 mobile-testimonials (LIGHT bg-[#FDF4EE])
- 08 mobile-articles (LIGHT bg-[#FAFAFB])
- 09 mobile-leaderboard (DARK)
- 10 mobile-why (LIGHT bg-[#FAFAFB])
- 11 mobile-instructors (DARK)

## OutlineCTA replacements (4)
1. Offers band CTA (light) — was `border-2 border-orange-400` Link.
2. News NewsCard per-card CTA (dark) — was `border border-orange-400/60` Link.
3. Articles band CTA (light, `mt-4` preserved via className).
4. Instructors InstructorCard profile CTA (dark) — was `border border-orange-400/60`
   Link; removed now-unused `import Link from 'next/link'`.

Skipped (intentionally):
- Partners caseStudy Link (`w-fit`, inline not full-width).
- LearningPaths sub-heading Link (`shrink-0`, inline next to heading).
- LearningPaths card-footer conditional CTA (part of a featured/non-featured
  conditional structure; replacing it would require restructuring).
- News timeline Link (`border-white/20`, not orange — task scope is orange
  outline buttons only).

## Reveal additions (7)
1. LearningPaths — top features SolidCard.
2. Offers — IntroBanner.
3. News — timeline GlassCard.
4. Testimonials — stats SolidCard.
5. Articles — closing band SolidCard.
6. WhyAriyaz — trust SolidCard.
7. Instructors — closing band GlassCard.

## Special case: section 05 (Offers)
The task brief assumes each section renders `<MobileHeading>` as its first
child. Section 05 uses a custom `CenteredOffersHeading` (centered layout
instead of MobileHeading's start-aligned). To honour the pulse feature
without altering the section's centered design, I extended
`CenteredOffersHeading` to accept `pulse?: boolean` and converted its
numbered chip from a `<span>` to a `motion.span` that animates
`scale: [1, 1.15, 1]` over 600ms when pulsing — mirroring `MobileHeading`'s
chip animation.

## Lint / type check
- `npx eslint src/components/sections/mobile/` → 0 errors, 0 warnings.
- `npx tsc --noEmit -p tsconfig.json` → 0 errors in `src/components/sections/mobile/`
  (only unrelated errors in `examples/` and `src/app/api/assistant/route.ts`).

## Notes for downstream agents
- The `pulse` listener pattern is identical across all 11 sections:
  ```tsx
  const [pulse, setPulse] = useState(false);
  useEffect(() => {
    const onPulse = (e: Event) => {
      const detail = (e as CustomEvent).detail as { id: string };
      if (detail.id === '<section-id>') {
        setPulse(true);
        setTimeout(() => setPulse(false), 700);
      }
    };
    window.addEventListener('mobile:section-pulse', onPulse);
    return () => window.removeEventListener('mobile:section-pulse', onPulse);
  }, []);
  ```
  If a future task needs to wire more sections, copy this verbatim and swap
  the id string.
- All 11 sections remain `'use client'` (the new useState/useEffect keeps
  them so — no 'use server' migration needed).
- Did NOT touch: Hero3DSlider, Footer, MobileNav, Header, MobileHomeEnhancer,
  page.tsx, desktop section files, _kit.tsx (the v3 kit was already complete).

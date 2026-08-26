# Task 1-a — Mobile sections 1–4 (full-stack-developer)

## Scope
Build 4 mobile-only homepage section variants under
`/home/z/my-project/src/components/sections/mobile/`:

1. `MobileTopicFinderSection.tsx` — index 01, DARK (navy gradient)
2. `MobilePartnersSection.tsx` — index 02, LIGHT (cream `#FAFAFB`)
3. `MobileProductsSection.tsx` — index 03, DARK (navy gradient)
4. `MobileLearningPathsSection.tsx` — index 04, LIGHT (`#F5F6FA`)

## Files created
- `src/components/sections/mobile/MobileTopicFinderSection.tsx`
- `src/components/sections/mobile/MobilePartnersSection.tsx`
- `src/components/sections/mobile/MobileProductsSection.tsx`
- `src/components/sections/mobile/MobileLearningPathsSection.tsx`

## Design summary
- **01 TopicFinder (dark)**: vertical stack of always-open `GlassCard`s (NOT an
  accordion — distinct from desktop). Each card has icon medallion (`t.bg`/`t.color`),
  white title, white/60 desc, 2-col checklist with orange `lucide:circle-check-big`
  icons, inline orange CTA link → `t.href`. framer-motion fade-up per card.
- **02 Partners (light #FAFAFB)**: SnapRail of logo tiles (SolidCard-style chips,
  `useState activeId = defaultPartnerId`) → SolidCard with active case study
  (`key={active.id}` + `animate-fade-in`, ImageSlot case image, badge, label/
  title/summary, 2×2 meta grid, CTA link) → `partnerStatsHeading` + 2-col stat
  grid (SolidCard mini cards with `AnimatedCounter` + icon + label + desc) →
  `expertiseHeading` + vertical list in SolidCard with hairline dividers →
  navy `bg-gray-900` stacked contact card (meeting row, phone row with
  `tel:02191017134`, full-width `GradientCTA`).
- **03 Products (dark)**: `MobileHeading` + kicker chip + `PillTabs dark`
  (`useState tab = productsDefaultTab`) + SnapRail of `GlassCard`s (`key={tab}`
  + `animate-fade-in`). Each card: artwork (`mobileSlot ?? slot`,
  `aspect-[16/10]`), badge top-right, medallion straddling artwork edge, white
  title, category chip, white/65 desc, rating+students row, orange CTA link.
  Band = GlassCard with icon + text + `GradientCTA`.
- **04 LearningPaths (light #F5F6FA)**: `MobileHeading` + kicker chip + vertical
  `pathFeatures` list in SolidCard (hairline dividers) + sub-heading row
  (`pathsSubheading` + `pathsAllCta` button) + SnapRail of SolidCards (each
  wrapped in `<Link href="/learning-paths">`): category chip + "منتخب" featured
  chip, colored icon medallion, title, "{steps} {pathStepsLabel}", LINEAR
  progress bar (motion width animation, `p.color`) showing `{p.progress}%`,
  CTA button (`started ? started : fresh`, orange-filled if `featured`) +
  band SolidCard (icon + title + desc + 3 stats with `BAND_TONES` mapping) +
  bottom `GradientCTA`.

## Data fields / notes
- All exports pulled from `@/data/landing` per the worklog mapping table.
- `Partner.case` has `{ title, slot, slotLabel, summary, field, service,
  duration, year }`. `caseStudyLabels.field/service/duration/year` each have
  `{ label, icon }` — combined into a `meta[]` array of `{label, icon, value}`.
- `partnerStats` values include `+250K`, `98%`, `+90%` — `AnimatedCounter`
  already handles non-numeric prefix/suffix gracefully (regex extracts digits).
- `productsHeading` has a `kicker` field. `MobileHeading` has no kicker prop, so
  the kicker is rendered as a small chip above the heading (`-mt-3 mb-5`) for
  ProductsSection and LearningPathsSection.
- `learningPaths[].color` is `#F97316` for all entries (data is uniform). I still
  consume the per-item color so future data changes flow through.
- `pathsBand.stats[].tone` ∈ {`blue`,`green`,`orange`} — mapped via a local
  `BAND_TONES` record (mirrors desktop).

## Lint / TypeScript status
- `bun run lint` — **PASS** for all 4 new files. No errors, no warnings introduced.
  Remaining lint errors are pre-existing in `/home/z/my-project/upload/extracted/`
  (leftover upload, not in `src/`) and in the 7 not-yet-created mobile section
  files (`MobileSpecialOffersSection`, etc.) that other agents will own.
- `bunx tsc --noEmit` — only `TS2307` "Cannot find module" errors for the 7
  missing mobile sections in `page.tsx`. My 4 files have **zero** TS errors.

## Deviations from spec
- None of substance. The kicker-chip rendering for Products/LearningPaths is
  the only addition (spec explicitly allowed folding the kicker into the title
  area or omitting it).
- For PartnersSection, dropped desktop's 3-copy infinite carousel + autoplay in
  favour of a single SnapRail of tiles (cleaner on mobile, less DOM). All case
  study + stats + expertise + contact data still rendered.
- For LearningPathsSection, used a horizontal linear progress bar (per spec)
  instead of the desktop SVG ring — distinct motif.

## What other agents should know
- `page.tsx` already imports all 11 mobile sections. My 4 resolve cleanly; the
  other 7 must be created by their respective agents for `/` to compile.
- I did NOT touch `_kit.tsx`, `Icon.tsx`, `ImageSlot.tsx`, `ScrollAnimator.tsx`,
  any desktop section, `Hero3DSlider`, `Footer`, or `MobileNav`.
- My 4 sections are independent of each other — order is set by `page.tsx`.

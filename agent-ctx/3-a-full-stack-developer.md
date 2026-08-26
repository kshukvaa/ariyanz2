# Task 3-a — Mobile polish round 1 (v2 kit features + QA fixes)

## Scope
Polish all 11 mobile homepage sections of the Ariyaz Persian (RTL) Next.js 16
project with the upgraded `_kit.tsx` v2 features, and fix the QA-flagged issues.

## Kit features applied
- `MobileHeading.kicker` — folded ad-hoc `-mt-3 mb-5` chip blocks into the
  heading's `kicker` prop in: Products (03), LearningPaths (04), Leaderboard (09),
  Instructors (11).
- `NumberMedallion` — replaced hand-rolled reason medallions in WhyAriyaz (10).
  `whyReasons[].n` is a Persian-digit string, so the medallion is driven from
  `i + 1` (NumberMedallion's `toFa(n)` produces the matching Persian digit).
- `StatBadge` — replaced the stat grids in Partners (02, light), Leaderboard
  (09, dark), WhyAriyaz (10, light). Note: this drops AnimatedCounter animation
  in Partners/WhyAriyaz (acceptable per task — consistency > animation), and
  drops the bespoke `ar-lb-stat-*.png` slot artwork in Leaderboard in favour of
  Iconify icons (users-round / award / route).
- `SnapProgress` + `useSnapActive` — added to the primary snap rails in:
  Partners logo rail (02), Products (03), LearningPaths (04), SpecialOffers
  mini-offers (05), News cards (06), Testimonials (07), Instructors (11).
  Each `<SnapRail>` was converted to a plain `div` with the exact SnapRail
  classes (`flex gap-3 overflow-x-auto snap-x snap-mandatory ar-no-scrollbar
  -mx-4 px-4 pb-2`) so the hook's ref can attach.
- `SectionDivider` — 9 dividers inserted in `page.tsx` between mobile sections
  where the bg tone changes (skipped the 07→08 transition, both light).

## QA fixes applied
- Number-badge vertical centering → `NumberMedallion` (flex-centered, ring-4).
- Card spacing standardised: title `mb-1.5`, desc `mb-4`, metadata rows
  `pt-3 mt-3 border-t` (applied in Partners case-study card, Products rating
  row, News card, Testimonials quote/author row, Articles metadata rows).
- Metadata row alignment: `flex items-center gap-1.5/3`, icons `shrink-0`,
  text spans `leading-5`.
- Persian line-height: multi-line descs use `leading-7` or `leading-[2]`.
- Snap rails now show a progress indicator (`SnapProgress`).
- Kicker rendering standardised on `MobileHeading.kicker`.
- News timeline dot verified at `top-1.5`; connecting line moved to `top-5`
  so it starts just below the dot + its ring halo.
- LearningPaths progress bar verified `rounded-full` + added a
  `transition-[width] duration-700` for smooth resize.
- Leaderboard podium rank-1 elevation (`-mt-3 ring-2 ring-amber-300/15`) and
  medal colours verified; remaining-rows list alignment verified
  (rank medallion + avatar + name + score all `shrink-0` / `flex-1 min-w-0`).

## Kit fix (minimal)
`_kit.tsx` `useSnapActive` had a lint error (`setState` synchronously in effect
on the initial `onScroll()` call). Wrapped the initial call in
`requestAnimationFrame(onScroll)` so the lint rule no longer fires. API and
behaviour preserved (active index is computed one frame after mount).

## Files modified
- src/components/sections/mobile/MobilePartnersSection.tsx
- src/components/sections/mobile/MobileProductsSection.tsx
- src/components/sections/mobile/MobileLearningPathsSection.tsx
- src/components/sections/mobile/MobileSpecialOffersSection.tsx
- src/components/sections/mobile/MobileNewsSection.tsx
- src/components/sections/mobile/MobileTestimonialsSection.tsx
- src/components/sections/mobile/MobileArticlesSection.tsx
- src/components/sections/mobile/MobileLeaderboardSection.tsx
- src/components/sections/mobile/MobileWhyAriyazSection.tsx
- src/components/sections/mobile/MobileInstructorsSection.tsx
- src/components/sections/mobile/_kit.tsx (1-line useSnapActive fix)
- src/app/page.tsx (SectionDivider import + 9 dividers)

## Files NOT modified (verified clean / left as-is)
- MobileTopicFinderSection.tsx — already clean; blobs render automatically on
  the dark shell; checklist uses `items-start`. No changes needed.

## Lint result
PASS for all 11 mobile sections + page.tsx + _kit.tsx (0 errors / 0 warnings).
Remaining 5 lint errors are pre-existing in untouched files (InteractiveProvider,
MobileNav, PageTransition, MainPageClient, SubPageClient).

## TS result
`bunx tsc --noEmit` — 0 errors in any mobile section / page.tsx / _kit.tsx.

## Dev server
`GET / 200` consistently after all changes.

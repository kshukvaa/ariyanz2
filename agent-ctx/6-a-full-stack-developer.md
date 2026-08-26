# Task 6-a — Wire BookmarkButton into all 11 mobile sections

## Task
Wire `BookmarkButton` (from `./_kit`) into all 11 mobile homepage sections' heading rows.
Each section calls `useBookmarks(BOOKMARK_STORAGE_KEY)` (shared store, synced via the
`storage` event inside `useLocalStorage`) and dispatches a `mobile:bookmark-toggle`
window CustomEvent on toggle so the `MobileHomeEnhancer` shows its toast + haptic.

## Files modified (11)
All under `src/components/sections/mobile/`:

| # | File | sectionId | dark |
|---|---|---|---|
| 01 | MobileTopicFinderSection.tsx | mobile-topics | yes |
| 02 | MobilePartnersSection.tsx | mobile-partners | no |
| 03 | MobileProductsSection.tsx | mobile-products | yes |
| 04 | MobileLearningPathsSection.tsx | mobile-paths | no |
| 05 | MobileSpecialOffersSection.tsx | mobile-offers | no (CenteredOffersHeading) |
| 06 | MobileNewsSection.tsx | mobile-news | yes |
| 07 | MobileTestimonialsSection.tsx | mobile-testimonials | no |
| 08 | MobileArticlesSection.tsx | mobile-articles | no |
| 09 | MobileLeaderboardSection.tsx | mobile-leaderboard | yes |
| 10 | MobileWhyAriyazSection.tsx | mobile-why | no |
| 11 | MobileInstructorsSection.tsx | mobile-instructors | yes |

## Pattern used per section
1. Import `useBookmarks, BookmarkButton` from `./_kit` and `BOOKMARK_STORAGE_KEY`
   from `./_i18n`.
2. Call `const bookmarks = useBookmarks(BOOKMARK_STORAGE_KEY);` at the top of the
   component.
3. Wrap the existing `<MobileHeading .../>` (or `<CenteredOffersHeading .../>` for
   section 05) + a `<BookmarkButton />` in a heading row.
4. `onToggle` dispatches:
   ```ts
   window.dispatchEvent(new CustomEvent('mobile:bookmark-toggle', {
     detail: { id, on, title: <sectionHeading.title> },
   }));
   ```

## Placement approach
- **Sections 01, 02, 03, 04, 06, 07, 08, 09, 10, 11** (use `<MobileHeading>`):
  ```tsx
  <div className="flex items-start justify-between gap-3">
    <div className="flex-1 min-w-0">
      <MobileHeading ... />
    </div>
    <BookmarkButton
      sectionId="<this section's id>"
      sectionTitle={<sectionHeading>.title}
      bookmarks={bookmarks}
      dark={/* true for dark sections */}
      onToggle={(id, on) => {
        window.dispatchEvent(new CustomEvent('mobile:bookmark-toggle', {
          detail: { id, on, title: <sectionHeading>.title },
        }));
      }}
    />
  </div>
  ```
  - No extra `mb` on the wrapper — `MobileHeading`'s built-in `mb-6` provides the
    spacing to the next sibling.
- **Section 05 (Offers, CenteredOffersHeading)**: the centered heading is wrapped in
  `<div className="relative">` and the BookmarkButton is absolutely positioned at
  `top-0 right-0` so the centered block stays visually centered while the bookmark
  chip sits in the empty top-right corner:
  ```tsx
  <div className="relative">
    <CenteredOffersHeading pulse={pulse} />
    <div className="absolute top-0 right-0">
      <BookmarkButton ... />
    </div>
  </div>
  ```

## Integration with MobileHomeEnhancer
The MobileHomeEnhancer (NOT modified by this task) already:
- Calls `useBookmarks(BOOKMARK_STORAGE_KEY)` itself → renders the count badge on the
  bookmarks button + the bottom sheet list (kept in sync via the `storage` event).
- Listens for `mobile:bookmark-toggle` window CustomEvent with `detail: { id, on, title }`
  → shows a toast (`<title> به نشان‌شده‌ها اضافه شد` / `از نشان‌شده‌ها حذف شد`) +
  haptic.

Toggling any section's BookmarkButton therefore produces 4 synchronous effects:
1. The button's own icon morphs to `bookmark-check` + orange fill (handled by
   `BookmarkButton` itself).
2. The corresponding quick-jump nav chip's orange dot toggles (driven by the shared
   `useBookmarks` instance inside `MobileHomeEnhancer`).
3. The bookmarks button's count badge updates (same shared store).
4. A toast is shown by the enhancer (driven by the dispatched event).

## Verification
- `npx eslint src/components/sections/mobile/` → exit 0, **0 errors / 0 warnings**.
- `npx tsc --noEmit -p tsconfig.json` → 0 TS errors in any of the 11 mobile section
  files. (Remaining TS errors are all pre-existing in unrelated files: `examples/`,
  `skills/`, `src/app/api/assistant/route.ts`.)
- Dev server log: `GET / 200` consistently after all edits, no runtime errors.

## Constraints respected
- Did NOT touch `_kit.tsx`, `_i18n.ts`, `MobileHomeEnhancer.tsx`, `page.tsx`,
  `Hero3DSlider`, `Footer`, `MobileNav`, `Header`, or any desktop section file.
- All 11 sections remain `'use client'`.
- No new packages introduced.
- All existing content, data imports, layout, pulse listener, Reveal animations,
  OutlineCTA usage, snap rails, etc. preserved — only the bookmark wiring was added.
- `BookmarkButton` is 36px (`w-9 h-9`) with `shrink-0`; the heading is `flex-1 min-w-0`
  so the row never overflows even with the longest Persian titles.

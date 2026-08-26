'use client';

import { usePathname } from 'next/navigation';
import MobileNav from '@/components/MobileNav';
import AIAssistant from '@/components/AIAssistant';

/* ──────────────────────────────────────────────────────────────
   Site chrome — the marketing tab bar and the assistant bubble.

   Both belong to the public site. The organisation panel is a
   signed-in workspace with its own rail and its own assistant
   surfaces built into the pages, so the two would sit on top of
   each other. Gated here rather than inside each component so the
   rule lives in one place and neither has to grow a hook-order
   hazard around an early return.
────────────────────────────────────────────────────────────── */

export default function SiteChrome() {
  const pathname = usePathname();
  if (pathname?.startsWith('/org')) return null;

  return (
    <>
      <MobileNav />
      <AIAssistant />
    </>
  );
}

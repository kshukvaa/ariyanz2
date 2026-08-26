import React from 'react';
import ScrollAnimator from '@/components/ScrollAnimator';

/** Shared brand navy used across the newer sections. */
export const NAVY = '#16305B';

/** Centred section heading: orange rules either side of the title,
 *  an optional kicker above it and a supporting line below. */
export default function SectionHeading({
  title,
  desc,
  kicker,
}: {
  title: string;
  desc?: string;
  kicker?: string;
}) {
  return (
    <ScrollAnimator className="text-center mb-10">
      {kicker && (
        <div className="flex items-center justify-center gap-3 mb-2">
          <span className="h-px w-6 bg-orange-300" />
          <span className="text-[12.5px] font-bold text-orange-500">{kicker}</span>
          <span className="h-px w-6 bg-orange-300" />
        </div>
      )}
      <div className="flex items-center justify-center gap-3 mb-3">
        {!kicker && <span className="hidden sm:block h-[3px] w-8 rounded-full bg-orange-400" />}
        <h2 className="text-2xl md:text-[34px] font-black" style={{ color: NAVY }}>
          {title}
        </h2>
        {!kicker && <span className="hidden sm:block h-[3px] w-8 rounded-full bg-orange-400" />}
      </div>
      {desc && <p className="text-sm md:text-[15px] text-gray-500 leading-8">{desc}</p>}
    </ScrollAnimator>
  );
}

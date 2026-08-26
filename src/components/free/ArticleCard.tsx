import React from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { freeTheme, tones } from '@/data/free';
import type { Article } from '@/data/articles';

/* ──────────────────────────────────────────────────────────────
   Article tile — used by the listing grid.
   The category badge straddles the bottom edge of the artwork,
   as in the mockup.
────────────────────────────────────────────────────────────── */

export default function ArticleCard({ article }: { article: Article }) {
  const tone = tones[article.categoryTone];

  return (
    <article
      data-tilt
      className="group bg-white rounded-2xl border flex flex-col overflow-visible transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-gray-200/60"
      style={{ borderColor: freeTheme.border }}
    >
      <Link href={`/articles/${article.id}`} className="relative block">
        <span className="block aspect-[5/2] rounded-2xl overflow-hidden bg-gray-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={article.thumb}
            alt=""
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </span>
        <span
          className="absolute bottom-0 right-3 translate-y-1/2 text-[10.5px] font-bold px-2.5 py-1 rounded-lg whitespace-nowrap"
          style={{ color: tone.text, backgroundColor: tone.bg }}
        >
          {article.category}
        </span>
      </Link>

      <div className="p-4 pt-6 flex flex-col flex-1">
        <h3 className="text-[13px] font-black leading-7 text-center mb-3 line-clamp-2">
          <Link
            href={`/articles/${article.id}`}
            className="transition-colors group-hover:text-orange-500"
            style={{ color: freeTheme.navy }}
          >
            {article.title}
          </Link>
        </h3>

        <p className="text-[11.5px] text-gray-500 leading-7 text-right mb-4 line-clamp-2">
          {article.excerpt}
        </p>

        <div
          className="mt-auto pt-3 border-t space-y-2"
          style={{ borderColor: freeTheme.border }}
        >
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 min-w-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={article.author.avatar}
                alt=""
                className="w-6 h-6 rounded-full object-cover bg-gray-100 shrink-0"
              />
              <span className="text-[11px] text-gray-500 truncate">{article.author.name}</span>
            </span>
            <span className="flex items-center gap-1.5 text-[10.5px] text-gray-400 shrink-0">
              <Icon name="lucide:calendar" size={12} />
              <span dir="ltr">{article.date}</span>
            </span>
          </div>

          <div className="flex items-center justify-between">
            <button
              aria-label="ذخیره مقاله"
              className="text-gray-300 hover:text-orange-500 transition-colors"
            >
              <Icon name="lucide:bookmark" size={15} />
            </button>
            <span className="flex items-center gap-1.5 text-[10.5px] text-gray-400">
              <Icon name="lucide:eye" size={12} />
              <span dir="ltr">{article.views}</span>
              <Icon
                name="lucide:chevron-left"
                size={11}
                style={{ backgroundColor: freeTheme.orange }}
              />
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

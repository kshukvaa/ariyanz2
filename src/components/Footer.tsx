import React from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import ImageSlot from '@/components/ImageSlot';
import { logoSrc, slotImages } from '@/data/slotImages';
import {
  brand,
  footerCta,
  footerBrand,
  footerColumns,
  footerContact,
  footerSocial,
  footerTrust,
  footerLegal,
} from '@/data/landing';

const NAVY = '#16305B';

export default function Footer() {
  return (
    <footer className="bg-white pb-20 md:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-10">
        {/* Conversion banner */}
        {/* Artwork sits left, copy right — order-1 takes the right-hand
            column under RTL. */}
        <div className="bg-[#F7F8FA] rounded-3xl px-6 md:px-10 py-8 mb-6 grid lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] gap-8 items-center">
          <div className="order-2">
            {slotImages[footerCta.slot] ? (
              <ImageSlot
                id={footerCta.slot}
                label={footerCta.title}
                ratio="aspect-[418/244]"
                fit="contain"
                className="!bg-transparent !border-0 !p-0 max-w-[440px] mx-auto"
              />
            ) : (
              <div className="flex items-center justify-center gap-4 py-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={logoSrc} alt={brand.name} className="w-[190px]" />
                <Icon name="lucide:trending-up" size={54} className="text-orange-500" />
              </div>
            )}
          </div>

          <div className="order-1 text-center lg:text-right">
            <h2 className="text-xl md:text-[26px] font-black mb-3" style={{ color: NAVY }}>
              {footerCta.title}
            </h2>
            <p className="text-[13.5px] text-gray-500 leading-8 mb-6">{footerCta.text}</p>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <Link
                href={footerCta.primary.href}
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-7 py-3.5 rounded-xl text-sm font-bold transition-all btn-press"
                data-ripple
              >
                <Icon name={footerCta.primary.icon} size={17} className="text-white" />
                <span>{footerCta.primary.label}</span>
                <Icon name="lucide:arrow-left" size={16} className="text-white" />
              </Link>
              <Link
                href={footerCta.secondary.href}
                className="inline-flex items-center gap-2 border border-gray-200 hover:border-orange-300 hover:text-orange-600 px-6 py-3.5 rounded-xl text-sm font-bold transition-all"
                style={{ color: NAVY }}
              >
                <Icon name={footerCta.secondary.icon} size={17} />
                <span>{footerCta.secondary.label}</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Main footer panel */}
        <div className="bg-[#0F2650] rounded-3xl text-white overflow-hidden">
          {/* Contact sits right, brand far left — first child wins the
              right-hand column under RTL. */}
          <div className="px-6 md:px-10 py-10 grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_repeat(3,minmax(0,1fr))_minmax(0,1.15fr)]">
            {/* Contact */}
            <div>
              <h3 className="text-[15px] font-black mb-2">{footerContact.title}</h3>
              <span className="block w-10 h-0.5 bg-orange-500 mb-5" />
              <ul className="space-y-4 mb-6">
                <li>
                  <a
                    href={footerContact.phone.href}
                    className="flex items-center gap-2.5 text-[13px] text-white/75 hover:text-orange-400 transition-colors"
                  >
                    <Icon name={footerContact.phone.icon} size={17} className="text-white/50" />
                    <span>{footerContact.phone.value}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={footerContact.mobile.href}
                    className="flex items-center gap-2.5 text-[13px] text-white/75 hover:text-orange-400 transition-colors"
                  >
                    <Icon name={footerContact.mobile.icon} size={17} className="text-white/50" />
                    <span>{footerContact.mobile.value}</span>
                  </a>
                </li>
                <li className="flex items-start gap-2.5">
                  <Icon
                    name={footerContact.address.icon}
                    size={17}
                    className="text-white/50 mt-1 shrink-0"
                  />
                  <span className="text-[13px] text-white/75 leading-8">
                    {footerContact.address.value}
                  </span>
                </li>
              </ul>

              <div className="flex items-center gap-2.5">
                {footerSocial.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-110"
                    style={{ backgroundColor: s.color }}
                  >
                    <Icon name={s.icon} size={18} className="text-white" />
                  </a>
                ))}
              </div>
            </div>

            {/* Link columns */}
            {[...footerColumns].reverse().map((col) => (
              <div key={col.title}>
                <h3 className="text-[15px] font-black mb-2">{col.title}</h3>
                <span className="block w-10 h-0.5 bg-orange-500 mb-5" />
                <ul className="space-y-4">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="flex items-center gap-2.5 text-[13px] text-white/75 hover:text-orange-400 transition-colors"
                      >
                        <Icon name={l.icon} size={17} className="text-white/50 shrink-0" />
                        <span>{l.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Brand */}
            <div>
              <Link href="/" className="inline-block mb-6">
                {/* No filter — the mark is full colour on the navy panel. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={logoSrc} alt={brand.name} className="h-11 w-auto" />
              </Link>
              <p className="text-lg font-black leading-9 mb-4">
                {footerBrand.headline[0]}
                <br />
                {footerBrand.headline[1]}
              </p>
              <span className="block w-16 h-0.5 bg-orange-500 mb-4" />
              <p className="text-[12.5px] text-white/60 leading-8">{footerBrand.desc}</p>
            </div>
          </div>

          {/* Trust + copyright */}
          <div className="border-t border-white/10 px-6 md:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-5">
            <div className="flex flex-wrap items-center justify-center gap-6">
              {footerTrust.map((t) => (
                <span key={t.title} className="flex items-center gap-2.5">
                  <span className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
                    <Icon name={t.icon} size={19} style={{ backgroundColor: NAVY }} />
                  </span>
                  <span className="leading-tight">
                    <span className="block text-[11.5px] font-bold text-white/90">{t.title}</span>
                    <span className="block text-[10px] text-white/50">{t.sub}</span>
                  </span>
                </span>
              ))}
            </div>

            <p className="text-[12px] text-white/60">{footerLegal.copyright}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

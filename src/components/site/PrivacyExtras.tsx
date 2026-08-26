'use client';

import React from 'react';
import Icon from '@/components/Icon';
import { Card, NAVY, ORANGE } from './SiteParts';
import { privacyRetention, privacyCookies, privacySharing } from '@/data/site/legal';

/* The three blocks «4.png» adds below the privacy accordion:
   retention table, cookie categories and who data is shared with. */

export default function PrivacyExtras() {
  return (
    <div className="grid gap-4 md:grid-cols-3 items-start">
      {/* Sharing declared first → right. */}
      <Card>
        <h3 className="flex items-center gap-2 justify-end text-[12.5px] font-black" style={{ color: NAVY }}>
          {privacySharing.title}
          <Icon name={privacySharing.icon} size={15} style={{ backgroundColor: ORANGE }} />
        </h3>
        <ul className="mt-3.5 space-y-2.5">
          {privacySharing.items.map((i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span className="flex-1 text-right text-[11px] leading-6 text-gray-600">{i}</span>
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-400" />
            </li>
          ))}
        </ul>
        <p className="mt-3.5 text-right text-[10.5px] leading-6 text-gray-400">{privacySharing.note}</p>
      </Card>

      <Card>
        <h3 className="flex items-center gap-2 justify-end text-[12.5px] font-black" style={{ color: NAVY }}>
          {privacyRetention.title}
          <Icon name={privacyRetention.icon} size={15} style={{ backgroundColor: ORANGE }} />
        </h3>
        <table className="mt-3.5 w-full text-right border-collapse">
          <thead>
            <tr>
              {privacyRetention.columns.map((c) => (
                <th key={c} className="border-b border-gray-100 px-2 py-2 text-[10px] font-bold text-gray-400">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {privacyRetention.rows.map(([k, v]) => (
              <tr key={k}>
                <td className="border-b border-gray-50 px-2 py-2.5 text-[10.5px]" style={{ color: NAVY }}>
                  {k}
                </td>
                <td className="border-b border-gray-50 px-2 py-2.5 text-[10.5px] text-gray-500">{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Card>
        <h3 className="flex items-center gap-2 justify-end text-[12.5px] font-black" style={{ color: NAVY }}>
          {privacyCookies.title}
          <Icon name={privacyCookies.icon} size={15} style={{ backgroundColor: ORANGE }} />
        </h3>
        <ul className="mt-3.5 space-y-3">
          {privacyCookies.items.map((c) => (
            <li key={c.title} className="flex items-start gap-2.5">
              <span className="flex-1 text-right">
                <span className="block text-[11.5px] font-bold" style={{ color: NAVY }}>
                  {c.title}
                </span>
                <span className="block text-[10px] text-gray-500">{c.desc}</span>
              </span>
              <Icon name="lucide:circle-plus" size={14} className="shrink-0 mt-0.5" style={{ backgroundColor: '#9aa3b8' }} />
            </li>
          ))}
        </ul>
        <button
          className="mt-4 w-full flex items-center justify-center gap-2 rounded-xl border py-2.5 text-[11px] font-bold"
          style={{ borderColor: NAVY, color: NAVY }}
        >
          <Icon name="lucide:cog" size={13} style={{ backgroundColor: NAVY }} />
          {privacyCookies.cta}
        </button>
      </Card>
    </div>
  );
}

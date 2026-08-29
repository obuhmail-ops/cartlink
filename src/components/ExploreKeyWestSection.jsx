import React from 'react';
import { ExternalLink, MapPin } from 'lucide-react';

const MAP_URL = 'https://www.google.com/maps/d/embed?mid=1ehX5kM3oXtsGZPHLSK41x_r4qrYBBkc&ehbc=2E312F';
const GUIDE_URL = 'https://www.google.com/maps/d/viewer?mid=1ehX5kM3oXtsGZPHLSK41x_r4qrYBBkc';
const landmarks = ['Duval Street', 'Mallory Square', 'Southernmost Point', 'Fort Zachary Taylor Beach', 'Higgs Beach', 'Key West Lighthouse', 'Mile 0', 'Smathers Beach', 'Truman Little White House', 'Key West Harbor'];

export default function ExploreKeyWestSection() {
  return (
    <section id="explore" className="hidden bg-brand px-6 pt-10 pb-24 text-card md:block md:px-10 md:pt-12 md:pb-32">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-solar">Section 10 — Explore Key West</p>
        <h2 className="mt-4 max-w-4xl font-display text-4xl uppercase leading-tight md:text-6xl">Your Cart. Your Island. Your Adventure.</h2>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-card/75">Use our interactive Paradise Rentals map to plan your Key West golf cart adventure, from iconic Old Town landmarks to the island’s best beaches and waterfront views.</p>
        <div className="mt-12 overflow-hidden rounded-2xl border border-card/15 bg-card/5">
          <iframe src={MAP_URL} title="Paradise Rentals interactive Key West golf cart map" className="h-[520px] w-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {landmarks.map((landmark) => (
            <div key={landmark} className="flex items-center gap-2 rounded-lg border border-card/10 px-4 py-3 text-sm text-card/80">
              <MapPin className="h-4 w-4 shrink-0 text-solar" />
              <span>{landmark}</span>
            </div>
          ))}
        </div>
        <a href={GUIDE_URL} target="_blank" rel="noreferrer" className="mt-10 inline-flex items-center gap-2 rounded-lg bg-solar px-6 py-3 text-sm font-bold uppercase tracking-wide text-brand">
          View Our Key West Golf Cart Guide <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}
import React from 'react';
import { ExternalLink, MapPin, Navigation } from 'lucide-react';

const MAP_URL = 'https://www.google.com/maps/d/embed?mid=1ehX5kM3oXtsGZPHLSK41x_r4qrYBBkc&ehbc=2E312F';
const GUIDE_URL = 'https://www.google.com/maps/d/viewer?mid=1ehX5kM3oXtsGZPHLSK41x_r4qrYBBkc';
const NATIVE_MAPS_URL = 'https://maps.google.com/?q=Key+West,+FL';
const landmarks = ['Duval Street', 'Mallory Square', 'Southernmost Point', 'Fort Zachary Taylor Beach', 'Higgs Beach', 'Key West Lighthouse', 'Mile 0', 'Smathers Beach', 'Truman Little White House', 'Key West Harbor'];

export default function ExploreKeyWestSection() {
  return (
    <section id="explore" className="bg-brand px-6 pt-10 pb-10 text-card md:block md:px-10 md:pt-12 md:pb-12">
      <div className="mx-auto max-w-6xl">
        <h2 className="mt-4 max-w-4xl font-display text-3xl uppercase leading-tight md:text-6xl">Your Cart. Your Island. Your Adventure.</h2>
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-card/75 md:text-lg">Use our interactive Paradise Rentals map to plan your Key West golf cart adventure, from iconic Old Town landmarks to the island’s best beaches and waterfront views.</p>

        {/* Mobile: static map card that deep-links to the native maps app */}
        <a
          href={NATIVE_MAPS_URL}
          target="_blank"
          rel="noreferrer"
          aria-label="Open Key West map in your maps app"
          className="mt-8 block md:hidden relative overflow-hidden rounded-2xl border border-card/15 bg-card/5 aspect-[16/10] group active:scale-[0.99] transition">
          
          <div
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage:
              'linear-gradient(hsl(var(--card)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--card)) 1px, transparent 1px)',
              backgroundSize: '32px 32px'
            }} />
          
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <div className="flex items-center justify-center h-14 w-14 rounded-full bg-solar/15 border border-solar/40">
              <MapPin className="h-7 w-7 text-solar" />
            </div>
            <span className="mt-4 font-display text-lg text-card">Open Interactive Map</span>
            <span className="mt-1 text-sm text-card/70">Tap to launch your native maps app</span>
            <span className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-solar px-4 py-2 text-xs font-bold uppercase tracking-wide text-brand">
              <Navigation className="h-3.5 w-3.5" /> Open in Maps
            </span>
          </div>
        </a>

        {/* Desktop: embedded interactive map */}
        <div className="mt-12 hidden overflow-hidden rounded-2xl border border-card/15 bg-card/5 md:block">
          <iframe src={MAP_URL} title="Paradise Rentals interactive Key West golf cart map" className="h-[520px] w-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {landmarks.map((landmark) =>
          <div key={landmark} className="flex items-center gap-2 rounded-lg border border-card/10 px-4 py-3 text-sm text-card/80">
              <MapPin className="h-4 w-4 shrink-0 text-solar" />
              <span>{landmark}</span>
            </div>
          )}
        </div>
        <a href={GUIDE_URL} target="_blank" rel="noreferrer" className="mt-10 inline-flex items-center gap-2 rounded-lg bg-solar px-6 py-3 text-sm font-bold uppercase tracking-wide text-brand">
          View Our Key West Golf Cart Guide <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </section>);

}
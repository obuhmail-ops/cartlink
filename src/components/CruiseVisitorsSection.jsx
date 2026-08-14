import React from 'react';
import { Image } from '@/components/ui/image';

const CRUISE_IMAGE_URL = 'https://media.base44.com/images/public/6a7e5db2c2620868d1046179/86ab8e5cf_generated_image.png';
const destinations = ['Duval Street', 'Southernmost Point', 'Mallory Square', 'Fort Zachary Taylor', 'Smathers Beach', 'Mile 0', 'Key West Lighthouse'];

export default function CruiseVisitorsSection() {
  return (
    <section id="cruise-visitors" className="bg-dune px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl bg-card shadow-sm">
        <Image
          src={CRUISE_IMAGE_URL}
          alt="Paradise Rentals golf carts by the Key West waterfront with a cruise ship arriving"
          fittingType="fill"
          className="aspect-[16/9] w-full md:aspect-[2/1]"
          focalPointX={0.5}
          focalPointY={0.5}
        />
        <div className="grid gap-10 p-8 md:grid-cols-[1.15fr_0.85fr] md:p-12 lg:p-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-moss">Section 7 — Cruise Visitors</p>
            <h2 className="mt-5 font-display text-3xl uppercase leading-tight text-brand md:text-5xl">Cruising Into Key West? 🚢</h2>
            <p className="mt-6 text-xl font-display text-brand">Your time on the island is limited.</p>
            <p className="mt-3 text-xl font-display text-brand">Don’t waste it figuring out transportation.</p>
            <p className="mt-5 leading-relaxed text-brand/65">Reserve your Paradise Rentals golf cart before your cruise and enjoy convenient pickup arrangements when you arrive.</p>
            <p className="mt-5 text-brand/65">Then return your cart and head back to your ship.</p>
            <a href="#fleet" className="mt-8 inline-flex rounded-lg bg-solar px-6 py-3 text-sm font-bold uppercase tracking-wide text-brand">Cruise Golf Cart Rentals</a>
          </div>
          <div className="rounded-2xl bg-brand p-7 text-dune md:p-9">
            <h3 className="font-display text-2xl">Visit:</h3>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-1">
              {destinations.map((destination) => (
                <li key={destination} className="flex items-center gap-3 border-b border-dune/10 pb-3 last:border-0">
                  <span className="text-solar" aria-hidden="true">✓</span>{destination}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
import React from 'react';

const destinations = [
['🏨', 'Hotel'],
['🏡', 'Airbnb / Vacation Rental'],
['✈️', 'Key West Airport'],
['🚢', 'Cruise Arrival']];


export default function DeliverySection() {
  return (
    <section id="delivery" className="bg-brand px-6 py-20 text-dune md:px-10 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[1.05fr_0.95fr] md:items-center">
        <div>
          <h2 className="max-w-xl font-display text-4xl leading-tight text-balance md:text-6xl">
            Don’t come to us.<br />We come to you. 🌴
          </h2>
          <p className="mt-6 max-w-xl leading-relaxed text-xl text-[hsl(var(--dune))] md:hidden">
            Your cart is delivered to your:
          </p>
          <p className="hidden mt-6 max-w-xl leading-relaxed text-xl text-[hsl(var(--dune))] md:block">
            Your vacation shouldn’t start with searching for transportation to a rental counter.
          </p>
          <p className="hidden mt-4 max-w-xl leading-relaxed text-xl text-[hsl(var(--dune))] md:block">
            Paradise Rentals delivers your golf cart directly to your destination. When your rental is finished, we’ll handle pickup too.
          </p>
        </div>

        <div className="rounded-2xl border border-dune/15 bg-dune/5 p-6 md:p-8">
          <ul className="space-y-4">
            {destinations.map(([icon, label]) =>
            <li key={label} className="flex items-center gap-4 border-b border-dune/10 pb-4 text-lg last:border-0 last:pb-0">
                <span aria-hidden="true" className="text-2xl">{icon}</span>
                <span>{label}</span>
              </li>
            )}
          </ul>
          <div className="mt-8 border-t border-dune/15 pt-7">
            <p className="font-display text-2xl text-solar">FREE delivery &amp; pickup throughout Key West*</p>

          </div>
        </div>
      </div>
    </section>);

}
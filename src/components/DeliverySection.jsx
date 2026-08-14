import React from 'react';
import AnimatedText from '@/components/AnimatedText';

const destinations = [
['🏨', 'Hotel'],
['🏡', 'Airbnb'],
['🌴', 'Vacation Rental'],
['✈️', 'Key West Airport'],
['🚢', 'Cruise Arrival']];


export default function DeliverySection() {
  return (
    <section id="delivery" className="bg-brand px-6 py-20 text-dune md:px-10 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[1.05fr_0.95fr] md:items-center">
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-solar">Your big difference</p>
          <AnimatedText direction="left" className="max-w-xl font-display text-4xl leading-tight text-balance md:text-6xl">
            Don’t come to us.<br />We come to you. 🌴
          </AnimatedText>
          <p className="mt-6 max-w-xl leading-relaxed text-dune/75 text-xl">
            Your vacation shouldn’t start with searching for transportation to a rental counter.
          </p>
          <p className="mt-4 max-w-xl leading-relaxed text-dune/75 text-xl">
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
            <p className="font-display text-2xl text-solar">Free delivery &amp; pickup</p>
            <p className="mt-2 text-dune/70">to hotels, Airbnbs and vacation rentals in Key West.</p>
            <a href="#fleet" className="mt-6 inline-flex rounded-lg bg-solar px-6 py-3 text-sm font-bold uppercase tracking-wide text-brand">
              Book Your Cart
            </a>
          </div>
        </div>
      </div>
    </section>);

}
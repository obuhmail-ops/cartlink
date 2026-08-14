import React from 'react';

const benefits = [
  { icon: '🌴', title: 'Free Delivery & Pickup', text: 'We bring your cart directly to your hotel, Airbnb or vacation rental.' },
  { icon: '⚡', title: 'Premium Electric Carts', text: 'Quiet, comfortable and perfect for exploring Key West.' },
  { icon: '👨‍👩‍👧‍👦', title: '4 & 6 Passenger Options', text: 'Great for couples, families and groups.' },
  { icon: '🔋', title: 'Long-Range Lithium Batteries', text: 'Built for a full day of Key West adventures.' },
  { icon: '✈️', title: 'Airport Delivery', text: 'Start vacation as soon as you land.' },
  { icon: '🚢', title: 'Cruise Service', text: 'Spend more of your limited island time exploring.' },
  { icon: '📱', title: 'Easy Online Booking', text: 'Reserve from your phone in minutes.' },
  { icon: '⭐', title: 'Hundreds of Happy Customers', text: 'Trusted by visitors exploring Key West.' },
];

export default function WhyParadiseSection() {
  return (
    <section id="why-paradise" className="bg-dune px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-moss">Section 9 — Why Paradise</p>
        <h2 className="mt-4 font-display text-3xl uppercase leading-tight text-brand md:text-5xl">Why Rent with Paradise?</h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="rounded-2xl border border-brand/10 bg-card p-7">
              <span className="text-3xl" aria-hidden="true">{benefit.icon}</span>
              <h3 className="mt-5 font-display text-lg uppercase tracking-wide text-brand">{benefit.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-brand/60">{benefit.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
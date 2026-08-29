import React from 'react';
import { Image } from '@/components/ui/image';
import { FAREHARBOR_URL } from '@/lib/booking';

const rideDetails = {
  four: {
    title: '4-Passenger',
    description: 'Perfect for couples and families.',
    boldNote: 'ALL FORWARD-FACING SEATS',
    features: ['Forward-Facing Seating', 'Premium Electric Cart', 'Long-Range Lithium Battery', 'Apple CarPlay and Android Auto', 'Premium Soundbar'],
    button: 'Check 4-Seater Availability'
  },
  six: {
    title: '6-Passenger',
    description: 'Bring the whole crew.',
    features: ['Seats Up to 6', 'Premium Electric Cart', 'Spacious Seating', 'Long-Range Lithium Battery', 'Perfect for Families & Groups'],
    button: 'Check 6-Seater Availability'
  }
};

export default function CartCard({ cart }) {
  const details = cart.seats >= 6 ? rideDetails.six : rideDetails.four;

  return (
    <a href={FAREHARBOR_URL} target="_blank" rel="noreferrer" className="block group focus:outline-none">
      <article className="overflow-hidden rounded-2xl border border-brand/10 bg-card shadow-sm transition-all duration-200 group-hover:shadow-lg group-hover:-translate-y-1 group-focus-visible:ring-2 group-focus-visible:ring-solar">
        <Image src={cart.image_url} alt={`${details.title} electric golf cart`} fittingType="fill" className="aspect-[4/3] w-full" />
        <div className="p-6 md:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-moss">{details.title}</p>
          {details.boldNote &&
          <p className="mt-3 font-bold uppercase tracking-wide text-brand">{details.boldNote}</p>
          }
          <h3 className="mt-3 font-display text-2xl text-brand md:text-3xl">{details.description}</h3>
          <ul className="mt-6 grid gap-3 text-sm text-brand/70 sm:grid-cols-2">
            {details.features.map((feature) =>
            <li key={feature} className="flex items-start gap-2">
                <span className="font-bold text-moss" aria-hidden="true">✓</span>
                <span className="text-[hsl(var(--brand))]">{feature}</span>
              </li>
            )}
          </ul>
          <span className="mt-8 inline-flex w-full justify-center rounded-lg bg-solar px-5 py-3 text-center text-sm font-bold uppercase tracking-wide text-brand transition-all duration-200 group-hover:brightness-110 group-hover:scale-[1.02]">
            {details.button}
          </span>
        </div>
      </article>
    </a>);

}
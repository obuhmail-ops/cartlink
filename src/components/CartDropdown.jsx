import React from 'react';
import { Image } from '@/components/ui/image';
import { imageUrl } from '@/lib/images';

const rideDetails = {
  four: {
    title: '4-Passenger',
    description: 'Perfect for couples and families.',
    features: ['Forward-Facing Seating', 'Premium Electric Cart', 'Lithium Battery', 'Quiet Ride', 'Key West Delivery'],
    button: 'Check 4-Seater Availability',
    url: 'https://fareharbor.com/embeds/book/paradiserentalskw/items/420448/calendar/?full-items=yes',
  },
  six: {
    title: '6-Passenger',
    description: 'Bring the whole crew.',
    features: ['Seats Up to 6', 'Premium Electric Cart', 'Spacious Seating', 'Long-Range Lithium Battery', 'Key West Delivery'],
    button: 'Check 6-Seater Availability',
    url: 'https://fareharbor.com/embeds/book/paradiserentalskw/items/420452/calendar/?full-items=yes',
  },
};

const STATIC_CARTS = [
  { id: 'static-4p', seats: 4, image_url: imageUrl('7e17732d6_generated_image.png') },
  { id: 'static-6p', seats: 6, image_url: imageUrl('6acf6e567_generated_image.png') },
];

export default function CartDropdown({ open, onClose, onNavigate, onMouseEnter, onMouseLeave }) {
  if (!open) return null;

  return (
    <div className="fixed left-1/2 -translate-x-1/2 top-12 w-[min(80vw,720px)] z-50" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <div className="rounded-2xl border border-brand/10 bg-dune shadow-2xl overflow-hidden">
        <div className="px-6 py-4 bg-brand/5 border-b border-brand/10">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-moss">Choose Your Ride</p>
          <h3 className="mt-1 font-display text-xl text-brand">Find the Perfect Golf Cart</h3>
        </div>
        <div className="p-4">
          <div className="grid gap-4 md:grid-cols-2">
            {STATIC_CARTS.map((cart) => {
              const details = cart.seats >= 6 ? rideDetails.six : rideDetails.four;
              return (
                <a
                  key={cart.id}
                  href={details.url}
                  target="_blank"
                  rel="noreferrer"
                  onClick={onClose}
                  className="group block overflow-hidden rounded-xl border border-brand/10 bg-card hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                >
                  <Image src={cart.image_url} alt={`${details.title} electric golf cart`} fittingType="fill" className="aspect-[16/9] w-full" />
                  <div className="p-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-moss">{details.title}</p>
                    <h4 className="mt-1 font-display text-lg text-brand">{details.description}</h4>
                    <ul className="mt-3 grid gap-1.5 text-xs text-brand/70">
                      {details.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-1.5">
                          <span className="font-bold text-moss" aria-hidden="true">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <span className="mt-4 inline-flex w-full justify-center rounded-lg bg-solar px-4 py-2 text-center text-xs font-bold uppercase tracking-wide text-brand group-hover:brightness-105 transition">
                      {details.button}
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
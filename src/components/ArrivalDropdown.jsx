import React from 'react';
import { Image } from '@/components/ui/image';

const options = [
  {
    id: 'airport-delivery',
    image: 'https://media.base44.com/images/public/6a7e5db2c2620868d1046179/fa9f7a8c5_generated_image.png',
    label: 'Airport Delivery',
    title: 'Land. Grab Your Bags. Start Your Vacation.',
    body: 'Skip the rental-car counter with convenient golf-cart delivery for arrivals at Key West International Airport.',
    button: 'Airport Rentals'
  },
  {
    id: 'key-west-express',
    image: 'https://media.base44.com/images/public/6a7e5db2c2620868d1046179/6b280111a_generated_image.png',
    label: 'Key West Express',
    title: 'Make the Most of Every Island Hour.',
    body: 'Qualifying rentals of 24 hours or longer for Key West Express arrivals can receive extra island time.',
    button: 'Reserve Your Cart'
  },
  {
    id: 'cruise-visitors',
    image: 'https://media.base44.com/images/public/6a7e5db2c2620868d1046179/b4b242b62_generated_image.png',
    label: 'Cruise Rentals',
    title: 'Cruising Into Key West?',
    body: 'Reserve before your cruise and enjoy convenient pickup arrangements, then return your cart before heading back to your ship.',
    button: 'Cruise Golf Cart Rentals'
  }
];

export default function ArrivalDropdown({ open, onClose, onMouseEnter, onMouseLeave }) {
  if (!open) return null;

  const scrollTo = (id) => {
    onClose();
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 60);
  };

  return (
    <div className="fixed left-1/2 -translate-x-1/2 top-12 w-[min(80vw,720px)] z-50" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <div className="rounded-2xl border border-brand/10 bg-dune shadow-2xl overflow-hidden">
        <div className="px-6 py-4 bg-brand/5 border-b border-brand/10">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-moss">Delivery & Arrival Options</p>
          <h3 className="mt-1 font-display text-xl text-brand">Start Exploring Key West Your Way</h3>
        </div>
        <div className="p-4">
          <div className="grid gap-4 md:grid-cols-3">
            {options.map((option) => (
              <button
                key={option.id}
                onClick={() => scrollTo('arrival-options')}
                className="group block w-full overflow-hidden rounded-xl border border-brand/10 bg-card hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 text-left"
              >
                <Image src={option.image} alt={option.label} fittingType="fill" className="aspect-[16/9] w-full" />
                <div className="p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-moss">{option.label}</p>
                  <h4 className="mt-1 font-display text-base text-brand leading-tight">{option.title}</h4>
                  <p className="mt-2 text-xs text-brand/65 leading-relaxed">{option.body}</p>
                  <span className="mt-4 inline-flex w-full justify-center rounded-lg bg-solar px-4 py-2 text-center text-xs font-bold uppercase tracking-wide text-brand group-hover:brightness-105 transition">
                    {option.button}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
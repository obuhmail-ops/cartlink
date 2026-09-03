import React from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  ['How old do I need to be to rent a golf cart?', 'Drivers must be 22 years of age or older to rent a golf cart from Paradise Rentals in Key West.'],
  ['Do I need a driver’s license?', 'Yes. A valid driver’s license is required for every driver renting a golf cart in Key West.'],
  ['Do you deliver to hotels?', 'Yes. Paradise Rentals offers free delivery and pickup to hotels throughout Key West, so your cart is waiting when you check in.'],
  ['Do you deliver to Airbnbs and vacation rentals?', 'Yes. We deliver to Airbnbs, vacation rentals, and guesthouses anywhere in Key West at no extra charge.'],
  ['Do you offer airport delivery?', 'Yes. We deliver to Key West International Airport (EYW) based on reservation availability and arrangements, so you can skip the taxi line.'],
  ['Do you deliver to the cruise port?', 'Yes. We deliver to the Key West cruise port — your cart is ready when your ship docks.'],
  ['Are the carts electric?', 'Yes. Paradise Rentals specializes in premium electric golf carts with long-range lithium batteries, Apple CarPlay, and premium soundbars.'],
  ['Do you have 6-passenger carts?', 'Yes. We offer both forward-facing 4-passenger and spacious 6-passenger electric golf carts to fit your group.'],
  ['How far can I go on a single charge?', 'Our long-range lithium batteries deliver up to 60 miles on a single charge — plenty for a full day exploring Key West.'],
  ['What if I don’t have somewhere to charge?', 'No charging stress — contact Paradise Rentals and we’ll come swap your cart on the spot so your day keeps moving.'],
  ['How do I book a golf cart?', 'Book online in minutes through our secure booking portal. Choose a 4 or 6 passenger cart, your dates, and your delivery location.'],
  ['Is delivery really free?', 'Yes. Delivery and pickup are free throughout all of Key West, from Old Town to the beaches.'],
];

export default function FaqSection() {
  return (
    <section id="faqs" className="bg-dune px-6 pt-10 pb-10 md:px-10 md:pt-12 md:pb-12">
      <div className="mx-auto max-w-4xl">
        <h2 className="font-display text-4xl uppercase text-brand md:text-6xl">Questions?</h2>
        <div className="mt-12 divide-y divide-brand/15 border-y border-brand/15">
          {faqs.map(([question, answer]) => (
            <details key={question} className="group py-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-lg text-brand">
                {question}<ChevronDown className="h-5 w-5 shrink-0 transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-4 pr-10 leading-relaxed text-brand/65">{answer}</p>
            </details>
          ))}
        </div>

      </div>
    </section>
  );
}
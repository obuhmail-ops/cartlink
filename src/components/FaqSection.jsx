import React from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  ['How old do I need to be?', 'Drivers must meet Paradise Rentals’ rental requirements.'],
  ['Do I need a driver’s license?', 'Yes.'],
  ['Do you deliver to hotels?', 'Yes. Paradise Rentals offers delivery to hotels in Key West.'],
  ['Do you deliver to Airbnbs and vacation rentals?', 'Yes.'],
  ['Do you offer airport delivery?', 'Yes, based on reservation availability and arrangements.'],
  ['Are the carts electric?', 'Yes. Paradise Rentals specializes in premium electric golf carts.'],
  ['Do you have 6-passenger carts?', 'Yes. Both 4- and 6-passenger options are available.'],
  ['What if I don’t have somewhere to charge?', 'Contact Paradise Rentals and we’ll help arrange the appropriate solution.'],
];

export default function FaqSection() {
  const contactParadise = () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="faqs" className="hidden md:block bg-dune px-6 py-24 md:px-10 md:py-32">
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
        <button onClick={contactParadise} className="mt-10 rounded-lg bg-solar px-6 py-3 text-sm font-bold uppercase tracking-wide text-brand">Contact Paradise</button>
      </div>
    </section>
  );
}
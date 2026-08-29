import React from 'react';
import { FAREHARBOR_URL } from '@/lib/booking';

const steps = [
  { number: '1', title: 'Choose', text: 'Select a 4- or 6-passenger golf cart.' },
  { number: '2', title: 'Book', text: 'Select your dates and complete your reservation online.' },
  { number: '3', title: 'We Deliver', text: 'Tell us where you’re staying.' },
  { number: '4', title: 'Explore', text: 'Enjoy Key West the Paradise Way.' },
  { number: '5', title: 'We Pick It Up', text: 'When your rental ends, we’ll take care of the rest.' },
];

export default function HowItWorksSection() {
  return (
    <section id="how" className="bg-card px-6 pt-10 pb-10 md:px-10 md:pt-12 md:pb-12">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-display text-3xl uppercase leading-tight text-brand md:text-5xl">Renting Is Easy</h2>
        <div className="mt-14 grid gap-6 md:grid-cols-5">
          {steps.map((step) => (
            <article key={step.number} className="border-t border-brand/15 pt-6">
              <span className="font-display text-3xl text-solar">{step.number}.</span>
              <h3 className="mt-5 font-display text-xl uppercase text-brand">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-brand/60">{step.text}</p>
            </article>
          ))}
        </div>
        <a href={FAREHARBOR_URL} target="_blank" rel="noreferrer" className="mt-12 inline-block rounded-lg bg-solar px-6 py-3 text-sm font-bold uppercase tracking-wide text-brand">Check Availability</a>
      </div>
    </section>
  );
}
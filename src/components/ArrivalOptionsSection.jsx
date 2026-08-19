import React from 'react';
import { Image } from '@/components/ui/image';

const options = [
{
  id: 'airport-delivery',
  image: 'https://media.base44.com/images/public/6a7e5db2c2620868d1046179/fa9f7a8c5_generated_image.png',
  label: 'Airport Delivery',
  title: 'Land. Grab Your Bags. Start Your Vacation.',
  body: 'Skip the rental-car counter with convenient golf-cart delivery for arrivals at Key West International Airport.',
  detail: 'Your vacation starts the moment you arrive.',
  button: 'Airport Rentals'
},
{
  id: 'key-west-express',
  image: 'https://media.base44.com/images/public/6a7e5db2c2620868d1046179/8090f1a27_A6700430.jpg',
  label: 'Key West Express',
  title: 'Make the Most of Every Island Hour.',
  body: 'Qualifying rentals of 24 hours or longer for Key West Express arrivals can receive extra island time.',
  detail: '4 Complimentary Extra Hours*',
  button: 'Reserve Your Cart'
},
{
  id: 'cruise-visitors',
  image: 'https://media.base44.com/images/public/6a7e5db2c2620868d1046179/b4b242b62_generated_image.png',
  label: 'Cruise Rentals',
  title: 'Cruising Into Key West?',
  body: 'Reserve before your cruise and enjoy convenient pickup arrangements, then return your cart before heading back to your ship.',
  detail: 'Explore Key West without wasting a minute.',
  button: 'Cruise Golf Cart Rentals'
}];


export default function ArrivalOptionsSection() {
  return (
    <section id="arrival-options" className="scroll-mt-24 bg-dune px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-moss">Delivery & Arrival Options</p>
        <h2 className="mt-4 max-w-3xl font-display text-3xl uppercase leading-tight text-brand md:text-5xl">Start Exploring Key West Your Way</h2>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {options.map((option) =>
          <article id={option.id} key={option.id} className="scroll-mt-24 overflow-hidden rounded-2xl bg-card shadow-sm">
              <Image src={option.image} alt={option.label} fittingType="fill" className="aspect-[4/3] w-full" />
              <div className="flex flex-col p-7">
                <p className="font-bold uppercase tracking-[0.18em] text-base text-[hsl(var(--destructive))]">{option.label}</p>
                <h3 className="mt-3 font-display text-2xl uppercase leading-tight text-brand">{option.title}</h3>
                <p className="mt-4 leading-relaxed text-brand/65">{option.body}</p>
                <p className="mt-5 font-semibold text-brand">{option.detail}</p>
                <a href="#fleet" className="inline-flex justify-center rounded-lg bg-solar px-5 py-3 text-center text-sm font-bold uppercase tracking-wide text-brand my-3">{option.button}</a>
              </div>
            </article>
          )}
        </div>
      </div>
    </section>);

}
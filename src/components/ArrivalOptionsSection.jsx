import React from 'react';
import { Image } from '@/components/ui/image';
import { FAREHARBOR_URL } from '@/lib/booking';
import { trackEvent } from '@/lib/track';
import { imageUrl } from '@/lib/images';

const options = [
{
  id: 'airport-delivery',
  image: imageUrl('fa9f7a8c5_generated_image.png'),
  label: 'Airport Delivery',
  title: 'Land. Grab Your Bags. Start Your Vacation.',
  body: 'Skip the rental-car counter with convenient golf-cart delivery for arrivals at Key West International Airport.',
  detail: 'Your vacation starts the moment you arrive.',
  button: 'Airport Rentals'
},
{
  id: 'key-west-express',
  image: imageUrl('6b280111a_generated_image.png'),
  label: 'Key West Express',
  title: 'Make the Most of Every Island Hour.',
  body: 'Qualifying rentals of 24 hours or longer for Key West Express arrivals can receive extra island time.',
  detail: '4 Complimentary Extra Hours*',
  button: 'Reserve Your Cart'
},
{
  id: 'cruise-visitors',
  image: imageUrl('b4b242b62_generated_image.png'),
  label: 'Cruise Rentals',
  title: 'Cruising Into Key West?',
  body: 'Reserve before your cruise and enjoy convenient pickup arrangements, then return your cart before heading back to your ship.',
  detail: 'Explore Key West without wasting a minute.',
  button: 'Cruise Golf Cart Rentals'
}];


export default function ArrivalOptionsSection() {
  return (
    <section id="arrival-options" className="scroll-mt-24 bg-dune px-6 pt-10 pb-10 md:px-10 md:pt-12 md:pb-12">
      <div className="mx-auto max-w-6xl">
        
        <h2 className="mt-4 max-w-3xl font-display text-3xl uppercase leading-tight text-brand md:text-5xl">Arriving in Key West? We've Got Your Ride.</h2>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {options.map((option) =>
          <a href={FAREHARBOR_URL} target="_blank" rel="noreferrer" key={option.id} onClick={() => trackEvent('check_availability_click', { location: 'arrival_options', option: option.id })} className="group block scroll-mt-24 overflow-hidden rounded-2xl bg-card shadow-sm transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
              <article id={option.id}>
                <Image src={option.image} alt={option.label} fittingType="fill" className="aspect-[4/3] w-full" />
                <div className="flex justify-center -mt-6 relative z-10">
                  <span className="inline-flex justify-center rounded-full bg-solar px-8 py-3 text-center text-sm font-bold uppercase tracking-wide text-brand shadow-lg group-hover:brightness-110 group-hover:scale-105 transition-all duration-200">{option.button}</span>
                </div>
                <div className="flex flex-col p-7">
                  {option.id === 'airport-delivery' ?
                <>
                      <p className="md:hidden text-center text-3xl" aria-hidden="true">✈️ FLYING IN?</p>
                      <p className="md:hidden mt-3 text-center font-display text-lg uppercase leading-tight text-brand">Airport golf-cart delivery available.</p>
                      <p className="hidden md:block font-bold uppercase tracking-[0.18em] text-base text-[hsl(var(--destructive))] text-center">{option.label}</p>
                      <h3 className="hidden md:block mt-3 font-display text-2xl uppercase leading-tight text-brand text-center">{option.title}</h3>
                      <p className="hidden md:block mt-4 leading-relaxed text-brand/65">{option.body}</p>
                      <p className="hidden md:block mt-5 font-semibold text-brand">{option.detail}</p>
                    </> :
                option.id === 'key-west-express' ?
                <>
                      <p className="md:hidden text-center text-3xl" aria-hidden="true">⛴️ KEY WEST EXPRESS</p>
                      <p className="md:hidden mt-3 text-center text-sm font-semibold text-brand">24+ hour rental receive 4 complimentary extra hours.*</p>
                      <p className="hidden md:block font-bold uppercase tracking-[0.18em] text-base text-[hsl(var(--destructive))] text-center">{option.label}</p>
                      <h3 className="hidden md:block mt-3 font-display text-2xl uppercase leading-tight text-brand text-center">{option.title}</h3>
                      <p className="hidden md:block mt-4 leading-relaxed text-brand/65">{option.body}</p>
                      <p className="hidden md:block mt-5 font-semibold text-brand">{option.detail}</p>
                    </> :
                option.id === 'cruise-visitors' ?
                <>
                      <p className="md:hidden text-center text-3xl" aria-hidden="true">🚢 ARRIVING BY CRUISE?</p>
                      <p className="md:hidden mt-3 text-center text-sm font-semibold text-brand">Convenient pickup arrangements so you can spend more of your port day exploring.</p>
                      <p className="hidden md:block font-bold uppercase tracking-[0.18em] text-base text-[hsl(var(--destructive))] text-center">{option.label}</p>
                      <h3 className="hidden md:block mt-3 font-display text-2xl uppercase leading-tight text-brand text-center">{option.title}</h3>
                      <p className="hidden md:block mt-4 leading-relaxed text-brand/65">{option.body}</p>
                      <p className="hidden md:block mt-5 font-semibold text-brand">{option.detail}</p>
                    </> :

                <>
                      <p className="font-bold uppercase tracking-[0.18em] text-base text-[hsl(var(--destructive))] text-center">{option.label}</p>
                      <h3 className="mt-3 font-display text-2xl uppercase leading-tight text-brand text-center">{option.title}</h3>
                      <p className="mt-4 leading-relaxed text-brand/65">{option.body}</p>
                      <p className="mt-5 font-semibold text-brand">{option.detail}</p>
                    </>
                }
                </div>
              </article>
            </a>
          )}
        </div>
      </div>
    </section>);

}
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileBookingBar from '@/components/MobileBookingBar';
import HowItWorksSection from '@/components/HowItWorksSection';
import FaqSection from '@/components/FaqSection';
import FinalBookingCta from '@/components/FinalBookingCta';
import { Image } from '@/components/ui/image';
import { imageUrl } from '@/lib/images';
import { FAREHARBOR_URL } from '@/lib/booking';
import { trackEvent } from '@/lib/track';

const HERO_IMAGE = imageUrl('fa9f7a8c5_generated_image.png');
const CART_IMAGE = imageUrl('7e17732d6_generated_image.png');

const STEPS = [
  { icon: '✈️', title: 'Land at EYW', body: 'Arrive at Key West International Airport and grab your bags.' },
  { icon: '🚗', title: 'We Deliver', body: 'Your golf cart is delivered right to the airport — no rental counter lines.' },
  { icon: '🌴', title: 'Start Exploring', body: 'Hop in and start your Key West adventure the moment you land.' },
  { icon: '🔁', title: 'We Pick It Up', body: 'When your rental ends, we handle pickup so you head home stress-free.' },
];

const SEO_TITLE = 'Key West Airport Golf Cart Rental | EYW Delivery | Paradise Rentals';
const SEO_DESCRIPTION =
  'Skip the rental-car counter. Get a premium electric golf cart delivered to Key West International Airport (EYW). Free airport delivery and pickup for 4- and 6-passenger carts with Apple CarPlay and long-range batteries.';

export default function AirportRental() {
  useEffect(() => {
    const previousTitle = document.title;
    const descMeta = document.querySelector('meta[name="description"]');
    const previousDescription = descMeta?.getAttribute('content');
    document.title = SEO_TITLE;
    if (descMeta) descMeta.setAttribute('content', SEO_DESCRIPTION);
    return () => {
      document.title = previousTitle;
      if (descMeta && previousDescription) descMeta.setAttribute('content', previousDescription);
    };
  }, []);

  const handleBook = () => trackEvent('check_availability_click', { location: 'airport_page', option: 'airport-delivery' });

  return (
    <div className="min-h-screen bg-dune">
      <Navbar />

      <main className="pt-28 md:pt-36">
        {/* Hero */}
        <section className="px-6 md:px-10 max-w-6xl mx-auto">
          <header className="text-center max-w-3xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-moss">Paradise Rentals KW</p>
            <h1 className="mt-3 font-display text-4xl md:text-6xl text-brand text-balance leading-tight">
              Key West Airport Golf Cart Rental
            </h1>
            <p className="mt-5 text-base md:text-lg text-brand/70 leading-relaxed">
              Land. Grab your bags. Start your vacation. Skip the rental-car counter and have a premium
              electric golf cart delivered directly to Key West International Airport (EYW). Free
              delivery and pickup on every rental.
            </p>
            <a
              href={FAREHARBOR_URL}
              target="_blank"
              rel="noreferrer"
              onClick={handleBook}
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-solar px-6 py-3 text-sm font-bold uppercase tracking-wide text-brand shadow hover:brightness-110 hover:scale-105 active:scale-95 transition-all duration-200"
            >
              Check Airport Availability
            </a>
          </header>

          <div className="mt-12 overflow-hidden rounded-2xl border border-brand/10 bg-card shadow-sm">
            <Image
              src={HERO_IMAGE}
              alt="Electric golf cart delivered to Key West International Airport"
              fittingType="fill"
              className="aspect-[16/10] w-full object-cover"
            />
          </div>
        </section>

        {/* How it works */}
        <section className="px-6 md:px-10 max-w-6xl mx-auto mt-16">
          <h2 className="font-display text-3xl md:text-4xl text-brand text-balance leading-tight text-center">
            How Airport Delivery Works
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, i) => (
              <div key={step.title} className="rounded-2xl border border-brand/10 bg-card p-6 shadow-sm">
                <span className="text-2xl" aria-hidden="true">{step.icon}</span>
                <p className="mt-3 text-xs font-bold uppercase tracking-wider text-moss">Step {i + 1}</p>
                <h3 className="mt-1 font-display text-xl text-brand">{step.title}</h3>
                <p className="mt-2 text-sm text-brand/70 leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why airport delivery */}
        <section className="px-6 md:px-10 max-w-6xl mx-auto mt-16">
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div className="overflow-hidden rounded-2xl border border-brand/10 bg-card shadow-sm">
              <Image src={CART_IMAGE} alt="Premium 4-passenger electric golf cart ready for airport delivery" fittingType="fill" className="aspect-[4/3] w-full object-cover" />
            </div>
            <div>
              <h2 className="font-display text-3xl md:text-4xl text-brand text-balance leading-tight">
                Why Rent a Golf Cart at the Airport?
              </h2>
              <p className="mt-5 text-brand/70 leading-relaxed">
                Your Key West vacation should start the moment you land — not at a rental-car counter.
                With Paradise Rentals, your electric golf cart is delivered right to Key West
                International Airport, so you can skip the lines and start exploring immediately.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-brand/70">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-moss" aria-hidden="true">✓</span>
                  <span>Free delivery and pickup at EYW — no extra fees</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-moss" aria-hidden="true">✓</span>
                  <span>Choose 4- or 6-passenger electric carts</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-moss" aria-hidden="true">✓</span>
                  <span>Long-range lithium battery for a full island day</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-moss" aria-hidden="true">✓</span>
                  <span>Apple CarPlay, Android Auto & premium soundbar</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-moss" aria-hidden="true">✓</span>
                  <span>No charging stress — we swap your cart if needed</span>
                </li>
              </ul>
              <a
                href={FAREHARBOR_URL}
                target="_blank"
                rel="noreferrer"
                onClick={handleBook}
                className="mt-8 inline-flex items-center gap-2 rounded-lg bg-solar px-6 py-3 text-sm font-bold uppercase tracking-wide text-brand shadow hover:brightness-110 hover:scale-105 active:scale-95 transition-all duration-200"
              >
                Book Your Airport Cart
              </a>
            </div>
          </div>
        </section>

        <HowItWorksSection />
        <FaqSection />
        <FinalBookingCta />
      </main>

      <Footer />
      <MobileBookingBar />
      <div className="h-24 md:hidden" aria-hidden="true" />
    </div>
  );
}
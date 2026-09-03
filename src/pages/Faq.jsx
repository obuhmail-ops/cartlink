import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FaqSection from '@/components/FaqSection';
import MobileBookingBar from '@/components/MobileBookingBar';
import FinalBookingCta from '@/components/FinalBookingCta';
import { FAREHARBOR_URL } from '@/lib/booking';
import { trackEvent } from '@/lib/track';

const SEO_TITLE = 'Key West Golf Cart Rental FAQ | Delivery, Age & Electric Cart Questions | Paradise Rentals KW';
const SEO_DESCRIPTION =
  'Answers to the most common questions about renting a golf cart in Key West with Paradise Rentals — driver age and license requirements, free hotel and Airbnb delivery, airport and cruise port drop-off, electric carts, 6-passenger options, range, and charging.';

const FAQ_QUESTIONS = [
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

function buildFaqJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_QUESTIONS.map(([q, a]) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
}

export default function Faq() {
  useEffect(() => {
    const previousTitle = document.title;
    const descMeta = document.querySelector('meta[name="description"]');
    const previousDescription = descMeta?.getAttribute('content');

    document.title = SEO_TITLE;
    if (descMeta) descMeta.setAttribute('content', SEO_DESCRIPTION);

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(buildFaqJsonLd());
    document.head.appendChild(script);

    return () => {
      document.title = previousTitle;
      if (descMeta && previousDescription) descMeta.setAttribute('content', previousDescription);
      document.head.removeChild(script);
    };
  }, []);

  const handleBook = () => trackEvent('check_availability_click', { location: 'faq_page' });

  return (
    <div className="min-h-screen bg-dune">
      <Navbar />

      <main className="pt-28 md:pt-36">
        <section className="px-6 md:px-10 max-w-4xl mx-auto text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-moss">Paradise Rentals KW</p>
          <h1 className="mt-3 font-display text-4xl md:text-6xl text-brand text-balance leading-tight">
            Key West Golf Cart Rental FAQ
          </h1>
          <p className="mt-5 max-w-2xl mx-auto text-base md:text-lg text-brand/70 leading-relaxed">
            Got questions about renting a golf cart in Key West? Here are answers to the most common
            questions about driver requirements, free delivery, our electric carts, range, charging,
            and how to book your 4 or 6 passenger cart.
          </p>
          <a
            href={FAREHARBOR_URL}
            target="_blank"
            rel="noreferrer"
            onClick={handleBook}
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-solar px-6 py-3 text-sm font-bold uppercase tracking-wide text-brand shadow hover:brightness-110 hover:scale-105 active:scale-95 transition-all duration-200"
          >
            Check Availability
          </a>
        </section>

        <div className="mt-6">
          <FaqSection />
        </div>

        <FinalBookingCta />
      </main>

      <Footer />
      <MobileBookingBar />
      <div className="h-24 md:hidden" aria-hidden="true" />
    </div>
  );
}
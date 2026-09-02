import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FaqSection from '@/components/FaqSection';
import MobileBookingBar from '@/components/MobileBookingBar';

const SEO_TITLE = 'Key West Golf Cart Rental FAQ | Paradise Rentals';
const SEO_DESCRIPTION =
  'Answers to common questions about renting a golf cart in Key West with Paradise Rentals — delivery, age requirements, driver license, electric carts, 6-passenger options, and charging.';

const FAQ_QUESTIONS = [
  ['How old do I need to be?', "Drivers must meet Paradise Rentals' rental requirements."],
  ['Do I need a driver\u2019s license?', 'Yes.'],
  ['Do you deliver to hotels?', 'Yes. Paradise Rentals offers delivery to hotels in Key West.'],
  ['Do you deliver to Airbnbs and vacation rentals?', 'Yes.'],
  ['Do you offer airport delivery?', 'Yes, based on reservation availability and arrangements.'],
  ['Are the carts electric?', 'Yes. Paradise Rentals specializes in premium electric golf carts.'],
  ['Do you have 6-passenger carts?', 'Yes. Both 4- and 6-passenger options are available.'],
  ['What if I don\u2019t have somewhere to charge?', "Contact Paradise Rentals and we'll help arrange the appropriate solution."],
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
            questions about delivery, driver requirements, our electric carts, and more.
          </p>
        </section>

        <div className="mt-6">
          <FaqSection />
        </div>
      </main>

      <Footer />
      <MobileBookingBar />
      <div className="h-24 md:hidden" aria-hidden="true" />
    </div>
  );
}
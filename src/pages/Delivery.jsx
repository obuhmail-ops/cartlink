import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DeliverySection from '@/components/DeliverySection';
import MobileBookingBar from '@/components/MobileBookingBar';

const SEO_TITLE = 'Free Golf Cart Delivery in Key West | Paradise Rentals';
const SEO_DESCRIPTION =
  'Free golf cart delivery and pickup throughout Key West — to your hotel, Airbnb, vacation rental, Key West Airport, or cruise port. Skip the rental counter and start your vacation instantly.';

export default function Delivery() {
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

  return (
    <div className="min-h-screen bg-dune">
      <Navbar />

      <main className="pt-28 md:pt-36">
        <section className="px-6 md:px-10 max-w-6xl mx-auto text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-moss">Paradise Rentals KW</p>
          <h1 className="mt-3 font-display text-4xl md:text-6xl text-brand text-balance leading-tight">
            Free Golf Cart Delivery in Key West
          </h1>
          <p className="mt-5 max-w-2xl mx-auto text-base md:text-lg text-brand/70 leading-relaxed">
            Your vacation shouldn't start with searching for transportation to a rental counter.
            Paradise Rentals delivers your electric golf cart directly to your destination — and picks
            it up when you're done. Free delivery and pickup throughout all of Key West.
          </p>
        </section>

        <div className="mt-6">
          <DeliverySection />
        </div>
      </main>

      <Footer />
      <MobileBookingBar />
      <div className="h-24 md:hidden" aria-hidden="true" />
    </div>
  );
}
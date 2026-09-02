import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GallerySection from '@/components/GallerySection';
import MobileBookingBar from '@/components/MobileBookingBar';

const SEO_TITLE = 'Key West Golf Cart Gallery | Paradise Rentals Photo Gallery';
const SEO_DESCRIPTION =
  'Browse photos of our premium electric golf carts in Key West. See our 4-passenger and 6-passenger carts, interiors, soundbars, and infotainment features before you book.';

export default function Gallery() {
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
            Key West Golf Cart Gallery
          </h1>
          <p className="mt-5 max-w-2xl mx-auto text-base md:text-lg text-brand/70 leading-relaxed">
            Take a closer look at our premium electric golf carts. From forward-facing leather seats
            and premium soundbars to infotainment touchscreens and vibrant colors — see why Paradise
            Rentals is Key West's top choice for golf cart rentals.
          </p>
        </section>

        <div className="mt-4">
          <GallerySection />
        </div>
      </main>

      <Footer />
      <MobileBookingBar />
      <div className="h-24 md:hidden" aria-hidden="true" />
    </div>
  );
}
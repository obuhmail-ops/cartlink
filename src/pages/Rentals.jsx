import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartCard from '@/components/CartCard';
import MobileBookingBar from '@/components/MobileBookingBar';
import { imageUrl } from '@/lib/images';

const STATIC_CARTS = [
  { id: 'static-4p', name: 'Coastal Cruiser', seats: 4, image_url: imageUrl('7e17732d6_generated_image.png') },
  { id: 'static-6p', name: 'Family Voyager', seats: 6, image_url: imageUrl('6acf6e567_generated_image.png') },
];

const SEO_TITLE = 'Key West Golf Cart Rentals | 4 & 6 Passenger Electric Carts';
const SEO_DESCRIPTION =
  'Rent premium electric golf carts in Key West. Choose 4-passenger or 6-passenger carts with free delivery, long-range lithium batteries, and Apple CarPlay. Book your Key West golf cart rental today.';

export default function Rentals() {
  useEffect(() => {
    const previousTitle = document.title;
    const previousDescription = document.querySelector('meta[name="description"]')?.getAttribute('content');
    document.title = SEO_TITLE;
    const descMeta = document.querySelector('meta[name="description"]');
    if (descMeta) descMeta.setAttribute('content', SEO_DESCRIPTION);
    return () => {
      document.title = previousTitle;
      if (descMeta && previousDescription) descMeta.setAttribute('content', previousDescription);
    };
  }, []);

  return (
    <div className="min-h-screen bg-dune">
      <Navbar />

      <main className="pt-28 md:pt-36 pb-16">
        <section className="px-6 md:px-10 max-w-6xl mx-auto">
          <header className="text-center max-w-3xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-moss">Paradise Rentals KW</p>
            <h1 className="mt-3 font-display text-4xl md:text-6xl text-brand text-balance leading-tight">
              Key West Golf Cart Rentals
            </h1>
            <p className="mt-5 text-base md:text-lg text-brand/70 leading-relaxed">
              Explore Key West the paradise way with our premium electric golf carts. Choose from
              forward-facing 4-passenger or spacious 6-passenger models — all featuring long-range
              lithium batteries, premium soundbars, and free delivery anywhere in Key West.
            </p>
          </header>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {STATIC_CARTS.map((cart) => (
              <CartCard key={cart.id} cart={cart} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
      <MobileBookingBar />
      <div className="h-24 md:hidden" aria-hidden="true" />
    </div>
  );
}
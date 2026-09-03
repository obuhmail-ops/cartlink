import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GallerySection from '@/components/GallerySection';
import MobileBookingBar from '@/components/MobileBookingBar';
import FinalBookingCta from '@/components/FinalBookingCta';
import { FAREHARBOR_URL } from '@/lib/booking';
import { trackEvent } from '@/lib/track';

const HIGHLIGHTS = [
  { icon: '💺', title: 'Forward-Facing Leather Seats', body: 'Every passenger faces forward in cushioned, leather-trimmed seats — no backward riding, just comfortable views of Key West.' },
  { icon: '🔊', title: 'Premium Bluetooth Soundbars', body: 'Pump your island playlist through a premium soundbar with blue LED accents that keep the vibes going after sunset.' },
  { icon: '📱', title: 'Apple CarPlay & Android Auto', body: 'Turn-by-turn directions, music, and hands-free calls on a crisp dashboard touchscreen display.' },
  { icon: '🔋', title: 'Long-Range Lithium Battery', body: 'Up to 60 miles of range on a single charge — enough for a full day of exploring Old Town and the beaches.' },
  { icon: '🎨', title: 'Vibrant Island Colors', body: 'From coastal blues to tropical teals, our carts look as good as they ride — perfect for your Key West photo ops.' },
  { icon: '⚡', title: 'No Charging Stress', body: 'Running low on battery? We come to you and swap your cart on the spot, so your day never skips a beat.' },
];

const SEO_TITLE = 'Key West Golf Cart Gallery | 4 & 6 Passenger Electric Cart Photos | Paradise Rentals KW';
const SEO_DESCRIPTION =
  'Browse photos of premium electric golf carts for rent in Key West. See forward-facing leather seats, premium soundbars, Apple CarPlay touchscreens, long-range lithium batteries, and vibrant island colors before you book your 4 or 6 passenger cart.';

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

  const handleBook = () => trackEvent('check_availability_click', { location: 'gallery_page' });

  return (
    <div className="min-h-screen bg-dune">
      <Navbar />

      <main className="pt-28 md:pt-36">
        {/* Hero */}
        <section className="px-6 md:px-10 max-w-6xl mx-auto text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-moss">Paradise Rentals KW</p>
          <h1 className="mt-3 font-display text-4xl md:text-6xl text-brand text-balance leading-tight">
            Key West Golf Cart Gallery
          </h1>
          <p className="mt-5 max-w-2xl mx-auto text-base md:text-lg text-brand/70 leading-relaxed">
            Take a closer look at our premium electric golf carts. From forward-facing leather seats
            and premium soundbars to infotainment touchscreens and vibrant island colors — see why
            Paradise Rentals is Key West's top choice for 4 and 6 passenger golf cart rentals.
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

        <div className="mt-4">
          <GallerySection />
        </div>

        {/* Highlights */}
        <section className="px-6 md:px-10 max-w-6xl mx-auto mt-16">
          <h2 className="font-display text-3xl md:text-4xl text-brand text-balance leading-tight text-center">
            What You'll See in Our Key West Golf Carts
          </h2>
          <p className="mt-5 max-w-3xl mx-auto text-center text-brand/70 leading-relaxed">
            Every Paradise Rentals cart is built for comfort, style, and all-day island exploration.
            Here's what sets our 4 and 6 passenger electric golf carts apart on the streets of Key West.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {HIGHLIGHTS.map((h) => (
              <div key={h.title} className="rounded-2xl border border-brand/10 bg-card p-6 shadow-sm">
                <span className="text-2xl" aria-hidden="true">{h.icon}</span>
                <h3 className="mt-3 font-display text-xl text-brand">{h.title}</h3>
                <p className="mt-2 text-sm text-brand/70 leading-relaxed">{h.body}</p>
              </div>
            ))}
          </div>
        </section>

        <FinalBookingCta />
      </main>

      <Footer />
      <MobileBookingBar />
      <div className="h-24 md:hidden" aria-hidden="true" />
    </div>
  );
}
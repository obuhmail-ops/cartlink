import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileBookingBar from '@/components/MobileBookingBar';
import ExploreKeyWestSection from '@/components/ExploreKeyWestSection';
import FinalBookingCta from '@/components/FinalBookingCta';
import { MapPin } from 'lucide-react';
import { FAREHARBOR_URL } from '@/lib/booking';
import { trackEvent } from '@/lib/track';

const SPOTS = [
  { name: 'Duval Street', blurb: 'Cruise the heart of Key West — bars, shops, and street energy from end to end.' },
  { name: 'Mallory Square', blurb: 'Catch the famous sunset celebration right on the waterfront.' },
  { name: 'Southernmost Point', blurb: 'Snap a photo at the iconic marker — the southernmost spot in the continental US.' },
  { name: 'Fort Zachary Taylor Beach', blurb: 'Best sand and snorkeling on the island, inside a historic state park.' },
  { name: 'Higgs Beach', blurb: 'Relaxed sand, calm water, and a dog park — perfect for a cart stop.' },
  { name: 'Key West Lighthouse', blurb: 'Climb 88 steps for the best harbor view in Old Town.' },
  { name: 'Mile 0', blurb: 'The start (or end) of US Highway 1 — a must-see landmark.' },
  { name: 'Smathers Beach', blurb: 'The island\'s longest stretch of sand, ideal for a cart-side picnic.' },
  { name: 'Truman Little White House', blurb: 'Presidential history just a short cart ride from downtown.' },
  { name: 'Key West Harbor', blurb: 'Waterfront dining, marina views, and the best seafood on the island.' },
];

const SEO_TITLE = 'Explore Key West by Golf Cart | Top Spots & Map | Paradise Rentals';
const SEO_DESCRIPTION =
  'Discover the best way to explore Key West — by electric golf cart. Plan your route with our interactive map of Duval Street, Mallory Square, the Southernmost Point, beaches, and more. Reserve your cart today.';

export default function ExploreKeyWest() {
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

  const handleBook = () => trackEvent('check_availability_click', { location: 'explore_page' });

  return (
    <div className="min-h-screen bg-dune">
      <Navbar />

      <main className="pt-28 md:pt-36">
        {/* Hero */}
        <section className="px-6 md:px-10 max-w-6xl mx-auto text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-moss">Paradise Rentals KW</p>
          <h1 className="mt-3 font-display text-4xl md:text-6xl text-brand text-balance leading-tight">
            Explore Key West by Golf Cart
          </h1>
          <p className="mt-5 max-w-2xl mx-auto text-base md:text-lg text-brand/70 leading-relaxed">
            Your cart. Your island. Your adventure. A premium electric golf cart is the best way to see
            Key West — open air, easy parking, and the freedom to explore every corner of Old Town and
            the waterfront at your own pace.
          </p>
          <a
            href={FAREHARBOR_URL}
            target="_blank"
            rel="noreferrer"
            onClick={handleBook}
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-solar px-6 py-3 text-sm font-bold uppercase tracking-wide text-brand shadow hover:brightness-110 hover:scale-105 active:scale-95 transition-all duration-200"
          >
            Reserve Your Cart
          </a>
        </section>

        {/* Top spots */}
        <section className="px-6 md:px-10 max-w-6xl mx-auto mt-16">
          <h2 className="font-display text-3xl md:text-4xl text-brand text-balance leading-tight text-center">
            Top Spots to Explore by Cart
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SPOTS.map((spot) => (
              <div key={spot.name} className="rounded-2xl border border-brand/10 bg-card p-6 shadow-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-solar" />
                  <h3 className="font-display text-xl text-brand">{spot.name}</h3>
                </div>
                <p className="mt-3 text-sm text-brand/70 leading-relaxed">{spot.blurb}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Interactive map */}
        <div className="mt-16">
          <ExploreKeyWestSection />
        </div>

        <FinalBookingCta />
      </main>

      <Footer />
      <MobileBookingBar />
      <div className="h-24 md:hidden" aria-hidden="true" />
    </div>
  );
}
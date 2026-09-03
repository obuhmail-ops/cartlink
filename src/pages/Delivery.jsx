import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DeliverySection from '@/components/DeliverySection';
import MobileBookingBar from '@/components/MobileBookingBar';
import FinalBookingCta from '@/components/FinalBookingCta';
import { Image } from '@/components/ui/image';
import { imageUrl } from '@/lib/images';
import { FAREHARBOR_URL } from '@/lib/booking';
import { trackEvent } from '@/lib/track';

const HERO_IMAGE = imageUrl('bfc00a16b_generated_image.png');

const BENEFITS = [
  { icon: '🚪', title: 'Door-to-Door Convenience', body: 'We deliver your golf cart straight to your hotel, Airbnb, or vacation rental — no rental counter, no shuttle, no waiting.' },
  { icon: '💰', title: 'Free Throughout Key West', body: 'Delivery and pickup are always free anywhere on the island, from Old Town to the beaches.' },
  { icon: '⏱️', title: 'Start Your Vacation Instantly', body: 'Your cart is charged, ready, and waiting when you arrive — your island time begins the moment you step outside.' },
  { icon: '🔁', title: 'Hassle-Free Pickup', body: 'When your rental ends, we collect the cart from the same spot. Just park, lock, and enjoy the rest of your trip.' },
];

const STEPS = [
  { icon: '📅', title: 'Reserve Your Cart', body: 'Book a 4 or 6 passenger electric golf cart online in minutes and pick your delivery time.' },
  { icon: '📍', title: 'Share Your Address', body: 'Tell us your hotel, Airbnb, the airport, or cruise port — anywhere in Key West.' },
  { icon: '🚗', title: 'We Deliver & Charge', body: 'Your fully-charged cart arrives at your door, ready to ride the moment you get there.' },
  { icon: '🌴', title: 'Enjoy & We Pick Up', body: "Explore on your schedule. When you're done, we collect the cart — no return trip required." },
];

const SEO_TITLE = 'Golf Cart Delivery Key West | Free Door-to-Door Delivery & Pickup | Paradise Rentals KW';
const SEO_DESCRIPTION =
  'Free golf cart delivery and pickup throughout Key West — straight to your hotel, Airbnb, vacation rental, Key West Airport, or cruise port. Skip the rental counter and start your vacation instantly with a fully-charged electric cart waiting at your door.';

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

  const handleBook = () => trackEvent('check_availability_click', { location: 'delivery_page' });

  return (
    <div className="min-h-screen bg-dune">
      <Navbar />

      <main className="pt-28 md:pt-36">
        {/* Hero */}
        <section className="px-6 md:px-10 max-w-6xl mx-auto">
          <header className="text-center max-w-3xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-moss">Paradise Rentals KW</p>
            <h1 className="mt-3 font-display text-4xl md:text-6xl text-brand text-balance leading-tight">
              Free Golf Cart Delivery in Key West
            </h1>
            <p className="mt-5 text-base md:text-lg text-brand/70 leading-relaxed">
              Your vacation shouldn't start with searching for transportation to a rental counter.
              Paradise Rentals delivers your fully-charged electric golf cart directly to your door —
              and picks it up when you're done. Free delivery and pickup throughout all of Key West.
            </p>
            <a
              href={FAREHARBOR_URL}
              target="_blank"
              rel="noreferrer"
              onClick={handleBook}
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-solar px-6 py-3 text-sm font-bold uppercase tracking-wide text-brand shadow hover:brightness-110 hover:scale-105 active:scale-95 transition-all duration-200"
            >
              Check Delivery Availability
            </a>
          </header>

          <div className="mt-12 overflow-hidden rounded-2xl border border-brand/10 bg-card shadow-sm">
            <Image
              src={HERO_IMAGE}
              alt="Free golf cart delivery and pickup throughout Key West"
              fittingType="fill"
              className="aspect-[16/10] w-full object-cover"
            />
          </div>
        </section>

        {/* Benefits */}
        <section className="px-6 md:px-10 max-w-6xl mx-auto mt-16">
          <h2 className="font-display text-3xl md:text-4xl text-brand text-balance leading-tight text-center">
            Why Key West Travelers Choose Delivery
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {BENEFITS.map((b) => (
              <div key={b.title} className="rounded-2xl border border-brand/10 bg-card p-6 shadow-sm">
                <span className="text-2xl" aria-hidden="true">{b.icon}</span>
                <h3 className="mt-3 font-display text-xl text-brand">{b.title}</h3>
                <p className="mt-2 text-sm text-brand/70 leading-relaxed">{b.body}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-6">
          <DeliverySection />
        </div>

        {/* How delivery works */}
        <section className="px-6 md:px-10 max-w-6xl mx-auto mt-16">
          <h2 className="font-display text-3xl md:text-4xl text-brand text-balance leading-tight text-center">
            How Golf Cart Delivery Works
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
          <div className="mt-10 text-center">
            <a
              href={FAREHARBOR_URL}
              target="_blank"
              rel="noreferrer"
              onClick={handleBook}
              className="inline-flex items-center gap-2 rounded-lg bg-solar px-6 py-3 text-sm font-bold uppercase tracking-wide text-brand shadow hover:brightness-110 hover:scale-105 active:scale-95 transition-all duration-200"
            >
              Book Your Delivered Cart
            </a>
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
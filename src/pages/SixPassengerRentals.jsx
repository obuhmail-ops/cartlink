import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileBookingBar from '@/components/MobileBookingBar';
import DeliverySection from '@/components/DeliverySection';
import FaqSection from '@/components/FaqSection';
import FinalBookingCta from '@/components/FinalBookingCta';
import { Image } from '@/components/ui/image';
import { imageUrl } from '@/lib/images';
import { trackEvent } from '@/lib/track';

const CART_IMAGE = imageUrl('6acf6e567_generated_image.png');
const INTERIOR_IMAGE = imageUrl('8cb09ab6b_A6700436.jpg');
const GROUP_IMAGE = imageUrl('483bf8dfe_A6700446.jpg');

const FAREHARBOR_6P_URL =
  'https://fareharbor.com/embeds/book/paradiserentalskw/items/420452/calendar/?full-items=yes';

const FEATURES = [
  { icon: '👨‍👩‍👧‍👦', title: 'Seats Up to 6', body: 'Room for the whole family or a group of friends — ride together and never split up.' },
  { icon: '🔋', title: 'Long-Range Lithium Battery', body: 'Up to 60 miles per charge means more island exploring and less time charging.' },
  { icon: '🚗', title: 'Premium Electric Cart', body: 'Whisper-quiet, zero-emission electric power for a smooth Key West ride.' },
  { icon: '📱', title: 'Apple CarPlay & Android Auto', body: 'Plug in for turn-by-turn directions to every Key West hotspot and beach.' },
  { icon: '🔊', title: 'Premium Soundbar', body: 'A Bluetooth soundbar brings the beach vibes to every mile of your trip.' },
  { icon: '🌴', title: 'Free Delivery & Pickup', body: 'We bring the cart to your hotel, Airbnb, the airport or the cruise terminal.' },
];

const SEO_TITLE = '6 Passenger Golf Cart Rentals Key West | Spacious Electric Cart for Groups';
const SEO_DESCRIPTION =
  'Rent a 6 passenger golf cart in Key West and keep your whole group together. Six-seater electric carts with long-range lithium battery, Apple CarPlay, premium soundbar and free delivery to hotels, Airbnbs, the airport and cruise terminal. Reserve your 6 passenger golf cart rental today.';

export default function SixPassengerRentals() {
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

  const handleBook = () => trackEvent('check_availability_click', { location: '6_passenger_rentals_page', ride_type: '6-passenger' });

  return (
    <div className="min-h-screen bg-dune">
      <Navbar />

      <main className="pt-28 md:pt-36">
        {/* Hero */}
        <section className="px-6 md:px-10 max-w-6xl mx-auto">
          <header className="text-center max-w-3xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-moss">Paradise Rentals KW</p>
            <h1 className="mt-3 font-display text-4xl md:text-6xl text-brand text-balance leading-tight">
              6 Passenger Golf Cart Rentals in Key West
            </h1>
            <p className="mt-5 text-base md:text-lg text-brand/70 leading-relaxed">
              Renting a 6 passenger golf cart in Key West is the easiest way to keep your whole group
              together. From Old Town sunsets to Smathers Beach runs, our spacious six-seater electric
              carts deliver a long-range lithium battery, Apple CarPlay, a premium soundbar and free
              island-wide delivery — so your crew can focus on the adventure, not the logistics.
            </p>
            <a
              href={FAREHARBOR_6P_URL}
              target="_blank"
              rel="noreferrer"
              onClick={handleBook}
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-solar px-6 py-3 text-sm font-bold uppercase tracking-wide text-brand shadow hover:brightness-110 hover:scale-105 active:scale-95 transition-all duration-200"
            >
              Check 6-Seater Availability
            </a>
          </header>

          <div className="mt-12 overflow-hidden rounded-2xl border border-brand/10 bg-card shadow-sm">
            <Image
              src={CART_IMAGE}
              alt="6 passenger spacious electric golf cart rental in Key West"
              fittingType="fill"
              className="aspect-[16/10] w-full object-cover"
            />
          </div>
        </section>

        {/* Features */}
        <section className="px-6 md:px-10 max-w-6xl mx-auto mt-16">
          <h2 className="font-display text-3xl md:text-4xl text-brand text-balance leading-tight text-center">
            Built for Families & Groups
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature) => (
              <div key={feature.title} className="rounded-2xl border border-brand/10 bg-card p-6 shadow-sm">
                <span className="text-2xl" aria-hidden="true">{feature.icon}</span>
                <h3 className="mt-3 font-display text-xl text-brand">{feature.title}</h3>
                <p className="mt-2 text-sm text-brand/70 leading-relaxed">{feature.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Feature highlights imagery */}
        <section className="px-6 md:px-10 max-w-6xl mx-auto mt-16 grid gap-6 md:grid-cols-2">
          <div className="overflow-hidden rounded-2xl border border-brand/10 bg-card shadow-sm">
            <Image src={INTERIOR_IMAGE} alt="Spacious interior of the 6 passenger golf cart" fittingType="fill" className="aspect-[4/3] w-full object-cover" />
          </div>
          <div className="overflow-hidden rounded-2xl border border-brand/10 bg-card shadow-sm">
            <Image src={GROUP_IMAGE} alt="Group of Paradise Rentals golf carts parked by the beach" fittingType="fill" className="aspect-[4/3] w-full object-cover" />
          </div>
        </section>

        {/* Why 6-passenger */}
        <section className="px-6 md:px-10 max-w-6xl mx-auto mt-16">
          <div className="rounded-2xl border border-brand/10 bg-card p-8 md:p-12 shadow-sm">
            <h2 className="font-display text-3xl md:text-4xl text-brand text-balance leading-tight">
              Why Rent a 6 Passenger Cart in Key West
            </h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2 text-brand/70 leading-relaxed">
              <p>
                When you rent a 6 passenger golf cart in Key West, your whole group travels together —
                no second cart, no splitting up, no one stuck navigating alone. Six roomy seats and
                premium electric power make every ride comfortable, quiet and effortless.
              </p>
              <p>
                With up to 60 miles of range on a single charge, Apple CarPlay for easy directions and a
                Bluetooth soundbar for the soundtrack, your crew can tour the island from Mallory Square
                to Fort Zachary Taylor in style. Add free delivery and pickup, and your Key West group
                rental starts the moment you arrive.
              </p>
            </div>
            <a
              href={FAREHARBOR_6P_URL}
              target="_blank"
              rel="noreferrer"
              onClick={handleBook}
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-solar px-6 py-3 text-sm font-bold uppercase tracking-wide text-brand shadow hover:brightness-110 hover:scale-105 active:scale-95 transition-all duration-200"
            >
              Book Your 6-Seater
            </a>
          </div>
        </section>

        <DeliverySection />
        <FaqSection />
        <FinalBookingCta />
      </main>

      <Footer />
      <MobileBookingBar />
      <div className="h-24 md:hidden" aria-hidden="true" />
    </div>
  );
}
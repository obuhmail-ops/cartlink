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
  { icon: '👨‍👩‍👧‍👦', title: 'Seats Up to 6', body: 'Spacious seating for the whole family or a group of friends traveling together.' },
  { icon: '🔋', title: 'Long-Range Lithium Battery', body: 'Up to 60 miles of range on a single charge — built for a full Key West day.' },
  { icon: '🚗', title: 'Premium Electric Cart', body: 'Smooth, quiet electric ride with zero emissions and no gas fumes.' },
  { icon: '📱', title: 'Apple CarPlay & Android Auto', body: 'Maps, music and hands-free connectivity right on the dashboard.' },
  { icon: '🔊', title: 'Premium Soundbar', body: 'Bluetooth soundbar keeps the island vibes going wherever you ride.' },
  { icon: '🌴', title: 'Free Delivery & Pickup', body: 'Delivered to your hotel, Airbnb, the airport or the cruise port.' },
];

const SEO_TITLE = '6 Passenger Golf Cart Rentals Key West | Spacious Electric Cart for Groups';
const SEO_DESCRIPTION =
  'Rent a 6 passenger golf cart in Key West from Paradise Rentals. Seats up to 6 with spacious seating, long-range lithium battery, Apple CarPlay, premium soundbar, and free delivery to your hotel, Airbnb, airport or cruise port. Book your 6-seater today.';

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
              Bring the whole crew. Our spacious 6 passenger electric golf cart is perfect for families
              and groups exploring Key West together. With a long-range lithium battery, Apple CarPlay,
              a premium soundbar and free island-wide delivery, no one gets left behind.
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
              Why a 6 Passenger Cart Is the Perfect Group Ride
            </h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2 text-brand/70 leading-relaxed">
              <p>
                A 6 passenger golf cart is the perfect choice for families and groups who want to explore
                Key West together. With spacious seating for up to six, no one gets left behind — and
                everyone rides in comfort with premium electric power.
              </p>
              <p>
                The long-range lithium battery delivers up to 60 miles of island adventure on a single
                charge, while Apple CarPlay and a premium soundbar keep the whole crew entertained. Add
                free delivery and pickup, and your group's Key West adventure starts the moment you
                arrive.
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
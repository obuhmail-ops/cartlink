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

const CART_IMAGE = imageUrl('7e17732d6_generated_image.png');
const SOUND_BAR_IMAGE = imageUrl('724153794_A6700476.jpg');
const CARPLAY_IMAGE = imageUrl('3512606ee_A6700589.jpg');

const FAREHARBOR_4P_URL =
  'https://fareharbor.com/embeds/book/paradiserentalskw/items/420448/calendar/?full-items=yes';

const FEATURES = [
  { icon: '🚗', title: 'All Forward-Facing Seats', body: 'Every seat faces forward so the whole party enjoys the same comfortable view.' },
  { icon: '🔋', title: 'Long-Range Lithium Battery', body: 'Up to 60 miles of range on a single charge — enough for a full Key West day.' },
  { icon: '📱', title: 'Apple CarPlay & Android Auto', body: 'Turn-by-turn directions, music and hands-free calls on the dashboard display.' },
  { icon: '🔊', title: 'Premium Soundbar', body: 'Bluetooth soundbar keeps the island vibes going wherever you ride.' },
  { icon: '⚡', title: 'No Charging Stress', body: 'Running low on battery? We come to you and swap your cart on the spot.' },
  { icon: '🌴', title: 'Free Delivery & Pickup', body: 'We deliver and pick up at your hotel, Airbnb, the airport or cruise port.' },
];

const SEO_TITLE = '4 Passenger Golf Cart Rentals Key West | Forward-Facing Electric Cart';
const SEO_DESCRIPTION =
  'Rent a 4 passenger golf cart in Key West from Paradise Rentals. Forward-facing seats, long-range lithium battery, Apple CarPlay, premium soundbar, and free delivery to your hotel, Airbnb, airport or cruise port. Book your 4-seater today.';

export default function FourPassengerRentals() {
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

  const handleBook = () => trackEvent('check_availability_click', { location: '4_passenger_rentals_page', ride_type: '4-passenger' });

  return (
    <div className="min-h-screen bg-dune">
      <Navbar />

      <main className="pt-28 md:pt-36">
        {/* Hero */}
        <section className="px-6 md:px-10 max-w-6xl mx-auto">
          <header className="text-center max-w-3xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-moss">Paradise Rentals KW</p>
            <h1 className="mt-3 font-display text-4xl md:text-6xl text-brand text-balance leading-tight">
              4 Passenger Golf Cart Rentals in Key West
            </h1>
            <p className="mt-5 text-base md:text-lg text-brand/70 leading-relaxed">
              The forward-facing 4-seater electric golf cart built for couples and small families
              exploring Key West. With a long-range lithium battery, Apple CarPlay, a premium soundbar
              and free island-wide delivery, your ride is ready the moment you arrive.
            </p>
            <a
              href={FAREHARBOR_4P_URL}
              target="_blank"
              rel="noreferrer"
              onClick={handleBook}
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-solar px-6 py-3 text-sm font-bold uppercase tracking-wide text-brand shadow hover:brightness-110 hover:scale-105 active:scale-95 transition-all duration-200"
            >
              Check 4-Seater Availability
            </a>
          </header>

          <div className="mt-12 overflow-hidden rounded-2xl border border-brand/10 bg-card shadow-sm">
            <Image
              src={CART_IMAGE}
              alt="4 passenger forward-facing electric golf cart rental in Key West"
              fittingType="fill"
              className="aspect-[16/10] w-full object-cover"
            />
          </div>
        </section>

        {/* Features */}
        <section className="px-6 md:px-10 max-w-6xl mx-auto mt-16">
          <h2 className="font-display text-3xl md:text-4xl text-brand text-balance leading-tight text-center">
            Built for Couples & Small Families
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
            <Image src={SOUND_BAR_IMAGE} alt="Premium soundbar with blue LED accents on the 4 passenger golf cart" fittingType="fill" className="aspect-[4/3] w-full object-cover" />
          </div>
          <div className="overflow-hidden rounded-2xl border border-brand/10 bg-card shadow-sm">
            <Image src={CARPLAY_IMAGE} alt="Apple CarPlay dashboard display in the 4 passenger golf cart" fittingType="fill" className="aspect-[4/3] w-full object-cover" />
          </div>
        </section>

        {/* Why 4-passenger */}
        <section className="px-6 md:px-10 max-w-6xl mx-auto mt-16">
          <div className="rounded-2xl border border-brand/10 bg-card p-8 md:p-12 shadow-sm">
            <h2 className="font-display text-3xl md:text-4xl text-brand text-balance leading-tight">
              Why a 4 Passenger Cart Is the Perfect Key West Ride
            </h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2 text-brand/70 leading-relaxed">
              <p>
                A 4 passenger golf cart is the ideal size for couples and small families who want an
                easy, nimble ride around Old Town Key West. Because every seat faces forward, no one is
                stuck riding backward — every passenger gets the same comfortable view of the island.
              </p>
              <p>
                The compact footprint makes parking and navigating Key West's narrow streets effortless,
                while the long-range lithium battery delivers up to 60 miles of exploration on a single
                charge. Add free delivery and pickup, and your Key West adventure starts the moment you
                step outside your door.
              </p>
            </div>
            <a
              href={FAREHARBOR_4P_URL}
              target="_blank"
              rel="noreferrer"
              onClick={handleBook}
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-solar px-6 py-3 text-sm font-bold uppercase tracking-wide text-brand shadow hover:brightness-110 hover:scale-105 active:scale-95 transition-all duration-200"
            >
              Book Your 4-Seater
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
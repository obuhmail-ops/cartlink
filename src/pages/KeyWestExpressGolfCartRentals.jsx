import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileBookingBar from '@/components/MobileBookingBar';
import HowItWorksSection from '@/components/HowItWorksSection';
import FaqSection from '@/components/FaqSection';
import FinalBookingCta from '@/components/FinalBookingCta';
import { Image } from '@/components/ui/image';
import { imageUrl } from '@/lib/images';
import { FAREHARBOR_URL } from '@/lib/booking';
import { trackEvent } from '@/lib/track';

const HERO_IMAGE = imageUrl('6b280111a_generated_image.png');
const CART_IMAGE = imageUrl('5dde5f4ee_Untitleddesign.png');

const STEPS = [
  { icon: '⛴️', title: 'Book Your Ferry Ride', body: 'Reserve your Key West Express ferry crossing from Fort Myers or Marco Island.' },
  { icon: '🚗', title: 'Reserve Your Cart', body: 'Book a 4 or 6 passenger golf cart online for 24 hours or more and unlock 4 extra hours.' },
  { icon: '🌴', title: 'We Deliver', body: 'Your cart is delivered to your hotel or Airbnb — ready when you step off the ferry.' },
  { icon: '🔁', title: 'We Pick It Up', body: 'When your rental ends, we handle pickup so you head home stress-free.' },
];

const SEO_TITLE = 'Key West Express Golf Cart Rentals | Ferry Passenger Cart | Paradise Rentals';
const SEO_DESCRIPTION =
  'Arriving by Key West Express ferry? Reserve a premium electric golf cart and get 4 complimentary extra hours on qualifying 24+ hour rentals. Free delivery and pickup for 4 and 6 passenger carts with Apple CarPlay and long-range batteries.';

export default function KeyWestExpressGolfCartRentals() {
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

  const handleBook = () => trackEvent('check_availability_click', { location: 'key_west_express_rentals_page', option: 'key-west-express' });

  return (
    <div className="min-h-screen bg-dune">
      <Navbar />

      <main className="pt-28 md:pt-36">
        {/* Hero */}
        <section className="px-6 md:px-10 max-w-6xl mx-auto">
          <header className="text-center max-w-3xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-moss">Paradise Rentals KW</p>
            <h1 className="mt-3 font-display text-4xl md:text-6xl text-brand text-balance leading-tight">
              Key West Express Golf Cart Rentals
            </h1>
            <p className="mt-5 text-base md:text-lg text-brand/70 leading-relaxed">
              Make the most of every island hour. Arriving by the Key West Express ferry? Reserve a
              premium electric golf cart for 24 hours or longer and receive 4 complimentary extra
              hours — with free delivery and pickup anywhere in Key West.
            </p>
            <a
              href={FAREHARBOR_URL}
              target="_blank"
              rel="noreferrer"
              onClick={handleBook}
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-solar px-6 py-3 text-sm font-bold uppercase tracking-wide text-brand shadow hover:brightness-110 hover:scale-105 active:scale-95 transition-all duration-200"
            >
              Check Key West Express Availability
            </a>
          </header>

          <div className="mt-12 overflow-hidden rounded-2xl border border-brand/10 bg-card shadow-sm">
            <Image
              src={HERO_IMAGE}
              alt="Electric golf cart rental for Key West Express ferry passengers"
              fittingType="fill"
              className="aspect-[16/10] w-full object-cover"
            />
          </div>
        </section>

        {/* How it works */}
        <section className="px-6 md:px-10 max-w-6xl mx-auto mt-16">
          <h2 className="font-display text-3xl md:text-4xl text-brand text-balance leading-tight text-center">
            How Key West Express Rentals Work
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
        </section>

        {/* Why Key West Express */}
        <section className="px-6 md:px-10 max-w-6xl mx-auto mt-16">
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div className="overflow-hidden rounded-2xl border border-brand/10 bg-card shadow-sm">
              <Image src={CART_IMAGE} alt="Premium electric golf cart ready for Key West Express ferry passengers" fittingType="fill" className="aspect-[4/3] w-full object-cover" />
            </div>
            <div>
              <h2 className="font-display text-3xl md:text-4xl text-brand text-balance leading-tight">
                Make the Most of Every Island Hour
              </h2>
              <p className="mt-5 text-brand/70 leading-relaxed">
                The Key West Express ferry gets you to the island fast — so make every hour count. When
                you reserve a golf cart for 24 hours or longer, you'll receive 4 complimentary extra
                hours to explore even more of Key West at your own pace.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-brand/70">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-moss" aria-hidden="true">✓</span>
                  <span>4 complimentary extra hours on qualifying 24+ hour rentals</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-moss" aria-hidden="true">✓</span>
                  <span>Choose 4 or 6 passenger electric carts</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-moss" aria-hidden="true">✓</span>
                  <span>Free delivery and pickup anywhere in Key West</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-moss" aria-hidden="true">✓</span>
                  <span>Apple CarPlay, Android Auto & premium soundbar</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-moss" aria-hidden="true">✓</span>
                  <span>No charging stress — we swap your cart if needed</span>
                </li>
              </ul>
              <a
                href={FAREHARBOR_URL}
                target="_blank"
                rel="noreferrer"
                onClick={handleBook}
                className="mt-8 inline-flex items-center gap-2 rounded-lg bg-solar px-6 py-3 text-sm font-bold uppercase tracking-wide text-brand shadow hover:brightness-110 hover:scale-105 active:scale-95 transition-all duration-200"
              >
                Book Your Key West Express Cart
              </a>
            </div>
          </div>
        </section>

        <HowItWorksSection />
        <FaqSection />
        <FinalBookingCta />
      </main>

      <Footer />
      <MobileBookingBar />
      <div className="h-24 md:hidden" aria-hidden="true" />
    </div>
  );
}
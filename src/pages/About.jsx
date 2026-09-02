import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileBookingBar from '@/components/MobileBookingBar';
import SocialProofSection from '@/components/SocialProofSection';
import FinalBookingCta from '@/components/FinalBookingCta';
import { Image } from '@/components/ui/image';
import { imageUrl } from '@/lib/images';
import { BatteryCharging, MapPinned, Leaf, HeartHandshake, Sparkles, Truck } from 'lucide-react';

const HERO_IMAGE = imageUrl('bfc00a16b_generated_image.png');
const TEAM_IMAGE = imageUrl('6acf6e567_generated_image.png');

const VALUES = [
  { icon: Leaf, title: 'All-Electric Fleet', body: 'Quiet, clean, and emissions-free — our lithium-powered carts keep Key West beautiful.' },
  { icon: Truck, title: 'Free Delivery & Pickup', body: 'We bring the cart to your hotel, Airbnb, the airport, or the cruise port — and pick it up when you\'re done.' },
  { icon: BatteryCharging, title: 'No Charging Stress', body: 'Run low on battery? We swap your cart so your day never stops.' },
  { icon: Sparkles, title: 'Premium Features', body: 'Apple CarPlay, Android Auto, premium soundbars, and forward-facing seats on every cart.' },
  { icon: MapPinned, title: 'Local Expertise', body: 'Born and raised in Key West — we know the island and the best routes to explore it.' },
  { icon: HeartHandshake, title: '5-Star Service', body: 'A 4.9 Google rating from 272+ reviews — our customers are our reputation.' },
];

const SEO_TITLE = 'About Paradise Rentals Key West | Premium Electric Golf Cart Rentals';
const SEO_DESCRIPTION =
  'Paradise Rentals Key West is the island\'s trusted source for premium 4- and 6-passenger electric golf cart rentals. Free delivery, long-range batteries, and 5-star service. Learn our story.';

const LOCAL_BUSINESS_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Paradise Rentals Key West',
  description:
    'Premium 4- and 6-passenger electric golf cart rentals in Key West with free delivery and pickup.',
  areaServed: 'Key West, Florida',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Key West',
    addressRegion: 'FL',
    addressCountry: 'US',
  },
  telephone: '+1-305-337-1815',
  priceRange: '$$',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '272',
  },
  sameAs: [
    'https://www.instagram.com/paradiserentalskw/',
    'https://www.facebook.com/search/top?q=Paradise%20Rentals%20Key%20West',
  ],
};

export default function About() {
  useEffect(() => {
    const previousTitle = document.title;
    const descMeta = document.querySelector('meta[name="description"]');
    const previousDescription = descMeta?.getAttribute('content');

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(LOCAL_BUSINESS_JSONLD);
    script.dataset.aboutJsonld = 'true';
    document.head.appendChild(script);

    document.title = SEO_TITLE;
    if (descMeta) descMeta.setAttribute('content', SEO_DESCRIPTION);

    return () => {
      document.title = previousTitle;
      if (descMeta && previousDescription) descMeta.setAttribute('content', previousDescription);
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-dune">
      <Navbar />

      <main className="pt-28 md:pt-36">
        {/* Hero */}
        <section className="px-6 md:px-10 max-w-6xl mx-auto">
          <header className="text-center max-w-3xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-moss">About Us</p>
            <h1 className="mt-3 font-display text-4xl md:text-6xl text-brand text-balance leading-tight">
              Your Cart. Your Island. Your Adventure.
            </h1>
            <p className="mt-5 text-base md:text-lg text-brand/70 leading-relaxed">
              Paradise Rentals Key West is the island's trusted source for premium electric golf cart
              rentals. We believe your vacation should start the moment you arrive — not at a rental-car
              counter — so we deliver a clean, fully charged cart right to you.
            </p>
          </header>

          <div className="mt-12 overflow-hidden rounded-2xl border border-brand/10 bg-card shadow-sm">
            <Image
              src={HERO_IMAGE}
              alt="Paradise Rentals premium electric golf cart in Key West"
              fittingType="fill"
              className="aspect-[16/9] w-full object-cover"
            />
          </div>
        </section>

        {/* Story */}
        <section className="px-6 md:px-10 max-w-6xl mx-auto mt-16">
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div className="overflow-hidden rounded-2xl border border-brand/10 bg-card shadow-sm">
              <Image
                src={TEAM_IMAGE}
                alt="Paradise Rentals 6-passenger electric golf cart"
                fittingType="fill"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <div>
              <h2 className="font-display text-3xl md:text-4xl text-brand text-balance leading-tight">
                Our Story
              </h2>
              <p className="mt-5 text-brand/70 leading-relaxed">
                Paradise Rentals was founded with one simple goal: to give visitors the best possible way
                to experience Key West. Taxis and rental cars are slow, expensive, and hard to park —
                but a premium electric golf cart lets you feel the island breeze and pull up to any
                landmark, beach, or bar with ease.
              </p>
              <p className="mt-4 text-brand/70 leading-relaxed">
                We started with a small fleet and a commitment to service. Today, with hundreds of
                five-star reviews and a reputation as one of Key West's favorite ways to ride, we're
                proud to help thousands of visitors explore the island the paradise way.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="px-6 md:px-10 max-w-6xl mx-auto mt-16">
          <h2 className="font-display text-3xl md:text-4xl text-brand text-balance leading-tight text-center">
            What Sets Us Apart
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {VALUES.map((value) => (
              <div key={value.title} className="rounded-2xl border border-brand/10 bg-card p-6 shadow-sm">
                <value.icon className="h-7 w-7 text-solar" />
                <h3 className="mt-4 font-display text-xl text-brand">{value.title}</h3>
                <p className="mt-2 text-sm text-brand/70 leading-relaxed">{value.body}</p>
              </div>
            ))}
          </div>
        </section>

        <SocialProofSection />
        <FinalBookingCta />
      </main>

      <Footer />
      <MobileBookingBar />
      <div className="h-24 md:hidden" aria-hidden="true" />
    </div>
  );
}
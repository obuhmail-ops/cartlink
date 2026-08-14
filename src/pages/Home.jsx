import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartCard from '@/components/CartCard';
import DeliverySection from '@/components/DeliverySection';
import SocialProofSection from '@/components/SocialProofSection';
import GallerySection from '@/components/GallerySection';
import ArrivalOptionsSection from '@/components/ArrivalOptionsSection';
import NoChargingStressSection from '@/components/NoChargingStressSection';
import WhyParadiseSection from '@/components/WhyParadiseSection';
import ExploreKeyWestSection from '@/components/ExploreKeyWestSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import FaqSection from '@/components/FaqSection';
import FinalBookingCta from '@/components/FinalBookingCta';
import { Image } from '@/components/ui/image';

const HERO_URL = 'https://media.base44.com/images/public/6a7e5db2c2620868d1046179/da0bc7925_generated_image.png';

function HeroField({ icon, label, children }) {
  return (
    <label className="flex flex-col gap-1 text-left">
      <span className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-white/70">
        {icon} {label}
      </span>
      {children}
    </label>);

}

export default function Home() {
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.Cart.list('-created_date', 50).
    then(setCarts).
    finally(() => setLoading(false));
  }, []);

  const goToFleet = () => document.getElementById('fleet')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="min-h-screen bg-dune">
      <Navbar />

      {/* Hero */}
      <section className="relative h-screen min-h-[900px] md:min-h-[760px] w-full overflow-hidden">
        <Image src={HERO_URL} alt="Key West golf cart rental fleet by the coast" fittingType="fill" className="absolute inset-0 w-full h-full" />
        <div className="absolute inset-0 bg-gradient-to-b from-brand/50 via-brand/25 to-brand/65" />
        <div className="relative z-10 h-full flex flex-col justify-center pb-40 px-6 md:px-10 max-w-6xl mx-auto opacity-100">
          <p className="text-solar font-semibold tracking-[0.25em] uppercase text-center text-[42px] md:text-[42px] no-underline mt-64">
            Key West Golf Cart Rentals
          </p>
          <h1 className="leading-[1.04] max-w-4xl text-center capitalize [font-family:'Poppins',_sans-serif] font-bold text-4xl md:text-4xl lg:text-4xl text-[hsl(var(--background))]">
            Explore Key West the paradise way
          </h1>
          <p className="text-white/90 max-w-xl leading-relaxed text-2xl md:text-2xl font-semibold [font-family:'Lexend',_sans-serif] text-center no-underline not-italic capitalize px-1 mx-2 my-5">
            Premium 4-passenger <span className="text-solar">(forward-facing)</span> and<br />6-passenger electric golf carts, delivered right to you.
          </p>
          <ul className="mt-6 grid grid-cols-1 gap-y-2 text-sm md:text-base text-white max-w-md">
            {[
            'FREE Hotel Delivery',
            'FREE Airbnb & Vacation Rental Delivery',
            'Airport Delivery Available',
            'Cruise Port Service',
            'Long-Range Electric Carts',
            'Easy Online Booking'].
            map((benefit, i) =>
            <li key={benefit} style={{ animation: `hero-benefit-rise 0.7s ease-out ${0.15 + i * 0.12}s both` }} className="flex items-center gap-2 [font-family:'Sora',_sans-serif] font-semibold text-xl my-1">
                <span className="text-solar font-bold" aria-hidden="true">✓</span>
                {benefit}
              </li>
            )}
          </ul>
        </div>

        {/* Hero action buttons */}
        <div className="absolute bottom-8 right-6 md:right-10 z-20 flex flex-col sm:flex-row gap-3">
          

          
          

          
        </div>

        {/* Floating glass island search */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[92%] max-w-3xl z-20">
          





















          
        </div>
      </section>

      {/* Fleet */}
      <section id="fleet" className="py-24 md:py-32">
        <div className="px-6 md:px-10 max-w-6xl mx-auto">
          <p className="text-moss text-sm font-semibold uppercase tracking-widest mb-3">Section 3 — Choose Your Ride</p>
          <h2 className="font-display text-3xl md:text-5xl text-brand text-balance leading-tight">
            Find the Perfect Golf Cart
          </h2>

          {loading ?
          <div className="mt-12 grid gap-8 md:grid-cols-2">
              {[0, 1].map((i) =>
            <div key={i} className="overflow-hidden rounded-2xl border border-brand/10 bg-card">
                  <div className="aspect-[4/3] animate-pulse bg-brand/5" />
                  <div className="p-8"><div className="h-7 w-1/2 animate-pulse rounded bg-brand/5" /></div>
                </div>
            )}
            </div> :
          carts.length === 0 ?
          <p className="mt-12 text-brand/50">No carts available right now. Check back soon.</p> :

          <div className="mt-12 grid gap-8 md:grid-cols-2">
              {carts.map((cart) => <CartCard key={cart.id} cart={cart} />)}
            </div>
          }
        </div>
      </section>

      <DeliverySection />

      <GallerySection />

      <SocialProofSection />

      <ArrivalOptionsSection />

      <NoChargingStressSection />

      <WhyParadiseSection />

      <ExploreKeyWestSection />

      <HowItWorksSection />

      <FaqSection />

      <FinalBookingCta />

      <Footer />
    </div>);

}
import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartCard from '@/components/CartCard';
import DeliverySection from '@/components/DeliverySection';
import SocialProofSection from '@/components/SocialProofSection';
import GallerySection from '@/components/GallerySection';
import GolfCartFeaturesSection from '@/components/GolfCartFeaturesSection';
import ArrivalOptionsSection from '@/components/ArrivalOptionsSection';
import NoChargingStressSection from '@/components/NoChargingStressSection';

import ExploreKeyWestSection from '@/components/ExploreKeyWestSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import FaqSection from '@/components/FaqSection';
import FinalBookingCta from '@/components/FinalBookingCta';
import MobileBookingBar from '@/components/MobileBookingBar';
import { Image } from '@/components/ui/image';

const HERO_IMAGE_URL = 'https://media.base44.com/images/public/6a7e5db2c2620868d1046179/bfc00a16b_generated_image.png';
const HERO_MOBILE_IMAGE_URL = 'https://media.base44.com/images/public/6a7e5db2c2620868d1046179/628f37336_generated_image.png';
const HERO_MOBILE_IMAGE_2_URL = 'https://media.base44.com/images/public/6a7e5db2c2620868d1046179/fd255c606_A6700476.jpg';
const HERO_MOBILE_IMAGE_3_URL = 'https://media.base44.com/images/public/6a7e5db2c2620868d1046179/457bf5afe_A6700589.jpg';
const HERO_DESKTOP_THUMB_1_URL = 'https://media.base44.com/images/public/6a7e5db2c2620868d1046179/724153794_A6700476.jpg';
const HERO_DESKTOP_THUMB_2_URL = 'https://media.base44.com/images/public/6a7e5db2c2620868d1046179/3512606ee_A6700589.jpg';
const BEST_OF_FLORIDA_BADGE_URL = 'https://media.base44.com/images/public/6a7e5db2c2620868d1046179/353f029f7_bestofflorida.webp';

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

  const heroCartImage = carts[0]?.image_url;

  return (
    <div className="min-h-screen bg-dune">
      <Navbar />

      {/* Hero */}
      <section className="relative w-full min-h-[90vh] flex flex-col justify-between p-6 bg-brand overflow-hidden">
        {/* Background Image & Soft Gradient */}
        <img
          src={heroCartImage || HERO_IMAGE_URL}
          alt={carts[0]?.name ? `${carts[0].name} in Key West` : 'Paradise Golf Cart Rental in Key West'}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/70" />

        {/* Top Header & Copy */}
        <div className="relative z-10 pt-8 text-center max-w-xs mx-auto">
          <span className="inline-block px-3 py-1 mb-3 text-[11px] font-bold tracking-wider uppercase text-solar bg-brand/90 border border-solar/30 rounded-full shadow-sm backdrop-blur-sm">
            FREE AIRPORT & CRUISE PORT DELIVERY
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white uppercase tracking-tight leading-none drop-shadow-md">
            Your Cart. Your Island. <br />
            <span className="text-solar">Your Adventure.</span>
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-dune/95 leading-relaxed font-medium drop-shadow">
            Premium 4 & 6-passenger electric golf carts delivered straight to your airport terminal, cruise dock, or resort.
          </p>
        </div>

        {/* Bottom Call to Action */}
        <div className="relative z-10 pb-6 w-full max-w-xs mx-auto text-center">
          <button
            onClick={goToFleet}
            className="block w-full py-4 px-6 bg-solar text-brand font-black text-lg tracking-wider rounded-xl shadow-lg active:scale-95 transition"
          >
            RENT YOUR CART NOW
          </button>
          <span className="block mt-2 text-xs text-white/80 font-medium tracking-wide">
            INSTANT BOOKING & FREE DELIVERY
          </span>
        </div>

        {/* Best of Florida badge */}
        <img src={BEST_OF_FLORIDA_BADGE_URL} alt="Best of Florida Awards badge" className="absolute top-4 right-4 z-30 w-16 md:w-20 lg:w-24 drop-shadow-lg" />
      </section>

      <SocialProofSection />

      {/* Fleet */}
      <section id="fleet" className="py-24 md:py-32">
        <div className="px-6 md:px-10 max-w-6xl mx-auto">
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

      <NoChargingStressSection />

      <DeliverySection />

      <ArrivalOptionsSection />

      <GolfCartFeaturesSection />

      <GallerySection />

      <ExploreKeyWestSection />

      <HowItWorksSection />

      <FaqSection />

      <FinalBookingCta />

      <Footer />

      <MobileBookingBar />
      <div className="h-24 md:hidden" aria-hidden="true" />

    </div>);

}
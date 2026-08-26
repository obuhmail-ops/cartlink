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
      <section
        className="relative w-full h-[85vh] min-h-[520px] md:min-h-[640px] flex items-end justify-center bg-cover bg-center px-4 pb-12 md:pb-16 overflow-hidden"
        style={{ backgroundImage: `url(${heroCartImage || HERO_IMAGE_URL})` }}
      >
        {/* Dark Gradient Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />

        {/* Content Container */}
        <div className="relative z-10 w-full max-w-md text-center text-white">
          {/* Mini Badge */}
          <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold uppercase tracking-wider bg-white/20 backdrop-blur-md rounded-full text-white/90 border border-white/30">
            🏝️ Key West, FL
          </span>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight mb-2 drop-shadow-md">
            Your Cart. Your Island. Your Adventure.
          </h1>

          {/* Sub-headline */}
          <p className="text-sm sm:text-base text-white/85 mb-6 drop-shadow">
            Street-legal, fully charged, and delivered right to your door or cruise port.
          </p>

          {/* Call to Action Buttons */}
          <div className="flex flex-col gap-3 w-full">
            <button
              onClick={goToFleet}
              className="w-full py-4 px-6 bg-solar hover:brightness-110 text-brand font-bold text-base rounded-xl shadow-lg transition-all text-center active:scale-95"
            >
              Check Availability &amp; Book
            </button>

            <div className="flex items-center justify-center gap-2 text-xs text-white/70 mt-2 font-medium">
              <span>⚡ Free Delivery</span>
              <span>•</span>
              <span>🌟 5-Star Rated</span>
            </div>
          </div>
        </div>
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
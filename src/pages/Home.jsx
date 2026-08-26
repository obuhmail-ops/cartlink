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
      <section className="relative w-full bg-brand flex flex-col justify-start md:block md:h-screen md:min-h-[760px] overflow-hidden">

        {/* 1. TEXT CONTAINER */}
        {/* Mobile: Normal flex item (pt-16 pb-8) | Desktop: Absolute z-20 overlay */}
        <div className="relative z-20 w-full max-w-6xl mx-auto px-6 pt-16 pb-8 md:absolute md:inset-0 md:px-10 md:pt-28 md:pb-40 md:flex md:flex-col md:justify-center">
          <div className="flex flex-col items-center text-center md:items-start md:text-left max-w-xl mx-auto md:mx-0">

            {/* Badge */}
            <div className="self-center md:self-start">
              <div className="md:rounded-full md:px-10 md:py-3 md:bg-brand/40 md:backdrop-blur-sm md:border md:border-solar/50 md:shadow-[0_0_30px_hsl(43_100%_50%/0.6),inset_0_0_20px_hsl(43_100%_50%/0.3)]">
                <p className="text-solar font-semibold tracking-[0.25em] uppercase text-center md:text-left text-[26px] md:text-[42px] no-underline drop-shadow-[0_0_12px_hsl(43_100%_50%/0.8)]">
                  <span className="block md:inline">Key West</span>
                  <span className="hidden md:inline" aria-hidden="true">&nbsp;</span>
                  <span className="block md:inline text-[20px] md:text-[42px] text-center">Golf Cart Rentals</span>
                </p>
              </div>
            </div>

            

            

            <p className="self-center md:self-start max-w-2xl leading-relaxed text-center md:text-left no-underline not-italic capitalize px-1 my-5 text-[hsl(var(--dune))] text-xl md:text-xl [font-family:'Sora',_sans-serif] font-bold">
              <span className="block md:inline [font-family:'Kalam',_system-ui]">Your Cart. Your Island.</span>
              <span className="block md:inline text-[hsl(var(--sidebar-border))] [font-family:'Kalam',_system-ui] font-bold">Your Adventure.</span>
            </p>

            <p className="self-center md:self-start max-w-2xl leading-relaxed text-center md:text-left px-1 mt-1 text-[hsl(var(--solar))] text-lg md:text-xl [font-family:'Sora',_sans-serif] font-bold">
              Premium 4 &amp; 6 Passenger Electric Golf Carts
            </p>

            <ul className="mt-6 grid grid-cols-1 gap-y-2 text-sm md:text-base text-white max-w-md">
              {[
              'Free Delivery & Pickup',
              'Forward-Facing 4-Seaters',
              'Airport & Cruise Port Service',
              'Long-Range Lithium Battery up to 60 Miles',
              'No Place to Charge? We Swap Your Cart'].
              map((benefit, i) =>
              <li key={benefit} style={{ animation: `hero-benefit-rise 0.7s ease-out ${0.15 + i * 0.12}s both` }} className="flex items-center gap-2 [font-family:'Sora',_sans-serif] font-semibold my-1 text-base">
                <span className="text-solar font-bold" aria-hidden="true">✓</span>
                {benefit}
              </li>
              )}
            </ul>

            <div className="mt-4 flex gap-2 w-full max-w-md md:hidden">
              <button onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })} className="w-1/2 rounded-2xl overflow-hidden shadow-lg hover:scale-105 active:scale-95 transition-all duration-200">
                
              </button>
              <button onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })} className="w-1/2 rounded-2xl overflow-hidden shadow-lg hover:scale-105 active:scale-95 transition-all duration-200">
                
              </button>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row gap-4 w-full justify-center md:justify-start">
              

              
            </div>

          </div>
        </div>

        {/* 2. GRADIENT OVERLAY (Desktop Only) */}
        {/* Hidden on mobile because text doesn't overlap the image */}
        <div className="hidden md:block absolute inset-0 z-10 bg-gradient-to-r from-brand/90 via-brand/40 to-transparent pointer-events-none" />

        {/* 3. HERO IMAGE CONTAINER */}
        {/* Mobile: Relative height aspect-ratio container sitting below text | Desktop: Absolute full fill */}
        <div className="relative w-full aspect-[4/3] md:absolute md:inset-0 md:h-full z-0">
          <picture className="w-full h-full">
            <source media="(max-width: 767px)" srcSet={heroCartImage || HERO_MOBILE_IMAGE_URL} />
            <img src={heroCartImage || HERO_IMAGE_URL} alt={carts[0]?.name ? `${carts[0].name} in Key West` : 'Paradise Golf Cart Rental in Key West'} className="w-full h-full object-cover object-center md:object-right rounded-none opacity-100" />
          </picture>

          {/* Optional Mobile Subtle Top Fade to smooth out hard image edges */}
          <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-brand to-transparent md:hidden" />
        </div>

        {/* Desktop thumbnails */}
        <div className="absolute bottom-8 left-6 lg:left-10 z-20 hidden md:flex gap-3">
          <img src={HERO_DESKTOP_THUMB_1_URL} alt="DENAGO golf cart soundbar with blue LED accents" className="w-40 lg:w-52 rounded-xl object-cover shadow-lg ring-1 ring-white/30" />
          <img src={HERO_DESKTOP_THUMB_2_URL} alt="Apple CarPlay dashboard display in the golf cart" className="w-40 lg:w-52 rounded-xl object-cover shadow-lg ring-1 ring-white/30" />
        </div>

        {/* Best of Florida badge */}
        <img src={BEST_OF_FLORIDA_BADGE_URL} alt="Best of Florida Awards badge" className="absolute bottom-4 right-4 z-30 w-20 md:w-24 lg:w-28 drop-shadow-lg" />

      </section>

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

      <SocialProofSection />

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
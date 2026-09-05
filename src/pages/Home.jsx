import React from 'react';
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
import { imageUrl } from '@/lib/images';

// Static site — fleet data hardcoded, no DB calls
const HERO_IMAGE_URL = imageUrl('bfc00a16b_generated_image.png');
const HERO_MOBILE_IMAGE_URL = imageUrl('628f37336_generated_image.png');
const HERO_MOBILE_PHOTO_URL = imageUrl('13db7f113_Gemini_Generated_Image_fx9qh6fx9qh6fx9q.jpeg');
const FLOATING_CART_URL = imageUrl('5dde5f4ee_Untitleddesign.png');
const HERO_MOBILE_IMAGE_2_URL = imageUrl('fd255c606_A6700476.jpg');
const HERO_MOBILE_IMAGE_3_URL = imageUrl('457bf5afe_A6700589.jpg');
const HERO_DESKTOP_THUMB_1_URL = imageUrl('724153794_A6700476.jpg');
const HERO_DESKTOP_THUMB_2_URL = imageUrl('3512606ee_A6700589.jpg');
const BEST_OF_FLORIDA_BADGE_URL = imageUrl('353f029f7_bestofflorida.webp');
const GOOGLE_REVIEWS_BADGE_URL = imageUrl('1598156a8_Google-Reviews-1024x493.jpg');

function HeroField({ icon, label, children }) {
  return (
    <label className="flex flex-col gap-1 text-left">
      <span className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-white/70">
        {icon} {label}
      </span>
      {children}
    </label>);

}

const STATIC_CARTS = [
{ id: 'static-4p', name: 'Coastal Cruiser', seats: 4, image_url: imageUrl('7e17732d6_generated_image.png') },
{ id: 'static-6p', name: 'Family Voyager', seats: 6, image_url: imageUrl('6acf6e567_generated_image.png') }];


export default function Home() {
  const carts = STATIC_CARTS;

  return (
    <div className="min-h-screen bg-dune">
      <Navbar />

      {/* Hero */}
      <section className="relative w-full bg-brand flex flex-col justify-start min-h-[640px] md:block md:h-screen md:min-h-[760px] overflow-hidden">

        {/* 1. TEXT CONTAINER */}
        {/* Mobile: Normal flex item (pt-16 pb-8) | Desktop: Absolute z-20 overlay */}
        <div className="relative z-20 w-full max-w-6xl mx-auto px-6 pt-16 pb-8 md:absolute md:inset-0 md:px-10 md:pt-28 md:pb-40 md:flex md:flex-col md:justify-center opacity-100">
          <div className="flex flex-col items-center text-center md:items-start md:text-left max-w-xl mx-auto md:mx-0">

            {/* Badge */}
            <div className="self-center md:self-start mt-6">
              <div>
                <p className="text-solar font-semibold tracking-[0.25em] uppercase text-center md:text-left text-[26px] md:text-[42px] no-underline">
                  <span className="block md:inline">Key West</span>
                  <span className="hidden md:inline" aria-hidden="true">&nbsp;</span>
                  <span className="block md:inline text-[20px] md:text-[42px] text-center">Golf Cart Rentals</span>
                </p>
              </div>
            </div>

            <h1 className="self-center md:self-start max-w-2xl leading-relaxed text-center md:text-left no-underline not-italic capitalize px-1 my-5 text-[hsl(var(--dune))] text-xl md:text-xl [font-family:'Sora',_sans-serif] font-bold">
              <span className="block md:inline [font-family:'Helvetica_Bold',_sans-serif] font-bold text-3xl">Your Cart. Your Island.</span>
              <span className="block md:inline font-bold [font-family:'Helvetica_Bold',_sans-serif] text-4xl text-white">Your Adventure.</span>
            </h1>

            <p className="self-center md:self-start max-w-2xl leading-relaxed text-center md:text-left px-1 mt-1 text-[hsl(var(--solar))] text-lg md:text-xl [font-family:'Sora',_sans-serif] font-bold">
              Premium 4 &amp; 6 Passenger Electric Golf Carts
            </p>

            <ul className="mt-6 grid grid-cols-1 gap-y-2 text-sm md:text-base text-white max-w-md">
              {[
              'Free Delivery & Pickup',
              'Forward-Facing 4-Seaters',
              'Airport & Cruise Port FREE DELIVERY',
              'Long-Range Lithium Battery up to 60 Miles',
              'No Place to Charge? We Swap Your Cart'].
              map((benefit, i) =>
              <li key={benefit} style={{ animation: `hero-benefit-rise 0.7s ease-out ${0.15 + i * 0.12}s both` }} className="flex items-start gap-2 [font-family:'Sora',_sans-serif] font-semibold my-1 text-base leading-snug">
                <span className="text-solar font-bold leading-snug" aria-hidden="true">✓</span>
                <span>{benefit.split(/(free delivery)/i).map((part, j) => /free delivery/i.test(part) ? <span key={j} className="text-solar">{part}</span> : part)}</span>
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

        {/* Desktop / tablet hero photo — same image as mobile */}
        <img
          src={HERO_MOBILE_PHOTO_URL}
          alt="Southernmost Point Buoy in Key West"
          className="hidden md:block absolute inset-0 z-0 w-full h-full object-cover object-center"
          loading="eager"
          fetchpriority="high"
          decoding="async" />
        

        {/* 2. GRADIENT OVERLAY (Desktop Only) */}
        {/* Darkens the left side so the hero text stays readable over the photo */}
        <div className="hidden md:block absolute inset-0 z-10 bg-gradient-to-r from-brand/90 via-brand/40 to-transparent pointer-events-none" />

        {/* Mobile hero photo (dimmed) with extended sky */}
        <div className="md:hidden absolute inset-0 z-0 flex flex-col">
          <div className="h-40 bg-gradient-to-b from-[#3A96E0] via-[#85C2F1] to-transparent" />
          <img src={HERO_MOBILE_PHOTO_URL} alt="Southernmost Point Buoy in Key West" className="flex-1 w-full object-cover object-center" loading="eager" fetchpriority="high" decoding="async" />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Desktop thumbnails */}
        <div className="absolute bottom-44 left-6 lg:left-10 z-20 hidden md:flex gap-3">
          
          
        </div>

        {/* Best of Florida badge */}
        <img src={BEST_OF_FLORIDA_BADGE_URL} alt="Best of Florida Awards badge" className="absolute bottom-4 right-4 z-30 w-20 md:w-24 lg:w-28 drop-shadow-lg" loading="lazy" decoding="async" />

        {/* Google Reviews badge */}
        <img src={GOOGLE_REVIEWS_BADGE_URL} alt="Google Reviews 5.0 star rating" className="absolute bottom-4 left-4 z-30 w-28 md:w-40 lg:w-48 drop-shadow-lg rounded-lg" loading="lazy" decoding="async" />

      </section>

      {/* Floating 3D cart straddling the hero/fleet boundary */}
      <div className="pointer-events-none relative z-30 -mt-40 md:-mt-56 flex justify-center md:justify-end md:pr-16">
        <img
          src={FLOATING_CART_URL}
          alt="Paradise Rentals premium 4-passenger golf cart"
          className="w-[44rem] md:w-[57rem] lg:w-[78rem] drop-shadow-2xl"
          style={{ mixBlendMode: 'screen' }}
          loading="eager"
          fetchpriority="high"
          decoding="async" />
        
      </div>

          <section id="fleet" className="-mt-32 pb-10 md:-mt-24 md:pb-12">
        <div className="px-6 md:px-10 max-w-6xl mx-auto">
          <h2 className="font-display text-3xl md:text-5xl text-brand text-balance leading-tight hidden">
            Find the Perfect Golf Cart
          </h2>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {carts.map((cart) => <CartCard key={cart.id} cart={cart} />)}
          </div>
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
import React from 'react';
import { Image } from '@/components/ui/image';

const BATTERY_IMAGE_URL = 'https://media.base44.com/images/public/6a7e5db2c2620868d1046179/34ef9af56_Gemini_Generated_Image_gprglbgprglbgprg.jpeg';

export default function NoChargingStressSection() {
  return (
    <section id="no-charging-stress" className="bg-card px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2 md:gap-16">
        






        
        <div className="order-1 md:order-2">
          <p className="text-sm font-semibold uppercase tracking-widest text-moss">Section 8 — No Charging Stress</p>
          <h2 className="mt-5 font-display text-3xl uppercase leading-tight text-brand md:text-5xl">🔋 No Place to Charge? We've Got You.</h2>
          <p className="mt-5 leading-relaxed text-brand/65">
            Our electric golf carts are made for exploring Key West.
          </p>
          <p className="mt-4 leading-relaxed text-brand/65">
            Running low on battery? Just give us a call. We'll come to you and swap your cart.
          </p>
          <p className="mt-6 font-display text-2xl uppercase text-solar md:text-3xl">EASY. SIMPLE. PARADISE. 🌴</p>
          <a href="#fleet" className="mt-9 inline-flex rounded-lg bg-solar px-6 py-3 text-sm font-bold uppercase tracking-wide text-brand">Book Your Cart</a>
        </div>
      </div>
    </section>);

}
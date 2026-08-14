import React from 'react';
import { Image } from '@/components/ui/image';

const BATTERY_IMAGE_URL = 'https://media.base44.com/images/public/6a7e5db2c2620868d1046179/34ef9af56_Gemini_Generated_Image_gprglbgprglbgprg.jpeg';

export default function NoChargingStressSection() {
  return (
    <section id="no-charging-stress" className="bg-card px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2 md:gap-16">
        <div className="order-2 overflow-hidden rounded-2xl border border-brand/10 bg-dune md:order-1">
          <Image
            src={BATTERY_IMAGE_URL}
            alt="Premium lithium battery pack for Paradise Rentals electric golf carts"
            fittingType="fill"
            className="aspect-[4/3] w-full" />
          
        </div>
        <div className="order-1 md:order-2">
          <p className="text-sm font-semibold uppercase tracking-widest text-moss">Section 8 — No Charging Stress</p>
          <h2 className="mt-5 font-display text-3xl uppercase leading-tight text-brand md:text-5xl">No Place to Charge?</h2>
          <p className="mt-3 font-display text-3xl uppercase leading-tight text-brand md:text-5xl">No Problem. 🔋</p>
          <p className="mt-6 leading-relaxed text-brand/65 hidden">
            One of the biggest worries about renting an electric golf cart shouldn’t be your worry.
          </p>
          <p className="mt-4 leading-relaxed text-brand/65">
            Our premium lithium-powered carts offer excellent driving range for exploring Key West.
          </p>
          <p className="mt-4 leading-relaxed text-brand/65">And if you need assistance with your battery:</p>
          <p className="mt-6 font-display text-2xl uppercase text-solar md:text-3xl">We Come to You.</p>
          <p className="mt-6 whitespace-pre-line text-lg leading-relaxed text-brand/65 hidden">No charging stress.{`\n`}No vacation stress.{`\n`}Just call Paradise.</p>
          <a href="#fleet" className="mt-9 inline-flex rounded-lg bg-solar px-6 py-3 text-sm font-bold uppercase tracking-wide text-brand">Book Electric</a>
        </div>
      </div>
    </section>);

}
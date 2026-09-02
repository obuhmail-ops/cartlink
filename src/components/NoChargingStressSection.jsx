import React from 'react';
import { Image } from '@/components/ui/image';
import { imageUrl } from '@/lib/images';

const BATTERY_IMAGE_URL = imageUrl('995974be5_A6700571.jpg');

export default function NoChargingStressSection() {
  return (
    <section id="no-charging-stress" className="bg-card px-6 pt-10 pb-10 md:px-10 md:pt-12 md:pb-12">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2 md:gap-16">
        <div className="order-2 overflow-hidden rounded-2xl border border-brand/10 bg-dune md:order-1">
          <Image
            src={BATTERY_IMAGE_URL}
            alt="Paradise Rentals staff handing over golf cart keys to a customer"
            fittingType="fill"
            className="aspect-[4/3] w-full" />
          
        </div>
        <div className="order-1 md:order-2">
          <h2 className="font-display text-3xl uppercase leading-tight text-brand md:text-5xl">🔋 No Place to Charge? We've Got You.</h2>
          <p className="mt-5 leading-relaxed text-brand/65">
            Our electric golf carts are made for exploring Key West.
          </p>
          <p className="mt-4 leading-relaxed text-brand/65">
            Running low on battery? Just give us a call. We'll come to you and swap your cart.
          </p>
          <p className="mt-6 font-display text-2xl uppercase text-solar md:text-3xl">EASY. SIMPLE. PARADISE. 🌴</p>

        </div>
      </div>
    </section>);

}
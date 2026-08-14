import React from 'react';
import { Image } from '@/components/ui/image';

const AIRPORT_CART_URL = 'https://media.base44.com/images/public/6a7e5db2c2620868d1046179/936a7c2a8_A6700411.jpg';

export default function AirportDeliverySection() {
  return (
    <section id="airport-delivery" className="bg-dune px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-2xl bg-card shadow-sm md:grid-cols-2">
        <Image
          src={AIRPORT_CART_URL}
          alt="Paradise Rentals golf carts ready for Key West airport delivery"
          fittingType="fill"
          className="min-h-[360px] w-full md:min-h-[620px]"
          focalPointX={0.45}
          focalPointY={0.5}
        />
        <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-moss">Section 5 — Airport Delivery</p>
          <h2 className="mt-5 font-display text-3xl uppercase leading-tight text-brand md:text-5xl">
            Land. Grab Your Bags.<br />Start Your Vacation. ✈️🌴
          </h2>
          <div className="mt-7 space-y-4 text-brand/65">
            <p className="font-semibold text-brand">Arriving at Key West International Airport?</p>
            <p className="text-xl font-display text-brand">Skip the rental-car counter.</p>
            <p>Paradise Rentals makes starting your Key West vacation simple with convenient airport golf-cart delivery.</p>
            <p>Your vacation starts the moment you arrive.</p>
          </div>
          <a href="#fleet" className="mt-9 inline-flex w-fit rounded-lg bg-solar px-6 py-3 text-sm font-bold uppercase tracking-wide text-brand">
            Airport Rentals
          </a>
        </div>
      </div>
    </section>
  );
}
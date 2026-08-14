import React from 'react';
import { Image } from '@/components/ui/image';

const EXPRESS_IMAGE_URL = 'https://media.base44.com/images/public/6a7e5db2c2620868d1046179/8090f1a27_A6700430.jpg';

export default function KeyWestExpressSection() {
  return (
    <section id="key-west-express" className="bg-card px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto grid max-w-6xl items-stretch overflow-hidden rounded-2xl border border-brand/10 md:grid-cols-2">
        <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-moss">Section 6 — Key West Express</p>
          <h2 className="mt-5 font-display text-3xl uppercase leading-tight text-brand md:text-5xl">Arriving on the Key West Express?</h2>
          <p className="mt-6 text-xl font-display text-brand">Make the most of every hour on the island.</p>
          <p className="mt-4 leading-relaxed text-brand/65">
            For qualifying rentals of 24 hours or longer, Paradise Rentals customers arriving on the Key West Express can receive:
          </p>
          <div className="my-8 border-y border-brand/10 py-6">
            <p className="font-display text-3xl uppercase text-brand md:text-4xl">4 Complimentary Extra Hours*</p>
          </div>
          <p className="whitespace-pre-line text-lg leading-relaxed text-brand/65">More Key West.{`\n`}More exploring.{`\n`}More paradise.</p>
          <a href="#fleet" className="mt-9 inline-flex w-fit rounded-lg bg-solar px-6 py-3 text-sm font-bold uppercase tracking-wide text-brand">
            Reserve Your Cart
          </a>
        </div>
        <Image
          src={EXPRESS_IMAGE_URL}
          alt="Paradise Rentals golf carts ready for a tropical Key West arrival"
          fittingType="fill"
          className="min-h-[360px] w-full md:min-h-[650px]"
          focalPointX={0.58}
          focalPointY={0.5}
        />
      </div>
    </section>
  );
}
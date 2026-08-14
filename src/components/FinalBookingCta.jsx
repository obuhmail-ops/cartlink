import React from 'react';
import { Phone } from 'lucide-react';
import { Image } from '@/components/ui/image';

const TROPICAL_IMAGE_URL = 'https://media.base44.com/images/public/6a7e5db2c2620868d1046179/7d3ec60b1_generated_image.png';

export default function FinalBookingCta() {
  const checkAvailability = () => document.getElementById('fleet')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="relative min-h-[620px] overflow-hidden">
      <Image src={TROPICAL_IMAGE_URL} alt="Tropical Key West coastline at sunset" fittingType="fill" className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-0 bg-brand/65" />
      <div className="relative z-10 flex min-h-[620px] flex-col items-center justify-center px-6 py-24 text-center text-card">
        <p className="text-sm font-semibold uppercase tracking-widest text-solar">Section 14 — Final Booking CTA</p>
        <h2 className="mt-5 max-w-4xl font-display text-4xl uppercase leading-tight md:text-6xl">Ready to Explore Key West?</h2>
        <p className="mt-5 text-lg text-card/85 md:text-xl">Your Paradise ride is only a few clicks away.</p>
        <button onClick={checkAvailability} className="mt-9 rounded-lg bg-solar px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-brand">Check Availability</button>
        <span className="my-4 text-sm uppercase tracking-widest text-card/60">or</span>
        <a href="tel:+13053371815" className="inline-flex items-center gap-2 text-xl font-semibold text-card"><Phone className="h-5 w-5 text-solar" />305-337-1815</a>
        <p className="mt-12 font-display text-lg uppercase tracking-[0.18em] text-card">Explore Key West the Paradise Way <span aria-hidden="true">🌴</span></p>
      </div>
    </section>
  );
}
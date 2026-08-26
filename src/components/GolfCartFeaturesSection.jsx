import React from 'react';
import { Image } from '@/components/ui/image';
import { Volume2, Navigation, BatteryCharging, Gauge, Music } from 'lucide-react';

const features = [
{ icon: Navigation, title: 'Apple CarPlay & Android Auto', body: 'Maps, music & hands-free connectivity' },
{ icon: Volume2, title: 'Premium Audio', body: 'Soundbar + Bluetooth' },
{ icon: BatteryCharging, title: 'Long-Range Battery', body: 'All-day electric range with on-demand battery swaps — no charging stress.' },
{ icon: Gauge, title: 'Street-Legal Speed', body: 'Smooth, street-legal top speed to explore Key West at your pace.' },
{ icon: Music, title: 'Bluetooth Audio', body: 'Stream your favorite playlists straight from your phone.' }];


const FEATURE_IMAGE_1 = 'https://media.base44.com/images/public/6a7e5db2c2620868d1046179/724153794_A6700476.jpg';
const FEATURE_IMAGE_2 = 'https://media.base44.com/images/public/6a7e5db2c2620868d1046179/3512606ee_A6700589.jpg';

export default function GolfCartFeaturesSection() {
  const goToFleet = () => document.getElementById('fleet')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="cart-features" className="scroll-mt-24 px-6 py-24 text-dune md:px-10 md:py-32 bg-[hsl(var(--secondary-foreground))]">
      <div className="mx-auto max-w-6xl">
        <h2 className="max-w-3xl font-display text-3xl uppercase leading-tight md:text-5xl">Loaded With Island-Ready Features</h2>
        <p className="mt-4 max-w-2xl text-lg text-dune/70">Every Paradise Rentals cart is built for comfort, convenience and fun — so your only job is enjoying the ride.</p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="overflow-hidden rounded-2xl shadow-lg">
            <Image src={FEATURE_IMAGE_1} alt="DENAGO golf cart soundbar with blue LED accents" fittingType="fill" className="aspect-[4/3] w-full" />
          </div>
          <div className="overflow-hidden rounded-2xl shadow-lg">
            <Image src={FEATURE_IMAGE_2} alt="Apple CarPlay dashboard display in the golf cart" fittingType="fill" className="aspect-[4/3] w-full" />
          </div>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, body }) =>
          <div key={title} className="rounded-2xl border border-dune/15 bg-dune/5 p-6 transition-all duration-200 hover:bg-dune/10 hover:-translate-y-1">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-solar text-brand">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-4 font-display text-xl uppercase text-solar">{title}</h3>
              <p className="mt-2 leading-relaxed text-dune/70">{body}</p>
            </div>
          )}
        </div>

        <div className="mt-12 text-center">
          <button onClick={goToFleet} className="rounded-full bg-solar px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-brand shadow-lg hover:scale-105 active:scale-95 transition-all duration-200">
            See Our Fleet
          </button>
        </div>
      </div>
    </section>);

}
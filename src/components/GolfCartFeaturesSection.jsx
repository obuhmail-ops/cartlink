import React from 'react';
import { Image } from '@/components/ui/image';
import { Volume2, Navigation, BatteryCharging, Armchair, RefreshCw } from 'lucide-react';
import { FAREHARBOR_URL } from '@/lib/booking';
import { trackEvent } from '@/lib/track';
import { imageUrl } from '@/lib/images';

const features = [
{ icon: Navigation, title: 'Apple CarPlay & Android Auto', body: 'Maps, music & hands-free connectivity' },
{ icon: Volume2, title: 'Premium Audio', body: 'Soundbar + Bluetooth' },
{ icon: BatteryCharging, title: 'Long-Range Lithium Battery', body: 'Built for a full Key West day' },
{ icon: Armchair, title: 'Forward-Facing Seating', body: 'Available on our 4-passenger carts' },
{ icon: RefreshCw, title: 'No Charging Stress', body: 'Cart swap service available' }];


const FEATURE_IMAGE_1 = imageUrl('724153794_A6700476.jpg');
const FEATURE_IMAGE_2 = imageUrl('3512606ee_A6700589.jpg');

export default function GolfCartFeaturesSection() {
  return (
    <section id="cart-features" className="scroll-mt-24 px-6 pt-10 pb-10 text-dune md:px-10 md:pt-12 md:pb-12 bg-[hsl(var(--secondary-foreground))]">
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
          <a href={FAREHARBOR_URL} target="_blank" rel="noreferrer" onClick={() => trackEvent('check_availability_click', { location: 'features' })} className="inline-block rounded-full bg-solar px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-brand shadow-lg hover:scale-105 active:scale-95 transition-all duration-200">
            See Our Fleet
          </a>
        </div>
      </div>
    </section>);

}
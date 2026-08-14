import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { Users, Battery, Gauge, MapPin } from 'lucide-react';
import { Image } from '@/components/ui/image';

const rideFeatures = {
  four: ['Forward-Facing Seating', 'Premium Electric Cart', 'Lithium Battery', 'Quiet Ride'],
  six: ['Seats Up to 6', 'Spacious Seating', 'Long-Range Lithium Battery', 'Perfect for Groups']
};

function getFeatures(cart) {
  if (cart.seats >= 6) return rideFeatures.six;
  return rideFeatures.four;
}

export default function GallerySection() {
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.Cart.list('-created_date', 50).
    then(setCarts).
    finally(() => setLoading(false));
  }, []);

  return (
    <section id="gallery" className="py-24 md:py-32 bg-brand/5">
      <div className="px-6 md:px-10 max-w-6xl mx-auto">
        <p className="text-moss text-sm font-semibold uppercase tracking-widest mb-3">Section 2 — Our Fleet Gallery</p>
        <h2 className="font-display text-3xl md:text-5xl text-brand text-balance leading-tight">
          Explore Our Golf Cart Models
        </h2>
        <p className="mt-4 max-w-2xl text-brand/60 text-base md:text-lg">
          Browse every electric golf cart in our Key West fleet. Each model lists its passenger capacity and key features so you can pick the perfect ride.
        </p>

        {loading ?
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((i) =>
          <div key={i} className="overflow-hidden rounded-2xl border border-brand/10 bg-card">
                <div className="aspect-[4/3] animate-pulse bg-brand/5" />
                <div className="p-6 space-y-3">
                  <div className="h-6 w-1/2 animate-pulse rounded bg-brand/5" />
                  <div className="h-4 w-3/4 animate-pulse rounded bg-brand/5" />
                </div>
              </div>
          )}
          </div> :
        carts.length === 0 ?
        <p className="mt-12 text-brand/50">No carts available right now. Check back soon.</p> :

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {carts.map((cart) => {
            const features = getFeatures(cart);
            return (
              <article key={cart.id} className="group overflow-hidden rounded-2xl border border-brand/10 bg-card shadow-sm transition hover:shadow-lg">
                  <div className="relative">
                    <Image src={cart.image_url} alt={`${cart.name} electric golf cart`} fittingType="fill" className="aspect-[4/3] w-full" />
                    <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-solar px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-brand shadow">
                      <Users className="w-3.5 h-3.5" />
                      {cart.seats} Passengers
                    </span>
                    {cart.status === 'maintenance' &&
                  <span className="absolute top-3 right-3 rounded-full bg-destructive px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-destructive-foreground shadow">
                        In Maintenance
                      </span>
                  }
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-xl text-brand">{cart.name}</h3>
                    {cart.description && <p className="mt-2 text-sm text-brand/60">{cart.description}</p>}

                    <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="rounded-lg bg-brand/5 px-2 py-2">
                        <Battery className="mx-auto mb-1 w-4 h-4 text-moss" />
                        <span className="block font-semibold text-brand">{cart.battery_range || '—'}</span>
                        <span className="text-brand/50">Range</span>
                      </div>
                      <div className="rounded-lg bg-brand/5 px-2 py-2">
                        <Gauge className="mx-auto mb-1 w-4 h-4 text-moss" />
                        <span className="block font-semibold text-brand">{cart.top_speed || '—'}</span>
                        <span className="text-brand/50">Top Speed</span>
                      </div>
                      <div className="rounded-lg bg-brand/5 px-2 py-2">
                        <MapPin className="mx-auto mb-1 w-4 h-4 text-moss" />
                        <span className="block font-semibold text-brand">{cart.total_inventory}</span>
                        <span className="text-brand/50">Available</span>
                      </div>
                    </div>

                    <ul className="mt-5 grid gap-2 text-sm text-brand/70">
                      {features.map((feature) =>
                    <li key={feature} className="flex items-start gap-2">
                          <span className="font-bold text-moss" aria-hidden="true">✓</span>
                          <span>{feature}</span>
                        </li>
                    )}
                    </ul>

                    <div className="mt-6 flex items-center justify-between">
                      <div className="text-sm text-brand/60 hidden">
                        <span className="font-bold text-brand">${cart.daily_rate}</span> / day
                      </div>
                      <Link to={`/cart/${cart.id}`} className="rounded-lg bg-solar px-4 py-2 text-xs font-bold uppercase tracking-wide text-brand transition hover:brightness-105">
                        Book Now
                      </Link>
                    </div>
                  </div>
                </article>);

          })}
          </div>
        }
      </div>
    </section>);

}
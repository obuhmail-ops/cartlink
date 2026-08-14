import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { Image } from '@/components/ui/image';

const rideDetails = {
  four: {
    title: '4-Passenger',
    description: 'Perfect for couples and families.',
    features: ['Forward-Facing Seating', 'Premium Electric Cart', 'Lithium Battery', 'Quiet Ride', 'Key West Delivery'],
    button: 'Check 4-Seater Availability',
  },
  six: {
    title: '6-Passenger',
    description: 'Bring the whole crew.',
    features: ['Seats Up to 6', 'Premium Electric Cart', 'Spacious Seating', 'Long-Range Lithium Battery', 'Key West Delivery'],
    button: 'Check 6-Seater Availability',
  },
};

export default function CartDropdown({ open, onClose, onNavigate }) {
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!open) return;
    base44.entities.Cart.list('-created_date', 50)
      .then(setCarts)
      .finally(() => setLoading(false));
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed left-1/2 -translate-x-1/2 top-28 w-[min(80vw,720px)] z-50">
      <div className="rounded-2xl border border-brand/10 bg-dune shadow-2xl overflow-hidden">
        <div className="px-6 py-4 bg-brand/5 border-b border-brand/10">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-moss">Choose Your Ride</p>
          <h3 className="mt-1 font-display text-xl text-brand">Find the Perfect Golf Cart</h3>
        </div>
        <div className="p-4">
          {loading ? (
            <div className="grid gap-4 md:grid-cols-2">
              {[0, 1].map((i) => (
                <div key={i} className="rounded-xl border border-brand/10 bg-card p-4 animate-pulse">
                  <div className="h-32 bg-brand/5 rounded-lg mb-3" />
                  <div className="h-4 w-1/2 bg-brand/5 rounded" />
                </div>
              ))}
            </div>
          ) : carts.length === 0 ? (
            <p className="py-8 text-center text-brand/50 text-sm">No carts available right now.</p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {carts.slice(0, 2).map((cart) => {
                const details = cart.seats >= 6 ? rideDetails.six : rideDetails.four;
                return (
                  <Link
                    key={cart.id}
                    to={`/cart/${cart.id}`}
                    onClick={onClose}
                    className="group block overflow-hidden rounded-xl border border-brand/10 bg-card hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <Image src={cart.image_url} alt={`${details.title} electric golf cart`} fittingType="fill" className="aspect-[16/9] w-full" />
                    <div className="p-4">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-moss">{details.title}</p>
                      <h4 className="mt-1 font-display text-lg text-brand">{details.description}</h4>
                      <ul className="mt-3 grid gap-1.5 text-xs text-brand/70">
                        {details.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-1.5">
                            <span className="font-bold text-moss" aria-hidden="true">✓</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <span className="mt-4 inline-flex w-full justify-center rounded-lg bg-solar px-4 py-2 text-center text-xs font-bold uppercase tracking-wide text-brand group-hover:brightness-105 transition">
                        {details.button}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
import React from 'react';
import { Link } from 'react-router-dom';
import { Users } from 'lucide-react';
import { Image } from '@/components/ui/image';

export default function CartCard({ cart }) {
  return (
    <div className="group relative w-[280px] md:w-[360px] shrink-0 snap-center">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-white shadow-sm">
        <Image
          src={cart.image_url}
          alt={cart.name}
          fittingType="fill"
          className="absolute inset-0 w-full h-full transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-brand/90 text-dune px-3 py-1 text-xs font-medium backdrop-blur">
          <Users className="w-3.5 h-3.5" /> {cart.seats} seats
        </div>
      </div>
      <div className="mt-5">
        <h3 className="font-display text-xl text-brand">{cart.name}</h3>
        <p className="text-sm text-brand/55 mt-1.5 line-clamp-2 leading-relaxed">{cart.description}</p>
      </div>
      <div className="mt-5 flex items-center justify-between">
        <div className="text-brand">
          <span className="text-2xl font-display">${cart.hourly_rate}</span>
          <span className="text-sm text-brand/45">/hr · ${cart.daily_rate}/day</span>
        </div>
        <Link
          to={`/cart/${cart.id}`}
          className="rounded-full bg-solar text-brand px-5 py-2.5 text-sm font-semibold hover:brightness-105 transition shadow-sm"
        >
          View & Book
        </Link>
      </div>
    </div>
  );
}
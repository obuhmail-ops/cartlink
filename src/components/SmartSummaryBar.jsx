import React from 'react';
import { Calendar, Clock } from 'lucide-react';

export default function SmartSummaryBar({ cart, rateType, totalPrice, start, end, onBook, disabled }) {
  const fmt = (d) => (d ? new Date(d).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }) : '—');

  return (
    <div className="fixed bottom-0 inset-x-0 z-30 border-t border-brand/10 bg-dune/85 backdrop-blur-xl pb-[env(safe-area-inset-bottom)]">
      <div className="max-w-6xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 md:gap-6 text-sm text-brand overflow-hidden">
          <span className="font-display text-base truncate">{cart?.name}</span>
          <span className="hidden sm:flex items-center gap-1.5 text-brand/60">
            <Calendar className="w-4 h-4" /> {fmt(start)}
          </span>
          <span className="hidden md:flex items-center gap-1.5 text-brand/60">
            <Clock className="w-4 h-4" /> {rateType === 'hourly' ? 'Hourly' : 'Daily'}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-xs text-brand/50">Total</div>
            <div className="font-display text-lg text-brand leading-none">${totalPrice.toFixed(0)}</div>
          </div>
          <button
            onClick={onBook}
            disabled={disabled}
            className="rounded-full bg-solar text-brand px-6 py-2.5 text-sm font-semibold hover:brightness-105 transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
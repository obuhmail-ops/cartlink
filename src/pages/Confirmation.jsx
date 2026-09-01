import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Image } from '@/components/ui/image';
import { Check, CalendarDays, Clock, Wallet, Mail, User, Phone } from 'lucide-react';

export default function Confirmation() {
  const { state } = useLocation();

  const booking = state?.booking;
  const cart = state?.cart;
  const start = state?.start;
  const end = state?.end;
  const rateType = state?.rateType;
  const totalPrice = state?.totalPrice;
  const units = state?.units;

  const fmt = (d) => new Date(d).toLocaleString(undefined, { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });

  if (!booking) {
    return (
      <div className="min-h-screen bg-dune flex flex-col items-center justify-center gap-4">
        <p className="text-brand/60">No booking to show.</p>
        <Link to="/" className="text-solar font-semibold">Browse the fleet</Link>
      </div>
    );
  }

  const ref = booking.id?.slice(-6).toUpperCase();

  return (
    <div className="min-h-screen bg-dune">
      <Navbar />
      <div className="pt-24 px-6 md:px-10 max-w-xl mx-auto pb-20">
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-16 h-16 rounded-full bg-moss/10 flex items-center justify-center mb-5">
            <Check className="w-8 h-8 text-moss" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl text-brand">You're booked!</h1>
          <p className="text-brand/55 mt-2">A confirmation has been sent to {booking.customer_email}.</p>
        </div>

        {/* Travel ticket */}
        <div className="rounded-3xl bg-white border border-brand/10 overflow-hidden shadow-sm">
          <div className="bg-brand text-dune px-6 py-5 flex items-center justify-between">
            <div>
              <div className="text-[11px] uppercase tracking-widest text-dune/50">Booking reference</div>
              <div className="font-display text-xl">GC-{ref}</div>
            </div>
            <div className="text-right">
              <div className="text-[11px] uppercase tracking-widest text-dune/50">Status</div>
              <div className="font-medium text-solar">Confirmed</div>
            </div>
          </div>

          <div className="relative aspect-[16/8] w-full overflow-hidden">
            <Image src={cart.image_url} alt={cart.name} fittingType="fill" className="absolute inset-0 w-full h-full" />
          </div>

          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-brand/50 text-sm">Vehicle</span>
              <span className="font-display text-brand text-lg">{cart.name}</span>
            </div>
            <Line icon={<CalendarDays className="w-4 h-4" />} label="Pick-up" value={fmt(start)} />
            <Line icon={<CalendarDays className="w-4 h-4" />} label="Return" value={fmt(end)} />
            <Line icon={<Clock className="w-4 h-4" />} label="Rate" value={`${rateType === 'hourly' ? 'Hourly' : 'Daily'} · ${units} ${rateType === 'hourly' ? (units === 1 ? 'hour' : 'hours') : (units === 1 ? 'day' : 'days')}`} />
            <Line icon={<User className="w-4 h-4" />} label="Name" value={booking.customer_name} />
            <Line icon={<Mail className="w-4 h-4" />} label="Email" value={booking.customer_email} />
            {booking.customer_phone && <Line icon={<Phone className="w-4 h-4" />} label="Phone" value={booking.customer_phone} />}

            <div className="pt-4 border-t border-dashed border-brand/15 flex items-center justify-between">
              <span className="flex items-center gap-2 text-brand/60"><Wallet className="w-4 h-4" /> Total paid</span>
              <span className="font-display text-2xl text-brand">${totalPrice.toFixed(0)}</span>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/" className="rounded-full bg-brand text-dune px-6 py-3 text-sm font-semibold hover:bg-brand/90 transition text-center">Book another cart</Link>
          <button onClick={() => window.print()} className="rounded-full border border-brand/15 text-brand px-6 py-3 text-sm font-semibold hover:bg-brand/5 transition">Save ticket</button>
        </div>
      </div>
    </div>
  );
}

function Line({ icon, label, value }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="flex items-center gap-2 text-brand/55 text-sm">{icon} {label}</span>
      <span className="text-brand font-medium text-right text-sm">{value}</span>
    </div>
  );
}
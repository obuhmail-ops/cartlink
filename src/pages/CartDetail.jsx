import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import Navbar from '@/components/Navbar';
import SmartSummaryBar from '@/components/SmartSummaryBar';
import { Image } from '@/components/ui/image';
import { Users, Battery, Gauge, ArrowLeft, AlertCircle, Check } from 'lucide-react';

const toInputValue = (d) => {
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

export default function CartDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rateType, setRateType] = useState('daily');

  const defaultStart = useMemo(() => {
    const d = new Date();
    d.setMinutes(0, 0, 0);
    d.setHours(d.getHours() + 1);
    return d;
  }, []);
  const [start, setStart] = useState(toInputValue(defaultStart));
  const [end, setEnd] = useState(toInputValue(new Date(defaultStart.getTime() + 4 * 3600000)));

  useEffect(() => {
    let alive = true;
    Promise.all([
      base44.entities.Cart.get(id),
      base44.entities.Booking.filter({ cart_id: id, status: 'confirmed' }),
    ])
      .then(([c, b]) => {
        if (!alive) return;
        setCart(c);
        setBookings(b);
      })
      .finally(() => alive && setLoading(false));
    return () => { alive = false; };
  }, [id]);

  const startMs = new Date(start).getTime();
  const endMs = new Date(end).getTime();
  const valid = endMs > startMs;
  const hours = valid ? (endMs - startMs) / 3600000 : 0;
  const units = rateType === 'hourly' ? Math.max(1, Math.ceil(hours)) : Math.max(1, Math.ceil(hours / 24));
  const rate = rateType === 'hourly' ? cart?.hourly_rate : cart?.daily_rate;
  const totalPrice = valid && cart ? units * rate : 0;

  const overlapping = bookings.filter((b) => {
    const bs = new Date(b.start_datetime).getTime();
    const be = new Date(b.end_datetime).getTime();
    return bs < endMs && be > startMs;
  }).length;
  const totalInventory = cart?.total_inventory || 0;
  const available = Math.max(0, totalInventory - overlapping);
  const canBook = valid && available > 0 && cart?.status === 'available';

  const handleBook = () => {
    if (!canBook) return;
    navigate('/checkout', { state: { cart, start, end, rateType, totalPrice, units } });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dune flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-brand/20 border-t-brand rounded-full animate-spin" />
      </div>
    );
  }

  if (!cart) {
    return (
      <div className="min-h-screen bg-dune flex flex-col items-center justify-center gap-4">
        <p className="text-brand/60">Cart not found.</p>
        <Link to="/" className="text-solar font-semibold">Back to fleet</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dune pb-24">
      <Navbar />

      <div className="pt-24 px-6 md:px-10 max-w-6xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-brand/55 hover:text-brand transition text-sm mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to fleet
        </Link>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Gallery */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-white shadow-sm">
              <Image src={cart.image_url} alt={cart.name} fittingType="fill" className="absolute inset-0 w-full h-full" />
            </div>
            <div className="mt-6 grid grid-cols-3 gap-4">
              <Spec icon={<Users className="w-5 h-5" />} label="Seats" value={cart.seats} />
              <Spec icon={<Battery className="w-5 h-5" />} label="Range" value={cart.battery_range || '—'} />
              <Spec icon={<Gauge className="w-5 h-5" />} label="Top speed" value={cart.top_speed || '—'} />
            </div>
            <p className="mt-6 text-brand/60 leading-relaxed">{cart.description}</p>
          </div>

          {/* Pricing engine */}
          <div>
            <h1 className="font-display text-3xl md:text-4xl text-brand">{cart.name}</h1>
            <div className="mt-4 flex items-center gap-2">
              <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${cart.status === 'available' ? 'bg-moss/10 text-moss' : 'bg-brand/10 text-brand/60'}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${cart.status === 'available' ? 'bg-moss' : 'bg-brand/40'}`} />
                {cart.status === 'available' ? 'Available now' : 'In maintenance'}
              </span>
            </div>

            {/* Rate toggle */}
            <div className="mt-8 inline-flex rounded-full bg-brand/5 p-1">
              {['hourly', 'daily'].map((rt) => (
                <button
                  key={rt}
                  onClick={() => setRateType(rt)}
                  className={`rounded-full px-6 py-2 text-sm font-medium capitalize transition ${rateType === rt ? 'bg-brand text-dune' : 'text-brand/60 hover:text-brand'}`}
                >
                  {rt}
                </button>
              ))}
            </div>

            {/* Price */}
            <div className="mt-6 flex items-end gap-3">
              <span className="font-display text-5xl text-brand">${totalPrice.toFixed(0)}</span>
              <span className="text-brand/50 mb-2 text-sm">
                {units} {rateType === 'hourly' ? (units === 1 ? 'hour' : 'hours') : (units === 1 ? 'day' : 'days')} · ${rate}/{rateType === 'hourly' ? 'hr' : 'day'}
              </span>
            </div>

            {/* Dates */}
            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              <DateField label="Pick-up" value={start} onChange={setStart} />
              <DateField label="Return" value={end} onChange={setEnd} />
            </div>
            {!valid && (
              <p className="mt-3 flex items-center gap-2 text-sm text-destructive">
                <AlertCircle className="w-4 h-4" /> Return time must be after pick-up.
              </p>
            )}

            {/* Live inventory */}
            <div className="mt-6 flex items-center gap-3">
              {available > 0 ? (
                available <= 2 ? (
                  <span className="inline-flex items-center gap-2 rounded-full bg-solar/15 text-brand px-4 py-2 text-sm font-medium">
                    <span className="w-2 h-2 rounded-full bg-solar animate-pulse" />
                    Only {available} left for these dates
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2 rounded-full bg-moss/10 text-moss px-4 py-2 text-sm font-medium">
                    <Check className="w-4 h-4" /> {available} available
                  </span>
                )
              ) : (
                <span className="inline-flex items-center gap-2 rounded-full bg-destructive/10 text-destructive px-4 py-2 text-sm font-medium">
                  <AlertCircle className="w-4 h-4" /> Sold out for these dates
                </span>
              )}
            </div>

            <button
              onClick={handleBook}
              disabled={!canBook}
              className="mt-8 w-full rounded-full bg-solar text-brand font-semibold py-4 hover:brightness-105 transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {canBook ? 'Continue to checkout' : 'Unavailable'}
            </button>
          </div>
        </div>
      </div>

      <SmartSummaryBar cart={cart} rateType={rateType} totalPrice={totalPrice} start={start} end={end} onBook={handleBook} disabled={!canBook} />
    </div>
  );
}

function Spec({ icon, label, value }) {
  return (
    <div className="rounded-2xl bg-white border border-brand/5 p-4">
      <span className="text-moss">{icon}</span>
      <div className="mt-3 text-xs text-brand/45 uppercase tracking-wider">{label}</div>
      <div className="font-display text-lg text-brand mt-0.5">{value}</div>
    </div>
  );
}

function DateField({ label, value, onChange }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium uppercase tracking-wider text-brand/50">{label}</span>
      <input
        type="datetime-local"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-xl bg-white border border-brand/10 text-brand text-sm px-4 py-3 outline-none focus:ring-2 ring-solar"
      />
    </label>
  );
}
import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { wpBookings } from '@/api/wpClient';
import Navbar from '@/components/Navbar';
import { Image } from '@/components/ui/image';
import { ArrowLeft, Loader2, CalendarDays, Clock, Wallet } from 'lucide-react';

export default function Checkout() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [form, setForm] = useState({ customer_name: '', customer_email: '', customer_phone: '' });
  const [submitting, setSubmitting] = useState(false);

  const cart = state?.cart;
  const start = state?.start;
  const end = state?.end;
  const rateType = state?.rateType;
  const totalPrice = state?.totalPrice;
  const units = state?.units;

  const fmt = (d) => new Date(d).toLocaleString(undefined, { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const ready = form.customer_name.trim() && /\S+@\S+\.\S+/.test(form.customer_email);

  const submit = async (e) => {
    e.preventDefault();
    if (!ready || submitting) return;
    setSubmitting(true);
    try {
      const booking = await wpBookings.create({
        cart_id: cart.id,
        cart_name: cart.name,
        customer_name: form.customer_name.trim(),
        customer_email: form.customer_email.trim(),
        customer_phone: form.customer_phone.trim(),
        start_datetime: new Date(start).toISOString(),
        end_datetime: new Date(end).toISOString(),
        rate_type: rateType,
        total_price: totalPrice,
        status: 'confirmed',
      });
      navigate('/confirmation', { state: { booking, cart, start, end, rateType, totalPrice, units } });
    } catch (err) {
      setSubmitting(false);
      alert('Could not complete booking. Please try again.');
    }
  };

  if (!cart) {
    return (
      <div className="min-h-screen bg-dune flex flex-col items-center justify-center gap-4">
        <p className="text-brand/60">No active booking session.</p>
        <Link to="/" className="text-solar font-semibold">Browse the fleet</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dune">
      <Navbar />
      <div className="pt-24 px-6 md:px-10 max-w-xl mx-auto pb-20">
        <Link to={`/cart/${cart.id}`} className="inline-flex items-center gap-2 text-brand/55 hover:text-brand transition text-sm mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to {cart.name}
        </Link>
        <h1 className="font-display text-3xl md:text-4xl text-brand">Checkout</h1>
        <p className="text-brand/55 mt-2">Almost there — just a few details and you're rolling.</p>
        <div className="mt-8 rounded-2xl bg-white border border-brand/5 overflow-hidden">
          <div className="relative aspect-[16/7] w-full overflow-hidden">
            <Image src={cart.image_url} alt={cart.name} fittingType="fill" className="absolute inset-0 w-full h-full" />
          </div>
          <div className="p-5 space-y-3 text-sm">
            <Row icon={<CalendarDays className="w-4 h-4" />} label="Pick-up" value={fmt(start)} />
            <Row icon={<CalendarDays className="w-4 h-4" />} label="Return" value={fmt(end)} />
            <Row icon={<Clock className="w-4 h-4" />} label="Rate" value={`${rateType === 'hourly' ? 'Hourly' : 'Daily'} · ${units} ${rateType === 'hourly' ? (units === 1 ? 'hour' : 'hours') : (units === 1 ? 'day' : 'days')}`} />
            <div className="pt-3 border-t border-brand/10 flex items-center justify-between">
              <span className="flex items-center gap-2 text-brand/60"><Wallet className="w-4 h-4" /> Total</span>
              <span className="font-display text-2xl text-brand">${totalPrice.toFixed(0)}</span>
            </div>
          </div>
        </div>
        <form onSubmit={submit} className="mt-8 space-y-5">
          <Field label="Full name"><input value={form.customer_name} onChange={set('customer_name')} required className="rounded-xl bg-white border border-brand/10 text-brand text-sm px-4 py-3 outline-none focus:ring-2 ring-solar" placeholder="Jordan Rivera" /></Field>
          <Field label="Email"><input type="email" value={form.customer_email} onChange={set('customer_email')} required className="rounded-xl bg-white border border-brand/10 text-brand text-sm px-4 py-3 outline-none focus:ring-2 ring-solar" placeholder="you@email.com" /></Field>
          <Field label="Phone (optional)"><input value={form.customer_phone} onChange={set('customer_phone')} className="rounded-xl bg-white border border-brand/10 text-brand text-sm px-4 py-3 outline-none focus:ring-2 ring-solar" placeholder="+1 (555) 010-2024" /></Field>
          <button type="submit" disabled={!ready || submitting} className="w-full rounded-full bg-solar text-brand font-semibold py-4 hover:brightness-105 transition disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2">
            {submitting ? <><Loader2 className="w-5 h-5 animate-spin" /> Confirming…</> : `Confirm booking · $${totalPrice.toFixed(0)}`}
          </button>
        </form>
      </div>
    </div>
  );
}

function Row({ icon, label, value }) {
  return (<div className="flex items-center justify-between gap-4"><span className="flex items-center gap-2 text-brand/55">{icon} {label}</span><span className="text-brand font-medium text-right">{value}</span></div>);
}
function Field({ label, children }) {
  return (<label className="flex flex-col gap-1.5"><span className="text-xs font-medium uppercase tracking-wider text-brand/50">{label}</span>{children}</label>);
}
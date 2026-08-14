import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartCard from '@/components/CartCard';
import { Image } from '@/components/ui/image';
import { ArrowRight, CalendarDays, Clock, MapPin, ShieldCheck, Sparkles, Wallet } from 'lucide-react';

const HERO_URL = 'https://media.base44.com/images/public/6a7e5db2c2620868d1046179/c8d09b784_A6700444.jpg';

function HeroField({ icon, label, children }) {
  return (
    <label className="flex flex-col gap-1 text-left">
      <span className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-white/70">
        {icon} {label}
      </span>
      {children}
    </label>);

}

export default function Home() {
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.Cart.list('-created_date', 50).
    then(setCarts).
    finally(() => setLoading(false));
  }, []);

  const goToFleet = () => document.getElementById('fleet')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="min-h-screen bg-dune">
      <Navbar />

      {/* Hero */}
      <section className="relative h-screen min-h-[900px] md:min-h-[760px] w-full overflow-hidden">
        <Image src={HERO_URL} alt="Key West golf cart rental fleet by the coast" fittingType="fill" className="absolute inset-0 w-full h-full" />
        <div className="absolute inset-0 bg-gradient-to-b from-brand/50 via-brand/25 to-brand/65" />
        <div className="relative z-10 h-full flex flex-col justify-center pb-40 px-6 md:px-10 max-w-6xl mx-auto">
          <p className="text-solar text-xs md:text-sm font-semibold tracking-[0.25em] uppercase mb-5">
            Key West Golf Cart Rentals
          </p>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-white text-balance leading-[1.04] max-w-4xl">
            Explore Key West the paradise way
          </h1>
          <p className="mt-5 text-white/90 text-lg md:text-xl max-w-2xl leading-relaxed">
            Premium 4 facing-forward and 6-passenger electric golf carts delivered right to you.
          </p>
          <ul className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm md:text-base text-white max-w-2xl">
            {[
            'FREE Hotel Delivery',
            'FREE Airbnb & Vacation Rental Delivery',
            'Airport Delivery Available',
            'Cruise Port Service',
            'Long-Range Electric Carts',
            'Easy Online Booking'].
            map((benefit) =>
            <li key={benefit} className="flex items-center gap-2">
                <span className="text-solar font-bold" aria-hidden="true">✓</span>
                {benefit}
              </li>
            )}
          </ul>
        </div>

        {/* Floating glass island search */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[92%] max-w-3xl z-20">
          <div className="rounded-2xl bg-white/15 backdrop-blur-xl border border-white/25 p-3 md:p-5 shadow-2xl hidden">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 items-end">
              <HeroField icon={<CalendarDays className="w-3.5 h-3.5" />} label="Pick-up">
                <input type="datetime-local" className="w-full rounded-lg bg-white/90 text-brand text-sm px-3 py-2.5 outline-none focus:ring-2 ring-solar" />
              </HeroField>
              <HeroField icon={<CalendarDays className="w-3.5 h-3.5" />} label="Return">
                <input type="datetime-local" className="w-full rounded-lg bg-white/90 text-brand text-sm px-3 py-2.5 outline-none focus:ring-2 ring-solar" />
              </HeroField>
              <HeroField icon={<MapPin className="w-3.5 h-3.5" />} label="Location">
                <select className="w-full rounded-lg bg-white/90 text-brand text-sm px-3 py-2.5 outline-none focus:ring-2 ring-solar">
                  <option>Marina Hub</option>
                  <option>Beachfront</option>
                  <option>Old Town</option>
                </select>
              </HeroField>
              <button
                onClick={goToFleet}
                className="flex items-center justify-center gap-2 rounded-lg bg-solar text-brand font-semibold text-sm px-5 py-2.5 hover:brightness-105 transition">
                
                Search Fleet <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Fleet Cinema */}
      <section id="fleet" className="py-24 md:py-32">
        <div className="px-6 md:px-10 max-w-6xl mx-auto">
          <div className="flex items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-moss text-sm font-semibold uppercase tracking-widest mb-3">The Fleet</p>
              <h2 className="font-display text-3xl md:text-5xl text-brand text-balance leading-tight">
                Choose your chariot.
              </h2>
            </div>
            <p className="hidden md:block text-brand/55 max-w-xs text-right">
              Swipe through the lineup. Every cart is charged, cleaned, and ready when you are.
            </p>
          </div>
        </div>

        {loading ?
        <div className="px-6 md:px-10 flex gap-6 overflow-hidden">
            {[0, 1, 2].map((i) =>
          <div key={i} className="w-[280px] md:w-[360px] shrink-0">
                <div className="aspect-[4/3] w-full rounded-2xl bg-brand/5 animate-pulse" />
                <div className="h-6 w-2/3 bg-brand/5 rounded mt-5 animate-pulse" />
                <div className="h-4 w-1/2 bg-brand/5 rounded mt-3 animate-pulse" />
              </div>
          )}
          </div> :
        carts.length === 0 ?
        <p className="px-6 md:px-10 text-brand/50">No carts available right now. Check back soon.</p> :

        <div className="flex gap-6 md:gap-8 overflow-x-auto no-scrollbar snap-x snap-mandatory px-6 md:px-10 pb-4">
            {carts.map((cart) =>
          <CartCard key={cart.id} cart={cart} />
          )}
            <div className="w-4 shrink-0" />
          </div>
        }
      </section>

      {/* How it works */}
      <section id="how" className="py-24 md:py-32 bg-white">
        <div className="px-6 md:px-10 max-w-6xl mx-auto">
          <p className="text-moss text-sm font-semibold uppercase tracking-widest mb-3">How it works</p>
          <h2 className="font-display text-3xl md:text-5xl text-brand text-balance leading-tight max-w-2xl">
            Three steps to the open road.
          </h2>
          <div className="grid md:grid-cols-3 gap-10 md:gap-16 mt-16">
            {[
            { icon: <CalendarDays className="w-6 h-6" />, n: '01', t: 'Pick your dates', d: 'Choose hourly or daily. Our live inventory shows exactly what is available, instantly.' },
            { icon: <Wallet className="w-6 h-6" />, n: '02', t: 'Lock the rate', d: 'Transparent pricing that updates as you configure. No surprise fees at pickup.' },
            { icon: <Sparkles className="w-6 h-6" />, n: '03', t: 'Roll out', d: 'Receive a sleek digital ticket. Show up, hop in, and let the vacation begin.' }].
            map((s) =>
            <div key={s.n} className="border-t border-brand/10 pt-6">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-solar">{s.icon}</span>
                  <span className="font-display text-2xl text-brand/20">{s.n}</span>
                </div>
                <h3 className="font-display text-xl text-brand mb-2">{s.t}</h3>
                <p className="text-brand/55 leading-relaxed">{s.d}</p>
              </div>
            )}
          </div>
          <div className="mt-16 flex items-center gap-3 text-brand/60">
            <ShieldCheck className="w-5 h-5 text-moss" />
            <span className="text-sm">Fully insured · 24/7 roadside assistance · Free cancellation up to 24h</span>
          </div>
        </div>
      </section>

      <Footer />
    </div>);

}
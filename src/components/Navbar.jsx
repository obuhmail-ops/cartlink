import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Phone, X } from 'lucide-react';
import { Image } from '@/components/ui/image';

const LOGO_URL = 'https://media.base44.com/images/public/6a7e5db2c2620868d1046179/a6e3bd84e_working.png';
const pendingLinks = ['Delivery', 'Explore Key West', 'FAQs'];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const scrollTo = (id) => {
    setOpen(false);
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 60);
  };

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-40 bg-dune/95 backdrop-blur-md border-b border-brand/10">
        <div className="hidden md:flex h-24 max-w-7xl mx-auto items-center gap-5 px-5 lg:px-8 text-teal-500 bg-[#3392e6]">
          <Link to="/" aria-label="Paradise Rentals home" className="shrink-0">
            <Image src={LOGO_URL} alt="Paradise Rentals" fittingType="fit" className="h-20 w-20" />
          </Link>
          <nav className="flex flex-1 items-center justify-center gap-3 lg:gap-5 text-[11px] lg:text-xs font-semibold uppercase tracking-wide text-brand/75 whitespace-nowrap">
            <Link to="/" className="hover:text-brand transition">Home</Link>
            <button onClick={() => scrollTo('fleet')} className="hover:text-brand transition">Golf Carts</button>
            {pendingLinks.map((label) => <span key={label}>{label}</span>)}
            <button onClick={() => scrollTo('contact')} className="hover:text-brand transition">Contact</button>
          </nav>
          <div className="flex items-center gap-2 shrink-0">
            <a href="tel:+13053371815" className="flex items-center gap-1.5 px-2 py-2 text-xs font-semibold text-brand whitespace-nowrap">
              <Phone className="w-4 h-4" /> Call Us
            </a>
            <button onClick={() => scrollTo('fleet')} className="rounded-lg bg-solar px-3 lg:px-4 py-2.5 text-[11px] lg:text-xs font-bold text-brand whitespace-nowrap">
              Check Availability
            </button>
          </div>
        </div>

        <div className="md:hidden h-16 px-4 flex items-center justify-between gap-2">
          <button onClick={() => setOpen(true)} className="flex items-center gap-1.5 text-sm font-semibold text-brand" aria-label="Open menu">
            <Menu className="w-5 h-5" /> Menu
          </button>
          <a href="tel:+13053371815" className="flex items-center gap-1.5 text-sm font-semibold text-brand">
            <Phone className="w-4 h-4" /> Call
          </a>
          <button onClick={() => scrollTo('fleet')} className="rounded-lg bg-solar px-4 py-2 text-sm font-bold text-brand">
            Book Now
          </button>
        </div>
      </header>

      {open &&
      <div className="fixed inset-0 z-50 bg-dune/95 backdrop-blur-2xl flex flex-col md:hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-brand/10">
            <Image src={LOGO_URL} alt="Paradise Rentals" fittingType="fit" className="h-16 w-16" />
            <button onClick={() => setOpen(false)} aria-label="Close menu" className="text-brand"><X className="w-6 h-6" /></button>
          </div>
          <nav className="flex flex-col items-center justify-center gap-6 flex-1 text-2xl font-display text-brand">
            <Link to="/" onClick={() => setOpen(false)}>Home</Link>
            <button onClick={() => scrollTo('fleet')}>Golf Carts</button>
            {pendingLinks.map((label) => <span key={label}>{label}</span>)}
            <button onClick={() => scrollTo('contact')}>Contact</button>
          </nav>
        </div>
      }
    </>);

}
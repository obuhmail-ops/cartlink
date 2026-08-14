import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Image } from '@/components/ui/image';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const scrollTo = (id) => {
    setOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 60);
  };

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-40">
        <div className="flex items-center justify-between px-6 md:px-10 py-5">
          <Link to="/" aria-label="Paradise Rentals home" className="block">
            <Image
              src="https://media.base44.com/images/public/6a7e5db2c2620868d1046179/a6e3bd84e_working.png"
              alt="Paradise Rentals"
              fittingType="fit"
              className="h-20 w-20 md:h-24 md:w-24"
            />
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm text-brand/70">
            <button onClick={() => scrollTo('fleet')} className="hover:text-brand transition">Fleet</button>
            <button onClick={() => scrollTo('how')} className="hover:text-brand transition">How it works</button>
            <Link to="/admin" className="hover:text-brand transition">Admin</Link>
          </div>
          <button
            onClick={() => setOpen(true)}
            className="md:hidden flex items-center gap-2 text-brand"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
        <div className="h-px bg-brand/10" />
      </header>

      {open && (
        <div className="fixed inset-0 z-50 bg-dune/80 backdrop-blur-2xl flex flex-col">
          <div className="flex items-center justify-between px-6 py-5">
            <span className="font-display text-lg text-brand">GolfCart<span className="text-solar">Go</span></span>
            <button onClick={() => setOpen(false)} aria-label="Close menu" className="text-brand">
              <X className="w-6 h-6" />
            </button>
          </div>
          <nav className="flex flex-col items-center justify-center gap-8 flex-1">
            <button onClick={() => scrollTo('fleet')} className="text-3xl font-display text-brand">Fleet</button>
            <button onClick={() => scrollTo('how')} className="text-3xl font-display text-brand">How it works</button>
            <Link to="/admin" onClick={() => setOpen(false)} className="text-3xl font-display text-brand">Admin</Link>
          </nav>
        </div>
      )}
    </>
  );
}
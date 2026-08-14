import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Phone, X } from 'lucide-react';

const LOGO_VIDEO_URL = 'https://media.base44.com/videos/public/6a7e5db2c2620868d1046179/f22b7c6ba_gemini_generated_video_9fd05d99.mp4';
const pendingLinks = [];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const scrollTo = (id) => {
    setOpen(false);
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 60);
  };

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-40 bg-dune/95 backdrop-blur-md border-b border-brand/10">
        <div className="hidden md:flex h-32 max-w-7xl items-center gap-6 px-6 lg:px-10 text-teal-500 bg-[hsl(var(--sidebar-primary-foreground))]">
          <Link to="/" aria-label="Paradise Rentals home" className="shrink-0">
            <video src={LOGO_VIDEO_URL} aria-label="Paradise Rentals" autoPlay loop muted playsInline className="h-28 w-28 object-cover" />
          </Link>
          <nav className="flex flex-1 items-center justify-center gap-3 lg:gap-5 text-[11px] lg:text-xs font-semibold uppercase tracking-wide whitespace-nowrap text-[hsl(var(--foreground))]">
            <Link to="/" className="hover:text-brand transition text-sm [font-family:'Sora',_sans-serif] font-bold">Home</Link>
            <button onClick={() => scrollTo('fleet')} className="hover:text-brand transition [font-family:'Sora',_sans-serif] font-bold text-sm">Golf Carts</button>
            <button onClick={() => scrollTo('delivery')} className="hover:text-brand transition [font-family:'Sora',_sans-serif] font-bold text-sm">Delivery</button>
            <button onClick={() => scrollTo('arrival-options')} className="hover:text-brand transition [font-family:'Sora',_sans-serif] font-bold text-sm">Ports, Airports &amp; Cruises</button>
            <button onClick={() => scrollTo('explore')} className="hover:text-brand transition [font-family:'Sora',_sans-serif] font-bold text-sm">Explore Key West</button>
            {pendingLinks.map((label) => <span key={label}>{label}</span>)}
            <button onClick={() => scrollTo('faqs')} className="hover:text-brand transition [font-family:'Sora',_sans-serif] font-bold text-sm">FAQs</button>
            <button onClick={() => scrollTo('contact')} className="hover:text-brand transition [font-family:'Sora',_sans-serif] text-sm font-bold">Contact</button>
          </nav>
          <div className="flex items-center gap-2 shrink-0">
            <a href="tel:+13053371815" className="flex items-center gap-1.5 px-2 py-2 text-xs text-brand whitespace-nowrap [font-family:'Sora',_sans-serif] font-bold my-4">
              <Phone className="w-4 h-4" /> Call Us
            </a>
            <button onClick={() => scrollTo('fleet')} className="rounded-lg bg-solar px-3 lg:px-4 py-2.5 text-[11px] lg:text-xs font-bold text-brand whitespace-nowrap">
              Check Availability
            </button>
          </div>
        </div>

        <div className="md:hidden h-20 px-5 flex items-center justify-between gap-3">
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
            <video src={LOGO_VIDEO_URL} aria-label="Paradise Rentals" autoPlay loop muted playsInline className="h-20 w-20 object-cover" />
            <button onClick={() => setOpen(false)} aria-label="Close menu" className="text-brand"><X className="w-6 h-6" /></button>
          </div>
          <nav className="flex flex-col items-center justify-center gap-6 flex-1 text-2xl font-display text-brand">
            <Link to="/" onClick={() => setOpen(false)}>Home</Link>
            <button onClick={() => scrollTo('fleet')}>Golf Carts</button>
            <button onClick={() => scrollTo('delivery')}>Delivery</button>
            <button onClick={() => scrollTo('arrival-options')}>Ports, Airports &amp; Cruises</button>
            <button onClick={() => scrollTo('explore')}>Explore Key West</button>
            {pendingLinks.map((label) => <span key={label}>{label}</span>)}
            <button onClick={() => scrollTo('faqs')}>FAQs</button>
            <button onClick={() => scrollTo('contact')}>Contact</button>
          </nav>
        </div>
      }
    </>);

}
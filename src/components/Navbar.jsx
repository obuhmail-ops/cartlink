import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Phone, X } from 'lucide-react';
import CartDropdown from '@/components/CartDropdown';

const LOGO_VIDEO_URL = 'https://media.base44.com/videos/public/6a7e5db2c2620868d1046179/f22b7c6ba_gemini_generated_video_9fd05d99.mp4';

const leftLinks = [
{ label: 'Home', type: 'link', to: '/' },
{ label: 'Golf Carts', type: 'scroll', target: 'fleet' },
{ label: 'Gallery', type: 'scroll', target: 'gallery' },
{ label: 'Delivery', type: 'scroll', target: 'delivery' },
{ label: 'Ports, Airports & Cruises', type: 'scroll', target: 'arrival-options' }];


const rightLinks = [
{ label: 'Explore Key West', type: 'scroll', target: 'explore' },
{ label: 'FAQs', type: 'scroll', target: 'faqs' },
{ label: 'Contact', type: 'scroll', target: 'contact' }];


export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartDropdown, setCartDropdown] = useState(false);
  const closeTimer = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const openCart = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setCartDropdown(true);
  };

  const scheduleCloseCart = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setCartDropdown(false), 600);
  };

  const scrollTo = (id) => {
    setOpen(false);
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 60);
  };

  const renderLink = (link) =>
  link.type === 'link' ?
  <Link key={link.label} to={link.to} className="rounded-full px-3 py-2 hover:bg-solar hover:text-brand hover:-translate-y-0.5 hover:shadow-[0_0_18px_hsl(43_100%_50%)] focus-visible:bg-solar focus-visible:text-brand focus-visible:shadow-[0_0_18px_hsl(43_100%_50%)] active:bg-solar active:text-brand active:scale-95 transition-all duration-200 [font-family:'Sora',_sans-serif] font-semibold text-sm whitespace-nowrap">
        {link.label}
      </Link> :

  <button key={link.label} onClick={() => scrollTo(link.target)} className="rounded-full px-3 py-2 hover:bg-solar hover:text-brand hover:-translate-y-0.5 hover:shadow-[0_0_18px_hsl(43_100%_50%)] focus-visible:bg-solar focus-visible:text-brand focus-visible:shadow-[0_0_18px_hsl(43_100%_50%)] active:bg-solar active:text-brand active:scale-95 transition-all duration-200 [font-family:'Sora',_sans-serif] font-semibold text-sm whitespace-nowrap">
        {link.label}
      </button>;


  return (
    <>
      <header className={`fixed top-3 inset-x-3 md:inset-x-6 z-40 transition-all duration-300 rounded-full ${scrolled ? 'bg-dune/95 backdrop-blur-md shadow-lg border border-brand/10' : 'bg-dune/80 backdrop-blur-sm'}`}>
        <div className="hidden lg:grid h-24 max-w-7xl mx-auto grid-cols-3 items-center px-6 lg:px-10">
          <nav className="flex items-center justify-start gap-4 lg:gap-6 text-brand">
            <Link to="/" className="rounded-full px-3 py-2 hover:bg-solar hover:text-brand hover:-translate-y-0.5 hover:shadow-[0_0_18px_hsl(43_100%_50%)] focus-visible:bg-solar focus-visible:text-brand focus-visible:shadow-[0_0_18px_hsl(43_100%_50%)] active:bg-solar active:text-brand active:scale-95 transition-all duration-200 [font-family:'Sora',_sans-serif] font-semibold text-sm whitespace-nowrap">
              Home
            </Link>
            <div
              className="relative"
              onMouseEnter={openCart}
              onMouseLeave={scheduleCloseCart}>
              
              <button
                onClick={() => scrollTo('fleet')}
                className="flex items-center gap-1 rounded-full px-3 py-2 hover:bg-solar hover:text-brand hover:-translate-y-0.5 hover:shadow-[0_0_18px_hsl(43_100%_50%)] focus-visible:bg-solar focus-visible:text-brand focus-visible:shadow-[0_0_18px_hsl(43_100%_50%)] active:bg-solar active:text-brand active:scale-95 transition-all duration-200 [font-family:'Sora',_sans-serif] font-semibold text-sm whitespace-nowrap">
                
                Rentals
              </button>
              <CartDropdown open={cartDropdown} onClose={() => setCartDropdown(false)} onMouseEnter={openCart} onMouseLeave={scheduleCloseCart} />
            </div>
            <button onClick={() => scrollTo('gallery')} className="rounded-full px-3 py-2 hover:bg-solar hover:text-brand hover:-translate-y-0.5 hover:shadow-[0_0_18px_hsl(43_100%_50%)] focus-visible:bg-solar focus-visible:text-brand focus-visible:shadow-[0_0_18px_hsl(43_100%_50%)] active:bg-solar active:text-brand active:scale-95 transition-all duration-200 [font-family:'Sora',_sans-serif] font-semibold text-sm whitespace-nowrap">
              Gallery
            </button>
            <button onClick={() => scrollTo('delivery')} className="rounded-full px-3 py-2 hover:bg-solar hover:text-brand hover:-translate-y-0.5 hover:shadow-[0_0_18px_hsl(43_100%_50%)] focus-visible:bg-solar focus-visible:text-brand focus-visible:shadow-[0_0_18px_hsl(43_100%_50%)] active:bg-solar active:text-brand active:scale-95 transition-all duration-200 [font-family:'Sora',_sans-serif] font-semibold text-sm whitespace-nowrap">
              Delivery
            </button>
            <button onClick={() => scrollTo('arrival-options')} className="rounded-full px-3 py-2 hover:bg-solar hover:text-brand hover:-translate-y-0.5 hover:shadow-[0_0_18px_hsl(43_100%_50%)] focus-visible:bg-solar focus-visible:text-brand focus-visible:shadow-[0_0_18px_hsl(43_100%_50%)] active:bg-solar active:text-brand active:scale-95 transition-all duration-200 [font-family:'Sora',_sans-serif] font-semibold text-sm whitespace-nowrap">
              Ports, Airports &amp; Cruises
            </button>
          </nav>

          <div className="flex items-center justify-center px-1">
            <Link to="/" aria-label="Paradise Rentals home" className="shrink-0">
              <video src={LOGO_VIDEO_URL} aria-label="Paradise Rentals" autoPlay loop muted playsInline className="h-24 w-24 object-cover rounded-full" />
            </Link>
          </div>

          <div className="flex items-center justify-end gap-3 lg:gap-4">
            <nav className="flex items-center gap-4 lg:gap-6 text-brand">
              {rightLinks.map(renderLink)}
            </nav>
            <a href="tel:+13053371815" className="flex items-center gap-1.5 px-2 py-2 text-xs text-brand whitespace-nowrap [font-family:'Sora',_sans-serif] font-bold rounded-full px-3 py-2 hover:bg-solar hover:text-brand hover:-translate-y-0.5 hover:shadow-[0_0_18px_hsl(43_100%_50%)] focus-visible:bg-solar focus-visible:text-brand focus-visible:shadow-[0_0_18px_hsl(43_100%_50%)] active:bg-solar active:text-brand active:scale-95 transition-all duration-200">
              <Phone className="w-4 h-4" /> Call
            </a>
            <button onClick={() => scrollTo('fleet')} className="rounded-lg bg-solar px-4 py-2.5 text-xs font-bold text-brand whitespace-nowrap shadow hover:brightness-110 hover:scale-105 hover:shadow-[0_0_20px_hsl(43_100%_50%)] focus-visible:brightness-110 focus-visible:shadow-[0_0_20px_hsl(43_100%_50%)] active:scale-95 active:shadow-[0_0_24px_hsl(43_100%_50%)] transition-all duration-200">
              Book Now
            </button>
          </div>
        </div>

        <div className="lg:hidden h-16 px-4 flex items-center justify-between gap-2">
          <button onClick={() => setOpen(true)} className="flex items-center gap-1.5 text-sm font-semibold text-brand rounded-full px-3 py-2 hover:bg-solar hover:text-brand hover:-translate-y-0.5 hover:shadow-[0_0_18px_hsl(43_100%_50%)] focus-visible:bg-solar focus-visible:text-brand focus-visible:shadow-[0_0_18px_hsl(43_100%_50%)] active:bg-solar active:text-brand active:scale-95 transition-all duration-200" aria-label="Open menu">
            <Menu className="w-5 h-5" /> Menu
          </button>
          <Link to="/" aria-label="Paradise Rentals home">
            <video src={LOGO_VIDEO_URL} aria-label="Paradise Rentals" autoPlay loop muted playsInline className="h-16 w-16 object-cover rounded-full" />
          </Link>
          <div className="flex items-center gap-2">
            <a href="tel:+13053371815" className="flex items-center gap-1.5 px-2 py-2 text-xs text-brand whitespace-nowrap [font-family:'Sora',_sans-serif] font-bold rounded-full px-3 py-2 hover:bg-solar hover:text-brand hover:-translate-y-0.5 hover:shadow-[0_0_18px_hsl(43_100%_50%)] focus-visible:bg-solar focus-visible:text-brand focus-visible:shadow-[0_0_18px_hsl(43_100%_50%)] active:bg-solar active:text-brand active:scale-95 transition-all duration-200" aria-label="Call">
              <Phone className="w-4 h-4" /> Call
            </a>
            <button onClick={() => scrollTo('fleet')} className="rounded-lg bg-solar px-4 py-2 text-sm font-bold text-brand hover:brightness-110 hover:scale-105 hover:shadow-[0_0_20px_hsl(43_100%_50%)] focus-visible:brightness-110 focus-visible:shadow-[0_0_20px_hsl(43_100%_50%)] active:scale-95 active:shadow-[0_0_24px_hsl(43_100%_50%)] transition-all duration-200">
              Book Now
            </button>
          </div>
        </div>
      </header>

      {open &&
      <div className="fixed inset-0 z-50 bg-dune/95 backdrop-blur-2xl flex flex-col lg:hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-brand/10">
            <video src={LOGO_VIDEO_URL} aria-label="Paradise Rentals" autoPlay loop muted playsInline className="h-20 w-20 object-cover rounded-full" />
            <button onClick={() => setOpen(false)} aria-label="Close menu" className="rounded-full p-2 text-brand hover:bg-solar hover:shadow-[0_0_18px_hsl(43_100%_50%)] focus-visible:bg-solar focus-visible:shadow-[0_0_18px_hsl(43_100%_50%)] active:scale-95 transition-all duration-200"><X className="w-6 h-6" /></button>
          </div>
          <nav className="flex flex-col items-center justify-center gap-6 flex-1 text-2xl font-display text-brand [&_a]:rounded-full [&_a]:px-5 [&_a]:py-2 [&_a]:transition-all [&_a]:duration-200 [&_a:hover]:bg-solar [&_a:hover]:shadow-[0_0_18px_hsl(43_100%_50%)] [&_a:focus-visible]:bg-solar [&_button]:rounded-full [&_button]:px-5 [&_button]:py-2 [&_button]:transition-all [&_button]:duration-200 [&_button:hover]:bg-solar [&_button:hover]:shadow-[0_0_18px_hsl(43_100%_50%)] [&_button:focus-visible]:bg-solar [&_button:active]:scale-95">
            <Link to="/" onClick={() => setOpen(false)}>Home</Link>
            <button onClick={() => scrollTo('fleet')}>Golf Carts</button>
            <button onClick={() => scrollTo('gallery')}>Gallery</button>
            <button onClick={() => scrollTo('delivery')}>Delivery</button>
            <button onClick={() => scrollTo('arrival-options')}>Ports, Airports &amp; Cruises</button>
            <button onClick={() => scrollTo('explore')}>Explore Key West</button>
            <button onClick={() => scrollTo('faqs')}>FAQs</button>
            <button onClick={() => scrollTo('contact')}>Contact</button>
          </nav>
        </div>
      }
    </>);

}
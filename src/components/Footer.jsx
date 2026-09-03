import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, MapPin, Phone, Star } from 'lucide-react';
import { trackEvent } from '@/lib/track';

const quickLinks = [
  ['Golf Carts', '#fleet'],
  ['Rentals', '/rentals'],
  ['4 Passenger', '/4-passenger'],
  ['6 Passenger', '/6-passenger'],
  ['Airport Delivery', '/airport-rental'],
  ['Cruise Rentals', '/cruise-rental'],
  ['Key West Express', '/key-west-express-golf-cart-rentals'],
  ['Explore Key West', '/explore-key-west'],
  ['FAQs', '/faq'],
  ['Contact', '/contact'],
  ['Book Now', '/rentals'],
  ['Privacy', '/privacy-policy'],
  ['Terms', '/terms-and-conditions'],
  ['Cancellation', '/cancellation-policy'],
  ['Rental Requirements', '/rental-requirements'],
];

export default function Footer() {
  return (
    <footer id="contact" className="bg-brand px-6 py-16 text-dune md:px-10">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-3">
        <div>
          <h2 className="font-display text-2xl">Paradise Rentals Key West</h2>
          <p className="mt-4 text-dune/65">Premium Electric Golf Cart Rentals</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-dune/50">Quick Links</h3>
          <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-dune/80">
            {quickLinks.map(([label, href]) => (
              <li key={label}>
                {href.startsWith('/') ? (
                  <Link to={href} className="transition hover:text-solar">{label}</Link>
                ) : (
                  <a href={href} className="transition hover:text-solar">{label}</a>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-dune/50">Contact</h3>
          <div className="mt-5 space-y-3 text-dune/80">
            <a href="tel:+13053371815" onClick={() => trackEvent('call_click', { location: 'footer' })} className="flex items-center gap-2 transition hover:text-solar"><Phone className="h-4 w-4 text-solar" />305-337-1815</a>
            <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-solar" />Key West, Florida</p>
          </div>
          <div className="mt-7 flex flex-wrap gap-4 text-sm text-dune/80">
            <a href="https://www.instagram.com/paradiserentalskw/" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-solar"><Instagram className="h-4 w-4" />Instagram</a>
            <a href="https://www.facebook.com/search/top?q=Paradise%20Rentals%20Key%20West" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-solar"><Facebook className="h-4 w-4" />Facebook</a>
            <a href="https://www.google.com/search?q=Paradise+Rentals+Key+West+Google+Reviews" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-solar"><Star className="h-4 w-4" />Google Reviews</a>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-14 max-w-6xl border-t border-dune/10 pt-7 text-sm text-dune/50">© {new Date().getFullYear()} Paradise Rentals Key West. All rights reserved.</div>
    </footer>
  );
}
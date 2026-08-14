import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contact" className="bg-brand text-dune px-6 md:px-10 py-16">
      <div className="max-w-6xl mx-auto grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="font-display text-2xl">GolfCart<span className="text-solar">Go</span></div>
          <p className="mt-4 text-dune/60 max-w-sm leading-relaxed">
            The first exhilarating breath of your vacation. Premium golf cart rentals, booked in seconds.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-dune/50">Explore</h4>
          <ul className="mt-4 space-y-3 text-dune/80">
            <li><Link to="/" className="hover:text-solar transition">Fleet</Link></li>
            <li><Link to="/admin" className="hover:text-solar transition">Admin</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-dune/50">Contact</h4>
          <ul className="mt-4 space-y-3 text-dune/80">
            <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-solar" /> +1 (555) 010-2024</li>
            <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-solar" /> hello@golfcartgo.com</li>
            <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-solar" /> 18 Marina Way, Coastal Bay</li>
          </ul>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-16 pt-8 border-t border-dune/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-dune/50">
        <span>© {new Date().getFullYear()} GolfCartGo. All rights reserved.</span>
        <div className="flex gap-6">
          <a href="#" className="hover:text-dune transition">Privacy</a>
          <a href="#" className="hover:text-dune transition">Terms</a>
        </div>
      </div>
    </footer>
  );
}
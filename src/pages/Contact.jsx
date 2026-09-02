import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileBookingBar from '@/components/MobileBookingBar';
import FinalBookingCta from '@/components/FinalBookingCta';
import { Phone, Mail, MapPin, Clock, Instagram, Facebook, Star } from 'lucide-react';
import { trackEvent } from '@/lib/track';
import { FAREHARBOR_URL } from '@/lib/booking';

const SEO_TITLE = 'Contact Paradise Rentals Key West | Golf Cart Rentals';
const SEO_DESCRIPTION =
  'Contact Paradise Rentals Key West for premium electric golf cart rentals. Call 305-337-1815 for free delivery and pickup across Key West, the airport, and cruise port.';

const CONTACT_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Paradise Rentals Key West',
  telephone: '+1-305-337-1815',
  areaServed: 'Key West, Florida',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Key West',
    addressRegion: 'FL',
    addressCountry: 'US',
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '08:00',
    closes: '20:00',
  },
  sameAs: [
    'https://www.instagram.com/paradiserentalskw/',
    'https://www.facebook.com/search/top?q=Paradise%20Rentals%20Key%20West',
  ],
};

export default function Contact() {
  useEffect(() => {
    const previousTitle = document.title;
    const descMeta = document.querySelector('meta[name="description"]');
    const previousDescription = descMeta?.getAttribute('content');

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(CONTACT_JSONLD);
    script.dataset.contactJsonld = 'true';
    document.head.appendChild(script);

    document.title = SEO_TITLE;
    if (descMeta) descMeta.setAttribute('content', SEO_DESCRIPTION);

    return () => {
      document.title = previousTitle;
      if (descMeta && previousDescription) descMeta.setAttribute('content', previousDescription);
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-dune">
      <Navbar />

      <main className="pt-28 md:pt-36">
        {/* Hero */}
        <section className="px-6 md:px-10 max-w-6xl mx-auto text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-moss">Contact Us</p>
          <h1 className="mt-3 font-display text-4xl md:text-6xl text-brand text-balance leading-tight">
            Let's Get You Riding
          </h1>
          <p className="mt-5 max-w-2xl mx-auto text-base md:text-lg text-brand/70 leading-relaxed">
            Questions about rentals, delivery, or availability? We're here to help you plan the perfect
            Key West golf cart adventure. Reach out any way you like — or book online in minutes.
          </p>
        </section>

        {/* Contact cards */}
        <section className="px-6 md:px-10 max-w-6xl mx-auto mt-12">
          <div className="grid gap-6 md:grid-cols-3">
            <a
              href="tel:+13053371815"
              onClick={() => trackEvent('call_click', { location: 'contact_page' })}
              className="rounded-2xl border border-brand/10 bg-card p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
            >
              <Phone className="h-7 w-7 text-solar" />
              <h2 className="mt-4 font-display text-xl text-brand">Call Us</h2>
              <p className="mt-2 text-sm text-brand/70">Speak with our team directly.</p>
              <p className="mt-3 font-semibold text-brand">305-337-1815</p>
            </a>

            <a
              href="mailto:hello@paradiserentalskw.com"
              className="rounded-2xl border border-brand/10 bg-card p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
            >
              <Mail className="h-7 w-7 text-solar" />
              <h2 className="mt-4 font-display text-xl text-brand">Email Us</h2>
              <p className="mt-2 text-sm text-brand/70">We reply within 24 hours.</p>
              <p className="mt-3 font-semibold text-brand break-words">hello@paradiserentalskw.com</p>
            </a>

            <div className="rounded-2xl border border-brand/10 bg-card p-6 shadow-sm">
              <MapPin className="h-7 w-7 text-solar" />
              <h2 className="mt-4 font-display text-xl text-brand">Visit Us</h2>
              <p className="mt-2 text-sm text-brand/70">Serving all of Key West.</p>
              <p className="mt-3 font-semibold text-brand">Key West, Florida</p>
            </div>
          </div>
        </section>

        {/* Hours + social */}
        <section className="px-6 md:px-10 max-w-6xl mx-auto mt-8">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-brand/10 bg-card p-6 shadow-sm">
              <div className="flex items-center gap-2">
                <Clock className="h-6 w-6 text-solar" />
                <h2 className="font-display text-xl text-brand">Hours of Operation</h2>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-brand/70">
                <li className="flex justify-between"><span>Monday – Sunday</span><span className="font-semibold text-brand">8:00 AM – 8:00 PM</span></li>
                <li className="text-brand/50">Free delivery & pickup available 7 days a week.</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-brand/10 bg-card p-6 shadow-sm">
              <h2 className="font-display text-xl text-brand">Follow & Review Us</h2>
              <p className="mt-2 text-sm text-brand/70">See our latest carts and customer adventures.</p>
              <div className="mt-4 flex flex-wrap gap-4 text-sm text-brand/80">
                <a href="https://www.instagram.com/paradiserentalskw/" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-solar transition"><Instagram className="h-4 w-4 text-solar" />Instagram</a>
                <a href="https://www.facebook.com/search/top?q=Paradise%20Rentals%20Key%20West" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-solar transition"><Facebook className="h-4 w-4 text-solar" />Facebook</a>
                <a href="https://www.google.com/search?q=Paradise+Rentals+Key+West+Google+Reviews" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-solar transition"><Star className="h-4 w-4 text-solar" />Google Reviews</a>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 md:px-10 max-w-6xl mx-auto mt-12 text-center">
          <h2 className="font-display text-3xl md:text-4xl text-brand text-balance leading-tight">
            Ready to Reserve?
          </h2>
          <p className="mt-3 text-brand/70">Check availability and book your golf cart online in minutes.</p>
          <a
            href={FAREHARBOR_URL}
            target="_blank"
            rel="noreferrer"
            onClick={() => trackEvent('check_availability_click', { location: 'contact_page' })}
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-solar px-6 py-3 text-sm font-bold uppercase tracking-wide text-brand shadow hover:brightness-110 hover:scale-105 active:scale-95 transition-all duration-200"
          >
            Check Availability
          </a>
        </section>

        <FinalBookingCta />
      </main>

      <Footer />
      <MobileBookingBar />
      <div className="h-24 md:hidden" aria-hidden="true" />
    </div>
  );
}
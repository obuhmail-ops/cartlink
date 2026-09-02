import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileBookingBar from '@/components/MobileBookingBar';

const SEO_TITLE = 'Rental Requirements | Paradise Rentals Key West';
const SEO_DESCRIPTION =
  'Learn the requirements to rent a golf cart in Key West from Paradise Rentals, including valid driver\'s license, minimum age, and insurance details.';

const LAST_UPDATED = 'September 2, 2026';

const REQUIREMENTS = [
  {
    icon: '🪪',
    title: 'Valid Driver\'s License',
    body: 'A valid, government-issued driver\'s license is required for all operators. International visitors may use a valid license from their home country along with a passport for identification.',
  },
  {
    icon: '🎂',
    title: 'Minimum Age',
    body: 'The primary renter must be at least 22 years of age. All operators of the golf cart must hold a valid driver\'s license regardless of age.',
  },
  {
    icon: '💳',
    title: 'Credit Card',
    body: 'A valid credit card is required at the time of booking to secure your reservation and authorize a security deposit for potential damage or additional charges.',
  },
  {
    icon: '📱',
    title: 'Contact Phone Number',
    body: 'A working mobile phone number is required so we can coordinate delivery, pickup, and reach you in case of any questions or updates during your rental.',
  },
];

const RULES = [
  'Operate the golf cart in accordance with all Florida traffic laws',
  'Do not operate the cart under the influence of alcohol or drugs',
  'Do not exceed the posted passenger capacity (4 or 6 passengers)',
  'Stay on paved roads and designated cart paths — no beaches or off-road use',
  'Seatbelts must be worn by all passengers when available',
  'Keep the cart clean and return it in the condition received',
];

export default function RentalRequirements() {
  useEffect(() => {
    const previousTitle = document.title;
    const descMeta = document.querySelector('meta[name="description"]');
    const previousDescription = descMeta?.getAttribute('content');
    document.title = SEO_TITLE;
    if (descMeta) descMeta.setAttribute('content', SEO_DESCRIPTION);
    return () => {
      document.title = previousTitle;
      if (descMeta && previousDescription) descMeta.setAttribute('content', previousDescription);
    };
  }, []);

  return (
    <div className="min-h-screen bg-dune">
      <Navbar />

      <main className="pt-28 md:pt-36 pb-16">
        <article className="px-6 md:px-10 max-w-3xl mx-auto">
          <header>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-moss">Before You Book</p>
            <h1 className="mt-3 font-display text-4xl md:text-5xl text-brand text-balance leading-tight">
              Rental Requirements
            </h1>
            <p className="mt-4 text-brand/70 leading-relaxed">
              To rent a golf cart from Paradise Rentals Key West, please review the following
              requirements and rules. These help keep you safe and ensure a smooth rental experience.
            </p>
            <p className="mt-4 text-sm text-brand/50">Last updated: {LAST_UPDATED}</p>
          </header>

          <section className="mt-12">
            <h2 className="font-display text-xl md:text-2xl text-brand">What You Need to Rent</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {REQUIREMENTS.map((req) => (
                <div
                  key={req.title}
                  className="rounded-2xl bg-card p-5 border border-brand/10 shadow-sm"
                >
                  <div className="text-2xl">{req.icon}</div>
                  <h3 className="mt-3 font-display text-lg text-brand">{req.title}</h3>
                  <p className="mt-2 text-sm text-brand/70 leading-relaxed">{req.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-12">
            <h2 className="font-display text-xl md:text-2xl text-brand">Operating Rules</h2>
            <p className="mt-3 text-brand/70 leading-relaxed">
              By renting a golf cart, you agree to follow these operating rules:
            </p>
            <ul className="mt-4 space-y-3 list-disc pl-5 text-brand/70 leading-relaxed text-sm md:text-base">
              {RULES.map((rule) => (
                <li key={rule}>{rule}</li>
              ))}
            </ul>
          </section>

          <section className="mt-12">
            <h2 className="font-display text-xl md:text-2xl text-brand">Insurance & Liability</h2>
            <p className="mt-3 text-brand/70 leading-relaxed">
              Paradise Rentals Key West maintains commercial liability coverage on our fleet.
              Renters are responsible for any damage to the golf cart caused during the rental
              period. A security deposit is authorized on your credit card at the time of rental
              and released upon safe return of the cart.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="font-display text-xl md:text-2xl text-brand">Questions?</h2>
            <p className="mt-3 text-brand/70 leading-relaxed">
              If you have any questions about rental requirements, contact us:
            </p>
            <ul className="mt-4 space-y-2 list-disc pl-5 text-brand/70 text-sm md:text-base">
              <li>Phone: 305-337-1815</li>
              <li>Email: hello@paradiserentalskw.com</li>
              <li>Location: Key West, Florida</li>
            </ul>
          </section>
        </article>
      </main>

      <Footer />
      <MobileBookingBar />
      <div className="h-24 md:hidden" aria-hidden="true" />
    </div>
  );
}
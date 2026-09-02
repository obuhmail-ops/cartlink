import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileBookingBar from '@/components/MobileBookingBar';

const SEO_TITLE = 'Terms & Conditions | Paradise Rentals Key West';
const SEO_DESCRIPTION =
  'Read the Terms and Conditions for renting a golf cart from Paradise Rentals Key West. Learn about reservations, payments, liability, and rental rules.';

const LAST_UPDATED = 'September 2, 2026';

const SECTIONS = [
  {
    id: 'acceptance',
    title: '1. Acceptance of Terms',
    body: [
      'These Terms and Conditions ("Terms") govern your use of the Paradise Rentals Key West website and your rental of golf carts from us. By booking a rental or using our services, you agree to be bound by these Terms.',
      'If you do not agree with any part of these Terms, please do not use our services.',
    ],
  },
  {
    id: 'eligibility',
    title: '2. Eligibility',
    body: [
      'To rent a golf cart from Paradise Rentals Key West, you must:',
    ],
    list: [
      'Be at least 22 years of age with a valid driver\'s license',
      'Provide a valid credit card for the security deposit',
      'Possess a valid, government-issued driver\'s license at the time of rental',
    ],
  },
  {
    id: 'reservations',
    title: '3. Reservations & Availability',
    body: [
      'All reservations are subject to availability and are confirmed only upon receipt of payment or deposit. We reserve the right to decline or cancel a reservation at our discretion.',
      'Pricing and availability are subject to change without notice. The rate in effect at the time of booking confirmation will apply to your reservation.',
    ],
  },
  {
    id: 'payment',
    title: '4. Payment & Deposits',
    body: [
      'Full payment or a deposit may be required at the time of booking. A security deposit may be authorized on your credit card to cover potential damage or additional charges.',
      'Payments are processed through our secure booking platform. By submitting payment, you authorize us to charge the agreed amount to your payment method.',
    ],
  },
  {
    id: 'cancellations',
    title: '5. Cancellations & Refunds',
    body: [
      'Cancellations made at least 48 hours before the scheduled rental start may be eligible for a refund. Cancellations within 48 hours of the rental start may be subject to a cancellation fee or forfeiture of the deposit.',
      'No-shows or early returns are non-refundable. Weather-related cancellations are handled at our discretion.',
    ],
  },
  {
    id: 'delivery',
    title: '6. Delivery & Pickup',
    body: [
      'We offer free delivery and pickup within Key West, including hotels, vacation rentals, Key West International Airport (EYW), and the cruise port. Delivery and pickup times are scheduled at the time of booking.',
      'You are responsible for being present at the agreed time and location. Additional fees may apply for missed appointments or changes requested within 24 hours of the scheduled time.',
    ],
  },
  {
    id: 'use-of-cart',
    title: '7. Use of the Golf Cart',
    body: [
      'As the renter, you agree to the following rules of use:',
    ],
    list: [
      'Operate the golf cart safely and in accordance with all local traffic laws',
      'Do not operate the cart under the influence of alcohol or drugs',
      'Do not exceed the posted passenger capacity of the cart',
      'Do not take the cart off-road or onto beaches unless permitted',
      'Keep the cart clean and return it in the condition received',
      'Do not sublease, lend, or transfer the cart to a third party',
    ],
  },
  {
    id: 'damage',
    title: '8. Damage & Liability',
    body: [
      'You are responsible for any damage to the golf cart during the rental period, including damage caused by misuse, negligence, or accidents. The security deposit may be applied to cover repair costs.',
      'Paradise Rentals Key West is not liable for personal injury, property damage, or lost items arising from the use of the golf cart. You rent the cart at your own risk.',
    ],
  },
  {
    id: 'battery',
    title: '9. Battery & Charging',
    body: [
      'Our electric golf carts are equipped with long-range lithium batteries. If the battery runs low during your rental, contact us and we will swap your cart at no additional charge, subject to availability.',
      'Do not attempt to charge the cart yourself unless instructed by our team.',
    ],
  },
  {
    id: 'termination',
    title: '10. Termination of Rental',
    body: [
      'We reserve the right to terminate a rental immediately and retrieve the golf cart if these Terms are violated, if the cart is used unlawfully, or if we believe the cart is at risk of damage or theft. No refund will be issued in such cases.',
    ],
  },
  {
    id: 'website-use',
    title: '11. Website Use',
    body: [
      'You agree to use our website lawfully and not to disrupt, damage, or attempt to gain unauthorized access to any part of it. We may modify or discontinue the website at any time without notice.',
    ],
  },
  {
    id: 'limitation',
    title: '12. Limitation of Liability',
    body: [
      'To the fullest extent permitted by law, Paradise Rentals Key West shall not be liable for any indirect, incidental, or consequential damages arising from your use of our services or website.',
    ],
  },
  {
    id: 'governing-law',
    title: '13. Governing Law',
    body: [
      'These Terms are governed by the laws of the State of Florida. Any disputes arising from these Terms or your rental shall be resolved in the courts located in Monroe County, Florida.',
    ],
  },
  {
    id: 'changes',
    title: '14. Changes to These Terms',
    body: [
      'We may update these Terms at any time. We will post the updated Terms on this page and revise the "Last updated" date. Your continued use of our services after changes constitutes acceptance of the revised Terms.',
    ],
  },
  {
    id: 'contact',
    title: '15. Contact Us',
    body: [
      'If you have questions about these Terms, please contact us:',
    ],
    list: [
      'Phone: 305-337-1815',
      'Email: hello@paradiserentalskw.com',
      'Location: Key West, Florida',
    ],
  },
];

export default function TermsConditions() {
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
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-moss">Legal</p>
            <h1 className="mt-3 font-display text-4xl md:text-5xl text-brand text-balance leading-tight">
              Terms &amp; Conditions
            </h1>
            <p className="mt-4 text-sm text-brand/50">Last updated: {LAST_UPDATED}</p>
          </header>

          <div className="mt-10 space-y-10">
            {SECTIONS.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-28">
                <h2 className="font-display text-xl md:text-2xl text-brand">{section.title}</h2>
                <div className="mt-3 space-y-3 text-brand/70 leading-relaxed text-sm md:text-base">
                  {section.body.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                  {section.list && (
                    <ul className="mt-2 space-y-2 list-disc pl-5">
                      {section.list.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </section>
            ))}
          </div>
        </article>
      </main>

      <Footer />
      <MobileBookingBar />
      <div className="h-24 md:hidden" aria-hidden="true" />
    </div>
  );
}
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileBookingBar from '@/components/MobileBookingBar';

const SEO_TITLE = 'Cancellation Policy | Paradise Rentals Key West';
const SEO_DESCRIPTION =
  'Review the Paradise Rentals Key West cancellation and refund policy for golf cart rentals, including timeframes, weather cancellations, and no-show terms.';

const LAST_UPDATED = 'September 2, 2026';

const SECTIONS = [
  {
    id: 'overview',
    title: '1. Overview',
    body: [
      'At Paradise Rentals Key West, we understand that plans change. This Cancellation Policy outlines the timeframes and conditions under which you may cancel a golf cart rental reservation and receive a refund.',
      'By booking a rental with us, you agree to the terms described below.',
    ],
  },
  {
    id: 'cancellation-timeframes',
    title: '2. Cancellation Timeframes',
    body: [
      'Refund eligibility depends on how far in advance you cancel relative to your scheduled rental start time:',
    ],
    list: [
      'More than 7 days before rental start — Full refund',
      '48 hours to 7 days before rental start — 75% refund',
      '24 to 48 hours before rental start — 50% refund',
      'Less than 24 hours before rental start — No refund',
    ],
  },
  {
    id: 'how-to-cancel',
    title: '3. How to Cancel',
    body: [
      'To cancel a reservation, contact us as soon as possible by phone at 305-337-1815 or by email. Cancellations must be confirmed by our team to be considered valid.',
      'Verbal notice to a delivery driver or other staff member does not constitute an official cancellation. Please ensure you receive written or verbal confirmation from our office.',
    ],
  },
  {
    id: 'refunds',
    title: '4. Refund Processing',
    body: [
      'Approved refunds are returned to the original payment method used at booking. Processing times depend on your bank or card issuer and typically take 5–10 business days.',
      'Security deposit authorizations are released back to your card and may take an additional few days to appear, depending on your bank.',
    ],
  },
  {
    id: 'weather',
    title: '5. Weather & Cancellations',
    body: [
      'Key West weather can be unpredictable. If severe weather or a named storm makes it unsafe to operate a golf cart, you may cancel or reschedule your rental without penalty.',
      'Light rain or typical tropical showers do not qualify for a weather-based cancellation. Our team will make the final determination on weather-related safety.',
    ],
  },
  {
    id: 'no-shows',
    title: '6. No-Shows & Late Arrivals',
    body: [
      'If you fail to appear for your scheduled delivery or pickup, the reservation is considered a no-show and is non-refundable.',
      'If you are running late, please call us. We will do our best to accommodate, but we cannot guarantee availability beyond 1 hour of the scheduled time.',
    ],
  },
  {
    id: 'early-returns',
    title: '7. Early Returns',
    body: [
      'Returning a golf cart before the end of your reserved rental period does not entitle you to a prorated refund or credit for the unused time.',
    ],
  },
  {
    id: 'termination',
    title: '8. Cancellations by Us',
    body: [
      'We reserve the right to cancel a reservation due to circumstances beyond our control, including equipment failure, safety concerns, or force majeure events. In such cases, you will receive a full refund.',
      'We are not liable for any incidental or consequential damages resulting from a cancellation initiated by us.',
    ],
  },
  {
    id: 'changes',
    title: '9. Changes to This Policy',
    body: [
      'We may update this Cancellation Policy at any time. The version posted on this page at the time of your booking applies to your reservation. Please review this page periodically.',
    ],
  },
  {
    id: 'contact',
    title: '10. Contact Us',
    body: [
      'If you have questions about our cancellation policy or need to cancel a reservation, please contact us:',
    ],
    list: [
      'Phone: 305-337-1815',
      'Email: hello@paradiserentalskw.com',
      'Location: Key West, Florida',
    ],
  },
];

export default function CancellationPolicy() {
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
              Cancellation Policy
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
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileBookingBar from '@/components/MobileBookingBar';

const SEO_TITLE = 'Privacy Policy | Paradise Rentals Key West';
const SEO_DESCRIPTION =
  'Read the Paradise Rentals Key West privacy policy. Learn how we collect, use, and protect your personal information when you rent a golf cart or use our website.';

const LAST_UPDATED = 'September 2, 2026';

const SECTIONS = [
  {
    id: 'introduction',
    title: '1. Introduction',
    body: [
      'Paradise Rentals Key West ("we," "us," or "our") respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, and share information when you visit our website, book a golf cart rental, or otherwise interact with our services.',
      'By using our website or services, you agree to the practices described in this Privacy Policy.',
    ],
  },
  {
    id: 'information-we-collect',
    title: '2. Information We Collect',
    body: [
      'We collect information you provide directly to us, such as your name, email address, phone number, and rental details when you book a golf cart or contact us.',
      'We also automatically collect certain technical information when you visit our website, including your IP address, browser type, device type, pages viewed, and usage data through cookies and similar technologies.',
    ],
  },
  {
    id: 'how-we-use',
    title: '3. How We Use Your Information',
    body: [
      'We use the information we collect to:',
    ],
    list: [
      'Process and fulfill your golf cart rental reservations',
      'Communicate with you about your booking, delivery, and pickup',
      'Respond to your inquiries and provide customer support',
      'Send promotional or marketing emails (you may opt out at any time)',
      'Improve our website, services, and customer experience',
      'Analyze website traffic and user behavior using tools like Google Analytics',
      'Comply with legal obligations and protect our rights',
    ],
  },
  {
    id: 'cookies',
    title: '4. Cookies & Tracking Technologies',
    body: [
      'We use cookies and similar tracking technologies to operate and improve our website. Cookies are small data files stored on your device that help us remember your preferences and understand how you use our site.',
      'We use Google Analytics to collect anonymous usage data. You can control cookies through your browser settings, but disabling them may affect website functionality.',
    ],
  },
  {
    id: 'sharing',
    title: '5. Sharing Your Information',
    body: [
      'We do not sell your personal information. We may share your information with:',
    ],
    list: [
      'Service providers who help us operate our business (e.g., booking platforms, payment processors)',
      'Analytics providers such as Google Analytics',
      'Legal authorities when required by law or to protect our rights',
    ],
  },
  {
    id: 'data-retention',
    title: '6. Data Retention',
    body: [
      'We retain your personal information for as long as necessary to provide our services, comply with legal obligations, resolve disputes, and enforce our agreements. When no longer needed, we securely delete or anonymize your data.',
    ],
  },
  {
    id: 'your-rights',
    title: '7. Your Privacy Rights',
    body: [
      'Depending on your location, you may have the right to access, correct, or delete your personal information, and to opt out of certain marketing communications. To exercise these rights, contact us using the details below.',
    ],
  },
  {
    id: 'security',
    title: '8. Data Security',
    body: [
      'We implement reasonable technical and organizational measures to protect your personal information. However, no method of transmission or storage is completely secure, and we cannot guarantee absolute security.',
    ],
  },
  {
    id: 'children',
    title: '9. Children\'s Privacy',
    body: [
      'Our services are not directed to children under 16, and we do not knowingly collect personal information from children. If you believe a child has provided us with information, please contact us so we can remove it.',
    ],
  },
  {
    id: 'changes',
    title: '10. Changes to This Policy',
    body: [
      'We may update this Privacy Policy from time to time. We will post the updated policy on this page and revise the "Last updated" date. We encourage you to review this page periodically.',
    ],
  },
  {
    id: 'contact',
    title: '11. Contact Us',
    body: [
      'If you have questions about this Privacy Policy or our data practices, please contact us:',
    ],
    list: [
      'Phone: 305-337-1815',
      'Email: hello@paradiserentalskw.com',
      'Location: Key West, Florida',
    ],
  },
];

export default function PrivacyPolicy() {
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
              Privacy Policy
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
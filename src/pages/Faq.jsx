import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FaqSection from '@/components/FaqSection';

export default function Faq() {
  return (
    <div className="min-h-screen bg-dune">
      <Navbar />
      <main className="pt-28">
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
}
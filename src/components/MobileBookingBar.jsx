import React from 'react';
import { FAREHARBOR_URL } from '@/lib/booking';
import { trackEvent } from '@/lib/track';

export default function MobileBookingBar() {
  return (
    <div className="fixed bottom-0 inset-x-0 z-50 md:hidden bg-brand/95 backdrop-blur-md border-t border-white/10 px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] shadow-[0_-4px_20px_rgba(0,0,0,0.3)]">
      <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
        <a
          href="tel:+13053371815"
          onClick={() => trackEvent('call_click', { location: 'mobile_booking_bar' })}
          className="flex flex-col items-center justify-center px-4 py-2.5 rounded-xl bg-white/10 text-white font-medium text-xs border border-white/10 active:scale-95 transition"
        >
          <svg className="w-5 h-5 mb-0.5 text-solar" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
          </svg>
          <span>Call Us</span>
        </a>

        <a
          href={FAREHARBOR_URL}
          target="_blank"
          rel="noreferrer"
          onClick={() => trackEvent('check_availability_click', { location: 'mobile_booking_bar' })}
          className="flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-solar text-brand font-bold text-sm tracking-wide shadow-md active:scale-[0.98] transition"
        >
          <span>Check Availability</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
          </svg>
        </a>
      </div>
    </div>
  );
}
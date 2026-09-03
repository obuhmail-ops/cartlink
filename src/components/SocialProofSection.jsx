import React from 'react';
import GoogleReviewsWidget from '@/components/GoogleReviewsWidget';

const GOOGLE_REVIEWS_URL = 'https://www.google.com/search?q=Paradise+Rentals+Key+West+Google+Reviews';

export default function SocialProofSection() {
  return (
    <section className="bg-brand px-6 pt-10 pb-10 text-dune md:px-10 md:pt-12 md:pb-12">
      <div className="mx-auto max-w-6xl">
        <h2 className="max-w-3xl font-display text-3xl uppercase leading-tight md:text-5xl">One of Key West’s Favorite Ways to Ride</h2>
        <div className="mt-12">
          <GoogleReviewsWidget />
        </div>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noreferrer" className="rounded-lg bg-solar px-6 py-3 text-center text-sm font-bold uppercase tracking-wide text-brand">Read Our Google Reviews</a>
          <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noreferrer" className="rounded-lg border border-dune/30 px-6 py-3 text-center text-sm font-bold uppercase tracking-wide text-dune">Leave a Review</a>
        </div>
      </div>
    </section>
  );
}
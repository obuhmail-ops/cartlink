import React from 'react';

const reviews = [
  { name: 'Nathan Miller', quote: 'Fantastic service and essentially brand new golf cart. Lynn, who dropped off our golf cart, was fun and super nice. Driving the golf cart was so much fun!' },
  { name: 'Mary Sanchez', quote: 'Prices were very reasonable and the customer service is excellent! The golf carts were very clean and we especially liked the fact that they were electric.' },
  { name: 'Allie Houston', quote: 'They dropped off and picked up at our condo and were great to work with.' },
  { name: 'Robert Soler', quote: 'Great service and great prices. We used the golf cart all day around Key West and had a blast!' },
];

const GOOGLE_REVIEWS_URL = 'https://www.google.com/search?q=Paradise+Rentals+Key+West+Google+Reviews';

export default function SocialProofSection() {
  return (
    <section className="bg-brand px-6 py-24 text-dune md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <h2 className="max-w-3xl font-display text-3xl uppercase leading-tight md:text-5xl">One of Key West’s Favorite Ways to Ride</h2>
          <div className="shrink-0 md:text-right">
            <p className="text-xl tracking-[0.18em] text-solar">★★★★★</p>
            <p className="mt-2 font-semibold">4.9 Google Rating</p>
            <p className="text-sm text-dune/60">272+ Customer Reviews</p>
          </div>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {reviews.map((review) => (
            <blockquote key={review.name} className="rounded-2xl border border-dune/10 bg-dune/5 p-6 md:p-8">
              <p className="tracking-[0.14em] text-solar">★★★★★</p>
              <p className="mt-4 text-lg leading-relaxed text-dune/90">“{review.quote}”</p>
              <footer className="mt-5 text-sm font-semibold text-dune/60">— {review.name}</footer>
            </blockquote>
          ))}
        </div>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noreferrer" className="rounded-lg bg-solar px-6 py-3 text-center text-sm font-bold uppercase tracking-wide text-brand">Read Our Google Reviews</a>
          <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noreferrer" className="rounded-lg border border-dune/30 px-6 py-3 text-center text-sm font-bold uppercase tracking-wide text-dune">Leave a Review</a>
        </div>
      </div>
    </section>
  );
}
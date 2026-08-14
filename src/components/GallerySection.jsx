import React from 'react';
import { Image } from '@/components/ui/image';

const BASE = 'https://media.base44.com/images/public/6a7e5db2c2620868d1046179/';

const galleryImages = [
  { src: BASE + '483bf8dfe_A6700446.jpg', alt: 'Four Paradise Rentals golf carts parked by the beach', span: 'md:col-span-2 md:row-span-2' },
  { src: BASE + '994b4db89_A6700433.jpg', alt: 'White golf cart front row leather seats', span: '' },
  { src: BASE + '870ab5d59_A6700463.jpg', alt: 'White Denago golf cart at the beach', span: '' },
  { src: BASE + 'fe7e0bdc3_A6700589.jpg', alt: 'Golf cart infotainment touchscreen', span: '' },
  { src: BASE + '06860f9d6_A6700571.jpg', alt: 'Green and orange golf carts on gravel', span: 'md:col-span-2' },
  { src: BASE + '8cb09ab6b_A6700436.jpg', alt: 'Driver side interior of white golf cart', span: '' },
  { src: BASE + '10b0cb026_A6700563.jpg', alt: 'Four golf carts in a diagonal row', span: '' },
  { src: BASE + '84d598afd_A6700476.jpg', alt: 'Denago overhead soundbar speaker', span: '' },
  { src: BASE + '0a94efb3e_DSC00726.jpg', alt: 'Lime green golf cart by the ocean', span: 'md:col-span-2' },
  { src: BASE + '0f429eb51_A6700438.jpg', alt: 'Golf cart rear seating detail', span: '' },
  { src: BASE + '216240b28_A6700592.jpg', alt: 'Golf cart GPS navigation map', span: '' },
  { src: BASE + 'd36b9813a_A6700569.jpg', alt: 'Teal and white golf carts side by side', span: '' },
  { src: BASE + '7f0f800c4_A6700596.jpg', alt: 'Golf cart side step and wheel detail', span: '' },
  { src: BASE + '5272445ab_A6700411.jpg', alt: 'Four colorful golf carts in a row', span: 'md:col-span-2' },
];

export default function GallerySection() {
  return (
    <section id="gallery" className="bg-dune px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <p className="text-moss text-sm font-semibold uppercase tracking-widest mb-3">Section 4 — Gallery</p>
        <h2 className="font-display text-3xl md:text-5xl text-brand text-balance leading-tight">
          Paradise in Motion
        </h2>
        <p className="mt-4 max-w-2xl text-brand/70">
          Snapshots from happy riders exploring Key West in style with Paradise Rentals.
        </p>
        <div className="mt-12 grid auto-rows-[200px] grid-cols-2 gap-4 md:grid-cols-4">
          {galleryImages.map((img) => (
            <div key={img.src} className={`group overflow-hidden rounded-2xl border border-brand/10 ${img.span}`}>
              <Image src={img.src} alt={img.alt} fittingType="fill" className="h-full w-full transition duration-500 group-hover:scale-105" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
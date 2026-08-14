import React from 'react';
import { Image } from '@/components/ui/image';

const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d9e?auto=format&fit=crop&w=1200&q=80', alt: 'Key West beach with golf cart', span: 'md:col-span-2 md:row-span-2' },
  { src: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80', alt: 'Couple riding a golf cart in Key West', span: '' },
  { src: 'https://images.unsplash.com/photo-1572883454113-dba948b5b2b3?auto=format&fit=crop&w=800&q=80', alt: 'Key West sunset ocean view', span: '' },
  { src: 'https://images.unsplash.com/photo-1530541930197-ff16ac917b0e?auto=format&fit=crop&w=800&q=80', alt: 'Pastel Key West houses', span: '' },
  { src: 'https://images.unsplash.com/photo-1473625247541-936b8d37b5b6?auto=format&fit=crop&w=1200&q=80', alt: 'Palm trees by the beach', span: 'md:col-span-2' },
  { src: 'https://images.unsplash.com/photo-1505881408506-4986a863a91f?auto=format&fit=crop&w=800&q=80', alt: 'Golf cart parked near the beach', span: '' },
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
            <div key={img.src} className={`overflow-hidden rounded-2xl ${img.span}`}>
              <Image src={img.src} alt={img.alt} fittingType="fill" className="h-full w-full transition duration-500 hover:scale-105" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
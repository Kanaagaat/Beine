'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Card } from '@/components/ui/Card';
import { X } from 'lucide-react';
import { galleryItems, getAllGalleryItems } from '@/data/gallery';

export default function GalleryPage() {
  const t = useTranslations('gallery');
  const [selectedImage, setSelectedImage] = useState<(typeof galleryItems)[0] | null>(null);

  const items = getAllGalleryItems();

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">
          {t('title')}
        </h1>

        {/* Gallery Grid */}
        {items.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <Card
                key={item.id}
                className="p-0 overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setSelectedImage(item)}
              >
                <img
                  src={item.imagePath}
                  alt={item.title}
                  className="w-full h-64 object-cover"
                  onError={(e) => {
                    // Fallback to placeholder if image doesn't exist
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/600x400?text=Gallery+Image';
                  }}
                />
                <div className="p-4">
                  <h3 className="font-semibold">{item.title}</h3>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-12">{t('noImages')}</p>
        )}

        {/* Lightbox */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white p-2 hover:bg-white/20 rounded"
              aria-label="Close"
            >
              <X size={32} />
            </button>
            <img
              src={selectedImage.imagePath}
              alt={selectedImage.title}
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x600?text=Gallery+Image';
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

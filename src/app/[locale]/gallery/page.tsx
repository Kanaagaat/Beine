'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Card } from '@/components/ui/Card';
import { X } from 'lucide-react';
import { galleryItems, getGalleryItemsByStyle, type GalleryStyle } from '@/data/gallery';

export default function GalleryPage() {
  const t = useTranslations('gallery');
  const [filter, setFilter] = useState<GalleryStyle>('all');
  const [selectedImage, setSelectedImage] = useState<typeof galleryItems[0] | null>(null);

  const filteredItems = getGalleryItemsByStyle(filter);

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">
          {t('title')}
        </h1>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {(['all', 'classic', 'modern', 'studio', 'outdoor'] as GalleryStyle[]).map(
            (filterType) => (
              <button
                key={filterType}
                onClick={() => setFilter(filterType)}
                className={`px-6 py-2 rounded-lg transition-colors ${
                  filter === filterType
                    ? 'bg-brand-accent text-white'
                    : 'bg-brand-surface text-brand-text hover:bg-gray-300'
                }`}
              >
                {t(`filter.${filterType}`)}
              </button>
            )
          )}
        </div>

        {/* Gallery Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <Card
                key={item.id}
                className="p-0 overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setSelectedImage(item)}
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-64 object-cover"
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
              src={selectedImage.imageUrl}
              alt={selectedImage.title}
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
      </div>
    </div>
  );
}

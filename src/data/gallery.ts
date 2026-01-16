export type GalleryStyle = 'all' | 'classic' | 'modern' | 'studio' | 'outdoor';

export interface GalleryItem {
  id: string;
  imageUrl: string;
  style: GalleryStyle;
  title: string;
}

export const galleryItems: GalleryItem[] = [
  {
    id: '1',
    imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800',
    style: 'classic',
    title: 'Иподром',
  },
  {
    id: '2',
    imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800',
    style: 'modern',
    title: 'Modern Style',
  },
  {
    id: '3',
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800',
    style: 'studio',
    title: 'Studio Style',
  },
  {
    id: '4',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    style: 'outdoor',
    title: 'Outdoor Style',
  },
  {
    id: '5',
    imageUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800',
    style: 'classic',
    title: 'Classic Portrait',
  },
  {
    id: '6',
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800',
    style: 'outdoor',
    title: 'Nature Background',
  },
];

export function getGalleryItemsByStyle(style: GalleryStyle): GalleryItem[] {
  if (style === 'all') {
    return galleryItems;
  }
  return galleryItems.filter((item) => item.style === style);
}

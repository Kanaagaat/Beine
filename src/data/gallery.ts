/**
 * Gallery Data
 * Stores paths to images from public/gallery/
 * When new images are uploaded, add their paths here
 */

export interface GalleryItem {
  id: string;
  imagePath: string;
  title: string;
}

export const galleryItems: GalleryItem[] = [
  // TODO: Update with actual images from public/gallery/ when uploaded
  // Example structure:
  { id: '1', imagePath: '/gallery/1.png', title: '' },
  { id: '2', imagePath: '/gallery/2.png', title: '' },
  { id: '3', imagePath: '/gallery/3.png', title: '' },
  { id: '4', imagePath: '/gallery/4.png', title: '' },
  { id: '5', imagePath: '/gallery/5.png', title: '' },
];

export const galleryImages = [
  '/gallery/1.png', // Add the new image path here
  // ...other images...
];

export const ruGalleryImages = [
  '/ru/gallery/1.png', // Add the new image path here
  // ...other images...
];

/**
 * Get all gallery items
 */
export function getAllGalleryItems(): GalleryItem[] {
  return galleryItems;
}

/**
 * Get gallery item by ID
 */
export function getGalleryItemById(id: string): GalleryItem | undefined {
  return galleryItems.find((item) => item.id === id);
}

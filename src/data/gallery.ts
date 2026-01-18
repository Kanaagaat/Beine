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
  // { id: '1', imagePath: '/gallery/photo1.jpg', title: 'Class Photo 1' },
  // { id: '2', imagePath: '/gallery/photo2.jpg', title: 'Class Photo 2' },
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

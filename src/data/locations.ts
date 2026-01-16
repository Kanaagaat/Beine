export interface Location {
  id: string;
  nameRu: string;
  nameKk: string;
  addressRu?: string;
  addressKk?: string;
  fee: number;
  imageUrl?: string;
  isActive: boolean;
  sortOrder: number;
}

export const locations: Location[] = [
  {
    id: '1',
    nameRu: 'Парк имени Первого Президента',
    nameKk: 'Бірінші Президент саябағы',
    addressRu: 'Алматы, проспект Аль-Фараби',
    addressKk: 'Алматы, Әл-Фараби даңғылы',
    fee: 10000,
    imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800',
    isActive: true,
    sortOrder: 1,
  },
  {
    id: '2',
    nameRu: 'Студия в центре города',
    nameKk: 'Қала орталығындағы студия',
    addressRu: 'Алматы, ул. Абая, 150',
    addressKk: 'Алматы, Абай көшесі, 150',
    fee: 5000,
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800',
    isActive: true,
    sortOrder: 2,
  },
  {
    id: '3',
    nameRu: 'Горное ущелье',
    nameKk: 'Таулы шатқал',
    addressRu: 'Алматы, Медеу',
    addressKk: 'Алматы, Медеу',
    fee: 15000,
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    isActive: true,
    sortOrder: 3,
  },
  {
    id: '4',
    nameRu: 'Парк Панфилова',
    nameKk: 'Панфилов саябағы',
    addressRu: 'Алматы, ул. Гоголя',
    addressKk: 'Алматы, Гоголь көшесі',
    fee: 8000,
    imageUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800',
    isActive: true,
    sortOrder: 4,
  },
  {
    id: '5',
    nameRu: 'Высокогорный каток Медеу',
    nameKk: 'Медеу биік таулы мұз айдыны',
    addressRu: 'Алматы, Медеу',
    addressKk: 'Алматы, Медеу',
    fee: 12000,
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800',
    isActive: true,
    sortOrder: 5,
  },
];

export function getActiveLocations(): Location[] {
  return locations.filter((loc) => loc.isActive).sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getLocationById(id: string): Location | undefined {
  return locations.find((loc) => loc.id === id);
}

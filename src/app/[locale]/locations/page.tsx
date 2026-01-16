import { getActiveLocations } from '@/data/locations';
import { LocationsList } from '@/components/locations/LocationsList';

export default function LocationsPage() {
  const locations = getActiveLocations();

  return <LocationsList locations={locations} />;
}

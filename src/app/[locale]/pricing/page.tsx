import { getActiveLocations } from '@/data/locations';
import { PricingCalculator } from '@/components/pricing/PricingCalculator';

export default function PricingPage() {
  const locations = getActiveLocations();

  return <PricingCalculator locations={locations} />;
}

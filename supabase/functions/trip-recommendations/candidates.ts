export function eligibleHotels<T extends { destination_id: string | null; price_per_night: number }>(hotels: T[], destination: string, budget: number): T[] {
  return hotels.filter((hotel) => hotel.price_per_night <= budget && (destination === "all" || hotel.destination_id === destination));
}
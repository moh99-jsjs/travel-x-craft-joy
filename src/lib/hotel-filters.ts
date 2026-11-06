export type HotelPriceFilter = "all" | "budget" | "mid" | "luxury";

export function filterHotels<T extends { name: string; location: string; price_per_night: number; rating: number | null }>(
  hotels: T[], search: string, price: HotelPriceFilter, minRating: number,
): T[] {
  const query = search.trim().toLocaleLowerCase();
  return hotels.filter((hotel) => {
    const matchesSearch = `${hotel.name} ${hotel.location}`.toLocaleLowerCase().includes(query);
    const amount = hotel.price_per_night;
    const matchesPrice = price === "all" ||
      (price === "budget" && amount < 200) ||
      (price === "mid" && amount >= 200 && amount <= 400) ||
      (price === "luxury" && amount > 400);
    return matchesSearch && matchesPrice && (hotel.rating ?? 0) >= minRating;
  });
}
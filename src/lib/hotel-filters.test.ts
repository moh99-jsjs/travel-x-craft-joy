import { describe, expect, test } from "bun:test";
import { filterHotels } from "./hotel-filters";

const hotels = [
  { name: "برج العرب دبي", location: "جميرا، دبي", price_per_night: 900, rating: 4.9 },
  { name: "Budget Hotel", location: "Paris", price_per_night: 199, rating: 4.6 },
  { name: "Boundary Hotel", location: "Tokyo", price_per_night: 200, rating: 4.7 },
  { name: "Mid Hotel", location: "Bali", price_per_night: 400, rating: 4.8 },
  { name: "Premium Hotel", location: "London", price_per_night: 1500, rating: null },
];

describe("hotel search and filters", () => {
  test("searches Arabic names and locations and ignores case and outer spaces", () => {
    expect(filterHotels(hotels, " دبي ", "all", 0)).toEqual([hotels[0]]);
    expect(filterHotels(hotels, " PARIS ", "all", 0)).toEqual([hotels[1]]);
  });
  test("all prices includes hotels above the old price cap", () => {
    expect(filterHotels(hotels, "", "all", 0)).toHaveLength(5);
  });
  test("price brackets have exact non-overlapping boundaries", () => {
    expect(filterHotels(hotels, "", "budget", 0)).toEqual([hotels[1]]);
    expect(filterHotels(hotels, "", "mid", 0)).toEqual([hotels[2], hotels[3]]);
    expect(filterHotels(hotels, "", "luxury", 0)).toEqual([hotels[0], hotels[4]]);
  });
  test("combines search, price, and inclusive minimum rating", () => {
    expect(filterHotels(hotels, "Hotel", "mid", 4.8)).toEqual([hotels[3]]);
    expect(filterHotels(hotels, "Tokyo", "budget", 0)).toEqual([]);
    expect(filterHotels(hotels, "", "all", 4.8)).toEqual([hotels[0], hotels[3]]);
  });
});
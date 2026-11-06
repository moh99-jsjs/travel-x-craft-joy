/// <reference types="node" />
import { describe, it as test } from "node:test";
import { deepStrictEqual, strictEqual } from "node:assert";
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
    deepStrictEqual(filterHotels(hotels, " دبي ", "all", 0), [hotels[0]]);
    deepStrictEqual(filterHotels(hotels, " PARIS ", "all", 0), [hotels[1]]);
  });
  test("all prices includes hotels above the old price cap", () => {
    strictEqual(filterHotels(hotels, "", "all", 0).length, 5);
  });
  test("price brackets have exact non-overlapping boundaries", () => {
    deepStrictEqual(filterHotels(hotels, "", "budget", 0), [hotels[1]]);
    deepStrictEqual(filterHotels(hotels, "", "mid", 0), [hotels[2], hotels[3]]);
    deepStrictEqual(filterHotels(hotels, "", "luxury", 0), [hotels[0], hotels[4]]);
  });
  test("combines search, price, and inclusive minimum rating", () => {
    deepStrictEqual(filterHotels(hotels, "Hotel", "mid", 4.8), [hotels[3]]);
    deepStrictEqual(filterHotels(hotels, "Tokyo", "budget", 0), []);
    deepStrictEqual(filterHotels(hotels, "", "all", 4.8), [hotels[0], hotels[3]]);
  });
});
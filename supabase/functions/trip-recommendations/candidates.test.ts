/// <reference types="node" />
import { test } from "node:test";
import { deepStrictEqual } from "node:assert";
import { eligibleHotels } from "./candidates";

test("recommendations never exceed the selected nightly budget", () => {
  const hotels = [{ destination_id: "dubai", price_per_night: 200 }, { destination_id: "dubai", price_per_night: 201 }];
  deepStrictEqual(eligibleHotels(hotels, "all", 200), [hotels[0]]);
});
test("recommendations respect selected destinations", () => {
  const hotels = [{ destination_id: "dubai", price_per_night: 100 }, { destination_id: "paris", price_per_night: 100 }];
  deepStrictEqual(eligibleHotels(hotels, "dubai", 200), [hotels[0]]);
});
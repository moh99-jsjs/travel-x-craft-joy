# Project rules

- Keep hotel search and price/rating filtering in a pure shared helper so boundary behavior can be tested independently of rendering.
- Run trip recommendation AI only in an authenticated Cloud function; restrict candidates by budget and destination before inference and resolve model IDs against the catalog afterward to prevent invented hotel data.
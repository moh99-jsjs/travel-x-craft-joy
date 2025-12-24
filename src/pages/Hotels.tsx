import { useState } from "react";
import { Star, MapPin, Wifi, Car, Coffee, Dumbbell, Waves, Utensils } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

import santoriniImg from "@/assets/destination-santorini.jpg";
import maldivesImg from "@/assets/destination-maldives.jpg";
import baliImg from "@/assets/destination-bali.jpg";
import switzerlandImg from "@/assets/destination-switzerland.jpg";

const hotels = [
  {
    id: 1,
    name: "Santorini Sunset Resort",
    location: "Oia, Santorini",
    image: santoriniImg,
    rating: 4.9,
    reviews: 1247,
    price: 299,
    amenities: ["wifi", "pool", "restaurant", "gym"],
    stars: 5,
  },
  {
    id: 2,
    name: "Maldives Paradise Villas",
    location: "North Male Atoll",
    image: maldivesImg,
    rating: 5.0,
    reviews: 892,
    price: 599,
    amenities: ["wifi", "pool", "restaurant", "spa"],
    stars: 5,
  },
  {
    id: 3,
    name: "Bali Jungle Retreat",
    location: "Ubud, Bali",
    image: baliImg,
    rating: 4.7,
    reviews: 2156,
    price: 149,
    amenities: ["wifi", "pool", "restaurant", "spa"],
    stars: 4,
  },
  {
    id: 4,
    name: "Alpine Grand Hotel",
    location: "Zermatt, Switzerland",
    image: switzerlandImg,
    rating: 4.8,
    reviews: 987,
    price: 399,
    amenities: ["wifi", "restaurant", "gym", "spa"],
    stars: 5,
  },
  {
    id: 5,
    name: "Aegean Blue Suites",
    location: "Mykonos, Greece",
    image: santoriniImg,
    rating: 4.6,
    reviews: 654,
    price: 249,
    amenities: ["wifi", "pool", "restaurant"],
    stars: 4,
  },
  {
    id: 6,
    name: "Tropical Haven Resort",
    location: "South Ari Atoll",
    image: maldivesImg,
    rating: 4.9,
    reviews: 1023,
    price: 449,
    amenities: ["wifi", "pool", "restaurant", "gym", "spa"],
    stars: 5,
  },
];

const amenityIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  wifi: Wifi,
  pool: Waves,
  restaurant: Utensils,
  gym: Dumbbell,
  spa: Coffee,
  parking: Car,
};

const Hotels = () => {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [minRating, setMinRating] = useState(0);

  const filteredHotels = hotels.filter(
    (hotel) => hotel.price >= priceRange[0] && hotel.price <= priceRange[1] && hotel.rating >= minRating
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-32 pb-16 bg-ocean-dark text-primary-foreground">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4">
            Hotels & Accommodation
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl">
            Find the perfect place to stay. From luxury resorts to cozy boutique hotels.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-card border-b border-border">
        <div className="container-custom">
          <div className="flex flex-wrap gap-6 items-center">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium">Min Rating:</span>
              <div className="flex gap-1">
                {[0, 4, 4.5, 4.8].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => setMinRating(rating)}
                    className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                      minRating === rating
                        ? "bg-ocean text-primary-foreground"
                        : "bg-secondary text-foreground hover:bg-secondary/80"
                    }`}
                  >
                    {rating === 0 ? "All" : `${rating}+`}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm font-medium">Price:</span>
              <select
                className="h-10 px-4 rounded-lg border border-border bg-background"
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === "all") setPriceRange([0, 1000]);
                  else if (value === "budget") setPriceRange([0, 200]);
                  else if (value === "mid") setPriceRange([200, 400]);
                  else if (value === "luxury") setPriceRange([400, 1000]);
                }}
              >
                <option value="all">All Prices</option>
                <option value="budget">Under $200</option>
                <option value="mid">$200 - $400</option>
                <option value="luxury">$400+</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Hotels Grid */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredHotels.map((hotel) => (
              <div
                key={hotel.id}
                className="bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-glow transition-all duration-500 group"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1">
                    {[...Array(hotel.stars)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-sunset text-sunset" />
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-1 text-muted-foreground text-sm mb-2">
                    <MapPin className="h-4 w-4" />
                    {hotel.location}
                  </div>

                  <h3 className="text-xl font-display font-semibold text-foreground group-hover:text-ocean transition-colors mb-3">
                    {hotel.name}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1 bg-ocean/10 text-ocean px-2 py-1 rounded-lg">
                      <Star className="h-4 w-4 fill-ocean" />
                      <span className="font-semibold">{hotel.rating}</span>
                    </div>
                    <span className="text-muted-foreground text-sm">({hotel.reviews} reviews)</span>
                  </div>

                  {/* Amenities */}
                  <div className="flex gap-3 mb-6">
                    {hotel.amenities.map((amenity) => {
                      const Icon = amenityIcons[amenity];
                      return Icon ? (
                        <div key={amenity} className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center" title={amenity}>
                          <Icon className="h-4 w-4 text-muted-foreground" />
                        </div>
                      ) : null;
                    })}
                  </div>

                  {/* Price & CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div>
                      <div className="text-2xl font-display font-bold text-ocean">${hotel.price}</div>
                      <span className="text-xs text-muted-foreground">per night</span>
                    </div>
                    <Button variant="hero">Book Now</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Hotels;

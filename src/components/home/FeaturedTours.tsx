import { Link } from "react-router-dom";
import { ArrowRight, Clock, Users, Star, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

import santoriniImg from "@/assets/destination-santorini.jpg";
import maldivesImg from "@/assets/destination-maldives.jpg";
import baliImg from "@/assets/destination-bali.jpg";

const tours = [
  {
    id: 1,
    name: "Greek Island Hopping Adventure",
    image: santoriniImg,
    duration: "7 Days",
    groupSize: "12 Max",
    rating: 4.9,
    reviews: 324,
    price: 1899,
    originalPrice: 2299,
    includes: ["Hotels", "Breakfast", "Transfers", "Guide"],
  },
  {
    id: 2,
    name: "Maldives Luxury Escape",
    image: maldivesImg,
    duration: "5 Days",
    groupSize: "8 Max",
    rating: 5.0,
    reviews: 189,
    price: 2499,
    originalPrice: 2999,
    includes: ["Resort", "All Meals", "Spa", "Water Sports"],
  },
  {
    id: 3,
    name: "Bali Cultural Journey",
    image: baliImg,
    duration: "10 Days",
    groupSize: "15 Max",
    rating: 4.8,
    reviews: 412,
    price: 1599,
    originalPrice: 1899,
    includes: ["Hotels", "Breakfast", "Tours", "Activities"],
  },
];

export function FeaturedTours() {
  return (
    <section className="py-24 bg-secondary/50">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-accent font-medium text-sm uppercase tracking-wider">Best Deals</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mt-2">
            Featured Tour Packages
          </h2>
          <p className="text-muted-foreground mt-4">
            Handcrafted travel experiences designed to give you the best value and unforgettable memories.
          </p>
        </div>

        {/* Tours Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {tours.map((tour, index) => (
            <div
              key={tour.id}
              className="bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-glow transition-all duration-500 group opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={tour.image}
                  alt={tour.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent" />
                
                {/* Sale Badge */}
                <div className="absolute top-4 left-4 bg-coral text-primary-foreground text-xs font-bold px-3 py-1.5 rounded-full">
                  {Math.round((1 - tour.price / tour.originalPrice) * 100)}% OFF
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Meta */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {tour.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {tour.groupSize}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-sunset text-sunset" />
                    {tour.rating} ({tour.reviews})
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-display font-semibold text-foreground group-hover:text-ocean transition-colors">
                  {tour.name}
                </h3>

                {/* Includes */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {tour.includes.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center gap-1 text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-full"
                    >
                      <Check className="h-3 w-3 text-forest" />
                      {item}
                    </span>
                  ))}
                </div>

                {/* Price & CTA */}
                <div className="flex items-center justify-between mt-6 pt-6 border-t border-border">
                  <div>
                    <span className="text-sm text-muted-foreground line-through">${tour.originalPrice}</span>
                    <div className="text-2xl font-display font-bold text-ocean">${tour.price}</div>
                    <span className="text-xs text-muted-foreground">per person</span>
                  </div>
                  <Link to={`/tours/${tour.id}`}>
                    <Button variant="hero" size="lg">
                      Book Now
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All */}
        <div className="text-center mt-12">
          <Link to="/tours">
            <Button variant="outline" size="lg" className="gap-2">
              View All Packages
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

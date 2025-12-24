import { Link } from "react-router-dom";
import { Clock, Users, Star, Check, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

import santoriniImg from "@/assets/destination-santorini.jpg";
import maldivesImg from "@/assets/destination-maldives.jpg";
import baliImg from "@/assets/destination-bali.jpg";
import switzerlandImg from "@/assets/destination-switzerland.jpg";

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
    description: "Explore the stunning Greek islands including Santorini, Mykonos, and Crete.",
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
    description: "Experience ultimate luxury in overwater villas with crystal-clear waters.",
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
    description: "Immerse yourself in Balinese culture, temples, and natural beauty.",
  },
  {
    id: 4,
    name: "Swiss Alps Expedition",
    image: switzerlandImg,
    duration: "8 Days",
    groupSize: "10 Max",
    rating: 4.9,
    reviews: 256,
    price: 2199,
    originalPrice: 2599,
    includes: ["Hotels", "Meals", "Train Pass", "Guide"],
    description: "Journey through majestic mountain peaks and charming alpine villages.",
  },
  {
    id: 5,
    name: "Mediterranean Dream",
    image: santoriniImg,
    duration: "12 Days",
    groupSize: "16 Max",
    rating: 4.7,
    reviews: 178,
    price: 2799,
    originalPrice: 3299,
    includes: ["Hotels", "Some Meals", "Transfers", "Excursions"],
    description: "Cruise the Mediterranean visiting Greece, Italy, and Croatia.",
  },
  {
    id: 6,
    name: "Tropical Paradise Getaway",
    image: maldivesImg,
    duration: "6 Days",
    groupSize: "6 Max",
    rating: 4.9,
    reviews: 145,
    price: 1899,
    originalPrice: 2299,
    includes: ["Beachfront Villa", "Breakfast", "Snorkeling", "Sunset Cruise"],
    description: "Escape to pristine beaches and turquoise lagoons in paradise.",
  },
];

const Tours = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-32 pb-16 bg-ocean-dark text-primary-foreground">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4">
            Tours & Packages
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl">
            Curated travel experiences designed for adventure, relaxation, and unforgettable memories.
          </p>
        </div>
      </section>

      {/* Tours Grid */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {tours.map((tour) => (
              <div
                key={tour.id}
                className="bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-glow transition-all duration-500 group flex flex-col md:flex-row"
              >
                {/* Image */}
                <div className="relative w-full md:w-2/5 h-56 md:h-auto overflow-hidden">
                  <img
                    src={tour.image}
                    alt={tour.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 bg-coral text-primary-foreground text-xs font-bold px-3 py-1.5 rounded-full">
                    {Math.round((1 - tour.price / tour.originalPrice) * 100)}% OFF
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-6 flex flex-col">
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

                  {/* Title & Description */}
                  <h3 className="text-xl font-display font-semibold text-foreground group-hover:text-ocean transition-colors mb-2">
                    {tour.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">{tour.description}</p>

                  {/* Includes */}
                  <div className="flex flex-wrap gap-2 mb-4">
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
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                    <div>
                      <span className="text-sm text-muted-foreground line-through">${tour.originalPrice}</span>
                      <div className="text-2xl font-display font-bold text-ocean">${tour.price}</div>
                      <span className="text-xs text-muted-foreground">per person</span>
                    </div>
                    <Link to={`/tours/${tour.id}`}>
                      <Button variant="hero" className="gap-2">
                        Book Now
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
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

export default Tours;

import { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Star, Filter, Search } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

import santoriniImg from "@/assets/destination-santorini.jpg";
import maldivesImg from "@/assets/destination-maldives.jpg";
import baliImg from "@/assets/destination-bali.jpg";
import switzerlandImg from "@/assets/destination-switzerland.jpg";

const destinations = [
  { id: 1, name: "Santorini, Greece", image: santoriniImg, rating: 4.9, reviews: 2847, price: "From $899", category: "Beach", region: "Europe" },
  { id: 2, name: "Maldives", image: maldivesImg, rating: 4.8, reviews: 3156, price: "From $1,299", category: "Luxury", region: "Asia" },
  { id: 3, name: "Bali, Indonesia", image: baliImg, rating: 4.7, reviews: 4521, price: "From $699", category: "Adventure", region: "Asia" },
  { id: 4, name: "Swiss Alps", image: switzerlandImg, rating: 4.9, reviews: 1893, price: "From $1,099", category: "Mountain", region: "Europe" },
  { id: 5, name: "Santorini Evening", image: santoriniImg, rating: 4.8, reviews: 1245, price: "From $799", category: "Beach", region: "Europe" },
  { id: 6, name: "Maldives Resort", image: maldivesImg, rating: 5.0, reviews: 892, price: "From $1,599", category: "Luxury", region: "Asia" },
];

const categories = ["All", "Beach", "Mountain", "Adventure", "Luxury", "Culture"];
const regions = ["All Regions", "Europe", "Asia", "Americas", "Africa", "Oceania"];

const Destinations = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedRegion, setSelectedRegion] = useState("All Regions");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDestinations = destinations.filter((dest) => {
    const matchesCategory = selectedCategory === "All" || dest.category === selectedCategory;
    const matchesRegion = selectedRegion === "All Regions" || dest.region === selectedRegion;
    const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesRegion && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-32 pb-16 bg-ocean-dark text-primary-foreground">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4">
            Explore Destinations
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl">
            Discover breathtaking locations around the world. From tropical beaches to majestic mountains.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-card border-b border-border sticky top-20 z-40">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full lg:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search destinations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pl-12 pr-4 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-ocean"
              />
            </div>

            {/* Categories */}
            <div className="flex gap-2 flex-wrap justify-center">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === cat
                      ? "bg-ocean text-primary-foreground"
                      : "bg-secondary text-foreground hover:bg-secondary/80"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Region Filter */}
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="h-12 px-4 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-ocean"
            >
              {regions.map((region) => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDestinations.map((destination, index) => (
              <Link
                key={`${destination.id}-${index}`}
                to={`/destinations/${destination.id}`}
                className="group relative rounded-2xl overflow-hidden aspect-[4/3] shadow-card hover:shadow-glow transition-all duration-500"
              >
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-card" />
                
                <div className="absolute top-4 left-4">
                  <span className="bg-primary-foreground/20 backdrop-blur-sm text-primary-foreground text-xs font-medium px-3 py-1.5 rounded-full">
                    {destination.category}
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-1 text-primary-foreground/80 mb-2">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{destination.name}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 fill-sunset text-sunset" />
                      <span className="text-primary-foreground font-medium">{destination.rating}</span>
                      <span className="text-primary-foreground/60 text-sm">({destination.reviews})</span>
                    </div>
                    <span className="text-primary-foreground font-semibold">{destination.price}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredDestinations.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No destinations found matching your criteria.</p>
              <Button variant="outline" className="mt-4" onClick={() => { setSelectedCategory("All"); setSelectedRegion("All Regions"); setSearchQuery(""); }}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Destinations;

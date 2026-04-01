import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Star, MapPin, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export function FeaturedDestinations() {
  const [destinations, setDestinations] = useState<Tables<"destinations">[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      const { data } = await supabase
        .from("destinations")
        .select("*")
        .eq("featured", true)
        .order("rating", { ascending: false })
        .limit(4);

      if (data) setDestinations(data);
      setLoading(false);
    };
    fetchFeatured();
  }, []);

  return (
    <section className="py-24 bg-background">
      <div className="container-custom">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <span className="text-accent font-medium text-sm uppercase tracking-wider">Explore</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mt-2">
              Popular Destinations
            </h2>
            <p className="text-muted-foreground mt-4 max-w-xl">
              Discover our most sought-after destinations, handpicked by travel experts for unforgettable experiences.
            </p>
          </div>
          <Link to="/destinations">
            <Button variant="outline" size="lg" className="gap-2">
              View All
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Destinations Grid */}
        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-ocean" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinations.map((destination, index) => (
              <Link
                key={destination.id}
                to={`/destinations/${destination.id}`}
                className="group relative rounded-2xl overflow-hidden aspect-[3/4] shadow-card hover:shadow-glow transition-all duration-500 opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <img
                  src={destination.image_url || "/placeholder.svg"}
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
                    <span className="text-sm">{destination.name}، {destination.country}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 fill-sunset text-sunset" />
                      <span className="text-primary-foreground font-medium">{destination.rating}</span>
                      <span className="text-primary-foreground/60 text-sm">({destination.reviews_count})</span>
                    </div>
                    {destination.price_from && (
                      <span className="text-primary-foreground font-semibold">
                        From ${destination.price_from}
                      </span>
                    )}
                  </div>
                </div>

                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-primary-foreground/20 backdrop-blur-sm flex items-center justify-center opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                  <ArrowRight className="h-5 w-5 text-primary-foreground" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

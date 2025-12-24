import { Search, MapPin, Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-bg.jpg";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Tropical paradise beach with crystal clear water"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-hero" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom text-center text-primary-foreground pt-20">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-full px-4 py-2 mb-8 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-sm font-medium">Over 10,000+ happy travelers</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight mb-6 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            Discover Your Next
            <span className="block text-accent">Adventure</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-12 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            Explore breathtaking destinations, book unforgettable experiences, and create memories that will last a lifetime with TravelX.
          </p>

          {/* Search Box */}
          <div className="bg-card/95 backdrop-blur-md rounded-2xl p-4 md:p-6 shadow-card max-w-4xl mx-auto opacity-0 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Destination */}
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Where to?"
                  className="w-full h-14 pl-12 pr-4 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ocean"
                />
              </div>

              {/* Date */}
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Check in - Check out"
                  className="w-full h-14 pl-12 pr-4 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ocean"
                />
              </div>

              {/* Travelers */}
              <div className="relative">
                <Users className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="2 Adults"
                  className="w-full h-14 pl-12 pr-4 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ocean"
                />
              </div>

              {/* Search Button */}
              <Button variant="hero" size="xl" className="w-full gap-2">
                <Search className="h-5 w-5" />
                Search
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-16 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            {[
              { value: "500+", label: "Destinations" },
              { value: "10K+", label: "Happy Travelers" },
              { value: "4.9", label: "Average Rating" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-display font-bold text-primary-foreground">{stat.value}</div>
                <div className="text-sm text-primary-foreground/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="w-6 h-10 rounded-full border-2 border-primary-foreground/30 flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-primary-foreground/50 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}

import { Shield, Clock, Award, HeartHandshake } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Safe & Secure",
    description: "Your safety is our priority. All our partners are verified and we offer 24/7 support during your travels.",
  },
  {
    icon: Clock,
    title: "Easy Booking",
    description: "Book your dream vacation in minutes with our simple, hassle-free booking process.",
  },
  {
    icon: Award,
    title: "Best Price Guarantee",
    description: "Find a lower price? We'll match it. Get the best deals without compromising on quality.",
  },
  {
    icon: HeartHandshake,
    title: "Expert Guides",
    description: "Our local experts craft unique experiences and share insider knowledge of every destination.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-24 bg-background">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <span className="text-accent font-medium text-sm uppercase tracking-wider">Why TravelX</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mt-2">
              Your Journey, <br />
              <span className="text-ocean">Our Expertise</span>
            </h2>
            <p className="text-muted-foreground mt-6 text-lg">
              With years of experience and a passion for travel, we create unforgettable journeys tailored to your dreams. 
              From the moment you book to the day you return home, we're with you every step of the way.
            </p>

            <div className="grid grid-cols-2 gap-6 mt-10">
              <div className="bg-secondary rounded-2xl p-6 text-center">
                <div className="text-4xl font-display font-bold text-ocean">15+</div>
                <div className="text-muted-foreground mt-1">Years Experience</div>
              </div>
              <div className="bg-secondary rounded-2xl p-6 text-center">
                <div className="text-4xl font-display font-bold text-ocean">50K+</div>
                <div className="text-muted-foreground mt-1">Happy Clients</div>
              </div>
            </div>
          </div>

          {/* Right - Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="bg-card border border-border rounded-2xl p-6 hover:shadow-card hover:border-ocean/20 transition-all duration-300 group opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 rounded-xl bg-ocean/10 flex items-center justify-center mb-4 group-hover:bg-ocean group-hover:scale-110 transition-all duration-300">
                  <feature.icon className="h-7 w-7 text-ocean group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="text-lg font-display font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

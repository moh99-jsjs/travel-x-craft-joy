import { Target, Eye, Users, Award, Globe, Heart } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

import heroImg from "@/assets/hero-bg.jpg";

const stats = [
  { value: "15+", label: "Years of Experience" },
  { value: "50K+", label: "Happy Travelers" },
  { value: "500+", label: "Destinations" },
  { value: "100+", label: "Expert Guides" },
];

const values = [
  {
    icon: Heart,
    title: "Passion for Travel",
    description: "We're travelers at heart, dedicated to sharing the magic of exploration with you.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We strive for excellence in every aspect, from planning to execution.",
  },
  {
    icon: Users,
    title: "Customer First",
    description: "Your satisfaction is our priority. We go above and beyond to exceed expectations.",
  },
  {
    icon: Globe,
    title: "Sustainability",
    description: "We're committed to responsible tourism that respects cultures and environments.",
  },
];

const team = [
  {
    name: "Sarah Mitchell",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop",
  },
  {
    name: "David Chen",
    role: "Head of Operations",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
  },
  {
    name: "Emma Rodriguez",
    role: "Lead Travel Designer",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop",
  },
  {
    name: "James Wilson",
    role: "Customer Experience",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop",
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Travel background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-ocean-dark/80" />
        </div>
        <div className="container-custom relative z-10 text-primary-foreground">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
            About TravelX
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl">
            Your trusted partner in crafting unforgettable travel experiences since 2009.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-card border-b border-border">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl md:text-5xl font-display font-bold text-ocean">{stat.value}</div>
                <div className="text-muted-foreground mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16">
            <div className="bg-card rounded-2xl p-8 md:p-12 shadow-card">
              <div className="w-16 h-16 rounded-xl bg-ocean/10 flex items-center justify-center mb-6">
                <Target className="h-8 w-8 text-ocean" />
              </div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                To make extraordinary travel experiences accessible to everyone. We believe that travel has the power to transform lives, 
                broaden perspectives, and create lasting memories. Our mission is to curate seamless, personalized journeys that exceed 
                expectations and inspire a lifetime of exploration.
              </p>
            </div>

            <div className="bg-card rounded-2xl p-8 md:p-12 shadow-card">
              <div className="w-16 h-16 rounded-xl bg-ocean/10 flex items-center justify-center mb-6">
                <Eye className="h-8 w-8 text-ocean" />
              </div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">Our Vision</h2>
              <p className="text-muted-foreground leading-relaxed">
                To become the world's most trusted travel platform, connecting adventurers with authentic experiences across the globe. 
                We envision a world where travel is sustainable, enriching, and accessible—where every journey contributes positively 
                to local communities and the environment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-secondary/50">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-accent font-medium text-sm uppercase tracking-wider">What We Stand For</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mt-2">Our Core Values</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div key={value.title} className="bg-card rounded-2xl p-6 text-center shadow-soft hover:shadow-card transition-all duration-300">
                <div className="w-14 h-14 rounded-xl bg-ocean/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-7 w-7 text-ocean" />
                </div>
                <h3 className="text-lg font-display font-semibold text-foreground mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-accent font-medium text-sm uppercase tracking-wider">Our Team</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mt-2">Meet the Experts</h2>
            <p className="text-muted-foreground mt-4">
              Passionate travel enthusiasts dedicated to making your journey unforgettable.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <div key={member.name} className="group text-center">
                <div className="relative w-48 h-48 mx-auto mb-4 rounded-2xl overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <h3 className="text-lg font-display font-semibold text-foreground">{member.name}</h3>
                <p className="text-muted-foreground text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;

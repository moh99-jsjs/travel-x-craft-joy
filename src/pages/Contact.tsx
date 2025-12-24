import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, Facebook, Instagram, Twitter } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you soon.",
    });
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-32 pb-16 bg-ocean-dark text-primary-foreground">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4">
            Contact Us
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-8">
              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-6">Get in Touch</h2>
                <p className="text-muted-foreground mb-8">
                  Ready to plan your next adventure? Our team is here to help you every step of the way.
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 bg-card rounded-xl shadow-soft">
                  <div className="w-12 h-12 rounded-lg bg-ocean/10 flex items-center justify-center shrink-0">
                    <MapPin className="h-6 w-6 text-ocean" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Our Office</h3>
                    <p className="text-muted-foreground text-sm">123 Travel Street, Adventure City, AC 12345</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-card rounded-xl shadow-soft">
                  <div className="w-12 h-12 rounded-lg bg-ocean/10 flex items-center justify-center shrink-0">
                    <Phone className="h-6 w-6 text-ocean" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Phone</h3>
                    <p className="text-muted-foreground text-sm">+1 (234) 567-8900</p>
                    <p className="text-muted-foreground text-sm">+1 (234) 567-8901</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-card rounded-xl shadow-soft">
                  <div className="w-12 h-12 rounded-lg bg-ocean/10 flex items-center justify-center shrink-0">
                    <Mail className="h-6 w-6 text-ocean" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Email</h3>
                    <p className="text-muted-foreground text-sm">hello@travelx.com</p>
                    <p className="text-muted-foreground text-sm">support@travelx.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-card rounded-xl shadow-soft">
                  <div className="w-12 h-12 rounded-lg bg-ocean/10 flex items-center justify-center shrink-0">
                    <Clock className="h-6 w-6 text-ocean" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Business Hours</h3>
                    <p className="text-muted-foreground text-sm">Mon - Fri: 9:00 AM - 6:00 PM</p>
                    <p className="text-muted-foreground text-sm">Sat: 10:00 AM - 4:00 PM</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h3 className="font-semibold text-foreground mb-4">Follow Us</h3>
                <div className="flex gap-4">
                  {[Facebook, Instagram, Twitter].map((Icon, i) => (
                    <a
                      key={i}
                      href="#"
                      className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center hover:bg-ocean hover:text-primary-foreground transition-colors"
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-2xl p-8 md:p-12 shadow-card">
                <h2 className="text-2xl font-display font-bold text-foreground mb-2">Send us a Message</h2>
                <p className="text-muted-foreground mb-8">Fill out the form below and we'll get back to you within 24 hours.</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Your Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full h-12 px-4 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-ocean"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full h-12 px-4 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-ocean"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Subject</label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full h-12 px-4 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-ocean"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Message</label>
                    <textarea
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-ocean resize-none"
                      placeholder="Tell us about your travel plans..."
                    />
                  </div>

                  <Button type="submit" variant="hero" size="xl" className="w-full gap-2">
                    <Send className="h-5 w-5" />
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;

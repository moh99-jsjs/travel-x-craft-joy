import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Newsletter() {
  return (
    <section className="py-24 bg-background">
      <div className="container-custom">
        <div className="bg-gradient-ocean rounded-3xl p-8 md:p-16 text-center text-primary-foreground relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-primary-foreground/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-foreground/5 rounded-full translate-x-1/3 translate-y-1/3" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Get Travel Inspiration & Deals
            </h2>
            <p className="text-primary-foreground/80 mb-8">
              Subscribe to our newsletter for exclusive offers, travel tips, and destination inspiration delivered straight to your inbox.
            </p>

            <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 h-14 px-6 rounded-xl bg-primary-foreground/20 border border-primary-foreground/30 text-primary-foreground placeholder:text-primary-foreground/60 focus:outline-none focus:border-primary-foreground/50 backdrop-blur-sm"
              />
              <Button variant="coral" size="xl" className="gap-2 shrink-0">
                <Send className="h-5 w-5" />
                Subscribe
              </Button>
            </form>

            <p className="text-sm text-primary-foreground/60 mt-4">
              No spam, unsubscribe anytime. By subscribing, you agree to our Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

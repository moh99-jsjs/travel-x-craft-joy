import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Star, Loader2, Calendar, Users, Hotel as HotelIcon } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

const DestinationDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [destination, setDestination] = useState<Tables<"destinations"> | null>(null);
  const [hotels, setHotels] = useState<Tables<"hotels">[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      setLoading(true);
      const [destRes, hotelsRes] = await Promise.all([
        supabase.from("destinations").select("*").eq("id", id).maybeSingle(),
        supabase.from("hotels").select("*").eq("destination_id", id),
      ]);
      if (destRes.data) setDestination(destRes.data);
      if (hotelsRes.data) setHotels(hotelsRes.data);
      setLoading(false);
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex justify-center items-center py-32">
          <Loader2 className="h-10 w-10 animate-spin text-ocean" />
        </div>
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container-custom pt-32 pb-16 text-center">
          <h1 className="text-3xl font-display font-bold mb-4">الوجهة غير موجودة</h1>
          <Button onClick={() => navigate("/destinations")}>العودة للوجهات</Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-20 h-[70vh] min-h-[500px] overflow-hidden">
        <img
          src={destination.image_url || "/placeholder.svg"}
          alt={destination.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/30" />

        <div className="relative container-custom h-full flex flex-col justify-end pb-12">
          <Link
            to="/destinations"
            className="inline-flex items-center gap-2 text-primary-foreground/90 hover:text-primary-foreground mb-6 w-fit"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>كل الوجهات</span>
          </Link>

          {destination.category && (
            <Badge className="w-fit mb-3 bg-accent text-accent-foreground">{destination.category}</Badge>
          )}
          <h1 className="text-4xl md:text-6xl font-display font-bold text-primary-foreground mb-3">
            {destination.name}
          </h1>
          <div className="flex items-center gap-4 text-primary-foreground/90 flex-wrap">
            <div className="flex items-center gap-1">
              <MapPin className="h-5 w-5" />
              <span>{destination.country}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-5 w-5 fill-sunset text-sunset" />
              <span className="font-medium">{destination.rating}</span>
              <span className="opacity-80">({destination.reviews_count} مراجعة)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container-custom grid lg:grid-cols-3 gap-10">
          {/* Main */}
          <div className="lg:col-span-2 space-y-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">عن الوجهة</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {destination.description || "وجهة استثنائية بانتظارك لاكتشافها."}
              </p>
            </div>

            {/* Hotels */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl md:text-3xl font-display font-bold">الفنادق المتاحة</h2>
                <span className="text-muted-foreground text-sm">{hotels.length} فندق</span>
              </div>

              {hotels.length === 0 ? (
                <div className="text-center py-12 border border-border rounded-2xl">
                  <HotelIcon className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">لا توجد فنادق متاحة حالياً لهذه الوجهة</p>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 gap-6">
                  {hotels.map((hotel) => (
                    <div
                      key={hotel.id}
                      className="bg-card border border-border rounded-2xl overflow-hidden shadow-card hover:shadow-glow transition-all"
                    >
                      <div className="aspect-[4/3] overflow-hidden">
                        <img
                          src={hotel.image_url || "/placeholder.svg"}
                          alt={hotel.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-5">
                        <div className="flex items-center gap-1 mb-2">
                          {Array.from({ length: hotel.stars || 5 }).map((_, i) => (
                            <Star key={i} className="h-3.5 w-3.5 fill-sunset text-sunset" />
                          ))}
                        </div>
                        <h3 className="font-display font-bold text-lg mb-1">{hotel.name}</h3>
                        <p className="text-sm text-muted-foreground mb-3 flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5" />
                          {hotel.location}
                        </p>
                        {hotel.amenities && hotel.amenities.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mb-3">
                            {hotel.amenities.slice(0, 3).map((a) => (
                              <Badge key={a} variant="secondary" className="text-xs">
                                {a}
                              </Badge>
                            ))}
                          </div>
                        )}
                        <div className="flex items-center justify-between pt-3 border-t border-border">
                          <div>
                            <span className="text-xs text-muted-foreground">من</span>
                            <p className="text-lg font-bold text-ocean">${hotel.price_per_night}</p>
                          </div>
                          <Button size="sm" variant="outline">
                            عرض التفاصيل
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar - Booking card */}
          <aside className="lg:sticky lg:top-28 h-fit">
            <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
              <div className="flex items-baseline justify-between mb-6">
                <div>
                  <span className="text-sm text-muted-foreground">يبدأ من</span>
                  <p className="text-3xl font-display font-bold text-ocean">
                    ${destination.price_from || "—"}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-sunset text-sunset" />
                  <span className="font-medium">{destination.rating}</span>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="h-4 w-4 text-ocean" />
                  <span>حجز مرن – إلغاء مجاني</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Users className="h-4 w-4 text-ocean" />
                  <span>مناسب للعائلات والأفراد</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <HotelIcon className="h-4 w-4 text-ocean" />
                  <span>{hotels.length} فندق متاح</span>
                </div>
              </div>

              <Button className="w-full bg-ocean hover:bg-ocean-dark" size="lg">
                احجز الآن
              </Button>
              <p className="text-xs text-muted-foreground text-center mt-3">
                لن يتم خصم أي مبلغ حتى تأكيد الحجز
              </p>
            </div>
          </aside>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DestinationDetails;
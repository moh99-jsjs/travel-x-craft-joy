import { useEffect, useState } from "react";
import { Star, MapPin, Wifi, Car, Coffee, Dumbbell, Waves, Utensils, Search, Loader2, RotateCcw, AlertCircle } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { filterHotels, type HotelPriceFilter } from "@/lib/hotel-filters";

const amenityIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  wifi: Wifi,
  pool: Waves,
  restaurant: Utensils,
  gym: Dumbbell,
  spa: Coffee,
  parking: Car,
  "واي فاي": Wifi,
  "مسبح": Waves,
  "مسبح خاص": Waves,
  "مسبح سطح": Waves,
  "مسابح": Waves,
  "جيم": Dumbbell,
  "سبا": Coffee,
  "مطعم": Utensils,
  "مطاعم عالمية": Utensils,
  "مطاعم متعددة": Utensils,
};

const Hotels = () => {
  const [hotels, setHotels] = useState<Tables<"hotels">[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceFilter, setPriceFilter] = useState<HotelPriceFilter>("all");
  const [minRating, setMinRating] = useState(0);
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    let active = true;
    const fetchHotels = async () => {
      setLoading(true);
      setError(false);
      try {
        const { data, error: fetchError } = await supabase.from("hotels").select("*").order("rating", { ascending: false, nullsFirst: false });
        if (!active) return;
        if (fetchError) setError(true);
        else setHotels(data ?? []);
      } catch {
        if (active) setError(true);
      } finally {
        if (active) setLoading(false);
      }
    };
    void fetchHotels();
    return () => { active = false; };
  }, [retry]);

  const filteredHotels = filterHotels(hotels, searchQuery, priceFilter, minRating);
  const clearFilters = () => { setSearchQuery(""); setPriceFilter("all"); setMinRating(0); };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero */}
      <section dir="rtl" className="pt-32 pb-16 bg-ocean-dark text-primary-foreground">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4">
            الفنادق والإقامة
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl">
            إقامات حول العالم، من المنتجعات الفاخرة إلى الفنادق المميزة.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section dir="rtl" className="py-8 bg-card border-b border-border">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-6 lg:items-end">
            <div className="flex-1 min-w-0">
              <label htmlFor="hotel-search" className="block text-sm font-medium mb-2">البحث عن فندق</label>
              <div className="relative">
                <Search aria-hidden="true" className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input id="hotel-search" placeholder="اسم الفندق أو الموقع" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} className="pr-10" />
              </div>
            </div>
            <div>
              <span className="block text-sm font-medium mb-2">الحد الأدنى للتقييم</span>
              <div className="flex flex-wrap gap-1" role="group" aria-label="الحد الأدنى للتقييم">
                {[0, 4, 4.5, 4.8].map((rating) => (
                  <Button key={rating} variant={minRating === rating ? "ocean" : "secondary"} aria-pressed={minRating === rating} onClick={() => setMinRating(rating)}>
                    {rating === 0 ? "الكل" : `${rating}+`}
                  </Button>
                ))}
              </div>
            </div>
            <div className="w-full lg:w-52">
              <label htmlFor="hotel-price" className="block text-sm font-medium mb-2">السعر لليلة</label>
              <Select dir="rtl" value={priceFilter} onValueChange={(value) => {
                if (value === "all" || value === "budget" || value === "mid" || value === "luxury") setPriceFilter(value);
              }}>
                <SelectTrigger id="hotel-price"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">كل الأسعار</SelectItem>
                  <SelectItem value="budget">أقل من 200 دولار</SelectItem>
                  <SelectItem value="mid">200–400 دولار</SelectItem>
                  <SelectItem value="luxury">أكثر من 400 دولار</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button variant="ghost" size="icon" onClick={clearFilters} title="مسح الفلاتر" aria-label="مسح الفلاتر"><RotateCcw /></Button>
          </div>
        </div>
      </section>

      {/* Hotels Grid */}
      <section dir="rtl" className="py-16">
        <div className="container-custom">
          {loading ? (
            <div role="status" className="flex items-center justify-center gap-3 py-16 text-muted-foreground"><Loader2 className="h-6 w-6 animate-spin" />جارٍ تحميل الفنادق...</div>
          ) : error ? (
            <div role="alert" className="text-center py-16">
              <AlertCircle className="h-8 w-8 text-destructive mx-auto mb-4" />
              <p className="text-muted-foreground">تعذر تحميل الفنادق. حاول مرة أخرى.</p>
              <Button variant="outline" className="mt-4" onClick={() => setRetry((value) => value + 1)}>إعادة المحاولة</Button>
            </div>
          ) : (
            <>
            <p aria-live="polite" className="text-muted-foreground mb-6">{filteredHotels.length} فندق</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredHotels.map((hotel) => (
              <div
                key={hotel.id}
                className="bg-card rounded-lg overflow-hidden shadow-card hover:shadow-glow transition-all duration-500 group"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={hotel.image_url || "/placeholder.svg"}
                    loading="lazy"
                    onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = "/placeholder.svg"; }}
                    alt={hotel.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1">
                    {[...Array(hotel.stars ?? 0)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-sunset text-sunset" />
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-1 text-muted-foreground text-sm mb-2">
                    <MapPin className="h-4 w-4" />
                    {hotel.location}
                  </div>

                  <h3 className="text-xl font-display font-semibold text-foreground group-hover:text-ocean transition-colors mb-3">
                    {hotel.name}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1 bg-ocean/10 text-ocean px-2 py-1 rounded-lg">
                      <Star className="h-4 w-4 fill-ocean" />
                      <span className="font-semibold">{hotel.rating ?? "—"}</span>
                    </div>
                    <span className="text-muted-foreground text-sm">({hotel.reviews_count ?? 0} تقييم)</span>
                  </div>

                  {/* Amenities */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {(hotel.amenities ?? []).map((amenity) => {
                      const Icon = amenityIcons[amenity];
                      return Icon ? (
                        <div key={amenity} className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center" title={amenity}>
                          <Icon className="h-4 w-4 text-muted-foreground" />
                        </div>
                      ) : <span key={amenity} className="text-xs px-2 py-1 bg-secondary rounded-md">{amenity}</span>;
                    })}
                  </div>

                  {/* Price & CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div>
                      <div className="text-2xl font-display font-bold text-ocean">${hotel.price_per_night}</div>
                      <span className="text-xs text-muted-foreground">لليلة الواحدة</span>
                    </div>
                    <Button variant="hero">احجز الآن</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {filteredHotels.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">{hotels.length === 0 ? "لا توجد فنادق متاحة حالياً." : "لا توجد فنادق تطابق البحث والفلاتر."}</p>
              {hotels.length > 0 && <Button variant="outline" className="mt-4" onClick={clearFilters}>مسح الفلاتر</Button>}
            </div>
          )}
          </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Hotels;

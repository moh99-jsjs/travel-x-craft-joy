import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Compass, Loader2, MapPin, Star, Sparkles, Waves, Mountain, Footprints, Landmark, Leaf, ShoppingBag } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import type { Tables } from "@/integrations/supabase/types";

const activities = [{ name: "شاطئ", icon: Waves }, { name: "طبيعة", icon: Mountain }, { name: "مغامرات", icon: Footprints }, { name: "ثقافة", icon: Landmark }, { name: "استرخاء", icon: Leaf }, { name: "تسوق", icon: ShoppingBag }];
type Recommendation = { hotel: Pick<Tables<"hotels">, "id" | "name" | "location" | "image_url" | "rating" | "price_per_night">; destination: Pick<Tables<"destinations">, "id" | "name" | "country" | "image_url">; reason: string; activities: string[] };

export default function ExploreTrips() {
  const { user, loading: authLoading } = useAuth();
  const [destinations, setDestinations] = useState<Tables<"destinations">[]>([]);
  const [catalogLoading, setCatalogLoading] = useState(true);
  const [catalogError, setCatalogError] = useState(false);
  const [destination, setDestination] = useState("all");
  const [budget, setBudget] = useState("300");
  const [selected, setSelected] = useState<string[]>(["طبيعة"]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [results, setResults] = useState<Recommendation[] | null>(null);
  const [resultBudget, setResultBudget] = useState(0);
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    let active = true;
    setCatalogLoading(true);
    setCatalogError(false);
    supabase.from("destinations").select("*").order("name").then(({ data, error }) => {
      if (!active) return;
      setDestinations(data ?? []);
      setCatalogError(Boolean(error));
      setCatalogLoading(false);
    });
    return () => { active = false; };
  }, [retry]);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (loading) return;
    if (!selected.length) { setError("اختر نشاطاً واحداً على الأقل."); return; }
    setLoading(true);
    setError("");
    try {
      const { data, error: requestError } = await supabase.functions.invoke("trip-recommendations", { body: { destination, budget: Number(budget), activities: selected } });
      if (requestError) {
        let message = "تعذر الحصول على الاقتراحات. حاول لاحقاً.";
        if (requestError.context instanceof Response) {
          const body = await requestError.context.json().catch(() => null);
          if (typeof body?.error === "string") message = body.error;
        }
        throw new Error(message);
      }
      if (!data || !Array.isArray(data.recommendations)) throw new Error("وصلت استجابة غير صالحة من المساعد.");
      setResults(data.recommendations);
      setResultBudget(Number(budget));
    } catch (failure) {
      setError(failure instanceof Error ? failure.message : "تعذر الحصول على الاقتراحات.");
    } finally { setLoading(false); }
  };

  return <div className="min-h-screen bg-background">
    <Navbar />
    <main dir="rtl" className="pt-32 pb-16 container-custom">
      <div className="flex items-center gap-3 text-accent mb-4"><Compass className="h-6 w-6" /><span className="font-semibold">TravelX</span></div>
      <h1 className="text-4xl md:text-5xl font-bold mb-10">استكشاف الرحلات</h1>
      <form onSubmit={submit} className="border-y border-border py-8 space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="trip-destination" className="block mb-2 font-medium">الوجهة</label>
            <Select dir="rtl" value={destination} onValueChange={setDestination} disabled={loading || catalogLoading || catalogError}>
              <SelectTrigger id="trip-destination"><SelectValue /></SelectTrigger>
              <SelectContent><SelectItem value="all">كل الوجهات</SelectItem>{destinations.map((item) => <SelectItem key={item.id} value={item.id}>{item.name}، {item.country}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="trip-budget" className="block mb-2 font-medium">ميزانية الفندق لليلة (دولار)</label>
            <Input id="trip-budget" type="number" min="1" max="100000" step="1" required value={budget} onChange={(event) => setBudget(event.target.value)} disabled={loading} />
          </div>
        </div>
        <fieldset disabled={loading}><legend className="font-medium mb-3">الأنشطة المفضلة</legend><div className="flex flex-wrap gap-2">{activities.map(({ name, icon: Icon }) => <Button key={name} type="button" variant={selected.includes(name) ? "ocean" : "outline"} aria-pressed={selected.includes(name)} onClick={() => setSelected((values) => values.includes(name) ? values.filter((value) => value !== name) : [...values, name])}><Icon />{name}</Button>)}</div></fieldset>
        {catalogError && <div role="alert" className="text-destructive">تعذر تحميل الوجهات. <Button variant="link" type="button" onClick={() => setRetry((value) => value + 1)}>إعادة المحاولة</Button></div>}
        {error && <p role="alert" className="text-destructive">{error}</p>}
        {!authLoading && !user ? <Button asChild variant="ocean"><Link to="/login">تسجيل الدخول للحصول على اقتراحات</Link></Button> : <Button type="submit" variant="ocean" disabled={loading || authLoading || catalogLoading || catalogError}>{loading ? <Loader2 className="animate-spin" /> : <Sparkles />}{loading ? "جارٍ إعداد اقتراحاتك..." : "اقترح رحلتي"}</Button>}
      </form>
      <section className="pt-10" aria-live="polite" aria-busy={loading}>
        {results === null ? <div className="grid grid-cols-2 md:grid-cols-4 gap-4">{destinations.slice(0, 4).map((item) => <Link to={`/destinations/${item.id}`} key={item.id} className="group"><img src={item.image_url || "/placeholder.svg"} alt={item.name} className="aspect-[4/3] w-full object-cover rounded-lg" loading="lazy" /><h2 className="font-semibold mt-3 group-hover:text-ocean">{item.name}</h2><p className="text-muted-foreground text-sm">{item.country}</p></Link>)}</div> : <>
          <h2 className="text-2xl font-semibold mb-2">اقتراحات رحلتك</h2>
          <p className="text-muted-foreground mb-6">حتى {resultBudget} دولار لليلة · الأسعار لا تشمل تكاليف الأنشطة</p>
          {results.length === 0 ? <p className="py-10 text-muted-foreground">لا توجد فنادق ضمن هذه الميزانية والوجهة. جرّب ميزانية أعلى أو وجهة أخرى.</p> : <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">{results.map((item) => <article key={item.hotel.id} className="bg-card rounded-lg overflow-hidden border border-border">
            <img src={item.hotel.image_url || item.destination.image_url || "/placeholder.svg"} alt={item.hotel.name} className="w-full aspect-[4/3] object-cover" onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = "/placeholder.svg"; }} />
            <div className="p-5 space-y-4">
              <div className="flex items-center gap-2 text-muted-foreground text-sm"><MapPin className="h-4 w-4 shrink-0" />{item.destination.name}، {item.destination.country}</div>
              <h3 className="text-xl font-semibold">{item.hotel.name}</h3>
              <div className="flex items-center justify-between gap-3"><span className="font-bold text-ocean">{item.hotel.price_per_night} دولار / ليلة</span><span className="flex items-center gap-1"><Star className="h-4 w-4 text-sunset" />{item.hotel.rating ?? "—"}</span></div>
              <p className="text-sm leading-7">{item.reason}</p>
              <ul className="text-sm text-muted-foreground space-y-2">{item.activities.map((activity) => <li key={activity}>• {activity}</li>)}</ul>
              <Button asChild variant="outline" className="w-full"><Link to={`/destinations/${item.destination.id}`}>تفاصيل الوجهة والفنادق</Link></Button>
            </div>
          </article>)}</div>}
        </>}
      </section>
    </main>
    <Footer />
  </div>;
}
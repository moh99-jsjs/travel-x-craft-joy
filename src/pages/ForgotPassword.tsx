import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Loader2, Mail } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const { toast } = useToast();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      toast({ title: "خطأ", description: error.message, variant: "destructive" });
    } else {
      setSent(true);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-32 pb-16 flex items-center justify-center">
        <div className="w-full max-w-md mx-auto px-4">
          <div className="bg-card rounded-2xl shadow-card p-8">
            {sent ? (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                  <Mail className="h-8 w-8 text-accent" />
                </div>
                <h1 className="text-2xl font-display font-bold text-foreground">تحقق من بريدك</h1>
                <p className="text-muted-foreground">تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني</p>
                <Link to="/login">
                  <Button variant="outline" className="gap-2 mt-4">
                    <ArrowLeft className="h-4 w-4" />
                    العودة لتسجيل الدخول
                  </Button>
                </Link>
              </div>
            ) : (
              <>
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-display font-bold text-foreground">نسيت كلمة المرور</h1>
                  <p className="text-muted-foreground mt-2">أدخل بريدك الإلكتروني لإعادة تعيين كلمة المرور</p>
                </div>
                <form onSubmit={handleReset} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="email">البريد الإلكتروني</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="example@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      dir="ltr"
                    />
                  </div>
                  <Button type="submit" className="w-full" size="lg" disabled={loading}>
                    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "إرسال رابط إعادة التعيين"}
                  </Button>
                </form>
                <p className="text-center text-muted-foreground mt-6">
                  <Link to="/login" className="text-accent font-medium hover:text-accent/80 transition-colors gap-1 inline-flex items-center">
                    <ArrowLeft className="h-4 w-4" />
                    العودة لتسجيل الدخول
                  </Link>
                </p>
              </>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ForgotPassword;

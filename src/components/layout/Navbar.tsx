import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Plane, LogIn, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Destinations", href: "/destinations" },
  { name: "Tours", href: "/tours" },
  { name: "Hotels", href: "/hotels" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled || !isHome
          ? "bg-card/95 backdrop-blur-md shadow-soft"
          : "bg-transparent"
      )}
    >
      <nav className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className={cn(
              "p-2 rounded-xl transition-all duration-300",
              isScrolled || !isHome
                ? "bg-ocean text-primary-foreground"
                : "bg-primary-foreground/20 backdrop-blur-sm text-primary-foreground"
            )}>
              <Plane className="h-6 w-6" />
            </div>
            <span className={cn(
              "text-2xl font-display font-bold transition-colors duration-300",
              isScrolled || !isHome ? "text-foreground" : "text-primary-foreground"
            )}>
              TravelX
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={cn(
                  "text-sm font-medium transition-all duration-300 relative group",
                  isScrolled || !isHome
                    ? "text-foreground hover:text-ocean"
                    : "text-primary-foreground/90 hover:text-primary-foreground",
                  location.pathname === link.href && "font-semibold"
                )}
              >
                {link.name}
                <span className={cn(
                  "absolute -bottom-1 left-0 h-0.5 bg-current transition-all duration-300",
                  location.pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                )} />
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <>
                <span className={cn(
                  "text-sm font-medium flex items-center gap-1",
                  isScrolled || !isHome ? "text-foreground" : "text-primary-foreground"
                )}>
                  <User className="h-4 w-4" />
                  {user.user_metadata?.full_name || user.email?.split("@")[0]}
                </span>
                <Button
                  variant={isScrolled || !isHome ? "outline" : "heroOutline"}
                  size="sm"
                  onClick={signOut}
                  className="gap-1"
                >
                  <LogOut className="h-4 w-4" />
                  خروج
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button
                    variant={isScrolled || !isHome ? "outline" : "heroOutline"}
                    size="sm"
                    className="gap-1"
                  >
                    <LogIn className="h-4 w-4" />
                    دخول
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button variant="hero" size="sm">
                    إنشاء حساب
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={cn(
              "lg:hidden p-2 rounded-lg transition-colors",
              isScrolled || !isHome
                ? "text-foreground hover:bg-secondary"
                : "text-primary-foreground hover:bg-primary-foreground/20"
            )}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={cn(
          "lg:hidden overflow-hidden transition-all duration-300",
          isMobileMenuOpen ? "max-h-[500px] pb-6" : "max-h-0"
        )}>
          <div className="flex flex-col gap-4 pt-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "text-base font-medium py-2 transition-colors",
                  isScrolled || !isHome
                    ? "text-foreground hover:text-ocean"
                    : "text-primary-foreground hover:text-primary-foreground/80"
                )}
              >
                {link.name}
              </Link>
            ))}
            {user ? (
              <Button variant="hero" size="lg" className="mt-4 gap-2" onClick={() => { signOut(); setIsMobileMenuOpen(false); }}>
                <LogOut className="h-4 w-4" />
                تسجيل الخروج
              </Button>
            ) : (
              <div className="flex flex-col gap-2 mt-4">
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="outline" size="lg" className="w-full gap-2">
                    <LogIn className="h-4 w-4" />
                    تسجيل الدخول
                  </Button>
                </Link>
                <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="hero" size="lg" className="w-full">
                    إنشاء حساب
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

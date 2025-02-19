import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "./theme-toggle";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";

export default function Navigation() {
  const [location] = useLocation();
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/submit-claim", label: "Submit Claim" },
    { href: "/claims", label: "My Claims" },
  ];

  const MobileMenu = () => (
    <div
      className={cn(
        "fixed inset-y-0 right-0 w-64 bg-background border-l transform transition-transform duration-200 ease-in-out z-50",
        isMenuOpen ? "translate-x-0" : "translate-x-full"
      )}
    >
      <div className="p-4">
        <div className="flex justify-between items-center mb-6">
          <span className="font-bold text-xl">Menu</span>
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        <div className="flex flex-col space-y-4">
          {navItems.map(item => (
            <Link key={item.href} href={item.href}>
              <a
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  "px-4 py-2 rounded-md text-sm font-medium block",
                  location === item.href
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                {item.label}
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="font-bold text-xl">Claims Tracker</div>

          {isMobile ? (
            <>
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(true)}>
                  <Menu className="h-6 w-6" />
                </Button>
              </div>
              {isMenuOpen && (
                <div
                  className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
                  onClick={() => setIsMenuOpen(false)}
                />
              )}
              <MobileMenu />
            </>
          ) : (
            <div className="flex items-center gap-8">
              <div className="flex space-x-4">
                {navItems.map(item => (
                  <Link key={item.href} href={item.href}>
                    <a className={cn(
                      "px-3 py-2 rounded-md text-sm font-medium",
                      location === item.href
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    )}>
                      {item.label}
                    </a>
                  </Link>
                ))}
              </div>
              <ThemeToggle />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
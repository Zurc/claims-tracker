import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";

export default function Navigation() {
  const [location] = useLocation();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/submit-claim", label: "Submit Claim" },
    { href: "/claims", label: "My Claims" },
  ];

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center">
          <div className="font-bold text-xl mr-8">Claims Tracker</div>
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
        </div>
      </div>
    </nav>
  );
}

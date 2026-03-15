"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, UtensilsCrossed, ShoppingBag, User } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "HOME", icon: Home, href: "/" },
  { label: "MENU", icon: UtensilsCrossed, href: "/menu" },
  { label: "CART", icon: ShoppingBag, href: "/cart" },
  { label: "PROFILE", icon: User, href: "/profile" },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-t border-primary/5 pb-safe">
      <div className="flex items-center justify-around h-20 px-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center space-y-1 transition-all duration-200",
                isActive ? "text-accent scale-110" : "text-muted hover:text-primary"
              )}
            >
              <Icon className={cn("w-6 h-6", isActive && "fill-current")} />
              <span className="text-[10px] font-bold tracking-wider">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

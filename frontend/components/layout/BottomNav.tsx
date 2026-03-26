"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, UtensilsCrossed, ShoppingBag, User, CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/lib/cartContext";

const navItems = [
  { label: "HOME", icon: Home, href: "/" },
  { label: "MENU", icon: UtensilsCrossed, href: "/menu" },
  { label: "CART", icon: ShoppingBag, href: "/cart" },
  { label: "RESERVE", icon: CalendarDays, href: "/reservations" },
  { label: "PROFILE", icon: User, href: "/profile" },
];

export function BottomNav() {
  const pathname = usePathname();
  const { cartCount: globalCartCount } = useCart();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Use a local count that stays 0 until mounted to match server output exactly
  const displayCartCount = isMounted ? globalCartCount : 0;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-t border-primary/5 pb-safe">
      <div className="flex items-center justify-around h-20 px-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          const isCart = item.label === "CART";

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center space-y-1 transition-all duration-200",
                isActive ? "text-accent scale-110" : "text-muted hover:text-primary"
              )}
            >
              <div className="relative">
                <Icon className={cn("w-6 h-6", isActive && "fill-current")} />
                {isCart && displayCartCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-accent text-white text-[9px] font-black rounded-full flex items-center justify-center">
                    {displayCartCount > 9 ? "9+" : displayCartCount}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-bold tracking-wider">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}


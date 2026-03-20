"use client";

import Link from "next/link";
import { MobileNav } from "@/components/layout/MobileNav";
import { useCart } from "@/lib/cartContext";
import {
  ChevronRight,
  ClipboardList,
  Heart,
  MapPin,
  CreditCard,
  Settings,
  LogOut,
  Star,
  ShoppingBag,
  Award,
  MessageSquare,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const menuLinks = [
  { label: "My Orders", icon: ClipboardList, href: "/profile/orders", badge: null },
  { label: "Saved Dishes", icon: Heart, href: "#", badge: null },
  { label: "Delivery Addresses", icon: MapPin, href: "#", badge: null },
  { label: "Payment Methods", icon: CreditCard, href: "#", badge: null },
  { label: "About REFINED", icon: Award, href: "/about", badge: null },
  { label: "Get in Touch", icon: MessageSquare, href: "/contact", badge: null },
  { label: "Settings", icon: Settings, href: "#", badge: null },
];

export default function ProfilePage() {
  const router = useRouter();
  const { cartCount } = useCart();
  const [user, setUser] = useState<{ name: string; email: string; initials: string; memberSince: string } | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("refined_user");
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser({
        name: parsedUser.name || "Adesua Etomi",
        email: parsedUser.email || "adesua@example.com",
        initials: parsedUser.initials || "AE",
        memberSince: "March 2026",
      });
    } else {
      // Fallback for demo
      setUser({
        name: "Adesua Etomi",
        email: "adesua@example.com",
        initials: "AE",
        memberSince: "March 2026",
      });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("refined_user");
    router.push("/login");
  };

  const displayUser = user || {
    name: "Loading...",
    email: "...",
    initials: "?",
    memberSince: "...",
  };

  const stats = [
    { label: "Orders", value: "12", icon: ShoppingBag },
    { label: "Saved", value: "8", icon: Heart },
    { label: "Points", value: "320", icon: Award },
  ];


  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header banner */}
      <div className="bg-[#1B3C35] pt-14 pb-20 px-8 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-background rounded-t-[40px]" />
        <div className="relative z-10 flex items-center space-x-5">
          <div className="h-[72px] w-[72px] rounded-[24px] bg-accent/20 border-2 border-accent/30 flex items-center justify-center text-2xl font-black text-accent">
            {displayUser.initials}
          </div>
          <div>
            <p className="text-white/40 text-[10px] font-black tracking-[0.2em] uppercase">Member since {displayUser.memberSince}</p>
            <h1 className="text-2xl font-serif font-black italic text-white">{displayUser.name}</h1>
            <p className="text-white/50 text-xs font-medium mt-0.5">{displayUser.email}</p>
          </div>
        </div>
      </div>

      <main className="px-6 -mt-4">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {stats.map((s) => (
            <div key={s.label} className="bg-white rounded-3xl p-4 shadow-sm border border-primary/5 flex flex-col items-center">
              <s.icon className="h-5 w-5 text-accent mb-2" />
              <p className="text-2xl font-black italic text-primary">{s.value}</p>
              <p className="text-[10px] font-black tracking-widest text-muted uppercase mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
        
        {/* Loyalty card */}
        <div className="bg-[#1B3C35] rounded-[28px] p-6 mb-8 relative overflow-hidden shadow-xl shadow-primary/10">
          <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-accent/10 blur-2xl" />
          <div className="flex items-center justify-between relative z-10">
            <div>
              <p className="text-white/40 text-[10px] font-black tracking-widest uppercase mb-1">Loyalty Points</p>
              <p className="text-4xl font-black italic text-white">320 pts</p>
              <p className="text-white/40 text-xs mt-1 font-medium">180 pts to your next reward</p>
            </div>
            <div className="h-16 w-16 rounded-2xl bg-accent/20 flex items-center justify-center">
              <Star className="h-8 w-8 text-accent fill-current" />
            </div>
          </div>
          <div className="mt-5 bg-white/10 rounded-full h-2 relative z-10">
            <div className="bg-accent h-2 rounded-full" style={{ width: "64%" }} />
          </div>
        </div>

        {/* Menu links */}
        <div className="bg-white rounded-[28px] overflow-hidden shadow-sm border border-primary/5 divide-y divide-primary/5">
          {menuLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="flex items-center justify-between px-6 py-4 hover:bg-primary/5 transition-colors group"
            >
              <div className="flex items-center space-x-4">
                <div className="h-10 w-10 rounded-xl bg-primary/5 flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                  <link.icon className="h-5 w-5 text-primary group-hover:text-accent transition-colors" />
                </div>
                <span className="font-bold text-primary text-sm">{link.label}</span>
              </div>
              <ChevronRight className="h-5 w-5 text-muted group-hover:text-accent transition-colors" />
            </Link>
          ))}
        </div>

        {/* Logout */}
        <button 
          onClick={handleLogout}
          className="w-full mt-4 flex items-center justify-between px-6 py-4 bg-white rounded-[28px] shadow-sm border border-rose-100 hover:bg-rose-50 transition-colors group"
        >
          <div className="flex items-center space-x-4">
            <div className="h-10 w-10 rounded-xl bg-rose-50 flex items-center justify-center">
              <LogOut className="h-5 w-5 text-rose-500" />
            </div>
            <span className="font-bold text-rose-500 text-sm">Sign Out</span>
          </div>
          <ChevronRight className="h-5 w-5 text-rose-300" />
        </button>
      </main>

      <MobileNav />
    </div>
  );
}


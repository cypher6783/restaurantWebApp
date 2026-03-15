"use client";

import { Header } from "@/components/layout/Header";
import { MobileNav } from "@/components/layout/MobileNav";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Search, Filter, Star, Clock, Flame } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const categories = ["All", "Main Course", "Traditional", "Seafood", "Desserts"];

const dishes = [
  {
    id: "smokey-jollof",
    name: "Smokey Jollof Rice",
    price: "₦7,500",
    rating: "4.9",
    time: "25-30 mins",
    category: "Main Course",
    image: "https://images.unsplash.com/photo-1565551381335-5026915e8b4e?q=80&w=1000&auto=format&fit=crop",
    special: "CHEF'S SPECIAL"
  },
  {
    id: "peppered-snail",
    name: "Peppered Snail",
    price: "₦8,500",
    rating: "4.8",
    time: "15-20 mins",
    category: "Traditional",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "egusi-soup",
    name: "Egusi Soup & Pounded Yam",
    price: "₦9,000",
    rating: "5.0",
    time: "30-35 mins",
    category: "Traditional",
    image: "https://images.unsplash.com/photo-1628192423986-f49553f1dcb4?q=80&w=1000&auto=format&fit=crop",
  }
];

export default function MenuPage() {
  return (
    <div className="min-h-screen bg-background pb-32">
      <Header title="Our Selection" rightAction="notifications" />
      
      <main className="px-6 py-6">
        <section className="mb-8">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted group-focus-within:text-accent transition-colors" />
            <input 
              type="text" 
              placeholder="Discover your next feast..." 
              className="w-full h-14 pl-12 pr-4 bg-white rounded-2xl border-none shadow-sm focus:ring-2 focus:ring-accent transition-all text-sm font-medium"
            />
          </div>
        </section>

        <section className="mb-10 overflow-x-auto no-scrollbar -mx-6 px-6">
          <div className="flex space-x-3">
            {categories.map((cat, i) => (
              <button 
                key={cat}
                className={cn(
                  "px-6 py-3 rounded-full text-xs font-bold tracking-widest whitespace-nowrap transition-all",
                  i === 0 ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-white text-primary hover:bg-primary/5"
                )}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>
        </section>

        <section className="space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-serif font-bold text-primary italic">Featured Cuisines</h2>
            <button className="p-2 bg-white rounded-xl shadow-sm text-primary group hover:bg-primary hover:text-white transition-all">
              <Filter className="h-5 w-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {dishes.map((dish) => (
              <Link key={dish.id} href={`/dish/${dish.id}`}>
                <Card className="group overflow-hidden border-none p-0 relative bg-white">
                  <div className="relative h-64 w-full overflow-hidden">
                    {/* Placeholder for images - using colorful div since actual images might be slow to load */}
                    <div className="absolute inset-0 bg-primary/10 animate-pulse" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                    
                    {dish.special && (
                      <div className="absolute top-4 left-4 z-20">
                        <Badge className="bg-accent text-white border-none py-1.5 px-3 rounded-lg flex items-center space-x-1">
                          <Flame className="h-3 w-3 fill-current" />
                          <span className="text-[10px] font-black tracking-widest">{dish.special}</span>
                        </Badge>
                      </div>
                    )}

                    <div className="absolute top-4 right-4 z-20">
                      <button className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-accent transition-all shadow-lg">
                        <Star className="h-5 w-5" />
                      </button>
                    </div>

                    <div className="absolute bottom-6 left-6 right-6 z-20 text-white">
                      <div className="flex justify-between items-end">
                        <div>
                          <h3 className="text-2xl font-serif font-black italic tracking-tight">{dish.name}</h3>
                          <div className="flex items-center space-x-3 mt-2">
                            <div className="flex items-center space-x-1">
                              <Star className="h-3 w-3 text-accent fill-current" />
                              <span className="text-[10px] font-bold">{dish.rating}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-3 w-3 text-white/60" />
                              <span className="text-[10px] font-bold text-white/60">{dish.time}</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-2xl font-black italic">{dish.price}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <MobileNav />
    </div>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

"use client";

import { Header } from "@/components/layout/Header";
import { MobileNav } from "@/components/layout/MobileNav";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Search, Filter, Star, Clock, Flame, Utensils, Heart, ShoppingBag, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useMemo, useCallback, useEffect } from "react";
import { useCart } from "@/lib/cartContext";
import { cn } from "@/lib/utils";

const categories = ["All", "Main Course", "Traditional", "Seafood", "Desserts"];
export default function MenuPage() {
  const [dishes, setDishes] = useState<any[]>([]);
  const [loadingDishes, setLoadingDishes] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const { addToCart } = useCart();
  const [addedId, setAddedId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDishes() {
      try {
        const res = await fetch("/api/dishes");
        const data = await res.json();
        setDishes(data);
      } catch (error) {
        console.error("Failed to fetch dishes:", error);
      } finally {
        setLoadingDishes(false);
      }
    }
    fetchDishes();
  }, []);

  const handleAddToCart = useCallback((dish: any) => {
    const numericPrice = parseInt(dish.price.replace(/[^\d]/g, ""), 10);
    addToCart({
      id: dish.id,
      name: dish.name,
      price: numericPrice,
      image: dish.image,
      category: dish.category,
    });
    
    setAddedId(dish.id);
    setTimeout(() => setAddedId(null), 1500);
  }, [addToCart]);

  const filteredDishes = useMemo(() => {
    return dishes.filter((dish) => {
      const matchesSearch = dish.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === "All" || dish.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-14 pl-12 pr-4 bg-white rounded-2xl border-none shadow-sm focus:ring-2 focus:ring-accent transition-all text-sm font-medium"
            />
          </div>
        </section>

        <section className="mb-10 overflow-x-auto no-scrollbar -mx-6 px-6">
          <div className="flex space-x-3">
            {categories.map((cat) => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-6 py-3 rounded-full text-xs font-bold tracking-widest whitespace-nowrap transition-all",
                  activeCategory === cat ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-white text-primary hover:bg-primary/5"
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

          {loadingDishes ? (
            <div className="flex space-x-6 overflow-x-auto no-scrollbar -mx-6 px-6 pb-12">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex-shrink-0 w-[244px] animate-pulse">
                  <div className="bg-white rounded-[44px] h-[450px] p-5">
                    <div className="aspect-square w-full rounded-[32px] bg-gray-100 mb-5" />
                    <div className="h-6 w-3/4 bg-gray-100 rounded-full mb-4" />
                    <div className="space-y-2">
                      <div className="h-3 w-full bg-gray-50 rounded-full" />
                      <div className="h-3 w-1/2 bg-gray-50 rounded-full" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredDishes.length > 0 ? (
            <div className="flex space-x-6 overflow-x-auto no-scrollbar -mx-6 px-6 pb-12 snap-x">
              {filteredDishes.map((dish) => {
                const isAdded = addedId === dish.id;
                return (
                  <div key={dish.id} className="flex-shrink-0 w-[244px] snap-start">
                    <Card className="h-full bg-white rounded-[44px] p-5 shadow-sm border-none flex flex-col group relative">
                      <Link href={`/dish/${dish.id}`} className="relative aspect-square w-full rounded-[32px] overflow-hidden mb-5 block">
                        <Image 
                          src={dish.image}
                          alt={dish.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          sizes="204px"
                        />
                      </Link>
                      
                      <div className="flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-1">
                          <Link href={`/dish/${dish.id}`}>
                            <h3 className="text-base font-black tracking-tight text-primary leading-tight uppercase hover:text-accent transition-colors">
                              {dish.name}
                            </h3>
                          </Link>
                          <button className="text-gray-300 hover:text-accent transition-colors flex-shrink-0 pt-1">
                            <Heart className="h-5 w-5" />
                          </button>
                        </div>
                        
                        <div className="flex items-center space-x-0.5 mb-3">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-2.5 w-2.5 ${i < Math.floor(Number(dish.rating)) ? "text-amber-400 fill-current" : "text-gray-200"}`} 
                            />
                          ))}
                          <span className="text-[10px] font-bold text-gray-400 ml-1">({dish.reviews})</span>
                        </div>

                        <p className="text-[11px] text-gray-500 font-medium leading-relaxed mb-6 line-clamp-2">
                          {dish.description}
                        </p>

                        <div className="mt-auto space-y-4">
                          <p className="text-2xl font-black text-[#1B3C35] italic">
                            {dish.price}{dish.price.includes('.') ? '' : '.00'}
                          </p>
                          <button 
                            onClick={() => handleAddToCart(dish)}
                            className={cn(
                              "w-full h-12 rounded-2xl flex items-center justify-center space-x-2 text-white shadow-lg transition-all text-[10px] font-black tracking-widest uppercase",
                              isAdded 
                                ? "bg-emerald-500 shadow-emerald-500/20 scale-95" 
                                : "bg-[#008148] shadow-[#008148]/20 hover:scale-[1.02] active:scale-95"
                            )}
                          >
                            {isAdded ? (
                              <>
                                <CheckCircle2 className="h-4 w-4" />
                                <span>ADDED!</span>
                              </>
                            ) : (
                              <>
                                <ShoppingBag className="h-4 w-4" />
                                <span>SELECT DISH</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </Card>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="h-20 w-20 bg-primary/5 rounded-full flex items-center justify-center mb-6">
                <Utensils className="h-10 w-10 text-primary/20" />
              </div>
              <h3 className="text-xl font-serif font-bold text-primary mb-2 italic">A Culinary Mystery</h3>
              <p className="text-muted text-sm font-medium max-w-[240px] leading-relaxed">
                We couldn&apos;t find any dishes matching your refinement. Try another category or search.
              </p>
              <button 
                onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
                className="mt-6 text-accent font-black text-[10px] tracking-widest uppercase hover:underline"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </section>
      </main>

      <MobileNav />
    </div>
  );
}



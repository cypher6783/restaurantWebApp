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
import { cn, formatCurrency } from "@/lib/utils";
import { menuApi } from "@/lib/api";

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
      setLoadingDishes(true);
      try {
        const categoryParam = activeCategory === "All" ? undefined : activeCategory;
        const response = await menuApi.getAll(categoryParam);
        setDishes(response.data);
      } catch (error) {
        console.error("Failed to fetch dishes:", error);
      } finally {
        setLoadingDishes(false);
      }
    }
    fetchDishes();
  }, [activeCategory]);

  const handleAddToCart = useCallback((dish: any) => {
    // If price is a string like "₦5,000", convert to number. If it's already a number, use it.
    const priceValue = typeof dish.price === 'string' 
      ? parseInt(dish.price.replace(/[^\d]/g, ""), 10) 
      : dish.price;

    addToCart({
      id: dish.id,
      name: dish.name,
      price: priceValue,
      image: dish.imageUrl || dish.image,
      category: dish.category,
    });
    
    setAddedId(dish.id);
    setTimeout(() => setAddedId(null), 1500);
  }, [addToCart]);

  const filteredDishes = useMemo(() => {
    return dishes.filter((dish) => {
      const matchesSearch = dish.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    });
  }, [searchQuery, dishes]);

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
                  activeCategory === cat ? "bg-primary text-white shadow-xl shadow-primary/30 scale-105" : "bg-white text-primary hover:bg-primary/5 hover:scale-105"
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
            {loadingDishes ? (
              <div className="text-center py-20 font-serif italic text-muted animate-pulse">Aroma is building...</div>
            ) : filteredDishes.length === 0 ? (
              <div className="text-center py-20 font-serif italic text-muted">
                {searchQuery ? "No delicacies found matching your search." : "No delicacies found in this category."}
              </div>
            ) : filteredDishes.map((dish) => {
              const isAdded = addedId === dish.id;
              return (
                <Card key={dish.id} className="group overflow-hidden border-none p-0 relative bg-white transition-all hover:shadow-2xl hover:shadow-primary/10">
                  <Link href={`/dish/${dish.id}`} className="relative h-64 w-full overflow-hidden block">
                    <img 
                      src={dish.imageUrl || dish.image || "https://images.unsplash.com/photo-1565551381335-5026915e8b4e"} 
                      alt={dish.name}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                    
                    {dish.isSpecial && (
                      <div className="absolute top-4 left-4 z-20">
                        <Badge variant="neutral" className="bg-accent text-white border-none py-1.5 px-3 rounded-lg flex items-center space-x-1">
                          <Flame className="h-3 w-3 fill-current" />
                          <span className="text-[10px] font-black tracking-widest leading-none">CHEF'S SPECIAL</span>
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
                              <span className="text-[10px] font-bold">{dish.rating || "4.9"}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-3 w-3 text-white/60" />
                              <span className="text-[10px] font-bold text-white/60">{dish.prepTime || "25 mins"}</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-2xl font-black italic">{formatCurrency(dish.price)}</p>
                      </div>
                    </div>
                  </Link>
                  
                  <div className="p-4 border-t border-primary/5 flex justify-between items-center bg-gray-50/50">
                    <p className="text-[11px] text-muted font-medium line-clamp-1 flex-1 pr-4">
                      {dish.description}
                    </p>
                    <button 
                      onClick={() => handleAddToCart(dish)}
                      className={cn(
                        "h-10 px-6 rounded-xl flex items-center justify-center space-x-2 text-white shadow-lg transition-all text-[10px] font-black tracking-widest uppercase flex-shrink-0",
                        isAdded 
                          ? "bg-emerald-500 shadow-emerald-500/20 scale-95" 
                          : "bg-primary shadow-primary/20 hover:scale-[1.05] active:scale-95"
                      )}
                    >
                      {isAdded ? (
                        <>
                          <CheckCircle2 className="h-3 w-3" />
                          <span>ADDED!</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="h-3 w-3" />
                          <span>SELECT</span>
                        </>
                      )}
                    </button>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>
      </main>

      <MobileNav />
    </div>
  );
}

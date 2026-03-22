"use client";

import { Header } from "@/components/layout/Header";
import { MobileNav } from "@/components/layout/MobileNav";
import { Search, Star, Clock, Flame, ShoppingBag, CheckCircle2, Heart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { useCart } from "@/lib/cartContext";
import { cn, formatCurrency } from "@/lib/utils";
import { menuApi, userApi } from "@/lib/api";

const categories = ["All", "Main Course", "Traditional", "Seafood", "Desserts"];

// ── Skeleton card shown while dishes are loading ──────────────────────────────
function DishSkeleton() {
  return (
    <div className="min-w-[320px] max-w-[320px] bg-white rounded-[40px] border border-black/5 flex flex-col p-5 animate-pulse">
      <div className="h-72 w-full rounded-[32px] bg-gray-200 mb-6" />
      <div className="h-6 w-3/4 bg-gray-200 rounded-full mb-3" />
      <div className="h-4 w-1/2 bg-gray-100 rounded-full mb-6" />
      <div className="flex justify-between items-center mt-auto">
        <div className="h-7 w-24 bg-gray-200 rounded-full" />
        <div className="h-12 w-12 rounded-2xl bg-gray-200" />
      </div>
    </div>
  );
}
// ──────────────────────────────────────────────────────────────────────────────

export default function MenuPage() {
  const [dishes, setDishes] = useState<any[]>([]);
  const [loadingDishes, setLoadingDishes] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const { addToCart } = useCart();
  const [addedId, setAddedId] = useState<string | null>(null);
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
  const [favLoadingId, setFavLoadingId] = useState<string | null>(null);

  // Debounce the search query by 300 ms
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(searchQuery), 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

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

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const res = await userApi.getFavorites();
        const ids = new Set<string>(res.data.map((f: any) => f.menuItem?.id || f.menuItemId));
        setFavoriteIds(ids);
      } catch {} // silently fail if user is not logged in
    };
    loadFavorites();
  }, []);

  const handleToggleFavorite = useCallback(async (dishId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (favLoadingId === dishId) return;
    setFavLoadingId(dishId);
    try {
      await userApi.toggleFavorite(dishId);
      setFavoriteIds(prev => {
        const next = new Set(prev);
        if (next.has(dishId)) next.delete(dishId);
        else next.add(dishId);
        return next;
      });
    } catch (err) {
      console.error("Failed to toggle favorite", err);
    } finally {
      setFavLoadingId(null);
    }
  }, [favLoadingId]);

  const handleAddToCart = useCallback((dish: any) => {
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
      const matchesSearch = dish.name.toLowerCase().includes(debouncedQuery.toLowerCase());
      return matchesSearch;
    });
  }, [debouncedQuery, dishes]);

  return (
    <div className="min-h-screen bg-background pb-32">
      <Header title="Our Selection" rightAction="notifications" />
      
      <main className="py-6">
        {/* Search */}
        <section className="px-6 mb-8">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Discover your next feast..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-14 pl-12 pr-4 bg-white rounded-2xl border-none shadow-sm focus:ring-2 focus:ring-primary transition-all text-sm font-medium"
            />
          </div>
        </section>

        {/* Categories */}
        <section className="mb-10 overflow-x-auto no-scrollbar px-6">
          <div className="flex space-x-3">
            {categories.map((cat) => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-6 py-3 rounded-full text-xs font-bold tracking-widest whitespace-nowrap transition-all",
                  activeCategory === cat ? "bg-primary text-white shadow-xl shadow-primary/30 scale-105" : "bg-white text-primary border border-primary/5 hover:bg-primary/5 hover:scale-105"
                )}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>
        </section>

        {/* Menu Items - Horizontal Scroll */}
        <section className="mb-8">
          <div className="px-6 flex justify-between items-center mb-6">
            <h2 className="text-2xl font-serif font-black italic text-primary">Featured Cuisines</h2>
          </div>

          <div className="flex overflow-x-auto no-scrollbar scroll-smooth gap-6 px-6 pb-8 -mt-2">
            {loadingDishes ? (
              <>
                <DishSkeleton />
                <DishSkeleton />
                <DishSkeleton />
              </>
            ) : filteredDishes.length === 0 ? (
              <div className="w-full text-center py-20 font-serif italic text-muted">
                {debouncedQuery ? "No delicacies found matching your search." : "No delicacies found in this category."}
              </div>
            ) : filteredDishes.map((dish) => {
              const isAdded = addedId === dish.id;
              return (
                <div 
                  key={dish.id} 
                  className="min-w-[320px] max-w-[320px] bg-white rounded-[40px] shadow-sm border border-black/5 flex flex-col p-5 group transition-all hover:shadow-2xl hover:shadow-primary/10"
                >
                  {/* Image Container */}
                  <div className="relative h-72 w-full rounded-[32px] overflow-hidden mb-6 block">
                    <Image 
                      src={dish.imageUrl || dish.image || "https://images.unsplash.com/photo-1565551381335-5026915e8b4e"} 
                      alt={dish.name}
                      fill
                      sizes="320px"
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {dish.special && (
                      <div className="absolute top-4 left-4 z-20">
                        <div className="bg-primary/90 backdrop-blur-sm text-white border-none py-1.5 px-3 rounded-lg flex items-center space-x-1">
                          <Flame className="h-3 w-3 fill-current" />
                          <span className="text-[9px] font-black tracking-widest leading-none uppercase">{dish.special}</span>
                        </div>
                      </div>
                    )}

                    <div className="absolute top-4 right-4 z-20">
                      <button
                        onClick={(e) => handleToggleFavorite(dish.id, e)}
                        disabled={favLoadingId === dish.id}
                        className={cn(
                          "h-10 w-10 rounded-full flex items-center justify-center transition-all shadow-lg",
                          favoriteIds.has(dish.id)
                            ? "bg-rose-500 text-white scale-110"
                            : "bg-white/20 backdrop-blur-md text-white hover:bg-white hover:text-rose-400"
                        )}
                      >
                        <Heart className={cn("h-5 w-5", favoriteIds.has(dish.id) && "fill-current")} />
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col">
                    <h3 className="font-serif italic font-black text-2xl text-primary mb-1 uppercase tracking-tight">{dish.name}</h3>
                    
                    <div className="flex items-center space-x-1 mb-4">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="h-4 w-4 text-amber-400 fill-current" />
                      ))}
                      <span className="text-[10px] text-muted font-bold ml-1">(48)</span>
                    </div>

                    <p className="text-[13px] text-muted font-medium leading-relaxed mb-6 line-clamp-2">
                      {dish.description || "Authentic Nigerian delicacies prepared with the finest ingredients and traditional recipes."}
                    </p>

                    <div className="mt-auto flex justify-between items-center">
                      <span className="text-2xl font-black italic text-primary">{formatCurrency(dish.price)}</span>
                      
                      <button 
                        onClick={() => handleAddToCart(dish)}
                        className={cn(
                          "h-12 w-12 rounded-2xl flex items-center justify-center transition-all shadow-lg",
                          isAdded 
                            ? "bg-emerald-500 text-white scale-90" 
                            : "bg-primary text-white hover:scale-110 active:scale-95 shadow-primary/20"
                        )}
                      >
                        {isAdded ? (
                          <CheckCircle2 className="h-6 w-6" />
                        ) : (
                          <ShoppingBag className="h-6 w-6" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Additional categories or sections can go here */}
      </main>

      <MobileNav />
    </div>
  );
}

"use client";

import { Header } from "@/components/layout/Header";
import { MobileNav } from "@/components/layout/MobileNav";
<<<<<<< HEAD
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

=======
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

>>>>>>> acce792a55a573730087bf94e57f5f0608dd3e45
export default function MenuPage() {
  const [dishes, setDishes] = useState<any[]>([]);
  const [loadingDishes, setLoadingDishes] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
<<<<<<< HEAD
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
=======
  const [activeCategory, setActiveCategory] = useState("All");
  const { addToCart } = useCart();
  const [addedId, setAddedId] = useState<string | null>(null);
>>>>>>> acce792a55a573730087bf94e57f5f0608dd3e45

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

<<<<<<< HEAD
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
=======
  const handleAddToCart = useCallback((dish: any) => {
    // If price is a string like "₦5,000", convert to number. If it's already a number, use it.
>>>>>>> acce792a55a573730087bf94e57f5f0608dd3e45
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
<<<<<<< HEAD
      const matchesSearch = dish.name.toLowerCase().includes(debouncedQuery.toLowerCase());
      return matchesSearch;
    });
  }, [debouncedQuery, dishes]);
=======
      const matchesSearch = dish.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    });
  }, [searchQuery, dishes]);
>>>>>>> acce792a55a573730087bf94e57f5f0608dd3e45

  return (
    <div className="min-h-screen bg-background pb-32">
      <Header title="Our Selection" rightAction="notifications" />
      
<<<<<<< HEAD
      <main className="py-6">
        {/* Search */}
        <section className="px-6 mb-8">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted group-focus-within:text-primary transition-colors" />
=======
      <main className="px-6 py-6">
        <section className="mb-8">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted group-focus-within:text-accent transition-colors" />
>>>>>>> acce792a55a573730087bf94e57f5f0608dd3e45
            <input 
              type="text" 
              placeholder="Discover your next feast..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
<<<<<<< HEAD
              className="w-full h-14 pl-12 pr-4 bg-white rounded-2xl border-none shadow-sm focus:ring-2 focus:ring-primary transition-all text-sm font-medium"
=======
              className="w-full h-14 pl-12 pr-4 bg-white rounded-2xl border-none shadow-sm focus:ring-2 focus:ring-accent transition-all text-sm font-medium"
>>>>>>> acce792a55a573730087bf94e57f5f0608dd3e45
            />
          </div>
        </section>

<<<<<<< HEAD
        {/* Categories */}
        <section className="mb-10 overflow-x-auto no-scrollbar px-6">
=======
        <section className="mb-10 overflow-x-auto no-scrollbar -mx-6 px-6">
>>>>>>> acce792a55a573730087bf94e57f5f0608dd3e45
          <div className="flex space-x-3">
            {categories.map((cat) => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-6 py-3 rounded-full text-xs font-bold tracking-widest whitespace-nowrap transition-all",
<<<<<<< HEAD
                  activeCategory === cat ? "bg-primary text-white shadow-xl shadow-primary/30 scale-105" : "bg-white text-primary border border-primary/5 hover:bg-primary/5 hover:scale-105"
=======
                  activeCategory === cat ? "bg-primary text-white shadow-xl shadow-primary/30 scale-105" : "bg-white text-primary hover:bg-primary/5 hover:scale-105"
>>>>>>> acce792a55a573730087bf94e57f5f0608dd3e45
                )}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>
        </section>

<<<<<<< HEAD
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
=======
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
>>>>>>> acce792a55a573730087bf94e57f5f0608dd3e45
              </div>
            ) : filteredDishes.map((dish) => {
              const isAdded = addedId === dish.id;
              return (
<<<<<<< HEAD
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
=======
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
>>>>>>> acce792a55a573730087bf94e57f5f0608dd3e45
                      </div>
                    )}

                    <div className="absolute top-4 right-4 z-20">
<<<<<<< HEAD
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
=======
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
>>>>>>> acce792a55a573730087bf94e57f5f0608dd3e45
              );
            })}
          </div>
        </section>
<<<<<<< HEAD

        {/* Additional categories or sections can go here */}
=======
>>>>>>> acce792a55a573730087bf94e57f5f0608dd3e45
      </main>

      <MobileNav />
    </div>
  );
}

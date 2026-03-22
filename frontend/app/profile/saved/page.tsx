"use client";

import { Header } from "@/components/layout/Header";
import Image from "next/image";
import { Heart, Search, Star, Flame, ShoppingBag, CheckCircle2 } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { useCart } from "@/lib/cartContext";
import { cn, formatCurrency } from "@/lib/utils";
import { userApi } from "@/lib/api";

// Skeleton card for loading state
function SavedDishSkeleton() {
  return (
    <div className="w-full bg-white rounded-[32px] border border-black/5 flex flex-col p-4 animate-pulse">
      <div className="h-64 w-full rounded-[24px] bg-gray-200 mb-5" />
      <div className="px-2">
        <div className="h-6 w-2/3 bg-gray-200 rounded-full mb-3" />
        <div className="h-4 w-1/3 bg-gray-100 rounded-full mb-4" />
        <div className="flex justify-between items-center mt-2">
          <div className="h-6 w-20 bg-gray-200 rounded-full" />
          <div className="h-10 w-10 rounded-xl bg-gray-200" />
        </div>
      </div>
    </div>
  );
}

export default function SavedDishesPage() {
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const [addedId, setAddedId] = useState<string | null>(null);

  const fetchFavorites = async () => {
    try {
      const res = await userApi.getFavorites();
      setFavorites(res.data.map((fav: any) => fav.menuItem));
    } catch (error) {
      console.error("Failed to fetch favorites:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

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

  const handleRemoveFavorite = async (dishId: string) => {
    try {
      await userApi.toggleFavorite(dishId);
      // Optimistically remove from list
      setFavorites(prev => prev.filter(dish => dish.id !== dishId));
    } catch (err) {
      console.error("Failed to remove favorite", err);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-32">
      <Header title="Saved Dishes" showBack />
      
      <main className="px-6 py-6">
        <div className="flex flex-col gap-6">
          {loading ? (
            <>
              <SavedDishSkeleton />
              <SavedDishSkeleton />
              <SavedDishSkeleton />
            </>
          ) : favorites.length === 0 ? (
            <div className="w-full text-center py-32 flex flex-col items-center">
              <div className="h-24 w-24 rounded-full bg-primary/5 flex items-center justify-center mb-6">
                <Heart className="h-10 w-10 text-muted/50" />
              </div>
              <h2 className="text-2xl font-serif font-black italic text-primary mb-2">No Saved Dishes</h2>
              <p className="text-sm font-medium text-muted max-w-[250px]">You haven't favored any of our culinary creations yet.</p>
            </div>
          ) : favorites.map((dish) => {
            const isAdded = addedId === dish.id;
            return (
              <div 
                key={dish.id} 
                className="w-full bg-white rounded-[32px] shadow-sm border border-black/5 flex flex-col p-4 group transition-all hover:shadow-2xl hover:shadow-primary/10"
              >
                <div className="relative h-64 w-full rounded-[24px] overflow-hidden mb-5 block">
                  <Image 
                    src={dish.imageUrl || dish.image || "https://images.unsplash.com/photo-1565551381335-5026915e8b4e"} 
                    alt={dish.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 600px"
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  <div className="absolute top-4 right-4 z-20">
                    <button 
                      onClick={() => handleRemoveFavorite(dish.id)}
                      className="h-10 w-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-rose-500 hover:scale-110 transition-all shadow-lg"
                    >
                      <Heart className="h-5 w-5 fill-current" />
                    </button>
                  </div>
                </div>

                <div className="flex-1 flex flex-col px-2">
                  <h3 className="font-serif italic font-black text-xl text-primary mb-1 uppercase tracking-tight">{dish.name}</h3>
                  
                  <div className="flex items-center space-x-1 mb-4">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="h-3 w-3 text-amber-400 fill-current" />
                    ))}
                  </div>

                  <div className="mt-auto flex justify-between items-center">
                    <span className="text-xl font-black italic text-primary">{formatCurrency(dish.price)}</span>
                    
                    <button 
                      onClick={() => handleAddToCart(dish)}
                      className={cn(
                        "h-10 w-10 rounded-xl flex items-center justify-center transition-all shadow-md",
                        isAdded 
                          ? "bg-emerald-500 text-white scale-95" 
                          : "bg-primary text-white hover:scale-105 active:scale-95 shadow-primary/20"
                      )}
                    >
                      {isAdded ? (
                        <CheckCircle2 className="h-5 w-5" />
                      ) : (
                        <ShoppingBag className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

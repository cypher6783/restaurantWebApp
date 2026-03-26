"use client";

import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Star, Clock, Minus, Plus, ShoppingBag, Flame, CheckCircle2, Heart } from "lucide-react";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useCart } from "@/lib/cartContext";
import { menuApi, userApi } from "@/lib/apiConnect";
import { cn, formatCurrency } from "@/lib/utils";
import { dishes as localDishes } from "@/lib/data";

export default function DishDetailsPage() {
  const [dish, setDish] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favLoading, setFavLoading] = useState(false);
  const { id } = useParams();
  const router = useRouter();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchDish = async () => {
      setIsLoading(true);
      try {
        const response = await menuApi.getOne(id as string);
        if (response.data) {
          setDish(response.data);
        } else {
          // Backend returned null — fall back to local static dataset
          const local = localDishes.find(
            (d) => d.id === id ||
            d.name.toLowerCase().replace(/\s+/g, '-') === (id as string)
          );
          if (local) setDish(local);
        }
      } catch (err) {
        // API error — try local static dataset as fallback
        const local = localDishes.find(
          (d) => d.id === id ||
          d.name.toLowerCase().replace(/\s+/g, '-') === (id as string)
        );
        if (local) {
          setDish(local);
        } else {
          console.error("Failed to fetch dish", err);
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchDish();
  }, [id]);

  useEffect(() => {
    const checkFavorite = async () => {
      try {
        const favRes = await userApi.getFavorites();
        const favIds = (favRes.data || []).map((f: any) => f.menuItem?.id || f.menuItemId);
        if (id && favIds.includes(id as string)) setIsFavorite(true);
      } catch {}
    };
    checkFavorite();
  }, [id]);

  const handleToggleFavorite = async () => {
    if (favLoading) return;
    setFavLoading(true);
    try {
      await userApi.toggleFavorite(id as string);
      setIsFavorite(prev => !prev);
    } catch (err) {
      console.error("Failed to toggle favorite", err);
    } finally {
      setFavLoading(false);
    }
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: dish.id,
        name: dish.name,
        price: dish.price,
        image: dish.imageUrl || dish.image,
        category: dish.category,
      });
    }
    setAdded(true);
    setTimeout(() => router.push("/cart"), 900);
  };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center font-serif italic text-primary">Preparing the recipe...</div>;
  if (!dish) return <div className="min-h-screen flex items-center justify-center font-serif italic text-primary">Dish not found.</div>;

  return (
    <>
      <div className="min-h-screen bg-background flex flex-col">
      <div className="relative h-[45vh] w-full overflow-hidden bg-[#1B3C35]">
        <Image 
          src={dish.imageUrl || dish.image}
          alt={dish.name}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Header Overlay */}
        <Header showBack className="absolute top-0 left-0 right-0 z-30 bg-transparent text-white" />

        {/* Favorite button in top right */}
        <button
          onClick={handleToggleFavorite}
          disabled={favLoading}
          className={cn(
            "absolute top-5 right-6 z-30 h-11 w-11 rounded-full flex items-center justify-center shadow-lg transition-all",
            isFavorite ? "bg-rose-500 text-white scale-110" : "bg-white/30 backdrop-blur-md text-white hover:bg-white hover:text-rose-400"
          )}
        >
          <Heart className={cn("h-5 w-5", isFavorite && "fill-current")} />
        </button>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
        
        <div className="absolute bottom-10 left-8 z-20 text-white">
          <Badge className="bg-accent text-white border-none mb-4 py-1.5 px-4 rounded-xl flex items-center space-x-2">
            <Flame className="h-4 w-4 fill-current" />
            <span className="text-xs font-black tracking-[0.2em]">{dish.isSpecial ? "CHEF'S SPECIAL" : "REFINED CHOICE"}</span>
          </Badge>
          <h1 className="text-5xl font-serif font-black italic tracking-tight">{dish.name}</h1>
        </div>
      </div>

      <main className="flex-1 -mt-6 bg-background rounded-t-[40px] px-8 pt-10 relative z-20 pb-40">
        <div className="flex justify-between items-center mb-8">
          <p className="text-4xl font-serif font-black text-accent italic">{formatCurrency(dish.price)}</p>
          <div className="bg-accent/5 px-4 py-2 rounded-2xl flex items-center space-x-2 border border-accent/10 shadow-sm">
            <Star className="h-4 w-4 text-accent fill-current" />
            <span className="text-sm font-black text-accent">{dish.rating || "4.9"} ({dish.reviews || 0} reviews)</span>
          </div>
        </div>


        <section className="mb-10">
          <h2 className="text-xl font-serif font-black italic text-primary mb-4">Description</h2>
          <p className="text-primary/70 leading-relaxed text-sm font-medium tracking-tight">
            {dish.description}
          </p>
        </section>

        <section className="grid grid-cols-2 gap-6 mb-12 border-y border-primary/5 py-8">
          <div>
            <p className="text-[10px] font-black tracking-widest text-muted uppercase mb-1">Preparation Time</p>
            <p className="text-xl font-bold text-primary">{dish.prepTime || "25 mins"}</p>
          </div>
          <div>
            <p className="text-[10px] font-black tracking-widest text-muted uppercase mb-1">Serving Size</p>
            <p className="text-xl font-bold text-primary">{dish.servingSize || "1 person"}</p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-serif font-black italic text-primary mb-6">Key Ingredients</h2>
          <div className="flex flex-wrap gap-2">
            {(dish.ingredients || []).map((ing: string) => (
              <span key={ing} className="px-5 py-3 rounded-2xl bg-white text-[11px] font-bold text-primary/80 shadow-sm border border-primary/5">
                {ing}
              </span>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-serif font-black italic text-primary mb-6">Nutritional Information</h2>
          <div className="grid grid-cols-4 gap-3">
            {[
              { label: "CALORIES", value: dish.calories || "650", color: "text-orange-500" },
              { label: "PROTEIN", value: dish.protein || "28g", color: "text-emerald-500" },
              { label: "CARBS", value: dish.carbs || "85g", color: "text-sky-500" },
              { label: "FAT", value: dish.fat || "18g", color: "text-rose-500" },
            ].map((n: { label: string, value: string, color: string }) => (
              <div key={n.label} className="bg-white p-4 rounded-2xl shadow-sm border border-primary/5 flex flex-col items-center">
                <p className="text-[8px] font-black tracking-widest text-muted mb-2 uppercase">{n.label}</p>
                <p className={cn("text-lg font-black italic", n.color)}>{n.value}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Floating Action Bar */}
      <footer className="fixed bottom-0 left-0 right-0 p-8 bg-white/70 backdrop-blur-xl border-t border-primary/5 z-50 rounded-t-[40px] shadow-2xl">
        <div className="flex space-x-6 items-center">
          <div className="flex items-center space-x-6 bg-primary/5 p-2 rounded-3xl border border-primary/5">
            <Button
              variant="subtle"
              size="icon"
              className="h-12 w-12 rounded-2xl bg-white shadow-sm"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              <Minus className="h-5 w-5 text-accent" />
            </Button>
            <span className="text-xl font-black italic w-6 text-center">{quantity}</span>
            <Button
              variant="subtle"
              size="icon"
              className="h-12 w-12 rounded-2xl bg-white shadow-sm"
              onClick={() => setQuantity(quantity + 1)}
            >
              <Plus className="h-5 w-5 text-accent" />
            </Button>
          </div>

          <Button
            className={cn(
              "flex-1 h-16 rounded-[28px] text-lg font-bold shadow-2xl shadow-accent/40 flex items-center space-x-3 transition-all",
              added ? "bg-emerald-500 shadow-emerald-500/30" : "bg-primary hover:bg-primary/90"
            )}
            onClick={handleAddToCart}
          >
            {added ? (
              <>
                <CheckCircle2 className="h-6 w-6" />
                <span>Added to Cart!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="h-6 w-6" />
                <span>Add to Cart</span>
              </>
            )}
          </Button>
        </div>
      </footer>
    </div>
    
  </>
  );
}

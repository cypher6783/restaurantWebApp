"use client";

import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Star, Clock, Minus, Plus, ShoppingBag, Flame, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useCart } from "@/lib/cartContext";
import { useRouter, useParams } from "next/navigation";

export default function DishDetailsPage() {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();
  const router = useRouter();
  const params = useParams();

  const dish = {
    id: params.id as string || "smokey-jollof",
    name: "Smokey Jollof Rice",
    price: 7500,
    rating: 4.9,
    reviews: "120+",
    image: "/images/jollof.png",
    description: "Authentic firewood-smoked rice served with sweet dodo (fried plantains), moin-moin, and your choice of protein. A classic West African staple known for its deep orange hue and rich, smoky aroma.",
    prepTime: "25-30 mins",
    servingSize: "Single Portion",
    ingredients: ["Long-grain Parboiled Rice", "Scotch Bonnet", "Tomato Paste", "Red Bell Peppers", "Smoked Paprika", "Palm Oil"],
    nutrition: [
      { label: "CALORIES", value: "650", color: "text-orange-500" },
      { label: "PROTEIN", value: "28g", color: "text-emerald-500" },
      { label: "CARBS", value: "85g", color: "text-sky-500" },
      { label: "FAT", value: "18g", color: "text-rose-500" },
    ]
  };

  // Adjust image based on ID for simulation
  if (dish.id === "egusi-soup") {
    dish.name = "Egusi Soup & Pounded Yam";
    dish.image = "/images/egusi.png";
    dish.price = 9000;
  } else if (dish.id === "peppered-snail") {
    dish.name = "Peppered Snail";
    dish.image = "/images/snail.png";
    dish.price = 8500;
  } else if (dish.id === "grilled-croaker") {
    dish.name = "Grilled Croaker Fish";
    dish.image = "/images/croaker.png";
    dish.price = 12500;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="relative h-[45vh] w-full overflow-hidden bg-[#1B3C35]">
        <Image 
          src={dish.image}
          alt={dish.name}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Header Overlay */}
        <Header showBack rightAction="share" className="absolute top-0 left-0 right-0 z-30 bg-transparent text-white" />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
        
        <div className="absolute bottom-10 left-8 z-20 text-white">
          <Badge className="bg-accent text-white border-none mb-4 py-1.5 px-4 rounded-xl flex items-center space-x-2">
            <Flame className="h-4 w-4 fill-current" />
            <span className="text-xs font-black tracking-[0.2em]">CHEF&apos;S SPECIAL</span>
          </Badge>
          <h1 className="text-5xl font-serif font-black italic tracking-tight">{dish.name}</h1>
        </div>
      </div>

      <main className="flex-1 -mt-6 bg-background rounded-t-[40px] px-8 pt-10 relative z-20 pb-40">
        <div className="flex justify-between items-center mb-8">
          <p className="text-4xl font-serif font-black text-accent italic">₦{dish.price.toLocaleString()}</p>
          <div className="bg-accent/5 px-4 py-2 rounded-2xl flex items-center space-x-2 border border-accent/10">
            <Star className="h-4 w-4 text-accent fill-current" />
            <span className="text-sm font-black text-accent">{dish.rating} ({dish.reviews} reviews)</span>
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
            <p className="text-xl font-bold text-primary">{dish.prepTime}</p>
          </div>
          <div>
            <p className="text-[10px] font-black tracking-widest text-muted uppercase mb-1">Serving Size</p>
            <p className="text-xl font-bold text-primary">{dish.servingSize}</p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-serif font-black italic text-primary mb-6">Key Ingredients</h2>
          <div className="flex flex-wrap gap-2">
            {dish.ingredients.map(ing => (
              <span key={ing} className="px-5 py-3 rounded-2xl bg-white text-[11px] font-bold text-primary/80 shadow-sm border border-primary/5">
                {ing}
              </span>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-serif font-black italic text-primary mb-6">Nutritional Information</h2>
          <div className="grid grid-cols-4 gap-3">
            {dish.nutrition.map(n => (
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
            className={`flex-1 h-16 rounded-[28px] text-lg font-bold shadow-2xl shadow-accent/40 flex items-center space-x-3 transition-all ${added ? "bg-emerald-500 shadow-emerald-500/30" : ""}`}
            onClick={() => {
              for (let i = 0; i < quantity; i++) {
                addToCart({
                  id: dish.id,
                  name: dish.name,
                  price: dish.price,
                  image: dish.image,
                });
              }
              setAdded(true);
              setTimeout(() => router.push("/cart"), 900);
            }}

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
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}


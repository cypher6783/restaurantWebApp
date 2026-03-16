"use client";

import { Header } from "@/components/layout/Header";
import { MobileNav } from "@/components/layout/MobileNav";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Search, Filter, Star, Clock, Flame, Utensils, Heart, ShoppingBag, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useMemo, useCallback } from "react";
import { useCart } from "@/lib/cartContext";
import { cn } from "@/lib/utils";

const categories = ["All", "Main Course", "Traditional", "Seafood", "Desserts"];

const dishes = [
  {
    id: "smokey-jollof",
    name: "Smokey Jollof Rice",
    description: "Authentic firewood-smoked Jollof rice served with grilled chicken and plantain.",
    price: "₦7,500",
    rating: "4.9",
    reviews: 142,
    time: "25-30 mins",
    category: "Main Course",
    image: "/images/jollof-rice.jpg",
    special: "CHEF'S SPECIAL"
  },
  {
    id: "peppered-snail",
    name: "Peppered Snail",
    description: "Jumbo forest snails sautéed in a spicy habanero and onion reduction.",
    price: "₦8,500",
    rating: "4.8",
    reviews: 89,
    time: "15-20 mins",
    category: "Traditional",
    image: "/images/peppered-snail.jpeg",
  },
  {
    id: "egusi-soup",
    name: "Egusi Soup & Pounded Yam",
    description: "Melon seed soup with assorted meats and pan-fried spinach.",
    price: "₦9,000",
    rating: "5.0",
    reviews: 215,
    time: "30-35 mins",
    category: "Traditional",
    image: "/images/egusi-pounded-yam.jpg",
  },
  {
    id: "suya",
    name: "Gourmet Beef Suya",
    description: "Spicy grilled beef skewers seasoned with traditional Yaji spice and served with onions.",
    price: "₦5,500",
    rating: "4.9",
    reviews: 312,
    time: "15-20 mins",
    category: "Traditional",
    image: "/images/suya.jpg",
  },
  {
    id: "abacha",
    name: "African Salad (Abacha)",
    description: "Traditional cassava salad with ugba, garden eggs, and fried fish.",
    price: "₦6,500",
    rating: "4.7",
    reviews: 67,
    time: "20-25 mins",
    category: "Traditional",
    image: "/images/abacha.jpeg",
  },
  {
    id: "fried-rice",
    name: "Special Fried Rice",
    description: "Basmati rice stir-fried with seasonal vegetables and liver chunks.",
    price: "₦7,000",
    rating: "4.6",
    reviews: 112,
    time: "25-30 mins",
    category: "Main Course",
    image: "/images/fried-rice.jpeg",
  },
  {
    id: "spaghetti-chicken",
    name: "Spaghetti with Chicken",
    description: "Italian spaghetti tossed in a rich Nigerian pepper sauce with grilled chicken.",
    price: "₦8,000",
    rating: "4.8",
    reviews: 95,
    time: "20-25 mins",
    category: "Main Course",
    image: "/images/spaghetti-chicken.jpeg",
  },
  {
    id: "amala-ewedu",
    name: "Amala and Ewedu",
    description: "Smooth yam flour pudding served with jute leaf soup and gbegiri.",
    price: "₦5,500",
    rating: "4.9",
    reviews: 184,
    time: "15-20 mins",
    category: "Traditional",
    image: "/images/amala-ewedu.jpg",
  },
  {
    id: "banga-soup",
    name: "Banga Soup and Starch",
    description: "Delta-style palm nut soup enriched with local spices and fresh seafood.",
    price: "₦9,500",
    rating: "4.8",
    reviews: 43,
    time: "35-40 mins",
    category: "Traditional",
    image: "/images/banga-soup-starch.jpeg",
  },
  {
    id: "efo-riro",
    name: "Efo Riro and Fufu",
    description: "Rich vegetable soup cooked with locust beans and assorted protein.",
    price: "₦8,500",
    rating: "4.7",
    reviews: 128,
    time: "25-30 mins",
    category: "Traditional",
    image: "/images/eforiro.jpg",
  },
  {
    id: "grilled-fish",
    name: "Gourmet Grilled Fish",
    description: "Slow-roasted croaker fish marinated in our signature spicy herb blend.",
    price: "₦15,000",
    rating: "4.9",
    reviews: 56,
    time: "45-50 mins",
    category: "Seafood",
    image: "/images/grilled-fish.jpg",
  },
  {
    id: "vegetable-soup",
    name: "Edikang Ikong",
    description: "Nutrient-dense vegetable soup with waterleaf and fluted pumpkin leaves.",
    price: "₦10,000",
    rating: "4.9",
    reviews: 88,
    time: "30-35 mins",
    category: "Traditional",
    image: "/images/vegetable-soup.jpeg",
  },
  {
    id: "beans-plantain",
    name: "Beans and Plantain",
    description: "Slow-cooked honey beans paired with sweet fried plantain slices.",
    price: "₦5,000",
    rating: "4.5",
    reviews: 54,
    time: "20-25 mins",
    category: "Traditional",
    image: "/images/beans-plantain.jpeg",
  }
];


export default function MenuPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const { addToCart } = useCart();
  const [addedId, setAddedId] = useState<string | null>(null);

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

          {filteredDishes.length > 0 ? (
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



"use client";

import { Header } from "@/components/layout/Header";
import { MobileNav } from "@/components/layout/MobileNav";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Trash2, Plus, Minus, ChevronRight, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function CartPage() {
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Smokey Jollof Rice",
      price: 5500,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1565551381335-5026915e8b4e"
    },
    {
      id: 2,
      name: "Peppered Snail",
      price: 8500,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1544025162"
    }
  ]);

  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const deliveryFee = 1500;
  const total = subtotal + deliveryFee;

  return (
    <div className="min-h-screen bg-background pb-56">
      <Header showBack title="Your Selection" rightAction="notifications" />

      <main className="px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xs font-black tracking-[0.2em] text-accent uppercase">Cart Details ({items.length})</h2>
          <button className="text-xs font-bold text-muted hover:text-rose-500 uppercase tracking-widest transition-colors">Clear All</button>
        </div>

        <section className="space-y-6">
          {items.map((item) => (
            <Card key={item.id} className="p-4 rounded-3xl border-none shadow-sm relative group overflow-hidden bg-white">
              <div className="flex space-x-5">
                <div className="h-28 w-28 rounded-2xl bg-primary/5 overflow-hidden flex-shrink-0">
                  <div className="w-full h-full bg-primary/10 animate-pulse" />
                </div>
                
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <h3 className="text-lg font-serif font-black italic text-primary">{item.name}</h3>
                    <p className="text-lg font-serif font-black text-accent italic mt-1">₦{item.price.toLocaleString()}</p>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4 bg-primary/5 px-2 py-1 rounded-2xl border border-primary/5">
                      <button className="h-8 w-8 rounded-full bg-white shadow-sm flex items-center justify-center text-accent hover:scale-110 active:scale-95 transition-all">
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="text-sm font-black italic w-4 text-center">{item.quantity}</span>
                      <button className="h-8 w-8 rounded-full bg-white shadow-sm flex items-center justify-center text-accent hover:scale-110 active:scale-95 transition-all">
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <button className="p-2 text-muted hover:text-rose-500 transition-colors">
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </section>

        <Link href="/menu" className="block mt-8">
          <div className="w-full p-6 bg-white rounded-3xl border-2 border-dashed border-accent/20 flex items-center justify-center space-x-3 group hover:border-accent transition-colors">
            <Plus className="h-6 w-6 text-accent" />
            <span className="text-sm font-bold text-primary group-hover:text-accent tracking-wide transition-colors">Add more items to your feast</span>
          </div>
        </Link>

        <Card className="mt-12 p-8 rounded-[40px] border-none shadow-sm bg-white">
          <h3 className="text-2xl font-serif font-black italic text-primary mb-8">Summary</h3>
          
          <div className="space-y-6 border-b border-primary/5 pb-8">
            <div className="flex justify-between items-center">
              <span className="text-muted font-bold tracking-wide">Subtotal</span>
              <span className="text-primary font-black italic">₦{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted font-bold tracking-wide">Delivery Fee</span>
              <span className="text-primary font-black italic">₦{deliveryFee.toLocaleString()}</span>
            </div>
          </div>

          <div className="flex justify-between items-center pt-8">
            <span className="text-2xl font-serif font-black italic text-primary">Total Amount</span>
            <span className="text-3xl font-serif font-black italic text-accent">₦{total.toLocaleString()}</span>
          </div>
        </Card>
      </main>

      <div className="fixed bottom-24 left-0 right-0 px-6 z-40">
        <Button className="w-full h-20 rounded-[30px] shadow-2xl shadow-accent/40 text-xl font-bold flex items-center justify-center space-x-3">
          <span>Proceed to Checkout</span>
          <ChevronRight className="h-6 w-6" />
        </Button>
        <p className="text-center text-[10px] font-bold text-muted mt-4 uppercase tracking-[0.2em]">Estimated delivery time: 30 - 45 mins</p>
      </div>

      <MobileNav />
    </div>
  );
}

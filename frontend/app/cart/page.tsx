"use client";

import { Header } from "@/components/layout/Header";
import { MobileNav } from "@/components/layout/MobileNav";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Trash2, Plus, Minus, ChevronRight, ShoppingBag } from "lucide-react";
import Link from "next/link";
<<<<<<< HEAD:app/cart/page.tsx
import Image from "next/image";
import { useCart } from "@/lib/cartContext";
=======
import { useRouter } from "next/navigation";
import { useState } from "react";
import { orderApi } from "@/lib/api";
>>>>>>> eadd8ba (Refactor: Restructure project into frontend/ and backend/, and polish UI/UX):frontend/app/cart/page.tsx

export default function CartPage() {
  const { items, cartTotal, updateQuantity, removeFromCart, clearCart } = useCart();
  const deliveryFee = 1500;
  const total = cartTotal + deliveryFee;

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      const orderData = {
        items: items.map(item => ({
          menuItemId: item.id.toString(), // Ensure string ID
          quantity: item.quantity
        }))
      };
      const response = await orderApi.create(orderData);
      // Redirect to order status page (if we have one) or clear cart
      alert(`Order created! Order ID: ${response.data.id}`);
      setItems([]);
      router.push('/menu');
    } catch (err: any) {
      alert(`Order failed: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-56">
      <Header showBack title="Your Selection" rightAction="notifications" />

      <main className="px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xs font-black tracking-[0.2em] text-accent uppercase">Cart Details ({items.length})</h2>
<<<<<<< HEAD:app/cart/page.tsx
          {items.length > 0 && (
            <button
              onClick={clearCart}
              className="text-xs font-bold text-muted hover:text-rose-500 uppercase tracking-widest transition-colors"
            >
              Clear All
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <ShoppingBag className="h-16 w-16 text-primary/10 mb-6" />
            <h3 className="text-2xl font-serif font-black italic text-primary mb-2">Your cart is empty</h3>
            <p className="text-muted text-sm font-medium mb-8">Add some dishes from our menu to get started.</p>
            <Link href="/menu">
              <Button className="h-14 px-8 rounded-2xl font-bold">Browse the Menu</Button>
            </Link>
          </div>
        ) : (
          <>
            <section className="space-y-6">
              {items.map((item) => (
                <Card key={item.id} className="p-4 rounded-3xl border-none shadow-sm relative group overflow-hidden bg-white">
                  <div className="flex space-x-5">
                    <div className="h-28 w-28 rounded-2xl bg-primary/5 overflow-hidden flex-shrink-0 relative">
                      <Image 
                        src={item.image || "/images/jollof.png"} 
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="112px"
                      />
                    </div>


                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <h3 className="text-lg font-serif font-black italic text-primary">{item.name}</h3>
                        <p className="text-lg font-serif font-black text-accent italic mt-1">₦{item.price.toLocaleString()}</p>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-4 bg-primary/5 px-2 py-1 rounded-2xl border border-primary/5">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="h-8 w-8 rounded-full bg-white shadow-sm flex items-center justify-center text-accent hover:scale-110 active:scale-95 transition-all"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="text-sm font-black italic w-4 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="h-8 w-8 rounded-full bg-white shadow-sm flex items-center justify-center text-accent hover:scale-110 active:scale-95 transition-all"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 text-muted hover:text-rose-500 transition-colors"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
=======
          <button className="text-xs font-bold text-muted hover:text-rose-500 uppercase tracking-widest transition-colors" onClick={() => setItems([])}>Clear All</button>
        </div>

        <section className="space-y-6">
          {items.map((item) => (
            <Card key={item.id} className="p-4 rounded-3xl border-none shadow-sm relative group overflow-hidden bg-white">
              <div className="flex space-x-5">
                <div className="h-28 w-28 rounded-2xl bg-primary/5 overflow-hidden flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <h3 className="text-lg font-serif font-black italic text-primary">{item.name}</h3>
                    <p className="text-lg font-serif font-black text-accent italic mt-1">₦{item.price.toLocaleString()}</p>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4 bg-primary/5 px-2 py-1 rounded-2xl border border-primary/5">
                      <button 
                        className="h-8 w-8 rounded-full bg-white shadow-sm flex items-center justify-center text-accent hover:scale-110 active:scale-95 transition-all"
                        onClick={() => setItems(items.map(i => i.id === item.id ? { ...i, quantity: Math.max(1, i.quantity - 1) } : i))}
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="text-sm font-black italic w-4 text-center">{item.quantity}</span>
                      <button 
                        className="h-8 w-8 rounded-full bg-white shadow-sm flex items-center justify-center text-accent hover:scale-110 active:scale-95 transition-all"
                        onClick={() => setItems(items.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i))}
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <button 
                      className="p-2 text-muted hover:text-rose-500 transition-colors"
                      onClick={() => setItems(items.filter(i => i.id !== item.id))}
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
>>>>>>> eadd8ba (Refactor: Restructure project into frontend/ and backend/, and polish UI/UX):frontend/app/cart/page.tsx
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
                  <span className="text-primary font-black italic">₦{cartTotal.toLocaleString()}</span>
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
          </>
        )}
      </main>

<<<<<<< HEAD:app/cart/page.tsx
      {items.length > 0 && (
        <div className="fixed bottom-24 left-0 right-0 px-6 z-40">
          <Link href="/checkout">
            <Button className="w-full h-20 rounded-[30px] shadow-2xl shadow-accent/40 text-xl font-bold flex items-center justify-center space-x-3">
              <span>Proceed to Checkout</span>
              <ChevronRight className="h-6 w-6" />
            </Button>
          </Link>
          <p className="text-center text-[10px] font-bold text-muted mt-4 uppercase tracking-[0.2em]">Estimated delivery time: 30 - 45 mins</p>
        </div>
      )}
=======
      <div className="fixed bottom-24 left-0 right-0 px-6 z-40">
        <Button 
          className="w-full h-20 rounded-[30px] shadow-2xl shadow-accent/40 text-xl font-bold flex items-center justify-center space-x-3"
          onClick={handleCheckout}
          disabled={isLoading || items.length === 0}
        >
          <span>{isLoading ? 'Processing...' : 'Proceed to Checkout'}</span>
          <ChevronRight className="h-6 w-6" />
        </Button>
        <p className="text-center text-[10px] font-bold text-muted mt-4 uppercase tracking-[0.2em]">Estimated delivery time: 30 - 45 mins</p>
      </div>
>>>>>>> eadd8ba (Refactor: Restructure project into frontend/ and backend/, and polish UI/UX):frontend/app/cart/page.tsx

      <MobileNav />
    </div>
  );
}



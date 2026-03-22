"use client";

import { Header } from "@/components/layout/Header";
import { MobileNav } from "@/components/layout/MobileNav";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Trash2, Plus, Minus, ChevronRight, ShoppingBag } from "lucide-react";
import Link from "next/link";
<<<<<<< HEAD:app/cart/page.tsx
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/lib/cartContext";
<<<<<<< HEAD
import { orderApi } from "@/lib/api";
=======
=======
import { useRouter } from "next/navigation";
import { useState } from "react";
import { orderApi } from "@/lib/api";
>>>>>>> eadd8ba (Refactor: Restructure project into frontend/ and backend/, and polish UI/UX):frontend/app/cart/page.tsx
>>>>>>> acce792a55a573730087bf94e57f5f0608dd3e45

export default function CartPage() {
  const { items, cartTotal, updateQuantity, removeFromCart, clearCart } = useCart();
  const [showPaystack, setShowPaystack] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const router = useRouter();
  
  const deliveryFee = items.length > 0 ? 1500 : 0;
  const total = cartTotal + deliveryFee;

<<<<<<< HEAD
  const handleCheckout = () => {
    if (items.length === 0) return;
    setShowPaystack(true);
  };

  const processPayment = async () => {
    setIsPaying(true);
    // Simulate payment delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    try {
      const orderData = {
        items: items.map(item => ({
          id: item.id.toString(),
          quantity: item.quantity,
          price: item.price
        })),
        totalAmount: total
      };
      const response = await orderApi.create(orderData);
      clearCart();
      router.push(`/order-success/${response.data.id}`);
    } catch (err: any) {
      alert(`Order failed: ${err.message || "Something went wrong"}`);
    } finally {
      setIsPaying(false);
      setShowPaystack(false);
=======
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
>>>>>>> acce792a55a573730087bf94e57f5f0608dd3e45
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
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
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

<<<<<<< HEAD
      {/* Mock Paystack Modal */}
      {showPaystack && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => !isPaying && setShowPaystack(false)} />
          <Card className="relative w-full max-w-sm bg-white rounded-[32px] overflow-hidden p-0 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="bg-[#011b33] p-8 text-white flex flex-col items-center">
              <div className="h-12 w-12 bg-white rounded-lg flex items-center justify-center mb-4">
                <div className="h-8 w-8 bg-[#09a5db] rounded-sm transform rotate-45" />
              </div>
              <h3 className="text-xl font-bold tracking-tight">Paystack Checkout</h3>
              <p className="text-white/40 text-[10px] font-bold tracking-[0.2em] uppercase mt-1">Simulated Environment</p>
            </div>
            
            <div className="p-8 space-y-6">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted font-bold">Paying to</span>
                <span className="text-primary font-black uppercase tracking-widest text-[10px]">REFINED DINING</span>
              </div>
              <div className="flex justify-between items-center pb-6 border-b border-primary/5">
                <span className="text-muted font-bold">Total Amount</span>
                <span className="text-xl font-black italic text-primary">₦{total.toLocaleString()}</span>
              </div>

              <div className="space-y-4">
                <p className="text-[10px] font-black text-muted uppercase tracking-[0.2em] text-center">Secure Payment Method</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 border-2 border-primary/10 rounded-2xl flex flex-col items-center space-y-2 opacity-50 cursor-not-allowed">
                    <div className="h-5 w-5 bg-muted/20 rounded-full" />
                    <span className="text-[9px] font-bold uppercase tracking-widest">Card</span>
                  </div>
                  <div className="p-4 border-2 border-primary rounded-2xl flex flex-col items-center space-y-2 bg-primary/5">
                    <div className="h-5 w-5 bg-primary rounded-full" />
                    <span className="text-[9px] font-bold uppercase tracking-widest text-primary">Transfer</span>
                  </div>
                </div>
              </div>

              <Button 
                onClick={processPayment}
                disabled={isPaying}
                className="w-full h-14 rounded-2xl font-bold shadow-xl shadow-primary/20"
              >
                {isPaying ? (
                  <div className="flex items-center space-x-3">
                    <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Verifying...</span>
                  </div>
                ) : (
                  <span>Complete Payment</span>
                )}
              </Button>
              
              {!isPaying && (
                <button 
                  onClick={() => setShowPaystack(false)}
                  className="w-full text-center text-[10px] font-bold text-muted uppercase tracking-widest hover:text-primary transition-colors"
                >
                  Cancel Transaction
                </button>
              )}
            </div>
            <div className="bg-[#f2f4f7] py-3 text-center">
              <p className="text-[9px] font-bold text-muted uppercase tracking-[0.2em]">Secured by Paystack</p>
            </div>
          </Card>
=======
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
>>>>>>> acce792a55a573730087bf94e57f5f0608dd3e45
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

      <div className="fixed bottom-24 left-0 right-0 px-6 z-40">
        <Button 
          className="w-full h-18 rounded-[30px] shadow-2xl shadow-primary/40 text-lg font-bold flex items-center justify-center space-x-3"
          onClick={handleCheckout}
          disabled={isPaying || showPaystack || items.length === 0}
        >
          <span>{isPaying ? 'Verifying Payment...' : 'Proceed to Checkout'}</span>
          <ChevronRight className="h-6 w-6" />
        </Button>
        <p className="text-center text-[10px] font-bold text-muted mt-4 uppercase tracking-[0.2em]">Secure Checkout with Paystack</p>
      </div>

      <MobileNav />
    </div>
  );
}

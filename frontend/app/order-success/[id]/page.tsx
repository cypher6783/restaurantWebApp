"use client";

import { use } from "react";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Check, Clock, Utensils, Bike, ChevronRight, Plus, Bell, ShoppingBag, User, Star, ChefHat, CheckCircle2, X } from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { orderApi } from "@/lib/apiConnect";
import { cn, formatCurrency } from "@/lib/utils";

const orderSteps = [
  { id: 1, label: "Order Received", time: "12:30 PM", status: "completed" },
  { id: 2, label: "Preparing Ingredients", time: "12:35 PM", status: "completed" },
  { id: 3, label: "Cooking in Progress", time: "Live Update", status: "current" },
  { id: 4, label: "Plating & Quality", time: "Step 4", status: "pending" },
  { id: 5, label: "Ready for Delivery", time: "Final Step", status: "pending" },
];

const upsellItems = [
  { id: "pepsi", name: "Pepsi", price: 800, image: "/images/pepsi.jpg" },
  { id: "coke", name: "Coca Cola", price: 800, image: "/images/coke.jpg" },
];

export default function OrderSuccessPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // Specialized Drink Add-on State
  const [selectedDrink, setSelectedDrink] = useState<any>(null);
  const [isPaying, setIsPaying] = useState(false);
  const [addedDrinks, setAddedDrinks] = useState<any[]>([]);

  useEffect(() => {
    async function fetchOrder() {
      try {
        const response = await orderApi.getOne(id);
        setOrder(response.data);
      } catch (error) {
        console.error("Failed to fetch order:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchOrder();
  }, [id]);

  const handleProcessAddOn = async () => {
    if (!selectedDrink) return;
    setIsPaying(true);
    
    // Simulate Paystack verification for the drink
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock success - Add to the local order list
    const newDrink = {
      id: `addon-${Date.now()}`,
      quantity: 1,
      price: selectedDrink.price,
      menuItem: {
        name: selectedDrink.name,
        image: selectedDrink.image,
      }
    };
    
    setAddedDrinks((prev: any[]) => [...prev, newDrink]);
    setOrder((prev: any) => ({
       ...prev,
       totalAmount: (prev?.totalAmount || 0) + selectedDrink.price,
       items: [...(prev?.items || []), newDrink]
    }));
    
    setIsPaying(false);
    setSelectedDrink(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDFCF9] flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-12 w-12 border-4 border-primary/10 border-t-primary rounded-full animate-spin" />
          <p className="font-serif italic font-bold text-primary">Crafting your success story...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-[#FDFCF9] pb-20 relative">
      <header className="px-8 pt-8 flex justify-between items-center bg-[#FDFCF9]">
        <h1 className="text-2xl font-serif italic font-black text-[#1B3C35] tracking-tight">Refined Kitchen</h1>
        <div className="flex items-center space-x-6">
          <button className="text-primary/60 hover:text-primary transition-colors"><Bell className="h-6 w-6" /></button>
          <button className="text-primary/60 hover:text-primary transition-colors"><ShoppingBag className="h-6 w-6" /></button>
          <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
            <User className="h-6 w-6 text-primary" />
          </div>
        </div>
      </header>

      <main className="px-8 pt-12 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="flex-1">
            <div className="mb-2">
               <span className="text-[10px] font-black text-accent uppercase tracking-[0.3em]">Order Tracking</span>
            </div>
            <h2 className="text-6xl font-serif font-black text-primary leading-tight mb-8">
              Preparing<br />Your Meal
            </h2>
            <p className="text-primary/60 text-lg font-medium max-w-md leading-relaxed mb-12">
              Our chefs are carefully crafting your order using authentic ingredients and heritage techniques.
            </p>

            <div className="inline-flex items-center space-x-4 bg-white px-8 py-5 rounded-[24px] shadow-sm border border-primary/5 mb-16">
              <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center">
                <Clock className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-[10px] font-black text-muted uppercase tracking-widest mb-1">Estimated Arrival</p>
                <p className="text-xl font-bold text-primary">Ready in 12 minutes</p>
              </div>
            </div>

            {/* Progress Tracker omitted for brevity, keeping the layout */}
            <div className="relative flex justify-between items-center w-full mb-24 overflow-x-auto no-scrollbar py-4">
              <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-primary/20 -translate-y-[22px] z-0" />
              {orderSteps.map((step) => (
                <div key={step.id} className="relative z-10 flex flex-col items-center text-center px-4">
                  <div className={cn(
                    "h-12 w-12 rounded-full flex items-center justify-center mb-4 transition-all duration-500",
                    step.status === "completed" ? "bg-primary text-white shadow-lg shadow-primary/20" : 
                    step.status === "current" ? "bg-accent text-white scale-125 shadow-xl shadow-accent/20" : 
                    "bg-white border border-primary/5 text-muted"
                  )}>
                    {step.status === "completed" ? <Check className="h-6 w-6" /> : 
                     step.id === 3 ? <Utensils className="h-5 w-5" /> :
                     step.id === 4 ? <div className="h-1.5 w-1.5 bg-current rounded-full" /> :
                     <Bike className="h-5 w-5" />}
                  </div>
                  <h4 className={cn(
                    "text-[11px] font-black uppercase tracking-widest mb-1",
                    step.status === "pending" ? "text-muted" : "text-primary"
                  )}>{step.label}</h4>
                  <p className={cn(
                    "text-[10px] font-bold tracking-tight",
                    step.status === "current" ? "text-accent animate-pulse" : "text-muted/60"
                  )}>{step.time}</p>
                </div>
              ))}
            </div>

            <Card className="bg-white rounded-[40px] p-10 border border-primary/5 shadow-sm">
              <div className="flex justify-between items-center mb-10 pb-6 border-b border-primary/5">
                <h3 className="text-2xl font-serif font-black text-primary italic">Order Summary</h3>
                <span className="text-xs font-bold text-muted uppercase tracking-widest">#RD-{id.slice(0, 5).toUpperCase()}</span>
              </div>

              <div className="space-y-8 mb-10">
                {order?.items?.map((item: any) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div className="flex items-center space-x-5">
                      <div className="h-16 w-16 bg-primary/5 rounded-2xl overflow-hidden relative">
                        <img src={item.menuItem?.imageUrl || item.menuItem?.image || "/images/jollof.png"} alt={item.menuItem?.name} className="object-cover w-full h-full" />
                      </div>
                      <div>
                        <h4 className="text-lg font-serif font-black italic text-primary">{item.menuItem?.name}</h4>
                        <p className="text-[10px] text-muted font-bold uppercase tracking-widest mt-0.5">
                          {item.id.toString().startsWith('addon') ? 'Add-on' : `Quantity: ${item.quantity}`} 
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[11px] text-muted font-bold pb-1">{item.quantity} × {formatCurrency(item.price)}</p>
                      <p className="text-lg font-serif font-black text-primary italic">{formatCurrency(item.price * item.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-6 pt-8 border-t border-primary/5 mb-8">
                <div className="flex justify-between items-center text-xs font-bold text-muted uppercase tracking-widest">
                  <span>Subtotal</span>
                  <span className="text-primary font-black italic">₦{(order?.totalAmount - 1500).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-xs font-bold text-muted uppercase tracking-widest">
                  <span>Delivery Fee</span>
                  <span className="text-primary font-black italic">₦1,500</span>
                </div>
              </div>

              <div className="bg-[#F8F5F2] rounded-[24px] p-6 flex justify-between items-center">
                <span className="text-2xl font-serif font-black text-primary italic">Total</span>
                <span className="text-3xl font-serif font-black text-[#1B3C35] italic">₦{order?.totalAmount?.toLocaleString()}</span>
              </div>
            </Card>
          </div>

          <div className="lg:w-96 space-y-8 pt-4">
            <Card className="bg-[#F8F5F2] rounded-[32px] p-8 border-none shadow-none">
                <h4 className="text-[10px] font-black text-accent uppercase tracking-[0.3em] mb-8">Our Commitment</h4>
                <div className="space-y-6">
                   <div className="flex items-start space-x-4">
                      <div className="bg-white/50 p-2 rounded-xl text-primary"><Star className="h-5 w-5 fill-current" /></div>
                      <div>
                        <p className="text-sm font-bold text-primary mb-1 italic">Prepared fresh upon your order</p>
                        <p className="text-[10px] text-primary/40 leading-tight">No shortcuts, just slow-cooked perfection.</p>
                      </div>
                   </div>
                   <div className="flex items-start space-x-4">
                      <div className="bg-white/50 p-2 rounded-xl text-primary"><ChefHat className="h-5 w-5" /></div>
                      <div>
                        <p className="text-sm font-bold text-primary mb-1 italic">Handled with care by our chefs</p>
                        <p className="text-[10px] text-primary/40 leading-tight">Master culinary artists at your service.</p>
                      </div>
                   </div>
                   <div className="flex items-start space-x-4">
                      <div className="bg-white/50 p-2 rounded-xl text-primary"><CheckCircle2 className="h-5 w-5" /></div>
                      <div>
                        <p className="text-sm font-bold text-primary mb-1 italic">Quality checked before delivery</p>
                        <p className="text-[10px] text-primary/40 leading-tight">Every dish inspected for excellence.</p>
                      </div>
                   </div>
                </div>
            </Card>

            <div className="space-y-6">
                <h3 className="text-2xl font-serif font-black italic text-primary">Complete Your Meal</h3>
                {upsellItems.map(item => (
                  <Card key={item.id} className="bg-white p-4 rounded-[28px] border border-primary/5 flex items-center justify-between group cursor-pointer hover:shadow-lg transition-all">
                    <div className="flex items-center space-x-4">
                      <div className="h-16 w-16 bg-primary/5 rounded-2xl overflow-hidden relative">
                         <img src={item.image} alt={item.name} className="object-cover w-full h-full" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-primary italic">{item.name}</h4>
                        <p className="text-sm font-black text-accent italic">₦{item.price.toLocaleString()}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setSelectedDrink(item)}
                      className="h-10 w-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all"
                    >
                      <Plus className="h-5 w-5" />
                    </button>
                  </Card>
                ))}
            </div>

            <div className="bg-[#FFEFE8] rounded-[32px] p-8 text-center">
               <p className="text-xs font-bold text-primary mb-3">Need to adjust your order?</p>
               <button className="text-accent font-black italic underline decoration-accent/20 underline-offset-8 text-lg hover:text-accent/80 transition-short">Contact Kitchen</button>
            </div>
          </div>
        </div>
      </main>

      {/* Specialty Add-on Payment Modal */}
      {selectedDrink && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => !isPaying && setSelectedDrink(null)} />
          <Card className="relative w-full max-w-sm bg-white rounded-[32px] overflow-hidden p-0 shadow-2xl">
            <div className="bg-[#011b33] p-8 text-white">
              <div className="flex justify-between items-start">
                <div className="h-12 w-12 bg-white rounded-lg flex items-center justify-center">
                   <Image src={selectedDrink.image} alt={selectedDrink.name} width={32} height={32} className="rounded-sm" />
                </div>
                <button onClick={() => setSelectedDrink(null)} className="text-white/40 hover:text-white"><X className="h-6 w-6" /></button>
              </div>
              <h3 className="text-xl font-bold mt-4">Add {selectedDrink.name} to order</h3>
              <p className="text-white/40 text-[10px] font-black tracking-widest uppercase mt-1">Direct Checkout • No Delivery Fee</p>
            </div>
            
            <div className="p-8 space-y-6">
              <div className="flex justify-between items-center text-sm font-bold text-muted uppercase tracking-widest">
                <span>Total Amount</span>
                <span className="text-xl font-black italic text-primary">₦{selectedDrink.price.toLocaleString()}</span>
              </div>
              
              <Button 
                onClick={handleProcessAddOn}
                disabled={isPaying}
                className="w-full h-14 rounded-2xl font-bold"
              >
                {isPaying ? "Processing..." : `Pay ₦${selectedDrink.price.toLocaleString()}`}
              </Button>
              <p className="text-[9px] text-center text-muted font-bold uppercase tracking-widest">Secured by Paystack</p>
            </div>
          </Card>
        </div>
      )}

      <footer className="mt-20 px-8 py-12 bg-primary flex flex-col items-center rounded-t-[60px] relative overflow-hidden text-center">
         <div className="absolute top-0 inset-x-0 h-2 bg-accent/20 blur-xl opacity-50" />
         <h3 className="text-4xl font-serif italic font-black text-white mb-2 tracking-tighter">Refined Kitchen</h3>
         <p className="text-white/40 text-[10px] font-black tracking-[0.5em] uppercase">Luxury Nigerian Dining</p>
      </footer>
    </div>
    
  </>
  );
}

"use client";

import Link from "next/link";
import { CheckCircle2, Home, UtensilsCrossed } from "lucide-react";

export default function OrderConfirmationPage() {
  const orderId = `REF-${Math.floor(1000 + Math.random() * 9000)}`;

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-8 text-center">
      {/* Success icon */}
      <div className="relative mb-8">
        <div className="absolute inset-0 rounded-full bg-accent/20 animate-ping scale-125" />
        <div className="relative h-28 w-28 rounded-full bg-accent flex items-center justify-center shadow-2xl shadow-accent/30">
          <CheckCircle2 className="h-14 w-14 text-white" />
        </div>
      </div>

      <h1 className="text-4xl font-serif font-black italic text-primary mb-3">
        Order Placed!
      </h1>
      <p className="text-primary/60 text-sm font-medium leading-relaxed max-w-xs mb-8">
        Your refined feast is being prepared with care. Sit back and relax.
      </p>

      {/* Order ID card */}
      <div className="w-full max-w-xs bg-white rounded-[28px] p-6 shadow-xl shadow-primary/5 border border-primary/5 mb-8">
        <p className="text-[10px] font-black tracking-[0.2em] text-muted uppercase mb-1">Order ID</p>
        <p className="text-2xl font-black italic text-primary">{orderId}</p>
        <div className="mt-4 pt-4 border-t border-primary/5 flex justify-between text-sm">
          <span className="text-muted font-bold">Estimated time</span>
          <span className="text-primary font-black italic">30 – 45 mins</span>
        </div>
      </div>

      {/* Delivery tracker placeholder */}
      <div className="w-full max-w-xs bg-[#1B3C35] rounded-[28px] p-6 mb-10">
        <p className="text-white/60 text-xs font-black tracking-widest uppercase mb-4">Delivery Status</p>
        <div className="flex items-center space-x-2 mb-3">
          {["Order Placed", "Preparing", "On the Way", "Delivered"].map((step, i) => (
            <div key={step} className="flex items-center flex-1">
              <div className={`h-3 w-3 rounded-full flex-shrink-0 ${i === 0 ? "bg-accent" : "bg-white/20"}`} />
              {i < 3 && <div className={`flex-1 h-0.5 ${i === 0 ? "bg-accent/30" : "bg-white/10"}`} />}
            </div>
          ))}
        </div>
        <p className="text-white text-sm font-bold">Order Placed</p>
        <p className="text-white/40 text-xs font-medium mt-0.5">Your order has been received</p>
      </div>

      {/* CTAs */}
      <div className="w-full max-w-xs space-y-3">
        <Link
          href="/"
          className="flex items-center justify-center space-x-3 w-full h-14 bg-accent rounded-2xl text-white font-bold shadow-xl shadow-accent/30 hover:bg-accent/90 transition-all"
        >
          <Home className="h-5 w-5" />
          <span>Back to Home</span>
        </Link>
        <Link
          href="/menu"
          className="flex items-center justify-center space-x-3 w-full h-14 bg-white rounded-2xl text-primary font-bold shadow-sm border border-primary/10 hover:bg-primary/5 transition-all"
        >
          <UtensilsCrossed className="h-5 w-5" />
          <span>Browse Menu Again</span>
        </Link>
      </div>
    </div>
  );
}

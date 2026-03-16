"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/lib/cartContext";
import { MapPin, CreditCard, Smartphone, ChevronRight, CheckCircle2 } from "lucide-react";

const paymentMethods = [
  { id: "card", label: "Credit / Debit Card", icon: CreditCard, detail: "**** **** **** 4291" },
  { id: "transfer", label: "Bank Transfer", icon: Smartphone, detail: "Pay via Paystack" },
  { id: "cod", label: "Pay on Delivery", icon: CheckCircle2, detail: "Cash or POS at door" },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, cartTotal, clearCart } = useCart();
  const [selectedPayment, setSelectedPayment] = useState("card");
  const [address, setAddress] = useState("12 Marina Road, Victoria Island, Lagos");
  const [placing, setPlacing] = useState(false);

  const deliveryFee = 1500;
  const total = cartTotal + deliveryFee;

  function handlePlaceOrder() {
    setPlacing(true);
    setTimeout(() => {
      clearCart();
      router.push("/checkout/confirmation");
    }, 1400);
  }

  return (
    <div className="min-h-screen bg-background pb-40">
      <Header showBack title="Checkout" />

      <main className="px-6 py-6 space-y-6">
        {/* Delivery Address */}
        <section className="bg-white rounded-[28px] p-6 shadow-sm border border-primary/5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <MapPin className="h-5 w-5 text-accent" />
              </div>
              <h2 className="text-sm font-black text-primary uppercase tracking-widest">Delivery Address</h2>
            </div>
            <button
              className="text-[10px] font-black tracking-widest text-accent hover:underline"
              onClick={() => {
                const newAddr = prompt("Enter delivery address:", address);
                if (newAddr) setAddress(newAddr);
              }}
            >
              CHANGE
            </button>
          </div>
          <p className="text-primary font-medium text-sm leading-relaxed pl-1">{address}</p>
        </section>

        {/* Order Summary */}
        <section className="bg-white rounded-[28px] p-6 shadow-sm border border-primary/5">
          <h2 className="text-sm font-black text-primary uppercase tracking-widest mb-5">Order Summary</h2>

          <div className="space-y-4 mb-6">
            {items.length === 0 ? (
              <p className="text-muted text-sm font-medium italic text-center py-4">Your cart is empty.</p>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-bold text-primary">{item.name}</p>
                    <p className="text-xs text-muted font-medium">× {item.quantity}</p>
                  </div>
                  <p className="text-sm font-black italic text-primary">
                    ₦{(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              ))
            )}
          </div>

          <div className="border-t border-primary/5 pt-5 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="font-bold text-muted">Subtotal</span>
              <span className="font-black text-primary italic">₦{cartTotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="font-bold text-muted">Delivery Fee</span>
              <span className="font-black text-primary italic">₦{deliveryFee.toLocaleString()}</span>
            </div>
            <div className="flex justify-between pt-3 border-t border-primary/5">
              <span className="text-lg font-black text-primary">Total</span>
              <span className="text-xl font-black italic text-accent">₦{total.toLocaleString()}</span>
            </div>
          </div>
        </section>

        {/* Payment Method */}
        <section className="bg-white rounded-[28px] p-6 shadow-sm border border-primary/5">
          <h2 className="text-sm font-black text-primary uppercase tracking-widest mb-5">Payment Method</h2>
          <div className="space-y-3">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setSelectedPayment(method.id)}
                className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${
                  selectedPayment === method.id
                    ? "border-accent bg-accent/5"
                    : "border-primary/5 hover:border-primary/10"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${
                    selectedPayment === method.id ? "bg-accent text-white" : "bg-primary/5 text-primary"
                  }`}>
                    <method.icon className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-primary text-sm">{method.label}</p>
                    <p className="text-xs text-muted font-medium">{method.detail}</p>
                  </div>
                </div>
                <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${
                  selectedPayment === method.id ? "border-accent bg-accent" : "border-primary/20"
                }`}>
                  {selectedPayment === method.id && (
                    <div className="h-2 w-2 rounded-full bg-white" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </section>
      </main>

      {/* Place Order CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/80 backdrop-blur-xl border-t border-primary/5">
        <Button
          className="w-full h-16 rounded-[28px] text-lg font-bold shadow-2xl shadow-accent/30 flex items-center justify-center space-x-3"
          onClick={handlePlaceOrder}
          disabled={placing || items.length === 0}
        >
          {placing ? (
            <span className="animate-pulse">Placing your order...</span>
          ) : (
            <>
              <span>Place Order · ₦{total.toLocaleString()}</span>
              <ChevronRight className="h-6 w-6" />
            </>
          )}
        </Button>
        <p className="text-center text-[10px] font-bold text-muted mt-3 uppercase tracking-[0.2em]">
          Estimated delivery: 30 – 45 mins
        </p>
      </div>
    </div>
  );
}

"use client";

import { Header } from "@/components/layout/Header";
import { CreditCard, Plus, Trash2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function PaymentsPage() {
  const cards = [
    { id: 1, type: "Visa", last4: "4242", expiry: "12/28", isPrimary: true, color: "from-blue-600 to-blue-800" },
    { id: 2, type: "Mastercard", last4: "8899", expiry: "08/26", isPrimary: false, color: "from-slate-800 to-slate-900" },
  ];

  return (
    <div className="min-h-screen bg-[#FDFCF9] pb-32">
      <Header title="Payment Methods" showBack />
      
      <main className="px-6 py-6 max-w-md mx-auto">
        <div className="space-y-6">
          {cards.map(card => (
            <div key={card.id} className={`w-full h-48 rounded-3xl bg-gradient-to-br ${card.color} p-6 relative overflow-hidden shadow-xl flex flex-col justify-between text-white`}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10" />
              
              <div className="flex justify-between items-start relative z-10">
                <CreditCard className="w-8 h-8 opacity-80" />
                {card.isPrimary && (
                  <div className="flex items-center space-x-1 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                    <CheckCircle2 className="w-3 h-3" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Default</span>
                  </div>
                )}
              </div>
              
              <div className="relative z-10">
                <p className="text-white/60 text-xs font-medium mb-1">Card Number</p>
                <p className="text-2xl font-black tracking-widest font-mono">
                  •••• •••• •••• {card.last4}
                </p>
                <div className="flex justify-between items-end mt-4">
                  <div>
                    <p className="text-white/60 text-[10px] font-black uppercase tracking-widest mb-0.5">Valid Thru</p>
                    <p className="text-sm font-bold font-mono">{card.expiry}</p>
                  </div>
                  <p className="text-lg font-black italic">{card.type}</p>
                </div>
              </div>
            </div>
          ))}

          <Button variant="outline" className="w-full h-16 rounded-3xl border-dashed border-2 border-primary/20 text-primary hover:bg-primary/5 hover:border-primary/40 mt-8 flex items-center justify-center shadow-none">
            <Plus className="w-5 h-5 mr-2" />
            <span className="font-bold">Add Payment Method</span>
          </Button>
        </div>
      </main>
    </div>
  );
}

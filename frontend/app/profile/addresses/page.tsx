"use client";

import { Header } from "@/components/layout/Header";
import { MapPin, Plus, Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function AddressesPage() {
  const addresses = [
    { id: 1, title: "Home", location: "14B Banana Island Road, Ikoyi, Lagos", isPrimary: true },
    { id: 2, title: "Office", location: "Sterling Towers, Marina, Lagos Island", isPrimary: false },
  ];

  return (
    <div className="min-h-screen bg-[#FDFCF9] pb-32">
      <Header title="Delivery Addresses" showBack />
      
      <main className="px-6 py-6 max-w-md mx-auto">
        <div className="space-y-4">
          {addresses.map(addr => (
            <div key={addr.id} className="bg-white rounded-3xl p-5 border border-primary/5 shadow-sm relative overflow-hidden group">
              {addr.isPrimary && (
                <div className="absolute top-0 right-0 bg-accent text-white text-[9px] font-black uppercase px-3 py-1 rounded-bl-xl tracking-widest">
                  Primary
                </div>
              )}
              
              <div className="flex items-start space-x-4">
                <div className="mt-1 h-10 w-10 bg-primary/5 rounded-2xl flex items-center justify-center shrink-0">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-serif font-black italic text-lg text-primary">{addr.title}</h3>
                  <p className="text-sm font-medium text-muted mt-1 leading-relaxed">{addr.location}</p>
                  
                  <div className="flex items-center space-x-4 mt-4">
                    <button className="flex items-center text-xs font-bold text-accent hover:text-primary transition-colors">
                      <Edit2 className="w-3 h-3 mr-1" /> Edit
                    </button>
                    <button className="flex items-center text-xs font-bold text-rose-500 hover:text-rose-600 transition-colors">
                      <Trash2 className="w-3 h-3 mr-1" /> Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <Button variant="outline" className="w-full h-16 rounded-3xl border-dashed border-2 border-primary/20 text-primary hover:bg-primary/5 hover:border-primary/40 mt-8 flex items-center justify-center shadow-none">
            <Plus className="w-5 h-5 mr-2" />
            <span className="font-bold">Add New Location</span>
          </Button>
        </div>
      </main>
    </div>
  );
}

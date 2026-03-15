"use client";

import { Header } from "@/components/layout/Header";
import { MobileNav } from "@/components/layout/MobileNav";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ChevronRight, Clock, MapPin, Receipt, Utensils } from "lucide-react";

export default function OrderHistoryPage() {
  const orders = [
    {
      id: "REF-9823",
      date: "Oct 12, 2026",
      itemsCount: 3,
      total: "₦18,500",
      status: "DELIVERED",
      items: "Smokey Jollof (x2), Peppered Snail"
    },
    {
      id: "REF-9811",
      date: "Oct 08, 2026",
      itemsCount: 1,
      total: "₦9,000",
      status: "DELIVERED",
      items: "Egusi Soup & Pounded Yam"
    },
    {
      id: "REF-9799",
      date: "Oct 01, 2026",
      itemsCount: 4,
      total: "₦24,000",
      status: "CANCELLED",
      items: "Assorted Meat, White Rice, Jollof"
    }
  ];

  return (
    <div className="min-h-screen bg-background pb-32">
      <Header title="Your Feasts" rightAction="notifications" showBack />

      <main className="px-6 py-8">
        <div className="flex justify-between items-center mb-10">
          <div className="flex space-x-2">
            <Badge className="bg-primary text-white border-none py-1.5 px-4 rounded-xl">PAST</Badge>
            <Badge variant="neutral" className="py-1.5 px-4 rounded-xl">ACTIVE</Badge>
          </div>
          <button className="text-muted hover:text-primary transition-colors">
            <Receipt className="h-6 w-6" />
          </button>
        </div>

        <section className="space-y-6">
          {orders.map((order) => (
            <Card key={order.id} className="p-0 overflow-hidden border-none shadow-sm bg-white hover:scale-[1.02] transition-transform cursor-pointer">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-xl bg-accent/5 flex items-center justify-center">
                      <Utensils className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-xs font-black tracking-widest text-muted uppercase">Order #{order.id}</p>
                      <p className="text-sm font-bold text-primary mt-0.5">{order.date}</p>
                    </div>
                  </div>
                  <Badge 
                    variant={order.status === "DELIVERED" ? "success" : "neutral"}
                    className="rounded-lg px-2.5 py-1 text-[10px] tracking-widest font-black"
                  >
                    {order.status}
                  </Badge>
                </div>

                <div className="bg-primary/5 rounded-2xl p-4 mb-6">
                  <p className="text-xs font-medium text-primary/70 italic leading-relaxed">
                    {order.items}
                  </p>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <div>
                      <p className="text-[10px] font-black tracking-widest text-muted uppercase">Items</p>
                      <p className="text-sm font-bold text-primary">{order.itemsCount}</p>
                    </div>
                    <div className="h-8 w-px bg-primary/5" />
                    <div>
                      <p className="text-[10px] font-black tracking-widest text-muted uppercase">Total Paid</p>
                      <p className="text-sm font-bold text-accent italic">{order.total}</p>
                    </div>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-white shadow-sm flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                    <ChevronRight className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>
      </main>

      <MobileNav />
    </div>
  );
}

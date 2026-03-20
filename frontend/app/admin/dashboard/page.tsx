"use client";

import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Bell, Search, TrendingUp, Users, ShoppingBag, Table2, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"bookings" | "orders">("bookings");
  
  const stats = [
    { label: "Total Revenue", value: "₦2.4M", trend: "+12%", icon: TrendingUp },
    { label: "Total Orders", value: "148", trend: "-2%", icon: ShoppingBag, negative: true },
    { label: "Table Bookings", value: "32", trend: "+5%", icon: Table2 },
    { label: "New Guests", value: "12", trend: "+8%", icon: Users },
  ];

  const bookings = [
    { id: 1, name: "Femi Otedola", table: "Table for 4", time: "8:30 PM", status: "CONFIRMED" },
    { id: 2, name: "Aisha Dangote", table: "Private Lounge", time: "7:00 PM", status: "ARRIVED" },
    { id: 3, name: "Tunde Afolayan", table: "Table for 2", time: "9:15 PM", status: "PENDING" },
  ];

  const orders = [
    { id: "ORD-721", name: "Smokey Jollof (x2)", table: "T-04", time: "5 mins ago", status: "PREPARING" },
    { id: "ORD-722", name: "Peppered Snail", table: "T-12", time: "12 mins ago", status: "READY" },
    { id: "ORD-723", name: "Egusi & Pounded Yam", table: "T-02", time: "18 mins ago", status: "PREPARING" },
  ];

  return (
    <div className="flex bg-[#F8F5F2] min-h-screen">
      <AdminSidebar />
      <main className="flex-1 lg:ml-64 p-6 lg:p-12 pt-24 lg:pt-12 transition-all duration-300">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-3xl lg:text-4xl font-serif font-bold text-primary italic">Welcome back, Chef</h1>
            <p className="text-muted mt-2 text-sm">Here&apos;s what&apos;s happening at Refined today.</p>
          </div>
          <div className="flex items-center space-x-6 self-end md:self-auto">
            <div className="relative">
              <Bell className="h-6 w-6 text-primary" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-accent rounded-full border-2 border-[#F8F5F2]" />
            </div>
            <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-white shadow-sm">
              <div className="bg-primary/10 h-full w-full flex items-center justify-center text-primary font-bold">Chef</div>
            </div>
          </div>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12">
          {stats.map((stat) => (
            <Card key={stat.label} className="group hover:scale-105 transition-transform duration-300">
              <CardContent className="p-0">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-primary/5 rounded-xl group-hover:bg-accent/10 transition-colors">
                    <stat.icon className="h-6 w-6 text-primary group-hover:text-accent transition-colors" />
                  </div>
                  <Badge variant={stat.negative ? "error" : "success"} className="rounded-lg py-1">
                    {stat.trend}
                  </Badge>
                </div>
                <p className="text-muted text-xs lg:text-sm font-bold uppercase tracking-wider">{stat.label}</p>
                <p className="text-2xl lg:text-3xl font-bold text-primary mt-1">{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2 bg-[#1B3C35] text-white overflow-hidden relative">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                <div>
                  <p className="text-white/60 text-sm font-bold uppercase tracking-widest">Weekly Revenue</p>
                  <p className="text-3xl lg:text-4xl font-bold mt-1">₦2,400,000</p>
                </div>
                <div className="md:text-right">
                  <p className="text-accent text-xs font-bold uppercase tracking-widest">Top Performing</p>
                  <p className="text-white/40 text-[10px] mt-1 italic">Last 7 Days</p>
                </div>
              </div>
              
              <div className="flex items-end justify-between h-48 space-x-2 lg:space-x-4">
                {[40, 60, 45, 75, 55, 100, 80].map((height, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center group">
                    <div 
                      className={cn(
                        "w-full rounded-lg transition-all duration-500 group-hover:opacity-100",
                        i === 5 ? "bg-accent opacity-100" : "bg-white/20 opacity-40"
                      )} 
                      style={{ height: `${height}%` }}
                    />
                    <span className="text-[10px] font-bold mt-4 text-white/30">
                      {["M", "T", "W", "T", "F", "S", "S"][i]}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-1 border-none shadow-sm h-full flex flex-col">
            <CardContent className="p-8 flex-1 flex flex-col">
              <div className="flex flex-col mb-8">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-serif font-bold text-primary italic">Live Feed</h3>
                  <button className="text-[10px] font-bold text-accent tracking-widest hover:underline uppercase">History</button>
                </div>
                
                <div className="flex bg-primary/5 p-1 rounded-2xl">
                  <button 
                    onClick={() => setActiveTab("bookings")}
                    className={cn(
                      "flex-1 py-3 px-2 lg:px-4 rounded-xl text-[9px] lg:text-[10px] font-black tracking-widest transition-all",
                      activeTab === "bookings" ? "bg-white text-primary shadow-sm" : "text-muted hover:text-primary"
                    )}
                  >
                    BOOKINGS
                  </button>
                  <button 
                    onClick={() => setActiveTab("orders")}
                    className={cn(
                      "flex-1 py-3 px-2 lg:px-4 rounded-xl text-[9px] lg:text-[10px] font-black tracking-widest transition-all",
                      activeTab === "orders" ? "bg-white text-primary shadow-sm" : "text-muted hover:text-primary"
                    )}
                  >
                    LIVE ORDERS
                  </button>
                </div>
              </div>

              <div className="space-y-6 overflow-y-auto no-scrollbar max-h-[400px]">
                {(activeTab === "bookings" ? bookings : orders).map((item: any) => (
                  <div key={item.id} className="flex items-center justify-between p-4 rounded-2xl hover:bg-primary/5 transition-colors group cursor-pointer border border-transparent hover:border-primary/5">
                    <div className="flex items-center space-x-3 lg:space-x-4">
                      <div className="h-10 w-10 lg:h-12 lg:w-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary font-bold text-base lg:text-lg group-hover:bg-white group-hover:shadow-sm transition-all uppercase flex-shrink-0">
                        {item.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2)}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <p className="text-sm font-bold text-primary truncate max-w-[100px] lg:max-w-[120px]">{item.name}</p>
                        <p className="text-[10px] text-muted italic font-medium truncate">
                          {activeTab === "bookings" ? `${item.table} • ${item.time}` : `${item.table} • ${item.time}`}
                        </p>
                      </div>
                    </div>
                    <Badge 
                      variant={
                        item.status === "CONFIRMED" || item.status === "READY" ? "success" : 
                        item.status === "ARRIVED" || item.status === "PREPARING" ? "warning" : "neutral"
                      }
                      className="rounded-xl px-2 lg:px-3 py-1 scale-75 lg:scale-90 flex-shrink-0"
                    >
                      {item.status}
                    </Badge>
                  </div>
                ))}
              </div>
              
              {activeTab === "orders" && (
                <div className="mt-8 pt-8 border-t border-primary/5">
                  <div className="p-4 bg-accent/5 rounded-2xl flex items-center space-x-4 border border-accent/10">
                    <Clock className="h-6 w-6 text-accent flex-shrink-0" />
                    <div>
                      <p className="text-[10px] font-bold text-accent uppercase tracking-widest">Kitchen Status</p>
                      <p className="text-xs font-medium text-primary mt-0.5">Highly active • 8 items pending</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </section>
      </main>
    </div>

  );
}


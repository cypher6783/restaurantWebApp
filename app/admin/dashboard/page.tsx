"use client";

import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Bell, Search, TrendingUp, Users, ShoppingBag, Table2 } from "lucide-react";

export default function AdminDashboard() {
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

  return (
    <div className="flex bg-[#F8F5F2] min-h-screen">
      <AdminSidebar />
      <main className="flex-1 ml-64 p-12">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-serif font-bold text-primary italic">Welcome back, Chef</h1>
            <p className="text-muted mt-2">Here&apos;s what&apos;s happening at Refined today.</p>
          </div>
          <div className="flex items-center space-x-6">
            <div className="relative">
              <Bell className="h-6 w-6 text-primary" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-accent rounded-full border-2 border-[#F8F5F2]" />
            </div>
            <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-white shadow-sm">
              <div className="bg-primary/10 h-full w-full flex items-center justify-center text-primary font-bold">Chef</div>
            </div>
          </div>
        </header>

        <section className="grid grid-cols-4 gap-8 mb-12">
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
                <p className="text-muted text-sm font-bold uppercase tracking-wider">{stat.label}</p>
                <p className="text-3xl font-bold text-primary mt-1">{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="grid grid-cols-3 gap-8">
          <Card className="col-span-2 bg-[#1B3C35] text-white overflow-hidden relative">
            <CardContent className="p-8">
              <div className="flex justify-between items-end mb-8">
                <div>
                  <p className="text-white/60 text-sm font-bold uppercase tracking-widest">Weekly Revenue</p>
                  <p className="text-4xl font-bold mt-1">₦2,400,000</p>
                </div>
                <div className="text-right">
                  <p className="text-accent text-xs font-bold uppercase tracking-widest">Top Performing</p>
                  <p className="text-white/40 text-[10px] mt-1 italic">Last 7 Days</p>
                </div>
              </div>
              
              <div className="flex items-end justify-between h-48 space-x-4">
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

          <Card className="col-span-1">
            <CardContent className="p-8">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-serif font-bold text-primary italic">Recent Bookings</h3>
                <button className="text-[10px] font-bold text-accent tracking-widest hover:underline">VIEW ALL</button>
              </div>
              <div className="space-y-6">
                {bookings.map((booking) => (
                  <div key={booking.name} className="flex items-center justify-between p-4 rounded-2xl hover:bg-primary/5 transition-colors group cursor-pointer">
                    <div className="flex items-center space-x-4">
                      <div className="h-12 w-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary font-bold text-lg group-hover:bg-white group-hover:shadow-sm transition-all">
                        {booking.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-primary">{booking.name}</p>
                        <p className="text-xs text-muted italic font-medium">{booking.table} • {booking.time}</p>
                      </div>
                    </div>
                    <Badge 
                      variant={
                        booking.status === "CONFIRMED" ? "warning" : 
                        booking.status === "ARRIVED" ? "success" : "neutral"
                      }
                      className="rounded-xl px-3 py-1 scale-90"
                    >
                      {booking.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}

"use client";

import { cn } from "@/lib/utils";
import { LayoutDashboard, Menu as MenuIcon, Users, Star, Settings, ClipboardList, CalendarCheck, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/Button";

const adminNavItems = [
  { label: "HOME", icon: LayoutDashboard, href: "/admin/dashboard" },
  { label: "ORDERS", icon: ClipboardList, href: "/admin/orders" },
  { label: "MENU", icon: MenuIcon, href: "/admin/menu" },
  { label: "BOOKINGS", icon: CalendarCheck, href: "/admin/bookings" },
  { label: "STATS", icon: Star, href: "/admin/stats" },
];


export function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="lg:hidden fixed top-6 left-6 z-50">
        <Button 
          variant="subtle" 
          size="icon" 
          className="h-12 w-12 rounded-2xl bg-white shadow-xl border border-primary/5 flex items-center justify-center p-0"
          onClick={() => setIsOpen(true)}
        >
          <MenuIcon className="h-6 w-6 text-primary" />
        </Button>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "w-64 h-screen bg-white border-r border-primary/5 flex flex-col fixed left-0 top-0 z-[70] transition-transform duration-300",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="p-8 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-serif font-bold text-primary italic tracking-tight">REFINED</h2>
            <p className="text-[10px] font-bold text-muted tracking-widest mt-1">ADMIN PORTAL</p>
          </div>
          <button 
            className="lg:hidden p-2 text-muted hover:text-primary transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="flex-1 px-6 space-y-2">
          {adminNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="flex items-center space-x-4 px-4 py-3 rounded-xl hover:bg-primary/5 transition-colors group"
            >
              <item.icon className="h-5 w-5 text-muted group-hover:text-primary transition-colors" />
              <span className="text-sm font-bold text-muted group-hover:text-primary tracking-wide">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-8 border-t border-primary/5">
          <div className="flex items-center space-x-4">
            <div className="h-10 w-10 rounded-full bg-primary/10" />
            <div>
              <p className="text-sm font-bold text-primary">Chef Adesuwa</p>
              <p className="text-[10px] text-muted font-medium uppercase tracking-wider">Executive Chef</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}


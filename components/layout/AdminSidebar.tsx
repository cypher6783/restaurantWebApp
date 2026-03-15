import { cn } from "@/lib/utils";
import { LayoutDashboard, Menu, Users, Star, Settings, ClipboardList, CalendarCheck } from "lucide-react";
import Link from "next/link";

const adminNavItems = [
  { label: "HOME", icon: LayoutDashboard, href: "/admin/dashboard" },
  { label: "ORDERS", icon: ClipboardList, href: "/admin/orders" },
  { label: "MENU", icon: Menu, href: "/admin/menu" },
  { label: "BOOKINGS", icon: CalendarCheck, href: "/admin/bookings" },
  { label: "STATS", icon: Star, href: "/admin/stats" },
];

export function AdminSidebar() {
  return (
    <aside className="w-64 h-screen bg-white border-r border-primary/5 flex flex-col fixed left-0 top-0">
      <div className="p-8">
        <h2 className="text-2xl font-serif font-bold text-primary italic tracking-tight">REFINED</h2>
        <p className="text-[10px] font-bold text-muted tracking-widest mt-1">ADMIN PORTAL</p>
      </div>

      <nav className="flex-1 px-6 space-y-2">
        {adminNavItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
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
  );
}

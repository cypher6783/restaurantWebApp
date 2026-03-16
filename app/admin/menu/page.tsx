"use client";

import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Plus, Edit2, Trash2, Search, Filter, MoreVertical, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import Link from "next/link";

const dishes = [
  {
    id: "smokey-jollof",
    name: "Smokey Jollof Rice",
    price: 7500,
    category: "Main Course",
    status: "ACTIVE",
    orders: 142
  },
  {
    id: "peppered-snail",
    name: "Peppered Snail",
    price: 8500,
    category: "Traditional",
    status: "ACTIVE",
    orders: 89
  },
  {
    id: "egusi-soup",
    name: "Egusi Soup & Pounded Yam",
    price: 9000,
    category: "Traditional",
    status: "OUT_OF_STOCK",
    orders: 215
  },
  {
    id: "suya",
    name: "Gourmet Beef Suya",
    price: 5500,
    category: "Traditional",
    status: "ACTIVE",
    orders: 312
  },
  {
    id: "abacha",
    name: "African Salad (Abacha)",
    price: 6500,
    category: "Traditional",
    status: "ACTIVE",
    orders: 67
  },
  {
    id: "fried-rice",
    name: "Special Fried Rice",
    price: 7000,
    category: "Main Course",
    status: "ACTIVE",
    orders: 112
  },
  {
    id: "spaghetti-chicken",
    name: "Spaghetti with Chicken",
    price: 8000,
    category: "Main Course",
    status: "ACTIVE",
    orders: 95
  },
  {
    id: "amala-ewedu",
    name: "Amala and Ewedu",
    price: 5500,
    category: "Traditional",
    status: "ACTIVE",
    orders: 184
  },
  {
    id: "banga-soup",
    name: "Banga Soup and Starch",
    price: 9500,
    category: "Traditional",
    status: "ACTIVE",
    orders: 43
  },
  {
    id: "efo-riro",
    name: "Efo Riro and Fufu",
    price: 8500,
    category: "Traditional",
    status: "ACTIVE",
    orders: 128
  },
  {
    id: "grilled-fish",
    name: "Gourmet Grilled Fish",
    price: 15000,
    category: "Seafood",
    status: "ACTIVE",
    orders: 56
  },
  {
    id: "vegetable-soup",
    name: "Edikang Ikong (Vegetable Soup)",
    price: 10000,
    category: "Traditional",
    status: "ACTIVE",
    orders: 88
  },
  {
    id: "beans-plantain",
    name: "Nigerian Beans and Plantain",
    price: 5000,
    category: "Traditional",
    status: "ACTIVE",
    orders: 54
  }
];

export default function AdminMenuPage() {
  const [search, setSearch] = useState("");

  const filteredDishes = dishes.filter(d => 
    d.name.toLowerCase().includes(search.toLowerCase()) || 
    d.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex bg-[#F8F5F2] min-h-screen">
      <AdminSidebar />
      <main className="flex-1 lg:ml-64 p-6 lg:p-12 pt-24 lg:pt-12 transition-all duration-300">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-3xl lg:text-4xl font-serif font-bold text-primary italic">Menu Management</h1>
            <p className="text-muted mt-2 text-sm">Curate and refine your culinary offerings.</p>
          </div>
          <Button className="h-14 lg:h-16 px-6 lg:px-8 rounded-2xl flex items-center space-x-3 shadow-xl shadow-primary/10 self-end md:self-auto">
            <Plus className="h-5 w-5" />
            <span className="text-sm lg:text-base font-bold">Add New Dish</span>
          </Button>
        </header>

        <section className="mb-10 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="relative flex-1 group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted group-focus-within:text-accent transition-colors" />
            <input 
              type="text" 
              placeholder="Search by name or category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-14 lg:h-16 pl-14 pr-6 bg-white rounded-2xl border-none shadow-sm focus:ring-2 focus:ring-accent transition-all font-medium text-sm"
            />
          </div>
          <Button variant="subtle" className="h-14 w-14 lg:h-16 lg:w-16 rounded-2xl bg-white shadow-sm flex items-center justify-center p-0 self-end md:self-auto">
            <Filter className="h-5 w-5 lg:h-6 lg:w-6 text-primary" />
          </Button>
        </section>

        <Card className="border-none shadow-sm overflow-hidden rounded-3xl">
          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left min-w-[800px]">
              <thead>
                <tr className="bg-primary/5 text-[10px] font-black tracking-[0.2em] text-muted uppercase">
                  <th className="px-6 lg:px-8 py-6">Dish Details</th>
                  <th className="px-6 lg:px-8 py-6">Category</th>
                  <th className="px-6 lg:px-8 py-6">Price</th>
                  <th className="px-6 lg:px-8 py-6">Status</th>
                  <th className="px-6 lg:px-8 py-6">Total Orders</th>
                  <th className="px-6 lg:px-8 py-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-primary/5">
                {filteredDishes.map((dish) => (
                  <tr key={dish.id} className="hover:bg-primary/[0.02] transition-colors group">
                    <td className="px-6 lg:px-8 py-6">
                      <div className="flex items-center space-x-4">
                        <div className="h-12 w-12 lg:h-14 lg:w-14 rounded-xl bg-primary/5 flex-shrink-0 flex items-center justify-center text-primary font-bold">
                          {dish.name[0]}
                        </div>
                        <span className="font-bold text-primary text-sm lg:text-base">{dish.name}</span>
                      </div>
                    </td>
                    <td className="px-6 lg:px-8 py-6 transition-colors group-hover:text-accent">
                      <span className="text-sm font-medium">{dish.category}</span>
                    </td>
                    <td className="px-6 lg:px-8 py-6">
                      <span className="font-serif font-black italic text-primary text-lg">₦{dish.price.toLocaleString()}</span>
                    </td>
                    <td className="px-6 lg:px-8 py-6">
                      <Badge variant={dish.status === "ACTIVE" ? "success" : "neutral"} className="rounded-lg py-1">
                        {dish.status.replace("_", " ")}
                      </Badge>
                    </td>
                    <td className="px-6 lg:px-8 py-6">
                      <span className="text-sm font-bold text-muted">{dish.orders}</span>
                    </td>
                    <td className="px-6 lg:px-8 py-6 text-right">
                      <div className="flex justify-end space-x-2">
                        <Button variant="subtle" size="icon" className="h-10 w-10 rounded-xl bg-primary/5 hover:bg-accent hover:text-white transition-all">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button variant="subtle" size="icon" className="h-10 w-10 rounded-xl bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white transition-all">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <Link href={`/dish/${dish.id}`}>
                          <Button variant="subtle" size="icon" className="h-10 w-10 rounded-xl bg-primary/5 hover:bg-primary hover:text-white transition-all">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </main>
    </div>
  );
}


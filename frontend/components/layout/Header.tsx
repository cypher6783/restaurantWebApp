"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, Bell, Search, Share2, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  rightAction?: "cart" | "share" | "search" | "notifications";
  className?: string;
}

export function Header({ title, showBack, rightAction, className }: HeaderProps) {
  const router = useRouter();

  return (
    <header className={cn("flex items-center justify-between px-6 h-16 sticky top-0 bg-background/80 backdrop-blur-lg z-40 transition-all", className)}>
      <div className="flex items-center space-x-4">
        {showBack && (
          <Button
            variant="subtle"
            size="icon"
            className="rounded-full h-10 w-10 border-none shadow-md"
            onClick={() => router.back()}
          >
            <ChevronLeft className="h-6 w-6 text-primary" />
          </Button>
        )}
        {title && <h1 className="text-xl font-bold text-primary">{title}</h1>}
      </div>

      <div className="flex items-center">
        {rightAction === "notifications" && (
          <div className="relative">
            <Bell className="h-6 w-6 text-primary" />
            <span className="absolute top-0 right-0 h-2 w-2 bg-accent rounded-full border-2 border-white" />
          </div>
        )}
        {rightAction === "share" && (
          <Button variant="subtle" size="icon" className="rounded-full shadow-md">
            <Share2 className="h-5 w-5 text-primary" />
          </Button>
        )}
        {rightAction === "cart" && (
          <Link href="/cart">
            <Button variant="subtle" size="icon" className="rounded-full bg-accent hover:bg-accent/90">
              <ShoppingCart className="h-5 w-5 text-white" />
            </Button>
          </Link>
        )}
      </div>
    </header>
  );
}

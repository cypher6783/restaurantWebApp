"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Header } from "@/components/layout/Header";
import { Mail, Lock, Eye, Wine, Users2, ChefHat } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#F8F5F2] flex flex-col items-center px-8 py-12 relative overflow-hidden">
      {/* Decorative Icons background */}
      <div className="absolute top-[20%] -left-8 text-primary/5 -rotate-12 scale-150">
        <ChefHat className="h-24 w-24" />
      </div>
      <div className="absolute bottom-[10%] -right-8 text-primary/5 rotate-12 scale-150">
        <Wine className="h-24 w-24" />
      </div>
      
      <div className="w-full max-w-md flex-1 flex flex-col items-center justify-center">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-serif font-black text-primary tracking-tighter italic mb-1">REFINED</h1>
          <div className="h-1 w-16 bg-accent/30 mx-auto rounded-full" />
        </header>

        <Card className="w-full p-10 bg-white border border-primary/5">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-serif font-bold text-primary mb-2 italic">Welcome Back</h2>
            <p className="text-muted text-sm font-medium">Sign in to your refined dining experience</p>
          </div>

          <form className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-primary uppercase tracking-widest pl-1">Email Address</label>
              <Input 
                type="email" 
                placeholder="email@example.com" 
                icon={<Mail className="h-5 w-5" />}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-bold text-primary uppercase tracking-widest pl-1">Password</label>
              <Input 
                type="password" 
                placeholder="Enter your password" 
                icon={<Lock className="h-5 w-5" />}
              />
              <div className="text-right mt-1">
                <Link href="#" className="text-xs font-bold text-primary/60 hover:text-accent tracking-wide uppercase">Forgot Password?</Link>
              </div>
            </div>

            <Button className="w-full h-16 rounded-3xl text-lg font-bold shadow-xl shadow-primary/20 bg-primary hover:bg-primary/90 mt-8">
              Login
            </Button>
          </form>
          
          <div className="mt-12 text-center">
            <p className="text-sm font-medium text-muted">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-primary font-bold hover:text-accent transition-colors underline decoration-accent/30 underline-offset-4">Sign Up</Link>
            </p>
          </div>
        </Card>
      </div>

      <footer className="mt-auto pt-8 flex space-x-10 text-primary/20">
        <ChefHat className="h-8 w-8" />
        <Wine className="h-8 w-8" />
        <Users2 className="h-8 w-8" />
      </footer>
    </div>
  );
}

function Card({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={cn("rounded-[40px] shadow-2xl shadow-primary/5", className)}>
      {children}
    </div>
  );
}

const cn = (...classes: any[]) => classes.filter(Boolean).join(" ");

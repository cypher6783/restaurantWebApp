"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { User, Mail, Lock, Phone, Wine, Users2, ChefHat, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authApi } from "@/lib/apiConnect";
import { Card } from "@/components/ui/Card";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await authApi.register({ name, email, phone, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      router.push('/menu');
    } catch (err: any) {
      setError(err.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F5F2] flex flex-col items-center px-8 py-12 relative overflow-hidden">
      {/* Decorative Icons background */}
      <div className="absolute top-[15%] -right-8 text-primary/5 rotate-12 scale-150">
        <Users2 className="h-24 w-24" />
      </div>
      <div className="absolute bottom-[20%] -left-8 text-primary/5 -rotate-12 scale-150">
        <Wine className="h-24 w-24" />
      </div>

      <div className="w-full max-w-md flex-1 flex flex-col items-center justify-center">
        <header className="mb-8 w-full">
           <Button 
            variant="subtle" 
            size="icon" 
            className="rounded-full shadow-md bg-white border-none mb-8"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-5 w-5 text-primary" />
          </Button>
          <div className="text-center">
            <h1 className="text-4xl font-serif font-black text-primary tracking-tighter italic mb-1">REFINED</h1>
            <div className="h-1 w-16 bg-accent/30 mx-auto rounded-full" />
          </div>
        </header>

        <Card className="w-full p-10 bg-white rounded-[40px] shadow-2xl shadow-primary/5 border border-primary/5">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-serif font-bold text-primary mb-2 italic">Join the Table</h2>
            <p className="text-muted text-sm font-medium">Create your refined dining profile</p>
          </div>

          <form className="space-y-4" onSubmit={handleRegister}>
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-[10px] font-black tracking-widest text-center uppercase">
                {error}
              </div>
            )}
            
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-primary uppercase tracking-[0.2em] pl-1">Full Name</label>
              <Input 
                type="text" 
                placeholder="Adesua Etomi" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                icon={<User className="h-5 w-5" />}
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-primary uppercase tracking-[0.2em] pl-1">Email Address</label>
              <Input 
                type="email" 
                placeholder="email@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={<Mail className="h-5 w-5" />}
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-primary uppercase tracking-[0.2em] pl-1">Phone Number</label>
              <Input 
                type="tel" 
                placeholder="+234 800 000 0000" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                icon={<Phone className="h-5 w-5" />}
                required
              />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-primary uppercase tracking-[0.2em] pl-1">Password</label>
              <Input 
                type="password" 
                placeholder="Choose a strong password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={<Lock className="h-5 w-5" />}
                required
              />
            </div>

            <Button 
              type="submit"
              disabled={isLoading}
              className="w-full h-16 rounded-3xl text-lg font-bold shadow-xl shadow-primary/20 bg-primary hover:bg-primary/90 mt-8"
            >
              {isLoading ? "Preparing your table..." : "Create Account"}
            </Button>
          </form>
          
          <div className="mt-10 text-center">
            <p className="text-sm font-medium text-muted">
              Already a member?{" "}
              <Link href="/login" className="text-primary font-bold hover:text-accent transition-colors underline decoration-accent/30 underline-offset-4 tracking-tight">Sign In</Link>
            </p>
          </div>
        </Card>
      </div>

      <footer className="mt-auto pt-8 flex space-x-10 text-primary/20 opacity-50">
        <ChefHat className="h-8 w-8" />
        <Wine className="h-8 w-8" />
        <Users2 className="h-8 w-8" />
      </footer>
    </div>
  );
}

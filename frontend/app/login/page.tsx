"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { Mail, Lock, Wine, Users2, ChefHat } from "lucide-react";
import Link from "next/link";
<<<<<<< HEAD
=======
<<<<<<< HEAD:app/login/page.tsx
import { useRouter } from "next/navigation";
>>>>>>> acce792a55a573730087bf94e57f5f0608dd3e45
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authApi } from "@/lib/api";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await authApi.login({ email, password });
      // The response.data contains the token and user info
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      router.push('/menu');
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
<<<<<<< HEAD
      setIsLoading(false);
=======
      setLoading(false);
=======
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authApi } from "@/lib/api";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/Card";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await authApi.login({ email, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      router.push('/menu');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
>>>>>>> eadd8ba (Refactor: Restructure project into frontend/ and backend/, and polish UI/UX):frontend/app/login/page.tsx
>>>>>>> acce792a55a573730087bf94e57f5f0608dd3e45
    }
  };

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

<<<<<<< HEAD
          <form className="space-y-6" onSubmit={handleLogin}>
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-xs font-bold text-center animate-shake uppercase tracking-widest">
                {error}
              </div>
            )}

=======
<<<<<<< HEAD:app/login/page.tsx
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-xs font-bold text-center animate-shake">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleLogin}>
=======
          <form className="space-y-6" onSubmit={handleLogin}>
            {error && <p className="text-rose-500 text-xs font-bold text-center uppercase tracking-widest">{error}</p>}
>>>>>>> eadd8ba (Refactor: Restructure project into frontend/ and backend/, and polish UI/UX):frontend/app/login/page.tsx
>>>>>>> acce792a55a573730087bf94e57f5f0608dd3e45
            <div className="space-y-2">
              <label className="text-sm font-bold text-primary uppercase tracking-widest pl-1">Email Address</label>
              <Input 
                type="email" 
                placeholder="email@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={<Mail className="h-5 w-5" />}
<<<<<<< HEAD:app/login/page.tsx
=======
                value={email}
                onChange={(e) => setEmail(e.target.value)}
>>>>>>> eadd8ba (Refactor: Restructure project into frontend/ and backend/, and polish UI/UX):frontend/app/login/page.tsx
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-bold text-primary uppercase tracking-widest pl-1">Password</label>
              <Input 
                type="password" 
                placeholder="Enter your password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={<Lock className="h-5 w-5" />}
<<<<<<< HEAD:app/login/page.tsx
=======
                value={password}
                onChange={(e) => setPassword(e.target.value)}
>>>>>>> eadd8ba (Refactor: Restructure project into frontend/ and backend/, and polish UI/UX):frontend/app/login/page.tsx
                required
              />
              <div className="text-right mt-1">
                <Link href="#" className="text-xs font-bold text-primary/60 hover:text-accent tracking-wide uppercase">Forgot Password?</Link>
              </div>
            </div>

            <Button 
              type="submit"
              disabled={isLoading}
              className="w-full h-16 rounded-3xl text-lg font-bold shadow-xl shadow-primary/20 bg-primary hover:bg-primary/90 mt-8"
            >
              {isLoading ? "Signing in..." : "Login"}
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
<<<<<<< HEAD
=======

<<<<<<< HEAD:app/login/page.tsx
=======
    </div>
  );
}
>>>>>>> eadd8ba (Refactor: Restructure project into frontend/ and backend/, and polish UI/UX):frontend/app/login/page.tsx
>>>>>>> acce792a55a573730087bf94e57f5f0608dd3e45

"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Star, Clock, ChevronRight, Flame, Leaf, Zap } from "lucide-react";

const featuredDishes = [
  {
    id: "smokey-jollof",
    name: "Smokey Jollof Rice",
    price: "₦7,500",
    rating: "4.9",
    time: "25 mins",
    tag: "CHEF'S SPECIAL",
    image: "/images/jollof-rice.jpg",
    bg: "from-orange-900/80 to-amber-700/60",
    accent: "bg-orange-500",
  },
  {
    id: "egusi-soup",
    name: "Egusi & Pounded Yam",
    price: "₦9,000",
    rating: "5.0",
    time: "30 mins",
    tag: "BEST SELLER",
    image: "/images/egusi-pounded-yam.jpg",
    bg: "from-green-900/80 to-emerald-700/60",
    accent: "bg-emerald-500",
  },
  {
    id: "peppered-snail",
    name: "Peppered Snail",
    price: "₦8,500",
    rating: "4.8",
    time: "15 mins",
    tag: "POPULAR",
    image: "/images/peppered-snail.jpeg",
    bg: "from-red-900/80 to-rose-700/60",
    accent: "bg-rose-500",
  },
];


const features = [
  {
    icon: Flame,
    title: "Chef's Artistry",
    desc: "Every dish prepared by award-winning Nigerian culinary masters.",
    color: "text-orange-500",
    bg: "bg-orange-50",
  },
  {
    icon: Leaf,
    title: "Fresh Ingredients",
    desc: "Sourced daily from local farms and premium Nigerian markets.",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    icon: Zap,
    title: "Swift Delivery",
    desc: "Hot, perfectly presented meals at your door in under 45 minutes.",
    color: "text-accent",
    bg: "bg-accent/10",
  },
];

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/menu');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden min-h-[75vh] flex flex-col px-8 pb-14 pt-16">
        <Image 
          src="/images/hero.png"
          alt="Luxury Nigerian Dining"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1B3C35] via-[#1B3C35]/40 to-transparent" />
        
        {/* decorative circles */}
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-accent/10 blur-3xl z-10" />
        <div className="absolute top-10 -left-16 w-48 h-48 rounded-full bg-white/5 blur-2xl z-10" />

        {/* top bar */}
        <div className="relative flex items-center justify-between z-20 mb-12">
          <div>
            <p className="text-white/40 text-[10px] font-black tracking-[0.3em] uppercase mb-1">Welcome to</p>
            <h1 className="text-4xl font-serif font-black text-white italic tracking-tight">REFINED</h1>
          </div>
          <Link
            href="/login"
            className="px-5 py-2.5 rounded-full border border-white/20 text-white/80 text-xs font-bold tracking-widest hover:bg-white/10 transition-all"
          >
            SIGN IN
          </Link>
        </div>

        <div className="relative z-20 mt-auto">
          <div className="inline-flex items-center space-x-2 bg-accent/20 border border-accent/30 rounded-full px-4 py-1.5 mb-6">
            <span className="h-1.5 w-1.5 bg-accent rounded-full animate-pulse" />
            <span className="text-accent text-[10px] font-black tracking-[0.2em]">LUXURY NIGERIAN DINING</span>
          </div>
          <h2 className="text-5xl font-serif font-black italic text-white leading-tight tracking-tight mb-6">
            Experience<br />the Finest<br />Nigerian Cuisine
          </h2>
          <p className="text-white/50 text-sm font-medium leading-relaxed mb-10 max-w-xs">
            Handcrafted flavours rooted in tradition, elevated to perfection.
          </p>
          <div className="flex space-x-4">
            <Link
              href="/menu"
              className="flex-1 h-14 bg-accent rounded-2xl flex items-center justify-center space-x-2 text-white font-bold shadow-xl shadow-accent/30 hover:bg-accent/90 transition-all"
            >
              <span>Explore Menu</span>
              <ChevronRight className="h-5 w-5" />
            </Link>
            <Link
              href="/register"
              className="h-14 px-6 bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center text-white font-bold hover:bg-white/20 transition-all"
            >
              Join
            </Link>
          </div>
        </div>
      </section>

      {/* ── Featured Dishes ── */}
      <section className="px-6 pt-10 pb-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-serif font-black italic text-primary">Featured Cuisines</h2>
          <Link href="/menu" className="text-[10px] font-black tracking-widest text-accent hover:underline">VIEW ALL</Link>
        </div>

        <div className="flex space-x-4 overflow-x-auto no-scrollbar -mx-6 px-6 pb-4">
          {featuredDishes.map((dish) => (
            <Link key={dish.id} href={`/dish/${dish.id}`} className="flex-shrink-0 w-52">
              <div className={`relative h-72 w-52 rounded-[28px] overflow-hidden flex flex-col justify-between p-5`}>
                <Image 
                  src={dish.image}
                  alt={dish.name}
                  fill
                  className="object-cover"
                  sizes="208px"
                />
                <div className={`absolute inset-0 bg-gradient-to-b ${dish.bg}`} />

                <div className="relative z-10">
                  <span className={`inline-block ${dish.accent} text-white text-[9px] font-black tracking-widest px-3 py-1 rounded-full`}>
                    {dish.tag}
                  </span>
                </div>

                <div className="relative z-10 text-white">
                  <h3 className="text-lg font-serif font-black italic leading-tight mb-2">{dish.name}</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 text-amber-400 fill-current" />
                      <span className="text-xs font-bold">{dish.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-white/60">
                      <Clock className="h-3 w-3" />
                      <span className="text-xs font-bold">{dish.time}</span>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <p className="text-xl font-black italic">{dish.price}</p>
                    <div className="h-9 w-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white hover:text-primary transition-all">
                      <ChevronRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>


      {/* ── Why Us ── */}
      <section className="px-6 pt-6">
        <h2 className="text-2xl font-serif font-black italic text-primary mb-6">Why REFINED?</h2>
        <div className="space-y-4">
          {features.map((f) => (
            <div key={f.title} className="flex items-start space-x-5 p-5 bg-white rounded-3xl shadow-sm border border-primary/5">
              <div className={`h-12 w-12 rounded-2xl ${f.bg} flex items-center justify-center flex-shrink-0`}>
                <f.icon className={`h-6 w-6 ${f.color}`} />
              </div>
              <div>
                <h3 className="font-bold text-primary text-base mb-1">{f.title}</h3>
                <p className="text-sm text-primary/60 font-medium leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* ── Footer ── */}
      <footer className="px-8 pt-16 pb-12 bg-[#F8F5F2] mt-16 rounded-t-[40px] border-t border-primary/5">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-serif font-black italic text-primary tracking-tight mb-2">REFINED</h2>
          <p className="text-[10px] font-black tracking-[0.3em] text-accent uppercase">Luxury Nigerian Dining</p>
        </div>
        
        <div className="grid grid-cols-2 gap-8 mb-12">
          <div className="space-y-4">
            <h4 className="text-[10px] font-black tracking-widest text-muted uppercase">Discover</h4>
            <ul className="space-y-3">
              <li><Link href="/menu" className="text-sm font-bold text-primary/70 hover:text-accent transition-colors">Digital Menu</Link></li>
              <li><Link href="/about" className="text-sm font-bold text-primary/70 hover:text-accent transition-colors">Our Story</Link></li>
              <li><Link href="/contact" className="text-sm font-bold text-primary/70 hover:text-accent transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          <div className="space-y-4 text-right">
            <h4 className="text-[10px] font-black tracking-widest text-muted uppercase">Experience</h4>
            <ul className="space-y-3">
              <li className="text-sm font-bold text-primary/70">Reservations</li>
              <li className="text-sm font-bold text-primary/70">Catering</li>
              <li className="text-sm font-bold text-primary/70">Membership</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-primary/5 text-center">
          <p className="text-[9px] font-black tracking-widest text-muted uppercase opacity-50">
            © 2026 REFINED CULINARY GROUP. ALL RIGHTS RESERVED.
          </p>
        </div>
      </footer>

    </div>
  );
}

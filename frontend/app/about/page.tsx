"use client";

import { Header } from "@/components/layout/Header";

import Image from "next/image";
import { Star, Award, Users, Utensils } from "lucide-react";

const milestones = [
  { year: "2018", title: "The Humble Kitchen", desc: "Started as a small family-run kitchen in the heart of Lagos." },
  { year: "2020", title: "Chef's Excellence", desc: "Received the Nigerian Culinary Arts Award for innovation in traditional dishes." },
  { year: "2023", title: "Luxury Redefined", desc: "Opened our flagship fine-dining location with a focus on modern West African cuisine." },
  { year: "2026", title: "Digital Elegance", desc: "Launched our premium ordering platform to bring luxury to your doorstep." },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background pb-32">
      <Header title="Our Story" showBack />
      
      <main className="px-6 py-8">
        <section className="relative h-64 w-full rounded-[40px] overflow-hidden mb-12 shadow-2xl">
          <Image 
            src="/images/hero.png" 
            alt="REFINED Interior" 
            fill 
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="absolute bottom-8 left-8">
            <h2 className="text-3xl font-serif font-black italic text-white leading-tight">Heritage &<br />Modernity</h2>
          </div>
        </section>

        <section className="mb-16">
          <p className="text-xl font-serif font-bold italic text-primary leading-relaxed mb-6">
            At REFINED, we believe that Nigerian cuisine is a symphony of flavors, a journey of tradition, and an expression of luxury.
          </p>
          <div className="space-y-6 text-primary/70 text-sm font-medium leading-relaxed">
            <p>
              Our journey began with a simple passion: to elevate the rich, diverse culinary heritage of West Africa to the heights of global fine dining. Every dish we serve is a testament to this mission.
            </p>
            <p>
              From the firewood-smoked aroma of our signature Jollof to the delicate complexity of our gourmet Egusi, we source only the finest seasonal ingredients from local farmers who share our commitment to quality.
            </p>
          </div>
        </section>

        <section className="grid grid-cols-2 gap-4 mb-16">
          {[
            { icon: Award, label: "Award Winning", count: "12+" },
            { icon: Users, label: "Happy Guests", count: "50k+" },
            { icon: Utensils, label: "Unique Dishes", count: "45" },
            { icon: Star, label: "Michelin Starred", count: "2" },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-[32px] shadow-sm border border-primary/5 flex flex-col items-center text-center">
              <stat.icon className="h-6 w-6 text-accent mb-3" />
              <p className="text-2xl font-black italic text-primary">{stat.count}</p>
              <p className="text-[10px] font-black tracking-widest text-muted uppercase mt-1">{stat.label}</p>
            </div>
          ))}
        </section>

        <section className="mb-16">
          <h3 className="text-2xl font-serif font-black italic text-primary mb-8">Our Journey</h3>
          <div className="space-y-12">
            {milestones.map((m, i) => (
              <div key={i} className="relative pl-10">
                <div className="absolute left-0 top-0 bottom-0 w-px bg-primary/10" />
                <div className="absolute left-[-4px] top-1.5 h-2 w-2 rounded-full bg-accent" />
                <p className="text-accent font-black text-xs tracking-[0.2em] mb-2">{m.year}</p>
                <h4 className="text-lg font-bold text-primary mb-1">{m.title}</h4>
                <p className="text-sm text-primary/60 font-medium leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="p-8 bg-[#1B3C35] rounded-[40px] relative overflow-hidden text-center shadow-xl shadow-primary/10">
           <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-accent/10 blur-3xl" />
           <h3 className="text-2xl font-serif font-black italic text-white mb-4">Join the Table</h3>
           <p className="text-white/60 text-sm font-medium mb-8 leading-relaxed">
             Experience the refinement of Nigeria's finest culinary house.
           </p>
           <button className="h-14 px-8 bg-accent rounded-2xl text-white font-bold text-sm tracking-widest hover:bg-accent/90 transition-all shadow-xl shadow-accent/20">
             RESERVE NOW
           </button>
        </section>
      </main>

      
    </div>
  );
}

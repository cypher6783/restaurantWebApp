"use client";

import { Header } from "@/components/layout/Header";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Phone, Mail, MapPin, MessageSquare, Instagram, Twitter, Facebook } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div className="min-h-screen bg-background pb-32">
      <Header title="Get in Touch" showBack />
      
      <main className="px-6 py-8">
        <section className="mb-12">
          <h2 className="text-4xl font-serif font-black italic text-primary leading-tight mb-4">We'd Love to<br />Hear From You</h2>
          <p className="text-primary/60 text-sm font-medium leading-relaxed max-w-xs">
            Whether for reservations, catering enquiries, or feedback, our team is at your disposal.
          </p>
        </section>

        <section className="grid grid-cols-1 gap-4 mb-12">
          {[
            { icon: Phone, label: "Call Us", details: "+234 812 345 6789" },
            { icon: Mail, label: "Email Us", details: "concierge@refined.com" },
            { icon: MapPin, label: "Visit Us", details: "12 Admiralty Way, Lekki Phase 1, Lagos" },
          ].map((item, i) => (
            <Card key={i} className="p-6 rounded-3xl border-none bg-white shadow-sm flex items-center space-x-5">
              <div className="h-12 w-12 rounded-2xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                <item.icon className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-[10px] font-black tracking-widest text-muted uppercase mb-0.5">{item.label}</p>
                <p className="text-sm font-bold text-primary">{item.details}</p>
              </div>
            </Card>
          ))}
        </section>

        <section className="mb-12 overflow-hidden rounded-3xl shadow-sm border border-primary/5 bg-white">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7907.27833668589!2d8.53300199036634!3d7.721807769184953!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x105081e6f4e4fd45%3A0x5ea1a9e4e88a3f1f!2sChicken%20Republic%20Makurdi!5e0!3m2!1sen!2sng!4v1774464131683!5m2!1sen!2sng" 
            width="100%" 
            height="350" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full grayscale-[20%] contrast-125 transition-all hover:grayscale-0"
          ></iframe>
        </section>

        <section className="bg-white rounded-[40px] p-8 shadow-sm border border-primary/5 mb-12">
          <h3 className="text-xl font-serif font-black italic text-primary mb-8">Send a Message</h3>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="text-[10px] font-black tracking-[0.2em] text-muted uppercase mb-2 block">Name</label>
              <input 
                type="text" 
                placeholder="Adesua Etomi"
                className="w-full h-14 px-6 bg-primary/5 rounded-2xl border-none focus:ring-2 focus:ring-accent transition-all text-sm font-medium"
                value={formState.name}
                onChange={(e) => setFormState({...formState, name: e.target.value})}
              />
            </div>
            <div>
              <label className="text-[10px] font-black tracking-[0.2em] text-muted uppercase mb-2 block">Email</label>
              <input 
                type="email" 
                placeholder="adesua@example.com"
                className="w-full h-14 px-6 bg-primary/5 rounded-2xl border-none focus:ring-2 focus:ring-accent transition-all text-sm font-medium"
                value={formState.email}
                onChange={(e) => setFormState({...formState, email: e.target.value})}
              />
            </div>
            <div>
              <label className="text-[10px] font-black tracking-[0.2em] text-muted uppercase mb-2 block">Message</label>
              <textarea 
                placeholder="How can we assist you today?"
                rows={4}
                className="w-full p-6 bg-primary/5 rounded-2xl border-none focus:ring-2 focus:ring-accent transition-all text-sm font-medium resize-none"
                value={formState.message}
                onChange={(e) => setFormState({...formState, message: e.target.value})}
              ></textarea>
            </div>
            <Button className="w-full h-16 rounded-2xl text-base font-bold shadow-xl shadow-accent/20" type="submit">
              {sent ? "Message Sent!" : "Send Message"}
            </Button>
          </form>
        </section>

        <section className="flex justify-center space-x-6">
          {[Instagram, Twitter, Facebook].map((Icon, i) => (
            <button key={i} className="h-14 w-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-primary hover:text-accent transition-colors">
              <Icon className="h-6 w-6" />
            </button>
          ))}
        </section>
      </main>

      
    </div>
  );
}

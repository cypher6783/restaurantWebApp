"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

import { CalendarDays, Users, Clock, CheckCircle2, Utensils, Wine } from "lucide-react";
import { reservationApi } from "@/lib/apiConnect";

const timeSlots = ["18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00"];
const guestOptions = [1, 2, 3, 4, 5, "6+"];

export default function ReservationsPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "",
    special: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectField = (field: string, value: string | number) => {
    setFormData({ ...formData, [field]: value.toString() });
  };

  const handleNextStep = () => {
    if (step === 1 && formData.date && formData.time && formData.guests) {
      setStep(2);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) return;

    setLoading(true);
    try {
      await reservationApi.create({
        ...formData,
        guests: formData.guests === "6+" ? 6 : parseInt(formData.guests),
      });
      setSuccess(true);
    } catch (error) {
      console.error("Reservation failed:", error);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#FDFCF9] flex flex-col items-center justify-center p-8 text-center">
        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-8">
          <CheckCircle2 className="w-12 h-12 text-primary" />
        </div>
        <h1 className="text-4xl font-serif font-black italic text-primary mb-4">Table Reserved</h1>
        <p className="text-primary/60 text-lg mb-8 max-w-sm">
          Your culinary journey is confirmed for <span className="font-bold text-primary">{formData.date}</span> at <span className="font-bold text-primary">{formData.time}</span>.
        </p>
        <div className="bg-white p-6 rounded-2xl border border-primary/5 shadow-sm max-w-sm w-full mb-12">
          <div className="flex items-center justify-between py-3 border-b border-primary/5">
            <span className="text-sm font-bold text-muted uppercase tracking-widest">Name</span>
            <span className="font-serif italic font-bold text-primary">{formData.name}</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-primary/5">
            <span className="text-sm font-bold text-muted uppercase tracking-widest">Guests</span>
            <span className="font-serif italic font-bold text-primary">{formData.guests} People</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-primary/5">
            <span className="text-sm font-bold text-muted uppercase tracking-widest">Contact</span>
            <span className="font-serif italic font-bold text-primary">{formData.phone}</span>
          </div>
        </div>
        <Button onClick={() => window.location.href = '/'} className="h-14 px-12 rounded-2xl font-bold bg-accent hover:bg-accent/90 text-white">
          Return Home
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFCF9] pb-32">
      <Header />
      
      <main className="px-6 pt-8 max-w-md mx-auto">
        <div className="mb-10">
          <span className="text-[10px] font-black text-accent uppercase tracking-[0.3em]">Exclusive Dining</span>
          <h1 className="text-4xl font-serif font-black text-primary leading-tight mt-2 italic">
            Reserve Your<br />Experience
          </h1>
        </div>

        <form onSubmit={step === 2 ? handleSubmit : (e) => e.preventDefault()} className="space-y-8">
          {step === 1 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Date Selection */}
              <div className="space-y-4">
                <label className="flex items-center text-xs font-bold text-muted uppercase tracking-widest">
                  <CalendarDays className="w-4 h-4 mr-2" /> Select Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full h-14 bg-white border border-primary/10 rounded-2xl px-4 text-primary font-bold focus:outline-none focus:border-accent transition-colors block appearance-none"
                    style={{ WebkitAppearance: 'none' }}
                  />
                </div>
              </div>

              {/* Time Selection */}
              <div className="space-y-4">
                <label className="flex items-center text-xs font-bold text-muted uppercase tracking-widest">
                  <Clock className="w-4 h-4 mr-2" /> Select Time
                </label>
                <div className="flex flex-wrap gap-3">
                  {timeSlots.map(time => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => handleSelectField("time", time)}
                      className={cn(
                        "px-6 py-3 rounded-xl text-sm font-bold transition-all border",
                        formData.time === time 
                          ? "bg-primary text-white border-primary shadow-md" 
                          : "bg-white text-muted border-primary/10 hover:border-primary/30"
                      )}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              {/* Guests Selection */}
              <div className="space-y-4">
                <label className="flex items-center text-xs font-bold text-muted uppercase tracking-widest">
                  <Users className="w-4 h-4 mr-2" /> Guests
                </label>
                <div className="flex flex-wrap gap-3">
                  {guestOptions.map(num => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => handleSelectField("guests", num)}
                      className={cn(
                        "w-14 h-14 rounded-2xl text-lg font-bold transition-all border flex items-center justify-center",
                        formData.guests === num.toString() 
                          ? "bg-primary text-white border-primary shadow-md scale-105" 
                          : "bg-white text-primary border-primary/10 hover:border-primary/30"
                      )}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              <Button 
                type="button"
                onClick={handleNextStep}
                disabled={!formData.date || !formData.time || !formData.guests}
                className="w-full h-14 rounded-2xl font-bold mt-4"
              >
                Continue to Details
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="bg-primary/5 rounded-2xl p-4 flex justify-between items-center mb-6">
                <div className="text-sm font-bold text-primary">
                  {formData.date} at {formData.time}
                </div>
                <div className="text-sm font-bold text-accent">
                  {formData.guests} Guests
                </div>
                <button 
                  type="button" 
                  onClick={() => setStep(1)}
                  className="text-xs font-bold text-muted underline"
                >
                  Edit
                </button>
              </div>

              <div className="space-y-4">
                <label className="text-xs font-bold text-muted uppercase tracking-widest pl-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="e.g. John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full h-14 bg-white border border-primary/10 rounded-2xl px-6 text-primary placeholder:text-muted/50 focus:outline-none focus:border-accent transition-colors"
                  required
                />
              </div>

              <div className="space-y-4">
                <label className="text-xs font-bold text-muted uppercase tracking-widest pl-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full h-14 bg-white border border-primary/10 rounded-2xl px-6 text-primary placeholder:text-muted/50 focus:outline-none focus:border-accent transition-colors"
                  required
                />
              </div>

              <div className="space-y-4">
                <label className="text-xs font-bold text-muted uppercase tracking-widest pl-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+234..."
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full h-14 bg-white border border-primary/10 rounded-2xl px-6 text-primary placeholder:text-muted/50 focus:outline-none focus:border-accent transition-colors"
                  required
                />
              </div>

              <div className="space-y-4">
                <label className="text-xs font-bold text-muted uppercase tracking-widest pl-2">Special Requests (Optional)</label>
                <textarea
                  name="special"
                  placeholder="Anniversary, dietary requirements..."
                  value={formData.special}
                  onChange={handleChange}
                  className="w-full bg-white border border-primary/10 rounded-2xl p-6 text-primary placeholder:text-muted/50 focus:outline-none focus:border-accent transition-colors resize-none h-32"
                />
              </div>

              <Button 
                type="submit"
                disabled={loading || !formData.name || !formData.email || !formData.phone}
                className="w-full h-14 rounded-2xl font-bold mt-8"
              >
                {loading ? "Confirming..." : "Confirm Reservation"}
              </Button>
            </div>
          )}
        </form>

        <div className="mt-16 flex items-center justify-center space-x-6 opacity-40">
           <Wine className="h-6 w-6 text-primary" />
           <Utensils className="h-6 w-6 text-primary" />
        </div>
      </main>
      
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/Button";
import { userApi } from "@/lib/api";
import { User, Mail, Phone, Lock, Save, Loader2, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    newPassword: ""
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await userApi.getProfile();
        setFormData({
          name: res.data.name || "",
          email: res.data.email || "",
          phone: res.data.phone || "",
          newPassword: ""
        });
      } catch (err) {
        console.error("Failed to fetch profile", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      // In a real app we'd handle password separately or pass it if filled
      await userApi.updateProfile({
        name: formData.name,
        phone: formData.phone
      });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCF9] pb-32">
      <Header title="Settings" showBack />
      
      <main className="px-6 pt-6 max-w-md mx-auto">
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="w-8 h-8 animate-spin text-accent" />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-muted uppercase tracking-widest pl-2">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-muted/50" />
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full h-14 bg-white border border-primary/10 rounded-2xl pl-12 pr-6 text-primary font-medium focus:outline-none focus:border-accent transition-colors"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-muted uppercase tracking-widest pl-2">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-muted/50" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full h-14 bg-primary/5 border border-transparent rounded-2xl pl-12 pr-6 text-muted font-medium focus:outline-none"
                  disabled
                  readOnly
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-accent">NON-EDITABLE</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-muted uppercase tracking-widest pl-2">Phone Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-muted/50" />
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full h-14 bg-white border border-primary/10 rounded-2xl pl-12 pr-6 text-primary font-medium focus:outline-none focus:border-accent transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2 pt-4">
              <label className="text-[10px] font-black text-muted uppercase tracking-widest pl-2">Update Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-muted/50" />
                </div>
                <input
                  type="password"
                  name="newPassword"
                  placeholder="Enter new password to change..."
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="w-full h-14 bg-white border border-primary/10 rounded-2xl pl-12 pr-6 text-primary font-medium focus:outline-none focus:border-accent transition-colors placeholder:text-muted/40"
                />
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={saving}
              className="w-full h-14 rounded-2xl font-bold mt-8 shadow-md"
            >
              {saving ? (
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
              ) : success ? (
                <CheckCircle2 className="w-5 h-5 mr-2" />
              ) : (
                <Save className="w-5 h-5 mr-2" />
              )}
              {saving ? "Saving Changes..." : success ? "Changes Saved!" : "Save Changes"}
            </Button>
            
            <button 
              type="button"
              className="w-full py-4 text-xs font-bold text-rose-500 hover:text-rose-600 transition-colors"
            >
              Request Account Deletion
            </button>
          </form>
        )}
      </main>
    </div>
  );
}

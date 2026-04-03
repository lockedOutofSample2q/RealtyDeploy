"use client";
import React, { useState } from "react";
import { Phone, Mail, MapPin, MessageCircle, Send, ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { toast } from "sonner";
import Link from "next/link";

export default function ContactClient() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          name: `${form.firstName} ${form.lastName}`, 
          email: form.email, 
          phone: form.phone, 
          message: `Subject: ${form.subject}\n\n${form.message}`,
          source: "contact" 
        }),
      });
      if (res.ok) {
        toast.success("Message sent! We'll be in touch within 24 hours.");
        setForm({ firstName: "", lastName: "", email: "", phone: "", subject: "", message: "" });
      } else {
        toast.error("Something went wrong. Please try WhatsApp instead.");
      }
    } catch {
      toast.error("Network error. Please try WhatsApp.");
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full bg-transparent border-b border-white/10 text-white placeholder:text-white/30 font-body text-sm py-4 outline-none focus:border-[var(--gold)] transition-colors";

  return (
    <div className="pt-[var(--nav-height)] min-h-screen bg-[#080808] relative">
      {/* 1. Hero Section (Header) */}
      <section className="relative bg-[#0D0D0D] border-b border-[rgba(201,168,76,0.08)] pb-48 pt-20 px-6">
        {/* Subtle background glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[var(--gold-glow)] blur-[100px] opacity-20" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-white/10 bg-white/5 mb-6 backdrop-blur-md">
            <span className="font-body text-[11px] uppercase tracking-widest text-white/70">
              Contact Us
            </span>
          </div>
          
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 leading-tight">
            Get in touch with our expert team
          </h1>
          
          <p className="font-body text-white/50 text-base md:text-lg max-w-2xl leading-relaxed">
            Whether you&apos;re looking to buy, sell, or rent &mdash; we&apos;re here to guide you every step of the way. Reach out and let&apos;s make your real estate dreams a reality.
          </p>
        </div>
      </section>

      {/* 2. Overlapping Contact Cards */}
      <section className="relative z-20 max-w-7xl mx-auto px-6 -mt-24 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Call Us */}
          <div className="bg-[#141414] border border-white/5 p-8 rounded-2xl shadow-card transition-all hover:-translate-y-1 hover:border-[var(--gold)]/30 group">
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[var(--gold)] mb-6 group-hover:bg-[var(--gold)] group-hover:text-black transition-colors">
              <Phone size={18} />
            </div>
            <h3 className="font-display text-xl text-white mb-2">Call Us</h3>
            <p className="font-body text-sm text-white/40 mb-6">Speak directly with our team</p>
            <a href={`tel:${siteConfig.contact.phone}`} className="font-body text-sm text-white/90 hover:text-[var(--gold)] transition-colors block">
              {siteConfig.contact.phone}
            </a>
          </div>

          {/* Card 2: Email Us */}
          <div className="bg-[#141414] border border-white/5 p-8 rounded-2xl shadow-card transition-all hover:-translate-y-1 hover:border-[var(--gold)]/30 group">
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[var(--gold)] mb-6 group-hover:bg-[var(--gold)] group-hover:text-black transition-colors">
              <Mail size={18} />
            </div>
            <h3 className="font-display text-xl text-white mb-2">Email Us</h3>
            <p className="font-body text-sm text-white/40 mb-6">Get support via email</p>
            <a href={`mailto:${siteConfig.contact.email}`} className="font-body text-sm text-white/90 hover:text-[var(--gold)] transition-colors block">
              {siteConfig.contact.email}
            </a>
          </div>

          {/* Card 3: Visit Us */}
          <div className="bg-[#141414] border border-white/5 p-8 rounded-2xl shadow-card transition-all hover:-translate-y-1 hover:border-[var(--gold)]/30 group">
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[var(--gold)] mb-6 group-hover:bg-[var(--gold)] group-hover:text-black transition-colors">
              <MapPin size={18} />
            </div>
            <h3 className="font-display text-xl text-white mb-2">Visit Us</h3>
            <p className="font-body text-sm text-white/40 mb-6">Drop by our office</p>
            <p className="font-body text-sm text-white/90">
              {siteConfig.contact.address}
            </p>
          </div>

          {/* Card 4: Live Chat */}
          <div className="bg-[#141414] border border-white/5 p-8 rounded-2xl shadow-card transition-all hover:-translate-y-1 hover:border-[var(--gold)]/30 group">
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[var(--gold)] mb-6 group-hover:bg-[var(--gold)] group-hover:text-black transition-colors">
              <MessageCircle size={18} />
            </div>
            <h3 className="font-display text-xl text-white mb-2">Live Chat</h3>
            <p className="font-body text-sm text-white/40 mb-6">Available 9 AM - 6 PM</p>
            <a href={`https://wa.me/${siteConfig.contact.whatsapp}`} target="_blank" rel="noopener noreferrer" className="font-body text-sm text-[var(--gold)] hover:text-[var(--gold-light)] transition-colors inline-block font-medium">
              Start Chat
            </a>
          </div>
        </div>
      </section>

      {/* 3. Send Message & Explore Section */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left: Form */}
          <div className="lg:col-span-8">
            <h2 className="font-display text-3xl text-white mb-10">Send us a message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="First Name"
                  required
                  value={form.firstName}
                  onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                  className={inputClass}
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  required
                  value={form.lastName}
                  onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                  className={inputClass}
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={inputClass}
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className={inputClass}
                />
              </div>

              <input
                type="text"
                placeholder="Subject"
                required
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className={inputClass}
              />
              
              <textarea
                placeholder="Message"
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className={`${inputClass} resize-none pt-4`}
              />
              
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center gap-3 py-3 px-8 rounded-full bg-white text-black font-body font-medium text-sm hover:scale-105 hover:bg-[var(--gold)] transition-all disabled:opacity-60 disabled:cursor-not-allowed group"
                >
                  {loading ? "Sending..." : "Send Message"}
                  {!loading && <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
                </button>
              </div>
            </form>
          </div>

          {/* Right: Explore */}
          <div className="lg:col-span-4">
            <h2 className="font-display text-2xl text-white mb-10">Explore</h2>
            
            <div className="space-y-4">
              <Link href="/list-property" className="block bg-[#141414] border border-white/5 p-6 rounded-2xl hover:border-[var(--gold)]/30 hover:bg-[#1a1a1a] transition-all group flex items-center justify-between">
                <div>
                  <h3 className="font-body text-white font-medium text-base mb-1">List Your Property</h3>
                  <p className="font-body text-white/40 text-sm">Sell or rent with us</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/60 group-hover:bg-[var(--gold)] group-hover:text-black transition-colors">
                  <ArrowRight size={14} />
                </div>
              </Link>
              
              <Link href="/mortgage-calculator" className="block bg-[#141414] border border-white/5 p-6 rounded-2xl hover:border-[var(--gold)]/30 hover:bg-[#1a1a1a] transition-all group flex items-center justify-between">
                <div>
                  <h3 className="font-body text-white font-medium text-base mb-1">Mortgage Calculator</h3>
                  <p className="font-body text-white/40 text-sm">Estimate your payments</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/60 group-hover:bg-[var(--gold)] group-hover:text-black transition-colors">
                  <ArrowRight size={14} />
                </div>
              </Link>
            </div>
          </div>
          
        </div>
      </section>

      {/* 4. Map Section */}
      <section className="bg-[#0D0D0D] border-t border-[rgba(201,168,76,0.08)] py-24">
        <div className="max-w-7xl mx-auto px-6 text-center mb-12">
          <h2 className="font-display text-3xl text-white mb-4">Find Us Here</h2>
          <p className="font-body text-white/50 text-base">Visit our office in the heart of {siteConfig.address?.includes("Mohali") ? "Mohali" : "your city"}</p>
        </div>
        
        <div className="max-w-6xl mx-auto px-6">
          <div className="w-full h-[500px] rounded-3xl overflow-hidden border border-white/10 relative bg-[#141414]">
            {/* Embedded Map: Using OpenStreetMap for simplicity, visually filtered to match dark mode */}
            <iframe 
              src={`https://www.openstreetmap.org/export/embed.html?bbox=76.6800%2C30.6800%2C76.7500%2C30.7300&layer=mapnik&marker=30.7100%2C76.7200`} 
              className="w-full h-full border-0 style-gray-map"
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              style={{ filter: "grayscale(100%) invert(92%) contrast(83%) hover:grayscale(80%) transition-all duration-500" }}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
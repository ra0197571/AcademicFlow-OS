"use client"

import React, { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"
import { 
  ShieldCheck, ArrowRight, Smartphone, RefreshCcw, 
  ArrowLeft, LockKeyhole, Fingerprint, Globe, Info 
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function OTPPage() {
  const [otp, setOtp] = useState(["", "", "", ""])
  const inputRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)]

  useEffect(() => {
    inputRefs[0].current?.focus()
  }, [])

  const handleChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return
    const newOtp = [...otp]
    newOtp[index] = value.substring(value.length - 1)
    setOtp(newOtp)
    if (value && index < 3) {
      inputRefs[index + 1].current?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus()
    }
  }

  return (
    <div className="min-h-screen w-full bg-[#FDFDFD] flex items-center justify-center p-6 relative overflow-hidden font-sans text-slate-900">
      
      {/* 1. ELITE BACKGROUND ELEMENTS (MATCHING LOGIN) */}
      <div className="absolute top-0 left-0 size-[600px] bg-indigo-50/40 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 size-[500px] bg-purple-50/40 blur-[120px] rounded-full translate-x-1/3 translate-y-1/3 pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/graphy.png')] opacity-[0.03] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-[400px] relative z-10"
      >
        {/* 2. BRANDING NODE (MATCHING LOGIN) */}
        <div className="text-center mb-10">
           <div className="size-14 bg-indigo-600 rounded-[22px] flex items-center justify-center text-white mx-auto shadow-2xl shadow-indigo-200 mb-6 ring-4 ring-white relative group">
              <ShieldCheck size={32} strokeWidth={2.5} className="relative z-10" />
           </div>
           <h1 className="text-2xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">
              AcademicFlow <span className="text-indigo-600 font-bold not-italic">OS</span>
           </h1>
           <div className="flex items-center justify-center gap-2 mt-3">
              <span className="h-px w-4 bg-slate-200" />
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em]">Identity Validation Phase</p>
              <span className="h-px w-4 bg-slate-200" />
           </div>
        </div>

        {/* 3. OTP INTERFACE CARD */}
        <Card className="border-none shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-[32px] bg-white/80 backdrop-blur-xl p-8 ring-1 ring-slate-200/50">
           <div className="space-y-8">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                    <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest leading-none">Validate Token</h2>
                    <p className="text-[11px] font-medium text-slate-400 mt-1 uppercase tracking-tight">Security payload sent to node</p>
                </div>
                <Link href="/login" className="size-8 flex items-center justify-center bg-slate-50 hover:bg-slate-100 rounded-lg transition-all text-slate-400 hover:text-indigo-600 border border-slate-100">
                    <ArrowLeft size={14} />
                </Link>
              </div>

              {/* Phone Indicator styled like login input */}
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500 border-r pr-3 border-slate-100">
                    <Smartphone size={16} />
                </div>
                <div className="w-full h-12 pl-14 flex items-center bg-slate-50/50 border border-slate-100 rounded-2xl text-[13px] font-bold text-slate-800/60 tracking-widest">
                    +92 300 1234567
                </div>
              </div>
              
              {/* OTP BOXES */}
              <div className="flex justify-between gap-3">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={inputRefs[index]}
                    type="text"
                    inputMode="numeric"
                    value={digit}
                    maxLength={1}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="size-16 border border-slate-100 bg-white rounded-2xl text-center text-2xl font-black text-slate-800 focus:ring-4 ring-indigo-50 focus:border-indigo-400 outline-none transition-all shadow-sm placeholder:text-slate-100"
                    placeholder="•"
                  />
                ))}
              </div>

              <Link href="/admin" className="block pt-2">
                <Button className="w-full h-12 bg-slate-900 hover:bg-indigo-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.15em] shadow-xl transition-all active:scale-95 group/btn border-none">
                  Validate Access Token <ArrowRight size={14} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </Link>
              
              <div className="flex justify-between items-center px-1">
                 <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Awaiting Signal?</p>
                 <button className="text-[10px] font-black text-indigo-600 uppercase flex items-center gap-1.5 hover:underline">
                    <RefreshCcw size={10} /> Request New Node
                 </button>
              </div>

              {/* OPERATIONAL NOTICE (MATCHING LOGIN) */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex gap-3 relative overflow-hidden text-left">
                <div className="absolute top-0 right-0 p-1 opacity-[0.03] rotate-12">
                    <Fingerprint size={48} />
                </div>
                <Info size={16} className="text-indigo-500 shrink-0 mt-0.5" />
                <div className="min-w-0">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 leading-none">Sandbox Bypass</p>
                    <p className="text-[10px] text-slate-500 font-medium leading-relaxed uppercase tracking-tight">
                        MASTER_TOKEN: <span className="font-black text-indigo-600">1 2 3 4</span>
                    </p>
                </div>
              </div>
           </div>
        </Card>

        {/* 5. PROTOCOL FOOTER (MATCHING LOGIN) */}
        <div className="mt-10 text-center space-y-4">
           <div className="flex items-center justify-center gap-4">
              <FooterBadge icon={<Globe size={10}/>} text="Global_Sync" />
              <div className="size-1 rounded-full bg-slate-200" />
              <FooterBadge icon={<LockKeyhole size={10}/>} text="SSL_Encrypted" />
           </div>
           <p className="text-[9px] text-slate-300 font-bold uppercase tracking-[0.2em]">
             System Architecture by <span className="text-slate-400">AcademicFlow Protocol</span>
           </p>
        </div>
      </motion.div>
    </div>
  )
}

// --- HELPER COMPONENT ---
function FooterBadge({ icon, text }: { icon: React.ReactNode, text: string }) {
    return (
        <div className="flex items-center gap-1.5 text-slate-400">
            {icon}
            <span className="text-[9px] font-black uppercase tracking-widest">{text}</span>
        </div>
    )
}
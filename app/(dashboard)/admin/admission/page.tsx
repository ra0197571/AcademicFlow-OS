"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UserPlus, User, Phone, Mail, MapPin, 
  Calendar, BookOpen, ShieldCheck, ChevronRight,
  Camera, Fingerprint, Users, Building2, 
  UploadCloud, FileText, CheckCircle2, HeartPulse,
  GraduationCap, AlertCircle, Save, Info, Sparkles, Hash
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

// --- TYPES & INTERFACES ---
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLSelectElement> {
  label: string;
  icon?: React.ReactNode;
  options?: string[];
  type?: string;
}

export default function AdmissionCommandCenter() {
  const [activeStep, setActiveStep] = useState('profile');
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  const steps = [
    { id: 'profile', label: 'Identity Ledger', icon: <Fingerprint size={14}/>, progress: 100 },
    { id: 'guardian', label: 'Guardian Portfolio', icon: <Users size={14}/>, progress: 60 },
    { id: 'placement', label: 'Academic Node', icon: <GraduationCap size={14}/>, progress: 0 },
    { id: 'vault', label: 'Document Vault', icon: <UploadCloud size={14}/>, progress: 0 },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] selection:bg-indigo-100 flex flex-col h-screen overflow-hidden">
      
      {/* 1. ELITE HEADER */}
      <header className="h-16 shrink-0 flex items-center justify-between px-8 bg-white border-b z-40 shadow-sm backdrop-blur-md bg-white/80">
        <div className="flex items-center gap-4">
           <div className="size-9 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-100">
              <UserPlus size={18} strokeWidth={2.5} />
           </div>
           <div>
              <div className="flex items-center gap-2 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                 <span>Administration</span> <ChevronRight size={10} className="text-slate-300" /> <span className="text-indigo-600 font-black">Entity Registration</span>
              </div>
              <h1 className="text-lg font-black text-slate-900 tracking-tight leading-none">Admission Command Center</h1>
           </div>
        </div>

        <div className="flex items-center gap-3">
           <Badge variant="outline" className="h-7 text-[8px] font-black tracking-widest px-2 border-emerald-200 text-emerald-600 bg-emerald-50">DRAFT AUTO-SAVED</Badge>
           <Button variant="ghost" className="h-8 rounded-lg text-[9px] font-black uppercase text-slate-400 hover:text-rose-500 transition-colors">Discard</Button>
           <Button className="h-8 px-5 rounded-lg bg-slate-900 text-white text-[9px] font-black uppercase tracking-widest shadow-xl flex items-center gap-2 hover:bg-slate-800 transition-all">
              <Save size={12} /> Save Progress
           </Button>
        </div>
      </header>

      {/* 2. MAIN LAYOUT (GRID) */}
      <main className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0">
        
        {/* LEFT ASIDE: STEP NAVIGATION */}
        <aside className="lg:col-span-3 border-r bg-white/50 p-6 space-y-8 overflow-y-auto">
           <div className="space-y-2">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2 mb-4">Registration Flow</p>
              {steps.map((step) => (
                 <button 
                    key={step.id}
                    onClick={() => setActiveStep(step.id)}
                    className={`w-full group flex flex-col gap-2 p-4 rounded-2xl transition-all duration-300 ${
                       activeStep === step.id 
                       ? 'bg-white shadow-xl shadow-slate-200/50 ring-1 ring-slate-100' 
                       : 'hover:bg-white/40'
                    }`}
                 >
                    <div className="flex items-center gap-3">
                       <div className={`size-8 rounded-xl flex items-center justify-center transition-all ${activeStep === step.id ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'}`}>
                          {step.icon}
                       </div>
                       <div className="text-left">
                          <p className={`text-[11px] font-black uppercase tracking-widest ${activeStep === step.id ? 'text-slate-900' : 'text-slate-400'}`}>{step.label}</p>
                          <p className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter">Readiness: {step.progress}%</p>
                       </div>
                    </div>
                    {step.progress > 0 && <Progress value={step.progress} className="h-1 bg-slate-100" />}
                 </button>
              ))}
           </div>

           {/* Biometric Snapshot Widget */}
           <div className="bg-slate-900 rounded-[28px] p-6 text-white text-center relative overflow-hidden group">
              <div className="absolute top-0 right-0 size-20 bg-indigo-500/10 blur-2xl rounded-full" />
              <div className="relative z-10">
                 <div className="size-20 rounded-full bg-white/5 border-2 border-white/10 mx-auto flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-500">
                    <User size={32} className="text-slate-500" />
                 </div>
                 <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Entity Identity</h4>
                 <Button size="sm" className="h-7 text-[8px] font-black bg-white text-slate-900 hover:bg-slate-100 rounded-lg px-4 gap-2">
                    <Camera size={10}/> UPLOAD PHOTO
                 </Button>
              </div>
           </div>
        </aside>

        {/* RIGHT CONTENT: SCROLLABLE FORM */}
        <div className="lg:col-span-9 bg-slate-50/30 overflow-y-auto custom-scrollbar p-8 lg:p-12 pb-32">
           <AnimatePresence mode="wait">
              <motion.div 
                 key={activeStep}
                 initial={{ opacity: 0, x: 20 }} 
                 animate={{ opacity: 1, x: 0 }} 
                 className="max-w-4xl mx-auto space-y-8"
              >
                 {/* PERSONAL LEDGER */}
                 <Card className="border-none shadow-2xl shadow-slate-200/40 rounded-[32px] bg-white overflow-hidden">
                    <CardHeader className="p-8 border-b border-slate-50 flex flex-row items-center gap-6">
                       <div className="size-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                          <Sparkles size={20} />
                       </div>
                       <div>
                          <CardTitle className="text-[13px] font-black uppercase tracking-widest text-slate-900">Personal Identity Ledger</CardTitle>
                          <CardDescription className="text-[10px] font-bold uppercase text-slate-400 tracking-tighter">Primary legal documentation required</CardDescription>
                       </div>
                    </CardHeader>
                    <CardContent className="p-8 grid grid-cols-1 md:grid-cols-3 gap-5">
                       <div className="md:col-span-2">
                          <CustomInput label="Legal Full Name" placeholder="As per B-Form" icon={<User size={14}/>} />
                       </div>
                       <CustomInput label="Date of Birth" type="date" icon={<Calendar size={14}/>} />
                       <CustomInput label="Gender Node" type="select" options={["Male", "Female", "Non-Binary"]} />
                       <CustomInput label="Blood Group" type="select" options={["A+", "B+", "AB+", "O+", "A-", "B-", "AB-", "O-"]} />
                       <CustomInput label="Nationality" placeholder="e.g. Pakistani" icon={<Building2 size={14}/>} />
                       <div className="md:col-span-3">
                          <CustomInput label="Residential Landmark" placeholder="Primary street address, block, and city node" icon={<MapPin size={14}/>} />
                       </div>
                    </CardContent>
                 </Card>

                 {/* GUARDIAN LEDGER */}
                 <Card className="border-none shadow-2xl shadow-slate-200/40 rounded-[32px] bg-white overflow-hidden">
                    <CardHeader className="p-8 border-b border-slate-50 flex flex-row items-center gap-6">
                       <div className="size-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600">
                          <Users size={20} />
                       </div>
                       <div>
                          <CardTitle className="text-[13px] font-black uppercase tracking-widest text-slate-900">Guardian Hierarchy</CardTitle>
                          <CardDescription className="text-[10px] font-bold uppercase text-slate-400 tracking-tighter">Stakeholder contact nodes</CardDescription>
                       </div>
                    </CardHeader>
                    <CardContent className="p-8 grid grid-cols-1 md:grid-cols-2 gap-5">
                       <CustomInput label="Primary Stakeholder Name" placeholder="Father or Guardian" icon={<User size={14}/>} />
                       <CustomInput label="Mobile Link" placeholder="+92 3XX XXXXXXX" icon={<Phone size={14}/>} />
                       <CustomInput label="Verified Email" type="email" placeholder="guardian@node.com" icon={<Mail size={14}/>} />
                       <CustomInput label="National Identity (CNIC)" placeholder="XXXXX-XXXXXXX-X" icon={<Hash size={14}/>} />
                    </CardContent>
                 </Card>
              </motion.div>
           </AnimatePresence>
        </div>
      </main>

      {/* 3. EXECUTIVE FOOTER BAR */}
      <footer className="h-20 shrink-0 bg-slate-900 text-white px-8 flex items-center justify-between z-50 shadow-[0_-20px_40px_-15px_rgba(0,0,0,0.3)]">
         <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 text-slate-400 border-r border-white/10 pr-6 mr-2">
               <AlertCircle size={18} className="text-amber-500" />
               <div className="text-left">
                  <p className="text-[10px] font-black uppercase tracking-widest">Protocol Audit</p>
                  <p className="text-[8px] font-medium opacity-60">Validate via ID Cloud</p>
               </div>
            </div>
            <div className="flex items-center gap-3">
               <div className="size-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]" />
               <span className="text-[10px] font-black uppercase tracking-widest opacity-80 underline underline-offset-4 decoration-white/20">Checklist: 12/14 Complete</span>
            </div>
         </div>
         <Button className="h-12 px-10 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-indigo-600/20 active:scale-95 transition-all border-none gap-3 group">
            Finalize Admissions <ShieldCheck className="size-4 group-hover:scale-110 transition-transform" />
         </Button>
      </footer>
    </div>
  );
}

// --- WORLD CLASS INPUT COMPONENT ---

function CustomInput({ label, icon, options, type = "text", ...props }: InputProps) {
  return (
    <div className="space-y-2 group">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{label}</label>
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-all pointer-events-none">
            {icon}
          </div>
        )}
        
        {type === "select" ? (
          <div className="relative">
             <select className="w-full h-12 pl-4 pr-10 bg-slate-50/50 border border-slate-200/60 rounded-xl text-xs font-black text-slate-800 focus:ring-4 ring-indigo-50/50 focus:border-indigo-300 outline-none transition-all appearance-none cursor-pointer">
               {options?.map((opt) => <option key={opt}>{opt}</option>)}
             </select>
             <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-300">
                <ChevronRight size={14} className="rotate-90" />
             </div>
          </div>
        ) : (
          <input 
            type={type}
            className={`w-full h-12 ${icon ? 'pl-11' : 'pl-4'} pr-4 bg-slate-50/50 border border-slate-200/60 rounded-xl text-xs font-black text-slate-800 focus:ring-4 ring-indigo-50/50 focus:border-indigo-300 outline-none transition-all placeholder:text-slate-300 placeholder:font-medium`}
            {...props}
          />
        )}
      </div>
    </div>
  )
}
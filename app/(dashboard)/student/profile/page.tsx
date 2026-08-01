"use client"

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  User, Mail, Phone, MapPin, Calendar, 
  ShieldCheck, Star, Award, HeartPulse, 
  Users, Lock, Zap, Clock, Fingerprint,
  FileText, ArrowUpRight, Camera, Edit3, Settings
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export default function StudentProfileDossier() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <div className="flex flex-col h-full space-y-6 text-left animate-in fade-in duration-700 font-sans selection:bg-indigo-100">
      
      {/* 1. TOP COMMAND HEADER */}
      <header className="shrink-0 h-[56px] border-b border-slate-100 bg-white flex items-center justify-between px-6 z-20 gap-4 text-left">
        <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2 text-[9px] font-bold text-indigo-600 uppercase tracking-widest leading-none px-0.5">
                IDENTITY NODE <span className="text-slate-300">•</span> <span className="text-slate-400 font-bold uppercase tracking-widest">v4.2_SECURE</span>
            </div>
            <h1 className="text-lg font-black text-slate-900 tracking-tight mt-1 uppercase italic leading-none truncate">
                Digital <span className="text-indigo-600 font-bold not-italic">Identity Dossier</span>
            </h1>
        </div>

        <div className="flex items-center gap-2 shrink-0">
           <Button variant="outline" className="hidden md:flex h-8 text-[9px] font-bold uppercase border-slate-200 bg-white px-3 gap-2">
              <Settings size={14} /> Preferences
           </Button>
           <Button className="h-8 bg-indigo-600 hover:bg-indigo-700 text-white text-[9px] font-bold uppercase shadow-md active:scale-95 transition-all px-4 rounded-lg flex gap-2 border-none">
                <Edit3 size={14} /> Request Edit
            </Button>
        </div>
      </header>

      {/* 2. KPI ROW (Dashboard Sync) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
         <DashStat label="Presence Index" value="96%" trend="OPTIMAL" color="emerald" icon={<ShieldCheck size={12}/>}/>
         <DashStat label="Global Rank" value="#02" trend="ELITE" color="indigo" icon={<Star size={12}/>}/>
         <DashStat label="Blood Node" value="B+" trend="RH-POS" color="rose" icon={<HeartPulse size={12}/>}/>
         <DashStat label="Library Limit" value="05" trend="MAX" color="blue" icon={<FileText size={12}/>}/>
         <DashStat label="Engagement" value="High" trend="+12%" color="purple" icon={<Zap size={12}/>}/>
         <DashStat label="Auth Mode" value="Bio" trend="ACTIVE" color="orange" icon={<Fingerprint size={12}/>}/>
      </div>

      {/* 3. MAIN DOSSIER WORKSPACE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-12 text-left">
        
        {/* LEFT COLUMN: IDENTITY CORE (Span 4) */}
        <div className="lg:col-span-4 space-y-6">
           {/* Profile Picture Card */}
           <Card className="p-8 rounded-[32px] border-none bg-white shadow-sm ring-1 ring-slate-200/60 flex flex-col items-center group overflow-hidden relative">
              <div className="absolute top-0 right-0 size-24 bg-indigo-50/50 blur-3xl rounded-full" />
              <div className="size-28 rounded-[40px] bg-slate-50 p-1.5 shadow-2xl border border-slate-100 ring-4 ring-slate-50 group-hover:scale-105 transition-transform duration-500">
                 <Avatar className="size-full rounded-[34px]">
                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed" />
                    <AvatarFallback className="font-black text-2xl text-slate-300">AM</AvatarFallback>
                 </Avatar>
              </div>
              <div className="mt-6 text-center space-y-1">
                 <h2 className="text-xl font-black text-slate-900 tracking-tight uppercase">Ahmed Malik</h2>
                 <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">ID: STU-99201-AF</p>
                 <Badge className="mt-4 bg-emerald-50 text-emerald-600 border-none font-black text-[8px] uppercase tracking-widest px-3">Protocol Verified</Badge>
              </div>
           </Card>

           {/* Achievements Hub */}
           <Card className="p-6 rounded-[32px] border-none bg-[#0F172A] text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 size-32 bg-indigo-600/20 blur-3xl transition-all group-hover:bg-indigo-600/30" />
              <div className="relative z-10 space-y-4">
                 <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2 italic leading-none"><Award size={14} className="text-amber-500" /> Merit Badges</h3>
                 <div className="flex flex-wrap gap-2 pt-2">
                    <AchievementBadge label="Top_Scorer" color="bg-indigo-500" />
                    <AchievementBadge label="Punctual_Node" color="bg-emerald-500" />
                    <AchievementBadge label="Elite_Rank" color="bg-purple-500" />
                 </div>
              </div>
           </Card>
        </div>

        {/* RIGHT COLUMN: TECHNICAL DATA (Span 8) */}
        <div className="lg:col-span-8 space-y-6">
           <Card className="border-none bg-white rounded-[32px] shadow-sm ring-1 ring-slate-200/60 overflow-hidden">
              <div className="p-6 border-b border-slate-50 bg-slate-50/30">
                 <h3 className="text-[10px] font-black text-slate-800 uppercase tracking-[0.2em] flex items-center gap-2"><FileText size={14} className="text-indigo-600" /> Registry Metadata</h3>
              </div>
              <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                 <IntelRow icon={<Mail size={14}/>} label="Registry Email" value="ahmed.malik@scholar.os" />
                 <IntelRow icon={<Phone size={14}/>} label="Secure Line" value="+92 300 1234567" />
                 <IntelRow icon={<Calendar size={14}/>} label="Lifecycle Start" value="12 March 2010" />
                 <IntelRow icon={<Users size={14}/>} label="Primary Stakeholder" value="Mr. Malik Farooq" />
                 <IntelRow icon={<MapPin size={14}/>} label="Landmark Node" value="Blue Area, Islamabad, PK" />
                 <IntelRow icon={<ShieldCheck size={14}/>} label="Security Clearance" value="Student_Level_01" />
              </div>
           </Card>

           {/* Medical & Protocol Node */}
           <Card className="p-8 rounded-[32px] border-slate-100 bg-white shadow-sm ring-1 ring-slate-200/60 hover:shadow-md transition-all">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                 <div className="flex items-center gap-4">
                    <div className="size-12 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-500 border border-rose-100 shadow-sm"><HeartPulse size={24}/></div>
                    <div className="text-left leading-none">
                       <p className="text-[11px] font-black text-slate-900 uppercase">Emergency Protocol Node</p>
                       <p className="text-[9px] font-bold text-slate-400 uppercase mt-1 tracking-widest">Medical Clearance Active</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex-1 md:flex-initial text-center">
                        <p className="text-[8px] font-black text-slate-400 uppercase">Allergies</p>
                        <p className="text-xs font-black text-slate-900 mt-1 uppercase">None_Detected</p>
                    </div>
                    <Button className="bg-slate-900 hover:bg-indigo-600 text-white font-black text-[9px] h-10 px-6 rounded-xl uppercase tracking-widest transition-all">View Medical File</Button>
                 </div>
              </div>
           </Card>
        </div>
      </div>
    </div>
  );
}

// --- ELITE UI COMPONENTS ---

function DashStat({ label, value, trend, color, icon }: any) {
    const colors: any = { indigo: "bg-indigo-50 text-indigo-600", emerald: "bg-emerald-50 text-emerald-600", blue: "bg-blue-50 text-blue-600", purple: "bg-purple-50 text-purple-600", orange: "bg-orange-50 text-orange-600", rose: "bg-rose-50 text-rose-600" }
    return (
        <Card className="p-3.5 rounded-xl bg-white border-none shadow-sm ring-1 ring-slate-100 flex flex-col justify-between hover:shadow-md hover:-translate-y-1 transition-all h-[95px] cursor-default text-left group">
            <div className="flex justify-between items-start w-full leading-none">
                <div className={cn("p-1.5 rounded-lg shadow-xs transition-transform group-hover:scale-110", colors[color])}>{icon}</div>
                <span className={cn("text-[6px] font-black px-1.5 py-0.5 rounded uppercase tracking-tighter shadow-sm bg-white", colors[color])}>{trend}</span>
            </div>
            <div className="mt-1 text-left leading-none"><p className="text-base font-black text-slate-900 tracking-tight leading-none tabular-nums">{value}</p><p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1.5 leading-none group-hover:text-indigo-600 transition-colors">{label}</p></div>
        </Card>
    )
}

function IntelRow({ icon, label, value }: any) {
    return (
      <div className="flex items-center gap-4 group cursor-default text-left">
         <div className="size-9 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 group-hover:border-indigo-100 transition-all shrink-0">
            {icon}
         </div>
         <div className="min-w-0">
            <p className="text-[8px] font-bold text-slate-300 uppercase leading-none mb-1.5 tracking-widest">{label}</p>
            <p className="text-[11px] font-black text-slate-800 truncate tracking-tight">{value}</p>
         </div>
      </div>
    )
}

function AchievementBadge({ label, color }: { label: string, color: string }) {
    return (
        <div className={cn("px-3 py-1 rounded-lg text-[7px] font-black uppercase tracking-[0.1em] border border-white/10 shadow-sm", color)}>
            {label}
        </div>
    )
}
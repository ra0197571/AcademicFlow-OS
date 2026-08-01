"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ClipboardCheck, Clock, Calendar, MapPin, 
  CheckCircle2, Star, LayoutGrid, ArrowUpRight, 
  GraduationCap, ChevronRight, Download, Bell, 
  Search, Activity, Timer, Zap, ShieldCheck,
  Map as MapIcon, FileBadge, Info, 
  AlertCircle // <--- FIXED: Added missing import
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// --- MOCK DATA ---
const examSchedule = [
  { id: "EXM-9901", subject: "Advanced Mathematics", type: "Final Node", date: "15 July, 2026", time: "09:00 AM", room: "Grand Hall A", status: "admit_ready", color: "bg-indigo-500" },
  { id: "EXM-9842", subject: "Quantum Physics", type: "Practical", date: "18 July, 2026", time: "11:30 AM", room: "Lab_02 (Alpha)", status: "pending", color: "bg-emerald-500" },
  { id: "EXM-9715", subject: "Modern Computing", type: "Theory", date: "22 July, 2026", time: "01:30 PM", room: "Node_104", status: "pending", color: "bg-violet-500" },
  { id: "EXM-9650", subject: "English Literature", type: "Viva Node", date: "25 July, 2026", time: "10:00 AM", room: "Library Wing", status: "pending", color: "bg-rose-500" },
];

export default function StudentExamCenter() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <div className="flex flex-col h-full space-y-6 text-left animate-in fade-in duration-700 font-sans selection:bg-indigo-100">
      
      {/* 1. TOP COMMAND HEADER */}
      <header className="shrink-0 h-[56px] border-b border-slate-100 bg-white flex items-center justify-between px-6 z-20 gap-4 text-left">
        <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2 text-[9px] font-bold text-indigo-600 uppercase tracking-widest leading-none px-0.5">
                ASSESSMENT CORE <span className="text-slate-300">•</span> <span className="text-slate-400 font-bold uppercase tracking-widest">SCHEDULE_v1.2</span>
            </div>
            <h1 className="text-lg font-black text-slate-900 tracking-tight mt-1 uppercase italic leading-none truncate">
                Exam <span className="text-indigo-600 font-bold not-italic">Center Hub</span>
            </h1>
        </div>

        <div className="flex items-center gap-2 shrink-0">
           <Button variant="outline" className="hidden md:flex h-8 text-[9px] font-bold uppercase border-slate-200 bg-white px-3 gap-2">
              <Download size={14} /> Full Date Sheet
           </Button>
           <Button className="h-8 bg-indigo-600 hover:bg-indigo-700 text-white text-[9px] font-bold uppercase shadow-md active:scale-95 transition-all px-4 rounded-lg flex gap-2 border-none">
                <FileBadge size={14} /> Roll No. Slip
            </Button>
        </div>
      </header>

      {/* 2. KPI ROW (Dashboard Sync) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
         <DashStat label="Active Exams" value="04" trend="JULY" color="indigo" icon={<ClipboardCheck size={12}/>}/>
         <DashStat label="Seating Node" value="A-42" trend="HALL_A" color="emerald" icon={<MapIcon size={12}/>}/>
         <DashStat label="Days Remaining" value="14" trend="COUNT" color="rose" icon={<Timer size={12}/>}/>
         <DashStat label="Hall Entry" value="Verified" trend="BIO" color="blue" icon={<ShieldCheck size={12}/>}/>
         <DashStat label="Preparation" value="88%" trend="SYNC" color="purple" icon={<Zap size={12}/>}/>
         <DashStat label="Status" value="Ready" trend="LIVE" color="orange" icon={<CheckCircle2 size={12}/>}/>
      </div>

      {/* 3. MAIN WORKSPACE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-12 text-left">
        
        {/* DATE SHEET LEDGER (Span 8) */}
        <div className="lg:col-span-8 space-y-4">
           <div className="flex items-center justify-between bg-white p-2 rounded-xl border border-slate-100 shadow-sm">
              <h3 className="text-[10px] font-black text-slate-800 uppercase tracking-widest flex items-center gap-2 ml-2 italic">
                 <Activity size={14} className="text-indigo-600" /> Examination Date Sheet Matrix
              </h3>
              <Badge className="bg-indigo-50 text-indigo-600 border-none font-bold text-[8px] uppercase px-3 mr-2">TERM_FINAL_2026</Badge>
           </div>

           <Card className="border-none bg-white rounded-3xl shadow-sm ring-1 ring-slate-200/60 overflow-hidden text-left">
              <table className="w-full text-left border-collapse">
                 <thead>
                    <tr className="bg-slate-50/50 border-b border-slate-100 text-[9px] font-black text-slate-400 uppercase tracking-widest text-left">
                       <th className="px-6 py-4">Assessment Node</th>
                       <th className="px-6 py-4">Schedule Vector</th>
                       <th className="px-6 py-4 text-center">Hall/Room</th>
                       <th className="px-6 py-4 text-right pr-10">Admit State</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-50 font-sans text-left">
                    {examSchedule.map((exam) => (
                       <tr key={exam.id} className="group hover:bg-indigo-50/5 transition-all border-l-2 border-transparent hover:border-indigo-600 text-left">
                          <td className="px-6 py-4 text-left leading-none">
                             <div className="flex items-center gap-4 text-left">
                                <div className={cn("size-8 rounded-lg flex items-center justify-center text-white shadow-sm transition-all", exam.color)}>
                                   <GraduationCap size={16} />
                                </div>
                                <div className="text-left leading-none">
                                   <p className="text-[11px] font-black text-slate-800 uppercase leading-none">{exam.subject}</p>
                                   <p className="text-[8px] font-bold text-slate-300 uppercase mt-1 tracking-widest">{exam.type}</p>
                                </div>
                             </div>
                          </td>
                          <td className="px-6 py-4 text-left">
                             <p className="text-[10px] font-black text-slate-700 uppercase leading-none">{exam.date}</p>
                             <p className="text-[8px] font-bold text-slate-400 uppercase mt-1 tabular-nums font-mono">{exam.time}</p>
                          </td>
                          <td className="px-6 py-4 text-center">
                             <Badge variant="outline" className="text-[9px] font-black border-slate-100 bg-slate-50 text-slate-500 py-0 px-2 h-5 uppercase font-mono tracking-tighter">
                                {exam.room}
                             </Badge>
                          </td>
                          <td className="px-6 py-4 text-right pr-10">
                             <div className="flex items-center justify-end gap-1.5">
                                <div className={cn(
                                    "size-1.5 rounded-full shadow-[0_0_8px]",
                                    exam.status === 'admit_ready' ? "bg-emerald-500 shadow-emerald-200 animate-pulse" : "bg-slate-200 shadow-slate-100"
                                )} />
                                <span className={cn(
                                    "text-[9px] font-black uppercase tracking-widest",
                                    exam.status === 'admit_ready' ? "text-emerald-600" : "text-slate-400"
                                )}>{exam.status === 'admit_ready' ? 'Ready' : 'Pending'}</span>
                             </div>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </Card>
        </div>

        {/* SIDE TOOLS (Span 4) */}
        <div className="lg:col-span-4 space-y-4 text-left">
           <Card className="p-6 rounded-[32px] border-none bg-white shadow-sm ring-1 ring-slate-200/60 flex flex-col hover:shadow-md transition-all group">
              <h3 className="text-[10px] font-black text-slate-800 uppercase tracking-widest mb-6 flex items-center gap-2 italic text-left leading-none"><MapIcon size={14} className="text-indigo-600" /> Seating Node</h3>
              <div className="space-y-4">
                 <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                    <div className="text-left">
                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Allocated Seat</p>
                        <h4 className="text-3xl font-black text-slate-900 tracking-tighter tabular-nums leading-none italic">A-42</h4>
                    </div>
                    <div className="text-right">
                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Floor</p>
                        <p className="text-sm font-black text-indigo-600 uppercase">2nd Level</p>
                    </div>
                 </div>
                 <div className="bg-amber-50 p-4 rounded-2xl border border-amber-100 flex items-start gap-3">
                    <AlertCircle size={14} className="text-amber-500 shrink-0 mt-0.5" />
                    <p className="text-[9px] font-bold text-amber-700 uppercase leading-relaxed tracking-tight">Original ID required for hall entry. Report 15 minutes before protocol time.</p>
                 </div>
              </div>
           </Card>

           <Card className="p-8 rounded-[32px] bg-[#0F172A] border-none text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 size-32 bg-indigo-600/20 blur-3xl transition-all group-hover:bg-indigo-600/30" />
              <div className="relative z-10 text-center flex flex-col items-center">
                 <div className="size-14 bg-white/5 rounded-2xl flex items-center justify-center mb-4 border border-white/5 shadow-xl group-hover:scale-110 transition-transform">
                    <ShieldCheck size={28} className="text-indigo-400" />
                 </div>
                 <h4 className="text-xs font-bold leading-tight uppercase mb-2 tracking-widest italic font-sans text-white">Entry Credentials</h4>
                 <p className="text-[10px] text-slate-400 uppercase tracking-tighter leading-relaxed mb-6 opacity-60">Digital roll number slip node with encrypted auth token is ready for deployment.</p>
                 <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black text-[9px] h-10 rounded-xl uppercase tracking-widest transition-all border-none shadow-xl active:scale-95 shadow-indigo-900/40">
                    Download Slip Node
                 </Button>
              </div>
           </Card>
        </div>
      </div>
    </div>
  );
}

// --- KPI COMPONENT (Dashboard Theme Sync) ---
function DashStat({ label, value, trend, color, icon }: any) {
    const colors: any = { indigo: "bg-indigo-50 text-indigo-600 shadow-indigo-100", emerald: "bg-emerald-50 text-emerald-600 shadow-emerald-100", blue: "bg-blue-50 text-blue-600 shadow-blue-100", purple: "bg-purple-50 text-purple-600 shadow-purple-100", orange: "bg-orange-50 text-orange-600 shadow-orange-100", rose: "bg-rose-50 text-rose-600 shadow-rose-100" }
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
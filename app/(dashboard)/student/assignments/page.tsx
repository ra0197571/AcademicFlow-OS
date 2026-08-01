"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileCheck, Clock, CheckCircle2, AlertCircle, FileText, 
  Search, Filter, Plus, LayoutGrid, Zap, Timer, Star, 
  TrendingUp, ArrowUpRight, GraduationCap, Download, History,
  UploadCloud, X, ChevronRight, MessageSquare, Info,
  ShieldCheck, Activity, Database, Box, Eye
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { cn } from "@/lib/utils";

// --- MOCK DATA ---
const studentTasks = [
  { id: "ASN-401", title: "Algebraic Notations Lab", subject: "Math 9-A", due: "Today", status: "pending", weight: "20%", color: "bg-indigo-500", objective: "Mastering variable substitution in complex academic nodes." },
  { id: "ASN-302", title: "Quantum Mechanics Essay", subject: "Physics 10-B", due: "15 July", status: "pending", weight: "15%", color: "bg-emerald-500", objective: "Analyzing wave-particle duality in locked physical states." },
  { id: "ASN-105", title: "Logic Gate Circuitry", subject: "CS 12-Pro", due: "10 July", status: "submitted", weight: "25%", color: "bg-purple-500", objective: "Implementation of NAND/NOR logic gates via digital terminal." },
];

export default function StudentAssignments() {
  const [mounted, setMounted] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <div className="flex flex-col h-full space-y-6 text-left animate-in fade-in duration-700 font-sans selection:bg-indigo-100">
      
      {/* 1. ELITE HEADER */}
      <header className="shrink-0 h-[56px] border-b border-slate-100 bg-white flex items-center justify-between px-6 z-20 gap-4">
        <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2 text-[9px] font-bold text-indigo-600 uppercase tracking-widest leading-none px-0.5">
                OPERATIONAL HUB <span className="text-slate-300">•</span> <span className="text-slate-400 font-bold uppercase tracking-widest">Tasks_v4.2</span>
            </div>
            <h1 className="text-lg font-black text-slate-900 tracking-tight mt-1 uppercase italic leading-none truncate">
                Assignment <span className="text-indigo-600 font-bold not-italic">Workspace</span>
            </h1>
        </div>

        <div className="flex items-center gap-2 shrink-0">
           <Button variant="outline" className="hidden md:flex h-8 text-[9px] font-bold uppercase border-slate-200 bg-white px-3 hover:bg-slate-50 transition-all">
              <History size={14} className="mr-1.5" /> Archive
           </Button>
           <Button className="h-8 bg-indigo-600 hover:bg-indigo-700 text-white text-[9px] font-bold uppercase shadow-md active:scale-95 transition-all px-4 rounded-lg flex gap-2 border-none">
                <Zap size={14} /> Sync Node
            </Button>
        </div>
      </header>

      {/* 2. KPI ROW (Dashboard Sync) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
         <DashStat label="Pending" value="02" trend="REQD" color="orange" icon={<Timer size={12}/>}/>
         <DashStat label="Submitted" value="01" trend="NODE" color="indigo" icon={<FileCheck size={12}/>}/>
         <DashStat label="Graded" value="01" trend="v4.0" color="emerald" icon={<CheckCircle2 size={12}/>}/>
         <DashStat label="Course Work" value="84%" trend="ACTIVE" color="blue" icon={<LayoutGrid size={12}/>}/>
         <DashStat label="Avg Grade" value="A" trend="ELITE" color="purple" icon={<Star size={12}/>}/>
         <DashStat label="Protocol" value="Secure" trend="AES" color="rose" icon={<ShieldCheck size={12}/>}/>
      </div>

      {/* 3. MAIN WORKSPACE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-12">
        
        {/* ASSIGNMENT MATRIX (Span 8) */}
        <div className="lg:col-span-8 space-y-4">
           <div className="flex items-center justify-between bg-white p-2 rounded-xl border border-slate-100 shadow-sm">
              <h3 className="text-[10px] font-black text-slate-800 uppercase tracking-widest flex items-center gap-2 ml-2 italic">
                 <Box size={14} className="text-indigo-600" /> Active Assignment Matrix
              </h3>
              <div className="relative md:w-64 group">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors" size={12} />
                 <input placeholder="Search node ID..." className="w-full h-8 pl-9 pr-3 bg-slate-50 border border-slate-100 rounded-lg text-[10px] font-semibold outline-none focus:bg-white focus:ring-2 ring-indigo-50 transition-all" />
              </div>
           </div>

           <div className="space-y-3">
              {studentTasks.map((task) => (
                 <Card key={task.id} onClick={() => setSelectedTask(task)} className="p-4 bg-white border-none shadow-sm ring-1 ring-slate-200/60 hover:ring-indigo-500 hover:shadow-xl hover:-translate-y-0.5 transition-all cursor-pointer group rounded-2xl relative overflow-hidden flex items-center justify-between border-l-4 border-l-transparent hover:border-l-indigo-600">
                    {/* Visual Status Strip */}
                    <div className={cn("absolute left-0 top-0 bottom-0 w-1 opacity-40 group-hover:opacity-100 transition-opacity", task.color)} />
                    
                    <div className="flex items-center gap-5 flex-1 min-w-0">
                       <div className={cn(
                           "size-10 rounded-xl flex items-center justify-center transition-all shadow-sm shrink-0",
                           task.status === 'graded' ? "bg-emerald-50 text-emerald-600" : "bg-slate-50 text-slate-400 group-hover:bg-indigo-600 group-hover:text-white"
                       )}>
                          <FileText size={18} />
                       </div>
                       <div className="min-w-0 text-left">
                          <h4 className="text-[13px] font-black text-slate-800 uppercase tracking-tight group-hover:text-indigo-600 transition-colors truncate leading-none">{task.title}</h4>
                          <div className="flex items-center gap-3 mt-2 leading-none">
                             <Badge variant="outline" className="text-[8px] font-black border-slate-100 text-indigo-500 bg-white py-0 px-1.5 uppercase h-4">{task.subject}</Badge>
                             <span className="text-[9px] font-bold text-slate-300 uppercase flex items-center gap-1">DUE: <span className={cn(task.due === 'Today' ? 'text-rose-500 font-black animate-pulse' : 'text-slate-400')}>{task.due}</span></span>
                          </div>
                       </div>
                    </div>

                    <div className="flex items-center gap-8 shrink-0 pr-4">
                       <div className="text-right hidden md:block leading-none">
                          <p className="text-[8px] font-black text-slate-300 uppercase mb-1">Weightage</p>
                          <p className="text-[11px] font-black text-slate-700 tabular-nums">{task.weight}</p>
                       </div>
                       <div className="flex items-center gap-3">
                          <Badge className={cn(
                              "text-[8px] font-black uppercase border-none px-2 h-5 flex items-center",
                              task.status === 'graded' ? "bg-emerald-50 text-emerald-600" : 
                              task.status === 'submitted' ? "bg-blue-50 text-blue-600" : "bg-rose-50 text-rose-600"
                          )}>
                              {task.status}
                          </Badge>
                          <ChevronRight size={14} className="text-slate-200 group-hover:text-indigo-500 transition-all" />
                       </div>
                    </div>
                 </Card>
              ))}
           </div>
        </div>

        {/* SIDEBAR TOOLS (Span 4) */}
        <div className="lg:col-span-4 space-y-4 text-left">
           <Card className="p-6 rounded-[32px] border-none bg-white shadow-sm ring-1 ring-slate-200/60 flex flex-col hover:shadow-md transition-all group">
              <h3 className="text-[10px] font-black text-slate-800 uppercase tracking-widest mb-6 flex items-center gap-2 italic leading-none"><Star size={14} className="text-amber-500" /> Academic Standing</h3>
              <div className="space-y-5">
                 <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 group-hover:bg-white transition-all">
                    <p className="text-[8px] font-black text-slate-400 uppercase mb-2 leading-none">Marking Velocity Index</p>
                    <div className="flex items-end justify-between gap-4">
                        <h4 className="text-3xl font-black text-slate-900 tracking-tighter tabular-nums leading-none">84%</h4>
                        <div className="w-24 h-1.5 bg-slate-200 rounded-full overflow-hidden mb-1 shadow-inner">
                            <div className="h-full bg-indigo-600 shadow-[0_0_8px_rgba(99,102,241,0.5)]" style={{ width: '84%' }} />
                        </div>
                    </div>
                 </div>
                 <div className="grid grid-cols-2 gap-2">
                    <div className="p-3 bg-white border border-slate-50 rounded-xl text-center shadow-sm">
                        <p className="text-[7px] font-black text-slate-300 uppercase mb-1">Global Rank</p>
                        <p className="text-[11px] font-black text-slate-800 tabular-nums">#02 / 30</p>
                    </div>
                    <div className="p-3 bg-white border border-slate-50 rounded-xl text-center shadow-sm">
                        <p className="text-[7px] font-black text-slate-300 uppercase mb-1">Total Streak</p>
                        <p className="text-[11px] font-black text-emerald-600">12 DAYS</p>
                    </div>
                 </div>
              </div>
           </Card>

           <Card className="p-8 rounded-[32px] bg-[#0F172A] border-none text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 size-32 bg-indigo-600/20 blur-3xl transition-all group-hover:bg-indigo-600/30" />
              <div className="relative z-10 text-center flex flex-col items-center">
                 <div className="size-14 bg-white/5 rounded-2xl flex items-center justify-center mb-4 border border-white/5 shadow-xl group-hover:scale-110 transition-transform">
                    <Info size={28} className="text-indigo-400" />
                 </div>
                 <h4 className="text-[13px] font-bold leading-tight uppercase mb-2 tracking-widest italic">Submission Protocol</h4>
                 <p className="text-[10px] text-slate-400 uppercase tracking-tighter leading-relaxed mb-6 opacity-60">All node uploads are scanned for integrity and encrypted via AES-256 before faculty audit phase.</p>
                 <Button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black text-[9px] h-10 rounded-xl uppercase tracking-widest transition-all border-none shadow-xl active:scale-95">Read Guidelines</Button>
              </div>
           </Card>
        </div>
      </div>

      {/* 4. DETAIL SHEET */}
      <Sheet open={!!selectedTask} onOpenChange={() => setSelectedTask(null)}>
        <SheetContent className="w-[450px] border-l border-slate-100 p-0 overflow-hidden shadow-2xl bg-white z-[150]">
           <div className="h-24 bg-slate-900 flex items-center px-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-indigo-600 opacity-20" />
              <h3 className="text-white font-black uppercase tracking-widest text-[10px] z-10 italic">Task Payload Node</h3>
           </div>
           <div className="px-8 -mt-8 relative z-20">
              <div className="size-16 rounded-2xl bg-white p-1 shadow-2xl border border-slate-100 mx-auto flex items-center justify-center">
                 <div className="size-full rounded-xl bg-slate-50 flex items-center justify-center text-xl font-black text-indigo-400 uppercase italic">
                    {selectedTask?.subject.substring(0,1)}
                 </div>
              </div>
              <div className="mt-4 text-center">
                 <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight leading-tight">{selectedTask?.title}</h2>
                 <p className="text-[9px] font-bold text-indigo-500 uppercase tracking-widest mt-2">{selectedTask?.subject} • {selectedTask?.id}</p>
                 
                 <div className="mt-10 p-8 rounded-3xl border-2 border-dashed border-slate-100 bg-slate-50/50 hover:border-indigo-400 transition-all cursor-pointer group/upload text-center">
                    <div className="size-12 bg-white rounded-2xl mx-auto flex items-center justify-center text-slate-300 group-hover/upload:text-indigo-600 shadow-sm transition-all border border-slate-100">
                        <UploadCloud size={24} />
                    </div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-4">Drop Deployment Payload</p>
                    <p className="text-[8px] font-bold text-slate-300 uppercase mt-1 tracking-tighter">Maximum Node Weight: 25MB (PDF/JPG)</p>
                 </div>
                 
                 <div className="mt-8 space-y-3 text-left bg-slate-50/50 p-5 rounded-2xl border border-slate-100">
                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Learning Objective</p>
                    <p className="text-[11px] font-bold text-slate-700 leading-relaxed uppercase">{selectedTask?.objective}</p>
                 </div>
                 
                 <div className="mt-8 pt-6 border-t border-slate-50">
                    <Button className="w-full bg-slate-900 h-11 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg active:scale-95">
                       Initialize Upload Stream
                    </Button>
                 </div>
              </div>
           </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

// --- KPI COMPONENT (Dashboard Theme Sync) ---
function DashStat({ label, value, trend, color, icon }: any) {
    const colors: any = { indigo: "bg-indigo-50 text-indigo-600 shadow-indigo-100", emerald: "bg-emerald-50 text-emerald-600 shadow-emerald-100", blue: "bg-blue-50 text-blue-600 shadow-blue-100", purple: "bg-purple-50 text-purple-600 shadow-purple-100", orange: "bg-orange-50 text-orange-600 shadow-orange-100", rose: "bg-rose-50 text-rose-600 shadow-rose-100" }
    return (
        <Card className="p-3.5 rounded-xl bg-white border-none shadow-sm ring-1 ring-slate-100 flex flex-col justify-between hover:shadow-md hover:-translate-y-1 transition-all h-[95px] cursor-default text-left group">
            <div className="flex justify-between items-start w-full leading-none text-left">
                <div className={cn("p-1.5 rounded-lg shadow-xs transition-transform group-hover:scale-110", colors[color])}>{icon}</div>
                <span className={cn("text-[6px] font-black px-1.5 py-0.5 rounded uppercase tracking-tighter shadow-sm bg-white border border-slate-50", colors[color])}>{trend}</span>
            </div>
            <div className="mt-1 text-left"><p className="text-base font-black text-slate-900 tracking-tight leading-none tabular-nums">{value}</p><p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1.5 leading-none group-hover:text-indigo-600 transition-colors">{label}</p></div>
        </Card>
    )
}
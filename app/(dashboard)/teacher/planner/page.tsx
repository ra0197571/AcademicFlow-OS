"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Search, Download, FileText, Filter, LayoutGrid, 
  ArrowUpRight, Clock, Target, CheckCircle2, MoreHorizontal,
  Compass, Goal, BookCheck, LibraryBig, Calendar as CalendarIcon,
  Zap, Database, Timer, History, ChevronRight, Link as LinkIcon, 
  ShieldCheck, X, Eye, BookOpen
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import Link from "next/link"; // <-- FIXED: Added missing import
import { cn } from "@/lib/utils";

// --- MOCK DATA ---
const weeklyPlans = [
  { id: "PLN-101", day: "Monday", topic: "Quadratic Equations Intro", subject: "Math 9-A", time: "09:00 AM", status: "Completed", resources: 3, objective: "Understand the general form ax² + bx + c = 0" },
  { id: "PLN-102", day: "Tuesday", topic: "Kinematics & Velocity Node", subject: "Physics 10-B", time: "11:30 AM", status: "In-Progress", resources: 1, objective: "Differentiate between speed and velocity vectors." },
  { id: "PLN-103", day: "Wednesday", topic: "Data Structures - Linked Lists", subject: "CS 12-Pro", time: "01:30 PM", status: "Planned", resources: 5, objective: "Implementation of Singly Linked Lists in C++" },
];

export default function LessonPlannerNode() {
  const [mounted, setMounted] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <div className="flex flex-col h-full bg-[#FDFDFD] animate-in fade-in duration-700 font-sans">
      
      {/* 1. TOP COMMAND HEADER */}
      <header className="shrink-0 h-[56px] border-b border-slate-100 bg-white flex items-center justify-between px-6 z-20">
        <div className="flex flex-col text-left">
            <div className="flex items-center gap-2 text-[10px] font-bold text-indigo-600 uppercase tracking-widest leading-none">
                CURRICULUM FLOW <span className="text-slate-300">•</span> <span className="text-slate-400">PLANNER_v2.4</span>
            </div>
            <h1 className="text-sm font-black text-slate-900 tracking-tight mt-1 uppercase italic leading-none">
                Faculty <span className="text-indigo-600 not-italic font-bold ml-1">Lesson Architect</span>
            </h1>
        </div>

        <div className="flex items-center gap-2">
           <Button variant="outline" className="h-8 text-[9px] font-bold uppercase tracking-wider border-slate-200 bg-white hover:bg-slate-50">
              <History size={12} className="mr-1.5" /> Previous
           </Button>
           <Button className="h-8 bg-indigo-600 hover:bg-indigo-700 text-white text-[9px] font-bold uppercase shadow-md active:scale-95 transition-all px-4 rounded-lg border-none">
                <Plus size={14} className="mr-1.5" strokeWidth={3} /> New Roadmap
            </Button>
        </div>
      </header>

      {/* 2. SCROLLABLE AREA */}
      <main className="flex-1 overflow-y-auto p-4 lg:p-6 scrollbar-hide space-y-6 bg-slate-50/20">
        
        {/* KPI ROW */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 max-w-[1700px] mx-auto text-left">
           <DashStat label="Planned Units" value="24" trend="WEEKLY" color="indigo" icon={<Compass size={12}/>}/>
           <DashStat label="Coverage" value="68%" trend="ACTIVE" color="emerald" icon={<Goal size={12}/>}/>
           <DashStat label="Resource Link" value="42" trend="VAULT" color="blue" icon={<LibraryBig size={12}/>}/>
           <DashStat label="Weekly Load" value="22h" trend="MAX" color="purple" icon={<Clock size={12}/>}/>
           <DashStat label="Audit Status" value="Pass" trend="SECURE" color="orange" icon={<ShieldCheck size={12}/>}/>
           <DashStat label="Integrity" value="Verified" trend="NODE" color="rose" icon={<Database size={12}/>}/>
        </div>

        {/* WORKSPACE GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1700px] mx-auto text-left">
           
           {/* LEFT: WEEKLY ROADMAP */}
           <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center justify-between bg-white p-2 rounded-xl border border-slate-100 shadow-sm">
                 <div className="flex items-center gap-2">
                    <Badge className="bg-indigo-50 text-indigo-600 border-none text-[9px] px-3 h-7 flex items-center gap-2 rounded-lg font-bold uppercase">JULY WEEK 02</Badge>
                    <div className="h-4 w-px bg-slate-100 mx-1" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Architect: Zia Khan</span>
                 </div>
                 <div className="relative md:w-64 group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={12} />
                    <input placeholder="Filter topics..." className="w-full h-8 pl-9 pr-3 bg-slate-50 border border-slate-200 rounded-lg text-[10px] font-semibold outline-none focus:bg-white focus:ring-2 ring-indigo-50 transition-all" />
                 </div>
              </div>

              <div className="space-y-3">
                 {weeklyPlans.map((plan) => (
                    <Card key={plan.id} onClick={() => setSelectedPlan(plan)} className="border-none bg-white rounded-2xl p-4 shadow-sm ring-1 ring-slate-200/60 hover:ring-indigo-300 hover:shadow-lg transition-all cursor-pointer group border-l-4 border-l-transparent hover:border-l-indigo-600">
                       <div className="flex items-center justify-between text-left">
                          <div className="flex items-center gap-6 flex-1 min-w-0">
                             <div className="size-10 rounded-xl bg-slate-100 flex flex-col items-center justify-center text-slate-400 shrink-0 border border-slate-200 transition-all group-hover:bg-indigo-600 group-hover:text-white">
                                <span className="text-[7px] font-black uppercase leading-none">{plan.day.substring(0,3)}</span>
                                <span className="text-[10px] font-bold mt-1 leading-none">{plan.time.split(' ')[0]}</span>
                             </div>
                             <div className="min-w-0 text-left">
                                <h4 className="text-[13px] font-black text-slate-800 uppercase truncate leading-none tracking-tight">{plan.topic}</h4>
                                <div className="flex items-center gap-3 mt-2">
                                   <Badge variant="outline" className="text-[8px] font-bold border-slate-100 text-indigo-500 bg-white py-0 px-1.5 uppercase h-4 leading-none">{plan.subject}</Badge>
                                   <div className="flex items-center gap-1 text-[8px] font-bold text-slate-400 uppercase tracking-tighter">
                                      <LinkIcon size={10} className="text-slate-300" /> {plan.resources} Resources
                                   </div>
                                </div>
                             </div>
                          </div>
                          <div className="flex items-center gap-4 shrink-0 pl-4">
                             <div className={cn("px-2 py-0.5 rounded text-[8px] font-black uppercase ring-1 ring-inset", plan.status === 'Completed' ? 'bg-emerald-50 text-emerald-600 ring-emerald-100' : 'bg-amber-50 text-amber-600 ring-amber-100')}>
                                 {plan.status}
                             </div>
                             <button className="p-1.5 hover:bg-slate-50 rounded-md text-slate-300 hover:text-indigo-600 transition-all"><ArrowUpRight size={14}/></button>
                          </div>
                       </div>
                    </Card>
                 ))}
              </div>
           </div>

           {/* RIGHT: SYLLABUS AUDIT */}
           <div className="lg:col-span-4 space-y-4 text-left">
              <Card className="p-6 rounded-[28px] border-none bg-white shadow-sm ring-1 ring-slate-200/60 flex flex-col hover:shadow-md transition-all">
                 <h3 className="text-[10px] font-black text-slate-800 uppercase tracking-widest mb-8 flex items-center gap-2 italic">
                    <BookCheck size={14} className="text-indigo-600" /> Syllabus Execution
                 </h3>
                 <div className="space-y-6">
                    <PlannerProgress label="Math - Unit 04" progress={85} color="bg-indigo-500" />
                    <PlannerProgress label="Physics - Unit 02" progress={40} color="bg-emerald-500" />
                    <PlannerProgress label="CS - Algorithms" progress={92} color="bg-purple-500" />
                 </div>
                 <Button variant="ghost" className="w-full mt-8 h-9 text-[9px] font-black uppercase text-indigo-600 hover:bg-indigo-50 tracking-widest border border-dashed border-indigo-100 rounded-xl">
                    Sync Global Curriculum
                 </Button>
              </Card>

              <Card className="p-8 rounded-[32px] bg-[#0F172A] border-none text-white shadow-2xl relative overflow-hidden group">
                 <div className="absolute top-0 right-0 size-32 bg-indigo-600/20 blur-3xl transition-all group-hover:bg-indigo-600/30" />
                 <div className="relative z-10 text-center flex flex-col items-center">
                    <div className="size-14 bg-white/5 rounded-2xl flex items-center justify-center mb-4 border border-white/5 shadow-xl transition-transform group-hover:scale-110">
                        <Zap size={28} className="text-indigo-400" />
                    </div>
                    <h4 className="text-[12px] font-bold leading-tight uppercase mb-2 tracking-widest italic font-sans">AI Planner Node</h4>
                    <p className="text-[10px] text-slate-400 uppercase tracking-tighter leading-relaxed mb-6 opacity-60">Generate lesson structures based on syllabus velocity.</p>
                    <Button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black text-[9px] h-10 rounded-xl uppercase tracking-widest transition-all border-none shadow-xl active:scale-95">
                       Launch AI Architect
                    </Button>
                 </div>
              </Card>
           </div>
        </div>
      </main>

      {/* QUICK VIEW SHEET */}
      <Sheet open={!!selectedPlan} onOpenChange={() => setSelectedPlan(null)}>
        <SheetContent className="w-[400px] border-l border-slate-100 p-0 overflow-hidden shadow-2xl bg-white z-[150]">
           <div className="h-24 bg-slate-900 flex items-center px-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-indigo-600 opacity-20" />
              <h3 className="text-white font-black uppercase tracking-widest text-[10px] z-10 italic">Lesson Dossier</h3>
           </div>
           <div className="px-8 -mt-8 relative z-20">
              <div className="size-20 rounded-2xl bg-white p-1 shadow-2xl border border-slate-100 mx-auto flex items-center justify-center">
                 <div className="size-full rounded-xl bg-slate-50 flex items-center justify-center text-xl font-black text-indigo-400 uppercase italic leading-none">{selectedPlan?.day.substring(0,2)}</div>
              </div>
              <div className="mt-4 text-center">
                 <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight leading-tight">{selectedPlan?.topic}</h2>
                 <Badge className="mt-2 bg-indigo-50 text-indigo-600 border-none font-bold text-[9px] uppercase tracking-widest px-3 rounded-md">{selectedPlan?.subject}</Badge>
                 <div className="mt-8 space-y-4 text-left">
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2"><Target size={10} /> Node Objective</p>
                        <p className="text-[11px] font-bold text-slate-700 leading-relaxed uppercase">{selectedPlan?.objective}</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center">
                        <div className="flex items-center gap-3"><LibraryBig size={16} className="text-indigo-500" /><p className="text-[10px] font-black text-slate-700 uppercase">Vault Resources</p></div>
                        <Badge className="bg-white border-slate-200 text-slate-400 font-black text-[10px]">{selectedPlan?.resources}</Badge>
                    </div>
                 </div>
                 <div className="mt-8 pt-8 border-t border-slate-50 flex flex-col gap-2">
                    <Link href="/teacher/resources" className="w-full">
                        <Button className="w-full bg-slate-900 h-11 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg shadow-indigo-50 flex gap-2 justify-center">
                           <Database size={14} /> Open Resource Vault
                        </Button>
                    </Link>
                    <Button variant="outline" className="w-full h-11 rounded-xl text-[10px] font-black uppercase tracking-widest border-slate-200">Edit Roadmap Data</Button>
                 </div>
              </div>
           </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

function DashStat({ label, value, trend, color, icon }: any) {
    const colors: any = { indigo: "bg-indigo-50 text-indigo-600 shadow-indigo-100", emerald: "bg-emerald-50 text-emerald-600 shadow-emerald-100", blue: "bg-blue-50 text-blue-600 shadow-blue-100", purple: "bg-purple-50 text-purple-600 shadow-purple-100", orange: "bg-orange-50 text-orange-600 shadow-orange-100", rose: "bg-rose-50 text-rose-600 shadow-rose-100" }
    return (
        <Card className="p-3.5 rounded-xl bg-white border-none shadow-sm ring-1 ring-slate-100 flex flex-col justify-between hover:shadow-md hover:-translate-y-1 transition-all h-[95px] cursor-default text-left">
            <div className="flex justify-between items-start w-full">
                <div className={cn("p-1.5 rounded-lg shadow-xs transition-transform group-hover:scale-110", colors[color])}>{icon}</div>
                <span className={cn("text-[6px] font-black px-1.5 py-0.5 rounded uppercase tracking-tighter", colors[color])}>{trend}</span>
            </div>
            <div className="mt-1"><p className="text-base font-black text-slate-900 tracking-tight leading-none tabular-nums">{value}</p><p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1.5 leading-none">{label}</p></div>
        </Card>
    )
}

function PlannerProgress({ label, progress, color }: { label: string, progress: number, color: string }) {
    return (
        <div className="space-y-2">
            <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-slate-400"><span>{label}</span><span className="text-slate-900 font-bold">{progress}%</span></div>
            <div className="h-1 w-full bg-slate-50 rounded-full overflow-hidden shadow-inner"><div className={cn("h-full transition-all duration-1000", color)} style={{ width: `${progress}%` }} /></div>
        </div>
    )
}
"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GraduationCap, TrendingUp, Star, Award, Target, 
  CheckCircle2, FileText, Download, Filter, Search, 
  LayoutGrid, Activity, Zap, Timer, ChevronRight, 
  ArrowUpRight, ShieldCheck, Microscope, Monitor, BookOpen
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, 
  CartesianGrid, Radar, RadarChart, PolarGrid, PolarAngleAxis 
} from 'recharts';
import { cn } from "@/lib/utils";

// --- MOCK DATA ---
const gpaEvolution = [
  { term: 'Term 1', gpa: 3.2 }, { term: 'Term 2', gpa: 3.5 },
  { term: 'Term 3', gpa: 3.4 }, { term: 'Term 4', gpa: 3.8 },
];

const subjectSkills = [
  { subject: 'Math', A: 95 }, { subject: 'Physics', A: 82 },
  { subject: 'English', A: 88 }, { subject: 'Logic', A: 92 },
  { subject: 'CS', A: 98 },
];

const examLedger = [
  { id: "RES-701", title: "Mid-Term Assessment", subject: "Mathematics", score: "92/100", grade: "A+", date: "July 12" },
  { id: "RES-652", title: "Laboratory Viva", subject: "Quantum Physics", score: "85/100", grade: "A", date: "July 05" },
  { id: "RES-541", title: "Monthly Logic Quiz", subject: "Modern Computing", score: "48/50", grade: "A+", date: "June 28" },
  { id: "RES-402", title: "Weekly Test Node", subject: "English Language", score: "72/100", grade: "B+", date: "June 20" },
];

export default function StudentResultsArchive() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <div className="flex flex-col h-full space-y-6 text-left animate-in fade-in duration-700 font-sans selection:bg-indigo-100">
      
      {/* 1. TOP COMMAND HEADER */}
      <header className="shrink-0 h-[56px] border-b border-slate-100 bg-white flex items-center justify-between px-6 z-20 gap-4">
        <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2 text-[9px] font-bold text-indigo-600 uppercase tracking-widest leading-none px-0.5">
                INTEL CORE <span className="text-slate-300">•</span> <span className="text-slate-400 font-bold uppercase">RESULTS_ARCHIVE_v1.0</span>
            </div>
            <h1 className="text-lg font-black text-slate-900 tracking-tight mt-1 uppercase italic leading-none truncate">
                Academic <span className="text-indigo-600 font-bold not-italic">Results Dossier</span>
            </h1>
        </div>

        <div className="flex items-center gap-2 shrink-0">
           <Button variant="outline" className="h-8 text-[9px] font-bold uppercase border-slate-200 bg-white px-3 gap-2">
              <Download size={14} /> Full Transcript
           </Button>
           <Button className="h-8 bg-indigo-600 hover:bg-indigo-700 text-white text-[9px] font-bold uppercase shadow-md active:scale-95 transition-all px-4 rounded-lg flex gap-2 border-none">
                <Badge className="bg-white/20 text-white border-none text-[8px] px-1.5 py-0">v4.2</Badge> Sync Ledger
            </Button>
        </div>
      </header>

      {/* 2. KPI ROW (Dashboard Theme Matched) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
         <DashStat label="Mean GPA" value="3.84" trend="TOP" color="indigo" icon={<Star size={12}/>}/>
         <DashStat label="Global Rank" value="#02" trend="ELITE" color="emerald" icon={<Award size={12}/>}/>
         <DashStat label="Total Credits" value="42.5" trend="ACTIVE" color="blue" icon={<Zap size={12}/>}/>
         <DashStat label="Pass Index" value="100%" trend="STABLE" color="purple" icon={<CheckCircle2 size={12}/>}/>
         <DashStat label="Tests Taken" value="14" trend="v4.0" color="orange" icon={<FileText size={12}/>}/>
         <DashStat label="Integrity" value="Verified" trend="AES" color="rose" icon={<ShieldCheck size={12}/>}/>
      </div>

      {/* 3. ANALYTICS WORKSPACE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1700px] mx-auto w-full">
         
         {/* GPA Progression - Span 7 */}
         <Card className="lg:col-span-7 border-slate-100 shadow-sm rounded-[32px] p-8 bg-white hover:border-indigo-100 transition-all group overflow-hidden">
            <div className="flex justify-between items-start mb-10">
               <div>
                  <h3 className="text-[10px] font-black text-slate-800 uppercase tracking-widest flex items-center gap-2 italic">
                     <TrendingUp size={14} className="text-indigo-600" /> GPA Evolution Matrix
                  </h3>
                  <p className="text-[11px] font-bold text-slate-400 uppercase mt-1">Registry growth across terms</p>
               </div>
               <Badge className="bg-emerald-50 text-emerald-600 border-none font-black text-[8px] uppercase">Stable_Nodes</Badge>
            </div>
            <div className="h-[240px] w-full group-hover:scale-[1.01] transition-transform duration-700">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={gpaEvolution}>
                     <defs>
                        <linearGradient id="colorGpa" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15}/>
                           <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                        </linearGradient>
                     </defs>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                     <XAxis dataKey="term" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 800, fill: '#94a3b8'}} dy={10} />
                     <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.05)', fontSize: '10px', fontWeight: 900 }} />
                     <Area type="monotone" dataKey="gpa" stroke="#6366f1" strokeWidth={4} fill="url(#colorGpa)" dot={{ r: 4, fill: '#6366f1', strokeWidth: 2, stroke: '#fff' }} />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </Card>

         {/* Mastery Radar - Span 5 */}
         <Card className="lg:col-span-5 border-slate-100 shadow-sm rounded-[32px] p-8 bg-white hover:border-indigo-100 transition-all flex flex-col items-center">
            <h3 className="text-[10px] font-black text-slate-800 uppercase tracking-widest mb-8 w-full text-left italic">Subject Mastery Node</h3>
            <div className="size-full max-h-[240px]">
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="65%" data={subjectSkills}>
                        <PolarGrid stroke="#f1f5f9" />
                        <PolarAngleAxis dataKey="subject" tick={{fontSize: 8, fontWeight: 900, fill: '#64748b'}} />
                        <Radar name="Student" dataKey="A" stroke="#6366f1" fill="#6366f1" fillOpacity={0.4} />
                    </RadarChart>
                </ResponsiveContainer>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-3 w-full">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
                    <p className="text-[8px] font-black text-slate-400 uppercase mb-1">Strongest Core</p>
                    <p className="text-[11px] font-black text-indigo-600 uppercase">Comp. Science</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
                    <p className="text-[8px] font-black text-slate-400 uppercase mb-1">Marking Speed</p>
                    <p className="text-[11px] font-black text-emerald-600 uppercase">92% Index</p>
                </div>
            </div>
         </Card>

         {/* RESULTS LEDGER (Span 12) */}
         <div className="lg:col-span-12 pt-4">
            <div className="flex items-center justify-between mb-4 px-2">
                <h3 className="text-[11px] font-black text-slate-800 uppercase tracking-[0.2em] flex items-center gap-2">
                    <FileText size={16} className="text-indigo-600" /> Detailed Assessment Ledger
                </h3>
                <div className="flex gap-2">
                    <Button variant="outline" className="h-7 text-[8px] font-black uppercase tracking-widest border-slate-200">Current Term</Button>
                    <Button variant="outline" className="h-7 text-[8px] font-black uppercase tracking-widest border-slate-200">Archive Node</Button>
                </div>
            </div>
            <Card className="border-none bg-white rounded-3xl shadow-sm ring-1 ring-slate-200/60 overflow-hidden mb-12">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-slate-50/50 border-b border-slate-100 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                            <th className="px-6 py-4">Assessment Node Identity</th>
                            <th className="px-6 py-4">Core Subject</th>
                            <th className="px-6 py-4 text-center">Score Matrix</th>
                            <th className="px-6 py-4">Grade Node</th>
                            <th className="px-6 py-4 text-right pr-10">Matrix Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 font-sans">
                        {examLedger.map((res) => (
                            <tr key={res.id} className="group hover:bg-indigo-50/5 transition-all border-l-2 border-transparent hover:border-indigo-600">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="size-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm"><FileText size={16} /></div>
                                        <div>
                                            <p className="text-[11px] font-black text-slate-800 uppercase leading-none">{res.title}</p>
                                            <p className="text-[8px] font-bold text-slate-300 uppercase mt-1 tabular-nums font-mono">{res.id}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-tight">{res.subject}</td>
                                <td className="px-6 py-4 text-center">
                                    <span className="text-[11px] font-black text-slate-800 tabular-nums">{res.score}</span>
                                    <div className="w-16 h-1 bg-slate-100 rounded-full overflow-hidden mt-1.5 mx-auto"><div className="h-full bg-indigo-500" style={{ width: '85%' }} /></div>
                                </td>
                                <td className="px-6 py-4">
                                    <Badge className="bg-indigo-50 text-indigo-600 border-none font-black text-[9px] px-2">{res.grade}</Badge>
                                </td>
                                <td className="px-6 py-4 text-right pr-10">
                                    <button className="text-[9px] font-black text-indigo-400 uppercase tracking-widest hover:text-indigo-700 transition-colors underline decoration-indigo-100 decoration-dashed underline-offset-4">Get Result Node</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>
         </div>
      </div>
    </div>
  );
}

// --- KPI COMPONENT (Dashboard Sync) ---
function DashStat({ label, value, trend, color, icon }: any) {
    const colors: any = { indigo: "bg-indigo-50 text-indigo-600 shadow-indigo-100", emerald: "bg-emerald-50 text-emerald-600 shadow-emerald-100", blue: "bg-blue-50 text-blue-600 shadow-blue-100", purple: "bg-purple-50 text-purple-600 shadow-purple-100", orange: "bg-orange-50 text-orange-600 shadow-orange-100", rose: "bg-rose-50 text-rose-600 shadow-rose-100" }
    return (
        <Card className="p-3.5 rounded-xl bg-white border-none shadow-sm ring-1 ring-slate-100 flex flex-col justify-between hover:shadow-md hover:-translate-y-1 transition-all h-[95px] cursor-default text-left group">
            <div className="flex justify-between items-start w-full leading-none">
                <div className={cn("p-1.5 rounded-lg shadow-xs transition-transform group-hover:scale-110", colors[color])}>{icon}</div>
                <span className={cn("text-[6px] font-black px-1.5 py-0.5 rounded uppercase tracking-tighter shadow-sm bg-white", colors[color])}>{trend}</span>
            </div>
            <div className="mt-1 text-left"><p className="text-base font-black text-slate-900 tracking-tight leading-none tabular-nums">{value}</p><p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1.5 leading-none group-hover:text-indigo-600 transition-colors">{label}</p></div>
        </Card>
    )
}
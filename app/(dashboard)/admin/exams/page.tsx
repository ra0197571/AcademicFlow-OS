"use client"

import React, { useState, useEffect } from 'react';
import { 
  Plus, Search, MoreHorizontal, Layers, GraduationCap, Clock, Filter, 
  ArrowUpRight, Target, TrendingUp, LayoutGrid, Database, 
  FileText, Settings, Download, ClipboardCheck, Zap, Activity, Users, AlertCircle, Timer
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, Tooltip 
} from "recharts";
import { cn } from "@/lib/utils";

// --- MOCK DATA ---
const exams = [
  { id: "EXM-771", title: "Mid-Term Examination 2026", category: "Matric", date: "July 28", status: "Published", enrolled: 450, progress: 100, avg: "78%", trend: [{v: 40}, {v: 70}, {v: 90}, {v: 100}] },
  { id: "EXM-802", title: "Monthly Assessment Node", category: "Grade 9", date: "July 30", status: "Evaluating", enrolled: 120, progress: 45, avg: "--", trend: [{v: 10}, {v: 25}, {v: 35}, {v: 45}] },
  { id: "EXM-915", title: "Global Finals Phase 01", category: "O-Levels", date: "Sept 15", status: "Scheduled", enrolled: 1240, progress: 0, avg: "--", trend: [{v: 0}, {v: 0}, {v: 0}, {v: 0}] },
  { id: "EXM-654", title: "Chemistry Practical Lab", category: "Grade 10", date: "Aug 05", status: "Draft", enrolled: 85, progress: 0, avg: "--", trend: [{v: 0}, {v: 0}, {v: 0}, {v: 0}] },
];

export default function EliteExamManagement() {
  const [mounted, setMounted] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <div className="flex flex-col h-full bg-[#FDFDFD] overflow-hidden animate-in fade-in duration-700 font-sans">
      
      {/* 1. TOP HEADER (Dashboard Sync) */}
      <header className="shrink-0 h-[64px] border-b border-slate-100 bg-white flex items-center justify-between px-6 z-20 gap-4">
        <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2 text-[10px] font-bold text-indigo-600 uppercase tracking-widest leading-none">
                ASSESSMENT CONTROL <span className="text-slate-300">•</span> <span className="text-slate-400">SESSION 2026</span>
            </div>
            <h1 className="text-lg font-black text-slate-900 tracking-tight mt-1 uppercase italic leading-none truncate">
                Examination <span className="text-indigo-600 font-bold not-italic">Command</span>
            </h1>
        </div>

        <div className="flex items-center gap-2 shrink-0">
           <Button variant="outline" className="hidden sm:flex h-9 px-4 rounded-xl text-[11px] font-bold uppercase border-slate-200 bg-white gap-2">
              <Download size={14} /> Archive
           </Button>
           <Button className="h-9 bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-bold uppercase shadow-lg shadow-indigo-100 transition-all px-5 rounded-xl flex gap-2">
                <Plus size={14} strokeWidth={3} /> New Assessment
            </Button>
        </div>
      </header>

      {/* 2. SCROLLABLE AREA */}
      <main className="flex-1 overflow-y-auto p-4 lg:p-6 scrollbar-hide space-y-6 bg-slate-50/20">
        
        {/* KPI ROW (Dashboard Compact Style) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 max-w-[1600px] mx-auto">
           <DashStat label="Active Exams" value="14" trend="+2 New" color="indigo" icon={<ClipboardCheck size={12}/>}/>
           <DashStat label="Marking Velocity" value="82%" trend="FAST" color="emerald" icon={<Zap size={12}/>}/>
           <DashStat label="Total Registrations" value="1,422" trend="98%" color="blue" icon={<Users size={12}/>}/>
           <DashStat label="Avg Evaluation" value="3.2d" trend="OPTIMAL" color="purple" icon={<Clock size={12}/>}/>
           <DashStat label="Clash Nodes" value="Zero" trend="SECURE" color="orange" icon={<AlertCircle size={12}/>}/>
           <DashStat label="System Status" value="Live" trend="v1.2" color="rose" icon={<Timer size={12}/>}/>
        </div>

        {/* TOOLBAR */}
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row gap-3 items-center justify-between bg-white p-2 rounded-xl border border-slate-100 shadow-sm">
           <div className="flex bg-slate-50 p-0.5 rounded-lg border border-slate-100 overflow-x-auto w-full md:w-auto">
              {['All', 'Current', 'Evaluated', 'Drafts'].map((f) => (
                <button 
                    key={f}
                    onClick={() => setActiveFilter(f)}
                    className={cn(
                        "px-5 py-1.5 rounded-md text-[9px] font-black uppercase tracking-widest transition-all whitespace-nowrap",
                        activeFilter === f ? "bg-white text-indigo-600 shadow-sm ring-1 ring-slate-200" : "text-slate-400 hover:text-slate-600"
                    )}
                >
                    {f}
                </button>
              ))}
           </div>

           <div className="flex items-center gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:w-72 group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={12} />
                <input placeholder="Search Assessment Node ID..." className="w-full h-9 pl-9 pr-3 bg-slate-50 border border-slate-200 rounded-lg text-[10px] font-semibold outline-none focus:bg-white focus:ring-2 ring-indigo-50 transition-all" />
              </div>
              <Button variant="outline" className="h-9 w-9 p-0 border-slate-200 bg-white rounded-lg shrink-0"><Filter size={12}/></Button>
        </div>
      </div>

        {/* ASSESSMENT LEDGER */}
        <div className="max-w-[1600px] mx-auto pb-10">
           <Card className="border-none bg-white rounded-2xl shadow-sm ring-1 ring-slate-200/60 overflow-hidden">
              <table className="w-full text-left border-collapse">
                 <thead>
                    <tr className="bg-slate-50/50 border-b border-slate-100 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                       <th className="p-4 pl-6">Assessment Identity</th>
                       <th className="p-4">Node / Registration</th>
                       <th className="p-4 text-center">Lifecycle Status</th>
                       <th className="p-4">Marking Velocity</th>
                       <th className="p-4 text-right pr-6">Operational</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100 font-sans">
                    {exams.map((exam) => (
                       <tr key={exam.id} className="group hover:bg-indigo-50/10 transition-all border-l-2 border-transparent hover:border-indigo-600">
                          <td className="p-4 pl-6">
                             <div className="flex items-center gap-4">
                                <div className="size-9 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
                                   <FileText size={18} />
                                </div>
                                <div>
                                   <p className="text-[11px] font-black text-slate-800 uppercase leading-none">{exam.title}</p>
                                   <p className="text-[9px] font-bold text-indigo-400 mt-1 uppercase tracking-tighter tabular-nums font-mono">{exam.id}</p>
                                </div>
                             </div>
                          </td>
                          <td className="p-4">
                             <Badge variant="outline" className="text-[8px] font-black border-slate-100 bg-white text-slate-400 py-0 px-1.5 uppercase h-5">{exam.category}</Badge>
                             <p className="text-[9px] font-bold text-slate-500 mt-1.5 uppercase tracking-tighter flex items-center gap-1">
                                <Users size={10} className="text-slate-300" /> {exam.enrolled} Nodes
                             </p>
                          </td>
                          <td className="p-4 text-center">
                             <div className="flex flex-col items-center gap-1.5">
                                <div className={cn(
                                    "px-2 py-0.5 rounded text-[8px] font-black uppercase ring-1 ring-inset",
                                    getStatusStyle(exam.status)
                                )}>
                                    {exam.status}
                                </div>
                                <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest italic">{exam.date}</span>
                             </div>
                          </td>
                          <td className="p-4 min-w-[180px]">
                             <div className="flex items-center gap-4">
                                <div className="flex-1">
                                   <div className="flex justify-between text-[8px] font-black text-slate-400 uppercase mb-1">
                                      <span>Progress</span>
                                      <span className="text-indigo-600">{exam.progress}%</span>
                                   </div>
                                   <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                                      <div className="h-full bg-indigo-600 transition-all duration-1000" style={{ width: `${exam.progress}%` }} />
                                   </div>
                                </div>
                                <div className="w-10 h-6 opacity-30 group-hover:opacity-100 transition-opacity">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={exam.trend}>
                                            <Area type="monotone" dataKey="v" stroke="#6366f1" fill="#6366f1" fillOpacity={0.1} strokeWidth={2} />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                             </div>
                          </td>
                          <td className="p-4 text-right pr-6">
                             <button className="text-[9px] font-black text-indigo-400 uppercase tracking-widest hover:text-indigo-600 transition-colors underline decoration-indigo-100 decoration-dashed underline-offset-4">Audit Node</button>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </Card>
        </div>
      </main>
    </div>
  );
}

// --- DASHBOARD STYLE KPI COMPONENT ---
function DashStat({ label, value, trend, color, icon }: any) {
    const colors: any = {
        indigo: "bg-indigo-50 text-indigo-600",
        emerald: "bg-emerald-50 text-emerald-600",
        blue: "bg-blue-50 text-blue-600",
        purple: "bg-purple-50 text-purple-600",
        orange: "bg-orange-50 text-orange-600",
        rose: "bg-rose-50 text-rose-600",
    }
    return (
        <Card className="p-3.5 rounded-xl bg-white border-none shadow-sm ring-1 ring-slate-100 flex flex-col justify-between hover:shadow-md transition-all h-[95px]">
            <div className="flex justify-between items-start w-full">
                <div className={cn("p-1.5 rounded-lg", colors[color])}>{icon}</div>
                <span className={cn("text-[7px] font-black px-1 py-0.5 rounded-md", colors[color])}>{trend}</span>
            </div>
            <div className="mt-1">
                <p className="text-base font-black text-slate-900 tracking-tight leading-none tabular-nums">{value}</p>
                <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1.5 leading-none">{label}</p>
            </div>
        </Card>
    )
}

function getStatusStyle(status: string) {
    switch (status) {
        case 'Published': return 'bg-emerald-50 text-emerald-600 ring-emerald-100';
        case 'Evaluating': return 'bg-amber-50 text-amber-600 ring-amber-100';
        case 'Scheduled': return 'bg-indigo-50 text-indigo-600 ring-indigo-100';
        default: return 'bg-slate-100 text-slate-500 ring-slate-200';
    }
}
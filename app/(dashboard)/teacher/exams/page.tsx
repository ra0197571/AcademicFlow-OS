"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ClipboardCheck, Clock, CheckCircle2, AlertCircle, FileText, 
  Search, Filter, Plus, LayoutGrid, Zap, Timer, Star, 
  TrendingUp, ArrowUpRight, GraduationCap, Download, History,
  Activity, MoreHorizontal
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
// FIXED: Added PieChart, Pie, and Cell to imports
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from "recharts";
import { cn } from "@/lib/utils";

// --- MOCK DATA ---
const markingTrend = [
  { day: 'M', checked: 30 }, { day: 'T', checked: 55 },
  { day: 'W', checked: 45 }, { day: 'T', checked: 80 },
  { day: 'F', checked: 65 }, { day: 'S', checked: 92 },
];

const upcomingExams = [
  { id: "EXM-701", title: "Math Mid-Term Node", class: "9-Alpha", date: "15 July", time: "09:00 AM", status: "Paper Ready" },
  { id: "EXM-802", title: "Physics Lab Viva", class: "10-Beta", date: "18 July", time: "11:30 AM", status: "Drafting" },
  { id: "EXM-915", title: "Monthly Logic Quiz", class: "12-Pro", date: "22 July", time: "01:30 PM", status: "Scheduled" },
];

export default function FacultyExamHub() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <div className="flex flex-col h-full bg-[#FDFDFD] overflow-hidden animate-in fade-in duration-700 font-sans relative text-slate-900 text-left">
      
      {/* 1. TOP COMMAND HEADER */}
      <header className="shrink-0 h-[56px] border-b border-slate-100 bg-white flex items-center justify-between px-6 z-20">
        <div className="flex flex-col text-left">
            <div className="flex items-center gap-2 text-[9px] font-bold text-indigo-600 uppercase tracking-widest leading-none px-0.5">
                ASSESSMENT HUB <span className="text-slate-300">•</span> <span className="text-slate-400 font-bold uppercase">NODE_v1.2</span>
            </div>
            <h1 className="text-sm font-black text-slate-900 tracking-tight mt-1 uppercase italic leading-none">
                Exam <span className="text-indigo-600 not-italic font-bold ml-1">Management Hub</span>
            </h1>
        </div>

        <div className="flex items-center gap-2">
           <Button variant="outline" className="h-8 text-[9px] font-bold uppercase tracking-wider border-slate-200 bg-white">
              <History size={12} className="mr-1.5" /> Marking Log
           </Button>
           <Button className="h-8 bg-indigo-600 hover:bg-indigo-700 text-white text-[9px] font-bold uppercase shadow-md active:scale-95 transition-all px-4 rounded-lg">
                <Plus size={14} className="mr-1.5" strokeWidth={3} /> Create Paper
            </Button>
        </div>
      </header>

      {/* 2. SCROLLABLE AREA */}
      <main className="flex-1 overflow-y-auto p-4 lg:p-6 scrollbar-hide space-y-4 bg-slate-50/20 pb-32">
        
        {/* KPI ROW */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 max-w-[1700px] mx-auto text-left">
           <DashStat label="Scheduled" value="04" trend="UPCOMING" color="indigo" icon={<ClipboardCheck size={12}/>}/>
           <DashStat label="Speed" value="3.2d" trend="FAST" color="emerald" icon={<Zap size={12}/>}/>
           <DashStat label="Evaluating" value="120" trend="NODE" color="blue" icon={<Timer size={12}/>}/>
           <DashStat label="Avg Score" value="78%" trend="STABLE" color="purple" icon={<TrendingUp size={12}/>}/>
           <DashStat label="Pending" value="02" trend="REQD" color="orange" icon={<AlertCircle size={12}/>}/>
           <DashStat label="Security" value="Active" trend="AES" color="rose" icon={<CheckCircle2 size={12}/>}/>
        </div>

        {/* ANALYTICS ROW */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 max-w-[1700px] mx-auto text-left">
           
           {/* Dark Hero Card */}
           <Card className="lg:col-span-8 h-[180px] bg-[#0F172A] text-white rounded-2xl border-none shadow-2xl relative overflow-hidden flex flex-col justify-center p-8 group transition-all">
              <div className="relative z-20 space-y-4 max-w-[350px]">
                 <div>
                    <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2 italic leading-none">
                       <Activity size={12} className="text-indigo-400" /> Evaluation Velocity Node
                    </h3>
                    <p className="text-3xl font-black tracking-tighter text-white mt-3 leading-none uppercase">Checking Speed: <span className="text-indigo-400">Optimal</span></p>
                 </div>
                 <div className="flex gap-2">
                    <Badge className="bg-emerald-500/10 text-emerald-400 border-none font-bold text-[8px] uppercase tracking-tighter px-2 py-0.5">High Efficiency</Badge>
                    <Badge className="bg-white/5 border-none text-slate-500 font-bold text-[8px] uppercase tracking-tighter px-2 py-0.5 italic">Active_Flow</Badge>
                 </div>
              </div>
              
              <div className="absolute right-0 bottom-0 top-10 w-[60%] z-10 opacity-80 group-hover:opacity-100 transition-opacity">
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={markingTrend} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
                       <defs>
                          <linearGradient id="colorMark" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                             <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                          </linearGradient>
                       </defs>
                       <XAxis dataKey="day" hide />
                       <YAxis hide domain={[0, 100]} />
                       <Area 
                          type="monotone" 
                          dataKey="checked" 
                          stroke="#6366f1" 
                          strokeWidth={4} 
                          fill="url(#colorMark)" 
                          dot={{ r: 4, fill: '#6366f1', strokeWidth: 2, stroke: '#0F172A' }} 
                          activeDot={{ r: 6, fill: '#fff' }}
                        />
                    </AreaChart>
                 </ResponsiveContainer>
              </div>
              <div className="absolute top-0 left-0 size-full bg-gradient-to-r from-[#0F172A] via-[#0F172A]/80 to-transparent z-10 pointer-events-none" />
           </Card>

           {/* Quality Audit Card */}
          {/* Quality Audit Card - HORIZONTAL ELITE FIX */}
<Card className="lg:col-span-4 h-[200px] bg-white rounded-[32px] border-slate-100 shadow-sm p-8 flex items-center gap-6 hover:border-indigo-100 transition-all group overflow-hidden">
  
  {/* Left Side: Text Data */}
  <div className="flex-1 space-y-4 text-left">
     <div>
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 leading-none">
           <Star size={12} className="text-amber-500" /> Quality Audit
        </h3>
        <p className="text-5xl font-black text-slate-900 tracking-tighter mt-3 tabular-nums leading-none">4.8</p>
        <p className="text-[9px] font-black text-slate-400 uppercase mt-2 tracking-widest">Evaluation Index</p>
     </div>
     
     <div className="space-y-2 pt-2 border-t border-slate-50">
        <div className="flex justify-between text-[8px] font-black text-slate-400 uppercase tracking-tighter">
            <span>Accuracy</span>
            <span className="text-indigo-600">92%</span>
        </div>
        <div className="h-1 w-full bg-slate-50 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-600 transition-all duration-1000 shadow-[0_0_8px_rgba(99,102,241,0.4)]" style={{ width: '92%' }} />
        </div>
     </div>
  </div>

  {/* Right Side: Circular Gauge (No Clipping) */}
  <div className="size-24 shrink-0 relative flex items-center justify-center">
     <ResponsiveContainer width="100%" height="100%">
        <PieChart>
            <Pie 
                data={[{v:92}, {v:8}]} 
                innerRadius={32} 
                outerRadius={45} 
                dataKey="v" 
                stroke="none" 
                cx="50%" 
                cy="50%"
            >
                <Cell fill="#6366f1" className="drop-shadow-[0_0_8px_rgba(99,102,241,0.3)]" />
                <Cell fill="#f1f5f9" />
            </Pie>
        </PieChart>
     </ResponsiveContainer>
     <div className="absolute inset-0 flex items-center justify-center font-black text-[10px] text-slate-400 uppercase tracking-widest">Live</div>
  </div>

  {/* Subtle background glow */}
  <div className="absolute -bottom-10 -right-10 size-32 bg-indigo-50/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
</Card>
        </div>

        {/* EXAM LEDGER */}
        <div className="max-w-[1700px] mx-auto pb-12 pt-2 text-left">
           <div className="flex items-center justify-between mb-4 px-2">
                <h3 className="text-[11px] font-black text-slate-800 uppercase tracking-[0.2em] flex items-center gap-2 italic leading-none">
                    <FileText size={16} className="text-indigo-600" /> Upcoming Assessment Timeline
                </h3>
           </div>
           <Card className="border-none bg-white rounded-2xl shadow-sm ring-1 ring-slate-200/60 overflow-hidden text-left">
              <table className="w-full text-left border-collapse">
                 <thead>
                    <tr className="bg-slate-50/50 border-b border-slate-100 text-[9px] font-black text-slate-400 uppercase tracking-widest text-left">
                       <th className="px-6 py-4 text-left">Assessment Node</th>
                       <th className="px-6 py-4 text-center">Event Date</th>
                       <th className="px-6 py-4 text-right pr-10">Matrix Action</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-50 font-sans">
                    {upcomingExams.map((exam) => (
                       <tr key={exam.id} className="group hover:bg-indigo-50/5 transition-all border-l-2 border-transparent hover:border-indigo-600 text-left">
                          <td className="px-6 py-4">
                             <div className="flex items-center gap-4">
                                <div className="size-9 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-all shadow-sm">
                                   <FileText size={18} />
                                </div>
                                <div className="text-left leading-none">
                                   <p className="text-[11px] font-black text-slate-800 uppercase leading-none">{exam.title}</p>
                                   <p className="text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-tighter tabular-nums font-mono">{exam.id} • {exam.class}</p>
                                </div>
                             </div>
                          </td>
                          <td className="px-6 py-4 text-center">
                             <div className="flex items-center justify-center gap-2 text-slate-500">
                                <Clock size={12} className="text-indigo-400" />
                                <span className="text-[10px] font-bold uppercase">{exam.date} • {exam.time}</span>
                             </div>
                          </td>
                          <td className="px-6 py-4 text-right pr-10">
                             <Button variant="ghost" className="h-8 px-4 text-[9px] font-black uppercase text-indigo-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors underline decoration-indigo-200 decoration-dashed underline-offset-4">
                                Open Paper Node
                             </Button>
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

// KPI Component
function DashStat({ label, value, trend, color, icon }: any) {
    const colors: any = { indigo: "bg-indigo-50 text-indigo-600 shadow-indigo-100", emerald: "bg-emerald-50 text-emerald-600 shadow-emerald-100", blue: "bg-blue-50 text-blue-600 shadow-blue-100", purple: "bg-purple-50 text-purple-600 shadow-purple-100", orange: "bg-orange-50 text-orange-600 shadow-orange-100", rose: "bg-rose-50 text-rose-600 shadow-rose-100" }
    return (
        <Card className="p-3.5 rounded-xl bg-white border-none shadow-sm ring-1 ring-slate-100 flex flex-col justify-between hover:shadow-md hover:-translate-y-1 transition-all h-[95px] cursor-default text-left group">
            <div className="flex justify-between items-start w-full">
                <div className={cn("p-1.5 rounded-lg shadow-xs transition-transform group-hover:scale-110", colors[color])}>{icon}</div>
                <span className={cn("text-[6px] font-black px-1.5 py-0.5 rounded uppercase tracking-tighter shadow-sm bg-white", colors[color])}>{trend}</span>
            </div>
            <div className="mt-1 text-left"><p className="text-base font-black text-slate-900 tracking-tight leading-none tabular-nums">{value}</p><p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1.5 leading-none">{label}</p></div>
        </Card>
    )
}
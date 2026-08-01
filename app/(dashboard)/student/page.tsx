"use client"

import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Trophy, Calendar, Clock, ArrowUpRight, CheckCircle2, 
  AlertCircle, TrendingUp, Star, LayoutGrid, Zap, Timer, Users, 
  Target, GraduationCap, Wallet, FileText, ChevronRight
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid 
} from 'recharts';
import { cn } from "@/lib/utils";

// --- MOCK DATA ---
const performanceData = [
  { month: 'Feb', score: 70 }, { month: 'Mar', score: 75 },
  { month: 'Apr', score: 72 }, { month: 'May', score: 85 },
  { month: 'Jun', score: 82 }, { month: 'Jul', score: 90 },
];

export default function StudentDashboard() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <div className="flex flex-col h-full space-y-6 text-left animate-in fade-in duration-700">
      
      {/* 1. ELITE PROFILE BANNER */}
      <Card className="shrink-0 border-none bg-indigo-600 rounded-[32px] overflow-hidden relative shadow-2xl shadow-indigo-100 group">
        {/* Subtle Background Text Watermark */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.05] flex items-center justify-center select-none overflow-hidden">
            <h1 className="text-[120px] font-black -rotate-12 uppercase tracking-tighter text-white">AcademicFlow</h1>
        </div>
        
        <div className="p-8 relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
           <div className="flex items-center gap-6">
              <div className="size-20 rounded-[28px] bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white text-3xl font-black shadow-xl italic ring-4 ring-white/5">AM</div>
              <div className="text-left space-y-1">
                 <h1 className="text-3xl font-black text-white tracking-tighter uppercase italic leading-none">Ahmed Malik</h1>
                 <div className="flex items-center gap-3">
                    <p className="text-indigo-100 font-bold text-[10px] uppercase tracking-[0.25em] flex items-center gap-2">
                        <GraduationCap size={12} className="text-indigo-200" /> Grade 9-Alpha
                    </p>
                    <span className="text-white/20">|</span>
                    <p className="text-indigo-100 font-bold text-[10px] uppercase tracking-[0.25em] tabular-nums">Roll: Node_01</p>
                 </div>
              </div>
           </div>
           
           <div className="bg-slate-900/40 backdrop-blur-md p-4 px-6 rounded-2xl border border-white/10 text-center min-w-[140px] shadow-2xl">
              <p className="text-[9px] uppercase font-black tracking-[0.2em] text-indigo-300">Global Rank</p>
              <h2 className="text-3xl font-black text-white mt-1 tabular-nums italic">#02</h2>
              <Badge className="mt-2 bg-emerald-500 text-white border-none font-black text-[8px] uppercase px-2 py-0.5">Top 5% Node</Badge>
           </div>
        </div>
      </Card>

      {/* 2. KPI ROW (Dashboard Sync) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
         <DashStat label="Attendance" value="96%" trend="EXCEL" color="emerald" icon={<CheckCircle2 size={12}/>}/>
         <DashStat label="Avg Result" value="85.4%" trend="TOP" color="orange" icon={<Trophy size={12}/>}/>
         <DashStat label="Fee Status" value="PAID" trend="JUNE" color="blue" icon={<Wallet size={12}/>}/>
         <DashStat label="Tasks" value="12" trend="PEND" color="indigo" icon={<LayoutGrid size={12}/>}/>
         <DashStat label="Badges" value="08" trend="ELITE" color="purple" icon={<Star size={12}/>}/>
         <DashStat label="Next Exam" value="14d" trend="SCHED" color="rose" icon={<Timer size={12}/>}/>
      </div>

      {/* 3. MAIN ANALYTICS HUB */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-12">
        
        {/* Academic Streams - Span 4 */}
        <Card className="lg:col-span-4 border-slate-200 shadow-sm rounded-[32px] p-6 bg-white hover:border-indigo-200 transition-all flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-[10px] font-black text-slate-800 uppercase tracking-widest flex items-center gap-2 italic">
              <BookOpen size={14} className="text-indigo-600" /> Syllabus Depth Node
            </h3>
            <Badge className="bg-indigo-50 text-indigo-600 border-none font-bold text-[8px] uppercase">Live_Sync</Badge>
          </div>
          
          <div className="space-y-7 flex-1">
            <SubjectProgress name="Advanced Mathematics" value={95} color="bg-indigo-600" trend="+4%" />
            <SubjectProgress name="Quantum Physics" value={90} color="bg-blue-600" trend="+2%" />
            <SubjectProgress name="Modern Computing" value={87} color="bg-purple-600" trend="+5%" />
            <SubjectProgress name="English Language" value={80} color="bg-emerald-600" trend="STABLE" />
          </div>

          <Button variant="ghost" className="w-full mt-10 h-10 text-[9px] font-black uppercase text-indigo-600 hover:bg-indigo-50 rounded-xl tracking-widest border border-dashed border-indigo-100 flex gap-2">
             Open Full Transcript <ArrowUpRight size={14} />
          </Button>
        </Card>

        {/* Learning Evolution - Span 8 */}
        <Card className="lg:col-span-8 border-slate-200 shadow-sm rounded-[32px] p-8 bg-white hover:border-indigo-100 transition-all group overflow-hidden">
          <div className="flex justify-between items-start mb-10">
             <div>
                <h3 className="text-[10px] font-black text-slate-800 uppercase tracking-widest flex items-center gap-2 italic"><TrendingUp size={14} className="text-indigo-600" /> Learning Evolution</h3>
                <p className="text-[11px] font-bold text-slate-400 uppercase mt-1">Growth trajectory per term registry node</p>
             </div>
             <div className="flex gap-2">
                <Badge variant="outline" className="border-slate-100 text-slate-400 text-[8px] font-black px-2 py-0.5 uppercase tracking-tighter">TERM_DATA_SYNC</Badge>
                <Badge variant="outline" className="border-slate-100 text-slate-400 text-[8px] font-black px-2 py-0.5 uppercase tracking-tighter italic">v4.0.1</Badge>
             </div>
          </div>
          
          <div className="h-[320px] w-full group-hover:scale-[1.01] transition-transform duration-700">
             <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData}>
                  <defs>
                    <linearGradient id="studentScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} dy={10} />
                  <YAxis hide domain={[0, 100]} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.05)', fontSize: '10px', fontWeight: 900 }} 
                  />
                  <Area type="monotone" dataKey="score" stroke="#6366f1" strokeWidth={4} fill="url(#studentScore)" dot={{ r: 4, fill: '#6366f1', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6, strokeWidth: 0 }} />
                </AreaChart>
              </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}

// --- DASHBOARD UI COMPONENTS ---
function DashStat({ label, value, trend, color, icon }: any) {
    const colors: any = { indigo: "bg-indigo-50 text-indigo-600", emerald: "bg-emerald-50 text-emerald-600", blue: "bg-blue-50 text-blue-600", purple: "bg-purple-50 text-purple-600", orange: "bg-orange-50 text-orange-600", rose: "bg-rose-50 text-rose-600" }
    return (
        <Card className="p-3.5 rounded-xl bg-white border-none shadow-sm ring-1 ring-slate-100 flex flex-col justify-between hover:shadow-md hover:-translate-y-1 transition-all h-[95px] cursor-default text-left group">
            <div className="flex justify-between items-start w-full leading-none">
                <div className={cn("p-1.5 rounded-lg shadow-xs transition-transform group-hover:scale-110", colors[color])}>{icon}</div>
                <span className={cn("text-[6px] font-black px-1.5 py-0.5 rounded uppercase tracking-tighter", colors[color])}>{trend}</span>
            </div>
            <div className="mt-1 text-left"><p className="text-base font-black text-slate-900 tracking-tight leading-none tabular-nums">{value}</p><p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1.5 leading-none group-hover:text-indigo-600 transition-colors">{label}</p></div>
        </Card>
    )
}

function SubjectProgress({ name, value, color, trend }: any) {
    return (
      <div className="space-y-3 group/prog cursor-default text-left">
        <div className="flex justify-between items-end">
          <div className="text-left">
            <p className="text-[11px] font-black text-slate-800 uppercase tracking-tight leading-none group-hover/prog:text-indigo-600 transition-colors">{name}</p>
            <p className="text-[8px] font-bold text-slate-400 uppercase mt-1.5 tracking-widest">Velocity: <span className="text-emerald-500">{trend}</span></p>
          </div>
          <p className="text-[11px] font-black text-indigo-600 tabular-nums font-mono">{value}%</p>
        </div>
        <div className="h-1 w-full bg-slate-50 rounded-full overflow-hidden shadow-inner">
            <div className={cn("h-full transition-all duration-1000", color)} style={{ width: `${value}%` }} />
        </div>
      </div>
    )
}
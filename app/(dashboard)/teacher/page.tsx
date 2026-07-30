"use client"

import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Users, CheckCircle2, Clock, Plus, Calendar as CalendarIcon,
  Activity, Star, LayoutGrid, ArrowUpRight, GraduationCap, ClipboardCheck, 
  Timer, FileText, Search, Filter, Download, MoreHorizontal, History, 
  Zap, MessageSquare, TrendingUp, ShieldCheck
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, 
  CartesianGrid, BarChart, Bar, Cell
} from "recharts";
import { cn } from "@/lib/utils";

// --- MOCK DATA ---
const attendanceData = [
  { day: 'Mon', val: 92 }, { day: 'Tue', val: 95 },
  { day: 'Wed', val: 88 }, { day: 'Thu', val: 94 },
  { day: 'Fri', val: 90 }, { day: 'Sat', val: 85 },
];

const performanceData = [
  { subject: 'Quiz 1', avg: 78, color: '#6366f1' }, 
  { subject: 'Midterm', avg: 82, color: '#8b5cf6' },
  { subject: 'Quiz 2', avg: 85, color: '#ec4899' }, 
  { subject: 'Finals', avg: 89, color: '#10b981' },
];

export default function TeacherDashboard() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <div className="flex flex-col h-full bg-[#FDFDFD] overflow-hidden animate-in fade-in duration-1000 font-sans selection:bg-indigo-100">
      
      {/* 1. ELITE COMMAND HEADER */}
      <header className="shrink-0 h-[64px] border-b border-slate-100 bg-white flex items-center justify-between px-6 z-20 overflow-hidden relative">
        <div className="flex flex-col relative z-10">
            <div className="flex items-center gap-2 text-[9px] font-black text-indigo-600 uppercase tracking-[0.2em] leading-none">
                FACULTY CONTROL <span className="text-slate-300">•</span> <span className="text-slate-400 font-bold">NODE_ACTIVE</span>
            </div>
            <h1 className="text-lg font-black text-slate-900 tracking-tight mt-1 uppercase italic leading-none">
                Protocol: <span className="text-indigo-600">Zia Khan</span>
            </h1>
        </div>

        <div className="flex items-center gap-3 relative z-10">
           <Button variant="outline" className="hidden sm:flex h-9 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest border-slate-200 bg-white gap-2 hover:bg-slate-50 transition-all">
              <CalendarIcon size={14} /> Schedule
           </Button>
           <Button className="h-9 bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] font-black uppercase tracking-widest shadow-xl shadow-indigo-200 transition-all px-5 rounded-xl flex gap-2 border-none active:scale-95">
                <Plus size={16} strokeWidth={3} /> Mark Attendance
            </Button>
        </div>
      </header>

      {/* 2. SCROLLABLE WORKSPACE */}
      <main className="flex-1 overflow-y-auto p-4 lg:p-6 scrollbar-hide space-y-6 bg-slate-50/20">
        
        {/* KPI ROW (Elite Compact Style) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 max-w-[1700px] mx-auto">
           <DashStat label="Sessions" value="06" trend="MAX_LOAD" color="indigo" icon={<BookOpen size={12}/>}/>
           <DashStat label="Nodes" value="184" trend="+4 New" color="emerald" icon={<Users size={12}/>}/>
           <DashStat label="Avg Score" value="82.4%" trend="+3.2%" color="blue" icon={<CheckCircle2 size={12}/>}/>
           <DashStat label="Compliance" value="94%" trend="STABLE" color="purple" icon={<ShieldCheck size={12}/>}/>
           <DashStat label="Alerts" value="12" trend="PENDING" color="orange" icon={<Zap size={12}/>}/>
           <DashStat label="Rating" value="4.9" trend="TOP" color="rose" icon={<Star size={12}/>}/>
        </div>

        {/* ANALYTICS SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1700px] mx-auto">
           
           {/* Attendance Matrix (Span 8) */}
           <Card className="lg:col-span-8 border-slate-100 shadow-sm rounded-[32px] p-8 bg-white hover:border-indigo-200 transition-all group overflow-hidden relative">
              <div className="flex justify-between items-start mb-10 relative z-10">
                 <div>
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] flex items-center gap-2 italic">
                       <Activity size={14} className="text-indigo-600" /> Attendance Matrix Node
                    </h3>
                    <p className="text-2xl font-black text-slate-900 tracking-tighter mt-2">Active Engagement <span className="text-emerald-500 font-bold">+12%</span></p>
                 </div>
                 <Badge className="bg-slate-900 text-white border-none font-black text-[9px] px-3 py-1 rounded-lg tracking-widest italic">REALTIME_SYNC</Badge>
              </div>
              
              <div className="h-[300px] w-full relative z-10 group-hover:scale-[1.01] transition-transform duration-700">
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={attendanceData}>
                       <defs>
                          <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15}/>
                             <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                          </linearGradient>
                       </defs>
                       <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                       <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 800, fill: '#94a3b8'}} dy={10} />
                       <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 800, fill: '#94a3b8'}} />
                       <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 50px rgba(0,0,0,0.1)', fontSize: '10px', fontWeight: 900 }} />
                       <Area type="monotone" dataKey="val" stroke="#6366f1" strokeWidth={4} fill="url(#colorVal)" dot={{ r: 4, fill: '#6366f1', strokeWidth: 2, stroke: '#fff' }} />
                    </AreaChart>
                 </ResponsiveContainer>
              </div>
           </Card>

           {/* Today's Schedule (Span 4) */}
           <Card className="lg:col-span-4 border-slate-100 shadow-sm rounded-[32px] bg-white overflow-hidden flex flex-col hover:border-indigo-100 transition-all">
              <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
                 <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] italic flex items-center gap-2"><Clock size={12}/> Schedule Vector</h3>
                 <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded uppercase">June 2026</span>
              </div>
              <div className="flex-1 divide-y divide-slate-50 overflow-y-auto scrollbar-hide max-h-[380px]">
                 <ScheduleItem time="09:00 - 10:00" subject="Mathematics" classNode="Grade 9-A" students="32" status="live" />
                 <ScheduleItem time="11:30 - 12:30" subject="Quantum Physics" classNode="Grade 10-B" students="28" status="upcoming" />
                 <ScheduleItem time="01:30 - 02:30" subject="Modern Computing" classNode="Grade 12-A" students="24" status="upcoming" />
              </div>
              <div className="p-4 bg-slate-50/50 border-t border-slate-50">
                 <Button className="w-full bg-slate-900 h-11 rounded-2xl text-[9px] font-black uppercase tracking-[0.2em] hover:bg-slate-800 shadow-xl transition-all border-none">
                    Open Control Center
                 </Button>
              </div>
           </Card>
        </div>

        {/* BOTTOM SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1700px] mx-auto pb-12">
           
           {/* Performance Analytics (Span 7) */}
           <Card className="lg:col-span-7 border-slate-100 shadow-sm rounded-[32px] p-8 bg-white hover:border-indigo-100 transition-all">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-10 flex items-center gap-2 italic"><Star size={12} className="text-amber-500" /> Mastery Analytics Node</h3>
              <div className="h-[240px] w-full">
                 <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={performanceData}>
                       <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                       <XAxis dataKey="subject" axisLine={false} tickLine={false} tick={{fontSize: 9, fontWeight: 900, fill: '#94a3b8'}} dy={5} />
                       <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} />
                       <Bar dataKey="avg" radius={[8, 8, 0, 0]} barSize={40}>
                          {performanceData.map((entry, index) => (
                             <Cell key={`cell-${index}`} fill={entry.color} opacity={0.8} />
                          ))}
                       </Bar>
                    </BarChart>
                 </ResponsiveContainer>
              </div>
           </Card>

           {/* Activity Ledger (Span 5) */}
           <Card className="lg:col-span-5 border-slate-100 shadow-sm rounded-[32px] bg-white p-8 hover:border-indigo-100 transition-all">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-8 flex items-center gap-2 italic">
                 <History size={14} className="text-indigo-600" /> Operational Ledger
              </h3>
              <div className="space-y-6">
                 <ActivityNode label="Result Payload Deployed" sub="Mathematics Cluster Grade 9" time="2h ago" color="emerald" />
                 <ActivityNode label="Identity Verified" sub="Faculty Registration Node" time="5h ago" color="indigo" />
                 <ActivityNode label="Task Node: Exam Sheet" sub="Pending Verification" time="1d ago" color="rose" />
              </div>
           </Card>
        </div>
      </main>
    </div>
  );
}

// --- ELITE UI COMPONENTS ---

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
        <Card className="p-4 rounded-[24px] bg-white border-none shadow-sm ring-1 ring-slate-100 flex flex-col justify-between hover:shadow-xl hover:ring-indigo-100 transition-all h-[110px] group cursor-default">
            <div className="flex justify-between items-start w-full">
                <div className={cn("p-2 rounded-xl shadow-sm transition-transform group-hover:scale-110", colors[color])}>{icon}</div>
                <span className={cn("text-[7px] font-black px-1.5 py-0.5 rounded uppercase tracking-tighter", colors[color])}>{trend}</span>
            </div>
            <div className="mt-2">
                <p className="text-xl font-black text-slate-900 tracking-tighter leading-none tabular-nums">{value}</p>
                <p className="text-[8px] font-bold text-slate-400 uppercase tracking-[0.1em] mt-2 leading-none">{label}</p>
            </div>
        </Card>
    )
}

function ScheduleItem({ time, subject, classNode, students, status }: any) {
    return (
        <div className="p-5 hover:bg-slate-50/80 transition-all flex items-center justify-between group cursor-default border-l-4 border-transparent hover:border-indigo-600">
            <div className="flex items-center gap-5 min-w-0">
                <div className="size-9 rounded-xl bg-slate-100 flex flex-col items-center justify-center text-slate-400 font-black text-[7px] shrink-0 border border-slate-200 shadow-inner group-hover:bg-white group-hover:text-indigo-600 transition-all">
                   <Clock size={10} className="mb-0.5" />
                   <span className="font-mono">{time.split(' ')[0]}</span>
                </div>
                <div className="min-w-0">
                    <h4 className="text-[12px] font-black text-slate-800 uppercase truncate leading-none tracking-tight group-hover:text-indigo-600 transition-colors">{subject}</h4>
                    <p className="text-[9px] font-bold text-slate-400 uppercase mt-1.5 tracking-widest">{classNode} <span className="text-slate-200mx-2 px-1">•</span> {students} Nodes</p>
                </div>
            </div>
            <div className="flex items-center gap-3">
                {status === 'live' && <div className="size-2 rounded-full bg-rose-500 animate-pulse shadow-[0_0_12px_rgba(244,63,94,0.6)]" />}
                <ArrowUpRight size={14} className="text-slate-200 group-hover:text-indigo-400 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
        </div>
    )
}

function ActivityNode({ label, sub, time, color }: any) {
    const colorMap: any = {
        emerald: "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]",
        indigo: "bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]",
        rose: "bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)]",
    }
    return (
        <div className="flex items-start gap-4 group">
            <div className="pt-1.5 flex flex-col items-center">
                <div className={cn("size-2.5 rounded-full ring-4 ring-white shadow-sm z-10 transition-transform group-hover:scale-125", colorMap[color])} />
                <div className="w-px h-full bg-slate-100 mt-1" />
            </div>
            <div className="min-w-0 flex-1 bg-slate-50/50 p-3 rounded-2xl border border-slate-100 group-hover:bg-white group-hover:shadow-md transition-all">
                <div className="flex justify-between items-start">
                    <h5 className="text-[10px] font-black text-slate-800 uppercase tracking-widest truncate">{label}</h5>
                    <span className="text-[8px] font-black text-slate-300 uppercase shrink-0 italic">{time}</span>
                </div>
                <p className="text-[9px] font-bold text-slate-400 uppercase mt-1 tracking-tighter truncate">{sub}</p>
            </div>
        </div>
    )
}
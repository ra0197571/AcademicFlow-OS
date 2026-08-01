"use client"

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, CheckCircle2, XCircle, Clock, Calendar, 
  TrendingUp, Zap, ShieldCheck, Timer, LayoutGrid, 
  ChevronRight, ArrowUpRight, Download, Filter, Search,
  AlertCircle, Star
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ResponsiveContainer, XAxis, YAxis, Tooltip, BarChart, Bar, Cell, CartesianGrid 
} from 'recharts';
import { cn } from "@/lib/utils";

// --- MOCK DATA ---
const monthlyTrend = [
  { week: 'Week 01', val: 100 }, { week: 'Week 02', val: 80 },
  { week: 'Week 03', val: 95 }, { week: 'Week 04', val: 88 },
];

const attendanceLog = [
  { id: "LOG-9901", date: "12 July, 2026", status: "Present", time: "08:02 AM", remark: "In-Time Node" },
  { id: "LOG-9842", date: "11 July, 2026", status: "Late", time: "08:15 AM", remark: "Network Delay" },
  { id: "LOG-9715", date: "10 July, 2026", status: "Present", time: "07:58 AM", remark: "Alpha Access" },
  { id: "LOG-9650", date: "09 July, 2026", status: "Absent", time: "--:-- --", remark: "Medical Node" },
];

export default function StudentAttendancePulse() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <div className="flex flex-col h-full space-y-6 text-left animate-in fade-in duration-700 font-sans selection:bg-indigo-100">
      
      {/* 1. TOP COMMAND HEADER */}
      <header className="shrink-0 h-[56px] border-b border-slate-100 bg-white flex items-center justify-between px-6 z-20 gap-4 text-left">
        <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2 text-[9px] font-bold text-indigo-600 uppercase tracking-widest leading-none px-0.5">
                IDENTITY SYNC <span className="text-slate-300">•</span> <span className="text-slate-400 font-bold uppercase tracking-widest">PRESENCE_LOG_v4.2</span>
            </div>
            <h1 className="text-lg font-black text-slate-900 tracking-tight mt-1 uppercase italic leading-none truncate">
                Attendance <span className="text-indigo-600 font-bold not-italic">Pulse Node</span>
            </h1>
        </div>

        <div className="flex items-center gap-2 shrink-0">
           <Button variant="outline" className="hidden md:flex h-8 text-[9px] font-bold uppercase border-slate-200 bg-white px-3 gap-2">
              <Download size={14} /> Full Export
           </Button>
           <Button className="h-8 bg-indigo-600 hover:bg-indigo-700 text-white text-[9px] font-bold uppercase shadow-md active:scale-95 transition-all px-4 rounded-lg border-none">
                Request Leave Node
            </Button>
        </div>
      </header>

      {/* 2. KPI ROW (Dashboard Sync) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
         <DashStat label="Total Present" value="142" trend="YTD" color="indigo" icon={<CheckCircle2 size={12}/>}/>
         <DashStat label="Month Avg" value="96%" trend="EXCEL" color="emerald" icon={<TrendingUp size={12}/>}/>
         <DashStat label="Late Count" value="04" trend="LOW" color="orange" icon={<Clock size={12}/>}/>
         <DashStat label="Leaves Taken" value="02" trend="MED" color="rose" icon={<AlertCircle size={12}/>}/>
         <DashStat label="Streak" value="12d" trend="ACTIVE" color="purple" icon={<Zap size={12}/>}/>
         <DashStat label="Auth Mode" value="Secure" trend="TLS" color="blue" icon={<ShieldCheck size={12}/>}/>
      </div>

      {/* 3. ANALYTICS WORKSPACE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 max-w-[1700px] mx-auto w-full">
         
         {/* Presence Heatmap - Span 7 (Height matched to 260px) */}
         <Card className="lg:col-span-7 h-[260px] border-slate-100 shadow-sm rounded-[32px] p-8 bg-white hover:border-indigo-100 transition-all group overflow-hidden relative">
            <div className="flex justify-between items-start mb-8 relative z-10">
               <div className="text-left">
                  <h3 className="text-[10px] font-black text-slate-800 uppercase tracking-widest flex items-center gap-2 italic leading-none">
                     <Activity size={14} className="text-indigo-600" /> Presence Intensity Matrix
                  </h3>
                  <p className="text-[11px] font-bold text-slate-400 uppercase mt-2">Weekly engagement synchronization</p>
               </div>
               <Badge className="bg-slate-900 text-white border-none font-black text-[8px] uppercase px-3 py-1 italic tracking-widest leading-none">REALTIME_LOG</Badge>
            </div>
            <div className="h-[140px] w-full relative z-10">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyTrend} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
                     <defs>
                        <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0.4}/>
                        </linearGradient>
                     </defs>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                     <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 800, fill: '#94a3b8'}} dy={10} />
                     <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.05)', fontSize: '10px', fontWeight: 900 }} />
                     <Bar dataKey="val" radius={[6, 6, 0, 0]} barSize={45}>
                        {monthlyTrend.map((entry, index) => (
                           <Cell key={`cell-${index}`} fill={index === 2 ? "url(#barGrad)" : "#e2e8f0"} />
                        ))}
                     </Bar>
                  </BarChart>
               </ResponsiveContainer>
            </div>
         </Card>

         {/* Status Breakdown - Span 5 (Height matched to 260px) */}
         <div className="lg:col-span-5 flex flex-col gap-4">
            <Card className="flex-1 p-6 rounded-[32px] border-none bg-[#0F172A] text-white shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 size-32 bg-indigo-500/10 blur-3xl transition-all group-hover:bg-indigo-500/20" />
               <div className="relative z-10 space-y-5">
                  <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2 italic leading-none"><Star size={12} className="text-amber-500" /> Protocol Achievement</h3>
                  <div>
                     <h2 className="text-3xl font-black tracking-tighter text-white tabular-nums leading-none uppercase">Perfect Week!</h2>
                     <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mt-2 flex items-center gap-1.5"><ShieldCheck size={12}/> Presence Integrity: 100%</p>
                  </div>
                  <Button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black text-[9px] h-10 rounded-xl uppercase tracking-widest shadow-xl shadow-indigo-900/40 border-none transition-all active:scale-95">Download Node Cert</Button>
               </div>
            </Card>

            <Card className="h-[80px] p-4 rounded-[24px] border-slate-100 bg-white shadow-sm ring-1 ring-slate-200/60 flex items-center justify-between hover:shadow-md transition-all">
               <div className="flex items-center gap-4">
                  <div className="size-10 rounded-xl bg-slate-50 flex items-center justify-center text-indigo-600 border border-slate-100 shadow-sm"><Timer size={20}/></div>
                  <div className="text-left leading-none">
                     <p className="text-[11px] font-black text-slate-900 uppercase">Next Node Signal</p>
                     <p className="text-[9px] font-bold text-slate-400 uppercase mt-1 tracking-widest">Quantum Physics • 12:40m</p>
                  </div>
               </div>
               <ChevronRight size={16} className="text-slate-200" />
            </Card>
         </div>

         {/* ATTENDANCE REGISTRY LEDGER (Span 12) */}
         <div className="lg:col-span-12 pt-4 text-left">
            <div className="flex items-center justify-between mb-4 px-2">
                <h3 className="text-[11px] font-black text-slate-800 uppercase tracking-[0.2em] flex items-center gap-2 italic leading-none">
                    <Activity size={16} className="text-indigo-600" /> Detailed Presence Ledger
                </h3>
            </div>
            
            {/* Table Container with Timeline Line */}
            <Card className="border-none bg-white rounded-[32px] shadow-sm ring-1 ring-slate-200/60 overflow-hidden mb-12 relative">
                <div className="absolute left-[38px] top-10 bottom-10 w-px bg-slate-100 z-0" />
                <table className="w-full text-left border-collapse relative z-10">
                    <thead>
                        <tr className="bg-slate-50/50 border-b border-slate-100 text-[9px] font-black text-slate-400 uppercase tracking-widest text-left">
                            <th className="px-6 py-4">Event Date Node</th>
                            <th className="px-6 py-4 text-center">Auth Timestamp</th>
                            <th className="px-6 py-4 text-center">Status Registry</th>
                            <th className="px-6 py-4 text-right pr-12">Matrix Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 font-sans">
                        {attendanceLog.map((log) => (
                            <tr key={log.id} className="group hover:bg-slate-50/50 transition-all border-l-2 border-transparent hover:border-indigo-600 text-left">
                                <td className="px-6 py-4 text-left leading-none">
                                    <div className="flex items-center gap-4">
                                        <div className="size-8 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-all shadow-sm">
                                            <Calendar size={16} />
                                        </div>
                                        <div className="text-left">
                                            <p className="text-[11px] font-black text-slate-800 uppercase leading-none">{log.date}</p>
                                            <p className="text-[8px] font-bold text-slate-300 uppercase mt-1 tabular-nums font-mono">{log.id}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-[10px] font-black text-slate-500 font-mono tracking-tighter uppercase tabular-nums text-center opacity-60">
                                    {log.time}
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <Badge className={cn(
                                        "text-[9px] font-black uppercase border-none px-3 py-0.5 rounded-md",
                                        log.status === 'Present' ? "bg-emerald-50 text-emerald-600" : 
                                        log.status === 'Late' ? "bg-amber-50 text-amber-600" : "bg-rose-50 text-rose-600"
                                    )}>{log.status}</Badge>
                                </td>
                                <td className="px-6 py-4 text-right pr-12">
                                    <button className="text-[9px] font-black text-indigo-400 uppercase tracking-widest hover:text-indigo-600 transition-colors underline decoration-indigo-200 decoration-dashed underline-offset-4">
                                        View Log Node
                                    </button>
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

function TimeBox({ val, label, dark = false }: any) {
    return (
        <div className="text-center">
            <h4 className={cn("text-xl font-black tabular-nums leading-none mb-1", dark ? "text-white" : "text-slate-900")}>{val}</h4>
            <p className={cn("text-[7px] font-bold uppercase tracking-widest leading-none", dark ? "text-slate-500" : "text-slate-400")}>{label}</p>
        </div>
    )
}
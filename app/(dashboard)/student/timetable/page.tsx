"use client"

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Clock, Calendar, BookOpen, MapPin, 
  CheckCircle2, Star, LayoutGrid, 
  ArrowUpRight, GraduationCap, ChevronRight,
  Download, Bell, Search, Activity, Timer, Zap, TrendingUp
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid 
} from 'recharts';
import { cn } from "@/lib/utils";

// --- MOCK DATA ---
const engagementData = [
  { day: 'Mon', load: 6 }, { day: 'Tue', load: 8 },
  { day: 'Wed', load: 5 }, { day: 'Thu', load: 7 },
  { day: 'Fri', load: 4 }, { day: 'Sat', load: 6 },
];

const scheduleNodes = [
  { time: "08:00 - 09:00", subject: "Advanced Mathematics", code: "MTH-401", teacher: "Zia Khan", room: "Node_101", status: "finished", color: "bg-indigo-500" },
  { time: "09:00 - 10:00", subject: "Quantum Physics Lab", code: "PHY-302", teacher: "Sarah Ahmed", room: "Lab_02", status: "live", color: "bg-emerald-500" },
  { time: "10:00 - 10:30", subject: "Network Reset / Break", code: "BRK-000", teacher: "System", room: "Cafeteria", status: "upcoming", color: "bg-amber-500" },
  { time: "10:30 - 11:30", subject: "Modern Computing", code: "CS-505", teacher: "Bilal Raza", room: "Node_104", status: "upcoming", color: "bg-violet-500" },
];

export default function StudentTimetable() {
  const [mounted, setMounted] = useState(false);
  const [activeDay, setActiveDay] = useState('Mon');

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <div className="flex flex-col h-full space-y-6 text-left animate-in fade-in duration-700 font-sans selection:bg-indigo-100">
      
      {/* 1. TOP COMMAND HEADER */}
      <header className="shrink-0 h-[56px] border-b border-slate-100 bg-white flex items-center justify-between px-6 z-20 gap-4">
        <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2 text-[9px] font-bold text-indigo-600 uppercase tracking-widest leading-none px-0.5">
                CHRONOS ENGINE <span className="text-slate-300">•</span> <span className="text-slate-400 font-bold uppercase tracking-widest">v4.2_Live</span>
            </div>
            <h1 className="text-lg font-black text-slate-900 tracking-tight mt-1 uppercase italic leading-none truncate">
                Academic <span className="text-indigo-600 font-bold not-italic">Schedule Hub</span>
            </h1>
        </div>
        <div className="flex items-center gap-2 shrink-0">
           <Button variant="outline" className="hidden md:flex h-8 text-[9px] font-bold uppercase border-slate-200 bg-white px-3 gap-2">
              <Download size={14} /> Offline Cache
           </Button>
           <Button className="h-8 bg-indigo-600 hover:bg-indigo-700 text-white text-[9px] font-bold uppercase shadow-md active:scale-95 transition-all px-4 rounded-lg flex gap-2 border-none">
                <Bell size={14} /> Set Protocol Alarms
            </Button>
        </div>
      </header>

      {/* 2. KPI ROW (Dashboard Sync) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
         <DashStat label="Sessions" value="06" trend="LOAD" color="indigo" icon={<LayoutGrid size={12}/>}/>
         <DashStat label="Streak" value="14d" trend="EXCEL" color="emerald" icon={<CheckCircle2 size={12}/>}/>
         <DashStat label="Credits" value="22" trend="v4.0" color="blue" icon={<GraduationCap size={12}/>}/>
         <DashStat label="Weekly Labs" value="04" trend="ACTIVE" color="purple" icon={<Zap size={12}/>}/>
         <DashStat label="Next Unit" value="12m" trend="SYNC" color="orange" icon={<Timer size={12}/>}/>
         <DashStat label="Network" value="Online" trend="NODE" color="rose" icon={<Activity size={12}/>}/>
      </div>

      {/* 3. MAIN WORKSPACE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-12 text-left relative">
        
        {/* LEFT COLUMN: TIMELINE (Span 8) */}
        <div className="lg:col-span-8 space-y-4">
           <div className="flex items-center justify-between bg-white p-1.5 rounded-xl border border-slate-100 shadow-sm">
              <div className="flex bg-slate-50 p-0.5 rounded-lg border border-slate-100 overflow-x-auto scrollbar-hide">
                 {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <button key={day} onClick={() => setActiveDay(day)} className={cn("px-5 py-1.5 rounded-md text-[9px] font-black uppercase tracking-widest transition-all", activeDay === day ? "bg-white text-indigo-600 shadow-sm ring-1 ring-slate-200" : "text-slate-400 hover:text-slate-600")}>
                       {day}
                    </button>
                 ))}
              </div>
              <Badge className="bg-indigo-50 text-indigo-600 border-none font-bold text-[8px] uppercase px-3 mr-2 italic tracking-widest">Active_Node_Matrix</Badge>
           </div>

           {/* TIMELINE LIST WITH CONNECTOR */}
           <div className="relative space-y-3 pl-4">
              <div className="absolute left-[34px] top-6 bottom-6 w-px bg-slate-100 hidden sm:block" />
              {scheduleNodes.map((node, i) => (
                 <Card key={i} className="p-4 bg-white border-none shadow-sm ring-1 ring-slate-200/60 transition-all cursor-default group rounded-2xl relative overflow-hidden flex items-center justify-between z-10 hover:ring-2 hover:ring-indigo-500 hover:shadow-xl hover:shadow-indigo-100/50">
                    <div className={cn("absolute left-0 top-0 bottom-0 w-1", node.color, node.status === 'live' && "animate-pulse")} />
                    <div className="flex items-center gap-6 flex-1 min-w-0 text-left">
                       <div className="flex flex-col items-center justify-center text-center shrink-0 w-16 relative">
                          <div className={cn("size-2 rounded-full absolute -left-[24px] border-4 border-white shadow-sm z-20 transition-transform group-hover:scale-125", node.color)} />
                          <p className="text-[11px] font-black text-slate-900 tabular-nums mb-1">{node.time.split(' ')[0]}</p>
                          <p className="text-[7px] font-bold text-slate-400 uppercase tracking-widest">{node.time.split(' ')[2]}</p>
                       </div>
                       <div className="min-w-0 text-left">
                          <div className="flex items-center gap-2 mb-1">
                             <h4 className="text-[13px] font-black text-slate-800 uppercase tracking-tight group-hover:text-indigo-600 transition-colors truncate leading-none">{node.subject}</h4>
                             {node.status === 'live' && <div className="size-1.5 rounded-full bg-rose-500 animate-ping" />}
                          </div>
                          <div className="flex items-center gap-3">
                             <span className="text-[9px] font-black text-indigo-400 font-mono tracking-tighter uppercase">{node.code}</span>
                             <span className="text-[9px] font-bold text-slate-300 uppercase flex items-center gap-1"><MapPin size={10} /> {node.room}</span>
                          </div>
                       </div>
                    </div>
                    <div className="flex items-center gap-6 shrink-0 pr-4">
                       <div className="flex items-center gap-3 text-left">
                          <Avatar className="size-7 border-2 border-white shadow-sm ring-1 ring-slate-100">
                             <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${node.teacher}`} />
                             <AvatarFallback className="font-bold text-[8px]">T</AvatarFallback>
                          </Avatar>
                          <div className="text-left hidden md:block">
                             <p className="text-[10px] font-black text-slate-700 uppercase tracking-tighter">{node.teacher}</p>
                             <p className="text-[8px] font-bold text-slate-300 uppercase">Lead Chief</p>
                          </div>
                       </div>
                       <ArrowUpRight size={16} className="text-slate-200 group-hover:text-indigo-400 transition-all group-hover:translate-x-0.5" />
                    </div>
                 </Card>
              ))}
           </div>
        </div>

        {/* RIGHT COLUMN: ANALYTICS & TOOLS (Span 4) */}
        <div className="lg:col-span-4 space-y-6">
           
           {/* NEW: WEEKLY OPERATIONAL PULSE (The Chart) */}
           <Card className="p-6 rounded-[32px] border-none bg-white shadow-sm ring-1 ring-slate-200/60 flex flex-col hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-8">
                 <h3 className="text-[10px] font-black text-slate-800 uppercase tracking-widest flex items-center gap-2 italic"><TrendingUp size={14} className="text-indigo-600" /> Weekly Load Pulse</h3>
                 <Badge className="bg-emerald-50 text-emerald-600 border-none font-bold text-[8px] px-2 uppercase">Live_Sync</Badge>
              </div>
              <div className="h-[180px] w-full">
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={engagementData}>
                       <defs>
                          <linearGradient id="colorLoad" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                             <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                          </linearGradient>
                       </defs>
                       <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                       <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 9, fontWeight: 800, fill: '#94a3b8'}} dy={10} />
                       <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', fontSize: '10px' }} />
                       <Area type="monotone" dataKey="load" stroke="#6366f1" strokeWidth={3} fill="url(#colorLoad)" dot={{ r: 3, fill: '#6366f1' }} />
                    </AreaChart>
                 </ResponsiveContainer>
              </div>
              <p className="text-[9px] font-bold text-slate-400 uppercase mt-4 text-center">Instructional Intensity Nodes per Day</p>
           </Card>

           {/* EXAM COUNTDOWN */}
           <Card className="p-6 rounded-[32px] border-none bg-white shadow-sm ring-1 ring-slate-200/60 flex flex-col hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-6">
                 <h3 className="text-[10px] font-black text-slate-800 uppercase tracking-widest flex items-center gap-2 italic"><Star size={14} className="text-amber-500" /> Assessment Tracker</h3>
                 <Badge className="bg-rose-50 text-rose-600 border-none font-bold text-[8px] uppercase tracking-widest px-2">Imminent</Badge>
              </div>
              <div className="p-5 bg-slate-900 rounded-3xl text-white text-center relative overflow-hidden shadow-xl">
                 <div className="absolute top-0 right-0 size-20 bg-indigo-500/20 blur-2xl" />
                 <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-4">Mid-Term Phase Node</p>
                 <div className="flex justify-center gap-4 relative z-10">
                    <TimeBox val="14" label="Days" dark />
                    <TimeBox val="08" label="Hrs" dark />
                    <TimeBox val="42" label="Min" dark />
                 </div>
                 <Button className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-[9px] h-10 rounded-xl uppercase tracking-widest border-none transition-all">Download Roadmap</Button>
              </div>
           </Card>
        </div>
      </div>
    </div>
  );
}

// --- HELPER COMPONENTS ---
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

function TimeBox({ val, label, dark = false }: any) {
    return (
        <div className="text-center">
            <h4 className={cn("text-xl font-black tabular-nums leading-none mb-1", dark ? "text-white" : "text-slate-900")}>{val}</h4>
            <p className={cn("text-[7px] font-bold uppercase tracking-widest leading-none", dark ? "text-slate-500" : "text-slate-400")}>{label}</p>
        </div>
    )
}
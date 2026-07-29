"use client"

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Clock, Plus, MoreHorizontal, Download, LayoutGrid, Timer, 
  Users, Zap, Filter, Search, GraduationCap, AlertCircle, ArrowUpRight
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// --- TYPES ---
interface SlotData { subject: string; teacher: string; room: string; type: string; code: string; }
interface RegularRow { time: string; isBreak?: false; days: { [key: string]: SlotData }; }
interface BreakRow { time: string; isBreak: true; label: string; }
type ScheduleRow = RegularRow | BreakRow;

const SCHEDULE: ScheduleRow[] = [
  { 
    time: "08:00-09:00", 
    days: {
      mon: { subject: "Advanced Math", teacher: "Zia Khan", room: "N-101", type: 'lecture', code: 'MTH-401' },
      tue: { subject: "Quantum Phys", teacher: "Sarah A.", room: "L-02", type: 'lab', code: 'PHY-302' },
      wed: { subject: "Modern Comp", teacher: "Bilal R.", room: "T-50", type: 'lecture', code: 'CS-505' },
      thu: { subject: "English Lit", teacher: "Fatima A.", room: "H-12", type: 'lecture', code: 'ENG-101' },
      fri: { subject: "Organic Chem", teacher: "Usman G.", room: "N-108", type: 'lecture', code: 'CHM-202' },
    }
  },
  { time: "10:00-10:30", isBreak: true, label: "REFRESHMENT BREAK" },
  { 
    time: "10:30-11:30", 
    days: {
      mon: { subject: "Physics Lab", teacher: "Sarah A.", room: "L-02", type: 'lab', code: 'PHY-302' },
      tue: { subject: "History", teacher: "Ahmed R.", room: "N-105", type: 'lecture', code: 'HIS-201' },
      wed: { subject: "Calculus", teacher: "Zia Khan", room: "N-101", type: 'lecture', code: 'MTH-402' },
      thu: { subject: "Biology", teacher: "Sofia M.", room: "L-03", type: 'lecture', code: 'BIO-101' },
      fri: { subject: "CS Practice", teacher: "Bilal R.", room: "T-50", type: 'lab', code: 'CS-506' },
    }
  },
];

export default function EliteTimetableMatrix() {
  const [activeClass, setActiveClass] = useState('Grade 9-Alpha');
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <div className="flex flex-col h-full w-full bg-[#FDFDFD] overflow-hidden animate-in fade-in duration-500 font-sans">
      
      {/* 1. TOP HEADER (ELITE COMPACT FIX) */}
      <header className="shrink-0 h-[52px] border-b border-slate-100 bg-white flex items-center px-4 lg:px-6 z-20 overflow-hidden">
        <div className="flex flex-col min-w-0 flex-1">
            <div className="flex items-center gap-2 text-[8px] font-bold text-indigo-600 uppercase tracking-[0.2em] leading-none">
                SCHEDULING <span className="text-slate-300">•</span> <span className="text-slate-400">ACTIVE_NODE</span>
            </div>
            <h1 className="text-sm font-black text-slate-900 tracking-tighter mt-1 uppercase italic leading-none truncate">
                Timetable <span className="text-indigo-600 not-italic">Matrix</span>
            </h1>
        </div>

        <div className="flex items-center gap-2 shrink-0 ml-4">
           <Button variant="outline" className="hidden sm:flex h-7 text-[9px] font-bold uppercase border-slate-200 bg-white px-2 hover:bg-slate-50">
              <Download size={12} className="mr-1" /> Export
           </Button>
           <Button className="h-8 bg-indigo-600 hover:bg-indigo-700 text-white text-[9px] font-bold uppercase shadow-md active:scale-95 transition-all px-3 rounded-lg flex-shrink-0">
                <Plus size={12} className="mr-1" strokeWidth={3} /> Create Node
            </Button>
        </div>
      </header>

      {/* 2. SCROLLABLE AREA */}
      <main className="flex-1 overflow-y-auto p-4 scrollbar-hide space-y-4 bg-slate-50/20">
        
        {/* KPI ROW (Ultra Compact Dashboard Style) */}
        <div className="grid grid-cols-3 lg:grid-cols-6 gap-2.5 max-w-[1600px] mx-auto">
           <DashStat label="Slots" value="42" trend="+4" color="indigo" icon={<LayoutGrid size={12}/>}/>
           <DashStat label="Presence" value="98%" trend="OK" color="emerald" icon={<Users size={12}/>}/>
           <DashStat label="Faculty" value="12" trend="MAX" color="blue" icon={<GraduationCap size={12}/>}/>
           <DashStat label="Load" value="84%" trend="+12" color="purple" icon={<Zap size={12}/>}/>
           <DashStat label="Clashes" value="Zero" trend="SEC" color="orange" icon={<AlertCircle size={12}/>}/>
           <DashStat label="Status" value="Live" trend="v4" color="rose" icon={<Timer size={12}/>}/>
        </div>

        {/* TOOLBAR */}
        <div className="max-w-[1600px] mx-auto flex items-center justify-between bg-white p-1.5 rounded-xl border border-slate-100 shadow-sm gap-4">
           <div className="flex bg-slate-50 p-0.5 rounded-lg border border-slate-100 overflow-x-auto scrollbar-hide">
              {['Grade 9-Alpha', 'Grade 9-Beta', 'Grade 10-A'].map((cls) => (
                <button 
                    key={cls}
                    onClick={() => setActiveClass(cls)}
                    className={cn(
                        "px-3 py-1 rounded-md text-[8px] font-black uppercase tracking-widest transition-all whitespace-nowrap",
                        activeClass === cls ? "bg-white text-indigo-600 shadow-sm ring-1 ring-slate-200" : "text-slate-400 hover:text-slate-600"
                    )}
                >
                    {cls}
                </button>
              ))}
           </div>

           <div className="flex items-center gap-2 flex-1 max-w-xs justify-end">
              <div className="relative group w-full">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-300" size={12} />
                <input placeholder="Search node..." className="w-full h-8 pl-8 pr-3 bg-slate-50 border border-slate-200 rounded-lg text-[9px] font-semibold outline-none focus:bg-white focus:ring-2 ring-indigo-50 transition-all" />
              </div>
              <Button variant="outline" className="h-8 w-8 p-0 border-slate-200 bg-white rounded-lg shrink-0"><Filter size={12}/></Button>
           </div>
        </div>

        {/* MATRIX GRID - Re-aligned for 100% Viewport Fit */}
        <div className="max-w-[1600px] mx-auto pb-8">
           <Card className="border-none bg-white rounded-2xl shadow-sm ring-1 ring-slate-200/60 overflow-hidden">
              <div className="overflow-x-auto scrollbar-hide">
                 <table className="w-full text-left border-collapse min-w-[900px]">
                    <thead>
                       <tr className="bg-slate-50/50 border-b border-slate-100 text-[8px] font-black text-slate-400 uppercase tracking-[0.15em]">
                          <th className="px-4 py-2.5 border-r border-slate-100 w-24">Time Vector</th>
                          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(day => (
                            <th key={day} className="px-4 py-2.5 text-center">{day}</th>
                          ))}
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                       {SCHEDULE.map((row, i) => (
                          <tr key={i} className={cn("group", row.isBreak && "bg-slate-50/20")}>
                             <td className="px-4 py-2 border-r border-slate-100 bg-slate-50/10 text-center">
                                <span className="text-[9px] font-black text-slate-800 tracking-tighter tabular-nums leading-none">{row.time}</span>
                             </td>

                             {row.isBreak ? (
                                <td colSpan={5} className="p-1.5 text-center">
                                   <div className="py-1 px-4 rounded-lg border border-dashed border-slate-200 bg-white/40 inline-block">
                                      <span className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] italic">{row.label}</span>
                                   </div>
                                </td>
                             ) : (
                                ['mon', 'tue', 'wed', 'thu', 'fri'].map((day) => {
                                   const data = (row as RegularRow).days[day];
                                   return (
                                      <td key={day} className="p-1.5">
                                         <ScheduleNode node={data} />
                                      </td>
                                   )
                                })
                             )}
                          </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
           </Card>
        </div>
      </main>
    </div>
  );
}

// --- KPI COMPONENT (Mini Dashboard Style) ---
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
        <Card className="p-3 rounded-xl bg-white border-none shadow-sm ring-1 ring-slate-100 flex flex-col justify-between hover:shadow-md transition-all h-[85px]">
            <div className="flex justify-between items-start w-full">
                <div className={cn("p-1.5 rounded-lg shadow-xs", colors[color])}>{icon}</div>
                <span className={cn("text-[6px] font-black px-1 py-0.5 rounded uppercase", colors[color])}>{trend}</span>
            </div>
            <div className="mt-1">
                <p className="text-sm font-black text-slate-900 tracking-tight leading-none">{value}</p>
                <p className="text-[7px] font-bold text-slate-400 uppercase tracking-widest mt-1 leading-none">{label}</p>
            </div>
        </Card>
    )
}

// --- SCHEDULE NODE (Super Lean Tile) ---
function ScheduleNode({ node }: { node: any }) {
    if (!node) return <div className="h-14 bg-slate-50/20 rounded-xl border border-dashed border-slate-100" />;
    return (
        <div className="p-2.5 rounded-xl bg-white border border-slate-100 shadow-xs hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer group border-l-2 border-l-indigo-500/20 hover:border-l-indigo-600 flex flex-col justify-between h-[75px]">
            <div className="flex justify-between items-start leading-none mb-1">
                <span className="text-[7px] font-black text-indigo-600 uppercase tracking-tighter bg-indigo-50 px-1 rounded-sm py-0.5">{node.type}</span>
                <span className="text-[7px] font-bold text-slate-300 uppercase font-mono">{node.room}</span>
            </div>
            
            <h4 className="text-[9px] font-bold text-slate-800 leading-tight uppercase group-hover:text-indigo-600 transition-colors truncate">
                {node.subject}
            </h4>

            <div className="flex items-center justify-between mt-1.5 pt-1.5 border-t border-slate-50 leading-none">
                <div className="flex items-center gap-1 min-w-0">
                    <div className="size-3.5 rounded-sm bg-slate-100 flex items-center justify-center text-[6px] font-black text-slate-400 uppercase shrink-0">{node.teacher.substring(0, 1)}</div>
                    <span className="text-[7px] font-black text-slate-400 uppercase truncate">{node.teacher}</span>
                </div>
                <ArrowUpRight size={8} className="text-slate-200 group-hover:text-indigo-400 shrink-0" />
            </div>
        </div>
    )
}
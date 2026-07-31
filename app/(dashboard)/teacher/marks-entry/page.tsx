"use client"

import React, { useState, useEffect } from 'react';
import { 
  Plus, Search, Save, Calculator, CheckCircle2, 
  AlertCircle, FileText, Filter, LayoutGrid, ArrowUpRight,
  TrendingUp, Timer, UserCheck, GraduationCap, ChevronRight,
  Database, Download, MoreHorizontal, Flag, MessageSquare, EyeOff, BarChart3, Cpu
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { ResponsiveContainer, AreaChart, Area, BarChart, Bar, XAxis, Tooltip, Cell } from "recharts";
import { cn } from "@/lib/utils";

// --- MOCK DATA ---
const students = [
  { id: "STU-001", name: "Ahmed Malik", roll: "22-091", marks: 85, status: "Verified" },
  { id: "STU-002", name: "Fatima Khan", roll: "22-092", marks: 92, status: "Verified" },
  { id: "STU-003", name: "Ali Hassan", roll: "22-093", marks: 0, status: "Pending" },
  { id: "STU-004", name: "Zainab Bibi", roll: "22-094", marks: 78, status: "Verified" },
  { id: "STU-005", name: "Bilal Raza", roll: "22-095", marks: 88, status: "Verified" },
];

const distributionData = [
  { grade: 'A+', count: 12, fill: '#6366f1' },
  { grade: 'A', count: 18, fill: '#818cf8' },
  { grade: 'B', count: 10, fill: '#a5b4fc' },
  { grade: 'C', count: 5, fill: '#c7d2fe' },
  { grade: 'F', count: 3, fill: '#f43f5e' },
];

export default function MarksEntryPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <div className="flex flex-col h-full bg-[#FDFDFD] overflow-hidden animate-in fade-in duration-700 font-sans">
      
      {/* 1. TOP HEADER (Dashboard Sync) */}
      <header className="shrink-0 h-[56px] border-b border-slate-100 bg-white flex items-center justify-between px-6 z-20">
        <div className="flex flex-col">
            <div className="flex items-center gap-2 text-[10px] font-bold text-indigo-600 uppercase tracking-widest leading-none">
                FACULTY TERMINAL <span className="text-slate-300">•</span> <span className="text-slate-400">SESSION_ACTIVE</span>
            </div>
            <h1 className="text-sm font-black text-slate-900 tracking-tight mt-1 uppercase italic leading-none">
                Assessment <span className="text-indigo-600 font-bold not-italic ml-1">Entry Node</span>
            </h1>
        </div>

        <div className="flex items-center gap-2">
           <Button variant="outline" className="h-8 text-[9px] font-bold uppercase tracking-wider border-slate-200 bg-white">
              <Download size={12} className="mr-1.5" /> Export Node
           </Button>
           <Button className="h-8 bg-indigo-600 hover:bg-indigo-700 text-white text-[9px] font-bold uppercase shadow-md active:scale-95 transition-all px-4 rounded-lg border-none">
                <Save size={14} className="mr-1.5" /> Sync Deployment
            </Button>
        </div>
      </header>

      {/* 2. SCROLLABLE AREA */}
      <main className="flex-1 overflow-y-auto p-4 lg:p-6 scrollbar-hide space-y-6 bg-slate-50/20">
        
        {/* KPI ROW (Dashboard Compact Style) */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 max-w-[1700px] mx-auto">
           <DashStat label="Class Mean" value="84.2%" trend="UP" color="indigo" icon={<Calculator size={12}/>}/>
           <DashStat label="Nodes Marked" value="44/48" trend="92%" color="emerald" icon={<CheckCircle2 size={12}/>}/>
           <DashStat label="Top Node" value="98%" trend="MAX" color="blue" icon={<TrendingUp size={12}/>}/>
           <DashStat label="Review Node" value="04" trend="REQD" color="orange" icon={<AlertCircle size={12}/>}/>
           <DashStat label="Velocity" value="High" trend="SYNC" color="purple" icon={<Timer size={12}/>}/>
           <DashStat label="Integrity" value="Secured" trend="AES" color="rose" icon={<Database size={12}/>}/>
        </div>

        {/* WORKSPACE GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1700px] mx-auto">
           
           {/* LEFT: MAIN DATA LEDGER (Span 8) */}
           <div className="lg:col-span-8 space-y-4">
              {/* TOOLBAR */}
              <div className="flex items-center justify-between bg-white p-2 rounded-xl border border-slate-100 shadow-sm gap-4">
                 <div className="flex items-center gap-2">
                    <Badge className="bg-indigo-50 text-indigo-600 border-none text-[9px] font-bold px-3 h-7 flex items-center gap-2 rounded-lg">
                       <LayoutGrid size={12}/> GRADE 9-ALPHA
                    </Badge>
                    <Badge className="bg-slate-50 text-slate-500 border-none text-[9px] font-bold px-3 h-7 flex items-center gap-2 rounded-lg">
                       <FileText size={12}/> ADVANCED MATH
                    </Badge>
                 </div>
                 <div className="relative flex-1 md:max-w-xs group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={12} />
                    <input placeholder="Filter identity..." className="w-full h-8 pl-9 pr-3 bg-slate-50 border border-slate-200 rounded-lg text-[10px] font-semibold outline-none focus:bg-white focus:ring-2 ring-indigo-50 transition-all placeholder:text-slate-300" />
                 </div>
              </div>

              {/* TABLE */}
              <Card className="border-none bg-white rounded-2xl shadow-sm ring-1 ring-slate-200/60 overflow-hidden">
                 <table className="w-full text-left">
                    <thead>
                       <tr className="bg-slate-50/50 border-b border-slate-100 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                          <th className="px-6 py-4">Student Node Identity</th>
                          <th className="px-6 py-4 text-center">Marks Index</th>
                          <th className="px-6 py-4">Visual Spread</th>
                          <th className="px-6 py-4 text-right pr-10">Matrix Action</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 font-sans">
                       {students.map((student) => (
                          <tr key={student.id} className="group hover:bg-indigo-50/5 transition-all border-l-2 border-transparent hover:border-indigo-600">
                             <td className="px-6 py-3">
                                <div className="flex items-center gap-3">
                                   <div className="size-8 rounded-lg bg-slate-100 text-slate-400 flex items-center justify-center font-bold text-[10px] border border-slate-200 uppercase group-hover:bg-slate-900 group-hover:text-white transition-all shadow-sm">
                                      {student.name.substring(0, 2)}
                                   </div>
                                   <div>
                                      <p className="text-[11px] font-bold text-slate-800 uppercase tracking-tight leading-none">{student.name}</p>
                                      <p className="text-[8px] font-mono text-slate-400 uppercase mt-1 tracking-tighter italic">Roll: {student.roll}</p>
                                   </div>
                                </div>
                             </td>
                             <td className="px-6 py-3 text-center">
                                <input 
                                   type="number" 
                                   defaultValue={student.marks}
                                   className="w-14 h-8 bg-slate-50 border border-slate-200 rounded-lg text-center text-xs font-black text-slate-900 focus:bg-white focus:ring-4 ring-indigo-50 focus:border-indigo-400 transition-all outline-none tabular-nums"
                                />
                             </td>
                             <td className="px-6 py-3">
                                <div className="w-32 h-1 bg-slate-100 rounded-full overflow-hidden">
                                   <div className="h-full bg-indigo-500 rounded-full transition-all duration-1000" style={{ width: `${student.marks}%` }} />
                                </div>
                             </td>
                             <td className="px-6 py-3 text-right pr-10">
                                <DropdownMenu>
                                   <DropdownMenuTrigger className="p-1.5 hover:bg-slate-50 rounded-md text-slate-300 hover:text-slate-600 transition-all outline-none focus:ring-0">
                                         <MoreHorizontal size={14}/>
                                   </DropdownMenuTrigger>
                                   <DropdownMenuContent align="end" className="w-48 p-1.5 rounded-xl shadow-xl border-slate-100 bg-white z-[100]">
                                      <DropdownMenuLabel className="text-[8px] font-black uppercase text-slate-400 px-3 py-1.5 tracking-widest">Entry Options</DropdownMenuLabel>
                                      <DropdownMenuItem className="text-[10px] font-bold px-3 py-2 rounded-lg flex items-center hover:bg-amber-50 hover:text-amber-600 cursor-pointer outline-none transition-colors">
                                         <Flag size={13} className="mr-2" /> Flag for Review
                                      </DropdownMenuItem>
                                      <DropdownMenuItem className="text-[10px] font-bold px-3 py-2 rounded-lg flex items-center hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer outline-none transition-colors">
                                         <MessageSquare size={13} className="mr-2" /> Add Remark
                                      </DropdownMenuItem>
                                      <DropdownMenuSeparator className="bg-slate-50" />
                                      <DropdownMenuItem className="text-[10px] font-bold px-3 py-2 rounded-lg flex items-center text-rose-500 hover:bg-rose-50 cursor-pointer outline-none transition-colors">
                                         <EyeOff size={13} className="mr-2" /> Exclude Node
                                      </DropdownMenuItem>
                                   </DropdownMenuContent>
                                </DropdownMenu>
                             </td>
                          </tr>
                       ))}
                    </tbody>
                 </table>
              </Card>
           </div>

           {/* RIGHT: PERFORMANCE HUB (Span 4) */}
           <div className="lg:col-span-4 space-y-6">
              <Card className="p-6 rounded-[28px] border-none bg-white shadow-sm ring-1 ring-slate-200/60 flex flex-col hover:shadow-md transition-all">
                 <div className="flex items-center justify-between mb-8">
                    <h3 className="text-[10px] font-black text-slate-800 uppercase tracking-widest flex items-center gap-2 italic">
                       <BarChart3 size={14} className="text-indigo-600" /> Grade Matrix
                    </h3>
                    <Badge className="bg-indigo-50 text-indigo-600 border-none font-bold text-[8px] px-2 py-0.5 uppercase">Sync_Active</Badge>
                 </div>
                 
                 <div className="h-[220px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                       <BarChart data={distributionData} margin={{ top: 0, right: 0, left: -35, bottom: 0 }}>
                          <XAxis dataKey="grade" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 800, fill: '#94a3b8'}} />
                          <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', fontSize: '10px', fontWeight: 700 }} />
                          <Bar dataKey="count" radius={[6, 6, 0, 0]} barSize={32}>
                             {distributionData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} fillOpacity={0.8} />
                             ))}
                          </Bar>
                       </BarChart>
                    </ResponsiveContainer>
                 </div>

                 <div className="mt-8 grid grid-cols-2 gap-3">
                    <SidebarStat label="Standard Dev" value="1.2 Nodes" />
                    <SidebarStat label="Pass Ratio" value="94.8%" color="text-emerald-600" />
                 </div>
              </Card>

              {/* PROTOCOL ACTION CARD (Dark Theme) */}
              <Card className="p-8 rounded-[32px] bg-[#0F172A] border-none text-white shadow-2xl relative overflow-hidden group">
                 <div className="absolute top-0 right-0 size-32 bg-indigo-600/20 blur-3xl transition-all group-hover:bg-indigo-600/30" />
                 <div className="relative z-10">
                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2 italic flex items-center gap-2"><Cpu size={10} /> Protocol Action</p>
                    <h4 className="text-sm font-bold leading-tight uppercase mb-6">Analyze and Publish Class Ranking Stream?</h4>
                    <Button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black text-[10px] h-11 rounded-xl uppercase tracking-widest transition-all shadow-lg shadow-indigo-900/20 border-none active:scale-[0.98]">
                       Process Payload Node
                    </Button>
                 </div>
              </Card>
           </div>
        </div>
      </main>
    </div>
  );
}

// --- KPI COMPONENT (Dashboard Theme Sync) ---
function DashStat({ label, value, trend, color, icon }: any) {
    const data = [{v: 40}, {v: 70}, {v: 55}, {v: 90}];
    const colors: any = {
        indigo: "bg-indigo-50 text-indigo-600",
        emerald: "bg-emerald-50 text-emerald-600",
        blue: "bg-blue-50 text-blue-600",
        purple: "bg-purple-50 text-purple-600",
        orange: "bg-orange-50 text-orange-600",
        rose: "bg-rose-50 text-rose-600",
    }
    const colorHex: any = { indigo: '#6366f1', emerald: '#10b981', blue: '#3b82f6', purple: '#a855f7', orange: '#f59e0b', rose: '#f43f5e' };

    return (
        <Card className="p-3.5 rounded-xl bg-white border-none shadow-sm ring-1 ring-slate-100 flex flex-col justify-between hover:shadow-md hover:-translate-y-1 transition-all h-[100px] group">
            <div className="flex justify-between items-start w-full">
                <div className={cn("p-1.5 rounded-lg shadow-xs transition-transform group-hover:scale-110", colors[color])}>{icon}</div>
                <div className="w-10 h-6 opacity-30 group-hover:opacity-100 transition-opacity">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data}>
                           <Area type="monotone" dataKey="v" stroke={colorHex[color]} fill={colorHex[color]} fillOpacity={0.05} strokeWidth={2} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
            <div className="mt-1">
                <p className="text-lg font-black text-slate-900 tracking-tight leading-none tabular-nums">{value}</p>
                <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1.5 leading-none group-hover:text-indigo-600 transition-colors">{label}</p>
            </div>
        </Card>
    )
}

function SidebarStat({ label, value, color = "text-slate-800" }: any) {
    return (
        <div className="p-3 bg-slate-50/50 rounded-xl border border-slate-100 text-center hover:bg-white transition-all">
            <p className="text-[7px] font-black text-slate-400 uppercase mb-1 tracking-widest">{label}</p>
            <p className={cn("text-[11px] font-black uppercase tracking-tight", color)}>{value}</p>
        </div>
    )
}
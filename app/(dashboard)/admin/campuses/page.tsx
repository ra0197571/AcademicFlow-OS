"use client"

import React, { useState, useEffect } from 'react';
import { 
  Building2, MapPin, Plus, MoreHorizontal, ShieldCheck, Activity, Globe, 
  Lock, Cpu, ArrowUpRight, Server, AlertCircle, Terminal, Wifi, TrendingUp,
  LayoutGrid, Settings, Filter, Search, Download, UserCheck
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const campuses = [
  { id: '1', name: "Main HQ Campus", location: "Blue Area, Islamabad", students: 850, capacity: 1000, principal: "Dr. Arshad", revenue: "+12.4%", health: "98%" },
  { id: '2', name: "Gulberg Branch", location: "Gulberg III, Lahore", students: 320, capacity: 500, principal: "Ms. Sofia", revenue: "+8.6%", health: "92%" },
  { id: '3', name: "Karachi Node 01", location: "North Nazimabad", students: 410, capacity: 450, principal: "Mr. Farooq", revenue: "-2.1%", health: "65%" },
  { id: '4', name: "Evening Extension", location: "F-10 Terminal, ISB", students: 120, capacity: 200, principal: "Usman Ghani", revenue: "+15.0%", health: "88%" },
];

export default function EliteCampusManagement() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC] overflow-hidden animate-in fade-in duration-500 font-sans">
      
      {/* 1. TOP HEADER (Dashboard Matched) */}
      <header className="shrink-0 h-[64px] border-b border-slate-100 bg-white flex items-center justify-between px-6 z-20">
        <div className="flex flex-col">
            <div className="flex items-center gap-2 text-[10px] font-bold text-indigo-600 uppercase tracking-widest leading-none">
                INFRASTRUCTURE MONITORING <span className="text-slate-300">•</span> <span className="text-slate-400">ADMIN PANEL</span>
            </div>
            <h1 className="text-lg font-black text-slate-900 tracking-tight mt-1 uppercase italic">
                Campus <span className="text-indigo-600">Nodes</span>
            </h1>
        </div>

        <div className="flex items-center gap-3">
           <Button variant="outline" className="h-9 px-4 rounded-xl text-[11px] font-bold uppercase tracking-wider border-slate-200 bg-white flex gap-2">
              <Download size={14} /> Export Logs
           </Button>
           <Button className="h-9 bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-bold uppercase tracking-wider shadow-lg shadow-indigo-100 transition-all px-5 rounded-xl flex gap-2">
                <Plus size={14} strokeWidth={3} /> Add Branch Node
            </Button>
        </div>
      </header>

      {/* 2. SCROLLABLE AREA */}
      <main className="flex-1 overflow-y-auto p-6 scrollbar-hide space-y-6">
        
        {/* 6-CARD KPI ROW (Perfectly matching your Dashboard) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-[1600px] mx-auto">
           <DashStat label="Global Health" value="94.8%" trend="STABLE" color="indigo" icon={<Activity size={14}/>}/>
           <DashStat label="Active Nodes" value="04" trend="+1 New" color="emerald" icon={<Globe size={14}/>}/>
           <DashStat label="Uptime Record" value="99.9%" trend="LIVE" color="blue" icon={<Wifi size={14}/>}/>
           <DashStat label="Registry Load" value="1,840" trend="+12.4%" color="purple" icon={<Server size={14}/>}/>
           <DashStat label="Growth Index" value="+24.2%" trend="UP" color="orange" icon={<TrendingUp size={14}/>}/>
           <DashStat label="Security" value="Level 5" trend="SECURE" color="rose" icon={<Lock size={14}/>}/>
        </div>

        {/* CAMPUS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 max-w-[1600px] mx-auto">
          {campuses.map((campus) => (
            <CampusNodeCard key={campus.id} campus={campus} />
          ))}
        </div>

        {/* ACCESS MATRIX (Clean Dashboard Style) */}
        <div className="max-w-[1600px] mx-auto space-y-4 pt-4">
           <div className="flex items-center justify-between px-2">
              <h3 className="text-[11px] font-black text-slate-800 uppercase tracking-[0.15em] flex items-center gap-2">
                 <ShieldCheck size={16} className="text-indigo-600" /> Security Access Matrix
              </h3>
              <button className="text-[10px] font-bold text-indigo-600 uppercase hover:underline">Modify Matrix</button>
           </div>
           
           <Card className="bg-white rounded-[24px] border-slate-200 shadow-sm overflow-hidden mb-12">
              <table className="w-full text-left">
                 <thead>
                    <tr className="bg-slate-50/50 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                       <th className="px-6 py-4">Role Node</th>
                       <th className="px-6 py-4">Module Permissions</th>
                       <th className="px-6 py-4 text-center">Lifecycle</th>
                       <th className="px-6 py-4 text-right pr-10">Action</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-50">
                    {ROLES.map((role) => (
                       <tr key={role.name} className="group hover:bg-indigo-50/10 transition-all">
                          <td className="px-6 py-4">
                             <div className="flex items-center gap-3">
                                <div className="size-8 rounded-lg bg-slate-100 text-slate-400 group-hover:bg-indigo-600 group-hover:text-white flex items-center justify-center transition-all shadow-sm">{role.icon}</div>
                                <div>
                                   <p className="text-[11px] font-black text-slate-900 leading-none uppercase">{role.name}</p>
                                   <p className="text-[8px] font-bold text-slate-400 mt-1 uppercase">{role.level}</p>
                                </div>
                             </div>
                          </td>
                          <td className="px-6 py-4">
                             <div className="flex flex-wrap gap-1.5">
                                {role.modules.map(m => (
                                   <Badge key={m} variant="outline" className="text-[8px] font-bold border-slate-200 bg-white text-slate-400 px-2 py-0 uppercase">{m}</Badge>
                                ))}
                             </div>
                          </td>
                          <td className="px-6 py-4 text-center">
                             <div className="flex items-center justify-center gap-2">
                                <div className="size-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
                                <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest">Verified</span>
                             </div>
                          </td>
                          <td className="px-6 py-4 text-right pr-10">
                             <button className="text-[10px] font-black text-indigo-500 uppercase tracking-widest hover:text-indigo-700 transition-colors underline decoration-indigo-200 decoration-dashed underline-offset-4">Audit Protocol</button>
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

// --- DASHBOARD STYLE STAT COMPONENT ---
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
        <Card className="p-4 rounded-[20px] bg-white border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-all h-[130px] border-none ring-1 ring-slate-100">
            <div className="flex justify-between items-start w-full">
                <div className={cn("p-2.5 rounded-xl shadow-sm", colors[color])}>{icon}</div>
                <span className={cn("text-[9px] font-black px-1.5 py-0.5 rounded-md", colors[color])}>{trend}</span>
            </div>
            <div className="mt-2">
                <p className="text-2xl font-black text-slate-900 tracking-tighter leading-none">{value}</p>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-2">{label}</p>
            </div>
        </Card>
    )
}

// --- CLEAN CAMPUS CARD (Dashboard Matched) ---
function CampusNodeCard({ campus }: { campus: any }) {
  const occupancy = parseInt(campus.health);
  return (
    <Card className="border-slate-200 shadow-sm rounded-[32px] bg-white overflow-hidden group hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-100/50 transition-all flex flex-col h-full font-sans border-none ring-1 ring-slate-100">
       <div className="p-6 space-y-6 flex-1">
          <div className="flex justify-between items-start">
             <div className="flex items-center gap-4">
                <div className="size-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-inner">
                   <Building2 size={20} />
                </div>
                <div>
                   <h3 className="text-[14px] font-black text-slate-800 uppercase tracking-tight leading-none group-hover:text-indigo-600 transition-colors">{campus.name}</h3>
                   <div className="flex items-center gap-2 mt-2">
                      <MapPin size={10} className="text-indigo-500" />
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">{campus.location}</span>
                   </div>
                </div>
             </div>
             <button className="text-slate-300 hover:text-slate-600"><MoreHorizontal size={18}/></button>
          </div>

          <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100 space-y-3">
             <div className="flex justify-between items-end">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Network Health</span>
                <span className="text-[10px] font-black text-indigo-600">{campus.health}</span>
             </div>
             <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-600 rounded-full transition-all duration-1000" style={{ width: campus.health }} />
             </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="text-center p-3 bg-white border border-slate-100 rounded-2xl">
                <p className="text-[8px] font-black text-slate-300 uppercase mb-1 tracking-tighter">Principal</p>
                <p className="text-[11px] font-black text-slate-800 tracking-tight">{campus.principal}</p>
             </div>
             <div className="text-center p-3 bg-white border border-slate-100 rounded-2xl">
                <p className="text-[8px] font-black text-slate-300 uppercase mb-1 tracking-tighter">Growth</p>
                <p className={cn("text-[11px] font-black tracking-tight", campus.revenue.startsWith('+') ? 'text-emerald-500' : 'text-rose-500')}>{campus.revenue}</p>
             </div>
          </div>
       </div>

       <div className="px-5 pb-5">
          <Button className="w-full h-10 bg-slate-900 hover:bg-indigo-600 text-white rounded-xl text-[9px] font-black uppercase tracking-widest transition-all shadow-lg active:scale-95 group/btn border-none">
             Launch Terminal <Terminal size={14} className="ml-2 opacity-60 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 transition-all" />
          </Button>
       </div>
    </Card>
  )
}

const ROLES = [
  { name: 'Super Admin', level: 'Root Access', modules: ['FULL CONTROL', 'LEDGER', 'INFRA'], icon: <Cpu size={14}/> },
  { name: 'Campus Principal', level: 'HQ Node', modules: ['STAFF', 'FEES', 'ATTENDANCE'], icon: <UserCheck size={14}/> },
  { name: 'Registry Head', level: 'Dept', modules: ['STUDENT DATA', 'ADMISSIONS'], icon: <LayoutGrid size={14}/> },
];
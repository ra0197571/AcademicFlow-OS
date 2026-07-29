"use client"

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, Lock, Fingerprint, Users, Settings2,
  Key, Search, Save, AlertTriangle, Shield, 
  LockKeyhole, LayoutGrid, Zap, Activity, Download, 
  Plus, Filter, ShieldAlert, Timer, ChevronRight, CheckCircle2
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// --- TYPES ---
interface Role { id: string; name: string; access: string; users: number; color: string; }

const roles: Role[] = [
  { id: '1', name: "Principal", access: "Root Access", users: 1, color: "indigo" },
  { id: '2', name: "Vice Principal", access: "Manager Node", users: 2, color: "emerald" },
  { id: '3', name: "Admin Staff", access: "Operations", users: 5, color: "blue" },
  { id: '4', name: "Teacher Node", access: "Academic", users: 42, color: "purple" },
];

const modules = [
  { group: "CORE INTELLIGENCE", items: ["Dashboard Analytics", "Real-time Pulse", "System Logs"] },
  { group: "ADMINISTRATIVE NODE", items: ["Admission Ledger", "Fee Management", "Payroll Engine"] },
  { group: "ACADEMIC WORKSPACE", items: ["Exams & Grading", "Master Timetable"] },
];

export default function SecurityGovernancePage() {
  const [activeRole, setActiveRole] = useState(roles[0]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <div className="flex flex-col h-full bg-[#FDFDFD] overflow-hidden animate-in fade-in duration-500 font-sans text-slate-900">
      
      {/* 1. TOP HEADER (Dashboard Theme Matched) */}
      <header className="shrink-0 h-[64px] border-b border-slate-100 bg-white flex items-center justify-between px-6 z-20 gap-4">
        <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2 text-[10px] font-bold text-indigo-600 uppercase tracking-widest leading-none">
                SECURITY PROTOCOL <span className="text-slate-300">•</span> <span className="text-slate-400">SESSION 2026</span>
            </div>
            <h1 className="text-lg font-black text-slate-900 tracking-tight mt-1 uppercase italic leading-none truncate">
                Access <span className="text-indigo-600 font-bold not-italic">Governance</span>
            </h1>
        </div>

        <div className="flex items-center gap-2 shrink-0">
           <Button variant="outline" className="hidden md:flex h-9 px-4 rounded-xl text-[11px] font-bold uppercase border-slate-200 bg-white gap-2">
              <Download size={14} /> Audit Logs
           </Button>
           <Button className="h-9 bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-bold uppercase shadow-lg shadow-indigo-100 transition-all px-5 rounded-xl flex gap-2">
                <ShieldCheck size={14} strokeWidth={3} /> Deploy Policy
            </Button>
        </div>
      </header>

      {/* 2. SCROLLABLE AREA */}
      <main className="flex-1 overflow-y-auto p-4 lg:p-6 scrollbar-hide space-y-6 bg-slate-50/20">
        
        {/* 6-CARD KPI ROW (Dashboard Theme Matched) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 max-w-[1700px] mx-auto">
           <DashStat label="Security Score" value="98%" trend="OPTIMAL" color="indigo" icon={<ShieldCheck size={12}/>}/>
           <DashStat label="Active Admins" value="08" trend="+1 New" color="emerald" icon={<Users size={12}/>}/>
           <DashStat label="Auth Events" value="1,240" trend="LIVE" color="blue" icon={<Fingerprint size={12}/>}/>
           <DashStat label="Failed Logins" value="02" trend="SECURE" color="rose" icon={<ShieldAlert size={12}/>}/>
           <DashStat label="Policy Nodes" value="14" trend="ACTIVE" color="orange" icon={<LayoutGrid size={12}/>}/>
           <DashStat label="Sync Status" value="Online" trend="v1.0" color="purple" icon={<Activity size={12}/>}/>
        </div>

        {/* WORKSPACE GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1700px] mx-auto">
           
           {/* ROLES SIDEBAR (Left) */}
           <div className="lg:col-span-4 space-y-4">
              <div className="flex items-center justify-between px-2">
                 <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Administrative Roles</h3>
                 <button className="text-[9px] font-bold text-indigo-600 uppercase">+ New Role</button>
              </div>
              <div className="space-y-2">
                 {roles.map((role) => (
                    <div 
                       key={role.id}
                       onClick={() => setActiveRole(role)}
                       className={cn(
                          "p-4 rounded-2xl cursor-pointer transition-all border group",
                          activeRole.id === role.id 
                            ? "bg-white border-indigo-200 shadow-xl shadow-indigo-100/50 ring-1 ring-indigo-50" 
                            : "bg-white/50 border-slate-100 hover:border-slate-200 hover:bg-white"
                       )}
                    >
                       <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                             <div className={cn(
                                "size-9 rounded-xl flex items-center justify-center transition-all",
                                activeRole.id === role.id ? "bg-indigo-600 text-white shadow-lg" : "bg-slate-100 text-slate-400"
                             )}>
                                <Fingerprint size={18} />
                             </div>
                             <div>
                                <p className={cn("text-[11px] font-black uppercase tracking-tight", activeRole.id === role.id ? "text-slate-900" : "text-slate-500")}>{role.name}</p>
                                <p className="text-[9px] font-bold text-slate-400 uppercase mt-0.5 tracking-tighter">{role.access}</p>
                             </div>
                          </div>
                          <ChevronRight size={14} className={cn("transition-all", activeRole.id === role.id ? "text-indigo-600" : "text-slate-200 opacity-0 group-hover:opacity-100")} />
                       </div>
                    </div>
                 ))}
              </div>
           </div>

           {/* PERMISSION MATRIX (Right) */}
           <div className="lg:col-span-8">
              <Card className="border-none bg-white rounded-[32px] shadow-sm ring-1 ring-slate-200/60 overflow-hidden mb-12">
                 <div className="p-6 border-b border-slate-100 bg-slate-50/30 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                       <div className="size-10 rounded-xl bg-white shadow-sm border border-slate-200 flex items-center justify-center text-indigo-600"><Settings2 size={20}/></div>
                       <div>
                          <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">Node Matrix: <span className="text-indigo-600 italic">{activeRole.name}</span></h3>
                          <p className="text-[9px] font-bold text-slate-400 uppercase mt-0.5">Define granular access for this operational entity</p>
                       </div>
                    </div>
                    <div className="relative hidden md:block">
                       <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={12} />
                       <input placeholder="Filter modules..." className="w-48 pl-9 h-8 bg-white border border-slate-200 rounded-lg text-[10px] font-bold outline-none focus:ring-2 ring-indigo-50 transition-all" />
                    </div>
                 </div>

                 <div className="p-6 space-y-8">
                    {modules.map((group) => (
                       <div key={group.group} className="space-y-4">
                          <div className="flex items-center gap-2">
                             <div className="size-1.5 rounded-full bg-indigo-500" />
                             <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">{group.group}</h4>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                             {group.items.map((item) => (
                                <div key={item} className="flex items-center justify-between p-4 bg-slate-50/50 rounded-xl border border-slate-100 hover:bg-white hover:border-indigo-100 hover:shadow-sm transition-all group/item">
                                   <div className="flex items-center gap-3">
                                      <div className="size-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-300 group-hover/item:text-indigo-600 transition-colors">
                                         <Lock size={12} />
                                      </div>
                                      <span className="text-[11px] font-bold text-slate-700 uppercase tracking-tight">{item}</span>
                                   </div>
                                   <div className="flex items-center gap-4 border-l pl-4">
                                      <div className="flex flex-col items-center gap-1">
                                         <span className="text-[7px] font-black text-slate-300 uppercase">View</span>
                                         <DashToggle />
                                      </div>
                                      <div className="flex flex-col items-center gap-1">
                                         <span className="text-[7px] font-black text-slate-300 uppercase">Write</span>
                                         <DashToggle enabled />
                                      </div>
                                   </div>
                                </div>
                             ))}
                          </div>
                       </div>
                    ))}
                 </div>

                 <div className="p-5 bg-slate-900 flex items-center justify-between border-t border-white/5">
                    <div className="flex items-center gap-3">
                       <ShieldCheck size={18} className="text-emerald-400" />
                       <p className="text-[9px] font-black text-white uppercase tracking-[0.1em]">Protocol affects {activeRole.users} node users</p>
                    </div>
                    <Button className="h-10 px-8 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-[10px] uppercase tracking-widest shadow-xl transition-all border-none active:scale-95">
                       Deploy Matrix Node
                    </Button>
                 </div>
              </Card>
           </div>
        </div>
      </main>
    </div>
  );
}

// --- KPI COMPONENT (Dashboard Theme) ---
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
                <div className={cn("p-1.5 rounded-lg shadow-xs", colors[color])}>{icon}</div>
                <span className={cn("text-[6px] font-black px-1.5 py-0.5 rounded uppercase tracking-tighter", colors[color])}>{trend}</span>
            </div>
            <div className="mt-1">
                <p className="text-base font-black text-slate-900 tracking-tight leading-none">{value}</p>
                <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1.5 leading-none">{label}</p>
            </div>
        </Card>
    )
}

// --- SLEEK OS TOGGLE ---
function DashToggle({ enabled = false }: { enabled?: boolean }) {
    const [isOn, setIsOn] = useState(enabled);
    return (
        <button 
            onClick={() => setIsOn(!isOn)}
            className={cn(
                "relative w-7 h-4 rounded-full transition-all duration-300",
                isOn ? "bg-indigo-600" : "bg-slate-200"
            )}
        >
            <div className={cn(
                "absolute top-0.5 size-3 bg-white rounded-full transition-all shadow-sm",
                isOn ? "left-3.5" : "left-0.5"
            )} />
        </button>
    )
}
"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, Lock, Eye, Edit3, Trash2, 
  CheckCircle2, ShieldAlert, Zap, Globe, 
  ChevronRight, Fingerprint, Users, Settings2,
  Key, Search, Save, Info, AlertTriangle,
  History, Activity, Shield, LockKeyhole
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// --- TYPES ---
interface Role {
  id: string;
  name: string;
  access: string;
  users: number;
  level: 'Full' | 'Restricted' | 'Custom';
  color: string;
}

const roles: Role[] = [
  { id: '1', name: "Principal", access: "Root Access", users: 1, level: 'Full', color: "bg-indigo-600" },
  { id: '2', name: "Vice Principal", access: "Manager Node", users: 2, level: 'Restricted', color: "bg-violet-600" },
  { id: '3', name: "Admin Staff", access: "Operations", users: 5, level: 'Custom', color: "bg-blue-600" },
  { id: '4', name: "Teaching Node", access: "Academic Only", users: 42, level: 'Restricted', color: "bg-emerald-600" },
];

const modules = [
  { group: "Core Intelligence", items: ["Dashboard Analytics", "Real-time Pulse", "System Logs"] },
  { group: "Administrative Node", items: ["Admission Ledger", "Fee Management", "Staff Directory", "Payroll Engine"] },
  { group: "Academic Workspace", items: ["Exams & Grading", "Master Timetable", "Curriculum Vault"] },
];

// --- CUSTOM PREMIUM TOGGLE ---
function PremiumToggle({ enabled, onChange }: { enabled: boolean; onChange: () => void }) {
  return (
    <button 
      onClick={onChange}
      className={`relative w-10 h-5 rounded-full transition-all duration-300 focus:outline-none ring-offset-2 focus:ring-2 ring-indigo-100 ${enabled ? 'bg-indigo-600 shadow-[0_0_10px_rgba(79,70,229,0.4)]' : 'bg-slate-200'}`}
    >
      <motion.div 
        animate={{ x: enabled ? 20 : 2 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="absolute top-1 left-0 size-3 bg-white rounded-full shadow-sm"
      />
    </button>
  );
}

export default function SecurityGovernancePage() {
  const [activeRole, setActiveRole] = useState(roles[0]);
  const [mounted, setMounted] = useState(false);
  const [permissions, setPermissions] = useState<Record<string, { view: boolean; write: boolean }>>({});

  useEffect(() => { 
    setMounted(true);
    const initial: any = {};
    modules.forEach(g => g.items.forEach(i => initial[i] = { view: true, write: i !== 'System Logs' }));
    setPermissions(initial);
  }, []);

  if (!mounted) return null;

  return (
    <div className="p-4 lg:p-8 space-y-8 animate-in fade-in duration-700 max-w-[1700px] mx-auto overflow-hidden">
      
      {/* 1. ELITE SECURITY HEADER */}
      <header className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-8 bg-white p-8 rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
           <LockKeyhole size={120} />
        </div>
        
        <div className="space-y-3 relative z-10">
          <div className="flex items-center gap-3">
            <Badge className="bg-slate-900 text-white border-none font-black text-[9px] tracking-widest px-2.5 py-1">GOVERNANCE v1.0</Badge>
            <div className="flex items-center gap-1.5 text-slate-400 font-bold text-[10px] uppercase tracking-widest">
               <div className="size-1.5 rounded-full bg-emerald-500 animate-pulse" /> Global Policy Enforcement Active
            </div>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter leading-none italic">Access <span className="text-indigo-600">Governance</span></h1>
          <p className="text-xs text-slate-500 font-medium max-w-md uppercase tracking-tight">Define granular permissions and security protocols across node hierarchies.</p>
        </div>

        <div className="flex flex-wrap items-center gap-4 bg-slate-900 p-6 rounded-3xl relative z-10 shadow-2xl">
           <div className="text-center px-4 border-r border-white/10">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Security Score</p>
              <p className="text-xl font-black text-white leading-none tracking-tighter">98 <span className="text-[10px] text-emerald-400 font-bold">OPTIMAL</span></p>
           </div>
           <div className="text-center px-4 border-r border-white/10">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Policy Nodes</p>
              <p className="text-xl font-black text-white leading-none tracking-tighter">14 <span className="text-[10px] text-indigo-400 font-bold">SECURED</span></p>
           </div>
           <Button className="bg-indigo-600 hover:bg-indigo-700 shadow-xl h-12 rounded-2xl font-black uppercase text-[10px] gap-2 tracking-widest px-8 border-none transition-all active:scale-95">
              <ShieldCheck size={18} strokeWidth={3} /> Launch Security Audit
           </Button>
        </div>
      </header>

      {/* 2. MAIN WORKSPACE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT SIDEBAR */}
        <aside className="lg:col-span-4 space-y-4">
           <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-2">Role Entities</h2>
           <div className="space-y-3">
              {roles.map((role) => (
                <motion.div 
                   key={role.id}
                   whileHover={{ x: 4 }}
                   onClick={() => setActiveRole(role)}
                   className={`p-5 rounded-[28px] border transition-all cursor-pointer group ${
                      activeRole.id === role.id 
                      ? 'bg-white border-indigo-200 shadow-xl shadow-indigo-100/30 ring-1 ring-indigo-50' 
                      : 'bg-white/50 border-transparent hover:border-slate-200'
                   }`}
                >
                   <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4">
                         <div className={`size-10 rounded-2xl flex items-center justify-center transition-all ${activeRole.id === role.id ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-100 text-slate-400'}`}>
                            <Fingerprint size={20} />
                         </div>
                         <div>
                            <p className={`text-sm font-black transition-colors ${activeRole.id === role.id ? 'text-slate-900' : 'text-slate-500'}`}>{role.name}</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mt-1">{role.access}</p>
                         </div>
                      </div>
                      <ChevronRight size={18} className={`transition-all ${activeRole.id === role.id ? 'text-indigo-600 opacity-100' : 'opacity-0'}`} />
                   </div>
                </motion.div>
              ))}
           </div>
        </aside>

        {/* RIGHT: PERMISSION MATRIX */}
        <div className="lg:col-span-8">
           <Card className="border-none shadow-2xl shadow-slate-200/50 rounded-[44px] bg-white overflow-hidden">
              <CardHeader className="p-10 border-b border-slate-50 bg-slate-50/20 flex flex-row items-center justify-between">
                 <div className="flex items-center gap-6">
                    <div className="size-16 rounded-3xl bg-white shadow-xl flex items-center justify-center text-indigo-600 border border-slate-50">
                       <Settings2 size={32} />
                    </div>
                    <div>
                       <CardTitle className="text-lg font-black uppercase tracking-widest text-slate-900">Permission Matrix</CardTitle>
                       <CardDescription className="text-[10px] font-black uppercase text-slate-400 mt-1">
                          Protocol: <span className="text-indigo-600 font-bold">{activeRole.name.toUpperCase()}</span>
                       </CardDescription>
                    </div>
                 </div>
                 <div className="relative hidden md:block">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                    <input placeholder="Filter modules..." className="w-56 pl-11 pr-4 h-11 bg-white border border-slate-100 rounded-xl text-[10px] font-black outline-none focus:ring-4 ring-indigo-50 transition-all" />
                 </div>
              </CardHeader>
              
              <CardContent className="p-0">
                 <div className="divide-y divide-slate-100">
                    {modules.map((group) => (
                       <div key={group.group} className="p-8">
                          <h3 className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                             <Zap size={12} className="fill-indigo-400" /> {group.group}
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             {group.items.map((item) => (
                                <div key={item} className="flex items-center justify-between p-5 bg-slate-50/50 rounded-2xl hover:bg-white hover:shadow-lg hover:shadow-slate-100 transition-all border border-transparent hover:border-indigo-100">
                                   <div className="flex items-center gap-4">
                                      <div className="size-8 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-indigo-600 transition-colors">
                                         <Lock size={14} />
                                      </div>
                                      <span className="text-sm font-bold text-slate-700">{item}</span>
                                   </div>
                                   <div className="flex items-center gap-6">
                                      <div className="flex flex-col items-center gap-1.5">
                                         <span className="text-[8px] font-black text-slate-300 uppercase">View</span>
                                         <PremiumToggle enabled={permissions[item]?.view ?? false} onChange={() => {}} />
                                      </div>
                                      <div className="flex flex-col items-center gap-1.5 border-l border-slate-100 pl-6">
                                         <span className="text-[8px] font-black text-slate-300 uppercase">Write</span>
                                         <PremiumToggle enabled={permissions[item]?.write ?? false} onChange={() => {}} />
                                      </div>
                                   </div>
                                </div>
                             ))}
                          </div>
                       </div>
                    ))}
                 </div>
                 
                 <div className="p-10 bg-slate-900 flex items-center justify-between border-t border-white/5">
                    <div className="flex items-center gap-4 text-slate-400">
                       <Shield size={20} className="text-indigo-400" />
                       <p className="text-[10px] font-black text-white uppercase tracking-widest">AFFECTS {activeRole.users} USERS</p>
                    </div>
                    <Button className="h-14 px-12 rounded-[22px] bg-white text-slate-900 font-black text-[11px] uppercase tracking-widest shadow-2xl hover:bg-slate-50 active:scale-95 transition-all gap-3 border-none">
                       <Save size={18} /> Deploy Governance Node
                    </Button>
                 </div>
              </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}
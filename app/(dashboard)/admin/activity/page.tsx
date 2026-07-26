"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Clock, Download, Filter, Search, 
  History, ShieldAlert, Zap, Globe, Smartphone, 
  MoreHorizontal, UserCheck, ArrowUpRight
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

// --- TYPES ---
interface Activity {
  id: string;
  user: { name: string; avatar: string; role: string };
  action: string;
  target: string;
  time: string;
  type: 'system' | 'attendance' | 'fee' | 'exam' | 'security';
  severity: 'low' | 'medium' | 'high';
  method: 'Web' | 'Mobile';
  campus: string;
}

const activities: Activity[] = [
  { id: '1', user: { name: "Principal Ali", avatar: "1", role: "Admin" }, action: "locked the payroll", target: "May 2026 Batch", time: "2 mins ago", type: "system", severity: "high", method: "Web", campus: "Main Campus" },
  { id: '2', user: { name: "Sarah Ahmed", avatar: "2", role: "Teacher" }, action: "uploaded results", target: "Final Exams - Class 8", time: "12 mins ago", type: "exam", severity: "medium", method: "Web", campus: "South Campus" },
  { id: '3', user: { name: "Usman Ghani", avatar: "3", role: "Finance" }, action: "verified invoice", target: "STU-992 (Ahmed Malik)", time: "45 mins ago", type: "fee", severity: "low", method: "Mobile", campus: "Main Campus" },
  { id: '4', user: { name: "System Node", avatar: "4", role: "Bot" }, action: "auto-backup completed", target: "Global Database", time: "1 hour ago", type: "system", severity: "low", method: "Web", campus: "Cloud" },
  { id: '5', user: { name: "Zainab Ali", avatar: "5", role: "Registrar" }, action: "flagged admission", target: "Double Entry Detected", time: "3 hours ago", type: "security", severity: "high", method: "Web", campus: "East Wing" },
];

export default function WorldClassActivityPage() {
  const [mounted, setMounted] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#F8FAFC]/60 pb-20">
      
      {/* 1. ELITE HEADER */}
      <header className="h-20 flex items-center justify-between px-8 bg-white/80 backdrop-blur-xl border-b sticky top-0 z-30 shadow-sm">
        <div className="flex items-center gap-4">
           <div className="p-2.5 bg-indigo-600 rounded-xl text-white shadow-lg shadow-indigo-100">
              <History size={20} strokeWidth={2.5} />
           </div>
           <div>
              <h1 className="text-xl font-black text-slate-900 tracking-tight leading-none">Activity Ledger</h1>
              {/* FIXED: Changed <p> to <div> and inside dot to <span> to fix Hydration Error */}
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1.5 flex items-center gap-1.5">
                 <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live System Monitoring
              </div>
           </div>
        </div>

        <div className="flex items-center gap-3">
           <Button variant="outline" className="h-10 rounded-xl border-slate-200 text-xs font-black uppercase tracking-widest gap-2 bg-white">
              <Download size={16} /> Export Audit
           </Button>
           <Button className="h-10 rounded-xl bg-slate-900 text-white text-xs font-black uppercase tracking-widest gap-2">
              <Filter size={16} /> Advanced Filter
           </Button>
        </div>
      </header>

      <main className="p-8 max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* 2. INSIGHTS BAR */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <InsightCard icon={<Zap className="text-indigo-600" />} label="Total Logs Today" value="1,420" trend="+12% vs yesterday" />
           <InsightCard icon={<ShieldAlert className="text-rose-600" />} label="Critical Alerts" value="03" trend="Requires attention" urgent />
           <InsightCard icon={<UserCheck className="text-emerald-600" />} label="Active Sessions" value="24" trend="Live operators" />
        </div>

        {/* 3. SEARCH */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-3 rounded-2xl border border-slate-100 shadow-sm">
           <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              <input 
                 value={search}
                 onChange={(e) => setSearch(e.target.value)}
                 placeholder="Search by user, action, or campus..." 
                 className="w-full pl-12 h-12 bg-slate-50 border-none rounded-xl text-sm font-medium outline-none focus:ring-2 ring-indigo-100 transition-all" 
              />
           </div>
           <div className="flex gap-2">
              <Badge variant="outline" className="h-12 px-4 rounded-xl border-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-400 bg-white cursor-pointer hover:bg-slate-50 transition-all">All Roles</Badge>
              <Badge variant="outline" className="h-12 px-4 rounded-xl border-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-400 bg-white cursor-pointer hover:bg-slate-50 transition-all">Today</Badge>
           </div>
        </div>

        {/* 4. THE LEDGER LIST */}
        <div className="space-y-3">
           <AnimatePresence>
              {activities.map((item, index) => (
                 <motion.div 
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white p-4 rounded-[28px] border border-slate-100 flex items-center justify-between group hover:shadow-xl hover:shadow-slate-200/40 hover:border-indigo-100 transition-all duration-500 cursor-default"
                 >
                    <div className="flex items-center gap-5">
                       <div className="relative">
                          <Avatar className="size-12 rounded-[18px] border-2 border-slate-50 shadow-sm">
                             <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${item.user.name}`} />
                             <AvatarFallback className="bg-indigo-50 text-indigo-600 font-bold">{item.user.name[0]}</AvatarFallback>
                          </Avatar>
                          <div className={`absolute -bottom-1 -right-1 size-5 rounded-lg border-2 border-white flex items-center justify-center shadow-sm ${
                             item.severity === 'high' ? 'bg-rose-500' : item.severity === 'medium' ? 'bg-amber-500' : 'bg-emerald-500'
                          }`}>
                             <span className="size-1.5 rounded-full bg-white" />
                          </div>
                       </div>
                       
                       <div className="space-y-1">
                          <div className="flex items-center gap-2">
                             <span className="text-sm font-black text-slate-900">{item.user.name}</span>
                             <Badge className="bg-slate-50 text-slate-400 border-none text-[8px] font-black uppercase rounded px-1.5">{item.user.role}</Badge>
                          </div>
                          <div className="text-[13px] font-medium text-slate-500">
                             {item.action} <span className="text-slate-900 font-bold">{item.target}</span>
                          </div>
                          <div className="flex items-center gap-3 mt-1">
                             <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1 uppercase tracking-tighter">
                                <Globe size={10} /> {item.campus}
                             </span>
                             <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1 uppercase tracking-tighter">
                                {item.method === 'Web' ? <Globe size={10} /> : <Smartphone size={10} />} {item.method}
                             </span>
                          </div>
                       </div>
                    </div>

                    <div className="flex items-center gap-8">
                       <div className="text-right hidden sm:block">
                          <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest flex items-center justify-end gap-1.5">
                             <Clock size={12} /> {item.time}
                          </div>
                          <div className="flex gap-1 mt-2 justify-end">
                             <Badge className={`text-[8px] font-black border-none px-2 rounded-md ${getTypeColor(item.type)}`}>
                                {item.type.toUpperCase()}
                             </Badge>
                          </div>
                       </div>
                       <Button variant="ghost" size="icon" className="rounded-xl text-slate-300 hover:text-indigo-600">
                          <MoreHorizontal size={20} />
                       </Button>
                    </div>
                 </motion.div>
              ))}
           </AnimatePresence>

           <div className="pt-6 flex flex-col items-center gap-4">
              <div className="h-px w-20 bg-slate-200" />
              <button className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] hover:text-indigo-600 transition-all">
                 Load Full Audit History <ArrowUpRight size={14} />
              </button>
           </div>
        </div>
      </main>
    </div>
  )
}

function InsightCard({ icon, label, value, trend, urgent }: any) {
   return (
      <div className={`p-6 rounded-[32px] bg-white border border-slate-100 shadow-sm flex items-center gap-5 group hover:border-indigo-100 transition-all ${urgent ? 'ring-1 ring-rose-100/50' : ''}`}>
         <div className="p-4 rounded-2xl bg-slate-50 group-hover:scale-110 transition-transform duration-500">
            {icon}
         </div>
         <div className="text-left">
            {/* FIXED: Changed <p> to <div> for safety */}
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-2">{label}</div>
            <h3 className="text-2xl font-black text-slate-900 leading-none mb-1">{value}</h3>
            <p className={`text-[9px] font-bold uppercase tracking-tighter ${urgent ? 'text-rose-500' : 'text-emerald-500'}`}>{trend}</p>
         </div>
      </div>
   )
}

function getTypeColor(type: string) {
   switch (type) {
      case 'system': return 'bg-indigo-50 text-indigo-600';
      case 'attendance': return 'bg-emerald-50 text-emerald-600';
      case 'fee': return 'bg-amber-50 text-amber-600';
      case 'security': return 'bg-rose-50 text-rose-600';
      default: return 'bg-slate-50 text-slate-600';
   }
}
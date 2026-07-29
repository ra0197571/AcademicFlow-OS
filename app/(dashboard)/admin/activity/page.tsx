"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Clock, Download, Filter, Search, 
  History, ShieldAlert, Zap, Globe, Smartphone, 
  MoreHorizontal, UserCheck, ArrowUpRight, Activity, ShieldCheck,
  Eye, Copy, ExternalLink, ShieldX, Plus
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

// --- 1. MOCK DATA ---
const TELEMETRY_DATA = [
  { time: '08:00', logs: 120 }, { time: '10:00', logs: 450 },
  { time: '12:00', logs: 980 }, { time: '14:00', logs: 600 },
  { time: '16:00', logs: 400 }, { time: '18:00', logs: 300 },
];

const activities = [
  { id: 'LOG-8821', user: { name: "Principal Ali", role: "Admin" }, action: "locked the payroll", target: "May 2026 Batch", time: "2 mins ago", type: "system", method: "Web", campus: "Main Campus" },
  { id: 'LOG-8822', user: { name: "Sarah Ahmed", role: "Teacher" }, action: "uploaded results", target: "Final Exams - Class 8", time: "12 mins ago", type: "exam", method: "Web", campus: "South Campus" },
  { id: 'LOG-8823', user: { name: "Usman Ghani", role: "Finance" }, action: "verified invoice", target: "STU-992 (Ahmed Malik)", time: "45 mins ago", type: "fee", method: "Mobile", campus: "Main Campus" },
  { id: 'LOG-8824', user: { name: "System Node", role: "Bot" }, action: "auto-backup completed", target: "Global Database", time: "1 hour ago", type: "system", method: "Web", campus: "Cloud" },
];

// --- 2. MAIN PAGE COMPONENT ---
export default function ProfessionalActivityPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <div className="space-y-5 animate-in fade-in duration-500 pb-10">
      
      {/* HEADER SECTION (Elite Styling) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white/90 backdrop-blur-md p-3.5 rounded-xl border border-slate-200/80 shadow-2xs">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
            <span className="font-bold text-indigo-600 uppercase tracking-wider text-[10px]">Audit Console</span>
            <span>•</span>
            <span>v2.4 Stable Monitoring</span>
          </div>
          <h1 className="text-lg font-black text-slate-900 tracking-tight mt-0.5">
            System <span className="text-indigo-600">Intelligence</span> Ledger
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="h-9 rounded-xl text-[10px] font-bold border-slate-200 bg-white gap-2 hover:bg-slate-50 hover:border-slate-300 transition-all uppercase tracking-wider px-4 shadow-xs"
          >
            <Download size={14} className="text-slate-500" /> Export Audit
          </Button>
          
          <Button 
            size="sm" 
            className="h-9 rounded-xl text-[10px] font-bold bg-indigo-600 hover:bg-indigo-700 text-white gap-2 shadow-lg shadow-indigo-100 transition-all uppercase tracking-wider px-5"
          >
            <Zap size={14} className="fill-current animate-pulse" /> Live Stream
          </Button>
        </div>
      </div>

      {/* ANALYTICS ROW (8:4 Split) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Telemetry Graph Card */}
        <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.3 }} className="lg:col-span-8 h-full">
          <Card className="h-full border border-slate-200/80 shadow-2xs rounded-xl bg-white p-4 transition-all duration-500 hover:shadow-xl hover:shadow-indigo-100/20">
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-indigo-50 rounded-lg text-indigo-600"><Activity size={16} /></div>
                <h3 className="text-xs font-extrabold text-slate-900 uppercase">Telemetry Stream (24h)</h3>
              </div>
              <Badge className="bg-emerald-50 text-emerald-600 border-none text-[9px] font-black tracking-widest">NORMAL LOAD</Badge>
            </div>
            <div className="h-[220px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={TELEMETRY_DATA} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                  <defs><linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} /><stop offset="95%" stopColor="#6366f1" stopOpacity={0} /></linearGradient></defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="time" tick={{fontSize: 10, fontWeight: 700, fill: '#94a3b8'}} axisLine={false} tickLine={false} />
                  <YAxis tick={{fontSize: 10, fontWeight: 700, fill: '#94a3b8'}} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '10px', fontWeight: '800' }} />
                  <Area type="monotone" dataKey="logs" stroke="#6366f1" strokeWidth={3} fill="url(#chartGlow)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>

        {/* Node Integrity Card */}
        <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.3 }} className="lg:col-span-4 h-full">
          <Card className="h-full border border-slate-200/80 shadow-2xs rounded-xl bg-white p-4 transition-all duration-500 hover:shadow-xl hover:shadow-emerald-100/20 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-3">
                <div className="p-1.5 bg-emerald-50 rounded-lg text-emerald-600"><ShieldCheck size={16} /></div>
                <h3 className="text-xs font-extrabold text-slate-900 uppercase">Node Integrity</h3>
              </div>
              <div className="space-y-2.5">
                {['Auth Gateway', 'Database Node', 'API Node-01', 'AI Predictor'].map((node, i) => (
                  <div key={node} className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50/50 border border-slate-100/50 hover:bg-white hover:shadow-sm transition-all">
                    <span className="text-[11px] font-bold text-slate-600 tracking-tight">{node}</span>
                    <div className="flex items-center gap-2">
                      <span className={`text-[9px] font-black uppercase tracking-widest ${i === 3 ? 'text-amber-500' : 'text-emerald-500'}`}>
                        {i === 3 ? 'Standby' : 'Operational'}
                      </span>
                      <div className={`size-1.5 rounded-full ${i === 3 ? 'bg-amber-500' : 'bg-emerald-500 animate-pulse'}`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <Button 
              variant="outline" 
              className="w-full h-10 mt-6 rounded-xl bg-indigo-50/30 text-indigo-600 hover:bg-indigo-600 hover:text-white border-indigo-100/50 text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 shadow-sm"
            >
               Run System Diagnostics
            </Button>
          </Card>
        </motion.div>
      </div>

      {/* KPI STATS (With Professional Lift Hover) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <KPICard icon={<Zap size={16} />} label="Logs Today" value="1,420" trend="+12.4%" color="indigo" />
        <KPICard icon={<ShieldAlert size={16} />} label="Security Alerts" value="03" trend="Action" color="rose" />
        <KPICard icon={<UserCheck size={16} />} label="Active Sessions" value="24" trend="Live" color="emerald" />
      </div>

      {/* LIVE ACTIVITY FEED CARD */}
      <Card className="border border-slate-200/80 shadow-2xs rounded-xl bg-white overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
          <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
            <span className="size-2 rounded-full bg-indigo-600 animate-pulse" /> Live Activity Feed
          </h3>
          <div className="relative group">
            <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input placeholder="Filter node..." className="h-7 pl-8 pr-3 bg-white border border-slate-200 rounded-md text-[10px] font-bold outline-none focus:ring-1 ring-indigo-100 w-32" />
          </div>
        </div>

        <div className="divide-y divide-slate-50">
          {activities.map((item, index) => (
            <motion.div 
              key={item.id} 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: index * 0.05 }}
              whileHover={{ x: 4 }} 
              className="p-3.5 flex items-center justify-between hover:bg-slate-50/80 transition-all duration-300 group hover:shadow-md border-l-4 border-l-transparent hover:border-l-indigo-500"
            >
              <div className="flex items-center gap-3.5">
                <Avatar className="size-9 rounded-lg border border-slate-100 shadow-2xs group-hover:scale-105 transition-transform">
                  <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${item.user.name}`} />
                  <AvatarFallback className="font-black text-[10px]">{item.user.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[12px] font-black text-slate-900 leading-none">{item.user.name}</span>
                    <Badge className="bg-slate-100 text-slate-500 border-none text-[8px] font-black uppercase rounded px-1 py-0">{item.user.role}</Badge>
                  </div>
                  <p className="text-[11px] font-medium text-slate-500 mt-0.5">
                    {item.action} <span className="text-slate-900 font-bold">{item.target}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-8">
                <div className="hidden md:flex flex-col items-end gap-1">
                   <span className="text-[9px] font-bold text-slate-400 uppercase flex items-center gap-1"><Globe size={11} /> {item.campus}</span>
                   <div className="flex items-center gap-3">
                      <span className="text-[9px] font-black text-indigo-400 uppercase tracking-tighter flex items-center gap-1"><Clock size={11} /> {item.time}</span>
                      <Badge className={`text-[8px] font-black border-none px-2 py-0 rounded-md bg-indigo-50 text-indigo-600`}>{item.type.toUpperCase()}</Badge>
                   </div>
                </div>

                {/* --- PROFESSIONAL DROPDOWN --- */}
                <DropdownMenu>
                  <DropdownMenuTrigger 
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }), 
                      "h-8 w-8 text-slate-300 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg outline-none transition-colors"
                    )}
                  >
                    <MoreHorizontal size={18} />
                  </DropdownMenuTrigger>
                  
                  <DropdownMenuContent align="end" className="w-48 p-1.5 rounded-xl border-slate-200 shadow-xl bg-white animate-in zoom-in-95 duration-200">
                    <DropdownMenuLabel className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2 py-1.5">Log Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-slate-100" />
                    <DropdownMenuItem className="flex items-center gap-2 text-[11px] font-bold text-slate-700 px-2 py-2 rounded-lg cursor-pointer hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
                      <Eye size={14} className="text-slate-400" /> View Full Details
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2 text-[11px] font-bold text-slate-700 px-2 py-2 rounded-lg cursor-pointer hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
                      <Copy size={14} className="text-slate-400" /> Copy Record ID
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2 text-[11px] font-bold text-slate-700 px-2 py-2 rounded-lg cursor-pointer hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
                      <ExternalLink size={14} className="text-slate-400" /> Audit Node Trace
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-slate-100" />
                    <DropdownMenuItem className="flex items-center gap-2 text-[11px] font-bold text-rose-600 px-2 py-2 rounded-lg cursor-pointer hover:bg-rose-50 transition-colors">
                      <ShieldX size={14} className="text-rose-400" /> Report Suspicious
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>
    </div>
  )
}

// --- SUB-COMPONENTS ---
function KPICard({ icon, label, value, trend, color }: any) {
  const colors: any = {
    indigo: "bg-indigo-50 text-indigo-600 border-indigo-100",
    rose: "bg-rose-50 text-rose-600 border-rose-100",
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
  };

  return (
    <motion.div 
      whileHover={{ y: -6, scale: 1.01 }} 
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Card className={`border border-slate-200/80 shadow-2xs rounded-xl bg-white p-3.5 flex items-center gap-4 transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 hover:border-indigo-100 cursor-default`}>
        <div className={`p-2 rounded-lg ${colors[color]} border flex items-center justify-center shrink-0`}>
          {icon}
        </div>
        <div>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">{label}</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-lg font-black text-slate-900 tracking-tight">{value}</h3>
            <span className={`text-[9px] font-black ${color === 'rose' ? 'text-rose-500' : 'text-emerald-500'} uppercase tracking-tight`}>
              {trend}
            </span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
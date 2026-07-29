"use client"

import React, { use } from 'react';
import { 
  ArrowLeft, Mail, Phone, MapPin, Calendar, 
  ShieldCheck, Download, MoreVertical, TrendingUp, 
  Clock, Award, FileText, Trash2, Printer, Activity, Star, 
  Lock, Zap, ChevronRight
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, RadialBarChart, RadialBar, PolarAngleAxis,
  Radar, RadarChart, PolarGrid, PolarRadiusAxis
} from 'recharts';
import Link from "next/link";
import { cn } from "@/lib/utils";

// Optimized Data
const gpaData = [
  { month: 'Sep', gpa: 3.2 }, { month: 'Oct', gpa: 3.5 },
  { month: 'Nov', gpa: 3.4 }, { month: 'Dec', gpa: 3.8 },
  { month: 'Jan', gpa: 3.9 }, { month: 'Feb', gpa: 4.0 },
];

const subjectData = [
  { subject: 'Math', A: 95, full: 100 },
  { subject: 'Physics', A: 82, full: 100 },
  { subject: 'English', A: 88, full: 100 },
  { subject: 'Logic', A: 92, full: 100 },
  { subject: 'CS', A: 98, full: 100 },
];

export default function StudentDetails({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const studentId = resolvedParams.id;

  return (
    <div className="flex flex-col h-full bg-[#FAFBFC] overflow-hidden animate-in fade-in duration-700">
      
      {/* 1. TOP COMMAND BAR */}
      <header className="shrink-0 h-[56px] border-b border-slate-100 bg-white flex items-center justify-between px-6 z-30">
        <div className="flex items-center gap-4">
           <Link href="/admin/students" className="p-2 hover:bg-slate-50 rounded-lg text-slate-400 hover:text-indigo-600 transition-all border border-transparent hover:border-slate-100">
              <ArrowLeft size={16} />
           </Link>
           <div className="flex flex-col">
              <h1 className="text-xs font-black text-slate-800 tracking-tighter uppercase italic leading-none">Intelligence <span className="text-indigo-600">Dossier</span></h1>
              <span className="text-[8px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1 leading-none">Registry Node: {studentId}</span>
           </div>
        </div>

        <div className="flex items-center gap-2">
           <Button variant="ghost" className="h-8 text-[9px] font-bold uppercase tracking-widest text-slate-500 hover:text-slate-900 transition-colors">
              <Printer size={12} className="mr-2" /> Print Node
           </Button>
           
           <DropdownMenu>
              <DropdownMenuTrigger className="h-8 px-4 bg-slate-900 hover:bg-slate-800 text-white text-[9px] font-bold uppercase tracking-widest shadow-xl rounded-lg flex items-center gap-2 outline-none border-none transition-all active:scale-95">
                 Protocol Actions <MoreVertical size={12} />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52 p-1 rounded-xl shadow-2xl border-slate-100 bg-white z-[100]">
                 <DropdownMenuLabel className="text-[8px] font-black uppercase text-slate-400 px-3 py-2">Operations</DropdownMenuLabel>
                 <DropdownMenuItem className="text-[10px] font-bold px-3 py-2 rounded-lg cursor-pointer flex items-center hover:bg-slate-50 outline-none"><Award size={14} className="mr-2 text-indigo-500" /> Scholarship Node</DropdownMenuItem>
                 <DropdownMenuItem className="text-[10px] font-bold px-3 py-2 rounded-lg cursor-pointer flex items-center hover:bg-slate-50 outline-none"><FileText size={14} className="mr-2 text-indigo-500" /> Export Dossier</DropdownMenuItem>
                 <DropdownMenuSeparator className="bg-slate-50" />
                 <DropdownMenuItem className="text-[10px] font-bold px-3 py-2 rounded-lg text-rose-500 hover:text-rose-600 focus:bg-rose-50 outline-none cursor-pointer"><Trash2 size={14} className="mr-2" /> Terminate Node</DropdownMenuItem>
              </DropdownMenuContent>
           </DropdownMenu>
        </div>
      </header>

      {/* 2. MAIN SCROLLABLE AREA */}
      <main className="flex-1 overflow-y-auto p-6 scrollbar-hide space-y-6">
        <div className="max-w-7xl mx-auto space-y-6 pb-12">
           
           {/* PROFILE HEADER CARD */}
           <Card className="border-none shadow-sm rounded-[32px] overflow-hidden bg-white">
              <div className="h-32 bg-slate-900 relative">
                 <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/40 via-indigo-600/20 to-purple-900/40" />
                 <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
                 <div className="absolute top-4 right-6 flex gap-2">
                    <Badge className="bg-white/10 backdrop-blur-md text-white border-white/10 font-bold text-[8px] uppercase tracking-widest px-3 py-1">SECURE_DASHBOARD</Badge>
                 </div>
              </div>
              <div className="px-10 pb-8 -mt-14 relative z-10 flex flex-col md:flex-row items-end gap-8">
                 <div className="size-28 rounded-[40px] bg-white p-1.5 shadow-2xl shadow-slate-300 ring-4 ring-slate-50">
                    <div className="size-full rounded-[34px] bg-slate-50 flex items-center justify-center text-4xl font-black text-slate-300 border border-slate-100 uppercase italic">
                       {studentId.substring(4, 6)}
                    </div>
                 </div>
                 <div className="flex-1 pb-2">
                    <div className="flex items-center gap-4">
                       <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">Ahmed Malik</h2>
                       <Badge className="bg-indigo-600 text-white border-none font-black text-[10px] uppercase tracking-widest px-4 py-1 shadow-lg shadow-indigo-100">Active Student</Badge>
                    </div>
                    <div className="flex items-center gap-6 mt-4">
                       <HeaderInfo icon={<ShieldCheck size={14} />} label="Clearance" value="VERIFIED_ID" />
                       <HeaderInfo icon={<Clock size={14} />} label="Lifecycle" value="ONGOING" />
                       <HeaderInfo icon={<Zap size={14} />} label="Potential" value="HIGH_NODE" />
                    </div>
                 </div>
              </div>
           </Card>

           {/* CORE WORKSPACE */}
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* LEFT COLUMN (Span 4) */}
              {/* LEFT COLUMN (Span 4) */}
<div className="lg:col-span-4 space-y-6">
    
    {/* 1. Personal Intel Card */}
    <Card className="border-slate-100 shadow-sm rounded-2xl p-6 bg-white hover:border-indigo-100 transition-all">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6 border-l-2 border-indigo-600 pl-3">Personal Intel</h3>
        <div className="space-y-6">
            <IntelRow icon={<Mail size={14}/>} label="Registry Email" value="ahmed.m@intel-node.com" />
            <IntelRow icon={<Phone size={14}/>} label="Secure Comms" value="+92 300 1234567" />
            <IntelRow icon={<Calendar size={14}/>} label="Birth Registry" value="12 March 2010" />
            <IntelRow icon={<MapPin size={14}/>} label="Registry Landmark" value="Blue Area, Islamabad, PK" />
        </div>
    </Card>

    {/* 2. Financial Card */}
    <Card className="border-none shadow-2xl rounded-2xl p-6 bg-[#0F172A] text-white relative overflow-hidden group">
        <div className="absolute top-0 right-0 size-40 bg-indigo-500/10 blur-3xl transition-all group-hover:bg-indigo-500/20" />
        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1 flex items-center gap-2 italic"><Lock size={10}/> Financial Security Node</p>
        <div className="flex items-baseline gap-2 mt-4">
            <h3 className="text-4xl font-black tracking-tighter text-indigo-400 tabular-nums">$450.00</h3>
            <span className="text-[10px] font-black text-rose-400 uppercase animate-pulse tracking-widest">Overdue</span>
        </div>
        <Button className="w-full mt-8 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-[10px] h-11 rounded-xl uppercase tracking-widest shadow-xl shadow-indigo-900/20 transition-all border-none">
            Generate Invoice Stream
        </Button>
    </Card>

    {/* 3. NODE ACTIVITIES (Aapka Naya Code - Updated with Glow) */}
    <Card className="border-slate-100 shadow-sm rounded-2xl p-6 bg-white overflow-hidden hover:border-indigo-100 transition-all">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
            <Activity size={14} className="text-indigo-600" /> Node Activities
        </h3>
        <div className="space-y-4">
            <ActivityItem label="Academic Audit Completed" time="2h ago" status="success" />
            <ActivityItem label="Library Node Entry" time="5h ago" status="neutral" />
            <ActivityItem label="Payment Alert Dispatched" time="1d ago" status="warning" />
        </div>
    </Card>
</div>

              {/* RIGHT COLUMN (Span 8) */}
              <div className="lg:col-span-8 space-y-6">
                 
                 {/* Top Level KPIs */}
                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <KpiCard label="Attendance" value="96.4%" chartType="radial" />
                    <KpiCard label="Global Rank" value="#04" subValue="/ 120 NODES" />
                    <KpiCard label="Conduct Node" value="EXEMPLARY" color="text-emerald-500" />
                 </div>

                 {/* Dual Performance Workspace */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Progress Chart */}
                    <Card className="border-slate-100 shadow-sm rounded-3xl p-6 bg-white flex flex-col">
                       <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-8 flex items-center gap-2 italic">
                          <TrendingUp size={14} className="text-indigo-500" /> GPA Evolution Graph
                       </h3>
                       <div className="h-[240px] w-full mt-auto">
                          <ResponsiveContainer width="100%" height="100%">
                             <AreaChart data={gpaData}>
                                <defs>
                                   <linearGradient id="colorGpa" x1="0" y1="0" x2="0" y2="1">
                                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                                   </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 9, fontWeight: 800, fill: '#94a3b8'}} dy={10} />
                                <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.05)', fontSize: '10px', fontWeight: 900 }} />
                                <Area type="monotone" dataKey="gpa" stroke="#6366f1" fillOpacity={1} fill="url(#colorGpa)" strokeWidth={4} dot={{ r: 4, fill: '#6366f1', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
                             </AreaChart>
                          </ResponsiveContainer>
                       </div>
                    </Card>

                    {/* Mastery Radar */}
                    <Card className="border-slate-100 shadow-sm rounded-3xl p-6 bg-white flex flex-col">
                       <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-8 flex items-center gap-2 italic">
                          <Star size={14} className="text-indigo-500" /> Sector Mastery Radar
                       </h3>
                       <div className="h-[240px] w-full mt-auto">
                          <ResponsiveContainer width="100%" height="100%">
                             <RadarChart cx="50%" cy="50%" outerRadius="80%" data={subjectData}>
                                <PolarGrid stroke="#f1f5f9" />
                                <PolarAngleAxis dataKey="subject" tick={{fontSize: 8, fontWeight: 900, fill: '#64748b'}} />
                                <Radar name="Ahmed" dataKey="A" stroke="#6366f1" fill="#6366f1" fillOpacity={0.4} />
                             </RadarChart>
                          </ResponsiveContainer>
                       </div>
                    </Card>
                 </div>

                 {/* Bottom Vault: Document Storage Log */}
                 <Card className="border-slate-100 shadow-sm rounded-3xl p-6 bg-white">
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6 italic">Secure Document Vault</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                       <DocVaultItem label="Birth_Node_Registry.pdf" size="2.4 MB" date="Jan 12" />
                       <DocVaultItem label="Transcripts_Archive_04.pdf" size="1.1 MB" date="Dec 20" />
                       <DocVaultItem label="Medical_Lifecycle_Report.pdf" size="840 KB" date="Nov 05" />
                       <DocVaultItem label="Character_Certificate_Node.pdf" size="620 KB" date="Oct 14" />
                    </div>
                 </Card>
              </div>
           </div>
        </div>
      </main>
    </div>
  );
}

// ELITE COMPONENTS
function IntelRow({ icon, label, value }: any) {
  return (
    <div className="flex items-center gap-4 group cursor-default">
       <div className="size-9 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 group-hover:border-indigo-100 transition-all shrink-0">
          {icon}
       </div>
       <div className="min-w-0">
          <p className="text-[8px] font-bold text-slate-300 uppercase leading-none mb-1.5 tracking-widest">{label}</p>
          <p className="text-[11px] font-black text-slate-800 truncate tracking-tight">{value}</p>
       </div>
    </div>
  )
}

function KpiCard({ label, value, subValue, chartType, color = "text-slate-900" }: any) {
    return (
        <Card className="p-6 rounded-[24px] border-slate-100 shadow-sm bg-white hover:border-indigo-100 transition-all group relative overflow-hidden">
            <div className="relative z-10 flex flex-col justify-between h-full">
                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1 group-hover:text-indigo-600 transition-colors">{label}</p>
                <div className="flex items-end justify-between gap-2 mt-2">
                    <div className="flex items-baseline gap-1">
                        <p className={cn("text-2xl font-black tracking-tighter leading-none", color)}>{value}</p>
                        {subValue && <span className="text-[8px] font-black text-slate-300 uppercase whitespace-nowrap">{subValue}</span>}
                    </div>
                    {chartType === 'radial' && (
                        <div className="size-10 shrink-0">
                            <ResponsiveContainer width="100%" height="100%">
                                <RadialBarChart innerRadius="60%" outerRadius="100%" data={[{v: 96}]} startAngle={90} endAngle={-270}>
                                    <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                                    <RadialBar background dataKey="v" fill="#6366f1" cornerRadius={10} />
                                </RadialBarChart>
                            </ResponsiveContainer>
                        </div>
                    )}
                </div>
            </div>
            <div className="absolute -bottom-4 -right-4 size-12 bg-slate-50 rounded-full group-hover:bg-indigo-50 transition-all duration-500" />
        </Card>
    )
}

function DocVaultItem({ label, size, date }: any) {
    return (
        <div className="flex items-center justify-between p-3 rounded-xl border border-slate-50 bg-[#FCFDFF] hover:border-indigo-100 hover:shadow-md hover:shadow-indigo-50/50 transition-all cursor-pointer group">
            <div className="flex items-center gap-3 min-w-0">
                <div className="size-8 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-indigo-600 transition-colors shrink-0 shadow-sm">
                    <FileText size={14} />
                </div>
                <div className="min-w-0">
                    <p className="text-[10px] font-black text-slate-700 truncate uppercase tracking-tighter">{label}</p>
                    <p className="text-[8px] font-bold text-slate-300 uppercase">{size} • {date}</p>
                </div>
            </div>
            <div className="size-6 flex items-center justify-center rounded-full text-slate-200 group-hover:text-indigo-500 group-hover:bg-indigo-50 transition-all shrink-0">
                <ChevronRight size={14} />
            </div>
        </div>
    )
}

function ActivityItem({ label, time, status }: any) {
    return (
        <div className="flex items-center justify-between gap-4 p-3 rounded-xl hover:bg-slate-50 transition-all group border border-transparent hover:border-slate-100">
            <div className="flex items-center gap-3 min-w-0">
                {/* Glow Dot Logic */}
                <div className={cn(
                    "size-2 rounded-full ring-4 ring-white transition-all group-hover:scale-125",
                    status === 'success' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]' : 
                    status === 'warning' ? 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]' : 
                    'bg-slate-300 shadow-[0_0_8px_rgba(148,163,184,0.4)]'
                )} />
                <p className="text-[10px] font-bold text-slate-600 truncate uppercase tracking-tight leading-none">
                    {label}
                </p>
            </div>
            <span className="text-[8px] font-black text-slate-300 uppercase shrink-0 italic">
                {time}
            </span>
        </div>
    )
}

function HeaderInfo({ icon, label, value }: any) {
    return (
        <div className="flex items-center gap-2">
            <span className="text-indigo-500">{icon}</span>
            <div className="flex flex-col">
                <span className="text-[7px] font-black text-slate-300 uppercase leading-none mb-0.5 tracking-[0.1em]">{label}</span>
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{value}</span>
            </div>
        </div>
    )
}
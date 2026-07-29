"use client"

import React, { use } from 'react';
import { 
  ArrowLeft, Mail, Phone, MapPin, Calendar, Briefcase, 
  ShieldCheck, Download, MoreVertical, TrendingUp, 
  Clock, Award, FileText, Trash2, Printer, Star, Zap,
  BookOpen, Users, ChevronRight
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
  Radar, RadarChart, PolarGrid
} from 'recharts';
import Link from "next/link";
import { cn } from "@/lib/utils";

// Mock Data
const performanceData = [
  { month: 'Sep', score: 82 }, { month: 'Oct', score: 85 },
  { month: 'Nov', score: 84 }, { month: 'Dec', score: 92 },
  { month: 'Jan', score: 90 }, { month: 'Feb', score: 95 },
];

const skillData = [
  { subject: 'Teaching', A: 95 },
  { subject: 'Punctuality', A: 88 },
  { subject: 'Engagement', A: 92 },
  { subject: 'Patience', A: 85 },
  { subject: 'Innovation', A: 78 },
];

export default function TeacherProfile({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  return (
    <div className="flex flex-col h-full bg-[#FAFBFC] overflow-hidden animate-in fade-in duration-700">
      
      {/* 1. TOP COMMAND BAR */}
      <header className="shrink-0 h-[56px] border-b border-slate-100 bg-white flex items-center justify-between px-6 z-30">
        <div className="flex items-center gap-4">
           <Link href="/admin/teachers" className="p-2 hover:bg-slate-50 rounded-lg text-slate-400 hover:text-indigo-600 transition-all border border-transparent hover:border-slate-100">
              <ArrowLeft size={16} />
           </Link>
           <div className="flex flex-col">
              <h1 className="text-xs font-black text-slate-800 tracking-tighter uppercase italic leading-none">Faculty <span className="text-indigo-600">Dossier</span></h1>
              <span className="text-[8px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1 leading-none tracking-tighter">ID Node: {id}</span>
           </div>
        </div>

        <div className="flex items-center gap-2">
           <Button variant="ghost" className="h-8 text-[9px] font-bold uppercase tracking-widest text-slate-500 hover:text-slate-900 transition-colors">
              <Printer size={12} className="mr-2" /> Export Node
           </Button>
           
           <DropdownMenu>
              <DropdownMenuTrigger className="h-8 px-4 bg-slate-900 hover:bg-slate-800 text-white text-[9px] font-bold uppercase tracking-widest shadow-xl rounded-lg flex items-center gap-2 outline-none border-none transition-all active:scale-95">
                 Protocol Actions <MoreVertical size={12} />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52 p-1 rounded-xl shadow-2xl border-slate-100 bg-white z-[100]">
                 <DropdownMenuLabel className="text-[8px] font-black uppercase text-slate-400 px-3 py-2">Operations</DropdownMenuLabel>
                 <DropdownMenuItem className="text-[10px] font-bold px-3 py-2 rounded-lg cursor-pointer flex items-center hover:bg-slate-50 outline-none"><Award size={14} className="mr-2 text-indigo-500" /> Professional Bonus</DropdownMenuItem>
                 <DropdownMenuItem className="text-[10px] font-bold px-3 py-2 rounded-lg cursor-pointer flex items-center hover:bg-slate-50 outline-none"><FileText size={14} className="mr-2 text-indigo-500" /> Export Profile</DropdownMenuItem>
                 <DropdownMenuSeparator className="bg-slate-50" />
                 <DropdownMenuItem className="text-[10px] font-bold px-3 py-2 rounded-lg text-rose-500 hover:text-rose-600 focus:bg-rose-50 outline-none cursor-pointer"><Trash2 size={14} className="mr-2" /> Revoke Access</DropdownMenuItem>
              </DropdownMenuContent>
           </DropdownMenu>
        </div>
      </header>

      {/* 2. MAIN SCROLLABLE AREA */}
      <main className="flex-1 overflow-y-auto p-6 scrollbar-hide space-y-6">
        <div className="max-w-7xl mx-auto space-y-6 pb-12">
           
           {/* PROFILE HEADER CARD */}
           <Card className="border-none shadow-sm rounded-[32px] overflow-hidden bg-white">
              <div className="h-28 bg-slate-900 relative">
                 <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/40 via-indigo-600/20 to-purple-900/40" />
                 <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
                 <div className="absolute top-4 right-6 flex gap-2">
                    <Badge className="bg-white/10 backdrop-blur-md text-white border-white/10 font-bold text-[8px] uppercase tracking-widest px-3 py-1">ELITE_FACULTY_NODE</Badge>
                 </div>
              </div>
              <div className="px-10 pb-8 -mt-14 relative z-10 flex flex-col md:flex-row items-end gap-8">
                 <div className="size-28 rounded-[40px] bg-white p-1.5 shadow-2xl shadow-slate-300 ring-4 ring-slate-50">
                    <div className="size-full rounded-[34px] bg-indigo-50 flex items-center justify-center text-4xl font-black text-indigo-400 border border-indigo-100 uppercase italic">
                       ZK
                    </div>
                 </div>
                 <div className="flex-1 pb-2">
                    <div className="flex items-center gap-4">
                       <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">Zia Khan</h2>
                       <Badge className="bg-indigo-600 text-white border-none font-black text-[10px] uppercase tracking-widest px-4 py-1 shadow-lg shadow-indigo-100">Senior Faculty</Badge>
                    </div>
                    <div className="flex items-center gap-6 mt-4">
                       <HeaderInfo icon={<ShieldCheck size={14} />} label="Clearance" value="LEVEL_05" />
                       <HeaderInfo icon={<Zap size={14} />} label="Dept Role" value="MATHEMATICS_LEAD" />
                       <HeaderInfo icon={<Star size={14} />} label="Evaluation" value="EXCELLENT_4.8" />
                    </div>
                 </div>
              </div>
           </Card>

           {/* CORE WORKSPACE */}
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* LEFT COLUMN: INTEL & FINANCE */}
              <div className="lg:col-span-4 space-y-6">
                 <Card className="border-slate-100 shadow-sm rounded-2xl p-6 bg-white hover:border-indigo-100 transition-all">
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6 border-l-2 border-indigo-600 pl-3">Professional Intel</h3>
                    <div className="space-y-6">
                       <IntelRow icon={<Mail size={14}/>} label="Registry Email" value="zia.khan@intel-node.com" />
                       <IntelRow icon={<Phone size={14}/>} label="Secure Comms" value="+92 300 1112233" />
                       <IntelRow icon={<Briefcase size={14}/>} label="Experience" value="12Y Academic Lifecycle" />
                       <IntelRow icon={<MapPin size={14}/>} label="Work Station" value="Main Campus, Islamabad" />
                    </div>
                 </Card>

                 <Card className="border-none shadow-2xl rounded-2xl p-6 bg-[#0F172A] text-white relative overflow-hidden group">
                    <div className="absolute top-0 right-0 size-40 bg-indigo-500/10 blur-3xl transition-all group-hover:bg-indigo-500/20" />
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1 flex items-center gap-2 italic">Monthly Payroll Node</p>
                    <div className="flex items-baseline gap-2 mt-4">
                       <h3 className="text-4xl font-black tracking-tighter text-indigo-400 tabular-nums">$3,200.00</h3>
                       <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Paid / June</span>
                    </div>
                    <Button className="w-full mt-8 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-[10px] h-11 rounded-xl uppercase tracking-widest shadow-xl shadow-indigo-900/20 transition-all border-none">
                       View Payroll Archive
                    </Button>
                 </Card>
              </div>

              {/* RIGHT COLUMN: ANALYTICS & HUB */}
              <div className="lg:col-span-8 space-y-6">
                 
                 {/* Top Level KPIs */}
                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <KpiCard label="Teaching Load" value="22" subValue="PERIODS / WK" chartType="radial" />
                    <KpiCard label="Students Managed" value="184" subValue="ACTIVE NODES" />
                    <KpiCard label="Success Ratio" value="92%" color="text-emerald-500" />
                 </div>

                 {/* Charts Workspace */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Student Success Trend */}
                    <Card className="border-slate-100 shadow-sm rounded-3xl p-6 bg-white flex flex-col">
                       <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-8 flex items-center gap-2 italic">
                          <TrendingUp size={14} className="text-indigo-500" /> Student Success Index
                       </h3>
                       <div className="h-[220px] w-full mt-auto">
                          <ResponsiveContainer width="100%" height="100%">
                             <AreaChart data={performanceData}>
                                <defs>
                                   <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                                   </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 9, fontWeight: 800, fill: '#94a3b8'}} dy={10} />
                                <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.05)', fontSize: '10px', fontWeight: 900 }} />
                                <Area type="monotone" dataKey="score" stroke="#6366f1" fillOpacity={1} fill="url(#colorScore)" strokeWidth={4} />
                             </AreaChart>
                          </ResponsiveContainer>
                       </div>
                    </Card>

                    {/* Faculty Skillset Radar */}
                    {/* Faculty Skill Mastery - FINAL FIX FOR CLIPPING */}
<Card className="border-slate-100 shadow-sm rounded-3xl p-6 bg-white flex flex-col hover:border-indigo-200 transition-all group">
   <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-8 flex items-center gap-2 italic">
      <Star size={14} className="text-indigo-500" /> Sector Mastery Radar
   </h3>
   <div className="h-[220px] w-full mt-auto">
      <ResponsiveContainer width="100%" height="100%">
         <RadarChart 
            cx="50%" 
            cy="50%" 
            outerRadius="58%" // Radius ko 65% se gira kar 58% kiya taake labels ko maximum space mile
            data={skillData}
            margin={{ top: 10, right: 45, left: 45, bottom: 10 }} // Horizontal margin barha kar 45 kar diya
         >
            <PolarGrid stroke="#f1f5f9" strokeWidth={1} />
            <PolarAngleAxis 
               dataKey="subject" 
               tick={{
                  fontSize: 8, 
                  fontWeight: 900, 
                  fill: '#64748b', 
                  letterSpacing: '0.05em'
               }} 
            />
            {/* Added a subtle glow effect to the radar area */}
            <Radar 
               name="Faculty" 
               dataKey="A" 
               stroke="#6366f1" 
               strokeWidth={3}
               fill="#6366f1" 
               fillOpacity={0.35} 
            />
         </RadarChart>
      </ResponsiveContainer>
   </div>
</Card>
                 </div>

                 {/* Current Assignments Log */}
                 <Card className="border-slate-100 shadow-sm rounded-3xl p-6 bg-white">
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6 italic">Current Duty Assignments</h3>
                    <div className="space-y-3">
                       <ClassItem name="Grade 9-A" subject="Advanced Mathematics" students="32" time="09:00 - 10:00" />
                       <ClassItem name="Grade 10-B" subject="Statistics & Data" students="28" time="11:30 - 12:30" />
                       <ClassItem name="Grade 12-A" subject="Calculus Node" students="24" time="01:30 - 02:30" />
                    </div>
                 </Card>
              </div>
           </div>
        </div>
      </main>
    </div>
  );
}

// ELITE HELPER COMPONENTS
function IntelRow({ icon, label, value }: any) {
  return (
    <div className="flex items-center gap-4 group cursor-default">
       <div className="size-9 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-300 group-hover:bg-indigo-50 group-hover:text-indigo-600 group-hover:border-indigo-100 transition-all shrink-0">
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
            <div className="relative z-10">
                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1 group-hover:text-indigo-600 transition-colors">{label}</p>
                <div className="flex items-end justify-between gap-2 mt-2">
                    <div className="flex items-baseline gap-1">
                        <p className={cn("text-2xl font-black tracking-tighter leading-none", color)}>{value}</p>
                        {subValue && <span className="text-[8px] font-black text-slate-300 uppercase whitespace-nowrap">{subValue}</span>}
                    </div>
                    {chartType === 'radial' && (
                        <div className="size-10 shrink-0">
                            <ResponsiveContainer width="100%" height="100%">
                                <RadialBarChart innerRadius="60%" outerRadius="100%" data={[{v: 75}]} startAngle={90} endAngle={-270}>
                                    <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                                    <RadialBar background dataKey="v" fill="#6366f1" cornerRadius={10} />
                                </RadialBarChart>
                            </ResponsiveContainer>
                        </div>
                    )}
                </div>
            </div>
        </Card>
    )
}

function ClassItem({ name, subject, students, time }: any) {
  return (
    <div className="flex items-center justify-between p-4 bg-[#FCFDFF] border border-slate-100 rounded-2xl hover:border-indigo-100 hover:shadow-lg hover:shadow-indigo-50/30 transition-all group cursor-default">
       <div className="flex items-center gap-4">
          <div className="size-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-all shadow-sm">
             <BookOpen size={16} />
          </div>
          <div>
             <h4 className="text-[12px] font-black text-slate-800 uppercase tracking-tight">{name}</h4>
             <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter">{subject}</p>
          </div>
       </div>
       <div className="flex items-center gap-6">
          <div className="text-right hidden sm:block">
             <p className="text-[8px] font-black text-slate-300 uppercase mb-1 tracking-tighter">Schedule</p>
             <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-600">
                <Clock size={10} className="text-indigo-400" /> {time}
             </div>
          </div>
          <div className="text-right border-l pl-6">
             <p className="text-[8px] font-black text-slate-300 uppercase mb-1 tracking-tighter">Nodes</p>
             <div className="flex items-center justify-end gap-1.5 text-[10px] font-black text-slate-800">
                <Users size={10} className="text-slate-300" /> {students}
             </div>
          </div>
          <ChevronRight size={14} className="text-slate-200 group-hover:text-indigo-500 transition-all" />
       </div>
    </div>
  )
}

function HeaderInfo({ icon, label, value }: any) {
    return (
        <div className="flex items-center gap-2">
            <span className="text-indigo-500">{icon}</span>
            <div className="flex flex-col">
                <span className="text-[7px] font-black text-slate-300 uppercase leading-none mb-0.5 tracking-[0.1em]">{label}</span>
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest leading-none">{value}</span>
            </div>
        </div>
    )
}
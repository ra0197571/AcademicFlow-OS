"use client"

import React, { useState } from 'react';
import { 
  Search, UserPlus, GraduationCap, Download, Trash2, MessageSquare, 
  Eye, MoreHorizontal, LayoutGrid, UserCheck, Clock, 
  FileSpreadsheet, SlidersHorizontal, ArrowUpRight
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import Link from "next/link";
import { cn } from "@/lib/utils";

const students = [
  { id: "STU-001", name: "Ahmed Malik", class: "9th-A", email: "ahmed@example.com", status: "Active", phone: "+92 300 1234567", date: "12 July 2024", attendance: "98%", behavior: "Exemplary" },
  { id: "STU-002", name: "Fatima Khan", class: "10th-B", email: "fatima@example.com", status: "Active", phone: "+92 301 7654321", date: "10 July 2024", attendance: "94%", behavior: "Good" },
  { id: "STU-003", name: "Ali Hassan", class: "9th-A", email: "ali@example.com", status: "Inactive", phone: "+92 321 9876543", date: "05 July 2024", attendance: "82%", behavior: "Average" },
  { id: "STU-004", name: "Zainab Bibi", class: "11th-C", email: "zainab@example.com", status: "Active", phone: "+92 333 1122334", date: "01 July 2024", attendance: "99%", behavior: "Exemplary" },
  { id: "STU-005", name: "Bilal Raza", class: "12th-A", email: "bilal@example.com", status: "Pending", phone: "+92 345 5566778", date: "28 June 2024", attendance: "0%", behavior: "Pending" },
];

export default function StudentsDirectory() {
  const [selectedCount, setSelectedCount] = useState(0);
  const [quickViewStudent, setQuickViewStudent] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("All");

  return (
    <div className="flex flex-col h-full bg-[#FDFDFD] overflow-hidden animate-in fade-in duration-700">
      
      {/* 1. TOP HEADER */}
      <header className="shrink-0 h-[56px] border-b border-slate-100 bg-white flex items-center justify-between px-6 z-20">
        <div className="flex items-center gap-3">
           <div className="size-8 bg-slate-900 rounded-lg flex items-center justify-center text-white shadow-lg">
              <GraduationCap size={16} />
           </div>
           <div className="flex flex-col">
              <h1 className="text-xs font-bold text-slate-800 tracking-tight leading-none uppercase italic">Registry <span className="text-indigo-600">Command</span></h1>
              <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1">Lifecycle Node / Active</span>
           </div>
        </div>

        <div className="flex items-center gap-2">
           <Button variant="outline" className="h-8 text-[9px] font-bold uppercase tracking-wider border-slate-200 bg-white">
              <Download size={12} className="mr-2" /> Export
           </Button>
           <Link href="/admin/admission">
            <Button className="h-8 bg-indigo-600 hover:bg-indigo-700 text-white text-[9px] font-bold uppercase tracking-wider shadow-md active:scale-95 transition-all">
                <UserPlus size={12} className="mr-2" /> New Admission
            </Button>
           </Link>
        </div>
      </header>

      {/* 2. SCROLLABLE WORKSPACE */}
      <main className="flex-1 overflow-y-auto p-6 scrollbar-hide space-y-6 bg-slate-50/20">
        
        {/* KPI CARDS - Added Premium Hover Effects */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
           <PremiumStat label="Total Registry" value="1,284" trend="+12.4%" color="#6366f1" icon={<LayoutGrid size={12}/>}/>
           <PremiumStat label="Active Nodes" value="1,195" trend="+4.2%" color="#10b981" icon={<UserCheck size={12}/>}/>
           <PremiumStat label="Leave Log" value="14" trend="-2.1%" color="#f59e0b" icon={<Clock size={12}/>}/>
           <PremiumStat label="In-Pipeline" value="28" trend="+18.5%" color="#8b5cf6" icon={<UserPlus size={12}/>}/>
        </div>

        {/* COMPACT TOOLBAR */}
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-2.5 rounded-xl border border-slate-100 shadow-sm">
           <div className="flex bg-slate-50 p-1 rounded-lg border border-slate-100">
              {["All", "Active", "Inactive", "Pending"].map((tab) => (
                <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={cn(
                        "px-4 py-1 rounded-md text-[9px] font-black uppercase tracking-widest transition-all",
                        activeTab === tab ? "bg-white text-indigo-600 shadow-sm ring-1 ring-slate-100" : "text-slate-400 hover:text-slate-600"
                    )}
                >
                    {tab}
                </button>
              ))}
           </div>

           <div className="flex items-center gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:w-72 group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors" size={12} />
                <input placeholder="Search intelligence node..." className="w-full h-8 pl-9 pr-3 bg-slate-50 border border-slate-200 rounded-lg text-[10px] font-semibold outline-none focus:bg-white focus:ring-2 ring-indigo-50 transition-all placeholder:text-slate-300" />
              </div>
              <Button variant="outline" className="h-8 w-8 p-0 border-slate-200 bg-white"><SlidersHorizontal size={12}/></Button>
           </div>
        </div>

        {/* TABLE - Redesigned for Elite Look */}
        <div className="max-w-7xl mx-auto bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden mb-12">
           <table className="w-full text-left">
              <thead>
                 <tr className="bg-slate-50/50 border-b border-slate-100 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                    <th className="px-6 py-4 w-10 text-center"><Checkbox className="rounded-sm" /></th>
                    <th className="px-6 py-4">Identity Node</th>
                    <th className="px-6 py-4">Registry Class</th>
                    <th className="px-6 py-4">Lifecycle Status</th>
                    <th className="px-6 py-4 text-right pr-10">Actions</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                 {students.map((student) => (
                    <tr key={student.id} className="group hover:bg-indigo-50/10 transition-all border-l-2 border-transparent hover:border-indigo-600">
                       <td className="px-6 py-3 text-center"><Checkbox className="rounded-sm" /></td>
                       <td className="px-6 py-3">
                          <div className="flex items-center gap-3">
                             <div className="size-8 rounded-lg bg-slate-50 text-slate-400 flex items-center justify-center font-bold text-[10px] border border-slate-200 uppercase group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900 transition-all">
                                {student.name.substring(0, 2)}
                             </div>
                             <div>
                                <p className="text-[11px] font-bold text-slate-900 leading-none">{student.name}</p>
                                <p className="text-[9px] font-medium text-slate-400 mt-1 lowercase tracking-tighter">{student.email}</p>
                             </div>
                          </div>
                       </td>
                       <td className="px-6 py-3">
                          <Badge variant="outline" className="text-[9px] font-bold border-slate-100 bg-white text-slate-500 py-0 px-2 h-5">
                             {student.id} <span className="mx-1 opacity-20">|</span> {student.class}
                          </Badge>
                       </td>
                       <td className="px-6 py-3">
                          <div className="flex items-center gap-2">
                             <div className={cn("size-1 rounded-full", student.status === 'Active' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300')} />
                             <span className={cn("text-[10px] font-bold uppercase tracking-tight", student.status === 'Active' ? 'text-emerald-600' : 'text-slate-400')}>
                                {student.status}
                             </span>
                          </div>
                       </td>
                       <td className="px-6 py-3 text-right pr-10">
                          <div className="flex items-center justify-end gap-2">
                             
                             <button 
                                type="button"
                                onClick={() => setQuickViewStudent(student)} 
                                className="h-8 w-8 flex items-center justify-center bg-slate-50 border border-slate-100 rounded-md text-slate-400 hover:text-indigo-600 hover:bg-white hover:shadow-sm transition-all"
                             >
                                <Eye size={14}/>
                             </button>
                             
                             {/* THE DROPDOWN MENU - FIXED: No asChild prop, styled the Trigger directly */}
                             <DropdownMenu>
                                <DropdownMenuTrigger className="h-8 w-8 flex items-center justify-center bg-slate-50 border border-slate-100 rounded-md text-slate-400 hover:text-slate-600 hover:bg-white transition-all outline-none focus:ring-0">
                                      <MoreHorizontal size={14}/>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-44 p-1 rounded-xl shadow-xl border-slate-100 z-[100] bg-white">
                                   <DropdownMenuLabel className="text-[8px] font-black uppercase text-slate-400 px-3 py-1.5 tracking-widest">Protocol Actions</DropdownMenuLabel>
                                   <DropdownMenuItem className="text-[10px] font-bold px-3 py-2 rounded-lg cursor-pointer flex items-center hover:bg-slate-50 outline-none">
                                      <FileSpreadsheet size={13} className="mr-2 text-indigo-500" /> View Transcript
                                   </DropdownMenuItem>
                                   <DropdownMenuItem className="text-[10px] font-bold px-3 py-2 rounded-lg cursor-pointer flex items-center hover:bg-slate-50 outline-none">
                                      <MessageSquare size={13} className="mr-2 text-emerald-500" /> Notify Guardian
                                   </DropdownMenuItem>
                                   <DropdownMenuSeparator className="bg-slate-50" />
                                   <DropdownMenuItem className="text-[10px] font-bold px-3 py-2 rounded-lg text-rose-500 hover:text-rose-600 focus:bg-rose-50 cursor-pointer flex items-center outline-none">
                                      <Trash2 size={13} className="mr-2" /> Deactivate Node
                                   </DropdownMenuItem>
                                </DropdownMenuContent>
                             </DropdownMenu>
                          </div>
                       </td>
                    </tr>
                 ))}
              </tbody>
           </table>
        </div>
      </main>

      {/* 3. QUICK VIEW SHEET - FIXED: Only one Close Icon (Shadcn default) */}
      <Sheet open={!!quickViewStudent} onOpenChange={() => setQuickViewStudent(null)}>
        <SheetContent className="w-[400px] border-l border-slate-100 p-0 overflow-hidden shadow-2xl z-[150] bg-white">
           <div className="h-24 bg-slate-900 flex items-center px-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-indigo-600 opacity-20" />
              <h3 className="text-white font-black uppercase tracking-widest text-[10px] z-10 italic">Intelligence Dossier</h3>
           </div>
           
           <div className="px-8 -mt-8 relative z-20">
              <div className="size-20 rounded-2xl bg-white p-1 shadow-2xl border border-slate-50 mx-auto">
                 <div className="size-full rounded-xl bg-slate-50 flex items-center justify-center text-xl font-black text-slate-300 uppercase leading-none">
                    {quickViewStudent?.name.substring(0, 2)}
                 </div>
              </div>
              <div className="mt-4 text-center">
                 <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight leading-none">{quickViewStudent?.name}</h2>
                 <p className="text-[9px] font-bold text-indigo-500 uppercase tracking-widest mt-2 tracking-tighter">{quickViewStudent?.id} Node</p>
                 
                 <div className="grid grid-cols-2 gap-3 mt-8">
                    <ProfileMetric label="Attendance Depth" value={quickViewStudent?.attendance} />
                    <ProfileMetric label="Conduct Rating" value={quickViewStudent?.behavior} color="text-emerald-600" />
                 </div>
                 
                 <div className="mt-8 pt-8 border-t border-slate-50 flex flex-col gap-2">
                    <Link href={`/admin/students/${quickViewStudent?.id}`} className="block mt-8">
                       <Button className="w-full bg-slate-900 h-11 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg shadow-indigo-50">
                         Analyze Performance Node
                       </Button>
                    </Link>
                    <Button variant="outline" className="w-full h-11 rounded-xl text-[10px] font-black uppercase tracking-widest border-slate-200">
                       Download Identity Stream
                    </Button>
                 </div>
              </div>
           </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

// PREMIUM KPI COMPONENT WITH HOVER EFFECT
function PremiumStat({ label, value, trend, color, icon }: any) {
  const data = [{ v: 10 }, { v: 25 }, { v: 15 }, { v: 45 }, { v: 35 }, { v: 55 }];
  return (
    <div className="p-4 rounded-xl bg-white border border-slate-100 shadow-sm hover:border-indigo-200 hover:shadow-md hover:-translate-y-1 transition-all group overflow-hidden relative cursor-default">
       <div className="flex justify-between items-start relative z-10">
          <div>
            <div className="flex items-center gap-2 text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1 group-hover:text-indigo-500 transition-colors">
               {icon} {label}
            </div>
            <p className="text-lg font-black text-slate-900 tracking-tight leading-none">{value}</p>
            <span className="text-[8px] font-black text-emerald-500 bg-emerald-50 px-1.5 py-0.5 rounded mt-2 inline-block shadow-sm">{trend}</span>
          </div>
          <div className="w-12 h-10 opacity-30 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
            <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={data}>
                <defs>
                    <linearGradient id={`grad-${color}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
                        <stop offset="95%" stopColor={color} stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <Area type="monotone" dataKey="v" stroke={color} fill={`url(#grad-${color})`} strokeWidth={2.5} />
               </AreaChart>
            </ResponsiveContainer>
          </div>
       </div>
       {/* Background subtle glow on hover */}
       <div className="absolute -bottom-8 -right-8 size-20 bg-indigo-50/50 rounded-full blur-2xl group-hover:bg-indigo-100/80 transition-all duration-500" />
    </div>
  )
}

function ProfileMetric({ label, value, color = "text-slate-900" }: any) {
    return (
        <div className="bg-slate-50 p-4 rounded-xl text-left border border-slate-100 group hover:bg-white hover:shadow-sm transition-all">
            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
            <p className={cn("text-xs font-black uppercase leading-none mt-1", color)}>{value}</p>
        </div>
    )
}
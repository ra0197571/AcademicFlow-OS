"use client"

import React, { useState } from 'react';
import { 
  Search, UserPlus, GraduationCap, Download, Trash2, MessageSquare, 
  Eye, ArrowUpRight, MoreHorizontal, LayoutGrid, UserCheck, Clock, 
  FileSpreadsheet, SlidersHorizontal, Users, Star, ShieldCheck, Zap
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

const teachers = [
  { id: "TCH-101", name: "Zia Khan", subject: "Mathematics", email: "zia@example.com", status: "Active", phone: "+92 300 1112233", exp: "12Y", rating: 4.8, load: "92%" },
  { id: "TCH-102", name: "Sarah Ahmed", subject: "Physics", email: "sarah@example.com", status: "Active", phone: "+92 301 4445566", exp: "8Y", rating: 4.9, load: "85%" },
  { id: "TCH-103", name: "Usman Ghani", subject: "Chemistry", email: "usman@example.com", status: "On Leave", phone: "+92 321 7778899", exp: "5Y", rating: 4.5, load: "0%" },
  { id: "TCH-104", name: "Fatima Ali", subject: "English", email: "fatima.a@example.com", status: "Active", phone: "+92 333 0001122", exp: "10Y", rating: 4.7, load: "78%" },
  { id: "TCH-105", name: "Bilal Raza", subject: "Comp Sci", email: "bilal@example.com", status: "Active", phone: "+92 345 5566778", exp: "4Y", rating: 4.6, load: "95%" },
];

export default function TeachersDirectory() {
  const [selectedCount, setSelectedCount] = useState(0);
  const [quickViewTeacher, setQuickViewTeacher] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("All");

  return (
    <div className="flex flex-col h-full bg-[#FDFDFD] overflow-hidden animate-in fade-in duration-500">
      
      {/* 1. TOP NAV / ACTION BAR */}
      <header className="shrink-0 h-[56px] border-b border-slate-100 bg-white flex items-center justify-between px-6 z-20">
        <div className="flex items-center gap-3">
           <div className="size-8 bg-slate-900 rounded-lg flex items-center justify-center text-white shadow-lg">
              <Users size={16} />
           </div>
           <div className="flex flex-col">
              <h1 className="text-xs font-bold text-slate-800 tracking-tight leading-none uppercase italic">Faculty <span className="text-indigo-600">Registry</span></h1>
              <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1">Operational Node / Staff Log</span>
           </div>
        </div>

        <div className="flex items-center gap-2">
           <Button variant="outline" className="h-8 text-[9px] font-bold uppercase tracking-wider border-slate-200 bg-white">
              <Download size={12} className="mr-2" /> Export Staff
           </Button>
           <Button className="h-8 bg-indigo-600 hover:bg-indigo-700 text-white text-[9px] font-bold uppercase tracking-wider shadow-md active:scale-95 transition-all px-4">
                <UserPlus size={12} className="mr-2" /> Register Faculty
            </Button>
        </div>
      </header>

      {/* 2. SCROLLABLE AREA */}
      <main className="flex-1 overflow-y-auto p-6 scrollbar-hide space-y-6 bg-slate-50/20">
        
        {/* FACULTY KPI SECTION */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
           <PremiumStat label="Active Faculty" value="48" trend="+2" color="#6366f1" icon={<Users size={12}/>}/>
           <PremiumStat label="Teaching Hrs" value="1,240" trend="+12%" color="#10b981" icon={<Clock size={12}/>}/>
           <PremiumStat label="Avg Rating" value="4.8" trend="Top" color="#f59e0b" icon={<Star size={12}/>}/>
           <PremiumStat label="Faculty Load" value="84%" trend="Optimal" color="#8b5cf6" icon={<Zap size={12}/>}/>
        </div>

        {/* TOOLBAR */}
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-2.5 rounded-xl border border-slate-100 shadow-sm">
           <div className="flex bg-slate-50 p-1 rounded-lg border border-slate-100">
              {["All", "Active", "On Leave", "Resigned"].map((tab) => (
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
                <input placeholder="Search faculty node..." className="w-full h-8 pl-9 pr-3 bg-slate-50 border border-slate-200 rounded-lg text-[10px] font-semibold outline-none focus:bg-white focus:ring-2 ring-indigo-50 transition-all placeholder:text-slate-300" />
              </div>
              <Button variant="outline" className="h-8 w-8 p-0 border-slate-200 bg-white"><SlidersHorizontal size={12}/></Button>
           </div>
        </div>

        {/* FACULTY TABLE */}
        <div className="max-w-7xl mx-auto bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden mb-12">
           <table className="w-full text-left">
              <thead>
                 <tr className="bg-slate-50/50 border-b border-slate-100 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                    <th className="px-6 py-4 w-10 text-center"><Checkbox className="rounded-sm" /></th>
                    <th className="px-6 py-4">Faculty Member</th>
                    <th className="px-6 py-4">Subject / Experience</th>
                    <th className="px-6 py-4">Performance Node</th>
                    <th className="px-6 py-4">Lifecycle Status</th>
                    <th className="px-6 py-4 text-right pr-10">Actions</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                 {teachers.map((teacher) => (
                    <tr key={teacher.id} className="group hover:bg-indigo-50/10 transition-all border-l-2 border-transparent hover:border-indigo-600">
                       <td className="px-6 py-3 text-center"><Checkbox className="rounded-sm" /></td>
                       <td className="px-6 py-3">
                          <div className="flex items-center gap-3">
                             <div className="size-8 rounded-lg bg-slate-100 text-slate-400 flex items-center justify-center font-bold text-[10px] border border-slate-200 uppercase group-hover:bg-slate-900 group-hover:text-white transition-all">
                                {teacher.name.substring(0, 2)}
                             </div>
                             <div>
                                <p className="text-[11px] font-bold text-slate-900 leading-none">{teacher.name}</p>
                                <p className="text-[9px] font-medium text-slate-400 mt-1 lowercase tracking-tighter">{teacher.email}</p>
                             </div>
                          </div>
                       </td>
                       <td className="px-6 py-3">
                          <div className="flex flex-col">
                             <span className="text-[10px] font-black text-slate-700 uppercase tracking-tight">{teacher.subject}</span>
                             <span className="text-[9px] font-bold text-indigo-500 mt-1 uppercase tracking-widest">{teacher.exp} EXPERIENCE</span>
                          </div>
                       </td>
                       <td className="px-6 py-3">
                          <div className="flex items-center gap-3">
                             <div className="flex items-center gap-1">
                                <Star size={10} className="text-amber-400 fill-amber-400" />
                                <span className="text-[11px] font-black text-slate-800">{teacher.rating}</span>
                             </div>
                             <div className="w-16 h-1 bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(teacher.rating / 5) * 100}%` }} />
                             </div>
                          </div>
                       </td>
                       <td className="px-6 py-3">
                          <Badge variant="outline" className={cn(
                            "text-[9px] font-bold uppercase py-0 px-2 h-5 border-none",
                            teacher.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                          )}>
                             {teacher.status}
                          </Badge>
                       </td>
                       <td className="px-6 py-3 text-right pr-10">
                          <div className="flex items-center justify-end gap-2">
                             <button 
                                onClick={() => setQuickViewTeacher(teacher)} 
                                className="h-7 w-7 flex items-center justify-center bg-slate-50 border border-slate-100 rounded-md text-slate-400 hover:text-indigo-600 hover:bg-white hover:shadow-sm transition-all"
                             >
                                <Eye size={14}/>
                             </button>
                             
                             <DropdownMenu>
                                <DropdownMenuTrigger className="h-7 w-7 flex items-center justify-center bg-slate-50 border border-slate-100 rounded-md text-slate-400 hover:text-slate-600 hover:bg-white transition-all outline-none focus:ring-0">
                                      <MoreHorizontal size={14}/>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-44 p-1 rounded-xl shadow-xl border-slate-100 bg-white z-[100]">
                                   <DropdownMenuLabel className="text-[8px] font-black uppercase text-slate-400 px-3 py-1.5 tracking-widest">Faculty Protocol</DropdownMenuLabel>
                                   <DropdownMenuItem className="text-[10px] font-bold px-3 py-2 rounded-lg cursor-pointer flex items-center hover:bg-slate-50 outline-none">
                                      <FileSpreadsheet size={13} className="mr-2 text-indigo-500" /> Payroll Details
                                   </DropdownMenuItem>
                                   <DropdownMenuItem className="text-[10px] font-bold px-3 py-2 rounded-lg cursor-pointer flex items-center hover:bg-slate-50 outline-none">
                                      <GraduationCap size={13} className="mr-2 text-indigo-500" /> Assign Class
                                   </DropdownMenuItem>
                                   <DropdownMenuSeparator className="bg-slate-50" />
                                   <DropdownMenuItem className="text-[10px] font-bold px-3 py-2 rounded-lg text-rose-500 hover:text-rose-600 focus:bg-rose-50 cursor-pointer flex items-center outline-none">
                                      <Trash2 size={13} className="mr-2" /> Revoke Access
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

      {/* 3. QUICK VIEW SHEET */}
      <Sheet open={!!quickViewTeacher} onOpenChange={() => setQuickViewTeacher(null)}>
        <SheetContent className="w-[400px] border-l border-slate-100 p-0 overflow-hidden shadow-2xl bg-white">
           <div className="h-24 bg-slate-900 flex items-center px-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-indigo-600 opacity-20" />
              <h3 className="text-white font-black uppercase tracking-widest text-[10px] z-10 italic">Faculty Dossier</h3>
           </div>
           
           <div className="px-8 -mt-8 relative z-20">
              <div className="size-20 rounded-2xl bg-white p-1 shadow-2xl border border-slate-50 mx-auto">
                 <div className="size-full rounded-xl bg-slate-50 flex items-center justify-center text-xl font-black text-slate-300 uppercase leading-none">
                    {quickViewTeacher?.name.substring(0, 2)}
                 </div>
              </div>
              <div className="mt-4 text-center">
                 <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight leading-none">{quickViewTeacher?.name}</h2>
                 <p className="text-[9px] font-bold text-indigo-500 uppercase tracking-widest mt-2">{quickViewTeacher?.subject} Specialist</p>
                 
                 <div className="grid grid-cols-2 gap-3 mt-8 text-left">
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Monthly Pay</p>
                        <p className="text-sm font-black text-slate-900">$3,200.00</p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Teaching Load</p>
                        <p className="text-sm font-black text-emerald-600">{quickViewTeacher?.load}</p>
                    </div>
                 </div>
                 
                 <div className="mt-8 pt-8 border-t border-slate-50 flex flex-col gap-2">
                    <Link href={`/admin/teachers/${quickViewTeacher?.id}`}>
                        <Button className="w-full bg-slate-900 h-11 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg shadow-indigo-50">
                           Analyze Faculty Node
                        </Button>
                    </Link>
                    <Button variant="outline" className="w-full h-11 rounded-xl text-[10px] font-black uppercase tracking-widest border-slate-200">
                       Download Contract Node
                    </Button>
                 </div>
              </div>
           </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

// PREMIUM STAT CARD
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
                <Area type="monotone" dataKey="v" stroke={color} fill={color} fillOpacity={0.05} strokeWidth={2} />
               </AreaChart>
            </ResponsiveContainer>
          </div>
       </div>
       <div className="absolute -bottom-8 -right-8 size-20 bg-indigo-50/50 rounded-full blur-2xl group-hover:bg-indigo-100/80 transition-all duration-500" />
    </div>
  )
}
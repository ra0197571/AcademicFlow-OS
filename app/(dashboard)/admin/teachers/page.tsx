"use client"

import React, { useState } from 'react';
import { 
  Search, Filter, MoreVertical, UserPlus, Mail, Phone, 
  Users, Download, Trash2, MessageSquare, 
  Eye, X, ArrowUpRight, Clock, Star, GraduationCap,
  CheckCircle2
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Sheet, SheetContent, SheetHeader, SheetTitle 
} from "@/components/ui/sheet";
import Link from "next/link";

const teachers = [
  { id: "TCH-101", name: "Zia Khan", subject: "Mathematics", email: "zia@example.com", status: "Active", phone: "+92 300 1112233", exp: "12 Years", rating: 4.8 },
  { id: "TCH-102", name: "Sarah Ahmed", subject: "Physics", email: "sarah@example.com", status: "Active", phone: "+92 301 4445566", exp: "8 Years", rating: 4.9 },
  { id: "TCH-103", name: "Usman Ghani", subject: "Chemistry", email: "usman@example.com", status: "On Leave", phone: "+92 321 7778899", exp: "5 Years", rating: 4.5 },
  { id: "TCH-104", name: "Fatima Ali", subject: "English", email: "fatima.a@example.com", status: "Active", phone: "+92 333 0001122", exp: "10 Years", rating: 4.7 },
  { id: "TCH-105", name: "Bilal Raza", subject: "Comp Sci", email: "bilal@example.com", status: "Active", phone: "+92 345 5566778", exp: "4 Years", rating: 4.6 },
];

export default function TeachersDirectory() {
  const [selectedCount, setSelectedCount] = useState(0);
  const [quickViewTeacher, setQuickViewTeacher] = useState<any>(null);
  const [selectedTab, setSelectedTab] = useState("All");

  return (
    <div className="p-4 space-y-6 animate-in fade-in duration-500 max-w-[1600px] mx-auto relative min-h-screen">
      
      {/* 1. Header Section - Compact */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-5 rounded-[24px] border border-slate-100 shadow-sm">
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Users className="text-indigo-600 size-6" /> Faculty Directory
          </h1>
          <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mt-1">Academic Staff Management</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" size="sm" className="h-9 rounded-lg font-bold text-[10px] uppercase border-slate-100 text-slate-500">
              <Download size={14} className="mr-1.5" /> Export CSV
           </Button>
           <Button className="bg-indigo-600 hover:bg-indigo-700 h-9 rounded-lg font-bold gap-2 shadow-lg shadow-indigo-100 px-5 text-white transition-all active:scale-95">
             <UserPlus size={14} /> <span className="text-[10px] uppercase">Register Teacher</span>
           </Button>
        </div>
      </div>

      {/* 2. Professional Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
         <FacultyStat label="Total Faculty" value="48" trend="+2" color="#4f46e5" icon={<Users size={16}/>} />
         <FacultyStat label="Teaching Hrs" value="1,240" trend="+12%" color="#10b981" icon={<Clock size={16}/>} />
         <FacultyStat label="Attendance" value="98%" trend="Best" color="#8b5cf6" icon={<CheckCircle2 size={16}/>} />
         <FacultyStat label="Avg Rating" value="4.8" trend="Top" color="#f59e0b" icon={<Star size={16}/>} />
      </div>

      {/* 3. Toolbar: Search & Tabs */}
      <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
        <div className="flex p-1 bg-slate-100/50 rounded-xl border border-slate-200 w-full lg:w-auto overflow-x-auto">
           {["All", "Active", "On Leave", "Resigned"].map((t) => (
             <button 
                key={t} 
                onClick={() => setSelectedTab(t)}
                className={`px-5 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${selectedTab === t ? 'bg-white text-indigo-600 shadow-sm ring-1 ring-slate-100' : 'text-slate-400 hover:text-slate-600'}`}
             >
                {t}
             </button>
           ))}
        </div>
        <div className="relative w-full lg:w-80 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors" size={14} />
          <input placeholder="Search by name, subject or ID..." className="w-full pl-10 h-10 rounded-2xl border border-slate-200 bg-white focus:ring-4 focus:ring-indigo-50 outline-none text-[11px] font-medium transition-all shadow-sm" />
        </div>
      </div>

      {/* 4. Teachers Table - Premium Style */}
      <Card className="border-slate-200 shadow-sm rounded-[32px] overflow-hidden bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/30 border-b border-slate-100 text-[10px] uppercase font-black text-slate-400 tracking-widest">
                <th className="p-5 pl-8 w-10"><Checkbox className="rounded-md border-slate-300" /></th>
                <th className="p-5">Faculty Member</th>
                <th className="p-5">Subject / Exp</th>
                <th className="p-5">Performance</th>
                <th className="p-5">Status</th>
                <th className="p-5 text-right pr-8">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {teachers.map((teacher) => (
                <tr key={teacher.id} className="group hover:bg-indigo-50/20 transition-all duration-300">
                  <td className="p-5 pl-8 w-10"><Checkbox onCheckedChange={(c) => setSelectedCount(prev => c ? prev + 1 : prev - 1)} className="rounded-md border-slate-300" /></td>
                  <td className="p-5">
                    {/* --- SUB-PAGE LINK ON NAME/AVATAR --- */}
                    <Link href={`/admin/teachers/${teacher.id}`} className="flex items-center gap-4 cursor-pointer group/link">
                       <div className="size-10 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 font-bold text-xs group-hover/link:scale-110 group-hover/link:bg-indigo-100 group-hover/link:text-indigo-600 transition-all border border-slate-200 shadow-sm">
                          {teacher.name.substring(0, 2).toUpperCase()}
                       </div>
                       <div>
                          <p className="font-bold text-slate-800 text-xs group-hover/link:text-indigo-600 transition-colors">{teacher.name}</p>
                          <p className="text-[10px] text-slate-400 font-medium mt-0.5">{teacher.email}</p>
                       </div>
                    </Link>
                  </td>
                  <td className="p-5">
                     <p className="font-black text-slate-700 text-[10px] tracking-tight">{teacher.subject}</p>
                     <p className="text-[9px] text-indigo-500 font-bold uppercase mt-0.5">{teacher.exp} Experience</p>
                  </td>
                  <td className="p-5">
                     <div className="flex items-center gap-1">
                        <Star size={12} className="text-amber-400 fill-amber-400" />
                        <span className="text-xs font-black text-slate-700">{teacher.rating}</span>
                     </div>
                  </td>
                  <td className="p-5">
                     <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest shadow-sm ${
                       teacher.status === 'Active' ? 'bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100' : 'bg-amber-50 text-amber-600 ring-1 ring-amber-100'
                     }`}>
                        {teacher.status}
                     </span>
                  </td>
                  <td className="p-5 text-right pr-8">
                     <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => setQuickViewTeacher(teacher)} className="p-2 hover:bg-white rounded-lg text-slate-400 hover:text-indigo-600 transition-all hover:shadow-sm" title="Quick View"><Eye size={14}/></button>
                        
                        {/* --- SUB-PAGE LINK ON FULL PROFILE ICON --- */}
                        <Link href={`/admin/teachers/${teacher.id}`}>
                           <button className="p-2 hover:bg-white rounded-lg text-slate-400 hover:text-indigo-600 transition-all hover:shadow-sm" title="Full Profile">
                              <ArrowUpRight size={14}/>
                           </button>
                        </Link>

                        <button className="p-2 hover:bg-white rounded-lg text-slate-400 transition-all"><MoreVertical size={14}/></button>
                     </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* 5. Floating Bulk Actions Bar */}
      {selectedCount > 0 && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-6 animate-in slide-in-from-bottom-10 z-50 ring-1 ring-white/10">
           <p className="text-xs font-bold text-slate-400"><span className="text-white">{selectedCount}</span> Selected</p>
           <div className="h-4 w-px bg-slate-700" />
           <div className="flex gap-4">
              <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest hover:text-indigo-400 transition-colors"><MessageSquare size={14}/> Notify</button>
              <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest hover:text-indigo-400 transition-colors"><Download size={14}/> Export</button>
              <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-rose-400 hover:text-rose-300 transition-colors"><Trash2 size={14}/> Remove</button>
           </div>
           <button onClick={() => setSelectedCount(0)} className="p-1 hover:bg-slate-800 rounded-full transition-colors"><X size={14}/></button>
        </div>
      )}

      {/* 6. Quick View Side-Sheet */}
      <Sheet open={!!quickViewTeacher} onOpenChange={() => setQuickViewTeacher(null)}>
        <SheetContent className="w-[400px] sm:w-[540px] p-0 border-l border-slate-100">
           <div className="h-32 bg-slate-900 w-full" />
           <div className="px-8 pb-8">
              <div className="size-24 rounded-[28px] bg-white p-1 -mt-12 shadow-xl border border-slate-50 mx-auto">
                 <div className="size-full rounded-[24px] bg-indigo-50 flex items-center justify-center text-2xl font-black text-indigo-600 uppercase">{quickViewTeacher?.name.substring(0,2)}</div>
              </div>
              <div className="text-center mt-4">
                 <h2 className="text-xl font-black text-slate-900">{quickViewTeacher?.name}</h2>
                 <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">{quickViewTeacher?.subject} • {quickViewTeacher?.exp} Exp</p>
                 
                 <div className="mt-8 space-y-4 text-left">
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center">
                       <div>
                          <p className="text-[9px] font-black text-slate-400 uppercase leading-none mb-1.5">Monthly Base Pay</p>
                          <p className="text-lg font-black text-slate-800 tracking-tight">$3,200.00</p>
                       </div>
                       <Badge className="bg-emerald-50 text-emerald-600 border-none font-black text-[10px]">PAID</Badge>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                       <p className="text-[9px] font-black text-slate-400 uppercase mb-3">Load Details</p>
                       <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className="bg-white border-slate-200 text-[9px] font-bold text-slate-500">Grade 9-A (Math)</Badge>
                          <Badge variant="outline" className="bg-white border-slate-200 text-[9px] font-bold text-slate-500">Grade 10-B (Math)</Badge>
                       </div>
                    </div>
                 </div>

                 {/* Full profile button in side sheet */}
                 <Link href={`/admin/teachers/${quickViewTeacher?.id}`} className="block mt-8">
                    <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold py-6 shadow-lg shadow-indigo-100 transition-all active:scale-95">Go to Faculty Profile</Button>
                 </Link>
              </div>
           </div>
        </SheetContent>
      </Sheet>

    </div>
  );
}

// Sub-component
function FacultyStat({ label, value, trend, color, icon }: any) {
  return (
    <div className="p-5 rounded-[28px] bg-white border border-slate-100 shadow-sm flex items-center justify-between group hover:border-indigo-100 transition-all">
       <div>
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
          <div className="flex items-baseline gap-2">
             <p className="text-xl font-black text-slate-900">{value}</p>
             <span className="text-[9px] font-black text-emerald-500 bg-emerald-50 px-1.5 py-0.5 rounded-md">{trend}</span>
          </div>
       </div>
       <div className={`p-3 rounded-2xl bg-slate-50 text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all shadow-sm`}>
          {icon}
       </div>
    </div>
  )
}
"use client"

import React, { useState } from 'react';
import { 
  Search, Filter, MoreVertical, UserPlus, Mail, Phone, 
  GraduationCap, Download, Trash2, MessageSquare, 
  CheckCircle2, Eye, X, ArrowUpRight, MoreHorizontal
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription 
} from "@/components/ui/sheet"; // Shadcn Sheet for Quick View
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import Link from "next/link";

const students = [
  { id: "STU-001", name: "Ahmed Malik", class: "9th-A", email: "ahmed@example.com", status: "Active", phone: "+92 300 1234567", date: "12 July 2024" },
  { id: "STU-002", name: "Fatima Khan", class: "10th-B", email: "fatima@example.com", status: "Active", phone: "+92 301 7654321", date: "10 July 2024" },
  { id: "STU-003", name: "Ali Hassan", class: "9th-A", email: "ali@example.com", status: "Inactive", phone: "+92 321 9876543", date: "05 July 2024" },
  { id: "STU-004", name: "Zainab Bibi", class: "11th-C", email: "zainab@example.com", status: "Active", phone: "+92 333 1122334", date: "01 July 2024" },
  { id: "STU-005", name: "Bilal Raza", class: "12th-A", email: "bilal@example.com", status: "Pending", phone: "+92 345 5566778", date: "28 June 2024" },
];

export default function StudentsDirectory() {
  const [selectedCount, setSelectedCount] = useState(0);
  const [quickViewStudent, setQuickViewStudent] = useState<any>(null);

  return (
    <div className="p-4 space-y-6 animate-in fade-in duration-500 max-w-[1600px] mx-auto relative min-h-screen">
      
      {/* 1. Top Header */}
      <div className="flex justify-between items-center bg-white p-5 rounded-[24px] border border-slate-100 shadow-sm">
        <div>
          <h1 className="text-xl font-black text-slate-900 flex items-center gap-2 tracking-tight">
            <GraduationCap className="text-indigo-600 size-6" /> Students Management
          </h1>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Real-time student database</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" size="sm" className="h-9 rounded-lg font-bold text-[10px] uppercase border-slate-100">
              <Download size={14} className="mr-1.5" /> Export Data
           </Button>
           <Button className="bg-indigo-600 hover:bg-indigo-700 h-9 rounded-lg font-bold gap-2 shadow-lg shadow-indigo-100 px-5 text-white active:scale-95 transition-all">
             <UserPlus size={14} /> <span className="text-[10px] uppercase">New Admission</span>
           </Button>
        </div>
      </div>

      {/* 2. Advanced Stats with Sparklines */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
         <SparklineStat label="Total Enrolled" value="1,240" trend="+12%" color="#4f46e5" />
         <SparklineStat label="Active Now" value="1,195" trend="+5%" color="#10b981" />
         <SparklineStat label="On Leave" value="14" trend="-2%" color="#f59e0b" />
         <SparklineStat label="New Apps" value="28" trend="+18%" color="#8b5cf6" />
      </div>

      {/* 3. Toolbar: Tabs & Search */}
      <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
        <div className="flex p-1 bg-slate-100/50 rounded-xl border border-slate-200 w-full lg:w-auto">
           {["All", "Active", "Inactive", "Pending"].map((t) => (
             <button key={t} className={`px-5 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${t === 'All' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}>{t}</button>
           ))}
        </div>
        <div className="relative w-full lg:w-80 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors" size={14} />
          <input placeholder="Search by name, roll no, or phone..." className="w-full pl-10 h-10 rounded-2xl border border-slate-200 bg-white focus:ring-4 focus:ring-indigo-50 outline-none text-[11px] font-medium transition-all" />
        </div>
      </div>

      {/* 4. Interactive Table */}
      <Card className="border-slate-200 shadow-sm rounded-[32px] overflow-hidden bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/30 border-b border-slate-100">
                <th className="p-5 pl-8 w-10"><Checkbox onCheckedChange={(c) => setSelectedCount(c ? students.length : 0)} className="rounded-md border-slate-300" /></th>
                <th className="p-5 text-[10px] uppercase font-black text-slate-400 tracking-widest">Student Details</th>
                <th className="p-5 text-[10px] uppercase font-black text-slate-400 tracking-widest">Grade</th>
                <th className="p-5 text-[10px] uppercase font-black text-slate-400 tracking-widest">Status</th>
                <th className="p-5 text-[10px] uppercase font-black text-slate-400 tracking-widest text-right pr-8">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {students.map((student) => (
                <tr key={student.id} className="group hover:bg-indigo-50/20 transition-all duration-300">
                  <td className="p-5 pl-8 w-10"><Checkbox onCheckedChange={(c) => setSelectedCount(prev => c ? prev + 1 : prev - 1)} className="rounded-md border-slate-300" /></td>
                  <td className="p-5">
                    <div className="flex items-center gap-4">
                       <div className="size-10 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 font-bold text-xs group-hover:scale-110 transition-all border border-slate-200">
                          {student.name.split(' ').map(n => n[0]).join('')}
                       </div>
                       <div>
                          <p className="font-bold text-slate-800 text-xs">{student.name}</p>
                          <p className="text-[10px] text-slate-400 font-medium">{student.id}</p>
                       </div>
                    </div>
                  </td>
                  <td className="p-5">
                     <Badge variant="secondary" className="text-[9px] font-black bg-indigo-50 text-indigo-600 border-none rounded-md">{student.class}</Badge>
                  </td>
                  <td className="p-5">
                     <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest shadow-sm ${student.status === 'Active' ? 'bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100' : 'bg-rose-50 text-rose-600 ring-1 ring-rose-100'}`}>{student.status}</span>
                  </td>
                  <td className="p-5 text-right pr-8">
                     <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => setQuickViewStudent(student)} className="p-2 hover:bg-white rounded-lg text-slate-400 hover:text-indigo-600 transition-all shadow-none hover:shadow-sm" title="Quick View"><Eye size={14}/></button>
                        <Link href={`/admin/students/${student.id}`}><button className="p-2 hover:bg-white rounded-lg text-slate-400 hover:text-indigo-600 transition-all shadow-none hover:shadow-sm" title="Full Profile"><ArrowUpRight size={14}/></button></Link>
                        <button className="p-2 hover:bg-white rounded-lg text-slate-400 transition-all"><MoreHorizontal size={14}/></button>
                     </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* 5. Floating Bulk Actions Bar (NEW) */}
      {selectedCount > 0 && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-6 animate-in slide-in-from-bottom-10 z-50">
           <p className="text-xs font-bold text-slate-400"><span className="text-white">{selectedCount}</span> Selected</p>
           <div className="h-4 w-px bg-slate-700" />
           <div className="flex gap-4">
              <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest hover:text-indigo-400 transition-colors"><MessageSquare size={14}/> SMS</button>
              <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest hover:text-indigo-400 transition-colors"><Download size={14}/> PDF</button>
              <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-rose-400 hover:text-rose-300 transition-colors"><Trash2 size={14}/> Delete</button>
           </div>
           <button onClick={() => setSelectedCount(0)} className="p-1 hover:bg-slate-800 rounded-full transition-colors"><X size={14}/></button>
        </div>
      )}

      {/* 6. Quick View Side-Sheet (NEW) */}
      <Sheet open={!!quickViewStudent} onOpenChange={() => setQuickViewStudent(null)}>
        <SheetContent className="w-[400px] sm:w-[540px] p-0 border-l border-slate-100">
           <div className="h-32 bg-indigo-600 w-full" />
           <div className="px-8 pb-8">
              <div className="size-24 rounded-[28px] bg-white p-1 -mt-12 shadow-xl border border-slate-50 mx-auto">
                 <div className="size-full rounded-[24px] bg-slate-100 flex items-center justify-center text-2xl font-black text-slate-400 uppercase">{quickViewStudent?.name.substring(0,2)}</div>
              </div>
              <div className="text-center mt-4">
                 <h2 className="text-xl font-black text-slate-900">{quickViewStudent?.name}</h2>
                 <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">{quickViewStudent?.id} • {quickViewStudent?.class}</p>
                 <div className="mt-6 grid grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 rounded-2xl text-left">
                       <p className="text-[9px] font-black text-slate-400 uppercase">Attendance</p>
                       <p className="text-lg font-black text-slate-800">96.4%</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-2xl text-left">
                       <p className="text-[9px] font-black text-slate-400 uppercase">Behavior</p>
                       <p className="text-lg font-black text-emerald-600">Excellent</p>
                    </div>
                 </div>
                 <Link href={`/admin/students/${quickViewStudent?.id}`} className="block mt-8">
                    <Button className="w-full bg-slate-900 text-white rounded-xl font-bold py-6">View Full Performance Report</Button>
                 </Link>
              </div>
           </div>
        </SheetContent>
      </Sheet>

    </div>
  );
}

// Sparkline Stat Component (Impressive UX)
function SparklineStat({ label, value, trend, color }: any) {
  const data = [{ v: 10 }, { v: 25 }, { v: 15 }, { v: 45 }, { v: 35 }, { v: 55 }];
  return (
    <div className="p-5 rounded-[28px] bg-white border border-slate-100 shadow-sm flex items-center justify-between group hover:border-indigo-100 transition-all">
       <div>
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
          <div className="flex items-baseline gap-2">
             <p className="text-xl font-black text-slate-900">{value}</p>
             <span className="text-[9px] font-black text-emerald-500 bg-emerald-50 px-1.5 py-0.5 rounded-md">{trend}</span>
          </div>
       </div>
       <div className="w-16 h-10 opacity-50 group-hover:opacity-100 transition-opacity">
          <ResponsiveContainer width="100%" height="100%">
             <AreaChart data={data}><Area type="monotone" dataKey="v" stroke={color} fill={color} fillOpacity={0.1} strokeWidth={2} /></AreaChart>
          </ResponsiveContainer>
       </div>
    </div>
  )
}
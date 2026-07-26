"use client"

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar as CalendarIcon, Clock, Plus, 
  MoreHorizontal, Download, Sparkles,
  MapPin, Settings2, History, AlertCircle, BookOpen, User
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// --- TYPES ---
interface SlotData {
  subject: string;
  teacher: string;
  room: string;
  type: 'lecture' | 'lab' | 'break' | 'test';
}

interface TimeSlot {
  time: string;
  days: {
    [key: string]: SlotData;
  }
}

const SCHEDULE: TimeSlot[] = [
  { 
    time: "08:00 - 09:00", 
    days: {
      mon: { subject: "Mathematics", teacher: "Zia Khan", room: "Node 101", type: 'lecture' },
      tue: { subject: "Physics", teacher: "Sarah A.", room: "Lab 02", type: 'lecture' },
      wed: { subject: "Urdu", teacher: "Fatima", room: "Node 105", type: 'lecture' },
      thu: { subject: "Math", teacher: "Zia Khan", room: "Node 101", type: 'lecture' },
      fri: { subject: "English", teacher: "Usman G.", room: "Hall B", type: 'lecture' },
      sat: { subject: "Revision", teacher: "System", room: "Online", type: 'test' },
    }
  },
  { 
    time: "09:00 - 10:00", 
    days: {
      mon: { subject: "Physics", teacher: "Sarah A.", room: "Node 102", type: 'lecture' },
      tue: { subject: "Math", teacher: "Zia Khan", room: "Node 101", type: 'lecture' },
      wed: { subject: "English", teacher: "Usman G.", room: "Node 104", type: 'lecture' },
      thu: { subject: "Physics", teacher: "Sarah A.", room: "Lab 01", type: 'lecture' },
      fri: { subject: "Islamiyat", teacher: "Ahmed", room: "Node 108", type: 'lecture' },
      sat: { subject: "Weekly Test", teacher: "Admin", room: "Exam Hall", type: 'test' },
    }
  },
  { 
    time: "10:00 - 10:30", 
    days: {
      mon: { subject: "BREAK", teacher: "", room: "Café", type: 'break' },
      tue: { subject: "BREAK", teacher: "", room: "Café", type: 'break' },
      wed: { subject: "BREAK", teacher: "", room: "Café", type: 'break' },
      thu: { subject: "BREAK", teacher: "", room: "Café", type: 'break' },
      fri: { subject: "BREAK", teacher: "", room: "Café", type: 'break' },
      sat: { subject: "BREAK", teacher: "", room: "Café", type: 'break' },
    } 
  },
];

export default function EliteTimetableMatrix() {
  const [mounted, setMounted] = useState(false);
  const [activeClass, setActiveClass] = useState('Grade 9-Alpha');

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <div className="p-4 lg:p-8 space-y-8 animate-in fade-in duration-700 max-w-[1800px] mx-auto overflow-x-hidden">
      
      {/* 1. HEADER */}
      <header className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 bg-white p-6 rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/40 relative overflow-hidden">
        <div className="space-y-2 relative z-10">
          <div className="flex items-center gap-3">
            <Badge className="bg-indigo-600 text-white border-none font-black text-[9px] tracking-widest px-2 py-0.5">MATRIX v4.0</Badge>
            <div className="flex items-center gap-1.5 text-slate-400 font-bold text-[10px] uppercase tracking-widest">
               <div className="size-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live Node Sync
            </div>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter leading-none italic">Master <span className="text-indigo-600">Scheduling</span></h1>
        </div>

        <div className="flex flex-wrap items-center gap-3 relative z-10">
           <Button variant="outline" className="h-10 rounded-xl border-slate-200 text-[10px] font-black uppercase tracking-widest gap-2">
              <Download size={16} /> Export
           </Button>
           <Button className="bg-slate-900 hover:bg-indigo-600 shadow-xl h-10 rounded-xl font-black uppercase text-[10px] gap-2 tracking-widest px-6 transition-all">
              <Plus size={18} strokeWidth={3} /> New Slot
           </Button>
        </div>
      </header>

      {/* 2. CLASS SELECTOR */}
      <div className="flex gap-2 bg-white/80 backdrop-blur-xl p-1.5 rounded-2xl border border-slate-200 shadow-sm overflow-x-auto">
         {['Grade 9-Alpha', 'Grade 9-Beta', 'Grade 10-A', 'Grade 11-C'].map((cls) => (
           <button 
              key={cls}
              onClick={() => setActiveClass(cls)}
              className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeClass === cls ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
           >
              {cls}
           </button>
         ))}
      </div>

      {/* 3. THE MASTER GRID */}
      <Card className="border-none shadow-2xl rounded-[40px] bg-white overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[1200px]">
            <thead>
              <tr className="bg-slate-50/50 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] border-b border-slate-100">
                <th className="p-6 border-r border-slate-100 w-44">Time Slot</th>
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
                  <th key={day} className="p-6 text-center">{day}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {SCHEDULE.map((row, i) => (
                <tr key={i} className="group">
                  <td className="p-6 border-r border-slate-50 bg-slate-50/20">
                    <div className="flex items-center gap-3">
                       <div className="p-2 bg-white rounded-lg shadow-sm text-indigo-600 border border-slate-100"><Clock size={16} /></div>
                       <div>
                          <p className="text-xs font-black text-slate-900 leading-none mb-1">{row.time}</p>
                          <Badge variant="outline" className="text-[7px] font-black border-none bg-indigo-50 text-indigo-400 px-1 py-0">SYNCED</Badge>
                       </div>
                    </div>
                  </td>
                  
                  {['mon', 'tue', 'wed', 'thu', 'fri', 'sat'].map((day) => {
                    const data = row.days[day];
                    if (!data) return <td key={day} className="p-2"></td>;

                    return (
                      <td key={day} className="p-3 min-w-[200px]">
                        <motion.div 
                           whileHover={{ y: -2 }}
                           className={`p-4 rounded-[24px] border transition-all cursor-default ${
                              data.type === 'break' 
                              ? 'bg-slate-50 border-dashed border-slate-200 text-center py-6' 
                              : 'bg-white border-slate-100 shadow-sm hover:border-indigo-200 hover:shadow-xl'
                           }`}
                        >
                           {data.type === 'break' ? (
                              <div className="opacity-60">
                                 <span className="text-[10px] font-black tracking-widest uppercase text-slate-400">{data.subject}</span>
                              </div>
                           ) : (
                              /* FIXED: Clean nested structure here */
                              <div className="space-y-3">
                                 <div className="flex justify-between items-start">
                                    <Badge className={`text-[8px] font-black border-none px-1.5 py-0 rounded-md ${
                                       data.type === 'lecture' ? 'bg-indigo-50 text-indigo-600' : 'bg-amber-50 text-amber-600'
                                    }`}>
                                       {data.type.toUpperCase()}
                                    </Badge>
                                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">{data.room}</span>
                                 </div>
                                 <h3 className="text-[13px] font-black text-slate-800 leading-tight transition-colors uppercase">{data.subject}</h3>
                                 <div className="flex items-center justify-between border-t border-slate-50 pt-3">
                                    <div className="flex items-center gap-2">
                                       <Avatar className="size-6 border-2 border-white shadow-sm">
                                          <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${data.teacher}`} />
                                          <AvatarFallback className="text-[7px] font-bold">T</AvatarFallback>
                                       </Avatar>
                                       <p className="text-[10px] font-bold text-slate-400">{data.teacher}</p>
                                    </div>
                                    <MoreHorizontal size={14} className="text-slate-300 hover:text-indigo-600" />
                                 </div>
                              </div>
                           )}
                        </motion.div>
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* 4. FOOTER STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-20">
         <div className="p-6 bg-white rounded-[32px] border border-slate-100 shadow-sm flex items-center gap-5">
            <div className="p-4 bg-indigo-50 rounded-2xl text-indigo-600"><User size={20}/></div>
            <div><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Faculty Load</p><p className="text-lg font-black text-slate-900">12 Nodes Active</p></div>
         </div>
         <div className="p-6 bg-white rounded-[32px] border border-slate-100 shadow-sm flex items-center gap-5">
            <div className="p-4 bg-emerald-50 rounded-2xl text-emerald-600"><BookOpen size={20}/></div>
            <div><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Slots</p><p className="text-lg font-black text-slate-900">42 Sessions / Week</p></div>
         </div>
         <div className="p-6 bg-white rounded-[32px] border border-slate-100 shadow-sm flex items-center gap-5">
            <div className="p-4 bg-amber-50 rounded-2xl text-amber-600"><AlertCircle size={20}/></div>
            <div><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">System Health</p><p className="text-lg font-black text-slate-900">Zero Clashes</p></div>
         </div>
      </div>

    </div>
  );
}
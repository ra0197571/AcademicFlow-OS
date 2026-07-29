"use client"

import React, { useState, useEffect } from 'react';
import { 
  Plus, Search, MoreHorizontal, Layers, GraduationCap, Clock, Filter, 
  BookOpen, ArrowUpRight, Target, TrendingUp, LayoutGrid, Database, 
  FileText, Settings, Download, Globe, Microscope, Monitor, Book
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid 
} from "recharts";
import { cn } from "@/lib/utils";

// --- MOCK DATA ---
const subjects = [
  { id: "1", name: "Advanced Mathematics", code: "MTH-401", stream: 'Science', teacher: "Zia Khan", load: 8, students: 142, progress: 65, trend: [{v: 30}, {v: 45}, {v: 40}, {v: 65}] },
  { id: "2", name: "Quantum Physics", code: "PHY-302", stream: 'Science', teacher: "Sarah Ahmed", load: 6, students: 98, progress: 40, trend: [{v: 10}, {v: 20}, {v: 25}, {v: 40}] },
  { id: "3", name: "Modern Computing", code: "CS-505", stream: 'Tech', teacher: "Bilal Raza", load: 7, students: 120, progress: 85, trend: [{v: 50}, {v: 60}, {v: 75}, {v: 85}] },
  { id: "4", name: "English Literature", code: "ENG-101", stream: 'Language', teacher: "Fatima Ali", load: 5, students: 200, progress: 92, trend: [{v: 70}, {v: 80}, {v: 85}, {v: 92}] },
  { id: "5", name: "Organic Chemistry", code: "CHM-202", stream: 'Science', teacher: "Usman Ghani", load: 6, students: 110, progress: 30, trend: [{v: 10}, {v: 15}, {v: 25}, {v: 30}] },
];

export default function EliteSubjectManagement() {
  const [activeStream, setActiveStream] = useState('All');
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC] overflow-hidden animate-in fade-in duration-500 font-sans">
      
      {/* 1. COMPACT HEADER (Dashboard Style) */}
      <header className="shrink-0 h-[64px] border-b border-slate-100 bg-white flex items-center justify-between px-6 z-20">
        <div className="flex flex-col">
            <div className="flex items-center gap-2 text-[10px] font-bold text-indigo-600 uppercase tracking-widest leading-none">
                ACADEMIC INTELLIGENCE <span className="text-slate-300">•</span> <span className="text-slate-400">SESSION 2026</span>
            </div>
            <h1 className="text-lg font-black text-slate-900 tracking-tight mt-1 uppercase italic">
                Curriculum <span className="text-indigo-600">Architecture</span>
            </h1>
        </div>

        <div className="flex items-center gap-3">
           <Button variant="outline" className="h-9 px-4 rounded-xl text-[11px] font-bold uppercase tracking-wider border-slate-200 bg-white flex gap-2">
              <Download size={14} /> Export
           </Button>
           <Button className="h-9 bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-bold uppercase tracking-wider shadow-lg shadow-indigo-100 transition-all px-5 rounded-xl flex gap-2">
                <Plus size={14} strokeWidth={3} /> New Module
            </Button>
        </div>
      </header>

      {/* 2. SCROLLABLE AREA */}
      <main className="flex-1 overflow-y-auto p-6 scrollbar-hide space-y-6">
        
        {/* DASHBOARD-STYLE KPI ROW (Matching your Dashboard Image) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-[1600px] mx-auto">
           <DashStat label="Total Modules" value="14" trend="+2 New" color="indigo" icon={<Layers size={14}/>}/>
           <DashStat label="Avg Progress" value="72.4%" trend="+4.2%" color="emerald" icon={<Target size={14}/>}/>
           <DashStat label="Weekly Load" value="42 Hrs" trend="+8.6%" color="blue" icon={<Clock size={14}/>}/>
           <DashStat label="Lead Faculty" value="09" trend="+1.2%" color="purple" icon={<GraduationCap size={14}/>}/>
           <DashStat label="Active Nodes" value="1,840" trend="+2 Active" color="orange" icon={<Monitor size={14}/>}/>
           <DashStat label="Success Rate" value="94%" trend="+3.5%" color="rose" icon={<TrendingUp size={14}/>}/>
        </div>

        {/* TOOLBAR (Dashboard Style) */}
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row gap-4 items-center justify-between">
           <div className="flex bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
              {['All', 'Science', 'Tech', 'Arts', 'Language'].map((stream) => (
                <button 
                    key={stream}
                    onClick={() => setActiveStream(stream)}
                    className={cn(
                        "px-5 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all",
                        activeStream === stream ? "bg-indigo-600 text-white shadow-md" : "text-slate-400 hover:text-slate-600"
                    )}
                >
                    {stream}
                </button>
              ))}
           </div>

           <div className="flex items-center gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:w-80 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors" size={14} />
                <input placeholder="Search curriculum records..." className="w-full h-10 pl-11 pr-4 bg-white border border-slate-200 rounded-2xl text-[11px] font-bold outline-none focus:ring-4 ring-indigo-50 transition-all shadow-sm" />
              </div>
              <Button variant="outline" className="h-10 w-10 p-0 border-slate-200 bg-white rounded-2xl"><Filter size={14}/></Button>
           </div>
        </div>

        {/* SUBJECT GRID (Clean Dashboard Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-[1600px] mx-auto pb-12">
          {subjects.map((sub) => (
            <SubjectNodeCard key={sub.id} subject={sub} />
          ))}
        </div>
      </main>
    </div>
  );
}

// --- DASHBOARD STYLE STAT COMPONENT ---
function DashStat({ label, value, trend, color, icon }: any) {
    const colors: any = {
        indigo: "bg-indigo-50 text-indigo-600",
        emerald: "bg-emerald-50 text-emerald-600",
        blue: "bg-blue-50 text-blue-600",
        purple: "bg-purple-50 text-purple-600",
        orange: "bg-orange-50 text-orange-600",
        rose: "bg-rose-50 text-rose-600",
    }
    return (
        <Card className="p-4 rounded-[20px] bg-white border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-all h-[130px]">
            <div className="flex justify-between items-start w-full">
                <div className={cn("p-2.5 rounded-xl shadow-sm", colors[color])}>{icon}</div>
                <span className={cn("text-[9px] font-black px-1.5 py-0.5 rounded-md", colors[color])}>{trend}</span>
            </div>
            <div className="mt-2">
                <p className="text-2xl font-black text-slate-900 tracking-tighter leading-none">{value}</p>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-2">{label}</p>
            </div>
        </Card>
    )
}

// --- CLEAN SUBJECT CARD (Matching Dashboard Style) ---
function SubjectNodeCard({ subject }: { subject: any }) {
  return (
    <Card className="border-slate-200 shadow-sm rounded-[32px] bg-white overflow-hidden group hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-100/50 transition-all flex flex-col h-full font-sans">
       <div className="p-8 space-y-6 flex-1">
          <div className="flex justify-between items-start">
             <div className="flex items-center gap-4">
                <div className="size-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-inner">
                   <BookOpen size={20} />
                </div>
                <div>
                   <h3 className="text-[14px] font-black text-slate-800 uppercase tracking-tight leading-none group-hover:text-indigo-600 transition-colors">{subject.name}</h3>
                   <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className="text-[9px] font-bold border-slate-100 bg-white text-indigo-500 py-0 px-2 uppercase">{subject.code}</Badge>
                      <span className="text-[9px] font-black text-slate-300 uppercase tracking-tighter">{subject.stream} Node</span>
                   </div>
                </div>
             </div>
             <button className="text-slate-300 hover:text-slate-600"><MoreHorizontal size={18}/></button>
          </div>

          <div className="flex items-center gap-6 bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
             <div className="flex-1 space-y-2">
                <div className="flex justify-between text-[9px] font-black text-slate-400 uppercase tracking-widest">
                   <span>Coverage Depth</span>
                   <span className="text-indigo-600">{subject.progress}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-600 rounded-full transition-all duration-1000" style={{ width: `${subject.progress}%` }} />
                </div>
             </div>
             <div className="w-16 h-10 shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                   <AreaChart data={subject.trend}>
                      <Area type="monotone" dataKey="v" stroke="#6366f1" fill="#6366f1" fillOpacity={0.1} strokeWidth={2.5} />
                   </AreaChart>
                </ResponsiveContainer>
             </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="text-center p-3 bg-white border border-slate-100 rounded-2xl">
                <p className="text-[8px] font-black text-slate-300 uppercase mb-1">Load / Week</p>
                <p className="text-[12px] font-black text-slate-800 tracking-tight">{subject.load} Sessions</p>
             </div>
             <div className="text-center p-3 bg-white border border-slate-100 rounded-2xl">
                <p className="text-[8px] font-black text-slate-300 uppercase mb-1">Students</p>
                <p className="text-[12px] font-black text-slate-800 tracking-tight">{subject.students} Enrolled</p>
             </div>
          </div>
       </div>

       <div className="p-5 pt-0 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="size-8 rounded-full bg-indigo-50 border-2 border-white shadow-sm flex items-center justify-center text-[10px] font-black text-indigo-600">
                {subject.teacher.substring(0,1)}
             </div>
             <div className="leading-none">
                <p className="text-[8px] font-bold text-slate-400 uppercase">Lead Chief</p>
                <p className="text-[10px] font-black text-slate-700">{subject.teacher}</p>
             </div>
          </div>
          <Button variant="ghost" className="h-9 px-4 rounded-xl text-[10px] font-black uppercase text-indigo-600 hover:bg-indigo-50 tracking-widest gap-2 group/btn">
             Audit Node <ArrowUpRight size={14} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-all" />
          </Button>
       </div>
    </Card>
  )
}
"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Search, MoreHorizontal, ListTodo, Clock, CheckCircle2, 
  AlertCircle, Timer, History, Zap, Database, Flag, 
  BarChart3, TrendingUp, Filter, Download, ArrowUpRight,
  Target, Activity, MousePointer2, ShieldCheck, Terminal, Server, Wifi
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, 
  PieChart, Pie, Cell 
} from "recharts";
import { cn } from "@/lib/utils";

// --- MOCK DATA ---
const taskVelocity = [
  { day: 'M', completed: 30 }, { day: 'T', completed: 55 },
  { day: 'W', completed: 45 }, { day: 'T', completed: 80 },
  { day: 'F', completed: 65 }, { day: 'S', completed: 92 },
];

const priorityData = [
  { name: 'High', value: 30, color: '#f43f5e' },
  { name: 'Mid', value: 50, color: '#6366f1' },
  { name: 'Low', value: 20, color: '#94a3b8' },
];

const taskMatrix = [
  { id: "TSK-01", title: "Grade 9-A Math Papers", desc: "Evaluate final term integration sheets.", priority: "High", due: "Today", stage: "To-Do" },
  { id: "TSK-02", title: "Update Physics Syllabus", desc: "Sync Unit 04 with global cloud node.", priority: "Medium", due: "12 July", stage: "In-Progress" },
  { id: "TSK-03", title: "Parent-Teacher Sync", desc: "Discuss node performance.", priority: "High", due: "Tomorrow", stage: "To-Do" },
];

const STAGES = ["To-Do", "In-Progress", "Review", "Completed"];

export default function FacultyTaskMatrix() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <div className="flex flex-col h-full bg-[#FDFDFD] overflow-hidden animate-in fade-in duration-700 font-sans relative text-slate-900 text-left">
      
      {/* 1. TOP COMMAND HEADER */}
      <header className="shrink-0 h-[56px] border-b border-slate-100 bg-white flex items-center justify-between px-6 z-20">
        <div className="flex flex-col text-left">
            <div className="flex items-center gap-2 text-[9px] font-bold text-indigo-600 uppercase tracking-widest leading-none px-0.5">
                PRODUCTIVITY HUB <span className="text-slate-300">•</span> <span className="text-slate-400 font-bold uppercase">Task_Engine</span>
            </div>
            <h1 className="text-sm font-black text-slate-900 tracking-tight mt-1 uppercase italic leading-none">
                Faculty <span className="text-indigo-600 not-italic font-bold ml-1 text-xs px-1">Task Matrix</span>
            </h1>
        </div>

        <div className="flex items-center gap-2">
           <Button variant="outline" className="h-8 text-[9px] font-bold uppercase tracking-wider border-slate-200 bg-white">
              <Download size={12} className="mr-1.5" /> Export Data
           </Button>
           <Button className="h-8 bg-indigo-600 hover:bg-indigo-700 text-white text-[9px] font-bold uppercase shadow-md active:scale-95 transition-all px-4 rounded-lg border-none">
                <Plus size={14} className="mr-1.5" strokeWidth={3} /> Initialize Node
            </Button>
        </div>
      </header>

      {/* 2. SCROLLABLE AREA */}
      <main className="flex-1 overflow-y-auto p-4 lg:p-6 scrollbar-hide space-y-4 bg-slate-50/20 pb-32">
        
        {/* KPI ROW */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 max-w-[1700px] mx-auto">
           <DashStat label="Active Tasks" value="08" trend="+2" color="indigo" icon={<ListTodo size={12}/>}/>
           <DashStat label="Overdue" value="02" trend="WARN" color="rose" icon={<AlertCircle size={12}/>}/>
           <DashStat label="Velocity" value="92%" trend="FAST" color="emerald" icon={<Zap size={12}/>}/>
           <DashStat label="In-Review" value="03" trend="PEND" color="orange" icon={<Timer size={12}/>}/>
           <DashStat label="Load Factor" value="High" trend="MAX" color="purple" icon={<Database size={12}/>}/>
           <DashStat label="System State" value="Live" trend="TLS" color="blue" icon={<CheckCircle2 size={12}/>}/>
        </div>

        {/* ANALYTICS ROW - THE MASTER FIX FOR GRAPH VISIBILITY */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 max-w-[1700px] mx-auto">
           
           {/* Dark Hero Card with Full Background Graph */}
           <Card className="lg:col-span-8 h-[180px] bg-[#0F172A] text-white rounded-2xl border-none shadow-2xl relative overflow-hidden flex flex-col justify-center p-8 group transition-all">
              <div className="relative z-20 space-y-4 max-w-[300px]">
                 <div>
                    <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2 italic leading-none">
                       <TrendingUp size={12} className="text-indigo-400" /> Productivity Pulse
                    </h3>
                    <p className="text-3xl font-black tracking-tighter text-white mt-3 leading-none uppercase">Node Velocity: <span className="text-indigo-400">92%</span></p>
                 </div>
                 <div className="flex gap-2">
                    <Badge className="bg-emerald-500/10 text-emerald-400 border-none font-bold text-[8px] uppercase tracking-tighter px-2">High Efficiency</Badge>
                    <Badge className="bg-white/5 border-none text-slate-500 font-bold text-[8px] uppercase tracking-tighter px-2 italic">Active_Dossier</Badge>
                 </div>
              </div>
              
              {/* GRAPH PLACEMENT: Using absolute to occupy the background right area */}
              <div className="absolute right-0 bottom-0 top-10 w-[60%] z-10 opacity-80 group-hover:opacity-100 transition-opacity">
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={taskVelocity} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
                       <defs>
                          <linearGradient id="colorNode" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                             <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                          </linearGradient>
                       </defs>
                       <Area 
                          type="monotone" 
                          dataKey="completed" 
                          stroke="#6366f1" 
                          strokeWidth={4} 
                          fill="url(#colorNode)" 
                          dot={{ r: 4, fill: '#6366f1', strokeWidth: 2, stroke: '#0F172A' }} 
                          activeDot={{ r: 6, fill: '#fff' }}
                        />
                    </AreaChart>
                 </ResponsiveContainer>
              </div>
              <div className="absolute top-0 left-0 size-full bg-gradient-to-r from-[#0F172A] via-[#0F172A]/80 to-transparent z-10 pointer-events-none" />
           </Card>

           {/* Priority Spread Card - SYNCED HEIGHT */}
           <Card className="lg:col-span-4 h-[180px] bg-white rounded-2xl border-slate-100 shadow-sm p-6 relative hover:border-indigo-100 transition-all group overflow-hidden">
              <div className="flex justify-between items-start w-full relative z-10">
                 <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 leading-none mt-1">
                    <Target size={12}/> Priority Node
                 </h3>
                 <div className="space-y-1.5 text-right">
                    {priorityData.map(p => (
                        <div key={p.name} className="flex items-center justify-end gap-2">
                            <span className="text-[8px] font-black text-slate-500 uppercase">{p.name}: {p.value}%</span>
                            <div className="size-1.5 rounded-full" style={{ backgroundColor: p.color }} />
                        </div>
                    ))}
                 </div>
              </div>

              <div className="absolute inset-0 flex items-center justify-center pt-10">
                 <div className="size-36 relative">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie data={priorityData} innerRadius={32} outerRadius={45} paddingAngle={5} dataKey="value" stroke="none" cx="50%" cy="50%">
                                {priorityData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex items-center justify-center font-black text-[9px] text-slate-400 uppercase tracking-widest">Spread</div>
                 </div>
              </div>
           </Card>
        </div>

        {/* KANBAN GRID */}
        <div className="max-w-[1700px] mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 pb-20 pt-2 text-left">
           {STAGES.map((stage) => (
              <div key={stage} className="flex flex-col gap-4 text-left">
                 <div className="flex items-center justify-between px-3 py-2 bg-white rounded-xl border border-slate-100 shadow-xs">
                    <div className="flex items-center gap-2">
                        <div className={cn(
                            "size-1.5 rounded-full shadow-[0_0_8px]",
                            stage === 'To-Do' ? 'bg-slate-400' :
                            stage === 'In-Progress' ? 'bg-indigo-500 animate-pulse' :
                            stage === 'Review' ? 'bg-orange-500' : 'bg-emerald-500'
                        )} />
                        <h3 className="text-[9px] font-black text-slate-600 uppercase tracking-widest">{stage}</h3>
                    </div>
                    <Badge variant="outline" className="text-[8px] font-black text-slate-300 border-slate-100 px-1.5 rounded-md">{taskMatrix.filter(t => t.stage === stage).length}</Badge>
                 </div>

                 <div className="space-y-3">
                    {taskMatrix.filter(t => t.stage === stage).map((task) => (
                       <Card key={task.id} className="p-4 bg-white border-none shadow-sm ring-1 ring-slate-200/60 hover:ring-indigo-300 hover:shadow-lg hover:-translate-y-1 transition-all cursor-grab active:cursor-grabbing group rounded-xl border-l-2 border-l-transparent hover:border-l-indigo-600 text-left">
                          <div className="flex justify-between items-start mb-3 leading-none">
                             <Badge className={cn(
                                "text-[7px] font-black uppercase border-none px-1.5 py-0.5",
                                task.priority === 'High' ? 'bg-rose-50 text-rose-600' : 
                                task.priority === 'Medium' ? 'bg-amber-50 text-amber-600' : 'bg-slate-50 text-slate-400'
                             )}>
                                {task.priority} NODE
                             </Badge>
                             <button className="opacity-0 group-hover:opacity-100 transition-opacity"><MoreHorizontal size={14} className="text-slate-300 hover:text-slate-600"/></button>
                          </div>
                          <h4 className="text-[11px] font-black text-slate-800 uppercase leading-tight tracking-tight group-hover:text-indigo-600 transition-colors">{task.title}</h4>
                          <p className="text-[9px] text-slate-400 mt-2 leading-relaxed line-clamp-2 uppercase font-medium truncate">{task.desc}</p>
                          <div className="mt-4 pt-3 border-t border-slate-50 flex items-center justify-between">
                             <div className="flex items-center gap-1.5 text-[8px] font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded uppercase tracking-tighter italic">
                                <Clock size={10} className="text-indigo-400" /> {task.due}
                             </div>
                             <div className="size-4 rounded-md bg-indigo-50 border border-indigo-100 flex items-center justify-center text-[7px] font-black text-indigo-600 font-bold uppercase">Z</div>
                          </div>
                       </Card>
                    ))}
                    <button className="w-full py-3 border-2 border-dashed border-slate-100 rounded-xl text-[9px] font-black text-slate-300 uppercase hover:border-indigo-200 hover:text-indigo-400 transition-all flex items-center justify-center gap-2 group/add">
                       <Plus size={12} className="group-hover/add:rotate-90 transition-transform duration-300" /> Append Node
                    </button>
                 </div>
              </div>
           ))}
        </div>
      </main>
    </div>
  );
}

// KPI COMPONENT
function DashStat({ label, value, trend, color, icon }: any) {
    const colors: any = { indigo: "bg-indigo-50 text-indigo-600", emerald: "bg-emerald-50 text-emerald-600", blue: "bg-blue-50 text-blue-600", purple: "bg-purple-50 text-purple-600", orange: "bg-orange-50 text-orange-600", rose: "bg-rose-50 text-rose-600" }
    return (
        <Card className="p-3.5 rounded-xl bg-white border-none shadow-sm ring-1 ring-slate-100 flex flex-col justify-between hover:shadow-md hover:-translate-y-1 transition-all h-[95px] cursor-default text-left group">
            <div className="flex justify-between items-start w-full">
                <div className={cn("p-1.5 rounded-lg shadow-xs transition-transform group-hover:scale-110", colors[color])}>{icon}</div>
                <span className={cn("text-[6px] font-black px-1.5 py-0.5 rounded uppercase tracking-tighter shadow-sm bg-white border border-slate-50", colors[color])}>{trend}</span>
            </div>
            <div className="mt-1 text-left"><p className="text-base font-black text-slate-900 tracking-tight leading-none tabular-nums">{value}</p><p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1.5 leading-none">{label}</p></div>
        </Card>
    )
}
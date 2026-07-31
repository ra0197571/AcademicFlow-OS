"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, Users, Star, Clock, Search, Filter, 
  ArrowUpRight, Target, Activity, MoreHorizontal,
  LayoutGrid, GraduationCap, Zap, CheckCircle2,
  ChevronRight, Calendar, UserCheck, ShieldCheck, Mail, ArrowLeft, TrendingUp, BarChart3
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, BarChart, Bar, Cell 
} from "recharts";
import { cn } from "@/lib/utils";

// --- MOCK DATA ---
const classes = [
    { id: '9A', name: "Grade 9-Alpha", subject: "Mathematics", students: 32, progress: 85, rank: "A+", color: "indigo", distribution: [{g:'A+', c:12}, {g:'A', c:10}, {g:'B', c:8}, {g:'F', c:2}] },
    { id: '10B', name: "Grade 10-Beta", subject: "Quantum Physics", students: 28, progress: 62, rank: "A", color: "emerald", distribution: [{g:'A+', c:5}, {g:'A', c:15}, {g:'B', c:5}, {g:'F', c:3}] },
    { id: '12A', name: "Grade 12-Pro", subject: "Modern Computing", students: 44, progress: 94, rank: "A+", color: "purple", distribution: [{g:'A+', c:20}, {g:'A', c:14}, {g:'B', c:8}, {g:'F', c:2}] },
];

const studentsInClass = [
    { id: "STU-001", name: "Ahmed Malik", attendance: "98%", grade: "A+", status: "Active" },
    { id: "STU-002", name: "Fatima Khan", attendance: "94%", grade: "A", status: "Active" },
    { id: "STU-003", name: "Ali Hassan", attendance: "82%", grade: "B", status: "On Leave" },
];

export default function MyClassesNode() {
  const [mounted, setMounted] = useState(false);
  const [selectedClass, setSelectedClass] = useState<any>(null);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <div className="flex flex-col h-full bg-[#FDFDFD] overflow-hidden animate-in fade-in duration-700 font-sans relative text-slate-900">
      
      {/* 1. TOP COMMAND HEADER */}
      <header className="shrink-0 h-[56px] border-b border-slate-100 bg-white flex items-center justify-between px-6 z-20">
        <div className="flex items-center gap-4 text-left">
            {selectedClass && (
                <button onClick={() => setSelectedClass(null)} className="p-1.5 hover:bg-slate-50 rounded-lg text-slate-400 border border-transparent hover:border-slate-200 transition-all">
                    <ArrowLeft size={16} />
                </button>
            )}
            <div className="flex flex-col">
                <div className="flex items-center gap-2 text-[9px] font-bold text-indigo-600 uppercase tracking-widest leading-none px-0.5">
                    ACADEMIC CLUSTER <ChevronRight size={8} /> 
                    <span className="text-slate-400">{selectedClass ? selectedClass.name : 'ALL NODES'}</span>
                </div>
                <h1 className="text-xs font-black text-slate-900 tracking-tight mt-1 uppercase italic leading-none">
                    My <span className="text-indigo-600 not-italic font-bold ml-1">Classes Node</span>
                </h1>
            </div>
        </div>

        <div className="flex items-center gap-2">
           <Button variant="outline" className="h-8 text-[9px] font-bold uppercase tracking-wider border-slate-200 bg-white px-3">
              Archive Logs
           </Button>
           <Button className="h-8 bg-indigo-600 hover:bg-indigo-700 text-white text-[9px] font-bold uppercase shadow-md active:scale-95 transition-all px-4 rounded-lg">
                <Zap size={12} className="mr-1.5" /> Force Sync
            </Button>
        </div>
      </header>

      {/* 2. SCROLLABLE AREA */}
      <main className="flex-1 overflow-y-auto p-4 lg:p-6 scrollbar-hide space-y-6 bg-slate-50/20 text-left">
        
        <AnimatePresence mode="wait">
            {!selectedClass ? (
                /* --- VIEW 1: HUB WITH COMPACT KPIs --- */
                <motion.div key="hub" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="max-w-[1600px] mx-auto space-y-6">
                    
                    {/* 6-CARD KPI ROW (Perfectly Balanced) */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                        <DashStat label="Managed" value="06" trend="ACTIVE" color="indigo" icon={<LayoutGrid size={12}/>}/>
                        <DashStat label="Mean GPA" value="3.84" trend="TOP" color="blue" icon={<TrendingUp size={12}/>}/>
                        <DashStat label="Attendance" value="94%" trend="STABLE" color="emerald" icon={<UserCheck size={12}/>}/>
                        <DashStat label="Syllabus" value="72%" trend="SYNC" color="purple" icon={<Target size={12}/>}/>
                        <DashStat label="Alerts" value="Zero" trend="SEC" color="orange" icon={<ShieldCheck size={12}/>}/>
                        <DashStat label="Status" value="Live" trend="v2.4" color="rose" icon={<Activity size={12}/>}/>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                        {classes.map((cls) => (
                            <Card key={cls.id} onClick={() => setSelectedClass(cls)} className="p-6 bg-white border-none shadow-sm ring-1 ring-slate-200/60 hover:ring-indigo-300 hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group rounded-[28px] relative overflow-hidden">
                                <div className="absolute top-0 right-0 size-24 bg-indigo-50/20 blur-2xl group-hover:bg-indigo-100/40 transition-all" />
                                <div className="flex justify-between items-start mb-6">
                                    <div className={cn("size-10 rounded-xl flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-110", 
                                        cls.color === 'indigo' ? 'bg-indigo-600 shadow-indigo-100' : 'bg-emerald-600 shadow-emerald-100')}>
                                        <BookOpen size={18} />
                                    </div>
                                    <Badge variant="outline" className="text-[8px] font-black border-slate-100 bg-slate-50 text-slate-400 uppercase">CLUSTER_{cls.id}</Badge>
                                </div>
                                <h3 className="text-[14px] font-black text-slate-800 uppercase leading-none group-hover:text-indigo-600 transition-colors">{cls.name}</h3>
                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-2">{cls.subject}</p>
                                
                                <div className="mt-8 space-y-2">
                                    <div className="flex justify-between text-[8px] font-black uppercase text-slate-400 tracking-tighter"><span>Syllabus Depth</span><span>{cls.progress}%</span></div>
                                    <div className="h-1 w-full bg-slate-50 rounded-full overflow-hidden shadow-inner"><div className="h-full bg-indigo-600 transition-all duration-1000" style={{ width: `${cls.progress}%` }} /></div>
                                </div>

                                <div className="mt-6 pt-5 border-t border-slate-50 flex items-center justify-between">
                                    <div className="flex items-center gap-1.5">
                                        <Users size={12} className="text-slate-300" />
                                        <span className="text-[10px] font-bold text-slate-500 uppercase">{cls.students} Nodes</span>
                                    </div>
                                    <Badge className="bg-emerald-50 text-emerald-600 border-none font-black text-[9px] px-2 py-0.5">Rank: {cls.rank}</Badge>
                                </div>
                            </Card>
                        ))}
                    </div>
                </motion.div>
            ) : (
                /* --- VIEW 2: CLASS DOSSIER (STUDENT LIST) --- */
                <motion.div key="dossier" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="max-w-[1600px] mx-auto space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        
                        {/* Student List Table (Span 8) */}
                        <div className="lg:col-span-8 space-y-4">
                            <div className="flex flex-col md:flex-row justify-between items-center bg-white p-4 rounded-2xl border border-slate-100 shadow-sm gap-4">
                                <div className="text-left w-full">
                                    <h2 className="text-base font-black text-slate-900 uppercase leading-none">{selectedClass.name}</h2>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Operational Cluster Matrix</p>
                                </div>
                                <div className="flex gap-2 shrink-0">
                                    <Button variant="outline" className="h-8 text-[9px] font-bold border-slate-200 uppercase px-4">Broadcast</Button>
                                    <Button className="h-8 bg-slate-900 text-white text-[9px] font-bold uppercase rounded-lg px-4 border-none shadow-lg active:scale-95 transition-all">Download CSV</Button>
                                </div>
                            </div>

                            <Card className="border-none bg-white rounded-3xl shadow-sm ring-1 ring-slate-200/60 overflow-hidden">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-slate-50/50 border-b border-slate-100 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                                            <th className="px-6 py-4">Student Node Identity</th>
                                            <th className="px-6 py-4">Attendance Node</th>
                                            <th className="px-6 py-4">Rank Index</th>
                                            <th className="px-6 py-4 text-right pr-10">Verification</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50 font-sans">
                                        {studentsInClass.map((student) => (
                                            <tr key={student.id} className="group hover:bg-indigo-50/5 transition-all border-l-2 border-transparent hover:border-indigo-600">
                                                <td className="px-6 py-3">
                                                    <p className="text-[11px] font-black text-slate-800 uppercase leading-none">{student.name}</p>
                                                    <p className="text-[8px] font-mono text-slate-400 mt-1 uppercase italic tracking-tighter">ID: {student.id}</p>
                                                </td>
                                                <td className="px-6 py-3">
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-[11px] font-black text-slate-700 tabular-nums">{student.attendance}</span>
                                                        <div className="w-16 h-1 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-emerald-500" style={{ width: student.attendance }} /></div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-3">
                                                    <Badge variant="outline" className="bg-white border-slate-100 text-indigo-600 font-bold text-[9px] px-2">{student.grade}</Badge>
                                                </td>
                                                <td className="px-6 py-3 text-right pr-10">
                                                    <div className="flex items-center justify-end gap-1.5">
                                                        <div className="size-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
                                                        <span className="text-[9px] font-bold text-slate-600 uppercase tracking-tighter">{student.status}</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </Card>
                        </div>

                        {/* Grade Distribution Hub (Span 4) */}
                        <div className="lg:col-span-4">
                            <Card className="p-6 rounded-[32px] border-none bg-white shadow-sm ring-1 ring-slate-200/60 flex flex-col hover:shadow-md transition-all h-full min-h-[400px]">
                                <h3 className="text-[10px] font-black text-slate-800 uppercase tracking-[0.2em] mb-8 flex items-center gap-2 italic">
                                    <BarChart3 size={14} className="text-indigo-600" /> Grade Distribution Hub
                                </h3>
                                <div className="h-[220px] w-full mt-auto">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={selectedClass.distribution} margin={{ top: 0, right: 0, left: -35, bottom: 0 }}>
                                            <XAxis dataKey="g" axisLine={false} tickLine={false} tick={{fontSize: 9, fontWeight: 900, fill: '#94a3b8'}} />
                                            <Bar dataKey="c" radius={[6, 6, 0, 0]} barSize={32}>
                                                {selectedClass.distribution.map((entry: any, index: number) => (
                                                    <Cell key={`cell-${index}`} fill={index === 0 ? '#6366f1' : '#e2e8f0'} />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="mt-8 p-5 bg-[#0F172A] rounded-2xl border border-white/5 text-center shadow-xl">
                                    <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Mean Academic Efficiency</p>
                                    <p className="text-xl font-black text-indigo-400 uppercase italic">Grade {selectedClass.rank}</p>
                                </div>
                            </Card>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
      </main>
    </div>
  );
}

// --- KPI COMPONENT (DASHBOARD SYNC) ---
function DashStat({ label, value, trend, color, icon }: any) {
    const colors: any = { indigo: "bg-indigo-50 text-indigo-600 shadow-indigo-100", emerald: "bg-emerald-50 text-emerald-600 shadow-emerald-100", blue: "bg-blue-50 text-blue-600 shadow-blue-100", purple: "bg-purple-50 text-purple-600 shadow-purple-100", orange: "bg-orange-50 text-orange-600 shadow-orange-100", rose: "bg-rose-50 text-rose-600 shadow-rose-100" }
    return (
        <Card className="p-3.5 rounded-xl bg-white border-none shadow-sm ring-1 ring-slate-100 flex flex-col justify-between hover:shadow-md hover:-translate-y-1 transition-all h-[100px] cursor-default text-left group">
            <div className="flex justify-between items-start w-full">
                <div className={cn("p-1.5 rounded-lg shadow-xs transition-transform group-hover:scale-110", colors[color])}>{icon}</div>
                <span className={cn("text-[6px] font-black px-1.5 py-0.5 rounded uppercase tracking-tighter shadow-sm bg-white", colors[color])}>{trend}</span>
            </div>
            <div className="mt-1 text-left"><p className="text-base font-black text-slate-900 tracking-tight leading-none tabular-nums">{value}</p><p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1.5 leading-none">{label}</p></div>
        </Card>
    )
}
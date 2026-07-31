"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, XCircle, Clock, Calendar, Users, Search, 
  Plus, MoreHorizontal, Download, Filter, LayoutGrid, 
  ArrowUpRight, Activity, ShieldCheck, Zap, 
  QrCode, RefreshCcw, Save, ArrowLeft, BookOpen, ChevronRight
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { cn } from "@/lib/utils";

// --- TYPES ---
type AttendanceStatus = 'present' | 'absent' | 'late' | 'none';
interface Student { id: string; name: string; roll: string; status: AttendanceStatus; }
interface ClassNode { id: string; name: string; subject: string; totalStudents: number; lastMarked: string; color: string; }

// --- MOCK DATA ---
const ASSIGNED_CLASSES: ClassNode[] = [
    { id: '9A', name: "Grade 9-Alpha", subject: "Advanced Mathematics", totalStudents: 32, lastMarked: "Yesterday", color: "indigo" },
    { id: '10B', name: "Grade 10-Beta", subject: "Quantum Physics", totalStudents: 28, lastMarked: "Today", color: "emerald" },
    { id: '12A', name: "Grade 12-Pro", subject: "Modern Computing", totalStudents: 44, lastMarked: "Pending", color: "purple" },
];

const INITIAL_STUDENTS: Student[] = [
  { id: "STU-001", name: "Ahmed Malik", roll: "22-091", status: "none" },
  { id: "STU-002", name: "Fatima Khan", roll: "22-092", status: "none" },
  { id: "STU-003", name: "Ali Hassan", roll: "22-093", status: "none" },
  { id: "STU-004", name: "Zainab Bibi", roll: "22-094", status: "none" },
  { id: "STU-005", name: "Bilal Raza", roll: "22-095", status: "none" },
];

export default function AttendanceControlNode() {
  const [mounted, setMounted] = useState(false);
  const [selectedClass, setSelectedClass] = useState<ClassNode | null>(null);
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [isModified, setIsModified] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  const handleStatusChange = (id: string, newStatus: AttendanceStatus) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, status: newStatus } : s));
    setIsModified(true);
  };

  const presentCount = students.filter(s => s.status === 'present' || s.status === 'late').length;
  const statsData = [{ v: presentCount }, { v: students.length - presentCount }];

  return (
    <div className="flex flex-col h-full bg-[#FDFDFD] overflow-hidden animate-in fade-in duration-700 font-sans relative text-slate-900">
      
      {/* 1. TOP HEADER */}
      <header className="shrink-0 h-[56px] border-b border-slate-100 bg-white flex items-center justify-between px-6 z-20">
        <div className="flex items-center gap-4">
            {selectedClass && (
                <button onClick={() => {setSelectedClass(null); setIsModified(false)}} className="p-1.5 hover:bg-slate-50 rounded-lg text-slate-400 border border-transparent hover:border-slate-100 transition-all">
                    <ArrowLeft size={16} />
                </button>
            )}
            <div className="flex flex-col">
                <div className="flex items-center gap-2 text-[9px] font-bold text-indigo-600 uppercase tracking-widest leading-none">
                    FACULTY HUB <ChevronRight size={8} /> <span className="text-slate-400">{selectedClass ? selectedClass.name : 'ALL NODES'}</span>
                </div>
                <h1 className="text-xs font-black text-slate-900 tracking-tight mt-1 uppercase italic leading-none">
                    Attendance <span className="text-indigo-600 not-italic font-bold ml-1">Registry Node</span>
                </h1>
            </div>
        </div>
        <div className="flex items-center gap-2">
           <Button variant="outline" className="h-8 text-[9px] font-bold uppercase tracking-wider border-slate-200 bg-white">
              <Download size={12} className="mr-1.5" /> Export
           </Button>
           {selectedClass && <Badge className="bg-emerald-50 text-emerald-600 border-none px-2 py-0.5 font-bold text-[8px] uppercase ring-1 ring-emerald-100 animate-pulse">Session_Live</Badge>}
        </div>
      </header>

      {/* 2. SCROLLABLE AREA */}
      <main className="flex-1 overflow-y-auto p-4 lg:p-6 scrollbar-hide space-y-6 bg-slate-50/20">
        
        <AnimatePresence mode="wait">
            {!selectedClass ? (
                /* --- PHASE 1: COMPACT HUB --- */
                <motion.div key="hub" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="max-w-6xl mx-auto space-y-6">
                    <div className="space-y-1">
                        <h2 className="text-base font-black text-slate-800 uppercase tracking-tight italic">Assigned <span className="text-indigo-600">Educational Nodes</span></h2>
                        <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">Select a cluster to initialize attendance registry</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {ASSIGNED_CLASSES.map((cls) => (
                            <Card key={cls.id} onClick={() => setSelectedClass(cls)} className="border-none bg-white rounded-2xl p-5 shadow-sm ring-1 ring-slate-200/60 hover:ring-indigo-300 hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group relative overflow-hidden">
                                <div className="absolute top-0 right-0 size-24 bg-indigo-50/20 blur-2xl -mr-10 -mt-10 group-hover:bg-indigo-100/30 transition-all" />
                                <div className="flex justify-between items-start mb-6 relative z-10">
                                    <div className={cn("size-10 rounded-xl flex items-center justify-center text-white shadow-md transition-all group-hover:scale-110", 
                                        cls.color === 'indigo' ? 'bg-indigo-600 shadow-indigo-100' : cls.color === 'emerald' ? 'bg-emerald-600 shadow-emerald-100' : 'bg-purple-600 shadow-purple-100')}>
                                        <BookOpen size={18} />
                                    </div>
                                    <span className="text-[8px] font-black text-slate-400 uppercase bg-slate-50 px-2 py-0.5 rounded border border-slate-100">Last: {cls.lastMarked}</span>
                                </div>
                                <div className="space-y-1 relative z-10">
                                    <h3 className="text-[13px] font-black text-slate-800 uppercase leading-none group-hover:text-indigo-600 transition-colors">{cls.name}</h3>
                                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">{cls.subject}</p>
                                </div>
                                <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between relative z-10">
                                    <div className="flex items-center gap-1.5">
                                        <Users size={12} className="text-slate-300" />
                                        <span className="text-[10px] font-bold text-slate-500 uppercase">{cls.totalStudents} Nodes</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-indigo-600 font-black text-[9px] uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                                        Open Node <ArrowUpRight size={12} />
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </motion.div>
            ) : (
                /* --- PHASE 2: ELITE REGISTRY --- */
                <motion.div key="registry" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="max-w-[1600px] mx-auto space-y-4">
                    {/* KPI ROW */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                        <DashStat label="Present" value={presentCount.toString()} trend="LIVE" color="emerald" icon={<CheckCircle2 size={12}/>}/>
                        <DashStat label="Absence" value={(students.filter(s => s.status === 'absent').length).toString()} trend="LOW" color="rose" icon={<XCircle size={12}/>}/>
                        <DashStat label="Late Node" value={(students.filter(s => s.status === 'late').length).toString()} trend="WARN" color="orange" icon={<Clock size={12}/>}/>
                        <DashStat label="Class Size" value={selectedClass.totalStudents.toString()} trend="MAX" color="blue" icon={<Users size={12}/>}/>
                        <DashStat label="Sync" value="Stable" trend="TLS" color="purple" icon={<RefreshCcw size={12}/>}/>
                        <DashStat label="Integrity" value="Verified" trend="AES" color="indigo" icon={<ShieldCheck size={12}/>}/>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
                        <div className="lg:col-span-8 space-y-4">
                            <div className="flex items-center justify-between bg-white p-2 rounded-xl border border-slate-100 shadow-sm gap-4">
                                <div className="flex items-center gap-2">
                                    <div className="px-3 h-8 bg-slate-900 text-white rounded-lg flex items-center justify-center gap-2">
                                        <Calendar size={12} className="text-indigo-400" />
                                        <span className="text-[9px] font-black uppercase italic">12 JULY 2026</span>
                                    </div>
                                    <Badge className="h-8 bg-indigo-50 text-indigo-600 border-none font-bold text-[9px] uppercase px-3 rounded-lg">{selectedClass.name}</Badge>
                                </div>
                                <div className="relative flex-1 md:max-w-xs group text-left">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors" size={12} />
                                    <input placeholder="Filter identifier..." className="w-full h-8 pl-9 pr-3 bg-slate-50 border border-slate-100 rounded-lg text-[10px] font-semibold outline-none focus:bg-white focus:ring-2 ring-indigo-50 transition-all" />
                                </div>
                            </div>

                            <Card className="border-none bg-white rounded-2xl shadow-sm ring-1 ring-slate-200/60 overflow-hidden">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-slate-50/50 border-b border-slate-100 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                                            <th className="px-6 py-3">Student Node Identity</th>
                                            <th className="px-6 py-3">Status Node Entry</th>
                                            <th className="px-6 py-3 text-right pr-10">Matrix</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {students.map((student) => (
                                            <tr key={student.id} className={cn(
                                                "group transition-all border-l-2 border-transparent hover:border-indigo-600 hover:bg-slate-50/50",
                                                student.status !== 'none' && "bg-indigo-50/5 border-l-indigo-400"
                                            )}>
                                                <td className="px-6 py-2.5">
                                                    <div className="flex items-center gap-3">
                                                        <div className={cn("size-7 rounded-lg flex items-center justify-center font-bold text-[9px] border transition-all uppercase shadow-xs", 
                                                            student.status === 'none' ? "bg-slate-100 text-slate-400" : "bg-slate-900 text-white border-slate-900")}>
                                                            {student.name.substring(0, 2)}
                                                        </div>
                                                        <div>
                                                            <p className="text-[11px] font-bold text-slate-800 uppercase leading-none">{student.name}</p>
                                                            <p className="text-[8px] font-mono text-slate-400 mt-0.5 italic leading-none truncate">ID: {student.id}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-2.5">
                                                    <div className="flex items-center gap-1.5 p-1 bg-slate-50/80 w-fit rounded-lg border border-slate-100 shadow-inner">
                                                        <StatusButton active={student.status === 'present'} label="P" color="emerald" onClick={() => handleStatusChange(student.id, 'present')} />
                                                        <StatusButton active={student.status === 'late'} label="L" color="orange" onClick={() => handleStatusChange(student.id, 'late')} />
                                                        <StatusButton active={student.status === 'absent'} label="A" color="rose" onClick={() => handleStatusChange(student.id, 'absent')} />
                                                    </div>
                                                </td>
                                                <td className="px-6 py-2.5 text-right pr-10">
                                                    <button className="p-1.5 hover:bg-white rounded-md text-slate-200 hover:text-indigo-600 hover:shadow-sm transition-all"><ArrowUpRight size={12}/></button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </Card>
                        </div>

                        <div className="lg:col-span-4 space-y-4">
                            {/* LIVE GAUGE */}
                            <Card className="p-6 rounded-2xl border-none bg-white shadow-sm ring-1 ring-slate-200/60 flex flex-col items-center hover:shadow-md hover:border-indigo-100 transition-all">
                                <h3 className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-4 w-full text-left italic leading-none">Realtime Gauge</h3>
                                <div className="size-32 relative">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie data={statsData} innerRadius={40} outerRadius={50} dataKey="v" stroke="none" startAngle={90} endAngle={-270}>
                                                <Cell fill="#6366f1" className="drop-shadow-[0_0_8px_rgba(99,102,241,0.3)]" />
                                                <Cell fill="#f1f5f9" />
                                            </Pie>
                                        </PieChart>
                                    </ResponsiveContainer>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center leading-none">
                                        <span className="text-xl font-black text-slate-900 tabular-nums">{Math.round((presentCount/students.length)*100)}%</span>
                                    </div>
                                </div>
                            </Card>

                            {/* TERMINAL UI CARD */}
                            <Card className="p-6 rounded-[24px] bg-[#0F172A] text-white shadow-xl relative overflow-hidden group border-none">
                                <div className="absolute top-0 right-0 size-24 bg-indigo-600/10 blur-2xl group-hover:bg-indigo-600/20 transition-all" />
                                <div className="relative z-10 text-center flex flex-col items-center">
                                    <QrCode size={24} className="text-indigo-400 mb-3 group-hover:scale-110 transition-transform" />
                                    <h4 className="text-[11px] font-bold uppercase tracking-widest mb-1">Terminal Scanner</h4>
                                    <p className="text-[9px] text-slate-400 uppercase tracking-tighter italic mb-4 opacity-60">Initialize QR node access protocol.</p>
                                    <Button className="w-full h-9 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-[8px] rounded-lg uppercase tracking-widest transition-all border-none shadow-lg active:scale-95">Deploy Terminal</Button>
                                </div>
                            </Card>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
      </main>

      {/* 3. FLOATING COMMIT BAR */}
      <AnimatePresence>
        {isModified && selectedClass && (
          <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }} className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-lg z-50 px-4">
            <div className="bg-[#0F172A] border border-white/10 shadow-2xl rounded-2xl p-3 flex items-center justify-between gap-4 backdrop-blur-md">
               <div className="flex items-center gap-3 pl-2">
                  <div className="p-1.5 bg-indigo-600 rounded-lg text-white shadow-lg shadow-indigo-600/20 animate-pulse"><Save size={14} /></div>
                  <div className="text-left text-white"><p className="text-[10px] font-black uppercase tracking-widest leading-none">Unsaved Nodes</p><p className="text-[8px] font-bold text-slate-400 mt-1 uppercase">Registry modified</p></div>
               </div>
               <div className="flex items-center gap-2 pr-1">
                  <button onClick={() => {setStudents(INITIAL_STUDENTS); setIsModified(false)}} className="px-3 text-[9px] font-black text-slate-400 hover:text-white uppercase transition-colors">Discard</button>
                  <Button onClick={() => setIsModified(false)} className="h-8 px-5 rounded-lg bg-white hover:bg-indigo-50 text-slate-900 font-black text-[9px] uppercase tracking-widest border-none active:scale-95 transition-all shadow-xl">Commit Registry</Button>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- KPI COMPONENT (Dashboard Matched) ---
function DashStat({ label, value, trend, color, icon }: any) {
    const colors: any = { indigo: "bg-indigo-50 text-indigo-600", emerald: "bg-emerald-50 text-emerald-600", blue: "bg-blue-50 text-blue-600", purple: "bg-purple-50 text-purple-600", orange: "bg-orange-50 text-orange-600", rose: "bg-rose-50 text-rose-600" }
    return (
        <Card className="p-3.5 rounded-xl bg-white border-none shadow-sm ring-1 ring-slate-100 flex flex-col justify-between hover:shadow-md hover:-translate-y-1 transition-all h-[95px] cursor-default">
            <div className="flex justify-between items-start w-full">
                <div className={cn("p-1.5 rounded-lg shadow-xs", colors[color])}>{icon}</div>
                <span className={cn("text-[6px] font-black px-1.5 py-0.5 rounded uppercase tracking-tighter", colors[color])}>{trend}</span>
            </div>
            <div className="mt-1 text-left"><p className="text-base font-black text-slate-900 tracking-tight leading-none tabular-nums">{value}</p><p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1.5 leading-none">{label}</p></div>
        </Card>
    )
}

// --- INTERACTIVE STATUS BUTTON (Enhanced Hover) ---
function StatusButton({ active, label, color, onClick }: any) {
    const colorClasses: any = {
        emerald: active ? "bg-emerald-500 text-white shadow-lg shadow-emerald-200 scale-110" : "text-emerald-600 hover:bg-emerald-50 border-transparent opacity-40 hover:opacity-100",
        orange: active ? "bg-orange-500 text-white shadow-lg shadow-orange-200 scale-110" : "text-orange-600 hover:bg-orange-50 border-transparent opacity-40 hover:opacity-100",
        rose: active ? "bg-rose-500 text-white shadow-lg shadow-rose-200 scale-110" : "text-rose-600 hover:bg-rose-50 border-transparent opacity-40 hover:opacity-100",
    }
    return (
        <button onClick={onClick} className={cn("size-6 rounded-md text-[9px] font-black transition-all flex items-center justify-center border", colorClasses[color])}>{label}</button>
    )
}
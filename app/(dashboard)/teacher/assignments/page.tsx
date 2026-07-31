"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Search, Download, FileText, Filter, LayoutGrid, 
  ArrowUpRight, Clock, Target, CheckCircle2, MoreHorizontal,
  FileCheck, Users, Send, AlertCircle, Timer, History, 
  ChevronRight, Calendar, ArrowLeft, UploadCloud, Eye, Save, 
  Database, Zap, BarChart3, MessageSquare, Flag, Trash2, Box,
  ShieldCheck 
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  ResponsiveContainer, AreaChart, Area, BarChart, Bar, XAxis, Tooltip, Cell 
} from "recharts";
import { cn } from "@/lib/utils";

// --- TYPES ---
type ViewState = 'hub' | 'assignments' | 'grading';

// --- MOCK DATA ---
const ASSIGNED_CLASSES = [
    { id: '9A', name: "Grade 9-Alpha", subject: "Mathematics", tasks: 12, health: 85, color: "indigo" },
    { id: '10B', name: "Grade 10-Beta", subject: "Quantum Physics", tasks: 8, health: 62, color: "emerald" },
    { id: '12A', name: "Grade 12-Pro", subject: "Modern Computing", tasks: 15, health: 94, color: "purple" },
];

const CLASS_ASSIGNMENTS = [
    { id: "ASN-401", title: "Algebraic Notations Lab", due: "15 July", submissions: 28, total: 32, status: "Active", trend: [{v:10}, {v:15}, {v:25}, {v:28}] },
    { id: "ASN-402", title: "Quadratic Equations Quiz", due: "10 July", submissions: 32, total: 32, status: "Graded", trend: [{v:5}, {v:12}, {v:22}, {v:32}] },
];

const STUDENT_SUBMISSIONS = [
  { id: "STU-001", name: "Ahmed Malik", file: "sol_ahmed.pdf", date: "2h ago", marks: 85, status: "Graded" },
  { id: "STU-002", name: "Fatima Khan", file: "math_final.pdf", date: "5h ago", marks: 0, status: "Evaluating" },
  { id: "STU-003", name: "Ali Hassan", file: "draft_v1.pdf", date: "Yesterday", marks: 0, status: "Flagged" },
];

export default function AssignmentHubNode() {
  const [mounted, setMounted] = useState(false);
  const [view, setView] = useState<ViewState>('hub');
  const [selectedClass, setSelectedClass] = useState<any>(null);
  const [selectedTask, setSelectedTask] = useState<any>(null);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <div className="flex flex-col h-full bg-[#FDFDFD] overflow-hidden animate-in fade-in duration-700 font-sans relative text-slate-900">
      
      <header className="shrink-0 h-[60px] border-b border-slate-100 bg-white flex items-center justify-between px-6 z-20">
        <div className="flex items-center gap-4 text-left">
            {view !== 'hub' && (
                <button onClick={() => view === 'grading' ? setView('assignments') : setView('hub')} className="p-1.5 hover:bg-slate-50 rounded-lg text-slate-400 border border-transparent hover:border-slate-200 transition-all">
                    <ArrowLeft size={16} />
                </button>
            )}
            <div className="flex flex-col">
                <div className="flex items-center gap-2 text-[9px] font-bold text-indigo-600 uppercase tracking-[0.2em] leading-none px-0.5">
                    FACULTY HUB <ChevronRight size={10} /> 
                    <span className="text-slate-400">{view === 'hub' ? 'DEPLOYMENT' : selectedClass.name}</span>
                </div>
                <h1 className="text-sm font-black text-slate-900 tracking-tight mt-1 uppercase italic leading-none">
                    Assignment <span className="text-indigo-600 font-bold not-italic">Command Node</span>
                </h1>
            </div>
        </div>

        <div className="flex items-center gap-2">
           <Button variant="outline" className="h-8 text-[9px] font-bold uppercase tracking-wider border-slate-200 bg-white">
              <History size={12} className="mr-1.5" /> Archive
           </Button>
           <Button className="h-8 bg-indigo-600 hover:bg-indigo-700 text-white text-[9px] font-bold uppercase shadow-md active:scale-95 transition-all px-4 rounded-lg border-none">
                <Plus size={14} className="mr-1.5" strokeWidth={3} /> New Task Node
            </Button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 lg:p-6 scrollbar-hide space-y-6 bg-slate-50/20 pb-32">
        <AnimatePresence mode="wait">
            
            {view === 'hub' && (
                <motion.div key="hub" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="max-w-[1600px] mx-auto space-y-6">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                        <DashStat label="Active Tasks" value="12" trend="+2" color="indigo" icon={<FileCheck size={12}/>}/>
                        <DashStat label="Pending Eval" value="48" trend="REQD" color="orange" icon={<Timer size={12}/>}/>
                        <DashStat label="Success Index" value="88%" trend="+4%" color="emerald" icon={<Zap size={12}/>}/>
                        <DashStat label="Node Reach" value="1.2K" trend="MAX" color="blue" icon={<Users size={12}/>}/>
                        <DashStat label="SLA Compliance" value="Elite" trend="Pass" color="purple" icon={<ShieldCheck size={12}/>}/>
                        <DashStat label="Vault Node" value="v4.0" trend="SEC" color="rose" icon={<Database size={12}/>}/>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {ASSIGNED_CLASSES.map((cls) => (
                            <Card key={cls.id} onClick={() => {setSelectedClass(cls); setView('assignments')}} className="p-6 bg-white border-none shadow-sm ring-1 ring-slate-200/60 hover:ring-indigo-400 hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group rounded-2xl overflow-hidden relative text-left">
                                <div className="absolute top-0 right-0 size-24 bg-indigo-50/20 blur-2xl group-hover:bg-indigo-100/40" />
                                <div className="flex justify-between items-start mb-6 text-left">
                                    <div className={cn("size-10 rounded-xl flex items-center justify-center text-white shadow-lg", cls.color === 'indigo' ? 'bg-indigo-600' : 'bg-emerald-600')}>
                                        <LayoutGrid size={18} />
                                    </div>
                                    <Badge variant="outline" className="text-[8px] font-black border-slate-100 bg-slate-50 text-slate-400 uppercase tracking-widest">{cls.tasks} ACTIVE NODES</Badge>
                                </div>
                                <h3 className="text-[14px] font-black text-slate-800 uppercase tracking-tight group-hover:text-indigo-600 transition-colors">{cls.name}</h3>
                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-2">{cls.subject}</p>
                                <div className="mt-8 pt-4 border-t border-slate-50 flex items-center justify-between">
                                    <div className="flex items-center gap-1.5 text-indigo-600 font-black text-[9px] uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                                        Initialize Grid <ArrowUpRight size={12} />
                                    </div>
                                    <div className="h-1 w-20 bg-slate-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-emerald-500" style={{ width: `${cls.health}%` }} />
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </motion.div>
            )}

            {view === 'assignments' && (
                <motion.div key="list" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 text-left">
                    <div className="lg:col-span-8 space-y-4">
                        <div className="flex items-center justify-between p-2">
                            <h3 className="text-[11px] font-black text-slate-800 uppercase tracking-widest flex items-center gap-2"><Box size={14} className="text-indigo-600"/> Deployment Matrix</h3>
                            <div className="relative group">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={12} />
                                <input placeholder="Search node id..." className="w-48 h-8 pl-9 bg-white border border-slate-200 rounded-lg text-[10px] font-bold outline-none focus:ring-2 ring-indigo-50" />
                            </div>
                        </div>

                        {CLASS_ASSIGNMENTS.map((task) => (
                            <Card key={task.id} onClick={() => {setSelectedTask(task); setView('grading')}} className="p-5 bg-white border-none shadow-sm ring-1 ring-slate-200/60 hover:ring-indigo-400 hover:shadow-xl transition-all cursor-pointer group flex items-center justify-between rounded-xl border-l-4 border-l-transparent hover:border-l-indigo-600">
                                <div className="flex items-center gap-6 flex-1 min-w-0">
                                    <div className="size-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-inner text-left"><FileText size={20} /></div>
                                    <div className="text-left">
                                        <h4 className="text-[13px] font-black text-slate-800 uppercase truncate leading-none">{task.title}</h4>
                                        <p className="text-[9px] font-bold text-slate-400 mt-2 uppercase tracking-widest">ID: <span className="text-indigo-500">{task.id}</span> • DUE: {task.due}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-12 shrink-0 pr-6 border-r border-slate-50 mr-4">
                                    <div className="w-28 space-y-2">
                                        <div className="flex justify-between text-[8px] font-black text-slate-400 uppercase tracking-tighter"><span>Submission</span><span>{task.submissions}/{task.total}</span></div>
                                        <div className="h-1 w-full bg-slate-50 rounded-full overflow-hidden"><div className="h-full bg-indigo-500" style={{ width: `${(task.submissions/task.total)*100}%` }} /></div>
                                    </div>
                                    <div className="w-16 h-8 opacity-30 group-hover:opacity-100 transition-opacity">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart data={task.trend}><Area type="monotone" dataKey="v" stroke="#6366f1" fill="#6366f1" fillOpacity={0.1} strokeWidth={2} /></AreaChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                                <button className="p-2 hover:bg-slate-50 rounded-md text-slate-300 hover:text-indigo-600"><MoreHorizontal size={18}/></button>
                            </Card>
                        ))}
                    </div>

                    <div className="lg:col-span-4 space-y-6">
                        <Card className="p-6 rounded-[28px] border-none bg-white shadow-sm ring-1 ring-slate-200/60 flex flex-col hover:shadow-md transition-all">
                            <h3 className="text-[10px] font-black text-slate-800 uppercase tracking-widest mb-8 flex items-center gap-2 italic"><BarChart3 size={14} className="text-indigo-600" /> Collection Pulse</h3>
                            <div className="h-[200px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={[{n:'Mon', v:12}, {n:'Tue', v:34}, {n:'Wed', v:28}]}>
                                        <XAxis dataKey="n" axisLine={false} tickLine={false} tick={{fontSize: 9, fontWeight: 900, fill:'#94a3b8'}} dy={5} />
                                        <Bar dataKey="v" fill="#6366f1" radius={[4,4,0,0]} barSize={24} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </Card>
                    </div>
                </motion.div>
            )}

            {view === 'grading' && (
                <motion.div key="grading" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 text-left">
                    <div className="lg:col-span-8 space-y-6">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm text-left">
                            <div>
                                <h2 className="text-base font-black text-slate-900 uppercase leading-none">{selectedTask.title}</h2>
                                <p className="text-[10px] font-bold text-slate-400 uppercase mt-1.5 tracking-widest">Grading Stream Node / {selectedClass.name}</p>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline" className="h-8 text-[9px] font-bold uppercase border-slate-200">Bulk Pass</Button>
                                <Button className="h-8 bg-emerald-600 hover:bg-emerald-700 text-white text-[9px] font-bold uppercase shadow-lg border-none active:scale-95"><Save size={14} className="mr-1.5" /> Finalize Marks</Button>
                            </div>
                        </div>

                        <Card className="border-none bg-white rounded-3xl shadow-sm ring-1 ring-slate-200/60 overflow-hidden">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50/50 border-b border-slate-100 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                                        <th className="px-6 py-4">Identity Node</th>
                                        <th className="px-6 py-4">Submission Payload</th>
                                        <th className="px-6 py-4 text-center">Score Matrix</th>
                                        <th className="px-6 py-4 text-right pr-10">Status Node</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50 font-sans">
                                    {STUDENT_SUBMISSIONS.map((sub) => (
                                        <tr key={sub.id} className="group hover:bg-indigo-50/5 transition-all border-l-2 border-transparent hover:border-indigo-500">
                                            <td className="px-6 py-4">
                                                <p className="text-[11px] font-black text-slate-800 uppercase leading-none">{sub.name}</p>
                                                <p className="text-[9px] font-bold text-slate-400 mt-1 uppercase italic tracking-tighter">ID: {sub.id}</p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2 group/file cursor-pointer">
                                                    <div className="p-1.5 bg-slate-50 rounded-lg text-slate-400 group-hover/file:bg-indigo-600 group-hover/file:text-white transition-all shadow-sm border border-slate-100"><Download size={14}/></div>
                                                    <span className="text-[10px] font-bold text-slate-500 group-hover/file:text-indigo-600 transition-colors uppercase tracking-tight truncate max-w-[120px]">{sub.file}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <input type="number" defaultValue={sub.marks} placeholder="--" className="w-16 h-8 bg-slate-50 border border-slate-200 rounded-lg text-center text-xs font-black text-slate-900 focus:bg-white focus:ring-4 ring-indigo-50 focus:border-indigo-400 transition-all outline-none tabular-nums" />
                                            </td>
                                            <td className="px-6 py-4 text-right pr-10">
                                                <Badge className={cn(
                                                    "text-[8px] font-black border-none uppercase py-0.5 px-2",
                                                    sub.status === 'Graded' ? "bg-emerald-50 text-emerald-600" : 
                                                    sub.status === 'Flagged' ? "bg-rose-50 text-rose-600" : "bg-indigo-50 text-indigo-600"
                                                )}>{sub.status}</Badge>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </Card>
                    </div>

                    <div className="lg:col-span-4 space-y-6">
                        <Card className="p-8 rounded-[32px] bg-white border-none shadow-sm ring-1 ring-slate-200/60 flex flex-col hover:shadow-md transition-all h-full min-h-[400px]">
                            <h3 className="text-[10px] font-black text-slate-800 uppercase tracking-widest mb-6 flex items-center gap-2 italic text-left"><MessageSquare size={14} className="text-indigo-600" /> Node Feedback Hub</h3>
                            <textarea placeholder="Initialize confidential student remarks for this node..." className="flex-1 w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-[11px] font-medium text-slate-700 outline-none focus:ring-4 ring-indigo-50 focus:bg-white transition-all resize-none placeholder:text-slate-300 uppercase tracking-tighter" />
                            <div className="mt-6 flex flex-col gap-2">
                                <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white text-[9px] font-black uppercase tracking-widest h-10 rounded-xl">Commit Remark Node</Button>
                                <Button variant="ghost" className="w-full text-[9px] font-black uppercase text-rose-500 hover:bg-rose-50 rounded-xl h-10 tracking-widest"><Flag size={12} className="mr-2" /> Mark Node Incomplete</Button>
                            </div>
                        </Card>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
      </main>
    </div>
  );
}

function DashStat({ label, value, trend, color, icon }: any) {
    const colors: any = { indigo: "bg-indigo-50 text-indigo-600", emerald: "bg-emerald-50 text-emerald-600", blue: "bg-blue-50 text-blue-600", purple: "bg-purple-50 text-purple-600", orange: "bg-orange-50 text-orange-600", rose: "bg-rose-50 text-rose-600" }
    return (
        <Card className="p-3.5 rounded-xl bg-white border-none shadow-sm ring-1 ring-slate-100 flex flex-col justify-between hover:shadow-md transition-all h-[95px] cursor-default text-left">
            <div className="flex justify-between items-start w-full">
                <div className={cn("p-1.5 rounded-lg shadow-xs transition-transform group-hover:scale-110", colors[color])}>{icon}</div>
                <span className={cn("text-[6px] font-black px-1.5 py-0.5 rounded uppercase tracking-tighter", colors[color])}>{trend}</span>
            </div>
            <div className="mt-1"><p className="text-base font-black text-slate-900 tracking-tight leading-none tabular-nums">{value}</p><p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1.5 leading-none">{label}</p></div>
        </Card>
    )
}
"use client"

import React, { useState, useEffect } from 'react';
import { 
  FileText, Download, TrendingUp, Star, Clock, 
  CheckCircle2, Users, LayoutGrid, Search, Filter, 
  BarChart3, PieChart as PieChartIcon, ArrowUpRight, 
  FileBarChart, GraduationCap, Zap, MoreHorizontal,
  ChevronRight, Calendar
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
const performanceTrend = [
  { month: 'Jan', score: 72 }, { month: 'Feb', score: 78 },
  { month: 'Mar', score: 75 }, { month: 'Apr', score: 85 },
  { month: 'May', score: 82 }, { month: 'Jun', score: 89 },
];

const reportNodes = [
  { id: "REP-901", title: "Mid-Term Performance Audit", type: "PDF Dossier", date: "12 July 2026", size: "2.4 MB" },
  { id: "REP-902", title: "Monthly Attendance Analytics", type: "CSV Node", date: "10 July 2026", size: "1.1 MB" },
  { id: "REP-903", title: "Faculty Engagement Report", type: "PDF Dossier", date: "05 July 2026", size: "840 KB" },
];

export default function FacultyReportsNode() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <div className="flex flex-col h-full bg-[#FDFDFD] overflow-hidden animate-in fade-in duration-700 font-sans">
      
      {/* 1. TOP HEADER */}
      <header className="shrink-0 h-[64px] border-b border-slate-100 bg-white flex items-center justify-between px-6 z-20">
        <div className="flex flex-col">
            <div className="flex items-center gap-2 text-[10px] font-bold text-indigo-600 uppercase tracking-widest leading-none">
                ANALYTICAL ENGINE <span className="text-slate-300">•</span> <span className="text-slate-400">DATA_CORE_v1.0</span>
            </div>
            <h1 className="text-sm font-black text-slate-900 tracking-tight mt-1 uppercase italic leading-none">
                Faculty <span className="text-indigo-600 not-italic font-bold ml-1">Reports Node</span>
            </h1>
        </div>

        <div className="flex items-center gap-2">
           <Button variant="outline" className="h-8 text-[9px] font-bold uppercase tracking-wider border-slate-200 bg-white">
              <Calendar size={12} className="mr-1.5" /> Filter Date
           </Button>
           <Button className="h-8 bg-indigo-600 hover:bg-indigo-700 text-white text-[9px] font-bold uppercase shadow-md active:scale-95 transition-all px-4 rounded-lg border-none">
                <FileBarChart size={14} className="mr-1.5" /> Export All Reports
            </Button>
        </div>
      </header>

      {/* 2. SCROLLABLE AREA */}
      <main className="flex-1 overflow-y-auto p-4 lg:p-6 scrollbar-hide space-y-6 bg-slate-50/20">
        
        {/* KPI ANALYTIC ROW */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 max-w-[1700px] mx-auto">
           <DashStat label="Pass Ratio" value="94.2%" trend="STABLE" color="indigo" icon={<GraduationCap size={12}/>}/>
           <DashStat label="Avg Attendance" value="92%" trend="+2.4%" color="emerald" icon={<Users size={12}/>}/>
           <DashStat label="Marking Speed" value="3.2d" trend="FAST" color="blue" icon={<Zap size={12}/>}/>
           <DashStat label="Modules" value="14" trend="ACTIVE" color="purple" icon={<LayoutGrid size={12}/>}/>
           <DashStat label="Student Nodes" value="184" trend="SYNC" color="orange" icon={<Users size={12}/>}/>
           <DashStat label="Health" value="Elite" trend="v1.2" color="rose" icon={<CheckCircle2 size={12}/>}/>
        </div>

        {/* ANALYTICS SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1700px] mx-auto">
           
           {/* Subject Progress Ledger (Span 5) */}
           <Card className="lg:col-span-5 border-slate-100 shadow-sm rounded-[24px] p-6 bg-white hover:border-indigo-100 transition-all flex flex-col group">
              <div className="flex justify-between items-start mb-8">
                 <div>
                    <h3 className="text-[10px] font-black text-slate-800 uppercase tracking-widest flex items-center gap-2 italic">
                       <BarChart3 size={14} className="text-indigo-600" /> Syllabus Depth Node
                    </h3>
                    <p className="text-[11px] font-medium text-slate-400 mt-1 uppercase">Completion matrix per stream</p>
                 </div>
              </div>
              <div className="space-y-6 flex-1">
                 <ProgressBlock label="Advanced Mathematics" progress={85} color="bg-indigo-500" />
                 <ProgressBlock label="Quantum Physics Lab" progress={62} color="bg-emerald-500" />
                 <ProgressBlock label="Modern Computing Node" progress={94} color="bg-purple-500" />
                 <ProgressBlock label="Logic & Discrete Structures" progress={45} color="bg-orange-500" />
              </div>
           </Card>

           {/* Performance Evolution (Span 7) */}
           <Card className="lg:col-span-7 border-slate-100 shadow-sm rounded-[24px] p-6 bg-white hover:border-indigo-100 transition-all group overflow-hidden">
              <div className="flex justify-between items-start mb-8">
                 <h3 className="text-[10px] font-black text-slate-800 uppercase tracking-widest flex items-center gap-2 italic">
                    <TrendingUp size={14} className="text-indigo-600" /> Performance Evolution
                 </h3>
                 <Badge className="bg-indigo-50 text-indigo-600 border-none font-bold text-[8px] px-2 py-0.5 uppercase tracking-tighter">DATA_SYNC_PRO</Badge>
              </div>
              <div className="h-[280px] w-full group-hover:scale-[1.01] transition-transform duration-700">
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={performanceTrend}>
                       <defs>
                          <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                             <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                          </linearGradient>
                       </defs>
                       <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                       <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 800, fill: '#94a3b8'}} dy={10} />
                       <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 800, fill: '#94a3b8'}} />
                       <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.05)', fontSize: '10px', fontWeight: 900 }} />
                       <Area type="monotone" dataKey="score" stroke="#6366f1" strokeWidth={4} fill="url(#colorScore)" dot={{ r: 4, fill: '#6366f1', strokeWidth: 2, stroke: '#fff' }} />
                    </AreaChart>
                 </ResponsiveContainer>
              </div>
           </Card>
        </div>

        {/* RECENT REPORTS LEDGER */}
        <div className="max-w-[1700px] mx-auto pb-12">
           <div className="flex items-center justify-between mb-4 px-2">
                <h3 className="text-[11px] font-black text-slate-800 uppercase tracking-[0.2em] flex items-center gap-2">
                    <FileText size={16} className="text-indigo-600" /> Generated Archive Dossiers
                </h3>
                <button className="text-[10px] font-bold text-indigo-600 uppercase hover:underline">View All Documents</button>
           </div>
           <Card className="border-none bg-white rounded-3xl shadow-sm ring-1 ring-slate-200/60 overflow-hidden">
              <table className="w-full text-left">
                 <thead>
                    <tr className="bg-slate-50/50 border-b border-slate-100 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                       <th className="px-6 py-4">Report Identity Node</th>
                       <th className="px-6 py-4">Dossier Type</th>
                       <th className="px-6 py-4">Generation Timestamp</th>
                       <th className="px-6 py-4 text-right pr-10">Matrix Action</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-50 font-sans">
                    {reportNodes.map((report) => (
                       <tr key={report.id} className="group hover:bg-slate-50/50 transition-all border-l-2 border-transparent hover:border-indigo-600">
                          <td className="px-6 py-4">
                             <div className="flex items-center gap-4">
                                <div className="size-9 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-all shadow-sm">
                                   <FileText size={18} />
                                </div>
                                <div>
                                   <p className="text-[11px] font-black text-slate-800 uppercase leading-none">{report.title}</p>
                                   <p className="text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-tighter tabular-nums font-mono">{report.id}</p>
                                </div>
                             </div>
                          </td>
                          <td className="px-6 py-4">
                             <Badge variant="outline" className="text-[8px] font-black border-slate-100 bg-white text-slate-400 py-0 px-2 uppercase h-5">{report.type}</Badge>
                             <p className="text-[8px] font-bold text-slate-300 mt-1 uppercase tracking-widest">Weight: {report.size}</p>
                          </td>
                          <td className="px-6 py-4">
                             <div className="flex items-center gap-2 text-slate-500">
                                <Clock size={12} className="text-slate-300" />
                                <span className="text-[10px] font-bold uppercase">{report.date}</span>
                             </div>
                          </td>
                          <td className="px-6 py-4 text-right pr-10">
                             <Button variant="ghost" className="h-8 px-4 text-[9px] font-black uppercase text-indigo-600 hover:bg-indigo-50 border border-transparent hover:border-indigo-100 rounded-lg flex items-center gap-2 ml-auto group-hover:shadow-sm transition-all">
                                <Download size={12} /> Get Node
                             </Button>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </Card>
        </div>
      </main>
    </div>
  );
}

// --- HELPER COMPONENTS ---

function DashStat({ label, value, trend, color, icon }: any) {
    const colors: any = { indigo: "bg-indigo-50 text-indigo-600 shadow-indigo-100", emerald: "bg-emerald-50 text-emerald-600 shadow-emerald-100", blue: "bg-blue-50 text-blue-600 shadow-blue-100", purple: "bg-purple-50 text-purple-600 shadow-purple-100", orange: "bg-orange-50 text-orange-600 shadow-orange-100", rose: "bg-rose-50 text-rose-600 shadow-rose-100" }
    return (
        <Card className="p-3.5 rounded-xl bg-white border-none shadow-sm ring-1 ring-slate-100 flex flex-col justify-between hover:shadow-md hover:-translate-y-1 transition-all h-[95px] group">
            <div className="flex justify-between items-start w-full">
                <div className={cn("p-1.5 rounded-lg shadow-xs transition-transform group-hover:scale-110", colors[color])}>{icon}</div>
                <span className={cn("text-[6px] font-black px-1.5 py-0.5 rounded uppercase tracking-tighter", colors[color])}>{trend}</span>
            </div>
            <div className="mt-1">
                <p className="text-lg font-black text-slate-900 tracking-tighter leading-none tabular-nums">{value}</p>
                <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1.5 leading-none group-hover:text-indigo-600 transition-colors">{label}</p>
            </div>
        </Card>
    )
}

function ProgressBlock({ label, progress, color }: any) {
    return (
        <div className="space-y-3 p-3 rounded-2xl bg-slate-50/50 border border-transparent hover:bg-white hover:border-slate-100 hover:shadow-sm transition-all group/item">
            <div className="flex justify-between items-end">
                <p className="text-[10px] font-black text-slate-800 uppercase tracking-tight group-hover/item:text-indigo-600 transition-colors">{label}</p>
                <span className="text-[10px] font-black text-slate-900">{progress}%</span>
            </div>
            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner">
                <div className={cn("h-full transition-all duration-1000", color)} style={{ width: `${progress}%` }} />
            </div>
        </div>
    )
}
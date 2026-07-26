"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, Calendar, Plus, MoreVertical, 
  CheckCircle2, Clock, Users, AlertCircle,
  TrendingUp, Zap, Sparkles, Filter,
  ArrowUpRight, Target, ClipboardCheck, LayoutGrid,
  ChevronRight, Search, Download
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

// --- TYPES ---
type ExamStatus = 'Published' | 'Evaluating' | 'Draft' | 'Scheduled';

interface Exam {
  id: string;
  title: string;
  category: string;
  date: string;
  status: ExamStatus;
  enrolled: number;
  markingProgress: number;
  averageScore?: string;
}

const exams: Exam[] = [
  { id: "EXM-771", title: "Mid-Term Examination 2026", category: "High School (Matric)", date: "July 28", status: "Published", enrolled: 450, markingProgress: 100, averageScore: "78%" },
  { id: "EXM-802", title: "Monthly Assessment - Science", category: "Grade 9 (Science)", date: "July 30", status: "Evaluating", enrolled: 120, markingProgress: 45 },
  { id: "EXM-915", title: "Global Finals Phase 01", category: "O-Levels / A-Levels", date: "Sept 15", status: "Scheduled", enrolled: 1240, markingProgress: 0 },
  { id: "EXM-654", title: "Chemistry Practical Lab", category: "Grade 10", date: "Aug 05", status: "Draft", enrolled: 85, markingProgress: 0 },
];

export default function EliteExamManagement() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <div className="p-6 lg:p-10 space-y-10 max-w-[1700px] mx-auto animate-in fade-in duration-700">
      
      {/* 1. ASSESSMENT COMMAND HEADER */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-8 bg-white p-8 rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5">
           <ClipboardCheck size={120} />
        </div>
        
        <div className="space-y-3 relative z-10">
          <div className="flex items-center gap-3">
            <Badge className="bg-slate-900 text-white border-none font-black text-[9px] tracking-widest px-2.5 py-1">ASSESSMENT NODE v1.2</Badge>
            <div className="flex items-center gap-1.5 text-slate-400 font-bold text-[10px] uppercase tracking-widest">
               <Zap size={12} className="text-amber-500 animate-pulse" /> Global Grading Active
            </div>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter leading-none">Examination <span className="text-indigo-600">Command</span></h1>
          <p className="text-xs text-slate-500 font-medium max-w-md uppercase tracking-tight">Schedule assessments, monitor marking velocity, and deploy result reports across nodes.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3 relative z-10">
           <Button variant="outline" className="h-12 px-6 rounded-2xl border-slate-200 text-[10px] font-black uppercase tracking-widest gap-2 bg-white">
              <Download size={16} /> Archive Logs
           </Button>
           <Button className="bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-100 h-12 px-8 rounded-2xl font-black uppercase text-[10px] gap-2 tracking-widest transition-all">
              <Plus size={18} strokeWidth={3} /> New Assessment
           </Button>
        </div>
      </div>

      {/* 2. BENTO KPIS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <KPIBlock icon={<ClipboardCheck className="text-indigo-600" />} label="Active Exams" value="14" trend="+2 this month" />
         <KPIBlock icon={<Users className="text-emerald-600" />} label="Registrations" value="1,422" trend="98% Attendance" />
         <KPIBlock icon={<Clock className="text-amber-600" />} label="Avg Evaluation" value="3.2d" trend="Evaluating Node" />
      </div>

      {/* 3. FILTER BAR */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="bg-white/80 p-1 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-1 overflow-x-auto">
           {['All Exams', 'Current Term', 'Evaluated', 'Drafts'].map((f) => (
             <button key={f} className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${f === 'All Exams' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}>{f}</button>
           ))}
        </div>
        <div className="relative w-full md:w-80">
           <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
           <input placeholder="Search Exam Node ID..." className="w-full pl-11 pr-4 h-11 bg-white border border-slate-200 rounded-xl text-xs font-bold outline-none focus:ring-4 ring-indigo-50 transition-all" />
        </div>
      </div>

      {/* 4. THE MASTER EXAM LEDGER */}
      <Card className="border-none shadow-2xl shadow-slate-200/50 rounded-[40px] bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] border-b border-slate-100">
                <th className="p-6">Assessment Profile</th>
                <th className="p-6">Node Allocation</th>
                <th className="p-6">Operational Status</th>
                <th className="p-6">Grading Matrix</th>
                <th className="p-6 text-right">Terminal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {exams.map((exam) => (
                <tr key={exam.id} className="group hover:bg-slate-50/50 transition-all cursor-default">
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                       <div className="p-3 rounded-2xl bg-slate-50 text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                          <FileText size={20} />
                       </div>
                       <div>
                          <p className="text-sm font-black text-slate-900 leading-none mb-1.5">{exam.title}</p>
                          <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">{exam.id}</p>
                       </div>
                    </div>
                  </td>
                  <td className="p-6">
                     <Badge variant="outline" className="border-slate-100 bg-white text-slate-400 font-bold text-[9px] px-2 py-0.5 rounded-md uppercase">{exam.category}</Badge>
                     <div className="flex items-center gap-1.5 mt-2 text-[10px] font-black text-slate-700">
                        <Users size={12} className="text-slate-300" /> {exam.enrolled} Students
                     </div>
                  </td>
                  <td className="p-6">
                     <div className="flex items-center gap-2">
                        <div className={`size-1.5 rounded-full animate-pulse ${getStatusColor(exam.status).dot}`} />
                        <Badge className={`border-none font-black text-[9px] uppercase px-2 py-0.5 rounded-lg ${getStatusColor(exam.status).bg} ${getStatusColor(exam.status).text}`}>
                           {exam.status}
                        </Badge>
                     </div>
                     <p className="text-[9px] font-bold text-slate-400 uppercase mt-2 ml-3.5 italic tracking-tighter">Event: {exam.date}</p>
                  </td>
                  <td className="p-6 w-56">
                     <div className="space-y-1.5">
                        <div className="flex justify-between items-end">
                           <span className="text-[9px] font-black text-slate-400 uppercase">Velocity</span>
                           <span className="text-[10px] font-black text-indigo-600">{exam.markingProgress}%</span>
                        </div>
                        <Progress value={exam.markingProgress} className="h-1 bg-slate-50" />
                        {exam.averageScore && (
                          <p className="text-[9px] font-bold text-emerald-500 uppercase mt-1">Avg Success: {exam.averageScore}</p>
                        )}
                     </div>
                  </td>
                  <td className="p-6 text-right">
                     <Button variant="ghost" size="icon" className="rounded-xl text-slate-300 hover:text-indigo-600 hover:bg-white shadow-sm transition-all">
                        <MoreVertical size={20} />
                     </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* 5. SYSTEM ALERT LEDGER */}
      <div className="bg-slate-900 rounded-3xl p-6 flex items-center justify-between border border-white/5 shadow-2xl shadow-slate-900/20">
         <div className="flex items-center gap-4">
            <div className="p-3 bg-white/5 rounded-2xl text-amber-400 border border-white/5 shadow-inner">
               <AlertCircle size={24} />
            </div>
            <div>
               <h4 className="text-sm font-black text-white uppercase tracking-widest">Protocol Warning</h4>
               <p className="text-[11px] font-medium text-slate-400 mt-0.5">Evaluation node for "Mid-Term exams" is pending for 48 hours. Require faculty sync.</p>
            </div>
         </div>
         <Button className="bg-white hover:bg-slate-50 text-slate-900 h-11 px-8 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-xl">Deploy Sync</Button>
      </div>

    </div>
  );
}

// --- WORLD CLASS SUB-COMPONENTS ---

function KPIBlock({ icon, label, value, trend }: { icon: React.ReactNode, label: string, value: string, trend: string }) {
  return (
    <Card className="border-none shadow-xl shadow-slate-200/40 rounded-[32px] bg-white p-6 flex items-center gap-5 group cursor-default">
       <div className="p-4 bg-slate-50 rounded-2xl group-hover:scale-110 transition-transform duration-500">
          {icon}
       </div>
       <div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
          <p className="text-xl font-black text-slate-900 leading-none">{value}</p>
          <p className="text-[9px] font-bold text-emerald-500 uppercase mt-1 tracking-tighter">{trend}</p>
       </div>
    </Card>
  )
}

function getStatusColor(status: ExamStatus) {
  switch (status) {
    case 'Published': return { bg: 'bg-emerald-50', text: 'text-emerald-600', dot: 'bg-emerald-500' };
    case 'Evaluating': return { bg: 'bg-amber-50', text: 'text-amber-600', dot: 'bg-amber-500' };
    case 'Scheduled': return { bg: 'bg-indigo-50', text: 'text-indigo-600', dot: 'bg-indigo-500' };
    default: return { bg: 'bg-slate-100', text: 'text-slate-500', dot: 'bg-slate-400' };
  }
}
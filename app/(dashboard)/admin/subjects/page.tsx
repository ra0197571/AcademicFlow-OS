"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Book, Users, Plus, Search, MoreVertical, 
  Layers, GraduationCap, Clock, Filter, 
  Sparkles, CheckCircle2, BookOpen, Microscope,
  Globe2, Monitor, ArrowUpRight, Target
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// --- TYPES & DATA ---
interface Subject {
  id: string;
  name: string;
  code: string;
  stream: 'Science' | 'Arts' | 'Tech' | 'Language';
  teacher: { name: string; avatar: string };
  load: number;
  students: number;
  progress: number;
  type: 'Core' | 'Elective';
}

const subjects: Subject[] = [
  { id: "1", name: "Advanced Mathematics", code: "MTH-401", stream: 'Science', teacher: { name: "Zia Khan", avatar: "1" }, load: 8, students: 142, progress: 65, type: 'Core' },
  { id: "2", name: "Quantum Physics", code: "PHY-302", stream: 'Science', teacher: { name: "Sarah Ahmed", avatar: "2" }, load: 6, students: 98, progress: 40, type: 'Core' },
  { id: "3", name: "Modern Computing", code: "CS-505", stream: 'Tech', teacher: { name: "Bilal Raza", avatar: "3" }, load: 7, students: 120, progress: 85, type: 'Elective' },
  { id: "4", name: "English Literature", code: "ENG-101", stream: 'Language', teacher: { name: "Fatima Ali", avatar: "4" }, load: 5, students: 200, progress: 92, type: 'Core' },
  { id: "5", name: "Organic Chemistry", code: "CHM-202", stream: 'Science', teacher: { name: "Usman Ghani", avatar: "5" }, load: 6, students: 110, progress: 30, type: 'Core' },
];

export default function EliteSubjectManagement() {
  const [activeStream, setActiveStream] = useState('All');
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <div className="p-6 lg:p-10 space-y-10 max-w-[1700px] mx-auto animate-in fade-in duration-700">
      
      {/* 1. CURRICULUM COMMAND HEADER */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-8 bg-white p-8 rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
           <Book size={120} />
        </div>
        
        <div className="space-y-3 relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <Badge className="bg-indigo-600 text-white border-none font-black text-[9px] tracking-widest px-2.5 py-1">CURRICULUM v2.0</Badge>
            <div className="flex items-center gap-1.5 text-slate-400 font-bold text-[10px] uppercase tracking-widest">
               <Sparkles size={12} className="text-amber-500 animate-pulse" /> 14 Active Subjects Enrolled
            </div>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter leading-none">Curriculum <span className="text-indigo-600">Architecture</span></h1>
          <p className="text-xs text-slate-500 font-medium max-w-md uppercase tracking-tight">Define academic nodes, lead faculty assignments, and track syllabus coverage metrics.</p>
        </div>

        <div className="flex flex-wrap items-center gap-6 bg-slate-50 p-6 rounded-3xl border border-slate-100 relative z-10">
           <div className="text-center px-4 border-r border-slate-200">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Weekly Load</p>
              <p className="text-xl font-black text-slate-900 leading-none">42 <span className="text-[10px] text-indigo-500">Periods</span></p>
           </div>
           <div className="text-center px-4 border-r border-slate-200">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Avg Progress</p>
              <p className="text-xl font-black text-slate-900 leading-none">72% <span className="text-[10px] text-emerald-500">Done</span></p>
           </div>
           <Button className="bg-slate-900 hover:bg-indigo-600 shadow-xl h-12 rounded-2xl font-black uppercase text-[10px] gap-2 tracking-widest px-8">
              <Plus size={16} strokeWidth={3} /> Add Node
           </Button>
        </div>
      </div>

      {/* 2. SMART FILTERING & SEARCH */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between sticky top-4 z-30">
        <div className="bg-white/80 backdrop-blur-xl p-1.5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-1">
           {['All', 'Science', 'Tech', 'Arts', 'Language'].map((stream) => (
             <button 
                key={stream}
                onClick={() => setActiveStream(stream)}
                className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeStream === stream ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
             >
                {stream}
             </button>
           ))}
        </div>

        <div className="relative group w-full md:w-96">
           <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
           <input placeholder="Search Curriculum ID or Name..." className="w-full pl-12 pr-4 h-12 bg-white border border-slate-200 rounded-2xl text-sm font-bold outline-none focus:ring-4 ring-indigo-50 transition-all shadow-sm" />
        </div>
      </div>

      {/* 3. SUBJECT NODES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 pb-20">
        {subjects.map((sub) => (
          <SubjectCard key={sub.id} subject={sub} />
        ))}
      </div>
    </div>
  );
}

// --- WORLD CLASS CARD COMPONENT ---

function SubjectCard({ subject }: { subject: Subject }) {
  const getStreamIcon = (stream: string) => {
    switch(stream) {
      case 'Science': return <Microscope size={22}/>;
      case 'Tech': return <Monitor size={22}/>;
      case 'Language': return <Globe2 size={22}/>;
      default: return <BookOpen size={22}/>;
    }
  }

  return (
    <motion.div whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 300 }}>
       <Card className="border-none shadow-xl shadow-slate-200/40 rounded-[32px] bg-white overflow-hidden group cursor-default">
          <div className="p-8 space-y-6">
             {/* Card Top */}
             <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                   <div className="size-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white group-hover:shadow-xl group-hover:shadow-indigo-100 transition-all duration-500">
                      {getStreamIcon(subject.stream)}
                   </div>
                   <div>
                      <h3 className="text-lg font-black text-slate-900 tracking-tight leading-none mb-1.5 group-hover:text-indigo-600 transition-colors">{subject.name}</h3>
                      <div className="flex items-center gap-2">
                         <span className="text-[10px] font-black text-indigo-400 tracking-widest uppercase">{subject.code}</span>
                         <Badge className="bg-slate-50 text-slate-400 border-none text-[8px] font-black uppercase rounded-md px-2 py-0.5">{subject.type}</Badge>
                      </div>
                   </div>
                </div>
                <button className="text-slate-200 hover:text-slate-400 transition-colors"><MoreVertical size={20}/></button>
             </div>

             {/* Progress Matrix */}
             <div className="space-y-2">
                <div className="flex justify-between items-end">
                   <div className="flex items-center gap-1.5 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                      <Target size={12} className="text-indigo-600" /> Syllabus Coverage
                   </div>
                   <span className="text-[10px] font-black text-indigo-600 tabular-nums">{subject.progress}%</span>
                </div>
                <Progress value={subject.progress} className="h-1.5 bg-slate-50" />
             </div>

             {/* Meta Grid */}
             <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 group-hover:bg-white group-hover:shadow-sm transition-all">
                   <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Load / Week</p>
                   <div className="flex items-center gap-2 text-xs font-black text-slate-800">
                      <Clock size={14} className="text-indigo-400" /> {subject.load} Sessions
                   </div>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 group-hover:bg-white group-hover:shadow-sm transition-all">
                   <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Student Body</p>
                   <div className="flex items-center gap-2 text-xs font-black text-slate-800">
                      <Users size={14} className="text-emerald-400" /> {subject.students} Active
                   </div>
                </div>
             </div>

             {/* Faculty & Footer */}
             <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                <div className="flex items-center gap-3 group/faculty cursor-pointer">
                   <Avatar className="size-9 border-2 border-white shadow-md">
                      <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${subject.teacher.avatar}`} />
                      <AvatarFallback className="bg-indigo-50 text-indigo-600 text-[10px] font-bold">T</AvatarFallback>
                   </Avatar>
                   <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter leading-none mb-1">Lead Faculty</p>
                      <p className="text-xs font-bold text-slate-800 group-hover/faculty:text-indigo-600 transition-colors leading-none">{subject.teacher.name}</p>
                   </div>
                </div>
                <Button variant="ghost" size="sm" className="h-10 rounded-xl group-hover:bg-indigo-50 text-[10px] font-black uppercase text-indigo-600 hover:text-indigo-700 tracking-widest">
                   Launch Ledger <ArrowUpRight size={14} className="ml-1" />
                </Button>
             </div>
          </div>
       </Card>
    </motion.div>
  )
}
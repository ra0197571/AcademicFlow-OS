"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, MoreHorizontal, Search, MessageSquare, 
  CheckCircle2, Clock, AlertCircle, GripVertical,
  Filter, Users, LayoutGrid, List, Paperclip,
  ArrowUpRight, Settings2, CheckSquare, Hash
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// --- TYPES (STRICT) ---
type Priority = 'High' | 'Medium' | 'Low';

interface Task {
  id: string;
  code: string;
  title: string;
  priority: Priority;
  tags: string[];
  comments: number;
  attachments: number;
  subtasks: { done: number; total: number };
  progress: number;
  assignees: { name: string; avatar: string }[];
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
  color: string;
  accent: string;
}

const INITIAL_DATA: Column[] = [
  { 
    id: "backlog", title: "Backlog", color: "bg-slate-400", accent: "border-t-slate-400",
    tasks: [
      { id: '1', code: 'ADM-101', title: "Finalize Mid-term Schedule", priority: "High", tags: ["Academic"], comments: 5, attachments: 2, subtasks: {done: 0, total: 5}, progress: 0, assignees: [{name: 'Ali', avatar: '1'}] },
      { id: '2', code: 'FIN-202', title: "Review Teacher Payroll", priority: "Medium", tags: ["Finance"], comments: 2, attachments: 1, subtasks: {done: 1, total: 3}, progress: 20, assignees: [{name: 'Usman', avatar: '3'}] }
    ]
  },
  { 
    id: "in-progress", title: "In Progress", color: "bg-indigo-500", accent: "border-t-indigo-500",
    tasks: [
      { id: '3', code: 'DEV-303', title: "Portal UI Redesign Phase 2", priority: "High", tags: ["Tech"], comments: 12, attachments: 8, subtasks: {done: 4, total: 6}, progress: 65, assignees: [{name: 'Sarah', avatar: '4'}] }
    ]
  },
  { 
    id: "review", title: "Verification", color: "bg-amber-500", accent: "border-t-amber-500",
    tasks: [
      { id: '4', code: 'OPS-404', title: "Library Book Audit - South", priority: "Low", tags: ["Campus"], comments: 3, attachments: 0, subtasks: {done: 9, total: 10}, progress: 90, assignees: [{name: 'Fatima', avatar: '6'}] }
    ]
  },
  { 
    id: "done", title: "Completed", color: "bg-emerald-500", accent: "border-t-emerald-500",
    tasks: [
      { id: '5', code: 'EVENT-505', title: "Annual PTM Meeting", priority: "Medium", tags: ["Social"], comments: 24, attachments: 12, subtasks: {done: 12, total: 12}, progress: 100, assignees: [{name: 'Ali', avatar: '1'}] }
    ]
  }
];

export default function UltimateKanbanCommand() {
  const [mounted, setMounted] = useState(false);
  const [view, setView] = useState<'board' | 'list'>('board');

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <TooltipProvider>
      <div className="flex flex-col h-[calc(100vh-2px)] w-full min-w-0 bg-[#F8FAFC] overflow-hidden">
        
        {/* 1. COMPACT HEADER */}
        <header className="h-16 shrink-0 flex items-center justify-between px-6 bg-white border-b z-30 shadow-sm">
          <div className="flex items-center gap-4">
             <div>
                <h1 className="text-lg font-black text-slate-900 tracking-tight leading-none uppercase italic">Command <span className="text-indigo-600">Board</span></h1>
                <div className="flex items-center gap-2 mt-1">
                   <Badge className="bg-emerald-50 text-emerald-600 border-none font-black text-[7px] uppercase px-1.5 py-0">Live Sync</Badge>
                </div>
             </div>

             <div className="h-8 w-px bg-slate-100 hidden lg:block" />

             <div className="hidden lg:flex bg-slate-50 p-1 rounded-lg border border-slate-100">
                <button onClick={() => setView('board')} className={`px-3 py-1 rounded-md text-[9px] font-black uppercase flex items-center gap-1.5 transition-all ${view === 'board' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400'}`}>
                   <LayoutGrid size={12} /> Board
                </button>
                <button onClick={() => setView('list')} className={`px-3 py-1 rounded-md text-[9px] font-black uppercase flex items-center gap-1.5 transition-all ${view === 'list' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400'}`}>
                   <List size={12} /> List
                </button>
             </div>
          </div>

          <div className="flex items-center gap-3">
             <div className="relative hidden xl:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={14} />
                <input placeholder="Search IDs... (⌘K)" className="w-48 pl-9 h-9 bg-slate-50 border-none rounded-xl text-[10px] font-bold outline-none focus:ring-2 ring-indigo-50 transition-all shadow-inner" />
             </div>
             
             <div className="flex -space-x-1.5 mr-1">
                {[1, 2].map(i => (
                   <Avatar key={i} className="size-7 border-2 border-white"><AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i+20}`} /></Avatar>
                ))}
             </div>

             <Button className="h-9 bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-100 rounded-xl gap-2 font-black text-[10px] uppercase tracking-widest px-4 transition-all group">
                <Plus size={16} strokeWidth={3} /> New Task
             </Button>
          </div>
        </header>

        {/* 2. COMPACT FILTER BAR */}
        <div className="h-10 shrink-0 bg-white/50 border-b px-6 flex items-center justify-between backdrop-blur-md">
           <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-[9px] font-black text-slate-400 uppercase tracking-widest cursor-pointer hover:text-indigo-600"><Filter size={12} /> Filter</div>
              <div className="flex items-center gap-1.5 text-[9px] font-black text-slate-400 uppercase tracking-widest cursor-pointer hover:text-indigo-600"><Users size={12} /> Team</div>
           </div>
           <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">Global Ops Terminal</p>
        </div>

        {/* 3. MAIN KANBAN BOARD (NO HORIZONTAL SCROLL) */}
        <main className="flex-1 w-full bg-slate-50/30 overflow-hidden">
          <div className="flex h-full p-4 w-full gap-3 overflow-hidden">
             {INITIAL_DATA.map((col) => (
                <div key={col.id} className="flex-1 min-w-0 max-w-[25%] flex flex-col gap-3">
                   {/* Column Header */}
                   <div className="flex items-center justify-between px-1 shrink-0">
                      <div className="flex items-center gap-2">
                         <div className={`size-2 rounded-full ${col.color} shadow-sm`} />
                         <h2 className="text-[9px] font-black text-slate-600 uppercase tracking-widest truncate">{col.title}</h2>
                         <Badge variant="outline" className="bg-white border-slate-100 text-slate-400 font-black text-[8px] px-1.5 py-0 rounded-md">
                            {col.tasks.length}
                         </Badge>
                      </div>
                      <button className="p-1 hover:text-indigo-600 transition-all text-slate-300"><Plus size={14}/></button>
                   </div>

                   {/* Task List */}
                   <div className="flex-1 space-y-3 overflow-y-auto pr-1 custom-scrollbar-thin pb-4">
                      <AnimatePresence>
                         {col.tasks.map((task) => (
                            <motion.div 
                               key={task.id}
                               whileHover={{ y: -2, boxShadow: "0 12px 20px -8px rgba(0, 0, 0, 0.08)" }}
                               className={`bg-white p-3.5 rounded-[20px] border border-slate-200 border-t-4 ${col.accent} shadow-sm group cursor-grab transition-all relative overflow-hidden`}
                            >
                               <div className="flex justify-between items-center mb-2.5">
                                  <div className="flex items-center gap-1.5 font-black text-indigo-400 text-[9px] tracking-widest uppercase truncate"><Hash size={10} />{task.code}</div>
                                  <div className={`p-1 rounded-md ${task.priority === 'High' ? 'bg-rose-50 text-rose-500' : 'bg-amber-50 text-amber-500'}`}>
                                     <Tooltip>
                                        <TooltipTrigger>{task.priority === 'High' ? <AlertCircle size={12} strokeWidth={3} /> : <Clock size={12} strokeWidth={3} />}</TooltipTrigger>
                                        <TooltipContent className="text-[8px] font-black uppercase">{task.priority} Prio</TooltipContent>
                                     </Tooltip>
                                  </div>
                               </div>

                               <h3 className="text-[12px] font-bold text-slate-800 leading-tight mb-3 group-hover:text-indigo-600 transition-colors line-clamp-2">
                                  {task.title}
                                </h3>

                               {/* Checklist & Progress */}
                               <div className="mb-3 space-y-1.5">
                                  <div className="flex justify-between items-end text-[8px] font-black text-slate-400 uppercase tracking-widest">
                                     <div className="flex items-center gap-1"><CheckSquare size={10} className="text-emerald-500" /> {task.subtasks.done}/{task.subtasks.total}</div>
                                     <span className="text-indigo-600">{task.progress}%</span>
                                  </div>
                                  <Progress value={task.progress} className="h-1 bg-slate-50" />
                               </div>

                               <div className="flex justify-between items-center pt-2.5 border-t border-slate-50">
                                  <div className="flex -space-x-1.5">
                                     {task.assignees.map((u, i) => (
                                        <Avatar key={i} className="size-6 border-2 border-white shadow-sm transition-transform hover:scale-110 cursor-pointer"><AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${u.name}`} /></Avatar>
                                     ))}
                                  </div>
                                  <div className="flex items-center gap-2 text-slate-300 text-[8px] font-black">
                                     <div className="flex items-center gap-0.5"><MessageSquare size={10} /> {task.comments}</div>
                                     <div className="flex items-center gap-0.5"><Paperclip size={10} /> {task.attachments}</div>
                                  </div>
                               </div>
                               <div className="absolute left-0.5 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"><GripVertical size={12} className="text-slate-200" /></div>
                            </motion.div>
                         ))}
                      </AnimatePresence>
                      <button className="w-full py-2.5 rounded-[18px] border-2 border-dashed border-slate-200 text-slate-300 text-[9px] font-black uppercase tracking-widest hover:border-indigo-300 hover:text-indigo-600 transition-all">+ Add New</button>
                   </div>
                </div>
             ))}
          </div>
        </main>

        {/* 4. COMPACT STATUS BAR */}
        <footer className="h-10 shrink-0 bg-slate-900 text-white px-6 flex items-center justify-between z-40 relative">
           <div className="flex items-center gap-4">
              <div className="flex items-center gap-2"><div className="size-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" /><p className="text-[8px] font-black uppercase tracking-widest text-emerald-500 truncate">System Nominal</p></div>
              <div className="h-3 w-px bg-white/10" />
              <p className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter truncate">142 Global Records Tracking</p>
           </div>
           <button className="flex items-center gap-1.5 text-[8px] font-black uppercase tracking-widest text-indigo-400 hover:text-indigo-300 transition-all group">Timeline <ArrowUpRight size={12} className="group-hover:translate-x-0.5 transition-transform" /></button>
        </footer>
      </div>
    </TooltipProvider>
  )
}
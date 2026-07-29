"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, MoreHorizontal, Search, MessageSquare, 
  Clock, AlertCircle, GripVertical,
  Filter, Users, LayoutGrid, List, Paperclip,
  ArrowUpRight, CheckSquare, Hash, Pencil, Trash2, Archive, Share2,
  Activity, Zap, BarChart3, TrendingUp
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Card, CardContent } from "@/components/ui/card";
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip as RechartTooltip, Cell } from "recharts";
import { cn } from "@/lib/utils";

const VELOCITY_DATA = [
  { day: 'Mon', completed: 4 }, { day: 'Tue', completed: 7 },
  { day: 'Wed', completed: 5 }, { day: 'Thu', completed: 9 },
  { day: 'Fri', completed: 12 }, { day: 'Sat', completed: 3 },
];

const INITIAL_DATA = [
  { id: "backlog", title: "Backlog", color: "bg-slate-400", accent: "border-t-slate-400",
    tasks: [{ id: '1', code: 'ADM-101', title: "Finalize Mid-term Schedule", priority: "High", comments: 5, attachments: 2, subtasks: {done: 0, total: 5}, progress: 12, assignees: [{name: 'Ali'}] }]
  },
  { id: "in-progress", title: "In Progress", color: "bg-indigo-500", accent: "border-t-indigo-500",
    tasks: [{ id: '3', code: 'DEV-303', title: "Portal UI Redesign Phase 2", priority: "High", comments: 12, attachments: 8, subtasks: {done: 4, total: 6}, progress: 65, assignees: [{name: 'Sarah'}] }]
  },
  { id: "review", title: "Verification", color: "bg-amber-500", accent: "border-t-amber-500",
    tasks: [{ id: '4', code: 'OPS-404', title: "Library Book Audit - South", priority: "Low", comments: 3, attachments: 0, subtasks: {done: 9, total: 10}, progress: 90, assignees: [{name: 'Fatima'}] }]
  },
  { id: "done", title: "Completed", color: "bg-emerald-500", accent: "border-t-emerald-500",
    tasks: [{ id: '5', code: 'EVENT-505', title: "Annual PTM Meeting", priority: "Medium", comments: 24, attachments: 12, subtasks: {done: 12, total: 12}, progress: 100, assignees: [{name: 'Zia'}] }]
  }
];

export default function UltimateKanbanCommand() {
  const [mounted, setMounted] = useState(false);
  const [view, setView] = useState<'board' | 'list'>('board');

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <TooltipProvider>
      <div className="space-y-6 animate-in fade-in duration-500 pb-10">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white/90 backdrop-blur-md p-4 rounded-xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center gap-4">
             <div>
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
                  <span className="font-bold text-indigo-600 uppercase tracking-wider text-[10px]">Operations Center</span>
                  <span>•</span>
                  <span>Live Sync Terminal</span>
                </div>
                <h1 className="text-xl font-black text-slate-900 tracking-tighter mt-0.5 uppercase italic">
                  Command <span className="text-indigo-600">Board</span>
                </h1>
             </div>

             <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200/60 ml-2">
                <button onClick={() => setView('board')} className={cn("px-4 py-1.5 rounded-md text-[10px] font-black uppercase transition-all", view === 'board' ? 'bg-white text-indigo-600 shadow-2xs' : 'text-slate-500')}>Board</button>
                <button onClick={() => setView('list')} className={cn("px-4 py-1.5 rounded-md text-[10px] font-black uppercase transition-all", view === 'list' ? 'bg-white text-indigo-600 shadow-2xs' : 'text-slate-500')}>List</button>
             </div>
          </div>

          <div className="flex items-center gap-2">
             <Button variant="outline" size="sm" className="h-9 rounded-lg text-[10px] font-bold border-slate-200 bg-white gap-2 hover:bg-slate-50">
                <Users size={14} /> Team View
             </Button>
             <Button size="sm" className="h-9 rounded-lg text-[10px] font-bold bg-indigo-600 hover:bg-indigo-700 text-white gap-2 shadow-lg shadow-indigo-100 px-5">
                <Plus size={16} strokeWidth={3} /> New Task
             </Button>
          </div>
        </div>

        {/* OPS ANALYTICS (Enhanced) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
           <Card className="lg:col-span-8 border border-slate-200/80 shadow-2xs rounded-xl bg-white p-4">
              <div className="flex items-center justify-between mb-6">
                 <div className="flex items-center gap-2">
                    <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600"><BarChart3 size={18} /></div>
                    <span className="text-[11px] font-black text-slate-900 uppercase tracking-widest">Velocity Analytics</span>
                 </div>
                 <Badge className="bg-emerald-50 text-emerald-600 border-none text-[8px] font-black px-2 py-0.5 uppercase">+14% Progress</Badge>
              </div>
              <div className="h-[90px] w-full">
                 <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={VELOCITY_DATA} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                       <Bar dataKey="completed" radius={[6, 6, 0, 0]} barSize={40}>
                          {VELOCITY_DATA.map((entry, index) => (
                             <Cell key={`cell-${index}`} fill={index === 4 ? '#4f46e5' : '#f1f5f9'} fillOpacity={index === 4 ? 1 : 0.8} />
                          ))}
                       </Bar>
                       <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 9, fontWeight: 700, fill: '#94a3b8'}} />
                       <RechartTooltip contentStyle={{ borderRadius: '12px', border: 'none', fontSize: '10px', fontWeight: 'bold', boxShadow: '0 10px 15px rgba(0,0,0,0.1)' }} cursor={{fill: 'transparent'}} />
                    </BarChart>
                 </ResponsiveContainer>
              </div>
           </Card>

           <div className="lg:col-span-4 grid grid-cols-2 gap-4">
              <StatItem icon={<AlertCircle size={14} />} label="High Priority" value="08" color="rose" />
              <StatItem icon={<Clock size={14} />} label="Overdue" value="03" color="amber" />
              <StatItem icon={<TrendingUp size={14} />} label="Efficiency" value="94%" color="emerald" />
              <StatItem icon={<Zap size={14} />} label="Sprint Days" value="12" color="indigo" />
           </div>
        </div>

        {/* KANBAN BOARD (Responsive Grid) */}
        <main className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
           {INITIAL_DATA.map((col) => (
              <div key={col.id} className="flex flex-col gap-4">
                 <div className="flex items-center justify-between px-2">
                    <div className="flex items-center gap-2.5">
                       <div className={cn("size-2.5 rounded-full shadow-sm animate-pulse", col.color)} />
                       <h2 className="text-[12px] font-black text-slate-700 uppercase tracking-widest leading-none">{col.title}</h2>
                       <Badge variant="outline" className="bg-white border-slate-200 text-slate-400 font-bold text-[9px] px-1.5 py-0 rounded-md">{col.tasks.length}</Badge>
                    </div>
                    <DropdownMenu>
                       <DropdownMenuTrigger className={cn(buttonVariants({variant: "ghost", size: "icon"}), "h-7 w-7 text-slate-300 hover:text-indigo-600 outline-none")}>
                          <MoreHorizontal size={16} />
                       </DropdownMenuTrigger>
                       <DropdownMenuContent align="end" className="w-40 rounded-xl p-1.5 shadow-xl border-slate-200">
                          <DropdownMenuItem className="text-[11px] font-bold gap-2 cursor-pointer"><Pencil size={12}/> Edit Column</DropdownMenuItem>
                          <DropdownMenuItem className="text-[11px] font-bold text-rose-600 hover:bg-rose-50 cursor-pointer"><Trash2 size={12}/> Archive</DropdownMenuItem>
                       </DropdownMenuContent>
                    </DropdownMenu>
                 </div>

                 <div className="space-y-4">
                    {col.tasks.map((task, index) => (
                       <motion.div key={task.id} whileHover={{ y: -5 }} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
                          <Card className={cn("border-none shadow-2xs rounded-xl bg-white p-4 relative border-t-4 hover:shadow-xl transition-all duration-300 group", col.accent)}>
                             <div className="flex justify-between items-start mb-3">
                                <div className="flex items-center gap-1.5 font-black text-indigo-500 text-[10px] tracking-tight uppercase bg-indigo-50/50 px-2 py-0.5 rounded-md">
                                   <Hash size={11} className="text-indigo-300" />{task.code}
                                </div>
                                <DropdownMenu>
                                   <DropdownMenuTrigger className={cn(buttonVariants({variant: "ghost", size: "icon"}), "h-7 w-7 text-slate-300 group-hover:opacity-100 opacity-0 transition-opacity outline-none")}>
                                      <MoreHorizontal size={14}/>
                                   </DropdownMenuTrigger>
                                   <DropdownMenuContent align="end" className="w-44 rounded-xl p-1.5 shadow-xl border-slate-200">
                                      <DropdownMenuItem className="text-[11px] font-bold gap-2 cursor-pointer rounded-lg hover:bg-indigo-50 transition-colors"><Pencil size={12}/> Edit Details</DropdownMenuItem>
                                      <DropdownMenuSeparator />
                                      <DropdownMenuItem className="text-[11px] font-bold text-rose-600 gap-2 cursor-pointer hover:bg-rose-50 transition-colors"><Trash2 size={12}/> Delete</DropdownMenuItem>
                                   </DropdownMenuContent>
                                </DropdownMenu>
                             </div>

                             <h3 className="text-[14px] font-black text-slate-900 leading-snug mb-4 group-hover:text-indigo-600 transition-colors tracking-tight">
                                {task.title}
                             </h3>

                             <div className="mb-4 space-y-2">
                                <div className="flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-tighter">
                                   <div className="flex items-center gap-1.5"><CheckSquare size={12} className="text-emerald-500" /> {task.subtasks.done}/{task.subtasks.total} Nodes</div>
                                   <span className="text-indigo-600 font-bold">{task.progress}%</span>
                                </div>
                                <Progress value={task.progress} className="h-1.5 bg-slate-50 shadow-inner" />
                             </div>

                             <div className="flex justify-between items-center pt-3 border-t border-slate-100">
                                <div className="flex -space-x-1.5">
                                   <Avatar className="size-7 border-2 border-white shadow-sm ring-1 ring-slate-100">
                                      <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${task.assignees[0].name}`} />
                                      <AvatarFallback>U</AvatarFallback>
                                   </Avatar>
                                   {task.comments > 5 && <div className="size-7 rounded-full bg-slate-100 border-2 border-white text-[8px] font-black flex items-center justify-center">+2</div>}
                                </div>
                                <div className="flex items-center gap-3 text-slate-300 text-[10px] font-bold">
                                   <div className="flex items-center gap-1 hover:text-slate-500 transition-colors cursor-pointer"><MessageSquare size={12} /> {task.comments}</div>
                                   <div className="flex items-center gap-1 hover:text-slate-500 transition-colors cursor-pointer"><Paperclip size={12} /> {task.attachments}</div>
                                </div>
                             </div>
                          </Card>
                       </motion.div>
                    ))}
                    <button className="w-full py-2.5 rounded-xl border-2 border-dashed border-slate-200 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] hover:border-indigo-300 hover:bg-white hover:text-indigo-600 transition-all">
                       + Add Node
                    </button>
                 </div>
              </div>
           ))}
        </main>
      </div>
    </TooltipProvider>
  )
}

function StatItem({ icon, label, value, color }: any) {
  const colors: any = {
    indigo: "text-indigo-600 bg-indigo-50 border-indigo-100",
    rose: "text-rose-600 bg-rose-50 border-rose-100",
    emerald: "text-emerald-600 bg-emerald-50 border-emerald-100",
    amber: "text-amber-600 bg-amber-50 border-amber-100",
  };
  return (
    <Card className="border border-slate-200/80 shadow-2xs rounded-xl bg-white p-3 flex flex-col justify-between hover:shadow-md transition-all group">
      <div className={cn("p-2 rounded-lg w-fit mb-1 border group-hover:scale-110 transition-transform", colors[color])}>{icon}</div>
      <div>
        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-tight">{label}</p>
        <h4 className="text-xl font-black text-slate-900 leading-none mt-1.5 tracking-tighter">{value}</h4>
      </div>
    </Card>
  )
}
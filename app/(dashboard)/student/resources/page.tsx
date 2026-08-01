"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Database, Search, Download, FileText, Filter, LayoutGrid, 
  ArrowUpRight, Video, Star, Clock, ShieldCheck, Zap, Globe, 
  Eye, MoreHorizontal, BookOpen, Timer, FileArchive, 
  CloudDownload, Users, ChevronRight, FileVideo, HardDrive,
  Info, Share2, ShieldAlert, History
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

// --- MOCK DATA ---
const resourceNodes = [
  { id: "RES-901", title: "Advanced Integration Guide.pdf", type: "PDF", subject: "Math 9-A", size: "3.2 MB", teacher: "Zia Khan", date: "2h ago", color: "bg-indigo-500", desc: "Complete guide to integration nodes including complex substitutions." },
  { id: "RES-804", title: "Quantum Physics Lecture 04.mp4", type: "Video", subject: "Physics 10-B", size: "56.0 MB", teacher: "Sarah Ahmed", date: "5h ago", color: "bg-emerald-500", desc: "Visualizing wave-particle duality in a controlled digital terminal." },
  { id: "RES-712", title: "Logic Design Diagrams.zip", type: "Archive", subject: "CS 12-Pro", size: "12.4 MB", teacher: "Bilal Raza", date: "Yesterday", color: "bg-violet-500", desc: "Full archive of digital logic nodes and K-maps." },
  { id: "RES-650", title: "English Grammar Node v2.pdf", type: "PDF", subject: "English", size: "1.1 MB", teacher: "Fatima Ali", date: "2 days ago", color: "bg-rose-500", desc: "Official English grammar node covering advanced syntax." },
];

export default function StudentResourceVault() {
  const [mounted, setMounted] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedNode, setSelectedNode] = useState<any>(null);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <div className="flex flex-col h-full space-y-6 text-left animate-in fade-in duration-700 font-sans selection:bg-indigo-100 relative">
      
      {/* 1. TOP HEADER */}
      <header className="shrink-0 h-[56px] border-b border-slate-100 bg-white flex items-center justify-between px-6 z-20 gap-4">
        <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2 text-[9px] font-bold text-indigo-600 uppercase tracking-widest leading-none px-0.5">
                KNOWLEDGE_BASE <span className="text-slate-300">•</span> <span className="text-slate-400 font-bold uppercase">ARCHIVE_v4.2</span>
            </div>
            <h1 className="text-lg font-black text-slate-900 tracking-tight mt-1 uppercase italic leading-none truncate">
                Academic <span className="text-indigo-600 font-bold not-italic">Resource Vault</span>
            </h1>
        </div>
        <div className="flex items-center gap-2 shrink-0">
           <Button variant="outline" className="hidden md:flex h-8 text-[9px] font-bold uppercase border-slate-200 bg-white px-3 gap-2">
              <History size={14} className="text-slate-400" /> History
           </Button>
           <Button className="h-8 bg-indigo-600 hover:bg-indigo-700 text-white text-[9px] font-bold uppercase shadow-md active:scale-95 transition-all px-4 rounded-lg border-none shadow-indigo-100">
                <CloudDownload size={14} /> Sync Nodes
            </Button>
        </div>
      </header>

      {/* 2. KPI ROW */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
         <DashStat label="Total Assets" value="124" trend="DOSS" color="indigo" icon={<Database size={12}/>}/>
         <DashStat label="New Today" value="06" trend="ACTIVE" color="emerald" icon={<Zap size={12}/>}/>
         <DashStat label="Subject Depth" value="14" trend="NODES" color="blue" icon={<BookOpen size={12}/>}/>
         <DashStat label="Used Node" value="4.2GB" trend="84%" color="purple" icon={<HardDrive size={12}/>}/>
         <DashStat label="Fetch Speed" value="Fast" trend="950MB" color="orange" icon={<Timer size={12}/>}/>
         <DashStat label="Integrity" value="Verified" trend="AES" color="rose" icon={<ShieldCheck size={12}/>}/>
      </div>

      {/* 3. MAIN WORKSPACE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-12">
        
        {/* RESOURCE LIST */}
        <div className="lg:col-span-8 space-y-4">
           <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-2 rounded-xl border border-slate-100 shadow-sm">
              <div className="flex bg-slate-50 p-0.5 rounded-lg border border-slate-100 overflow-x-auto scrollbar-hide">
                 {['All', 'Lectures', 'Notes', 'Papers'].map((f) => (
                    <button key={f} onClick={() => setActiveFilter(f)} className={cn("px-5 py-1.5 rounded-md text-[9px] font-black uppercase tracking-widest transition-all whitespace-nowrap", activeFilter === f ? "bg-white text-indigo-600 shadow-sm ring-1 ring-slate-200" : "text-slate-400 hover:text-slate-600")}>
                       {f}
                    </button>
                 ))}
              </div>
              <div className="relative flex-1 md:max-w-xs group text-left mr-2">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={12} />
                 <input placeholder="Filter knowledge node..." className="w-full h-8 pl-9 pr-3 bg-slate-50 border border-slate-200 rounded-lg text-[10px] font-semibold outline-none focus:bg-white focus:ring-2 ring-indigo-50 transition-all" />
              </div>
           </div>

           <Card className="border-none bg-white rounded-3xl shadow-sm ring-1 ring-slate-200/60 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        {/* THE FIX: No spaces between tags to avoid hydration error */}
                        <tr className="bg-slate-50/50 border-b border-slate-100 text-[9px] font-black text-slate-400 uppercase tracking-widest"><th className="px-6 py-4">Resource Identity Node</th><th className="px-6 py-4">Cluster</th><th className="px-6 py-4 text-center">Weight</th><th className="px-6 py-4 text-right pr-12">Matrix Action</th></tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 font-sans">
                        {resourceNodes.map((res) => (
                        <tr key={res.id} className="group hover:bg-indigo-50/5 transition-all border-l-2 border-transparent hover:border-indigo-600">
                            <td className="px-6 py-4 text-left">
                                <div className="flex items-center gap-4">
                                    <div className={cn(
                                        "size-9 rounded-xl flex items-center justify-center transition-all shadow-sm shrink-0",
                                        res.type === 'PDF' ? "bg-rose-50 text-rose-500 border border-rose-100" : res.type === 'Video' ? "bg-indigo-50 text-indigo-500 border border-indigo-100" : "bg-amber-50 text-amber-500 border border-amber-100"
                                    )}>
                                    {res.type === 'PDF' ? <FileText size={18} /> : res.type === 'Video' ? <FileVideo size={18} /> : <FileArchive size={18} />}
                                    </div>
                                    <div className="min-w-0 text-left">
                                        <p className="text-[11px] font-black text-slate-800 uppercase leading-none truncate group-hover:text-indigo-600 transition-colors">{res.title}</p>
                                        <p className="text-[8px] font-bold text-slate-300 uppercase mt-1.5 tabular-nums font-mono italic leading-none">{res.id} • {res.date}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4"><Badge variant="outline" className="text-[8px] font-black border-slate-100 bg-white text-indigo-500 py-0 px-2 h-5 uppercase">{res.subject}</Badge></td>
                            <td className="px-6 py-4 text-center font-black text-slate-500 text-[10px] tabular-nums">{res.size}</td>
                            <td className="px-6 py-4 text-right pr-12">
                                <div className="flex items-center justify-end gap-2">
                                    <button onClick={() => setSelectedNode(res)} className="p-1.5 hover:bg-white rounded-md text-slate-300 hover:text-indigo-600 transition-all outline-none border-none hover:shadow-sm"><Eye size={14}/></button>
                                    <Button className="h-8 px-3 bg-indigo-600 hover:bg-indigo-700 text-white text-[9px] font-black uppercase rounded-lg shadow-lg shadow-indigo-100 active:scale-95 transition-all flex items-center gap-1.5 border-none">
                                        <CloudDownload size={12} strokeWidth={2.5} /> Fetch
                                    </Button>
                                </div>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
              </div>
           </Card>
        </div>

        {/* SIDEBAR TOOLS */}
        <div className="lg:col-span-4 space-y-4 text-left">
           <Card className="p-6 rounded-[32px] border-none bg-white shadow-sm ring-1 ring-slate-200/60 flex flex-col hover:shadow-md transition-all group">
              <h3 className="text-[10px] font-black text-slate-800 uppercase tracking-widest mb-6 flex items-center gap-2 italic leading-none"><Star size={14} className="text-amber-500" /> Starred Archives</h3>
              <div className="space-y-3">
                 <StarredItem label="Math Finals 2025.pdf" sub="By Zia Khan" />
                 <StarredItem label="Quantum Manual.pdf" sub="By Sarah Ahmed" />
              </div>
           </Card>

           <Card className="p-8 rounded-[32px] bg-[#0F172A] border-none text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 size-32 bg-indigo-600/20 blur-3xl transition-all group-hover:bg-indigo-600/30" />
              <div className="relative z-10 text-center flex flex-col items-center">
                 <div className="size-14 bg-white/5 rounded-2xl flex items-center justify-center mb-4 border border-white/5 shadow-xl group-hover:scale-110 transition-transform">
                    <Globe size={28} className="text-indigo-400" />
                 </div>
                 <h4 className="text-[13px] font-bold leading-tight uppercase mb-2 tracking-widest italic text-white">Request Payload</h4>
                 <p className="text-[10px] text-slate-400 uppercase tracking-tighter leading-relaxed mb-6 opacity-60">Can't find a node? Send a signal to your faculty lead.</p>
                 <Button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black text-[9px] h-10 rounded-xl uppercase tracking-widest transition-all border-none shadow-xl active:scale-95">Initialize Signal</Button>
              </div>
           </Card>
        </div>
      </div>

      {/* 4. SHEET PREVIEW */}
      <Sheet open={!!selectedNode} onOpenChange={() => setSelectedNode(null)}>
        <SheetContent className="w-[420px] border-l border-slate-100 p-0 overflow-hidden shadow-2xl bg-white z-[150]">
           <div className="h-24 bg-slate-900 flex items-center px-8 relative overflow-hidden text-left">
              <div className="absolute inset-0 bg-indigo-600 opacity-20" />
              <h3 className="text-white font-black uppercase tracking-widest text-[10px] z-10 italic">Knowledge Dossier Preview</h3>
           </div>
           <div className="px-8 -mt-8 relative z-20">
              <div className="size-16 rounded-2xl bg-white p-1 shadow-2xl border border-slate-100 mx-auto flex items-center justify-center">
                 <div className="size-full rounded-xl bg-slate-50 flex items-center justify-center text-xl font-black text-indigo-400 uppercase italic">{selectedNode?.type.substring(0,1)}</div>
              </div>
              <div className="mt-4 text-center text-slate-900">
                 <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight leading-tight">{selectedNode?.title}</h2>
                 <Badge className="mt-2 bg-indigo-50 text-indigo-600 border-none font-bold text-[9px] uppercase tracking-widest px-3">{selectedNode?.subject}</Badge>
                 <div className="mt-8 space-y-4 text-left">
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2 italic leading-none"><Info size={10} /> Node Summary</p>
                        <p className="text-[11px] font-bold text-slate-700 leading-relaxed uppercase">{selectedNode?.desc}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-left">
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100"><p className="text-[8px] font-black text-slate-400 uppercase mb-1 tracking-widest">Faculty Lead</p><p className="text-[10px] font-black text-slate-900 uppercase">{selectedNode?.teacher}</p></div>
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100"><p className="text-[8px] font-black text-slate-400 uppercase mb-1 tracking-widest text-left">Weight Node</p><p className="text-[10px] font-black text-slate-900 uppercase">{selectedNode?.size}</p></div>
                    </div>
                 </div>
                 <div className="mt-8 pt-8 border-t border-slate-50 flex flex-col gap-2">
                    <Button className="w-full bg-slate-900 h-11 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg shadow-indigo-50 flex gap-2 justify-center border-none">
                       <CloudDownload size={14} /> Fetch Node Payload
                    </Button>
                    <Button variant="outline" className="w-full h-11 rounded-xl text-[10px] font-black uppercase tracking-widest border-slate-200 bg-white">
                       <Share2 size={14} className="mr-2" /> Share Node Signal
                    </Button>
                 </div>
              </div>
           </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

// KPI Component
function DashStat({ label, value, trend, color, icon }: any) {
    const colors: any = { indigo: "bg-indigo-50 text-indigo-600 shadow-indigo-100", emerald: "bg-emerald-50 text-emerald-600 shadow-emerald-100", blue: "bg-blue-50 text-blue-600 shadow-blue-100", purple: "bg-purple-50 text-purple-600 shadow-purple-100", orange: "bg-orange-50 text-orange-600 shadow-orange-100", rose: "bg-rose-50 text-rose-600 shadow-rose-100" }
    return (
        <Card className="p-3.5 rounded-xl bg-white border-none shadow-sm ring-1 ring-slate-100 flex flex-col justify-between hover:shadow-md hover:-translate-y-1 transition-all h-[95px] cursor-default text-left group">
            <div className="flex justify-between items-start w-full leading-none">
                <div className={cn("p-1.5 rounded-lg shadow-xs transition-transform group-hover:scale-110", colors[color])}>{icon}</div>
                <span className={cn("text-[6px] font-black px-1.5 py-0.5 rounded uppercase tracking-tighter shadow-sm bg-white border border-slate-50", colors[color])}>{trend}</span>
            </div>
            <div className="mt-1 text-left leading-none"><p className="text-base font-black text-slate-900 tracking-tight leading-none tabular-nums">{value}</p><p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1.5 leading-none group-hover:text-indigo-600 transition-colors">{label}</p></div>
        </Card>
    )
}

function StarredItem({ label, sub }: { label: string, sub: string }) {
    return (
        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 hover:bg-white hover:border-indigo-100 hover:shadow-sm transition-all cursor-pointer group text-left">
            <div className="flex items-center gap-3 min-w-0">
                <Star size={12} className="text-amber-400 fill-amber-400 shrink-0" />
                <div className="min-w-0 text-left">
                    <p className="text-[10px] font-black text-slate-600 uppercase truncate leading-none">{label}</p>
                    <p className="text-[8px] font-bold text-slate-300 uppercase mt-1 leading-none">{sub}</p>
                </div>
            </div>
            <ChevronRight size={14} className="text-slate-200 group-hover:text-indigo-600 transition-all shrink-0" />
        </div>
    )
}
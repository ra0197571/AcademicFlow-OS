"use client"

import React, { useState, useEffect } from 'react';
import { 
  Plus, Search, Download, FileText, Filter, LayoutGrid, 
  ArrowUpRight, Database, UploadCloud, FolderOpen, 
  MoreHorizontal, Trash2, Eye, Share2, Globe, Lock,
  Video, Image as ImageIcon, Link as LinkIcon, FilePlus
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// --- MOCK DATA ---
const resourceNodes = [
  { id: "RES-101", title: "Algebra Fundamentals.pdf", type: "PDF", class: "9-Alpha", size: "2.4 MB", access: "Public" },
  { id: "RES-102", title: "Quantum Physics Intro.mp4", type: "Video", class: "10-Beta", size: "45.0 MB", access: "Class Only" },
  { id: "RES-103", title: "Logic Gate Diagrams.png", type: "Image", class: "12-Pro", size: "1.1 MB", access: "Private" },
  { id: "RES-104", title: "Lab Manual v2.pdf", type: "PDF", class: "10-Beta", size: "840 KB", access: "Public" },
];

export default function StudyMaterialVault() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <div className="flex flex-col h-full bg-[#FDFDFD] overflow-hidden animate-in fade-in duration-700 font-sans">
      
      {/* 1. TOP COMMAND HEADER */}
      <header className="shrink-0 h-[56px] border-b border-slate-100 bg-white flex items-center justify-between px-6 z-20">
        <div className="flex flex-col text-left">
            <div className="flex items-center gap-2 text-[10px] font-bold text-indigo-600 uppercase tracking-widest leading-none">
                RESOURCES HUB <span className="text-slate-300">•</span> <span className="text-slate-400">STORAGE_NODE_v4</span>
            </div>
            <h1 className="text-sm font-black text-slate-900 tracking-tight mt-1 uppercase italic leading-none">
                Study Material <span className="text-indigo-600 not-italic ml-1">Vault Node</span>
            </h1>
        </div>

        <div className="flex items-center gap-2">
           <Button variant="outline" className="h-8 text-[9px] font-bold uppercase tracking-wider border-slate-200 bg-white">
              <FolderOpen size={12} className="mr-1.5" /> New Folder
           </Button>
           <Button className="h-8 bg-indigo-600 hover:bg-indigo-700 text-white text-[9px] font-bold uppercase shadow-md active:scale-95 transition-all px-4 rounded-lg border-none">
                <UploadCloud size={14} className="mr-1.5" /> Deploy Resource
            </Button>
        </div>
      </header>

      {/* 2. SCROLLABLE AREA */}
      <main className="flex-1 overflow-y-auto p-4 lg:p-6 scrollbar-hide space-y-6 bg-slate-50/20">
        
        {/* KPI ROW (Dashboard Sync) */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 max-w-[1700px] mx-auto text-left">
           <DashStat label="Total Assets" value="124" trend="STORAGE" color="indigo" icon={<Database size={12}/>}/>
           <DashStat label="Used Space" value="4.2 GB" trend="84%" color="emerald" icon={<LayoutGrid size={12}/>}/>
           <DashStat label="PDF Dossiers" value="86" trend="ACTIVE" color="blue" icon={<FileText size={12}/>}/>
           <DashStat label="Video Nodes" value="12" trend="HD" color="purple" icon={<Video size={12}/>}/>
           <DashStat label="Shared Link" value="42" trend="PUBLIC" color="orange" icon={<Share2 size={12}/>}/>
           <DashStat label="Secured" value="Verified" trend="AES" color="rose" icon={<Lock size={12}/>}/>
        </div>

        {/* UPLOAD & DROPZONE AREA */}
        <Card className="max-w-[1700px] mx-auto p-8 border-dashed border-2 border-slate-200 bg-white/50 hover:bg-white hover:border-indigo-400 transition-all cursor-pointer rounded-[32px] flex flex-col items-center justify-center group">
            <div className="size-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm">
                <FilePlus size={28} />
            </div>
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Initial Asset Stream</h3>
            <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-tight text-center">Drag and drop academic payloads here or click to browse terminal.<br/>Maximum deployment weight: 50MB per node.</p>
        </Card>

        {/* ASSET LEDGER */}
        <div className="max-w-[1700px] mx-auto pb-12">
           <div className="flex items-center justify-between mb-4 px-2">
                <h3 className="text-[11px] font-black text-slate-800 uppercase tracking-[0.2em] flex items-center gap-2">
                    <Database size={16} className="text-indigo-600" /> Active Asset Repository
                </h3>
                <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={12} />
                    <input placeholder="Search vault..." className="h-8 w-64 pl-9 pr-3 bg-white border border-slate-200 rounded-xl text-[10px] font-semibold outline-none focus:ring-2 ring-indigo-50 transition-all" />
                </div>
           </div>

           <Card className="border-none bg-white rounded-3xl shadow-sm ring-1 ring-slate-200/60 overflow-hidden">
              <table className="w-full text-left">
                 <thead>
                    <tr className="bg-slate-50/50 border-b border-slate-100 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                       <th className="px-6 py-4">Asset Identity</th>
                       <th className="px-6 py-4">Class Target</th>
                       <th className="px-6 py-4">Node Weight</th>
                       <th className="px-6 py-4 text-center">Access</th>
                       <th className="px-6 py-4 text-right pr-10">Matrix Action</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-50 font-sans text-left">
                    {resourceNodes.map((res) => (
                       <tr key={res.id} className="group hover:bg-indigo-50/10 transition-all border-l-2 border-transparent hover:border-indigo-600">
                          <td className="px-6 py-4">
                             <div className="flex items-center gap-4">
                                <div className="size-9 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
                                   {res.type === 'PDF' && <FileText size={18} />}
                                   {res.type === 'Video' && <Video size={18} />}
                                   {res.type === 'Image' && <ImageIcon size={18} />}
                                </div>
                                <div>
                                   <p className="text-[11px] font-black text-slate-800 uppercase leading-none">{res.title}</p>
                                   <p className="text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-tighter tabular-nums font-mono">{res.id}</p>
                                </div>
                             </div>
                          </td>
                          <td className="px-6 py-4">
                             <Badge variant="outline" className="text-[8px] font-black border-slate-100 bg-white text-slate-400 py-0 px-2 h-5 uppercase">{res.class}</Badge>
                          </td>
                          <td className="px-6 py-4">
                             <span className="text-[10px] font-black text-slate-600 tabular-nums">{res.size}</span>
                          </td>
                          <td className="px-6 py-4 text-center">
                             <div className="flex items-center justify-center gap-1.5">
                                {res.access === 'Public' ? <Globe size={12} className="text-emerald-500" /> : <Lock size={12} className="text-indigo-500" />}
                                <span className="text-[9px] font-bold text-slate-400 uppercase">{res.access}</span>
                             </div>
                          </td>
                          <td className="px-6 py-4 text-right pr-10">
                             <div className="flex items-center justify-end gap-1">
                                <button className="p-1.5 hover:bg-slate-50 rounded-md text-slate-300 hover:text-indigo-600 transition-all"><Eye size={14}/></button>
                                <button className="p-1.5 hover:bg-slate-50 rounded-md text-slate-300 hover:text-emerald-600 transition-all"><Download size={14}/></button>
                                <button className="p-1.5 hover:bg-slate-50 rounded-md text-slate-300 hover:text-rose-600 transition-all"><Trash2 size={14}/></button>
                             </div>
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

// --- KPI COMPONENT (Dashboard Sync) ---
function DashStat({ label, value, trend, color, icon }: any) {
    const colors: any = { indigo: "bg-indigo-50 text-indigo-600", emerald: "bg-emerald-50 text-emerald-600", blue: "bg-blue-50 text-blue-600", purple: "bg-purple-50 text-purple-600", orange: "bg-orange-50 text-orange-600", rose: "bg-rose-50 text-rose-600" }
    return (
        <Card className="p-3.5 rounded-xl bg-white border-none shadow-sm ring-1 ring-slate-100 flex flex-col justify-between hover:shadow-md hover:-translate-y-1 transition-all h-[95px] cursor-default">
            <div className="flex justify-between items-start w-full">
                <div className={cn("p-1.5 rounded-lg shadow-xs", colors[color])}>{icon}</div>
                <span className={cn("text-[6px] font-black px-1.5 py-0.5 rounded uppercase tracking-tighter", colors[color])}>{trend}</span>
            </div>
            <div className="mt-1"><p className="text-base font-black text-slate-900 tracking-tight leading-none tabular-nums">{value}</p><p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1.5 leading-none">{label}</p></div>
        </Card>
    )
}
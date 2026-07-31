"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, Send, Search, MoreHorizontal, Filter, 
  Plus, Users, Radio, Bell, ShieldCheck, Zap, 
  ArrowUpRight, Phone, Video, Info, CheckCircle2,
  Clock, LayoutGrid, Database, Star, Activity, ArrowLeft
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const chats = [
  { id: 1, name: "Ahmed Malik", role: "Student", lastMsg: "Sir, I've uploaded the Math assignment.", time: "2m ago", unread: 2, status: 'online' },
  { id: 2, name: "Fatima Khan", role: "Student", lastMsg: "When is the next Physics lab?", time: "1h ago", unread: 0, status: 'offline' },
  { id: 3, name: "Mr. Farooq", role: "Parent", lastMsg: "Thank you for the feedback on Ali.", time: "yesterday", unread: 0, status: 'online' },
];

export default function CommunicationHubNode() {
  const [mounted, setMounted] = useState(false);
  const [activeChat, setActiveChat] = useState(chats[0]);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <div className="flex flex-col h-full bg-[#FDFDFD] overflow-hidden animate-in fade-in duration-700 font-sans relative text-slate-900">
      
      {/* 1. TOP HEADER (Elite OS Standard) */}
      <header className="shrink-0 h-[56px] border-b border-slate-100 bg-white flex items-center justify-between px-6 z-20">
        <div className="flex flex-col text-left">
            <div className="flex items-center gap-2 text-[9px] font-bold text-indigo-600 uppercase tracking-widest leading-none">
                SIGNAL HUB <span className="text-slate-300">•</span> <span className="text-slate-400 font-bold uppercase">SECURE_NODE</span>
            </div>
            <h1 className="text-sm font-black text-slate-900 tracking-tight mt-1 uppercase italic leading-none">
                Communication <span className="text-indigo-600 not-italic ml-1">Terminal</span>
            </h1>
        </div>

        <div className="flex items-center gap-2">
           <Button variant="outline" className="h-8 text-[9px] font-bold uppercase tracking-wider border-slate-200 bg-white hover:bg-slate-50 transition-all">
              <Radio size={12} className="mr-1.5 text-rose-500 animate-pulse" /> Live Broadcast
           </Button>
           <Button className="h-8 bg-indigo-600 hover:bg-indigo-700 text-white text-[9px] font-bold uppercase shadow-md active:scale-95 transition-all px-4 rounded-lg border-none">
                <Plus size={14} className="mr-1.5" strokeWidth={3} /> New Signal
            </Button>
        </div>
      </header>

      {/* 2. MAIN WORKSPACE */}
      <main className="flex-1 flex overflow-hidden bg-slate-50/20 text-left">
        
        {/* LEFT: SIGNAL RAILS */}
        <aside className="w-80 border-r border-slate-100 bg-white flex flex-col shrink-0 overflow-hidden">
           <div className="p-4 border-b border-slate-50 space-y-4">
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors" size={14} />
                <input placeholder="Search node identifiers..." className="w-full h-9 pl-10 pr-4 bg-slate-50 border border-slate-100 rounded-xl text-[10px] font-bold outline-none focus:ring-2 ring-indigo-50 transition-all" />
              </div>
              <div className="flex gap-2">
                 <Badge className="bg-slate-900 text-white border-none text-[8px] font-black uppercase px-3 py-1 cursor-pointer">Active Threads</Badge>
                 <Badge variant="outline" className="text-slate-400 border-slate-100 text-[8px] font-black uppercase px-3 py-1 cursor-pointer hover:bg-slate-50 transition-all">Parents</Badge>
              </div>
           </div>

           <div className="flex-1 overflow-y-auto scrollbar-hide divide-y divide-slate-50">
              {chats.map((chat) => (
                <div 
                   key={chat.id} 
                   onClick={() => setActiveChat(chat)}
                   className={cn(
                    "p-4 flex items-center gap-3 cursor-pointer transition-all border-l-2",
                    activeChat.id === chat.id ? "bg-indigo-50/30 border-indigo-600 shadow-sm" : "border-transparent hover:bg-slate-50"
                   )}
                >
                   <div className="relative shrink-0">
                      <Avatar className="size-10 border border-slate-100 shadow-sm ring-1 ring-slate-100">
                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${chat.name}`} />
                        <AvatarFallback className="font-bold text-[10px]">{chat.name.substring(0,2)}</AvatarFallback>
                      </Avatar>
                      {chat.status === 'online' && <div className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full bg-emerald-500 border-2 border-white shadow-sm" />}
                   </div>
                   <div className="min-w-0 flex-1">
                      <div className="flex justify-between items-start leading-none">
                         <h4 className="text-[11px] font-black text-slate-900 uppercase truncate">{chat.name}</h4>
                         <span className="text-[7px] font-bold text-slate-300 uppercase shrink-0">{chat.time}</span>
                      </div>
                      <p className="text-[10px] text-slate-400 truncate mt-1.5 tracking-tight font-medium uppercase leading-none">{chat.lastMsg}</p>
                   </div>
                   {chat.unread > 0 && <Badge className="size-4 p-0 flex items-center justify-center bg-indigo-600 text-white rounded-full text-[8px] font-black border-none">{chat.unread}</Badge>}
                </div>
              ))}
           </div>
        </aside>

        {/* CENTER: COMMAND CONSOLE */}
        <section className="flex-1 flex flex-col overflow-hidden bg-white">
            {/* THREAD HEADER */}
            <div className="h-[56px] border-b border-slate-50 flex items-center justify-between px-6 shrink-0 bg-white/50 backdrop-blur-sm">
               <div className="flex items-center gap-3">
                  <h3 className="text-[12px] font-black text-slate-900 uppercase tracking-tighter">Current: <span className="text-indigo-600">{activeChat.name}</span></h3>
                  <Badge variant="outline" className="text-[7px] font-black border-slate-100 bg-slate-50 text-slate-400 px-1.5 uppercase h-5">{activeChat.role}_NODE</Badge>
               </div>
               <div className="flex items-center gap-1 text-slate-300">
                  <button className="p-2 hover:bg-slate-50 hover:text-indigo-600 transition-all"><Video size={16}/></button>
                  <button className="p-2 hover:bg-slate-50 hover:text-indigo-600 transition-all"><Phone size={16}/></button>
                  <button className="p-2 hover:bg-slate-50 hover:text-indigo-600 transition-all"><Info size={16}/></button>
               </div>
            </div>

            {/* MESSAGE STREAM */}
            <div className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-hide bg-slate-50/5">
               <div className="flex justify-center"><Badge variant="outline" className="border-slate-100 text-[8px] font-black uppercase text-slate-300">Signal Connection Established // TLS_1.3</Badge></div>
               
               <div className="flex items-start gap-3 max-w-[80%]">
                  <Avatar className="size-8 mt-1 shrink-0 border border-slate-100"><AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${activeChat.name}`} /></Avatar>
                  <div className="p-4 bg-slate-100 rounded-2xl rounded-tl-none border border-slate-200/40 shadow-xs">
                     <p className="text-[11px] font-bold text-slate-700 leading-relaxed uppercase tracking-tight">{activeChat.lastMsg}</p>
                  </div>
               </div>

               <div className="flex items-start gap-3 max-w-[80%] ml-auto flex-row-reverse">
                  <div className="p-4 bg-[#0F172A] text-indigo-400 rounded-2xl rounded-tr-none shadow-xl border border-white/5">
                     <p className="text-[11px] font-bold leading-relaxed uppercase tracking-tight">Confirmed. Node verification is complete. Data packets received successfully.</p>
                  </div>
               </div>
            </div>

            {/* INPUT DOCK (Improved UX) */}
            <div className="p-4 border-t border-slate-50 bg-white shrink-0">
               <div className="relative flex items-center gap-2 bg-slate-100/50 p-2 rounded-2xl border border-slate-200 group focus-within:ring-4 ring-indigo-50/50 transition-all">
                  <button className="p-2 text-slate-400 hover:text-indigo-600 transition-all"><Plus size={20}/></button>
                  <input placeholder="Type secure message signal..." className="flex-1 bg-transparent border-none outline-none text-[11px] font-bold text-slate-800 uppercase tracking-tighter" />
                  <Button className="h-10 w-10 p-0 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-lg border-none active:scale-95 transition-all"><Send size={18} /></Button>
               </div>
            </div>
        </section>

        {/* RIGHT: IDENTITY DOSSIER */}
        <aside className="w-72 border-l border-slate-100 bg-white hidden xl:flex flex-col p-6 shrink-0 overflow-hidden text-center">
           <div className="flex flex-col items-center space-y-4">
              <div className="size-20 rounded-[32px] bg-slate-50 p-1 shadow-2xl border border-slate-100">
                 <Avatar className="size-full rounded-[28px]"><AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${activeChat.name}`} /></Avatar>
              </div>
              <div>
                 <h4 className="text-[14px] font-black text-slate-900 uppercase tracking-tighter leading-none">{activeChat.name}</h4>
                 <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest mt-2">Dossier Node: 0992</p>
              </div>
           </div>

           <div className="mt-12 space-y-4 text-left">
              <h5 className="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em] px-1">Node Analytics</h5>
              <Card className="p-4 bg-slate-50/80 border-slate-200/60 shadow-none rounded-2xl">
                 <div className="flex items-center gap-3 mb-3 leading-none">
                    <Activity size={14} className="text-emerald-500" />
                    <span className="text-[10px] font-black text-slate-700 uppercase leading-none">98% Presence</span>
                 </div>
                 <div className="h-1 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 shadow-[0_0_8px_#10b981]" style={{ width: '98%' }} />
                 </div>
              </Card>
              <Card className="p-4 bg-slate-50/80 border-slate-200/60 shadow-none rounded-2xl">
                 <div className="flex items-center gap-3 leading-none">
                    <Star size={14} className="text-amber-500 fill-amber-500" />
                    <span className="text-[10px] font-black text-slate-700 uppercase leading-none">GPA 3.8 / ELITE_RANK</span>
                 </div>
              </Card>
           </div>

           <div className="mt-auto pt-6 border-t border-slate-100">
              <Button variant="outline" className="w-full h-10 rounded-xl text-[9px] font-black uppercase tracking-widest border-slate-200 bg-white hover:bg-slate-50 shadow-sm active:scale-95 transition-all">
                Access Full Dossier
              </Button>
           </div>
        </aside>
      </main>
    </div>
  );
}
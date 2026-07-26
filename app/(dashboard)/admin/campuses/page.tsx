"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, MapPin, Users, Plus, MoreHorizontal,
  ExternalLink, ShieldCheck, Activity, Zap, 
  ChevronRight, Globe, Lock, Cpu, ArrowUpRight,
  UserCheck, CreditCard, LayoutGrid, Search, Filter
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

// --- TYPES (STRICT PRODUCTION TYPES) ---
interface Campus {
  id: string;
  name: string;
  location: string;
  students: number;
  capacity: number;
  principal: string;
  revenue: string;
  status: 'Operational' | 'Maintenance' | 'Critical';
  health: number;
}

const campuses: Campus[] = [
  { id: '1', name: "Main HQ Campus", location: "Blue Area, Islamabad", students: 850, capacity: 1000, principal: "Dr. Arshad", revenue: "+12%", status: "Operational", health: 98 },
  { id: '2', name: "Gulberg Branch", location: "Gulberg III, Lahore", students: 320, capacity: 500, principal: "Ms. Sofia", revenue: "+8%", status: "Operational", health: 92 },
  { id: '3', name: "Karachi Node 01", location: "North Nazimabad", students: 410, capacity: 450, principal: "Mr. Farooq", revenue: "-2%", status: "Maintenance", health: 65 },
  { id: '4', name: "Evening Extension", location: "F-10 Terminal, ISB", students: 120, capacity: 200, principal: "Usman Ghani", revenue: "+15%", status: "Operational", health: 88 },
];

export default function EliteCampusManagement() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <div className="p-6 lg:p-10 space-y-10 animate-in fade-in duration-700 max-w-[1700px] mx-auto">
      
      {/* 1. ENTERPRISE HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-3 mb-2">
            <Badge className="bg-indigo-600 text-white border-none font-black text-[9px] tracking-widest px-2 py-0.5">GLOBAL COMMAND</Badge>
            <div className="flex items-center gap-1.5 text-slate-400 font-bold text-[10px] uppercase tracking-widest">
               <Globe size={12} className="text-emerald-500 animate-pulse" /> 4 Active Nodes Detected
            </div>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter">Campus <span className="text-indigo-600">Infrastructure</span></h1>
        </div>

        <div className="flex items-center gap-3 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm">
           <div className="relative group hidden lg:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <input placeholder="Search node..." className="w-48 pl-9 h-10 bg-slate-50 border-none rounded-xl text-[11px] font-bold outline-none focus:ring-2 ring-indigo-50 transition-all" />
           </div>
           <Button variant="outline" size="sm" className="h-10 px-4 rounded-xl border-slate-200 text-[10px] font-black uppercase">
              <Filter size={14} className="mr-2" /> Filters
           </Button>
           <Button className="bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-100 h-10 px-6 rounded-xl font-black uppercase text-[10px] gap-2">
              <Plus size={16} strokeWidth={3} /> Add Branch Node
           </Button>
        </div>
      </div>

      {/* 2. CAMPUS NODES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {campuses.map((campus) => (
          <CampusNodeCard key={campus.id} campus={campus} />
        ))}
      </div>

      {/* 3. PERMISSION & ACCESS MATRIX */}
      <div className="space-y-6 pt-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
           <div>
              <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                 <ShieldCheck size={18} className="text-indigo-600" /> Security & Access Matrix
              </h2>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Cross-Campus Role Permissions</p>
           </div>
           <Button variant="ghost" className="text-[10px] font-black uppercase text-indigo-600 hover:bg-indigo-50">Audit Security Logs</Button>
        </div>

        <Card className="border-none shadow-2xl shadow-slate-200/50 rounded-[32px] overflow-hidden bg-white">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50/50 text-[10px] font-black uppercase text-slate-400 tracking-widest border-b border-slate-100">
              <tr>
                <th className="p-6">Administrative Role</th>
                <th className="p-6">Module Permissions</th>
                <th className="p-6">Status</th>
                <th className="p-6 text-right">Node Access</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {ROLES.map((role) => (
                <tr key={role.name} className="group hover:bg-slate-50/80 transition-all cursor-default">
                  <td className="p-6">
                    <div className="flex items-center gap-3">
                       <div className="size-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                          {role.icon}
                       </div>
                       <div>
                          <p className="text-sm font-black text-slate-900">{role.name}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{role.level}</p>
                       </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="flex flex-wrap gap-2">
                      {role.modules.map(m => (
                        <Badge key={m} variant="outline" className="text-[8px] font-black border-slate-200 text-slate-400 group-hover:text-indigo-600 group-hover:border-indigo-100 transition-colors uppercase">{m}</Badge>
                      ))}
                    </div>
                  </td>
                  <td className="p-6">
                    <Badge className="bg-emerald-50 text-emerald-600 border-none text-[8px] font-black uppercase rounded-lg px-2">Verified</Badge>
                  </td>
                  <td className="p-6 text-right">
                    <button className="text-[10px] font-black text-slate-300 uppercase tracking-widest hover:text-indigo-600 hover:underline transition-all">Modify Matrix</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
}

// --- SUB-COMPONENTS (ELITE GRADE) ---

function CampusNodeCard({ campus }: { campus: Campus }) {
  return (
    <motion.div whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 300 }}>
       <Card className="border-none shadow-xl shadow-slate-200/40 rounded-[32px] bg-white overflow-hidden group cursor-default">
          <div className={`h-1.5 w-full ${campus.status === 'Operational' ? 'bg-emerald-500 shadow-[0_0_10px_#10b981]' : 'bg-amber-500'}`} />
          <CardContent className="p-8">
             <div className="flex justify-between items-start mb-6">
                <div className="p-4 rounded-2xl bg-slate-50 text-slate-400 group-hover:bg-indigo-600 group-hover:text-white group-hover:shadow-xl group-hover:shadow-indigo-100 transition-all duration-500">
                   <Building2 size={24} />
                </div>
                <div className="text-right">
                   <Badge variant="outline" className="text-[8px] font-black border-slate-100 text-slate-400 uppercase tracking-widest mb-1">{campus.status}</Badge>
                   <div className="flex items-center justify-end gap-1.5">
                      <div className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[10px] font-black text-slate-900 tracking-tighter">{campus.health}% HEALTH</span>
                   </div>
                </div>
             </div>

             <h3 className="font-black text-slate-900 text-lg tracking-tight mb-1 group-hover:text-indigo-600 transition-colors">{campus.name}</h3>
             <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-8">
                <MapPin size={12} className="text-indigo-400" /> {campus.location}
             </div>

             <div className="space-y-4 mb-8">
                <div className="space-y-1.5">
                   <div className="flex justify-between text-[9px] font-black uppercase text-slate-400 tracking-widest">
                      <span>Occupancy</span>
                      <span className="text-slate-900">{Math.round((campus.students/campus.capacity)*100)}%</span>
                   </div>
                   <Progress value={(campus.students/campus.capacity)*100} className="h-1 bg-slate-50" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <div>
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Growth</p>
                      <p className="text-xs font-black text-emerald-500">{campus.revenue}</p>
                   </div>
                   <div>
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Principal</p>
                      <p className="text-xs font-black text-slate-900">{campus.principal.split(' ')[1]}</p>
                   </div>
                </div>
             </div>

             <Button className="w-full h-12 bg-slate-900 hover:bg-indigo-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl transition-all active:scale-95 group/btn">
                Launch Terminal <ArrowUpRight size={14} className="ml-2 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
             </Button>
          </CardContent>
       </Card>
    </motion.div>
  )
}

const ROLES = [
  { name: 'Super Admin', level: 'Level 01 - Root', modules: ['ALL SYSTEMS', 'INFRASTRUCTURE', 'REVENUE'], icon: <Zap size={18}/> },
  { name: 'Branch Principal', level: 'Level 02 - Campus HQ', modules: ['STAFF', 'ATTENDANCE', 'LOCAL FEES'], icon: <UserCheck size={18}/> },
  { name: 'Academic Head', level: 'Level 03 - Department', modules: ['EXAMS', 'CURRICULUM', 'STUDENTS'], icon: <LayoutGrid size={18}/> },
];
"use client"

import React, { use } from 'react';
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Briefcase, 
  BookOpen, 
  Star,
  Edit,
  Download,
  Users,
  Clock,
  ChevronRight
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

// Next.js 15 requires params to be treated as a Promise
export default function TeacherProfile({ params }: { params: Promise<{ id: string }> }) {
  
  // Unwrapping params using React.use()
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  return (
    <div className="p-4 space-y-6 animate-in fade-in duration-500 max-w-6xl mx-auto">
      
      {/* 1. Top Navigation & Breadcrumbs */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
           <Link href="/admin/teachers" className="p-2 hover:bg-slate-50 rounded-full text-slate-400 transition-colors">
             <ArrowLeft size={20} />
           </Link>
           <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
              <span>Directory</span>
              <ChevronRight size={10} />
              <span className="text-indigo-600">Faculty Profile</span>
           </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="h-8 rounded-lg text-[10px] font-bold border-slate-200 uppercase tracking-widest">
            <Download size={14} className="mr-1.5" /> Performance PDF
          </Button>
          <Button size="sm" className="h-8 rounded-lg text-[10px] font-bold bg-indigo-600 hover:bg-indigo-700 text-white uppercase tracking-widest">
            <Edit size={14} className="mr-1.5" /> Edit Profile
          </Button>
        </div>
      </div>

      {/* 2. Main Profile Header Card */}
      <Card className="border-slate-200 shadow-sm rounded-[32px] overflow-hidden bg-white ring-1 ring-slate-100">
        <div className="h-24 bg-gradient-to-r from-slate-800 to-slate-900 w-full" />
        <CardContent className="px-8 pb-8 -mt-10">
           <div className="flex flex-col md:flex-row items-end gap-6">
              <div className="size-24 rounded-[28px] bg-white p-1 shadow-xl ring-1 ring-slate-100">
                 <div className="size-full rounded-[24px] bg-indigo-50 flex items-center justify-center text-3xl font-black text-indigo-600 border border-indigo-100">
                    ZK
                 </div>
              </div>
              <div className="flex-1 pb-2">
                 <div className="flex items-center gap-3">
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">Zia Khan</h1>
                    <Badge className="bg-emerald-50 text-emerald-600 border-none font-black text-[9px] uppercase tracking-widest px-2 py-0.5">Senior Faculty</Badge>
                 </div>
                 <p className="text-sm font-medium text-slate-400 mt-1">
                    Lead of <span className="text-indigo-600 font-bold">Mathematics Department</span> • Teacher ID: <span className="text-slate-900 font-black">{id}</span>
                 </p>
              </div>
           </div>
        </CardContent>
      </Card>

      {/* 3. Detailed Info Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Professional & Financial Details */}
        <div className="lg:col-span-1 space-y-6">
           <Card className="border-slate-200 shadow-sm rounded-2xl">
              <CardHeader className="p-5 border-b border-slate-50 bg-slate-50/30">
                 <CardTitle className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Professional Dossier</CardTitle>
              </CardHeader>
              <CardContent className="p-5 space-y-5">
                 <DetailRow icon={<Briefcase size={14}/>} label="Experience" value="12 Years Professional" />
                 <DetailRow icon={<Star size={14}/>} label="Avg Rating" value="4.8 / 5.0 (Excellent)" />
                 <DetailRow icon={<Calendar size={14}/>} label="Joined Date" value="15 January 2018" />
                 <DetailRow icon={<MapPin size={14}/>} label="Work Location" value="Main Campus, Islamabad" />
                 <DetailRow icon={<Mail size={14}/>} label="Official Email" value="zia.khan@academicflow.os" />
                 <DetailRow icon={<Phone size={14}/>} label="Mobile" value="+92 300 1112233" />
              </CardContent>
           </Card>

           <Card className="border-slate-200 shadow-sm rounded-2xl bg-slate-900 text-white overflow-hidden relative">
              <div className="absolute top-0 right-0 p-4 opacity-10"><Clock size={80} /></div>
              <CardContent className="p-6 relative z-10">
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Monthly Payroll</p>
                 <h3 className="text-2xl font-black tracking-tight">$3,200.00</h3>
                 <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Current Status</span>
                    <Badge className="bg-emerald-500/20 text-emerald-400 border-none font-black text-[9px] px-2 py-0.5">PAID - JUNE 2026</Badge>
                 </div>
              </CardContent>
           </Card>
        </div>

        {/* Right: Workload & Academic Overview */}
        <div className="lg:col-span-2">
           <Card className="border-slate-200 shadow-sm rounded-[28px] overflow-hidden min-h-[500px] bg-white">
              <div className="flex border-b border-slate-100 bg-slate-50/50">
                 <button className="px-8 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 bg-white border-b-2 border-indigo-600">Workload Overview</button>
                 <button className="px-8 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-slate-600 transition-colors">Teaching History</button>
              </div>
              <CardContent className="p-8 space-y-10">
                 {/* Quick Teaching Stats */}
                 <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-indigo-200 transition-all">
                       <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Students Taught</p>
                       <p className="text-2xl font-black text-slate-800">184</p>
                    </div>
                    <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-indigo-200 transition-all">
                       <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Weekly Periods</p>
                       <p className="text-2xl font-black text-slate-800">22</p>
                    </div>
                    <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-indigo-200 transition-all hidden md:block">
                       <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Avg Score</p>
                       <p className="text-2xl font-black text-emerald-600">92%</p>
                    </div>
                 </div>

                 {/* Assigned Classes */}
                 <div className="space-y-4">
                    <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Current Assignments</h3>
                    <div className="space-y-3">
                       <ClassItem name="Grade 9-A" subject="Advanced Mathematics" students="32" time="09:00 AM - 10:00 AM" />
                       <ClassItem name="Grade 10-B" subject="Statistics & Data" students="28" time="11:30 AM - 12:30 PM" />
                       <ClassItem name="Grade 12-A" subject="Calculus & Linear Algebra" students="24" time="01:30 PM - 02:30 PM" />
                    </div>
                 </div>
              </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}

// Sub-component for Details Row
function DetailRow({ icon, label, value }: any) {
  return (
    <div className="flex items-center gap-4 group">
       <div className="p-2 bg-slate-50 rounded-xl text-slate-300 group-hover:text-indigo-500 group-hover:bg-indigo-50 transition-all shadow-sm">
          {icon}
       </div>
       <div>
          <p className="text-[9px] font-black text-slate-400 uppercase leading-none mb-1 tracking-widest">{label}</p>
          <p className="text-xs font-bold text-slate-700 group-hover:text-slate-900 transition-colors">{value}</p>
       </div>
    </div>
  )
}

// Sub-component for Class Items
function ClassItem({ name, subject, students, time }: any) {
  return (
    <div className="flex items-center justify-between p-5 bg-white border border-slate-100 rounded-3xl hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-50/50 transition-all group cursor-default">
       <div className="flex items-center gap-5">
          <div className="size-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-inner">
             <BookOpen size={20} />
          </div>
          <div>
             <h4 className="text-sm font-black text-slate-800">{name}</h4>
             <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">{subject}</p>
          </div>
       </div>
       <div className="flex items-center gap-8">
          <div className="text-right hidden sm:block">
             <p className="text-[9px] font-black text-slate-300 uppercase mb-1">Schedule</p>
             <div className="flex items-center gap-1.5 text-[11px] font-black text-slate-600">
                <Clock size={12} className="text-indigo-400" /> {time}
             </div>
          </div>
          <div className="text-right">
             <p className="text-[9px] font-black text-slate-300 uppercase mb-1">Students</p>
             <div className="flex items-center justify-end gap-1.5 text-[11px] font-black text-slate-800">
                <Users size={12} className="text-slate-300" /> {students}
             </div>
          </div>
       </div>
    </div>
  )
}
"use client"

import React from 'react';
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  User, 
  BookOpen, 
  CreditCard,
  History,
  Edit,
  Download
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function StudentDetails({ params }: { params: { id: string } }) {
  return (
    <div className="p-4 space-y-6 animate-in fade-in duration-500 max-w-6xl mx-auto">
      
      {/* 1. Top Navigation & Actions */}
      <div className="flex justify-between items-center">
        <Link href="/admin/students" className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 transition-colors">
          <ArrowLeft size={18} />
          <span className="text-xs font-bold uppercase tracking-widest">Back to List</span>
        </Link>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="h-8 rounded-lg text-[10px] font-bold border-slate-200 uppercase tracking-widest">
            <Download size={14} className="mr-1.5" /> Report
          </Button>
          <Button size="sm" className="h-8 rounded-lg text-[10px] font-bold bg-indigo-600 hover:bg-indigo-700 uppercase tracking-widest text-white">
            <Edit size={14} className="mr-1.5" /> Edit Profile
          </Button>
        </div>
      </div>

      {/* 2. Main Profile Header Card */}
      <Card className="border-slate-200 shadow-sm rounded-[32px] overflow-hidden bg-white">
        <div className="h-24 bg-gradient-to-r from-indigo-500 to-purple-600 w-full" />
        <CardContent className="px-8 pb-8 -mt-10">
           <div className="flex flex-col md:flex-row items-end gap-6">
              <div className="size-24 rounded-[28px] bg-white p-1 shadow-xl shadow-indigo-100">
                 <div className="size-full rounded-[24px] bg-slate-100 flex items-center justify-center text-3xl font-black text-slate-400 border border-slate-200">
                    AM
                 </div>
              </div>
              <div className="flex-1 pb-2">
                 <div className="flex items-center gap-3">
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">Ahmed Malik</h1>
                    <Badge className="bg-emerald-50 text-emerald-600 border-none font-black text-[10px] uppercase">Active Student</Badge>
                 </div>
                 <p className="text-sm font-medium text-slate-400 mt-1">Student ID: <span className="text-indigo-600 font-bold">STU-001</span> • Joined Sept 2024</p>
              </div>
           </div>
        </CardContent>
      </Card>

      {/* 3. Detailed Info Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Contact & Personal (Compact) */}
        <div className="lg:col-span-1 space-y-6">
           <Card className="border-slate-200 shadow-sm rounded-2xl">
              <CardHeader className="p-5 border-b border-slate-50">
                 <CardTitle className="text-xs font-black text-slate-400 uppercase tracking-widest">Personal Details</CardTitle>
              </CardHeader>
              <CardContent className="p-5 space-y-4">
                 <InfoRow icon={<Mail size={14}/>} label="Email" value="ahmed.m@example.com" />
                 <InfoRow icon={<Phone size={14}/>} label="Phone" value="+92 300 1234567" />
                 <InfoRow icon={<Calendar size={14}/>} label="DOB" value="12 March 2010" />
                 <InfoRow icon={<MapPin size={14}/>} label="Address" value="Blue Area, Islamabad" />
              </CardContent>
           </Card>

           <Card className="border-slate-200 shadow-sm rounded-2xl bg-slate-900 text-white">
              <CardContent className="p-5">
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Fee Balance</p>
                 <h3 className="text-2xl font-black">$450.00</h3>
                 <p className="text-[10px] text-rose-400 font-bold mt-1 uppercase tracking-tighter">Due Date: July 30, 2026</p>
                 <Button className="w-full mt-4 bg-indigo-500 hover:bg-indigo-600 text-white font-black text-[10px] h-8 rounded-lg uppercase">Send Reminder</Button>
              </CardContent>
           </Card>
        </div>

        {/* Right: Academic Performance Tabs */}
        <div className="lg:col-span-2">
           <Card className="border-slate-200 shadow-sm rounded-[28px] overflow-hidden min-h-[400px]">
              <div className="flex border-b border-slate-100 bg-slate-50/50">
                 <TabButton label="Academic Overview" active />
                 <TabButton label="Attendance History" />
                 <TabButton label="Fee Records" />
              </div>
              <CardContent className="p-6">
                 <div className="space-y-6">
                    <h3 className="text-sm font-bold text-slate-800">Current Session: <span className="text-indigo-600">Grade 9-A</span></h3>
                    <div className="grid grid-cols-2 gap-4">
                       <PerformanceStat label="Attendance" value="96.4%" color="text-emerald-500" />
                       <PerformanceStat label="Average Grade" value="A+" color="text-indigo-500" />
                       <PerformanceStat label="Last Test Score" value="88/100" color="text-blue-500" />
                       <PerformanceStat label="Behavior" value="Excellent" color="text-purple-500" />
                    </div>
                    
                    <div className="pt-6 border-t border-slate-50">
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Recent Marks</p>
                       <div className="space-y-2">
                          <MarkRow subject="Mathematics" marks="95/100" />
                          <MarkRow subject="Physics" marks="82/100" />
                          <MarkRow subject="Chemistry" marks="87/100" />
                       </div>
                    </div>
                 </div>
              </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}

// Sub-components
function InfoRow({ icon, label, value }: any) {
  return (
    <div className="flex items-center gap-3">
       <div className="text-slate-300">{icon}</div>
       <div>
          <p className="text-[9px] font-bold text-slate-400 uppercase leading-none mb-1">{label}</p>
          <p className="text-xs font-bold text-slate-700">{value}</p>
       </div>
    </div>
  )
}

function TabButton({ label, active = false }: any) {
  return (
    <button className={`px-6 py-4 text-[10px] font-black uppercase tracking-widest transition-all ${
      active ? 'text-indigo-600 bg-white border-b-2 border-indigo-600' : 'text-slate-400 hover:text-slate-600'
    }`}>
      {label}
    </button>
  )
}

function PerformanceStat({ label, value, color }: any) {
  return (
    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
       <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
       <p className={`text-xl font-black ${color}`}>{value}</p>
    </div>
  )
}

function MarkRow({ subject, marks }: any) {
  return (
    <div className="flex justify-between items-center p-3 bg-white border border-slate-100 rounded-xl">
       <span className="text-xs font-bold text-slate-700">{subject}</span>
       <span className="text-xs font-black text-indigo-600">{marks}</span>
    </div>
  )
}
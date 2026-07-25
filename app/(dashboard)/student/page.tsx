"use client"

import React from 'react';
import { 
  BookOpen, 
  Trophy, 
  Calendar, 
  Clock, 
  ArrowUpRight,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

// Dummy data for performance chart
const performanceData = [
  { month: 'Jan', score: 70 },
  { month: 'Feb', score: 75 },
  { month: 'Mar', score: 72 },
  { month: 'Apr', score: 85 },
  { month: 'May', score: 82 },
  { month: 'Jun', score: 90 },
];

export default function StudentDashboard() {
  return (
    <div className="p-6 space-y-8 animate-in fade-in duration-700">
      {/* 1. Profile Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-indigo-600 p-8 rounded-[32px] text-white shadow-xl shadow-indigo-100">
        <div className="flex items-center gap-6">
          <div className="size-20 rounded-full bg-white/20 backdrop-blur-md border-2 border-white/30 flex items-center justify-center text-3xl font-black">
            AM
          </div>
          <div>
            <h1 className="text-3xl font-black">Ahmed Malik</h1>
            <p className="text-indigo-100 font-medium">9th-A • Roll No. 01</p>
          </div>
        </div>
        
        <div className="flex gap-4">
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 text-center min-w-[100px]">
             <p className="text-[10px] uppercase font-black tracking-widest text-indigo-200">Current Rank</p>
             <h2 className="text-2xl font-black">#2</h2>
             <p className="text-[10px] text-indigo-100">of 30 students</p>
          </div>
        </div>
      </div>

      {/* 2. Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StudentStatCard 
          title="Attendance" 
          value="96%" 
          status="Excellent" 
          icon={<CheckCircle2 className="text-green-600" />} 
          color="bg-green-50" 
        />
        <StudentStatCard 
          title="Average Result" 
          value="85.4%" 
          status="Top 5%" 
          icon={<Trophy className="text-orange-600" />} 
          color="bg-orange-50" 
        />
        <StudentStatCard 
          title="Fee Status" 
          value="Paid" 
          status="June 2026" 
          icon={<AlertCircle className="text-blue-600" />} 
          color="bg-blue-50" 
        />
      </div>

      {/* 3. Performance & Subjects */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Subject Breakdown (Progress Bars) */}
        <Card className="lg:col-span-1 border-slate-200 shadow-sm rounded-[32px] overflow-hidden">
          <CardHeader className="bg-slate-50/50 border-b border-slate-100">
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-indigo-600" />
              Subject Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <SubjectProgress name="Mathematics" value={95} color="bg-indigo-600" change="+8%" />
            <SubjectProgress name="Physics" value={90} color="bg-blue-600" change="+5%" />
            <SubjectProgress name="Chemistry" value={87} color="bg-teal-600" change="+3%" />
            <SubjectProgress name="English" value={80} color="bg-purple-600" change="-2%" />
            <SubjectProgress name="Urdu" value={92} color="bg-orange-600" change="+7%" />
          </CardContent>
        </Card>

        {/* Monthly Progress Chart */}
        <Card className="lg:col-span-2 border-slate-200 shadow-sm rounded-[32px] overflow-hidden">
          <CardHeader className="bg-slate-50/50 border-b border-slate-100">
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <ArrowUpRight className="h-5 w-5 text-indigo-600" />
              Monthly Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 pt-10">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData}>
                  <defs>
                    <linearGradient id="studentScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} domain={[0, 100]} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area type="monotone" dataKey="score" stroke="#4f46e5" strokeWidth={4} fill="url(#studentScore)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}

// Helper Components
function StudentStatCard({ title, value, status, icon, color }: any) {
  return (
    <Card className="border-slate-200 shadow-sm hover:shadow-md transition-all group rounded-[24px]">
      <CardContent className="p-6 flex items-center gap-4">
        <div className={`p-4 rounded-2xl ${color} group-hover:scale-110 transition-transform`}>
          {icon}
        </div>
        <div>
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{title}</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-black text-slate-900">{value}</h3>
            <span className="text-[10px] font-bold text-green-600">{status}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function SubjectProgress({ name, value, color, change }: any) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-end">
        <div>
          <p className="text-sm font-bold text-slate-800">{name}</p>
          <p className="text-[10px] text-slate-400 font-medium">Predicted: {value}% <span className={change.startsWith('+') ? 'text-green-500' : 'text-red-500'}>{change}</span></p>
        </div>
        <p className="text-sm font-black text-indigo-600">{value}%</p>
      </div>
      <Progress value={value} className="h-2 bg-slate-100" indicatorClassName={color} />
    </div>
  )
}
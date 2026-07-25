"use client" // Charts ke liye client component zaroori hai

import React from 'react';
import { 
  Users, 
  GraduationCap, 
  Wallet, 
  TrendingUp,
  Bell,
  Search
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area 
} from 'recharts';

// --- Chart Data ---
const data = [
  { name: 'Mon', attendance: 90 },
  { name: 'Tue', attendance: 95 },
  { name: 'Wed', attendance: 88 },
  { name: 'Thu', attendance: 92 },
  { name: 'Fri', attendance: 98 },
  { name: 'Sat', attendance: 85 },
];

// --- Sub-Component: Attendance Chart ---
function AttendanceOverviewChart() {
  return (
    <div className="h-[300px] w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorAttend" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{fill: '#94a3b8', fontSize: 12}} 
            dy={10} 
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{fill: '#94a3b8', fontSize: 12}} 
          />
          <Tooltip 
            contentStyle={{ 
                borderRadius: '12px', 
                border: 'none', 
                boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' 
            }}
          />
          <Area 
            type="monotone" 
            dataKey="attendance" 
            stroke="#8b5cf6" 
            strokeWidth={3} 
            fillOpacity={1} 
            fill="url(#colorAttend)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

// --- Main Dashboard Page ---
export default function AdminDashboard() {
  return (
    <div className="p-6 space-y-8 animate-in fade-in duration-500">
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Welcome back, Principal!</h1>
          <p className="text-slate-500 font-medium">Here's what's happening in your academy today.</p>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Quick search..." 
              className="pl-10 pr-4 py-2 w-full border border-slate-200 rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
            />
          </div>
          <button className="p-2 bg-white border border-slate-200 rounded-full hover:bg-slate-50 relative transition-colors shadow-sm">
            <Bell className="h-5 w-5 text-slate-600" />
            <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
        </div>
      </div>

      {/* 2. Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Students" 
          value="1,240" 
          change="+12%" 
          icon={<GraduationCap className="h-6 w-6 text-purple-600" />}
          color="bg-purple-50"
        />
        <StatCard 
          title="Total Teachers" 
          value="48" 
          change="+2" 
          icon={<Users className="h-6 w-6 text-blue-600" />}
          color="bg-blue-50"
        />
        <StatCard 
          title="Monthly Revenue" 
          value="$12,450" 
          change="+8.4%" 
          icon={<Wallet className="h-6 w-6 text-green-600" />}
          color="bg-green-50"
        />
        <StatCard 
          title="Attendance Rate" 
          value="95.2%" 
          change="+1.2%" 
          icon={<TrendingUp className="h-6 w-6 text-orange-600" />}
          color="bg-orange-50"
        />
      </div>

      {/* 3. Main Content Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Real Chart Card */}
        <Card className="lg:col-span-2 shadow-sm border-slate-200 overflow-hidden">
          <CardHeader className="border-b border-slate-50">
            <CardTitle className="text-lg font-bold text-slate-800">Attendance Overview</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
             <AttendanceOverviewChart /> {/* <--- Ab chart yahan nazar aayega */}
          </CardContent>
        </Card>

        {/* Recent Activity Card */}
        <Card className="shadow-sm border-slate-200 overflow-hidden">
          <CardHeader className="border-b border-slate-50">
            <CardTitle className="text-lg font-bold text-slate-800">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
             <div className="space-y-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex gap-4 items-start group">
                    <div className="h-10 w-10 rounded-xl bg-purple-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <span className="text-xs font-bold text-purple-700">UA</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-800 truncate">Admin updated fee structure</p>
                      <p className="text-xs text-slate-500 font-medium mt-1">2 hours ago • <span className="text-purple-600">Principal</span></p>
                    </div>
                  </div>
                ))}
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Reusable StatCard Component
function StatCard({ title, value, change, icon, color }: any) {
  return (
    <Card className="hover:shadow-md transition-all duration-300 cursor-default border-slate-200 group">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className={`p-3 rounded-2xl ${color} group-hover:scale-110 transition-transform`}>
            {icon}
          </div>
          <span className="text-[10px] font-bold text-green-600 bg-green-100/50 px-2.5 py-1 rounded-full">
            {change}
          </span>
        </div>
        <div className="mt-5">
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{title}</p>
          <h3 className="text-3xl font-black text-slate-900 mt-1">{value}</h3>
        </div>
      </CardContent>
    </Card>
  );
}
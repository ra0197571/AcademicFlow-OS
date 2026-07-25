"use client"

import React from 'react';
import { 
  BookOpen, 
  Users, 
  CheckCircle, 
  Clock, 
  Plus,
  Calendar as CalendarIcon
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TeacherDashboard() {
  return (
    <div className="p-6 space-y-8 animate-in fade-in duration-700">
      {/* 1. Welcome Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Hello, Ahmed Malik!</h1>
          <p className="text-slate-500 font-medium">You have 4 classes scheduled for today.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-purple-600 text-white font-bold rounded-xl shadow-lg shadow-purple-500/20 hover:bg-purple-700 transition-all active:scale-95">
          <Plus className="h-5 w-5" />
          Mark Attendance
        </button>
      </div>

      {/* 2. Teacher Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <TeacherStatCard title="Active Classes" value="6" icon={<BookOpen className="text-blue-600" />} color="bg-blue-50" />
        <TeacherStatCard title="Total Students" value="184" icon={<Users className="text-purple-600" />} color="bg-purple-50" />
        <TeacherStatCard title="Average Result" value="82%" icon={<CheckCircle className="text-green-600" />} color="bg-green-50" />
      </div>

      {/* 3. Today's Schedule & Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Classes */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-bold flex items-center gap-2">
              <Clock className="h-5 w-5 text-purple-600" />
              Today's Classes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ClassRow time="09:00 AM" subject="Mathematics" class_name="Grade 9-A" students="32" />
            <ClassRow time="11:30 AM" subject="Physics" class_name="Grade 10-B" students="28" />
            <ClassRow time="01:30 PM" subject="Calculus" class_name="Grade 12-A" students="24" />
            <ClassRow time="03:00 PM" subject="Chemistry" class_name="Grade 9-C" students="30" />
          </CardContent>
        </Card>

        {/* Calendar / Reminder Area */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-bold flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-blue-600" />
              Academic Calendar
            </CardTitle>
          </CardHeader>
          <CardContent>
             <div className="h-[250px] bg-slate-50 rounded-xl flex items-center justify-center border-2 border-dashed border-slate-200">
                <p className="text-slate-400 font-semibold italic text-center">
                    Calendar View coming soon...<br/>
                    <span className="text-xs font-normal">Integration with Google Calendar style events.</span>
                </p>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Sub-components for clean Teacher Dashboard
function TeacherStatCard({ title, value, icon, color }: any) {
  return (
    <Card className="border-slate-200 shadow-sm hover:shadow-md transition-all">
      <CardContent className="p-6 flex items-center gap-4">
        <div className={`p-4 rounded-2xl ${color}`}>
          {icon}
        </div>
        <div>
          <p className="text-sm font-bold text-slate-500 uppercase">{title}</p>
          <h3 className="text-2xl font-black text-slate-900">{value}</h3>
        </div>
      </CardContent>
    </Card>
  )
}

function ClassRow({ time, subject, class_name, students }: any) {
  return (
    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-transparent hover:border-purple-200 transition-all group">
      <div className="flex items-center gap-4">
        <div className="bg-white p-2 rounded-lg text-xs font-black text-slate-700 shadow-sm">
          {time}
        </div>
        <div>
          <h4 className="font-bold text-slate-900">{subject}</h4>
          <p className="text-xs text-slate-500">{class_name} • {students} Students</p>
        </div>
      </div>
      <button className="p-2 bg-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity text-purple-600 hover:bg-purple-50 border border-purple-100">
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  )
}

function ChevronRight({ className }: { className?: string }) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m9 18 6-6-6-6"/></svg>
}
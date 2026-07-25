"use client"

import React from 'react';
import { 
  Trophy, 
  FileText, 
  Download, 
  Printer, 
  CheckCircle2, 
  TrendingUp,
  ChevronRight,
  BookOpen
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Dummy Result Data
const resultData = [
  { subject: "Mathematics", total: 100, obtained: 95, grade: "A+", remarks: "Outstanding" },
  { subject: "Physics", total: 100, obtained: 90, grade: "A+", remarks: "Excellent" },
  { subject: "Chemistry", total: 100, obtained: 87, grade: "A", remarks: "Very Good" },
  { subject: "English", total: 100, obtained: 82, grade: "A", remarks: "Good" },
  { subject: "Urdu", total: 100, obtained: 92, grade: "A+", remarks: "Excellent" },
  { subject: "Computer Science", total: 100, obtained: 98, grade: "A+", remarks: "Brilliant" },
];

export default function StudentResults() {
  const totalMarks = resultData.reduce((acc, curr) => acc + curr.total, 0);
  const obtainedMarks = resultData.reduce((acc, curr) => acc + curr.obtained, 0);
  const percentage = ((obtainedMarks / totalMarks) * 100).toFixed(1);

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
            <span>Student</span>
            <ChevronRight className="h-3 w-3" />
            <span className="text-purple-600">Results</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 mt-2">Academic Performance</h1>
          <p className="text-slate-500 font-medium">Mid-Term Examination Result - 2026</p>
        </div>
        
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-xl border-slate-200 font-bold text-slate-600 gap-2">
            <Printer size={18} /> Print
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700 rounded-xl font-bold gap-2 shadow-lg shadow-purple-100 transition-all active:scale-95 text-white">
            <Download size={18} /> Download PDF
          </Button>
        </div>
      </div>

      {/* 2. Result Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryCard 
          title="Percentage" 
          value={`${percentage}%`} 
          subText="Top 2% of class" 
          icon={<TrendingUp className="text-purple-600" />} 
          color="bg-purple-50" 
        />
        <SummaryCard 
          title="Total Marks" 
          value={`${obtainedMarks}/${totalMarks}`} 
          subText="Passed in all subjects" 
          icon={<CheckCircle2 className="text-green-600" />} 
          color="bg-green-50" 
        />
        <SummaryCard 
          title="Final Grade" 
          value="A+" 
          subText="Distinction" 
          icon={<Trophy className="text-orange-600" />} 
          color="bg-orange-50" 
        />
      </div>

      {/* 3. Detailed Marks Table */}
      <Card className="border-slate-200 shadow-sm rounded-[32px] overflow-hidden">
        <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <FileText className="h-5 w-5 text-indigo-600" />
            </div>
            <div>
              <CardTitle className="text-lg font-bold">Subject-wise Breakdown</CardTitle>
              <CardDescription>Detailed marks for each subject in this examination</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/30">
                  <th className="p-6 text-[10px] uppercase font-black text-slate-400 tracking-widest border-b border-slate-50">Subject</th>
                  <th className="p-6 text-[10px] uppercase font-black text-slate-400 tracking-widest border-b border-slate-50">Total</th>
                  <th className="p-6 text-[10px] uppercase font-black text-slate-400 tracking-widest border-b border-slate-50">Obtained</th>
                  <th className="p-6 text-[10px] uppercase font-black text-slate-400 tracking-widest border-b border-slate-50">Grade</th>
                  <th className="p-6 text-[10px] uppercase font-black text-slate-400 tracking-widest border-b border-slate-50">Remarks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {resultData.map((item, index) => (
                  <tr key={index} className="group hover:bg-slate-50/50 transition-colors">
                    <td className="p-6">
                      <div className="flex items-center gap-3">
                         <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-white transition-colors">
                            <BookOpen className="h-4 w-4 text-slate-500" />
                         </div>
                         <span className="font-bold text-slate-800">{item.subject}</span>
                      </div>
                    </td>
                    <td className="p-6 font-bold text-slate-500">{item.total}</td>
                    <td className="p-6">
                      <span className="font-black text-slate-900 text-lg">{item.obtained}</span>
                    </td>
                    <td className="p-6">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                        item.grade === 'A+' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                      }`}>
                        {item.grade}
                      </span>
                    </td>
                    <td className="p-6">
                      <span className="text-sm font-medium text-slate-500 italic">"{item.remarks}"</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Helper Card Component
function SummaryCard({ title, value, subText, icon, color }: any) {
  return (
    <Card className="border-slate-200 shadow-sm rounded-[24px] group hover:shadow-md transition-all">
      <CardContent className="p-6 flex items-center gap-4">
        <div className={`p-4 rounded-2xl ${color} group-hover:scale-110 transition-transform`}>
          {icon}
        </div>
        <div>
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{title}</p>
          <h3 className="text-2xl font-black text-slate-900">{value}</h3>
          <p className="text-[10px] font-medium text-slate-400">{subText}</p>
        </div>
      </CardContent>
    </Card>
  )
}
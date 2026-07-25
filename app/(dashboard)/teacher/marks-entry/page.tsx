"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { ArrowLeft, Save, FileSpreadsheet, ChevronRight, Search } from "lucide-react"
import Link from "next/link"

export default function MarksEntryPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
        {/* --- HEADER --- */}
        <header className="h-16 flex items-center justify-between px-8 bg-white border-b sticky top-0 z-20">
          <div className="flex items-center gap-4">
            {/* Back to Teacher Dashboard */}
            <Link href="/teacher" className="p-2 hover:bg-slate-50 rounded-full text-slate-400 transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <h1 className="text-xl font-bold text-slate-800 tracking-tight">Test Marks Entry</h1>
          </div>
          <div className="flex gap-3">
             <Button variant="outline" className="rounded-xl border-slate-200 font-bold text-slate-600 gap-2">
                <FileSpreadsheet size={18} /> Import Excel
             </Button>
             <Button className="bg-[#4F46E5] hover:bg-indigo-700 rounded-xl font-bold gap-2 shadow-lg shadow-indigo-100 transition-all active:scale-95">
                <Save size={18} /> Save All Marks
             </Button>
          </div>
        </header>

        <main className="p-8 max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* --- SELECTION FILTERS --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-8 rounded-[32px] shadow-sm border border-slate-100">
             <div className="space-y-3">
                <label className="text-[11px] font-black uppercase text-slate-400 tracking-widest ml-1">Select Class</label>
                <Select>
                  <SelectTrigger className="h-14 rounded-2xl border-slate-100 bg-slate-50/50 font-bold text-slate-700 focus:ring-4 focus:ring-indigo-50 transition-all">
                    <SelectValue placeholder="Choose a class" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-slate-100">
                    <SelectItem value="9a">Class 9th-A</SelectItem>
                    <SelectItem value="10a">Class 10th-A</SelectItem>
                  </SelectContent>
                </Select>
             </div>

             <div className="space-y-3">
                <label className="text-[11px] font-black uppercase text-slate-400 tracking-widest ml-1">Select Test</label>
                <Select>
                  <SelectTrigger className="h-14 rounded-2xl border-slate-100 bg-slate-50/50 font-bold text-slate-700 focus:ring-4 focus:ring-indigo-50 transition-all">
                    <SelectValue placeholder="Choose a test" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-slate-100">
                    <SelectItem value="mid">Mid-Term Examination 2026</SelectItem>
                    <SelectItem value="monthly">Monthly Assessment - May</SelectItem>
                  </SelectContent>
                </Select>
             </div>
          </div>

          {/* --- MARKS TABLE LIST --- */}
          <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden">
             <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
                <h2 className="font-bold text-slate-800">Student List <span className="text-slate-400 font-medium ml-2 text-sm">(32 Students)</span></h2>
                <div className="relative">
                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                   <Input placeholder="Search student..." className="pl-10 h-10 w-64 rounded-xl border-none bg-white shadow-sm ring-1 ring-slate-100 focus:ring-2 focus:ring-indigo-500/20 transition-all" />
                </div>
             </div>

             <div className="divide-y divide-slate-50">
                {[
                  { name: "Ahmed Malik", id: "STU-001", current: "88" },
                  { name: "Fatima Khan", id: "STU-002", current: "" },
                  { name: "Ali Hassan", id: "STU-003", current: "92" },
                  { name: "Zainab Bibi", id: "STU-004", current: "75" },
                ].map((student, i) => (
                  <div key={i} className="flex items-center justify-between p-6 hover:bg-indigo-50/30 transition-all group">
                    <div className="flex items-center gap-4">
                      <div className="size-11 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-xs shadow-sm group-hover:scale-110 transition-transform">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-bold text-slate-800">{student.name}</p>
                        <p className="text-[10px] text-slate-400 font-bold tracking-wider">{student.id}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6">
                       <div className="text-right">
                          <p className="text-[10px] font-black text-slate-300 uppercase mb-1 mr-1">Obtained Marks</p>
                          <input 
                            type="text" 
                            placeholder="--"
                            defaultValue={student.current}
                            className="w-24 h-12 bg-slate-50 border-2 border-transparent focus:border-[#4F46E5] focus:bg-white rounded-xl text-center font-black text-xl outline-none transition-all shadow-sm focus:shadow-indigo-100"
                          />
                       </div>
                       <ChevronRight className="text-slate-200 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" size={20} />
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </main>
    </div>
 )
}
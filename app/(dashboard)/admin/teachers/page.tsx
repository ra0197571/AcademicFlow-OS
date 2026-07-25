"use client"

import React from 'react';
import { 
  Search, 
  Filter, 
  MoreVertical, 
  UserPlus, 
  BookOpen,
  Mail,
  Phone,
  Briefcase
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Dummy Teachers Data
const teachers = [
  { id: "TCH-101", name: "Zia Khan", subject: "Mathematics", email: "zia@example.com", status: "Active", phone: "+92 300 1112233", exp: "12 Years" },
  { id: "TCH-102", name: "Sarah Ahmed", subject: "Physics", email: "sarah@example.com", status: "Active", phone: "+92 301 4445566", exp: "8 Years" },
  { id: "TCH-103", name: "Usman Ghani", subject: "Chemistry", email: "usman@example.com", status: "On Leave", phone: "+92 321 7778899", exp: "5 Years" },
  { id: "TCH-104", name: "Fatima Ali", subject: "English", email: "fatima.a@example.com", status: "Active", phone: "+92 333 0001122", exp: "10 Years" },
];

export default function TeachersDirectory() {
  return (
    <div className="p-6 space-y-8 animate-in fade-in duration-500">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Teachers Directory</h1>
          <p className="text-slate-500 font-medium">View and manage all faculty members of the academy.</p>
        </div>
        
        <Button className="bg-indigo-600 hover:bg-indigo-700 rounded-xl font-bold gap-2 shadow-lg shadow-indigo-100 py-6 px-6 transition-all active:scale-95">
          <UserPlus size={18} /> Add New Teacher
        </Button>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <Input 
            placeholder="Search by name, ID or subject..." 
            className="pl-10 h-12 rounded-xl border-slate-100 bg-slate-50/50 focus:ring-2 focus:ring-indigo-500/10 transition-all"
          />
        </div>
        <Button variant="outline" className="h-12 rounded-xl border-slate-200 font-bold gap-2">
          <Filter size={18} /> Filters
        </Button>
      </div>

      {/* Teachers Table */}
      <Card className="border-slate-200 shadow-sm rounded-[32px] overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="p-6 text-[10px] uppercase font-black text-slate-400 tracking-widest">Teacher Info</th>
                  <th className="p-6 text-[10px] uppercase font-black text-slate-400 tracking-widest">Subject / ID</th>
                  <th className="p-6 text-[10px] uppercase font-black text-slate-400 tracking-widest">Experience</th>
                  <th className="p-6 text-[10px] uppercase font-black text-slate-400 tracking-widest">Status</th>
                  <th className="p-6 text-[10px] uppercase font-black text-slate-400 tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {teachers.map((teacher) => (
                  <tr key={teacher.id} className="group hover:bg-indigo-50/30 transition-all cursor-default">
                    <td className="p-6">
                      <div className="flex items-center gap-4">
                         <div className="size-11 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-xs group-hover:scale-110 transition-all">
                            {teacher.name.split(' ').map(n => n[0]).join('')}
                         </div>
                         <div>
                            <p className="font-bold text-slate-800">{teacher.name}</p>
                            <div className="flex items-center gap-1 text-[10px] text-slate-400 font-bold">
                               <Mail size={10} /> {teacher.email}
                            </div>
                         </div>
                      </div>
                    </td>
                    <td className="p-6">
                       <p className="font-bold text-slate-700 text-sm">{teacher.subject}</p>
                       <p className="text-[10px] font-black text-indigo-400 uppercase tracking-wider">{teacher.id}</p>
                    </td>
                    <td className="p-6">
                       <div className="flex items-center gap-1.5 text-sm font-medium text-slate-600">
                          <Briefcase size={14} className="text-slate-400" />
                          {teacher.exp}
                       </div>
                    </td>
                    <td className="p-6">
                       <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                         teacher.status === 'Active' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'
                       }`}>
                         {teacher.status}
                       </span>
                    </td>
                    <td className="p-6 text-right">
                       <button className="p-2 hover:bg-white hover:shadow-sm rounded-xl transition-all text-slate-400 hover:text-indigo-600">
                          <MoreVertical size={18} />
                       </button>
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
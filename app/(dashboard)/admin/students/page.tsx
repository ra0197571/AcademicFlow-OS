"use client"

import React from 'react';
import { 
  Search, 
  Filter, 
  MoreVertical, 
  UserPlus, 
  GraduationCap,
  Mail,
  Phone,
  ArrowUpDown
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

// Dummy Students Data
const students = [
  { id: "STU-001", name: "Ahmed Malik", class: "9th-A", email: "ahmed@example.com", status: "Active", phone: "+92 300 1234567" },
  { id: "STU-002", name: "Fatima Khan", class: "10th-B", email: "fatima@example.com", status: "Active", phone: "+92 301 7654321" },
  { id: "STU-003", name: "Ali Hassan", class: "9th-A", email: "ali@example.com", status: "Inactive", phone: "+92 321 9876543" },
  { id: "STU-004", name: "Zainab Bibi", class: "11th-C", email: "zainab@example.com", status: "Active", phone: "+92 333 1122334" },
  { id: "STU-005", name: "Bilal Raza", class: "12th-A", email: "bilal@example.com", status: "Pending", phone: "+92 345 5566778" },
];

export default function StudentsDirectory() {
  return (
    <div className="p-6 space-y-8 animate-in fade-in duration-500">
      
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Students Directory</h1>
          <p className="text-slate-500 font-medium">Manage and view all students registered in the academy.</p>
        </div>
        
        <Link href="/admin/admission">
          <Button className="bg-indigo-600 hover:bg-indigo-700 rounded-xl font-bold gap-2 shadow-lg shadow-indigo-100 py-6 px-6">
            <UserPlus size={18} /> Add New Student
          </Button>
        </Link>
      </div>

      {/* 2. Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <Input 
            placeholder="Search by name, ID or email..." 
            className="pl-10 h-12 rounded-xl border-slate-100 bg-slate-50/50 focus:ring-2 focus:ring-indigo-500/10 transition-all"
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Button variant="outline" className="h-12 rounded-xl border-slate-200 font-bold gap-2 flex-1">
            <Filter size={18} /> Filters
          </Button>
          <Button variant="outline" className="h-12 rounded-xl border-slate-200 font-bold gap-2 flex-1">
            <ArrowUpDown size={18} /> Sort
          </Button>
        </div>
      </div>

      {/* 3. Students Table */}
      <Card className="border-slate-200 shadow-sm rounded-[32px] overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="p-6 text-[10px] uppercase font-black text-slate-400 tracking-widest">Student Info</th>
                  <th className="p-6 text-[10px] uppercase font-black text-slate-400 tracking-widest">ID / Class</th>
                  <th className="p-6 text-[10px] uppercase font-black text-slate-400 tracking-widest">Contact</th>
                  <th className="p-6 text-[10px] uppercase font-black text-slate-400 tracking-widest">Status</th>
                  <th className="p-6 text-[10px] uppercase font-black text-slate-400 tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {students.map((student) => (
                  <tr key={student.id} className="group hover:bg-indigo-50/30 transition-all cursor-default">
                    <td className="p-6">
                      <div className="flex items-center gap-4">
                         <div className="size-11 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-xs group-hover:scale-110 group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-all">
                            {student.name.split(' ').map(n => n[0]).join('')}
                         </div>
                         <div>
                            <p className="font-bold text-slate-800">{student.name}</p>
                            <div className="flex items-center gap-1 text-[10px] text-slate-400 font-bold">
                               <Mail size={10} /> {student.email}
                            </div>
                         </div>
                      </div>
                    </td>
                    <td className="p-6">
                       <p className="font-bold text-slate-700 text-sm">{student.id}</p>
                       <p className="text-xs font-bold text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded-md inline-block mt-1">{student.class}</p>
                    </td>
                    <td className="p-6">
                       <div className="flex items-center gap-1.5 text-sm font-medium text-slate-600">
                          <Phone size={14} className="text-slate-400" />
                          {student.phone}
                       </div>
                    </td>
                    <td className="p-6">
                       <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                         student.status === 'Active' ? 'bg-green-100 text-green-600' : 
                         student.status === 'Inactive' ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'
                       }`}>
                         {student.status}
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
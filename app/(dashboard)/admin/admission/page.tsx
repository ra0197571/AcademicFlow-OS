"use client"

import React from 'react';
import { 
  UserPlus, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar,
  BookOpen,
  ShieldCheck,
  ChevronRight
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function StudentAdmission() {
  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* 1. Header with Breadcrumb-like feel */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
          <span>Admin</span>
          <ChevronRight className="h-3 w-3" />
          <span className="text-purple-600">New Admission</span>
        </div>
        <h1 className="text-3xl font-black text-slate-900 mt-2">New Student Admission</h1>
        <p className="text-slate-500 font-medium">Please fill in all the details carefully to register a new student.</p>
      </div>

      <form className="space-y-8 pb-10">
        {/* Section 1: Personal Information */}
        <Card className="border-slate-200 shadow-sm overflow-hidden">
          <CardHeader className="bg-slate-50/50 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <User className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <CardTitle className="text-lg font-bold">Personal Information</CardTitle>
                <CardDescription>Basic details of the student</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <CustomInput label="Full Name" placeholder="e.g. Ahmed Malik" icon={<User className="h-4 w-4" />} />
            <CustomInput label="Date of Birth" type="date" icon={<Calendar className="h-4 w-4" />} />
            <CustomInput label="Gender" type="select" options={["Select Gender", "Male", "Female", "Other"]} />
            <CustomInput label="Blood Group" placeholder="e.g. A+" />
          </CardContent>
        </Card>

        {/* Section 2: Contact & Address */}
        <Card className="border-slate-200 shadow-sm overflow-hidden">
          <CardHeader className="bg-slate-50/50 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <MapPin className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-lg font-bold">Contact & Address</CardTitle>
                <CardDescription>Where the student lives and contact info</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <CustomInput label="Phone Number" placeholder="+92 300 1234567" icon={<Phone className="h-4 w-4" />} />
            <CustomInput label="Email Address" type="email" placeholder="student@example.com" icon={<Mail className="h-4 w-4" />} />
            <div className="md:col-span-2">
               <CustomInput label="Permanent Address" placeholder="Street, House No, City" icon={<MapPin className="h-4 w-4" />} />
            </div>
          </CardContent>
        </Card>

        {/* Section 3: Academic Information */}
        <Card className="border-slate-200 shadow-sm overflow-hidden">
          <CardHeader className="bg-slate-50/50 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <BookOpen className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <CardTitle className="text-lg font-bold">Academic Details</CardTitle>
                <CardDescription>Class and registration info</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <CustomInput label="Select Class" type="select" options={["Select Class", "9th", "10th", "11th", "12th"]} />
            <CustomInput label="Section" placeholder="e.g. A" />
            <CustomInput label="Roll Number" placeholder="Auto-generated" disabled />
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4">
           <button type="button" className="px-6 py-2.5 rounded-xl border border-slate-200 font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
              Cancel
           </button>
           <button type="submit" className="flex items-center gap-2 px-8 py-2.5 rounded-xl bg-purple-600 font-bold text-white hover:bg-purple-700 shadow-lg shadow-purple-500/20 transition-all active:scale-95">
              <ShieldCheck className="h-5 w-5" />
              Complete Admission
           </button>
        </div>
      </form>
    </div>
  );
}

// Reusable Input Component for clean code
function CustomInput({ label, icon, options, type = "text", ...props }: any) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-bold text-slate-700 ml-1">{label}</label>
      <div className="relative group">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-purple-500 transition-colors">
            {icon}
          </div>
        )}
        
        {type === "select" ? (
          <select className="w-full pl-3 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all appearance-none cursor-pointer">
            {options.map((opt: string) => <option key={opt}>{opt}</option>)}
          </select>
        ) : (
          <input 
            type={type}
            className={`w-full ${icon ? 'pl-10' : 'pl-4'} pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all placeholder:text-slate-400`}
            {...props}
          />
        )}
      </div>
    </div>
  )
}
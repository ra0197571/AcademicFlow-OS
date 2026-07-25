"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, ArrowLeft, ArrowRight, UserPlus, Users, Home } from "lucide-react"
import Link from "next/link"

export default function AdmissionPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* --- GREEN ADMISSION HEADER --- */}
      <header className="bg-[#10B981] p-8 text-white relative overflow-hidden">
         <div className="absolute top-0 right-0 size-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl pointer-events-none" />
         
         <div className="max-w-4xl mx-auto flex justify-between items-center relative z-10">
            <Link href="/" className="flex items-center gap-2 text-white/80 hover:text-white transition-all font-bold">
               <ArrowLeft size={20} /> Back to Home
            </Link>
            <div className="text-right">
               <p className="text-[11px] font-black uppercase tracking-widest opacity-70">Step 1 of 5</p>
               <h1 className="text-2xl font-bold tracking-tight">New Student Admission</h1>
            </div>
         </div>

         {/* Progress Bar like Figma */}
         <div className="max-w-4xl mx-auto mt-8 relative z-10">
            <div className="flex justify-between items-center mb-2">
               <span className="text-xs font-bold uppercase tracking-wider text-white/90">Registration Progress</span>
               <span className="text-xs font-black">20% Complete</span>
            </div>
            <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden border border-white/10">
               <div className="w-[20%] h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
            </div>
         </div>
      </header>

      {/* --- FORM CONTENT AREA --- */}
      <main className="max-w-4xl mx-auto p-8 -mt-6 relative z-20">
         <div className="bg-white rounded-[32px] shadow-2xl shadow-emerald-900/5 p-10 border border-slate-100">
            
            <div className="text-center mb-12">
               <h2 className="text-3xl font-black text-slate-800 tracking-tight">How would you like to start?</h2>
               <p className="text-slate-400 mt-2 font-medium">Select the type of admission process you want to follow</p>
            </div>

            {/* Option Cards like Figma #6 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               
               <div className="group border-2 border-slate-100 p-8 rounded-[24px] hover:border-[#10B981] hover:bg-emerald-50/30 transition-all cursor-pointer relative overflow-hidden">
                  <div className="size-16 rounded-2xl bg-emerald-50 flex items-center justify-center text-[#10B981] mb-6 group-hover:bg-[#10B981] group-hover:text-white transition-all">
                     <UserPlus size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Individual Admission</h3>
                  <p className="text-sm text-slate-400 leading-relaxed font-medium">
                     Standard process for admitting a single student with full documentation.
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-[#10B981] font-bold text-sm">
                     Start Process <ArrowRight size={16} />
                  </div>
               </div>

               <div className="group border-2 border-slate-100 p-8 rounded-[24px] hover:border-[#10B981] hover:bg-emerald-50/30 transition-all cursor-pointer relative overflow-hidden">
                  <div className="size-16 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                     <Users size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Bulk Enrollment</h3>
                  <p className="text-sm text-slate-400 leading-relaxed font-medium">
                     Import multiple students at once using a CSV or Excel spreadsheet.
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-indigo-600 font-bold text-sm">
                     Upload File <ArrowRight size={16} />
                  </div>
               </div>

            </div>

            <div className="mt-12 pt-8 border-t border-slate-50 flex justify-between items-center">
               <p className="text-xs text-slate-400 font-medium italic">All data is encrypted and saved automatically.</p>
               <Button className="bg-[#10B981] hover:bg-emerald-600 h-12 px-8 rounded-xl font-bold transition-all border-none">
                  Next Step
               </Button>
            </div>
         </div>
      </main>
      
      <p className="text-center mt-6 text-[11px] text-slate-300 font-bold uppercase tracking-widest">AcademicFlow OS • Admission Module v1.0</p>
    </div>
  )
}
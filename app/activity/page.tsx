"use client"

import { useEffect, useState } from "react"
import { AppSidebar } from "@/components/dashboard/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Filter, Download, Clock, CheckCircle2 } from "lucide-react"

const activities = [
  { id: 1, user: "Principal Ali", action: "locked the payroll", target: "May 2026", time: "2 mins ago", type: "system" },
  { id: 2, user: "Teacher Sarah", action: "marked attendance", target: "Class 5-A", time: "15 mins ago", type: "attendance" },
  { id: 3, user: "Desk Op. Usman", action: "collected fee", target: "Ahmed Malik (STU-001)", time: "1 hour ago", type: "fee" },
  { id: 4, user: "System", action: "generated report", target: "Monthly Revenue", time: "3 hours ago", type: "report" },
  { id: 5, user: "Principal Ali", action: "approved leave", target: "Teacher Fatima", time: "5 hours ago", type: "system" },
]

export default function ActivityPage() {
  const [mounted, setMounted] = useState(false)

  // Hydration safety check
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-[#F8FAFC]">
        {/* --- HEADER --- */}
        <header className="h-16 flex items-center justify-between px-8 bg-white border-b sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-slate-800 tracking-tight">Activity Ledger</h1>
            <Badge className="bg-indigo-50 text-indigo-600 border-none font-bold">Realtime Sync</Badge>
          </div>
          <div className="flex gap-3">
             <button className="p-2.5 bg-slate-50 text-slate-400 rounded-xl hover:bg-slate-100 transition-all border-none"><Filter size={20}/></button>
             <button className="p-2.5 bg-slate-50 text-slate-400 rounded-xl hover:bg-slate-100 transition-all border-none"><Download size={20}/></button>
          </div>
        </header>

        <main className="p-8 max-w-5xl mx-auto">
          {/* --- SEARCH & QUICK STATS --- */}
          <div className="mb-8 flex justify-between items-center bg-white p-6 rounded-[28px] shadow-sm border border-slate-100">
             <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input placeholder="Search events..." className="w-full pl-12 h-12 bg-slate-50 border-none rounded-2xl text-sm outline-none focus:ring-2 ring-indigo-100 transition-all" />
             </div>
             <div className="flex gap-8 px-6 border-l border-slate-100 ml-6">
                <div>
                   <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Today</p>
                   <p className="text-xl font-bold text-slate-800 tracking-tight">142 <span className="text-xs text-emerald-500 font-bold">Events</span></p>
                </div>
                <div>
                   <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Status</p>
                   {/* FIXED: Changed <p> to <div> to avoid HTML nesting error */}
                   <div className="text-xl font-bold text-slate-800 flex items-center gap-2 tracking-tight">
                      Online <div className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                   </div>
                </div>
             </div>
          </div>

          {/* --- FEED LIST --- */}
          <div className="space-y-4">
             {activities.map((item) => (
                <div key={item.id} className="bg-white p-5 rounded-[24px] shadow-sm border border-slate-100 flex items-center justify-between group hover:shadow-md transition-all hover:border-indigo-100">
                   <div className="flex items-center gap-5">
                      <div className="relative">
                         <Avatar className="size-12 rounded-2xl border-2 border-slate-50">
                            <AvatarImage src={`https://i.pravatar.cc/100?u=${item.id}`} />
                            <AvatarFallback>{item.user[0]}</AvatarFallback>
                         </Avatar>
                         <div className="absolute -bottom-1 -right-1 size-5 rounded-lg bg-white shadow-sm flex items-center justify-center">
                            {item.type === 'attendance' ? <CheckCircle2 size={12} className="text-emerald-500" /> : 
                             item.type === 'fee' ? <div className="size-2 bg-amber-500 rounded-full" /> :
                             <Clock size={12} className="text-indigo-500" />}
                         </div>
                      </div>
                      
                      <div>
                         <div className="text-sm font-medium text-slate-400 leading-none mb-1.5">
                            <span className="font-black text-slate-800">{item.user}</span> {item.action}
                         </div>
                         <h3 className="text-base font-bold text-slate-700 tracking-tight">{item.target}</h3>
                      </div>
                   </div>

                   <div className="text-right">
                      <p className="text-[11px] font-bold text-slate-300 uppercase tracking-tighter mb-1">{item.time}</p>
                      <Badge variant="outline" className="rounded-lg border-slate-100 bg-slate-50 text-[10px] font-black text-slate-400 px-2 py-0">
                         {item.type.toUpperCase()}
                      </Badge>
                   </div>
                </div>
             ))}

             <button className="w-full py-4 text-slate-300 font-bold text-sm hover:text-indigo-500 transition-colors uppercase tracking-widest border-none bg-transparent cursor-pointer">
                Load More History
             </button>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
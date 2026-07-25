"use client"

import { useEffect, useState } from "react"
import { useAppStore, Role } from "@/lib/store"
import { AppSidebar } from "@/components/dashboard/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ChevronDown, Bell, Search, GraduationCap, Calendar, Users, Wallet, Trophy } from "lucide-react"
import { Sparkline, MiniBars } from "@/components/dashboard/mini-charts"
import { AttendanceChart } from "@/components/dashboard/attendance-chart" // Jo humne pehle banaya tha
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Home() {
  const { currentRole, setRole } = useAppStore()
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-[#F8FAFC]">
        
        {/* --- DYNAMIC HEADER --- */}
        {currentRole === 'Super-Principal' ? (
          <header className="flex h-16 items-center justify-between px-8 bg-white border-b sticky top-0 z-20">
             <div className="flex items-center gap-4">
                <h1 className="text-xl font-bold text-slate-800 tracking-tight">Group Overview</h1>
                <Badge className="text-[10px] bg-slate-100 text-slate-500 border-none font-bold">VIEW ONLY</Badge>
             </div>
             <div className="flex items-center gap-3">
                <div className="text-[10px] font-bold text-slate-400 mr-4 tracking-widest uppercase">June 2026 • Read-only</div>
                <button className="p-2 hover:bg-slate-50 rounded-full text-slate-400"><Search size={18} /></button>
                <button className="p-2 hover:bg-slate-50 rounded-full text-slate-400"><Bell size={18} /></button>
                <RoleDropdown currentRole={currentRole} setRole={setRole} />
             </div>
          </header>
        ) : (
          <div className="bg-[#4F46E5] p-8 text-white relative overflow-hidden min-h-[200px]">
             <div className="absolute top-0 right-0 size-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl pointer-events-none" />
             <div className="flex justify-between items-start relative z-10">
                <div className="flex gap-4 items-center">
                   <div className="size-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-xl font-bold border border-white/30">AM</div>
                   <div>
                      <h1 className="text-2xl font-bold tracking-tight">Ahmed Malik</h1>
                      <p className="text-white/70 text-sm font-medium">
                         {currentRole === 'Teacher' ? 'Staff ID: T-2024-99' : 'STU-2024-1234'} • Class 5-A
                      </p>
                   </div>
                </div>
                <div className="flex gap-3 items-center">
                   <Search size={20} className="text-white/70" />
                   <Bell size={20} className="text-white/70" />
                   <RoleDropdown currentRole={currentRole} setRole={setRole} isBlue />
                </div>
             </div>

             <div className="flex gap-4 mt-10 relative z-10 max-w-5xl">
                <div className="bg-white rounded-2xl p-5 flex-1 shadow-md flex items-center gap-4">
                   <div className="size-11 rounded-full bg-emerald-50 flex items-center justify-center">
                      <div className="size-6 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin" />
                   </div>
                   <div>
                      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Attendance</p>
                      <div className="flex items-center gap-2">
                         <span className="text-2xl font-bold text-slate-800">96%</span>
                         <Badge className="bg-emerald-100 text-emerald-600 border-none text-[10px] font-bold uppercase tracking-tight">Excellent</Badge>
                      </div>
                   </div>
                </div>
                
                <div className="bg-white rounded-2xl p-5 flex-1 shadow-md flex items-center gap-4">
                   <div className="size-11 rounded-full bg-indigo-50 flex items-center justify-center text-[#4F46E5] font-bold text-xs">
                      {currentRole === 'Teacher' ? <Wallet size={18}/> : '#2'}
                   </div>
                   <div>
                      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                         {currentRole === 'Teacher' ? 'Next Payout' : 'Class Rank'}
                      </p>
                      <span className="text-2xl font-bold text-slate-800">
                         {currentRole === 'Teacher' ? '$2,450' : 'Top 3'}
                      </span>
                   </div>
                </div>
             </div>
          </div>
        )}

        {/* --- MAIN CONTENT AREA --- */}
        <main className="p-8 space-y-8 max-w-[1400px] mx-auto">
           <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              
              {/* Left Column (Main Data) */}
              <div className="md:col-span-8 space-y-8">
                {currentRole === 'Teacher' ? (
                   <Card className="rounded-[32px] border-none shadow-sm p-8 bg-white">
                      <h2 className="text-xl font-bold text-slate-800 mb-6">My Classes</h2>
                      <div className="space-y-4">
                         {['Mathematics', 'Physics', 'Chemistry'].map((subject, i) => (
                            <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 hover:bg-indigo-50/50 transition-all cursor-pointer">
                               <div className="flex items-center gap-4">
                                  <div className="size-10 rounded-xl bg-white flex items-center justify-center shadow-sm font-bold text-indigo-600">0{i+1}</div>
                                  <div><p className="font-bold text-slate-800">{subject}</p><p className="text-xs text-slate-400 font-medium">9:00 AM - 10:00 AM</p></div>
                               </div>
                               <Badge className="bg-white text-indigo-600 border-slate-200">Room 102</Badge>
                            </div>
                         ))}
                      </div>
                   </Card>
                ) : currentRole === 'Student' ? (
                   /* Student Specific Views (Figma #9) */
                   <div className="space-y-8">
                      <Card className="rounded-[32px] border-none shadow-sm p-8 bg-white h-[400px]">
                         <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                           <Trophy className="text-amber-500" size={24} /> Monthly Progress
                         </h2>
                         <AttendanceChart /> {/* Asli chart Component */}
                      </Card>

                      <Card className="rounded-[32px] border-none shadow-sm p-8 bg-white">
                         <h2 className="text-xl font-bold text-slate-800 mb-6">Subject Breakdown</h2>
                         <div className="space-y-6">
                            {[
                               { name: 'Mathematics', score: 95, trend: '+8%' },
                               { name: 'Physics', score: 90, trend: '+5%' },
                               { name: 'Chemistry', score: 87, trend: '+3%' }
                            ].map((sub, i) => (
                               <div key={i} className="space-y-2">
                                  <div className="flex justify-between items-end">
                                     <div>
                                        <p className="font-bold text-slate-700">{sub.name}</p>
                                        <p className="text-[10px] text-slate-400 font-medium">Predicted: {sub.score}% <span className="text-emerald-500">{sub.trend}</span></p>
                                     </div>
                                     <span className="font-bold text-slate-900">{sub.score}%</span>
                                  </div>
                                  <Progress value={sub.score} className="h-2 bg-slate-100" />
                               </div>
                            ))}
                         </div>
                      </Card>
                   </div>
                ) : (
                   <Card className="rounded-[32px] border-none shadow-sm p-8 bg-white min-h-[400px]">
                      <h2 className="text-xl font-bold text-slate-800 mb-6">Performance Analytics</h2>
                      <div className="h-64 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-100 flex items-center justify-center">
                         <p className="text-slate-300 italic">Weekly Overview Analytics Loading...</p>
                      </div>
                   </Card>
                )}
              </div>

              {/* Right Column (Schedule & Sidebar Widgets) */}
              <div className="md:col-span-4 space-y-6">
                 <Card className="rounded-[32px] border-none shadow-sm p-8 bg-white">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Today's Schedule</p>
                    <div className="space-y-6">
                       <div className="border-l-4 border-emerald-500 pl-4">
                          <p className="text-sm font-bold text-slate-800">Morning Assembly</p>
                          <p className="text-[11px] text-slate-400 font-medium">Starts in 15 mins</p>
                       </div>
                       <div className="border-l-4 border-indigo-500 pl-4">
                          <p className="text-sm font-bold text-slate-800">Chemistry Test</p>
                          <p className="text-[11px] text-slate-400 font-medium">Class 9th-A • 12:00 PM</p>
                       </div>
                    </div>
                 </Card>
              </div>
           </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

function RoleDropdown({ currentRole, setRole, isBlue = false }: { currentRole: Role, setRole: (r: Role) => void, isBlue?: boolean }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={`${isBlue ? 'bg-white text-[#4F46E5]' : 'bg-white text-indigo-600 border border-slate-100 shadow-sm'} px-5 py-2.5 rounded-xl flex items-center gap-2 font-bold outline-none cursor-pointer hover:opacity-90 transition-all border-none`}>
        {currentRole} <ChevronDown size={14} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 rounded-2xl shadow-2xl p-2 mt-2 border-slate-100">
        <div className="text-[10px] uppercase text-slate-400 font-black p-3 tracking-widest">Switch Dashboard</div>
        {(['Super-Principal', 'Principal', 'Teacher', 'Student'] as const).map((r) => (
          <DropdownMenuItem key={r} onClick={() => setRole(r)} className={`rounded-xl py-3 px-3 cursor-pointer font-bold text-sm mb-1 transition-colors ${currentRole === r ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 hover:bg-slate-50'}`}>
            {r} View
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
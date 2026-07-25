"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Plus, MoreHorizontal, Search, Calendar, MessageSquare } from "lucide-react"

const columns = [
  { 
    id: "todo", title: "TO DO", count: 3, color: "bg-slate-400",
    tasks: [
      { id: 1, title: "Finalize Mid-term Schedule", priority: "High", comments: 5, date: "July 28" },
      { id: 2, title: "Review Teacher Payroll", priority: "Medium", comments: 2, date: "July 30" }
    ]
  },
  { 
    id: "in-progress", title: "IN PROGRESS", count: 2, color: "bg-indigo-500",
    tasks: [
      { id: 3, title: "Student Portal Redesign", priority: "High", comments: 12, date: "Today" }
    ]
  },
  { 
    id: "review", title: "REVIEW", count: 4, color: "bg-amber-500",
    tasks: [
      { id: 4, title: "Library Book Audit", priority: "Low", comments: 0, date: "Aug 05" }
    ]
  },
  { 
    id: "done", title: "DONE", count: 12, color: "bg-emerald-500",
    tasks: [
      { id: 5, title: "Parent Teacher Meeting", priority: "Medium", comments: 8, date: "Yesterday" }
    ]
  }
]

export default function TasksPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
        {/* --- HEADER --- */}
        <header className="h-16 flex items-center justify-between px-8 bg-white border-b sticky top-0 z-20 shadow-sm">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-black text-slate-800 tracking-tight">Project Kanban</h1>
            <Badge variant="outline" className="rounded-full bg-indigo-50 text-indigo-600 font-bold border-none px-3">
               12 Tasks Active
            </Badge>
          </div>
          <div className="flex gap-4">
             <div className="relative group hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={16} />
                <input 
                  placeholder="Quick search..." 
                  className="pl-10 h-10 w-64 rounded-xl border-slate-200 bg-slate-50 text-sm outline-none focus:ring-2 ring-indigo-100 transition-all border shadow-sm" 
                />
             </div>
             <Button className="bg-[#4F46E5] hover:bg-indigo-700 rounded-xl font-bold gap-2 shadow-lg shadow-indigo-100 transition-all active:scale-95">
                <Plus size={18} /> Create Task
             </Button>
          </div>
        </header>

        {/* --- KANBAN BOARD --- */}
        <main className="p-8 h-[calc(100vh-64px)] overflow-x-auto animate-in fade-in duration-700">
          <div className="flex gap-6 h-full min-w-max pb-4">
            {columns.map((col) => (
              <div key={col.id} className="w-80 flex flex-col gap-4">
                {/* Column Header */}
                <div className="flex items-center justify-between px-3">
                   <div className="flex items-center gap-2.5">
                      <div className={`size-2.5 rounded-full ${col.color} shadow-sm`} />
                      <h2 className="text-xs font-black text-slate-500 tracking-widest">{col.title}</h2>
                      <span className="text-[10px] font-bold text-slate-400 bg-white px-2 py-0.5 rounded-full border border-slate-100">
                        {col.count}
                      </span>
                   </div>
                   <button className="p-1 hover:bg-slate-100 rounded-lg text-slate-300 hover:text-slate-600 transition-colors">
                      <MoreHorizontal size={18}/>
                   </button>
                </div>

                {/* Tasks List Container */}
                <div className="flex-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar bg-slate-100/30 p-2 rounded-[28px] min-h-[200px]">
                   {col.tasks.map((task) => (
                      <div 
                        key={task.id} 
                        className="bg-white p-5 rounded-[24px] shadow-sm border border-slate-200 hover:shadow-md hover:border-indigo-200 transition-all cursor-grab active:cursor-grabbing group relative overflow-hidden"
                      >
                         {/* Card Design Polish */}
                         <div className="flex justify-between items-start mb-3">
                            <Badge className={`text-[9px] font-black border-none px-2.5 py-0.5 rounded-lg ${
                               task.priority === 'High' ? 'bg-rose-50 text-rose-500' : 
                               task.priority === 'Medium' ? 'bg-indigo-50 text-indigo-500' : 'bg-slate-50 text-slate-400'
                            }`}>
                               {task.priority.toUpperCase()}
                            </Badge>
                            <button className="text-slate-200 group-hover:text-slate-400 transition-colors">
                               <MoreHorizontal size={16}/>
                            </button>
                         </div>
                         
                         <h3 className="font-bold text-slate-800 text-[15px] leading-snug mb-5 group-hover:text-indigo-600 transition-colors">
                            {task.title}
                         </h3>
                         
                         <div className="flex justify-between items-center pt-4 border-t border-slate-50">
                            <div className="flex -space-x-2">
                               {[1,2].map((i) => (
                                  <Avatar key={i} className="size-7 border-2 border-white shadow-sm ring-1 ring-slate-100">
                                     <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${task.id+i}`} />
                                     <AvatarFallback className="text-[8px] font-bold">U</AvatarFallback>
                                  </Avatar>
                               ))}
                               <div className="size-7 rounded-full bg-slate-50 border-2 border-white flex items-center justify-center text-[8px] font-black text-slate-400 ring-1 ring-slate-100">
                                  +2
                               </div>
                            </div>
                            
                            <div className="flex items-center gap-4 text-slate-300">
                               <div className="flex items-center gap-1.5 text-[10px] font-black group-hover:text-indigo-300 transition-colors">
                                  <MessageSquare size={12} /> {task.comments}
                               </div>
                               <div className="flex items-center gap-1.5 text-[10px] font-black group-hover:text-indigo-300 transition-colors">
                                  <Calendar size={12} /> {task.date}
                               </div>
                            </div>
                         </div>
                      </div>
                   ))}
                   
                   {/* Add card button placeholder */}
                   <button className="w-full py-4 rounded-[22px] border-2 border-dashed border-slate-200 text-slate-400 text-[11px] font-black uppercase tracking-widest hover:border-indigo-300 hover:text-indigo-500 hover:bg-white transition-all">
                      + Add New Card
                   </button>
                </div>
              </div>
            ))}
          </div>
        </main>
    </div>
  )
}
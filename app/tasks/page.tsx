"use client"

import { AppSidebar } from "@/components/dashboard/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Plus, MoreHorizontal, Search, Filter, Calendar, MessageSquare } from "lucide-react"

const columns = [
  { 
    id: "todo", title: "TO DO", count: 3, color: "bg-slate-400",
    tasks: [
      { id: 1, title: "Finalize Mid-term Schedule", priority: "High", comments: 5, date: "June 12" },
      { id: 2, title: "Review Teacher Payroll", priority: "Medium", comments: 2, date: "June 15" }
    ]
  },
  { 
    id: "in-progress", title: "IN PROGRESS", count: 2, color: "bg-indigo-500",
    tasks: [
      { id: 3, title: "Student Portal Redesign", priority: "High", comments: 12, date: "June 10" }
    ]
  },
  { 
    id: "review", title: "REVIEW", count: 4, color: "bg-amber-500",
    tasks: [
      { id: 4, title: "Library Book Audit", priority: "Low", comments: 0, date: "June 18" }
    ]
  },
  { 
    id: "done", title: "DONE", count: 12, color: "bg-emerald-500",
    tasks: [
      { id: 5, title: "Parent Teacher Meeting", priority: "Medium", comments: 8, date: "June 05" }
    ]
  }
]

export default function TasksPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-[#F8FAFC]">
        {/* --- HEADER --- */}
        <header className="h-16 flex items-center justify-between px-8 bg-white border-b sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-slate-800 tracking-tight">Task Kanban Board</h1>
            <Badge variant="outline" className="rounded-full bg-slate-50 text-slate-500 font-bold border-none">12 Tasks Active</Badge>
          </div>
          <div className="flex gap-3">
             <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={16} />
                <input placeholder="Search tasks..." className="pl-10 h-10 w-64 rounded-xl border-slate-100 bg-slate-50 text-sm outline-none focus:ring-2 ring-indigo-100 transition-all" />
             </div>
             <Button className="bg-[#4F46E5] hover:bg-indigo-700 rounded-xl font-bold gap-2 shadow-lg shadow-indigo-100">
                <Plus size={18} /> New Task
             </Button>
          </div>
        </header>

        {/* --- KANBAN BOARD --- */}
        <main className="p-8 h-[calc(100vh-64px)] overflow-x-auto">
          <div className="flex gap-6 h-full min-w-max">
            {columns.map((col) => (
              <div key={col.id} className="w-80 flex flex-col gap-4">
                {/* Column Header */}
                <div className="flex items-center justify-between px-2">
                   <div className="flex items-center gap-2">
                      <div className={`size-2 rounded-full ${col.color}`} />
                      <h2 className="text-[11px] font-black text-slate-400 tracking-widest">{col.title}</h2>
                      <span className="text-[11px] font-bold text-slate-300 bg-white px-1.5 py-0.5 rounded border border-slate-100">{col.count}</span>
                   </div>
                   <button className="text-slate-300 hover:text-slate-600 transition-colors"><MoreHorizontal size={18}/></button>
                </div>

                {/* Tasks List */}
                <div className="flex-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar">
                   {col.tasks.map((task) => (
                      <div key={task.id} className="bg-white p-5 rounded-[24px] shadow-sm border border-slate-100 hover:shadow-md hover:border-indigo-100 transition-all cursor-grab active:cursor-grabbing group">
                         <div className="flex justify-between items-start mb-3">
                            <Badge className={`text-[9px] font-black border-none px-2 ${
                               task.priority === 'High' ? 'bg-rose-50 text-rose-500' : 
                               task.priority === 'Medium' ? 'bg-indigo-50 text-indigo-500' : 'bg-slate-50 text-slate-400'
                            }`}>
                               {task.priority.toUpperCase()}
                            </Badge>
                            <button className="text-slate-200 group-hover:text-slate-400"><MoreHorizontal size={14}/></button>
                         </div>
                         
                         <h3 className="font-bold text-slate-800 text-sm leading-snug mb-4">{task.title}</h3>
                         
                         <div className="flex justify-between items-center pt-4 border-t border-slate-50">
                            <div className="flex -space-x-2">
                               {[1,2].map((i) => (
                                  <Avatar key={i} className="size-6 border-2 border-white">
                                     <AvatarImage src={`https://i.pravatar.cc/100?u=${task.id+i}`} />
                                     <AvatarFallback>U</AvatarFallback>
                                  </Avatar>
                               ))}
                            </div>
                            
                            <div className="flex items-center gap-3 text-slate-300">
                               <div className="flex items-center gap-1 text-[10px] font-bold">
                                  <MessageSquare size={12} /> {task.comments}
                               </div>
                               <div className="flex items-center gap-1 text-[10px] font-bold">
                                  <Calendar size={12} /> {task.date}
                               </div>
                            </div>
                         </div>
                      </div>
                   ))}
                   
                   {/* Add card button placeholder */}
                   <button className="w-full py-4 rounded-[20px] border-2 border-dashed border-slate-100 text-slate-300 text-xs font-bold hover:border-indigo-200 hover:text-indigo-400 hover:bg-indigo-50/30 transition-all">
                      + Add Task
                   </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
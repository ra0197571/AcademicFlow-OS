"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  Users, 
  GraduationCap, 
  History, 
  ListTodo, 
  Wallet,
  Lock,
  BookOpen,
  PenTool,
  CheckSquare,
  FileText,
  UserCircle
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"

const navigationData = {
  admin: {
    roleName: "Principal",
    navMain: [
      { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
      { title: "Activity Log", url: "/admin/activity", icon: History },
      { title: "Task Kanban", url: "/admin/tasks", icon: ListTodo },
    ],
    management: [
      { title: "Admission", url: "/admin/admission", icon: UserCircle },
      { title: "Students", url: "/admin/students", icon: GraduationCap },
      { title: "Teachers", url: "/admin/teachers", icon: Users },
      { title: "Fees & Payroll", url: "/admin/fees", icon: Wallet },
    ],
  },
  teacher: {
    roleName: "Teacher",
    navMain: [
      { title: "Dashboard", url: "/teacher", icon: LayoutDashboard },
      { title: "My Classes", url: "/teacher/classes", icon: BookOpen },
    ],
    management: [
      { title: "Marks Entry", url: "/teacher/marks-entry", icon: PenTool },
      { title: "Attendance", url: "/teacher/attendance", icon: CheckSquare },
      { title: "Reports", url: "/teacher/reports", icon: FileText },
    ],
  },
  student: {
    roleName: "Student",
    navMain: [
      { title: "My Dashboard", url: "/student", icon: LayoutDashboard },
      { title: "Timetable", url: "/student/timetable", icon: History },
    ],
    management: [
      { title: "Results", url: "/student/results", icon: GraduationCap },
      { title: "Fees", url: "/student/fees", icon: Wallet },
    ],
  }
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

  // --- SAHI LOGIC: Path ke shuruat se check karein ---
  let currentRole: 'admin' | 'teacher' | 'student' = 'admin'
  
  if (pathname.startsWith("/teacher")) {
    currentRole = 'teacher'
  } else if (pathname.startsWith("/student")) {
    currentRole = 'student'
  } else {
    currentRole = 'admin'
  }

  const activeMenu = navigationData[currentRole]

  return (
    <Sidebar collapsible="icon" {...props} className="border-r border-slate-200">
      <SidebarHeader className="h-20 flex items-center px-4 border-b bg-white gap-2">
        <div className="flex items-center gap-2 flex-1">
          <div className="size-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold shrink-0 shadow-lg shadow-indigo-100">
            AF
          </div>
          <span className="font-bold text-slate-900 group-data-[collapsible=icon]:hidden tracking-tight">
            AcademicFlow OS
          </span>
        </div>
        
        {currentRole === 'admin' && (
          <Button 
            variant="default" 
            className="bg-[#4F46E5] hover:bg-indigo-700 text-white text-[10px] h-8 px-3 rounded-lg group-data-[collapsible=icon]:hidden font-bold transition-all shadow-md flex items-center gap-1.5"
          >
            <Lock size={12} />
            Execute Payroll Lock
          </Button>
        )}
      </SidebarHeader>

      <SidebarContent className="bg-white">
        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] uppercase font-black text-slate-400 px-2 tracking-widest">
            Main Menu
          </SidebarGroupLabel>
          <SidebarMenu className="mt-2">
            {activeMenu.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <Link href={item.url} className="w-full">
                  <SidebarMenuButton 
                    tooltip={item.title} 
                    isActive={pathname === item.url}
                    className={`hover:bg-indigo-50 hover:text-indigo-600 transition-all py-6 rounded-xl ${pathname === item.url ? 'bg-indigo-50 text-indigo-600' : ''}`}
                  >
                    <item.icon className="size-4" />
                    <span className="font-bold text-sm">{item.title}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup className="mt-4">
          <SidebarGroupLabel className="text-[10px] uppercase font-black text-slate-400 px-2 tracking-widest">
            {currentRole === 'admin' ? 'Management' : 'Academic Tools'}
          </SidebarGroupLabel>
          <SidebarMenu className="mt-2">
            {activeMenu.management.map((item) => (
              <SidebarMenuItem key={item.title}>
                <Link href={item.url} className="w-full">
                  <SidebarMenuButton 
                    tooltip={item.title} 
                    isActive={pathname === item.url}
                    className={`hover:bg-indigo-50 hover:text-indigo-600 transition-all py-6 rounded-xl ${pathname === item.url ? 'bg-indigo-50 text-indigo-600' : ''}`}
                  >
                    <item.icon className="size-4" />
                    <span className="font-bold text-sm">{item.title}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <div className="p-4 border-t bg-white group-data-[collapsible=icon]:hidden">
        <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 cursor-pointer transition-all">
          <div className={`size-8 rounded-full flex items-center justify-center text-white font-bold text-xs uppercase ${
            currentRole === 'admin' ? 'bg-indigo-600' : 
            currentRole === 'teacher' ? 'bg-green-600' : 'bg-orange-600'
          }`}>
            {activeMenu.roleName.substring(0, 2)}
          </div>
          <div className="flex-1">
            <p className="text-xs font-bold text-slate-900">{activeMenu.roleName}</p>
            <p className="text-[10px] text-slate-400">Logged in</p>
          </div>
        </div>
      </div>
      
      <SidebarRail />
    </Sidebar>
  )
}
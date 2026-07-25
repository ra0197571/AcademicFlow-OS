"use client"

import * as React from "react"
import Link from "next/link"
import { 
  LayoutDashboard, 
  Users, 
  GraduationCap, 
  History, 
  ListTodo, 
  Wallet,
  Lock
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

const data = {
  navMain: [
    { title: "Dashboard", url: "/", icon: LayoutDashboard },
    { title: "Activity Log", url: "#", icon: History },
    { title: "Task Kanban", url: "#", icon: ListTodo },
  ],
  management: [
    { title: "Students", url: "#", icon: GraduationCap },
    { title: "Teachers", url: "#", icon: Users },
    { title: "Fees & Payroll", url: "#", icon: Wallet },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props} className="border-r border-slate-200">
      {/* Figma style Header with Execute Payroll Lock Button */}
      <SidebarHeader className="h-20 flex items-center px-4 border-b bg-white gap-2">
        <div className="flex items-center gap-2 flex-1">
          <div className="size-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold shrink-0 shadow-lg shadow-indigo-100">
            AF
          </div>
          <span className="font-bold text-slate-900 group-data-[collapsible=icon]:hidden tracking-tight">
            AcademicFlow OS
          </span>
        </div>
        
        {/* Figma Screenshot #5 Button */}
        <Button 
          variant="default" 
          className="bg-[#4F46E5] hover:bg-indigo-700 text-white text-[10px] h-8 px-3 rounded-lg group-data-[collapsible=icon]:hidden font-bold transition-all shadow-md flex items-center gap-1.5"
        >
          <Lock size={12} />
          Execute Payroll Lock
        </Button>
      </SidebarHeader>

      <SidebarContent className="bg-white">
        {/* Main Menu Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] uppercase font-black text-slate-400 px-2 tracking-widest">
            Main Menu
          </SidebarGroupLabel>
          <SidebarMenu className="mt-2">
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <Link href={item.url} className="w-full">
                  <SidebarMenuButton 
                    tooltip={item.title} 
                    className="hover:bg-indigo-50 hover:text-indigo-600 transition-all py-6 rounded-xl"
                  >
                    <item.icon className="size-4" />
                    <span className="font-bold text-sm">{item.title}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        {/* Management Section */}
        <SidebarGroup className="mt-4">
          <SidebarGroupLabel className="text-[10px] uppercase font-black text-slate-400 px-2 tracking-widest">
            Management
          </SidebarGroupLabel>
          <SidebarMenu className="mt-2">
            {data.management.map((item) => (
              <SidebarMenuItem key={item.title}>
                <Link href={item.url} className="w-full">
                  <SidebarMenuButton 
                    tooltip={item.title} 
                    className="hover:bg-indigo-50 hover:text-indigo-600 transition-all py-6 rounded-xl"
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

      {/* Settings Footer from Figma */}
      <div className="p-4 border-t bg-white group-data-[collapsible=icon]:hidden">
        <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 cursor-pointer transition-all">
          <div className="size-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-xs uppercase">
            PA
          </div>
          <div className="flex-1">
            <p className="text-xs font-bold text-slate-900">Principal</p>
            <p className="text-[10px] text-slate-400">Logged in</p>
          </div>
        </div>
      </div>
      
      <SidebarRail />
    </Sidebar>
  )
}
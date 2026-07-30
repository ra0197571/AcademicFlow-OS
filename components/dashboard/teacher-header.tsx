"use client"

import React from "react";
import { 
  Bell, Search, User, Settings, 
  LogOut, Activity, ShieldCheck, 
  Zap, Smartphone, Mail 
} from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export function TeacherHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-100 bg-white/80 px-4 backdrop-blur-md">
      
      {/* LEFT SECTION */}
      <div className="flex items-center gap-4">
        <SidebarTrigger className="-ml-1 text-slate-500 hover:text-indigo-600 transition-colors" />
        <div className="h-6 w-px bg-slate-200 hidden sm:block" />
        
        <div className="relative group hidden md:block">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors" />
          <input 
            placeholder="Search classes, nodes (⌘K)..."
            className="h-9 w-[300px] rounded-xl bg-slate-100/50 pl-10 pr-4 text-[11px] font-bold outline-none focus:ring-2 ring-indigo-50 transition-all border-none placeholder:text-slate-400 uppercase tracking-tighter"
          />
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center gap-3">
        
        {/* Status Indicator */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-purple-50 border border-purple-100/50">
           <div className="size-1.5 rounded-full bg-purple-500 animate-pulse shadow-[0_0_8px_rgba(168,85,247,0.5)]" />
           <span className="text-[10px] font-black text-purple-600 uppercase tracking-widest">Faculty_Active</span>
        </div>

        <Button variant="ghost" size="icon" className="relative text-slate-400 rounded-xl hover:bg-slate-50">
          <Bell size={18} />
          <span className="absolute right-2.5 top-2.5 size-2 rounded-full bg-rose-500 ring-2 ring-white" />
        </Button>

        {/* User Profile Dropdown - FIXED WITHOUT ASCHILD ERROR */}
        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none">
            <div className="relative h-10 flex items-center gap-3 px-2 rounded-xl hover:bg-slate-50 transition-all cursor-pointer border border-transparent hover:border-slate-100">
              <div className="text-right hidden sm:block leading-none">
                <p className="text-xs font-black text-slate-900 tracking-tight leading-none">Zia Khan</p>
                <p className="text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-widest">Faculty Admin</p>
              </div>
              <div className="relative">
                <Avatar className="size-8 border-2 border-white shadow-sm ring-1 ring-slate-100">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Zia" />
                  <AvatarFallback className="bg-purple-600 text-white font-black text-[10px]">ZK</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full bg-emerald-500 border-2 border-white shadow-sm" />
              </div>
            </div>
          </DropdownMenuTrigger>
          
          <DropdownMenuContent align="end" className="w-56 p-1.5 rounded-2xl shadow-2xl border-slate-100 bg-white z-[100]">
            <DropdownMenuLabel className="px-3 py-2">
                <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Protocol Node</span>
                    <Badge className="w-fit bg-purple-50 text-purple-600 border-none font-black text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-md">
                        Senior Faculty
                    </Badge>
                </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-slate-50" />
            <DropdownMenuGroup>
              <DropdownMenuItem className="rounded-xl text-[11px] font-bold px-3 py-2 cursor-pointer flex items-center hover:bg-slate-50 outline-none">
                <User className="mr-2 size-4 text-purple-500" /> Faculty Dossier
              </DropdownMenuItem>
              <DropdownMenuItem className="rounded-xl text-[11px] font-bold px-3 py-2 cursor-pointer flex items-center hover:bg-slate-50 outline-none">
                <Settings className="mr-2 size-4 text-slate-400" /> Account Config
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="bg-slate-50" />
            <DropdownMenuItem className="rounded-xl text-[11px] font-bold px-3 py-2 cursor-pointer text-rose-500 focus:bg-rose-50 flex items-center outline-none">
                <LogOut className="mr-2 size-4" /> Terminate Session
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
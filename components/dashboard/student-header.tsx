"use client"

import React from "react";
import { useRouter } from "next/navigation"; // navigation ke liye
import { 
  Bell, Search, User, Settings, LogOut, 
  Activity, ShieldCheck, Star, Fingerprint, ChevronRight
} from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export function StudentHeader() {
  const router = useRouter(); // Initialize router

  return (
    <header className="sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b border-slate-100 bg-white/80 px-4 backdrop-blur-md shrink-0">
      
      {/* LEFT SECTION */}
      <div className="flex items-center gap-4 text-left">
        <SidebarTrigger className="-ml-1 text-slate-500 hover:text-indigo-600 transition-colors" />
        <div className="h-6 w-px bg-slate-200 hidden sm:block" />
        
        <div className="relative group hidden md:block text-left">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors" />
          <input 
            placeholder="Search knowledge node (⌘K)..."
            className="h-9 w-[300px] rounded-xl bg-slate-100/50 pl-10 pr-4 text-[11px] font-bold outline-none focus:ring-2 ring-indigo-50 transition-all border-none placeholder:text-slate-400 uppercase tracking-tighter"
          />
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center gap-3">
        
        {/* Scholar Live Node Indicator */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-indigo-50 border border-indigo-100/50 text-left">
           <div className="size-1.5 rounded-full bg-indigo-500 animate-pulse shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
           <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Scholar_Node_Active</span>
        </div>

        <Button variant="ghost" size="icon" className="relative text-slate-400 rounded-xl hover:bg-slate-50 transition-all">
          <Bell size={18} />
          <span className="absolute right-2.5 top-2.5 size-2 rounded-full bg-rose-500 ring-2 ring-white" />
        </Button>

        {/* User Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none border-none ring-0 focus:ring-0">
            <div className="relative h-10 flex items-center gap-3 px-2 rounded-xl hover:bg-slate-50 transition-all cursor-pointer border border-transparent hover:border-slate-100 text-left">
              <div className="text-right hidden sm:block leading-none">
                <p className="text-xs font-black text-slate-900 leading-none uppercase tracking-tight">Ahmed Malik</p>
                <p className="text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-widest leading-none">Grade 9-Alpha</p>
              </div>
              <div className="relative shrink-0">
                <Avatar className="size-8 border-2 border-white shadow-sm ring-1 ring-slate-100">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed" />
                  <AvatarFallback className="bg-indigo-600 text-white font-black text-[10px]">AM</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full bg-emerald-500 border-2 border-white shadow-sm" />
              </div>
            </div>
          </DropdownMenuTrigger>
          
          <DropdownMenuContent align="end" className="w-56 p-1.5 rounded-2xl shadow-2xl border-slate-100 bg-white z-[100] animate-in fade-in zoom-in-95 duration-200">
            <DropdownMenuLabel className="px-3 py-2 text-[10px] font-black text-slate-400 uppercase tracking-widest text-left leading-none">
                Student Portal
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-slate-50" />
            
            <DropdownMenuGroup>
              {/* THE ULTIMATE FIX: Programmatic navigation using router.push */}
              <DropdownMenuItem 
                className="rounded-xl text-[11px] font-bold px-3 py-2 cursor-pointer flex items-center hover:bg-slate-50 outline-none"
                onClick={() => router.push("/student/profile")}
              >
                <Fingerprint className="mr-2 size-4 text-indigo-500" /> 
                Identity Dossier
              </DropdownMenuItem>

              <DropdownMenuItem className="rounded-xl text-[11px] font-bold px-3 py-2 cursor-pointer flex items-center hover:bg-slate-50 outline-none">
                <Star className="mr-2 size-4 text-amber-500" /> My Achievements
              </DropdownMenuItem>
              <DropdownMenuItem className="rounded-xl text-[11px] font-bold px-3 py-2 cursor-pointer flex items-center hover:bg-slate-50 outline-none">
                <Settings className="mr-2 size-4 text-slate-400" /> Node Settings
              </DropdownMenuItem>
            </DropdownMenuGroup>
            
            <DropdownMenuSeparator className="bg-slate-50" />
            
            <DropdownMenuItem className="rounded-xl text-[11px] font-bold px-3 py-2 cursor-pointer text-rose-500 focus:bg-rose-50 flex items-center outline-none">
                <LogOut className="mr-2 size-4" /> Terminate Node
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
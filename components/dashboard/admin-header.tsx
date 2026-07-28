"use client";

import React, { useState, useEffect } from "react";
import { 
  Bell, Search, Sparkles, User, Settings, LogOut, 
  ChevronDown, CheckCircle2, Command, HelpCircle, Activity
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

export function AdminHeader() {
  const [time, setTime] = useState<string>("");
  const [notificationsCount, setNotificationsCount] = useState<number>(3);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md shadow-xs transition-all">
      <div className="mx-auto flex h-16 w-full max-w-[1800px] items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Left Section: Sidebar Toggle */}
        <div className="flex items-center gap-3 md:gap-4">
          <SidebarTrigger className="h-9 w-9 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 transition-colors" />
        </div>


        {/* Middle Section: Global Search Bar */}
        <div className="hidden lg:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
            <input
              type="text"
              placeholder="Search students, faculty, records or command (⌘K)..."
              className="w-full h-9 pl-9 pr-12 rounded-xl bg-slate-100/70 border border-transparent text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
            />
            <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-0.5 rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-bold text-slate-400 shadow-xs">
              <Command size={10} /> K
            </div>
          </div>
        </div>

        {/* Right Section: System Pill, Quick Action, Notifications & User Avatar */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Status Pill */}
          <div className="hidden xl:flex items-center gap-2 rounded-full border border-emerald-200/60 bg-emerald-50/80 px-3 py-1 text-[11px] font-bold text-emerald-700">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500"></span>
            </span>
            <span>Online</span>
            {time && <span className="text-emerald-600/70 font-medium">• {time}</span>}
          </div>

          {/* Quick Action Button */}
          <Button className="hidden sm:flex h-9 items-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 text-xs font-bold text-white shadow-sm hover:bg-indigo-700 transition-all active:scale-95">
            <Sparkles size={14} className="text-indigo-200" />
            <span>Quick Action</span>
          </Button>

          {/* Notifications Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors focus:outline-none cursor-pointer">
              <Bell size={16} />
              {notificationsCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[9px] font-black text-white ring-2 ring-white">
                  {notificationsCount}
                </span>
              )}
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-80 rounded-2xl p-2 bg-white text-slate-900 shadow-2xl border border-slate-200/90 z-50">
              <DropdownMenuLabel className="flex items-center justify-between text-xs font-bold text-slate-900 px-2 py-1.5">
                <span>Notifications</span>
                <span className="text-[10px] text-indigo-600 font-semibold cursor-pointer hover:underline" onClick={() => setNotificationsCount(0)}>
                  Mark all read
                </span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="my-1 bg-slate-100" />
              <div className="space-y-1 py-1">
                <div className="flex gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
                  <div className="size-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">Fee Payroll Executed</p>
                    <p className="text-[10px] text-slate-500 leading-tight">Monthly staff disbursements processed successfully.</p>
                    <span className="text-[9px] text-slate-400 font-medium">10 mins ago</span>
                  </div>
                </div>
                <div className="flex gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
                  <div className="size-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Activity size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">New Admission Request</p>
                    <p className="text-[10px] text-slate-500 leading-tight">5 new student applications require approval.</p>
                    <span className="text-[9px] text-slate-400 font-medium">1 hour ago</span>
                  </div>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="h-6 w-px bg-slate-200" />

          {/* User Profile Avatar Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2.5 rounded-xl p-1 text-left transition-all hover:bg-slate-100/70 focus:outline-none group cursor-pointer border-none bg-transparent">
              <div className="relative">
                <Avatar className="size-9 border-2 border-indigo-600/30 shadow-sm transition-transform group-hover:scale-105">
                  <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" alt="Principal Admin" />
                  <AvatarFallback className="bg-slate-900 text-white font-black text-xs">PA</AvatarFallback>
                </Avatar>
                <span className="absolute bottom-0 right-0 size-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
              </div>

              <div className="hidden md:flex flex-col pr-1">
                <span className="text-xs font-bold text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors">
                  Dr. Aris Thorne
                </span>
                <span className="text-[10px] font-semibold text-slate-400 leading-tight">
                  Principal Admin
                </span>
              </div>

              <ChevronDown size={14} className="text-slate-400 hidden md:block group-hover:text-slate-600 transition-colors" />
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-60 rounded-2xl p-2 bg-white text-slate-900 shadow-2xl border border-slate-200/90 z-50">
              <div className="px-3 py-2.5 flex items-center gap-3 border-b border-slate-100 pb-3 mb-1 bg-slate-50/50 rounded-xl">
                <Avatar className="size-10 border border-indigo-100 shrink-0">
                  <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" />
                  <AvatarFallback className="bg-indigo-600 text-white font-bold text-xs">PA</AvatarFallback>
                </Avatar>
                <div className="overflow-hidden">
                  <p className="text-xs font-black text-slate-900 truncate">Dr. Aris Thorne</p>
                  <p className="text-[10px] font-semibold text-slate-400 truncate">principal@academicflow.edu</p>
                </div>
              </div>

              <DropdownMenuGroup className="space-y-0.5">
                <DropdownMenuItem className="rounded-xl text-xs font-semibold py-2 px-2.5 cursor-pointer hover:bg-slate-100 text-slate-700 hover:text-slate-900">
                  <User className="mr-2 size-4 text-indigo-600" />
                  <span>Profile Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-xl text-xs font-semibold py-2 px-2.5 cursor-pointer hover:bg-slate-100 text-slate-700 hover:text-slate-900">
                  <Settings className="mr-2 size-4 text-indigo-600" />
                  <span>System Preferences</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-xl text-xs font-semibold py-2 px-2.5 cursor-pointer hover:bg-slate-100 text-slate-700 hover:text-slate-900">
                  <HelpCircle className="mr-2 size-4 text-indigo-600" />
                  <span>Help & Documentation</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator className="my-1 bg-slate-100" />

              <DropdownMenuItem className="rounded-xl text-xs font-bold text-rose-600 py-2 px-2.5 cursor-pointer hover:bg-rose-50 hover:text-rose-700">
                <LogOut className="mr-2 size-4 text-rose-500" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

        </div>
      </div>
    </header>
  );
}

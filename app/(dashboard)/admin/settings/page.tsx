"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Settings, Globe, Bell, Palette, Save, Camera, Building2, LockKeyhole,
  Fingerprint, Zap, Monitor, Mail, Smartphone, ShieldCheck, Languages, 
  Sun, Moon, Layout, Check, Download, Activity, Database, Timer, RefreshCcw,
  Users, ChevronRight, MessageSquare, Radio, Cloud
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type SettingsNode = 'profile' | 'localization' | 'communication' | 'visual' | 'security';

export default function MasterSettingsNode() {
  const [activeTab, setActiveTab] = useState<SettingsNode>('profile');
  const [mounted, setMounted] = useState(false);
  const [accentColor, setAccentColor] = useState('indigo');

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <div className="flex flex-col h-full bg-[#FDFDFD] overflow-hidden animate-in fade-in duration-500 font-sans">
      
      {/* 1. TOP HEADER */}
      <header className="shrink-0 h-[64px] border-b border-slate-100 bg-white flex items-center justify-between px-6 z-20">
        <div className="flex flex-col">
            <div className="flex items-center gap-2 text-[10px] font-bold text-indigo-600 uppercase tracking-widest leading-none">
                SYSTEM ARCHITECTURE <span className="text-slate-300">•</span> <span className="text-slate-400">ROOT_ACCESS</span>
            </div>
            <h1 className="text-lg font-black text-slate-900 tracking-tight mt-1 uppercase italic leading-none">
                Master <span className="text-indigo-600 font-bold not-italic">Configuration</span>
            </h1>
        </div>

        <div className="flex items-center gap-2">
           <Button variant="outline" className="h-8 text-[9px] font-bold uppercase tracking-wider border-slate-200 bg-white">Discard</Button>
           <Button className="h-8 bg-indigo-600 hover:bg-indigo-700 text-white text-[9px] font-bold uppercase tracking-wider shadow-md active:scale-95 transition-all px-5 rounded-lg flex gap-2 border-none">
                <Save size={12} strokeWidth={3} /> Deploy Changes
            </Button>
        </div>
      </header>

      {/* 2. MAIN SCROLLABLE AREA */}
      <main className="flex-1 overflow-y-auto p-4 lg:p-6 scrollbar-hide space-y-6 bg-slate-50/20">
        
        {/* KPI ROW */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 max-w-[1600px] mx-auto">
           <DashStat label="Config Integrity" value="98%" trend="SECURE" color="indigo" icon={<ShieldCheck size={12}/>}/>
           <DashStat label="Sync Status" value="Live" trend="ACTIVE" color="emerald" icon={<RefreshCcw size={12}/>}/>
           <DashStat label="Storage Node" value="1.2TB" trend="OK" color="blue" icon={<Database size={12}/>}/>
           <DashStat label="User Load" value="1,840" trend="+12" color="purple" icon={<Users size={12}/>}/>
           <DashStat label="System Uptime" value="14d" trend="99.9%" color="orange" icon={<Timer size={12}/>}/>
           <DashStat label="Version" value="v1.2" trend="LATEST" color="rose" icon={<Activity size={12}/>}/>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
           
           {/* LEFT NAVIGATION RAILS */}
           <div className="lg:col-span-3 space-y-2">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2 mb-3">Control Nodes</p>
              <SettingsNav active={activeTab === 'profile'} label="Academy Profile" onClick={() => setActiveTab('profile')} icon={<Building2 size={14}/>} />
              <SettingsNav active={activeTab === 'localization'} label="Localization" onClick={() => setActiveTab('localization')} icon={<Globe size={14}/>} />
              <SettingsNav active={activeTab === 'communication'} label="Communication" onClick={() => setActiveTab('communication')} icon={<Bell size={14}/>} />
              <SettingsNav active={activeTab === 'visual'} label="Visual Identity" onClick={() => setActiveTab('visual')} icon={<Palette size={14}/>} />
              <SettingsNav active={activeTab === 'security'} label="Security Core" onClick={() => setActiveTab('security')} icon={<LockKeyhole size={14}/>} />
           </div>

           {/* RIGHT CONTENT CANVAS */}
           <div className="lg:col-span-9 pb-20">
              <AnimatePresence mode="wait">
                 
                 {activeTab === 'profile' && (
                    <motion.div key="profile" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                       <Card className="border-none bg-white rounded-3xl shadow-sm ring-1 ring-slate-200/60 overflow-hidden p-8 space-y-10">
                          <div className="flex items-center gap-6 p-6 rounded-2xl bg-slate-50 border border-slate-100 border-dashed">
                             <div className="size-16 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center text-slate-300 relative overflow-hidden group hover:border-indigo-400 transition-all cursor-pointer">
                                <Building2 size={24} />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white"><Camera size={16}/></div>
                             </div>
                             <div>
                                <h4 className="text-sm font-black text-slate-800 uppercase tracking-tight">Institution Logo Node</h4>
                                <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase">SVG or Transparent PNG (Max 512px)</p>
                             </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <CompactField label="Academy Full Name" defaultValue="AcademicFlow International Node" />
                             <CompactField label="Node Registration ID" defaultValue="AF-SYS-MASTER-2026" />
                             <CompactField label="Registrar Email" defaultValue="admin@node.os" />
                             <CompactField label="Contact Phone Node" defaultValue="+92 51 000 000" />
                          </div>
                       </Card>
                    </motion.div>
                 )}

                 {activeTab === 'localization' && (
                    <motion.div key="localization" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                       <Card className="border-none bg-white rounded-3xl shadow-sm ring-1 ring-slate-200/60 p-8 space-y-8">
                          <div className="flex items-center gap-4 mb-2">
                             <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-600"><Globe size={20}/></div>
                             <div><h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">Localization Architecture</h3><p className="text-[10px] font-bold text-slate-400 uppercase">Manage global system regions and languages</p></div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t pt-8 border-slate-50">
                             <CompactSelect label="Primary System Language" options={["English (US)", "Urdu (Official)", "Arabic"]} />
                             <CompactSelect label="System Timezone Node" options={["(GMT+05:00) Islamabad", "(GMT+00:00) UTC"]} />
                             <CompactSelect label="Base Fiscal Currency" options={["PKR (Rs.)", "USD ($)", "EUR (€)"]} />
                             <CompactSelect label="Date Format Registry" options={["DD/MM/YYYY", "MM/DD/YYYY"]} />
                          </div>
                       </Card>
                    </motion.div>
                 )}

                 {activeTab === 'communication' && (
                    <motion.div key="communication" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                       <div className="space-y-6">
                          <Card className="border-none bg-white rounded-3xl shadow-sm ring-1 ring-slate-200/60 p-8">
                             <h4 className="text-xs font-black uppercase tracking-widest text-slate-800 mb-6">Service Gateways</h4>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <CommNode icon={<Mail size={16}/>} label="Email SMTP Node" active={true} />
                                <CommNode icon={<Smartphone size={16}/>} label="SMS Protocol Node" active={false} />
                             </div>
                          </Card>
                          <Card className="border-none bg-white rounded-3xl shadow-sm ring-1 ring-slate-200/60 p-8">
                             <h4 className="text-xs font-black uppercase tracking-widest text-slate-800 mb-6">Automated Broadcasts</h4>
                             <div className="space-y-3 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                <ToggleRow label="Parental Attendance Alerts" enabled />
                                <ToggleRow label="Staff Payroll Notification" enabled />
                                <ToggleRow label="System Performance Reports" />
                             </div>
                          </Card>
                       </div>
                    </motion.div>
                 )}

                 {activeTab === 'visual' && (
                    <motion.div key="visual" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
                       <Card className="p-8 rounded-3xl bg-white border-none shadow-sm ring-1 ring-slate-200/60">
                          <h4 className="text-xs font-black uppercase tracking-widest text-slate-800 mb-6">Interface Appearance</h4>
                          <div className="grid grid-cols-3 gap-4">
                             <ThemeBox active icon={<Sun size={16}/>} label="Light" />
                             <ThemeBox icon={<Moon size={16}/>} label="Dark" />
                             <ThemeBox icon={<Layout size={16}/>} label="System" />
                          </div>
                       </Card>
                       <Card className="p-8 rounded-3xl bg-white border-none shadow-sm ring-1 ring-slate-200/60">
                          <h4 className="text-xs font-black uppercase tracking-widest text-slate-800 mb-6">Brand Accent Colors</h4>
                          <div className="flex flex-wrap gap-3">
                             {['indigo', 'emerald', 'blue', 'purple', 'rose', 'amber'].map(color => (
                                <button key={color} onClick={() => setAccentColor(color)} className={cn("size-10 rounded-xl transition-all", accentColor === color ? "ring-4 ring-offset-4 ring-slate-100 scale-110" : "opacity-40") } style={{ backgroundColor: color === 'indigo' ? '#6366f1' : color === 'emerald' ? '#10b981' : color === 'blue' ? '#3b82f6' : color === 'purple' ? '#a855f7' : color === 'rose' ? '#f43f5e' : '#f59e0b' }}>
                                   {accentColor === color && <Check className="text-white mx-auto" size={16} strokeWidth={4} />}
                                </button>
                             ))}
                          </div>
                       </Card>
                    </motion.div>
                 )}

                 {activeTab === 'security' && (
                    <motion.div key="security" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                        <Card className="border-none bg-[#0F172A] rounded-3xl shadow-xl p-10 text-white relative overflow-hidden">
                           <div className="absolute top-0 right-0 size-40 bg-indigo-500/10 blur-3xl" />
                           <div className="flex items-center gap-4 mb-8">
                                <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-indigo-400"><LockKeyhole size={24}/></div>
                                <div><h3 className="text-lg font-black uppercase tracking-widest">Security Protocol</h3><p className="text-[10px] font-bold text-slate-500 uppercase">Manage root access governance</p></div>
                           </div>
                           <div className="space-y-6">
                                <div className="flex items-center justify-between p-5 bg-white/5 rounded-2xl border border-white/5">
                                    <div><p className="text-sm font-bold">2-Factor Authentication (2FA)</p><p className="text-[9px] text-slate-500 uppercase mt-1">Multi-layered security node active</p></div>
                                    <Badge className="bg-indigo-600 text-white border-none text-[8px] font-black px-4 py-1">ENFORCED</Badge>
                                </div>
                                <div className="grid grid-cols-2 gap-6"><CompactField label="Session Timeout (Min)" defaultValue="30" dark /><CompactField label="System Auth Token" defaultValue="********" dark type="password" /></div>
                           </div>
                        </Card>
                    </motion.div>
                 )}
              </AnimatePresence>
           </div>
        </div>
      </main>
    </div>
  );
}

// --- HELPER COMPONENTS (Elite Style) ---

function DashStat({ label, value, trend, color, icon }: any) {
    const colors: any = { indigo: "bg-indigo-50 text-indigo-600", emerald: "bg-emerald-50 text-emerald-600", blue: "bg-blue-50 text-blue-600", purple: "bg-purple-50 text-purple-600", orange: "bg-orange-50 text-orange-600", rose: "bg-rose-50 text-rose-600" }
    return (
        <Card className="p-3.5 rounded-xl bg-white border-none shadow-sm ring-1 ring-slate-100 flex flex-col justify-between hover:shadow-md transition-all h-[95px]">
            <div className="flex justify-between items-start w-full">
                <div className={cn("p-1.5 rounded-lg", colors[color])}>{icon}</div>
                <span className={cn("text-[7px] font-black px-1.5 py-0.5 rounded uppercase tracking-tighter", colors[color])}>{trend}</span>
            </div>
            <div className="mt-1"><p className="text-base font-black text-slate-900 tracking-tight leading-none">{value}</p><p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1.5 leading-none">{label}</p></div>
        </Card>
    )
}

function SettingsNav({ active, label, icon, onClick }: any) {
    return (
        <button onClick={onClick} className={cn("w-full flex items-center gap-3 p-3 rounded-xl transition-all border text-left", active ? "bg-white border-indigo-200 shadow-md ring-1 ring-indigo-50" : "bg-transparent border-transparent text-slate-400 hover:bg-white hover:border-slate-100")}>
            <div className={cn("size-7 rounded-lg flex items-center justify-center transition-all", active ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100" : "bg-slate-100 text-slate-400")}>{icon}</div>
            <span className={cn("text-[11px] font-black uppercase tracking-tight", active ? "text-slate-900" : "text-slate-500")}>{label}</span>
            {active && <div className="ml-auto size-1.5 rounded-full bg-indigo-600 animate-pulse" />}
        </button>
    )
}

function CompactField({ label, defaultValue, dark = false, type = "text" }: any) {
    return (
        <div className="space-y-1.5 text-left">
            <label className={cn("text-[8px] font-black uppercase tracking-widest ml-1", dark ? "text-slate-500" : "text-slate-400")}>{label}</label>
            <input type={type} defaultValue={defaultValue} className={cn("w-full h-9 px-4 rounded-xl text-[11px] font-bold outline-none transition-all border", dark ? "bg-white/5 border-white/10 text-white focus:ring-2 focus:ring-indigo-500/50" : "bg-slate-50 border-slate-100 text-slate-900 focus:bg-white focus:ring-2 ring-indigo-50")} />
        </div>
    )
}

function CompactSelect({ label, options }: any) {
    return (
        <div className="space-y-1.5 text-left">
            <label className="text-[8px] font-black uppercase tracking-widest ml-1 text-slate-400">{label}</label>
            <select className="w-full h-9 px-3 rounded-xl text-[11px] font-bold bg-slate-50 border border-slate-100 focus:bg-white outline-none transition-all">
                {options.map((o: any) => <option key={o}>{o}</option>)}
            </select>
        </div>
    )
}

function CommNode({ icon, label, active }: any) {
    return (
        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-indigo-200 transition-all">
            <div className="flex items-center gap-3">
                <div className={cn("p-2 rounded-xl transition-all shadow-sm", active ? "bg-indigo-600 text-white" : "bg-white text-slate-300")}>{icon}</div>
                <span className="text-[10px] font-black text-slate-700 uppercase tracking-tight">{label}</span>
            </div>
            <div className={cn("size-2 rounded-full", active ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse" : "bg-slate-300")} />
        </div>
    )
}

function ToggleRow({ label, enabled = false }: any) {
    return (
        <div className="flex items-center justify-between py-2 border-b border-slate-100 last:border-none">
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-tight">{label}</span>
            <div className={cn("w-7 h-4 rounded-full transition-all relative", enabled ? "bg-indigo-600" : "bg-slate-200")}>
                <div className={cn("absolute top-0.5 size-3 bg-white rounded-full transition-all", enabled ? "left-3.5" : "left-0.5")} />
            </div>
        </div>
    )
}

function ThemeBox({ active = false, icon, label }: any) {
    return (
        <div className={cn("p-5 rounded-2xl border flex flex-col items-center justify-center gap-3 transition-all cursor-pointer", active ? "bg-indigo-50 border-indigo-200" : "bg-slate-50 border-slate-100 opacity-40 hover:opacity-100 grayscale hover:grayscale-0")}>
            <div className={cn("size-10 rounded-xl flex items-center justify-center shadow-sm", active ? "bg-indigo-600 text-white shadow-indigo-100" : "bg-white text-slate-400")}>{icon}</div>
            <p className={cn("text-[9px] font-black uppercase tracking-widest", active ? "text-indigo-600" : "text-slate-400")}>{label}</p>
        </div>
    )
}
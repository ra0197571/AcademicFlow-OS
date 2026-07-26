"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Settings, Globe, Bell, Palette, Save, 
  Camera, ChevronRight, Building2, LockKeyhole,
  Fingerprint, Zap, Monitor, Mail, Smartphone,
  ShieldCheck, Languages, Sun, Moon, Layout, Check
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// --- TYPES ---
type SettingsNode = 'profile' | 'localization' | 'communication' | 'visual' | 'security';

export default function MasterSettingsNode() {
  const [activeTab, setActiveTab] = useState<SettingsNode>('profile');
  const [mounted, setMounted] = useState(false);
  const [accentColor, setAccentColor] = useState('indigo');

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <div className="p-4 lg:p-8 space-y-8 animate-in fade-in duration-700 max-w-[1600px] mx-auto overflow-hidden selection:bg-indigo-100">
      
      {/* 1. ELITE HEADER */}
      <header className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 bg-white p-6 rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/40 relative overflow-hidden">
        <div className="flex items-center gap-5 relative z-10">
           <div className="size-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg ring-4 ring-indigo-50">
              <Settings size={24} strokeWidth={2.5} />
           </div>
           <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight leading-none uppercase italic">System <span className="text-indigo-600">Configuration</span></h1>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2 flex items-center gap-1.5">
                 <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" /> Global Node: AF-ADMIN-PRO-v1.2
              </div>
           </div>
        </div>

        <div className="flex items-center gap-3 relative z-10">
           <Button variant="ghost" className="h-10 rounded-xl text-[10px] font-black uppercase text-slate-400 hover:text-rose-500 transition-colors">Discard</Button>
           <Button className="bg-slate-900 hover:bg-indigo-600 text-white shadow-2xl h-11 px-8 rounded-2xl font-black uppercase text-[10px] gap-2 tracking-[0.2em] transition-all active:scale-95 border-none">
              <Save size={16} /> Deploy Changes
           </Button>
        </div>
      </header>

      {/* 2. SETTINGS WORKSPACE GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* LEFT NAVIGATION RAILS */}
        <aside className="lg:col-span-3 space-y-3">
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 mb-4">Control Nodes</p>
           <NavTab id="profile" icon={<Building2 size={16}/>} label="Academy Profile" active={activeTab === 'profile'} onClick={setActiveTab} />
           <NavTab id="localization" icon={<Globe size={16}/>} label="Localization" active={activeTab === 'localization'} onClick={setActiveTab} />
           <NavTab id="communication" icon={<Bell size={16}/>} label="Communication" active={activeTab === 'communication'} onClick={setActiveTab} />
           <NavTab id="visual" icon={<Palette size={16}/>} label="Visual Identity" active={activeTab === 'visual'} onClick={setActiveTab} />
           <NavTab id="security" icon={<LockKeyhole size={16}/>} label="Security Core" active={activeTab === 'security'} onClick={setActiveTab} />
           
           <div className="mt-10 p-6 bg-slate-900 rounded-[32px] text-white relative overflow-hidden group shadow-2xl">
              <div className="absolute top-0 right-0 size-20 bg-indigo-500/10 blur-2xl rounded-full" />
              <div className="flex items-center gap-3 mb-4 text-indigo-400">
                 <Fingerprint size={20} />
                 <p className="text-[10px] font-black uppercase tracking-widest">Master Auth</p>
              </div>
              <p className="text-[11px] font-medium text-slate-400 leading-relaxed italic">"Settings modifications are logged in the global audit trail for compliance."</p>
           </div>
        </aside>

        {/* RIGHT CONTENT CANVAS */}
        <main className="lg:col-span-9 space-y-8 pb-32">
           <AnimatePresence mode="wait">
              
              {activeTab === 'profile' && (
                 <motion.div key="profile" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <Card className="border-none shadow-2xl shadow-slate-200/50 rounded-[44px] bg-white overflow-hidden">
                       <CardHeader className="p-10 border-b border-slate-50 bg-slate-50/20"><CardTitle className="text-[14px] font-black uppercase tracking-widest text-slate-900">Institution Identity</CardTitle></CardHeader>
                       <CardContent className="p-10 space-y-10">
                          <div className="flex items-center gap-10 p-8 bg-slate-50/50 rounded-[32px] border border-dashed border-slate-200 group transition-all cursor-pointer">
                             <div className="size-24 rounded-full bg-white flex items-center justify-center text-slate-200 shadow-xl border-4 border-white relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
                                <Building2 size={40} /><div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white"><Camera size={24}/></div>
                             </div>
                             <div className="flex-1">
                                <h4 className="text-sm font-black text-slate-900 tracking-tight">Institution Logo Node</h4>
                                <p className="text-[11px] font-bold text-slate-400 uppercase mt-2">Recommended: 512x512 PNG/SVG (Max 2MB)</p>
                             </div>
                             <Button variant="outline" className="rounded-xl h-10 px-8 text-[10px] font-black uppercase border-slate-200">Replace Assets</Button>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                             <SmartField label="Academy Name" defaultValue="AcademicFlow International Node" />
                             <SmartField label="Node Registration ID" defaultValue="AF-SYS-MASTER-2026" />
                             <SmartField label="Registrar Email" defaultValue="admin@node.os" type="email" />
                             <SmartField label="Contact Node" defaultValue="+92 51 000 000" />
                          </div>
                       </CardContent>
                    </Card>
                 </motion.div>
              )}

              {activeTab === 'visual' && (
                 <motion.div key="visual" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <div className="space-y-8">
                       {/* Theme Engine */}
                       <Card className="border-none shadow-2xl shadow-slate-200/50 rounded-[44px] bg-white p-10">
                          <div className="flex items-center gap-4 mb-10">
                             <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-600"><Monitor size={24}/></div>
                             <div>
                                <h4 className="text-[14px] font-black uppercase tracking-widest text-slate-900">Theme Engine Node</h4>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Interface Appearance Mode</p>
                             </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                             <VisualThemeOption icon={<Sun size={20}/>} label="Light Protocol" active={true} />
                             <VisualThemeOption icon={<Moon size={20}/>} label="Dark Protocol" active={false} />
                             <VisualThemeOption icon={<Layout size={20}/>} label="System Sync" active={false} />
                          </div>
                       </Card>

                       {/* Brand Accent */}
                       <Card className="border-none shadow-2xl shadow-slate-200/50 rounded-[44px] bg-white p-10">
                          <div className="flex items-center gap-4 mb-10">
                             <div className="p-3 bg-rose-50 rounded-2xl text-rose-600"><Palette size={24}/></div>
                             <div>
                                <h4 className="text-[14px] font-black uppercase tracking-widest text-slate-900">Brand Accent Protocol</h4>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Primary Color Archetype</p>
                             </div>
                          </div>
                          <div className="flex flex-wrap gap-4">
                             {['indigo', 'emerald', 'violet', 'rose', 'amber'].map(color => (
                                <button 
                                   key={color} 
                                   onClick={() => setAccentColor(color)}
                                   className={`size-14 rounded-[20px] flex items-center justify-center transition-all duration-300 ${accentColor === color ? 'ring-4 ring-offset-4 ring-slate-100 scale-110 shadow-2xl shadow-slate-300' : 'opacity-40 hover:opacity-100'}`} 
                                   style={{ backgroundColor: color === 'indigo' ? '#6366f1' : color === 'emerald' ? '#10b981' : color === 'violet' ? '#8b5cf6' : color === 'rose' ? '#f43f5e' : '#f59e0b' }}
                                >
                                   {accentColor === color && <Check className="text-white" size={24} strokeWidth={3} />}
                                </button>
                             ))}
                          </div>
                       </Card>

                       {/* Interface Density */}
                       <Card className="border-none shadow-2xl shadow-slate-200/50 rounded-[44px] bg-white p-10">
                          <div className="flex justify-between items-center">
                             <div className="flex items-center gap-4">
                                <div className="p-3 bg-slate-50 rounded-2xl text-slate-600"><Layout size={24}/></div>
                                <div>
                                   <h4 className="text-[14px] font-black uppercase tracking-widest text-slate-900">Interface Density Node</h4>
                                   <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Scale global UI component spacing</p>
                                </div>
                             </div>
                             <div className="flex gap-2 p-1.5 bg-slate-50 rounded-[22px] border border-slate-100">
                                <button className="px-6 py-3 rounded-2xl text-[10px] font-black uppercase bg-white shadow-sm text-indigo-600">Compact</button>
                                <button className="px-6 py-3 rounded-2xl text-[10px] font-black uppercase text-slate-400 hover:text-slate-600">Relaxed</button>
                             </div>
                          </div>
                       </Card>
                    </div>
                 </motion.div>
              )}

              {activeTab === 'localization' && (
                 <motion.div key="localization" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                    <Card className="border-none shadow-2xl shadow-slate-200/50 rounded-[44px] bg-white p-10 space-y-10">
                       <div className="flex items-center gap-4 mb-2">
                          <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-600"><Languages size={24} /></div>
                          <div><h4 className="text-[14px] font-black uppercase text-slate-900 tracking-widest">Localization Node</h4><p className="text-[10px] text-slate-400 font-bold uppercase">Timezone and language architecture</p></div>
                       </div>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <SmartField label="Primary System Language" type="select" options={["English (International)", "Urdu (Official)", "Arabic"]} />
                          <SmartField label="Operational Timezone Node" type="select" options={["(GMT+05:00) Islamabad", "(GMT+04:00) Dubai", "(GMT+00:00) UTC"]} />
                          <SmartField label="System Base Currency" type="select" options={["PKR (Rs.)", "USD ($)", "EUR (€)"]} />
                       </div>
                    </Card>
                 </motion.div>
              )}

              {activeTab === 'communication' && (
                 <motion.div key="communication" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                    <Card className="border-none shadow-2xl shadow-slate-200/50 rounded-[44px] bg-white p-10 space-y-8">
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <CommNode icon={<Mail size={20}/>} label="Email Gateway Node" active={true} />
                          <CommNode icon={<Smartphone size={20}/>} label="SMS Protocol Node" active={false} />
                       </div>
                       <div className="p-8 bg-indigo-50/50 rounded-[32px] border border-indigo-100 space-y-4">
                          <h4 className="text-[10px] font-black uppercase tracking-widest text-indigo-600">Global Notification Broadcasts</h4>
                          <ToggleRow label="Parental Attendance Alerts" enabled={true} />
                          <ToggleRow label="Staff Payroll Ledger Updates" enabled={true} />
                       </div>
                    </Card>
                 </motion.div>
              )}

              {activeTab === 'security' && (
                 <motion.div key="security" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                    <Card className="border-none shadow-2xl shadow-slate-200/50 rounded-[44px] bg-white overflow-hidden">
                       <CardHeader className="p-10 border-b bg-slate-900 text-white flex flex-row items-center gap-6">
                          <div className="p-3 bg-white/10 rounded-2xl text-indigo-400 border border-white/5"><LockKeyhole size={24}/></div>
                          <div><CardTitle className="text-[14px] font-black uppercase tracking-widest">Security Protocol Node</CardTitle><CardDescription className="text-slate-400 font-bold text-[10px] uppercase">Master access governance</CardDescription></div>
                       </CardHeader>
                       <CardContent className="p-10 space-y-10">
                          <div className="flex items-center justify-between p-8 bg-slate-50 rounded-[32px] border">
                             <div><p className="text-sm font-black text-slate-800">Two-Factor Authentication (2FA)</p><p className="text-[10px] text-slate-400 font-bold uppercase mt-1">Multi-layered security enforcement</p></div>
                             <Badge className="bg-indigo-600 text-white border-none font-black text-[10px] px-6 h-9 rounded-2xl flex items-center">ACTIVE</Badge>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                             <SmartField label="Root Session Timeout (Min)" defaultValue="30" />
                             <SmartField label="Master Password Node" type="password" defaultValue="********" />
                          </div>
                       </CardContent>
                    </Card>
                 </motion.div>
              )}

           </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

// --- WORLD CLASS REUSABLE COMPONENTS ---

function NavTab({ id, icon, label, active, onClick }: { id: SettingsNode; icon: React.ReactNode; label: string; active: boolean; onClick: (id: SettingsNode) => void }) {
  return (
    <button 
      onClick={() => onClick(id)}
      className={`w-full flex items-center justify-between p-5 rounded-[22px] transition-all duration-500 group relative ${
         active ? 'bg-indigo-600 text-white shadow-2xl shadow-indigo-200 ring-1 ring-indigo-400' : 'text-slate-400 hover:bg-white hover:shadow-sm'
      }`}
    >
       <div className="flex items-center gap-4">
          <div className={`size-8 rounded-xl flex items-center justify-center transition-all duration-500 ${active ? 'bg-white/20 scale-110 shadow-lg' : 'bg-slate-100 group-hover:bg-indigo-50 group-hover:text-indigo-600 group-hover:rotate-6'}`}>
             {icon}
          </div>
          <span className={`text-[11px] font-black uppercase tracking-widest transition-colors ${active ? 'text-white' : 'text-slate-500 group-hover:text-slate-900'}`}>{label}</span>
       </div>
       {active && <motion.div layoutId="activeInd" className="size-1.5 rounded-full bg-white opacity-80" />}
    </button>
  );
}

function VisualThemeOption({ icon, label, active }: { icon: React.ReactNode; label: string; active: boolean }) {
  return (
    <div className={`p-8 rounded-[32px] border-2 transition-all cursor-pointer text-center group ${active ? 'border-indigo-600 bg-indigo-50/20' : 'border-slate-100 hover:border-slate-200'}`}>
       <div className={`size-14 mx-auto rounded-[20px] flex items-center justify-center mb-5 transition-all duration-500 ${active ? 'bg-indigo-600 text-white shadow-2xl shadow-indigo-200' : 'bg-slate-50 text-slate-400 group-hover:scale-110'}`}>{icon}</div>
       <p className={`text-[10px] font-black uppercase tracking-widest ${active ? 'text-indigo-600' : 'text-slate-400'}`}>{label}</p>
    </div>
  )
}

function CommNode({ icon, label, active }: { icon: React.ReactNode; label: string; active: boolean }) {
  return (
    <div className="p-6 bg-slate-50 rounded-[32px] border border-slate-100 flex items-center justify-between group hover:border-indigo-200 transition-all">
       <div className="flex gap-5 items-center">
          <div className="p-3 bg-white rounded-2xl text-slate-400 shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-all">{icon}</div>
          <p className="text-xs font-black uppercase tracking-widest text-slate-800">{label}</p>
       </div>
       <div className={`size-2.5 rounded-full ${active ? 'bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]' : 'bg-slate-300'}`} />
    </div>
  )
}

function SmartField({ label, defaultValue, type = "text", options }: { label: string; defaultValue?: string; type?: string; options?: string[] }) {
  return (
    <div className="space-y-3 group">
       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2 leading-none">{label}</label>
       {type === "select" ? (
         <div className="relative">
            <select className="w-full h-14 pl-6 pr-12 bg-slate-50/50 border border-slate-200/60 rounded-[22px] text-xs font-black text-slate-800 outline-none transition-all appearance-none cursor-pointer group-hover:bg-white focus:ring-4 ring-indigo-50/50">
               {options?.map(opt => <option key={opt}>{opt}</option>)}
            </select>
            <ChevronRight size={14} className="absolute right-5 top-1/2 -translate-y-1/2 rotate-90 text-slate-300 pointer-events-none" />
         </div>
       ) : (
         <input type={type} defaultValue={defaultValue} className="w-full h-14 pl-6 bg-slate-50/50 border border-slate-200/60 rounded-[22px] text-xs font-black text-slate-800 outline-none transition-all group-hover:bg-white focus:ring-4 ring-indigo-50/50" />
       )}
    </div>
  )
}

function ToggleRow({ label, enabled }: { label: string; enabled: boolean }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-indigo-100/20 last:border-none">
       <span className="text-[11px] font-bold text-indigo-900/60 uppercase tracking-tighter">{label}</span>
       <div className={`w-10 h-5 rounded-full p-1 transition-all ${enabled ? 'bg-indigo-600' : 'bg-slate-300'}`}>
          <div className={`size-3 bg-white rounded-full transition-transform ${enabled ? 'translate-x-5' : 'translate-x-0'}`} />
       </div>
    </div>
  )
}
"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UserPlus, User, Phone, Mail, MapPin, Calendar, ChevronRight, 
  UploadCloud, FileText, CheckCircle2, GraduationCap, AlertCircle, Save, Sparkles, Hash,
  Database, ArrowRight, ShieldCheck, Clock, School, HeartPulse, Loader2
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { cn } from "@/lib/utils";

const STEPS = [
  { id: 'identity', label: 'Identity Node', sub: 'Legal Data' },
  { id: 'academic', label: 'Academic Node', sub: 'History' },
  { id: 'guardian', label: 'Guardian Node', sub: 'Stakeholders' },
  { id: 'vault', label: 'Security Vault', sub: 'Uploads' },
];

export default function EliteAdmissionConsole() {
  const [activeStep, setActiveStep] = useState('identity');
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  const activeIndex = STEPS.findIndex(s => s.id === activeStep);

  return (
    /* 1. Main Wrapper: Fill parent container, no screen jumping */
    <div className="flex flex-col h-full w-full bg-[#FDFDFD] overflow-hidden font-sans text-slate-900 border-l border-slate-100">
      
      {/* 2. COMPACT HEADER (Fixed) */}
      <header className="h-[56px] shrink-0 flex items-center justify-between px-6 bg-white border-b border-slate-100 z-50">
        <div className="flex items-center gap-4">
           <div className="size-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-sm">
              <UserPlus size={16} />
           </div>
           <div className="flex flex-col">
              <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none">
                 <span>Registry Hub</span> <ChevronRight size={8} /> <span className="text-indigo-600">Onboarding</span>
              </div>
              <h1 className="text-sm font-bold text-slate-800 tracking-tight leading-tight mt-0.5 uppercase">Admission Command</h1>
           </div>
        </div>

        <div className="flex items-center gap-3">
           <div className="hidden md:flex flex-col items-end px-4 border-r border-slate-100">
              <div className="flex items-center gap-1.5">
                 <div className="size-1.5 rounded-full bg-emerald-500" />
                 <span className="text-[9px] font-bold text-slate-500 uppercase tracking-tight">Active Protocol</span>
              </div>
           </div>
           <Button variant="ghost" className="h-8 px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">
              <Save size={12} className="mr-1.5" /> Save Draft
           </Button>
        </div>
      </header>

      {/* 3. CORE CONTENT AREA (Flex container to manage height) */}
      <div className="flex flex-1 min-h-0 overflow-hidden">
        
        {/* LEFT NAV - Fixed */}
        <aside className="w-[210px] border-r border-slate-100 bg-[#FBFCFE] flex flex-col p-4 shrink-0 overflow-y-auto scrollbar-hide">
           <nav className="space-y-1 relative mt-2">
              {STEPS.map((step, idx) => {
                 const isCompleted = idx < activeIndex;
                 const isActive = activeStep === step.id;
                 return (
                    <button 
                       key={step.id}
                       onClick={() => setActiveStep(step.id)}
                       className={cn(
                          "w-full flex items-center gap-3 p-2.5 rounded-lg transition-all relative z-10",
                          isActive ? "bg-white shadow-sm ring-1 ring-slate-200" : "text-slate-400 hover:bg-slate-50"
                       )}
                    >
                       <div className={cn(
                         "size-6 rounded-md flex items-center justify-center border transition-all text-[10px] font-bold",
                         isActive ? "bg-slate-800 text-white shadow-sm" : isCompleted ? "bg-indigo-50 border-indigo-100 text-indigo-600" : "bg-white border-slate-200"
                       )}>
                          {isCompleted ? <CheckCircle2 size={12} /> : idx + 1}
                       </div>
                       <div className="text-left">
                          <p className={cn("text-[10px] font-bold uppercase tracking-tight", isActive ? "text-slate-900" : "text-slate-500")}>{step.label}</p>
                          <span className="text-[8px] font-medium text-slate-400 block uppercase tracking-tighter">{step.sub}</span>
                       </div>
                    </button>
                 );
              })}
              <div className="absolute left-[23px] top-4 bottom-4 w-px bg-slate-100 -z-0" />
           </nav>
        </aside>

        {/* CENTER PANEL - The Only Scrollable Area */}
        <main className="flex-1 flex flex-col bg-white overflow-hidden relative">
           
           {/* Scrollable Container */}
           <div className="flex-1 overflow-y-auto p-6 lg:p-8 scrollbar-hide">
              <div className="max-w-4xl mx-auto"> {/* Expanded to 4xl */}
                 
                 {/* Compact Title Section */}
                 <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                       <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600"><Sparkles size={16} /></div>
                       <div>
                          <h2 className="text-base font-bold text-slate-800 uppercase tracking-tight leading-none">{activeStep} Module</h2>
                          <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest mt-1">Registry Node Interface</p>
                       </div>
                    </div>
                    <Badge variant="outline" className="text-[8px] font-bold text-slate-400 border-slate-100 px-2 py-0">v2.0.4</Badge>
                 </div>

                 {/* FORM CONTENT */}
                 <div className="pb-10">
                    <AnimatePresence mode="wait">
                       <motion.div 
                          key={activeStep}
                          initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
                          className="grid grid-cols-1 md:grid-cols-2 gap-5"
                       >
                          {activeStep === 'identity' && (
                           <>
                               <EliteInput label="Student Full Name" placeholder="Full legal name" icon={<User size={12}/>} />
                               <EliteInput label="Birth Registry" type="date" icon={<Calendar size={12}/>} />
                               <EliteInput label="Gender Node" type="select" options={["Male", "Female", "Other"]} icon={<User size={12}/>} />
                               <EliteInput label="Blood Group" type="select" options={["A+", "B+", "O-", "AB+"]} icon={<HeartPulse size={12}/>} />
                               <div className="md:col-span-2"><EliteInput label="Permanent Residence" placeholder="Complete address node" icon={<MapPin size={12}/>} /></div>
                           </>
                          )}

                          {activeStep === 'vault' && (
                           <div className="md:col-span-2 space-y-4">
                               <div className="p-10 rounded-xl border border-dashed border-slate-200 bg-slate-50/50 flex flex-col items-center justify-center group hover:border-indigo-400 transition-all cursor-pointer">
                                   <div className="size-10 rounded-full bg-white shadow-sm flex items-center justify-center mb-3">
                                       <UploadCloud size={18} className="text-indigo-500" />
                                   </div>
                                   <p className="text-[10px] font-bold uppercase text-slate-700 tracking-wider">Drop Dossier Stream</p>
                                   <p className="text-[9px] font-medium text-slate-400 mt-1 uppercase">PDF or Image Format (Max 10MB)</p>
                               </div>
                               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                   <FileStatus label="Identity_Doc.pdf" status="ready" progress={100} />
                                   <FileStatus label="Academic_Trans.pdf" status="loading" progress={45} />
                               </div>
                           </div>
                          )}

                          {activeStep === 'academic' && (
                           <>
                               <EliteInput label="Target Grade" type="select" options={["Grade 8", "O-Levels Year 1"]} icon={<GraduationCap size={12}/>} />
                               <EliteInput label="Prev School" placeholder="School Name" icon={<School size={12}/>} />
                               <EliteInput label="Result Score" placeholder="GPA / %" icon={<FileText size={12}/>} />
                               <EliteInput label="Conduct Audit" type="select" options={["Exemplary", "Average"]} icon={<ShieldCheck size={12}/>} />
                           </>
                          )}

                          {activeStep === 'guardian' && (
                           <>
                               <EliteInput label="Guardian Name" placeholder="Father/Mother" icon={<User size={12}/>} />
                               <EliteInput label="Contact Node" placeholder="+92 XXX XXXXXXX" icon={<Phone size={12}/>} />
                               <EliteInput label="Verify Email" type="email" placeholder="email@node.com" icon={<Mail size={12}/>} />
                               <EliteInput label="National ID" placeholder="CNIC Node" icon={<Hash size={12}/>} />
                           </>
                          )}
                       </motion.div>
                    </AnimatePresence>
                 </div>
              </div>
           </div>

           {/* 4. STICKY FOOTER (Fixed at the bottom of the main area) */}
           <footer className="h-[64px] shrink-0 border-t border-slate-100 bg-white/80 backdrop-blur-md flex items-center justify-between px-8 z-40">
              <div className="flex items-center gap-6">
                 <div className="flex flex-col">
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Progress</span>
                    <div className="flex items-center gap-3">
                       <span className="text-xs font-bold text-slate-900 tabular-nums">{(activeIndex + 1) * 25}%</span>
                       <div className="w-24 h-1 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-indigo-600 transition-all duration-500" style={{ width: `${(activeIndex + 1) * 25}%` }} />
                       </div>
                    </div>
                 </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Button 
                    variant="ghost" 
                    className="h-9 px-4 text-[10px] font-bold uppercase tracking-widest text-slate-400"
                    disabled={activeIndex === 0}
                    onClick={() => setActiveStep(STEPS[activeIndex-1].id)}
                >
                    Back
                </Button>
                <Button 
                    onClick={() => activeIndex < 3 && setActiveStep(STEPS[activeIndex+1].id)}
                    className="h-9 px-6 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] font-bold uppercase tracking-wider shadow-sm transition-all flex items-center gap-2 active:scale-95"
                >
                    {activeIndex === 3 ? "Review Node" : "Continue"} <ArrowRight size={14} />
                </Button>
              </div>
           </footer>
        </main>

        {/* RIGHT PANEL - Fixed */}
        <aside className="w-[260px] bg-[#FBFCFE] border-l border-slate-100 flex flex-col p-5 shrink-0 overflow-y-auto scrollbar-hide">
           <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-5">System Intel</p>
           
           <Card className="bg-slate-900 text-white rounded-xl p-4 mb-5 border-none shadow-md">
              <h4 className="text-[8px] font-bold uppercase text-slate-500 mb-4 flex items-center gap-2"><Database size={10} /> Sector Load</h4>
              <div className="size-28 mx-auto relative">
                 <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                       <Pie data={[{v: 74, c: '#6366f1'}, {v: 26, c: '#1e293b'}]} innerRadius={30} outerRadius={40} dataKey="v" stroke="none">
                          <Cell fill="#6366f1" /><Cell fill="#1e293b" />
                       </Pie>
                    </PieChart>
                 </ResponsiveContainer>
                 <div className="absolute inset-0 flex flex-col items-center justify-center leading-none">
                    <span className="text-xl font-bold tabular-nums">74%</span>
                    <span className="text-[6px] font-bold text-slate-500 uppercase mt-0.5">Live</span>
                 </div>
              </div>
           </Card>

           <div className="space-y-2">
              <IntelLog icon={<ShieldCheck size={12} className="text-emerald-500" />} label="Security" sub="AES-256 Active" />
              <IntelLog icon={<Loader2 size={12} className="text-indigo-500 animate-spin" />} label="Sync Engine" sub="Real-time Node" />
           </div>
        </aside>
      </div>
    </div>
  );
}

// COMPACT HELPER COMPONENTS
function EliteInput({ label, icon, options, type = "text", ...props }: any) {
   return (
      <div className="space-y-1.5 group">
         <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest ml-0.5">{label}</label>
         <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors">{icon}</div>
            {type === "select" ? (
               <select className="w-full h-9 pl-9 pr-3 bg-white border border-slate-200 rounded-lg text-[11px] font-semibold text-slate-700 focus:ring-2 ring-indigo-50/50 transition-all outline-none appearance-none">
                  {options.map((o: any) => <option key={o}>{o}</option>)}
               </select>
            ) : (
               <input type={type} className="w-full h-9 pl-9 pr-3 bg-white border border-slate-200 rounded-lg text-[11px] font-semibold text-slate-700 focus:ring-2 ring-indigo-50/50 transition-all outline-none placeholder:text-slate-200" {...props} />
            )}
         </div>
      </div>
   )
}

function FileStatus({ label, status, progress }: any) {
    return (
        <div className="p-3 rounded-lg border border-slate-100 bg-white flex items-center gap-3">
            <FileText size={14} className={status === 'ready' ? "text-indigo-500" : "text-slate-300"} />
            <div className="flex-1 min-w-0">
                <p className="text-[9px] font-bold text-slate-700 truncate uppercase">{label}</p>
                <div className="h-1 w-full bg-slate-50 mt-1.5 rounded-full overflow-hidden">
                    <div className={cn("h-full transition-all", status === 'ready' ? "bg-emerald-500" : "bg-indigo-400")} style={{ width: `${progress}%` }} />
                </div>
            </div>
        </div>
    )
}

function IntelLog({ icon, label, sub }: any) {
   return (
      <div className="flex items-center gap-3 p-2.5 rounded-lg border border-slate-50 bg-white hover:border-slate-100 transition-all shadow-sm">
         <div className="size-7 rounded-md bg-slate-50 flex items-center justify-center shrink-0">{icon}</div>
         <div className="min-w-0">
            <h5 className="text-[9px] font-bold text-slate-800 uppercase leading-none truncate">{label}</h5>
            <p className="text-[7px] font-medium text-slate-400 mt-1 uppercase truncate tracking-tighter">{sub}</p>
         </div>
      </div>
   )
}
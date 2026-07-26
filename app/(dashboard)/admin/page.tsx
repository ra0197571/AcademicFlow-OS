"use client"

import React, { useState, useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { 
  GraduationCap, Wallet, Bell, Search, Plus, 
  Activity, Zap, Sparkles, CloudSun, 
  Trophy, ArrowUpRight, BrainCircuit, Users2, ShieldCheck,
  Command, Star, CalendarDays, ChevronRight, MoreHorizontal
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, 
  CartesianGrid, PieChart, Pie, Cell 
} from 'recharts';

// --- TYPES & INTERFACES ---
type DashboardTheme = 'indigo' | 'emerald' | 'violet' | 'amber' | 'rose';

interface KPIProps {
  label: string;
  value: number;
  trend: string;
  color: DashboardTheme;
  icon: React.ReactNode;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

const THEME_STYLES: Record<DashboardTheme, { text: string; bg: string; border: string }> = {
  indigo: { text: "text-indigo-600", bg: "bg-indigo-50", border: "border-indigo-100" },
  emerald: { text: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100" },
  violet: { text: "text-violet-600", bg: "bg-violet-50", border: "border-violet-100" },
  amber: { text: "text-amber-600", bg: "bg-amber-50", border: "border-amber-100" },
  rose: { text: "text-rose-600", bg: "bg-rose-50", border: "border-rose-100" }
};

// --- ANIMATED NUMBER ---
const AnimatedNumber = ({ value, prefix = "", suffix = "", decimals = 0 }: { value: number, prefix?: string, suffix?: string, decimals?: number }) => {
  const spring = useSpring(0, { mass: 1, stiffness: 60, damping: 15 });
  const display = useTransform(spring, (latest) => 
    `${prefix}${latest.toFixed(decimals).toLocaleString()}${suffix}`
  );
  useEffect(() => { spring.set(value); }, [value, spring]);
  return <motion.span className="tabular-nums font-black">{display}</motion.span>;
};

// --- MAIN DASHBOARD ---
export default function FinalProductionDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [time, setTime] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    const clock = setInterval(() => setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })), 1000);
    return () => { clearTimeout(timer); clearInterval(clock); };
  }, []);

  if (isLoading) return <DashboardSkeleton />;

  return (
    <div className="p-4 lg:p-8 space-y-8 animate-in fade-in duration-700 max-w-[1750px] mx-auto overflow-x-hidden">
      
      {/* 1. HEADER */}
      <header className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <Badge className="bg-slate-900 text-white text-[9px] font-black tracking-widest px-2 py-0.5 border-none rounded">ELITE OS v1.2</Badge>
            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5">
               <CloudSun size={14} className="text-amber-500" /> Lahore • {time}
            </span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tighter">Academic Intelligence <span className="text-indigo-600">Command</span></h1>
        </div>

        <div className="flex items-center gap-3 bg-white/80 backdrop-blur-md p-1.5 rounded-[22px] border border-slate-200 shadow-2xl">
           <div className="relative group hidden xl:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input placeholder="Search command (⌘K)" className="w-64 pl-11 pr-4 h-10 bg-slate-50 border-none rounded-xl text-[11px] font-bold outline-none ring-1 ring-slate-100" />
           </div>
           <Button className="bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-100 text-[10px] font-black h-10 px-6 rounded-2xl gap-2 uppercase tracking-widest transition-all active:scale-95">
              <Plus size={18} strokeWidth={3} /> Quick Add
           </Button>
           <Button variant="outline" size="icon" className="h-11 w-11 rounded-2xl relative border-slate-200 bg-white">
              <Bell size={20} />
              <span className="absolute top-3 right-3 size-1.5 bg-rose-500 rounded-full animate-pulse" />
           </Button>
           <div className="h-6 w-px bg-slate-200 mx-1" />
           <div className="flex items-center gap-3 pl-2 pr-4 cursor-pointer group">
              <div className="size-10 rounded-2xl bg-slate-900 flex items-center justify-center text-white text-[11px] font-black shadow-xl group-hover:scale-110 transition-transform">PA</div>
              <div className="hidden sm:block">
                 <p className="text-[10px] font-black text-slate-900 leading-none">Principal Admin</p>
                 {/* FIXED: Changed p to div to avoid hydration error */}
                 <div className="text-[9px] font-bold text-emerald-500 mt-1 uppercase flex items-center gap-1">
                   <span className="size-1 rounded-full bg-emerald-500 animate-pulse" /> Online View
                 </div>
              </div>
           </div>
        </div>
      </header>

      {/* 2. KPI GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <KPIItem label="Total Enrollment" value={1240} trend="+12.4%" color="indigo" icon={<GraduationCap size={26} />} />
        <KPIItem label="Avg Performance" value={85.2} suffix="%" decimals={1} trend="+5.1%" color="emerald" icon={<Trophy size={26} />} />
        <KPIItem label="Net Revenue" value={42500} prefix="$" trend="+8.4%" color="violet" icon={<Wallet size={26} />} />
        <KPIItem label="Academy Health" value={98} suffix="%" trend="Optimal" color="amber" icon={<Activity size={26} />} />
      </div>

      {/* 3. CORE ANALYTICS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <Card className="lg:col-span-8 border-none shadow-2xl rounded-[40px] bg-white overflow-hidden">
           <CardHeader className="p-8 pb-0 flex flex-row items-center justify-between">
              <div>
                 <CardTitle className="text-xl font-black text-slate-900 flex items-center gap-2"><Sparkles size={20} className="text-indigo-600" /> Telemetry Flow</CardTitle>
                 <CardDescription className="text-[10px] font-black uppercase tracking-widest text-slate-400">Live data synchronization active</CardDescription>
              </div>
              <div className="flex gap-1 bg-slate-50 p-1.5 rounded-2xl">
                 <Button variant="ghost" size="sm" className="text-[9px] font-black h-8 bg-white shadow-sm rounded-xl px-4 border-none">WEEKLY</Button>
                 <Button variant="ghost" size="sm" className="text-[9px] font-black h-8 text-slate-400 px-4 border-none">MONTHLY</Button>
              </div>
           </CardHeader>
           <CardContent className="p-8">
              <div className="h-[380px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                   <AreaChart data={[{n:'M',v:40},{n:'T',v:70},{n:'W',v:45},{n:'T',v:90},{n:'F',v:65},{n:'S',v:85}]}>
                      <defs><linearGradient id="p-glow" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/><stop offset="95%" stopColor="#6366f1" stopOpacity={0}/></linearGradient></defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <Tooltip contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', fontWeight: '900' }} />
                      <Area type="monotone" dataKey="v" stroke="#6366f1" strokeWidth={5} fill="url(#p-glow)" />
                   </AreaChart>
                </ResponsiveContainer>
              </div>
           </CardContent>
        </Card>

        {/* AI Engine */}
        <Card className="lg:col-span-4 border-none shadow-2xl bg-slate-900 text-white rounded-[40px] p-8 flex flex-col justify-between overflow-hidden group relative">
           <div className="absolute -top-10 -right-10 size-48 bg-indigo-500/20 blur-[80px]" />
           <div>
              <div className="flex items-center justify-between mb-10">
                 <div className="flex items-center gap-3"><div className="p-2.5 bg-white/5 rounded-2xl"><BrainCircuit size={24} className="text-amber-400" /></div><span className="text-[11px] font-black uppercase tracking-widest text-slate-400">AI Predictor</span></div>
                 <Badge className="bg-indigo-500/20 text-indigo-400 border-none text-[8px] font-black">Live</Badge>
              </div>
              <div className="space-y-8">
                 <PredictLine label="Retention Trend" value={92} color="bg-indigo-500" />
                 <PredictLine label="Recovery Flow" value={84} color="bg-emerald-500" />
                 <PredictLine label="Churn Margin" value={12} color="bg-rose-500" />
              </div>
           </div>
           <div className="mt-10">
              <div className="p-5 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-xl mb-8">
                 <p className="text-[12px] font-medium text-slate-300 italic leading-relaxed">"System predicts a 4.2% influx. Prepare faculty and lock payroll nodes."</p>
              </div>
              <Button className="w-full h-14 bg-white text-slate-900 hover:bg-slate-100 rounded-[22px] font-black text-[11px] uppercase tracking-[0.2em] shadow-3xl transition-all active:scale-95 group">
                 Deploy Insights <ArrowUpRight size={16} className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Button>
           </div>
        </Card>
      </div>

      {/* 4. TABLE & CALENDAR */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
         <Card className="xl:col-span-2 border-none shadow-2xl rounded-[40px] bg-white overflow-hidden">
            <CardHeader className="p-8 border-b border-slate-50 flex items-center justify-between">
               <CardTitle className="text-sm font-black uppercase tracking-widest text-slate-900">Recent Admissions Stream</CardTitle>
               <Button variant="outline" className="rounded-xl h-9 text-[10px] font-black uppercase px-4 border-slate-200">Export Report</Button>
            </CardHeader>
            <div className="overflow-x-auto">
               <table className="w-full text-left">
                  <thead className="bg-slate-50/50 text-[10px] font-black uppercase text-slate-400 tracking-widest border-b border-slate-50">
                     <tr><th className="px-8 py-5">Name</th><th className="px-8 py-5">Dept</th><th className="px-8 py-5">Status</th><th className="px-8 py-5 text-right">Fee</th></tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                     {[{n:'Ali Malik',d:'O-Levels',s:'Active',f:'Paid'},{n:'Sarah Khan',d:'A-Levels',s:'Pending',f:'Pending'}].map((row, i) => (
                        <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                           <td className="px-8 py-5 text-sm font-bold text-slate-800">{row.n}</td>
                           <td className="px-8 py-5 text-xs font-medium text-slate-400">{row.d}</td>
                           <td className="px-8 py-5"><Badge className={`text-[9px] font-black uppercase ${row.s === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'} border-none rounded-lg px-2`}>{row.s}</Badge></td>
                           <td className="px-8 py-5 text-right font-black text-sm text-slate-900">{row.f}</td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </Card>

         <Card className="border-none shadow-2xl rounded-[40px] bg-indigo-600 text-white p-8 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-8"><CardTitle className="text-sm font-black uppercase tracking-widest text-indigo-100">Elite Calendar</CardTitle><CalendarDays size={20} /></div>
            <div className="space-y-6">
               <div className="flex items-center gap-4"><div className="size-12 bg-white/10 rounded-2xl flex flex-col items-center justify-center font-black"><span>12</span><span className="text-[8px]">JUL</span></div><p className="text-sm font-bold">Mid-term Exams Finals</p></div>
               <div className="flex items-center gap-4"><div className="size-12 bg-white/10 rounded-2xl flex flex-col items-center justify-center font-black"><span>15</span><span className="text-[8px]">JUL</span></div><p className="text-sm font-bold">Staff Seminar Node</p></div>
            </div>
            <Button className="w-full bg-white/10 hover:bg-white/20 h-14 rounded-[22px] border-none text-[11px] font-black uppercase tracking-widest mt-10">Access Schedule</Button>
         </Card>
      </div>

      {/* 5. LEADERBOARD & FEE RECOVERY */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-10">
         <Card className="border-none shadow-2xl rounded-[40px] bg-white overflow-hidden">
            <CardHeader className="p-8 border-b border-slate-50 flex items-center justify-between">
               <CardTitle className="text-sm font-black uppercase tracking-widest">Faculty Performance Index</CardTitle>
               <Star size={20} className="text-amber-400 fill-amber-400" />
            </CardHeader>
            <div className="p-4 divide-y divide-slate-50">
               {[1, 2].map(r => (
                  <div key={r} className="flex items-center justify-between p-5 rounded-3xl hover:bg-slate-50 transition-all">
                     <div className="flex items-center gap-5"><span className="text-sm font-black text-slate-300">0{r}</span><p className="text-sm font-black text-slate-900">{r === 1 ? 'Zia Khan' : 'Sarah Ahmed'}</p></div>
                     <div className="flex items-center gap-1.5"><Star size={16} className="text-amber-400 fill-amber-400" /><span className="text-sm font-black">4.9</span></div>
                  </div>
               ))}
            </div>
         </Card>

         <Card className="border-none shadow-2xl rounded-[40px] bg-white p-8">
            <CardTitle className="text-sm font-black uppercase tracking-widest mb-10 text-slate-900">Fee Recovery Status</CardTitle>
            <div className="flex items-center justify-between px-4">
               <div className="h-[180px] w-[180px] relative">
                  <ResponsiveContainer><PieChart><Pie data={[{v:750,c:'#6366f1'},{v:300,c:'#f59e0b'},{v:150,c:'#ef4444'}]} innerRadius={55} outerRadius={75} paddingAngle={8} dataKey="v" stroke="none">{[{v:750,c:'#6366f1'},{v:300,c:'#f59e0b'},{v:150,c:'#ef4444'}].map((e, i) => <Cell key={i} fill={e.c} />)}</Pie></PieChart></ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center"><p className="text-2xl font-black text-slate-900 tracking-tighter">75%</p><p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Efficiency</p></div>
               </div>
               <div className="space-y-6 pr-8 text-left">
                  <div><p className="text-[10px] font-black text-slate-400 uppercase leading-none">Total Collection</p><p className="text-2xl font-black text-slate-900 mt-2 tracking-tighter">$12.5k</p></div>
                  <div className="flex gap-6"><div><p className="text-[8px] font-black text-indigo-500 uppercase">Paid</p><p className="text-xs font-black text-slate-900 mt-1">750</p></div><div><p className="text-[8px] font-black text-amber-500 uppercase">Pending</p><p className="text-xs font-black text-slate-900 mt-1">300</p></div></div>
               </div>
            </div>
         </Card>
      </div>
    </div>
  );
}

// --- SUB-COMPONENTS ---
function KPIItem({ label, value, trend, color, icon, prefix, suffix, decimals }: KPIProps) {
  const styles = THEME_STYLES[color];
  return (
    <motion.div whileHover={{ y: -8, scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
       <Card className="border border-slate-100 shadow-xl rounded-[40px] p-8 group cursor-default bg-white relative overflow-hidden transition-all duration-500">
          <div className="flex items-center justify-between mb-10 relative z-10">
             <div className={`p-5 rounded-3xl ${styles.bg} ${styles.text} shadow-2xl group-hover:rotate-6 transition-transform duration-500`}>{icon}</div>
             <Badge className={`${styles.bg} ${styles.text} font-black text-[11px] px-3 py-1.5 border-none rounded-xl`}>{trend}</Badge>
          </div>
          <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.25em] mb-2 relative z-10">{label}</p>
          <h3 className="text-4xl font-black text-slate-900 tracking-tighter leading-none relative z-10 tabular-nums">
             <AnimatedNumber value={value} prefix={prefix} suffix={suffix} decimals={decimals} />
          </h3>
       </Card>
    </motion.div>
  );
}

function PredictLine({ label, value, color }: { label: string, value: number, color: string }) {
  return (
    <div className="space-y-3 text-left">
       <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none"><span>{label}</span><span className="text-white">{value}%</span></div>
       <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
          <motion.div initial={{ width: 0 }} animate={{ width: `${value}%` }} transition={{ duration: 1.5, ease: "easeOut" }} className={`h-full ${color}`} />
       </div>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="p-8 lg:p-12 space-y-12 animate-pulse max-w-[1750px] mx-auto overflow-hidden">
      <div className="flex justify-between items-center"><div className="h-4 w-48 bg-slate-200 rounded" /><div className="h-16 w-[550px] bg-slate-200 rounded-[30px]" /></div>
      <div className="grid grid-cols-4 gap-8">{[1,2,3,4].map(i => <div key={i} className="h-52 bg-slate-200 rounded-[40px]" />)}</div>
      <div className="grid grid-cols-12 gap-8"><div className="col-span-8 h-[500px] bg-slate-200 rounded-[40px]" /><div className="col-span-4 h-[500px] bg-slate-200 rounded-[40px]" /></div>
    </div>
  );
}
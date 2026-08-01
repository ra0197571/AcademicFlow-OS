"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wallet, Download, TrendingUp, DollarSign, Clock, 
  CheckCircle2, AlertCircle, FileText, Printer, 
  ChevronRight, ArrowUpRight, BarChart3, CreditCard,
  Zap, Database, ShieldCheck, History, Landmark, Receipt,
  Star // <--- FIXED: Added missing import
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid 
} from 'recharts';
import { cn } from "@/lib/utils";

// --- MOCK DATA ---
const paymentHistory = [
  { month: 'Jan', paid: 250 }, { month: 'Feb', paid: 250 },
  { month: 'Mar', paid: 300 }, { month: 'Apr', paid: 250 },
  { month: 'May', paid: 250 }, { month: 'Jun', paid: 450 },
];

const feeLedgerNodes = [
  { id: "INV-991-AF", period: "June 2026", date: "12 July", amount: "450.00", status: "Paid", method: "Bank Transfer" },
  { id: "INV-842-AF", period: "May 2026", date: "05 June", amount: "250.00", status: "Paid", method: "Credit Card" },
  { id: "INV-715-AF", period: "April 2026", date: "10 May", amount: "250.00", status: "Paid", method: "Cash Node" },
];

export default function StudentFeeLedger() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <div className="flex flex-col h-full space-y-6 text-left animate-in fade-in duration-700 font-sans selection:bg-indigo-100">
      
      {/* 1. TOP FISCAL HEADER */}
      <header className="shrink-0 h-[56px] border-b border-slate-100 bg-white flex items-center justify-between px-6 z-20 gap-4 text-left">
        <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2 text-[9px] font-bold text-indigo-600 uppercase tracking-widest leading-none px-0.5">
                FISCAL REGISTRY <span className="text-slate-300">•</span> <span className="text-slate-400 font-bold uppercase">Node_v4.2</span>
            </div>
            <h1 className="text-lg font-black text-slate-900 tracking-tight mt-1 uppercase italic leading-none truncate">
                My <span className="text-indigo-600 font-bold not-italic">Financial Ledger</span>
            </h1>
        </div>

        <div className="flex items-center gap-2 shrink-0">
           <Button variant="outline" className="h-8 text-[9px] font-bold uppercase border-slate-200 bg-white px-3 gap-2">
              <Download size={14} /> Full Statement
           </Button>
           <Button className="h-8 bg-indigo-600 hover:bg-indigo-700 text-white text-[9px] font-bold uppercase shadow-md active:scale-95 transition-all px-4 rounded-lg flex gap-2 border-none">
                <CreditCard size={14} /> Pay Outstanding
            </Button>
        </div>
      </header>

      {/* 2. KPI ROW */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
         <DashStat label="Total Settled" value="$1,850" trend="YTD" color="indigo" icon={<Wallet size={12}/>}/>
         <DashStat label="Outstanding" value="$0.00" trend="CLEAR" color="emerald" icon={<CheckCircle2 size={12}/>}/>
         <DashStat label="Next Invoice" value="$250" trend="AUG 01" color="blue" icon={<Clock size={12}/>}/>
         <DashStat label="Scholarship" value="15%" trend="ACTIVE" color="purple" icon={<Star size={12}/>}/>
         <DashStat label="Alert Nodes" value="Zero" trend="SECURE" color="orange" icon={<AlertCircle size={12}/>}/>
         <DashStat label="Vault Status" value="Locked" trend="AES" color="rose" icon={<Database size={12}/>}/>
      </div>

      {/* 3. ANALYTICS & LEDGER WORKSPACE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1700px] mx-auto w-full text-left">
         
         {/* Payment History */}
         <Card className="lg:col-span-7 border-slate-100 shadow-sm rounded-[32px] p-8 bg-white hover:border-indigo-100 transition-all group overflow-hidden">
            <div className="flex justify-between items-start mb-10">
               <div className="text-left">
                  <h3 className="text-[10px] font-black text-slate-800 uppercase tracking-widest flex items-center gap-2 italic">
                     <TrendingUp size={14} className="text-indigo-600" /> Fiscal Trajectory Matrix
                  </h3>
                  <p className="text-[11px] font-bold text-slate-400 uppercase mt-1">Historical settlement patterns</p>
               </div>
               <Badge className="bg-slate-900 text-white border-none font-black text-[8px] uppercase px-3 py-1 italic tracking-widest">REALTIME_LEDGER</Badge>
            </div>
            <div className="h-[240px] w-full group-hover:scale-[1.01] transition-transform duration-700">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={paymentHistory}>
                     <defs>
                        <linearGradient id="colorPaid" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15}/>
                           <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                        </linearGradient>
                     </defs>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                     <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 800, fill: '#94a3b8'}} dy={10} />
                     <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.05)', fontSize: '10px', fontWeight: 900 }} />
                     <Area type="monotone" dataKey="paid" stroke="#6366f1" strokeWidth={4} fill="url(#colorPaid)" dot={{ r: 4, fill: '#6366f1', strokeWidth: 2, stroke: '#fff' }} />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </Card>

         {/* Mini Financial Dossier */}
         <Card className="lg:col-span-5 border-slate-100 shadow-sm rounded-[32px] p-8 bg-[#0F172A] text-white flex flex-col justify-between overflow-hidden relative group text-left">
            <div className="absolute top-0 right-0 size-48 bg-indigo-600/10 blur-3xl transition-all group-hover:bg-indigo-600/20" />
            <div className="relative z-10 space-y-6">
                <div className="flex justify-between items-start">
                    <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2 leading-none italic"><ShieldCheck size={14} className="text-emerald-500"/> Verified Account Node</h3>
                    <Badge className="bg-white/5 text-slate-400 border-none font-bold text-[8px]">v1.2.0</Badge>
                </div>
                <div className="space-y-1">
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Active Settlement Node</p>
                    <h2 className="text-4xl font-black tracking-tighter text-white tabular-nums">$1,850.00</h2>
                    <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mt-2 flex items-center gap-1.5"><CheckCircle2 size={12}/> All Dues Compliant</p>
                </div>
            </div>
            
            <div className="relative z-10 pt-10 border-t border-white/5 space-y-4">
                <div className="flex justify-between items-center text-left">
                    <div className="flex items-center gap-3">
                        <div className="size-8 rounded-lg bg-white/5 flex items-center justify-center text-indigo-400 border border-white/10"><Landmark size={16}/></div>
                        <div><p className="text-[10px] font-black text-white uppercase leading-none mb-1">Primary Bank</p><p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest italic">BLUE_AREA_NODE</p></div>
                    </div>
                    <ChevronRight size={16} className="text-slate-700" />
                </div>
                <Button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black text-[10px] h-11 rounded-xl uppercase tracking-widest shadow-xl shadow-indigo-900/40 border-none transition-all active:scale-95">Download Fiscal Cert</Button>
            </div>
         </Card>

         {/* TRANSACTION LEDGER */}
         <div className="lg:col-span-12 pt-4">
            <div className="flex items-center justify-between mb-4 px-2">
                <h3 className="text-[11px] font-black text-slate-800 uppercase tracking-[0.2em] flex items-center gap-2">
                    <History size={16} className="text-indigo-600" /> Official Settlement Archive
                </h3>
            </div>
            <Card className="border-none bg-white rounded-3xl shadow-sm ring-1 ring-slate-200/60 overflow-hidden mb-12">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-slate-50/50 border-b border-slate-100 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                            <th className="px-6 py-4">Fiscal period Node</th>
                            <th className="px-6 py-4">Payment Identifier</th>
                            <th className="px-6 py-4 text-center">Settlement Node</th>
                            <th className="px-6 py-4">Auth State</th>
                            <th className="px-6 py-4 text-right pr-10">Matrix Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 font-sans">
                        {feeLedgerNodes.map((slip) => (
                            <tr key={slip.id} className="group hover:bg-indigo-50/5 transition-all border-l-2 border-transparent hover:border-indigo-600">
                                <td className="px-6 py-4 text-left">
                                    <div className="flex items-center gap-4">
                                        <div className="size-8 rounded-lg bg-slate-100 text-slate-400 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-all shadow-sm"><Receipt size={16} /></div>
                                        <div>
                                            <p className="text-[11px] font-black text-slate-800 uppercase leading-none">{slip.period}</p>
                                            <p className="text-[8px] font-bold text-slate-300 uppercase mt-1 italic tracking-widest">{slip.date}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-[10px] font-black text-indigo-500 font-mono tracking-tighter uppercase">{slip.id}</td>
                                <td className="px-6 py-4 text-center font-black text-slate-900 text-xs tabular-nums">
                                    ${slip.amount}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2 text-left">
                                        <div className="size-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
                                        <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">{slip.status}</span>
                                    </div>
                                    <p className="text-[8px] font-bold text-slate-300 mt-1 uppercase tracking-tighter ml-3.5">{slip.method}</p>
                                </td>
                                <td className="px-6 py-4 text-right pr-10">
                                    <Button variant="ghost" className="h-8 px-4 text-[9px] font-black uppercase text-indigo-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors underline decoration-indigo-200 decoration-dashed underline-offset-4">
                                        Open Digital Receipt
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>
         </div>
      </div>
    </div>
  );
}

// KPI COMPONENT
function DashStat({ label, value, trend, color, icon }: any) {
    const colors: any = { indigo: "bg-indigo-50 text-indigo-600 shadow-indigo-100", emerald: "bg-emerald-50 text-emerald-600 shadow-emerald-100", blue: "bg-blue-50 text-blue-600 shadow-blue-100", purple: "bg-purple-50 text-purple-600 shadow-purple-100", orange: "bg-orange-50 text-orange-600 shadow-orange-100", rose: "bg-rose-50 text-rose-600 shadow-rose-100" }
    return (
        <Card className="p-3.5 rounded-xl bg-white border-none shadow-sm ring-1 ring-slate-100 flex flex-col justify-between hover:shadow-md hover:-translate-y-1 transition-all h-[95px] cursor-default text-left group">
            <div className="flex justify-between items-start w-full leading-none">
                <div className={cn("p-1.5 rounded-lg shadow-xs transition-transform group-hover:scale-110", colors[color])}>{icon}</div>
                <span className={cn("text-[6px] font-black px-1.5 py-0.5 rounded uppercase tracking-tighter shadow-sm bg-white", colors[color])}>{trend}</span>
            </div>
            <div className="mt-1 text-left"><p className="text-base font-black text-slate-900 tracking-tight leading-none tabular-nums">{value}</p><p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1.5 leading-none group-hover:text-indigo-600 transition-colors">{label}</p></div>
        </Card>
    )
}
"use client"

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Wallet, Download, TrendingUp, DollarSign, Clock, 
  CheckCircle2, AlertCircle, FileText, Printer, 
  ChevronRight, ArrowUpRight, BarChart3, PieChart as PieIcon,
  Zap, Database, ShieldCheck, History, Landmark
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid 
} from "recharts";
import { cn } from "@/lib/utils";

// --- MOCK DATA ---
const salaryTrend = [
  { month: 'Jan', amount: 3200 }, { month: 'Feb', amount: 3200 },
  { month: 'Mar', amount: 3500 }, { month: 'Apr', amount: 3200 },
  { month: 'May', amount: 3200 }, { month: 'Jun', amount: 3800 },
];

const payslipNodes = [
  { id: "PSL-991", period: "June 2026", date: "01 July", amount: "3,800.00", status: "Paid", method: "Bank Transfer" },
  { id: "PSL-842", period: "May 2026", date: "01 June", amount: "3,200.00", status: "Paid", method: "Bank Transfer" },
  { id: "PSL-715", period: "April 2026", date: "01 May", amount: "3,200.00", status: "Paid", method: "Cheque" },
];

export default function FacultyPayrollNode() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <div className="flex flex-col h-full bg-[#FDFDFD] overflow-hidden animate-in fade-in duration-700 font-sans relative text-slate-900 text-left">
      
      {/* 1. TOP FISCAL HEADER */}
      <header className="shrink-0 h-[56px] border-b border-slate-100 bg-white flex items-center justify-between px-6 z-20">
        <div className="flex flex-col text-left">
            <div className="flex items-center gap-2 text-[9px] font-bold text-indigo-600 uppercase tracking-widest leading-none px-0.5">
                FISCAL NODE <span className="text-slate-300">•</span> <span className="text-slate-400 font-bold uppercase">PAYROLL_v2.0</span>
            </div>
            <h1 className="text-sm font-black text-slate-900 tracking-tight mt-1 uppercase italic leading-none">
                My <span className="text-indigo-600 not-italic font-bold ml-1 px-1">Fiscal Ledger</span>
            </h1>
        </div>

        <div className="flex items-center gap-2">
           <Button variant="outline" className="h-8 text-[9px] font-bold uppercase tracking-wider border-slate-200 bg-white">
              <Printer size={12} className="mr-1.5" /> Print All
           </Button>
           <Button className="h-8 bg-indigo-600 hover:bg-indigo-700 text-white text-[9px] font-bold uppercase shadow-md active:scale-95 transition-all px-4 rounded-lg border-none">
                <Download size={14} className="mr-1.5" /> Export Statements
            </Button>
        </div>
      </header>

      {/* 2. SCROLLABLE AREA */}
      <main className="flex-1 overflow-y-auto p-4 lg:p-6 scrollbar-hide space-y-6 bg-slate-50/20 pb-32">
        
        {/* FINANCIAL KPI ROW */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 max-w-[1700px] mx-auto">
           <DashStat label="Monthly Base" value="$3,200" trend="FIXED" color="indigo" icon={<Wallet size={12}/>}/>
           <DashStat label="Total Earned" value="$19,800" trend="YTD" color="emerald" icon={<TrendingUp size={12}/>}/>
           <DashStat label="Bonus Node" value="$600" trend="+12%" color="blue" icon={<Zap size={12}/>}/>
           <DashStat label="Deductions" value="$120" trend="LOW" color="rose" icon={<AlertCircle size={12}/>}/>
           <DashStat label="Tax Ledger" value="Locked" trend="AES" color="purple" icon={<Database size={12}/>}/>
           <DashStat label="Bank Status" value="Active" trend="SYNC" color="orange" icon={<Landmark size={12}/>}/>
        </div>

        {/* ANALYTICS & PAYSLIP GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 max-w-[1700px] mx-auto">
           
           {/* Salary Evolution Chart - Fixed Symmetry */}
           <Card className="lg:col-span-8 h-[200px] bg-[#0F172A] text-white rounded-2xl border-none shadow-2xl relative overflow-hidden flex items-center p-8 group transition-all">
              <div className="relative z-10 flex-1 space-y-4">
                 <div>
                    <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2 italic leading-none">
                       <BarChart3 size={12} className="text-indigo-400" /> Earning Trajectory
                    </h3>
                    <p className="text-3xl font-black tracking-tighter text-indigo-400 mt-3 leading-none">Net Growth: +14%</p>
                 </div>
                 <div className="flex gap-2">
                    <Badge className="bg-emerald-500/10 text-emerald-400 border-none font-bold text-[8px] uppercase tracking-tighter px-2 py-0.5">Verified_Paid</Badge>
                    <Badge className="bg-white/5 border-none text-slate-500 font-bold text-[8px] uppercase tracking-tighter px-2 py-0.5 italic">Fiscal_Node_04</Badge>
                 </div>
              </div>
              <div className="h-[140px] w-[350px] shrink-0 relative pr-4">
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={salaryTrend}>
                       <defs>
                          <linearGradient id="colorSalary" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                             <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                          </linearGradient>
                       </defs>
                       <Area type="monotone" dataKey="amount" stroke="#6366f1" strokeWidth={4} fill="url(#colorSalary)" dot={{ r: 4, fill: '#6366f1', strokeWidth: 2, stroke: '#0F172A' }} />
                    </AreaChart>
                 </ResponsiveContainer>
              </div>
           </Card>

           {/* Quick Summary Card */}
           <Card className="lg:col-span-4 h-[200px] bg-white rounded-2xl border-slate-100 shadow-sm p-6 flex flex-col justify-between hover:border-indigo-100 transition-all">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 leading-none"><History size={12}/> Current Breakdown</h3>
              <div className="space-y-3 mt-4">
                 <BreakdownRow label="Instructional Pay" value="$3,200.00" color="text-slate-900" />
                 <BreakdownRow label="Overtime Bonus" value="$450.00" color="text-emerald-600" />
                 <BreakdownRow label="Academic Fund" value="$150.00" color="text-indigo-600" />
                 <div className="pt-2 border-t border-slate-50 flex justify-between items-center">
                    <span className="text-[10px] font-black text-slate-900 uppercase">Total Payout</span>
                    <span className="text-sm font-black text-indigo-600">$3,800.00</span>
                 </div>
              </div>
           </Card>
        </div>

        {/* PAYSLIP LEDGER */}
        <div className="max-w-[1700px] mx-auto pb-12 pt-2">
           <div className="flex items-center justify-between mb-4 px-2">
                <h3 className="text-[11px] font-black text-slate-800 uppercase tracking-[0.2em] flex items-center gap-2">
                    <FileText size={16} className="text-indigo-600" /> Digital Payslip Archive
                </h3>
           </div>
           <Card className="border-none bg-white rounded-2xl shadow-sm ring-1 ring-slate-200/60 overflow-hidden">
              <table className="w-full text-left">
                 <thead>
                    <tr className="bg-slate-50/50 border-b border-slate-100 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                       <th className="px-6 py-4">Fiscal period Node</th>
                       <th className="px-6 py-4 text-center">Settlement Node</th>
                       <th className="px-6 py-4">Verification State</th>
                       <th className="px-6 py-4 text-right pr-10">Matrix Action</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-50 font-sans">
                    {payslipNodes.map((slip) => (
                       <tr key={slip.id} className="group hover:bg-indigo-50/5 transition-all border-l-2 border-transparent hover:border-indigo-600">
                          <td className="px-6 py-4">
                             <div className="flex items-center gap-4">
                                <div className="size-9 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-all shadow-sm">
                                   <Landmark size={18} />
                                </div>
                                <div>
                                   <p className="text-[11px] font-black text-slate-800 uppercase leading-none">{slip.period}</p>
                                   <p className="text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-tighter tabular-nums font-mono">{slip.id}</p>
                                </div>
                             </div>
                          </td>
                          <td className="px-6 py-4 text-center font-black text-slate-900 text-xs tabular-nums">
                             ${slip.amount}
                          </td>
                          <td className="px-6 py-4">
                             <div className="flex items-center gap-2">
                                <div className="size-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
                                <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">{slip.status}</span>
                             </div>
                             <p className="text-[8px] font-bold text-slate-300 mt-1 uppercase tracking-tighter">{slip.method}</p>
                          </td>
                          <td className="px-6 py-4 text-right pr-10">
                             <Button variant="ghost" className="h-8 px-4 text-[9px] font-black uppercase text-indigo-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors underline decoration-indigo-200 decoration-dashed underline-offset-4">
                                Download Node PDF
                             </Button>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </Card>
        </div>
      </main>
    </div>
  );
}

// --- HELPER COMPONENTS ---

function DashStat({ label, value, trend, color, icon }: any) {
    const colors: any = { indigo: "bg-indigo-50 text-indigo-600 shadow-indigo-100", emerald: "bg-emerald-50 text-emerald-600 shadow-emerald-100", blue: "bg-blue-50 text-blue-600 shadow-blue-100", purple: "bg-purple-50 text-purple-600 shadow-purple-100", orange: "bg-orange-50 text-orange-600 shadow-orange-100", rose: "bg-rose-50 text-rose-600 shadow-rose-100" }
    return (
        <Card className="p-3.5 rounded-xl bg-white border-none shadow-sm ring-1 ring-slate-100 flex flex-col justify-between hover:shadow-md hover:-translate-y-1 transition-all h-[95px] cursor-default text-left group">
            <div className="flex justify-between items-start w-full">
                <div className={cn("p-1.5 rounded-lg shadow-xs transition-transform group-hover:scale-110", colors[color])}>{icon}</div>
                <span className={cn("text-[6px] font-black px-1.5 py-0.5 rounded uppercase tracking-tighter shadow-sm bg-white border border-slate-50", colors[color])}>{trend}</span>
            </div>
            <div className="mt-1 text-left"><p className="text-base font-black text-slate-900 tracking-tight leading-none tabular-nums">{value}</p><p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1.5 leading-none">{label}</p></div>
        </Card>
    )
}

function BreakdownRow({ label, value, color }: any) {
    return (
        <div className="flex justify-between items-center text-left">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">{label}</span>
            <span className={cn("text-[10px] font-black tabular-nums", color)}>{value}</span>
        </div>
    )
}
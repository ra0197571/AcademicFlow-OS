"use client"

import React, { useState } from 'react';
import { 
  Wallet, ArrowUpRight, ArrowDownRight, CreditCard, Search, 
  Download, FileText, Clock, CheckCircle2, MoreHorizontal, X, 
  Printer, Send, TrendingUp, LayoutGrid, DollarSign, Activity, ChevronRight,
  Banknote, Landmark
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, AreaChart, Area } from 'recharts';
import Link from "next/link";
import { cn } from "@/lib/utils";

const revenueData = [
  { month: 'Jan', income: 4500, expense: 2100 },
  { month: 'Feb', income: 5200, expense: 2300 },
  { month: 'Mar', income: 4800, expense: 2200 },
  { month: 'Apr', income: 6100, expense: 2800 },
  { month: 'May', income: 5900, expense: 2600 },
  { month: 'Jun', income: 7200, expense: 3100 },
];

const recentTransactions = [
  { id: "INV-001", student: "Ahmed Malik", amount: "250.00", status: "Paid", method: "Bank", date: "2h ago" },
  { id: "INV-002", student: "Fatima Khan", amount: "180.00", status: "Pending", method: "Cash", date: "5h ago" },
  { id: "INV-003", student: "Ali Hassan", amount: "320.00", status: "Overdue", method: "EasyPaisa", date: "Yesterday" },
  { id: "INV-004", student: "Zainab Bibi", amount: "250.00", status: "Paid", method: "Card", date: "Yesterday" },
  { id: "INV-005", student: "Bilal Raza", amount: "150.00", status: "Paid", method: "Cash", date: "2d ago" },
];

export default function FeesPayrollDashboard() {
  const [selectedCount, setSelectedCount] = useState(0);
  const [quickViewInvoice, setQuickViewInvoice] = useState<any>(null);

  return (
    <div className="flex flex-col h-full bg-[#FDFDFD] overflow-hidden animate-in fade-in duration-700">
      
      {/* 1. TOP FISCAL HEADER */}
      <header className="shrink-0 h-[56px] border-b border-slate-100 bg-white flex items-center justify-between px-6 z-20">
        <div className="flex items-center gap-3">
           <div className="size-8 bg-slate-900 rounded-lg flex items-center justify-center text-white shadow-lg shadow-slate-200">
              <Wallet size={16} />
           </div>
           <div className="flex flex-col">
              <h1 className="text-xs font-black text-slate-800 tracking-tight leading-none uppercase italic">Financial <span className="text-indigo-600">Command</span></h1>
              <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1 tracking-tighter leading-none">Fiscal Node / Audit 2024-25</span>
           </div>
        </div>

        <div className="flex items-center gap-2">
           <Button variant="outline" className="h-8 text-[9px] font-bold uppercase tracking-wider border-slate-200 bg-white hover:bg-slate-50">
              <Download size={12} className="mr-2" /> Statement
           </Button>
           <Button className="h-8 bg-indigo-600 hover:bg-indigo-700 text-white text-[9px] font-bold uppercase tracking-wider shadow-md active:scale-95 transition-all px-4">
                <FileText size={12} className="mr-2" /> New Invoice
            </Button>
        </div>
      </header>

      {/* 2. MAIN SCROLLABLE AREA */}
      <main className="flex-1 overflow-y-auto p-6 scrollbar-hide space-y-6 bg-slate-50/20">
        
        {/* FINANCIAL KPI CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
           <PremiumStat label="Gross Revenue" value="$42,850" trend="+12.4%" color="#6366f1" icon={<TrendingUp size={12}/>}/>
           <PremiumStat label="Pending Dues" value="$3,120" trend="+2.1%" color="#f59e0b" icon={<Clock size={12}/>}/>
           <PremiumStat label="Payroll Node" value="$18,400" trend="-1.0%" color="#ef4444" icon={<Activity size={12}/>}/>
           <PremiumStat label="Net Surplus" value="54.2%" trend="+8.5%" color="#10b981" icon={<LayoutGrid size={12}/>}/>
        </div>

        {/* ANALYTICS & LEDGER GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-7xl mx-auto">
           
           {/* Revenue Chart - Span 8 */}
           <Card className="lg:col-span-8 border-slate-100 shadow-sm rounded-3xl p-6 bg-white flex flex-col hover:border-indigo-100 transition-all group">
              <div className="flex items-center justify-between mb-8">
                 <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600"><TrendingUp size={14} /></div>
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] italic">Cash Flow Progression</h3>
                 </div>
                 <div className="flex gap-4">
                    <ChartLegend color="bg-indigo-500" label="Income" />
                    <ChartLegend color="bg-slate-200" label="Expense" />
                 </div>
              </div>
              <div className="h-[340px] w-full group-hover:scale-[1.01] transition-transform duration-500">
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={revenueData} margin={{ left: -20 }}>
                       <defs>
                          <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15}/>
                             <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                          </linearGradient>
                       </defs>
                       <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                       <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 9, fontWeight: 800, fill: '#94a3b8'}} dy={10} />
                       <YAxis axisLine={false} tickLine={false} tick={{fontSize: 9, fontWeight: 800, fill: '#94a3b8'}} />
                       <Tooltip 
                            shared={true}
                            contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.08)', fontSize: '10px', fontWeight: 900 }} 
                        />
                       <Area type="monotone" dataKey="income" stroke="#6366f1" strokeWidth={4} fill="url(#colorIncome)" dot={{ r: 4, fill: '#6366f1', strokeWidth: 2, stroke: '#fff' }} />
                       <Area type="monotone" dataKey="expense" stroke="#e2e8f0" strokeWidth={2} fill="transparent" strokeDasharray="5 5" />
                    </AreaChart>
                 </ResponsiveContainer>
              </div>
           </Card>

           {/* Recent Ledger - Span 4 */}
           <Card className="lg:col-span-4 border-slate-100 shadow-sm rounded-3xl bg-white overflow-hidden flex flex-col hover:border-indigo-100 transition-all">
              <div className="p-5 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
                 <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Recent Ledger</h3>
                 <button className="text-[8px] font-black text-indigo-600 uppercase tracking-[0.2em] hover:text-indigo-700 transition-colors">View All Records</button>
              </div>
              <div className="flex-1 overflow-y-auto scrollbar-hide divide-y divide-slate-50 max-h-[380px]">
                 {recentTransactions.map((tx) => (
                    <LedgerItem key={tx.id} data={tx} onQuickView={() => setQuickViewInvoice(tx)} />
                 ))}
              </div>
              <div className="p-4 bg-slate-50/50 border-t border-slate-50">
                 <Button className="w-full bg-slate-900 h-11 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 active:scale-[0.98]">
                    Generate Fiscal Report Node
                 </Button>
              </div>
           </Card>
        </div>
      </main>

      {/* 3. QUICK VIEW SHEET */}
      <Sheet open={!!quickViewInvoice} onOpenChange={() => setQuickViewInvoice(null)}>
        <SheetContent className="w-[400px] border-l border-slate-100 p-0 overflow-hidden shadow-2xl bg-white">
           <div className="h-24 bg-slate-900 flex items-center px-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-indigo-600 opacity-20" />
              <h3 className="text-white font-black uppercase tracking-widest text-[10px] z-10 italic">Transaction Dossier</h3>
           </div>
           
           <div className="px-8 -mt-8 relative z-20">
              <div className="size-20 rounded-2xl bg-white p-1 shadow-2xl border border-slate-50 mx-auto">
                 <div className="size-full rounded-xl bg-slate-50 flex items-center justify-center text-xl font-black text-indigo-400 uppercase italic">
                    {quickViewInvoice?.method.substring(0, 1)}
                 </div>
              </div>
              <div className="mt-4 text-center">
                 <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight">{quickViewInvoice?.student}</h2>
                 <p className="text-[9px] font-bold text-indigo-500 uppercase tracking-widest mt-2 tracking-tighter">{quickViewInvoice?.id} • Fiscal Registry</p>
                 
                 <div className="grid grid-cols-2 gap-3 mt-8">
                    <DossierBlock label="Amount Node" value={`$${quickViewInvoice?.amount}`} />
                    <DossierBlock label="Status Log" value={quickViewInvoice?.status} color={quickViewInvoice?.status === 'Paid' ? 'text-emerald-500' : 'text-rose-500'} />
                 </div>
                 
                 <div className="mt-8 pt-8 border-t border-slate-50 flex flex-col gap-2">
                   {/* Fees Dashboard ke Sheet ke andar ka button */}
                 <Link href={`/admin/fees/${quickViewInvoice?.id}`} className="block mt-8">
                          <Button className="w-full bg-slate-900 h-11 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
                            Process Digital Receipt
                          </Button>
                  </Link> 
                    <Button variant="outline" className="w-full h-11 rounded-xl text-[10px] font-black uppercase tracking-widest border-slate-200">
                       Email Invoice Node
                    </Button>
                 </div>
              </div>
           </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

// PREMIUM COMPONENTS
function PremiumStat({ label, value, trend, color, icon }: any) {
  const data = [{ v: 20 }, { v: 45 }, { v: 28 }, { v: 80 }, { v: 99 }, { v: 43 }];
  
  // Logic to determine trend color
  const isPositive = trend.startsWith('+');
  const trendClass = isPositive 
    ? "bg-emerald-50 text-emerald-600 shadow-emerald-100" 
    : "bg-rose-50 text-rose-600 shadow-rose-100"; // FIX: text-rose-50 ko text-rose-600 kar diya

  return (
    <div className="p-4 rounded-xl bg-white border border-slate-100 shadow-sm hover:border-indigo-200 hover:shadow-md hover:-translate-y-1 transition-all group overflow-hidden relative cursor-default">
       <div className="flex justify-between items-start relative z-10">
          <div>
            <div className="flex items-center gap-2 text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1 group-hover:text-indigo-500 transition-colors">
               {icon} {label}
            </div>
            <p className="text-lg font-black text-slate-900 tracking-tight leading-none">{value}</p>
            
            {/* UPDATED TREND BADGE */}
            <span className={cn(
                "text-[8px] font-black px-2 py-0.5 rounded mt-2 inline-block shadow-sm transition-transform group-hover:scale-105",
                trendClass
            )}>
                {trend}
            </span>
          </div>
          
          <div className="w-12 h-10 opacity-30 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
            <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={data}>
                <Area 
                    type="monotone" 
                    dataKey="v" 
                    stroke={color} 
                    fill={color} 
                    fillOpacity={0.05} 
                    strokeWidth={2.5} 
                />
               </AreaChart>
            </ResponsiveContainer>
          </div>
       </div>
       <div className="absolute -bottom-8 -right-8 size-20 bg-indigo-50/50 rounded-full blur-2xl group-hover:bg-indigo-100/80 transition-all duration-500" />
    </div>
  )
}

function LedgerItem({ data, onQuickView }: any) {
    return (
        <div className="p-4 hover:bg-slate-50/80 transition-all group flex items-center justify-between cursor-pointer border-l-2 border-transparent hover:border-indigo-500" onClick={onQuickView}>
            <div className="flex items-center gap-4">
                <div className="size-9 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
                    {data.method === 'Bank' ? <Landmark size={16} /> : <Banknote size={16} />}
                </div>
                <div>
                    <h4 className="text-[11px] font-black text-slate-800 uppercase tracking-tight">{data.student}</h4>
                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1 flex items-center gap-2">
                        {data.id} <span className="size-1 rounded-full bg-slate-200" /> {data.method}
                    </p>
                </div>
            </div>
            <div className="text-right">
                <p className="text-[12px] font-black text-slate-900 tracking-tighter tabular-nums">${data.amount}</p>
                <div className="flex items-center justify-end gap-1.5 mt-1">
                    <div className={cn(
                        "size-1 rounded-full shadow-[0_0_8px_rgba(0,0,0,0.1)]",
                        data.status === 'Paid' ? 'bg-emerald-500 shadow-emerald-200' : 
                        data.status === 'Overdue' ? 'bg-rose-500 shadow-rose-200' : 'bg-amber-500 shadow-amber-200'
                    )} />
                    <span className={cn(
                        "text-[8px] font-black uppercase tracking-widest",
                        data.status === 'Paid' ? 'text-emerald-500' : 
                        data.status === 'Overdue' ? 'text-rose-500' : 'text-amber-500'
                    )}>{data.status}</span>
                </div>
            </div>
        </div>
    )
}

function ChartLegend({ color, label }: any) {
    return (
        <div className="flex items-center gap-2">
            <div className={cn("size-2 rounded-full", color)} />
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-tight">{label}</span>
        </div>
    )
}

function DossierBlock({ label, value, color = "text-slate-900" }: any) {
    return (
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-left hover:bg-white transition-all">
            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
            <p className={cn("text-sm font-black uppercase leading-none mt-1", color)}>{value}</p>
        </div>
    )
}
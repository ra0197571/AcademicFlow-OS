"use client"

import React, { useState } from 'react';
import { 
  Wallet, ArrowUpRight, ArrowDownRight, CreditCard, Search, Filter, 
  Download, FileText, Clock, CheckCircle2, MoreVertical, X, 
  Printer, Send, LayoutDashboard, TrendingUp
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, AreaChart, Area } from 'recharts';
import Link from "next/link";

const revenueData = [
  { month: 'Jan', income: 4500, expense: 2100 },
  { month: 'Feb', income: 5200, expense: 2300 },
  { month: 'Mar', income: 4800, expense: 2200 },
  { month: 'Apr', income: 6100, expense: 2800 },
  { month: 'May', income: 5900, expense: 2600 },
  { month: 'Jun', income: 7200, expense: 3100 },
];

const recentTransactions = [
  { id: "INV-001", student: "Ahmed Malik", amount: "250.00", status: "Paid", method: "Bank Transfer", date: "2 hours ago" },
  { id: "INV-002", student: "Fatima Khan", amount: "180.00", status: "Pending", method: "Cash", date: "5 hours ago" },
  { id: "INV-003", student: "Ali Hassan", amount: "320.00", status: "Overdue", method: "EasyPaisa", date: "Yesterday" },
  { id: "INV-004", student: "Zainab Bibi", amount: "250.00", status: "Paid", method: "Credit Card", date: "Yesterday" },
  { id: "INV-005", student: "Bilal Raza", amount: "150.00", status: "Paid", method: "Cash", date: "2 days ago" },
];

export default function FeesPayrollDashboard() {
  const [selectedCount, setSelectedCount] = useState(0);
  const [quickViewInvoice, setQuickViewInvoice] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("All Transactions");

  return (
    <div className="p-4 space-y-6 animate-in fade-in duration-500 max-w-[1600px] mx-auto relative min-h-screen">
      
      {/* 1. Top Financial Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-5 rounded-[24px] border border-slate-100 shadow-sm">
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Wallet className="text-indigo-600 size-6" /> Financial Management
          </h1>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Audit Year: 2024-2025</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" size="sm" className="h-9 rounded-lg font-bold text-[10px] uppercase border-slate-100">
              <Download size={14} className="mr-1.5" /> Statement
           </Button>
           <Button className="bg-indigo-600 hover:bg-indigo-700 h-9 rounded-lg font-bold gap-2 shadow-lg shadow-indigo-100 px-5 text-white transition-all active:scale-95">
             <FileText size={14} /> <span className="text-[10px] uppercase">New Invoice</span>
           </Button>
        </div>
      </div>

      {/* 2. Financial Stats Grid with Sparklines */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <FinanceStat label="Total Revenue" value="$42,850" trend="+12%" color="#4f46e5" />
        <FinanceStat label="Pending Dues" value="$3,120" trend="+2%" color="#f59e0b" />
        <FinanceStat label="Payroll Cost" value="$18,400" trend="-1%" color="#ef4444" />
        <FinanceStat label="Net Margin" value="54.2%" trend="+8%" color="#10b981" />
      </div>

      {/* 3. Analytics & Main Ledger */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Revenue Analytics Chart */}
        <Card className="lg:col-span-2 border-slate-200 shadow-sm rounded-[32px] overflow-hidden bg-white">
          <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-5 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <TrendingUp size={16} className="text-indigo-600" /> Cash Flow Overview
              </CardTitle>
            </div>
            <div className="flex gap-2">
               <Badge className="bg-indigo-100 text-indigo-600 border-none text-[9px] font-bold px-2">INCOME</Badge>
               <Badge className="bg-slate-100 text-slate-400 border-none text-[9px] font-bold px-2">EXPENSE</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6 pt-8">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="income" fill="#4f46e5" radius={[4, 4, 0, 0]} barSize={16} />
                  <Bar dataKey="expense" fill="#cbd5e1" radius={[4, 4, 0, 0]} barSize={16} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Transaction Ledger */}
        <Card className="lg:col-span-1 border-slate-200 shadow-sm rounded-[32px] overflow-hidden bg-white">
           <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-5">
              <div className="flex justify-between items-center">
                 <CardTitle className="text-sm font-bold">Recent Ledger</CardTitle>
                 <button className="text-[10px] font-black text-indigo-600 uppercase hover:underline">View All</button>
              </div>
           </CardHeader>
           <CardContent className="p-0">
              <div className="divide-y divide-slate-50">
                {recentTransactions.map((tx) => (
                  <div key={tx.id} className="p-4 hover:bg-indigo-50/30 transition-all flex justify-between items-center group cursor-pointer" onClick={() => setQuickViewInvoice(tx)}>
                    <div className="flex items-center gap-3">
                       <div className="p-2 bg-slate-50 rounded-xl group-hover:bg-white transition-colors border border-slate-100 shadow-sm">
                          <CreditCard size={16} className="text-slate-400 group-hover:text-indigo-600" />
                       </div>
                       <div>
                          <p className="font-bold text-slate-800 text-xs">{tx.student}</p>
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">{tx.id} • {tx.method}</p>
                       </div>
                    </div>
                    <div className="text-right">
                       <p className="font-black text-slate-900 text-sm">${tx.amount}</p>
                       <span className={`text-[8px] font-black uppercase px-1.5 py-0.5 rounded-md ${
                         tx.status === 'Paid' ? 'bg-emerald-50 text-emerald-600' : 
                         tx.status === 'Pending' ? 'bg-amber-50 text-amber-600' : 'bg-rose-50 text-rose-600'
                       }`}>{tx.status}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 bg-slate-50/50">
                 <Button variant="outline" className="w-full h-9 rounded-xl border-slate-200 bg-white text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600 transition-all">Generate Financial Report</Button>
              </div>
           </CardContent>
        </Card>
      </div>

      {/* 4. Floating Action Bar */}
      {selectedCount > 0 && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-6 animate-in slide-in-from-bottom-10 z-50">
           <p className="text-xs font-bold text-slate-400"><span className="text-white">{selectedCount}</span> Selected</p>
           <div className="h-4 w-px bg-slate-700" />
           <div className="flex gap-4">
              <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest hover:text-indigo-400 transition-colors"><Printer size={14}/> Print</button>
              <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest hover:text-indigo-400 transition-colors"><Send size={14}/> Email</button>
              <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-400 hover:text-emerald-300 transition-colors"><CheckCircle2 size={14}/> Mark Paid</button>
           </div>
           <button onClick={() => setSelectedCount(0)} className="p-1 hover:bg-slate-800 rounded-full transition-colors"><X size={14}/></button>
        </div>
      )}

      {/* 5. Quick View Sheet */}
      <Sheet open={!!quickViewInvoice} onOpenChange={() => setQuickViewInvoice(null)}>
        <SheetContent className="w-[400px] p-0 border-l border-slate-100">
           <div className="h-2 bg-indigo-600 w-full" />
           <div className="p-8 space-y-8">
              <div className="flex justify-between items-start">
                 <div>
                    <h2 className="text-xl font-black text-slate-900 uppercase">{quickViewInvoice?.id}</h2>
                    <p className="text-xs font-bold text-slate-400">Transaction Details</p>
                 </div>
                 <Badge className="bg-emerald-50 text-emerald-600 font-black text-[10px]">{quickViewInvoice?.status}</Badge>
              </div>

              <div className="space-y-4">
                 <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-[9px] font-black text-slate-400 uppercase mb-2">Student Identity</p>
                    <p className="font-bold text-slate-800">{quickViewInvoice?.student}</p>
                    <p className="text-[10px] text-slate-500 mt-0.5 underline">View Academic Profile</p>
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                       <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Amount</p>
                       <p className="text-lg font-black text-slate-900">${quickViewInvoice?.amount}</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                       <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Method</p>
                       <p className="text-xs font-bold text-slate-700">{quickViewInvoice?.method}</p>
                    </div>
                 </div>
              </div>

              <Link href={`/admin/fees/${quickViewInvoice?.id}`} className="block">
                <Button className="w-full bg-slate-900 text-white rounded-xl font-bold py-6 shadow-xl shadow-slate-200 transition-all active:scale-95">Open Full Digital Receipt</Button>
              </Link>
           </div>
        </SheetContent>
      </Sheet>

    </div>
  );
}

// Sparkline Finance Stat
function FinanceStat({ label, value, trend, color }: any) {
  const data = [{ v: 20 }, { v: 45 }, { v: 28 }, { v: 80 }, { v: 99 }, { v: 43 }];
  return (
    <div className="p-5 rounded-[28px] bg-white border border-slate-100 shadow-sm flex items-center justify-between group hover:border-indigo-100 transition-all">
       <div>
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
          <div className="flex items-baseline gap-2">
             <p className="text-xl font-black text-slate-900">{value}</p>
             <span className={`text-[9px] font-black ${trend.startsWith('+') ? 'text-emerald-500 bg-emerald-50' : 'text-rose-500 bg-rose-50'} px-1.5 py-0.5 rounded-md`}>{trend}</span>
          </div>
       </div>
       <div className="w-16 h-10 opacity-30 group-hover:opacity-100 transition-opacity">
          <ResponsiveContainer width="100%" height="100%">
             <AreaChart data={data}><Area type="monotone" dataKey="v" stroke={color} fill={color} fillOpacity={0.1} strokeWidth={2.5} /></AreaChart>
          </ResponsiveContainer>
       </div>
    </div>
  )
}
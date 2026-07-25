"use client"

import React from 'react';
import { 
  Wallet, 
  ArrowUpRight, 
  ArrowDownRight, 
  CreditCard, 
  Search, 
  Filter, 
  Download,
  FileText,
  Clock,
  CheckCircle2
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

// Dummy Financial Data
const revenueData = [
  { month: 'Jan', income: 4500, expense: 2100 },
  { month: 'Feb', income: 5200, expense: 2300 },
  { month: 'Mar', income: 4800, expense: 2200 },
  { month: 'Apr', income: 6100, expense: 2800 },
  { month: 'May', income: 5900, expense: 2600 },
  { month: 'Jun', income: 7200, expense: 3100 },
];

const recentTransactions = [
  { id: "INV-001", student: "Ahmed Malik", amount: "$250", status: "Paid", method: "Bank Transfer", date: "2 hours ago" },
  { id: "INV-002", student: "Fatima Khan", amount: "$180", status: "Pending", method: "Cash", date: "5 hours ago" },
  { id: "INV-003", student: "Ali Hassan", amount: "$320", status: "Overdue", method: "EasyPaisa", date: "Yesterday" },
  { id: "INV-004", student: "Zainab Bibi", amount: "$250", status: "Paid", method: "Credit Card", date: "Yesterday" },
];

export default function FeesPayrollDashboard() {
  return (
    <div className="p-6 space-y-8 animate-in fade-in duration-700">
      
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Fees & Payroll</h1>
          <p className="text-slate-500 font-medium">Financial health and transaction overview of your academy.</p>
        </div>
        
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-xl border-slate-200 font-bold gap-2">
            <Download size={18} /> Export PDF
          </Button>
          <Button className="bg-indigo-600 hover:bg-indigo-700 rounded-xl font-bold gap-2 shadow-lg shadow-indigo-100 py-6 px-6 text-white transition-all active:scale-95">
            <Wallet size={18} /> Create Invoice
          </Button>
        </div>
      </div>

      {/* 2. Financial Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <FinanceStatCard title="Total Revenue" value="$42,850" change="+12.5%" trend="up" />
        <FinanceStatCard title="Pending Fees" value="$3,120" change="+2.4%" trend="up" />
        <FinanceStatCard title="Staff Payroll" value="$18,400" change="-1.2%" trend="down" />
        <FinanceStatCard title="Net Profit" value="$21,330" change="+8.1%" trend="up" />
      </div>

      {/* 3. Charts & Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Revenue Chart */}
        <Card className="lg:col-span-2 border-slate-200 shadow-sm rounded-[32px] overflow-hidden">
          <CardHeader className="bg-slate-50/50 border-b border-slate-100">
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <ArrowUpRight className="h-5 w-5 text-emerald-500" />
              Income vs Expenses
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 pt-10">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="income" fill="#4f46e5" radius={[6, 6, 0, 0]} barSize={20} />
                  <Bar dataKey="expense" fill="#cbd5e1" radius={[6, 6, 0, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card className="border-slate-200 shadow-sm rounded-[32px] overflow-hidden">
          <CardHeader className="bg-slate-50/50 border-b border-slate-100">
            <CardTitle className="text-lg font-bold">Recent Fees</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
             <div className="divide-y divide-slate-50">
                {recentTransactions.map((tx) => (
                  <div key={tx.id} className="p-5 hover:bg-slate-50 transition-colors flex justify-between items-center group">
                    <div className="flex items-center gap-3">
                       <div className="size-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-all">
                          <FileText size={18} />
                       </div>
                       <div>
                          <p className="font-bold text-slate-800 text-sm">{tx.student}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{tx.id}</p>
                       </div>
                    </div>
                    <div className="text-right">
                       <p className="font-black text-slate-900">{tx.amount}</p>
                       <Badge className={`text-[8px] font-black uppercase px-2 py-0 h-4 border-none ${
                         tx.status === 'Paid' ? 'bg-emerald-50 text-emerald-600' : 
                         tx.status === 'Pending' ? 'bg-amber-50 text-amber-600' : 'bg-rose-50 text-rose-600'
                       }`}>
                         {tx.status}
                       </Badge>
                    </div>
                  </div>
                ))}
             </div>
             <button className="w-full py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-indigo-600 transition-colors bg-slate-50/30">
                View All Transactions
             </button>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}

// Sub-component for Stats
function FinanceStatCard({ title, value, change, trend }: any) {
  return (
    <Card className="border-slate-200 shadow-sm hover:shadow-md transition-all rounded-[24px]">
      <CardContent className="p-6">
        <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">{title}</p>
        <h3 className="text-2xl font-black text-slate-900">{value}</h3>
        <div className="flex items-center gap-1 mt-2">
          {trend === 'up' ? (
            <ArrowUpRight className="size-3 text-emerald-500" />
          ) : (
            <ArrowDownRight className="size-3 text-rose-500" />
          )}
          <span className={`text-xs font-bold ${trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>
            {change}
          </span>
          <span className="text-[10px] text-slate-400 font-medium ml-1">vs last month</span>
        </div>
      </CardContent>
    </Card>
  )
}
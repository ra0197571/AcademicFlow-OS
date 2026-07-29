"use client"

import React, { use } from 'react';
import { 
  ArrowLeft, Printer, Download, ShieldCheck, Building2, QrCode, FileText
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function InvoiceDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  return (
    <div className="flex flex-col h-full bg-[#FDFDFD] overflow-hidden animate-in fade-in duration-700 font-sans">
      
      {/* 1. COMPACT TOP BAR */}
      <header className="shrink-0 h-[52px] border-b border-slate-100 bg-white flex items-center justify-between px-6 z-20 no-print">
        <div className="flex items-center gap-4">
           <Link href="/admin/fees" className="p-1.5 hover:bg-slate-50 rounded-lg text-slate-400 transition-all border border-transparent">
              <ArrowLeft size={16} />
           </Link>
           <div className="flex flex-col">
              <h1 className="text-[10px] font-black text-slate-800 uppercase tracking-widest leading-none">Fiscal Node <span className="text-indigo-600">/ RECEIPT</span></h1>
              <span className="text-[8px] font-bold text-slate-400 uppercase mt-1 tracking-tighter">Reference: {id}</span>
           </div>
        </div>

        <div className="flex items-center gap-2">
           <Button variant="ghost" onClick={() => window.print()} className="h-7 text-[9px] font-bold uppercase tracking-widest text-slate-500">
              <Printer size={12} className="mr-1.5" /> Print
           </Button>
           <Button className="h-7 px-3 bg-slate-900 hover:bg-black text-white text-[9px] font-black uppercase tracking-widest rounded-md transition-all active:scale-95">
              <Download size={11} className="mr-1.5" /> Save PDF
           </Button>
        </div>
      </header>

      {/* 2. INVOICE CONTENT */}
      <main className="flex-1 overflow-y-auto p-6 lg:p-10 scrollbar-hide bg-slate-50/20 print:bg-white print:p-0">
        
        <Card className="max-w-2xl mx-auto border-slate-200/60 shadow-xl rounded-2xl overflow-hidden bg-white relative print:shadow-none print:border-none print:max-w-full">
           
           {/* Discrete Top Bar */}
           <div className="h-1 bg-indigo-600 w-full" />

           <CardContent className="p-8 lg:p-12 space-y-10 relative z-10">
              
              {/* Header: Identity & Seal */}
              <div className="flex justify-between items-start">
                 <div className="space-y-3">
                    <div className="flex items-center gap-2.5">
                       <div className="size-8 rounded-lg bg-slate-900 flex items-center justify-center text-white font-black text-xs italic shadow-lg shadow-indigo-100">AF</div>
                       <h2 className="text-xs font-black text-slate-900 uppercase tracking-tighter italic">AcademicFlow <span className="text-indigo-600">OS</span></h2>
                    </div>
                    <div className="flex flex-col gap-1 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                        <span className="flex items-center gap-1.5"><ShieldCheck size={10} className="text-emerald-500" /> SECURE_LEDGER_NODE</span>
                        <span className="flex items-center gap-1.5"><Building2 size={10} className="text-slate-300" /> MAIN_CAMPUS_OFFICE</span>
                    </div>
                 </div>

                 <div className="text-right">
                    <div className="inline-block border border-emerald-500/30 bg-emerald-50/50 px-3 py-1 rounded-md -rotate-6 mb-3">
                       <span className="text-[10px] font-black text-emerald-600 tracking-[0.2em] uppercase">VERIFIED PAID</span>
                    </div>
                    <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest">Auth Timestamp</p>
                    <p className="text-[10px] font-black text-slate-800 mt-0.5 tabular-nums">12 JUL 2026 — 15:37</p>
                 </div>
              </div>

              {/* Dossier Grid */}
              <div className="grid grid-cols-2 gap-10 py-8 border-y border-slate-100/60">
                 <div className="space-y-3">
                    <p className="text-[8px] font-black text-indigo-600 uppercase tracking-[0.2em]">Student Dossier</p>
                    <div className="space-y-0.5">
                       <h4 className="text-xs font-black text-slate-900 uppercase">Ahmed Malik</h4>
                       <p className="text-[10px] font-bold text-slate-400">Registry ID: <span className="text-slate-800 font-mono">STU-001</span></p>
                       <p className="text-[10px] font-bold text-slate-400 uppercase">Cycle: <span className="text-slate-800">Grade 9-A</span></p>
                    </div>
                 </div>

                 <div className="space-y-3 text-right flex flex-col items-end">
                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em]">Payment Protocol</p>
                    <div className="space-y-0.5">
                       <h4 className="text-[10px] font-black text-slate-900 uppercase">Bank Wire Settlement</h4>
                       <p className="text-[10px] font-bold text-slate-400">Ref: <span className="text-slate-800 font-mono uppercase tracking-tighter">TXN-99281-AF</span></p>
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Branch: <span className="text-slate-800">Blue Area Node</span></p>
                    </div>
                 </div>
              </div>

              {/* Itemized Ledger */}
              <div className="space-y-4">
                 <table className="w-full text-left">
                    <thead>
                       <tr className="text-[8px] font-black text-slate-300 uppercase tracking-widest border-b border-slate-50">
                          <th className="pb-3">Description Node</th>
                          <th className="pb-3 text-center w-20">Qty</th>
                          <th className="pb-3 text-right w-24">Amount</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                       <InvoiceRow label="Monthly Instructional Node (June)" qty="01" amount="200.00" />
                       <InvoiceRow label="Lab & Tech Support Fee" qty="01" amount="30.00" />
                       <InvoiceRow label="Institutional Security Node" qty="01" amount="20.00" />
                    </tbody>
                 </table>
              </div>

              {/* Totals & QR Node */}
              <div className="flex justify-between items-end gap-10 pt-6">
                 <div className="flex items-center gap-3 bg-slate-50/50 p-3 rounded-xl border border-slate-100">
                    <QrCode size={32} className="text-slate-800 opacity-60" />
                    <div className="max-w-[120px]">
                       <p className="text-[7px] font-black text-slate-400 uppercase leading-tight mb-1">Verify Node</p>
                       <p className="text-[6px] font-medium text-slate-400 leading-none">Authentication node for blockchain registry verification.</p>
                    </div>
                 </div>

                 <div className="w-48 space-y-2">
                    <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                       <span>Subtotal</span>
                       <span className="font-mono">$250.00</span>
                    </div>
                    <div className="flex justify-between items-center bg-indigo-600 p-3 rounded-xl shadow-lg shadow-indigo-100">
                       <span className="font-black text-white text-[9px] uppercase italic">Settled</span>
                       <span className="font-black text-white text-lg tracking-tighter font-mono leading-none">$250.00</span>
                    </div>
                 </div>
              </div>

              {/* Footer Audit Note */}
              <div className="pt-8 text-center">
                 <p className="text-[8px] font-bold text-slate-300 italic max-w-xs mx-auto uppercase tracking-tighter">
                   Electronically verified document. AcademicFlow OS Protocol v1.3. No manual signature required.
                 </p>
              </div>

           </CardContent>
        </Card>
      </main>
    </div>
  );
}

// COMPACT INVOICE ROW
function InvoiceRow({ label, qty, amount }: any) {
  return (
    <tr className="group hover:bg-slate-50/50 transition-colors">
       <td className="py-4">
          <p className="text-[10px] font-bold text-slate-800 uppercase tracking-tight">{label}</p>
          <p className="text-[8px] font-medium text-slate-400 mt-0.5 tracking-widest leading-none">CODE Node: FE-992-0</p>
       </td>
       <td className="py-4 text-center font-bold text-slate-400 text-[10px] font-mono">{qty}</td>
       <td className="py-4 text-right font-black text-slate-900 text-[11px] font-mono">${amount}</td>
    </tr>
  )
}
"use client"

import React, { use } from 'react';
import { 
  ArrowLeft, Printer, Download, Mail, CheckCircle2, 
  CreditCard, Building2, ChevronRight
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function InvoiceDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  return (
    <div className="p-4 space-y-4 animate-in fade-in duration-500 max-w-2xl mx-auto">
      
      {/* 1. Header Actions - Compact */}
      <div className="flex justify-between items-center no-print">
        <div className="flex items-center gap-2">
           <Link href="/admin/fees" className="p-1.5 hover:bg-white rounded-lg text-slate-400 border border-transparent hover:border-slate-100 transition-all">
             <ArrowLeft size={16} />
           </Link>
           <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Invoice <span className="text-indigo-600">{id}</span></p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => window.print()} variant="outline" className="h-8 rounded-lg text-[9px] font-black border-slate-200 uppercase tracking-widest px-3">
            <Printer size={12} className="mr-1" /> Print
          </Button>
          <Button className="h-8 rounded-lg text-[9px] font-black bg-slate-900 hover:bg-black text-white uppercase tracking-widest px-3">
            <Download size={12} className="mr-1" /> PDF
          </Button>
        </div>
      </div>

      {/* 2. Compact Professional Invoice Card */}
      <Card className="border-slate-200 shadow-sm rounded-2xl overflow-hidden bg-white print:border-none print:shadow-none">
        <div className="h-1.5 bg-indigo-600 w-full" />
        
        <CardContent className="p-6 space-y-8">
           {/* Top: Logo & Status */}
           <div className="flex justify-between items-start">
              <div className="flex items-center gap-2.5">
                 <div className="size-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black text-sm">AF</div>
                 <div>
                    <h2 className="text-sm font-black text-slate-900 leading-none">AcademicFlow OS</h2>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter mt-1 italic">Official Billing Document</p>
                 </div>
              </div>
              <div className="text-right">
                 <Badge className="bg-emerald-50 text-emerald-600 border-none font-black text-[10px] px-2 py-0.5 rounded-md uppercase ring-1 ring-emerald-100 mb-2">
                    PAID
                 </Badge>
                 <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Issue Date: 12/07/2026</p>
              </div>
           </div>

           {/* Info Grid: Compact */}
           <div className="grid grid-cols-2 gap-8 py-6 border-y border-slate-50">
              <div className="space-y-2">
                 <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Student Information</p>
                 <div className="text-xs">
                    <p className="font-black text-slate-800">Ahmed Malik</p>
                    <p className="text-slate-500 mt-0.5">Roll No: STU-001</p>
                    <p className="text-slate-500">Grade: 9th-A</p>
                 </div>
              </div>
              <div className="space-y-2 text-right">
                 <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Payment Info</p>
                 <div className="text-xs">
                    <p className="font-bold text-slate-800">Bank Transfer</p>
                    <p className="text-slate-500 mt-0.5">Ref: TXN-99281</p>
                    <p className="text-slate-500">Branch: Blue Area</p>
                 </div>
              </div>
           </div>

           {/* Table: Itemized List */}
           <div className="space-y-3">
              <table className="w-full text-left">
                 <thead>
                    <tr className="text-[9px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">
                       <th className="pb-2">Description</th>
                       <th className="pb-2 text-center w-16">Qty</th>
                       <th className="pb-2 text-right w-24">Amount</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-50">
                    <InvoiceRow label="Monthly Tuition Fee (June)" qty="01" amount="200.00" />
                    <InvoiceRow label="Lab & Tech Support Fee" qty="01" amount="30.00" />
                    <InvoiceRow label="Security Fund" qty="01" amount="20.00" />
                 </tbody>
              </table>
           </div>

           {/* Summary: Grand Total */}
           <div className="flex justify-end border-t border-slate-50 pt-4">
              <div className="w-48 space-y-2">
                 <div className="flex justify-between text-[11px] font-bold text-slate-400 uppercase tracking-tight">
                    <span>Subtotal</span>
                    <span>$250.00</span>
                 </div>
                 <div className="flex justify-between items-center pt-2">
                    <span className="font-black text-slate-900 text-xs uppercase">Total Paid</span>
                    <span className="font-black text-indigo-600 text-xl tracking-tighter">$250.00</span>
                 </div>
              </div>
           </div>

           {/* Footer: Legal Note */}
           <div className="pt-6 text-center border-t border-slate-50">
              <p className="text-[9px] font-bold text-slate-400 italic">
                Thank you for your payment. For queries: support@academicflow.os
              </p>
           </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Compact Sub-component
function InvoiceRow({ label, qty, amount }: any) {
  return (
    <tr className="text-[11px] group hover:bg-slate-50/50 transition-colors">
       <td className="py-3 font-bold text-slate-700">{label}</td>
       <td className="py-3 text-center font-bold text-slate-400">{qty}</td>
       <td className="py-3 text-right font-black text-slate-900">${amount}</td>
    </tr>
  )
}
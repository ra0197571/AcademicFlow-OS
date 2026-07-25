"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { GraduationCap, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6">
      <div className="flex flex-col items-center mb-10 text-center">
        <div className="size-20 rounded-[20px] bg-[#4F46E5] flex items-center justify-center text-white mb-6 shadow-xl shadow-indigo-100">
          <GraduationCap size={48} />
        </div>
        <h1 className="text-4xl font-bold text-slate-900 tracking-tight">AcademicFlow OS</h1>
        <p className="text-slate-500 mt-2 text-lg font-medium">Welcome back to your academy</p>
      </div>

      <div className="w-full max-w-[440px] bg-white rounded-[32px] border border-slate-100 shadow-sm p-10">
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Sign in with phone</h2>
            <p className="text-slate-400 mt-2 leading-relaxed font-medium">
              We'll send you a verification code
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-2.5">
              <label className="text-[13px] font-bold text-slate-500 ml-1 uppercase tracking-wider">Phone Number</label>
              <Input 
                placeholder="+92 300 1234567" 
                className="h-14 border-slate-200 focus:border-indigo-500 rounded-2xl px-5 text-lg font-medium"
              />
            </div>
            <Link href="/otp">
              <Button className="w-full h-14 bg-[#4F46E5] hover:bg-indigo-700 text-white rounded-2xl flex items-center justify-center gap-3 text-lg font-bold shadow-lg transition-all mt-4">
                Send OTP <ArrowRight size={20} />
              </Button>
            </Link>
          </div>
          
          <div className="bg-[#F8FAFC] rounded-2xl p-5 border-2 border-dashed border-slate-200">
            <p className="text-[11px] uppercase font-black text-slate-400 mb-1 tracking-widest">Demo Mode</p>
            <p className="text-sm text-slate-500 font-medium leading-relaxed">Enter any 10-digit number to receive OTP</p>
          </div>
        </div>
      </div>
      <p className="mt-10 text-[12px] text-slate-400 font-bold uppercase tracking-widest">By continuing, you agree to our Terms of Service</p>
    </div>
  )
}
"use client"

import { useRef, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function OTPPage() {
  const [otp, setOtp] = useState(["", "", "", ""])
  const inputRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)]

  // Focus directly on first box when page loads
  useEffect(() => {
    inputRefs[0].current?.focus()
  }, [])

  const handleChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return // Sirf numbers allowed hain

    const newOtp = [...otp]
    newOtp[index] = value.substring(value.length - 1) // Sirf last digit rakhein
    setOtp(newOtp)

    // Agle box par focus le kar jayein agar value enter hui hai
    if (value && index < 3) {
      inputRefs[index + 1].current?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    // Backspace dabane par piche wale box par jayein
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus()
    }
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6 font-sans">
      <div className="w-full max-w-[440px] bg-white rounded-[32px] border border-slate-100 shadow-sm p-10">
        <div className="space-y-8">
          <Link href="/login" className="text-xs text-[#4F46E5] font-black flex items-center gap-2 hover:underline uppercase tracking-widest">
            ← Change number
          </Link>
          
          <div>
            <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Enter verification code</h2>
            <p className="text-slate-400 mt-2 font-medium">Sent to +92 300 1234567</p>
          </div>
          
          <div className="flex justify-between gap-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={inputRefs[index]}
                type="text"
                inputMode="numeric"
                value={digit}
                maxLength={1}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="size-16 border-2 border-slate-100 rounded-[20px] text-center text-2xl font-black text-slate-800 focus:border-[#4F46E5] focus:ring-4 focus:ring-indigo-50 outline-none transition-all placeholder:text-slate-200"
                placeholder="0"
              />
            ))}
          </div>

          <Link href="/">
            <Button className="w-full h-14 bg-[#4F46E5] hover:bg-indigo-700 text-white rounded-2xl font-bold text-lg shadow-lg mt-4 transition-all border-none">
              Verify & Continue
            </Button>
          </Link>
          
          <p className="text-center text-sm font-bold text-slate-400 pt-2 uppercase tracking-tighter">
            Didn't receive code? <span className="text-[#4F46E5] cursor-pointer hover:underline">Resend</span>
          </p>

          <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100">
            <p className="text-[11px] font-black text-emerald-600 tracking-widest uppercase">DEMO OTP: 1234</p>
            <p className="text-sm text-emerald-500 font-medium mt-1 leading-relaxed">Use this code to sign in</p>
          </div>
        </div>
      </div>
      
      <p className="mt-10 text-[11px] text-slate-400 font-bold uppercase tracking-widest">AcademicFlow OS • Security Protocol</p>
    </div>
  )
}
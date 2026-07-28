"use client";

import React, { useState, useEffect } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import {
  GraduationCap, Wallet, Sparkles, Trophy, ArrowUpRight, BrainCircuit, Users,
  ArrowUp, ArrowDown, Download, Plus, CheckCircle2, FileText, UserPlus,
  Building2, Users2
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip,
  CartesianGrid, PieChart, Pie, Cell, BarChart, Bar
} from "recharts";

// --- TYPES ---
type TimeRange = '7d' | '30d' | '90d';

interface KPIData {
  id: string;
  title: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  change: string;
  isPositive: boolean;
  subtext: string;
  color: 'indigo' | 'emerald' | 'amber' | 'violet' | 'rose' | 'cyan';
  icon: React.ReactNode;
}

// Color theme mapping for compact single-row KPI Cards
const COLOR_THEMES = {
  indigo: {
    bg: "bg-indigo-50/60 hover:bg-indigo-50/90",
    iconBg: "bg-indigo-600 text-white shadow-2xs",
    badge: "bg-indigo-100/90 text-indigo-700",
    border: "border-indigo-100",
  },
  emerald: {
    bg: "bg-emerald-50/60 hover:bg-emerald-50/90",
    iconBg: "bg-emerald-600 text-white shadow-2xs",
    badge: "bg-emerald-100/90 text-emerald-700",
    border: "border-emerald-100",
  },
  cyan: {
    bg: "bg-cyan-50/60 hover:bg-cyan-50/90",
    iconBg: "bg-cyan-600 text-white shadow-2xs",
    badge: "bg-cyan-100/90 text-cyan-700",
    border: "border-cyan-100",
  },
  violet: {
    bg: "bg-violet-50/60 hover:bg-violet-50/90",
    iconBg: "bg-violet-600 text-white shadow-2xs",
    badge: "bg-violet-100/90 text-violet-700",
    border: "border-violet-100",
  },
  amber: {
    bg: "bg-amber-50/60 hover:bg-amber-50/90",
    iconBg: "bg-amber-600 text-white shadow-2xs",
    badge: "bg-amber-100/90 text-amber-700",
    border: "border-amber-100",
  },
  rose: {
    bg: "bg-rose-50/60 hover:bg-rose-50/90",
    iconBg: "bg-rose-600 text-white shadow-2xs",
    badge: "bg-rose-100/90 text-rose-700",
    border: "border-rose-100",
  },
};

// Fee Collection Rate Graph Data
const FEE_COLLECTION_GRAPH = [
  { month: "Jan", collectionRate: 82, revenue: 62000, target: 80 },
  { month: "Feb", collectionRate: 85, revenue: 68000, target: 80 },
  { month: "Mar", collectionRate: 88, revenue: 74000, target: 85 },
  { month: "Apr", collectionRate: 89, revenue: 79000, target: 85 },
  { month: "May", collectionRate: 91, revenue: 81000, target: 90 },
  { month: "Jun", collectionRate: 92.4, revenue: 84250, target: 90 },
];

// Enrollment By Gender Data
const GENDER_ENROLLMENT_DATA = [
  { name: "Male Students", count: 693, percentage: 54, color: "#4f46e5" },
  { name: "Female Students", count: 591, percentage: 46, color: "#ec4899" },
];

// --- ANIMATED COUNTER ---
const AnimatedNumber = ({ value, prefix = "", suffix = "", decimals = 0 }: { value: number; prefix?: string; suffix?: string; decimals?: number }) => {
  const spring = useSpring(0, { mass: 0.8, stiffness: 90, damping: 16 });
  const display = useTransform(spring, (latest) =>
    `${prefix}${latest.toFixed(decimals).toLocaleString()}${suffix}`
  );
  useEffect(() => {
    spring.set(value);
  }, [value, spring]);
  return <motion.span className="tabular-nums font-black">{display}</motion.span>;
};

export default function AdminDashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<TimeRange>('30d');

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 250);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <DashboardSkeleton />;

  // Exactly 6 KPI Cards arranged in a SINGLE ROW on Desktop
  const kpiCards: KPIData[] = [
    {
      id: "students",
      title: "Total Students",
      value: 1284,
      change: "+12.4%",
      isPositive: true,
      subtext: "Total Students this term",
      color: "indigo",
      icon: <GraduationCap size={15} />,
    },
    {
      id: "teachers",
      title: "Teachers & Staff",
      value: 86,
      suffix: " KEs",
      change: "+4.2%",
      isPositive: true,
      subtext: "Teachers & Staff KEs",
      color: "cyan",
      icon: <Users size={15} />,
    },
    {
      id: "feeRate",
      title: "Fee Collected Rate",
      value: 92.4,
      decimals: 1,
      suffix: "%",
      change: "+8.6%",
      isPositive: true,
      subtext: "Fee Collected Rate",
      color: "emerald",
      icon: <Wallet size={15} />,
    },
    {
      id: "attendance",
      title: "Average Attendance",
      value: 98.5,
      decimals: 1,
      suffix: "%",
      change: "+1.8%",
      isPositive: true,
      subtext: "Average Attendance",
      color: "violet",
      icon: <CheckCircle2 size={15} />,
    },
    {
      id: "exams",
      title: "Active Exams",
      value: 14,
      suffix: " Scheduled",
      change: "+2 Active",
      isPositive: true,
      subtext: "Active Exams",
      color: "amber",
      icon: <FileText size={15} />,
    },
    {
      id: "meanScore",
      title: "School Mean Score",
      value: 86.4,
      decimals: 1,
      suffix: "%",
      change: "+3.5%",
      isPositive: true,
      subtext: "School Mean Score",
      color: "rose",
      icon: <Trophy size={15} />,
    },
  ];

  return (
    <div className="space-y-4 sm:space-y-5 animate-in fade-in duration-300 pb-8">
      
      {/* 1. TOP CONTEXT HEADER BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white/90 backdrop-blur-md p-3 sm:p-3.5 rounded-xl border border-slate-200/80 shadow-2xs">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
            <span className="font-bold text-indigo-600 uppercase tracking-wider text-[10px]">Academic Intelligence</span>
            <span>•</span>
            <span>Session 2026</span>
          </div>
          <h1 className="text-base sm:text-lg font-black text-slate-900 tracking-tight mt-0.5">
            Welcome back, <span className="text-indigo-600">Principal Admin</span>
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center rounded-lg bg-slate-100 p-0.5 border border-slate-200/60">
            {(['7d', '30d', '90d'] as TimeRange[]).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-2.5 py-1 text-[10px] font-bold rounded-md transition-all ${
                  timeRange === range
                    ? 'bg-white text-indigo-600 shadow-2xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {range.toUpperCase()}
              </button>
            ))}
          </div>

          <Button variant="outline" size="sm" className="h-7 rounded-lg text-[10px] font-bold border-slate-200 bg-white gap-1 hover:bg-slate-50">
            <Download size={12} /> Export
          </Button>

          <Button size="sm" className="h-7 rounded-lg text-[10px] font-bold bg-indigo-600 hover:bg-indigo-700 text-white gap-1 shadow-2xs">
            <Plus size={13} /> New Admission
          </Button>
        </div>
      </div>

      {/* 2. STRICT 6 CARDS IN A SINGLE ROW ON DESKTOP (xl:grid-cols-6) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
        {kpiCards.map((card, index) => {
          const theme = COLOR_THEMES[card.color];
          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.02 }}
              whileHover={{ y: -2 }}
            >
              <Card className={`border ${theme.border} shadow-2xs rounded-xl p-3 bg-white relative overflow-hidden transition-all duration-200 hover:shadow-xs flex flex-col justify-between h-full ${theme.bg}`}>
                
                {/* Top Row: Icon on Left, Increase/Decrease Badge on Right */}
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-1.5 rounded-lg ${theme.iconBg} flex items-center justify-center shrink-0`}>
                    {card.icon}
                  </div>
                  <Badge className={`${theme.badge} border-none font-bold text-[9px] px-1.5 py-0.5 rounded-md flex items-center gap-0.5`}>
                    {card.isPositive ? <ArrowUp size={9} /> : <ArrowDown size={9} />}
                    <span>{card.change}</span>
                  </Badge>
                </div>

                {/* Center / Bottom: Bold Number & Descriptive Text Underneath */}
                <div className="mt-1">
                  <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight leading-none">
                    <AnimatedNumber
                      value={card.value}
                      prefix={card.prefix}
                      suffix={card.suffix}
                      decimals={card.decimals}
                    />
                  </h3>
                  <p className="text-[10px] font-bold text-slate-500 mt-1 line-clamp-1">
                    {card.subtext}
                  </p>
                </div>

              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* 3. CHARTS ROW: FEE COLLECTION RATE (LEFT) & ENROLLMENT BY GENDER (RIGHT) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Left Chart (8 Columns): Fee Collection Rate Graph */}
        <Card className="lg:col-span-8 border border-slate-200/80 shadow-2xs rounded-xl bg-white p-4 flex flex-col justify-between">
          <CardHeader className="p-0 pb-3 flex flex-row items-center justify-between border-b border-slate-100">
            <div>
              <div className="flex items-center gap-1.5">
                <Wallet size={16} className="text-emerald-600" />
                <CardTitle className="text-xs font-extrabold text-slate-900">
                  Fee Collection Rate & Monthly Revenue
                </CardTitle>
              </div>
              <CardDescription className="text-[10px] text-slate-400 mt-0.5">
                Monthly recovery percentage vs. total collections
              </CardDescription>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-[10px] font-bold text-slate-600">
                <span className="size-2 rounded-full bg-emerald-500" /> Collection Rate (%)
              </span>
              <span className="hidden sm:flex items-center gap-1 text-[10px] font-bold text-slate-600">
                <span className="size-2 rounded-full bg-indigo-600" /> Target (85%)
              </span>
            </div>
          </CardHeader>

          <CardContent className="p-0 pt-3">
            <div className="h-[210px] sm:h-[230px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={FEE_COLLECTION_GRAPH} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                  <defs>
                    <linearGradient id="feeRateGlow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#64748b', fontWeight: 600 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: '#64748b', fontWeight: 600 }} axisLine={false} domain={[60, 100]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      borderRadius: '8px',
                      border: 'none',
                      color: '#fff',
                      fontSize: '11px',
                      padding: '8px 12px'
                    }}
                    formatter={(value: any) => [`${value}%`, 'Collection Rate']}
                  />
                  <Area type="monotone" dataKey="collectionRate" name="Collection Rate (%)" stroke="#10b981" strokeWidth={2.5} fill="url(#feeRateGlow)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Right Chart (4 Columns): Enrollment By Gender */}
        <Card className="lg:col-span-4 border border-slate-200/80 shadow-2xs rounded-xl bg-white p-4 flex flex-col justify-between">
          <CardHeader className="p-0 pb-3 flex flex-row items-center justify-between border-b border-slate-100">
            <div>
              <div className="flex items-center gap-1.5">
                <Users2 size={16} className="text-indigo-600" />
                <CardTitle className="text-xs font-extrabold text-slate-900">
                  Enrollment By Gender
                </CardTitle>
              </div>
              <CardDescription className="text-[10px] text-slate-400 mt-0.5">
                Student demographic distribution
              </CardDescription>
            </div>
            <Badge className="bg-indigo-50 text-indigo-700 border-indigo-100 text-[9px] font-bold">
              1,284 Total
            </Badge>
          </CardHeader>

          <CardContent className="p-0 pt-2 flex flex-col items-center justify-between flex-1">
            {/* Donut Chart with Center Ratio */}
            <div className="h-[145px] w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={GENDER_ENROLLMENT_DATA}
                    innerRadius={45}
                    outerRadius={63}
                    paddingAngle={5}
                    dataKey="count"
                  >
                    {GENDER_ENROLLMENT_DATA.map((entry, index) => (
                      <Cell key={`gender-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: any, name: any) => [`${value} Students`, name]} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-base font-black text-slate-900 tracking-tight">54% / 46%</span>
                <span className="text-[8px] font-bold text-slate-400 uppercase">M / F Ratio</span>
              </div>
            </div>

            {/* Gender Stats Breakdown Pills */}
            <div className="w-full space-y-2 pt-1 border-t border-slate-100">
              <div className="flex items-center justify-between p-1.5 rounded-lg bg-indigo-50/50 border border-indigo-100/50">
                <div className="flex items-center gap-2">
                  <span className="size-2.5 rounded-full bg-indigo-600" />
                  <span className="text-[11px] font-bold text-slate-800">Male Students</span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-black text-slate-900">693</span>
                  <span className="text-[10px] font-bold text-indigo-600 ml-1.5">(54%)</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-1.5 rounded-lg bg-pink-50/50 border border-pink-100/50">
                <div className="flex items-center gap-2">
                  <span className="size-2.5 rounded-full bg-pink-500" />
                  <span className="text-[11px] font-bold text-slate-800">Female Students</span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-black text-slate-900">591</span>
                  <span className="text-[10px] font-bold text-pink-600 ml-1.5">(46%)</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>

      {/* 4. SECONDARY SECTION: AI PREDICTOR NODE & RECENT ADMISSIONS STREAM */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* AI Predictor Operations Node (6 Columns) */}
        <Card className="lg:col-span-6 border-none shadow-md bg-slate-900 text-white rounded-xl p-4 sm:p-5 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -top-10 -right-10 size-32 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none" />
          
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-white/10 rounded-lg">
                  <BrainCircuit size={16} className="text-amber-400" />
                </div>
                <div>
                  <h3 className="text-xs font-black text-white">AI Operations Node</h3>
                  <p className="text-[9px] text-slate-400 font-medium">Predictive Intelligence</p>
                </div>
              </div>
              <Badge className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[8px] font-bold px-1.5 py-0">
                Active Node
              </Badge>
            </div>

            <div className="grid grid-cols-3 gap-2.5 my-3">
              <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                <p className="text-[9px] text-slate-400 font-bold uppercase">Retention Rate</p>
                <p className="text-sm font-black text-emerald-400 mt-0.5">94.2%</p>
              </div>
              <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                <p className="text-[9px] text-slate-400 font-bold uppercase">Recovery Stream</p>
                <p className="text-sm font-black text-amber-400 mt-0.5">88.5%</p>
              </div>
              <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                <p className="text-[9px] text-slate-400 font-bold uppercase">Staff Allocation</p>
                <p className="text-sm font-black text-indigo-400 mt-0.5">96.0%</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 pt-2 border-t border-white/10">
            <p className="text-[11px] text-slate-300 font-medium italic line-clamp-1">
              "Predicts +5.2% O-Levels influx next quarter. Allocate 2 extra faculty nodes."
            </p>
            <Button size="sm" className="h-7 shrink-0 bg-white text-slate-900 hover:bg-slate-100 rounded-lg font-bold text-[10px] uppercase tracking-wider transition-all">
              Execute <ArrowUpRight size={12} className="ml-1" />
            </Button>
          </div>
        </Card>

        {/* Admissions Stream Table (6 Columns - COMPACT) */}
        <Card className="lg:col-span-6 border border-slate-200/80 shadow-2xs rounded-xl bg-white p-3.5 sm:p-4 flex flex-col justify-start gap-2.5">
          <CardHeader className="p-0 pb-2 flex flex-row items-center justify-between border-b border-slate-100">
            <div>
              <CardTitle className="text-xs font-extrabold text-slate-900">Recent Applications Stream</CardTitle>
              <CardDescription className="text-[10px] text-slate-400">Live admission queue</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="h-6 text-[10px] font-bold text-indigo-600 p-0 hover:bg-transparent">
              View Queue
            </Button>
          </CardHeader>

          <div className="space-y-1.5">
            {[
              { name: "Ali Malik", dept: "O-Levels Science", status: "Active", time: "10m ago" },
              { name: "Sarah Khan", dept: "A-Levels Pre-Med", status: "Pending", time: "25m ago" },
              { name: "Hamza Raza", dept: "Middle Sec Grade 8", status: "Active", time: "1h ago" },
              { name: "Zainab Bibi", dept: "O-Levels Commerce", status: "Review", time: "2h ago" },
            ].map((applicant, i) => (
              <div key={i} className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 transition-colors border border-slate-100/70 bg-slate-50/40">
                <div className="flex items-center gap-2.5">
                  <div className="size-7 rounded-full bg-slate-900 text-white font-black text-[9px] flex items-center justify-center shrink-0">
                    {applicant.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-slate-900 leading-tight">{applicant.name}</p>
                    <p className="text-[9px] text-slate-400 font-semibold">{applicant.dept}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-medium text-slate-400">{applicant.time}</span>
                  <Badge className={`text-[8px] font-bold px-1.5 py-0.5 border-none ${
                    applicant.status === 'Active' ? 'bg-emerald-50 text-emerald-600' :
                    applicant.status === 'Pending' ? 'bg-amber-50 text-amber-600' : 'bg-indigo-50 text-indigo-600'
                  }`}>
                    {applicant.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

      </div>
    </div>
  );
}

// --- SKELETON LOADING STATE ---
function DashboardSkeleton() {
  return (
    <div className="space-y-4 animate-pulse p-1">
      <div className="h-14 bg-slate-200/70 rounded-xl w-full" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-24 bg-slate-200/70 rounded-xl" />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-8 h-60 bg-slate-200/70 rounded-xl" />
        <div className="lg:col-span-4 h-60 bg-slate-200/70 rounded-xl" />
      </div>
    </div>
  );
}
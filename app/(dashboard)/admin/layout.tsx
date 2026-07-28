import { ShieldCheck, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/app-sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset className="relative min-h-screen overflow-hidden bg-[#F7F1E7] text-slate-900">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.03)_1px,transparent_1px)] bg-size-[34px_34px] opacity-40" />
                <div className="absolute -left-24 top-0 size-72 rounded-full bg-amber-200/30 blur-3xl" />
                <div className="absolute right-0 top-24 size-80 rounded-full bg-slate-200/50 blur-3xl" />

                <div className="relative z-10">
                    <header className="border-b border-slate-200/70 bg-[#FCF9F3]/90 backdrop-blur-xl">
                        <div className="mx-auto flex w-full max-w-[1800px] flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8 xl:flex-row xl:items-center xl:justify-between">
                            <div>
                                <div className="flex flex-wrap items-center gap-3">
                                    <Badge className="rounded-full border border-slate-200 bg-slate-900 px-3 py-1 text-[9px] font-black uppercase tracking-[0.32em] text-white">
                                        <ShieldCheck size={12} className="mr-1" /> Admin Atelier
                                    </Badge>
                                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">
                                        Principal console
                                    </span>
                                </div>
                                <h1 className="mt-2 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
                                    Classic administrative workspace
                                </h1>
                                <p className="mt-2 max-w-2xl text-sm font-medium leading-6 text-slate-500">
                                    A refined control surface for admissions, fees, permissions, and school operations.
                                </p>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="hidden rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 shadow-sm lg:block">
                                    <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">Session</p>
                                    <p className="mt-1 text-sm font-black text-slate-900">Principal Admin</p>
                                </div>
                                <Button className="h-11 rounded-2xl bg-slate-900 px-5 text-[11px] font-black uppercase tracking-[0.2em] text-white shadow-lg shadow-slate-200 hover:bg-slate-800">
                                    <Sparkles size={14} className="mr-2" />
                                    Command Center
                                </Button>
                            </div>
                        </div>
                    </header>

                    <main className="mx-auto w-full max-w-[1800px] px-4 py-6 sm:px-6 lg:px-8">
                        {children}
                    </main>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { AdminHeader } from "@/components/dashboard/admin-header";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset className="relative min-h-screen bg-slate-50/60 text-slate-900">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none opacity-50" />
                <div className="absolute -left-20 top-0 size-96 rounded-full bg-indigo-500/5 blur-3xl pointer-events-none" />
                <div className="absolute right-0 top-40 size-96 rounded-full bg-emerald-500/5 blur-3xl pointer-events-none" />

                <div className="relative z-10 flex min-h-screen flex-col">
                    <AdminHeader />
                    <main className="flex-1 w-full max-w-[1800px] mx-auto px-4 py-6 sm:px-6 lg:px-8">
                        {children}
                    </main>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
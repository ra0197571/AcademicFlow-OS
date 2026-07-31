import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { TeacherHeader } from "@/components/dashboard/teacher-header";

export default function TeacherDashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset className="relative h-screen bg-[#FDFDFD] text-slate-900 overflow-hidden flex flex-col">
                {/* Background Patterns */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none opacity-50" />

                {/* 1. FIXED HEADER */}
                <TeacherHeader />

                {/* 2. SCROLLABLE CONTENT AREA */}
                <main className="relative z-10 flex-1 overflow-y-auto scrollbar-hide px-4 py-6 lg:px-8">
                    <div className="w-full max-w-[1800px] mx-auto">
                        {children}
                    </div>
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
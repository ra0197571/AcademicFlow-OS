import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/app-sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-[#F8FAFC] overflow-hidden">
        {/* min-w-0 aur overflow-x-hidden horizontal scroll ko rokty hain */}
        <main className="flex-1 w-full min-w-0 overflow-y-auto overflow-x-hidden">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
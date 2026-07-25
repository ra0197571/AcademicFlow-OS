import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/app-sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AcademicFlow OS",
  description: "Enterprise Academy Management System",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-[#F8FAFC] antialiased`}>
        <TooltipProvider>
          {/* Sidebar yahan rakhne se ye har page par nazar aayega */}
          <SidebarProvider>
            <AppSidebar />
            <div className="flex-1 flex flex-col min-h-screen">
              {children}
            </div>
          </SidebarProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
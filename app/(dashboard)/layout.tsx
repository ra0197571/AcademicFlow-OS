export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#fbf7f0_0%,#f8fafc_42%,#f3f4f6_100%)] text-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.18),transparent_28%),radial-gradient(circle_at_top_right,rgba(15,23,42,0.08),transparent_22%)]" />
      <div className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-amber-100/40 to-transparent" />
      <main className="relative min-h-screen">
        {children}
      </main>
    </div>
  );
}
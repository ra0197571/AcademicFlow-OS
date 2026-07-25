// app/(auth)/layout.tsx
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white p-4">
      {children}
    </div>
  );
}
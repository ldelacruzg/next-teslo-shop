export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="bg-red-400">
      {children}
    </main>
  );
}
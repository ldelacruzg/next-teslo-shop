export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex justify-center">
      <div className="w-full sm:max-w-96 px-4">
        {children}
      </div>
    </main>
  );
}
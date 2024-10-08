import { Footer, Sidebar, TopMenu } from "@/components";

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="px-4 sm:px-10">
      <TopMenu />
      <Sidebar />
      {children}
      <Footer />
    </main>
  );
}
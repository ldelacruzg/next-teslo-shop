import type { Metadata } from "next";
import "./globals.css";
import { inter } from "@/config/fonts";
import { UserSessionProvider } from "@/components";

export const metadata: Metadata = {
  title: {
    template: "%s | Teslo Shop",
    default: "Home | Teslo Shop"
  },
  description: "Tienda virtual de productos Teslo Shop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserSessionProvider>
          {children}
        </UserSessionProvider>
      </body>
    </html>
  );
}

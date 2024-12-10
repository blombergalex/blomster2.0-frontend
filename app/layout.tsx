import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/footer";
import { QueryClientProvider } from "@/providers/query-client-provider";
import { Toaster } from 'Sonner';
import { NextUIProvider } from "@nextui-org/react";
import Header from "@/components/header";

export const metadata: Metadata = {
  title: "Blomster 2.0",
  description: "Where ideas bloom",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="dark flex flex-col min-h-screen text-primary bg-background">
        <NextUIProvider>
          <QueryClientProvider>
            <Header />
            {children}
            <Footer />
            <Toaster />
          </QueryClientProvider>
        </NextUIProvider>
      </body>
    </html>
  );
}

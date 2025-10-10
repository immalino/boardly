import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { QueryProviders } from "@/components/query-provider";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Boardly - Your Collaborative Task Manager",
  description:
    "Organize, track, and collaborate on tasks seamlessly with Boardly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "antialiased min-h-screen")}>
        <QueryProviders>
          <Toaster />
          {children}
        </QueryProviders>
      </body>
    </html>
  );
}

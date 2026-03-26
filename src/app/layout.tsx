import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import DevAlert from "@/components/shared/DevAlert";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Althaf Kumara Web",
  description: "Mobile Developer Specialist (Flutter/Dart) & Full-Stack Engineer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <DevAlert />
      </body>
    </html>
  );
}

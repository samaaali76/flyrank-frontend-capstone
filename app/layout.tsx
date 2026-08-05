import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "Samaa Ali | Portfolio",
  description: "Front-end developer portfolio — built as part of the FlyRank AI Internship.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={cn("h-full antialiased", "font-sans", geist.variable)}>
      <body className="min-h-full flex flex-col bg-white text-neutral-900 font-sans">
        <Header />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}

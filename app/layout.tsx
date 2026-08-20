import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Geist } from "next/font/google";
import { Lobster_Two } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});
const lobsterTwo = Lobster_Two({subsets:['latin'],weight:['400','700'],variable:'--font-display'});

export const metadata: Metadata = {
  title: "Samaa Ali | Portfolio",
  description: "Front-end developer portfolio — built as part of the FlyRank AI Internship.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={cn("h-full antialiased", "font-sans", geist.variable, lobsterTwo.variable)}>
            <body className="min-h-full flex flex-col bg-white text-neutral-900 font-sans">
        <Header />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}

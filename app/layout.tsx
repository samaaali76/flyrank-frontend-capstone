import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "Samaa Ali | Portfolio",
  description: "Front-end developer portfolio — built as part of the FlyRank AI Internship.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-white text-neutral-900 font-sans">
        <Header />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}

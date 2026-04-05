import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Konfigurasi Font Inter (Standard Corporate Modern)
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "builtby.ikwnhanif | Fullstack Engineer & Visual Storyteller",
  description:
    "Personal portfolio of Hanif, a Fullstack Developer specializing in Go Fiber, Next.js, and Cloud Engineering. Crafting digital excellence with code and lens.",
  keywords: [
    "Software Engineer",
    "Golang",
    "Next.js",
    "Portfolio",
    "ikwnhanif",
    "Web Developer Indonesia",
  ],
  authors: [{ name: "Hanif", url: "https://builtby.outsys.space" }],
  creator: "ikwnhanif",
  icons: {
    icon: "/favicon.ico", // Pastikan kamu taruh file favicon di folder /public
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://builtby.outsys.space",
    title: "builtby.ikwnhanif",
    description: "Engineering digital excellence with Go Fiber & Next.js",
    siteName: "builtby.ikwnhanif",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="scroll-smooth">
      <body
        className={`${inter.variable} font-sans antialiased bg-white text-slate-900 min-h-screen flex flex-col`}
      >
        {/* Main Content Wrapper */}
        <main className="flex-grow">{children}</main>

        {/* Global UI Elements (Optional: Toast, Modals, etc.) */}
        <div id="portal-root" />

        {/* Footer Credit (Hidden in Dashboard, but useful globally) */}
        <footer className="sr-only">
          Built with passion by ikwnhanif using Next.js and Go Fiber.
        </footer>
      </body>
    </html>
  );
}

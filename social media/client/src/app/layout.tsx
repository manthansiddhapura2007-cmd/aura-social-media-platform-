import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Navbar } from "@/components/layout/Navbar";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/AuthContext";
import { CinematicBackground } from "@/components/layout/CinematicBackground";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aura | Connect, Share, Inspire",
  description: "A modern full-stack social media platform for the next generation.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}>
        <AuthProvider>
          <CinematicBackground />
          <div className="flex flex-col min-h-screen relative z-10 transition-all duration-300">
            <Header />
            <main className="flex-1 pb-20 md:pb-0 max-w-4xl mx-auto w-full">
              {children}
            </main>
            <Navbar />
            <Toaster position="top-center" reverseOrder={false} />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}



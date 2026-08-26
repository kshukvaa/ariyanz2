import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import PageTransition from "@/components/PageTransition";
import InteractiveProvider from "@/components/InteractiveProvider";
import SiteChrome from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: "آریاز | رشد انسان‌ها، توانمندسازی سازمان‌ها",
  description:
    "پلتفرم یکپارچه توسعه منابع انسانی، رهبری، مهارت‌های نرم و تحول سازمانی؛ یادگیری، ابزارهای حرفه‌ای، کوچینگ و راهکارهای سازمانی در یک اکوسیستم هوشمند",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="/fonts/fonts.css" />
      </head>
      <body className="antialiased bg-white text-gray-900" style={{ fontFamily: "'Vazirmatn', system-ui, sans-serif" }}>
        <InteractiveProvider>
          <PageTransition>
            {children}
          </PageTransition>
        </InteractiveProvider>
        {/* Outside PageTransition on purpose: the bar must survive route
            changes, and nothing that animates should ever be its ancestor.
            SiteChrome drops both on /org, where the panel supplies its own. */}
        <SiteChrome />
        <Toaster />
      </body>
    </html>
  );
}

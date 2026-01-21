import "./globals.css";

// assets
import { fontSans, fontMono } from "@/assets/fonts";

// types
import type { Metadata } from "next";

// constants
export const metadata: Metadata = {
  title: "Benefit Finance",
  description:
    "With an all-in-one platform that offers AI-powered budgeting, spending insights, investment tools, estate and tax planning, and access to expert financial advice, you can unify your finances and accumulate wealth.",
  authors: [{ name: "Remi" }],
  robots: { index: true, follow: true },
  category: "finance",
  other: { google: "notranslate" },
};

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" translate="no" suppressHydrationWarning>
      <body className={`${fontSans.variable} ${fontMono.variable} font-mono antialiased`}>{children}</body>
    </html>
  );
}

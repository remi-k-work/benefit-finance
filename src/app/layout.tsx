import "./globals.css";

// services, features, and other libraries
import { cn } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/next";

// components
import { ThemeProvider } from "next-themes";
import { RegistryProvider } from "@effect-atom/atom-react";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/custom/sonner";

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
  keywords: [
    "personal finance app",
    "AI finance assistant",
    "budgeting app",
    "wealth management platform",
    "investment tracking",
    "financial planning",
    "money management",
    "AI budgeting tool",
    "expense tracking",
    "spending insights",
    "estate planning",
    "tax planning",
    "investment tools",
    "financial dashboard",
    "personal wealth tracker",
    "smart finance app",
    "financial analytics",
    "finance management software",
    "AI-powered finance platform",
    "wealth building app",
  ],
  other: { google: "notranslate" },

  metadataBase: new URL("https://benefit-finance.remiforge.dev"),
  alternates: { canonical: "/" },
};

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" translate="no" suppressHydrationWarning>
      <body
        className={cn(
          `${fontSans.variable} ${fontMono.variable} grid font-mono antialiased`,
          "grid-cols-[1fr] grid-rows-[auto_1fr_auto] [grid-template-areas:'header''main''footer']",
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <RegistryProvider>
            {children}
            <Footer />
            <Toaster richColors />
            <Analytics debug={false} />
          </RegistryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

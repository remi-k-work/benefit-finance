import "./globals.css";

// services, features, and other libraries
import { cn } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/next";

// components
import { ThemeProvider } from "next-themes";

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
      <body
        className={cn(
          `${fontSans.variable} ${fontMono.variable} grid font-mono antialiased`,
          "grid-cols-[1fr] grid-rows-[auto_1fr] [grid-template-areas:'header''main']",
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <Analytics debug={false} />
        </ThemeProvider>
      </body>
    </html>
  );
}

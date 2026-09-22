import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AINode — payment infrastructure for AI agents (demo)",
  description:
    "Prototype demo: publish an API and get paid per call, or call an API and pay only for what you use. Synthetic data throughout — not a live product.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

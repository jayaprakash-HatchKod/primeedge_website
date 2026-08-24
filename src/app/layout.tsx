import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://primeedge.example.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "PrimeEdge Software Institute | Build Skills. Build Careers.",
    template: "%s | PrimeEdge Software Institute",
  },
  description:
    "PrimeEdge Software Institute offers industry-led software training with live sessions, expert mentors, and career guidance. Explore full-stack, cloud, and data courses designed to get you hired.",
  keywords: [
    "PrimeEdge Software Institute",
    "software training",
    "coding bootcamp",
    "full stack development course",
    "software courses India",
    "career guidance IT training",
  ],
  authors: [{ name: "PrimeEdge Software Institute" }],
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "PrimeEdge Software Institute",
    title: "PrimeEdge Software Institute | Build Skills. Build Careers.",
    description:
      "Industry-led software training with live sessions, expert mentors, and real career guidance.",
  },
  twitter: {
    card: "summary_large_image",
    title: "PrimeEdge Software Institute",
    description:
      "Industry-led software training with live sessions, expert mentors, and real career guidance.",
  },
  icons: {
    icon: "/icon.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0F172A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}

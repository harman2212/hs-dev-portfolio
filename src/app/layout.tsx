import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/portfolio/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Harman | Full Stack Developer - Portfolio",
  description:
    "Full Stack Developer specializing in Next.js, TypeScript, React, and AI applications. Available for freelance work.",
  keywords: [
    "Harman",
    "Full Stack Developer",
    "Next.js",
    "TypeScript",
    "React",
    "AI",
    "Freelance Developer",
    "Web Developer",
    "Portfolio",
  ],
  authors: [{ name: "Harman", url: "https://github.com/harman2212" }],
  icons: {
    icon: "https://avatars.githubusercontent.com/u/133370119?v=4",
  },
  openGraph: {
    title: "Harman | Full Stack Developer - Portfolio",
    description:
      "Full Stack Developer specializing in Next.js, TypeScript, React, and AI applications. Available for freelance work.",
    url: "https://github.com/harman2212",
    siteName: "Harman's Portfolio",
    type: "website",
    images: [
      {
        url: "https://avatars.githubusercontent.com/u/133370119?v=4",
        alt: "Harman",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Harman | Full Stack Developer - Portfolio",
    description:
      "Full Stack Developer specializing in Next.js, TypeScript, React, and AI applications.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

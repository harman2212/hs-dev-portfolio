import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/portfolio/ThemeProvider";
import { SITE_URL, SITE_NAME, profileData } from "@/lib/constants";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Harman | Full Stack Developer - Portfolio",
  description:
    "Full Stack Developer specializing in Next.js, TypeScript, React & AI. Open to freelance projects.",
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
  creator: "Harman",
  icons: {
    icon: "https://avatars.githubusercontent.com/u/133370119?v=4",
  },
  openGraph: {
    title: "Harman | Full Stack Developer - Portfolio",
    description:
      "Full Stack Developer specializing in Next.js, TypeScript, React & AI. Open to freelance projects.",
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://avatars.githubusercontent.com/u/133370119?v=4",
        alt: "Harman - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Harman | Full Stack Developer - Portfolio",
    description:
      "Full Stack Developer specializing in Next.js, TypeScript, React & AI. Open to freelance projects.",
    images: ["https://avatars.githubusercontent.com/u/133370119?v=4"],
    creator: "@harman2212",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
};

// JSON-LD structured data for SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Harman",
      url: SITE_URL,
      image: profileData.avatar,
      jobTitle: "Full Stack Developer",
      description: profileData.tagline,
      sameAs: [profileData.github, profileData.fiverr],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Punjab",
        addressCountry: "IN",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: profileData.tagline,
      author: {
        "@id": `${SITE_URL}/#person`,
      },
    },
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: "Harman | Full Stack Developer - Portfolio",
      isPartOf: {
        "@id": `${SITE_URL}/#website`,
      },
      about: {
        "@id": `${SITE_URL}/#person`,
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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

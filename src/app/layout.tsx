import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { getSiteConfig, getLocale } from "@/data/config";
import { generateJsonLdScript } from "@/data/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["300", "400", "600", "700", "800"],
  subsets: ["latin"],
});

const defaultLang = 'pt-BR';
const defaultLocale = getLocale(defaultLang);
const defaultSiteConfig = getSiteConfig(defaultLang);

export const metadata: Metadata = {
  title: defaultSiteConfig.title,
  description: defaultSiteConfig.description,
  keywords: defaultSiteConfig.keywords,
  authors: [{ name: defaultSiteConfig.author }],
  openGraph: {
    title: defaultLocale.metadata.ogTitle,
    description: defaultLocale.metadata.ogDescription,
    type: "website",
    siteName: defaultSiteConfig.title,
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: defaultLocale.metadata.twitterTitle,
    description: defaultLocale.metadata.twitterDescription,
  },
  other: {
    "twitter:image": "/profile.jpg",
    "og:image": "/profile.jpg",
    "og:image:width": "1200",
    "og:image:height": "630",
    "og:image:alt": `${defaultSiteConfig.author} - Desenvolvedor Full Stack`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLdScript = generateJsonLdScript();

  return (
    <html lang="pt-BR" suppressHydrationWarning className="dark">
      <head dangerouslySetInnerHTML={{ __html: jsonLdScript }} />
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${poppins.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}

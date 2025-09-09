import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

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

export const metadata: Metadata = {
  title: "Gregory Vallim - Portfólio Pessoal",
  description: "Oi, sou Gregory Vallim, venha conhecer meus projetos, algum deles você deve gostar 😊",
  keywords: ["Gregory Vallim", "portfólio", "desenvolvimento", "projetos", "profissional", "web", "mobile", "ui", "ux"],
  authors: [{ name: "Gregory Vallim" }],
  openGraph: {
    title: "Gregory Vallim - Portfólio Pessoal",
    description: "Oi, sou Gregory Vallim, venha conhecer meus projetos, algum deles você deve gostar 😊",
    type: "website",
    siteName: "Gregory Vallim",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gregory Vallim - Portfólio Pessoal",
    description: "Oi, sou Gregory Vallim, venha conhecer meus projetos, algum deles você deve gostar 😊",
  },
  other: {
    "twitter:image": "/profile.jpg",
    "og:image": "/profile.jpg",
    "og:image:width": "1200",
    "og:image:height": "630",
    "og:image:alt": "Gregory Vallim - Desenvolvedor Full Stack",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${poppins.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}

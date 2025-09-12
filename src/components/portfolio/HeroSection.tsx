"use client";

import { Button } from "@/components/ui/button";
import VideoBackground from "@/components/ui/VideoBackground";
import { SiteConfig, Locale } from "@/data/types";

interface HeroSectionProps {
  siteConfigData: SiteConfig;
  locale: Locale;
  visitCount: number;
  loading: boolean;
}

export default function HeroSection({ 
  siteConfigData, 
  locale, 
  visitCount, 
  loading 
}: HeroSectionProps) {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden parallax parallax-bg" style={{ backgroundImage: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 50%, rgba(16, 185, 129, 0.1) 100%)' }}>
      <VideoBackground
        videoSrc={siteConfigData.videoBackgroundUrl}
        fallbackImage="/videos/placeholder.jpg"
        className="absolute inset-0"
      >
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
        <div className="relative text-center text-white px-4 flex flex-col items-center justify-center h-full max-w-7xl mx-auto z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-8 text-gradient-hero leading-none tracking-tight animate-fade-in">
            {siteConfigData.hero.title}
          </h1>

          {visitCount > 0 && !loading && (
            <div className="mb-8 p-4 bg-card/90 backdrop-blur-md rounded-lg border border-border shadow-lg">
              <p className="text-sm font-medium text-muted-foreground flex items-center justify-center gap-2">
                <span className="text-primary font-semibold">{visitCount}</span>
                visitas únicas
              </p>
            </div>
          )}

          <p className="text-xl sm:text-2xl md:text-3xl mb-12 leading-relaxed max-w-5xl mx-auto text-muted-foreground">
            {siteConfigData.hero.subtitle}
          </p>
          
          <div className="flex flex-col lg:flex-row gap-6 justify-center w-full max-w-2xl">
            <Button
              onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
              size="lg"
              className="btn-clean text-base font-semibold px-10 py-5 rounded-lg"
              aria-label={locale.ui.buttons.viewProjects}
            >
              {siteConfigData.hero.ctaText}
            </Button>
            <Button
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              variant="outline"
              size="lg"
              className="border-border text-base font-semibold px-10 py-5 rounded-lg"
              aria-label={locale.ui.buttons.contact}
            >
              {siteConfigData.contact.title}
            </Button>
          </div>
        </div>
      </VideoBackground>
    </section>
  );
}
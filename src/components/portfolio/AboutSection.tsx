"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import TagTooltip from "@/components/ui/TagTooltip";
import SkillsGridCarousel from "@/components/ui/SkillsGridCarousel";
import { SiteConfig, Locale, ProfileData } from "@/data/types";
import { skillsData } from "@/data/skills";

interface AboutSectionProps {
  siteConfigData: SiteConfig;
  locale: Locale;
  profileData: ProfileData;
  onOpenProfileModal: () => void;
  onOpenRecommendationsModal: () => void;
}

export default function AboutSection({ 
  siteConfigData, 
  locale, 
  profileData,
  onOpenProfileModal,
  onOpenRecommendationsModal 
}: AboutSectionProps) {
  return (
    <section id="about" className="py-16 md:py-24 px-4 relative overflow-hidden">
      <div className="parallax-bg absolute inset-0" style={{
        backgroundImage: 'radial-gradient(ellipse at 20% 80%, rgba(139, 92, 246, 0.08) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(59, 130, 246, 0.08) 0%, transparent 50%)',
        backgroundSize: '400px 400px, 300px 300px',
        backgroundPosition: '0 0, 100% 100%',
        zIndex: -1
      }} />
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16 section-fade">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-gradient-hero">
            {siteConfigData.about.title}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {siteConfigData.about.description}
          </p>
        </div>
        
        <div className="grid grid-hero gap-8 md:gap-12 mb-16 md:mb-20 items-center">
          <div className="flex justify-center lg:justify-start order-2 lg:order-1">
            <div className="relative cursor-pointer group" onClick={onOpenProfileModal}>
              <img
                src="/profile.jpg"
                alt="Foto de perfil de Gregory Vallim"
                className="w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-full object-cover shadow-2xl border-4 border-border/50 group-hover:border-primary transition-all duration-300 animate-glow"
              />
            </div>
          </div>

          <div className="space-y-6 text-center lg:text-left">
            <h3 className="text-3xl font-bold">{profileData.name}</h3>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {siteConfigData.about.description}
            </p>
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              <TagTooltip emoji="🚀" title={locale.ui.tags.innovation} description="Sempre buscando inovar">
                <Badge variant="secondary" className="px-4 py-2 text-sm">
                  {locale.ui.tags.innovation}
                </Badge>
              </TagTooltip>
              <TagTooltip emoji="💡" title={locale.ui.tags.creativity} description="Criatividade essencial">
                <Badge variant="secondary" className="px-4 py-2 text-sm">
                  {locale.ui.tags.creativity}
                </Badge>
              </TagTooltip>
              <TagTooltip emoji="⚡" title={locale.ui.tags.performance} description="Performance obrigatória">
                <Badge variant="secondary" className="px-4 py-2 text-sm">
                  {locale.ui.tags.performance}
                </Badge>
              </TagTooltip>
              <TagTooltip emoji="🌱" title={locale.ui.tags.sustainability} description="Desenvolvimento sustentável">
                <Badge variant="secondary" className="px-4 py-2 text-sm">
                  {locale.ui.tags.sustainability}
                </Badge>
              </TagTooltip>
            </div>
            
            <div className="pt-4">
              <Button
                onClick={onOpenRecommendationsModal}
                size="lg"
                className="btn-clean text-primary-foreground font-semibold px-8 py-4 rounded-lg"
                aria-label={locale.ui.buttons.recommendations}
              >
                {locale.ui.buttons.recommendations}
              </Button>
            </div>
          </div>
        </div>

        <div className="text-center mb-12 relative z-10">
          <h3 className="text-3xl font-bold mb-6 text-gradient-hero animate-fade-in">Minhas Habilidades</h3>
        </div>
        <SkillsGridCarousel
          skills={skillsData.map((skill, index) => ({
            title: skill.name,
            description: skill.description,
            icon: skill.icon,
            color: ["bg-primary", "bg-secondary", "bg-accent", "bg-destructive", "bg-muted", "bg-card"][index % 6],
            emoji: ["🚀", "📱", "🎨", "🤖", "☁️", "🗄️"][index % 6],
            proficiency: skill.proficiency,
          }))}
        />
      </div>
    </section>
  );
}
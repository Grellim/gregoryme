"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PortfolioCard from "@/components/portfolio/PortfolioCard";
import VideoBackground from "@/components/ui/VideoBackground";
import ProfileModal from "@/components/ui/ProfileModal";
import TagTooltip from "@/components/ui/TagTooltip";
import SkillsGridCarousel from "@/components/ui/SkillsGridCarousel";
import { skillsData } from "@/data/skills";
import { profileData } from "@/data/profile";
import RecommendationsModal from "@/components/ui/RecommendationsModal";
import ScrollToTop from "@/components/ui/ScrollToTop";
import { FaDiscord, FaInstagram, FaTiktok, FaTwitter, FaEnvelope } from "react-icons/fa";
import { SiteConfig, Locale, SocialLink, FooterButton } from "@/data/types";
import { ProfileData } from "@/data/profile";

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  projectUrl: string;
  moreInfo: string;
  galleryImages: string[];
}

interface ClientHomeProps {
  siteConfigData: SiteConfig;
  locale: Locale;
  socialLinks: SocialLink[];
  footerButtons: FooterButton[];
  portfolioData: Array<{
    id: string;
    title: string;
    description: string;
    image: string;
    technologies: string[];
    githubUrl?: string;
    liveUrl?: string;
    featured?: boolean;
    moreInfo?: string;
    galleryImages?: string[];
  }>;
  profileData: ProfileData;
}

export default function ClientHome({ 
  siteConfigData, 
  locale, 
  socialLinks, 
  footerButtons, 
  portfolioData, 
  profileData 
}: ClientHomeProps) {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isRecommendationsModalOpen, setIsRecommendationsModalOpen] = useState(false);
  const [visitCount, setVisitCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const trackVisit = async () => {
      try {
        const ipResponse = await fetch('https://ipapi.co/json/');
        const ipData = await ipResponse.json();
        const clientIp = ipData.ip;

        if (clientIp) {
          await fetch('/api/visits', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ip: clientIp }),
          });

          const countResponse = await fetch('/api/visits');
          const countData = await countResponse.json();
          setVisitCount(countData.count);
        }
      } catch (error) {
        console.error('Error tracking visit:', error);
        // Optionally show user-friendly toast error
      } finally {
        setLoading(false);
      }
    };

    trackVisit();
  }, []);

  const openProfileModal = () => setIsProfileModalOpen(true);
  const closeProfileModal = () => setIsProfileModalOpen(false);

  const openRecommendationsModal = () => setIsRecommendationsModalOpen(true);
  const closeRecommendationsModal = () => setIsRecommendationsModalOpen(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <main className="pt-16">
        {/* Hero Section */}
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

        {/* About Section */}
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
                <div className="relative cursor-pointer group" onClick={openProfileModal}>
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
                    onClick={openRecommendationsModal}
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

        {/* Portfolio Section */}
        <section id="projects" className="py-16 md:py-24 px-4 bg-background/95">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 md:mb-16 section-fade">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-gradient-hero">
                {siteConfigData.hero.ctaText}
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                {siteConfigData.about.description}
              </p>
            </div>
            <div className="grid-portfolio">
              {portfolioData.map((project) => (
                <PortfolioCard
                  key={project.id}
                  id={project.id}
                  title={project.title}
                  description={project.description}
                  imageUrl={project.imageUrl}
                  tags={project.tags}
                  projectUrl={project.projectUrl}
                  moreInfo={project.moreInfo}
                  galleryImages={project.galleryImages}
                  locale={locale}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 md:py-24 px-4 parallax">
          <div className="max-w-4xl mx-auto text-center section-fade">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-gradient-hero">
              {siteConfigData.contact.title}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed">
              {siteConfigData.contact.title} - {siteConfigData.description}
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {socialLinks.map((link) => (
                <Button
                  key={link.icon}
                  asChild
                  variant="outline"
                  size="lg"
                  className="w-14 h-14 sm:w-16 sm:h-16 p-0 rounded-full group hover:bg-primary hover:text-primary-foreground transition-all duration-300 btn-modern"
                  aria-label={`Link para ${link.icon}`}
                >
                  <a
                    href={link.url}
                    target={link.icon === 'mail' ? '_self' : '_blank'}
                    rel={link.icon === 'mail' ? undefined : 'noopener noreferrer'}
                  >
                    {link.icon === 'twitter' && <FaTwitter className="w-5 h-5" />}
                    {link.icon === 'instagram' && <FaInstagram className="w-5 h-5" />}
                    {link.icon === 'mail' && <FaEnvelope className="w-5 h-5" />}
                    {link.icon === 'discord' && <FaDiscord className="w-5 h-5" />}
                    {link.icon === 'tiktok' && <FaTiktok className="w-5 h-5" />}
                  </a>
                </Button>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {footerButtons.map((button, index) => (
                <Button
                  key={index}
                  asChild
                  size="lg"
                  className="btn-modern text-primary-foreground font-semibold px-6 sm:px-8 py-4 rounded-xl"
                >
                  <a
                    href={button.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {button.name}
                  </a>
                </Button>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={closeProfileModal}
      />

      <RecommendationsModal
        isOpen={isRecommendationsModalOpen}
        onClose={closeRecommendationsModal}
      />

      <ScrollToTop />
    </div>
  );
}
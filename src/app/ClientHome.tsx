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
  portfolioData: PortfolioItem[];
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
        <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
          <VideoBackground
            videoSrc={siteConfigData.videoBackgroundUrl}
            fallbackImage="/videos/placeholder.jpg"
          >
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative text-center text-white px-4 flex flex-col items-center justify-center h-full max-w-7xl mx-auto z-10">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-8 text-gradient leading-none tracking-tight">
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
        <section id="about" className="py-24 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
                {siteConfigData.about.title}
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                {siteConfigData.about.description}
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12 mb-20 items-center">
              <div className="flex justify-center lg:justify-start">
                <div className="relative cursor-pointer" onClick={openProfileModal}>
                  <img
                    src="/profile.jpg"
                    alt="Foto de perfil de Gregory Vallim"
                    className="w-80 h-80 rounded-full object-cover shadow-xl border-4 border-border"
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

            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold mb-6 text-gradient">Minhas Habilidades</h3>
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
        <section id="projects" className="py-24 px-4 bg-background">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
                {siteConfigData.hero.ctaText}
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                {siteConfigData.about.description}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
        <section id="contact" className="py-24 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
              {siteConfigData.contact.title}
            </h2>
            <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
              {siteConfigData.contact.title} - {siteConfigData.description}
            </p>
            
            <div className="grid grid-cols-5 gap-6 mb-12 justify-items-center">
              {socialLinks.map((link) => (
                <Button
                  key={link.icon}
                  asChild
                  variant="outline"
                  size="lg"
                  className="w-16 h-16 p-0 rounded-full group hover:bg-primary hover:text-primary-foreground transition-all duration-200"
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
                  className="btn-clean text-primary-foreground font-semibold px-8 py-4 rounded-lg"
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
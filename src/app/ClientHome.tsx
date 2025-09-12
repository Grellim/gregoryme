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

// Modular sections
import HeroSection from "@/components/portfolio/HeroSection";
import AboutSection from "@/components/portfolio/AboutSection";
import PortfolioSection from "@/components/portfolio/PortfolioSection";
import ContactSection from "@/components/portfolio/ContactSection";
import ScrollToTop from "@/components/ui/ScrollToTop";
import { FaDiscord, FaInstagram, FaTiktok, FaTwitter, FaEnvelope } from "react-icons/fa";
import { SiteConfig, Locale, SocialLink, FooterButton, PortfolioProject } from "@/data/types";
import { ProfileData } from "@/data/profile";


interface ClientHomeProps {
  siteConfigData: SiteConfig;
  locale: Locale;
  socialLinks: SocialLink[];
  footerButtons: FooterButton[];
  portfolioData: PortfolioProject[];
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
        <HeroSection
          siteConfigData={siteConfigData}
          locale={locale}
          visitCount={visitCount}
          loading={loading}
        />

        <AboutSection
          siteConfigData={siteConfigData}
          locale={locale}
          profileData={profileData}
          onOpenProfileModal={openProfileModal}
          onOpenRecommendationsModal={openRecommendationsModal}
        />

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
                  project={project}
                  locale={locale}
                  onOpenProjectModal={() => {}}
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
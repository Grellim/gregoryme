"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
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
  skillsData?: string[];
}

export default function ClientHome({
  siteConfigData,
  locale,
  socialLinks,
  footerButtons,
  portfolioData,
  profileData,
  skillsData
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
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:bg-background focus:text-foreground focus:p-2 focus:border focus:border-primary focus:rounded focus:shadow-lg"
        aria-label="Skip to main content"
      >
        Skip to content
      </a>
      <Navbar />
      
      <main id="main-content" className="pt-16" role="main" aria-label="Main content">
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

        <PortfolioSection
          portfolioData={portfolioData}
          locale={locale}
        />

        <ContactSection
          siteConfigData={siteConfigData}
          locale={locale}
          socialLinks={socialLinks}
          footerButtons={footerButtons}
        />
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
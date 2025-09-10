"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PortfolioCard from "@/components/portfolio/PortfolioCard";
import VideoBackground from "@/components/ui/VideoBackground";
import ProfileModal from "@/components/ui/ProfileModal";
import TagTooltip from "@/components/ui/TagTooltip";
import SkillsCarousel from "@/components/ui/SkillsCarousel";
import SkillsGridCarousel from "@/components/ui/SkillsGridCarousel";
import { skillsData } from "@/data/skills";
import { profileData } from "@/data/profile";
import RecommendationsModal from "@/components/ui/RecommendationsModal";
import ScrollToTop from "@/components/ui/ScrollToTop";
import { FaDiscord, FaInstagram, FaTiktok, FaTwitter, FaEnvelope } from "react-icons/fa";
import { SiteConfig, Locale, SocialLink, FooterButton } from "@/data/types";
import { ProfileData } from "@/data/profile";

interface SiteConfigProps {
  siteConfigData: SiteConfig;
  locale: Locale;
  socialLinks: SocialLink[];
  footerButtons: FooterButton[];
  portfolioData: any[];
}

export function Home({ siteConfigData, locale, socialLinks, footerButtons, portfolioData }: SiteConfigProps) {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isRecommendationsModalOpen, setIsRecommendationsModalOpen] = useState(false);

  const modalProfileData: ProfileData = profileData;

  const openProfileModal = () => setIsProfileModalOpen(true);
  const closeProfileModal = () => setIsProfileModalOpen(false);

  const handleProfileSave = (data: ProfileData) => {
    // Implementar lógica de salvamento real, como uma chamada de API
  };

  const openRecommendationsModal = () => setIsRecommendationsModalOpen(true);
  const closeRecommendationsModal = () => setIsRecommendationsModalOpen(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <main className="pt-16">
        {/* Hero Section with Video Background */}
        <section id="home" className="relative h-[80vh] pt-8 pb-0 flex items-center justify-center">
          <VideoBackground
            videoSrc={siteConfigData.videoBackgroundUrl}
            fallbackImage="/videos/placeholder.jpg"
          >
            <div className="text-center text-white px-4 m">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 font-poppins tracking-wider leading-tight">
                {siteConfigData.hero.title}
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-8 font-light max-w-3xl mx-auto font-inter leading-relaxed">
                {siteConfigData.hero.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <button
                  onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-purple-400 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-purple-300 transition-colors font-poppins btn-friendly text-sm sm:text-base"
                  aria-label={locale.ui.buttons.viewProjects}
                >
                  {siteConfigData.hero.ctaText}
                </button>
                <button
                  onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="border-2 border-purple-400 text-purple-400 px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-purple-400 hover:text-white transition-colors font-poppins btn-friendly text-sm sm:text-base"
                  aria-label={locale.ui.buttons.contact}
                >
                  {siteConfigData.contact.title}
                </button>
              </div>
            </div>
          </VideoBackground>
        </section>

        {/* About Section */}
        <section id="about" className="pt-0 pb-20 px-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-poppins">{siteConfigData.about.title}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto font-inter">
                {siteConfigData.about.description}
              </p>
            </div>
            
            {/* Profile Section */}
            <div className="flex flex-col lg:flex-row items-center gap-12 mb-16">
              {/* Profile Photo */}
              <div className="flex-shrink-0">
                <div
                  className="relative group cursor-pointer"
                  onClick={openProfileModal}
                >
                  <img
                    src="/profile.jpg"
                    alt="Foto de perfil de Gregory Vallim"
                    className="w-64 h-64 rounded-full object-cover shadow-2xl border-4 border-white dark:border-border"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full flex items-center justify-center">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Profile Content */}
              <div className="flex-1 text-center lg:text-left">
                <h3 className="text-2xl font-bold mb-4 font-poppins">{siteConfigData.about.title}</h3>
                <p className="text-lg text-muted-foreground mb-6 font-inter leading-relaxed">
                  {siteConfigData.about.description}
                </p>
                <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                  <TagTooltip
                    emoji="🚀"
                    title={locale.ui.tags.innovation}
                    description="Sempre buscando inovar e criar soluções que transformam o mundo digital. A inovação é o motor que move todos os meus projetos."
                  >
                    <span className="px-4 py-2 bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200 rounded-full text-sm font-medium cursor-help">
                      {locale.ui.tags.innovation}
                    </span>
                  </TagTooltip>
                  <TagTooltip
                    emoji="💡"
                    title={locale.ui.tags.creativity}
                    description="Criatividade é essencial para resolver problemas complexos. Cada projeto é uma oportunidade de pensar fora da caixa."
                  >
                    <span className="px-4 py-2 bg-pink-200 dark:bg-pink-800 text-pink-800 dark:text-pink-200 rounded-full text-sm font-medium cursor-help">
                      {locale.ui.tags.creativity}
                    </span>
                  </TagTooltip>
                  <TagTooltip
                    emoji="⚡"
                    title={locale.ui.tags.performance}
                    description="Performance não é opcional, é obrigatório. Meus projetos são otimizados para oferecer a melhor experiência possível."
                  >
                    <span className="px-4 py-2 bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium cursor-help">
                      {locale.ui.tags.performance}
                    </span>
                  </TagTooltip>
                  <TagTooltip
                    emoji="🌱"
                    title={locale.ui.tags.sustainability}
                    description="Desenvolvimento sustentável é o futuro. Busco criar soluções que considerem o impacto ambiental e social."
                  >
                    <span className="px-4 py-2 bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200 rounded-full text-sm font-medium cursor-help">
                      {locale.ui.tags.sustainability}
                    </span>
                  </TagTooltip>
                </div>
                
                {/* Recommendations Button */}
                <div className="mt-6 text-right">
                  <button
                    onClick={openRecommendationsModal}
                    className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 hover:shadow-2xl hover:scale-105 transform font-poppins border-2 border-transparent hover:border-white/20 cursor-pointer"
                    aria-label={locale.ui.buttons.recommendations}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    {locale.ui.buttons.recommendations}
                  </button>
                </div>
              </div>
            </div>

            {/* Skills Grid Carousel */}
            <SkillsGridCarousel
              skills={skillsData.map((skill, index) => ({
                title: skill.name,
                description: skill.description,
                icon: (
                  <svg key={index} className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d={skill.icon} />
                  </svg>
                ),
                color: ["bg-purple-400", "bg-pink-400", "bg-blue-400", "bg-green-400", "bg-indigo-400", "bg-yellow-400"][index % 6],
                emoji: ["🚀", "📱", "🎨", "🤖", "☁️", "🗄️"][index % 6],
                proficiency: skill.proficiency,
              }))}
            />
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="projects" className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{siteConfigData.hero.ctaText}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {siteConfigData.about.description}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
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
        <section id="contact" className="py-20 px-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-poppins">{siteConfigData.contact.title}</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto font-inter">
              {siteConfigData.contact.title} - {siteConfigData.description}
            </p>
            
            {/* Social Media Icons */}
            <div className="flex justify-center gap-6 mb-8">
              {socialLinks.map((link) => (
                <a
                  key={link.icon}
                  href={link.url}
                  target={link.icon === 'mail' ? '_self' : '_blank'}
                  rel={link.icon === 'mail' ? undefined : 'noopener noreferrer'}
                  className={`text-muted-foreground transition-colors hover:text-${
                    link.icon === 'twitter' ? 'blue' :
                    link.icon === 'instagram' ? 'pink' :
                    link.icon === 'mail' ? 'red' :
                    'indigo'
                  }-400`}
                >
                  {link.icon === 'twitter' && <FaTwitter className="w-8 h-8" />}
                  {link.icon === 'instagram' && <FaInstagram className="w-8 h-8" />}
                  {link.icon === 'mail' && <FaEnvelope className="w-8 h-8" />}
                  {link.icon === 'discord' && <FaDiscord className="w-8 h-8" />}
                  {link.icon === 'tiktok' && <FaTiktok className="w-8 h-8" />}
                </a>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {footerButtons.map((button, index) => (
                <a
                  key={index}
                  href={button.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-purple-400 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-300 transition-colors font-poppins btn-friendly inline-block"
                >
                  {button.name}
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      
      {/* Profile Modal */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={closeProfileModal}
      />

      {/* Recommendations Modal */}
      <RecommendationsModal
        isOpen={isRecommendationsModalOpen}
        onClose={closeRecommendationsModal}
      />

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
}

// Server Component Wrapper
import { getSiteConfig, getLocale, getSocialLinks, getFooterButtons } from "@/data/config";
import { portfolioProjects } from "@/data/portfolio";

const lang = 'pt-BR';

async function getPageProps() {
  const siteConfigData = getSiteConfig(lang);
  const locale = getLocale(lang);
  const socialLinks = getSocialLinks(lang);
  const footerButtons = getFooterButtons(lang);

  const portfolioData = portfolioProjects.map(project => ({
    id: project.id,
    title: project.title,
    description: project.description,
    imageUrl: project.image,
    tags: project.technologies,
    projectUrl: project.githubUrl || project.liveUrl || '#',
    moreInfo: project.description,
    galleryImages: project.galleryImages,
  }));

  return {
    siteConfigData,
    locale,
    socialLinks,
    footerButtons,
    portfolioData,
  };
}

export default async function Page() {
  const { siteConfigData, locale, socialLinks, footerButtons, portfolioData } = await getPageProps();

  return <Home siteConfigData={siteConfigData} locale={locale} socialLinks={socialLinks} footerButtons={footerButtons} portfolioData={portfolioData} />;
}

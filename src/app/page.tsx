"use client";

import { useState, useEffect } from "react";
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
  const [visitCount, setVisitCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const trackVisit = async () => {
      try {
        // Get client IP
        const ipResponse = await fetch('https://ipapi.co/json/');
        const ipData = await ipResponse.json();
        const clientIp = ipData.ip;

        if (clientIp) {
          // Track visit
          await fetch('/api/visits', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ip: clientIp }),
          });

          // Get updated count
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


  const modalProfileData: ProfileData = profileData;

  const openProfileModal = () => setIsProfileModalOpen(true);
  const closeProfileModal = () => setIsProfileModalOpen(false);

  const handleProfileSave = (data: ProfileData) => {
    // Implementar lógica de salvamento real, como uma chamada de API
  };

  const openRecommendationsModal = () => setIsRecommendationsModalOpen(true);
  const closeRecommendationsModal = () => setIsRecommendationsModalOpen(false);

  return (
    <div className="min-h-screen bg-background text-foreground urban-section">
      <Navbar />
      
      <main className="pt-16">
        {/* Revolutionary Hero Section */}
        <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden urban-section">
          <VideoBackground
            videoSrc={siteConfigData.videoBackgroundUrl}
            fallbackImage="/videos/placeholder.jpg"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-primary/10 to-secondary/20" />
            <div className="absolute inset-0 bg-grid-xl opacity-20 pointer-events-none"></div>
            <div className="relative text-center text-white px-4 flex flex-col items-center justify-center h-full max-w-7xl mx-auto z-10 transform -skew-y-3 hover:skew-y-0 transition-transform duration-1000">
              <div className="absolute top-8 left-1/2 transform -translate-x-1/2 -rotate-12">
                <div className="w-32 h-32 border-2 border-dashed border-accent rounded-full animate-spin opacity-30"></div>
              </div>
              
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-8 graffiti-text glitch leading-none tracking-widest uppercase" data-text={siteConfigData.hero.title}>
                {siteConfigData.hero.title}
              </h1>

              {/* Urban Visit Counter */}
              {visitCount > 0 && !loading && (
                <div className="mb-8 p-4 bg-card/90 backdrop-blur-md rounded-none border-l-4 border-accent/70 shadow-[var(--neon-glow)] transform rotate-[-3deg] hover:rotate-0 transition-transform animate-float-gentle">
                  <p className="text-sm uppercase tracking-wider font-bold text-accent flex items-center justify-center gap-2">
                    <span className="text-destructive animate-pulse">🔥</span>
                    <span>STREET TRAFFIC:</span>
                    <span className="text-primary font-black">{visitCount}</span>
                    <span>UNIQUE IPs</span>
                    <span className="text-accent animate-pulse">⚡</span>
                  </p>
                </div>
              )}

              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-12 font-mono leading-relaxed max-w-5xl mx-auto text-accent/90 italic tracking-wide border-l-4 border-secondary/50 pl-6 transform rotate-[2deg]">
                {siteConfigData.hero.subtitle}
              </p>
              
              <div className="flex flex-col lg:flex-row gap-6 justify-center w-full max-w-2xl transform -rotate-1 hover:rotate-0 transition-transform duration-700">
                <button
                  onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
                  className="relative overflow-hidden btn-street text-base uppercase tracking-widest font-black px-10 py-5 rounded-none border-0 shadow-[var(--neon-glow)] hover:shadow-[0_0_30px_var(--primary)] transform hover:scale-105 transition-all duration-500 group"
                  aria-label={locale.ui.buttons.viewProjects}
                >
                  <span className="relative z-10">{siteConfigData.hero.ctaText}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-destructive rounded-full opacity-0 group-hover:opacity-100 animate-ping"></div>
                </button>
                <button
                  onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="relative overflow-hidden btn-street bg-transparent border-3 border-accent/70 text-accent hover:text-accent-foreground px-10 py-5 rounded-none font-black uppercase tracking-widest shadow-[var(--neon-glow-green)] hover:shadow-[0_0_30px_var(--accent)] transform hover:scale-105 transition-all duration-500"
                  aria-label={locale.ui.buttons.contact}
                >
                  <span className="relative z-10">{siteConfigData.contact.title}</span>
                  <div className="absolute inset-0 border-2 border-dashed border-accent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button>
              </div>
              
              {/* Glitch Status Bar */}
              <div className="absolute bottom-4 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent animate-neon-flow"></div>
            </div>
          </VideoBackground>
        </section>
        {/* About Section */}
        <section id="about" className="py-24 px-4 bg-gradient-to-br from-purple-50/50 to-pink-50/50 dark:from-purple-900/10 dark:to-pink-900/10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 font-poppins bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {siteConfigData.about.title}
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto font-inter leading-relaxed">
                {siteConfigData.about.description}
              </p>
            </div>
            
            {/* Profile Section */}
            <div className="grid lg:grid-cols-2 gap-16 mb-20 items-center">
              {/* Profile Photo */}
              <div className="flex justify-center lg:justify-start">
                <div className="relative group cursor-pointer" onClick={openProfileModal}>
                  <div className="relative">
                    <img
                      src="/profile.jpg"
                      alt="Foto de perfil de Gregory Vallim"
                      className="w-80 h-80 rounded-full object-cover shadow-2xl border-6 border-white/80 dark:border-border/50 ring-8 ring-purple-200/50 dark:ring-purple-900/50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <svg className="w-16 h-16 text-white/90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Profile Content */}
              <div className="space-y-6 text-center lg:text-left">
                <h3 className="text-3xl font-bold mb-4 font-poppins">{profileData.name}</h3>
                <p className="text-xl text-muted-foreground font-inter leading-relaxed">
                  {siteConfigData.about.description}
                </p>
                <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                  <TagTooltip
                    emoji="🚀"
                    title={locale.ui.tags.innovation}
                    description="Sempre buscando inovar e criar soluções que transformam o mundo digital. A inovação é o motor que move todos os meus projetos."
                  >
                    <span className="px-4 py-2 bg-gradient-to-r from-purple-100 to-purple-200 dark:from-purple-900/50 dark:to-purple-800/50 text-purple-800 dark:text-purple-200 rounded-full text-sm font-medium cursor-help shadow-sm">
                      {locale.ui.tags.innovation}
                    </span>
                  </TagTooltip>
                  <TagTooltip
                    emoji="💡"
                    title={locale.ui.tags.creativity}
                    description="Criatividade é essencial para resolver problemas complexos. Cada projeto é uma oportunidade de pensar fora da caixa."
                  >
                    <span className="px-4 py-2 bg-gradient-to-r from-pink-100 to-pink-200 dark:from-pink-900/50 dark:to-pink-800/50 text-pink-800 dark:text-pink-200 rounded-full text-sm font-medium cursor-help shadow-sm">
                      {locale.ui.tags.creativity}
                    </span>
                  </TagTooltip>
                  <TagTooltip
                    emoji="⚡"
                    title={locale.ui.tags.performance}
                    description="Performance não é opcional, é obrigatório. Meus projetos são otimizados para oferecer a melhor experiência possível."
                  >
                    <span className="px-4 py-2 bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900/50 dark:to-blue-800/50 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium cursor-help shadow-sm">
                      {locale.ui.tags.performance}
                    </span>
                  </TagTooltip>
                  <TagTooltip
                    emoji="🌱"
                    title={locale.ui.tags.sustainability}
                    description="Desenvolvimento sustentável é o futuro. Busco criar soluções que considerem o impacto ambiental e social."
                  >
                    <span className="px-4 py-2 bg-gradient-to-r from-green-100 to-green-200 dark:from-green-900/50 dark:to-green-800/50 text-green-800 dark:text-green-200 rounded-full text-sm font-medium cursor-help shadow-sm">
                      {locale.ui.tags.sustainability}
                    </span>
                  </TagTooltip>
                </div>
                
                {/* Recommendations Button */}
                <div className="pt-4">
                  <button
                    onClick={openRecommendationsModal}
                    className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 hover:shadow-2xl hover:scale-105 transform font-poppins border border-transparent hover:border-white/20 text-base"
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

            {/* Skills Section */}
            <div className="text-center mb-4">
              <h3 className="text-3xl font-bold mb-6 font-poppins">Minhas Habilidades</h3>
            </div>
            <SkillsGridCarousel
              skills={skillsData.map((skill, index) => ({
                title: skill.name,
                description: skill.description,
                icon: (
                  <svg key={index} className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d={skill.icon} />
                  </svg>
                ),
                color: ["bg-purple-500", "bg-pink-500", "bg-blue-500", "bg-green-500", "bg-indigo-500", "bg-yellow-500"][index % 6],
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
              <h2 className="text-4xl md:text-5xl font-bold mb-6 font-poppins bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {siteConfigData.hero.ctaText}
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto font-inter leading-relaxed">
                {siteConfigData.about.description}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 xl:gap-8 p-2 sm:p-4">
              {portfolioData.map((project) => (
                <div key={project.id} className="relative group">
                  <PortfolioCard
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
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 px-4 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/10 dark:to-purple-900/10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-poppins bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {siteConfigData.contact.title}
            </h2>
            <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto font-inter leading-relaxed">
              {siteConfigData.contact.title} - {siteConfigData.description}
            </p>
            
            {/* Social Media Icons */}
            <div className="grid grid-cols-5 gap-6 mb-12 justify-items-center">
              {socialLinks.map((link) => (
                <a
                  key={link.icon}
                  href={link.url}
                  target={link.icon === 'mail' ? '_self' : '_blank'}
                  rel={link.icon === 'mail' ? undefined : 'noopener noreferrer'}
                  className="group flex flex-col items-center p-4 rounded-xl bg-white/80 dark:bg-card/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                  aria-label={`Link para ${link.icon}`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-2 transition-colors ${
                    link.icon === 'twitter' ? 'bg-blue-500' :
                    link.icon === 'instagram' ? 'bg-pink-500' :
                    link.icon === 'mail' ? 'bg-red-500' :
                    link.icon === 'discord' ? 'bg-indigo-600' :
                    'bg-gray-500'
                  } text-white group-hover:scale-110`}>
                    {link.icon === 'twitter' && <FaTwitter className="w-5 h-5" />}
                    {link.icon === 'instagram' && <FaInstagram className="w-5 h-5" />}
                    {link.icon === 'mail' && <FaEnvelope className="w-5 h-5" />}
                    {link.icon === 'discord' && <FaDiscord className="w-5 h-5" />}
                    {link.icon === 'tiktok' && <FaTiktok className="w-5 h-5" />}
                  </div>
                  <span className="text-xs text-muted-foreground font-medium">{link.icon.charAt(0).toUpperCase() + link.icon.slice(1)}</span>
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
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 font-poppins shadow-lg hover:shadow-xl transform hover:scale-105 text-base inline-block"
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

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
import RecommendationsModal from "@/components/ui/RecommendationsModal";
import ScrollToTop from "@/components/ui/ScrollToTop";
import { getSiteConfig, getLocale, getSocialLinks } from "@/data/config";

import { portfolioProjects } from "@/data/portfolio";

const lang = 'pt-BR';
const siteConfigData = getSiteConfig(lang);
const locale = getLocale(lang);
const socialLinks = getSocialLinks(lang);

const portfolioData = portfolioProjects.map(project => ({
  id: project.id,
  title: project.title,
  description: project.description,
  imageUrl: project.image,
  tags: project.technologies,
  projectUrl: project.githubUrl || project.liveUrl || '#',
  moreInfo: project.description, // Using description as moreInfo for now
  galleryImages: [], // Will need to add this to the data structure later
}));

interface ProfileData {
  name: string;
  bio: string;
}

export default function Home() {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isRecommendationsModalOpen, setIsRecommendationsModalOpen] = useState(false);

  const profileData: ProfileData = {
    name: siteConfigData.author,
    bio: siteConfigData.about.description,
  };

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
        <section id="home" className="relative min-h-[63vh] sm:min-h-[72vh] flex items-center justify-center">
          <VideoBackground
            videoSrc={siteConfigData.videoBackgroundUrl}
            fallbackImage="/videos/placeholder.jpg"
          >
            <div className="text-center text-white px-4">
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
        <section id="about" className="py-20 px-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
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
                  <svg key={index} className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
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
                  target={link.icon === 'email' ? '_self' : '_blank'}
                  rel={link.icon === 'email' ? undefined : 'noopener noreferrer'}
                  className={`text-muted-foreground transition-colors hover:text-${
                    link.icon === 'twitter' ? 'blue' :
                    link.icon === 'instagram' ? 'pink' :
                    link.icon === 'email' ? 'red' :
                    'indigo'
                  }-400`}
                >
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    {link.icon === 'twitter' && (
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    )}
                    {link.icon === 'instagram' && (
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z" />
                    )}
                    {link.icon === 'email' && (
                      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    )}
                    {link.icon === 'discord' && (
                      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.844-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5074 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0411-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.522 6.0023-3.0294a.077.077 0 00.0313-.0556c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1828 0-2.1569-1.0857-2.1569-2.419 0-1.3332.955-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.955 2.4189-2.1569 2.4189zm7.9748 0c-1.1828 0-2.1569-1.0857-2.1569-2.419 0-1.3332.955-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
                    )}
                  </svg>
                </a>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={`mailto:${siteConfigData.contact.email}`} className="bg-purple-400 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-300 transition-colors font-poppins btn-friendly inline-block">
                {locale.social.email}
              </a>
              {socialLinks.map((link) => (
                link.icon === 'discord' && (
                  <a
                    key={link.icon}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-2 border-purple-400 text-purple-400 px-8 py-3 rounded-lg font-semibold hover:bg-purple-400 hover:text-white transition-colors font-poppins btn-friendly inline-block"
                  >
                    {link.name}
                  </a>
                )
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
        initialData={profileData}
        onSave={handleProfileSave}
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

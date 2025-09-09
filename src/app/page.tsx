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
import RecommendationsModal from "@/components/ui/RecommendationsModal";
import ScrollToTop from "@/components/ui/ScrollToTop";
import { title } from "process";

const portfolioData = [
  {
    id: "1",
    title: "Plataforma Web Moderna",
    description: "Uma plataforma web completa com design responsivo e funcionalidades avançadas para gestão de projetos.",
    imageUrl: "/project1.jpg",
    tags: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    projectUrl: "https://github.com/gregoryvallim/project1",
    moreInfo: "Este projeto foi desenvolvido utilizando as mais modernas tecnologias de desenvolvimento web. A plataforma oferece uma interface intuitiva e eficiente para gestão de projetos, com foco em用户体验 e performance. O sistema inclui dashboards analíticos, gerenciamento de usuários e integração com APIs externas.",
    galleryImages: ["/gallery1.jpg", "/gallery2.jpg"],
  },
  {
    id: "2",
    title: "Aplicativo Mobile",
    description: "Aplicativo mobile nativo com funcionalidades inovadoras e interface amigável.",
    imageUrl: "/project2.jpg",
    tags: ["React Native", "Firebase", "Node.js", "MongoDB"],
    projectUrl: "https://github.com/gregoryvallim/project2",
    moreInfo: "Aplicativo mobile desenvolvido para oferecer uma experiência completa aos usuários. Com recursos como autenticação segura, notificações push e sincronização de dados em tempo real. O aplicativo foi projetado para ser intuitivo e acessível, atendendo às necessidades do público-alvo.",
    galleryImages: ["/gallery1.jpg"],
  },
  {
    id: "3",
    title: "Dashboard Analytics",
    description: "Sistema de analytics com visualização de dados em tempo real e relatórios personalizados.",
    imageUrl: "/project3.jpg",
    tags: ["Vue.js", "D3.js", "Python", "PostgreSQL"],
    projectUrl: "https://github.com/gregoryvallim/project3",
    moreInfo: "Dashboard analytics poderoso que transforma dados brutos em insights acionáveis. Com visualizações interativas, filtros avançados e capacidade de exportação de relatórios. O sistema foi otimizado para lidar com grandes volumes de dados e fornecer análises em tempo real.",
    galleryImages: ["/gallery2.jpg", "/gallery1.jpg"],
  },
  {
    id: "4",
    title: "App de Finanças Pessoais",
    description: "Aplicativo completo para gestão financeira com inteligência artificial e insights personalizados.",
    imageUrl: "/project4.jpg",
    tags: ["Flutter", "Dart", "TensorFlow", "SQLite"],
    projectUrl: "https://github.com/gregoryvallim/project4",
    moreInfo: "Aplicativo revolucionário de finanças pessoais que utiliza IA para oferecer insights personalizados sobre hábitos de consumo. Com recursos como categorização automática de gastos, metas financeiras e projeções inteligentes. O app ajuda os usuários a tomar melhores decisões financeiras.",
    galleryImages: ["/gallery1.jpg", "/gallery2.jpg"],
  },
  {
    id: "5",
    title: "Plataforma de IA",
    description: "Sistema de machine learning para automação de tarefas e análise preditiva de dados.",
    imageUrl: "/project5.jpg",
    tags: ["Python", "TensorFlow", "Docker", "AWS"],
    projectUrl: "https://github.com/gregoryvallim/project5",
    moreInfo: "Plataforma de inteligência artificial que automatiza tarefas complexas e fornece análises preditivas. O sistema utiliza modelos de machine learning treinados para identificar padrões e fazer previsões precisas. Ideal para empresas que buscam otimizar processos e tomar decisões baseadas em dados.",
    galleryImages: ["/gallery2.jpg"],
  },
  {
    id: "6",
    title: "E-commerce Revolucionário",
    description: "Plataforma de e-commerce com experiência de compra imersiva e personalização avançada.",
    imageUrl: "/project6.jpg",
    tags: ["Next.js", "Stripe", "Prisma", "Redis"],
    projectUrl: "https://github.com/gregoryvallim/project6",
    moreInfo: "Plataforma de e-commerce que revoluciona a experiência de compra online. Com sistema de recomendação por IA, realidade aumentada para visualização de produtos e checkout simplificado. A plataforma oferece uma experiência personalizada para cada usuário, aumentando a conversão e a satisfação do cliente.",
    galleryImages: ["/gallery1.jpg", "/gallery2.jpg"],
  },
];

interface ProfileData {
  name: string;
  bio: string;
}

export default function Home() {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isRecommendationsModalOpen, setIsRecommendationsModalOpen] = useState(false);

  const profileData: ProfileData = {
    name: "Gregory Vallim",
    bio: "Sou um desenvolvedor full-stack com experiência em criar aplicações web e mobile modernas, focando em performance, segurança e experiência do usuário."
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
        <section id="home" className="relative min-h-[70vh] sm:min-h-[80vh] flex items-center justify-center">
          <VideoBackground
            videoSrc="/videos/background.mp4"
            fallbackImage="/videos/placeholder.jpg"
          >
            <div className="text-center text-white px-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 font-poppins tracking-wider leading-tight">
                Olá, sou <span className="text-purple-300">Gregory Vallim</span>
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-8 font-light max-w-3xl mx-auto font-inter leading-relaxed">
                Um camarada com muitas ideias
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <button
                  onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-purple-400 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-purple-300 transition-colors font-poppins btn-friendly text-sm sm:text-base"
                  aria-label="Ver projetos"
                >
                  Ver Projetos
                </button>
                <button
                  onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="border-2 border-purple-400 text-purple-400 px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-purple-400 hover:text-white transition-colors font-poppins btn-friendly text-sm sm:text-base"
                  aria-label="Entrar em contato"
                >
                  Entrar em Contato
                </button>
              </div>
            </div>
          </VideoBackground>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 px-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-poppins">Sobre Mim</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto font-inter">
                Sou um desenvolvedor full-stack com experiência em criar aplicações web e mobile modernas, 
                focando em performance, segurança e experiência do usuário.
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
                <h3 className="text-2xl font-bold mb-4 font-poppins">Desenvolvedor Revolucionário</h3>
                <p className="text-lg text-muted-foreground mb-6 font-inter leading-relaxed">
                  Sou apaixonado por tecnologia e inovação, sempre buscando criar soluções que transformem 
                  a maneira como as pessoas interagem com o mundo digital. Com uma visão revolucionária, 
                  desenvolvo projetos que combinam criatividade, funcionalidade e impacto social.
                </p>
                <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                  <TagTooltip 
                    emoji="🚀"
                    title="Inovação"
                    description="Sempre buscando inovar e criar soluções que transformam o mundo digital. A inovação é o motor que move todos os meus projetos."
                  >
                    <span className="px-4 py-2 bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200 rounded-full text-sm font-medium cursor-help">
                      {emoji} {title}
                    </span>
                  </TagTooltip>
                  <TagTooltip 
                    emoji="💡"
                    criatividade="Criatividade"
                    description="Criatividade é essencial para resolver problemas complexos. Cada projeto é uma oportunidade de pensar fora da caixa."
                  >
                    <span className="px-4 py-2 bg-pink-200 dark:bg-pink-800 text-pink-800 dark:text-pink-200 rounded-full text-sm font-medium cursor-help">
                      {emoji} {title}
                    </span>
                  </TagTooltip>
                  <TagTooltip 
                    emoji="⚡"
                    title="Performance"
                    description="Performance não é opcional, é obrigatório. Meus projetos são otimizados para oferecer a melhor experiência possível."
                  >
                    <span className="px-4 py-2 bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium cursor-help">
                      {emoji} {title}
                    </span>
                  </TagTooltip>
                  <TagTooltip 
                    emoji="🌱"
                    title="Sustentabilidade"
                    description="Desenvolvimento sustentável é o futuro. Busco criar soluções que considerem o impacto ambiental e social."
                  >
                    <span className="px-4 py-2 bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200 rounded-full text-sm font-medium cursor-help">
                      {emoji} {title}
                    </span>
                  </TagTooltip>
                </div>
                
                {/* Recommendations Button */}
                <div className="mt-6 text-right">
                  <button
                    onClick={openRecommendationsModal}
                    className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 hover:shadow-2xl hover:scale-105 transform font-poppins border-2 border-transparent hover:border-white/20 cursor-pointer"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Minhas recomendações
                  </button>
                </div>
              </div>
            </div>

            {/* Skills Grid Carousel */}
            <SkillsGridCarousel 
              skills={[
                {
                  title: "Desenvolvimento Web",
                  description: "Criação de aplicações web modernas e responsivas utilizando as tecnologias mais recentes. Foco em performance, segurança e experiência do usuário.",
                  icon: (
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  ),
                  color: "bg-purple-400",
                  emoji: "🚀",
                },
                {
                  title: "Desenvolvimento Mobile",
                  description: "Desenvolvimento de aplicativos nativos e híbridos para iOS e Android. Experiência completa desde o design até a publicação nas stores.",
                  icon: (
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  ),
                  color: "bg-pink-400",
                  emoji: "📱",
                },
                {
                  title: "UI/UX Design",
                  description: "Design de interfaces intuitivas e experiências memoráveis. Foco em usabilidade, acessibilidade e design centrado no usuário.",
                  icon: (
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  ),
                  color: "bg-blue-400",
                  emoji: "🎨",
                },
                {
                  title: "Inteligência Artificial",
                  description: "Implementação de soluções de IA e machine learning para automatizar tarefas e fornecer insights inteligentes em aplicações.",
                  icon: (
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  ),
                  color: "bg-green-400",
                  emoji: "🤖",
                },
                {
                  title: "Cloud & DevOps",
                  description: "Experiência com cloud computing, containerização e CI/CD. Implementação de infraestrutura escalável e confiável.",
                  icon: (
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                    </svg>
                  ),
                  color: "bg-indigo-400",
                  emoji: "☁️",
                },
                {
                  title: "Banco de Dados",
                  description: "Design e otimização de bancos de dados relacionais e NoSQL. Experiência com modelagem de dados e performance tuning.",
                  icon: (
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                    </svg>
                  ),
                  color: "bg-yellow-400",
                  emoji: "🗄️",
                },
              ]}
            />
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="projects" className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Meus Projetos</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Confira alguns dos meus trabalhos mais recentes e destacados
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-poppins">Bora trocar ideia?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto font-inter">
              Quer saber mais sobre os projetos? Sou maluco e tenho muitos, então se tiver algo aqui que você queira saber, converse comigo.
            </p>
            
            {/* Social Media Icons */}
            <div className="flex justify-center gap-6 mb-8">
              <a href="https://twitter.com/gregoryvallim" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-blue-400 transition-colors">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a href="https://instagram.com/gregoryvallim" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-pink-400 transition-colors">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z" />
                </svg>
              </a>
              <a href="mailto:gregory@example.com" className="text-muted-foreground hover:text-red-400 transition-colors">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
              <a href="https://discord.gg/gregoryvallim" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-indigo-400 transition-colors">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.844-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5074 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0411-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.522 6.0023-3.0294a.077.077 0 00.0313-.0556c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1828 0-2.1569-1.0857-2.1569-2.419 0-1.3332.955-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.955 2.4189-2.1569 2.4189zm7.9748 0c-1.1828 0-2.1569-1.0857-2.1569-2.419 0-1.3332.955-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
                </svg>
              </a>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:gregory@example.com" className="bg-purple-400 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-300 transition-colors font-poppins btn-friendly inline-block">
                Enviar Email
              </a>
              <a href="https://discord.gg/gregoryvallim" target="_blank" rel="noopener noreferrer" className="border-2 border-purple-400 text-purple-400 px-8 py-3 rounded-lg font-semibold hover:bg-purple-400 hover:text-white transition-colors font-poppins btn-friendly inline-block">
                Discord
              </a>
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

"use client";

import * as React from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaLinkedin, FaGithub, FaDiscord, FaExternalLinkAlt, FaTiktok } from 'react-icons/fa';
import { ScrollArea } from "@/components/ui/scroll-area";

interface Recommendation {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  link: string;
  type: "person" | "channel";
  facebook?: string;
  instagram?: string;
  twitter?: string;
  tiktok?: string;
  discord?: string;
  youtube?: string;
  website?: string;
  linkedin?: string;
  github?: string;
}

interface RecommendationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RecommendationsModal({ isOpen, onClose }: RecommendationsModalProps) {
  const recommendations: Recommendation[] = [
    {
      id: "1",
      name: "Fernanda Silva",
      description: "Desenvolvedora Full Stack especializada em React e Node.js. Cria soluções inovadoras para problemas complexos.",
      imageUrl: "/person1.jpg",
      link: "https://github.com/fernandasilva",
      type: "person",
      facebook: "https://facebook.com/fernandasilva",
      instagram: "https://instagram.com/fernandasilva",
      twitter: "https://twitter.com/fernandasilva",
      website: "https://fernandasilva.dev"
    },
    {
      id: "2",
      name: "Tech Insights",
      description: "Canal sobre as últimas tendências em tecnologia e desenvolvimento de software.",
      imageUrl: "/channel1.jpg",
      link: "https://youtube.com/techinsights",
      type: "channel",
      youtube: "https://youtube.com/techinsights",
      twitter: "https://twitter.com/techinsights",
      website: "https://techinsights.com"
    },
    {
      id: "3",
      name: "Carlos Santos",
      description: "Especialista em UX/UI Design com foco em acessibilidade e design inclusivo.",
      imageUrl: "/person2.jpg",
      link: "https://linkedin.com/in/carlossantos",
      type: "person",
      linkedin: "https://linkedin.com/in/carlossantos",
      instagram: "https://instagram.com/carlossantos",
      website: "https://carlossantos.design"
    },
    {
      id: "4",
      name: "Code Masters",
      description: "Canal educativo com tutoriais de programação e boas práticas de desenvolvimento.",
      imageUrl: "/channel2.jpg",
      link: "https://youtube.com/codemasters",
      type: "channel",
      youtube: "https://youtube.com/codemasters",
      tiktok: "https://tiktok.com/@codemasters",
      discord: "https://discord.gg/codemasters"
    },
    {
      id: "5",
      name: "Ana Costa",
      description: "Engenheira de Cloud com expertise em AWS e arquitetura de sistemas escaláveis.",
      imageUrl: "/person3.jpg",
      link: "https://twitter.com/anacosta",
      type: "person",
      twitter: "https://twitter.com/anacosta",
      linkedin: "https://linkedin.com/in/anacosta",
      website: "https://anacosta.cloud"
    },
    {
      id: "6",
      name: "Dev Brasil",
      description: "Comunidade de desenvolvedores brasileiros compartilhando conhecimento e experiências.",
      imageUrl: "/channel3.jpg",
      link: "https://discord.gg/devbrasil",
      type: "channel",
      discord: "https://discord.gg/devbrasil",
      youtube: "https://youtube.com/devbrasil",
      website: "https://devbrasil.com"
    },
    {
      id: "7",
      name: "João Doe",
      description: "Desenvolvedor full-stack apaixonado por JavaScript e tecnologias modernas. Compartilha projetos open-source e tutoriais práticos.",
      imageUrl: "/person1.jpg",
      link: "https://github.com/joaodoe",
      type: "person",
      github: "https://github.com/joaodoe",
      facebook: "https://facebook.com/joaodoe",
      instagram: "https://instagram.com/joaodoe"
    },
    {
      id: "8",
      name: "TechTalk YT",
      description: "Canal do YouTube sobre desenvolvimento web, mobile e tendências em IA. Conteúdo atualizado semanalmente com dicas práticas.",
      imageUrl: "/channel1.jpg",
      link: "https://youtube.com/techtalkyt",
      type: "channel",
      youtube: "https://youtube.com/techtalkyt",
      twitter: "https://twitter.com/techtalkyt",
      tiktok: "https://tiktok.com/@techtalkyt"
    },
  ];

  const handleVisit = (link: string) => {
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  const handleCardClick = (e: React.MouseEvent, link: string) => {
    e.stopPropagation();
    handleVisit(link);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        className="w-full max-w-[60vw] md:max-w-4xl lg:max-w-5xl xl:max-w-6xl max-h-screen p-0 overflow-y-auto pb-[25px] rounded-2xl focus:outline-none border border-border/50 scrollbar scrollbar-w-4 scrollbar-thumb-gray-400 scrollbar-track-transparent scrollbar-thumb-rounded scrollbar-track-transparent/50"
        onKeyDown={handleKeyDown}
        role="dialog"
        aria-label="Modal de recomendações"
        aria-modal="true"
      >
        <DialogHeader className="p-4 sm:p-6 lg:p-8 border-b border-border/50 sticky top-0 bg-background/95 backdrop-blur-sm z-10">
          <div className="text-left space-y-4 sm:space-y-6 px-4 sm:px-6">
            <DialogTitle className="text-xl sm:text-2xl lg:text-3xl font-bold font-poppins leading-tight">
              Minhas Recomendações
            </DialogTitle>
            <DialogDescription className="text-xs sm:text-sm lg:text-base leading-relaxed">
              Pessoas e canais que me inspiram e que recomendo para você conhecer. Cada um deles tem algo especial para oferecer no mundo da tecnologia e desenvolvimento.
            </DialogDescription>
          </div>
          <Button
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-background/80 hover:bg-background text-foreground border border-border/50 rounded-full p-2 sm:p-3 transition-all duration-200 flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 z-20 focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Fechar modal de recomendações"
            variant="ghost"
            size="icon"
          >
            <X className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7" />
          </Button>
        </DialogHeader>
        
        <ScrollArea className="w-full pr-4 flex-1">
          <div className="w-full h-full pt-4 sm:pt-6 md:pt-8 px-4 sm:px-6 md:px-8 lg:px-10 space-y-4 sm:space-y-6 md:space-y-8">
            <div className="grid grid-cols-1 gap-4 space-y-0">
              {recommendations.map((item) => (
                <Card
                  key={item.id}
                  className="border-border/50 hover:shadow-md transition-all duration-200 overflow-hidden"
                  onClick={(e) => handleCardClick(e, item.link)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleCardClick(e as any, item.link);
                    }
                  }}
                  aria-label={`Visitar ${item.name}`}
                >
                  <CardContent className="p-0">
                    <div className="p-4 relative">
                      {/* Main content: Image left, content center */}
                      <div className="flex items-start gap-4">
                        {/* Image - reduced height for better proportions */}
                        <div className="flex-shrink-0 w-40 h-40 rounded-lg overflow-hidden shadow-sm ring-1 ring-border/30">
                          <img
                            src={item.imageUrl}
                            alt={`${item.name} - ${item.type === "person" ? "Pessoa" : "Canal"}`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = item.type === "person" ? "/profile.jpg" : "/channel1.jpg";
                            }}
                          />
                        </div>

                        {/* Content - compact spacing */}
                        <div className="flex-1 space-y-2 min-w-0">
                          {/* Type */}
                          <div className="text-xs font-medium text-muted-foreground">
                            {item.type === "person" ? "👤 Pessoa" : "📺 Canal"}
                          </div>
                          
                          {/* Name */}
                          <h3 className="text-base font-semibold text-foreground leading-tight">
                            {item.name}
                          </h3>
                          
                          {/* Description */}
                          <p className="text-sm text-muted-foreground leading-relaxed max-w-none">
                            {item.description}
                          </p>
                          
                          {/* Social Media Icons */}
                          <div className="flex items-center gap-2 pt-1 flex-wrap">
                            {item.facebook && (
                              <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200 cursor-pointer transform hover:scale-110" aria-label="Facebook" onClick={(e) => { e.stopPropagation(); window.open(item.facebook, '_blank'); }}>
                                <FaFacebook className="h-5 w-5" />
                              </Button>
                            )}
                            {item.instagram && (
                              <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200 cursor-pointer transform hover:scale-110" aria-label="Instagram" onClick={(e) => { e.stopPropagation(); window.open(item.instagram, '_blank'); }}>
                                <FaInstagram className="h-5 w-5" />
                              </Button>
                            )}
                            {item.twitter && (
                              <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200 cursor-pointer transform hover:scale-110" aria-label="Twitter" onClick={(e) => { e.stopPropagation(); window.open(item.twitter, '_blank'); }}>
                                <FaTwitter className="h-5 w-5" />
                              </Button>
                            )}
                            {item.tiktok && (
                              <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200 cursor-pointer transform hover:scale-110" aria-label="TikTok" onClick={(e) => { e.stopPropagation(); window.open(item.tiktok, '_blank'); }}>
                                <FaTiktok className="h-5 w-5" />
                              </Button>
                            )}
                            {item.discord && (
                              <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200 cursor-pointer transform hover:scale-110" aria-label="Discord" onClick={(e) => { e.stopPropagation(); window.open(item.discord, '_blank'); }}>
                                <FaDiscord className="h-5 w-5" />
                              </Button>
                            )}
                            {item.linkedin && (
                              <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200 cursor-pointer transform hover:scale-110" aria-label="LinkedIn" onClick={(e) => { e.stopPropagation(); window.open(item.linkedin, '_blank'); }}>
                                <FaLinkedin className="h-5 w-5" />
                              </Button>
                            )}
                            {item.github && (
                              <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200 cursor-pointer transform hover:scale-110" aria-label="GitHub" onClick={(e) => { e.stopPropagation(); window.open(item.github, '_blank'); }}>
                                <FaGithub className="h-5 w-5" />
                              </Button>
                            )}
                            {item.youtube && (
                              <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200 cursor-pointer transform hover:scale-110" aria-label="YouTube" onClick={(e) => { e.stopPropagation(); window.open(item.youtube, '_blank'); }}>
                                <FaYoutube className="h-5 w-5" />
                              </Button>
                            )}
                            {item.website && (
                              <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200 cursor-pointer transform hover:scale-110" aria-label="Website" onClick={(e) => { e.stopPropagation(); window.open(item.website, '_blank'); }}>
                                <FaExternalLinkAlt className="h-5 w-5" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Conhecer button at bottom of card */}
                      <div className="pt-3 mt-3 border-t border-border/30">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full px-4 py-2 text-sm font-medium border-primary/50 hover:bg-primary hover:text-primary-foreground transition-all duration-200 cursor-pointer"
                          onClick={(e) => handleCardClick(e, item.link)}
                          aria-label={`Conhecer ${item.name}`}
                        >
                          <FaExternalLinkAlt className="w-4 h-4 mr-2" />
                          Conhecer
                        </Button>
                      </div>
                  </div>
                </CardContent>
              </Card>
              ))}
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
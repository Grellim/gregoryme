"use client";

import * as React from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, X, Facebook, Instagram, Twitter, Youtube, MessageCircle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Recommendation {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  link: string;
  type: "person" | "channel";
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
      type: "person"
    },
    {
      id: "2",
      name: "Tech Insights",
      description: "Canal sobre as últimas tendências em tecnologia e desenvolvimento de software.",
      imageUrl: "/channel1.jpg",
      link: "https://youtube.com/techinsights",
      type: "channel"
    },
    {
      id: "3",
      name: "Carlos Santos",
      description: "Especialista em UX/UI Design com foco em acessibilidade e design inclusivo.",
      imageUrl: "/person2.jpg",
      link: "https://linkedin.com/in/carlossantos",
      type: "person"
    },
    {
      id: "4",
      name: "Code Masters",
      description: "Canal educativo com tutoriais de programação e boas práticas de desenvolvimento.",
      imageUrl: "/channel2.jpg",
      link: "https://youtube.com/codemasters",
      type: "channel"
    },
    {
      id: "5",
      name: "Ana Costa",
      description: "Engenheira de Cloud com expertise em AWS e arquitetura de sistemas escaláveis.",
      imageUrl: "/person3.jpg",
      link: "https://twitter.com/anacosta",
      type: "person"
    },
    {
      id: "6",
      name: "Dev Brasil",
      description: "Comunidade de desenvolvedores brasileiros compartilhando conhecimento e experiências.",
      imageUrl: "/channel3.jpg",
      link: "https://discord.gg/devbrasil",
      type: "channel"
    },
    {
      id: "7",
      name: "João Doe",
      description: "Desenvolvedor full-stack apaixonado por JavaScript e tecnologias modernas. Compartilha projetos open-source e tutoriais práticos.",
      imageUrl: "/person1.jpg",
      link: "https://github.com/joaodoe",
      type: "person"
    },
    {
      id: "8",
      name: "TechTalk YT",
      description: "Canal do YouTube sobre desenvolvimento web, mobile e tendências em IA. Conteúdo atualizado semanalmente com dicas práticas.",
      imageUrl: "/channel1.jpg",
      link: "https://youtube.com/techtalkyt",
      type: "channel"
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
                    <div className="p-6">
                      {/* Button positioned top-right - improved styling */}
                      <Button
                        variant="outline"
                        size="sm"
                        className="absolute top-4 right-4 px-4 py-2 text-sm font-medium border-primary/50 hover:bg-primary hover:text-primary-foreground transition-all duration-200 shadow-sm"
                        onClick={(e) => handleCardClick(e, item.link)}
                        aria-label={`Conhecer ${item.name}`}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Conhecer
                      </Button>

                      {/* Main content: Image left, content center */}
                      <div className="flex items-start gap-6">
                        {/* Image - larger and better styled */}
                        <div className="flex-shrink-0 w-28 h-28 rounded-xl overflow-hidden shadow-md ring-1 ring-border/50">
                          <img
                            src={item.imageUrl}
                            alt={`${item.name} - ${item.type === "person" ? "Pessoa" : "Canal"}`}
                            className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
                            loading="lazy"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = item.type === "person" ? "/profile.jpg" : "/channel1.jpg";
                            }}
                          />
                        </div>

                        {/* Content - improved centering and spacing */}
                        <div className="flex-1 space-y-3 min-w-0">
                          {/* Type - better styling */}
                          <div className="text-xs font-semibold uppercase tracking-wide text-primary/80 text-center">
                            {item.type === "person" ? "👤 Pessoa" : "📺 Canal"}
                          </div>
                          
                          {/* Name - improved typography */}
                          <h3 className="text-lg font-bold text-foreground text-center leading-tight">
                            {item.name}
                          </h3>
                          
                          {/* Description - better readability */}
                          <p className="text-sm text-muted-foreground leading-relaxed text-center max-w-md mx-auto">
                            {item.description}
                          </p>
                          
                          {/* Social Media Icons - specific to platforms, centered */}
                          <div className="flex justify-center items-center gap-3 pt-2">
                            {item.link.includes('github.com') && (
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-sm text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200" aria-label="GitHub">
                                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                </svg>
                              </Button>
                            )}
                            {item.link.includes('youtube.com') && (
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-sm text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200" aria-label="YouTube">
                                <Youtube className="h-4 w-4" />
                              </Button>
                            )}
                            {item.link.includes('linkedin.com') && (
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-sm text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200" aria-label="LinkedIn">
                                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                </svg>
                              </Button>
                            )}
                            {item.link.includes('twitter.com') && (
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-sm text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200" aria-label="Twitter">
                                <Twitter className="h-4 w-4" />
                              </Button>
                            )}
                            {item.link.includes('discord.gg') && (
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-sm text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200" aria-label="Discord">
                                <MessageCircle className="h-4 w-4" />
                              </Button>
                            )}
                            {/* Generic Website icon for other links */}
                            {!item.link.includes('github.com') && !item.link.includes('youtube.com') && !item.link.includes('linkedin.com') && !item.link.includes('twitter.com') && !item.link.includes('discord.gg') && (
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-sm text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200" aria-label="Website" onClick={(e) => handleCardClick(e, item.link)}>
                                <ExternalLink className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </div>
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
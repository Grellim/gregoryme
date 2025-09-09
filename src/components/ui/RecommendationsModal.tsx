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
                    <div className="p-4 space-y-3">
                      {/* Header: Image and Button */}
                      <div className="flex items-center justify-between">
                        <div className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden shadow-sm">
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
                        <Button
                          variant="outline"
                          size="sm"
                          className="px-3 py-1.5 text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
                          onClick={(e) => handleCardClick(e, item.link)}
                          aria-label={`Conhecer ${item.name}`}
                        >
                          <ExternalLink className="w-3 h-3 mr-1" />
                          Conhecer
                        </Button>
                      </div>

                      {/* Content */}
                      <div className="space-y-2">
                        {/* Type */}
                        <div className="text-xs font-medium text-muted-foreground">
                          {item.type === "person" ? "👤 Pessoa" : "📺 Canal"}
                        </div>
                        
                        {/* Name */}
                        <h3 className="text-base font-semibold text-foreground">
                          {item.name}
                        </h3>
                        
                        {/* Description */}
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {item.description}
                        </p>
                        
                        {/* Social Media Icons */}
                        <div className="flex items-center gap-2 pt-1">
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-sm text-muted-foreground hover:text-primary transition-colors" aria-label="Facebook">
                            <Facebook className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-sm text-muted-foreground hover:text-primary transition-colors" aria-label="Instagram">
                            <Instagram className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-sm text-muted-foreground hover:text-primary transition-colors" aria-label="Twitter">
                            <Twitter className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-sm text-muted-foreground hover:text-primary transition-colors" aria-label="TikTok">
                            <svg className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M19.88 4.26a4.34 4.34 0 0 1-3.07-.87 4.22 4.22 0 0 1-1.14-2.85 4.29 4.29 0 0 1 2.85-1.14c.25 0 .5.02.75.07a4.22 4.22 0 0 1 1.61.45 4.3 4.3 0 0 1 1.58 1.45l-.05.05a4.24 4.24 0 0 1 .05-.05 4.3 4.3 0 0 1 1.45 1.58 4.22 4.22 0 0 1 .45 1.61c-.05.25-.07.5-.07.75a4.29 4.29 0 0 1-1.14 2.85 4.34 4.34 0 0 1-3.07.87 4.33 4.33 0 0 1-1.44-.25 4.25 4.25 0 0 1-1.06-1.07c-.37-.59-.56-1.3-.56-2.03V5.77a1.99 1.99 0 0 1 .56-1.36 1.98 1.98 0 0 1 1.36-.56c.69 0 1.34.19 1.91.56a1.99 1.99 0 0 1 .83 1.36c0 .25.02.5.07.75a1.99 1.99 0 0 1-.07.75 1.98 1.98 0 0 1-.56 1.06 1.99 1.99 0 0 1-1.06.56 1.98 1.98 0 0 1-1.36.07 1.99 1.99 0 0 1-1.36-.56 1.98 1.98 0 0 1-.56-1.36V3.23a2.99 2.99 0 0 1 .56-1.36 1.98 1.98 0 0 1 1.36-.56c.69 0 1.34.19 1.91.56a1.99 1.99 0 0 1 .83 1.36c0 .25.02.5.07.75a1.99 1.99 0 0 1-.07.75 1.98 1.98 0 0 1-.56 1.06 1.99 1.99 0 0 1-1.06.56 1.98 1.98 0 0 1-1.36.07 1.99 1.99 0 0 1-1.36-.56 1.98 1.98 0 0 1-.56-1.36c0-.73.19-1.44.56-2.03a4.25 4.25 0 0 1 1.06-1.07 4.33 4.33 0 0 1 1.44-.25 4.34 4.34 0 0 1 3.07.87 4.3 4.3 0 0 1 1.45 1.58 4.22 4.22 0 0 1 .45 1.61c0 .25-.02.5-.07.75a4.29 4.29 0 0 1-1.14 2.85z"/>
                            </svg>
                          </Button>
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-sm text-muted-foreground hover:text-primary transition-colors" aria-label="YouTube">
                            <Youtube className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-sm text-muted-foreground hover:text-primary transition-colors" aria-label="Discord">
                            <MessageCircle className="h-3 w-3" />
                          </Button>
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
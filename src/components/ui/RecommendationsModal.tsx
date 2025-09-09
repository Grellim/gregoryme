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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 space-y-0">
              {recommendations.map((item) => (
                <Card
                  key={item.id}
                  className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/30 overflow-hidden cursor-pointer"
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
                    <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 md:gap-4 p-3 sm:p-4 md:p-6 hover:bg-muted/30 transition-colors duration-200">
                      <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-xl overflow-hidden shadow-md group-hover:shadow-lg transition-all duration-300 mx-auto sm:mx-0">
                        <img
                          src={item.imageUrl}
                          alt={`${item.name} - ${item.type === "person" ? "Pessoa" : "Canal"}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = item.type === "person" ? "/profile.jpg" : "/channel1.jpg";
                          }}
                        />
                    
                    <div className="flex-1 min-w-0 space-y-2 sm:space-y-3 md:space-y-4">
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={item.type === "person" ? "secondary" : "outline"}
                          className="text-xs sm:text-sm md:text-base px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 h-auto whitespace-nowrap flex-shrink-0"
                          aria-label={`Tipo: ${item.type === "person" ? "Pessoa" : "Canal"}`}
                        >
                          {item.type === "person" ? "👤 Pessoa" : "📺 Canal"}
                        </Badge>
                      </div>
                      
                      <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold font-poppins leading-tight line-clamp-1 group-hover:text-primary transition-colors">
                        {item.name}
                      </h3>
                      
                      <p className="text-xs sm:text-sm md:text-base lg:text-lg text-muted-foreground leading-tight line-clamp-2 sm:line-clamp-3">
                        {item.description}
                      </p>

                      {/* Social Media Icons */}
                      <div className="flex gap-1 pt-1 sm:pt-2">
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors" aria-label="Facebook">
                          <Facebook className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors" aria-label="Instagram">
                          <Instagram className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors" aria-label="Twitter">
                          <Twitter className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors" aria-label="YouTube">
                          <Youtube className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors" aria-label="Discord">
                          <MessageCircle className="h-3 w-3" />
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between pt-1 sm:pt-2 md:pt-3">
                        <div className="text-xs sm:text-sm md:text-base text-muted-foreground font-medium hidden sm:block">
                          {item.type === "person" ? "💼 Profissional" : "📺 Conteúdo Digital"}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="group-hover:bg-primary group-hover:text-primary-foreground hover:scale-105 active:scale-95 transition-all duration-200 px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-3 h-auto whitespace-nowrap text-xs sm:text-sm md:text-base flex-shrink-0 shadow-sm hover:shadow-md"
                          onClick={(e) => handleCardClick(e, item.link)}
                          aria-label={`Conhecer ${item.name}`}
                        >
                          <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 mr-1.5 sm:mr-2 flex-shrink-0 transition-transform duration-200 group-hover:rotate-12" />
                          Conhecer
                        </Button>
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
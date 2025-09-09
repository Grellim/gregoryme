"use client";

import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, X } from "lucide-react";

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
        className="w-full max-w-[60vw] md:max-w-4xl lg:max-w-5xl xl:max-w-6xl max-h-[95vh] p-0 overflow-hidden sm:rounded-2xl focus:outline-none"
        onKeyDown={handleKeyDown}
        role="dialog"
        aria-label="Modal de recomendações"
        aria-modal="true"
      >
        <DialogHeader className="p-2 sm:p-3 md:p-4 lg:p-6 border-b border-border/50 sticky top-0 bg-background/95 backdrop-blur-sm z-10">
          <div className="text-center space-y-2">
            <DialogTitle className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-poppins leading-tight">
              Minhas Recomendações
            </DialogTitle>
            <DialogDescription className="text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed px-2">
              Pessoas e canais que me inspiram e que recomendo para você conhecer. Cada um deles tem algo especial para oferecer no mundo da tecnologia e desenvolvimento.
            </DialogDescription>
          </div>
          <Button
            onClick={onClose}
            className="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4 bg-background/80 hover:bg-background text-foreground border border-border/50 rounded-full p-1.5 sm:p-2 transition-all duration-200 flex items-center justify-center h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 z-20 focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Fechar modal de recomendações"
            variant="ghost"
            size="icon"
          >
            <X className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto p-2 sm:p-3 md:p-4 lg:p-6 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
          <div className="space-y-2 sm:space-y-3 md:space-y-4">
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
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 p-3 sm:p-4 md:p-5 hover:bg-muted/30 transition-colors duration-200">
                    <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-xl overflow-hidden shadow-md group-hover:shadow-lg transition-all duration-300">
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
                    </div>
                    
                    <div className="flex-1 min-w-0 space-y-2 sm:space-y-3">
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant={item.type === "person" ? "secondary" : "outline"} 
                          className="text-xs sm:text-sm px-2 sm:px-3 py-1 h-auto whitespace-nowrap flex-shrink-0"
                          aria-label={`Tipo: ${item.type === "person" ? "Pessoa" : "Canal"}`}
                        >
                          {item.type === "person" ? "👤 Pessoa" : "📺 Canal"}
                        </Badge>
                      </div>
                      
                      <h3 className="text-base sm:text-lg md:text-xl font-bold font-poppins leading-tight line-clamp-1 group-hover:text-primary transition-colors">
                        {item.name}
                      </h3>
                      
                      <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-tight line-clamp-2 sm:line-clamp-3">
                        {item.description}
                      </p>
                      
                      <div className="flex items-center justify-between pt-1 sm:pt-2">
                        <div className="text-xs sm:text-sm text-muted-foreground font-medium hidden sm:block">
                          {item.type === "person" ? "💼 Profissional" : "📺 Conteúdo Digital"}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 px-3 sm:px-4 py-1.5 sm:py-2 h-auto whitespace-nowrap text-xs sm:text-sm flex-shrink-0"
                          onClick={(e) => handleCardClick(e, item.link)}
                          aria-label={`Visitar ${item.name}`}
                        >
                          <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 flex-shrink-0" />
                          Visitar
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
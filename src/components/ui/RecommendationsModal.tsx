"use client";

import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

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

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-6xl w-[95vw] max-h-[90vh] sm:w-[90vw] p-0 overflow-hidden">
        <DialogHeader className="p-8 border-b border-border">
          <DialogTitle className="text-3xl font-bold font-poppins">Minhas Recomendações</DialogTitle>
          <DialogDescription className="mt-2 text-lg">
            Pessoas e canais que me inspiram e que recomendo para você conhecer. Cada um deles tem algo especial para oferecer.
          </DialogDescription>
        </DialogHeader>
        
        <div className="p-8 overflow-y-auto max-h-[calc(90vh-160px)]">
          <div className="space-y-8">
            {recommendations.map((item) => (
              <div
                key={item.id}
                className="group flex gap-8 hover:bg-muted/50 p-6 rounded-xl transition-all duration-300 cursor-pointer border border-border hover:border-primary/50 hover:shadow-lg"
                onClick={(e) => handleCardClick(e, item.link)}
              >
                <div className="flex-shrink-0 w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = item.type === "person" ? "/profile.jpg" : "/channel1.jpg";
                    }}
                  />
                </div>
                <div className="flex-1 min-w-0 py-2">
                  <div className="flex items-center gap-4 mb-4">
                    <Badge variant={item.type === "person" ? "secondary" : "outline"} className="text-base px-3 py-1">
                      {item.type === "person" ? "👤 Pessoa" : "📺 Canal"}
                    </Badge>
                  </div>
                  <h3 className="text-2xl font-bold font-poppins mb-3 line-clamp-1 group-hover:text-primary transition-colors">{item.name}</h3>
                  <p className="text-lg text-muted-foreground mb-6 leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      {item.type === "person" ? "💼 Profissional" : "📺 Conteúdo"}
                    </div>
                    <Button
                      variant="outline"
                      size="lg"
                      className="group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 px-6 py-2"
                      onClick={(e) => handleCardClick(e, item.link)}
                    >
                      <ExternalLink className="w-5 h-5 mr-2" />
                      Visitar Agora
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
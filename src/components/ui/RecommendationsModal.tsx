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
      <DialogContent className="max-w-6xl max-h-[90vh] p-0 overflow-hidden">
        <DialogHeader className="p-6 border-b border-border">
          <DialogTitle className="text-2xl font-bold font-poppins">Pessoas e Canais Recomendados</DialogTitle>
          <DialogDescription className="mt-1">
            Conheça profissionais e canais que inspiram e ensinam
          </DialogDescription>
        </DialogHeader>
        
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {recommendations.map((item) => (
              <Card
                key={item.id}
                className="hover:shadow-lg transition-all duration-300 hover:scale-105 overflow-hidden group cursor-pointer"
                onClick={(e) => handleCardClick(e, item.link)}
              >
                <CardContent className="p-0">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = item.type === "person" ? "/profile.jpg" : "/channel1.jpg";
                      }}
                    />
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <Badge variant={item.type === "person" ? "secondary" : "outline"} className="text-xs">
                        {item.type === "person" ? "👤 Pessoa" : "📺 Canal"}
                      </Badge>
                    </div>
                    <h3 className="text-lg font-semibold font-poppins line-clamp-2">{item.name}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full group-hover:bg-purple-50 dark:group-hover:bg-purple-900/20"
                      onClick={(e) => handleCardClick(e, item.link)}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Visitar
                    </Button>
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
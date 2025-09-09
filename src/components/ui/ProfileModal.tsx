"use client";

import * as React from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ExternalLink, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ProfileData {
  name: string;
  bio: string;
}

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: ProfileData;
  onSave: (data: ProfileData) => void;
}

export default function ProfileModal({ isOpen, onClose, initialData, onSave }: ProfileModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[60%] max-w-[60vw] md:max-w-4xl lg:max-w-5xl xl:max-w-6xl max-h-[95vh] p-0 overflow-y-auto pb-[25px] rounded-2xl focus:outline-none border border-border/50 scrollbar scrollbar-w-4 scrollbar-thumb-gray-400 scrollbar-track-transparent">
        <DialogHeader className="p-4 sm:p-6 md:p-8 lg:p-10 border-b border-border/50">
          <div className="text-center space-y-2 sm:space-y-3">
            <DialogTitle className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
              Sobre Mim
            </DialogTitle>
            <DialogDescription className="text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed px-2">
              Saiba mais sobre mim e meu trabalho como desenvolvedor full-stack especializado em soluções modernas e inovadoras que transformam negócios e experiências digitais.
            </DialogDescription>
          </div>
        </DialogHeader>
        
        <ScrollArea className="w-full h-[70vh] pr-4 flex-1">
          <div className="w-full h-full pt-4 sm:pt-6 md:pt-8 px-4 sm:px-6 md:px-8 lg:px-10 space-y-6 sm:space-y-8 md:space-y-10">
            {/* Profile Section */}
            <section className="flex flex-col lg:flex-row gap-4 sm:gap-6 md:gap-8 lg:gap-10 items-center justify-center lg:justify-start w-full">
              <div className="flex-shrink-0 order-2 lg:order-1 w-full lg:w-auto max-w-xs mx-auto lg:mx-0">
                <div className="relative group p-0 m-0">
                  <Avatar className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 xl:w-56 xl:h-56 border-4 border-primary/20 shadow-xl sm:shadow-2xl transition-all duration-300 group-hover:shadow-2xl md:group-hover:shadow-3xl mx-auto p-0 m-0">
                    <AvatarImage src="/profile.jpg" alt="Foto de perfil" />
                    <AvatarFallback className="text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl bg-gradient-to-br from-primary to-secondary font-bold">GV</AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-primary rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300 -translate-x-1 -translate-y-1 p-0 m-0">
                    <span className="text-sm sm:text-base md:text-lg">👨‍💻</span>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 text-center lg:text-left order-1 lg:order-2 w-full space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-8">
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 sm:mb-3 md:mb-4 lg:mb-6 font-poppins bg-gradient-to-r from-primary via-purple-600 to-secondary bg-clip-text text-transparent leading-tight p-0 m-0">
                  Gregory Vallim
                </h1>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-muted-foreground leading-relaxed max-w-full p-0 m-0">
                  Desenvolvedor full-stack apaixonado por criar soluções inovadoras e impactantes.
                  Especializado em tecnologias modernas com foco em performance, segurança e experiência do usuário excepcional.
                </p>
                <div className="flex flex-wrap gap-1.5 sm:gap-2 md:gap-3 lg:gap-4 justify-center lg:justify-start">
                  <Badge variant="secondary" className="text-xs sm:text-sm md:text-base px-2 sm:px-3 py-1.5 sm:py-2 md:py-2.5 lg:py-3 h-auto whitespace-normal p-0 m-0">
                    🚀 Full-Stack Developer
                  </Badge>
                  <Badge variant="outline" className="text-xs sm:text-sm md:text-base px-2 sm:px-3 py-1.5 sm:py-2 md:py-2.5 lg:py-3 h-auto whitespace-normal p-0 m-0">
                    💻 React & Next.js Expert
                  </Badge>
                  <Badge variant="secondary" className="text-xs sm:text-sm md:text-base px-2 sm:px-3 py-1.5 sm:py-2 md:py-2.5 lg:py-3 h-auto whitespace-normal p-0 m-0">
                    🎨 UI/UX Design
                  </Badge>
                  <Badge variant="outline" className="text-xs sm:text-sm md:text-base px-2 sm:px-3 py-1.5 sm:py-2 md:py-2.5 lg:py-3 h-auto whitespace-normal p-0 m-0">
                    ☁️ Cloud & DevOps
                  </Badge>
                  <Badge variant="secondary" className="text-xs sm:text-sm md:text-base px-2 sm:px-3 py-1.5 sm:py-2 md:py-2.5 lg:py-3 h-auto whitespace-normal p-0 m-0">
                    🧠 Problem Solver
                  </Badge>
                </div>
              </div>
            </section>
            
            {/* Content Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10 w-full">
              <article className="space-y-0 bg-muted/20 sm:bg-muted/30 rounded-xl sm:rounded-2xl border border-border/30 w-full">
                <div className="p-4 sm:p-6 md:p-8 lg:p-10 space-y-4 sm:space-y-6 md:space-y-8">
                  <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold flex items-center gap-2 p-0 m-0">
                    <span className="text-primary text-base sm:text-lg md:text-xl lg:text-2xl">🎯</span> Experiência
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base lg:text-lg text-muted-foreground leading-relaxed p-0 m-0">
                    Mais de 5 anos desenvolvendo aplicações web e mobile modernas.
                    Especializado em criar interfaces intuitivas, sistemas escaláveis e soluções que realmente fazem a diferença para empresas e usuários.
                  </p>
                </div>
              </article>
              
              <article className="space-y-0 bg-muted/20 sm:bg-muted/30 rounded-xl sm:rounded-2xl border border-border/30 w-full">
                <div className="p-4 sm:p-6 md:p-8 lg:p-10 space-y-4 sm:space-y-6 md:space-y-8">
                  <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold flex items-center gap-2 p-0 m-0">
                    <span className="text-primary text-base sm:text-lg md:text-xl lg:text-2xl">🔧</span> Stack Tecnológica
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1.5 sm:gap-2 md:gap-3 lg:gap-4 w-full">
                    <Badge variant="outline" className="text-xs sm:text-sm md:text-base justify-center py-1.5 sm:py-2 md:py-2.5 lg:py-3 p-0 m-0">React</Badge>
                    <Badge variant="outline" className="text-xs sm:text-sm md:text-base justify-center py-1.5 sm:py-2 md:py-2.5 lg:py-3 p-0 m-0">Next.js</Badge>
                    <Badge variant="outline" className="text-xs sm:text-sm md:text-base justify-center py-1.5 sm:py-2 md:py-2.5 lg:py-3 p-0 m-0">TypeScript</Badge>
                    <Badge variant="outline" className="text-xs sm:text-sm md:text-base justify-center py-1.5 sm:py-2 md:py-2.5 lg:py-3 p-0 m-0">Node.js</Badge>
                    <Badge variant="outline" className="text-xs sm:text-sm md:text-base justify-center py-1.5 sm:py-2 md:py-2.5 lg:py-3 p-0 m-0">Tailwind</Badge>
                    <Badge variant="outline" className="text-xs sm:text-sm md:text-base justify-center py-1.5 sm:py-2 md:py-2.5 lg:py-3 p-0 m-0">Prisma</Badge>
                    <Badge variant="outline" className="text-xs sm:text-sm md:text-base justify-center py-1.5 sm:py-2 md:py-2.5 lg:py-3 p-0 m-0">PostgreSQL</Badge>
                    <Badge variant="outline" className="text-xs sm:text-sm md:text-base justify-center py-1.5 sm:py-2 md:py-2.5 lg:py-3 p-0 m-0">AWS</Badge>
                  </div>
                </div>
              </article>
              
              <article className="space-y-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl sm:rounded-2xl border border-primary/20 lg:col-span-1 w-full">
                <div className="p-4 sm:p-6 md:p-8 lg:p-10 space-y-4 sm:space-y-6 md:space-y-8">
                  <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold flex items-center gap-2 p-0 m-0">
                    <span className="text-primary text-base sm:text-lg md:text-xl lg:text-2xl">🚀</span> Minha Missão
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base lg:text-lg text-muted-foreground leading-relaxed p-0 m-0">
                    Criar experiências digitais que transformam vidas e negócios através da tecnologia.
                    Acredito que cada projeto deve ser uma oportunidade de inovar e impactar positivamente o mundo ao nosso redor.
                  </p>
                </div>
              </article>
            </div>
  </div>
          </ScrollArea>
        
        <DialogFooter className="p-4 sm:p-6 md:p-8 lg:p-10 border-t border-border bg-muted/20 sm:bg-muted/30">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8 w-full justify-center sm:justify-start">
            <Button
              onClick={() => window.open('https://github.com/gregoryvallim', '_blank')}
              className="w-full sm:w-auto text-sm sm:text-base md:text-lg lg:text-xl py-2.5 sm:py-3 md:py-4 lg:py-5 px-4 sm:px-6 md:px-8 lg:px-10 h-auto flex-1 sm:flex-none focus-visible:ring-2 focus-visible:ring-primary"
              size="lg"
              variant="default"
            >
              <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 mr-2 flex-shrink-0" />
              Ver Meu Portfólio
            </Button>
            <Button
              onClick={onClose}
              className="w-full sm:w-auto text-sm sm:text-base md:text-lg lg:text-xl py-2.5 sm:py-3 md:py-4 lg:py-5 px-4 sm:px-6 md:px-8 lg:px-10 h-auto flex-1 sm:flex-none focus-visible:ring-2 focus-visible:ring-primary"
              size="lg"
              variant="outline"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 mr-2 flex-shrink-0" />
              Fechar
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
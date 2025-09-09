"use client";

import * as React from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ExternalLink, X } from "lucide-react";

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
      <DialogContent className="w-full max-w-[60vw] md:max-w-4xl lg:max-w-5xl xl:max-w-6xl max-h-[95vh] p-0 overflow-hidden sm:rounded-2xl focus:outline-none pb-6">
        <DialogHeader className="p-3 sm:p-4 md:p-6 lg:p-8 border-b border-border/50">
          <div className="text-center space-y-2 sm:space-y-3">
            <DialogTitle className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
              Sobre Mim
            </DialogTitle>
            <DialogDescription className="text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed px-2">
              Saiba mais sobre mim e meu trabalho como desenvolvedor full-stack especializado em soluções modernas e inovadoras que transformam negócios e experiências digitais.
            </DialogDescription>
          </div>
        </DialogHeader>
        
        <div className="w-full flex-1 overflow-y-auto px-3 sm:px-4 md:px-6 lg:px-8 pt-9 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent/50 scrollbar-thumb-rounded">
          <div className="w-full space-y-4 sm:space-y-6 md:space-y-8 py-2">
            {/* Profile Section */}
            <section className="flex flex-col lg:flex-row gap-4 sm:gap-6 md:gap-8 items-center justify-center lg:justify-start w-full">
              <div className="flex-shrink-0 order-2 lg:order-1 w-full lg:w-auto max-w-xs mx-auto lg:mx-0">
                <div className="relative group">
                  <Avatar className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 xl:w-56 xl:h-56 border-4 border-primary/20 shadow-xl sm:shadow-2xl transition-all duration-300 group-hover:shadow-2xl md:group-hover:shadow-3xl mx-auto">
                    <AvatarImage src="/profile.jpg" alt="Foto de perfil" />
                    <AvatarFallback className="text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl bg-gradient-to-br from-primary to-secondary font-bold">GV</AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-primary rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300 -translate-x-1 -translate-y-1">
                    <span className="text-sm sm:text-base md:text-lg">👨‍💻</span>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 text-center lg:text-left order-1 lg:order-2 w-full space-y-3 sm:space-y-4 md:space-y-6">
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 sm:mb-3 md:mb-4 font-poppins bg-gradient-to-r from-primary via-purple-600 to-secondary bg-clip-text text-transparent leading-tight">
                  Gregory Vallim
                </h1>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-muted-foreground leading-relaxed max-w-full">
                  Desenvolvedor full-stack apaixonado por criar soluções inovadoras e impactantes. 
                  Especializado em tecnologias modernas com foco em performance, segurança e experiência do usuário excepcional.
                </p>
                <div className="flex flex-wrap gap-1.5 sm:gap-2 md:gap-3 justify-center lg:justify-start">
                  <Badge variant="secondary" className="text-xs sm:text-sm md:text-base px-2 sm:px-3 py-1.5 sm:py-2 md:py-2.5 h-auto whitespace-normal">
                    🚀 Full-Stack Developer
                  </Badge>
                  <Badge variant="outline" className="text-xs sm:text-sm md:text-base px-2 sm:px-3 py-1.5 sm:py-2 md:py-2.5 h-auto whitespace-normal">
                    💻 React & Next.js Expert
                  </Badge>
                  <Badge variant="secondary" className="text-xs sm:text-sm md:text-base px-2 sm:px-3 py-1.5 sm:py-2 md:py-2.5 h-auto whitespace-normal">
                    🎨 UI/UX Design
                  </Badge>
                  <Badge variant="outline" className="text-xs sm:text-sm md:text-base px-2 sm:px-3 py-1.5 sm:py-2 md:py-2.5 h-auto whitespace-normal">
                    ☁️ Cloud & DevOps
                  </Badge>
                  <Badge variant="secondary" className="text-xs sm:text-sm md:text-base px-2 sm:px-3 py-1.5 sm:py-2 md:py-2.5 h-auto whitespace-normal">
                    🧠 Problem Solver
                  </Badge>
                </div>
              </div>
            </section>
            
            {/* Content Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 w-full">
              <article className="space-y-3 p-4 sm:p-6 md:p-8 bg-muted/20 sm:bg-muted/30 rounded-xl sm:rounded-2xl border border-border/30 w-full">
                <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold flex items-center gap-2">
                  <span className="text-primary text-base sm:text-lg md:text-xl">🎯</span> Experiência
                </h3>
                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-muted-foreground leading-relaxed">
                  Mais de 5 anos desenvolvendo aplicações web e mobile modernas.
                  Especializado em criar interfaces intuitivas, sistemas escaláveis e soluções que realmente fazem a diferença para empresas e usuários.
                </p>
              </article>
              
              <article className="space-y-3 p-4 sm:p-6 md:p-8 bg-muted/20 sm:bg-muted/30 rounded-xl sm:rounded-2xl border border-border/30 w-full">
                <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold flex items-center gap-2">
                  <span className="text-primary text-base sm:text-lg md:text-xl">🔧</span> Stack Tecnológica
                </h3>
                <div className="grid grid-cols-2 gap-1.5 sm:gap-2 md:gap-3 w-full">
                  <Badge variant="outline" className="text-xs sm:text-sm md:text-base justify-center py-1.5 sm:py-2">React</Badge>
                  <Badge variant="outline" className="text-xs sm:text-sm md:text-base justify-center py-1.5 sm:py-2">Next.js</Badge>
                  <Badge variant="outline" className="text-xs sm:text-sm md:text-base justify-center py-1.5 sm:py-2">TypeScript</Badge>
                  <Badge variant="outline" className="text-xs sm:text-sm md:text-base justify-center py-1.5 sm:py-2">Node.js</Badge>
                  <Badge variant="outline" className="text-xs sm:text-sm md:text-base justify-center py-1.5 sm:py-2">Tailwind</Badge>
                  <Badge variant="outline" className="text-xs sm:text-sm md:text-base justify-center py-1.5 sm:py-2">Prisma</Badge>
                  <Badge variant="outline" className="text-xs sm:text-sm md:text-base justify-center py-1.5 sm:py-2">PostgreSQL</Badge>
                  <Badge variant="outline" className="text-xs sm:text-sm md:text-base justify-center py-1.5 sm:py-2">AWS</Badge>
                </div>
              </article>
              
              <article className="space-y-3 p-3 sm:p-4 md:p-6 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl sm:rounded-2xl border border-primary/20 lg:col-span-1 w-full">
                <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold flex items-center gap-2">
                  <span className="text-primary text-base sm:text-lg md:text-xl">🚀</span> Minha Missão
                </h3>
                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-muted-foreground leading-relaxed">
                  Criar experiências digitais que transformam vidas e negócios através da tecnologia.
                  Acredito que cada projeto deve ser uma oportunidade de inovar e impactar positivamente o mundo ao nosso redor.
                </p>
              </article>
            </div>
          </div>
        </div>
        
        <DialogFooter className="p-3 sm:p-4 md:p-6 lg:p-8 border-t border-border bg-muted/20 sm:bg-muted/30">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full justify-center sm:justify-start">
            <Button 
              onClick={() => window.open('https://github.com/gregoryvallim', '_blank')} 
              className="w-full sm:w-auto text-sm sm:text-base md:text-lg lg:text-xl py-2.5 sm:py-3 md:py-4 px-4 sm:px-6 md:px-8 h-auto flex-1 sm:flex-none focus-visible:ring-2 focus-visible:ring-primary"
              size="lg"
              variant="default"
            >
              <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mr-2 flex-shrink-0" />
              Ver Meu Portfólio
            </Button>
            <Button 
              onClick={onClose}
              className="w-full sm:w-auto text-sm sm:text-base md:text-lg lg:text-xl py-2.5 sm:py-3 md:py-4 px-4 sm:px-6 md:px-8 h-auto flex-1 sm:flex-none focus-visible:ring-2 focus-visible:ring-primary"
              size="lg"
              variant="outline"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mr-2 flex-shrink-0" />
              Fechar
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
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
      <DialogContent className="w-[60%] max-w-[60vw] md:max-w-4xl lg:max-w-5xl xl:max-w-6xl max-h-[95vh] p-0 overflow-y-auto pb-[25px] rounded-2xl focus:outline-none border border-border/50 scrollbar scrollbar-w-4 scrollbar-thumb-gray-400 scrollbar-track-transparent" role="dialog" aria-label="Modal de perfil">
        <DialogHeader className="p-4 sm:p-6 md:p-8 lg:p-10 border-b border-border/50">
          <div className="text-center space-y-4 sm:space-y-6">
            <DialogTitle className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
              Sobre Mim
            </DialogTitle>
            <DialogDescription className="text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed">
              Saiba mais sobre mim e meu trabalho como desenvolvedor full-stack especializado em soluções modernas e inovadoras que transformam negócios e experiências digitais.
            </DialogDescription>
          </div>
        </DialogHeader>
        
        <ScrollArea className="w-full h-[70vh] pr-4 flex-1">
          <div className="w-full h-full pt-4 sm:pt-6 md:pt-8 px-4 sm:px-6 md:px-8 lg:px-10 space-y-6 sm:space-y-8 md:space-y-10">
            {/* Profile Section */}
            <section className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8 items-center justify-center lg:justify-start w-full">
              <div className="flex-shrink-0 order-2 lg:order-1 w-full lg:w-auto max-w-xs mx-auto lg:mx-0">
                <div className="relative group">
                  <Avatar className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 border-4 border-primary/20 shadow-xl sm:shadow-2xl transition-all duration-300 group-hover:shadow-2xl md:group-hover:shadow-3xl mx-auto" aria-label="Foto de perfil de Gregory Vallim">
                    <AvatarImage src="/profile.jpg" alt="Foto de perfil" />
                    <AvatarFallback className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl bg-gradient-to-br from-primary to-secondary font-bold">GV</AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-primary rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300 -translate-x-1 -translate-y-1">
                    <span className="text-base sm:text-lg md:text-xl">👨‍💻</span>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 text-center lg:text-left order-1 lg:order-2 w-full space-y-4 sm:space-y-6">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 font-poppins bg-gradient-to-r from-primary via-purple-600 to-secondary bg-clip-text text-transparent leading-tight">
                  Gregory Vallim
                </h1>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-full">
                  Desenvolvedor full-stack apaixonado por criar soluções inovadoras e impactantes.
                  Especializado em tecnologias modernas com foco em performance, segurança e experiência do usuário excepcional.
                </p>
                <div className="flex flex-wrap gap-2 sm:gap-3 lg:gap-4 justify-center lg:justify-start">
                  <Badge variant="secondary" className="text-sm sm:text-base px-3 py-2 h-auto whitespace-normal">
                    🚀 Full-Stack Developer
                  </Badge>
                  <Badge variant="outline" className="text-sm sm:text-base px-3 py-2 h-auto whitespace-normal">
                    💻 React & Next.js Expert
                  </Badge>
                  <Badge variant="secondary" className="text-sm sm:text-base px-3 py-2 h-auto whitespace-normal">
                    🎨 UI/UX Design
                  </Badge>
                  <Badge variant="outline" className="text-sm sm:text-base px-3 py-2 h-auto whitespace-normal">
                    ☁️ Cloud & DevOps
                  </Badge>
                  <Badge variant="secondary" className="text-sm sm:text-base px-3 py-2 h-auto whitespace-normal">
                    🧠 Problem Solver
                  </Badge>
                </div>
              </div>
            </section>
            
            {/* Content Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 w-full">
              <article className="space-y-0 bg-muted/20 sm:bg-muted/30 rounded-xl sm:rounded-2xl border border-border/30 w-full">
                <div className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
                  <h3 className="text-base sm:text-lg lg:text-xl font-semibold flex items-center gap-2">
                    <span className="text-primary text-base sm:text-lg lg:text-xl">🎯</span> Experiência
                  </h3>
                  <p className="text-xs sm:text-sm lg:text-base text-muted-foreground leading-relaxed">
                    Mais de 5 anos desenvolvendo aplicações web e mobile modernas.
                    Especializado em criar interfaces intuitivas, sistemas escaláveis e soluções que realmente fazem a diferença para empresas e usuários.
                  </p>
                </div>
              </article>
              
              <article className="space-y-0 bg-muted/20 sm:bg-muted/30 rounded-xl sm:rounded-2xl border border-border/30 w-full">
                <div className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
                  <h3 className="text-base sm:text-lg lg:text-xl font-semibold flex items-center gap-2">
                    <span className="text-primary text-base sm:text-lg lg:text-xl">🔧</span> Stack Tecnológica
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3 lg:gap-4 w-full">
                    <Badge variant="outline" className="text-xs sm:text-sm lg:text-base justify-center py-2 px-3">React</Badge>
                    <Badge variant="outline" className="text-xs sm:text-sm lg:text-base justify-center py-2 px-3">Next.js</Badge>
                    <Badge variant="outline" className="text-xs sm:text-sm lg:text-base justify-center py-2 px-3">TypeScript</Badge>
                    <Badge variant="outline" className="text-xs sm:text-sm lg:text-base justify-center py-2 px-3">Node.js</Badge>
                    <Badge variant="outline" className="text-xs sm:text-sm lg:text-base justify-center py-2 px-3">Tailwind</Badge>
                    <Badge variant="outline" className="text-xs sm:text-sm lg:text-base justify-center py-2 px-3">Prisma</Badge>
                    <Badge variant="outline" className="text-xs sm:text-sm lg:text-base justify-center py-2 px-3">PostgreSQL</Badge>
                    <Badge variant="outline" className="text-xs sm:text-sm lg:text-base justify-center py-2 px-3">AWS</Badge>
                  </div>
                </div>
              </article>
              
              <article className="space-y-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl sm:rounded-2xl border border-primary/20 lg:col-span-1 w-full">
                <div className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
                  <h3 className="text-base sm:text-lg lg:text-xl font-semibold flex items-center gap-2">
                    <span className="text-primary text-base sm:text-lg lg:text-xl">🚀</span> Minha Missão
                  </h3>
                  <p className="text-xs sm:text-sm lg:text-base text-muted-foreground leading-relaxed">
                    Criar experiências digitais que transformam vidas e negócios através da tecnologia.
                    Acredito que cada projeto deve ser uma oportunidade de inovar e impactar positivamente o mundo ao nosso redor.
                  </p>
                </div>
              </article>
            </div>
  </div>
          </ScrollArea>
        
        <DialogFooter className="p-4 sm:p-6 lg:p-8 border-t border-border bg-muted/20 sm:bg-muted/30">
          <div className="flex justify-center">
            <Button
              onClick={onClose}
              className="text-sm sm:text-base lg:text-lg py-3 px-6 h-auto focus-visible:ring-2 focus-visible:ring-primary"
              size="lg"
              variant="outline"
              aria-label="Fechar modal de perfil"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 mr-2 flex-shrink-0" />
              Fechar
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
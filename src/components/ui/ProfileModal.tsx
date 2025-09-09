"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
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
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ProfileData>({
    defaultValues: initialData,
  });

  React.useEffect(() => {
    if (isOpen) {
      reset(initialData);
    }
  }, [isOpen, initialData, reset]);

  const onSubmit = (data: ProfileData) => {
    onSave(data);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-none max-h-[95vh] p-0">
        <DialogHeader className="p-4 sm:p-6 md:p-8 lg:p-10">
          <div className="text-center">
            <DialogTitle className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
              Sobre Mim
            </DialogTitle>
            <DialogDescription className="text-sm sm:text-base md:text-lg lg:text-xl max-w-4xl mx-auto px-4">
              Saiba mais sobre mim e meu trabalho como desenvolvedor full-stack especializado em soluções modernas e inovadoras que transformam negócios e experiências digitais.
            </DialogDescription>
          </div>
        </DialogHeader>
        <div className="px-4 sm:px-6 md:px-8 lg:px-10 pb-6 sm:pb-8 md:pb-10 overflow-y-auto max-h-[calc(95vh-140px)]">
          <div className="max-w-7xl mx-auto space-y-8 sm:space-y-10">
            {/* Profile Section */}
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 items-center">
              <div className="flex-shrink-0 order-2 lg:order-1">
                <div className="relative group">
                  <Avatar className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-64 lg:h-64 xl:w-80 xl:h-80 border-4 border-primary/20 shadow-2xl transition-all duration-300 group-hover:shadow-3xl">
                    <AvatarImage src="/profile.jpg" />
                    <AvatarFallback className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl bg-gradient-to-br from-primary to-secondary">GV</AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 bg-primary rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300">
                    <span className="text-lg sm:text-xl md:text-2xl">👨‍💻</span>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 text-center lg:text-left order-1 lg:order-2">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 font-poppins bg-gradient-to-r from-primary via-purple-600 to-secondary bg-clip-text text-transparent">
                  Gregory Vallim
                </h2>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed max-w-3xl mx-auto lg:mx-0">
                  Desenvolvedor full-stack apaixonado por criar soluções inovadoras e impactantes.
                  Especializado em tecnologias modernas com foco em performance, segurança e experiência do usuário excepcional.
                </p>
                <div className="flex flex-wrap gap-2 sm:gap-3 justify-center lg:justify-start mb-6 sm:mb-8">
                  <Badge variant="secondary" className="text-sm sm:text-base md:text-lg px-3 sm:px-4 py-2 h-auto whitespace-normal">
                    🚀 Full-Stack Developer
                  </Badge>
                  <Badge variant="outline" className="text-sm sm:text-base md:text-lg px-3 sm:px-4 py-2 h-auto whitespace-normal">
                    💻 React & Next.js Expert
                  </Badge>
                  <Badge variant="secondary" className="text-sm sm:text-base md:text-lg px-3 sm:px-4 py-2 h-auto whitespace-normal">
                    🎨 UI/UX Design
                  </Badge>
                  <Badge variant="outline" className="text-sm sm:text-base md:text-lg px-3 sm:px-4 py-2 h-auto whitespace-normal">
                    ☁️ Cloud & DevOps
                  </Badge>
                  <Badge variant="secondary" className="text-sm sm:text-base md:text-lg px-3 sm:px-4 py-2 h-auto whitespace-normal">
                    🧠 Problem Solver
                  </Badge>
                </div>
              </div>
            </div>
            
            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
              <div className="space-y-4 p-6 sm:p-8 bg-muted/30 rounded-2xl border border-border/50">
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold flex items-center gap-3">
                  <span className="text-primary text-lg sm:text-xl">🎯</span> Experiência
                </h3>
                <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
                  Mais de 5 anos desenvolvendo aplicações web e mobile modernas.
                  Especializado em criar interfaces intuitivas, sistemas escaláveis e soluções que realmente fazem a diferença para empresas e usuários.
                </p>
              </div>
              
              <div className="space-y-4 p-6 sm:p-8 bg-muted/30 rounded-2xl border border-border/50">
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold flex items-center gap-3">
                  <span className="text-primary text-lg sm:text-xl">🔧</span> Stack Tecnológica
                </h3>
                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  <Badge variant="outline" className="text-xs sm:text-sm md:text-base justify-center py-2">React</Badge>
                  <Badge variant="outline" className="text-xs sm:text-sm md:text-base justify-center py-2">Next.js</Badge>
                  <Badge variant="outline" className="text-xs sm:text-sm md:text-base justify-center py-2">TypeScript</Badge>
                  <Badge variant="outline" className="text-xs sm:text-sm md:text-base justify-center py-2">Node.js</Badge>
                  <Badge variant="outline" className="text-xs sm:text-sm md:text-base justify-center py-2">Tailwind</Badge>
                  <Badge variant="outline" className="text-xs sm:text-sm md:text-base justify-center py-2">Prisma</Badge>
                  <Badge variant="outline" className="text-xs sm:text-sm md:text-base justify-center py-2">PostgreSQL</Badge>
                  <Badge variant="outline" className="text-xs sm:text-sm md:text-base justify-center py-2">AWS</Badge>
                </div>
              </div>
              
              <div className="space-y-4 p-6 sm:p-8 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl border border-primary/20 md:col-span-2 lg:col-span-1">
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold flex items-center gap-3">
                  <span className="text-primary text-lg sm:text-xl">🚀</span> Minha Missão
                </h3>
                <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
                  Criar experiências digitais que transformam vidas e negócios através da tecnologia.
                  Acredito que cada projeto deve ser uma oportunidade de inovar e impactar positivamente o mundo ao nosso redor.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter className="p-4 sm:p-6 md:p-8 lg:p-10 border-t border-border bg-muted/30">
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center sm:justify-start max-w-4xl mx-auto">
            <Button
              onClick={() => window.open('https://github.com/gregoryvallim', '_blank')}
              className="w-full sm:w-auto text-base sm:text-lg md:text-xl py-3 sm:py-4 px-6 sm:px-8 h-auto flex-1 sm:flex-none"
              size="lg"
              variant="default"
            >
              <ExternalLink className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
              Ver Meu Portfólio
            </Button>
            <Button
              onClick={onClose}
              className="w-full sm:w-auto text-base sm:text-lg md:text-xl py-3 sm:py-4 px-6 sm:px-8 h-auto flex-1 sm:flex-none"
              size="lg"
              variant="outline"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
              Fechar
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
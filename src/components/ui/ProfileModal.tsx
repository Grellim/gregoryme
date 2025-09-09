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
import { ExternalLink } from "lucide-react";

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
      <DialogContent className="max-w-5xl w-[98vw] max-h-[95vh] sm:w-[95vw] md:w-[90vw]">
        <DialogHeader className="p-6 sm:p-8">
          <DialogTitle className="text-3xl sm:text-4xl font-bold">Sobre Mim</DialogTitle>
          <DialogDescription className="text-lg sm:text-xl mt-3 leading-relaxed">
            Saiba mais sobre mim e meu trabalho como desenvolvedor full-stack especializado em soluções modernas e inovadoras.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-8 py-6 px-4 sm:px-8">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
            <div className="flex-shrink-0 order-2 lg:order-1">
              <div className="relative">
                <Avatar className="w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 border-4 border-primary/20 shadow-2xl">
                  <AvatarImage src="/profile.jpg" />
                  <AvatarFallback className="text-4xl sm:text-5xl bg-gradient-to-br from-primary to-secondary">GV</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-2 -right-2 w-12 h-12 sm:w-16 sm:h-16 bg-primary rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-2xl sm:text-3xl">👨‍💻</span>
                </div>
              </div>
            </div>
            <div className="flex-1 text-center lg:text-left order-1 lg:order-2">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 font-poppins bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Gregory Vallim
              </h2>
              <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Desenvolvedor full-stack apaixonado por criar soluções inovadoras e impactantes.
                Especializado em tecnologias modernas com foco em performance, segurança e experiência do usuário excepcional.
              </p>
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-8">
                <Badge variant="secondary" className="text-base sm:text-lg px-4 py-2 h-auto">
                  🚀 Full-Stack Developer
                </Badge>
                <Badge variant="outline" className="text-base sm:text-lg px-4 py-2 h-auto">
                  💻 React & Next.js Expert
                </Badge>
                <Badge variant="secondary" className="text-base sm:text-lg px-4 py-2 h-auto">
                  🎨 UI/UX Design
                </Badge>
                <Badge variant="outline" className="text-base sm:text-lg px-4 py-2 h-auto">
                  ☁️ Cloud & DevOps
                </Badge>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="space-y-4 p-6 bg-muted/50 rounded-xl">
              <h3 className="text-xl sm:text-2xl font-semibold flex items-center gap-2">
                <span className="text-primary">🎯</span> Experiência
              </h3>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                Mais de 5 anos desenvolvendo aplicações web e mobile modernas.
                Especializado em criar interfaces intuitivas, sistemas escaláveis e soluções que realmente fazem a diferença.
              </p>
            </div>
            
            <div className="space-y-4 p-6 bg-muted/50 rounded-xl">
              <h3 className="text-xl sm:text-2xl font-semibold flex items-center gap-2">
                <span className="text-primary">🔧</span> Tecnologias
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <Badge variant="outline" className="text-sm sm:text-base justify-center">React</Badge>
                <Badge variant="outline" className="text-sm sm:text-base justify-center">Next.js</Badge>
                <Badge variant="outline" className="text-sm sm:text-base justify-center">TypeScript</Badge>
                <Badge variant="outline" className="text-sm sm:text-base justify-center">Node.js</Badge>
                <Badge variant="outline" className="text-sm sm:text-base justify-center">Tailwind CSS</Badge>
                <Badge variant="outline" className="text-sm sm:text-base justify-center">Prisma</Badge>
              </div>
            </div>
            
            <div className="space-y-4 p-6 bg-muted/50 rounded-xl md:col-span-2 lg:col-span-1">
              <h3 className="text-xl sm:text-2xl font-semibold flex items-center gap-2">
                <span className="text-primary">🚀</span> Missão
              </h3>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                Criar experiências digitais que transformam vidas e negócios.
                Acredito que a tecnologia deve ser acessível, intuitiva e impactante.
              </p>
            </div>
          </div>
        </div>
        
        <DialogFooter className="p-6 sm:p-8 border-t border-border">
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center sm:justify-start">
            <Button
              onClick={() => window.open('https://github.com/gregoryvallim', '_blank')}
              className="w-full sm:w-auto text-lg py-4 px-8 h-auto"
              size="lg"
              variant="default"
            >
              <ExternalLink className="w-6 h-6 mr-2" />
              Ver Meu Portfólio
            </Button>
            <Button
              onClick={onClose}
              className="w-full sm:w-auto text-lg py-4 px-8 h-auto"
              size="lg"
              variant="outline"
            >
              Fechar
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
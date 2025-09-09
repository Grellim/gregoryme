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
      <DialogContent className="max-w-3xl w-[95vw] max-h-[90vh] sm:w-[90vw]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Sobre Mim</DialogTitle>
          <DialogDescription className="text-lg mt-2">
            Saiba mais sobre mim e meu trabalho como desenvolvedor.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-shrink-0">
              <Avatar className="w-48 h-48 md:w-64 md:h-64">
                <AvatarImage src="/profile.jpg" />
                <AvatarFallback className="text-3xl">GV</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-bold mb-4 font-poppins">Gregory Vallim</h2>
              <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
                Desenvolvedor full-stack apaixonado por criar soluções inovadoras e impactantes.
                Especializado em tecnologias modernas com foco em performance e experiência do usuário.
              </p>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  🚀 Full-Stack Developer
                </Badge>
                <Badge variant="outline" className="text-lg px-4 py-2">
                  💻 React & Next.js
                </Badge>
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  🎨 UI/UX Design
                </Badge>
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="text-xl font-semibold">Experiência</h3>
              <p className="text-muted-foreground leading-relaxed">
                Mais de 5 anos desenvolvendo aplicações web e mobile modernas.
                Especializado em criar interfaces intuitivas e sistemas escaláveis.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-semibold">Tecnologias</h3>
              <p className="text-muted-foreground leading-relaxed">
                React, Next.js, TypeScript, Node.js, Tailwind CSS, Prisma, PostgreSQL, AWS
              </p>
            </div>
          </div>
        </div>
        <DialogFooter className="pt-4">
          <Button
            onClick={() => window.open('https://github.com/gregoryvallim', '_blank')}
            className="w-full lg:w-auto text-lg py-3"
            variant="outline"
          >
            <ExternalLink className="w-5 h-5 mr-2" />
            Ver Meu Trabalho
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
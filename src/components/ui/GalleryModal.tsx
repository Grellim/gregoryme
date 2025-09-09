"use client";

import * as React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  alt: string;
}

export default function GalleryModal({ isOpen, onClose, imageUrl, alt }: GalleryModalProps) {
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        className="w-full max-w-[60vw] md:max-w-4xl lg:max-w-5xl xl:max-w-6xl max-h-[95vh] p-4 sm:p-6 md:p-8 lg:p-10 rounded-2xl focus:outline-none border border-border/50"
        onClick={handleContentClick}
        onKeyDown={handleKeyDown}
        role="dialog"
        aria-label={`Visualização ampliada da imagem: ${alt}`}
        aria-modal="true"
      >
        <ScrollArea className="w-full h-[80vh] pr-4 flex-1">
          <div className="relative w-full h-full flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 lg:p-10 max-w-full space-y-4 sm:space-y-6 md:space-y-8">
          <Button
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-black/80 hover:bg-black text-white rounded-full p-2 sm:p-3 transition-all duration-200 flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 z-10 shadow-lg focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Fechar modal de galeria"
            variant="ghost"
            size="icon"
          >
            <X className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" />
          </Button>
          
          <div className="flex flex-col items-center justify-center w-full h-full max-w-full space-y-4 sm:space-y-6 md:space-y-8">
            <div className="w-full flex-1 min-h-[50vh] sm:min-h-[60vh] md:min-h-[70vh] max-h-[70vh] flex items-center justify-center bg-muted/50 rounded-lg overflow-hidden">
              <img
                src={imageUrl}
                alt={alt}
                className="w-auto h-auto max-w-full max-h-full object-contain rounded-lg shadow-2xl transition-transform duration-300 hover:scale-105"
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div className="hidden absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground">
                <span className="text-sm sm:text-base md:text-lg">Imagem não disponível</span>
              </div>
            </div>
            <div className="w-full px-4 sm:px-6 md:px-8 text-center">
              <p className="text-xs sm:text-sm md:text-base lg:text-lg text-muted-foreground break-words">
                {alt}
              </p>
            </div>
            
            <div className="w-full max-w-md px-4 sm:px-6 text-center">
              <p className="text-xs sm:text-sm md:text-base text-muted-foreground break-words">
                {alt}
              </p>
            </div>
          </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
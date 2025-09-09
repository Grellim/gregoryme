"use client";

import * as React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

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
        className="w-full max-w-[60vw] md:max-w-4xl lg:max-w-5xl xl:max-w-6xl max-h-[95vh] p-0 overflow-hidden sm:rounded-2xl focus:outline-none pb-6"
        onClick={handleContentClick}
        onKeyDown={handleKeyDown}
        role="dialog"
        aria-label={`Visualização ampliada da imagem: ${alt}`}
        aria-modal="true"
      >
        <div className="relative w-full h-full flex flex-col items-center justify-center p-2 sm:p-4 md:p-6 lg:p-8 max-w-full">
          <Button
            onClick={onClose}
            className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-black/80 hover:bg-black text-white rounded-full p-2 sm:p-3 transition-all duration-200 flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 z-10 shadow-lg focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Fechar modal de galeria"
            variant="ghost"
            size="icon"
          >
            <X className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" />
          </Button>
          
          <div className="flex flex-col items-center justify-center w-full h-full max-w-full space-y-3 sm:space-y-4 pt-9">
            <div className="w-full flex-1 min-h-[50vh] sm:min-h-[60vh] max-h-[80vh] flex items-center justify-center bg-muted/50 rounded-lg overflow-hidden">
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
            
            <div className="w-full max-w-md px-2 text-center">
              <p className="text-xs sm:text-sm md:text-base text-muted-foreground break-words">
                {alt}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
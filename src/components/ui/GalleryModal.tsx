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

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        className="w-[40%] max-w-4xl max-h-[95vh] p-0 overflow-hidden"
        onClick={handleContentClick}
      >
        <div className="relative w-full h-full flex items-center justify-center p-4 sm:p-8 max-w-full">
          <Button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/80 hover:bg-black text-white rounded-full p-3 transition-all duration-200 flex items-center justify-center h-12 w-12 z-10 shadow-lg sm:h-14 sm:w-14"
            aria-label="Close modal"
            variant="ghost"
            size="icon"
          >
            <X className="h-6 w-6 sm:h-7 sm:w-7" />
          </Button>
          <div className="flex items-center justify-center w-full h-full max-w-full">
            <img
              src={imageUrl}
              alt={alt}
              className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
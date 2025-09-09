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

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-4xl p-0 max-h-[90vh] overflow-hidden">
        <div className="relative w-full h-full flex items-center justify-center p-4">
          <Button
            onClick={onClose}
            className="absolute top-4 right-4 bg-muted rounded-full p-2 text-foreground hover:bg-accent transition-colors flex items-center justify-center h-8 w-8 z-10"
            aria-label="Close modal"
            variant="ghost"
            size="icon"
          >
            <X className="h-8 w-8" />
          </Button>
          <img
            src={imageUrl}
            alt={alt}
            className="max-w-full max-h-full object-contain rounded-lg"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useMotionValue, useTransform } from "framer-motion";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { X, ZoomIn, ZoomOut, Download, Minimize2 } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  alt: string;
}

export default function GalleryModal({ isOpen, onClose, imageUrl, alt }: GalleryModalProps) {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [scale, setScale] = React.useState(1);
  const constraintsRef = React.useRef<HTMLDivElement>(null);

  const resetTransform = () => {
    setScale(1);
  };

  const zoomIn = () => setScale(prev => Math.min(prev + 0.5, 3));
  const zoomOut = () => setScale(prev => Math.max(prev - 0.5, 0.5));

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
      resetTransform();
      setLoading(true);
      setError(false);
    }
  };

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
      resetTransform();
    } else if (e.key === '+' || e.key === '=') {
      e.preventDefault();
      zoomIn();
    } else if (e.key === '-') {
      e.preventDefault();
      zoomOut();
    }
  };

  const handleImageLoad = () => {
    setLoading(false);
    setError(false);
  };

  const handleImageError = () => {
    setLoading(false);
    setError(true);
  };

  const handleDownload = () => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = alt || 'gallery-image';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent
  className={cn(
    "w-[95vw] max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-4xl max-h-[90vh] p-0 rounded-lg focus:outline-none border border-border/50 bg-card/95 backdrop-blur-sm shadow-2xl overflow-hidden",
    "max-[640px]:w-[95vw] max-[640px]:max-w-[95vw]"
  )}
  onClick={handleContentClick}
  onKeyDown={handleKeyDown}
  role="dialog"
  aria-labelledby="gallery-modal-title"
  aria-modal="true"
  aria-describedby="gallery-modal-desc"
      >
        <div className="flex flex-col h-full max-h-[90vh]">
          {/* Header */}
          <div className="flex-shrink-0 flex items-center justify-between p-4 border-b border-border bg-card">
  <DialogTitle id="gallery-modal-title" className="sr-only">
    {alt}
  </DialogTitle>
  <p id="gallery-modal-desc" className="sr-only">
    Gallery image viewer with zoom and download capabilities
  </p>
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground font-medium truncate max-w-xs">
                {alt}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
  className={cn(
    "bg-muted/80 hover:bg-destructive/90 text-destructive hover:text-destructive-foreground rounded-full p-2.5 sm:p-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-destructive",
    "max-[640px]:p-2"
  )}
                aria-label="Close gallery"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 relative overflow-hidden" ref={constraintsRef}>
            <div className="relative w-full h-full flex items-center justify-center p-4">
              {loading && (
  <div className="absolute inset-0 flex items-center justify-center bg-muted">
    <Skeleton className={cn(
      "w-48 h-48 sm:w-64 sm:h-64 rounded-lg",
      "max-[640px]:w-40 max-[640px]:h-40"
    )} />
  </div>
              )}
        
              {error ? (
                <div className="flex flex-col items-center justify-center text-center space-y-4 p-8 bg-muted rounded-lg">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-foreground">Image not available</h3>
                    <p className="text-sm text-muted-foreground max-w-md">
                      The image could not be loaded. Please try again later.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={onClose}
                      size="sm"
                    >
                      Close
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="max-w-full max-h-full flex items-center justify-center">
                  <motion.div
                    animate={{ scale }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    style={{ originX: 0.5, originY: 0.5 }}
                    className="cursor-zoom-in hover:cursor-zoom-in"
                  >
                    <Image
                      src={imageUrl}
                      alt={alt}
                      fill
                      className="object-contain rounded-lg"
                      sizes="100vw"
                      priority={isOpen}
                      onLoad={handleImageLoad}
                      onError={handleImageError}
                      draggable={false}
                    />
                  </motion.div>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          {!error && !loading && (
            <div className="flex-shrink-0 flex items-center justify-between p-4 border-t border-border bg-card gap-2">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={zoomOut}
                  disabled={scale <= 0.5}
  className={cn("transition-all duration-200 ease-in-out")}
                  aria-label="Zoom out"
                >
                  <ZoomOut className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={zoomIn}
                  disabled={scale >= 3}
  className={cn("transition-all duration-200 ease-in-out")}
                  aria-label="Zoom in"
                >
                  <ZoomIn className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetTransform}
  className={cn("transition-all duration-200 ease-in-out")}
                  aria-label="Reset zoom"
                >
                  <Minimize2 className="w-4 h-4" />
                </Button>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownload}
  className={cn("transition-all duration-200 ease-in-out")}
                aria-label="Download image"
              >
                <Download className="w-4 h-4 mr-1" />
                Download
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
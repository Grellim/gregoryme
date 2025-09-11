"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, Download } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  alt: string;
}

export default function GalleryModal({ isOpen, onClose, imageUrl, alt }: GalleryModalProps) {
  const [scale, setScale] = React.useState(1);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const imageRef = React.useRef<HTMLImageElement>(null);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
      // Reset state when closing
      setScale(1);
      setPosition({ x: 0, y: 0 });
      setLoading(true);
      setError(false);
    }
  };

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'Escape':
        onClose();
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault();
        if (scale > 1) setScale(prev => Math.max(prev - 0.25, 1));
        break;
      case 'ArrowRight':
      case 'ArrowDown':
        e.preventDefault();
        if (scale < 4) setScale(prev => prev + 0.25);
        break;
      case '+':
      case '=':
        e.preventDefault();
        if (scale < 4) setScale(prev => prev + 0.25);
        break;
      case '-':
        e.preventDefault();
        if (scale > 1) setScale(prev => Math.max(prev - 0.25, 1));
        break;
      case '0':
        e.preventDefault();
        setScale(1);
        setPosition({ x: 0, y: 0 });
        break;
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setScale(prev => Math.max(1, Math.min(4, prev + delta)));
  };

  const handleImageLoad = () => {
    setLoading(false);
    setError(false);
  };

  const handleImageError = () => {
    setLoading(false);
    setError(true);
  };

  const resetZoom = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = alt || 'gallery-image';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Pan functionality
  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale <= 1) return;
    
    e.preventDefault();
    const startX = e.clientX - position.x;
    const startY = e.clientY - position.y;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      setPosition({
        x: moveEvent.clientX - startX,
        y: moveEvent.clientY - startY
      });
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  // Touch pan support
  const handleTouchStart = (e: React.TouchEvent) => {
    if (scale <= 1 || !e.touches.length) return;
    
    e.preventDefault();
    const touch = e.touches[0];
    const startX = touch.clientX - position.x;
    const startY = touch.clientY - position.y;

    const handleTouchMove = (moveEvent: TouchEvent) => {
      if (!moveEvent.touches.length) return;
      const currentTouch = moveEvent.touches[0];
      setPosition({
        x: currentTouch.clientX - startX,
        y: currentTouch.clientY - startY
      });
    };

    const handleTouchEnd = () => {
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };

    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd, { passive: false });
  };

  // Limit pan boundaries
  const boundedPosition = {
    x: Math.max(-100, Math.min(100, position.x)),
    y: Math.max(-100, Math.min(100, position.y))
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        className="w-[95vw] max-w-[95vw] md:w-[90vw] lg:w-[80vw] xl:w-[70vw] max-h-[95vh] p-0 rounded-2xl focus:outline-none border border-border/30 bg-background/95 backdrop-blur-xl shadow-2xl overflow-hidden"
        onClick={handleContentClick}
        onKeyDown={handleKeyDown}
        role="dialog"
        aria-label={`Galeria: ${alt}`}
        aria-modal="true"
        onWheel={handleWheel}
      >
        {/* Backdrop with blur */}
        <motion.div
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        />

        <div className="relative z-50 flex flex-col h-full max-h-screen">
          {/* Header */}
          <div className="flex-shrink-0 flex items-center justify-between p-4 sm:p-6 border-b border-border/20 bg-background/95 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <motion.button
                type="button"
                onClick={resetZoom}
                className="glass hover:glass p-2 rounded-full text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Redefinir zoom"
              >
                <ZoomOut className="h-4 w-4" />
              </motion.button>
              
              <span className="text-sm text-muted-foreground font-medium truncate max-w-xs">
                {alt}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <motion.button
                type="button"
                onClick={handleDownload}
                className="glass hover:glass p-2 rounded-full text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Baixar imagem"
              >
                <Download className="h-4 w-4" />
              </motion.button>

              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="glass hover:glass bg-background/80 hover:bg-accent/50 border border-border/50 rounded-full p-2 sm:p-3 transition-all duration-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                aria-label="Fechar galeria"
              >
                <X className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 relative overflow-hidden">
            <ScrollArea className="w-full h-full pr-2">
              <div className="relative w-full h-full flex items-center justify-center p-4 sm:p-6 min-h-0">
                {loading && (
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center bg-background/90 backdrop-blur-sm rounded-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="flex flex-col items-center space-y-4">
                      <div className="skeleton w-32 h-32 rounded-full"></div>
                      <div className="skeleton h-4 w-48"></div>
                      <div className="flex items-center space-x-1">
                        {[...Array(3)].map((_, i) => (
                          <div key={i} className="skeleton w-20 h-4 rounded"></div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {error ? (
                  <motion.div
                    className="flex flex-col items-center justify-center text-center space-y-4 p-8 bg-muted/50 rounded-lg"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-foreground">Imagem não disponível</h3>
                      <p className="text-sm text-muted-foreground max-w-md">
                        A imagem não pôde ser carregada. Tente novamente mais tarde ou verifique sua conexão.
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <motion.button
                        type="button"
                        onClick={() => window.location.reload()}
                        className="btn-professional px-4 py-2 text-sm"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Tentar Novamente
                      </motion.button>
                      <Button
                        variant="outline"
                        onClick={onClose}
                        className="px-4 py-2 text-sm"
                      >
                        Fechar
                      </Button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    className="relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
                    initial={false}
                    animate={{
                      scale,
                      x: scale > 1 ? boundedPosition.x : 0,
                      y: scale > 1 ? boundedPosition.y : 0
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                      duration: scale > 1 ? 0.3 : 0.5
                    }}
                    style={{
                      originX: 0.5,
                      originY: 0.5,
                      cursor: scale > 1 ? 'grab' : 'default'
                    }}
                    onMouseDown={handleMouseDown}
                    onTouchStart={handleTouchStart}
                    drag={scale > 1}
                    dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
                    dragElastic={0}
                  >
                    <motion.div
                      className={cn(
                        "relative overflow-hidden rounded-xl shadow-2xl max-w-full max-h-full",
                        loading && "opacity-50"
                      )}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2, duration: 0.4 }}
                    >
                      <Image
                        ref={imageRef}
                        src={imageUrl}
                        alt={alt}
                        fill
                        className="object-contain transition-all duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
                        priority={isOpen}
                        onLoad={handleImageLoad}
                        onError={handleImageError}
                        draggable={false}
                      />
                      
                      {/* Zoom indicator */}
                      {scale > 1 && (
                        <motion.div
                          className="absolute top-4 right-4 bg-black/70 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                        >
                          {Math.round(scale * 100)}%
                        </motion.div>
                      )}
                    </motion.div>
                  </motion.div>
                )}
              </div>
            </ScrollArea>
          </div>

          {/* Footer Controls */}
          {!error && !loading && (
            <div className="flex-shrink-0 flex items-center justify-center p-4 sm:p-6 border-t border-border/20 bg-background/95 backdrop-blur-sm space-x-2">
              <motion.button
                type="button"
                onClick={() => setScale(prev => Math.max(1, prev - 0.25))}
                className="glass hover:glass p-3 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Diminuir zoom"
                disabled={scale <= 1}
              >
                <ZoomOut className="h-4 w-4" />
              </motion.button>

              <motion.button
                type="button"
                onClick={resetZoom}
                className="glass hover:glass p-3 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Zoom original (100%)"
              >
                <span className="text-sm font-medium">100%</span>
              </motion.button>

              <motion.button
                type="button"
                onClick={() => setScale(prev => prev + 0.25)}
                className="glass hover:glass p-3 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Aumentar zoom"
              >
                <ZoomIn className="h-4 w-4" />
              </motion.button>

              <motion.button
                type="button"
                onClick={handleDownload}
                className="glass hover:glass p-3 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Baixar imagem"
              >
                <Download className="h-4 w-4" />
              </motion.button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
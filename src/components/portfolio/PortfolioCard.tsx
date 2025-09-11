"use client";

import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Share2, Loader2 } from "lucide-react";
import { Locale } from "@/data/types";
import en from "@/data/locales/en.json";
import ptBR from "@/data/locales/pt-BR.json";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Expand, ExternalLink } from "lucide-react";
import GalleryModal from "@/components/ui/GalleryModal";

interface PortfolioCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  projectUrl: string;
  moreInfo: string;
  galleryImages: string[];
  locale: Locale;
}

export default function PortfolioCard({
  id,
  title,
  description,
  imageUrl,
  tags,
  projectUrl,
  moreInfo,
  galleryImages,
  locale,
}: PortfolioCardProps) {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [selectedGalleryImage, setSelectedGalleryImage] = useState("");
  const [selectedGalleryAlt, setSelectedGalleryAlt] = useState("");
  const [likeCount, setLikeCount] = useState(0);
  const [shareCount, setShareCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const detailModalRef = useRef<HTMLDivElement>(null);
  const imageModalRef = useRef<HTMLDivElement>(null);

  // Simple translation function with fallback
  const translations = useMemo(() => {
    const localeMap: Record<string, any> = {
      'en': en,
      'pt-BR': ptBR,
    };
    const localeKey = localeMap[locale as unknown as keyof typeof localeMap];
    return localeKey || en;
  }, [locale]);

  const t = useCallback((keyPath: string, params?: Record<string, any>): string => {
    const keys = keyPath.split('.');
    let translation = translations;
    for (const key of keys) {
      translation = translation?.[key];
      if (translation === undefined) break;
    }
    let result = translation || keyPath;
    if (params && typeof result === 'string') {
      Object.entries(params).forEach(([param, value]) => {
        result = result.replace(new RegExp(`\\{${param}\\}`, 'g'), String(value));
      });
    }
    return result;
  }, [translations]);

  // Image loading handling
  useEffect(() => {
    const img = new Image();
    img.onload = () => setIsLoading(false);
    img.onerror = () => setIsLoading(false);
    img.src = imageUrl;
  }, [imageUrl]);

  const handleImageError = useCallback((imageSrc: string) => {
    setImageErrors(prev => new Set([...prev, imageSrc]));
  }, []);

  const handleImageLoad = useCallback((imageSrc: string) => {
    setImageErrors(prev => {
      const newSet = new Set(prev);
      newSet.delete(imageSrc);
      return newSet;
    });
  }, []);

  // Focus management for modals
  useEffect(() => {
    if (isDetailModalOpen && detailModalRef.current) {
      detailModalRef.current.focus();
    }
    if (isImageModalOpen && imageModalRef.current) {
      imageModalRef.current.focus();
    }
  }, [isDetailModalOpen, isImageModalOpen]);

  const openImageModal = useCallback(() => {
    setIsImageModalOpen(true);
    // Delay focus to allow modal to render
    setTimeout(() => imageModalRef.current?.focus(), 100);
  }, []);

  const closeImageModal = useCallback(() => {
    setIsImageModalOpen(false);
  }, []);

  const openDetailModal = useCallback(() => {
    setIsDetailModalOpen(true);
    // Delay focus to allow modal to render
    setTimeout(() => detailModalRef.current?.focus(), 100);
  }, []);

  const closeDetailModal = useCallback(() => {
    setIsDetailModalOpen(false);
  }, []);

  const handleDetailOpenChange = useCallback((open: boolean) => {
    if (!open) {
      closeDetailModal();
    }
  }, [closeDetailModal]);

  const openGalleryModal = useCallback((imageUrl: string, alt: string) => {
    setSelectedGalleryImage(imageUrl);
    setSelectedGalleryAlt(alt);
    setIsGalleryModalOpen(true);
  }, []);

  const closeGalleryModal = useCallback(() => {
    setIsGalleryModalOpen(false);
  }, []);

  // Handle keyboard navigation for modals
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      if (isGalleryModalOpen) {
        closeGalleryModal();
      } else if (isDetailModalOpen) {
        closeDetailModal();
      } else if (isImageModalOpen) {
        closeImageModal();
      }
    }
  }, [isGalleryModalOpen, isDetailModalOpen, isImageModalOpen, closeGalleryModal, closeDetailModal, closeImageModal]);

  useEffect(() => {
    if (isImageModalOpen || isDetailModalOpen || isGalleryModalOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isImageModalOpen, isDetailModalOpen, isGalleryModalOpen, handleKeyDown]);

  return (
    <>
      <Card className="group h-full flex flex-col card-clean relative overflow-hidden border bg-card shadow-sm hover:shadow-md transition-all duration-300 min-h-[400px]">
        <CardHeader className="p-4 flex-shrink-0">
          <div
            className="relative overflow-hidden aspect-[3/2] cursor-pointer group rounded-lg border border-border hover:border-primary/50 transition-all duration-300"
            onClick={openImageModal}
            role="button"
            tabIndex={0}
            aria-label={t('ui.image.view', { title })}
          >
            <div className="relative h-full w-full">
              {isLoading ? (
                <Skeleton className="w-full h-full rounded-lg" />
              ) : (
                <img
                  src={imageUrl}
                  alt={title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-lg"
                  onLoad={() => handleImageLoad(imageUrl)}
                  onError={() => handleImageError(imageUrl)}
                  loading="lazy"
                />
              )}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 text-white font-medium">
                  <Expand className="h-5 w-5" />
                  <span className="ml-1">{t('ui.image.view')}</span>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 p-4 space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <CardTitle className="text-lg font-semibold line-clamp-1">
              {title}
            </CardTitle>
            <CardDescription className="text-sm leading-relaxed line-clamp-2 text-muted-foreground">
              {description}
            </CardDescription>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 4).map((tag, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="text-xs px-3 py-1 font-medium"
              >
                {tag}
              </Badge>
            ))}
            {tags.length > 4 && (
              <Badge variant="outline" className="text-xs px-3 py-1">
                +{tags.length - 4} {t('ui.tags.more')}
              </Badge>
            )}
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 border-t border-border">
          {/* Simple Reaction Buttons */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setLikeCount(likeCount + 1)}
                className="group flex items-center gap-2 p-2 rounded-md bg-muted hover:bg-accent/10 border border-border hover:border-accent transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent"
                aria-label={t('ui.interactions.react')}
              >
                <Heart
                  className={`h-4 w-4 transition-colors ${
                    likeCount > 0
                      ? 'text-destructive fill-destructive heart-beat'
                      : 'text-muted-foreground group-hover:text-destructive'
                  }`}
                />
                <span className="text-xs font-medium">
                  {likeCount || '0'}
                </span>
              </button>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={async () => {
                        try {
                          await navigator.clipboard.writeText(window.location.href);
                          setShareCount(shareCount + 1);
                        } catch (err) {
                          console.error('Failed to copy to clipboard', err);
                        }
                      }}
                      className="group flex items-center gap-2 p-2 rounded-md bg-muted hover:bg-secondary/10 border border-border hover:border-secondary transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
                      aria-label={t('ui.interactions.share')}
                      aria-describedby="share-tooltip"
                    >
                      <Share2 className="h-4 w-4 text-muted-foreground group-hover:text-secondary transition-colors" />
                      <span className="text-xs font-medium" aria-live="polite">
                        {shareCount || '0'}
                      </span>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="text-xs">
                    <p>{t('ui.interactions.share')}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          <Button
            onClick={openDetailModal}
            className="w-full btn-clean text-primary-foreground font-medium transition-all duration-200"
            aria-label={t('ui.projectDetails.knowMore', { title })}
          >
            <span className="flex items-center justify-center gap-2">
              {t('ui.projectDetails.knowMore')}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </Button>
        </CardFooter>
      </Card>

      {/* Simple Image Modal */}
      {isImageModalOpen && (
        <div
          ref={imageModalRef}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={closeImageModal}
          role="dialog"
          aria-modal="true"
          aria-label={t('ui.image.modalTitle', { title })}
          tabIndex={-1}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] bg-card rounded-lg p-6 shadow-2xl border border-border"
            onClick={(e) => e.stopPropagation()}
            tabIndex={0}
          >
            <button
              onClick={closeImageModal}
              className="absolute top-4 right-4 bg-muted hover:bg-destructive text-destructive hover:text-destructive-foreground rounded-full p-2 transition-colors focus:outline-none focus:ring-2 focus:ring-destructive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive"
              aria-label={t('ui.image.close')}
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="flex flex-col h-full max-h-[70vh] items-center justify-center">
              {imageErrors.has(imageUrl) ? (
                <div className="flex flex-col items-center justify-center text-center space-y-4 p-8 bg-muted rounded-lg">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-foreground">{t('ui.image.loadError')}</h3>
                    <p className="text-sm text-muted-foreground">{t('ui.image.loadErrorMessage')}</p>
                  </div>
                </div>
              ) : (
                <img
                  src={imageUrl}
                  alt={title}
                  className="max-w-full max-h-full object-contain rounded-lg"
                  onClick={(e) => e.stopPropagation()}
                  onLoad={() => handleImageLoad(imageUrl)}
                  onError={() => handleImageError(imageUrl)}
                />
              )}
              <div className="mt-4 text-center space-y-2">
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="text-sm text-muted-foreground max-w-md">{description}</p>
              </div>
            </div>
            
            <div className="absolute bottom-4 left-4 flex gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={openDetailModal}
                      aria-label={t('ui.project.details')}
                    >
                      <ExternalLink className="w-4 h-4 mr-1" />
                      {t('ui.project.details')}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    {t('ui.project.viewDetails')}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={closeImageModal}
                      aria-label={t('ui.common.close')}
                    >
                      {t('ui.common.close')}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    {t('ui.common.closeModal')}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
      )}

      {/* Clean Detail Modal */}
      <Dialog open={isDetailModalOpen} onOpenChange={handleDetailOpenChange}>
        <DialogContent
          ref={detailModalRef}
          className="w-[95vw] max-w-4xl max-h-[90vh] p-0 rounded-lg focus:outline-none border border-border bg-card shadow-xl overflow-hidden"
          role="dialog"
          aria-label={t('ui.project.modalTitle', { title })}
          tabIndex={-1}
        >
          <div className="flex flex-col h-full max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="flex-shrink-0 p-6 border-b border-border bg-card">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative overflow-hidden rounded-lg w-16 h-16 flex-shrink-0">
                    <img
                      src={imageUrl}
                      alt={title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="space-y-1">
                    <DialogTitle className="text-xl font-semibold line-clamp-2">{title}</DialogTitle>
                    <DialogDescription className="text-base text-muted-foreground line-clamp-2">{description}</DialogDescription>
                  </div>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        onClick={closeDetailModal}
                        className="bg-muted hover:bg-destructive text-destructive hover:text-destructive-foreground rounded-lg p-2 transition-colors focus:outline-none focus:ring-2 focus:ring-destructive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive"
                        aria-label={t('ui.project.closeDetails')}
                        variant="ghost"
                        size="icon"
                      >
                        <X className="h-5 w-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      {t('ui.common.closeModal')}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
            
            {/* Content */}
            <div className="flex-1 min-h-0 overflow-hidden">
              <ScrollArea className="w-full h-full pr-4">
                <div className="p-6 space-y-6 min-h-full">
                  {/* Main Image */}
                  <div className="relative">
                    <div className="aspect-[16/9] rounded-lg overflow-hidden shadow-md relative">
                      {imageErrors.has(imageUrl) ? (
                        <div className="w-full h-full bg-muted flex items-center justify-center rounded-lg">
                          <div className="text-center space-y-2">
                            <svg className="w-12 h-12 text-muted-foreground mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            <p className="text-sm text-muted-foreground">{t('ui.image.loadError')}</p>
                          </div>
                        </div>
                      ) : (
                        <img
                          src={imageUrl}
                          alt={`${title} - ${t('ui.project.mainImage')}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                          onClick={openImageModal}
                          onLoad={() => handleImageLoad(imageUrl)}
                          onError={() => handleImageError(imageUrl)}
                          loading="lazy"
                        />
                      )}
                    </div>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            onClick={openImageModal}
                            className="absolute top-3 right-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full p-2 shadow-md transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                            aria-label={t('ui.image.fullSize')}
                          >
                            <Expand className="h-4 w-4" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent side="top">
                          {t('ui.image.fullSize')}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>

                  {/* Tags */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                      {t('ui.project.technologies')}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-sm px-3 py-1.5"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* More Info */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {t('ui.project.details')}
                    </h3>
                    <div className="text-sm text-muted-foreground leading-relaxed space-y-3">
                      <p>{moreInfo}</p>
                    </div>
                  </div>

                  {/* Gallery Section */}
                  {galleryImages.length > 0 && (
                    <div className="space-y-4 pt-6 border-t border-border/20">
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                        </svg>
                        {t('ui.project.gallery')}
                        <span className="text-sm text-muted-foreground font-normal" aria-label={`${galleryImages.length} images available`}>
                          ({galleryImages.length} {t('ui.project.images')})
                        </span>
                      </h3>
                      <div className="grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] sm:grid-cols-[repeat(auto-fit,minmax(140px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-3 max-h-96 overflow-y-auto rounded-xl border border-border/20 p-3 bg-muted/20 scrollbar-thin scrollbar-thumb-muted/30 scrollbar-track-transparent">
                        {galleryImages.map((image, index) => (
                          <div
                            key={index}
                            className="relative group cursor-pointer rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 aspect-square bg-background min-w-0"
                            onClick={() => openGalleryModal(image, `${title} - ${t('ui.image')} ${index + 1}`)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                openGalleryModal(image, `${title} - ${t('ui.image')} ${index + 1}`);
                              }
                            }}
                            role="button"
                            tabIndex={0}
                            aria-label={t('ui.gallery.viewImage', { index: index + 1 })}
                          >
                            <img
                              src={image}
                              alt={`${t('ui.gallery.image')} ${index + 1}`}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                              <div className="bg-white/20 backdrop-blur-sm rounded-full p-2 flex items-center gap-1 text-white font-medium">
                                <Expand className="h-3 w-3" />
                                <span className="text-xs">{t('ui.image')} {index + 1}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                        {galleryImages.length === 0 && (
                          <div className="col-span-full flex items-center justify-center py-8 text-muted-foreground">
                            <span className="text-sm">{t('ui.gallery.noImages')}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>

            {/* Footer */}
            <div className="flex-shrink-0 p-6 border-t border-border bg-card">
              <div className="flex flex-col sm:flex-row gap-3 justify-between items-center">
                <div className="text-sm text-muted-foreground text-center sm:text-left">
                  <span>{t('ui.project.builtWith', { count: tags.length })} {t('ui.project.technologies')}</span>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto justify-end">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          onClick={() => window.open(projectUrl, '_blank')}
                          className="flex items-center gap-2 btn-clean text-primary-foreground font-medium px-6 py-2.5 rounded-lg"
                          aria-label={t('ui.project.visit', { title })}
                          size="sm"
                        >
                          <ExternalLink className="w-4 h-4" />
                          {t('ui.project.visit')}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="top">
                        {t('ui.project.visitProject')}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          onClick={closeDetailModal}
                          variant="outline"
                          className="border-border px-6 py-2.5 rounded-lg"
                          aria-label={t('ui.common.close')}
                          size="sm"
                        >
                          {t('ui.common.close')}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="top">
                        {t('ui.common.closeModal')}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Gallery Modal */}
      <GalleryModal
        isOpen={isGalleryModalOpen}
        onClose={closeGalleryModal}
        imageUrl={selectedGalleryImage}
        alt={selectedGalleryAlt}
      />
    </>
  );
}
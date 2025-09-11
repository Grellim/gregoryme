"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Share2, ExternalLink, Expand, X } from "lucide-react";
import { Locale } from "@/data/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Skeleton } from "@/components/ui/skeleton";
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
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [selectedGalleryImage, setSelectedGalleryImage] = useState("");
  const [selectedGalleryAlt, setSelectedGalleryAlt] = useState("");
  const [likeCount, setLikeCount] = useState(0);
  const [shareCount, setShareCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [imageErrors, setImageErrors] = useState(new Set<string>());

  // Simple translation function
  const t = useCallback((key: string): string => {
    const translations = {
      'en': { 'ui.image.view': 'View Image', 'ui.project.visit': 'Visit Project' },
      'pt-BR': { 'ui.image.view': 'Ver Imagem', 'ui.project.visit': 'Visitar Projeto' },
    };
    const localeKey = locale as unknown as 'en' | 'pt-BR';
    return (translations[localeKey] as any)?.[key] || key;
  }, [locale]);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setIsLoading(false);
    img.onerror = () => setIsLoading(false);
    img.src = imageUrl;
  }, [imageUrl]);

  const handleImageError = useCallback((imageSrc: string) => {
    setImageErrors(prev => new Set([...(Array.from(prev) || []), imageSrc]));
  }, []);

  const handleImageLoad = useCallback((imageSrc: string) => {
    setImageErrors(prev => {
      const newSet = new Set(prev);
      newSet.delete(imageSrc);
      return newSet;
    });
  }, []);

  const openImageModal = useCallback(() => setIsImageModalOpen(true), []);
  const closeImageModal = useCallback(() => setIsImageModalOpen(false), []);
  
  const openGalleryModal = useCallback((imageUrl: string, alt: string) => {
    setSelectedGalleryImage(imageUrl);
    setSelectedGalleryAlt(alt);
    setIsGalleryModalOpen(true);
  }, []);

  const closeGalleryModal = useCallback(() => setIsGalleryModalOpen(false), []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="group"
      >
        <Card className="h-full overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
          <CardHeader className="p-4 relative">
            <motion.div
              className="relative aspect-video sm:aspect-[4/3] rounded-lg overflow-hidden"
              onClick={openImageModal}
              role="button"
              tabIndex={0}
              aria-label={t('ui.image.view')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div
                    key="skeleton"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full h-full bg-gray-200 dark:bg-gray-800 animate-pulse rounded-lg"
                  />
                ) : imageErrors?.has(imageUrl) ? (
                  <motion.div
                    key="error"
                    className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-900 rounded-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <Expand className="w-12 h-12 text-gray-400" />
                  </motion.div>
                ) : (
                  <motion.img
                    key="image"
                    src={imageUrl}
                    alt={title}
                    className="w-full h-full object-cover"
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    whileHover={{ scale: 1.05 }}
                    onLoad={() => handleImageLoad(imageUrl)}
                    onError={() => handleImageError(imageUrl)}
                    loading="lazy"
                  />
                )}
              </AnimatePresence>
              
              {/* Overlay on hover */}
              <motion.div
                className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              >
                <Button variant="secondary" size="sm" className="text-white">
                  <Expand className="w-4 h-4 mr-2" />
                  {t('ui.image.view')}
                </Button>
              </motion.div>
            </motion.div>
          </CardHeader>

          <CardContent className="p-3 sm:p-4 space-y-2 sm:space-y-3">
            <motion.h3 
              className="text-lg font-bold line-clamp-2"
              whileHover={{ y: -1 }}
            >
              {title}
            </motion.h3>

            <motion.p 
              className="text-sm text-muted-foreground line-clamp-3"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
            >
              {description}
            </motion.p>

            <div className="flex flex-wrap gap-2 pt-2">
              {tags.slice(0, 3).map((tag, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                >
                  <Badge variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                </motion.div>
              ))}
              {tags.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{tags.length - 3} more
                </Badge>
              )}
            </div>
          </CardContent>

          <CardFooter className="p-3 sm:p-4 pt-0 space-y-2">
            <div className="flex items-center gap-3">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setLikeCount(likeCount + 1);
                      }}
                      className="p-2 rounded-lg hover:bg-accent transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={`Like ${title}`}
                      aria-pressed={likeCount > 0}
                      role="button"
                    >
                      <Heart className={`w-4 h-4 ${likeCount > 0 ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} />
                      {likeCount > 0 && <span className="ml-1 text-xs">{likeCount}</span>}
                    </motion.button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Like ({likeCount})</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.button
                      type="button"
                      onClick={async (e) => {
                        e.stopPropagation();
                        try {
                          await navigator.clipboard.writeText(window.location.href);
                          setShareCount(shareCount + 1);
                        } catch (err) {
                          console.error('Failed to copy', err);
                        }
                      }}
                      className="p-2 rounded-lg hover:bg-accent transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label="Share project"
                      role="button"
                    >
                      <Share2 className="w-4 h-4 text-muted-foreground" />
                      {shareCount > 0 && <span className="ml-1 text-xs">{shareCount}</span>}
                    </motion.button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Share ({shareCount})</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <Button
              onClick={(e) => {
                e.stopPropagation();
                window.open(projectUrl, '_blank');
              }}
              className="w-full"
              variant="outline"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              {t('ui.project.visit')}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>

      {/* Simple Image Modal */}
      {isImageModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={closeImageModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="image-modal-title"
          id="image-modal"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative max-w-[95vw] max-w-md sm:max-w-lg lg:max-w-4xl max-h-[90vh] p-2 sm:p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeImageModal}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
            
            <h2 id="image-modal-title" className="sr-only">
              {title}
            </h2>
            
            {imageErrors?.has(imageUrl) ? (
              <div className="flex items-center justify-center h-64 sm:h-96 bg-gray-200 rounded-lg">
                <Expand className="w-16 h-16 text-gray-400" />
              </div>
            ) : (
              <img
                src={imageUrl}
                alt={title}
                className="max-w-full max-h-[80vh] w-auto h-auto max-h-[60vh] sm:max-h-[80vh] object-contain rounded-lg"
                onError={() => handleImageError(imageUrl)}
              />
            )}
            
            <div className="mt-4 text-center space-y-2">
              <h3 className="text-xl font-bold">{title}</h3>
              <p className="text-muted-foreground">{description}</p>
            </div>
          </motion.div>
        </div>
      )}

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
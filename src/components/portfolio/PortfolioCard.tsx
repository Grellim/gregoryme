"use client";

import { useState, useCallback, useEffect, memo } from "react";
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
  project: {
    id: string;
    title: string;
    description: string;
    image: string;
    technologies: string[];
    githubUrl?: string;
    liveUrl?: string;
    moreInfo?: string;
    galleryImages?: string[];
  };
  locale: Locale;
  onOpenProjectModal: (projectId: string) => void;
}

function areEqual(prevProps: PortfolioCardProps, nextProps: PortfolioCardProps) {
return prevProps.project.id === nextProps.project.id &&
       prevProps.locale === nextProps.locale;
}

const PortfolioCard = memo(function PortfolioCard({
project,
locale,
onOpenProjectModal,
}: PortfolioCardProps) {
  const { id, title, description, image, technologies, moreInfo = '', galleryImages = [] } = project;
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [selectedGalleryImage, setSelectedGalleryImage] = useState("");
  const [selectedGalleryAlt, setSelectedGalleryAlt] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [hasImageError, setHasImageError] = useState(false);

  // Simple translation function
  const t = useCallback((key: string): string => {
    const translations = {
      'en': { 'ui.image.view': 'View Image' },
      'pt-BR': { 'ui.image.view': 'Ver Imagem' },
    };
    const localeKey = locale as unknown as 'en' | 'pt-BR';
    return (translations[localeKey] as any)?.[key] || key;
  }, [locale]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const img = new Image();
    img.onload = () => {
      setIsLoading(false);
      handleImageLoad();
    };
    img.onerror = () => {
      setIsLoading(false);
      handleImageError();
    };
    img.src = image;
  }, [image]);

  const handleImageError = useCallback(() => {
    setHasImageError(true);
  }, []);

  const handleImageLoad = useCallback(() => {
    setHasImageError(false);
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
        <Card className="h-full overflow-hidden border-0 card-lift shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer">
          <CardHeader className="p-3 sm:p-4 relative">
            <motion.div
              className="relative aspect-square sm:aspect-[4/3] rounded-lg overflow-hidden"
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
                ) : hasImageError ? (
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
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover"
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    whileHover={{ scale: 1.05 }}
                    onLoad={handleImageLoad}
                    onError={handleImageError}
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

          <CardContent className="p-3 sm:p-4 space-y-3 sm:space-y-4">
            <motion.h3
              className="text-base sm:text-lg font-bold line-clamp-2 leading-tight"
              whileHover={{ y: -1 }}
            >
              {title}
            </motion.h3>

            <motion.p
              className="text-sm text-muted-foreground line-clamp-3 leading-relaxed"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
            >
              {description}
            </motion.p>

            <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-2">
              {technologies.slice(0, 3).map((tech, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                >
                  <Badge variant="secondary" className="text-xs px-2 py-1">
                    {tech}
                  </Badge>
                </motion.div>
              ))}
              {technologies.length > 3 && (
                <Badge variant="outline" className="text-xs px-2 py-1">
                  +{technologies.length - 3} more
                </Badge>
              )}
            </div>
          </CardContent>

          <CardFooter className="p-3 sm:p-4 pt-0">
            <Button
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                onOpenProjectModal(id);
              }}
              className="w-full btn-modern bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 rounded-lg transition-all duration-300"
              aria-label={`Saiba mais sobre ${title}`}
            >
              Saiba mais
              <ExternalLink className="w-4 h-4 ml-2" />
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
            className="relative max-w-[95vw] max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-4xl max-h-[90vh] p-2 sm:p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeImageModal}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 p-2.5 sm:p-2 bg-black/60 hover:bg-black/80 text-white rounded-full backdrop-blur-sm transition-all duration-200"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            
            <h2 id="image-modal-title" className="sr-only">
              {title}
            </h2>
            
            {hasImageError ? (
              <div className="flex items-center justify-center h-64 sm:h-96 bg-gray-200 rounded-lg">
                <Expand className="w-16 h-16 text-gray-400" />
              </div>
            ) : (
              <img
                src={image}
                alt={title}
                className="max-w-full max-h-[80vh] w-auto h-auto max-h-[60vh] sm:max-h-[80vh] object-contain rounded-lg"
                onError={handleImageError}
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

}, areEqual);

export default PortfolioCard;
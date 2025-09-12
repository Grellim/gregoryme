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
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

import type { PortfolioProject } from "@/data/types";

interface PortfolioCardProps {
  project: PortfolioProject;
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
  const t = useTranslations("Portfolio");
  const { id, title, description, image, technologies, moreInfo = '', galleryImages = [] } = project;
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [selectedGalleryImage, setSelectedGalleryImage] = useState("");
  const [selectedGalleryAlt, setSelectedGalleryAlt] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [hasImageError, setHasImageError] = useState(false);

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
        <Card className={cn(
          "h-full overflow-hidden border-0 card-lift shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        )}>
          <CardHeader className={cn(
            "p-3 sm:p-4 relative",
            "max-[640px]:p-2"
          )}>
            <motion.div
              className={cn(
                "relative rounded-lg overflow-hidden",
                "aspect-square sm:aspect-[4/3] max-[640px]:aspect-square"
              )}
              onClick={openImageModal}
              role="button"
              tabIndex={0}
              aria-label={t("viewImage") || "View image"}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onKeyDown={(e: React.KeyboardEvent) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  openImageModal();
                }
              }}
            >
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div
                    key="skeleton"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={cn(
                      "w-full h-full rounded-lg",
                      "bg-muted animate-pulse"
                    )}
                  />
                ) : hasImageError ? (
                  <motion.div
                    key="error"
                    className={cn(
                      "w-full h-full flex items-center justify-center rounded-lg",
                      "bg-muted"
                    )}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <Expand className="w-12 h-12 text-muted-foreground max-[640px]:w-10 max-[640px]:h-10" />
                  </motion.div>
                ) : (
                  <motion.img
                    key="image"
                    src={image}
                    alt={`${title} - Project screenshot`}
                    className="w-full h-full object-cover"
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    whileHover={{ scale: 1.05 }}
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                    loading="lazy"
                    decoding="async"
                  />
                )}
              </AnimatePresence>
              
              {/* Overlay on hover */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center transition-all duration-300 ease-in-out"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
              >
                <Button 
                  variant="secondary" 
                  size="sm" 
                  className="text-white bg-black/60 hover:bg-black/80 backdrop-blur-sm transition-all duration-200 max-[640px]:text-xs"
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    openImageModal();
                  }}
                >
                  <Expand className="w-4 h-4 mr-2 max-[640px]:w-3.5 max-[640px]:h-3.5" />
                  {t("viewImage") || "View Image"}
                </Button>
              </motion.div>
            </motion.div>
          </CardHeader>

          <CardContent className={cn(
            "p-3 sm:p-4 space-y-3 sm:space-y-4",
            "max-[640px]:p-2 max-[640px]:space-y-2"
          )}>
            <motion.h3
              className={cn(
                "font-bold line-clamp-2 leading-tight",
                "text-base sm:text-lg max-[640px]:text-sm",
                "clamp-[1rem, 2vw + 0.5rem, 1.125rem]"
              )}
              whileHover={{ y: -1 }}
            >
              {title}
            </motion.h3>

            <motion.p
              className={cn(
                "text-muted-foreground line-clamp-3 leading-relaxed",
                "text-sm max-[640px]:text-xs",
                "clamp-[0.875rem, 1.5vw + 0.5rem, 0.875rem]"
              )}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
            >
              {description}
            </motion.p>

            <div className={cn(
              "flex flex-wrap gap-1.5 sm:gap-2 pt-2",
              "max-[640px]:gap-1"
            )}>
              {technologies.slice(0, 3).map((tech, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                >
                  <Badge 
                    variant="secondary" 
                    className={cn(
                      "text-xs px-2 py-1",
                      "max-[640px]:text-[0.65rem] max-[640px]:px-1.5 max-[640px]:py-0.5"
                    )}
                  >
                    {tech}
                  </Badge>
                </motion.div>
              ))}
              {technologies.length > 3 && (
                <Badge 
                  variant="outline" 
                  className={cn(
                    "text-xs px-2 py-1",
                    "max-[640px]:text-[0.65rem] max-[640px]:px-1.5 max-[640px]:py-0.5"
                  )}
                >
                  +{technologies.length - 3} more
                </Badge>
              )}
            </div>
          </CardContent>

          <CardFooter className={cn(
            "p-3 sm:p-4 pt-0",
            "max-[640px]:p-2"
          )}>
            <Button
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                onOpenProjectModal(id);
              }}
              className={cn(
                "w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 rounded-lg transition-all duration-300 ease-in-out hover:scale-105",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                "max-[640px]:py-2 max-[640px]:text-sm"
              )}
              aria-label={t("learnMore", { title }) || `Learn more about ${title}`}
            >
              {t("learnMore") || "Learn More"}
              <ExternalLink className="w-4 h-4 ml-2 max-[640px]:w-3.5 max-[640px]:h-3.5" />
            </Button>
          </CardFooter>
        </Card>
      </motion.div>

      {/* Simple Image Modal */}
      {isImageModalOpen && (
        <div
          className={cn(
            "fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4",
            "max-[640px]:p-2"
          )}
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
            className={cn(
              "relative max-h-[90vh] p-2 sm:p-4",
              "max-w-[95vw] max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-4xl max-[640px]:p-2"
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeImageModal}
              className={cn(
                "absolute top-3 right-3 sm:top-4 sm:right-4 z-10 bg-black/60 hover:bg-black/80 text-white rounded-full backdrop-blur-sm transition-all duration-200",
                "p-2.5 sm:p-2 max-[640px]:p-2 max-[640px]:top-2 max-[640px]:right-2"
              )}
              aria-label="Close modal"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6 max-[640px]:w-4 max-[640px]:h-4" />
            </button>
            
            <h2 id="image-modal-title" className="sr-only">
              {title}
            </h2>
            
            {hasImageError ? (
              <div className={cn(
                "flex items-center justify-center rounded-lg",
                "h-64 sm:h-96 max-[640px]:h-48",
                "bg-muted"
              )}>
                <Expand className="w-12 h-12 text-muted-foreground max-[640px]:w-10 max-[640px]:h-10" />
              </div>
            ) : (
              <img
                src={image}
                alt={`${title} - Full view`}
                className={cn(
                  "max-w-full w-auto h-auto object-contain rounded-lg",
                  "max-h-[80vh] max-[640px]:max-h-[70vh]"
                )}
                onError={handleImageError}
                decoding="async"
              />
            )}
            
            <div className={cn(
              "mt-4 text-center space-y-2",
              "max-[640px]:mt-2 max-[640px]:space-y-1"
            )}>
              <h3 className={cn(
                "font-bold",
                "text-xl max-[640px]:text-lg",
                "clamp-[1.125rem, 2vw + 0.5rem, 1.25rem]"
              )}>
                {title}
              </h3>
            </div>
          </motion.div>
        </div>
      )}

      {/* Gallery Modal */}
      {isGalleryModalOpen && (
        <GalleryModal
          isOpen={isGalleryModalOpen}
          onClose={closeGalleryModal}
          imageUrl={selectedGalleryImage}
          alt={selectedGalleryAlt}
        />
      )}
    </>
  );
}, areEqual);

export default PortfolioCard;
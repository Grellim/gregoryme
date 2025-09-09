"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
}: PortfolioCardProps) {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [selectedGalleryImage, setSelectedGalleryImage] = useState("");
  const [selectedGalleryAlt, setSelectedGalleryAlt] = useState("");

  const openImageModal = () => setIsImageModalOpen(true);
  const closeImageModal = () => setIsImageModalOpen(false);

  const openDetailModal = () => setIsDetailModalOpen(true);
  const closeDetailModal = () => setIsDetailModalOpen(false);

  const handleDetailOpenChange = (open: boolean) => {
    if (!open) {
      closeDetailModal();
    }
  };

  const openGalleryModal = (imageUrl: string, alt: string) => {
    setSelectedGalleryImage(imageUrl);
    setSelectedGalleryAlt(alt);
    setIsGalleryModalOpen(true);
  };
  const closeGalleryModal = () => setIsGalleryModalOpen(false);

  return (
    <>
      <Card className="h-full flex flex-col bg-card border-border hover:shadow-lg transition-shadow duration-300">
        <CardHeader className="p-0">
          <div className="relative group cursor-pointer" onClick={openImageModal}>
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-t-lg">
              <Expand className="h-8 w-8 text-white" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 p-6">
          <CardTitle className="text-xl mb-2">{title}</CardTitle>
          <CardDescription className="text-muted-foreground mb-4">
            {description}
          </CardDescription>
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="p-6 pt-0">
          <Button onClick={openDetailModal} className="w-full">
            Saiba Mais
          </Button>
        </CardFooter>
      </Card>

      {/* Image Modal */}
      {isImageModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={closeImageModal}
        >
          <div className="relative max-w-4xl max-h-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={closeImageModal}
              className="absolute top-4 right-4 bg-muted rounded-full p-2 text-foreground hover:bg-accent transition-colors flex items-center justify-center h-8 w-8 z-10"
              aria-label="Close modal"
            >
              <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img
              src={imageUrl}
              alt={title}
              className="max-w-full max-h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}

      {/* Detail Modal */}
      <Dialog open={isDetailModalOpen} onOpenChange={handleDetailOpenChange}>
        <DialogContent className="w-full max-w-[60vw] md:max-w-4xl lg:max-w-5xl xl:max-w-6xl max-h-[95vh] p-0 overflow-hidden sm:rounded-2xl focus:outline-none pb-6">
          <div className="flex flex-col h-full">
            <DialogHeader className="p-3 sm:p-4 md:p-6 border-b border-border/50 sticky top-0 bg-background/95 backdrop-blur-sm z-10">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <DialogTitle className="text-xl sm:text-2xl md:text-3xl font-bold">{title}</DialogTitle>
                  <DialogDescription className="text-sm sm:text-base text-muted-foreground">
                    {description}
                  </DialogDescription>
                </div>
                <Button
                  onClick={closeDetailModal}
                  className="bg-background/80 hover:bg-background text-foreground border border-border/50 rounded-full p-2 transition-all duration-200 flex items-center justify-center h-10 w-10 z-20 focus-visible:ring-2 focus-visible:ring-primary"
                  aria-label="Fechar modal"
                  variant="ghost"
                  size="icon"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </DialogHeader>
            
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 pt-9 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent/50 scrollbar-thumb-rounded">
              {/* Content */}
              <div className="space-y-4 sm:space-y-6">
                {/* Main Image */}
                <div className="aspect-video max-h-[50vh]">
                  <img
                    src={imageUrl}
                    alt={title}
                    className="w-full h-full object-cover rounded-xl shadow-lg"
                  />
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-sm px-2.5 py-1">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* More Info */}
                <div className="space-y-3">
                  <h3 className="text-lg sm:text-xl font-semibold">Mais sobre o projeto:</h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {moreInfo}
                  </p>
                </div>

                {/* Gallery */}
                {galleryImages.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-lg sm:text-xl font-semibold">Galeria de Imagens</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
                      {galleryImages.map((image, index) => (
                        <div
                          key={index}
                          className="relative group cursor-pointer rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 aspect-square"
                          onClick={() => openGalleryModal(image, `Galeria ${index + 1}`)}
                        >
                          <img
                            src={image}
                            alt={`Galeria ${index + 1}`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <Expand className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action Button */}
            <DialogFooter className="p-3 sm:p-4 md:p-6 border-t border-border bg-muted/20">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full justify-center sm:justify-start">
                <Button
                  onClick={() => window.open(projectUrl, '_blank')}
                  className="flex items-center gap-2 text-sm sm:text-base md:text-lg py-2.5 sm:py-3 px-4 sm:px-6 w-full sm:w-auto"
                  size="lg"
                  variant="default"
                >
                  <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5" />
                  Quero Conhecer
                </Button>
                <Button
                  onClick={closeDetailModal}
                  className="text-sm sm:text-base md:text-lg py-2.5 sm:py-3 px-4 sm:px-6 w-full sm:w-auto"
                  size="lg"
                  variant="outline"
                >
                  <X className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  Fechar
                </Button>
              </div>
            </DialogFooter>
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
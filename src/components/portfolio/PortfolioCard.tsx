"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
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
      <Card className="h-full flex flex-col bg-card border-border card-friendly hover:shadow-lg transition-all duration-300">
        <CardHeader className="p-0">
          <div className="relative group cursor-pointer" onClick={openImageModal}>
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-48 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-t-lg">
              <Expand className="h-8 w-8 text-white" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 p-4 sm:p-6">
          <CardTitle className="text-lg sm:text-xl mb-2">{title}</CardTitle>
          <CardDescription className="text-muted-foreground mb-4 text-sm sm:text-base">
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
        <CardFooter className="p-4 sm:p-6 pt-0">
          <Button onClick={openDetailModal} className="w-full" aria-label={`Saiba mais sobre ${title}`}>
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
        <DialogContent className="w-full max-w-4xl mx-auto max-h-screen p-0 rounded-2xl focus:outline-none border border-border/50 overflow-hidden" role="dialog" aria-label={`Detalhes do projeto ${title}`}>
          <div className="flex flex-col h-full max-h-screen overflow-hidden">
            {/* Header */}
            <div className="flex-shrink-0 p-4 sm:p-6 border-b border-border/50 bg-background/95 backdrop-blur-sm z-10">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <DialogTitle className="text-lg sm:text-xl md:text-2xl font-bold line-clamp-1">{title}</DialogTitle>
                  <DialogDescription className="text-sm text-muted-foreground line-clamp-2">{description}</DialogDescription>
                </div>
                <Button
                  onClick={closeDetailModal}
                  className="ml-2 flex-shrink-0 bg-background/80 hover:bg-background text-foreground border border-border/50 rounded-full p-2 transition-all duration-200"
                  aria-label="Fechar modal de detalhes"
                  variant="ghost"
                  size="icon"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            {/* Content Area */}
            <div className="flex-1 overflow-hidden flex">
              <ScrollArea className="w-full flex-1 relative">
                <div className="w-full h-full p-4 sm:p-6 space-y-4 max-h-full overflow-y-auto">
                  {/* Main Image */}
                  <div className="w-full aspect-video max-h-48 sm:max-h-64 flex items-center justify-center bg-muted/50 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={imageUrl}
                      alt={`${title} - Imagem principal`}
                      className="w-full h-full object-cover rounded-lg"
                      loading="lazy"
                    />
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs sm:text-sm">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* More Info */}
                  <div className="space-y-2">
                    <h3 className="text-base sm:text-lg font-semibold">Mais sobre o projeto:</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4 sm:line-clamp-6">
                      {moreInfo}
                    </p>
                  </div>

                  {/* Gallery */}
                  {galleryImages.length > 0 && (
                    <div className="space-y-3">
                      <h3 className="text-base sm:text-lg font-semibold">Galeria de Imagens</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-h-64 overflow-y-auto rounded-lg border border-border/20 p-2">
                        {galleryImages.map((image, index) => (
                          <div
                            key={index}
                            className="relative group cursor-pointer rounded overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 aspect-square flex-shrink-0"
                            onClick={() => openGalleryModal(image, `Galeria ${index + 1}`)}
                            role="button"
                            tabIndex={0}
                            aria-label={`Ver imagem da galeria ${index + 1}`}
                          >
                            <img
                              src={image}
                              alt={`Galeria ${index + 1}`}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                              <Expand className="h-4 w-4 text-white" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>

            {/* Footer */}
            <div className="flex-shrink-0 p-4 sm:p-6 border-t border-border/50 bg-muted/20">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full justify-end">
                <Button
                  onClick={() => window.open(projectUrl, '_blank')}
                  className="flex items-center gap-2 text-sm sm:text-base py-2.5 px-4 sm:px-6"
                  size="sm"
                  variant="default"
                  aria-label={`Visitar projeto ${title}`}
                >
                  <ExternalLink className="w-4 h-4 mr-2 flex-shrink-0" />
                  Quero Conhecer
                </Button>
                <Button
                  onClick={closeDetailModal}
                  className="text-sm sm:text-base py-2.5 px-4 sm:px-6"
                  size="sm"
                  variant="outline"
                  aria-label="Fechar detalhes do projeto"
                >
                  <X className="w-4 h-4 mr-2 flex-shrink-0" />
                  Fechar
                </Button>
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
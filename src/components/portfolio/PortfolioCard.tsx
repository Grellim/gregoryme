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
        <DialogContent className="w-[95vw] max-w-5xl max-h-[95vh] p-0 sm:w-[90vw]">
          <div className="relative h-full overflow-y-auto">
            <Button
              onClick={closeDetailModal}
              className="absolute top-4 right-4 bg-black/80 hover:bg-black text-white rounded-full p-3 transition-all duration-200 flex items-center justify-center h-12 w-12 z-10 shadow-lg sm:h-14 sm:w-14"
              aria-label="Close modal"
              variant="ghost"
              size="icon"
            >
              <X className="h-6 w-6 sm:h-7 sm:w-7" />
            </Button>
            
            <div className="p-6 sm:p-8">
              {/* Main Image */}
              <div className="mb-8">
                <img
                  src={imageUrl}
                  alt={title}
                  className="w-full h-64 md:h-80 object-cover rounded-xl shadow-lg"
                />
              </div>

              {/* Title and Description */}
              <div className="mb-8">
                <DialogTitle className="text-3xl font-bold mb-4">{title}</DialogTitle>
                <DialogDescription className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  {description}
                </DialogDescription>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-base px-3 py-1">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* More Info */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Mais sobre o projeto:</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {moreInfo}
                </p>
              </div>

              {/* Gallery */}
              {galleryImages.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-6">Galeria de Imagens</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {galleryImages.map((image, index) => (
                      <div
                        key={index}
                        className="relative group cursor-pointer rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                        onClick={() => openGalleryModal(image, `Galeria ${index + 1}`)}
                      >
                        <img
                          src={image}
                          alt={`Galeria ${index + 1}`}
                          className="w-full h-32 md:h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <Expand className="h-6 w-6 text-white" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Button */}
              <DialogFooter className="pt-6 border-t border-border">
                <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                  <Button
                    onClick={() => window.open(projectUrl, '_blank')}
                    className="flex items-center gap-2 text-lg py-3 px-8 w-full sm:w-auto"
                    size="lg"
                  >
                    <ExternalLink className="h-5 w-5" />
                    Quero Conhecer
                  </Button>
                  <Button
                    onClick={closeDetailModal}
                    variant="outline"
                    className="text-lg py-3 px-8 w-full sm:w-auto"
                    size="lg"
                  >
                    Fechar
                  </Button>
                </div>
              </DialogFooter>
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
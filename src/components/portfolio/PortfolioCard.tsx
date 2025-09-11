"use client";

import { useState } from "react";
import { Heart, Share2 } from "lucide-react";
import { Locale } from "@/data/types";
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
      <Card className="group h-full flex flex-col bg-card border-border/50 hover:border-primary/30 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 card-friendly">
        <CardHeader className="p-0 relative">
          <div
            className="relative overflow-hidden aspect-[4/3] cursor-pointer group"
            onClick={openImageModal}
            role="button"
            tabIndex={0}
            aria-label={`Ver imagem de ${title}`}
          >
            <div className="relative p-1 transition-all duration-300">
              <img
                src={imageUrl}
                alt={title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 origin-center"
                loading="lazy"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 flex items-center gap-2 text-white font-medium">
                <Expand className="h-5 w-5" />
                <span className="text-sm hidden sm:block">Visualizar</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 p-6 space-y-4">
          <div className="space-y-2">
            <CardTitle className="text-xl font-bold line-clamp-2 leading-tight group-hover:text-primary transition-colors">
              {title}
            </CardTitle>
            <CardDescription className="text-muted-foreground leading-relaxed line-clamp-3">
              {description}
            </CardDescription>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 4).map((tag, index) => (
              <Badge
                key={index}
                className={`text-xs px-2.5 py-1 transition-all duration-200 hover:scale-105 ${
                  index === 0 ? 'bg-gradient-to-r from-primary to-secondary text-primary-foreground' :
                  index === 1 ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
                  index === 2 ? 'bg-gradient-to-r from-green-500 to-green-600' :
                  'bg-muted'
                }`}
              >
                {tag}
              </Badge>
            ))}
            {tags.length > 4 && (
              <Badge variant="outline" className="text-xs px-2.5 py-1">
                +{tags.length - 4}
              </Badge>
            )}
          </div>
        </CardContent>
        <CardFooter className="p-6 pt-0 border-t border-border/20">
          {/* Reaction Buttons */}
          <div className="flex items-center justify-between mb-4 gap-4">
            <div className="flex items-center gap-6">
              <button
                onClick={() => setLikeCount(likeCount + 1)}
                className="group flex items-center gap-2 p-2 rounded-lg hover:bg-accent/50 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                aria-label="Curtir projeto"
              >
                <Heart
                  className={`h-5 w-5 transition-colors duration-200 ${
                    likeCount > 0
                      ? 'text-destructive fill-destructive'
                      : 'text-muted-foreground group-hover:text-destructive'
                  }`}
                />
                <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                  {likeCount}
                </span>
              </button>

              <button
                onClick={() => {
                  // Simulate share action
                  navigator.clipboard.writeText(window.location.href);
                  setShareCount(shareCount + 1);
                }}
                className="group flex items-center gap-2 p-2 rounded-lg hover:bg-accent/50 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                aria-label="Compartilhar projeto"
              >
                <Share2 className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                  {shareCount}
                </span>
              </button>
            </div>
            
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Heart className="h-3 w-3 fill-current text-destructive" />
                {likeCount}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Share2 className="h-3 w-3" />
                {shareCount}
              </span>
            </div>
          </div>

          <Button
            onClick={openDetailModal}
            className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground font-semibold shadow-lg hover:shadow-primary/20 transition-all duration-300 transform hover:scale-[1.02] font-poppins"
            aria-label={`${locale.ui.projectDetails.knowMore} sobre ${title}`}
          >
            <span className="flex items-center gap-2">
              {locale.ui.projectDetails.knowMore}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </Button>
        </CardFooter>
      </Card>

      {/* Enhanced Image Modal */}
      {isImageModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-in fade-in-0 zoom-in-95 duration-200"
          onClick={closeImageModal}
          role="dialog"
          aria-modal="true"
          aria-label={`Visualização da imagem ${title}`}
        >
          <div
            className="relative max-w-6xl max-h-[90vh] bg-background/95 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-border/20 animate-in slide-in-from-bottom-2 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeImageModal}
              className="absolute top-4 right-4 bg-background/80 hover:bg-accent rounded-full p-3 text-foreground hover:text-primary transition-all duration-200 shadow-lg flex items-center justify-center h-12 w-12 z-10 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label="Fechar visualização da imagem"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="flex flex-col h-full max-h-[80vh] items-center justify-center">
              <img
                src={imageUrl}
                alt={title}
                className="max-w-full max-h-full object-contain rounded-xl shadow-xl"
                onClick={(e) => e.stopPropagation()}
                loading="lazy"
              />
              <div className="mt-6 text-center space-y-2">
                <h3 className="text-lg font-semibold text-foreground">{title}</h3>
                <p className="text-sm text-muted-foreground max-w-md">{description}</p>
              </div>
            </div>
            
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={openDetailModal}
                className="bg-background/80 backdrop-blur-sm border-border/50"
                aria-label="Ver detalhes do projeto"
              >
                <ExternalLink className="w-4 h-4 mr-1" />
                Ver Detalhes
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={closeImageModal}
                className="bg-background/80 backdrop-blur-sm"
                aria-label="Fechar visualização"
              >
                Fechar
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Detail Modal with Tabs */}
      <Dialog open={isDetailModalOpen} onOpenChange={handleDetailOpenChange}>
        <DialogContent className="w-[95vw] md:w-[90vw] lg:w-4/5 xl:w-3/5 max-h-[95vh] p-0 rounded-2xl focus:outline-none border border-border/30 bg-background/95 backdrop-blur-sm shadow-2xl overflow-hidden animate-in fade-in-0 zoom-in-95 duration-200" role="dialog" aria-label={`Detalhes do projeto ${title}`}>
          <div className="flex flex-col h-full max-h-[95vh] overflow-hidden">
            {/* Header */}
            <div className="flex-shrink-0 p-6 border-b border-border/30 bg-gradient-to-b from-background to-background/80 backdrop-blur-sm z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative overflow-hidden rounded-xl w-16 h-16 flex-shrink-0">
                    <img
                      src={imageUrl}
                      alt={title}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                  <div className="space-y-1">
                    <DialogTitle className="text-xl md:text-2xl lg:text-3xl font-bold line-clamp-2 leading-tight">{title}</DialogTitle>
                    <DialogDescription className="text-base text-muted-foreground line-clamp-2">{description}</DialogDescription>
                  </div>
                </div>
                <Button
                  onClick={closeDetailModal}
                  className="bg-background/80 hover:bg-accent/50 text-foreground border border-border/50 rounded-xl p-3 transition-all duration-200 shadow-lg hover:shadow-primary/20 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  aria-label="Fechar detalhes do projeto"
                  variant="ghost"
                  size="icon"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            {/* Tabs Content */}
            <div className="flex-1 overflow-hidden flex flex-col">
              <div className="flex-1 overflow-hidden">
                <ScrollArea className="w-full h-full relative">
                  <div className="p-6 space-y-6 max-h-full overflow-y-auto">
                    {/* Overview Tab */}
                    <div className="space-y-6">
                      {/* Main Image */}
                      <div className="relative">
                        <div className="aspect-[16/9] rounded-2xl overflow-hidden shadow-lg bg-muted/50">
                          <img
                            src={imageUrl}
                            alt={`${title} - Imagem principal`}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                            onClick={openImageModal}
                            loading="lazy"
                          />
                        </div>
                        <button
                          onClick={openImageModal}
                          className="absolute top-3 right-3 bg-primary/90 hover:bg-primary text-primary-foreground rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                          aria-label="Visualizar imagem em tamanho completo"
                        >
                          <Expand className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Tags */}
                      <div className="space-y-3">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                          <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                          </svg>
                          Tecnologias Utilizadas
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {tags.map((tag, index) => (
                            <Badge
                              key={index}
                              className={`text-sm px-3 py-1.5 transition-all duration-200 hover:scale-105 ${
                                index === 0 ? 'bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-md' :
                                index === 1 ? 'bg-gradient-to-r from-blue-500/10 to-blue-600/10 border border-blue-200 text-blue-800' :
                                index === 2 ? 'bg-gradient-to-r from-green-500/10 to-green-600/10 border border-green-200 text-green-800' :
                                'bg-muted/50 border border-muted/30'
                              }`}
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
                          Sobre o Projeto
                        </h3>
                        <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed space-y-3">
                          <p>{moreInfo}</p>
                        </div>
                      </div>
                    </div>

                    {/* Gallery Section */}
                    {galleryImages.length > 0 && (
                      <div className="space-y-4 pt-6 border-t border-border/20">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                          <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                          </svg>
                          Galeria
                          <span className="text-sm text-muted-foreground font-normal">({galleryImages.length} imagens)</span>
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-96 overflow-y-auto rounded-xl border border-border/20 p-3 bg-muted/20">
                          {galleryImages.map((image, index) => (
                            <div
                              key={index}
                              className="relative group cursor-pointer rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 aspect-square bg-background"
                              onClick={() => openGalleryModal(image, `${title} - Imagem ${index + 1}`)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                  openGalleryModal(image, `${title} - Imagem ${index + 1}`);
                                }
                              }}
                              role="button"
                              tabIndex={0}
                              aria-label={`Visualizar imagem ${index + 1} da galeria`}
                            >
                              <img
                                src={image}
                                alt={`Galeria ${index + 1}`}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                loading="lazy"
                              />
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <div className="bg-white/20 backdrop-blur-sm rounded-full p-2 flex items-center gap-1 text-white font-medium">
                                  <Expand className="h-3 w-3" />
                                  <span className="text-xs">Imagem {index + 1}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </div>
            </div>

            {/* Footer */}
            <div className="flex-shrink-0 p-6 border-t border-border/30 bg-gradient-to-t from-background/80 to-transparent">
              <div className="flex flex-col sm:flex-row gap-3 justify-between items-center">
                <div className="text-sm text-muted-foreground text-center sm:text-left">
                  <span>Projeto desenvolvido com {tags.length} tecnologias</span>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto justify-end sm:justify-start">
                  <Button
                    onClick={() => window.open(projectUrl, '_blank')}
                    className="flex items-center gap-2 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground font-semibold shadow-lg hover:shadow-primary/20 transition-all duration-300 px-6 py-2.5 rounded-xl"
                    aria-label={`Visitar projeto ${title}`}
                    size="sm"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Visitar Projeto
                  </Button>
                  <Button
                    onClick={closeDetailModal}
                    variant="outline"
                    className="border-border/50 bg-background/80 hover:bg-accent/50 text-foreground px-6 py-2.5 rounded-xl transition-all duration-200"
                    aria-label="Fechar detalhes do projeto"
                    size="sm"
                  >
                    Fechar
                  </Button>
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
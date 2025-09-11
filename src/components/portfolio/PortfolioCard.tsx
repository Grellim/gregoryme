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
      <Card className="group h-full flex flex-col card-urban urban-section relative overflow-visible transform -rotate-1 hover:rotate-0 transition-all duration-500 hover:shadow-[var(--neon-glow),var(--urban-shadow)] border-0 bg-gradient-to-br from-card/80 via-background-secondary to-card/50">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent"></div>
        <div className="absolute -top-2 -right-2 w-16 h-16 border-2 border-dashed border-accent rounded-full animate-pulse opacity-30"></div>
        <div className="absolute bottom-2 right-2 w-8 h-8 bg-destructive rounded-full opacity-20 animate-bounce"></div>
        <CardHeader className="p-2 relative -mt-4 -ml-4 transform rotate-3 border-l-4 border-r-2 border-b-2 border-accent/50">
          <div
            className="relative overflow-hidden aspect-[3/2] cursor-pointer group transform rotate-1 hover:rotate-0 transition-all duration-700 glitch"
            onClick={openImageModal}
            role="button"
            tabIndex={0}
            aria-label={`Ver imagem de ${title}`}
            data-text="STREET VISION"
          >
            <div className="relative p-2 group-hover:p-3 transition-all duration-300">
              <img
                src={imageUrl}
                alt={title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 origin-bottom-left filter grayscale group-hover:grayscale-0 border-2 border-accent/20 rounded-lg"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <div className="bg-black/50 backdrop-blur-md border border-accent/50 rounded-lg p-4 flex items-center gap-2 text-white font-bold text-sm tracking-wider">
                  <Expand className="h-4 w-4 animate-spin" />
                  <span className="graffiti-text uppercase tracking-widest">STREET VIEW</span>
                </div>
              </div>
              {/* Graffiti Overlay */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="w-8 h-8 bg-gradient-to-r from-destructive to-accent rounded-full border-2 border-white/20 animate-pulse"></div>
              </div>
              <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150">
                <span className="graffiti-text text-xs uppercase rotate-[-15deg] tracking-widest bg-black/50 px-2 py-1 rounded border border-primary/50">RAW</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 p-4 space-y-3 transform -rotate-1 border-t-2 border-accent/30 relative">
          <div className="space-y-2 absolute top-0 left-0 -ml-4 -mt-2">
            <div className="w-2 h-2 bg-accent rounded-full animate-ping opacity-50"></div>
          </div>
          <div className="space-y-3">
            <CardTitle className="text-lg font-black uppercase tracking-widest graffiti-text line-clamp-1 leading-tight group-hover:animate-pulse transition-all">
              {title}
            </CardTitle>
            <CardDescription className="text-sm leading-tight line-clamp-2 font-light text-foreground/80 italic border-l-4 border-accent/30 pl-3">
              {description}
            </CardDescription>
          </div>
          
          <div className="flex flex-wrap gap-2 pt-2">
            {tags.slice(0, 4).map((tag, index) => (
              <Badge
                key={index}
                variant={index === 0 ? "default" : index === 1 ? "secondary" : index === 2 ? "accent" : "outline"}
                className={`text-xs px-3 py-1.5 font-bold uppercase tracking-wider border-2 transform rotate-[-2deg] hover:rotate-0 hover:scale-110 transition-all duration-300 hover:shadow-[var(--neon-glow)] ${
                  index === 0 ? 'bg-primary border-primary text-primary-foreground shadow-cyan' :
                  index === 1 ? 'bg-secondary border-secondary text-secondary-foreground shadow-pink' :
                  index === 2 ? 'bg-accent border-accent text-accent-foreground shadow-green' :
                  'bg-card border-border-accent/50 text-foreground/70'
                }`}
              >
                <span className="inline-block transform -rotate-[2deg]">{tag}</span>
              </Badge>
            ))}
            {tags.length > 4 && (
              <Badge variant="outline" className="text-xs px-3 py-1.5 font-bold uppercase tracking-wider border-2 border-dashed border-accent/50 bg-gradient-to-r from-accent/10 to-primary/10 rotate-[3deg] hover:rotate-0">
                +{tags.length - 4} <span className="ml-1">🔥</span>
              </Badge>
            )}
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 relative transform rotate-1 border-t-2 border-l-2 border-accent/40 bg-gradient-to-t from-accent/5 to-transparent">
          {/* Reaction Buttons - Street Style */}
          <div className="flex items-center justify-between mb-3 gap-3 relative z-10">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setLikeCount(likeCount + 1)}
                className="group relative flex items-center gap-2 p-2.5 rounded-md bg-card/50 border border-accent/30 hover:border-accent transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 hover:shadow-[var(--neon-glow-green)] btn-street"
                aria-label="Curtir projeto"
              >
                <div className="absolute inset-0 rounded-md bg-gradient-to-r from-accent/20 to-destructive/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <Heart
                  className={`h-5 w-5 relative z-10 transition-all duration-300 transform ${
                    likeCount > 0
                      ? 'text-destructive fill-destructive scale-110 heart-beat'
                      : 'text-accent/70 group-hover:text-destructive group-hover:scale-110'
                  }`}
                />
                <span className="text-xs font-black uppercase tracking-wider text-accent/80 group-hover:text-destructive transition-colors relative z-10">
                  {likeCount || '0'}
                </span>
              </button>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  setShareCount(shareCount + 1);
                }}
                className="group relative flex items-center gap-2 p-2.5 rounded-md bg-card/50 border border-secondary/30 hover:border-secondary transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 hover:shadow-[var(--neon-glow-pink)] btn-street"
                aria-label="Compartilhar projeto"
              >
                <div className="absolute inset-0 rounded-md bg-gradient-to-r from-secondary/20 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <Share2 className="h-5 w-5 relative z-10 text-secondary/70 group-hover:text-primary transition-all group-hover:rotate-180" />
                <span className="text-xs font-black uppercase tracking-wider text-secondary/80 group-hover:text-primary transition-colors relative z-10">
                  {shareCount || '0'}
                </span>
              </button>
            </div>
            
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-accent/60 font-bold absolute -top-6 right-0 transform rotate-12 bg-black/80 px-2 py-1 rounded border border-accent/50">
              <span className="flex items-center gap-1">
                <Heart className="h-3 w-3 fill-accent" />
                {likeCount || '0'}
              </span>
              <span className="text-accent/40">•</span>
              <span className="flex items-center gap-1">
                <Share2 className="h-3 w-3" />
                {shareCount || '0'}
              </span>
            </div>
          </div>

          <Button
            onClick={openDetailModal}
            className="w-full relative overflow-hidden btn-street text-sm uppercase tracking-widest font-black transform -rotate-1 hover:rotate-0 transition-all duration-300 group"
            aria-label={`${locale.ui.projectDetails.knowMore} sobre ${title}`}
          >
            <span className="relative z-10 flex items-center justify-center gap-2 py-3">
              <span className="graffiti-text">{locale.ui.projectDetails.knowMore}</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </Button>
          
          {/* Urban Tag Cloud */}
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex gap-1 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200">
            {tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs uppercase font-bold tracking-wider bg-accent/20 text-accent border border-accent/50 rounded-full animate-float-gentle"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {tag}
              </span>
            ))}
          </div>
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
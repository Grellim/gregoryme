"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, X, Image as ImageIcon, Github, Globe, Youtube, FileText } from "lucide-react";
import Image from "next/image";
import GalleryModal from "./GalleryModal";
import { Locale } from "@/data/types";

interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  moreInfo: string;
  galleryImages: string[];
  links?: Array<{
    name: string;
    url: string;
    icon?: React.ReactNode;
  }>;
}

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project;
  locale: Locale;
}

export default function ProjectModal({ isOpen, onClose, project, locale }: ProjectModalProps) {
  const [isGalleryOpen, setIsGalleryOpen] = React.useState(false);
  const [selectedGalleryImage, setSelectedGalleryImage] = React.useState("");
  const [selectedGalleryAlt, setSelectedGalleryAlt] = React.useState("");

  const handleOpenGallery = (imageUrl: string, alt: string) => {
    setSelectedGalleryImage(imageUrl);
    setSelectedGalleryAlt(alt);
    setIsGalleryOpen(true);
  };

  const handleCloseGallery = () => {
    setIsGalleryOpen(false);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  const getLinkIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'github':
        return <Github className="w-4 h-4" />;
      case 'live':
      case 'demo':
        return <Globe className="w-4 h-4" />;
      case 'video':
      case 'youtube':
        return <Youtube className="w-4 h-4" />;
      case 'docs':
      case 'documentation':
        return <FileText className="w-4 h-4" />;
      default:
        return <ExternalLink className="w-4 h-4" />;
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="w-[95vw] max-w-4xl max-h-[95vh] p-0 rounded-xl focus:outline-none border border-border/50 bg-card/95 backdrop-blur-sm shadow-2xl overflow-hidden">
          <motion.div
            className="flex flex-col h-full max-h-[95vh]"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {/* Header */}
            <DialogHeader className="flex-shrink-0 p-6 border-b border-border/50 bg-card/80 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <DialogTitle className="text-xl font-bold text-gradient-hero">
                  {project.title}
                </DialogTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="rounded-full p-2 hover:bg-accent/50 transition-all duration-200 btn-modern"
                  aria-label="Close project modal"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
              <DialogDescription className="text-sm text-muted-foreground mt-2 leading-relaxed">
                {project.moreInfo}
              </DialogDescription>
            </DialogHeader>

            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Cover Image */}
              <motion.div
                className="relative flex-shrink-0 h-64 sm:h-80 md:h-96 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                whileHover={{ y: -2 }}
              >
                <Image
                  src={project.imageUrl}
                  alt={`${project.title} - Cover image`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500 cursor-pointer"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                  onClick={() => handleOpenGallery(project.imageUrl, `${project.title} - Cover`)}
                  priority
                />
                <div className="absolute inset-0 bg-black/20 hover:bg-black/30 transition-all duration-300" />
                <button
                  className="absolute top-3 right-3 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full opacity-0 hover:opacity-100 transition-all duration-200"
                  onClick={() => handleOpenGallery(project.imageUrl, `${project.title} - Cover`)}
                  aria-label="View cover image"
                >
                  <ImageIcon className="w-5 h-5" />
                </button>
              </motion.div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Description */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="space-y-4"
                >
                  <h3 className="text-lg font-semibold text-foreground">Descrição</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {project.description}
                  </p>
                </motion.div>

                {/* Tags */}
                {project.tags.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="space-y-3"
                  >
                    <h4 className="text-base font-medium text-foreground flex items-center gap-2">
                      <span className="text-primary">🏷️</span>
                      Tecnologias
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, index) => (
                        <motion.div
                          key={index}
                          whileHover={{ scale: 1.05, y: -1 }}
                          transition={{ type: "spring", stiffness: 400 }}
                          className="cursor-default"
                        >
                          <Badge variant="secondary" className="text-xs px-3 py-1">
                            {tag}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Gallery */}
                {project.galleryImages && project.galleryImages.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="space-y-4"
                  >
                    <h4 className="text-base font-medium text-foreground flex items-center gap-2">
                      <span className="text-accent">🖼️</span>
                      Galeria
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {project.galleryImages.slice(0, 6).map((image, index) => (
                        <motion.div
                          key={index}
                          className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group"
                          whileHover={{ scale: 1.02 }}
                          onClick={() => handleOpenGallery(image, `${project.title} - Galeria ${index + 1}`)}
                        >
                          <Image
                            src={image}
                            alt={`${project.title} - Galeria ${index + 1}`}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                            sizes="(max-width: 768px) 1fr, (max-width: 1200px) 0.33fr, 0.33fr"
                          />
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300" />
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <ImageIcon className="w-6 h-6 text-white" />
                          </div>
                        </motion.div>
                      ))}
                      {project.galleryImages.length > 6 && (
                        <motion.div
                          className="relative aspect-square rounded-lg overflow-hidden bg-muted flex items-center justify-center cursor-pointer group"
                          whileHover={{ scale: 1.02 }}
                          onClick={() => handleOpenGallery(project.galleryImages[0], `${project.title} - Ver todas`)}
                        >
                          <div className="text-center text-muted-foreground">
                            <ImageIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
                            <p className="text-xs">+{project.galleryImages.length - 6} mais</p>
                          </div>
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300" />
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Links */}
                {links.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="space-y-4 pt-4 border-t border-border/50"
                  >
                    <h4 className="text-base font-medium text-foreground flex items-center gap-2">
                      <span className="text-secondary">🔗</span>
                      Links
                    </h4>
                    <div className="space-y-2">
                      {links.map((link, index) => (
                        <motion.a
                          key={index}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center gap-3 p-3 rounded-lg border border-border/50 hover:border-primary/50 hover:bg-accent/50 transition-all duration-200 btn-modern"
                          whileHover={{ x: 4, y: -1 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                            {link.icon || <ExternalLink className="w-4 h-4 text-primary" />}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-foreground truncate">{link.name}</p>
                            <p className="text-xs text-muted-foreground truncate">{link.url.replace('https://', '').replace('http://', '')}</p>
                          </div>
                          <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors ml-auto" />
                        </motion.a>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Footer */}
              <DialogFooter className="flex-shrink-0 p-6 border-t border-border/50 bg-card/80 backdrop-blur-sm">
                <div className="flex w-full gap-3">
                  <Button
                    variant="outline"
                    className="flex-1 btn-modern"
                    onClick={onClose}
                  >
                    <X className="w-4 h-4 mr-2" />
                    Fechar
                  </Button>
                  {project.projectUrl && (
                    <Button
                      asChild
                      className="flex-1 btn-modern"
                      variant="default"
                    >
                      <a
                        href={project.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Visitar Projeto
                      </a>
                    </Button>
                  )}
                </div>
              </DialogFooter>
            </div>
          </motion.div>
        </DialogContent>
      </Dialog>

      {/* Gallery Modal */}
      <GalleryModal
        isOpen={isGalleryOpen}
        onClose={handleCloseGallery}
        imageUrl={selectedGalleryImage}
        alt={selectedGalleryAlt}
      />
    </>
  );
}
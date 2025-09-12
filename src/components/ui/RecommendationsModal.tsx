"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { X, Star } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { recommendations } from "@/data/recommendations";
import { getSiteConfig, getLocale } from "@/data/config";
import type { Recommendation } from "@/data/types";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface RecommendationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RecommendationsModal({ isOpen, onClose }: RecommendationsModalProps) {
  const lang = 'pt-BR';
  const t = useTranslations("Recommendations");
  const locale = getLocale(lang);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(timer);
  }, [isOpen]);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  const handleCardClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        className={cn(
          "w-full max-w-[60vw] md:max-w-4xl lg:max-w-5xl xl:max-w-6xl max-h-screen p-0 overflow-y-auto pb-[25px] rounded-2xl focus:outline-none border border-border/50",
          "max-[640px]:max-w-[95vw] max-[640px]:w-full",
          "[&_.scrollbar]:w-4 [&_.scrollbar]:scrollbar-thumb-gray-400/50 [&_.scrollbar]:scrollbar-track-transparent"
        )}
        onKeyDown={handleKeyDown}
        role="dialog"
        aria-labelledby="recommendations-modal-title"
        aria-describedby="recommendations-modal-desc"
        aria-modal="true"
      >
        <DialogHeader className="p-4 sm:p-6 lg:p-8 border-b border-border/50 sticky top-0 bg-background/95 backdrop-blur-sm z-10">
          <div className="text-left space-y-4 sm:space-y-6 px-4 sm:px-6">
            <DialogTitle id="recommendations-modal-title" className={cn(
              "text-xl sm:text-2xl lg:text-3xl font-bold leading-tight",
              "clamp-[1.25rem, 2.5vw + 0.75rem, 2rem]"
            )}>
              {t("title") || "Recomendações"}
            </DialogTitle>
            <DialogDescription id="recommendations-modal-desc" className={cn(
              "leading-relaxed",
              "clamp-[0.75rem, 1.5vw + 0.5rem, 1rem]"
            )}>
              {t("description") || "O que meus clientes e colegas dizem sobre meu trabalho"}
            </DialogDescription>
          </div>
          <Button
            onClick={onClose}
            className={cn(
              "absolute top-4 right-4 sm:top-6 sm:right-6 bg-background/80 hover:bg-background text-foreground border border-border/50 rounded-full p-2 sm:p-3 transition-all duration-200 ease-in-out flex items-center justify-center"
            )}
            aria-label="Close recommendations modal"
          >
            <X className="w-5 h-5" />
          </Button>
        </DialogHeader>

        <ScrollArea className="flex-1">
          {isLoading ? (
            <div className="w-full p-6 space-y-6">
              <Skeleton className="h-8 w-3/4" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-64 rounded-xl" />
                ))}
              </div>
            </div>
          ) : (
            <div className="w-full p-6 space-y-6">
              {recommendations.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recommendations.slice(0, 6).map((recommendation, index) => (
                    <motion.div
                      key={recommendation.id || index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="group"
                      whileHover={{ y: -4 }}
                    >
                      <Card className="h-full border-border/50 hover:border-primary/50 transition-all duration-300 overflow-hidden">
                        <CardContent className="p-6 space-y-4 pt-8">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="flex-shrink-0">
                              <Avatar className="w-12 h-12">
                                <AvatarImage src={recommendation.avatar || "/default-avatar.png"} alt={recommendation.name} />
                                <AvatarFallback className="bg-primary text-primary-foreground text-sm font-medium">
                                  {recommendation.name?.charAt(0) || "U"}
                                </AvatarFallback>
                              </Avatar>
                            </div>
                            <div>
                              <h3 className="font-semibold text-foreground">{recommendation.name}</h3>
                              <p className="text-sm text-muted-foreground">{recommendation.role} - {recommendation.company}</p>
                            </div>
                          </div>
                          
                          <div className="space-y-3">
                            <p className="text-muted-foreground leading-relaxed italic border-l-4 border-primary/20 pl-4">
                              "{recommendation.message}"
                            </p>
                          </div>
                          
                          <div className="flex items-center gap-2 pt-4 border-t border-border/50">
                            {recommendation.rating && (
                              <div className="flex items-center gap-1 text-sm text-primary">
                                <Star className="w-4 h-4 fill-current" />
                                <span>{recommendation.rating}/5</span>
                              </div>
                            )}
                            <span className="text-xs text-muted-foreground ml-auto">
                              {recommendation.updatedAt ? new Date(recommendation.updatedAt).toLocaleDateString('pt-BR') : 'Recent'}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                  
                  {recommendations.length > 6 && (
                    <motion.div
                      className="col-span-full flex justify-center pt-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      <Button variant="outline" size="sm" className="border-primary/50">
                        {t("loadMore") || "Carregar mais"} ({recommendations.length - 6})
                      </Button>
                    </motion.div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg mb-4">
                    {t("noRecommendations") || "Nenhuma recomendação disponível no momento"}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {t("checkBackLater") || "Volte mais tarde para ver novas recomendações"}
                  </p>
                </div>
              )}
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
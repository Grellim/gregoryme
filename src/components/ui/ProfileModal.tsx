"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { ExternalLink, X, Github, Linkedin, Twitter } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getLocale } from "@/data/config";
import { profileData } from "@/data/profile";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface ProfileData {
  name: string;
  subtitle: string;
  badges: string[];
  experience: {
    title: string;
    description: string;
  };
  techStack: {
    title: string;
    skills: string[];
  };
  mission: {
    title: string;
    description: string;
  };
}

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  const lang = 'pt-BR';
  const t = useTranslations("Profile");
  const locale = getLocale(lang); // Keep for fallback if needed
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={cn(
          "w-[95vw] max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-4xl max-h-[90vh] p-0 rounded-lg focus:outline-none border border-border/50 bg-card/95 backdrop-blur-sm shadow-2xl overflow-hidden",
          "max-[640px]:w-[95vw] max-[640px]:max-w-[95vw]"
        )}
        role="dialog"
        aria-labelledby="profile-modal-title"
        aria-describedby="profile-modal-desc"
      >
        <motion.div
          className="flex flex-col h-full max-h-[90vh] overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Header */}
          <div className="flex-shrink-0 p-6 border-b border-border bg-card">
            <div className="text-center space-y-4">
  <DialogTitle id="profile-modal-title" className="text-2xl font-bold">
    {t("title")}
  </DialogTitle>
  <DialogDescription id="profile-modal-desc" className="text-base text-muted-foreground leading-relaxed">
    {t("description")}
  </DialogDescription>
            </div>
          </div>

  <ScrollArea className="flex-1">
    {isLoading ? (
      <div className="w-full p-6 space-y-8">
        <Skeleton className="h-8 w-3/4" />
        <div className="flex flex-col lg:flex-row gap-6 items-center lg:items-start">
          <Skeleton className="w-32 h-32 lg:w-40 lg:h-40 rounded-full mx-auto lg:mx-0" />
          <div className="flex-1 space-y-4">
            <Skeleton className="h-12 w-1/2" />
            <Skeleton className="h-6 w-full" />
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-6 w-20 rounded-md" />
              ))}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-48 rounded-xl" />
          ))}
        </div>
      </div>
    ) : (
      <div className="w-full p-6 space-y-8">
        {/* Profile Section - Stack on mobile, row on desktop */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-col lg:flex-row gap-6 items-center lg:items-start w-full"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex-shrink-0 w-32 h-32 lg:w-40 lg:h-40 mx-auto lg:mx-0"
            whileHover={{ scale: 1.05 }}
          >
            <div className="relative">
              <Avatar className="w-full h-full border-2 border-border shadow-lg" aria-label="Profile photo of Gregory Vallim">
                <AvatarImage src="/profile.jpg" alt="Profile photo" />
                <AvatarFallback className="text-xl lg:text-2xl bg-primary text-primary-foreground font-semibold">GV</AvatarFallback>
              </Avatar>
            </div>
          </motion.div>
          
          <motion.div
            className="flex-1 text-center lg:text-left space-y-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <motion.h1
              className={cn(
                "text-2xl lg:text-3xl font-bold text-gradient leading-tight",
                "clamp-[1.5rem, 2.5vw + 1rem, 2.5rem]"
              )}
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              {profileData.name}
            </motion.h1>
            <motion.p
              className={cn(
                "text-lg text-muted-foreground leading-relaxed",
                "clamp-[1rem, 2vw + 0.5rem, 1.125rem]"
              )}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              {profileData.subtitle}
            </motion.p>
            <motion.div
              className="flex flex-wrap gap-2 justify-center lg:justify-start"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              {profileData.badges.map((badge, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Badge
                    variant="secondary"
                    className="text-sm px-3 py-1.5"
                  >
                    {badge}
                  </Badge>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Content Cards - Responsive grid */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, staggerChildren: 0.1 }}
        >
          {/* Experience Card */}
          <motion.article
            className={cn(
              "space-y-3 p-6 rounded-xl border border-border/50 bg-card card-lift",
              "transition-all duration-300 ease-in-out hover:shadow-lg"
            )}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.4 }}
          >
            <motion.h3
              className="text-lg font-semibold flex items-center gap-2 cursor-pointer"
              whileHover={{ color: "#8b5cf6" }}
              onClick={() => {}}
            >
              <motion.span
                className="text-primary text-lg"
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                🎯
              </motion.span>
              {profileData.experience.title}
            </motion.h3>
            <motion.p
              className="text-sm text-muted-foreground leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              {profileData.experience.description}
            </motion.p>
          </motion.article>

          {/* Tech Stack Card */}
          <motion.article
            className={cn(
              "space-y-3 p-6 rounded-xl border border-border/50 bg-card card-lift",
              "transition-all duration-300 ease-in-out hover:shadow-lg"
            )}
            initial={{ opacity: 0, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.4 }}
          >
            <motion.h3
              className="text-lg font-semibold flex items-center gap-2 cursor-pointer"
              whileHover={{ color: "#8b5cf6" }}
              onClick={() => {}}
            >
              <motion.span
                className="text-primary text-lg"
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                🔧
              </motion.span>
              {profileData.techStack.title}
            </motion.h3>
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-3 gap-2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              {profileData.techStack.skills.map((skill, index) => (
                <motion.div
                  key={skill}
                  whileHover={{ scale: 1.1, y: -2 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  className="cursor-pointer"
                  onClick={() => {}}
                >
                  <Badge
                    variant="outline"
                    className="text-xs justify-center py-1.5 px-2 w-full"
                  >
                    {skill}
                  </Badge>
                </motion.div>
              ))}
            </motion.div>
          </motion.article>

          {/* Mission Card */}
          <motion.article
            className="space-y-3 p-6 rounded-xl border border-border/50 bg-card card-lift xl:col-span-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.4 }}
          >
            <motion.h3
              className="text-lg font-semibold flex items-center gap-2 cursor-pointer"
              whileHover={{ color: "#8b5cf6" }}
              onClick={() => {}}
            >
              <motion.span
                className="text-primary text-lg"
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                🚀
              </motion.span>
              {profileData.mission.title}
            </motion.h3>
            <motion.p
              className="text-sm text-muted-foreground leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              {profileData.mission.description}
            </motion.p>
          </motion.article>
        </motion.div>
      </div>
    )}
  </ScrollArea>

          {/* Footer with Social Links */}
          <motion.div
            className="flex justify-center p-6 border-t border-border bg-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.4 }}
          >
            <div className="flex items-center gap-4">
              <motion.div
                className="flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Button
                  onClick={onClose}
                  variant="outline"
  className={cn(
    "px-6 py-3 transition-all duration-200 ease-in-out hover:scale-105",
    "max-[640px]:px-4 max-[640px]:py-2"
  )}
                  aria-label="Close profile modal"
                >
                  <X className="w-4 h-4 mr-2" />
  {t("closeButton") || locale.ui.profile.close}
                </Button>
              </motion.div>
              
              <div className="flex items-center gap-2">
                <motion.a
                  href="https://github.com/gregoryme"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
  className={cn(
    "p-2 text-muted-foreground hover:text-primary transition-all duration-200 ease-in-out",
    "max-[640px]:p-1.5"
  )}
                  aria-label="GitHub profile"
                >
                  <Github className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href="https://linkedin.com/in/gregoryvallim"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
  className={cn(
    "p-2 text-muted-foreground hover:text-primary transition-all duration-200 ease-in-out",
    "max-[640px]:p-1.5"
  )}
                  aria-label="LinkedIn profile"
                >
                  <Linkedin className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href="https://twitter.com/gregoryvallim"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
  className={cn(
    "p-2 text-muted-foreground hover:text-primary transition-all duration-200 ease-in-out",
    "max-[640px]:p-1.5"
  )}
                  aria-label="Twitter profile"
                >
                  <Twitter className="w-5 h-5" />
                </motion.a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
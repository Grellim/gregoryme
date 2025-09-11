"use client";

import * as React from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ExternalLink, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getLocale } from "@/data/config";
import { profileData } from "@/data/profile";

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

const lang = 'pt-BR';
const locale = getLocale(lang);

export default function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-4xl max-h-[90vh] p-0 rounded-lg focus:outline-none border border-border bg-card shadow-xl overflow-hidden" role="dialog" aria-label={locale.ui.profile.closeAria}>
        <div className="flex flex-col h-full max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="flex-shrink-0 p-6 border-b border-border bg-card">
            <div className="text-center space-y-4">
              <DialogTitle className="text-2xl font-bold">
                {locale.ui.profile.title}
              </DialogTitle>
              <DialogDescription className="text-base text-muted-foreground leading-relaxed">
                {locale.ui.profile.description}
              </DialogDescription>
            </div>
          </div>

          <ScrollArea className="flex-1">
            <div className="w-full p-6 space-y-8">
              {/* Profile Section - Stack on mobile, row on desktop */}
              <section className="flex flex-col lg:flex-row gap-6 items-center lg:items-start w-full">
                <div className="flex-shrink-0 w-32 h-32 lg:w-40 lg:h-40 mx-auto lg:mx-0">
                  <div className="relative">
                    <Avatar className="w-full h-full border-2 border-border shadow-lg" aria-label="Foto de perfil de Gregory Vallim">
                      <AvatarImage src="/profile.jpg" alt="Foto de perfil" />
                      <AvatarFallback className="text-xl lg:text-2xl bg-primary text-primary-foreground font-semibold">GV</AvatarFallback>
                    </Avatar>
                  </div>
                </div>
                
                <div className="flex-1 text-center lg:text-left space-y-4">
                  <h1 className="text-2xl lg:text-3xl font-bold text-gradient leading-tight">
                    {profileData.name}
                  </h1>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {profileData.subtitle}
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                    {profileData.badges.map((badge, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-sm px-3 py-1.5"
                      >
                        {badge}
                      </Badge>
                    ))}
                  </div>
                </div>
              </section>

              {/* Content Cards - Responsive grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 w-full">
                {/* Experience Card */}
                <article className="space-y-3 p-6 rounded-lg border border-border bg-card">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <span className="text-primary text-lg">🎯</span>
                    {profileData.experience.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {profileData.experience.description}
                  </p>
                </article>

                {/* Tech Stack Card */}
                <article className="space-y-3 p-6 rounded-lg border border-border bg-card">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <span className="text-primary text-lg">🔧</span>
                    {profileData.techStack.title}
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {profileData.techStack.skills.map((skill, index) => (
                      <Badge
                        key={skill}
                        variant="outline"
                        className="text-xs justify-center py-1.5 px-2"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </article>

                {/* Mission Card */}
                <article className="space-y-3 p-6 rounded-lg border border-border bg-card xl:col-span-1">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <span className="text-primary text-lg">🚀</span>
                    {profileData.mission.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {profileData.mission.description}
                  </p>
                </article>
              </div>
            </div>
          </ScrollArea>

          {/* Footer */}
          <div className="flex justify-center p-6 border-t border-border bg-card">
            <Button
              onClick={onClose}
              variant="outline"
              className="px-6 py-3"
              aria-label={locale.ui.profile.closeAria}
            >
              <X className="w-4 h-4 mr-2" />
              {locale.ui.profile.close}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
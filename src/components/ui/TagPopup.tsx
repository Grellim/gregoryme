"use client";

import { useState } from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
interface TagPopupProps {
  tag: string;
  description: string;
  emoji: string;
  color: string;
  children: React.ReactNode;
}

export default function TagPopup({ tag, description, emoji, color, children }: TagPopupProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="cursor-help"
      >
        {children}
      </div>
      
      {isHovered && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-50">
    <div className={cn(
      "bg-card border border-border rounded-lg shadow-2xl p-3 sm:p-4 md:p-6 max-h-[200px] overflow-auto",
      "min-w-[200px] sm:min-w-[250px] md:min-w-[300px] max-[640px]:min-w-[180px] max-[640px]:p-2",
      `[background-color:${color}]`
    )} role="tooltip" aria-label={`${tag}: ${description}`}>
      <ScrollArea className="h-full pr-2">
        <div className={cn(
          "flex items-center gap-2 mb-2 sm:mb-3",
          "max-[640px]:gap-1 max-[640px]:mb-1.5"
        )}>
          <span className={cn(
            "text-lg sm:text-xl",
            "max-[640px]:text-base"
          )}>
            {emoji}
          </span>
          <h4 className={cn(
            "font-semibold text-foreground",
            "text-sm sm:text-base md:text-lg max-[640px]:text-sm",
            "clamp-[0.875rem, 1.25vw + 0.5rem, 1rem]"
          )}>
            {tag}
          </h4>
        </div>
        <p className={cn(
          "text-muted-foreground leading-relaxed",
          "text-sm max-[640px]:text-xs",
          "clamp-[0.75rem, 1.25vw + 0.25rem, 0.875rem]"
        )}>
          {description}
        </p>
      </ScrollArea>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 max-[640px]:-translate-y-0.5">
        <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-card"></div>
      </div>
    </div>
        </div>
      )}
    </div>
  );
}
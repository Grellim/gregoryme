"use client";

import { useState } from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
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
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-2xl p-3 sm:p-4 md:p-6 min-w-[200px] sm:min-w-[250px] md:min-w-[300px] max-h-[200px] overflow-auto">
            <ScrollArea className="h-full pr-2">
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <span className="text-lg sm:text-xl">{emoji}</span>
                <h4 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base md:text-lg">{tag}</h4>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed text-xs sm:text-sm md:text-base">
                {description}
              </p>
            </ScrollArea>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1">
              <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white dark:border-t-gray-900"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
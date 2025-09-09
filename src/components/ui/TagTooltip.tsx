"use client";

import { useState } from "react";

interface TagTooltipProps {
  emoji: string;
  description: string;
  children: React.ReactNode;
}

export default function TagTooltip({ emoji, description, children }: TagTooltipProps) {
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
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-2xl p-4 min-w-[280px]">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">{emoji}</span>
              <h4 className="font-semibold text-gray-900 dark:text-white text-lg">
                {children?.toString().replace(/🚀|💡|⚡|🌱/g, '').trim()}
              </h4>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              {description}
            </p>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1">
              <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white dark:border-t-gray-900"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Skill {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  emoji: string;
}

interface SkillsCarouselProps {
  skills: Skill[];
}

export default function SkillsCarousel({ skills }: SkillsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % skills.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + skills.length) % skills.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        nextSlide();
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isPaused]);

  // Calculate visible cards (3 at a time for desktop, 1 for mobile)
  const getVisibleCards = () => {
    const visibleCards = [];
    const cardsToShow = typeof window !== 'undefined' && window.innerWidth >= 768 ? 3 : 1;
    
    for (let i = 0; i < cardsToShow; i++) {
      const index = (currentIndex + i) % skills.length;
      visibleCards.push({
        ...skills[index],
        originalIndex: index
      });
    }
    
    return visibleCards;
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      {/* Carousel Container */}
      <div 
        className="relative overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {getVisibleCards().map((skill, index) => (
            <div
              key={`${skill.title}-${index}`}
              className={`card-friendly bg-white dark:bg-card p-8 rounded-xl shadow-lg border-2 transition-all duration-300 ${
                index === 1 && typeof window !== 'undefined' && window.innerWidth >= 768
                  ? 'border-purple-400 dark:border-purple-400 scale-105' 
                  : 'border-transparent'
              }`}
            >
              <div className="text-center">
                <div className={`w-20 h-20 ${skill.color} rounded-full flex items-center justify-center mx-auto mb-6`}>
                  {skill.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 font-poppins">{skill.title}</h3>
                <p className="text-muted-foreground font-inter text-sm leading-relaxed">
                  {skill.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <Button
        variant="outline"
        size="icon"
        onClick={prevSlide}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 bg-white dark:bg-card border-2 border-purple-400 dark:border-purple-400 shadow-lg"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={nextSlide}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 bg-white dark:bg-card border-2 border-purple-400 dark:border-purple-400 shadow-lg"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      {/* Indicators */}
      <div className="flex justify-center gap-2 mt-8">
        {skills.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentIndex
                ? 'bg-purple-400 scale-125'
                : 'bg-gray-300 dark:bg-gray-600'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
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

interface SkillsGridCarouselProps {
  skills: Skill[];
}

export default function SkillsGridCarousel({ skills }: SkillsGridCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % skills.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + skills.length) % skills.length);
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

  const getVisibleCards = () => {
    const cards = [];
    const totalCards = skills.length;
    
    // Show 3 cards at a time
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % totalCards;
      cards.push(skills[index]);
    }
    
    return cards;
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      <div 
        className="relative overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Grid Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 transition-all duration-500 ease-in-out">
          {getVisibleCards().map((skill, index) => (
            <div
              key={`${skill.title}-${index}`}
              className={`card-friendly bg-white dark:bg-card p-8 rounded-xl shadow-lg border-2 transition-all duration-300 ${
                index === 1 
                  ? 'border-purple-400 dark:border-purple-400 scale-105 shadow-xl' 
                  : 'border-transparent'
              }`}
            >
              <div className="text-center">
                <div className={`w-20 h-20 ${skill.color} rounded-full flex items-center justify-center mx-auto mb-6 transition-transform duration-300 hover:scale-110`}>
                  {skill.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 font-poppins">{skill.title}</h3>
                <p className="text-muted-foreground font-inter text-sm leading-relaxed">
                  {skill.description}
                </p>
                <div className="mt-4">
                  <span className="text-2xl">{skill.emoji}</span>
                </div>
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
        className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 bg-white dark:bg-card border-2 border-purple-400 dark:border-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={nextSlide}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 bg-white dark:bg-card border-2 border-purple-400 dark:border-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      {/* Indicators */}
      <div className="flex justify-center gap-2 mt-8">
        {skills.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-purple-400 scale-125'
                : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
            }`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="mt-4">
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full transition-all duration-1000 ease-linear"
            style={{ width: `${((currentIndex + 1) / skills.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Skill {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  emoji: string;
  proficiency?: number;
}

interface SkillsCarouselProps {
  skills: Skill[];
}

export default function SkillsCarousel({ skills }: SkillsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [direction, setDirection] = useState(0);

  const slidesPerView = typeof window !== 'undefined' ?
    window.innerWidth >= 1024 ? 3 :
    window.innerWidth >= 768 ? 2 : 1 : 1;

  const totalSlides = skills.length;

  const nextSlide = useCallback(() => {
    if (!isDragging) {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }
  }, [totalSlides, isDragging]);

  const prevSlide = useCallback(() => {
    if (!isDragging) {
      setDirection(-1);
      setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    }
  }, [totalSlides, isDragging]);

  const goToSlide = useCallback((index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index % totalSlides);
  }, [currentIndex, totalSlides]);

  // Auto-play with pause/resume
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (!isPaused && !isDragging) {
      interval = setInterval(() => {
        nextSlide();
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isPaused, isDragging, nextSlide]);

  // Touch support via CSS (simplified)
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    const startX = touch.clientX;
    const startTime = Date.now();
    
    const handleTouchMove = (moveEvent: TouchEvent) => {
      if (!moveEvent.touches.length) return;
      const currentX = moveEvent.touches[0].clientX;
      const diffX = currentX - startX;
      const diffTime = Date.now() - startTime;
      
      if (Math.abs(diffX) > 50 && diffTime < 300) {
        if (diffX > 0) {
          prevSlide();
        } else {
          nextSlide();
        }
      }
    };
    
    const handleTouchEnd = () => {
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
    
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd, { passive: false });
  }, [nextSlide, prevSlide]);

  // Pause on hover/focus
  const handleMouseEnter = () => {
    setIsPaused(true);
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === ' ') {
        e.preventDefault();
        setIsPaused(!isPaused);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isPaused, nextSlide, prevSlide]);

  // ARIA live region for screen readers
  const ariaLiveMessage = `Exibindo habilidade ${currentIndex + 1} de ${totalSlides}`;

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4" role="region" aria-label="Carrossel de habilidades">
      <div
        ref={containerRef}
        className="relative overflow-hidden rounded-2xl"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleMouseEnter}
        onBlur={handleMouseLeave}
        tabIndex={0}
      >
        {/* Loading Skeleton */}
        {skills.length === 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-12">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="card-professional p-8 space-y-4">
                <div className="skeleton w-20 h-20 rounded-full mx-auto"></div>
                <div className="skeleton h-6 w-3/4 mx-auto"></div>
                <div className="skeleton h-4 w-full mx-auto"></div>
                <div className="skeleton h-4 w-5/6 mx-auto"></div>
              </div>
            ))}
          </div>
        )}

        {/* Carousel Track */}
        <div className="flex transition-transform duration-700 ease-out" style={{ transform: `translateX(-${(currentIndex % totalSlides) * (100 / slidesPerView)}%)` }}>
          {skills.concat(skills).map((skill, index) => {
            const slideIndex = index % totalSlides;
            const isVisible = Math.abs((index % totalSlides) - currentIndex) < slidesPerView;
            
            return (
              <motion.div
                key={slideIndex}
                className={`flex-shrink-0 w-full ${slidesPerView === 1 ? 'lg:w-1/3' : slidesPerView === 2 ? 'lg:w-1/2' : 'w-full'}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: isVisible ? 1 : 0.3, scale: isVisible ? 1 : 0.95 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                whileHover={{ y: -4 }}
                role="group"
                aria-label={`${skill.title}, ${skill.description}`}
              >
                <div className="card-professional mx-2 h-full flex flex-col justify-center p-8 space-y-6 rounded-xl">
                  <motion.div
                    className="glass w-24 h-24 flex items-center justify-center mx-auto rounded-2xl"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    style={{ backgroundColor: skill.color }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring" }}
                    >
                      {skill.icon}
                    </motion.div>
                  </motion.div>
                  
                  <div className="text-center space-y-3">
                    <motion.h3
                      className="text-scale-xl font-bold gradient-primary font-poppins"
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      {skill.title}
                    </motion.h3>
                    
                    <motion.div
                      className="space-y-2"
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      <p className="text-scale-sm text-muted-foreground font-inter leading-relaxed px-2">
                        {skill.description}
                      </p>
                      
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-2xl">{skill.emoji}</span>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <motion.span
                              key={i}
                              className={`w-5 h-5 rounded-full ${
                                i < Math.round((skill.proficiency || 0) / 20)
                                  ? 'bg-primary'
                                  : 'bg-muted'
                              }`}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.5 + i * 0.1 }}
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Navigation Controls */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-between px-4">
          <motion.div
            className="pointer-events-auto"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <motion.button
              type="button"
              onClick={prevSlide}
              className={cn(
                "glass hover:glass bg-white/20 dark:bg-black/20 border border-primary/30 rounded-full p-3 shadow-lg backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                "hover:scale-110"
              )}
              aria-label="Slide anterior"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="h-5 w-5" />
            </motion.button>
          </motion.div>

          <motion.div
            className="pointer-events-auto"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <motion.button
              type="button"
              onClick={nextSlide}
              className={cn(
                "glass hover:glass bg-white/20 dark:bg-black/20 border border-primary/30 rounded-full p-3 shadow-lg backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                "hover:scale-110"
              )}
              aria-label="Próximo slide"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="h-5 w-5" />
            </motion.button>
          </motion.div>
        </div>

        {/* Play/Pause Button */}
        <motion.div
          className="absolute top-4 right-4 z-20 pointer-events-auto"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.button
            type="button"
            onClick={() => setIsPaused(!isPaused)}
            className={cn(
              "glass hover:glass bg-primary/10 dark:bg-primary/20 border border-primary/30 rounded-full p-2 shadow-lg backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
              "hover:scale-110"
            )}
            aria-label={isPaused ? "Retomar reprodução automática" : "Pausar reprodução automática"}
            whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(139, 92, 246, 0.3)" }}
            whileTap={{ scale: 0.95 }}
          >
            {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
          </motion.button>
        </motion.div>

        {/* Indicators */}
        <motion.div
          className="flex justify-center gap-2 mt-8 pb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {skills.map((_, index) => (
            <motion.button
              type="button"
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "relative overflow-hidden transition-all duration-300 ease-out rounded-full",
                index === currentIndex
                  ? "w-8 h-2 bg-gradient-to-r from-primary to-secondary scale-125 shadow-lg"
                  : "w-6 h-2 bg-muted hover:bg-muted-foreground/50 hover:scale-110"
              )}
              aria-label={`Ir para slide ${index + 1}`}
              aria-current={index === currentIndex ? "true" : "false"}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          className="w-full bg-muted/50 rounded-full h-1.5 mt-4 overflow-hidden"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        >
          <motion.div
            className="bg-gradient-to-r from-primary to-secondary h-full rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isPaused ? 0 : 1 }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>

        {/* ARIA Live Region */}
        <div className="sr-only" aria-live="polite" aria-atomic="true">
          {ariaLiveMessage}
        </div>
      </div>
    </div>
  );
}
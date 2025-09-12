"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface VideoBackgroundProps {
  videoSrc: string;
  fallbackImage: string;
  children: React.ReactNode;
  className?: string;
}

export default function VideoBackground({ videoSrc, fallbackImage, children, className }: VideoBackgroundProps) {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handleLoadedData = () => {
        setIsVideoLoaded(true);
        setIsLoading(false);
      };

      const handleError = () => {
        setIsLoading(false);
      };

      video.addEventListener('loadeddata', handleLoadedData);
      video.addEventListener('error', handleError);

      return () => {
        video.removeEventListener('loadeddata', handleLoadedData);
        video.removeEventListener('error', handleError);
      };
    }
  }, [videoSrc]);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.addEventListener('loadeddata', () => {
        setIsVideoLoaded(true);
      });
    }
  }, []);

  return (
  <div className={cn("relative w-full h-full overflow-hidden", className)}>
    {isLoading && (
      <Skeleton className="absolute inset-0 w-full h-full" />
    )}
    
    {/* Video Background */}
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      className="absolute inset-0 w-full h-full object-cover"
      poster={fallbackImage}
      onLoadedData={() => setIsVideoLoaded(true)}
      aria-hidden="true"
    >
      <source src={videoSrc} type="video/mp4" />
      Your browser does not support the video tag.
    </video>

    {/* Fallback Image */}
    {!isVideoLoaded && (
      <img
        src={fallbackImage}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
        aria-hidden="true"
      />
    )}

    {/* Overlay for better text readability */}
    <div className="absolute inset-0 bg-black/40" />

    {/* Content */}
    <div className="relative z-10 flex items-center justify-center h-full">
      {children}
    </div>
  </div>
  );
}
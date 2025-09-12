"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface VideoBackgroundProps {
  videoSrc: string;
  fallbackImage: string;
  children: React.ReactNode;
  className?: string;
}

export default function VideoBackground({ videoSrc, fallbackImage, children, className }: VideoBackgroundProps) {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

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
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-fill"
        style={{ display: isVideoLoaded ? 'block' : 'none' }}
      >
        <source src={videoSrc} type="video/mp4" />
        Seu navegador não suporta vídeos HTML5.
      </video>

      {/* Fallback Image */}
      {!isVideoLoaded && (
        <img
          src={fallbackImage}
          alt="Background"
          className="absolute inset-0 w-full h-full object-fill"
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
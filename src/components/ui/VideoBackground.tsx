"use client";

import { useState, useRef, useEffect } from "react";

interface VideoBackgroundProps {
  videoSrc: string;
  fallbackImage: string;
  children: React.ReactNode;
}

export default function VideoBackground({ videoSrc, fallbackImage, children }: VideoBackgroundProps) {
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
    <div className="relative w-full h-full overflow-hidden">
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
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
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
}
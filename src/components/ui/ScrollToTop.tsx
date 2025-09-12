"use client";

import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  };

  return (
    <>
      {isVisible && (
  <Button
    onClick={scrollToTop}
    className={cn(
      "fixed bottom-8 right-8 z-40 rounded-full w-12 h-12 p-0 shadow-lg transition-all duration-200 ease-in-out hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
      "bg-primary hover:bg-primary/90 text-primary-foreground",
      "max-[640px]:bottom-4 max-[640px]:right-4 max-[640px]:w-10 max-[640px]:h-10"
    )}
        >
    <ChevronUp className="h-5 w-5 max-[640px]:h-4 max-[640px]:w-4" />
        </Button>
      )}
    </>
  );
}
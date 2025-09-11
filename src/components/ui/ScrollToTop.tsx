"use client";

import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

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
          className="fixed bottom-8 right-8 z-40 rounded-full w-12 h-12 p-0 shadow-lg bg-purple-400 hover:bg-purple-500 text-white"
        >
          <ChevronUp className="h-6 w-6" />
        </Button>
      )}
    </>
  );
}
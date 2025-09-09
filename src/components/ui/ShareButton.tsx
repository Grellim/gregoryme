"use client";

import { useState } from "react";
import { Share2, MessageCircle, Facebook, Twitter, Instagram, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ShareButton() {
  const [isOpen, setIsOpen] = useState(false);

  const shareData = {
    title: "Gregory Vallim - Portfólio",
    text: "Oi, sou Gregory Vallim, venha conhecer meus projetos, algum deles você deve gostar 😊",
    url: typeof window !== 'undefined' ? window.location.href : '',
  };

  const handleShare = async (platform: string) => {
    const encodedText = encodeURIComponent(shareData.text);
    const encodedUrl = encodeURIComponent(shareData.url);

    switch (platform) {
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodedText}%20${encodedUrl}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`, '_blank');
        break;
      case 'instagram':
        // Instagram doesn't support direct URL sharing, so we copy to clipboard
        navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
        alert('Link copiado! Cole no Instagram para compartilhar.');
        break;
      case 'email':
        window.open(`mailto:?subject=${encodeURIComponent(shareData.title)}&body=${encodedText}%20${encodedUrl}`, '_blank');
        break;
      default:
        // Native share API
        if (navigator.share) {
          try {
            await navigator.share(shareData);
          } catch (err) {
            console.log('Erro ao compartilhar:', err);
          }
        } else {
          // Fallback: copy to clipboard
          navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
          alert('Link copiado para a área de transferência!');
        }
    }
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2"
      >
        <Share2 className="h-4 w-4" />
        Compartilhar
      </Button>

      {isOpen && (
        <div className="absolute bottom-full right-0 mb-2 z-50">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-2xl p-2 min-w-[200px]">
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleShare('whatsapp')}
                className="flex items-center gap-2 text-green-600 hover:text-green-700"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleShare('facebook')}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
              >
                <Facebook className="h-4 w-4" />
                Facebook
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleShare('twitter')}
                className="flex items-center gap-2 text-sky-500 hover:text-sky-600"
              >
                <Twitter className="h-4 w-4" />
                Twitter
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleShare('instagram')}
                className="flex items-center gap-2 text-pink-600 hover:text-pink-700"
              >
                <Instagram className="h-4 w-4" />
                Instagram
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleShare('email')}
                className="flex items-center gap-2 text-red-600 hover:text-red-700 col-span-2"
              >
                <Mail className="h-4 w-4" />
                E-mail
              </Button>
            </div>
            <div className="absolute bottom-0 right-4 transform translate-y-1">
              <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white dark:border-t-gray-900"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
"use client";

import { useState } from "react";
import { Share2, MessageCircle, Facebook, Twitter, Instagram, Mail, Users } from "lucide-react";
import { getSiteConfig, getLocale, getSocialLinks } from "@/data/config";
import { Button } from "@/components/ui/button";
import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa";

export default function ShareButton() {
  const [isOpen, setIsOpen] = useState(false);

  const lang = 'pt-BR';
  const siteConfigData = getSiteConfig(lang);
  const locale = getLocale(lang);
  const socialLinks = getSocialLinks(lang);

  const shareData = {
    title: siteConfigData.title,
    text: siteConfigData.description,
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
        const twitterLink = socialLinks.find(link => link.icon === 'twitter');
        if (twitterLink) {
          window.open(twitterLink.url, '_blank');
        } else {
          window.open(`https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`, '_blank');
        }
        break;
      case 'instagram':
        const instagramLink = socialLinks.find(link => link.icon === 'instagram');
        if (instagramLink) {
          window.open(instagramLink.url, '_blank');
        } else {
          // Instagram doesn't support direct URL sharing, so we copy to clipboard
          navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
          alert(locale.social.instagram || 'Link copiado! Só compartilhar no insta');
        }
        break;
      case 'discord':
        const discordLink = socialLinks.find(link => link.icon === 'discord');
        if (discordLink) {
          window.open(discordLink.url, '_blank');
        } else {
          // Fallback: copy to clipboard
          navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
          alert(locale.social.discord || 'Link copiado!');
        }
        break;
      case 'email':
        const emailLink = socialLinks.find(link => link.icon === 'email');
        if (emailLink) {
          window.open(emailLink.url, '_blank');
        } else {
          window.open(`mailto:?subject=${encodeURIComponent(shareData.title)}&body=${encodedText}%20${encodedUrl}`, '_blank');
        }
        break;
      default:
        // Native share API
        if (navigator.share) {
          try {
            await navigator.share(shareData);
          } catch (err) {
            console.error('Erro ao compartilhar:', err);
          }
        } else {
          // Fallback: copy to clipboard
          navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
          alert('Link copiedo!');
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
        className="flex items-center gap-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white font-poppins"
      >
        <Share2 className="h-4 w-4" />
        Share
      </Button>

      {isOpen && (
        <div className="absolute bottom-full right-0 mb-2 z-50">
          <div className="bg-white dark:bg-gray-900 border border-purple-200 dark:border-purple-700 rounded-lg shadow-2xl p-2 min-w-[200px]">
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleShare('whatsapp')}
                className="flex items-center gap-2 text-green-600 hover:text-green-700 hover:bg-green-50"
              >
                <FaWhatsapp className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleShare('facebook')}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
              >
                <FaFacebook className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleShare('twitter')}
                className="flex items-center gap-2 text-blue-400 hover:text-blue-500 hover:bg-blue-50"
              >
                <FaTwitter className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleShare('instagram')}
                className="flex items-center gap-2 text-pink-600 hover:text-pink-700 hover:bg-pink-50"
              >
                <FaInstagram className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleShare('discord')}
                className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
              >
                <Users className="h-4 w-4" />
                {locale.social.discord}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleShare('email')}
                className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 col-span-2"
              >
                <Mail className="h-4 w-4" />
                {locale.social.email}
              </Button>
            </div>
            <div className="absolute bottom-0 right-4 transform translate-y-1">
              <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-purple-400 dark:border-t-purple-600"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
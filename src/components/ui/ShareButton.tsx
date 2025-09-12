"use client";

import { useState } from "react";
import { Share2, MessageCircle, Facebook, Twitter, Instagram, Mail, Users } from "lucide-react";
import { getSiteConfig, getLocale, getSocialLinks } from "@/data/config";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

export default function ShareButton() {
  const t = useTranslations("Share");
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
  className={cn(
    "flex items-center gap-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200 ease-in-out font-medium",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
    "max-[640px]:text-xs max-[640px]:gap-1"
  )}
      >
    <Share2 className="h-4 w-4 max-[640px]:h-3.5 max-[640px]:w-3.5" />
    {t("share") || "Share"}
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
          <svg className="h-4 w-4 max-[640px]:h-3.5 max-[640px]:w-3.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
          </svg>
              </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleShare('facebook')}
          className={cn(
            "flex items-center gap-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 transition-all duration-200",
            "max-[640px]:gap-1 max-[640px]:p-1"
          )}
              >
          <Facebook className="h-4 w-4 max-[640px]:h-3.5 max-[640px]:w-3.5" />
              </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleShare('twitter')}
          className={cn(
            "flex items-center gap-2 text-blue-400 hover:text-blue-500 hover:bg-blue-50 transition-all duration-200",
            "max-[640px]:gap-1 max-[640px]:p-1"
          )}
              >
          <Twitter className="h-4 w-4 max-[640px]:h-3.5 max-[640px]:w-3.5" />
              </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleShare('instagram')}
          className={cn(
            "flex items-center gap-2 text-pink-600 hover:text-pink-700 hover:bg-pink-50 transition-all duration-200",
            "max-[640px]:gap-1 max-[640px]:p-1"
          )}
              >
          <Instagram className="h-4 w-4 max-[640px]:h-3.5 max-[640px]:w-3.5" />
              </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleShare('discord')}
          className={cn(
            "flex items-center gap-2 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 transition-all duration-200",
            "max-[640px]:gap-1 max-[640px]:p-1"
          )}
              >
          <Users className="h-4 w-4 mr-2 max-[640px]:h-3.5 max-[640px]:w-3.5" />
          {t("discord") || locale.social.discord || "Discord"}
              </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleShare('email')}
          className={cn(
            "flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 transition-all duration-200 col-span-2",
            "max-[640px]:gap-1 max-[640px]:p-1"
          )}
              >
          <Mail className="h-4 w-4 mr-2 max-[640px]:h-3.5 max-[640px]:w-3.5" />
          {t("email") || locale.social.email || "Email"}
              </Button>
      </div>
      <div className="absolute bottom-0 right-4 transform translate-y-1 max-[640px]:right-2">
        <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-card"></div>
      </div>
    </div>
  </div>
      )}
    </div>
  );
}
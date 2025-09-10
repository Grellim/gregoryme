import type { SiteConfig, SocialLink, Locale } from './types';
import ptBR from './locales/pt-BR.json';
import en from './locales/en.json';

const locales = {
  'pt-BR': ptBR as Locale,
  'en': en as Locale,
};

export function getLocale(lang: string = 'pt-BR'): Locale {
  return locales[lang as keyof typeof locales] || locales['pt-BR'];
}

export function getSiteConfig(lang: string = 'pt-BR'): SiteConfig {
  const locale = getLocale(lang);
  return {
    title: locale.site.title,
    description: locale.site.description,
    keywords: locale.site.keywords,
    author: locale.site.author,
    videoBackgroundUrl: '/videos/background.mp4', // Caminho para o vídeo de background
    hero: {
      title: locale.hero.title,
      subtitle: locale.hero.subtitle,
      ctaText: locale.hero.ctaText,
      ctaUrl: '/portfolio',
    },
    about: {
      title: locale.about.title,
      description: locale.about.description,
      skills: locale.about.skills,
    },
    contact: {
      title: locale.contact.title,
      email: locale.contact.email,
      phone: locale.contact.phone,
      address: locale.contact.address,
    },
  };
}

export function getSocialLinks(lang: string = 'pt-BR'): SocialLink[] {
  const locale = getLocale(lang);
  return [
    {
      name: locale.social.twitter,
      url: 'https://twitter.com/gregoryvallim',
      icon: 'twitter',
    },
    {
      name: locale.social.instagram,
      url: 'https://instagram.com/gregoryvallim',
      icon: 'instagram',
    },
    {
      name: locale.social.email,
      url: 'mailto:gregory@example.com',
      icon: 'mail',
    },
    {
      name: locale.social.discord,
      url: 'https://discord.gg/gregoryvallim',
      icon: 'discord',
    },
  ];
}
import type { SiteConfig, SocialLink } from './types';

export const siteConfig: SiteConfig = {
  title: 'Gregory Vallim - Desenvolvedor Full Stack',
  description: 'Sou um desenvolvedor full-stack com experiência em criar aplicações web e mobile modernas, focando em performance, segurança e experiência do usuário.',
  keywords: ['desenvolvedor', 'full stack', 'react', 'next.js', 'typescript', 'javascript', 'node.js', 'mongodb'],
  author: 'Gregory Vallim',
  videoBackgroundUrl: '/videos/background.mp4', // Caminho para o vídeo de background
  hero: {
    title: 'Olá, sou Gregory Vallim',
    subtitle: 'Um camarada com muitas ideias 🚀',
    ctaText: 'Ver Projetos',
    ctaUrl: '/portfolio',
  },
  about: {
    title: 'Sobre Mim',
    description: 'Sou um desenvolvedor full-stack com experiência em criar aplicações web e mobile modernas, focando em performance, segurança e experiência do usuário. Sou apaixonado por tecnologia e inovação, sempre buscando criar soluções que transformem a maneira como as pessoas interagem com o mundo digital.',
    skills: ['React', 'Next.js', 'TypeScript', 'Node.js', 'MongoDB', 'Tailwind CSS'],
  },
  contact: {
    title: 'Bora trocar ideia?',
    email: 'gregory@example.com',
    phone: '(11) 99999-9999',
    address: 'São Paulo, SP, Brasil',
  },
};

export const socialLinks: SocialLink[] = [
  {
    name: 'Twitter',
    url: 'https://twitter.com/gregoryvallim',
    icon: 'twitter',
  },
  {
    name: 'Instagram',
    url: 'https://instagram.com/gregoryvallim',
    icon: 'instagram',
  },
  {
    name: 'Email',
    url: 'mailto:gregory@example.com',
    icon: 'mail',
  },
  {
    name: 'Discord',
    url: 'https://discord.gg/gregoryvallim',
    icon: 'discord',
  },
];
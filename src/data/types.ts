export interface NavbarMenuItem {
  label: string;
  href: string;
  external?: boolean;
  icon?: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}

export interface Recommendation {
  id: string;
  name: string;
  role: string;
  company: string;
  message: string;
  avatar: string;
  rating?: number;
}

export interface SiteConfig {
  title: string;
  description: string;
  keywords: string[];
  author: string;
  videoBackgroundUrl: string;
  hero: {
    title: string;
    subtitle: string;
    ctaText: string;
    ctaUrl: string;
  };
  about: {
    title: string;
    description: string;
    skills: string[];
  };
  contact: {
    title: string;
    email: string;
    phone: string;
    address: string;
  };
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}
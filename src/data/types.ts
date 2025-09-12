import { z } from 'zod';

export interface SocialLink {
  name: string;
  icon: string;
  url: string;
}

export interface NavbarMenuItem {
  label: string;
  href: string;
  icon: string;
  external?: boolean;
}

export interface FooterButton {
  name: string;
  href: string;
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

export interface Locale {
  site: {
    title: string;
    description: string;
    keywords: string[];
    author: string;
  };
  hero: {
    title: string;
    subtitle: string;
    ctaText: string;
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
  navbar: {
    home: string;
    about: string;
    projects: string;
    contact: string;
    github: string;
  };
  social: {
    twitter: string;
    instagram: string;
    email: string;
    discord: string;
  };
  metadata: {
    ogTitle: string;
    ogDescription: string;
    twitterTitle: string;
    twitterDescription: string;
  };
  ui: {
    recommendations: {
      title: string;
      description: string;
      knowMore: string;
      close: string;
    };
    profile: {
      title: string;
      description: string;
      name: string;
      subtitle: string;
      experience: {
        title: string;
        description: string;
      };
      techStack: {
        title: string;
      };
      mission: {
        title: string;
        description: string;
      };
      badges: string[];
      close: string;
      closeAria: string;
    };
    buttons: {
      viewProjects: string;
      contact: string;
      recommendations: string;
    };
    tags: {
      innovation: string;
      creativity: string;
      performance: string;
      sustainability: string;
    };
    projectDetails: {
      knowMore: string;
      visitProject: string;
      close: string;
      moreAbout: string;
      gallery: string;
      closeDetails: string;
      viewGalleryImage: string;
    };
  };
}

export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  company?: string;
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  moreInfo?: string;
  galleryImages: string[];
  links?: Array<{
    name: string;
    url: string;
    icon?: React.ReactNode;
  }>;
  createdAt?: string;
  updatedAt?: string;
}

export const zPortfolioProject = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  image: z.string(),
  imageUrl: z.string().optional(),
  technologies: z.array(z.string()),
  tags: z.array(z.string()).optional(),
  githubUrl: z.string().optional(),
  liveUrl: z.string().optional(),
  projectUrl: z.string().optional(),
  featured: z.boolean().optional(),
  moreInfo: z.string().optional(),
  galleryImages: z.array(z.string()),
  links: z.array(z.object({
    name: z.string(),
    url: z.string(),
    icon: z.any().optional(), // ReactNode not serializable
  })).optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export const zRecommendation = z.object({
  id: z.string(),
  name: z.string(),
  role: z.string(),
  company: z.string(),
  message: z.string(),
  avatar: z.string(),
  rating: z.number().optional(),
  instagram: z.string().optional(),
  tiktok: z.string().optional(),
  youtube: z.string().optional(),
  facebook: z.string().optional(),
  twitter: z.string().optional(),
  discord: z.string().optional(),
  linkedin: z.string().optional(),
  github: z.string().optional(),
  website: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export interface Recommendation {
  id: string;
  name: string;
  role: string;
  company: string;
  message: string;
  avatar: string;
  rating?: number;
  instagram?: string;
  tiktok?: string;
  youtube?: string;
  facebook?: string;
  twitter?: string;
  discord?: string;
  linkedin?: string;
  github?: string;
  website?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const zSkill = z.object({
  name: z.string(),
  icon: z.string(),
  description: z.string(),
  proficiency: z.number(),
});

export interface Skill {
  name: string;
  icon: string;
  description: string;
  proficiency: number;
}

export const zProfileSection = z.object({
  title: z.string(),
  description: z.string(),
});

export const zProfileData = z.object({
  name: z.string(),
  subtitle: z.string(),
  badges: z.array(z.string()),
  experience: zProfileSection,
  techStack: z.object({
    title: z.string(),
    skills: z.array(z.string()),
  }),
  mission: zProfileSection,
});

export interface ProfileData {
  name: string;
  subtitle: string;
  badges: string[];
  experience: {
    title: string;
    description: string;
  };
  techStack: {
    title: string;
    skills: string[];
  };
  mission: {
    title: string;
    description: string;
  };
}

export const zSiteConfig = z.object({
  title: z.string(),
  description: z.string(),
  keywords: z.array(z.string()),
  author: z.string(),
  videoBackgroundUrl: z.string(),
  hero: z.object({
    title: z.string(),
    subtitle: z.string(),
    ctaText: z.string(),
    ctaUrl: z.string(),
  }),
  about: z.object({
    title: z.string(),
    description: z.string(),
    skills: z.array(z.string()),
  }),
  contact: z.object({
    title: z.string(),
    email: z.string(),
    phone: z.string(),
    address: z.string(),
  }),
});

export const zLocale = z.object({
  site: z.object({
    title: z.string(),
    description: z.string(),
    keywords: z.array(z.string()),
    author: z.string(),
  }),
  hero: z.object({
    title: z.string(),
    subtitle: z.string(),
    ctaText: z.string(),
  }),
  about: z.object({
    title: z.string(),
    description: z.string(),
    skills: z.array(z.string()),
  }),
  contact: z.object({
    title: z.string(),
    email: z.string(),
    phone: z.string(),
    address: z.string(),
  }),
  navbar: z.object({
    home: z.string(),
    about: z.string(),
    projects: z.string(),
    contact: z.string(),
    github: z.string(),
  }),
  social: z.object({
    twitter: z.string(),
    instagram: z.string(),
    email: z.string(),
    discord: z.string(),
  }),
  metadata: z.object({
    ogTitle: z.string(),
    ogDescription: z.string(),
    twitterTitle: z.string(),
    twitterDescription: z.string(),
  }),
  ui: z.object({
    recommendations: z.object({
      title: z.string(),
      description: z.string(),
      knowMore: z.string(),
      close: z.string(),
    }),
    profile: z.object({
      title: z.string(),
      description: z.string(),
      name: z.string(),
      subtitle: z.string(),
      experience: z.object({
        title: z.string(),
        description: z.string(),
      }),
      techStack: z.object({
        title: z.string(),
      }),
      mission: z.object({
        title: z.string(),
        description: z.string(),
      }),
      badges: z.array(z.string()),
      close: z.string(),
      closeAria: z.string(),
    }),
    buttons: z.object({
      viewProjects: z.string(),
      contact: z.string(),
      recommendations: z.string(),
    }),
    tags: z.object({
      innovation: z.string(),
      creativity: z.string(),
      performance: z.string(),
      sustainability: z.string(),
    }),
    projectDetails: z.object({
      knowMore: z.string(),
      visitProject: z.string(),
      close: z.string(),
      moreAbout: z.string(),
      gallery: z.string(),
      closeDetails: z.string(),
      viewGalleryImage: z.string(),
    }),
  }),
});


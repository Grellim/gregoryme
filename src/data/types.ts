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
  galleryImages: string[];
}

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

export interface FooterButton {
  name: string;
  href: string;
}
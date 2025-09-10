import { getSiteConfig, getLocale } from './config';
import * as crypto from 'crypto';
import { profileData } from './profile';

const lang = 'pt-BR';
const siteConfig = getSiteConfig(lang);
const locale = getLocale(lang);

interface PersonSchema {
  '@context': 'https://schema.org';
  '@type': 'Person';
  name: string;
  jobTitle: string;
  description: string;
  url: string;
  image: string;
  sameAs: string[];
  keywords: string[];
  knowsAbout: string[];
}

export function getPersonSchema(): PersonSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Gregory Vallim',
    jobTitle: 'Projetista, Comunicador',
    description: siteConfig.description,
    url: 'https://gregoryvallim.com', // Replace with actual site URL
    image: 'https://gregoryvallim.com/profile.jpg',
    sameAs: [
      'https://twitter.com/gregoryvallim',
      'https://instagram.com/gregoryvallim',
      'https://github.com/gregoryvallim',
      'https://linkedin.com/in/gregoryvallim'
    ],
    keywords: ['Gregory Vallim', 'Projetista', 'Comunicador', 'projetos', 'desenvolvimento'],
    knowsAbout: ['Desenvolvimento de projeto', 'Comunicação', 'Projeto', 'Inovação Digital']
  };
}

export function getContentHash(data: any): string {
  // Simple hash for content integrity (in production, use crypto.subtle.digest)
  const hash = crypto.createHash('sha256');
  hash.update(JSON.stringify(data));
  return hash.digest('hex').slice(0, 16); // Shortened for demo
}

// Generate JSON-LD script tag
export function generateJsonLdScript(): string {
  const personSchema = getPersonSchema();
  const profileHash = getContentHash(profileData);
  
  const ldJson = {
    ...personSchema,
    additionalProperty: {
      '@type': 'PropertyValue',
      name: 'contentHash',
      value: profileHash
    }
  };

  return `<script type="application/ld+json">${JSON.stringify(ldJson, null, 2)}</script>`;
}

export const seoConfig = {
  canonical: 'https://gregoryvallim.com',
  alternates: {
    languages: {
      'pt-BR': 'https://gregoryvallim.com/pt-BR',
      'en': 'https://gregoryvallim.com/en'
    }
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  }
};
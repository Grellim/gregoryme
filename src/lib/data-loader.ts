// src/lib/data-loader.ts
import { z } from 'zod';
import type { PortfolioProject, Recommendation, SiteConfig, Locale, Skill, ProfileData } from '@/data/types';
import {
  zPortfolioProject,
  zRecommendation,
  zSkill,
  zProfileSection,
  zProfileData,
  zSiteConfig,
  zLocale
} from '@/data/types';


async function loadDataFile<T>(filename: string, schema: z.ZodSchema<T>, fallback?: T): Promise<T> {
  try {
    // Use dynamic import for JSON module (relative to src/lib/)
    const module = await import(`../data/content/${filename}`);
    const data = module.default || module;
    return schema.parse(data);
  } catch (error) {
    console.warn(`Warning: Failed to load ${filename}, using fallback data:`, error);
    
    if (fallback) {
      console.log(`Using fallback data for ${filename}`);
      return schema.parse(fallback);
    }
    
    // Throw if no fallback provided
    throw new Error(`Failed to load or validate data from ${filename}. No fallback available.`);
  }
}

// Validate and return data with type safety
export function validateData<T>(data: unknown, schema: z.ZodSchema<T>): T {
  try {
    return schema.parse(data);
  } catch (error) {
    console.error('Data validation failed:', error);
    throw new Error('Invalid data structure - validation failed');
  }
}

export async function loadProjects(locale: string = 'en'): Promise<PortfolioProject[]> {
  if (!['en', 'pt-BR'].includes(locale)) {
    throw new Error(`Unsupported locale: ${locale}. Supported: en, pt-BR`);
  }
  const fileName = locale === 'en' ? 'projects.en.json' : `projects.${locale}.json`;
  const data = await loadDataFile(fileName, z.array(zPortfolioProject), []);
  return data;
}

export async function loadRecommendations(locale: string = 'en'): Promise<Recommendation[]> {
  if (!['en', 'pt-BR'].includes(locale)) {
    throw new Error(`Unsupported locale: ${locale}. Supported: en, pt-BR`);
  }
  const fileName = locale === 'en' ? 'recommendations.en.json' : `recommendations.${locale}.json`;
  const data = await loadDataFile(fileName, z.array(zRecommendation), []);
  return data;
}

export async function loadSiteConfig(locale: string = 'en'): Promise<SiteConfig> {
  if (!['en', 'pt-BR'].includes(locale)) {
    throw new Error(`Unsupported locale: ${locale}. Supported: en, pt-BR`);
  }
  const fileName = locale === 'en' ? 'site-config.en.json' : `site-config.${locale}.json`;
  return loadDataFile(fileName, zSiteConfig, {
    title: 'Default Portfolio',
    description: 'A portfolio website',
    keywords: [],
    author: 'Developer',
    videoBackgroundUrl: '',
    hero: { title: '', subtitle: '', ctaText: '', ctaUrl: '' },
    about: { title: '', description: '', skills: [] },
    contact: { title: '', email: '', phone: '', address: '' },
  });
}

export async function loadProfile(locale: string = 'en'): Promise<ProfileData> {
  if (!['en', 'pt-BR'].includes(locale)) {
    throw new Error(`Unsupported locale: ${locale}. Supported: en, pt-BR`);
  }
  const fileName = locale === 'en' ? 'profile.en.json' : `profile.${locale}.json`;
  const data = await loadDataFile(fileName, zProfileData, {
    name: 'Default Developer',
    subtitle: 'Full Stack Developer',
    badges: ['React', 'Next.js', 'TypeScript'],
    experience: { title: 'Experience', description: 'Professional experience' },
    techStack: { title: 'Tech Stack', skills: [] },
    mission: { title: 'Mission', description: 'Building great software' },
  });
  return data;
}

export async function loadSkills(locale: string = 'en'): Promise<Skill[]> {
  if (!['en', 'pt-BR'].includes(locale)) {
    throw new Error(`Unsupported locale: ${locale}. Supported: en, pt-BR`);
  }
  const fileName = locale === 'en' ? 'skills.en.json' : `skills.${locale}.json`;
  const data = await loadDataFile(fileName, z.array(zSkill), []);
  return data;
}

export async function loadLocale(locale: string): Promise<Locale> {
  if (!['en', 'pt-BR'].includes(locale)) {
    throw new Error(`Unsupported locale: ${locale}. Supported: en, pt-BR`);
  }
  const fileName = `${locale}.json`;
  return loadDataFile(fileName, zLocale, {
    site: { title: '', description: '', keywords: [], author: '' },
    hero: { title: '', subtitle: '', ctaText: '' },
    about: { title: '', description: '', skills: [] },
    contact: { title: '', email: '', phone: '', address: '' },
    navbar: { home: '', about: '', projects: '', contact: '', github: '' },
    social: { twitter: '', instagram: '', email: '', discord: '' },
    metadata: { ogTitle: '', ogDescription: '', twitterTitle: '', twitterDescription: '' },
    ui: {
      recommendations: { title: '', description: '', knowMore: '', close: '' },
      profile: {
        title: '', description: '', name: '', subtitle: '',
        experience: { title: '', description: '' },
        techStack: { title: '' },
        mission: { title: '', description: '' },
        badges: [], close: '', closeAria: ''
      },
      buttons: { viewProjects: '', contact: '', recommendations: '' },
      tags: { innovation: '', creativity: '', performance: '', sustainability: '' },
      projectDetails: { knowMore: '', visitProject: '', close: '', moreAbout: '', gallery: '', closeDetails: '', viewGalleryImage: '' }
    }
  });
}

// Load all data for a given locale (convenience function) with validation
export async function loadAllData(locale: string = 'en') {
  try {
    const data = {
      projects: await loadProjects(locale),
      recommendations: await loadRecommendations(locale),
      siteConfig: await loadSiteConfig(locale),
      locale: await loadLocale(locale),
      profile: await loadProfile(locale),
      skills: await loadSkills(locale),
    };

    // Validate the complete data structure
    const validatedData = {
      projects: validateData(data.projects, z.array(zPortfolioProject)),
      recommendations: validateData(data.recommendations, z.array(zRecommendation)),
      siteConfig: validateData(data.siteConfig, zSiteConfig),
      locale: validateData(data.locale, zLocale),
      profile: validateData(data.profile, zProfileData),
      skills: validateData(data.skills, z.array(zSkill)),
    };

    return validatedData;
  } catch (error) {
    console.error('Failed to load all data:', error);
    // Return fallback data structure
    return {
      projects: [],
      recommendations: [],
      siteConfig: {
        title: 'Default Site',
        description: 'Default description',
        keywords: [],
        author: 'Default Author',
        videoBackgroundUrl: '',
        hero: { title: '', subtitle: '', ctaText: '', ctaUrl: '' },
        about: { title: '', description: '', skills: [] },
        contact: { title: '', email: '', phone: '', address: '' },
      },
      locale: {
        site: { title: '', description: '', keywords: [], author: '' },
        hero: { title: '', subtitle: '', ctaText: '' },
        about: { title: '', description: '', skills: [] },
        contact: { title: '', email: '', phone: '', address: '' },
        navbar: { home: '', about: '', projects: '', contact: '', github: '' },
        social: { twitter: '', instagram: '', email: '', discord: '' },
        metadata: { ogTitle: '', ogDescription: '', twitterTitle: '', twitterDescription: '' },
        ui: {
          recommendations: { title: '', description: '', knowMore: '', close: '' },
          profile: {
            title: '', description: '', name: '', subtitle: '',
            experience: { title: '', description: '' },
            techStack: { title: '' },
            mission: { title: '', description: '' },
            badges: [], close: '', closeAria: ''
          },
          buttons: { viewProjects: '', contact: '', recommendations: '' },
          tags: { innovation: '', creativity: '', performance: '', sustainability: '' },
          projectDetails: { knowMore: '', visitProject: '', close: '', moreAbout: '', gallery: '', closeDetails: '', viewGalleryImage: '' }
        }
      },
      profile: {
        name: 'Default',
        subtitle: 'Default subtitle',
        badges: [],
        experience: { title: 'Experience', description: '' },
        techStack: { title: 'Tech Stack', skills: [] },
        mission: { title: 'Mission', description: '' },
      },
      skills: [],
    };
  }
}

// Export types for inference
export type LoadedData = Awaited<ReturnType<typeof loadAllData>>;
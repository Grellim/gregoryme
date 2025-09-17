import ClientHome from "./ClientHome";
import { loadAllData } from "@/lib/data-loader";
import { Locale, SocialLink, FooterButton } from "@/data/types";

export const dynamic = 'force-dynamic';

import { headers } from 'next/headers';

const headersList = headers();
const acceptLanguage = headersList.get('accept-language') || 'pt-BR';
const lang = acceptLanguage.startsWith('pt') ? 'pt-BR' : 'en';

async function getPageProps() {
  try {
    const allData = await loadAllData(lang);

    // Create social links from locale data with null checks
    const socialLinks: SocialLink[] = [
      allData.locale?.social?.twitter ? {
        name: allData.locale.social.twitter,
        url: 'https://twitter.com/gregoryvallim',
        icon: 'twitter',
      } : null,
      allData.locale?.social?.instagram ? {
        name: allData.locale.social.instagram,
        url: 'https://instagram.com/gregoryvallim',
        icon: 'instagram',
      } : null,
      allData.locale?.social?.email ? {
        name: allData.locale.social.email,
        url: 'mailto:gregory@example.com',
        icon: 'mail',
      } : null,
      allData.locale?.social?.discord ? {
        name: allData.locale.social.discord,
        url: 'https://discord.gg/gregoryvallim',
        icon: 'discord',
      } : null,
    ].filter(Boolean) as SocialLink[];

    // Create footer buttons (static for now, could be made dynamic)
    const footerButtons: FooterButton[] = [
      {
        name: 'GitHub',
        href: 'https://github.com/gregoryvallim',
      },
      {
        name: 'LinkedIn',
        href: 'https://linkedin.com/in/gregoryvallim',
      },
    ];

    // Create SiteConfig from loaded data with optional chaining and fallbacks
    const siteConfigData = {
      title: allData.locale?.site?.title || 'Default Portfolio',
      description: allData.locale?.site?.description || 'A portfolio website',
      keywords: allData.locale?.site?.keywords || [],
      author: allData.locale?.site?.author || 'Developer',
      videoBackgroundUrl: '/videos/background.mp4',
      hero: {
        title: allData.locale?.hero?.title || '',
        subtitle: allData.locale?.hero?.subtitle || '',
        ctaText: allData.locale?.hero?.ctaText || '',
        ctaUrl: '/portfolio',
      },
      about: {
        title: allData.locale?.about?.title || '',
        description: allData.locale?.about?.description || '',
        skills: allData.locale?.about?.skills || [],
      },
      contact: {
        title: allData.locale?.contact?.title || '',
        email: allData.locale?.contact?.email || '',
        phone: allData.locale?.contact?.phone || '',
        address: allData.locale?.contact?.address || '',
      },
    };

    return {
      siteConfigData,
      locale: allData.locale || {
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
      socialLinks,
      footerButtons,
      portfolioData: allData.projects || [],
      profileData: allData.profile || {
        name: 'Default',
        subtitle: 'Default subtitle',
        badges: [],
        experience: { title: 'Experience', description: '' },
        techStack: { title: 'Tech Stack', skills: [] },
        mission: { title: 'Mission', description: '' },
      },
      skillsData: allData.skills || [],
    };
  } catch (error) {
    console.error('Error loading page data:', error);
    throw error;
  }
}

export default async function Page() {
  const { siteConfigData, locale, socialLinks, footerButtons, portfolioData, profileData } = await getPageProps();

  return (
    <ClientHome
      siteConfigData={siteConfigData}
      locale={locale}
      socialLinks={socialLinks}
      footerButtons={footerButtons}
      portfolioData={portfolioData}
      profileData={profileData}
      skillsData={skillsData}
    />
  );
}
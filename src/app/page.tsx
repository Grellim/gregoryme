import { getSiteConfig, getLocale, getSocialLinks, getFooterButtons } from "@/data/config";
import { portfolioProjects } from "@/data/portfolio";
import { profileData } from "@/data/profile";
import ClientHome from "./ClientHome";
import { SiteConfig, Locale, SocialLink, FooterButton } from "@/data/types";
import { ProfileData } from "@/data/profile";

const lang = 'pt-BR';

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  projectUrl: string;
  moreInfo: string;
  galleryImages: string[];
}

async function getPageProps() {
  const siteConfigData = getSiteConfig(lang);
  const locale = getLocale(lang);
  const socialLinks = getSocialLinks(lang);
  const footerButtons = getFooterButtons(lang);

  const portfolioData = (portfolioProjects || []).map(project => ({
    id: project?.id || '',
    title: project?.title || 'Untitled Project',
    description: project?.description || '',
    imageUrl: project?.image || '/project-placeholder.jpg',
    tags: project?.technologies || [],
    projectUrl: project?.githubUrl || project?.liveUrl || '#',
    moreInfo: project?.description || '',
    galleryImages: project?.galleryImages || [],
    links: []
  }));

  return {
    siteConfigData,
    locale,
    socialLinks,
    footerButtons,
    portfolioData,
    profileData,
  };
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
    />
  );
}
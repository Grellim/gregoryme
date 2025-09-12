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

  return {
    siteConfigData,
    locale,
    socialLinks,
    footerButtons,
    portfolioData: portfolioProjects,
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
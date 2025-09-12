import ClientHome from "./ClientHome";
import { loadAllData } from "@/lib/data-loader";
import { Locale, SocialLink, FooterButton } from "@/data/types";

export const dynamic = 'force-dynamic';

const lang = 'pt-BR';

async function getPageProps() {
  try {
    const allData = await loadAllData(lang);
    console.log('Loaded all data successfully:', Object.keys(allData));

    // Create social links from locale data (since getSocialLinks was using locale)
    const socialLinks: SocialLink[] = [
      {
        name: allData.locale.social.twitter,
        url: 'https://twitter.com/gregoryvallim',
        icon: 'twitter',
      },
      {
        name: allData.locale.social.instagram,
        url: 'https://instagram.com/gregoryvallim',
        icon: 'instagram',
      },
      {
        name: allData.locale.social.email,
        url: 'mailto:gregory@example.com',
        icon: 'mail',
      },
      {
        name: allData.locale.social.discord,
        url: 'https://discord.gg/gregoryvallim',
        icon: 'discord',
      },
    ];

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

    // Create SiteConfig from loaded data
    const siteConfigData = {
      title: allData.locale.site.title,
      description: allData.locale.site.description,
      keywords: allData.locale.site.keywords,
      author: allData.locale.site.author,
      videoBackgroundUrl: '/videos/background.mp4',
      hero: {
        title: allData.locale.hero.title,
        subtitle: allData.locale.hero.subtitle,
        ctaText: allData.locale.hero.ctaText,
        ctaUrl: '/portfolio',
      },
      about: {
        title: allData.locale.about.title,
        description: allData.locale.about.description,
        skills: allData.locale.about.skills,
      },
      contact: {
        title: allData.locale.contact.title,
        email: allData.locale.contact.email,
        phone: allData.locale.contact.phone,
        address: allData.locale.contact.address,
      },
    };

    return {
      siteConfigData,
      locale: allData.locale,
      socialLinks,
      footerButtons,
      portfolioData: allData.projects,
      profileData: allData.profile,
      skillsData: allData.skills,
    };
  } catch (error) {
    console.error('Error in getPageProps:', error);
    console.error('Error stack:', (error as Error).stack);
    throw error;
  }
}

export default async function Page() {
  const { siteConfigData, locale, socialLinks, footerButtons, portfolioData, profileData, skillsData } = await getPageProps();

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
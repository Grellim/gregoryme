"use client";

import { Button } from "@/components/ui/button";
import { FaDiscord, FaInstagram, FaTiktok, FaTwitter, FaEnvelope } from "react-icons/fa";
import { SiteConfig, Locale, SocialLink, FooterButton } from "@/data/types";

interface ContactSectionProps {
  siteConfigData: SiteConfig;
  locale: Locale;
  socialLinks: SocialLink[];
  footerButtons: FooterButton[];
}

export default function ContactSection({ 
  siteConfigData, 
  locale, 
  socialLinks, 
  footerButtons 
}: ContactSectionProps) {
  return (
    <section id="contact" className="py-16 md:py-24 px-4 parallax">
      <div className="max-w-4xl mx-auto text-center section-fade">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-gradient-hero">
          {siteConfigData.contact.title}
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed">
          {siteConfigData.contact.title} - {siteConfigData.description}
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {socialLinks.map((link) => (
            <Button
              key={link.icon}
              asChild
              variant="outline"
              size="lg"
              className="w-14 h-14 sm:w-16 sm:h-16 p-0 rounded-full group hover:bg-primary hover:text-primary-foreground transition-all duration-300 btn-modern"
              aria-label={`Link para ${link.icon}`}
            >
              <a
                href={link.url}
                target={link.icon === 'mail' ? '_self' : '_blank'}
                rel={link.icon === 'mail' ? undefined : 'noopener noreferrer'}
              >
                {link.icon === 'twitter' && <FaTwitter className="w-5 h-5" />}
                {link.icon === 'instagram' && <FaInstagram className="w-5 h-5" />}
                {link.icon === 'mail' && <FaEnvelope className="w-5 h-5" />}
                {link.icon === 'discord' && <FaDiscord className="w-5 h-5" />}
                {link.icon === 'tiktok' && <FaTiktok className="w-5 h-5" />}
              </a>
            </Button>
          ))}
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {footerButtons.map((button, index) => (
            <Button
              key={index}
              asChild
              size="lg"
              className="btn-modern text-primary-foreground font-semibold px-6 sm:px-8 py-4 rounded-xl"
            >
              <a
                href={button.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {button.name}
              </a>
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}
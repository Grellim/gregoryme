"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { getNavbarMenu } from "@/data/navbar";
import { getSiteConfig } from "@/data/config";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const lang = 'pt-BR'; // Default language, can be made dynamic later
  const navbarMenuItems = getNavbarMenu(lang);
  const siteConfigData = getSiteConfig(lang);
  
  const navItems = navbarMenuItems.map(item => ({
    name: item.label,
    href: item.href,
    external: item.external || false,
  })); // Include all links, no filtering

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-xl"
          : "bg-background/90 backdrop-blur-md border-b border-border/50"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#home" className="flex-shrink-0 group">
            <div className="flex items-center space-x-3 transition-all duration-300 group-hover:scale-105">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg ring-2 ring-white/20">
                <span className="text-white font-bold text-lg">GV</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent font-poppins">
                  GREGORY VALLIM
                </h1>
              </div>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:block" role="menubar" aria-label="Desktop navigation">
            <div className="ml-10 flex items-center space-x-8">
              {navItems.map((item, index) => (
                <a
                  key={item.name}
                  href={item.href}
                  target={item.external ? "_blank" : "_self"}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className="group relative text-sm font-medium transition-all duration-300 hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md px-3 py-2"
                  aria-label={`Navegar para ${item.name}`}
                >
                  <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                    {item.name}
                  </span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary transition-all duration-300 group-hover:w-full group-focus:w-full"></span>
                </a>
              ))}
            </div>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl px-6 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              aria-label="Entrar em contato"
            >
              <span className="font-poppins">{siteConfigData.hero.ctaText}</span>
              <ChevronDown className="ml-2 h-4 w-4 transition-transform group-hover:rotate-180" />
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-foreground hover:bg-accent/50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg transition-all duration-200"
              aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div
            className="md:hidden overflow-hidden transition-all duration-300 ease-in-out"
            style={{ maxHeight: isMenuOpen ? '500px' : '0px' }}
          >
            <div className="px-2 pt-2 pb-4 space-y-2 bg-card/95 backdrop-blur-md border-t border-border/50">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target={item.external ? "_blank" : "_self"}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className="block px-3 py-3 rounded-lg text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  onClick={() => setIsMenuOpen(false)}
                  aria-label={`Navegar para ${item.name}`}
                >
                  {item.name}
                </a>
              ))}
              <div className="px-3 py-3">
                <Button
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200"
                  onClick={() => {
                    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                    setIsMenuOpen(false);
                  }}
                  aria-label="Entrar em contato"
                >
                  <span className="font-poppins">{siteConfigData.hero.ctaText}</span>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
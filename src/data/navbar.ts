import type { NavbarMenuItem } from './types';
import { getLocale } from './config';

export function getNavbarMenu(lang: string = 'pt-BR'): NavbarMenuItem[] {
  const locale = getLocale(lang);
  
  return [
    {
      label: locale.navbar.home,
      href: '#home',
      icon: 'home',
    },
    {
      label: locale.navbar.about,
      href: '#about',
      icon: 'user',
    },
    {
      label: locale.navbar.projects,
      href: '#projects',
      icon: 'briefcase',
    },
    {
      label: locale.navbar.contact,
      href: '#contact',
      icon: 'mail',
    },
    // Links externos
    {
      label: locale.navbar.github,
      href: 'https://github.com/gregoryvallim',
      external: true,
      icon: 'github',
    },
  ];
}
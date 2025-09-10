import type { NavbarMenuItem } from './types';

export const navbarMenu: NavbarMenuItem[] = [
  {
    label: 'Início',
    href: '#home',
    icon: 'home',
  },
  {
    label: 'Sobre',
    href: '#about',
    icon: 'user',
  },
  {
    label: 'Projetos',
    href: '#projects',
    icon: 'briefcase',
  },
  {
    label: 'Contato',
    href: '#contact',
    icon: 'mail',
  },
  // Links externos
  {
    label: 'GitHub',
    href: 'https://github.com/gregoryvallim',
    external: true,
    icon: 'github',
  },
];
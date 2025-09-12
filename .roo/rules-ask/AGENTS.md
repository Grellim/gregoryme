# Project Documentation Rules (Non-Obvious Only)
- src/components/ui/ contains shadcn components despite name - not custom UI but generated with RSC enabled
- src/lib/socket.ts exists but never used - legacy from template, safe to remove
- next-auth configured but User model unused - authentication flow incomplete, relies on session only
- Locales split: src/data/locales/ for next-intl (en/pt-BR), no i18n in modals/UI components
- API routes only /api/health and /api/visits - no other endpoints; visits track unique IPs for analytics
- Custom Tailwind config overrides shadcn defaults - new components inherit brand colors, not neutral palette
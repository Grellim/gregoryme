# AGENTS.md

This file provides guidance to agents when working with code in this repository.

## Commands
- Database uses SQLite with relative path `./db/custom.db` - ensure file exists for local dev
- Run `npm run db:push` after schema changes; no automated migrations in CI
- No test scripts or files exist - adding tests requires new setup (Vitest/Jest recommended)

## Code Style
- ESLint is highly permissive: most TS/React rules disabled (no-unused-vars off, no-explicit-any allowed) despite strict TS config
- Use `cn()` from `src/lib/utils.ts` for all Tailwind class merging - required for shadcn/ui consistency
- Custom Tailwind brand colors (primary/secondary/accent in purple/magenta/cyan) defined in tailwind.config.ts - avoid standard Tailwind palette

## Architecture & Patterns
- Prisma client singleton in `src/lib/db.ts` with query logging always enabled - disable in production for performance
- API routes limited to `/api/health` and `/api/visits` - visits track unique IPs via Prisma Visit model
- All UI components in `src/components/ui/` follow shadcn New York style with RSC enabled - add new via `npx shadcn-ui@latest add`
- Data types/interfaces centralized in `src/data/types.ts` - extend for new portfolio/recommendation features
- No authentication beyond next-auth setup - User model exists but unused in current portfolio flow

## Gotchas
- Next.js 15 with React 19 - ensure hooks comply with new rules (no legacy lifecycle)
- Custom Tailwind animations (float, pulseGlow) and responsive font scaling via clamp() - test on mobile
- Socket.io setup in `src/lib/socket.ts` but unused in main app flow
- Locales in `src/data/locales/` for next-intl - English default, pt-BR secondary
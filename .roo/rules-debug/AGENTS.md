# Project Debug Rules (Non-Obvious Only)
- Prisma query logging always enabled in src/lib/db.ts - causes performance issues in dev; set log: [] in production
- ESLint rules mostly disabled - TypeScript errors show in editor but lint passes; use tsc --noEmit for strict checking
- Next.js dev server caches aggressively - delete .next/ after dependency changes or hot reload fails
- Socket.io in src/lib/socket.ts unused but imported - remove imports to avoid connection warnings in console
- Database file at ./db/custom.db - ensure writable permissions; SQLite locks prevent concurrent access in dev
- No error boundaries in main app - uncaught errors crash entire page; wrap ClientHome.tsx in ErrorBoundary
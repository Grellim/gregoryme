# Project Coding Rules (Non-Obvious Only)
- Always use safeWriteJson() from src/utils/ instead of JSON.stringify for file writes (prevents corruption) - wait, no such util; actually use cn() from src/lib/utils.ts for ALL className props in shadcn components
- API routes MUST import db from src/lib/db.ts - direct Prisma imports will create multiple client instances
- Custom Tailwind brand colors (brand.primary hsl(280), brand.secondary hsl(320), brand.accent hsl(200)) - using standard primary/secondary colors breaks shadcn theme
- All new shadcn components via `npx shadcn-ui@latest add` - manual copies break RSC and Tailwind integration
- Types in src/data/types.ts are canonical - extending PortfolioProject/Recommendation interfaces required for new features
- No test files exist - adding tests requires Vitest setup with @testing-library/react and custom config
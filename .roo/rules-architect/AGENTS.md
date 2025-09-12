# Project Architecture Rules (Non-Obvious Only)
- All components must use cn() utility for Tailwind classes - direct clsx/twMerge breaks shadcn consistency
- Prisma singleton enforces single DB connection - parallel queries from multiple files will deadlock
- RSC enabled for shadcn - client components must explicitly use "use client"; server components default
- No authentication middleware - next-auth setup incomplete; protect routes manually if needed
- Custom Tailwind theme tightly coupled to shadcn CSS vars - changing --primary etc. requires globals.css update
- Portfolio data hardcoded in src/data/*.ts - dynamic content requires new API routes and Prisma models
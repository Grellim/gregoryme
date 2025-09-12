# Next.js Portfolio Website Revision Plan

## Executive Summary

This revision plan addresses a comprehensive analysis of the portfolio website codebase, identifying critical issues in dependencies, architecture, code quality, UI/UX, and responsiveness. The project is a modern Next.js 15/React 19 setup with shadcn/ui, Tailwind CSS (custom theme), Prisma (SQLite), and next-intl, but suffers from hardcoded data, outdated auth, experimental Tailwind v4, unused features (socket.io), large monolithic components, and incomplete i18n. No tests exist, and ESLint is permissive despite strict TS.

**Key Findings:**
- **Strengths:** Proper RSC/client boundaries, consistent cn() Tailwind merging, optimized images/caching, custom theme with responsive clamp() scaling.
- **Critical Issues:** next-auth v4 (EOL, vulnerabilities), Tailwind v4 (unstable), hardcoded portfolio data (no DB integration), Prisma logging always on (prod perf hit).
- **High-Impact Gaps:** No authentication despite User model, static i18n (pt-BR hardcoded), large ClientHome.tsx (modularity), unused socket.io (dead code).
- **Medium Issues:** Accessibility partial (aria-labels in some places), responsiveness untested on mobile, no error boundaries.
- **Low Issues:** No tests, permissive ESLint, external IP API for visits (privacy/limits).

**Overall Impact:** The site is functional for demo but not production-ready: security risks, scalability issues, poor maintainability. Estimated effort: 2-3 weeks for full revision (Code mode implementation).

## Analysis by Area

### 1. Code Quality (Bugs, Modularity, Best Practices)
- **RSC Compliance:** Excellent - 14 client components properly marked "use client"; server components (layout/page) unmarked. No hydration mismatches observed.
- **Modularity:** Poor - ClientHome.tsx (315 lines) handles hero/about/portfolio/contact; violates single responsibility. Custom modals (GalleryModal, ProjectModal) are separate but could be composable.
- **Best Practices (Next.js 15/React 19):** Hooks compliant (no legacy lifecycle). Strict TS config good, but ESLint permissive (no-unused-vars off, any allowed). No error boundaries or Suspense fallbacks. Visit tracking in useEffect lacks error handling.
- **Bugs/Issues:** Inline styles in ClientHome (background gradients) - move to Tailwind/CSS vars. Hardcoded social links in page.tsx - make dynamic. Potential Prisma deadlock from singleton if parallel queries added.
- **Rationale:** Monolithic components hinder scalability; permissive linting risks bugs.

### 2. Dependencies (Outdated/Vulnerable/Compatibility)
- **Critical:** next-auth ^4.24.11 (v4 EOL Dec 2023; upgrade to v5 for Next.js 15 compat/security). Tailwind ^4 (experimental; stable v3.x for shadcn). @tailwindcss/postcss ^4 inconsistent with tailwindcss ^4.
- **High:** React 19.0.0 (RC; monitor stable release). Prisma 6.11.1 good, but logging always enabled (disable in prod via env). z-ai-web-dev-sdk ^0.0.10 (custom; review for vulnerabilities).
- **Medium:** sonner ^2.0.6, framer-motion ^12.23.12 latest. No dev deps for testing (add Vitest/Jest per AGENTS.md).
- **Compatibility:** Next.js 15.3.5 with React 19 ok; experimental serverComponentsExternalPackages for Prisma necessary.
- **Rationale:** Vulnerabilities in next-auth; Tailwind v4 risks breaking changes. No tests = unverified compatibility.

### 3. Components and Modals (Reusability, Accessibility, shadcn Consistency)
- **shadcn/ui:** 40+ components (accordion to toggle) follow New York style, RSC-enabled. Added via CLI; consistent cn() usage (89 instances found).
- **Custom Components:** PortfolioCard, VideoBackground, SkillsGridCarousel good; but TagTooltip/TagPopup redundant (merge). Modals (Profile, Project, Recommendations) client-side, but no shared ModalProvider.
- **Reusability:** Low - Data hardcoded in imports (e.g., skillsData in ClientHome). Types centralized in src/data/types.ts good, but extend for DB models.
- **Accessibility:** Partial - aria-labels on buttons/links, but missing alt on some images (e.g., profile.jpg has alt, but check gallery). No keyboard nav in carousels. Screen reader testing needed.
- **Rationale:** Components solid but not DRY; accessibility gaps affect usability/SEO.

### 4. Styles and UI/UX (Tailwind Usage, Animations, Color Scheme, User Flow)
- **Tailwind:** Custom theme (purple/magenta/cyan brand colors) tightly coupled to shadcn CSS vars (update globals.css for changes). Responsive clamp() fonts, custom animations (float, pulseGlow) defined. 89 cn() usages consistent; no direct clsx/twMerge.
- **UI/UX:** Hero with VideoBackground engaging, but heavy (mp4 fallback to jpg). User flow: Navbar → Hero → About → Portfolio → Contact smooth with ScrollToTop. Dark mode class-based good. Visit counter adds engagement.
- **Color Scheme:** Adheres to custom palette; gradients (text-gradient-hero) enhance but ensure contrast (WCAG AA).
- **Issues:** Inline styles in sections (parallax-bg); extract to CSS. No loading states for modals/carousels.
- **Rationale:** Strong visual design, but perf/UI polish needed for production.

### 5. Responsiveness (Mobile/Desktop, clamp() Scaling)
- **Implementation:** Tailwind config has clamp() for fontSize (e.g., base: clamp(1rem, 3vw, 1.125rem)), custom screens (tablet:640px). Grid templates (portfolio: repeat(auto-fit, minmax(320px, 1fr))). ClientHome uses responsive classes (sm:text-5xl, flex-col lg:flex-row).
- **Testing Considerations:** Custom animations (float 3s) and VideoBackground need mobile perf test (throttle CPU). clamp() scaling good for text, but verify on devices (AGENTS.md: test mobile).
- **Issues:** No media queries beyond Tailwind; potential overflow in modals on small screens. No touch targets optimized (buttons min 44px?).
- **Rationale:** Foundation solid, but untested; mobile-first needed for portfolio sites.

### 6. Overall Architecture (Prisma, i18n, Unused Features)
- **Prisma:** Singleton in db.ts correct, but query logging always on (perf hit; env toggle). Schema: User (unused), Visit (IP tracking). No models for portfolio/recommendations - data hardcoded in JSON (src/data/content/*.json) loaded via data-loader.ts.
- **i18n:** next-intl ^4.3.4 setup, but static: lang='pt-BR' hardcoded in page.tsx/layout.tsx. Locales in src/data/locales/ (en/pt-BR), but no [lang] routing or middleware. English secondary per AGENTS.md.
- **API Routes:** /api/health, /api/visits (Prisma-integrated), /api/data/[type] (caching headers). Admin route exists but unused.
- **Unused Features:** socket.io in lib/socket.ts (basic echo, no integration). next-auth setup incomplete (no middleware/routes). server.ts (possibly for custom server, but Next.js standalone?).
- **Data Flow:** Hardcoded JSON → loadAllData → props to ClientHome. No dynamic content; violates AGENTS.md (needs API/Prisma).
- **Rationale:** Architecture scalable but incomplete; hardcoded data limits CMS/dynamic features.

## Prioritized Revision Plan

Priorities: Critical (security/prod-ready, 1-2 days), High (architecture/best practices, 5-7 days), Medium (UX/responsiveness, 3-5 days), Low (optimizations, 2-3 days).

### Critical Fixes (P0: Blockers)
1. **Upgrade next-auth to v5**  
   - Impact: High (security, Next.js 15 compat).  
   - Rationale: v4 EOL; vulnerabilities (e.g., CSRF). Integrate User model for admin auth. Protect /api/admin routes manually (no middleware).  
   - Est: 4h. Files: package.json, src/app/api/auth/[...nextauth]/route.ts (create), Prisma User updates.

2. **Downgrade Tailwind to v3.x stable**  
   - Impact: High (stability, shadcn compat).  
   - Rationale: v4 experimental; risks breaking changes. Update postcss.config.mjs, globals.css for CSS vars.  
   - Est: 2h. Files: package.json, tailwind.config.ts, globals.css.

3. **Disable Prisma logging in production**  
   - Impact: Medium (perf).  
   - Rationale: Always-on logging floods console; use env (e.g., log: process.env.NODE_ENV === 'development' ? ['query'] : []).  
   - Est: 1h. Files: src/lib/db.ts.

4. **Remove unused socket.io**  
   - Impact: Low (cleanup).  
   - Rationale: Dead code per AGENTS.md; reduces bundle size. If needed later, integrate properly.  
   - Est: 30min. Files: package.json, src/lib/socket.ts (delete).

### High-Priority Refactors (P1: Architecture/Core)
1. **Migrate hardcoded data to Prisma/API**  
   - Impact: High (scalability, dynamic content).  
   - Rationale: JSON files (projects.en.json etc.) static; add Project, Recommendation models. Create /api/portfolio, /api/profile routes. Update loadAllData to fetch.  
   - Est: 2 days. Files: prisma/schema.prisma, src/app/api/data/[type]/route.ts (enhance), src/lib/data-loader.ts, src/data/*.ts (remove hardcode).

2. **Implement dynamic i18n routing**  
   - Impact: High (internationalization).  
   - Rationale: Static pt-BR; add [lang] params, middleware for next-intl. Support en/pt-BR switching in Navbar.  
   - Est: 1 day. Files: next.config.ts (i18n), src/app/[lang]/layout.tsx (new), src/middleware.ts.

3. **Refactor ClientHome into smaller components**  
   - Impact: High (maintainability).  
   - Rationale: 315 lines monolithic; split to HeroSection, AboutSection, PortfolioSection, ContactSection. Use composition.  
   - Est: 1 day. Files: src/app/ClientHome.tsx, new src/components/sections/*.tsx.

4. **Add authentication for admin routes**  
   - Impact: Medium (security).  
   - Rationale: /api/admin/save exists but unprotected. Use next-auth v5 sessions; manual route guards.  
   - Est: 4h. Files: src/app/api/admin/*/route.ts.

### Medium-Priority Enhancements (P2: UX/Responsiveness)
1. **Improve accessibility across components**  
   - Impact: Medium (usability/SEO).  
   - Rationale: Add alt texts, ARIA roles for carousels/modals, keyboard nav. Audit with Lighthouse.  
   - Est: 6h. Files: All modals, PortfolioCard.tsx, SkillsGridCarousel.tsx.

2. **Mobile responsiveness testing and fixes**  
   - Impact: Medium (user experience).  
   - Rationale: clamp() fonts good, but test animations/VideoBackground on mobile. Optimize touch targets, add responsive modals.  
   - Est: 4h. Files: tailwind.config.ts (tweak screens), component classes.

3. **Add error boundaries and loading states**  
   - Impact: Medium (reliability).  
   - Rationale: No Suspense/ErrorBoundary; add for data fetches/modals. Toast errors for API calls.  
   - Est: 3h. Files: New src/components/ErrorBoundary.tsx, update page.tsx/ClientHome.tsx.

4. **Extract inline styles to CSS/Tailwind**  
   - Impact: Low (consistency).  
   - Rationale: Background gradients in ClientHome; use CSS vars or Tailwind arbitrary.  
   - Est: 2h. Files: src/app/globals.css, ClientHome.tsx.

### Low-Priority Optimizations (P3: Polish)
1. **Add testing setup**  
   - Impact: Low (CI/CD).  
   - Rationale: No tests; add Vitest for units, Playwright for E2E. Cover components, API routes.  
   - Est: 1 day. Files: package.json (dev deps), tests/ dir, vitest.config.ts.

2. **Tighten ESLint rules**  
   - Impact: Low (code quality).  
   - Rationale: Permissive config; enable React/TS rules gradually (e.g., no-explicit-any).  
   - Est: 2h. Files: eslint.config.mjs.

3. **Performance optimizations**  
   - Impact: Low (Lighthouse score).  
   - Rationale: Lazy-load videos/images, code-split modals. Monitor bundle with webpack.  
   - Est: 3h. Files: next.config.ts (dynamic imports), public/videos.

4. **SEO enhancements**  
   - Impact: Low (visibility).  
   - Rationale: Good metadata; add sitemap.xml, robots.txt updates, schema.org for portfolio.  
   - Est: 2h. Files: src/app/sitemap.ts (new), public/robots.txt.

## Architecture Flow Diagram

```mermaid
graph TD
    A[Next.js App Router] --> B[Middleware: i18n/Locale Detection]
    B --> C[[lang]/layout.tsx: Fonts/Metadata/Toaster]
    C --> D[[lang]/page.tsx: Server Data Load]
    D --> E[loadAllData → API Routes / Prisma]
    E --> F[ClientHome: 'use client']
    F --> G[Navbar: Locale Switcher]
    F --> H[HeroSection: VideoBackground + Visit Counter]
    F --> I[AboutSection: ProfileModal + SkillsCarousel]
    F --> J[PortfolioSection: PortfolioCard Grid + ProjectModal]
    F --> K[ContactSection: Social Links + RecommendationsModal]
    F --> L[Footer]
    E --> M[Prisma DB: User/Visit/Project/Recommendation Models]
    N[Auth: next-auth v5 Sessions] --> O[Protected: /api/admin]
    P[Unused: Remove socket.io/server.ts]
    
    style A fill:#f9f
    style M fill:#bbf
    style N fill:#fbb
```

## Implementation Roadmap
- **Phase 1 (Week 1):** Critical fixes + High refactors (data migration, i18n).
- **Phase 2 (Week 2):** Medium enhancements + component split.
- **Phase 3 (Week 3):** Low optimizations + testing/audit.
- **Validation:** Run `npm run build/lint`, Lighthouse audit (90+ scores), manual mobile testing.

This plan aligns with AGENTS.md guidelines: cn() consistency, Prisma singleton, RSC, custom theme. Switch to Code mode post-approval for execution.
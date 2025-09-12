# 🚀 Welcome to Z.ai Code Scaffold

A modern, production-ready web application scaffold powered by cutting-edge technologies, designed to accelerate your development with [Z.ai](https://chat.z.ai)'s AI-powered coding assistance.

## ✨ Technology Stack

This scaffold provides a robust foundation built with:

### 🎯 Core Framework
- **⚡ Next.js 15** - The React framework for production with App Router
- **📘 TypeScript 5** - Type-safe JavaScript for better developer experience
- **🎨 Tailwind CSS 4** - Utility-first CSS framework for rapid UI development

### 🧩 UI Components & Styling
- **🧩 shadcn/ui** - High-quality, accessible components built on Radix UI
- **🎯 Lucide React** - Beautiful & consistent icon library
- **🌈 Framer Motion** - Production-ready motion library for React
- **🎨 Next Themes** - Perfect dark mode in 2 lines of code

### 📋 Forms & Validation
- **🎣 React Hook Form** - Performant forms with easy validation
- **✅ Zod** - TypeScript-first schema validation

### 🔄 State Management & Data Fetching
- **🐻 Zustand** - Simple, scalable state management
- **🔄 TanStack Query** - Powerful data synchronization for React
- **🌐 Axios** - Promise-based HTTP client

### 🗄️ Database & Backend
- **🗄️ Prisma** - Next-generation Node.js and TypeScript ORM
- **🔐 NextAuth.js** - Complete open-source authentication solution

### 🎨 Advanced UI Features
- **📊 TanStack Table** - Headless UI for building tables and datagrids
- **🖱️ DND Kit** - Modern drag and drop toolkit for React
- **📊 Recharts** - Redefined chart library built with React and D3
- **🖼️ Sharp** - High performance image processing

### 🌍 Internationalization & Utilities
- **🌍 Next Intl** - Internationalization library for Next.js
- **📅 Date-fns** - Modern JavaScript date utility library
- **🪝 ReactUse** - Collection of essential React hooks for modern development

## 🎯 Why This Scaffold?

- **🏎️ Fast Development** - Pre-configured tooling and best practices
- **🎨 Beautiful UI** - Complete shadcn/ui component library with advanced interactions
- **🔒 Type Safety** - Full TypeScript configuration with Zod validation
- **📱 Responsive** - Mobile-first design principles with smooth animations
- **🗄️ Database Ready** - Prisma ORM configured for rapid backend development
- **🔐 Auth Included** - NextAuth.js for secure authentication flows
- **📊 Data Visualization** - Charts, tables, and drag-and-drop functionality
- **🌍 i18n Ready** - Multi-language support with Next Intl
- **🚀 Production Ready** - Optimized build and deployment settings
- **🤖 AI-Friendly** - Structured codebase perfect for AI assistance

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to see your application running.

## 🤖 Powered by Z.ai

This scaffold is optimized for use with [Z.ai](https://chat.z.ai) - your AI assistant for:

- **💻 Code Generation** - Generate components, pages, and features instantly
- **🎨 UI Development** - Create beautiful interfaces with AI assistance  
- **🔧 Bug Fixing** - Identify and resolve issues with intelligent suggestions
- **📝 Documentation** - Auto-generate comprehensive documentation
- **🚀 Optimization** - Performance improvements and best practices

Ready to build something amazing? Start chatting with Z.ai at [chat.z.ai](https://chat.z.ai) and experience the future of AI-powered development!

## 📁 Project Structure

```
src/
├── app/                 # Next.js App Router pages
├── components/          # Reusable React components
│   └── ui/             # shadcn/ui components
├── hooks/              # Custom React hooks
└── lib/                # Utility functions and configurations
```

## 🎨 Available Features & Components

This scaffold includes a comprehensive set of modern web development tools:

### 🧩 UI Components (shadcn/ui)
- **Layout**: Card, Separator, Aspect Ratio, Resizable Panels
- **Forms**: Input, Textarea, Select, Checkbox, Radio Group, Switch
- **Feedback**: Alert, Toast (Sonner), Progress, Skeleton
- **Navigation**: Breadcrumb, Menubar, Navigation Menu, Pagination
- **Overlay**: Dialog, Sheet, Popover, Tooltip, Hover Card
- **Data Display**: Badge, Avatar, Calendar

### 📊 Advanced Data Features
- **Tables**: Powerful data tables with sorting, filtering, pagination (TanStack Table)
- **Charts**: Beautiful visualizations with Recharts
- **Forms**: Type-safe forms with React Hook Form + Zod validation

### 🎨 Interactive Features
- **Animations**: Smooth micro-interactions with Framer Motion
- **Drag & Drop**: Modern drag-and-drop functionality with DND Kit
- **Theme Switching**: Built-in dark/light mode support

### 🔐 Backend Integration
- **Authentication**: Ready-to-use auth flows with NextAuth.js
- **Database**: Type-safe database operations with Prisma
- **API Client**: HTTP requests with Axios + TanStack Query
- **State Management**: Simple and scalable with Zustand

### 🌍 Production Features
- **Internationalization**: Multi-language support with Next Intl
- **Image Optimization**: Automatic image processing with Sharp
- **Type Safety**: End-to-end TypeScript with Zod validation
- **Essential Hooks**: 100+ useful React hooks with ReactUse for common patterns

## 🤝 Get Started with Z.ai

1. **Clone this scaffold** to jumpstart your project
2. **Visit [chat.z.ai](https://chat.z.ai)** to access your AI coding assistant
3. **Start building** with intelligent code generation and assistance
4. **Deploy with confidence** using the production-ready setup

---

Built with ❤️ for the developer community. Supercharged by [Z.ai](https://chat.z.ai) 🚀

## 📂 File-Based Content Architecture

This project uses a file-based content management system for portfolio data, enabling easy editing without database changes.

### 🎯 Content Structure

All content is stored in `src/data/content/` as JSON files with internationalization support:

```
src/data/content/
├── en.json                 # English locale strings
├── pt-BR.json              # Portuguese (Brazil) locale strings
├── profile.en.json         # Profile data (English)
├── profile.pt-BR.json      # Profile data (Portuguese)
├── projects.en.json        # Portfolio projects (English)
├── projects.pt-BR.json     # Portfolio projects (Portuguese)
├── recommendations.en.json # Client testimonials (English)
├── recommendations.pt-BR.json # Client testimonials (Portuguese)
├── skills.en.json          # Skills and proficiencies (English)
├── skills.pt-BR.json       # Skills and proficiencies (Portuguese)
└── site-config.en.json     # Site configuration (English)
└── site-config.pt-BR.json  # Site configuration (Portuguese)
```

### 🔒 Data Validation with Zod

All content files are validated using **Zod schemas** defined in `src/data/types.ts`:

- **Type Safety**: TypeScript types are inferred from Zod schemas (`z.infer<typeof zPortfolioProject>`)
- **Runtime Validation**: `src/lib/data-loader.ts` validates all loaded data against schemas
- **Fallback Handling**: Invalid or missing files trigger fallback data to prevent crashes
- **Centralized Schemas**: All validation logic is centralized for consistency

### ⚡ Static Generation & Performance

The application uses **Next.js static generation** for optimal performance:

- **Server-Side Data Loading**: `src/app/page.tsx` uses `loadAllData()` during build time
- **Incremental Static Regeneration (ISR)**: `revalidate = 3600` (1 hour) for fresh content
- **No API Routes**: Direct file loading eliminates API overhead
- **Hot Module Replacement (HMR)**: Content changes appear instantly in development

### ✏️ Editing Content Instructions

#### 1. **Locale Strings** (`en.json`, `pt-BR.json`)
Edit UI text, navigation labels, and button text:

```json
{
  "hero": {
    "title": "Hello, I'm Gregory Vallim",
    "subtitle": "Full-stack developer creating amazing digital experiences",
    "ctaText": "View My Work"
  },
  "ui": {
    "buttons": {
      "viewProjects": "View Projects",
      "contact": "Contact",
      "recommendations": "Recommendations"
    }
  }
}
```

#### 2. **Profile Information** (`profile.en.json`, `profile.pt-BR.json`)
Update personal details and experience:

```json
{
  "name": "Gregory Vallim",
  "subtitle": "Full-Stack Developer & UI/UX Specialist",
  "badges": ["React Expert", "Next.js Specialist", "TypeScript", "Tailwind CSS"],
  "experience": {
    "title": "5+ Years Experience",
    "description": "Building modern web applications with focus on performance and user experience"
  },
  "techStack": {
    "title": "Technology Stack",
    "skills": ["React", "Next.js", "TypeScript", "Node.js", "Prisma", "Tailwind"]
  },
  "mission": {
    "title": "My Mission",
    "description": "Creating innovative digital solutions that make a positive impact"
  }
}
```

#### 3. **Portfolio Projects** (`projects.en.json`, `projects.pt-BR.json`)
Add/modify projects with rich metadata:

```json
{
  "id": "project-1",
  "title": "E-commerce Platform",
  "description": "Modern e-commerce solution with real-time inventory management",
  "image": "/project1.jpg",
  "technologies": ["React", "Next.js", "TypeScript", "Prisma", "Tailwind"],
  "tags": ["ecommerce", "fullstack", "realtime"],
  "githubUrl": "https://github.com/gregoryvallim/ecommerce-platform",
  "liveUrl": "https://ecommerce.gregoryvallim.com",
  "featured": true,
  "moreInfo": "Scalable e-commerce platform serving 10k+ monthly users",
  "galleryImages": ["/gallery1.jpg", "/gallery2.jpg", "/gallery3.jpg"],
  "links": [
    {
      "name": "Live Demo",
      "url": "https://ecommerce.gregoryvallim.com",
      "icon": "external-link"
    }
  ]
}
```

#### 4. **Client Recommendations** (`recommendations.en.json`, `recommendations.pt-BR.json`)
Add testimonials with social links:

```json
{
  "id": "rec-1",
  "name": "Maria Silva",
  "role": "Product Manager",
  "company": "TechCorp",
  "message": "Gregory delivered exceptional work that exceeded our expectations. His attention to detail and proactive approach made the entire project a success.",
  "avatar": "/person1.jpg",
  "rating": 5,
  "linkedin": "https://linkedin.com/in/maria-silva",
  "companyLogo": "/company1.png"
}
```

#### 5. **Skills & Proficiencies** (`skills.en.json`, `skills.pt-BR.json`)
Define technical skills with proficiency levels:

```json
{
  "name": "React",
  "icon": "react",
  "description": "Building dynamic user interfaces with component-based architecture",
  "proficiency": 95
}
```

### 🔄 Development Workflow

1. **Edit Content**: Modify JSON files in `src/data/content/`
2. **Hot Reload**: Changes appear instantly in development (`npm run dev`)
3. **Validation**: Zod automatically validates structure on load
4. **Type Safety**: TypeScript ensures type consistency across the app
5. **Build & Deploy**: Static generation creates optimized production builds

### 🛡️ Error Handling & Fallbacks

- **Missing Files**: Graceful fallback to default data structures
- **Invalid JSON**: Zod validation prevents runtime errors
- **Type Mismatches**: TypeScript compilation catches issues early
- **Build Failures**: Comprehensive error messages for debugging

### 📱 Internationalization Support

- **English (`en`)**: Default language
- **Portuguese (`pt-BR`)**: Brazilian Portuguese localization
- **Easy Extension**: Add new languages by creating `*.json` files
- **Consistent Structure**: All locales follow the same schema

### 🚀 Production Deployment

The static generation ensures:
- **Fast Load Times**: Pre-rendered HTML served from CDN
- **SEO Friendly**: Server-side rendered content for search engines
- **Low Server Load**: Minimal runtime computation
- **Incremental Updates**: ISR revalidates content without full rebuilds

---

**Content Management Made Simple** - Edit JSON files, see instant results, maintain type safety, and deploy with confidence! 🎉

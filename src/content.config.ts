import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const experiences = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/experiences' }),
  schema: z.object({
    title: z.string(),
    role: z.string(),
    company: z.string(),
    location: z.string().optional(),
    start: z.date(),
    end: z.date().optional(),
    current: z.boolean().default(false),
    feeling_word: z.string(),
    summary: z.string(),
    bullets: z.array(z.string()).default([]),
    media: z.string().optional(),
    tags: z.array(z.string()).default([]),
    order: z.number().default(0),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    client: z.string(),
    year: z.number(),
    role: z.string(),
    feeling_word: z.string(),
    challenge: z.string(),
    solution: z.string(),
    outcome: z.string(),
    stack: z.array(z.string()).default([]),
    cover: z.string().optional(),
    gallery: z.array(z.object({ image: z.string() })).default([]),
    tags: z.array(z.string()).default([]),
    order: z.number().default(0),
  }),
});

const courses = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/courses' }),
  schema: z.object({
    title: z.string(),
    issuer: z.string(),
    year: z.number(),
    type: z.enum(['course', 'cert']).default('course'),
    credential_url: z.string().optional(),
    skills: z.array(z.string()).default([]),
    badge: z.string().optional(),
    description: z.string().optional(),
  }),
});

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    kind: z.enum(['article', 'update']).default('article'),
    date: z.date(),
    excerpt: z.string().optional(),
    cover: z.string().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    template: z.enum(['default', 'narrow', 'full']).default('default'),
  }),
});

export const collections = {
  experiences,
  projects,
  courses,
  posts,
  pages,
};

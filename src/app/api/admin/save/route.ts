import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { z } from 'zod';

const CONTENT_DIR = path.join(process.cwd(), 'src/data/content');

// Zod schemas for validation
const zPortfolioProject = z.array(z.object({
  id: z.string(),
  title: z.string().min(1),
  description: z.string().min(1),
  image: z.string(),
  technologies: z.array(z.string()).min(1),
  githubUrl: z.string().url().optional(),
  liveUrl: z.string().url().optional(),
  featured: z.boolean().optional(),
  moreInfo: z.string().optional(),
  galleryImages: z.array(z.string()).min(1),
}));

const zRecommendation = z.array(z.object({
  id: z.string(),
  name: z.string().min(1),
  role: z.string().min(1),
  company: z.string().min(1),
  message: z.string().min(1),
  avatar: z.string(),
  rating: z.number().min(1).max(5).optional(),
  github: z.string().url().optional(),
  website: z.string().url().optional(),
}));

const zSkill = z.array(z.object({
  name: z.string().min(1),
  icon: z.string(),
  description: z.string().min(1),
  proficiency: z.number().min(0).max(100),
}));

const zProfileData = z.object({
  name: z.string().min(1),
  subtitle: z.string().min(1),
  badges: z.array(z.string()).min(1),
  experience: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
  }),
  techStack: z.object({
    title: z.string().min(1),
    skills: z.array(z.string()).min(1),
  }),
  mission: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
  }),
});

export async function POST(request: NextRequest) {
  try {
    const { type, data } = await request.json();
    let filePath: string;
    let schema: any;

    // Determine file and schema based on type
    switch (type) {
      case 'projects':
        schema = zPortfolioProject;
        filePath = path.join(CONTENT_DIR, 'projects.en.json');
        break;
      case 'recommendations':
        schema = zRecommendation;
        filePath = path.join(CONTENT_DIR, 'recommendations.en.json');
        break;
      case 'skills':
        schema = zSkill;
        filePath = path.join(CONTENT_DIR, 'skills.en.json');
        break;
      case 'profile':
        schema = zProfileData;
        filePath = path.join(CONTENT_DIR, 'profile.en.json');
        break;
      default:
        return NextResponse.json({ error: 'Invalid data type' }, { status: 400 });
    }

    // Validate incoming data
    const validatedData = schema.parse(data);

    // Write validated data to JSON file with proper formatting
    const jsonString = JSON.stringify(validatedData, null, 2);
    await fs.writeFile(filePath, jsonString, 'utf8');

    return NextResponse.json({ 
      success: true, 
      message: `${type} data saved successfully`,
      type,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Validation errors:', error.issues);
      return NextResponse.json({
        error: 'Data validation failed',
        details: error.issues,
        type: 'VALIDATION_ERROR'
      }, { status: 400 });
    }

    console.error('Admin save error:', error);
    return NextResponse.json({
      error: 'Failed to save data to file system',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
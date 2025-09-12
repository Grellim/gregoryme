import { NextRequest, NextResponse } from 'next/server';
import { loadProjects, loadRecommendations, loadSiteConfig, loadLocale, loadProfile, loadSkills } from '@/lib/data-loader';
import type { PortfolioProject, Recommendation, SiteConfig, Locale, Skill, ProfileData } from '@/data/types';

// Zod validators for data integrity
import { z } from 'zod';
import { zPortfolioProject, zRecommendation, zSiteConfig, zLocale, zSkill } from '@/data/types';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ type: string }> }
) {
  const { type } = await params;
  const locale = request.nextUrl.searchParams.get('locale') || 'en';

  // Validate supported locale early
  if (!['en', 'pt-BR'].includes(locale)) {
    return NextResponse.json({ error: 'Unsupported locale' }, { status: 400 });
  }

  try {
    let data: any;

    switch (type) {
      case 'projects':
        data = await loadProjects(locale);
        zPortfolioProject.array().parse(data); // Validate
        break;
      case 'recommendations':
        data = await loadRecommendations(locale);
        zRecommendation.array().parse(data); // Validate
        break;
      case 'site-config':
        data = await loadSiteConfig(locale);
        zSiteConfig.parse(data); // Validate
        break;
      case 'locale':
        data = await loadLocale(locale);
        zLocale.parse(data); // Validate
        break;
      case 'profile':
        data = await loadProfile(locale);
        // Assuming zProfileData validation if defined
        break;
      case 'skills':
        data = await loadSkills(locale);
        z.array(zSkill).parse(data); // Validate
        break;
      default:
        return NextResponse.json({ error: 'Invalid data type' }, { status: 400 });
    }


    return NextResponse.json(
      { data, type, locale },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
          'X-Cache-Status': 'dynamic',
        },
      }
    );
  } catch (error: any) {
    console.error(`Error loading ${type} data for locale ${locale}:`, error);
    return NextResponse.json(
      { error: 'Failed to load data', type, locale, details: error.message },
      { status: 500 }
    );
  }
}
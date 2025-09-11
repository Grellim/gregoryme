import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, Prisma } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

// Cache for visit count (simple in-memory, consider Redis for production)
let cachedVisitCount = 0;
let cacheTimestamp = 0;
const CACHE_DURATION = 30 * 1000; // 30 seconds

// Custom IP validation schema
const ipSchema = z.string().refine((val) => {
  const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  return ipRegex.test(val);
}, { message: "Invalid IP address format" });

export async function GET(request: NextRequest) {
  try {
    const now = Date.now();
    
    // Use cache if valid
    if (now - cacheTimestamp < CACHE_DURATION) {
      return NextResponse.json({ count: cachedVisitCount }, {
        status: 200,
        headers: { 'Cache-Control': 'public, s-maxage=30' }
      });
    }

    const count = await prisma.visit.count();
    cachedVisitCount = count;
    cacheTimestamp = now;

    return NextResponse.json({ count }, {
      status: 200,
      headers: { 'Cache-Control': 'public, s-maxage=30' }
    });
  } catch (error) {
    // Log to structured logging service in production
    console.error('Error fetching visit count:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }

    const ip = ipSchema.parse(body.ip);
    
    // Rate limit: simple IP-based (consider Redis for production)
    const recentVisits = await prisma.visit.count({
      where: {
        ip: ip,
        createdAt: { gte: new Date(Date.now() - 24 * 60 * 60 * 1000) } // 24h
      }
    });

    if (recentVisits >= 10) { // Limit to 10 visits per IP per day
      return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
    }

    // Use transaction for atomicity
    await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      await tx.visit.create({
        data: {
          ip: ip,
        },
      });
    });

    // Invalidate cache
    cachedVisitCount = 0;
    cacheTimestamp = 0;

    const count = await prisma.visit.count();
    return NextResponse.json({ count }, {
      status: 201,
      headers: { 'Cache-Control': 'no-store' }
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid IP address' }, { status: 400 });
    }

    // Log to structured logging service in production
    console.error('Error tracking visit:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
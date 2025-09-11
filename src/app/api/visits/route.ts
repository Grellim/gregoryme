import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const count = await prisma.visit.count();
    return NextResponse.json({ count }, { status: 200 });
  } catch (error) {
    console.error('Error fetching visit count:', error);
    return NextResponse.json({ error: 'Failed to fetch visit count' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { ip } = await request.json();
    
    if (!ip) {
      return NextResponse.json({ error: 'IP address is required' }, { status: 400 });
    }

    // Try to create visit, ignore if IP already exists (unique constraint)
    try {
      await prisma.visit.create({
        data: {
          ip: ip,
        },
      });
    } catch (error) {
      // IP already exists, do nothing
    }

    const count = await prisma.visit.count();
    return NextResponse.json({ count }, { status: 201 });
  } catch (error) {
    console.error('Error tracking visit:', error);
    return NextResponse.json({ error: 'Failed to track visit' }, { status: 500 });
  }
}
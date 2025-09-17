import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
  try {
    // Basic database connectivity check
    await db.$connect();
    const healthCheck = await db.$queryRaw`SELECT 1`;
    
    return NextResponse.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      database: 'connected',
      environment: process.env.NODE_ENV || 'development',
      version: '1.0.0'
    }, {
      status: 200,
      headers: { 'Cache-Control': 'public, s-maxage=60' }
    });
  } catch (error) {
    console.error('Health check failed:', error);
    return NextResponse.json({
      status: 'error',
      error: 'Database connection failed',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  } finally {
    await db.$disconnect();
  }
}
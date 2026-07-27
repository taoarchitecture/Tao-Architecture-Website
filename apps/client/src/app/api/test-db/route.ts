import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // Attempt to query the database to verify the connection works
    // We'll count the users to keep it lightweight
    const userCount = await prisma.user.count();
    
    return NextResponse.json({
      success: true,
      message: 'Database connection successful from Serverless Next.js!',
      userCount,
    });
  } catch (error) {
    console.error('Database connection failed:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to connect to the database',
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

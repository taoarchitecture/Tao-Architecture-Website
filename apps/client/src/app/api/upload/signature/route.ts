import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { verifyAuth, unauthorized } from '@/lib/auth';
import { checkRateLimit, getClientIp } from '@/lib/rateLimit';

// The only folder a signed upload is allowed to target without an admin
// session — the public, unauthenticated career-application form uploads
// resumes/portfolios here. Everything else (project photos, team photos,
// service images, ...) is admin-only content and requires auth below.
const PUBLIC_UPLOAD_FOLDER = 'careers';
const PUBLIC_UPLOAD_LIMIT = 10;
const PUBLIC_UPLOAD_WINDOW_MS = 60 * 60 * 1000;

export async function POST(req: NextRequest) {
  try {
    const { folder } = await req.json();

    if (folder === PUBLIC_UPLOAD_FOLDER) {
      const ip = getClientIp(req);
      if (!checkRateLimit(`upload:careers:${ip}`, PUBLIC_UPLOAD_LIMIT, PUBLIC_UPLOAD_WINDOW_MS)) {
        return NextResponse.json({ message: 'Too many uploads. Please try again later.' }, { status: 429 });
      }
    } else {
      const actor = verifyAuth(req);
      if (!actor || actor.role !== 'admin') return unauthorized();
    }

    const timestamp = Math.round(new Date().getTime() / 1000);
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!apiSecret) {
      return NextResponse.json({ message: 'Cloudinary API secret not configured' }, { status: 500 });
    }

    // Parameters to sign must be sorted alphabetically
    let signatureString = '';
    if (folder) {
      signatureString += `folder=${folder}&`;
    }
    signatureString += `timestamp=${timestamp}${apiSecret}`;

    // Create SHA-1 signature
    const signature = crypto.createHash('sha1').update(signatureString).digest('hex');

    return NextResponse.json({
      timestamp,
      signature,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.CLOUDINARY_API_KEY,
    });
  } catch (error) {
    console.error('Error generating signature:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

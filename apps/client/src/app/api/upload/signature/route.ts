import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  try {
    const { folder } = await req.json();

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

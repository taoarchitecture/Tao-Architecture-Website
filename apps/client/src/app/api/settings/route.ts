import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyAuth, unauthorized } from '@/lib/auth';

const DEFAULTS = {
  siteName: 'TAO Architecture Pvt. Ltd.',
  contactEmail: 'info@taoarchitecture.com',
  phoneNumbers: JSON.stringify(['+91-744-771-9343', '+91-744-771-9344']),
  address: 'A/2, Friends Enclave Society, West Block, Opp Sai Hira Complex, Mundhwa, Pune 411036 India',
  googleMapsUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.7520911131955!2d73.89636821535252!3d18.540101787397706!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c10126443907%3A0xc8701cf41af4250e!2sTAO+ARCHITECTURE+PVT.+LTD.!5e0!3m2!1sen!2sin!4v1528098796192',
  facebookUrl: 'https://www.facebook.com/taoarchitect/',
  instagramUrl: 'https://www.instagram.com/tao_architecture/?hl=en',
  linkedinUrl: 'https://www.linkedin.com/company/tao-architecture-design/',
  youtubeUrl: 'https://www.youtube.com/@TAOSTUDIO_0',
  footerTagline: 'Touching intangible beauty of nature, through tangible forms of Architecture.',
};

// GET /api/settings — public
export async function GET() {
  try {
    const settings = await prisma.globalSettings.findFirst();
    return NextResponse.json(settings ?? { id: null, ...DEFAULTS });
  } catch (error) {
    console.error('GET /api/settings error:', error);
    return NextResponse.json({ message: 'Error fetching settings' }, { status: 500 });
  }
}

// PUT /api/settings — protected
export async function PUT(req: NextRequest) {
  const actor = verifyAuth(req);
  if (!actor || actor.role !== 'admin') return unauthorized();

  try {
    const { siteName, contactEmail, phoneNumbers, address, googleMapsUrl,
      facebookUrl, instagramUrl, linkedinUrl, youtubeUrl, footerTagline } = await req.json();

    const data = { siteName, contactEmail, phoneNumbers, address, googleMapsUrl,
      facebookUrl, instagramUrl, linkedinUrl, youtubeUrl, footerTagline };

    const existing = await prisma.globalSettings.findFirst();
    const result = existing
      ? await prisma.globalSettings.update({ where: { id: existing.id }, data })
      : await prisma.globalSettings.create({ data });

    return NextResponse.json(result);
  } catch (error) {
    console.error('PUT /api/settings error:', error);
    return NextResponse.json({ message: 'Error updating settings' }, { status: 500 });
  }
}

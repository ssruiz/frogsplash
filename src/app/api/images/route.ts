import { CreateImageDTO } from '@/app/services/dto/create-image.dto';
import { createImage, getImages } from '@/app/services/images.service';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const offsetString = parseInt(searchParams.get('offset') || '0');
  const limitString = parseInt(searchParams.get('limit') || '10');

  const offset = isNaN(offsetString) ? 0 : offsetString;
  const limit = isNaN(limitString) ? 10 : limitString;

  const images = await getImages({ limit, offset });

  return NextResponse.json({ images });
}

export async function POST(request: Request) {
  const body = await request.json();

  return createImage(body as CreateImageDTO);
}

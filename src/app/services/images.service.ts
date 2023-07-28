import { prisma } from '@/lib/prisma';
import { Pagination } from '../types';
import { CreateImageDTO } from './dto/create-image.dto';
import { NextResponse } from 'next/server';

export const getImages = async (
  { limit, offset }: Pagination,
  search: string = ''
) => {
  return await prisma.image.findMany({
    take: limit,
    skip: offset,
    where: {
      label: {
        contains: search,
        mode: 'insensitive',
      },
    },
    orderBy: {
      id: 'desc',
    },
  });
};

export const createImage = async (dto: CreateImageDTO) => {
  try {
    const checkUrl = await checkIfURLReturnsImage(dto.url);

    if (!checkUrl)
      return NextResponse.json(
        {
          message: "The given url won't return a image",
          error: true,
        },
        { status: 500 }
      );

    const newImage = await prisma.image.create({
      data: {
        ...dto,
      },
    });

    return NextResponse.json({ id: newImage.id });
  } catch (error) {
    return NextResponse.json({ message: 'Something went wrong', error: true });
  }
};

async function checkIfURLReturnsImage(url: string) {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    if (response.ok) {
      const contentType = response.headers.get('Content-Type');
      return contentType?.startsWith('image/');
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}

export const deleteImage = async (id: string) => {
  try {
    const newImage = await prisma.image.delete({
      where: { id },
    });

    return NextResponse.json({ id: newImage.id });
  } catch (error) {
    return NextResponse.json({ message: 'Something went wrong', error: true });
  }
};

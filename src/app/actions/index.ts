'use server';

import { revalidatePath } from 'next/cache';
import { CreateImageDTO } from '../services/dto/create-image.dto';
import {
  createImage,
  deleteImage as deleteImageFromDb,
} from '../services/images.service';
import { CreateImage } from '../utilts/schemas/image.schema';

async function addImage(data: CreateImageDTO) {
  const resp = await createImage(data);
  const body = await resp.json();
  revalidatePath('/');
  if (resp.status === 401) {
    console.log('error');
    return { error: true, message: body.message };
  } else if (resp.status === 500 || resp.status === 400) {
    console.log('error');
    return { error: true, message: body.message };
  } else {
    return { error: false };
  }
}

async function deleteImageAction(id: string) {
  const resp = await deleteImageFromDb(id);
  const body = await resp.json();
  revalidatePath('/');
  if (resp.status === 401) {
    console.log('error');
    return { error: true, message: body.message };
  } else if (resp.status === 500 || resp.status === 400) {
    console.log('error');
    return { error: true, message: body.message };
  } else {
    return { error: false };
  }
}
export { addImage, deleteImageAction };

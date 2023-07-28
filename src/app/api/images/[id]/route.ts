import { deleteImage } from '@/app/services/images.service';

interface IParams {
  id: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  return await deleteImage(params.id);
}

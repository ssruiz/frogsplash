import Image from 'next/image';
import ImagePreview from '../components/ImagePreview';
import { getImages } from '../services/images.service';

export const dynamic = 'force-dynamic';

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  console.log('searchParams', searchParams['search']);
  const images = await getImages(
    { limit: 10, offset: 0 },
    searchParams['search'] as string
  );

  return (
    <main className="flex flex-col items-center justify-between p-24">
      <div className="columns-2 md:columns-3 lg:columns-4 ">
        {images.map(({ id, label, url }) => (
          <ImagePreview key={id} id={id} photo={url} label={label} />
        ))}
      </div>
    </main>
  );
}

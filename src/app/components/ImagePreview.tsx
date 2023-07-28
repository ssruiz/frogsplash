'use client';
import Image from 'next/image';
import { Icons } from './shared/Icons';
import DeleteForm from './Forms/Delete/DeleteForm';

interface Props {
  id: string;
  photo: string;
  label: string;
}

const ImagePreview: React.FC<Props> = ({ id, photo, label }) => {
  return (
    <div className="group flex flex-col relative mb-4 cursor-pointer">
      <div className="rounded-lg  transition-opacity group max-h-[500px] relative">
        <Image
          alt="image"
          width={500}
          height={500}
          className="rounded-xl group-hover:opacity-50 animate-pulse bg-slate-600"
          onLoadingComplete={(image) => {
            image.classList.remove('animate-pulse');
            image.classList.remove('bg-slate-600');
          }}
          src={`${photo}`}
        />
      </div>

      <div className="group-hover:opacity-100 opacity-0 absolute top-0 bg-frogBlack/40 h-full w-full rounded-xl "></div>

      <div className="absolute group-hover:animate-fade-up bottom-10 rounded-b-lg h-5 p-6 text-center w-full opacity-0 transition-all text-white text-lg font-bold">
        {label}
      </div>
      <DeleteForm id={id} />
    </div>
  );
};

export default ImagePreview;

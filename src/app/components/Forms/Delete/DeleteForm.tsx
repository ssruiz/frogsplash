'use client';

import { useCallback, useState, useTransition } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import Modal from '../../shared/Modal';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import {
  CreateImage,
  CreateImageSchema,
  DeleteImage,
  DeleteImageSchema,
} from '../../../utilts/schemas/image.schema';
import Input from '../../shared/Input';
import { Button } from '../../shared/Button';
import { deleteServer, postServer } from '@/lib/fetch';
import { ServerResponse } from '../../../types/responses';
import { useRouter } from 'next/navigation';
import { Icons } from '../../shared/Icons';
import Spinner from '../../shared/Spinner';
import SuccessView from '../Create/SuccessView';
import { deleteImageAction } from '@/app/actions';

interface Props {
  id: string;
}

const DeleteForm: React.FC<Props> = ({ id }) => {
  const [showModal, setShowModal] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<DeleteImage>({
    resolver: zodResolver(DeleteImageSchema),
    defaultValues: {
      url: '',
      label: '',
    },
  });
  const onSubmit = async (data: CreateImage) => {
    setError('');
    try {
      startTransition(async () => {
        const { error, message } = await deleteImageAction(id);
        if (error) setError(message);
        else {
          handleClose();
        }
      });
    } catch (error) {}
  };

  const handleClose = useCallback(() => {
    setShowModal(false);
    setTimeout(() => {
      reset();
      setSuccess(false);
      setError('');
    }, 1000);
  }, [reset]);

  return (
    <div className="absolute opacity-0 right-3 top-3 group-hover:animate-fade-down">
      <button
        className=" text-white border border-white py-2 px-6 text-xs rounded-full hover:border-red-500 hover:text-red-500 transition-all"
        onClick={() => setShowModal(true)}
      >
        <Icons.delete size={20} />
      </button>
      <Modal show={showModal} onClose={handleClose}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="min-h-[150px] min-w-[400px] max-w-lg rounded-md relative p-6">
            {!success && (
              <div className="flex flex-col justify-around">
                <p className="text-lg font-medium text-frogBlack mb-10">
                  Are you sure?
                </p>
                <div className="flex flex-col gap-10 justify-around">
                  <Input
                    label={'Password'}
                    id={'password'}
                    register={register}
                    errors={errors}
                    required
                    disabled={isPending}
                    type="password"
                  />

                  <Button
                    className="bg-red-600 text-white hover:bg-red-500 transition-colors"
                    type="submit"
                    disabled={isPending}
                  >
                    {isPending ? <Spinner delete /> : 'Delete'}
                  </Button>
                </div>
                {error && (
                  <p className="text-red-500 text-center mt-3">{error}</p>
                )}
              </div>
            )}
            <span
              className="absolute top-2 right-2 cursor-pointer hover:text-frogGrey transition-colors"
              onClick={handleClose}
            >
              <Icons.close size={20} />
            </span>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default DeleteForm;

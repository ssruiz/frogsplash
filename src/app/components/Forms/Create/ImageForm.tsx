'use client';

import { useCallback, useState, useTransition } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import Modal from '../../shared/Modal';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import {
  CreateImage,
  CreateImageSchema,
} from '../../../utilts/schemas/image.schema';
import Input from '../../shared/Input';
import { Button } from '../../shared/Button';
import { postServer } from '@/lib/fetch';
import { ServerResponse } from '../../../types/responses';
import { useRouter } from 'next/navigation';
import { Icons } from '../../shared/Icons';
import Spinner from '../../shared/Spinner';
import SuccessView from './SuccessView';
import { addImage } from '@/app/actions';

const ImageForm = () => {
  const [isPending, startTransition] = useTransition();
  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<CreateImage>({
    resolver: zodResolver(CreateImageSchema),
    defaultValues: {
      url: '',
      label: '',
    },
  });
  const onSubmit = async (data: CreateImage) => {
    setIsSaving(true);
    setError('');
    try {
      startTransition(async () => {
        const { error, message } = await addImage({
          label: data.label,
          url: data.url,
        });
        if (error) setError(message);
        else reset();
        setSuccess(true);
      });
    } catch (error) {}
    setIsSaving(false);
  };

  const handleAddAnother = useCallback(() => {
    reset();
    setSuccess(false);
  }, [reset]);

  const handleClose = useCallback(() => {
    setShowModal(false);
    setTimeout(() => {
      reset();
      setSuccess(false);
      setError('');
    }, 1000);
  }, [reset]);

  return (
    <div>
      <Button onClick={() => setShowModal(true)}>Add a photo</Button>
      <Modal show={showModal} onClose={handleClose}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="min-h-[300px] min-w-[400px] max-w-lg rounded-md relative p-6">
            {!success && (
              <div className="flex flex-col justify-around">
                <p className="text-lg font-medium text-frogBlack mb-10">
                  Add a new photo
                </p>
                <div className="flex flex-col gap-10 justify-around">
                  <Input
                    label={'Label'}
                    id={'label'}
                    register={register}
                    errors={errors}
                    required
                    disabled={isSaving}
                  />
                  <Input
                    label="URL"
                    id={'url'}
                    register={register}
                    errors={errors}
                    required
                    disabled={isSaving}
                  />
                  <Button type="submit" disabled={isPending}>
                    {isPending ? <Spinner /> : 'Save'}
                  </Button>
                </div>
                {error && (
                  <p className="text-red-500 text-center mt-3">{error}</p>
                )}
              </div>
            )}
            {success && (
              <SuccessView
                title="Image added!"
                handleAddAnother={handleAddAnother}
                handleClose={handleClose}
              />
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

export default ImageForm;

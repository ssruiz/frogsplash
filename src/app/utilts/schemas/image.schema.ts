import { FormSchema } from '@/app/types/forms';

import * as z from 'zod';

export const CreateImageSchema: FormSchema = z.object({
  url: z
    .string({
      required_error: 'Required field',
    })
    .nonempty({ message: 'Required field' })
    .url({
      message: 'The value is not a valid url',
    })
    .startsWith('https', { message: 'Has to be a secure url' })
    .includes('images.unsplash.com', {
      message: 'Only unsplash images are allowed 😢',
    }),
  label: z
    .string({
      required_error: 'Required field',
    })
    .nonempty({ message: 'Required field' })
    .max(200, { message: 'Max length 100 character' }),
});

export type CreateImage = z.infer<typeof CreateImageSchema>;

export const DeleteImageSchema: FormSchema = z.object({
  password: z
    .string({
      required_error: 'Required field',
    })
    .nonempty({ message: 'Required field' })
    .refine(
      (value) => {
        console.log('process.env.PASSWORD', process.env.NEXT_PUBLIC_PASSWORD);
        return value === process.env.NEXT_PUBLIC_PASSWORD;
      },
      {
        message: 'Incorrect password',
      }
    ),
});

export type DeleteImage = z.infer<typeof CreateImageSchema>;

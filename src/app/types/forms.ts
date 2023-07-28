import { z } from 'zod';

export interface SelectInputItem {
  value: string;
  label: string;
  key: string;
}

export type FormSchema = z.ZodObject<any>;

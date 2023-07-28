'use client';

import { FC } from 'react';
import clsx from 'clsx';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

interface Props {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled?: boolean;
}

const Input: FC<Props> = ({
  label,
  id,
  type,
  required,
  register,
  errors,
  disabled,
}) => {
  return (
    <div className="relative">
      <input
        type={type}
        id={id}
        autoComplete={id}
        disabled={disabled}
        placeholder=" "
        {...register(id, { required })}
        className={clsx(
          'block px-0 py-1 w-full text-sm text-frogBlack bg-transparent border-0 border-b-2 border-frogGrey appearance-none focus:outline-none focus:ring-0 peer focus:bg-transparent',
          errors[id] && 'border-red-500 focus:border-red-500',
          !errors[id] && 'focus:border-primary',
          disabled && 'opacity-50'
        )}
      />
      <label
        htmlFor={id}
        className={clsx(
          'peer-focus:font-medium absolute text-sm text-frogGrey duration-300 transform -translate-y-4 scale-75 top-0 -z-0 origin-[0] peer-focus:left-0  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4',
          errors[id] && 'text-red-500 peer-focus:text-red-500',
          !errors[id] && 'peer-focus:text-frogGrey'
        )}
      >
        {label}
      </label>
      {errors[id] && (
        <p className="text-red-500 text-sm mt-1">
          {errors[id]?.message?.toString()}
        </p>
      )}
    </div>
  );
};

export default Input;

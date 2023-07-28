'use client';

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Input from '../../shared/Input';
import { useRouter } from 'next/navigation';

const SearchForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      search: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log('data', data);
    router.push(`/?search=${data.search}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Search by name"
        id={'search'}
        register={register}
        errors={errors}
      />
    </form>
  );
};

export default SearchForm;

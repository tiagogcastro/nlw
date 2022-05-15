import { useContext } from 'react';
import { Context, FormContextData } from '../contexts/form';

export type UseFormProps<T = any> = {
  initialValues?: T;
}

export type UseFieldResponse = {
  errors: string;
}

export function useField<T = any>(field_name: string) {
  const context = useContext<FormContextData<T>>(Context);

  let error: string | undefined;

  if(context?.errors) {
    error = (context.errors as any)[field_name] as string | undefined
  }

  return {
    error
  };
}
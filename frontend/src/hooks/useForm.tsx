import { useContext } from 'react';
import { Context, FormContextData } from '../contexts/form';

export type UseFormProps<T = any> = {
  initialValues?: T;
}

export function useForm<T = any>(props?: UseFormProps<T>): FormContextData<T> {
  const context = useContext<FormContextData<T>>(Context);

  return {
    ...context, 
    values: {...props?.initialValues, ...context.values}
  };
}
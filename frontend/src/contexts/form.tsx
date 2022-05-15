import React, { createContext, useState } from 'react';

export type FormError<Values> = {
  [key in keyof Partial<Values>]: string;
};

export type FormContextData<Values = any> = {
  values: Values;
  setValues: <Values>(values: Values) => void;
  handleChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeTextarea: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;

  errors: FormError<Values>;
  setErrors: (errors?: FormError<Values>) => void;
}

export type FormProviderProps = {
  children?: React.ReactNode;
}

export const Context = React.createContext<FormContextData>({} as  FormContextData);

const FormContextProvider = Context.Provider;

export function FormProvider({
  children
}: FormProviderProps) {
  const [values, setValues] = useState<any>();
  const [errors, setErrors] = useState<any>();

  function handleChangeInput(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, files, type } = e.target;

    if(value.length || files) {
      setErrors((prevState: any) => {
        return {
          ...prevState,
          [name]: undefined
        }
      })
    }

    setValues((prevState: any) => {
      if(type === 'file') {
        return {
          ...prevState, 
          [name]: files
        };
      }

      return {
        ...prevState, 
        [name]: value
      }
    });
  }

  function handleChangeTextarea(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const { name, value } = e.target;

    if(value.length) {
      setErrors((prevState: any) => {
        return {
          ...prevState,
          [name]: undefined
        }
      })
    }

    setValues((prevState: any) => {
      return {
        ...prevState, 
        [name]: value
      }
    });
  }

  return (
    <FormContextProvider
      value={{
        values,
        setValues,
        handleChangeInput,
        handleChangeTextarea,

        errors,
        setErrors,
      }}
    >
      {children}
    </FormContextProvider>
  )
}
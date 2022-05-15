import './styles.css';

import React from 'react';

import { useForm } from '../../hooks/useForm';
import { useField } from '../../hooks/useField';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  type?: React.HTMLInputTypeAttribute;
  labelText?: React.ReactNode | JSX.Element;
  children?: React.ReactNode;
  hasField?: boolean;

  files?: {
    itens: File[];
    setFiles: (files: File[]) => void;
    setFilesPreview?: React.Dispatch<React.SetStateAction<string[]>>
  };
}

export function Input({
  name,
  type,
  labelText,
  children,
  hasField=true,
  files,
  ...rest
}: InputProps) {
  const { handleChangeInput } = useForm();
  const { error } = useField(name);

  function handleSelectImages(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      return
    }

    const event_files = Array.from(event.target.files);

    const selectedImagesPreview = event_files.map(image => {
      return URL.createObjectURL(image)
    })

    let newImages: File[] = [];

    if(files) {
      newImages = [...files.itens, ...event_files];
    }

    files?.setFiles(newImages);

    files?.setFilesPreview && files.setFilesPreview((prevState) => [...prevState, ...selectedImagesPreview]);
  }

  return (
    <div 
      className={`input-block ${error && 'input_has_error'}`}
    >
      <label htmlFor={name}>{labelText}</label>
      {children}
      {hasField && (
        <>
          <input
            type={type}
            name={name}
            id={name}
            className={`input_${name}`}
            onChange={(e) => {
              handleChangeInput(e)
              handleSelectImages(e)
            }}
            {...rest}
          />
          {error && (
            <p className="input_error_text">{error}</p>
          )}
        </>
      )}
    </div>
  );
}
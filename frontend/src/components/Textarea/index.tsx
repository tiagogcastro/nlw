import './styles.css';

import React from 'react';
import { useForm } from '../../hooks/useForm';
import { useField } from '../../hooks/useField';

export type TextareaProps =  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  name: string;
  labelText?: React.ReactNode | JSX.Element;
}

export function Textarea({
  name,
  labelText,
  ...rest
}: TextareaProps) {
  const { handleChangeTextarea } = useForm();
  const { error } = useField(name);

  return (
    <div 
      className={`input-block ${error && 'input_has_error'}`}
    >
      <label htmlFor={name}>{labelText}</label>
      <textarea
        id={name}
        name={name}
        className={`input_${name}`}
        onChange={handleChangeTextarea}
        {...rest}
      />
      {error && (
        <p className="input_error_text">{error}</p>
      )}
    </div>
  );
}
import React from 'react'

export type FormProps = React.HTMLAttributes<HTMLFormElement> & {
  validateForm?: () => any;
}

export function Form({
  validateForm,
  children,
  onSubmit,
  ...rest
}: FormProps) {
  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    onSubmit && onSubmit(event);
  }

  return (
    <form
      {...rest}
      onSubmit={submit}
      className="create-orphanage-form"
    >
      {children}
    </form>
  )
}
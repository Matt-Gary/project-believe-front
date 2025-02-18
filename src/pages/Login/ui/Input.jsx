import React from 'react';

export const Input = React.forwardRef(
  ({ id, placeholder, type = 'text', mandatory, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        <label className="flex gap-1" htmlFor={id}>
          {id}
          <span className="text-accent">{mandatory ? '*' : ''}</span>
        </label>
        <input
          ref={ref}
          className={`card-glass rounded-lg p-4 focus:border focus:border-accent ${className} disabled:cursor-not-allowed`}
          type={type}
          id={id}
          placeholder={placeholder}
          {...props}
        />
      </div>
    );
  },
);

{
  /* <button
onClick={() => handleSubmit(onSubmit)()}
className="button mt-4 w-full"
>
Cadastrar
</button>

<div className="mb-4">Já possui cadastro?</div>
<Link to="/login" className="button-ghost w-full">
Entrar
</Link> */
}

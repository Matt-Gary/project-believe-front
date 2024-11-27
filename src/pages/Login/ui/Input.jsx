import React from "react";

export const Input = React.forwardRef(
  ({ id, placeholder, type = "text", ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        <label htmlFor={id}>{id}</label>
        <input
          ref={ref}
          className="card-glass rounded-lg p-4 focus:border focus:border-accent"
          type={type}
          id={id}
          placeholder={placeholder}
          {...props}
        />
      </div>
    );
  },
);

import React from "react";
import { Error } from "./Error";

type InputProps = {
  /** CSS class applied to the root wrapping div */
  className?: string;
  /** _Input_ **value** */
  value: string | number;
  /** Input label */
  label: string;
  /** Input id */
  id: string;
  /** Input onChange */
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  /** Input type */
  type?: "text" | "number" | "phone" | "email" | "password";
  /** Displays below input */
  error?: string;
};

export function Input({
  className,
  id,
  label,
  value,
  onChange,
  type = "text",
  error,
}: InputProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block font-bold">
        {label}
      </label>
      <input
        id={id}
        onChange={onChange}
        type={type}
        className="border-2 border-gray-400 rounded-md"
        value={value}
      />
      {error && <Error errorMessage={error} />}
    </div>
  );
}

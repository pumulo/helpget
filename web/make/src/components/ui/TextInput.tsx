import React from 'react';
import { FormInputProps } from './types';
  
export const TextInput = <TFormValues extends Record<string, unknown>>({
    id,
    name,
    label,
    register,
    rules,
    errors,
    ...props
  }: FormInputProps<TFormValues>): JSX.Element => {
    return (
      <div>
            
            <label className="text-gray-600 font-medium" htmlFor={id}>
                {label}
            </label>
            <input
                className="border-solid border-gray-300 border py-2 px-4 w-full
rounded text-gray-700"
                id={id}
                autoFocus
                {...(register && register(name, rules))}
                {...props}
            />
            {errors && <div>{errors.message}</div>
            }
      </div>
    );
};
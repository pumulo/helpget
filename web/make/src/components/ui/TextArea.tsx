import React from 'react';
import { FormInputProps } from './types';
  
export const TextArea = <TFormValues extends Record<string, unknown>>({
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

            <textarea
                className="border-solid border-gray-300 border py-2 px-4 w-full
rounded text-gray-700"
                {...register}
                autoFocus
                {...(register && register(name, rules))}
                {...props}
            >
            </textarea>
            {
                errors && <div>{errors.message}</div>
            }
            
      </div>
    );
};
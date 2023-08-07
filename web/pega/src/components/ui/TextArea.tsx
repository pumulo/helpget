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
              className={
                errors ?
                  `shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`:
                  `border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700`
              }
              {...register}
              autoFocus
              {...(register && register(name, rules))}
              {...props}
            >
            </textarea>
            {
              errors && <div className='text-red-500 text-xs italic'>{errors.message}</div>
            }
            
      </div>
    );
};
import { Path, RegisterOptions, UseFormRegister } from 'react-hook-form';

export type InputProps = {
    id: string;
    name: string;
    label: string;
}
export type FormInputProps<TFormValues> = {
    name: Path<TFormValues>;
    rules?: RegisterOptions;
    register: UseFormRegister<any>;
    errors?: any;
} & Omit<InputProps, 'name'>;
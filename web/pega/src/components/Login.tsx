import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Splash } from "./Splash";
import { TextInput } from "./ui";


interface IFormInput {
    name: String
    security: String
}

const Login = () => {
    
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>({
        defaultValues: {
            name: 'Sikaneta',
            security: 'security'
        }
    });
    const onSubmit: SubmitHandler<IFormInput> = (dataLogin) => {
        console.log(dataLogin);
        setLogin(<Splash login={dataLogin.name} />);
    }

    const [content, setLogin] = useState(
        <div className="container mx-auto bg-gray-200 rounded-xl shadow border p-8 m-10">
            <form
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                onSubmit={handleSubmit(onSubmit)}
            >
                <TextInput
                    id='nameId'
                    name='name'
                    label='Last Name'
                    register={register}
                    rules={{ required: 'You must enter a last name' }}
                    errors={errors.name}
                />
                <TextInput
                    id='securityId'
                    name='security'
                    label='Password'
                    register={register}
                    rules={{ required: 'You must enter a password' }}
                    errors={errors.security}
                />
                <div className="flex items-center justify-between pt-5">
                    <input
                        type="submit"
                        value="Sign In"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    />
                </div>
            </form>
        </div>
    );


    return (
        <div>
            {content}
        </div>

    )
}

export { Login };
import React from "react";
import { useNavigate } from 'react-router-dom'
import { useForm, SubmitHandler } from "react-hook-form";
import { useNewEntityMutation } from "../../../store";
import { TextArea, TextInput } from "../../ui";

export type IFormEntityInput = {
    type: String
    name: String
    description: String
    values: {}
    status: String
}
const CreateEntity = () => {
    let navigate = useNavigate();
    const { register, formState: { errors }, handleSubmit } = useForm<IFormEntityInput>();
    const [
        createEntity, // This is the mutation trigger
        { isLoading: isUpdating }, // This is the destructured mutation result
    ] = useNewEntityMutation()
    
    const loadEntityHome = () => {
        navigate('../../entity', {relative: 'path'});
    }

    const onSubmit: SubmitHandler<IFormEntityInput> = async (fData) => {
        const payload = JSON.parse(JSON.stringify(fData));
        payload.values = JSON.parse(payload.values);
        createEntity(payload);
        loadEntityHome();
    };
    
    return (
        <div className="container mx-auto bg-gray-200 rounded-xl shadow border p-8 m-10">
            <form
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                onSubmit={handleSubmit(onSubmit)}
            >
                <TextInput<IFormEntityInput>
                    id='typeId'
                    name='type'
                    label='Entity Type'
                    register={register}
                    rules={{ required: 'You must enter a type' }}
                    errors={errors.type}
                />

                <TextInput
                    id='nameId'
                    name='name'
                    label='Name'
                    register={register}
                    rules={{ required: 'You must enter a name' }}
                    errors={errors.name}
                />

                <TextArea
                    id='descriptionId'
                    name='description'
                    label='Description'
                    register={register}
                    rules={{ required: 'You must enter a description' }}
                    errors={errors.description}
                    {...{rows:3}}
                />

                <TextArea
                    id='valuesId'
                    name='values'
                    label='Values'
                    register={register}
                    rules={{ required: 'You must enter a values' }}
                    errors={errors.values}
                    {...{rows:7}}
                />

                <TextInput
                    id='statusId'
                    name='status'
                    label='Status'
                    register={register}
                    rules={{ required: 'You must enter a status' }}
                    errors={errors.status}
                />

                <button
                    className="mt-4 w-full bg-green-400 hover:bg-green-600 text-green-100 border shadow py-3 px-6 font-semibold text-md rounded"
                    type="submit"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default CreateEntity;
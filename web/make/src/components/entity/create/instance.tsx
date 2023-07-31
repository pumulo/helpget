import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { useForm, SubmitHandler  } from "react-hook-form";
import { useNewEntityMutation, useGenAIJsonPMutation } from "../../../store";
import { TextArea, TextInput } from "../../ui";
import { FaClipboardList, FaPlus, FaStar } from "react-icons/fa";

export type IFormEntityInput = {
    type: String
    description: String
    values: {}
    status: String
}

const CreateEntity = () => {
    let navigate = useNavigate();

    const { register, getValues, formState: { errors }, handleSubmit, setValue } = useForm<IFormEntityInput>();
    const [
        createEntity, // This is the mutation trigger
        { isLoading }, // This is the destructured mutation result
    ] = useNewEntityMutation()

    const [
        createAISuggestion, // This is the mutation trigger
        { error }, // This is the destructured mutation result
    ] = useGenAIJsonPMutation()
    
    
    const loadEntityHome = () => {
        navigate('../../entity', {relative: 'path'});
    }

    const sleep = (ms: number) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const onSubmit: SubmitHandler<IFormEntityInput> = async (fData) => {
        const payload = JSON.parse(JSON.stringify(fData));
        payload.values = JSON.parse(payload.values);
        createEntity(payload);
        do {
            await sleep(500);
        } while (isLoading);

        loadEntityHome();
    };

    const suggestUsingAI = async () => {
        const { type, description } = getValues();
        const payload = {
            prompt: `create a detailed model of a ${type} with a description matching: ${description}`
        };
        console.log(JSON.stringify(payload));
        const data = await createAISuggestion(payload).unwrap();
        console.log('returned ' + data.response);
        setValue('values', JSON.stringify(data.response));
    } 

    const existingSkeleton = () => {
        console.log('Create a skeleton using an existing type');
    }
    
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
                    {...{rows:10}}
                />

                <TextInput
                    id='statusId'
                    name='status'
                    label='Status'
                    register={register}
                    rules={{ required: 'You must enter a status' }}
                    errors={errors.status}
                />

                <div className="flex flex-col items-center justify-center mt-8" role="group">
                    <div>
                        <button
                            type="submit"
                            className="px-4 py-2 text-sm font-medium 
                            text-gray-900 bg-green-400 border border-gray-200 
                            rounded-l-lg hover:bg-gray-100 hover:text-green-700 
                            focus:z-10 focus:ring-2 focus:ring-green-700 
                            focus:text-green-700 dark:bg-green-600 
                            dark:border-gray-600 dark:text-white 
                            dark:hover:text-white dark:hover:bg-green-400 
                            dark:focus:ring-blue-500 dark:focus:text-white"
                        >
                            <span className="flex gap-2"><FaPlus/> Create</span>
                        </button>
                        <button
                            type="button"
                             className="px-4 py-2 text-sm font-medium 
                             text-gray-900 bg-green-400 border border-gray-200 
                             hover:bg-gray-100 hover:text-green-700 
                             focus:z-10 focus:ring-2 focus:ring-green-700 
                             focus:text-green-700 dark:bg-green-600 
                             dark:border-gray-600 dark:text-white 
                             dark:hover:text-white dark:hover:bg-green-400 
                             dark:focus:ring-blue-500 dark:focus:text-white"
                            onClick={
                                suggestUsingAI
                            }
                        >
                            <span className="flex gap-2"><FaStar /> AI Assist</span>
                        </button>
                        <button
                            type="button"
                            className="flex-inline mr-1 px-4 py-2 text-sm font-medium 
                            text-gray-900 bg-green-400 border border-gray-200 
                            rounded-r-lg hover:bg-gray-100 hover:text-green-700 
                            focus:z-10 focus:ring-2 focus:ring-green-700 
                            focus:text-green-700 dark:bg-green-600 
                            dark:border-gray-600 dark:text-white 
                            dark:hover:text-white dark:hover:bg-green-400 
                            dark:focus:ring-blue-500 dark:focus:text-white"
                            onClick={
                                existingSkeleton
                            }
                        >
                            <span className="flex gap-2"><FaClipboardList /> Existing Type</span>
                        </button>
                    </div>
                    {error && <div>{JSON.stringify(error)}</div>}
                </div>
            </form>
        </div>
    );
};

export default CreateEntity;
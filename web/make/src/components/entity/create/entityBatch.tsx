import React from "react";
import { useNavigate } from 'react-router-dom'
import { useForm, SubmitHandler  } from "react-hook-form";
import { useNewEntityBatchMutation, useGenAIBatchJsonPMutation } from "../../../store";
import { TextArea, TextInput } from "../../ui";
import { FaClipboardList, FaPlus, FaStar } from "react-icons/fa";

type IFormEntityInput = {
    count: number
    id: String
    type: String
    description: String
    values: {}
    status: String
}

interface EntityI {
    type: String
    description: String
    values: {}
    status: String
}

const CreateEntityBatch = () => {
    let navigate = useNavigate();

    const { register, getValues, formState: { errors }, handleSubmit, setValue } = useForm<IFormEntityInput>(
        {
            defaultValues: {
                status: 'New-CreatedInGetIT'
            }
        }
    );
    const [
        createEntityBatch, // This is the mutation trigger
        { isLoading }, // This is the destructured mutation result
    ] = useNewEntityBatchMutation()

    const [
        createAISuggestions, // This is the mutation trigger
        { error }, // This is the destructured mutation result
    ] = useGenAIBatchJsonPMutation()
    
    
    const loadEntityHome = () => {
        navigate('../../../entity', {relative: 'path'});
    }

    const sleep = (ms: number) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const onSubmit: SubmitHandler<IFormEntityInput> = async (fData) => {
        // console.log(fData.values);
        createEntityBatch(fData.values);
        do {
             await sleep(500);
        } while (isLoading);

        loadEntityHome();
    };

    const suggestUsingAI = async () => {
        const { type, count, description } = getValues();
        const payload = {
            prompt: `create ${count} instances of a ${type} with the following description: ${description}`
        };
        console.log(JSON.stringify(payload));
        const data = await createAISuggestions(payload).unwrap();
        const response = data.response as [];
        console.log('returned ' + response);
        const entities: EntityI[] = [];
        
        // add the type and description to each entity
        response.map((entity: any) => {
            const valueEntity: EntityI = {
                type: type,
                description: description,
                values: entity,
                status: 'New-CreatedByAiBatch'
            };
            entities.push(valueEntity);
        })

        const values = {"entities": entities}
        console.log(JSON.stringify(values))
        setValue('values', JSON.stringify(values));
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
                    id='countId'
                    name='count'
                    label='Number of records (Only enter if using genrative ai)'
                    register={register}
                    errors={errors.count}
                />
                
                <TextInput<IFormEntityInput>
                    id='typeId'
                    name='type'
                    label='Entity Type (Only enter if using genrative ai)'
                    register={register}
                    errors={errors.type}
                />

                <TextArea
                    id='descriptionId'
                    name='description'
                    label='Description (Only enter if using genrative ai)'
                    register={register}
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
                    {...{rows:15}}
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

export default CreateEntityBatch;
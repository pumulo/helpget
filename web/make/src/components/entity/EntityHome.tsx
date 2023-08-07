import React, { useState } from "react";
import { EntityList } from "./report/EntityList";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom'
import { TextInput } from "../ui";
export type IFormTypeInput = {
    category: String
}
const EntityHome = () => {
    let navigate = useNavigate();
    const [type, setType] = useState('');
    const { register, watch, formState: { errors } } = useForm<IFormTypeInput>();

    // Callback version of watch.  It's your responsibility to unsubscribe when done.
    // console.log(watch(type));
    React.useEffect(() => {
        const subscription = watch(
            (val) => {
                setType(val.category as string);
            }
        )
        
        return () => subscription.unsubscribe()
    }, [watch])

    const gotoPage = (route: string) => {
        navigate(route);
    }
    const refreshList = () => {
        console.log('refresh list');
    }

    return (
        <div>
            <form action="">
                <TextInput<IFormTypeInput>
                    id='typeId'
                    name='category'
                    label='Entity Type'
                    register={register}
                    rules={{ required: 'You must enter a type' }}
                    errors={errors.category}
                    //@ts-ignore
                    // onChange = { onTypeChange }
                />
            </form>
            <div className="flex flex-col items-center justify-center pt-5" role="group">
                <div>
                    <button
                        type="button"
                        className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
                        onClick={
                            () => gotoPage('./create')
                        }
                    >
                        New Entity
                    </button>
                    <button
                        type="button"
                        className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
                        onClick={
                            () => gotoPage('./batch/create')
                        }
                    >
                        New Batch
                    </button>
                    <button
                        type="button"
                        className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
                        onClick={
                            refreshList
                        }
                    >
                        Refresh
                    </button>
                </div>
            </div>
            <EntityList type={type} />
        </div>
    )
};

export default EntityHome;
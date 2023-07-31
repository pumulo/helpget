import React from "react";
import { EntityList } from "./report/EntityList";
import { useNavigate } from 'react-router-dom'

const EntityHome = () => {
    let navigate = useNavigate();
    const gotoPage = (route: string) => {
        navigate(route);
    }
    return (
        <div>
            
            <h3 className="text-2xl font-bold">
                Entity
            </h3>

            <div className="flex flex-col items-center justify-center" role="group">
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
                        className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
                        onClick={
                            () => gotoPage('./create')
                        }
                    >
                        New Batch
                    </button>
                </div>
            </div>
            <EntityList />
        </div>
    )
};

export default EntityHome;